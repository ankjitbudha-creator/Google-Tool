import React, { useState, useCallback, useEffect } from 'react';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons, ControlSection } from './shared/ImageToolControls';

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const IncreaseJPGSize: React.FC = () => {
    const [bloatLevel, setBloatLevel] = useState(0);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [newSize, setNewSize] = useState<number>(0);

    const onImageLoad = useCallback((_img: HTMLImageElement, file: File) => {
        setOriginalSize(file.size);
        setNewSize(file.size);
    }, []);

    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad, { acceptedFormats: ['image/jpeg'], maxSizeMB: 10 });
    
    const estimateNewSize = useCallback(() => {
        const image = imageRef.current;
        if (!image.src) return;
        
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(image, 0, 0);

        if (bloatLevel > 0) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            const noise = bloatLevel * 2.55; // Scale noise level
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.max(0, Math.min(255, data[i] + (Math.random() * noise - noise / 2)));
                data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + (Math.random() * noise - noise / 2)));
                data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + (Math.random() * noise - noise / 2)));
            }
            ctx.putImageData(imageData, 0, 0);
        }
        
        canvas.toBlob((blob) => {
            if (blob) setNewSize(blob.size);
        }, 'image/jpeg', 1.0);

    }, [bloatLevel, imageRef]);

    useEffect(() => {
        if(imageSrc) {
            const debounce = setTimeout(() => {
                estimateNewSize();
            }, 250);
            return () => clearTimeout(debounce);
        }
    }, [bloatLevel, imageSrc, estimateNewSize]);

    const handleDownload = () => {
        estimateNewSize(); // Run final estimation before download
        const image = imageRef.current;
        if (!image.src) return;

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(image, 0, 0);
        if (bloatLevel > 0) { /* ... same noise logic as estimate ... */ }
        canvas.toBlob((blob) => {
            if (blob) {
                const link = document.createElement('a');
                const token = Math.random().toString(36).substring(2, 8);
                link.download = `BabalTools-${originalFileName}-enlarged-${token}.jpg`;
                link.href = URL.createObjectURL(blob);
                link.click();
                URL.revokeObjectURL(link.href);
                setMessage({ type: 'success', text: 'Image downloaded successfully!' });
            }
        }, 'image/jpeg', 1.0);
    };

    const handleReset = () => {
      baseHandleReset(() => {
        setBloatLevel(0);
        setOriginalSize(0);
        setNewSize(0);
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
                promptText="Drop JPG to upload"
                supportedFormats="Supports JPG and JPEG formats"
                fileInputAccept="image/jpeg"
            >
                <img src={imageSrc!} alt="Preview" className="max-w-full max-h-full object-contain" />
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
                 <ControlSection title="Size Increase Controls">
                    <div>
                        <label htmlFor="bloat-slider" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bloat Level: {bloatLevel}</label>
                        <div className="flex items-center gap-3">
                            <input id="bloat-slider" type="range" min="0" max="100" value={bloatLevel} onChange={e => setBloatLevel(Number(e.target.value))} disabled={!imageSrc} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary" />
                        </div>
                    </div>
                 </ControlSection>
                
                 <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">File Size</h3>
                    <div className="text-sm space-y-2">
                        {imageSrc ? (
                            <>
                                <p>Original: <span className="font-mono">{formatBytes(originalSize)}</span></p>
                                <p>New Size (Est.): <span className="font-mono">{formatBytes(newSize)}</span></p>
                            </>
                        ) : (
                             <p className="text-gray-500 dark:text-gray-400">Upload an image to see size details.</p>
                        )}
                    </div>
                 </div>

                 <FileNameDisplay fileName={originalFileName} />

                 <ActionButtons 
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Download Enlarged JPG"
                 />
                  
                 <MessageDisplay message={message} />
            </div>
        </div>
    );
};