import React from 'react';
import { ClockIcon } from '../components/Icons';

export const PlaceholderToolPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg">
      <ClockIcon className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Tool Coming Soon!</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        We're working hard to bring this tool to you. Please check back later.
      </p>
    </div>
  );
};