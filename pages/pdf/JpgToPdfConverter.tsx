import React, { useState, useCallback } from 'react';
import { Spinner } from '../../components/Spinner';
import { ArrowUpTrayIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from '../../components/Icons';

declare var jspdf: any;

interface ImageFile {
    id: string;
    file: File;
    preview: string;
}

type PageSize = 'a4' | 'letter';
type Orientation = 'p' | 'l'; // portrait or landscape

export const JpgToPdfConverter: React.FC = () => {
    const [images, setImages] = useState<ImageFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pageSize, setPageSize] = useState<PageSize>('a4');
    const [orientation, setOrientation] = useState<Orientation>('p');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };
    
    const handleFiles = (files: FileList) => {
        const newImages: ImageFile[] = [];
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/jpeg')) {
                newImages.push({
                    id: `${file.name}-${Date.now()}`,
                    file: file,
                    preview: URL.createObjectURL(file)
                });
            }
        });
        setImages(prev => [...prev, ...newImages]);
    };
    
    const handleDragEvents = (e: React.DragEvent, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isEntering);
    };
    
    const handleDrop = (e: React.DragEvent) => {
        handleDragEvents(e, false);
        handleFiles(e.dataTransfer.files);
    };
    
    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) {
            return;
        }
        const newImages = [...images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        setImages(newImages);
    };

    const generatePdf = useCallback(async () => {
        if (images.length === 0) {
            setMessage({ type: 'error', text: 'Please upload at least one image.' });
            return;
        }
        setIsGenerating(true);
        setMessage(null);

        try {
            const { jsPDF } = jspdf;
            const doc = new jsPDF({ orientation, unit: 'pt', format: pageSize });
            
            for (let i = 0; i < images.length; i++) {
                if (i > 0) doc.addPage();
                
                const img = images[i];
                const imgData = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.readAsDataURL(img.file);
                });

                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = doc.internal.pageSize.getWidth();
                const pdfHeight = doc.internal.pageSize.getHeight();
                
                const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);
                const imgWidth = imgProps.width * ratio;
                const imgHeight = imgProps.height * ratio;
                const x = (pdfWidth - imgWidth) / 2;
                const y = (pdfHeight - imgHeight) / 2;

                doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
            }
            
            doc.save('babaltools-converted.pdf');
            setMessage({ type: 'success', text: 'PDF generated successfully!' });
        } catch (e) {
            setMessage({ type: 'error', text: 'An error occurred while generating the PDF.' });
        } finally {
            setIsGenerating(false);
        }
    }, [images, pageSize, orientation]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                 <div
                    onDragEnter={e => handleDragEvents(e, true)}
                    onDragLeave={e => handleDragEvents(e, false)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary'}`}
                    onClick={() => document.getElementById('jpg-upload')?.click()}
                >
                    <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-2"/>
                    <p className="font-semibold">Drag & drop JPGs here, or click to select files</p>
                    <p className="text-sm text-gray-500">Supports multiple .jpg and .jpeg files</p>
                    <input type="file" id="jpg-upload" multiple accept="image/jpeg" className="hidden" onChange={handleFileChange} />
                </div>
                {images.length > 0 && (
                     <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Uploaded Images ({images.length})</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {images.map((img, index) => (
                                <div key={img.id} className="relative group bg-slate-100 dark:bg-slate-700 rounded-lg p-2 border dark:border-slate-600">
                                    <img src={img.preview} alt={img.file.name} className="w-full h-24 object-cover rounded"/>
                                    <p className="text-xs truncate mt-1">{img.file.name}</p>
                                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveImage(index, 'up')} disabled={index === 0} className="p-1 bg-white/70 rounded-full disabled:opacity-30"><ChevronUpIcon className="w-4 h-4"/></button>
                                        <button onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1} className="p-1 bg-white/70 rounded-full disabled:opacity-30"><ChevronDownIcon className="w-4 h-4"/></button>
                                        <button onClick={() => removeImage(img.id)} className="p-1 bg-red-500/80 text-white rounded-full"><TrashIcon className="w-4 h-4"/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 space-y-3">
                    <h3 className="font-semibold text-lg">PDF Options</h3>
                    <div>
                        <label className="text-sm font-medium">Page Size</label>
                        <select value={pageSize} onChange={e => setPageSize(e.target.value as PageSize)} className="w-full mt-1 p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600">
                            <option value="a4">A4</option>
                            <option value="letter">Letter</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Orientation</label>
                         <div className="flex bg-gray-200 dark:bg-slate-900/50 rounded-lg p-1 mt-1">
                            <button onClick={() => setOrientation('p')} className={`w-full py-1 rounded-md text-sm transition ${orientation === 'p' ? 'bg-primary text-white shadow' : ''}`}>Portrait</button>
                            <button onClick={() => setOrientation('l')} className={`w-full py-1 rounded-md text-sm transition ${orientation === 'l' ? 'bg-primary text-white shadow' : ''}`}>Landscape</button>
                        </div>
                    </div>
                </div>
                <button onClick={generatePdf} disabled={isGenerating || images.length === 0} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition disabled:opacity-50">
                    {isGenerating ? <Spinner/> : 'Generate PDF'}
                </button>
                {message && <div className={`p-3 rounded-md text-sm text-center ${message.type === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>{message.text}</div>}
            </div>
        </div>
    );
};