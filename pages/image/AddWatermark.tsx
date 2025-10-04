import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons } from './shared/ImageToolControls';

interface Watermark {
    type: 'text' | 'image';
    content: string; // Text content or image src
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    color: string;
    font: string;
    fontSize: number;
}

export const AddWatermark: React.FC = () => {
    const [watermark, setWatermark] = useState<Watermark>({
        type: 'text', content: 'BabalTools', x: 150, y: 150,
        width: 150, height: 20, rotation: -25, opacity: 0.5,
        color: '#ffffff', font: 'Arial', fontSize: 48,
    });
    const [isTiled, setIsTiled] = useState(false);
    
    const watermarkImageRef = useRef<HTMLImageElement>(new Image());
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const interactionRef = useRef<{ isDragging?: boolean; isResizing?: boolean; isRotating?: boolean; startX: number; startY: number; startW: number; startH: number; startRot: number; } | null>(null);

    const onImageLoad = () => { draw(); };
    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange: baseHandleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad);

    const handleWatermarkFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Watermark must be a valid image file.' });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                watermarkImageRef.current.onload = () => {
                    setWatermark(w => ({ ...w, type: 'image', width: watermarkImageRef.current.width, height: watermarkImageRef.current.height }));
                };
                watermarkImageRef.current.src = result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    // ... (draw, mouse handlers, download logic remain the same)
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;
        if (!canvas || !ctx || !image.src) return;

        const container = canvas.parentElement;
        if (!container) return;
        const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
        
        const hRatio = containerWidth / image.width;
        const vRatio = containerHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scaledWidth = image.width * ratio;
        const scaledHeight = image.height * ratio;
        
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

        const drawWatermark = (x: number, y: number, w: number, h: number) => {
            ctx.save();
            ctx.globalAlpha = watermark.opacity;
            ctx.translate(x + w / 2, y + h / 2);
            ctx.rotate(watermark.rotation * Math.PI / 180);
            
            if (watermark.type === 'text') {
                ctx.fillStyle = watermark.color;
                ctx.font = `${watermark.fontSize}px ${watermark.font}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const textWidth = ctx.measureText(watermark.content).width;
                 if (w !== textWidth) {
                    setWatermark(wm => ({...wm, width: textWidth, height: wm.fontSize }));
                }
                ctx.fillText(watermark.content, 0, 0);
            } else if (watermark.type === 'image' && watermarkImageRef.current.complete) {
                ctx.drawImage(watermarkImageRef.current, -w / 2, -h / 2, w, h);
            }
            ctx.restore();
        };

        if (isTiled) {
            ctx.save();
            ctx.globalAlpha = watermark.opacity;
            const patternCanvas = document.createElement('canvas');
            const patternCtx = patternCanvas.getContext('2d');
            const patternSize = Math.max(watermark.width, watermark.height) * 1.5;
            patternCanvas.width = patternSize;
            patternCanvas.height = patternSize;
            if(patternCtx) {
                patternCtx.translate(patternCanvas.width / 2, patternCanvas.height / 2);
                patternCtx.rotate(watermark.rotation * Math.PI / 180);
                 if (watermark.type === 'text') {
                    patternCtx.fillStyle = watermark.color;
                    patternCtx.font = `${watermark.fontSize}px ${watermark.font}`;
                    patternCtx.textAlign = 'center';
                    patternCtx.textBaseline = 'middle';
                    patternCtx.fillText(watermark.content, 0, 0);
                } else if (watermark.type === 'image' && watermarkImageRef.current.complete) {
                    patternCtx.drawImage(watermarkImageRef.current, -watermark.width/2, -watermark.height/2, watermark.width, watermark.height);
                }
                const pattern = ctx.createPattern(patternCanvas, 'repeat');
                if(pattern) {
                    ctx.fillStyle = pattern;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }
            }
            ctx.restore();
        } else {
            drawWatermark(watermark.x, watermark.y, watermark.width, watermark.height);
            // Draw handles
            // ... (handle drawing logic)
        }
    }, [watermark, isTiled, imageRef]);

    useEffect(() => {
        if (imageSrc) draw();
    }, [imageSrc, draw]);

    const handleDownload = () => {
        // ...
        const image = imageRef.current;
        if (!image.src) return;

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = image.width;
        finalCanvas.height = image.height;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(image, 0, 0);

        const canvas = canvasRef.current!;
        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
        const hRatio = canvasWidth / image.width;
        const vRatio = canvasHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scale = 1 / ratio;

        const scaledWatermark = {
            ...watermark,
            x: watermark.x * scale,
            y: watermark.y * scale,
            width: watermark.width * scale,
            height: watermark.height * scale,
            fontSize: watermark.fontSize * scale,
        };

        const drawFinalWatermark = (x: number, y: number, w: number, h: number) => {
            ctx.save();
            ctx.globalAlpha = scaledWatermark.opacity;
            ctx.translate(x + w / 2, y + h / 2);
            ctx.rotate(scaledWatermark.rotation * Math.PI / 180);
            
            if (scaledWatermark.type === 'text') {
                ctx.fillStyle = scaledWatermark.color;
                ctx.font = `${scaledWatermark.fontSize}px ${scaledWatermark.font}`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(scaledWatermark.content, 0, 0);
            } else if (scaledWatermark.type === 'image' && watermarkImageRef.current.complete) {
                ctx.drawImage(watermarkImageRef.current, -w / 2, -h / 2, w, h);
            }
            ctx.restore();
        };

        if (isTiled) {
             // Tiling logic for download...
        } else {
            drawFinalWatermark(scaledWatermark.x, scaledWatermark.y, scaledWatermark.width, scaledWatermark.height);
        }
        
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-watermarked-${token}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Downloaded watermarked image!'});
    };
    
    const handleReset = () => {
        baseHandleReset(() => {
            setWatermark({
                type: 'text', content: 'BabalTools', x: 150, y: 150,
                width: 150, height: 20, rotation: -25, opacity: 0.5,
                color: '#ffffff', font: 'Arial', fontSize: 48,
            });
            setIsTiled(false);
            watermarkImageRef.current.src = '';
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ImageDropzone
                imageSrc={imageSrc}
                isDraggingOver={isDraggingOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileChange={baseHandleFileChange}
            >
                <canvas ref={canvasRef} className="w-full h-full object-contain cursor-move" />
            </ImageDropzone>
            <div className="md:col-span-1 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm space-y-4 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-lg border-b dark:border-slate-600 pb-2 mb-3">Watermark Controls</h3>
                    { /* ... controls ... */ }
                </div>
                 <FileNameDisplay fileName={originalFileName} />
                 <ActionButtons 
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Download Watermarked"
                />
                 <MessageDisplay message={message} />
            </div>
        </div>
    );
};