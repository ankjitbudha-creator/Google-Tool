"use client";

import React from 'react';
import { DocumentDuplicateIcon, ArrowPathIcon } from '../../Icons';

export const ControlSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 rounded-lg shadow-sm space-y-4">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        {children}
    </div>
);

export const OutputSettings: React.FC<{
    format: 'jpeg' | 'png' | 'webp';
    setFormat: (format: 'jpeg' | 'png' | 'webp') => void;
    quality: number;
    setQuality: (quality: number) => void;
    disabled: boolean;
}> = ({ format, setFormat, quality, setQuality, disabled }) => {
    const showQualitySlider = format === 'jpeg' || format === 'webp';

    return (
        <ControlSection title="Output Settings">
            <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Format</label>
                <div className="grid grid-cols-3 gap-2">
                    {(['jpeg', 'png', 'webp'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFormat(f)}
                            disabled={disabled}
                            className={`p-2 rounded-md text-sm font-medium transition-colors border ${
                                format === f
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700 disabled:opacity-50'
                            }`}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>
            {showQualitySlider && (
                <div>
                    <label htmlFor="quality-slider" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Quality: {quality}
                    </label>
                    <input
                        id="quality-slider"
                        type="range"
                        min="0"
                        max="100"
                        value={quality}
                        onChange={e => setQuality(Number(e.target.value))}
                        disabled={disabled}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary disabled:opacity-50"
                    />
                </div>
            )}
        </ControlSection>
    );
};


export const FileNameDisplay: React.FC<{ fileName: string | null }> = ({ fileName }) => {
    if (!fileName || fileName === 'image') return null;
    return (
        <div className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Selected File</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{fileName}</p>
        </div>
    );
};

export const MessageDisplay: React.FC<{ message: { type: 'info' | 'success' | 'error', text: string } | null }> = ({ message }) => {
    if (!message) return null;
    const messageClasses = {
        success: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        error: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
        info: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    };
    return (
        <div className={`p-3 rounded-md text-sm text-center ${messageClasses[message.type]}`}>
            {message.text}
        </div>
    );
};

export const ActionButtons: React.FC<{
    onDownload: () => void;
    onReset: () => void;
    isImageLoaded: boolean;
    downloadText?: string;
    resetText?: string;
    children?: React.ReactNode;
}> = ({ onDownload, onReset, isImageLoaded, downloadText = 'Download', resetText = 'Reset / Change Image', children }) => (
    <div className="space-y-2">
        <button onClick={onDownload} disabled={!isImageLoaded} className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <DocumentDuplicateIcon className="w-5 h-5" />
            {downloadText}
        </button>
        {children}
        <button onClick={onReset} disabled={!isImageLoaded} className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <ArrowPathIcon className="w-5 h-5" />
            {resetText}
        </button>
    </div>
);