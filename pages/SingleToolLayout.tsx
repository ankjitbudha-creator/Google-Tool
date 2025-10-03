import React from 'react';
import { Link } from 'react-router-dom';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { Tool } from '../types';

interface SingleToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

const FeatureCard: React.FC<{ feature: Tool['features'][0] }> = ({ feature }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm h-full">
    <div className="flex items-start">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mr-4">
        <feature.icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
      </div>
    </div>
  </div>
);

export const SingleToolLayout: React.FC<SingleToolLayoutProps> = ({ tool, children }) => {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-900 min-h-screen flex flex-col">
      <HomeHeader />

      {/* Hero Section */}
      <section className="bg-primary pt-24 pb-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-indigo-200 mb-2">
            <Link to="/" className="hover:text-white">Home</Link> / 
            <Link to="/all-tools" className="hover:text-white"> Tools</Link> / {tool.name}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{tool.name}</h1>
          <p className="text-lg text-indigo-200 max-w-3xl mx-auto">{tool.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Tool Card */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg mb-12">
             <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 rounded-full mr-4">
                    <tool.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{tool.name}</h2>
            </div>
            {children}
          </div>

          {/* About Section */}
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">About {tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{tool.about}</p>
          </div>

          {/* How It Works Section */}
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">How {tool.name} Works:</h2>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
              {tool.howTo.map((step, index) => (
                <div key={index}>
                  <p className="text-gray-700 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-white">{step.title}:</span> {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          {tool.features && tool.features.length > 0 && (
            <div>
               <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tool.features.map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};