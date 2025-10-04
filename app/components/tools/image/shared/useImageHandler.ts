"use client";

import { useState, useRef, useCallback, DragEvent } from 'react';

export const useImageHandler = (
    onImageLoad?: (img: HTMLImageElement, file: File) => void,
    validationOptions?: { acceptedFormats?: string[], maxSizeMB?: number }
) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('image');
    const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error', text: string } | null>(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const imageRef = useRef<HTMLImageElement>(typeof window !== 'undefined' ? new window.Image() : ({} as HTMLImageElement));

    const { 
        acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'], 
        maxSizeMB = 10 
    } = validationOptions || {};

    const handleFileChange = useCallback((files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];

            if (!acceptedFormats.includes(file.type)) {
                setMessage({ type: 'error', text: `Invalid file type. Supported: ${acceptedFormats.map(f => f.split('/')[1]).join(', ').toUpperCase()}.` });
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                setMessage({ type: 'error', text: `File is too large. Maximum size is ${maxSizeMB}MB.` });
                return;
            }

            const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image';
            setOriginalFileName(baseName.replace(/[^a-zA-Z0-9_-]/g, ''));

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                imageRef.current.onload = () => {
                    setImageSrc(result);
                    onImageLoad?.(imageRef.current, file);
                };
                imageRef.current.src = result;
            };
            reader.readAsDataURL(file);
            setMessage(null);
        }
    }, [onImageLoad, acceptedFormats, maxSizeMB]);
    
    const handleReset = useCallback((resetCallback?: () => void) => {
        setImageSrc(null);
        setOriginalFileName('image');
        setMessage(null);
        imageRef.current.src = '';
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
        resetCallback?.();
    }, []);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDraggingOver(true); };
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDraggingOver(false); };
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
        handleFileChange(e.dataTransfer.files);
    };

    return {
        imageSrc,
        imageRef,
        originalFileName,
        setOriginalFileName,
        message,
        setMessage,
        isDraggingOver,
        handleFileChange,
        handleReset,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
};