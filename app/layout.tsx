import React from 'react';
import type { Metadata } from 'next';
import { HomeHeader } from './components/HomeHeader';
import { Footer } from './components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Babal Tools: Online Tools Suite',
  description: 'A comprehensive collection of online tools including calculators, converters, generators, and utilities, designed for developers and everyday users. All tools are client-side and work offline.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-light dark:bg-slate-900 flex flex-col min-h-screen">
        <HomeHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
