import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from '../../components/Spinner';
import { DocumentDuplicateIcon, TrashIcon } from '../../components/Icons';

declare var pdfjsLib: any;

export const PdfToWordConverter: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof pdfjsLib !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            if (e.target.files[0].type !== 'application/pdf') {
                setMessage('Please upload a valid PDF file.');
                setFile(null);
                setExtractedText('');
                return;
            }
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };
    
    const processPdf = useCallback(async () => {
        if (!file) return;
        setIsProcessing(true);
        setExtractedText('');
        setMessage('Extracting text...');
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const pdf = await pdfjsLib.getDocument(e.target?.result).promise;
                let allText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items.map((item: any) => item.str).join(' ');
                    allText += pageText + '\n\n';
                }
                setExtractedText(allText);
                setMessage('Text extracted successfully!');
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

    const handleCopy = useCallback(() => {
        if (extractedText) {
          navigator.clipboard.writeText(extractedText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    }, [extractedText]);

    const handleClear = () => {
        setFile(null);
        setExtractedText('');
        setMessage(null);
        const fileInput = document.getElementById('pdf-upload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    };

    return (
        <div className="space-y-4">
            <div className="p-4 border rounded-lg dark:border-gray-700 flex flex-col sm:flex-row items-center gap-4">
                <input type="file" accept="application/pdf" onChange={handleFileChange} id="pdf-upload" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-50 file:text-primary hover:file:bg-indigo-100"/>
                {file && (
                     <button onClick={handleClear} className="w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        <TrashIcon className="w-5 h-5"/> Clear
                    </button>
                )}
            </div>

            {isProcessing && <Spinner text={message || 'Processing...'}/>}

            {extractedText && !isProcessing && (
                <div className="space-y-2">
                    <textarea
                        readOnly
                        value={extractedText}
                        rows={12}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                    />
                    <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
                        <DocumentDuplicateIcon className="w-5 h-5"/>
                        {copied ? 'Copied!' : 'Copy Extracted Text'}
                    </button>
                </div>
            )}
            
            {message && !isProcessing && (
                <p className="text-center text-sm font-semibold">{message}</p>
            )}
        </div>
    );
};