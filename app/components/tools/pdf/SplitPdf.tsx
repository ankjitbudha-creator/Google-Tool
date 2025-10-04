
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from '../../Spinner';
import { ArrowUpTrayIcon } from '../../Icons';

declare var pdfjsLib: any;
declare var PDFLib: any;

interface Page {
    num: number;
    dataUrl: string;
}

type SplitMode = 'merge' | 'separate';

export const SplitPdf: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [splitMode, setSplitMode] = useState<SplitMode>('merge');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        }
    }, []);

    const handleFile = (selectedFile: File) => {
        if (selectedFile.type !== 'application/pdf') {
            setMessage('Please upload a valid PDF file.');
            return;
        }
        setFile(selectedFile);
        setMessage(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };
    
    const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => { e.preventDefault(); e.stopPropagation(); setIsDragging(isEntering); };
    const handleDrop = (e: React.DragEvent) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const processPdf = useCallback(async () => {
        if (!file) return;
        setIsProcessing(true);
        setPages([]);
        setSelectedPages(new Set());
        setMessage('Loading PDF pages...');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const pdf = await pdfjsLib.getDocument(e.target?.result).promise;
                const newPages: Page[] = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 0.3 });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const context = canvas.getContext('2d');
                    if(context) {
                        await page.render({ canvasContext: context, viewport }).promise;
                        newPages.push({ num: i, dataUrl: canvas.toDataURL() });
                    }
                }
                setPages(newPages);
                setSelectedPages(new Set(newPages.map(p => p.num))); // Select all by default
                setMessage(null);
            } catch (err) {
                console.error(err);
                setMessage('Error processing PDF. The file may be corrupted or password-protected.');
            } finally {
                setIsProcessing(false);
            }
        };
        reader.readAsArrayBuffer(file);
    }, [file]);
    
    useEffect(() => {
        if(file) {
            processPdf();
        }
    }, [file, processPdf]);
    
    const togglePageSelection = (num: number) => {
        const newSelection = new Set(selectedPages);
        if (newSelection.has(num)) newSelection.delete(num);
        else newSelection.add(num);
        setSelectedPages(newSelection);
    };

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPages(e.target.checked ? new Set(pages.map(p => p.num)) : new Set());
    };

    const handleDownload = async () => {
        if (!file || selectedPages.size === 0) {
            setMessage('Please select at least one page.');
            return;
        }
        setIsProcessing(true);
        setMessage(`Splitting ${selectedPages.size} pages...`);

        try {
            const { PDFDocument } = PDFLib;
            const pdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
            
            const sortedSelected = Array.from<number>(selectedPages).sort((a, b) => a - b);

            if (splitMode === 'merge') {
                const newPdf = await PDFDocument.create();
                const pageIndices = sortedSelected.map(n => n - 1);
                const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
                copiedPages.forEach(page => newPdf.addPage(page));
                const newPdfBytes = await newPdf.save();
                downloadBlob(newPdfBytes, `babaltools-split-merged.pdf`);
            } else { // separate
                for (const pageNum of sortedSelected) {
                    const newPdf = await PDFDocument.create();
                    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
                    newPdf.addPage(copiedPage);
                    const newPdfBytes = await newPdf.save();
                    downloadBlob(newPdfBytes, `${file.name.replace('.pdf', '')}-page-${pageNum}.pdf`);
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
            setMessage('Download complete!');
        } catch (err) {
             console.error(err);
             setMessage('Error during splitting. Please ensure the PDF is not corrupted.');
        } finally {
            setIsProcessing(false);
        }
    };
    
    const downloadBlob = (data: Uint8Array, fileName: string) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    if (!file) {
        return (
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
                <p className="text-sm text-gray-500">Upload a single PDF to split</p>
                <input type="file" id="pdf-upload" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            {isProcessing && <Spinner text={message || 'Processing PDF...'} />}
            
            {!isProcessing && pages.length > 0 && (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border rounded-lg dark:border-slate-700">
                        <div className="flex items-center">
                            <input type="checkbox" id="select-all" checked={selectedPages.size === pages.length && pages.length > 0} onChange={toggleSelectAll} className="h-5 w-5 rounded mr-2" />
                            <label htmlFor="select-all">Select All ({selectedPages.size}/{pages.length})</label>
                        </div>
                        <div className="flex bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
                            <button onClick={() => setSplitMode('merge')} className={`px-3 py-1 rounded-md text-sm transition ${splitMode === 'merge' ? 'bg-primary text-white shadow' : ''}`}>Merge Selected</button>
                            <button onClick={() => setSplitMode('separate')} className={`px-3 py-1 rounded-md text-sm transition ${splitMode === 'separate' ? 'bg-primary text-white shadow' : ''}`}>Separate Pages</button>
                        </div>
                        <button onClick={handleDownload} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover ml-auto" disabled={selectedPages.size === 0}>
                            Split & Download
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-[600px] overflow-y-auto p-2">
                        {pages.map(page => (
                            <div key={page.num} className={`relative border-2 rounded-lg overflow-hidden cursor-pointer ${selectedPages.has(page.num) ? 'border-primary' : ''}`} onClick={() => togglePageSelection(page.num)}>
                                <img src={page.dataUrl} alt={`Page ${page.num}`} className="w-full h-auto"/>
                                <div className="absolute top-1 left-1 bg-white/80 rounded-full px-2 text-xs font-bold">{page.num}</div>
                                {selectedPages.has(page.num) && <div className="absolute inset-0 bg-primary/30"/>}
                            </div>
                        ))}
                    </div>
                </>
            )}
             {message && !isProcessing && <p className="text-center font-semibold text-red-500">{message}</p>}
        </div>
    );
};
