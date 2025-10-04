import React, { useState, useMemo } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText === '' ? 0 : trimmedText.split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length;
    
    return {
        words,
        characters,
        charactersNoSpaces,
        paragraphs,
    };
  }, [text]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-center">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.words}</p>
              <p className="text-base text-gray-600 dark:text-gray-400">Words</p>
          </div>
           <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.characters}</p>
              <p className="text-base text-gray-600 dark:text-gray-400">Characters</p>
          </div>
           <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.charactersNoSpaces}</p>
              <p className="text-base text-gray-600 dark:text-gray-400">Characters (no spaces)</p>
          </div>
           <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{stats.paragraphs}</p>
              <p className="text-base text-gray-600 dark:text-gray-400">Paragraphs</p>
          </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-80 p-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
      />
       <button 
        onClick={() => setText('')}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
        disabled={!text}
       >
        Clear Text
       </button>
    </>
  );
};