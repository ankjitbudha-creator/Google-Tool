import React, { useState, useEffect, useRef } from 'react';

declare var JsBarcode: any;

const barcodeFormats = [
    "CODE128", "CODE128A", "CODE128B", "CODE128C",
    "EAN13", "EAN8", "EAN5", "EAN2",
    "UPC", "CODE39", "ITF14", "MSI", "pharmacode",
];

export const BarcodeGenerator: React.FC = () => {
    const [value, setValue] = useState('BabalTools');
    const [format, setFormat] = useState('CODE128');
    const [lineColor, setLineColor] = useState('#000000');
    const [width, setWidth] = useState(2);
    const [height, setHeight] = useState(100);
    const [displayValue, setDisplayValue] = useState(true);
    const [error, setError] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            try {
                JsBarcode(canvasRef.current, value, {
                    format: format,
                    lineColor: lineColor,
                    width: width,
                    height: height,
                    displayValue: displayValue,
                    font: "monospace",
                });
                setError('');
            } catch (e: any) {
                setError(e.message);
                // Clear canvas on error
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx?.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [value, format, lineColor, width, height, displayValue]);

    const handleDownload = () => {
        if (canvasRef.current && !error) {
            const link = document.createElement('a');
            link.download = `barcode-${value}.png`;
            link.href = canvasRef.current.toDataURL("image/png");
            link.click();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
                 <div>
                    <label className="block text-sm font-medium mb-1">Value</label>
                    <input type="text" value={value} onChange={e => setValue(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Format</label>
                    <select value={format} onChange={e => setFormat(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                        {barcodeFormats.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Line Color</label>
                    <input type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} className="w-full h-10 p-1 border rounded-md" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Bar Width: {width}px</label>
                    <input type="range" min="1" max="4" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Height: {height}px</label>
                    <input type="range" min="20" max="150" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full" />
                </div>
                 <div className="flex items-center">
                    <input type="checkbox" checked={displayValue} onChange={e => setDisplayValue(e.target.checked)} id="displayValue" className="h-4 w-4 rounded text-primary focus:ring-primary"/>
                    <label htmlFor="displayValue" className="ml-2 text-sm">Display Value</label>
                </div>
                <button onClick={handleDownload} disabled={!!error} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition disabled:opacity-50">
                    Download Barcode
                </button>
            </div>
            <div className="md:col-span-2 flex flex-col items-center justify-center bg-white p-4 rounded-lg">
                <canvas ref={canvasRef} className="max-w-full" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};
