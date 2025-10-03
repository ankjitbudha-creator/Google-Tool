import React from 'react';
import Link from 'next/link';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link
      href={tool.path}
      className="group h-full bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transform transition-all duration-300 flex flex-col text-center p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary"
    >
      <div className="flex-grow flex flex-col items-center">
        <div className="mb-5 w-20 h-20 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full transition-colors duration-300 group-hover:bg-primary/20">
          <tool.icon className="w-10 h-10 text-primary transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{tool.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-grow">{tool.description}</p>
      </div>
      <div
        className="mt-auto inline-block px-6 py-2.5 text-white font-semibold bg-primary rounded-full group-hover:bg-primary-hover transition-colors duration-300 text-sm"
      >
        Try Now
      </div>
    </Link>
  );
};
