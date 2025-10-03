import React, { useState, useMemo } from 'react';
import { HomeHeader } from '../components/HomeHeader';
import { Footer } from '../components/Footer';
import { ToolCard } from '../components/ToolCard';
import { tools } from '../config/tools';
import { ToolCategory } from '../types';
import { MagnifyingGlassIcon } from '../components/Icons';

const categories = [ToolCategory.CALCULATOR, ToolCategory.CONVERTER, ToolCategory.GENERATOR, ToolCategory.UTILITY];

export const AllToolsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>('All');

    const filteredTools = useMemo(() => {
        return tools.filter(tool => {
            const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="bg-light dark:bg-slate-900">
            <HomeHeader />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-amber-500 pt-32 pb-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">All Tools</h1>
                    <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
                        Discover our complete collection of {tools.length} powerful digital tools designed to boost your productivity and simplify your daily tasks.
                    </p>
                    <div className="max-w-2xl mx-auto mb-6 relative">
                        <input
                            type="text"
                            placeholder="Search tools by name, description, or category..."
                            className="w-full pl-6 pr-12 py-4 text-gray-800 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 absolute right-5 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <div className="flex justify-center flex-wrap gap-3">
                        <button
                            onClick={() => setActiveCategory('All')}
                            className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeCategory === 'All' ? 'bg-white text-indigo-600 font-semibold' : 'bg-white/20 text-white hover:bg-white/30'}`}
                        >
                            All Tools
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full transition-colors duration-300 ${activeCategory === category ? 'bg-white text-indigo-600 font-semibold' : 'bg-white/20 text-white hover:bg-white/30'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools Grid Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredTools.map(tool => (
                            <ToolCard key={tool.path} tool={tool} />
                        ))}
                    </div>
                    {filteredTools.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No tools found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};
