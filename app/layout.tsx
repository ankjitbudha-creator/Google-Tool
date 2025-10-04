import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
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
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/@zxing/browser@0.1.5/umd/zxing-browser.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="lazyOnload" />
        <Script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs" type="module" strategy="lazyOnload" />
        <Script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js" strategy="lazyOnload" />
      </head>
      <body className="bg-light dark:bg-slate-900 flex flex-col min-h-screen">
        <HomeHeader />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
