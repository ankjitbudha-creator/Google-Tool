import React, { useState } from 'react';

export const RandomNumberGenerator: React.FC = () => {
    const [min, setMin] = useState('1');
    const [max, setMax] = useState('100');
    const [count, setCount] = useState('1');
    const [allowDuplicates, setAllowDuplicates] = useState(true);
    const [results, setResults] = useState<number[]>([]);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        setError('');
        setResults([]);
        const minValue = parseInt(min, 10);
        const maxValue = parseInt(max, 10);
        const numCount = parseInt(count, 10);

        if (isNaN(minValue) || isNaN(maxValue) || isNaN(numCount)) {
            setError('Please enter valid numbers for all fields.');
            return;
        }
        if (minValue > maxValue) {
            setError('Min value cannot be greater than Max value.');
            return;
        }
        if (numCount <= 0) {
            setError('Number of results must be greater than zero.');
            return;
        }
        if (!allowDuplicates && numCount > (maxValue - minValue + 1)) {
            setError('Cannot generate more unique numbers than the available range.');
            return;
        }

        const generated = new Set<number>();
        if (allowDuplicates) {
            const newResults = [];
            for (let i = 0; i < numCount; i++) {
                newResults.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
            }
            setResults(newResults);
        } else {
            while (generated.size < numCount) {
                generated.add(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
            }
            setResults(Array.from(generated));
        }
        setCopied(false);
    };

    const handleCopy = () => {
        if (results.length > 0) {
            navigator.clipboard.writeText(results.join(', '));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="min-val" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min</label>
                        <input id="min-val" type="number" value={min} onChange={e => setMin(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-gray-700" />
                    </div>
                    <div>
                        <label htmlFor="max-val" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max</label>
                        <input id="max-val" type="number" value={max} onChange={e => setMax(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-gray-700" />
                    </div>
                </div>
                <div>
                    <label htmlFor="count-val" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">How Many?</label>
                    <input id="count-val" type="number" value={count} onChange={e => setCount(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-gray-700" />
                </div>
                <div className="pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={allowDuplicates} onChange={() => setAllowDuplicates(v => !v)} className="h-4 w-4 rounded text-primary focus:ring-primary" />
                        <span className="text-sm">Allow Duplicates</span>
                    </label>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button onClick={handleGenerate} className="w-full py-3 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition">
                    Generate Numbers
                </button>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Results</h3>
                    <button onClick={handleCopy} disabled={results.length === 0} className="px-4 py-1.5 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600 transition disabled:opacity-50">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div className="w-full h-64 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 overflow-y-auto">
                    {results.length > 0 ? (
                        <p className="font-mono text-lg break-words">{results.join(', ')}</p>
                    ) : (
                        <p className="text-gray-400">Your random numbers will appear here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
