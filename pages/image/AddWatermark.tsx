import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageHandler } from './shared/useImageHandler';
import { ImageDropzone } from './shared/ImageDropzone';
import { FileNameDisplay, MessageDisplay, ActionButtons } from './shared/ImageToolControls';

interface Watermark {
    type: 'text' | 'image';
    content: string; // Text content or image src
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    color: string;
    font: string;
    fontSize: number;
    shadow: {
        enabled: boolean;
        color: string;
        blur: number;
        offsetX: number;
        offsetY: number;
    };
    outline: {
        enabled: boolean;
        color: string;
        width: number;
    };
    gradient: {
        enabled: boolean;
        color1: string;
        color2: string;
        direction: 'vertical' | 'horizontal';
    };
}

export const AddWatermark: React.FC = () => {
    const [watermark, setWatermark] = useState<Watermark>({
        type: 'text', content: 'BabalTools', x: 150, y: 150,
        width: 150, height: 20, rotation: -25, opacity: 0.5,
        color: '#ffffff', font: 'Arial', fontSize: 48,
        shadow: { enabled: false, color: '#000000', blur: 5, offsetX: 5, offsetY: 5 },
        outline: { enabled: false, color: '#000000', width: 2 },
        gradient: { enabled: false, color1: '#ffffff', color2: '#808080', direction: 'vertical' },
    });
    const [isTiled, setIsTiled] = useState(false);
    
    const watermarkImageRef = useRef<HTMLImageElement>(new Image());
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onImageLoad = () => { draw(); };
    const { 
        imageSrc, imageRef, originalFileName, message, setMessage, 
        isDraggingOver, handleFileChange: baseHandleFileChange, handleReset: baseHandleReset, 
        handleDragOver, handleDragLeave, handleDrop 
    } = useImageHandler(onImageLoad);

    const handleWatermarkFileChange = (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Watermark must be a valid image file.' });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                watermarkImageRef.current.onload = () => {
                     const aspect = watermarkImageRef.current.height / watermarkImageRef.current.width;
                    const newWidth = 150;
                    const newHeight = newWidth * aspect;
                    setWatermark(w => ({ ...w, type: 'image', content: result, width: newWidth, height: newHeight }));
                };
                watermarkImageRef.current.src = result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    const drawWatermarkOnContext = (ctx: CanvasRenderingContext2D, wm: Omit<Watermark, 'x'|'y'>, centered = true) => {
        if (wm.type === 'text') {
            // Apply Shadow
            if (wm.shadow.enabled) {
                ctx.shadowColor = wm.shadow.color;
                ctx.shadowBlur = wm.shadow.blur;
                ctx.shadowOffsetX = wm.shadow.offsetX;
                ctx.shadowOffsetY = wm.shadow.offsetY;
            }

            // Apply Fill (Gradient or Solid)
            if (wm.gradient.enabled) {
                let gradient;
                if (wm.gradient.direction === 'vertical') {
                    gradient = ctx.createLinearGradient(0, -wm.height / 2, 0, wm.height / 2);
                } else { // horizontal
                    gradient = ctx.createLinearGradient(-wm.width / 2, 0, wm.width / 2, 0);
                }
                gradient.addColorStop(0, wm.gradient.color1);
                gradient.addColorStop(1, wm.gradient.color2);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = wm.color;
            }

            ctx.font = `${wm.fontSize}px ${wm.font}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(wm.content, 0, 0);
            
            // Reset Shadow before drawing outline
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Apply Outline
            if (wm.outline.enabled) {
                ctx.strokeStyle = wm.outline.color;
                ctx.lineWidth = wm.outline.width;
                ctx.strokeText(wm.content, 0, 0);
            }
        } else if (wm.type === 'image' && watermarkImageRef.current.src) {
            const drawX = centered ? -wm.width / 2 : 0;
            const drawY = centered ? -wm.height / 2 : 0;
            ctx.drawImage(watermarkImageRef.current, drawX, drawY, wm.width, wm.height);
        }
    };

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const image = imageRef.current;
        if (!canvas || !ctx || !image.src) return;

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
        
        const offsetX = (canvas.width - scaledWidth) / 2;
        const offsetY = (canvas.height - scaledHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, offsetX, offsetY, scaledWidth, scaledHeight);

        if (isTiled) {
            ctx.save();
            ctx.globalAlpha = watermark.opacity;
            const patternCanvas = document.createElement('canvas');
            const patternCtx = patternCanvas.getContext('2d');
            const spacing = 100;
            const diagonal = Math.sqrt(watermark.width ** 2 + watermark.height ** 2);
            patternCanvas.width = diagonal + spacing;
            patternCanvas.height = diagonal + spacing;
            if(patternCtx) {
                patternCtx.translate(patternCanvas.width / 2, patternCanvas.height / 2);
                patternCtx.rotate(watermark.rotation * Math.PI / 180);
                drawWatermarkOnContext(patternCtx, watermark);
                const pattern = ctx.createPattern(patternCanvas, 'repeat');
                if(pattern) {
                    ctx.fillStyle = pattern;
                    ctx.fillRect(offsetX, offsetY, scaledWidth, scaledHeight);
                }
            }
            ctx.restore();
        } else {
            ctx.save();
            ctx.globalAlpha = watermark.opacity;
            ctx.translate(watermark.x + watermark.width / 2, watermark.y + watermark.height / 2);
            ctx.rotate(watermark.rotation * Math.PI / 180);
            
            drawWatermarkOnContext(ctx, watermark);

            ctx.restore();
        }
    }, [watermark, isTiled, imageRef]);
    
    useEffect(() => {
        if (watermark.type === 'text') {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.font = `${watermark.fontSize}px ${watermark.font}`;
                const textMetrics = ctx.measureText(watermark.content);
                setWatermark(w => ({
                    ...w,
                    width: textMetrics.width,
                    height: watermark.fontSize,
                }));
            }
        }
    }, [watermark.content, watermark.fontSize, watermark.font, watermark.type]);


    useEffect(() => {
        if (imageSrc) draw();
    }, [imageSrc, draw]);

    const handleDownload = () => {
        const image = imageRef.current;
        if (!image.src) return;

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = image.width;
        finalCanvas.height = image.height;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(image, 0, 0);

        const canvas = canvasRef.current!;
        const { width: canvasWidth, height: canvasHeight } = canvas.getBoundingClientRect();
        const hRatio = canvasWidth / image.width;
        const vRatio = canvasHeight / image.height;
        const ratio = Math.min(hRatio, vRatio);
        const scale = 1 / ratio;

        const scaledWatermark = {
            ...watermark,
            width: watermark.width * scale,
            height: watermark.height * scale,
            fontSize: watermark.fontSize * scale,
            shadow: {
                ...watermark.shadow,
                blur: watermark.shadow.blur * scale,
                offsetX: watermark.shadow.offsetX * scale,
                offsetY: watermark.shadow.offsetY * scale,
            },
            outline: {
                ...watermark.outline,
                width: watermark.outline.width * scale,
            },
        };

        if (isTiled) {
            ctx.save();
            ctx.globalAlpha = scaledWatermark.opacity;
            const patternCanvas = document.createElement('canvas');
            const patternCtx = patternCanvas.getContext('2d');
            const spacing = 100 * scale;
            const diagonal = Math.sqrt(scaledWatermark.width ** 2 + scaledWatermark.height ** 2);
            patternCanvas.width = diagonal + spacing;
            patternCanvas.height = diagonal + spacing;

            if (patternCtx) {
                patternCtx.translate(patternCanvas.width / 2, patternCanvas.height / 2);
                patternCtx.rotate(scaledWatermark.rotation * Math.PI / 180);
                drawWatermarkOnContext(patternCtx, scaledWatermark);
                const pattern = ctx.createPattern(patternCanvas, 'repeat');
                if (pattern) {
                    ctx.fillStyle = pattern;
                    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);
                }
            }
            ctx.restore();
        } else {
            const scaledWidthOnPreview = image.width * ratio;
            const scaledHeightOnPreview = image.height * ratio;
            const offsetXOnPreview = (canvas.width - scaledWidthOnPreview) / 2;
            const offsetYOnPreview = (canvas.height - scaledHeightOnPreview) / 2;

            const finalX = (watermark.x - offsetXOnPreview) * scale;
            const finalY = (watermark.y - offsetYOnPreview) * scale;
            
            ctx.save();
            ctx.globalAlpha = scaledWatermark.opacity;
            ctx.translate(finalX + scaledWatermark.width / 2, finalY + scaledWatermark.height / 2);
            ctx.rotate(scaledWatermark.rotation * Math.PI / 180);
            
            drawWatermarkOnContext(ctx, scaledWatermark);
            
            ctx.restore();
        }
        
        const link = document.createElement('a');
        const token = Math.random().toString(36).substring(2, 8);
        link.download = `BabalTools-${originalFileName}-watermarked-${token}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();
        setMessage({ type: 'success', text: 'Downloaded watermarked image!'});
    };
    
    const handleReset = () => {
        baseHandleReset(() => {
            setWatermark({
                type: 'text', content: 'BabalTools', x: 150, y: 150,
                width: 150, height: 20, rotation: -25, opacity: 0.5,
                color: '#ffffff', font: 'Arial', fontSize: 48,
                shadow: { enabled: false, color: '#000000', blur: 5, offsetX: 5, offsetY: 5 },
                outline: { enabled: false, color: '#000000', width: 2 },
                gradient: { enabled: false, color1: '#ffffff', color2: '#808080', direction: 'vertical' },
            });
            setIsTiled(false);
            watermarkImageRef.current.src = '';
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
                onFileChange={baseHandleFileChange}
            >
                <canvas ref={canvasRef} className="w-full h-full object-contain cursor-move" />
            </ImageDropzone>
            <div className="md:col-span-1 space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm space-y-4 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-lg border-b dark:border-slate-600 pb-2 mb-3">Watermark Controls</h3>
                    
                    <div className="flex bg-gray-200 dark:bg-slate-900/50 rounded-lg p-1">
                        <button onClick={() => setWatermark(w => ({...w, type: 'text'}))} className={`w-full py-1.5 rounded-md text-sm font-medium transition ${watermark.type === 'text' ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                            Text
                        </button>
                        <button onClick={() => setWatermark(w => ({...w, type: 'image'}))} className={`w-full py-1.5 rounded-md text-sm font-medium transition ${watermark.type === 'image' ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                            Image
                        </button>
                    </div>

                    {watermark.type === 'text' && (
                        <div className="space-y-3 animate-fade-in">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
                                <input 
                                    type="text" 
                                    value={watermark.content} 
                                    onChange={e => setWatermark(w => ({...w, content: e.target.value}))} 
                                    className="w-full mt-1 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font</label>
                                    <select value={watermark.font} onChange={e => setWatermark(w => ({...w, font: e.target.value}))} className="w-full mt-1 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600">
                                        <option>Arial</option>
                                        <option>Verdana</option>
                                        <option>Times New Roman</option>
                                        <option>Courier New</option>
                                        <option>Georgia</option>
                                        <option>Impact</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                                    <input type="number" value={watermark.fontSize} onChange={e => setWatermark(w => ({...w, fontSize: Number(e.target.value)}))} className="w-full mt-1 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
                                <div className="flex items-center gap-2 mt-1">
                                    <input 
                                        type="color" 
                                        value={watermark.color} 
                                        onChange={e => setWatermark(w => ({...w, color: e.target.value}))} 
                                        className="w-10 h-10 p-1 border rounded-md dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                                        disabled={watermark.gradient.enabled}
                                    />
                                    <input 
                                        type="text" 
                                        value={watermark.color}
                                        onChange={e => setWatermark(w => ({...w, color: e.target.value}))}
                                        className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 font-mono disabled:opacity-50"
                                        placeholder="#ffffff"
                                        disabled={watermark.gradient.enabled}
                                    />
                                </div>
                            </div>
                            {/* Effects Section */}
                            <div className="space-y-3 pt-3 border-t dark:border-slate-600">
                                <h4 className="font-semibold text-gray-800 dark:text-white">Effects</h4>
                                {/* Shadow */}
                                <div className="p-2 border rounded-md dark:border-slate-600/50 space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={watermark.shadow.enabled} onChange={e => setWatermark(w => ({...w, shadow: {...w.shadow, enabled: e.target.checked}}))} className="h-4 w-4 rounded text-primary"/><span>Shadow</span></label>
                                    {watermark.shadow.enabled && <div className="space-y-2 pl-6 animate-fade-in"><input type="color" value={watermark.shadow.color} onChange={e => setWatermark(w => ({...w, shadow: {...w.shadow, color: e.target.value}}))} className="w-full h-8 p-1"/><div><label className="text-xs">Blur: {watermark.shadow.blur}</label><input type="range" min="0" max="50" value={watermark.shadow.blur} onChange={e => setWatermark(w => ({...w, shadow: {...w.shadow, blur: +e.target.value}}))} className="w-full"/></div><div><label className="text-xs">Offset X: {watermark.shadow.offsetX}</label><input type="range" min="-50" max="50" value={watermark.shadow.offsetX} onChange={e => setWatermark(w => ({...w, shadow: {...w.shadow, offsetX: +e.target.value}}))} className="w-full"/></div><div><label className="text-xs">Offset Y: {watermark.shadow.offsetY}</label><input type="range" min="-50" max="50" value={watermark.shadow.offsetY} onChange={e => setWatermark(w => ({...w, shadow: {...w.shadow, offsetY: +e.target.value}}))} className="w-full"/></div></div>}
                                </div>
                                {/* Outline */}
                                <div className="p-2 border rounded-md dark:border-slate-600/50 space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={watermark.outline.enabled} onChange={e => setWatermark(w => ({...w, outline: {...w.outline, enabled: e.target.checked}}))} className="h-4 w-4 rounded text-primary"/><span>Outline</span></label>
                                    {watermark.outline.enabled && <div className="space-y-2 pl-6 animate-fade-in"><input type="color" value={watermark.outline.color} onChange={e => setWatermark(w => ({...w, outline: {...w.outline, color: e.target.value}}))} className="w-full h-8 p-1"/><div><label className="text-xs">Width: {watermark.outline.width}</label><input type="range" min="1" max="20" value={watermark.outline.width} onChange={e => setWatermark(w => ({...w, outline: {...w.outline, width: +e.target.value}}))} className="w-full"/></div></div>}
                                </div>
                                {/* Gradient */}
                                <div className="p-2 border rounded-md dark:border-slate-600/50 space-y-2">
                                    <label className="flex items-center space-x-2 cursor-pointer"><input type="checkbox" checked={watermark.gradient.enabled} onChange={e => setWatermark(w => ({...w, gradient: {...w.gradient, enabled: e.target.checked}}))} className="h-4 w-4 rounded text-primary"/><span>Gradient</span></label>
                                    {watermark.gradient.enabled && <div className="space-y-2 pl-6 animate-fade-in"><div><label className="text-xs">Color 1</label><input type="color" value={watermark.gradient.color1} onChange={e => setWatermark(w => ({...w, gradient: {...w.gradient, color1: e.target.value}}))} className="w-full h-8 p-1"/></div><div><label className="text-xs">Color 2</label><input type="color" value={watermark.gradient.color2} onChange={e => setWatermark(w => ({...w, gradient: {...w.gradient, color2: e.target.value}}))} className="w-full h-8 p-1"/></div><div><label className="text-xs">Direction</label><div className="flex gap-2 text-xs"><label><input type="radio" name="grad-dir" checked={watermark.gradient.direction === 'vertical'} onChange={() => setWatermark(w => ({...w, gradient: {...w.gradient, direction: 'vertical'}}))}/> Vertical</label><label><input type="radio" name="grad-dir" checked={watermark.gradient.direction === 'horizontal'} onChange={() => setWatermark(w => ({...w, gradient: {...w.gradient, direction: 'horizontal'}}))}/> Horizontal</label></div></div></div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {watermark.type === 'image' && (
                        <div className="animate-fade-in">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload Logo</label>
                            <input type="file" accept="image/*" onChange={e => handleWatermarkFileChange(e.target.files)} className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-primary hover:file:bg-indigo-100" />
                        </div>
                    )}

                    <div className="space-y-3 pt-3 border-t dark:border-slate-600">
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Opacity</label>
                            <div className="flex items-center gap-3 mt-1">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="1" 
                                    step="0.01" 
                                    value={watermark.opacity} 
                                    onChange={e => setWatermark(w => ({...w, opacity: Number(e.target.value)}))} 
                                    className="w-full accent-primary"
                                />
                                <div className="relative flex-shrink-0">
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="100"
                                        value={Math.round(watermark.opacity * 100)} 
                                        onChange={e => {
                                            const val = Number(e.target.value);
                                            if (val >= 0 && val <= 100) {
                                                setWatermark(w => ({...w, opacity: val / 100}));
                                            }
                                        }} 
                                        className="w-20 p-2 pr-6 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-slate-700" 
                                    />
                                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">%</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rotation: {watermark.rotation}°</label>
                            <input type="range" min="-180" max="180" value={watermark.rotation} onChange={e => setWatermark(w => ({...w, rotation: Number(e.target.value)}))} className="w-full accent-primary" />
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="tile-checkbox" checked={isTiled} onChange={e => setIsTiled(e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                            <label htmlFor="tile-checkbox" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Tile Watermark</label>
                        </div>
                    </div>
                </div>
                 <FileNameDisplay fileName={originalFileName} />
                 <ActionButtons 
                    onDownload={handleDownload}
                    onReset={handleReset}
                    isImageLoaded={!!imageSrc}
                    downloadText="Download Watermarked"
                />
                 <MessageDisplay message={message} />
            </div>
        </div>
    );
};