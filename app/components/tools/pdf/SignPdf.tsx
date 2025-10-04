
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Spinner } from '../../Spinner';
import { PencilIcon, ArrowUpTrayIcon } from '../../Icons';

declare var pdfjsLib: any;
declare var PDFLib: any;

interface Page {
    num: number;
    canvas: HTMLCanvasElement;
}

const SignaturePad: React.FC<{onSave: (dataUrl: string) => void; onCancel: () => void;}> = ({ onSave, onCancel }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }, []);

    const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const touch = (e as React.TouchEvent).touches?.[0];
        return {
            x: (touch ? touch.clientX : (e as React.MouseEvent).clientX) - rect.left,
            y: (touch ? touch.clientY : (e as React.MouseEvent).clientY) - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const { x, y } = getCoords(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!isDrawing) return;
        const { x, y } = getCoords(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    const stopDrawing = () => setIsDrawing(false);
    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (canvas) onSave(canvas.toDataURL('image/png'));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 space-y-2">
                <p>Draw your signature below:</p>
                <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} className="w-[400px] h-[200px] bg-gray-100 dark:bg-slate-700 border rounded"/>
                <div className="flex gap-2">
                    <button onClick={clear} className="w-full p-2 border rounded">Clear</button>
                    <button onClick={onCancel} className="w-full p-2 border rounded">Cancel</button>
                    <button onClick={handleSave} className="w-full p-2 bg-primary text-white rounded">Save Signature</button>
                </div>
            </div>
        </div>
    );
};

export const SignPdf: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<any[]>([]);
    const [activePageNum, setActivePageNum] = useState<number>(1);
    const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
    const [signaturePos, setSignaturePos] = useState<{ page: number, x: number, y: number, width: number, height: number } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const viewerRef = useRef<HTMLDivElement>(null);
    const signatureImageRef = useRef(new Image());

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        }
    }, []);
    
    useEffect(() => {
        if(signatureUrl) signatureImageRef.current.src = signatureUrl;
    }, [signatureUrl]);

    const handleFile = (selectedFile: File) => {
        if (selectedFile.type !== 'application/pdf') {
            setMessage('Please upload a valid PDF file.');
            return;
        }
        setFile(selectedFile);
        setMessage(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };
    const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => { e.preventDefault(); e.stopPropagation(); setIsDragging(isEntering); };
    const handleDrop = (e: React.DragEvent) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    const renderPages = useCallback(async () => {
        if (!file) return;
        setIsProcessing(true);
        setMessage('Loading PDF...');
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const pdf = await pdfjsLib.getDocument(e.target?.result).promise;
                setPages(Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)));
                setMessage(null);
            } catch (err) {
                console.error(err);
                setMessage('Error loading PDF. It might be corrupted or password-protected.');
            } finally {
                setIsProcessing(false);
            }
        };
        reader.readAsArrayBuffer(file);
    }, [file]);

    useEffect(() => {
        if(file) renderPages();
    }, [file, renderPages]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!signatureUrl) {
            setMessage("Please create a signature first.");
            return;
        }
        const canvas = e.currentTarget;
        const rect = canvas.getBoundingClientRect();
        const sigWidth = 100;
        const sigHeight = (sigWidth * signatureImageRef.current.height) / signatureImageRef.current.width;

        setSignaturePos({
            page: activePageNum,
            x: e.clientX - rect.left - sigWidth / 2,
            y: e.clientY - rect.top - sigHeight / 2,
            width: sigWidth,
            height: sigHeight,
        });
    };
    
    const handleDownload = async () => {
        if (!file || !signaturePos || !signatureUrl) {
            setMessage("Please upload a file and place a signature.");
            return;
        }
        setIsProcessing(true);
        setMessage("Applying signature and generating PDF...");
        try {
            const { PDFDocument } = PDFLib;
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
            const page = pdfDoc.getPages()[signaturePos.page - 1];
            
            const pngBytes = await fetch(signatureUrl).then(res => res.arrayBuffer());
            const pngImage = await pdfDoc.embedPng(pngBytes);
            
            const canvas = viewerRef.current?.querySelector('canvas');
            if(!canvas) throw new Error("Canvas not found");

            const scaleX = page.getWidth() / canvas.width;
            const scaleY = page.getHeight() / canvas.height;
            
            page.drawImage(pngImage, {
                x: signaturePos.x * scaleX,
                y: page.getHeight() - (signaturePos.y * scaleY) - (signaturePos.height * scaleY),
                width: signaturePos.width * scaleX,
                height: signaturePos.height * scaleY,
            });

            const newPdfBytes = await pdfDoc.save();
            const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `babaltools-signed-${file.name}`;
            link.click();
            URL.revokeObjectURL(link.href);
            setMessage("Signed PDF downloaded!");

        } catch(e) {
            console.error(e);
            setMessage("Error applying signature. The PDF might be write-protected or corrupted.");
        } finally {
            setIsProcessing(false);
        }
    };
    
    const PageViewer: React.FC<{pagePromise: Promise<any>}> = ({pagePromise}) => {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        useEffect(() => {
            const render = async () => {
                const page = await pagePromise;
                const canvas = canvasRef.current;
                const container = viewerRef.current;
                if(!page || !canvas || !container) return;
                
                const viewport = page.getViewport({ scale: 1.5 });
                const scaledViewport = page.getViewport({ scale: container.clientWidth / viewport.width });
                
                canvas.width = scaledViewport.width;
                canvas.height = scaledViewport.height;
                const context = canvas.getContext('2d');
                if(!context) return;
                
                await page.render({ canvasContext: context, viewport: scaledViewport }).promise;
                
                if (signaturePos && signaturePos.page === activePageNum) {
                    context.drawImage(signatureImageRef.current, signaturePos.x, signaturePos.y, signaturePos.width, signaturePos.height);
                }
            };
            render();
        }, [pagePromise, signaturePos]);
        return <canvas ref={canvasRef} onClick={handleCanvasClick} className="max-w-full border shadow-lg dark:border-slate-700 cursor-crosshair"/>
    };

    return (
        <div className="space-y-4">
            {isModalOpen && <SignaturePad onSave={dataUrl => { setSignatureUrl(dataUrl); setIsModalOpen(false); setMessage("Click on the document to place your signature."); }} onCancel={() => setIsModalOpen(false)} />}
            {!file ? (
                <div
                    onDragEnter={e => handleDragEvents(e, true)}
                    onDragLeave={e => handleDragEvents(e, false)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors min-h-[300px] ${isDragging ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                >
                    <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-2"/>
                    <p className="font-semibold">Drag & drop a PDF here, or click to select a file</p>
                    <p className="text-sm text-gray-500">Upload the PDF you want to sign</p>
                    <input type="file" id="pdf-upload" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                    {message && <p className="text-red-500 mt-2">{message}</p>}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3" ref={viewerRef}>
                         {isProcessing && <Spinner text={message || 'Processing...'} />}
                        {!isProcessing && pages[activePageNum - 1] && <PageViewer pagePromise={pages[activePageNum - 1]}/>}
                    </div>
                    <div className="space-y-3">
                        <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                           <PencilIcon className="w-5 h-5"/> {signatureUrl ? 'Change' : 'Add'} Signature
                        </button>
                        {signatureUrl && <img src={signatureUrl} alt="Your signature" className="border p-1 bg-white rounded-md"/>}
                        <div>
                            <label className="text-sm">Page:</label>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setActivePageNum(p => Math.max(1, p-1))} disabled={activePageNum === 1}>{"<"}</button>
                                <span>{activePageNum} / {pages.length}</span>
                                <button onClick={() => setActivePageNum(p => Math.min(pages.length, p+1))} disabled={activePageNum === pages.length}>{">"}</button>
                            </div>
                        </div>
                        <button onClick={handleDownload} disabled={!signaturePos || isProcessing} className="w-full p-3 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50">Download Signed PDF</button>
                         {message && !isProcessing && <p className="text-center text-sm font-semibold">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
