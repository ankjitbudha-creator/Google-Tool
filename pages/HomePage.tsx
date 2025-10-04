import React from 'react';
import { Link } from 'react-router-dom';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import { tools } from '../config/tools';
import { 
    RocketLaunchIcon, 
    CalculatorIcon,
    QrCodeIcon,
    ClockIcon,
    DocumentTextIcon
} from '../components/Icons';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { siteConfig } from '../config/site';

const testimonials = [
    {
        quote: "Babal Tools has been a game-changer for my daily tasks. The word counter and password generator save me hours every week and ensures I'm always secure.",
        name: "Alex Shrestha",
        title: "Frontend Developer"
    },
    {
        quote: "As a student, the calculators and converters are incredibly useful. They simplified my project management. I can now focus more on learning and less on tedious calculations.",
        name: "Sunita Gurung",
        title: "Computer Science Student"
    },
    {
        quote: "The customer support team is exceptional. They helped me understand how to best use the tools and even provided personalized advice for my specific needs.",
        name: "Bikram Adhikari",
        title: "Project Manager"
    }
];

const featuredTools = tools.slice(0, 6);

const HeroIconCard: React.FC<{icon: React.ElementType, text: string, className?: string}> = ({ icon: Icon, text, className }) => (
    <div className={`absolute backdrop-blur-sm bg-white/10 p-4 rounded-xl shadow-lg flex items-center space-x-3 text-white ${className}`}>
        <Icon className="w-8 h-8"/>
        <span className="font-semibold">{text}</span>
    </div>
);


export const HomePage: React.FC = () => {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": siteConfig.baseURL,
      "name": siteConfig.name,
      "description": siteConfig.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteConfig.baseURL}/#/all-tools?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": siteConfig.baseURL,
      "name": siteConfig.name,
      "logo": siteConfig.logo,
    }
  ];

  return (
    <div className="bg-light dark:bg-slate-900 text-gray-800 dark:text-gray-300">
      <SchemaMarkup schema={schemas} />
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                    Welcome to <span className="text-brand-yellow">Babal</span> Tools
                </h1>
                <p className="text-lg md:text-xl text-indigo-200 max-w-xl mx-auto md:mx-0 mb-8">
                    Modern digital tools for productivity, efficiency, and seamless workflow management.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mb-10">
                    <div className="text-center">
                        <p className="text-4xl font-bold">18+</p>
                        <p className="text-indigo-200">Powerful Tools</p>
                    </div>
                     <div className="w-px h-12 bg-indigo-400 hidden sm:block"></div>
                    <div className="text-center">
                        <p className="text-4xl font-bold">100%</p>
                        <p className="text-indigo-200">Free to Use</p>
                    </div>
                    <div className="w-px h-12 bg-indigo-400 hidden sm:block"></div>
                     <div className="text-center">
                        <p className="text-4xl font-bold">Fast</p>
                        <p className="text-indigo-200">Lightning Speed</p>
                    </div>
                </div>
                <Link to="/all-tools" className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105">
                    <RocketLaunchIcon className="w-6 h-6 animate-[float_3s_ease-in-out_infinite]" />
                    Explore Tools
                </Link>
            </div>
            
            {/* Right Animated Icons */}
            <div className="relative h-80 hidden md:block">
                <HeroIconCard icon={CalculatorIcon} text="Calculator" className="top-10 left-10 animate-float" />
                <HeroIconCard icon={QrCodeIcon} text="QR Generator" className="top-20 right-5 animate-float-delay-1" />
                <HeroIconCard icon={ClockIcon} text="Timer" className="bottom-24 left-0 animate-float-delay-2" />
                <HeroIconCard icon={DocumentTextIcon} text="Invoice" className="bottom-10 right-20 animate-float" />
            </div>

          </div>
        </div>
      </section>
      
       {/* Our Tools Section */}
       <section className="py-20">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Tools</h2>
                  <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Discover our collection of essential tools designed to make your digital life easier.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredTools.map(tool => (
                      <ToolCard key={tool.path} tool={tool} />
                  ))}
              </div>
              <div className="text-center mt-12">
                  <Link to="/all-tools" className="px-8 py-3 text-white font-semibold bg-primary rounded-full hover:bg-primary-hover transition-colors duration-300">
                    View All Tools
                  </Link>
              </div>
          </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100 dark:bg-black/20 py-20">
          <div className="container mx-auto px-6">
               <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white">How It Works</h2>
                    <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Get started with Babal Tools in just three simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md">
                        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-amber-400 text-secondary rounded-full shadow-lg">
                            <span className="text-3xl font-bold">1</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 dark:text-white">Select a Tool</h3>
                        <p className="text-gray-500 dark:text-gray-400">Choose from our collection of specialized utilities.</p>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md">
                        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-amber-400 text-secondary rounded-full shadow-lg">
                             <span className="text-3xl font-bold">2</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 dark:text-white">Input Your Data</h3>
                        <p className="text-gray-500 dark:text-gray-400">Enter the required information in the tool's interface.</p>
                    </div>
                     <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md">
                        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-amber-400 text-secondary rounded-full shadow-lg">
                            <span className="text-3xl font-bold">3</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 dark:text-white">Get Results</h3>
                        <p className="text-gray-500 dark:text-gray-400">Receive instant output that you can copy or use.</p>
                    </div>
                </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">What Our Users Say</h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Trusted by thousands of developers and professionals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                        <p className="text-gray-600 dark:text-gray-400 mb-6 italic">"{testimonial.quote}"</p>
                        <div className="text-right">
                            <p className="font-bold text-primary">{testimonial.name}</p>
                            <p className="text-base text-gray-500">{testimonial.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};