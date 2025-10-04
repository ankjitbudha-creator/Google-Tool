"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons, OutputSettings } from './shared/ImageToolControls';

const MIN_CROP_SIZE = 20;
const HANDLE_SIZE = 10;

type AspectRatio = '1:1' | '4:3' | '16:9' | 'free';
type ResizingCorner = 'tl' | 'tr' | 'bl' | 'br' | null;

interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageCropper: React.FC = () => {
    const [crop, setCrop] = useState<Crop>({ x: 20, y: 20, width: 200, height: 200 });
    const [aspect, setAspect] = useState<AspectRatio>('free');
    const [originalImageSize, setOriginalImageSize] = useState<{ width: number, height: number } | null>(null);
    const [outputFormat, setOutputFormat] = useState<'jpeg' | 'png' | 'webp'>('png');
    const [outputQuality, setOutputQuality] = useState(92);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const interactionRef = useRef<{ 
        isDragging?: boolean; 
        isResizing?: ResizingCorner;
        startX: number; 
        startY: number;
        startCrop: Crop;
    } | null>(null);

    const onImageLoad = useCallback((img: HTMLImageElement) => {
        setOriginalImageSize({ width: img.width, height: img.height });
        const canvas = canvasRef.current;
        if (canvas) {
            const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
            const hRatio = canvasWidth / img.width;
            const vRatio = canvasHeight / img.height;
            const ratio = Math.min(hRatio, vRatio) * 0.8;
            const initialWidth = img.width * ratio;
            const initialHeight = img.height * ratio;
            
            setCrop({
                width: initialWidth,
                height: initialHeight,
                x: (canvasWidth - initialWidth) / 2,
                y: (canvasHeight - initialHeight) / 2,
            });
        }
    }, []);

    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad);

    const drawCanvas = useCallback(() => {
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

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvasWidth, crop.y);
        ctx.fillRect(0, crop.y + crop.height, canvasWidth, canvasHeight - (crop.y + crop.height));
        ctx.fillRect(0, crop.y, crop.x, crop.height);
        ctx.fillRect(crop.x + crop.width, crop.y, canvasWidth - (crop.x + crop.width), crop.height);

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
        
        ctx.fillStyle = '#6366f1';
        const halfHandle = HANDLE_SIZE / 2;
        ctx.fillRect(crop.x - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);

    }, [crop, imageRef]);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas, imageSrc]);
    
    useEffect(() => {
        if (!imageSrc) return;
        if (aspect === 'free') return;

        const [aspectW, aspectH] = aspect.split(':').map(Number);
        const newAspectRatio = aspectW / aspectH;
        
        setCrop(currentCrop => {
            const centerX = currentCrop.x + currentCrop.width / 2;
            const centerY = currentCrop.y + currentCrop.height / 2;
            
            let newWidth, newHeight;
            
            if (currentCrop.width / currentCrop.height > newAspectRatio) {
                newWidth = currentCrop.height * newAspectRatio;
                newHeight = currentCrop.height;
            } else {
                newHeight = currentCrop.width / newAspectRatio;
                newWidth = currentCrop.width;
            }

            return {
                ...currentCrop,
                width: newWidth,
                height: newHeight,
                x: centerX - newWidth / 2,
                y: centerY - newHeight / 2,
            };
        });
    }, [aspect, imageSrc]);

    useEffect(() => {
        const handleResize = () => drawCanvas();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [drawCanvas]);
    
    const getResizingCorner = (e: React.MouseEvent<HTMLCanvasElement>): ResizingCorner => {
        const { offsetX: x, offsetY: y } = e.nativeEvent;
        const { x: cropX, y: cropY, width: cropW, height: cropH } = crop;
        const handleArea = HANDLE_SIZE * 1.5;
        if (x > cropX - handleArea/2 && x < cropX + handleArea/2 && y > cropY - handleArea/2 && y < cropY + handleArea/2) return 'tl';
        if (x > cropX + cropW - handleArea/2 && x < cropX + cropW + handleArea/2 && y > cropY - handleArea/2 && y < cropY + handleArea/2) return 'tr';
        if (x > cropX - handleArea/2 && x < cropX + handleArea/2 && y > cropY + cropH - handleArea/2 && y < cropY + cropH + handleArea/2) return 'bl';
        if (x > cropX + cropW - handleArea/2 && x < cropX + cropW + handleArea/2 && y > cropY + cropH - handleArea/2 && y < cropY + cropH + handleArea/2) return 'br';
        return null;
    };
    
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = e.nativeEvent;
        const resizingCorner = getResizingCorner(e);
        const isDragging = offsetX > crop.x && offsetX < crop.x + crop.width && offsetY > crop.y && offsetY < crop.y + crop.height && !resizingCorner;
        
        if(resizingCorner || isDragging) {
            e.preventDefault();
            interactionRef.current = {
                startX: offsetX,
                startY: offsetY,
                startCrop: { ...crop },
                isResizing: resizingCorner,
                isDragging
            };
        }
    };
    
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!interactionRef.current) return;
        e.preventDefault();

        const { isDragging, isResizing, startX, startY, startCrop } = interactionRef.current;
        const { offsetX, offsetY } = e.nativeEvent;
        
        if (isDragging) {
            const dx = offsetX - startX;
            const dy = offsetY - startY;
            setCrop(c => ({ ...c, x: startCrop.x + dx, y: startCrop.y + dy }));
            return;
        } 
        
        if (isResizing) {
            const dx = offsetX - startX;
            const dy = offsetY - startY;
            let { x, y, width, height } = startCrop;
            const aspectRatioValue = aspect !== 'free' ? parseFloat(aspect.split(':')[0]) / parseFloat(aspect.split(':')[1]) : null;

            if (isResizing.includes('r')) width += dx;
            if (isResizing.includes('l')) { width -= dx; x += dx; }
            
            if (aspectRatioValue) {
                const newHeight = width / aspectRatioValue;
                if (isResizing.includes('t')) { y += height - newHeight; }
                height = newHeight;
            } else {
                if (isResizing.includes('b')) height += dy;
                if (isResizing.includes('t')) { height -= dy; y += dy; }
            }

            if (width >= MIN_CROP_SIZE && height >= MIN_CROP_SIZE) {
                setCrop({ x, y, width, height });
            }
        }
    }, [aspect]);

    const handleMouseUp = () => {
        interactionRef.current = null;
    };
    
    const handleCropDownload = () => {
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!canvas || !image.src || !originalImageSize) {
            setMessage({ type: 'error', text: 'Cannot crop without an image.' });
            return;
        }
        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
        const hRatio = canvasWidth / image.width;
        const vRatio = canvasHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scaledWidth = image.width * ratio;
        const scaledHeight = image.height * ratio;
        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;
        const scaleX = image.width / scaledWidth;
        const scaleY = image.height / scaledHeight;
        const cropRect = { x: (crop.x - offsetX) * scaleX, y: (crop.y - offsetY) * scaleY, width: crop.width * scaleX, height: crop.height * scaleY };
        const imageRect = { x: 0, y: 0, width: image.width, height: image.height };
        const intersection = {
            x: Math.max(cropRect.x, imageRect.x),
            y: Math.max(cropRect.y, imageRect.y),
            width: Math.min(cropRect.x + cropRect.width, imageRect.x + imageRect.width) - Math.max(cropRect.x, imageRect.x),
            height: Math.min(cropRect.y + cropRect.height, imageRect.y + imageRect.height) - Math.max(cropRect.y, imageRect.y),
        };
        if (intersection.width <= 0 || intersection.height <= 0) {
            setMessage({ type: 'error', text: 'Crop area is outside the image.' });
            return;
        }
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = Math.round(intersection.width);
        cropCanvas.height = Math.round(intersection.height);
        const ctx = cropCanvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(image, Math.round(intersection.x), Math.round(intersection.y), Math.round(intersection.width), Math.round(intersection.height), 0, 0, Math.round(intersection.width), Math.round(intersection.height));

        const mimeType = `image/${outputFormat}`;
        const qualityArg = (outputFormat === 'jpeg' || outputFormat === 'webp') ? outputQuality / 100 : undefined;
        const fileExtension = outputFormat === 'jpeg' ? 'jpg' : outputFormat;

        cropCanvas.toBlob((blob) => {
            if (!blob) {
                setMessage({ type: 'error', text: 'Failed to create image file.' });
                return;
            }
            const link = document.createElement('a');
            const token = Math.random().toString(36).substring(2, 8);
            link.download = `BabalTools-${originalFileName}-cropped-${token}.${fileExtension}`;
            link.href = URL.createObjectURL(blob);
            link.click();
            URL.revokeObjectURL(link.href);
            setMessage({ type: 'success', text: 'Image downloaded successfully!' });
        }, mimeType, qualityArg);
    };

    const handleReset = () => {
        baseHandleReset(() => {
            setOriginalImageSize(null);
            setAspect('free');
            setOutputFormat('png');
            setOutputQuality(92);
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
                onFileChange={handleFileChange}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                />
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
                <div>
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white px-4">Aspect Ratio</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {(['1:1', '4:3', '16:9', 'free'] as AspectRatio[]).map(r => (
                           <button 
                                key={r} 
                                onClick={() => setAspect(r)} 
                                className={`p-2 rounded-md text-sm transition-colors border ${
                                    aspect === r 
                                        ? 'bg-primary text-white border-primary' 
                                        : 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                }`}
                            >
                               {r === 'free' ? 'Free' : r}
                           </button>
                        ))}
                    </div>
                 </div>
                 <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Dimensions</h3>
                    <div className="text-sm space-y-2">
                        {originalImageSize && <p>Original: <span className="font-mono">{`${originalImageSize.width} x ${originalImageSize.height}px`}</span></p>}
                        {imageSrc && <p>Crop: <span className="font-mono">{`${Math.round(crop.width)} x ${Math.round(crop.height)}px`}</span></p>}
                        {!imageSrc && <p className="text-gray-500 dark:text-gray-400">Upload an image to see dimensions.</p>}
                    </div>
                 </div>
                
                <OutputSettings
                    format={outputFormat}
                    setFormat={setOutputFormat}
                    quality={outputQuality}
                    setQuality={setOutputQuality}
                    disabled={!imageSrc}
                />

                <FileNameDisplay fileName={originalFileName} />
                
                <ActionButtons 
                    onDownload={handleCropDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Crop & Download"
                />
                
                <MessageDisplay message={message} />
            </div>
        </div>
    );
};