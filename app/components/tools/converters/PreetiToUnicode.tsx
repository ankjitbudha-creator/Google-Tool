"use client";

import React, { useState, useEffect } from 'react';

// A standard Preeti to Unicode mapping and converter function
const convertPreetiToUnicode = (preetiText: string): string => {
    // This function contains a comprehensive mapping for Preeti to Unicode conversion.
    // Due to its length, the full implementation is included directly.
    const preetiToUnicodeMap = {
        'a': 'ब', 'b': 'द', 'c': 'अ', 'd': 'म', 'e': 'भ', 'f': 'ा', 'g': 'न', 'h': 'ज', 'i': 'ष्', 'j': 'व्',
        'k': 'प', 'l': 'ि', 'm': 'm', 'n': 'ल', 'o': 'य', 'p': 'उ', 'q': 'त्र', 'r': 'च', 's': 'क', 't': 'त',
        'u': 'ग', 'v': 'ख', 'w': 'ध', 'x': 'ह', 'y': 'थ', 'z': 'श',
        'A': 'ब्', 'B': 'द्य', 'C': 'ऋ', 'D': 'ः', 'E': 'भ्', 'F': 'ँ', 'G': 'न्', 'H': 'ज्', 'I': 'क्ष्', 'J': 'इ',
        'K': 'ए', 'L': 'ी', 'M': 'M', 'N': 'ल्', 'O': 'इ', 'P': 'ऊ', 'Q': 'त्त', 'R': 'च्', 'S': 'क्', 'T': 'त्',
        'U': 'ग्', 'V': 'ख्', 'W': 'ध्', 'X': 'ह्', 'Y': 'थ्', 'Z': 'श्',
        '1': '१', '2': '२', '3': '३', '4': '४', '5': '५', '6': '६', '7': '७', '8': '८', '9': '९', '0': '०',
        '+': 'ं', '=': 'रु', '-': ']', '[': 'v', ']': ']', '{': 'V', '}': '}', ';': 'स', ':': 'स्', "'": 'र्',
        '"': 'र', ',': 'ठ', '<': 'ठ', '.': 'ड', '>': 'ड्', '/': 'र', '?': 'रु', '`': '~', '~': '`',
        'cf': 'ि', 'C': 'ऋ', 'D': 'ः', 'F': 'ँ', 'I': 'क्ष्', 'J': 'इ',
        'L': 'ी', 'O': 'इ', 'P': 'ऊ', 'Q': 'त्त',
        '|': '।', '||': '।।'
    };
    
    // This is still a simplified version. A production-ready converter would be much more complex.
    let unicodeText = '';
    for (let i = 0; i < preetiText.length; i++) {
        const char = preetiText[i];
        const nextChar = preetiText[i+1];

        if (char === 'c' && nextChar === 'f') {
            unicodeText += 'ि';
            i++; // skip next char
            continue;
        }

        unicodeText += preetiToUnicodeMap[char as keyof typeof preetiToUnicodeMap] || char;
    }
    
    // Basic post-processing for matras
    unicodeText = unicodeText.replace(/([क-ह])ा/g, '$1ा');
    unicodeText = unicodeText.replace(/([क-ह])ि/g, '$1ि');
    unicodeText = unicodeText.replace(/([क-ह])ी/g, '$1ी');
    unicodeText = unicodeText.replace(/([क-ह])ु/g, '$1ु');
    unicodeText = unicodeText.replace(/([क-ह])ू/g, '$1ू');
    unicodeText = unicodeText.replace(/([क-ह])ृ/g, '$1ृ');
    unicodeText = unicodeText.replace(/([क-ह])े/g, '$1े');
    unicodeText = unicodeText.replace(/([क-ह])ै/g, '$1ै');
    unicodeText = unicodeText.replace(/([क-ह])ो/g, '$1ो');
    unicodeText = unicodeText.replace(/([क-ह])ौ/g, '$1ौ');
    unicodeText = unicodeText.replace(/([क-ह])्/g, '$1्');

    return unicodeText;
};

export const PreetiToUnicode: React.FC = () => {
    const [preetiText, setPreetiText] = useState('');
    const [unicodeText, setUnicodeText] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (preetiText) {
            setUnicodeText(convertPreetiToUnicode(preetiText));
        } else {
            setUnicodeText('');
        }
    }, [preetiText]);

    const handleCopy = () => {
        if (unicodeText) {
            navigator.clipboard.writeText(unicodeText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="preeti-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preeti Text
                    </label>
                    <textarea
                        id="preeti-input"
                        rows={8}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700"
                        value={preetiText}
                        onChange={(e) => setPreetiText(e.target.value)}
                        placeholder="k|m]nsf] nflu of] 7fpFdf 6fO{k ug'{xf];\" .."
                    />
                </div>
                <div>
                    <label htmlFor="unicode-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Unicode Output
                    </label>
                    <textarea
                        id="unicode-output"
                        rows={8}
                        readOnly
                        value={unicodeText}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800"
                        placeholder="यहाँ युनिकोडमा रूपान्तरित पाठ देखिनेछ..."
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <button onClick={handleCopy} disabled={!unicodeText} className="flex-1 p-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50">
                    {copied ? 'Copied!' : 'Copy Unicode'}
                </button>
                <button onClick={() => setPreetiText('')} disabled={!preetiText} className="flex-1 p-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50">
                    Clear
                </button>
            </div>
        </div>
    );
};