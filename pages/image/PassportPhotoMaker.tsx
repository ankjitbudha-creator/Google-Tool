import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { ActionButtons, MessageDisplay } from './shared/ImageToolControls';
import { DocumentDuplicateIcon } from '../../components/Icons';

// ... (constants and interfaces remain the same)
interface Crop { x: number; y: number; width: number; height: number; }
type ResizingCorner = 'tl' | 'tr' | 'bl' | 'br' | null;
const PRESET_SIZES: { [key: string]: { width: number; height: number; unit: 'cm' | 'in' } } = {
    '3.5cm x 4.5cm': { width: 3.5, height: 4.5, unit: 'cm' },
    '2in x 2in': { width: 2, height: 2, unit: 'in' },
};
const DPI = 300;
const HANDLE_SIZE = 10;
const MIN_CROP_SIZE = 30;


export const PassportPhotoMaker: React.FC = () => {
    const [crop, setCrop] = useState<Crop>({ x: 50, y: 50, width: 200, height: 250 });
    const [filters, setFilters] = useState({ brightness: 100, contrast: 100, saturation: 100 });
    const [bgColor, setBgColor] = useState('#ffffff');
    const [outputSize, setOutputSize] = useState('3.5cm x 4.5cm');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const interactionRef = useRef<{ isDragging?: boolean; isResizing?: ResizingCorner; startX: number; startY: number; startCrop: Crop; } | null>(null);

    const getAspectRatio = useCallback(() => {
        const preset = PRESET_SIZES[outputSize];
        return preset.width / preset.height;
    }, [outputSize]);

    const onImageLoad = useCallback((img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (canvas) {
            const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
            const hRatio = canvasWidth / img.width;
            const vRatio = canvasHeight / img.height;
            const ratio = Math.min(hRatio, vRatio) * 0.8;
            const initialWidth = img.width * ratio;
            const initialHeight = initialWidth / getAspectRatio();
            
            setCrop({
                width: initialWidth,
                height: initialHeight,
                x: (canvasWidth - initialWidth) / 2,
                y: (canvasHeight - initialHeight) / 2,
            });
        }
    }, [getAspectRatio]);
    
    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad);

    // ... (drawCanvas, mouse handlers, download logic remain the same, just remove state logic already in hook)
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
        ctx.save();
        ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);
        ctx.restore();

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        const finalCroppedCanvas = document.createElement('canvas');
        finalCroppedCanvas.width = crop.width;
        finalCroppedCanvas.height = crop.height;
        const finalCtx = finalCroppedCanvas.getContext('2d');

        if(finalCtx){
            finalCtx.fillStyle = bgColor;
            finalCtx.fillRect(0,0, crop.width, crop.height);
            finalCtx.save();
            finalCtx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;
            finalCtx.drawImage(canvas, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
            finalCtx.restore();
            ctx.drawImage(finalCroppedCanvas, crop.x, crop.y);
        }

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
        
        ctx.fillStyle = '#6366f1';
        const halfHandle = HANDLE_SIZE / 2;
        ctx.fillRect(crop.x - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);
        ctx.fillRect(crop.x + crop.width - halfHandle, crop.y + crop.height - halfHandle, HANDLE_SIZE, HANDLE_SIZE);

    }, [crop, filters, bgColor, imageRef]);

    useEffect(() => {
        if (imageSrc) drawCanvas();
    }, [imageSrc, drawCanvas]);

    useEffect(() => {
        if (!imageSrc) return;
        const aspectRatio = getAspectRatio();
        setCrop(c => {
            const newHeight = c.width / aspectRatio;
            return { ...c, height: newHeight };
        });
    }, [outputSize, imageSrc, getAspectRatio]);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        // ...
        const { offsetX, offsetY } = e.nativeEvent;
        const getResizingCorner = (): ResizingCorner => {
            const { offsetX: x, offsetY: y } = e.nativeEvent;
            const handleArea = HANDLE_SIZE * 1.5;
            if (x > crop.x - handleArea / 2 && x < crop.x + handleArea / 2 && y > crop.y - handleArea / 2 && y < crop.y + handleArea / 2) return 'tl';
            if (x > crop.x + crop.width - handleArea / 2 && x < crop.x + crop.width + handleArea / 2 && y > crop.y - handleArea / 2 && y < crop.y + handleArea / 2) return 'tr';
            if (x > crop.x - handleArea / 2 && x < crop.x + handleArea / 2 && y > crop.y + crop.height - handleArea / 2 && y < crop.y + crop.height + handleArea / 2) return 'bl';
            if (x > crop.x + crop.width - handleArea / 2 && x < crop.x + crop.width + handleArea / 2 && y > crop.y + crop.height - handleArea / 2 && y < crop.y + crop.height + handleArea / 2) return 'br';
            return null;
        };
        const resizingCorner = getResizingCorner();
        
        const isDragging = offsetX > crop.x && offsetX < crop.x + crop.width && offsetY > crop.y && offsetY < crop.y + crop.height && !resizingCorner;
        
        if(resizingCorner || isDragging) {
            interactionRef.current = { startX: offsetX, startY: offsetY, startCrop: { ...crop }, isResizing: resizingCorner, isDragging };
        }
    };
    
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        // ...
        if (!interactionRef.current) return;
        const { isDragging, isResizing, startX, startY, startCrop } = interactionRef.current;
        const { offsetX, offsetY } = e.nativeEvent;
        const dx = offsetX - startX;
        const dy = offsetY - startY;

        if (isDragging) {
            setCrop(c => ({ ...c, x: startCrop.x + dx, y: startCrop.y + dy }));
        } else if (isResizing) {
            let { x, y, width, height } = startCrop;
            const aspectRatio = getAspectRatio();
            
            if (isResizing.includes('r')) width += dx;
            if (isResizing.includes('l')) { width -= dx; x += dx; }
            if (isResizing.includes('b')) height += dy;
            if (isResizing.includes('t')) { height -= dy; y += dy; }
            
            if(isResizing === 'tl' || isResizing === 'br') {
                height = width / aspectRatio;
                if (isResizing === 'tl') y = startCrop.y + startCrop.height - height;
            } else if(isResizing === 'tr' || isResizing === 'bl') {
                height = width / aspectRatio;
                if (isResizing === 'tr') y = startCrop.y + startCrop.height - height;
            }

            if (width >= MIN_CROP_SIZE && height >= MIN_CROP_SIZE) {
                setCrop({ x, y, width, height });
            }
        }
    }, [getAspectRatio]);

    const handleMouseUp = () => { interactionRef.current = null; };

    const handleDownload = async (sheetType: 'single' | 'A4') => {
        //...
        const image = imageRef.current;
        const canvas = canvasRef.current;
        if (!image.src || !canvas) return;
        
        const preset = PRESET_SIZES[outputSize];
        const toPixels = (value: number, unit: 'cm' | 'in') => (unit === 'cm' ? (value / 2.54) * DPI : value * DPI);
        const finalWidth = Math.round(toPixels(preset.width, preset.unit));
        const finalHeight = Math.round(toPixels(preset.height, preset.unit));

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = finalWidth;
        finalCanvas.height = finalHeight;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%)`;

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

        ctx.drawImage(
            image,
            (crop.x - offsetX) * scaleX,
            (crop.y - offsetY) * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0, 0, finalWidth, finalHeight
        );
        
        const token = Math.random().toString(36).substring(2, 8);
        const link = document.createElement('a');
        const action = sheetType === 'single' ? 'passport' : 'passport-sheet';

        if (sheetType === 'single') {
            link.download = `BabalTools-${originalFileName}-${action}-${token}.png`;
            link.href = finalCanvas.toDataURL('image/png');
            link.click();
        } else {
            const a4WidthInches = 8.27;
            const a4HeightInches = 11.69;
            const sheetCanvas = document.createElement('canvas');
            sheetCanvas.width = Math.round(a4WidthInches * DPI);
            sheetCanvas.height = Math.round(a4HeightInches * DPI);
            const sheetCtx = sheetCanvas.getContext('2d');
            if (!sheetCtx) return;

            sheetCtx.fillStyle = 'white';
            sheetCtx.fillRect(0, 0, sheetCanvas.width, sheetCanvas.height);
            
            const margin = 0.2 * DPI;
            const spacing = 0.1 * DPI;
            let x = margin;
            let y = margin;

            while (y + finalHeight + margin <= sheetCanvas.height) {
                while (x + finalWidth + margin <= sheetCanvas.width) {
                    sheetCtx.drawImage(finalCanvas, x, y);
                    x += finalWidth + spacing;
                }
                x = margin;
                y += finalHeight + spacing;
            }
            link.download = `BabalTools-${originalFileName}-${action}-${token}.png`;
            link.href = sheetCanvas.toDataURL('image/png');
            link.click();
        }
        setMessage({ type: 'success', text: `Downloaded ${sheetType} photo(s)!`});
    };

    const handleReset = () => {
        baseHandleReset(() => {
            setFilters({ brightness: 100, contrast: 100, saturation: 100 });
            setBgColor('#ffffff');
        });
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
                promptText="Upload Your Photo"
           >
                <canvas ref={canvasRef} className="w-full h-full" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} />
           </ImageDropzone>
           
           <div className="md:col-span-1 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm space-y-4 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-lg border-b dark:border-slate-600 pb-2 mb-3">Controls</h3>
                    <div>
                        <label className="text-sm font-medium">Output Size:</label>
                        <select value={outputSize} onChange={(e) => setOutputSize(e.target.value)} className="w-full p-2 mt-1 border rounded-md dark:bg-slate-700 dark:border-slate-600 focus:ring-primary focus:border-primary">
                            {Object.keys(PRESET_SIZES).map(key => <option key={key} value={key}>{key}</option>)}
                        </select>
                    </div>
                     <div className="space-y-3 pt-2">
                        <div>
                            <label className="text-sm font-medium">Brightness: {filters.brightness-100}</label>
                            <input type="range" min="0" max="200" value={filters.brightness} onChange={e => setFilters(f => ({...f, brightness: Number(e.target.value)}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Contrast: {filters.contrast-100}</label>
                            <input type="range" min="0" max="200" value={filters.contrast} onChange={e => setFilters(f => ({...f, contrast: Number(e.target.value)}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Saturation: {filters.saturation-100}</label>
                            <input type="range" min="0" max="200" value={filters.saturation} onChange={e => setFilters(f => ({...f, saturation: Number(e.target.value)}))} className="w-full accent-primary" disabled={!imageSrc} />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Background Color:</label>
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full mt-1 h-10 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600" disabled={!imageSrc} />
                    </div>
                </div>

                <ActionButtons 
                    onDownload={() => {}} // dummy, buttons are custom here
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                >
                    <button onClick={() => handleDownload('single')} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                       <DocumentDuplicateIcon className="w-5 h-5" /> Download Single
                    </button>
                    <button onClick={() => handleDownload('A4')} disabled={!imageSrc} className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                       <DocumentDuplicateIcon className="w-5 h-5" /> Download A4 Sheet
                    </button>
                </ActionButtons>

                <MessageDisplay message={message} />
           </div>
       </div>
   );
};