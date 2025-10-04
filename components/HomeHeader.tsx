import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SparklesIcon, Bars3Icon, XMarkIcon } from './Icons';
import { tools } from '../config/tools';
import { ThemeToggle } from './ThemeToggle';

export const HomeHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isToolPage = tools.some(tool => tool.path === location.pathname);
  const isTransparentPage = ['/', '/all-tools', '/about', '/contact'].includes(location.pathname) || isToolPage;

  const headerClasses = isTransparentPage 
    ? "absolute top-0 left-0 right-0 z-20 bg-transparent text-white"
    : "relative bg-white dark:bg-slate-800 shadow-sm text-gray-800 dark:text-gray-200";

  const brandLinkClasses = isTransparentPage ? "text-white" : "text-gray-800 dark:text-white";
  
  const navLinkClasses = isTransparentPage 
    ? "hover:text-brand-yellow transition-colors"
    : "hover:text-primary transition-colors";
    
  const mobileMenuButtonClasses = isTransparentPage ? "text-white" : "text-gray-700 dark:text-gray-200";

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className={`flex items-center space-x-2 ${brandLinkClasses}`}>
            <SparklesIcon className="w-8 h-8" />
            <span className="text-2xl font-bold">Babal Tools</span>
          </Link>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className={navLinkClasses}>Home</Link>
              <Link to="/all-tools" className={navLinkClasses}>All Tools</Link>
              <Link to="/about" className={navLinkClasses}>About</Link>
              <Link to="/contact" className={navLinkClasses}>Contact</Link>
            </nav>
            <div className="ml-6">
                <ThemeToggle />
            </div>
            <div className="md:hidden ml-4">
              <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu" className={mobileMenuButtonClasses}>
                <Bars3Icon className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-secondary z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                <SparklesIcon className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">Babal Tools</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="text-white">
              <XMarkIcon className="w-8 h-8" />
            </button>
        </div>
        <nav className="flex flex-col items-center justify-center -mt-16 h-full space-y-8">
          <Link to="/" className="text-2xl font-semibold text-white hover:text-brand-yellow" onClick={handleLinkClick}>Home</Link>
          <Link to="/all-tools" className="text-2xl font-semibold text-white hover:text-brand-yellow" onClick={handleLinkClick}>All Tools</Link>
          <Link to="/about" className="text-2xl font-semibold text-white hover:text-brand-yellow" onClick={handleLinkClick}>About</Link>
          <Link to="/contact" className="text-2xl font-semibold text-white hover:text-brand-yellow" onClick={handleLinkClick}>Contact</Link>
        </nav>
      </div>
    </>
  );
};