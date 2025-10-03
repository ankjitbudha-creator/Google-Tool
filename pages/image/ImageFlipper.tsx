import React, { useState, useRef, DragEvent, useEffect } from 'react';
import { ArrowUpTrayIcon, ArrowPathIcon, DocumentDuplicateIcon, ArrowsRightLeftIcon, ArrowsUpDownIcon } from '../../components/Icons';

export const ImageFlipper: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('image');
    
    const [flipHorizontal, setFlipHorizontal] = useState(false);
    const [flipVertical, setFlipVertical] = useState(false);

    const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    
    const imageRef = useRef<HTMLImageElement>(new Image());
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;
        if (!canvas || !ctx || !image.src) {
            // Clear canvas if no image
            if(canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        };

        const draw = () => {
            const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const hRatio = canvasWidth / image.width;
            const vRatio = canvasHeight / image.height;
            const ratio = Math.min(hRatio, vRatio);
            const scaledWidth = image.width * ratio;
            const scaledHeight = image.height * ratio;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.save();
            
            const scaleH = flipHorizontal ? -1 : 1;
            const scaleV = flipVertical ? -1 : 1;
            
            ctx.translate(canvasWidth / 2, canvasHeight / 2);
            ctx.scale(scaleH, scaleV);
            
            ctx.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
            
            ctx.restore();
        }

        if (image.complete) {
            draw();
        } else {
            image.onload = draw;
        }
    }, [imageSrc, flipHorizontal, flipVertical]);


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
                imageRef.current.src = e.target?.result as string;
                setImageSrc(e.target?.result as string);
                setFlipHorizontal(false);
                setFlipVertical(false);
            };
            reader.readAsDataURL(file);
            setMessage(null);
        }
    };
    
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
      setImageSrc(null);
      imageRef.current.src = '';
      setOriginalFileName('image');
      setFlipHorizontal(false);
      setFlipVertical(false);
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
            <div className="md:col-span-2 relative min-h-[400px] md:min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center p-4">
                {imageSrc ? (
                     <canvas
                        ref={canvasRef}
                        className="max-w-full max-h-full object-contain"
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

                {originalFileName !== 'image' && (
                    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm">
                        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Selected File</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{originalFileName}</p>
                    </div>
                 )}
                 <div className="space-y-2">
                     <button onClick={handleDownload} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        <DocumentDuplicateIcon className="w-5 h-5" />
                        Download Flipped Image
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