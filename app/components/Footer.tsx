import React from 'react';
import Link from 'next/link';
import { SparklesIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <SparklesIcon className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-white">Babal Tools</span>
            </div>
            <p className="text-gray-400">
              Your all-in-one platform for modern digital tools, making productivity and efficiency accessible to everyone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/all-tools" className="hover:text-primary transition-colors">All Tools</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Tools */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Popular Tools</h3>
            <ul className="space-y-2">
               <li><Link href="/generators/invoice-generator" className="hover:text-primary transition-colors">Invoice Generator</Link></li>
               <li><Link href="/converters/preeti-to-unicode" className="hover:text-primary transition-colors">Preeti to Unicode</Link></li>
               <li><Link href="/converters/nepali-date-converter" className="hover:text-primary transition-colors">Date Converter</Link></li>
               <li><Link href="/converters/word-case-converter" className="hover:text-primary transition-colors">Word Case Converter</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="mb-2">New Baneshwor, Kathmandu, Nepal</p>
            <p className="mb-2">+977 9813478706</p>
            <p>info@babaltools.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
           <p>&copy; 2025 Babal Tools. All Rights Reserved. | Designed with ❤️ for Productivity</p>
        </div>
      </div>
    </footer>
  );
};