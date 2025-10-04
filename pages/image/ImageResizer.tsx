import React, { useState, useRef, DragEvent, ChangeEvent, useMemo } from 'react';
import { ArrowUpTrayIcon, ArrowPathIcon, DocumentDuplicateIcon, LockClosedIcon, LockOpenIcon } from '../../components/Icons';

export const ImageResizer: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [originalImageSize, setOriginalImageSize] = useState<{ width: number, height: number } | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('image');
    
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [keepAspectRatio, setKeepAspectRatio] = useState(true);
    const [scaleMode, setScaleMode] = useState<'pixels' | 'percent'>('pixels');

    const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    
    const imageRef = useRef<HTMLImageElement>(new Image());

    const scalePercent = useMemo(() => {
        if (!originalImageSize || !dimensions.width) return '';
        const numWidth = parseInt(dimensions.width, 10);
        if (isNaN(numWidth) || originalImageSize.width === 0) return '';
        
        return String(Math.round((numWidth / originalImageSize.width) * 100));
    }, [dimensions.width, originalImageSize]);

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
                    setDimensions({ width: String(img.width), height: String(img.height) });
                    setImageSrc(e.target?.result as string);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
            setMessage(null);
        }
    };
    
    const handleDimensionChange = (value: string, dimension: 'width' | 'height') => {
        if (!originalImageSize) return;
        const numValue = parseInt(value, 10);
      
        if (isNaN(numValue) || numValue < 0) {
          setDimensions(d => ({ ...d, [dimension]: value === '' ? '' : d[dimension] }));
          return;
        }
      
        if (keepAspectRatio) {
          if (dimension === 'width') {
            const newHeight = numValue > 0 ? Math.round(numValue * (originalImageSize.height / originalImageSize.width)) : 0;
            setDimensions({ width: String(numValue), height: String(newHeight) });
          } else { // dimension === 'height'
            const newWidth = numValue > 0 ? Math.round(numValue * (originalImageSize.width / originalImageSize.height)) : 0;
            setDimensions({ width: String(newWidth), height: String(numValue) });
          }
        } else {
          setDimensions(d => ({ ...d, [dimension]: String(numValue) }));
        }
    };
    
    const handlePercentChange = (value: string) => {
        if (!originalImageSize) return;
        let numValue = parseInt(value, 10);
      
        if (isNaN(numValue) || numValue < 0) {
          setDimensions({ width: '', height: '' });
          return;
        }

        if (numValue > 500) numValue = 500;
      
        // Percentage scaling implies aspect ratio is locked
        if (!keepAspectRatio) setKeepAspectRatio(true);
      
        const newWidth = Math.round(originalImageSize.width * (numValue / 100));
        const newHeight = Math.round(originalImageSize.height * (numValue / 100));
        setDimensions({ width: String(newWidth), height: String(newHeight) });
    };
    
    const handleToggleAspectRatio = () => {
        const isLocking = !keepAspectRatio;
        setKeepAspectRatio(isLocking);

        if (isLocking && originalImageSize && dimensions.width) {
            handleDimensionChange(dimensions.width, 'width');
        }
    };
    
    const handleScaleModeChange = (mode: 'pixels' | 'percent') => {
        setScaleMode(mode);
        if (mode === 'percent' && !keepAspectRatio) {
            setKeepAspectRatio(true);
        }
    };

    const handleResizeDownload = () => {
        const image = imageRef.current;
        const width = parseInt(dimensions.width, 10);
        const height = parseInt(dimensions.height, 10);

        if (!image.src || isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            setMessage({ type: 'error', text: 'Invalid dimensions for resizing.' });
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(image, 0, 0, width, height);
    
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-resized-${token}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Image downloaded successfully!' });
    };

    const handleReset = () => {
      setImageSrc(null);
      setOriginalImageSize(null);
      setOriginalFileName('image');
      setDimensions({ width: '', height: '' });
      setScaleMode('pixels');
      setKeepAspectRatio(true);
      setMessage(null);
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
            <div className="md:col-span-2 relative min-h-[400px] md:min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-4">
                {imageSrc ? (
                     <img
                        src={imageSrc}
                        alt="Image preview"
                        className="w-full h-full object-contain"
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
                 <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Scaling Method</label>
                        <div className="flex bg-gray-200 dark:bg-slate-900/50 rounded-lg p-1">
                            <button onClick={() => handleScaleModeChange('pixels')} className={`w-full py-1.5 rounded-md text-sm font-medium transition ${scaleMode === 'pixels' ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                By Dimensions
                            </button>
                            <button onClick={() => handleScaleModeChange('percent')} className={`w-full py-1.5 rounded-md text-sm font-medium transition ${scaleMode === 'percent' ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                By Percentage
                            </button>
                        </div>
                    </div>

                    {scaleMode === 'pixels' && (
                        <div className="space-y-4">
                            <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <label htmlFor="width" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Width (px)</label>
                                    <input type="number" id="width" value={dimensions.width} onChange={e => handleDimensionChange(e.target.value, 'width')} disabled={!imageSrc} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-slate-700 disabled:bg-gray-200 dark:disabled:bg-slate-800/50" />
                                </div>
                                <div className="flex-shrink-0 pb-1">
                                    <button onClick={handleToggleAspectRatio} disabled={!imageSrc} title="Toggle aspect ratio lock" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50">
                                        {keepAspectRatio ? <LockClosedIcon className="w-5 h-5 text-primary" /> : <LockOpenIcon className="w-5 h-5 text-gray-500" />}
                                    </button>
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="height" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Height (px)</label>
                                    <input type="number" id="height" value={dimensions.height} onChange={e => handleDimensionChange(e.target.value, 'height')} disabled={!imageSrc} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-slate-700 disabled:bg-gray-200 dark:disabled:bg-slate-800/50" />
                                </div>
                            </div>
                            {originalImageSize && (
                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 pt-1">Original: {originalImageSize.width} x {originalImageSize.height}px</p>
                            )}
                        </div>
                    )}

                    {scaleMode === 'percent' && (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="percent-slider" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Scale</label>
                                <div className="flex items-center gap-3">
                                    <input id="percent-slider" type="range" min="1" max="500" value={scalePercent || '100'} onChange={e => handlePercentChange(e.target.value)} disabled={!imageSrc} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary" />
                                    <div className="relative flex-shrink-0">
                                        <input type="number" value={scalePercent} onChange={e => handlePercentChange(e.target.value)} disabled={!imageSrc} className="w-20 p-2 pr-6 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-slate-700 disabled:bg-gray-200 dark:disabled:bg-slate-800/50" />
                                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">%</span>
                                    </div>
                                </div>
                            </div>
                            {imageSrc && (
                                <div className="text-center bg-gray-100 dark:bg-slate-900/50 p-2 rounded-md">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    New Dimensions: <span className="font-mono font-semibold">{dimensions.width} x {dimensions.height}px</span>
                                </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {originalFileName !== 'image' && (
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Selected File</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{originalFileName}</p>
                    </div>
                 )}
                 <div className="space-y-2">
                     <button onClick={handleResizeDownload} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <DocumentDuplicateIcon className="w-5 h-5" />
                        Resize & Download
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