import React, { useState, useRef, useEffect } from 'react';
import { ArrowsRightLeftIcon, ArrowsUpDownIcon } from '../../components/Icons';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons } from './shared/ImageToolControls';

export const ImageFlipper: React.FC = () => {
    const [flipHorizontal, setFlipHorizontal] = useState(false);
    const [flipVertical, setFlipVertical] = useState(false);
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(() => {
        setFlipHorizontal(false);
        setFlipVertical(false);
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
            
            const scaleH = flipHorizontal ? -1 : 1;
            const scaleV = flipVertical ? -1 : 1;
            
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(scaleH, scaleV);
            
            ctx.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            
            ctx.restore();
        }

        draw();
        
        window.addEventListener('resize', draw);
        return () => window.removeEventListener('resize', draw);

    }, [imageSrc, flipHorizontal, flipVertical, imageRef]);


    const handleDownload = () => {
        const image = imageRef.current;
        if (!image.src) {
            setMessage({ type: 'error', text: 'No image to download.' });
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.save();
        const scaleH = flipHorizontal ? -1 : 1;
        const scaleV = flipVertical ? -1 : 1;
        const translateX = flipHorizontal ? canvas.width : 0;
        const translateY = flipVertical ? canvas.height : 0;
        ctx.translate(translateX, translateY);
        ctx.scale(scaleH, scaleV);
        ctx.drawImage(image, 0, 0, image.width, image.height);
        ctx.restore();
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-flipped-${token}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
        baseHandleReset(() => {
            setFlipHorizontal(false);
            setFlipVertical(false);
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (canvas && ctx) {
              ctx.clearRect(0,0, canvas.width, canvas.height);
            }
        });
    };
    
    const showCanvas = flipHorizontal || flipVertical;

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
                {showCanvas ? (
                    <canvas ref={canvasRef} className="w-full h-full" />
                ) : (
                    imageSrc && <img src={imageSrc} alt="Preview" className="w-full h-full object-contain" />
                )}
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
                 <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">Flip Controls</h3>
                    <div className="space-y-2">
                        <button 
                            onClick={() => setFlipHorizontal(f => !f)} 
                            disabled={!imageSrc}
                            className={`w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium transition-colors border ${flipHorizontal ? 'bg-primary text-white border-primary' : 'bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50'}`}
                        >
                            <ArrowsRightLeftIcon className="w-5 h-5" />
                            Flip Horizontal
                        </button>
                        <button 
                            onClick={() => setFlipVertical(f => !f)} 
                            disabled={!imageSrc}
                            className={`w-full flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium transition-colors border ${flipVertical ? 'bg-primary text-white border-primary' : 'bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50'}`}
                        >
                           <ArrowsUpDownIcon className="w-5 h-5" />
                            Flip Vertical
                        </button>
                    </div>
                 </div>

                <FileNameDisplay fileName={originalFileName} />
                 
                <ActionButtons 
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Download Flipped Image"
                />
                  
                <MessageDisplay message={message} />
            </div>
        </div>
    );
};
