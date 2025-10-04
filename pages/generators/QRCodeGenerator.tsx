import React, { useState, useEffect, useRef } from 'react';

declare var QRCode: any;

export const QRCodeGenerator: React.FC = () => {
    const [text, setText] = useState('https://babal.tools');
    const [fgColor, setFgColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
    const [error, setError] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && text) {
            QRCode.toCanvas(canvasRef.current, text, {
                width: 300,
                margin: 2,
                color: {
                    dark: fgColor,
                    light: bgColor,
                },
                errorCorrectionLevel: errorCorrectionLevel as any,
            }, (err: Error | null) => {
                if (err) setError(err.message);
                else setError('');
            });
        }
    }, [text, fgColor, bgColor, errorCorrectionLevel]);

    const handleDownload = () => {
        if (canvasRef.current && text && !error) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = canvasRef.current.toDataURL('image/png');
            link.click();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <textarea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter URL or text to encode"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Foreground Color</label>
                        <input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full h-10 p-1 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background Color</label>
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-10 p-1 border rounded-md" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Error Correction</label>
                        <select value={errorCorrectionLevel} onChange={e => setErrorCorrectionLevel(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                            <option value="L">Low</option>
                            <option value="M">Medium</option>
                            <option value="Q">Quartile</option>
                            <option value="H">High</option>
                        </select>
                    </div>
                </div>
                 <button onClick={handleDownload} disabled={!text || !!error} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition disabled:opacity-50">
                    Download QR Code
                </button>
                 {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg">
                <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
        </div>
    );
};