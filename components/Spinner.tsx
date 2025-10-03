import React from 'react';

export const Spinner: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div role="status" className="flex flex-col justify-center items-center h-full gap-4 text-center py-10">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      {text && <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{text}</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
