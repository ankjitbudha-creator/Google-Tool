import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useImageHandler } from '../image/shared/useImageHandler';
import { ImageDropzone } from '../image/shared/ImageDropzone';
import { Spinner } from '../../components/Spinner';

declare var ZXingBrowser: any;

type ScanMode = 'camera' | 'file';

export const BarcodeScanner: React.FC = () => {
    const [scanMode, setScanMode] = useState<ScanMode>('camera');
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const codeReaderRef = useRef<any>(null);
    
    const onImageLoad = useCallback((img: HTMLImageElement) => {
        if (!codeReaderRef.current) {
            codeReaderRef.current = new ZXingBrowser.BrowserMultiFormatReader();
        }
        setError(null);
        setResult(null);
        codeReaderRef.current.decodeFromImageElement(img)
            .then((res: any) => setResult(res.getText()))
            .catch(() => setError('No barcode or QR code found in the image.'));
    }, []);

    // FIX: Destructure all required props from useImageHandler to pass them explicitly.
    const { imageSrc, handleFileChange, handleReset: resetImage, isDraggingOver, handleDragOver, handleDragLeave, handleDrop } = useImageHandler(onImageLoad);

    const stopScan = useCallback(() => {
        if (codeReaderRef.current) {
            codeReaderRef.current.reset();
        }
        setIsScanning(false);
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    }, []);

    useEffect(() => {
        // Initialize and list devices
        if (!codeReaderRef.current) {
             codeReaderRef.current = new ZXingBrowser.BrowserMultiFormatReader();
        }
        ZXingBrowser.BrowserCodeReader.listVideoInputDevices()
            .then((devices: MediaDeviceInfo[]) => {
                setVideoDevices(devices);
                if (devices.length > 0 && !selectedDeviceId) {
                    setSelectedDeviceId(devices[0].deviceId);
                }
            })
            .catch(() => setError("Could not access camera devices."));
        
        // Cleanup on unmount
        return () => stopScan();
    }, [stopScan, selectedDeviceId]);

    const startScan = useCallback(() => {
        if (!selectedDeviceId) {
            setError("No camera selected.");
            return;
        }
        setIsScanning(true);
        setError(null);
        setResult(null);
        
        codeReaderRef.current.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (res: any, err: any) => {
            if (res) {
                setResult(res.getText());
                stopScan();
            }
            if (err && !(err instanceof ZXingBrowser.NotFoundException)) {
                setError("Error while scanning.");
                stopScan();
            }
        });
    }, [selectedDeviceId, stopScan]);

    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    return (
        <div className="space-y-4">
            <div className="flex justify-center bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
                <button onClick={() => setScanMode('camera')} className={`w-full py-2 rounded-md transition ${scanMode === 'camera' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Scan with Camera</button>
                <button onClick={() => setScanMode('file')} className={`w-full py-2 rounded-md transition ${scanMode === 'file' ? 'bg-indigo-600 text-white' : 'text-gray-600 dark:text-gray-300'}`}>Scan from File</button>
            </div>
            
            {scanMode === 'camera' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <select
                            value={selectedDeviceId}
                            onChange={e => setSelectedDeviceId(e.target.value)}
                            className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            disabled={isScanning}
                        >
                            {videoDevices.map(device => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
                        </select>
                        {!isScanning ? (
                            <button onClick={startScan} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover" disabled={videoDevices.length === 0}>Start Scan</button>
                        ) : (
                            <button onClick={stopScan} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Stop Scan</button>
                        )}
                    </div>
                    <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
                        <video ref={videoRef} className="w-full h-full" />
                        {isScanning && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/2 border-2 border-red-500 opacity-50"/>}
                        {isScanning && !result && <Spinner text="Scanning..."/>}
                    </div>
                </div>
            )}
            
            {scanMode === 'file' && (
                 <ImageDropzone 
                    imageSrc={imageSrc} 
                    onFileChange={handleFileChange}
                    isDraggingOver={isDraggingOver}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <img src={imageSrc!} alt="Scan preview" className="w-full h-full object-contain" />
                </ImageDropzone>
            )}

            {error && <p className="text-red-500 text-center">{error}</p>}
            
            {result && (
                <div className="p-4 bg-green-100 dark:bg-green-900/80 rounded-lg space-y-2">
                    <h3 className="font-bold text-green-800 dark:text-green-200">Scan Result:</h3>
                    <p className="font-mono p-2 bg-white dark:bg-slate-800 rounded break-words">{result}</p>
                    <button onClick={handleCopy} className="w-full py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition">
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>
            )}
        </div>
    );
};