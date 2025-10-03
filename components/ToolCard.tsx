import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div
      className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 flex flex-col text-center p-6 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary"
    >
      <div className="flex-grow">
        <div className="mx-auto mb-5 w-16 h-16 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
          <tool.icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{tool.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">{tool.description}</p>
      </div>
      <Link
        to={tool.path}
        className="mt-auto inline-block px-6 py-2 text-white font-semibold bg-primary rounded-full hover:bg-primary-hover transition-colors duration-300"
      >
        Try Now
      </Link>
    </div>
  );
};