import React, { useState, useCallback } from 'react';
import { ArrowPathIcon, PlayIcon, DocumentDuplicateIcon, TrashIcon } from '../../components/Icons';

export const FindAndReplaceTool: React.FC = () => {
  const [text, setText] = useState('');
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [findError, setFindError] = useState(false);
  
  const [lastReplacedIndex, setLastReplacedIndex] = useState(-1);

  const handleReplaceAll = () => {
    if (!findText) {
      setFindError(true);
      setTimeout(() => setFindError(false), 500);
      return;
    }
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(findText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
    setText(text.replace(regex, replaceText));
    setLastReplacedIndex(-1);
  };
  
  const handleReplaceOne = () => {
    if (!findText) {
      setFindError(true);
      setTimeout(() => setFindError(false), 500);
      return;
    }
    const flags = caseSensitive ? '' : 'i';
    const regex = new RegExp(findText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), flags);
    
    const searchFrom = lastReplacedIndex === -1 ? 0 : lastReplacedIndex + 1;
    const match = text.substring(searchFrom).match(regex);
    
    if (match && typeof match.index === 'number') {
      const matchIndex = searchFrom + match.index;
      const newText = 
        text.substring(0, matchIndex) + 
        replaceText + 
        text.substring(matchIndex + findText.length);
      
      setText(newText);
      setLastReplacedIndex(matchIndex);
    } else {
      setLastReplacedIndex(-1); // Reset if no more matches found
    }
  };

  const copyToClipboard = useCallback(() => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleClear = () => {
    setText('');
    setFindText('');
    setReplaceText('');
    setCaseSensitive(false);
    setLastReplacedIndex(-1);
    setCopied(false);
  };
  
  const buttonBaseClasses = "w-full py-2.5 px-4 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2";

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="your-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Text:</label>
        <textarea
          id="your-text"
          rows={8}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700 text-gray-800 dark:text-white"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setLastReplacedIndex(-1);
          }}
          placeholder="Paste or type your text here..."
        />
      </div>

      <div>
        <label htmlFor="find-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Find:</label>
        <input
          id="find-text"
          type="text"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700 text-gray-800 dark:text-white ${findError ? 'animate-shake border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
          value={findText}
          onChange={(e) => {
            setFindText(e.target.value);
            setLastReplacedIndex(-1);
          }}
          placeholder="Word or phrase to find"
        />
      </div>
      <div>
        <label htmlFor="replace-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Replace with:</label>
        <input
          id="replace-text"
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-light dark:bg-gray-700 text-gray-800 dark:text-white"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replacement word or phrase"
        />
      </div>

      <div className="pt-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 rounded text-primary focus:ring-primary"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Case sensitive</span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
        <button onClick={handleReplaceAll} className={`${buttonBaseClasses} bg-primary hover:bg-primary-hover`}>
          <ArrowPathIcon className="w-5 h-5" /> Replace All
        </button>
        <button onClick={handleReplaceOne} className={`${buttonBaseClasses} bg-amber-500 hover:bg-amber-600`}>
          <PlayIcon className="w-5 h-5" /> Replace One
        </button>
        <button onClick={copyToClipboard} className={`${buttonBaseClasses} bg-emerald-500 hover:bg-emerald-600`}>
          <DocumentDuplicateIcon className="w-5 h-5" /> {copied ? 'Copied!' : 'Copy Result'}
        </button>
        <button onClick={handleClear} className={`${buttonBaseClasses} bg-red-600 hover:bg-red-700`}>
          <TrashIcon className="w-5 h-5" /> Clear
        </button>
      </div>
    </div>
  );
};