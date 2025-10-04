
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Spinner } from '../../Spinner';
import { ArrowUpTrayIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '../../Icons';

declare var pdfjsLib: any;
declare var PDFLib: any;

interface PdfFile {
    id: string;
    file: File;
    preview: string;
    pageCount: number;
}

export const MergePdf: React.FC = () => {
    const [files, setFiles] = useState<PdfFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        }
    }, []);

    const generatePreview = async (file: File): Promise<{preview: string, pageCount: number}> => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onload = async (e) => {
                try {
                    const pdf = await pdfjsLib.getDocument(e.target?.result).promise;
                    const page = await pdf.getPage(1);
                    const viewport = page.getViewport({ scale: 0.5 });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const context = canvas.getContext('2d');
                    if (context) {
                        await page.render({ canvasContext: context, viewport }).promise;
                        resolve({ preview: canvas.toDataURL(), pageCount: pdf.numPages });
                    } else {
                        reject('Could not get canvas context');
                    }
                } catch (error) {
                    reject('Error generating preview');
                }
            };
            reader.readAsArrayBuffer(file);
        });
    };
    
    const handleFiles = async (fileList: FileList) => {
        setMessage(null);
        setIsProcessing(true);
        const newFiles: PdfFile[] = [];
        for (const file of Array.from(fileList)) {
            if (file.type === 'application/pdf') {
                try {
                    const { preview, pageCount } = await generatePreview(file);
                    newFiles.push({
                        id: `${file.name}-${Date.now()}`,
                        file,
                        preview,
                        pageCount,
                    });
                } catch (error) {
                    console.error(`Failed to process ${file.name}:`, error);
                    setMessage({type: 'error', text: `Could not process ${file.name}. It may be corrupted or protected.`});
                }
            }
        }
        setFiles(prev => [...prev, ...newFiles]);
        setIsProcessing(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };
    const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => { e.preventDefault(); e.stopPropagation(); setIsDragging(isEntering); };
    const handleDrop = (e: React.DragEvent) => { handleDragEvents(e, false); handleFiles(e.dataTransfer.files); };
    const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

    const moveFile = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === files.length - 1)) return;
        const newFiles = [...files];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
        setFiles(newFiles);
    };

    const mergePdfs = useCallback(async () => {
        if (files.length < 2) {
            setMessage({ type: 'error', text: 'Please upload at least two PDF files to merge.' });
            return;
        }
        setIsProcessing(true);
        setMessage({ type: 'success', text: 'Merging PDFs... this may take a moment.' });
        try {
            const { PDFDocument } = PDFLib;
            const mergedPdf = await PDFDocument.create();
            for (const pdfFile of files) {
                const pdfBytes = await pdfFile.file.arrayBuffer();
                const pdf = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'babaltools-merged.pdf';
            link.click();
            URL.revokeObjectURL(link.href);
            setMessage({ type: 'success', text: 'PDFs merged successfully!' });
        } catch (e) {
            console.error(e);
            setMessage({ type: 'error', text: 'Failed to merge. One or more PDFs may be corrupted, password-protected, or in an unsupported format.' });
        } finally {
            setIsProcessing(false);
        }
    }, [files]);

    return (
        <div className="space-y-4">
             <div
                onDragEnter={e => handleDragEvents(e, true)} onDragLeave={e => handleDragEvents(e, false)}
                onDragOver={e => e.preventDefault()} onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
                onClick={() => document.getElementById('pdf-upload')?.click()}
            >
                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-2"/>
                <p className="font-semibold">Drag & drop PDFs here, or click to select files</p>
                <p className="text-sm text-gray-500">Combine multiple PDF files into one</p>
                <input type="file" id="pdf-upload" multiple accept="application/pdf" className="hidden" onChange={handleFileChange} />
            </div>

            {isProcessing && !message && <Spinner text="Processing..." />}
            {isProcessing && message && <Spinner text={message.text} />}
            
            {files.length > 0 && (
                 <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Files to Merge ({files.length})</h3>
                    {files.map((f, index) => (
                        <div key={f.id} className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                            <img src={f.preview} alt={`Preview of ${f.file.name}`} className="w-12 h-16 object-cover rounded border dark:border-slate-600"/>
                            <div className="flex-grow">
                                <p className="font-semibold truncate">{f.file.name}</p>
                                <p className="text-xs text-gray-500">{f.pageCount} pages</p>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => moveFile(index, 'up')} disabled={index === 0} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30"><ChevronUpIcon className="w-5 h-5"/></button>
                                <button onClick={() => moveFile(index, 'down')} disabled={index === files.length - 1} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-30"><ChevronDownIcon className="w-5 h-5"/></button>
                                <button onClick={() => removeFile(f.id)} className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"><TrashIcon className="w-5 h-5 text-red-500"/></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <button onClick={mergePdfs} disabled={isProcessing || files.length < 2} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition disabled:opacity-50">
                Merge PDFs
            </button>
            
            {message && !isProcessing && <div className={`p-3 rounded-md text-sm text-center ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>{message.text}</div>}
        </div>
    );
};
