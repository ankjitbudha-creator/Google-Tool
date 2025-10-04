import React, { useState } from 'react';

const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";

const words = loremIpsumText.replace(/[,.]/g, '').toLowerCase().split(' ');
const sentences = loremIpsumText.split('. ').map(s => s.trim() + '.');

const generateWords = (count: number) => {
    let result = '';
    for(let i=0; i<count; i++) {
        result += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return result.trim();
};

const generateSentences = (count: number) => {
    let result = '';
    for(let i=0; i<count; i++) {
        result += sentences[Math.floor(Math.random() * sentences.length)] + ' ';
    }
    return result.trim();
};

const generateParagraphs = (count: number) => {
    let result = '';
    for(let i=0; i<count; i++) {
        const sentenceCount = Math.floor(Math.random() * 4) + 4; // 4 to 7 sentences per paragraph
        result += generateSentences(sentenceCount) + '\n\n';
    }
    return result.trim();
};

type GenerateType = 'paragraphs' | 'sentences' | 'words';

export const LoremGenerator: React.FC = () => {
    const [amount, setAmount] = useState('5');
    const [type, setType] = useState<GenerateType>('paragraphs');
    const [resultText, setResultText] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        const count = parseInt(amount, 10);
        if (isNaN(count) || count <= 0) {
            setResultText('Please enter a valid positive number.');
            return;
        }

        let generated = '';
        switch(type) {
            case 'paragraphs': generated = generateParagraphs(count); break;
            case 'sentences': generated = generateSentences(count); break;
            case 'words': generated = generateWords(count); break;
        }
        setResultText(generated);
        setCopied(false);
    };

    const handleCopy = () => {
        if (resultText) {
            navigator.clipboard.writeText(resultText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800">
                <div className="flex-1">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                    <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-light dark:bg-gray-700" min="1" />
                </div>
                <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                     <div className="flex bg-gray-200 dark:bg-slate-900/50 rounded-lg p-1 h-10 items-center">
                        {(['paragraphs', 'sentences', 'words'] as GenerateType[]).map(t => (
                            <button key={t} onClick={() => setType(t)} className={`w-full py-1.5 rounded-md text-sm font-medium transition capitalize ${type === t ? 'bg-primary text-white shadow' : 'text-gray-600 dark:text-gray-300'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-shrink-0 self-end">
                    <button onClick={handleGenerate} className="w-full sm:w-auto h-10 px-6 bg-primary text-white font-bold rounded-md hover:bg-primary-hover transition">
                        Generate
                    </button>
                </div>
            </div>
             <div className="relative">
                <textarea
                    rows={10}
                    readOnly
                    value={resultText}
                    placeholder="Generated Lorem Ipsum text will appear here..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800"
                />
                <button
                    onClick={handleCopy}
                    disabled={!resultText}
                    className="absolute top-3 right-3 px-4 py-1.5 bg-emerald-500 text-white text-sm rounded-md hover:bg-emerald-600 transition disabled:opacity-50"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
};
