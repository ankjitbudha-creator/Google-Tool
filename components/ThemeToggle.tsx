import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from './Icons';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      return savedTheme;
    }
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const isDarkMode = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"}
      title={isDarkMode ? "Activate light mode" : "Activate dark mode"}
      className="p-2 rounded-full transition-colors duration-300 hover:bg-black/10 dark:hover:bg-white/10"
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </button>
  );
};
