import React from 'react';
import { Link } from 'react-router-dom';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { Tool } from '../types';
import { tools } from '../config/tools';
import { WrenchScrewdriverIcon, PencilSquareIcon } from '../components/Icons';

interface SingleToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const FeatureCard: React.FC<{ feature: Tool['features'][0] }> = ({ feature }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm h-full border border-gray-200 dark:border-gray-700">
    <div className="flex items-start">
       <feature.icon className="w-8 h-8 text-primary mr-4" />
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  </div>
);

const SidebarWidget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
      {title}
    </h3>
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
      <HomeHeader />

      {/* Hero Section */}
      <section 
        className="bg-slate-100 dark:bg-slate-800/50 py-8"
        style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23d1d5db" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`}}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{tool.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-primary">Home</Link> / 
            <Link to="/all-tools" className="hover:text-primary"> Tools</Link> / {tool.name}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Area */}
            <main className="flex-1 w-full lg:w-0">
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 mb-8">
                    {children}
                </div>

                {/* Features Section */}
                {tool.features && tool.features.length > 0 && (
                    <section className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tool.features.map((feature, index) => (
                            <FeatureCard key={index} feature={feature} />
                        ))}
                        </div>
                    </section>
                )}

                {/* About Section */}
                <article className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 md:p-8 prose dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About {tool.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{tool.about}</p>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">How to Use {tool.name}?</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                        {tool.howTo.map((step, index) => (
                            <li key={index}><strong>{step.title}:</strong> {step.description}</li>
                        ))}
                    </ul>
                </article>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
                <SidebarWidget title="Popular Tools">
                    <ul className="space-y-2">
                        {popularTools.map(t => (
                            <li key={t.path}>
                                <Link to={t.path} className="flex items-center gap-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
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
                                <Link to={t.path} className="flex items-center gap-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
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
      <Footer />
    </div>
  );
};