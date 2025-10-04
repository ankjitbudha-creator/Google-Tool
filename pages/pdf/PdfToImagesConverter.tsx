import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from '../../components/Spinner';

declare var pdfjsLib: any;

interface Page {
    num: number;
    dataUrl: string;
}

export const PdfToImagesConverter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState<Page[]>([]);
    const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
    const [isProcessing, setIsProcessing] = useState(false);
    const [outputFormat, setOutputFormat] = useState<'png' | 'jpeg'>('png');
    const [quality, setQuality] = useState(92);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type !== 'application/pdf') {
                setMessage('Please upload a valid PDF file.');
                return;
            }
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };
    
    const processPdf = useCallback(async () => {
        if (!file) return;
        setIsProcessing(true);
        setPages([]);
        setSelectedPages(new Set());
        
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
            } catch (err) {
                setMessage('Error processing PDF file.');
            } finally {
                setIsProcessing(false);
            }
        };
        reader.readAsArrayBuffer(file);
    }, [file]);
    
    useEffect(() => {
        processPdf();
    }, [processPdf]);
    
    const togglePageSelection = (num: number) => {
        const newSelection = new Set(selectedPages);
        if (newSelection.has(num)) {
            newSelection.delete(num);
        } else {
            newSelection.add(num);
        }
        setSelectedPages(newSelection);
    };

    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedPages(new Set(pages.map(p => p.num)));
        } else {
            setSelectedPages(new Set());
        }
    };

    const handleDownload = async () => {
        if (!file || selectedPages.size === 0) return;
        setIsProcessing(true);
        setMessage(`Converting ${selectedPages.size} pages...`);

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const pdf = await pdfjsLib.getDocument(e.target?.result).promise;
                for (const pageNum of selectedPages) {
                    const page = await pdf.getPage(pageNum);
                    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    const context = canvas.getContext('2d');
                    if (!context) continue;
                    
                    await page.render({ canvasContext: context, viewport }).promise;
                    
                    const link = document.createElement('a');
                    link.download = `${file.name.replace('.pdf', '')}-page-${pageNum}.${outputFormat}`;
                    link.href = canvas.toDataURL(`image/${outputFormat}`, quality / 100);
                    link.click();
                    await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between downloads
                }
                setMessage('Download complete!');
            } catch (err) {
                 setMessage('Error during conversion.');
            } finally {
                setIsProcessing(false);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    if (!file) {
        return (
            <div className="text-center">
                <input type="file" accept="application/pdf" onChange={handleFileChange} id="pdf-upload" className="hidden" />
                <button onClick={() => document.getElementById('pdf-upload')?.click()} className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover">Select PDF File</button>
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
                            <input type="checkbox" id="select-all" checked={selectedPages.size === pages.length} onChange={toggleSelectAll} className="h-5 w-5 rounded mr-2" />
                            <label htmlFor="select-all">Select All ({selectedPages.size}/{pages.length})</label>
                        </div>
                        <div className="flex items-center gap-2">
                             <label className="text-sm">Format:</label>
                             <select value={outputFormat} onChange={e => setOutputFormat(e.target.value as 'png' | 'jpeg')} className="p-1 border rounded dark:bg-slate-700">
                                <option value="png">PNG</option>
                                <option value="jpeg">JPG</option>
                            </select>
                        </div>
                        {outputFormat === 'jpeg' && (
                            <div className="flex items-center gap-2">
                                <label className="text-sm">Quality:</label>
                                <input type="range" min="1" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} />
                                <span>{quality}</span>
                            </div>
                        )}
                        <button onClick={handleDownload} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover ml-auto" disabled={selectedPages.size === 0}>
                            Download Selected
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
             {message && !isProcessing && <p className="text-center font-semibold">{message}</p>}
        </div>
    );
};
