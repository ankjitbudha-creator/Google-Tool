import React, { useState, useCallback, useEffect } from 'react';
import { useImageHandler } from './useImageHandler';
import { ImageDropzone } from './ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons } from './ImageToolControls';
import { Spinner } from '../../../components/Spinner';

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

interface TargetedJPGCompressorProps {
    targetSizeKB: number;
    toolName: string;
}

export const TargetedJPGCompressor: React.FC<TargetedJPGCompressorProps> = ({ targetSizeKB, toolName }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const targetSizeBytes = targetSizeKB * 1024;

    const onImageLoad = useCallback(async (img: HTMLImageElement, file: File) => {
        setOriginalSize(file.size);
        setIsProcessing(true);
        setMessage(null);
        
        try {
            const compressedBlob = await compressImage(img, targetSizeBytes);
            if (compressedBlob) {
                if (resultUrl) URL.revokeObjectURL(resultUrl);
                setResultUrl(URL.createObjectURL(compressedBlob));
                setCompressedSize(compressedBlob.size);
                setMessage({ type: 'success', text: 'Compression successful!' });
            } else {
                 setMessage({ type: 'error', text: `Could not compress image to be under ${targetSizeKB}KB.` });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An error occurred during compression.' });
        } finally {
            setIsProcessing(false);
        }

    }, [targetSizeBytes, resultUrl]);

    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad, { acceptedFormats: ['image/jpeg'], maxSizeMB: 10 });

    const getBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> => {
        return new Promise(resolve => {
            canvas.toBlob(blob => resolve(blob), 'image/jpeg', quality);
        });
    }

    const compressImage = async (image: HTMLImageElement, targetBytes: number): Promise<Blob | null> => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.drawImage(image, 0, 0);

        let low = 0;
        let high = 1;
        let bestBlob: Blob | null = null;
        
        // Check if max quality is already under target
        const maxQualityBlob = await getBlob(canvas, 1.0);
        if (maxQualityBlob && maxQualityBlob.size < targetBytes) {
            return maxQualityBlob;
        }
        
        // Binary search for the best quality
        for (let i = 0; i < 10; i++) {
            const mid = (low + high) / 2;
            const blob = await getBlob(canvas, mid);
            if (blob && blob.size <= targetBytes) {
                bestBlob = blob;
                low = mid;
            } else {
                high = mid;
            }
        }
        
        return bestBlob;
    };
    
    const handleDownload = () => {
        if (!resultUrl) {
            setMessage({ type: 'error', text: 'No compressed image to download.' });
            return;
        };
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-compressed-${targetSizeKB}kb-${token}.jpg`;
        link.href = resultUrl;
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
      baseHandleReset(() => {
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(null);
        setOriginalSize(0);
        setCompressedSize(0);
        setIsProcessing(false);
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
                {isProcessing ? <Spinner text="Compressing..." /> : 
                    <img src={resultUrl || imageSrc!} alt="Preview" className="w-full h-full object-contain" />
                }
            </ImageDropzone>

            <div className="md:col-span-1 space-y-4">
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
                    downloadText={`Download (${targetSizeKB}kb)`}
                 />
                  
                 <MessageDisplay message={message} />
            </div>
        </div>
    );
};
