import React, { useState, useCallback } from 'react';
import { DocumentDuplicateIcon, TrashIcon } from '../../components/Icons';

type SortOrder = 'asc' | 'desc';
type SortBy = 'lines' | 'words';

export const TextSorter: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [sortBy, setSortBy] = useState<SortBy>('lines');
    const [copied, setCopied] = useState(false);

    const handleSort = (order: SortOrder) => {
        const compareFn = (a: string, b: string) => {
            const valA = caseSensitive ? a : a.toLowerCase();
            const valB = caseSensitive ? b : b.toLowerCase();
            if (order === 'asc') {
                return valA.localeCompare(valB);
            }
            return valB.localeCompare(valA);
        };
        
        let sorted;
        if (sortBy === 'lines') {
            const lines = inputText.split('\n');
            sorted = lines.sort(compareFn).join('\n');
        } else { // words
            const words = inputText.split(/\s+/);
            sorted = words.sort(compareFn).join(' ');
        }
        setOutputText(sorted);
    };
    
    const handleReverse = () => {
        let reversed;
        if (sortBy === 'lines') {
            reversed = inputText.split('\n').reverse().join('\n');
        } else { // words
            reversed = inputText.split(/\s+/).reverse().join(' ');
        }
        setOutputText(reversed);
    };

    const handleRandomize = () => {
        let randomized;
        const array = sortBy === 'lines' ? inputText.split('\n') : inputText.split(/\s+/);
        
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        
        randomized = sortBy === 'lines' ? array.join('\n') : array.join(' ');
        setOutputText(randomized);
    };

    const handleCopy = useCallback(() => {
        if (outputText) {
          navigator.clipboard.writeText(outputText);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
    }, [outputText]);

    const handleClear = () => {
        setInputText('');
        setOutputText('');
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    rows={10}
                    placeholder="Enter text to sort here..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700"
                />
                 <textarea
                    readOnly
                    value={outputText}
                    placeholder="Sorted text will appear here..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                />
            </div>

            <div className="p-4 border rounded-lg dark:border-gray-700 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex-shrink-0 font-semibold">Sort by:</div>
                    <div className="flex bg-gray-200 dark:bg-slate-700 rounded-lg p-1">
                        <button onClick={() => setSortBy('lines')} className={`px-3 py-1 rounded-md text-sm transition ${sortBy === 'lines' ? 'bg-primary text-white shadow' : ''}`}>Lines</button>
                        <button onClick={() => setSortBy('words')} className={`px-3 py-1 rounded-md text-sm transition ${sortBy === 'words' ? 'bg-primary text-white shadow' : ''}`}>Words</button>
                    </div>
                    <label className="flex items-center space-x-2 cursor-pointer ml-auto">
                        <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="h-4 w-4 rounded text-primary focus:ring-primary" />
                        <span className="text-sm">Case Sensitive</span>
                    </label>
                </div>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <button onClick={() => handleSort('asc')} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" disabled={!inputText}>Sort A-Z</button>
                    <button onClick={() => handleSort('desc')} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" disabled={!inputText}>Sort Z-A</button>
                    <button onClick={handleReverse} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" disabled={!inputText}>Reverse</button>
                    <button onClick={handleRandomize} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" disabled={!inputText}>Randomize</button>
                 </div>
            </div>

            <div className="flex gap-4">
                 <button onClick={handleCopy} disabled={!outputText} className="flex-1 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 flex items-center justify-center gap-2">
                    <DocumentDuplicateIcon className="w-5 h-5" /> {copied ? 'Copied!' : 'Copy Result'}
                </button>
                <button onClick={handleClear} disabled={!inputText} className="flex-1 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2">
                    <TrashIcon className="w-5 h-5" /> Clear Text
                </button>
            </div>
        </div>
    );
};