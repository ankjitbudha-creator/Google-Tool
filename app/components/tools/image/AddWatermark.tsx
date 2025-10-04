"use client";

import React, { useState, useRef, DragEvent, useEffect, useCallback } from 'react';
import { ArrowUpTrayIcon, ArrowPathIcon, DocumentDuplicateIcon } from '../../Icons';

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
}

export const AddWatermark: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('image');
    const [watermark, setWatermark] = useState<Watermark>({
        type: 'text',
        content: 'BabalTools',
        x: 150,
        y: 150,
        width: 200,
        height: 30,
        rotation: 0,
        opacity: 0.5,
        color: '#ffffff',
        font: '30px Arial'
    });
    const [isTiled, setIsTiled] = useState(false);
    const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);

    const imageRef = useRef<HTMLImageElement>(new Image());
    const watermarkImageRef = useRef<HTMLImageElement>(new Image());
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const interactionRef = useRef<{ isDragging: boolean, startX: number, startY: number } | null>(null);
    
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;
        if (!canvas || !ctx || !image.src) return;

        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        
        const hRatio = canvasWidth / image.width;
        const vRatio = canvasHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scaledWidth = image.width * ratio;
        const scaledHeight = image.height * ratio;
        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

        ctx.globalAlpha = watermark.opacity;
        ctx.fillStyle = watermark.color;
        ctx.font = watermark.font;
        ctx.textBaseline = 'middle';

        const drawWatermark = (x: number, y: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(watermark.rotation * Math.PI / 180);
            if (watermark.type === 'text') {
                ctx.fillText(watermark.content, 0, 0);
            } else if (watermark.type === 'image' && watermarkImageRef.current.complete) {
                ctx.drawImage(watermarkImageRef.current, 0, 0, watermark.width, watermark.height);
            }
            ctx.restore();
        };

        if (isTiled) {
            for (let y = -50; y < canvasHeight + 50; y += 100) {
                for (let x = -50; x < canvasWidth + 50; x += 300) {
                    drawWatermark(x, y);
                }
            }
        } else {
            drawWatermark(watermark.x, watermark.y);
        }

        ctx.globalAlpha = 1.0;
    }, [watermark, isTiled]);

    useEffect(() => {
        if (imageSrc) draw();
    }, [imageSrc, draw]);

    const handleFileChange = (files: FileList | null, isWatermarkImg: boolean = false) => {
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                if (isWatermarkImg) {
                    watermarkImageRef.current.onload = draw;
                    watermarkImageRef.current.src = result;
                    setWatermark(w => ({...w, content: result}));
                } else {
                    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
                    setOriginalFileName(baseName.replace(/[^a-zA-Z0-9_-]/g, ''));
                    imageRef.current.onload = draw;
                    imageRef.current.src = result;
                    setImageSrc(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (isTiled) return;
        const { offsetX, offsetY } = e.nativeEvent;
        // Simple hit test for dragging
        if (
            offsetX >= watermark.x && offsetX <= watermark.x + watermark.width &&
            offsetY >= watermark.y - watermark.height && offsetY <= watermark.y
        ) {
            interactionRef.current = { isDragging: true, startX: offsetX - watermark.x, startY: offsetY - watermark.y };
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (interactionRef.current?.isDragging) {
            const { offsetX, offsetY } = e.nativeEvent;
            setWatermark(w => ({ ...w, x: offsetX - interactionRef.current!.startX, y: offsetY - interactionRef.current!.startY }));
        }
    };
    
    const handleMouseUp = () => { interactionRef.current = null; };

    const handleDownload = () => {
        const image = imageRef.current;
        if (!image.src) return;

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = image.width;
        finalCanvas.height = image.height;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(image, 0, 0);

        // Scale watermark properties to original image size
        const canvas = canvasRef.current!;
        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
        const hRatio = canvasWidth / image.width;
        const vRatio = canvasHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scale = 1 / ratio;

        ctx.globalAlpha = watermark.opacity;
        ctx.fillStyle = watermark.color;
        const scaledFontSize = parseFloat(watermark.font) * scale;
        ctx.font = `${scaledFontSize}px Arial`;
        ctx.textBaseline = 'middle';
        
        const drawFinalWatermark = (x: number, y: number) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(watermark.rotation * Math.PI / 180);
            if (watermark.type === 'text') {
                ctx.fillText(watermark.content, 0, 0);
            } else if (watermark.type === 'image' && watermarkImageRef.current.complete) {
                ctx.drawImage(watermarkImageRef.current, 0, 0, watermark.width * scale, watermark.height * scale);
            }
            ctx.restore();
        };
        
        if (isTiled) {
            for (let y = -50 * scale; y < finalCanvas.height + (50 * scale); y += 100 * scale) {
                for (let x = -50 * scale; x < finalCanvas.width + (50 * scale); x += 300 * scale) {
                    drawFinalWatermark(x, y);
                }
            }
        } else {
            const scaledX = watermark.x * scale;
            const scaledY = watermark.y * scale;
            drawFinalWatermark(scaledX, scaledY);
        }
        
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-watermarked-${token}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Downloaded watermarked image!'});
    };

    const handleReset = () => {
        setImageSrc(null);
        setOriginalFileName('image');
        setMessage(null);
        setWatermark({
            type: 'text',
            content: 'BabalTools',
            x: 150,
            y: 150,
            width: 200,
            height: 30,
            rotation: 0,
            opacity: 0.5,
            color: '#ffffff',
            font: '30px Arial'
        });
        setIsTiled(false);
        imageRef.current.src = '';
        watermarkImageRef.current.src = '';
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative min-h-[400px] md:min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                 {imageSrc ? (
                    <canvas ref={canvasRef} className="w-full h-full object-contain cursor-move" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center">
                         <ArrowUpTrayIcon className="w-16 h-16 text-gray-400 mb-4" />
                         <h3 className="text-xl font-semibold">Upload Image</h3>
                         <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e.target.files)} id="mainImageUpload" />
                         <button onClick={() => document.getElementById('mainImageUpload')?.click()} className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                             Select Image
                         </button>
                    </div>
                )}
            </div>
            <div className="md:col-span-1 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm space-y-4 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-lg border-b dark:border-slate-600 pb-2 mb-3">Watermark Controls</h3>
                    <div className="flex bg-gray-200 dark:bg-slate-900/50 rounded-lg p-1">
                        <button onClick={() => setWatermark(w=>({...w, type: 'text'}))} className={`w-full py-1.5 rounded-md text-sm font-medium ${watermark.type === 'text' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}>Text</button>
                        <button onClick={() => setWatermark(w=>({...w, type: 'image'}))} className={`w-full py-1.5 rounded-md text-sm font-medium ${watermark.type === 'image' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300'}`}>Image</button>
                    </div>

                    {watermark.type === 'text' ? (
                        <div className="space-y-3">
                            <input type="text" value={watermark.content} onChange={e => setWatermark(w => ({...w, content: e.target.value}))} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
                            <input type="color" value={watermark.color} onChange={e => setWatermark(w => ({...w, color: e.target.value}))} className="w-full h-10 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600"/>
                        </div>
                    ) : (
                         <div>
                            <input type="file" accept="image/*" onChange={e => handleFileChange(e.target.files, true)} id="watermarkImageUpload" className="hidden"/>
                            <button onClick={() => document.getElementById('watermarkImageUpload')?.click()} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 text-left">
                                {watermark.type === 'image' && watermark.content.startsWith('data:image') ? 'Change Watermark Image' : 'Select Watermark Image'}
                            </button>
                        </div>
                    )}
                    <div className="space-y-3 pt-2">
                        <div>
                            <label className="text-sm font-medium">Size: {watermark.width}px</label>
                            <input type="range" min="20" max="500" value={watermark.width} onChange={e => setWatermark(w => ({...w, width: Number(e.target.value), height: Number(e.target.value) / 2}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Opacity: {Math.round(watermark.opacity*100)}%</label>
                            <input type="range" min="0" max="1" step="0.05" value={watermark.opacity} onChange={e => setWatermark(w => ({...w, opacity: Number(e.target.value)}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Rotation: {watermark.rotation}°</label>
                            <input type="range" min="-180" max="180" value={watermark.rotation} onChange={e => setWatermark(w => ({...w, rotation: Number(e.target.value)}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                    </div>
                     <label className="flex items-center space-x-2 cursor-pointer pt-2">
                        <input type="checkbox" checked={isTiled} onChange={e => setIsTiled(e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary" disabled={!imageSrc}/>
                        <span>Tile Watermark</span>
                    </label>
                </div>
                 <div className="space-y-2">
                     <button onClick={handleDownload} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400">
                        <DocumentDuplicateIcon className="w-5 h-5" /> Download
                     </button>
                     <button onClick={handleReset} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400">
                        <ArrowPathIcon className="w-5 h-5" /> Reset
                     </button>
                 </div>
                 {message && <p className={`text-sm text-center p-2 rounded-md ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200'}`}>{message.text}</p>}
            </div>
        </div>
    );
};