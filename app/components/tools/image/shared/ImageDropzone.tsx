"use client";

import React, { DragEvent } from 'react';
import { ArrowUpTrayIcon } from '../../Icons';

interface ImageDropzoneProps {
    imageSrc: string | null;
    isDraggingOver: boolean;
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: DragEvent<HTMLDivElement>) => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
    onFileChange: (files: FileList | null) => void;
    children: React.ReactNode;
    promptText?: string;
    supportedFormats?: string;
    fileInputAccept?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
    imageSrc,
    isDraggingOver,
    onDragOver,
    onDragLeave,
    onDrop,
    onFileChange,
    children,
    promptText = "Drag & Drop or Click to Upload",
    supportedFormats = "Supports JPG, PNG, GIF, WEBP",
    fileInputAccept = "image/*"
}) => {
    return (
        <div className="md:col-span-2 relative min-h-[400px] md:min-h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden p-4 flex items-center justify-center">
            {imageSrc ? (
                children
            ) : (
                <div
                    className={`w-full h-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${isDraggingOver ? 'border-primary bg-indigo-50 dark:bg-slate-700/50' : 'border-gray-400 dark:border-gray-600'}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <ArrowUpTrayIcon className="w-16 h-16 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        {isDraggingOver ? "Drop image to upload" : promptText}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{supportedFormats}</p>
                    <input type="file" className="hidden" accept={fileInputAccept} onChange={e => onFileChange(e.target.files)} id="fileUpload" />
                    <button onClick={() => document.getElementById('fileUpload')?.click()} className="mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                        Select Image
                    </button>
                </div>
            )}
        </div>
    );
};
