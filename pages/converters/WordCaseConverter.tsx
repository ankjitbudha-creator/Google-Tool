import React, { useState, useCallback } from 'react';

export const WordCaseConverter: React.FC = () => {
    const [text, setText] = useState('');
    const [copied, setCopied] = useState(false);

    const applyCase = (caseFn: (str: string) => string) => {
        setText(caseFn(text));
    };

    const toSentenceCase = (str: string) => {
        if (!str) return '';
        return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    };

    const toTitleCase = (str: string) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const copyToClipboard = useCallback(() => {
        if (text) {
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    }, [text]);

    const caseButtons = [
        { name: 'Sentence case', action: () => applyCase(toSentenceCase) },
        { name: 'lower case', action: () => applyCase(s => s.toLowerCase()) },
        { name: 'UPPER CASE', action: () => applyCase(s => s.toUpperCase()) },
        { name: 'Title Case', action: () => applyCase(toTitleCase) },
    ];
    
    return (
        <div className="space-y-4">
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                rows={10}
                placeholder="Type or paste your text here..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {caseButtons.map(btn => (
                    <button key={btn.name} onClick={btn.action} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:opacity-50" disabled={!text}>
                        {btn.name}
                    </button>
                ))}
            </div>
             <div className="flex gap-4">
                <button onClick={copyToClipboard} disabled={!text} className="flex-1 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50">
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button onClick={() => setText('')} disabled={!text} className="flex-1 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50">
                    Clear
                </button>
            </div>
        </div>
    );
};