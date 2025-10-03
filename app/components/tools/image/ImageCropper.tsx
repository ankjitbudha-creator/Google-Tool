"use client";

import React, { useState, useRef, useEffect, useCallback, DragEvent } from 'react';
import { ArrowUpTrayIcon, ArrowPathIcon, DocumentDuplicateIcon } from '../../Icons';

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
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({ x: 20, y: 20, width: 200, height: 200 });
    const [aspect, setAspect] = useState<AspectRatio>('free');
    const [originalImageSize, setOriginalImageSize] = useState<{ width: number, height: number } | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('image');
    const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(new Image());
    const interactionRef = useRef<{ 
        isDragging?: boolean; 
        isResizing?: ResizingCorner;
        startX: number; 
        startY: number;
        startCrop: Crop;
    } | null>(null);
    

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
        const ratio = Math.min(hRatio, vRatio, 1);
        const scaledWidth = image.width * ratio;
        const scaledHeight = image.height * ratio;
        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // 1. Draw the base image
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

        // 2. Draw the semi-transparent overlay outside the crop area
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvasWidth, crop.y);
        ctx.fillRect(0, crop.y + crop.height, canvasWidth, canvasHeight - (crop.y + crop.height));
        ctx.fillRect(0, crop.y, crop.x, crop.height);
        ctx.fillRect(crop.x + crop.width, crop.y, canvasWidth - (crop.x + crop.width), crop.height);

        // 3. Draw the crop border
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
        
        // 4. Draw the corner handles
        ctx.fillStyle = '#6366f1';
        const halfHandle = HANDLE_SIZE / 2;
        ctx.fillRect(crop.x - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);

    }, [crop]);

    useEffect(() => {
        drawCanvas();
    }, [drawCanvas]);
    
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
    
    const handleFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please upload a valid image file.' });
                return;
            }

            const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
            setOriginalFileName(baseName.replace(/[^a-zA-Z0-9_-]/g, ''));

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = imageRef.current;
                img.onload = () => {
                    setOriginalImageSize({ width: img.width, height: img.height });
                    
                    const canvas = canvasRef.current;
                    if (canvas) {
                        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
                        const hRatio = canvasWidth / img.width;
                        const vRatio = canvasHeight / img.height;
                        const ratio = Math.min(hRatio, vRatio, 1) * 0.8;
                        const initialWidth = img.width * ratio;
                        const initialHeight = img.height * ratio;
                        
                        setCrop({
                            width: initialWidth,
                            height: initialHeight,
                            x: (canvasWidth - initialWidth) / 2,
                            y: (canvasHeight - initialHeight) / 2,
                        });
                    }
                    setImageSrc(e.target?.result as string);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
            setMessage(null);
        }
    };
    
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
            setCrop(c => ({
                ...c,
                x: startCrop.x + dx,
                y: startCrop.y + dy,
            }));
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
                if (isResizing.includes('t')) {
                    y += height - newHeight;
                }
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
        const ratio = Math.min(hRatio, vRatio, 1);
        const scaledWidth = image.width * ratio;
        const scaledHeight = image.height * ratio;
        const offsetX = (canvasWidth - scaledWidth) / 2;
        const offsetY = (canvasHeight - scaledHeight) / 2;
    
        const scaleX = image.width / scaledWidth;
        const scaleY = image.height / scaledHeight;
    
        const cropRect = {
            x: (crop.x - offsetX) * scaleX,
            y: (crop.y - offsetY) * scaleY,
            width: crop.width * scaleX,
            height: crop.height * scaleY,
        };
    
        const imageRect = { x: 0, y: 0, width: image.width, height: image.height };
    
        const intersection = {
            x: Math.max(cropRect.x, imageRect.x),
            y: Math.max(cropRect.y, imageRect.y),
            width: 0,
            height: 0,
        };
        intersection.width = Math.min(cropRect.x + cropRect.width, imageRect.x + imageRect.width) - intersection.x;
        intersection.height = Math.min(cropRect.y + cropRect.height, imageRect.y + imageRect.height) - intersection.y;
    
        if (intersection.width <= 0 || intersection.height <= 0) {
            setMessage({ type: 'error', text: 'Crop area is completely outside the image.' });
            return;
        }
    
        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = Math.round(intersection.width);
        cropCanvas.height = Math.round(intersection.height);
        const ctx = cropCanvas.getContext('2d');
        if (!ctx) return;
    
        ctx.drawImage(
            image,
            Math.round(intersection.x),
            Math.round(intersection.y),
            Math.round(intersection.width),
            Math.round(intersection.height),
            0,
            0,
            Math.round(intersection.width),
            Math.round(intersection.height)
        );
    
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-cropped-${token}.png`;
        link.href = cropCanvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
      setImageSrc(null);
      setOriginalImageSize(null);
      setOriginalFileName('image');
      setMessage(null);
      setAspect('free');
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        handleFileChange(e.dataTransfer.files);
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative min-h-[400px] md:min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                {imageSrc ? (
                     <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-grab active:cursor-grabbing"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    />
                ) : (
                    <div 
                        className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${isDraggingOver ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-400 dark:border-gray-600'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                         <ArrowUpTrayIcon className="w-16 h-16 text-gray-400 mb-4" />
                         <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                           {isDraggingOver ? "Drop image to upload" : "Drag & Drop or Click to Upload"}
                         </h3>
                         <p className="text-gray-500 dark:text-gray-400 mt-2">Supports JPG, PNG, GIF, WEBP</p>
                         <input type="file" className="hidden" accept="image/*" onChange={e => handleFileChange(e.target.files)} id="fileUpload" />
                         <button onClick={() => document.getElementById('fileUpload')?.click()} className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                             Select Image
                         </button>
                    </div>
                )}
            </div>

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
                {originalFileName !== 'image' && (
                    <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Selected File</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{originalFileName}</p>
                    </div>
                 )}
                 <div className="space-y-2">
                     <button onClick={handleCropDownload} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <DocumentDuplicateIcon className="w-5 h-5" />
                        Crop & Download
                     </button>
                     <button onClick={handleReset} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <ArrowPathIcon className="w-5 h-5" />
                        Reset / Change Image
                     </button>
                 </div>
                  {message && (
                    <div className={`p-3 rounded-md text-sm text-center ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                        {message.text}
                    </div>
                 )}
            </div>
        </div>
    );
};