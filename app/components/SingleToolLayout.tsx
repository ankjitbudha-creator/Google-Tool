import React from 'react';
import Link from 'next/link';
import { Tool } from '../types';
import { tools } from '../config/tools';
import { WrenchScrewdriverIcon, PencilSquareIcon } from './Icons';

interface SingleToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const FeatureCard: React.FC<{ feature: Tool['features'][0] }> = ({ feature }) => (
  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg h-full border border-gray-200 dark:border-gray-700">
    <div className="flex items-start">
       <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mr-4">
            <feature.icon className="w-6 h-6 text-primary" />
       </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  </div>
);

const HowToStep: React.FC<{ step: Tool['howTo'][0], index: number }> = ({ step, index }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full text-primary font-bold text-xl">
            {index + 1}
        </div>
        <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{step.title}</h4>
            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
        </div>
    </div>
);

const SidebarWidget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
    {title && (
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h3>
    )}
    {children}
  </div>
);

const AdPlaceholder: React.FC<{ isLarge?: boolean, title: string, description: string }> = ({ isLarge = true, title, description }) => (
    <div className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center p-6 ${isLarge ? 'h-64 flex flex-col justify-center' : ''}`}>
        <h4 className="font-semibold text-gray-600 dark:text-gray-300">{title}</h4>
        <p className="text-sm text-gray-400 dark:text-gray-500">{description}</p>
    </div>
);


export const SingleToolLayout: React.FC<SingleToolLayoutProps> = ({ tool, children }) => {

  const popularTools = tools.slice(0, 6);
  const relatedTools = tools.filter(t => t.category === tool.category && t.path !== tool.path).slice(0, 6);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-300 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-indigo-200 mb-2">
            <Link href="/" className="hover:text-white">Home</Link> / 
            <Link href="/all-tools" className="hover:text-white"> Tools</Link>
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{tool.name}</h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <main className="flex-1 w-full lg:w-0">
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                    {children}
                </div>

                {/* Detailed Info Sections Wrapper */}
                <div className="space-y-12 mt-12">
                    {/* About Section */}
                    <section>
                        <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About {tool.name}</h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{tool.about}</p>
                        </div>
                    </section>

                    {/* How to Use Section */}
                    {tool.howTo && tool.howTo.length > 0 && (
                        <section>
                            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">How to Use This Tool</h2>
                                <div className="space-y-6">
                                    {tool.howTo.map((step, index) => (
                                        <HowToStep key={index} step={step} index={index} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Features Section */}
                    {tool.features && tool.features.length > 0 && (
                        <section>
                            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8">
                                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Key Features</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {tool.features.map((feature, index) => (
                                        <FeatureCard key={index} feature={feature} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
                <SidebarWidget title="Popular Tools">
                    <ul className="space-y-2">
                        {popularTools.map(t => (
                            <li key={t.path}>
                                <Link href={t.path} className="flex items-center gap-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                    <t.icon className="w-5 h-5" />
                                    <span>{t.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SidebarWidget>

                <SidebarWidget title="Advertisement">
                   <AdPlaceholder title="Advertisement" description="Your ad could be here." />
                </SidebarWidget>
                
                 <SidebarWidget title="Related Tools">
                    <ul className="space-y-2">
                        {relatedTools.length > 0 ? relatedTools.map(t => (
                             <li key={t.path}>
                                <Link href={t.path} className="flex items-center gap-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                     <t.icon className="w-5 h-5" />
                                    <span>{t.name}</span>
                                </Link>
                            </li>
                        )) : (
                            <p className="text-sm text-gray-400">No related tools found.</p>
                        )}
                    </ul>
                </SidebarWidget>
                
                 <SidebarWidget title="">
                   <AdPlaceholder isLarge={false} title="Your Ads Here" description="Advertise with us. Contact for more info."/>
                </SidebarWidget>
            </aside>
        </div>
      </div>
    </div>
  );
};