"use client";

import React, { useState, useCallback, useEffect } from 'react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (charset === '') {
        setPassword('Select at least one character type');
        return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      generated += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(generated);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getStrength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    
    if(score < 3) return {score, text: "Weak", color: "bg-red-500"};
    if(score < 5) return {score, text: "Medium", color: "bg-yellow-500"};
    if(score < 7) return {score, text: "Strong", color: "bg-green-500"};
    return {score, text: "Very Strong", color: "bg-emerald-500"};
  };
  
  const strength = getStrength();

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          readOnly
          value={password}
          className="w-full p-4 pr-24 text-xl font-mono text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
        />
        <button
          onClick={copyToClipboard}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${strength.color} transition-all duration-300`} 
                style={{width: `${(strength.score / 7) * 100}%`}}
              ></div>
          </div>
          <span className="text-sm font-medium w-24 text-right">{strength.text}</span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="w-48">Length: {length}</label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(v => !v)} className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"/>
            <span>Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(v => !v)} className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"/>
            <span>Lowercase (a-z)</span>
          </label>
          <label className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(v => !v)} className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"/>
            <span>Numbers (0-9)</span>
          </label>
          <label className="flex items-center space-x-2 p-2 rounded-md bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(v => !v)} className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500"/>
            <span>Symbols (!@#$)</span>
          </label>
        </div>
      </div>
      <button
        onClick={generatePassword}
        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition"
      >
        Generate Password
      </button>
    </div>
  );
};
