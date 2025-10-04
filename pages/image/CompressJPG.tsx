import React, { useState, useRef, useCallback, useEffect } from 'react';
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

export const CompressJPG: React.FC = () => {
    const [quality, setQuality] = useState(75);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onImageLoad = useCallback((img: HTMLImageElement, file: File) => {
        setOriginalSize(file.size);
    }, []);
    
    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad, { acceptedFormats: ['image/jpeg'], maxSizeMB: 10 });

    const updatePreview = useCallback(() => {
        const image = imageRef.current;
        if (!image.src || image.width === 0) return;

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(image, 0, 0);
        
        canvas.toBlob((blob) => {
            if(blob) {
                setCompressedSize(blob.size);
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(blob));
            }
        }, 'image/jpeg', quality / 100);
    }, [quality, imageRef, previewUrl]);
    
    useEffect(() => {
        if(imageSrc) {
            const debounce = setTimeout(() => {
                updatePreview();
            }, 250);
            return () => clearTimeout(debounce);
        }
    }, [quality, imageSrc, updatePreview]);

    const handleDownload = () => {
        if (!previewUrl) {
            setMessage({ type: 'error', text: 'No compressed image to download.' });
            return;
        };
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-compressed-${token}.jpg`;
        link.href = previewUrl;
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
      baseHandleReset(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setQuality(75);
        setOriginalSize(0);
        setCompressedSize(0);
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
                <img src={previewUrl || imageSrc!} alt="Preview" className="w-full h-full object-contain" />
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
                <ControlSection title="Compression Controls">
                    <div>
                        <label htmlFor="quality-slider" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Quality: {quality}</label>
                        <div className="flex items-center gap-3">
                            <input id="quality-slider" type="range" min="0" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} disabled={!imageSrc} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary" />
                        </div>
                    </div>
                </ControlSection>
                
                 <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">File Size</h3>
                    <div className="text-sm space-y-2">
                        {imageSrc ? (
                            <>
                                <p>Original: <span className="font-mono">{formatBytes(originalSize)}</span></p>
                                <p>Compressed: <span className="font-mono">{formatBytes(compressedSize)}</span></p>
                                {originalSize > 0 && <p className="font-semibold text-emerald-600 dark:text-emerald-400">Reduction: {Math.max(0, Math.round(100 - (compressedSize / originalSize) * 100))}%</p>}
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
                    downloadText="Download Compressed JPG"
                 />
                  
                 <MessageDisplay message={message} />
            </div>
        </div>
    );
};