"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from '../../Icons';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons } from './shared/ImageToolControls';

export const ImageRotator: React.FC = () => {
    const [rotation, setRotation] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(() => {
        setRotation(0);
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;
        if (!canvas || !ctx || !image.src) return;

        const draw = () => {
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

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rotation * Math.PI / 180);
            ctx.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            
            ctx.restore();
        }
        draw();
        window.addEventListener('resize', draw);
        return () => window.removeEventListener('resize', draw);
    }, [imageSrc, rotation, imageRef]);

    const handleDownload = () => {
        // ... (download logic remains the same)
        const image = imageRef.current;
        if (!image.src) {
            setMessage({ type: 'error', text: 'No image to download.' });
            return;
        }
        const angle = rotation * Math.PI / 180;
        const sin = Math.abs(Math.sin(angle));
        const cos = Math.abs(Math.cos(angle));
        const newWidth = image.width * cos + image.height * sin;
        const newHeight = image.width * sin + image.height * cos;
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.save();
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(angle);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-rotated-${token}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
        baseHandleReset(() => {
            setRotation(0);
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (canvas && ctx) {
              ctx.clearRect(0,0, canvas.width, canvas.height);
            }
        });
    };
    
    const handleRotate = (degrees: number) => {
        setRotation(r => r + degrees);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FIX: Correctly pass props to ImageDropzone instead of using incorrect spread syntax */}
            <ImageDropzone
                imageSrc={imageSrc}
                isDraggingOver={isDraggingOver}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileChange={handleFileChange}
            >
                <canvas ref={canvasRef} className="w-full h-full" />
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
                 <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Rotation Controls</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleRotate(-90)} disabled={!imageSrc} className={`w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium transition-colors border bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50`}>
                            <ArrowUturnLeftIcon className="w-5 h-5" />
                            Rotate Left
                        </button>
                        <button onClick={() => handleRotate(90)} disabled={!imageSrc} className={`w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium transition-colors border bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50`}>
                           <ArrowUturnRightIcon className="w-5 h-5" />
                           Rotate Right
                        </button>
                    </div>
                    <div>
                        <label htmlFor="angle-slider" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Fine-tune Angle</label>
                         <div className="flex items-center gap-3">
                            <input id="angle-slider" type="range" min="-180" max="180" value={rotation} onChange={e => setRotation(Number(e.target.value))} disabled={!imageSrc} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary" />
                            <div className="relative flex-shrink-0">
                                <input type="number" value={rotation} onChange={e => setRotation(Number(e.target.value))} disabled={!imageSrc} className="w-20 p-2 pr-6 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-slate-700 disabled:bg-gray-200 dark:disabled:bg-slate-800/50" />
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">°</span>
                            </div>
                        </div>
                    </div>
                 </div>

                <FileNameDisplay fileName={originalFileName} />
                 
                <ActionButtons 
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Download Rotated Image"
                />
                  
                <MessageDisplay message={message} />
            </div>
        </div>
    );
};