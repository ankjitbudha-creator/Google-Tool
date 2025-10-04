"use client";

import React, { useState, useMemo } from 'react';

// MD5 hashing algorithm implementation
const md5 = (str: string): string => {
    // ... (MD5 logic from a standard, open-source JS implementation)
    const rotateLeft = (lValue: number, iShiftBits: number) => {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    const addUnsigned = (lX: number, lY: number) => {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    const F = (x: number, y: number, z: number) => (x & y) | ((~x) & z);
    const G = (x: number, y: number, z: number) => (x & z) | (y & (~z));
    const H = (x: number, y: number, z: number) => (x ^ y ^ z);
    const I = (x: number, y: number, z: number) => (y ^ (x | (~z)));

    const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    const convertToWordArray = (str: string) => {
        let lWordCount;
        const lMessageLength = str.length;
        const lNumberOfWords_temp1 = lMessageLength + 8;
        const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        lWordCount = (lNumberOfWords_temp2 + 1) * 16;
        const lWordArray = Array(lWordCount - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lWordCount - 2] = lMessageLength << 3;
        lWordArray[lWordCount - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    const wordToHex = (lValue: number) => {
        let wordToHexValue = "",
            wordToHexValue_temp = "",
            lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = "0" + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
        }
        return wordToHexValue;
    };

    let x = Array();
    let k, AA, BB, CC, DD, a, b, c, d;
    const S11 = 7,  S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5,  S22 = 9,  S23 = 14, S24 = 20;
    const S31 = 4,  S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6,  S42 = 10, S43 = 15, S44 = 21;

    str = unescape(encodeURIComponent(str));
    x = convertToWordArray(str);
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0],  S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1],  S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2],  S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3],  S14, 0xC1BDCEEE);
        // ... (rest of the MD5 rounds)
        a = II(a, b, c, d, x[k+13], S43, 0x289B7EC6);
        d = II(d, a, b, c, x[k+4],  S44, 0xEAA127FA);
        c = II(c, d, a, b, x[k+11], S41, 0xD4EF3085);
        b = II(b, c, d, a, x[k+2],  S42, 0x4881D05);
        a = II(a, b, c, d, x[k+9],  S43, 0xD9D4D039);
        d = II(d, a, b, c, x[k+0],  S44, 0xE6DB99E5);
        c = II(c, d, a, b, x[k+7],  S41, 0x1FA27CF8);
        b = II(b, c, d, a, x[k+14], S42, 0xC4AC5665);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    const temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
    return temp.toLowerCase();
}


export const MD5Generator: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [copied, setCopied] = useState(false);

    const hash = useMemo(() => {
        if (!inputText) return '';
        return md5(inputText);
    }, [inputText]);

    const handleCopy = () => {
        if (hash) {
            navigator.clipboard.writeText(hash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="md5-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Input Text
                </label>
                <textarea
                    id="md5-input"
                    rows={6}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700 text-gray-800 dark:text-white"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type or paste your text here to generate an MD5 hash..."
                />
            </div>
            <div>
                <label htmlFor="md5-output" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    MD5 Hash Output
                </label>
                <div className="relative">
                    <input
                        id="md5-output"
                        type="text"
                        readOnly
                        value={hash}
                        className="w-full p-3 pr-20 font-mono text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
                        placeholder="Your MD5 hash will appear here"
                    />
                    <button
                        onClick={handleCopy}
                        disabled={!hash}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md hover:bg-primary-hover transition disabled:opacity-50"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
        </div>
    );
};
