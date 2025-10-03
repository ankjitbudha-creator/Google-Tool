"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ToolCard } from '../components/ToolCard';
import { tools } from '../config/tools';
import { ToolCategory } from '../types';
import { 
    MagnifyingGlassIcon,
    WrenchScrewdriverIcon,
    CalculatorIcon,
    ArrowsRightLeftIcon,
    SparklesIcon,
    PencilSquareIcon
} from '../components/Icons';

const categoriesWithIcons = [
    { name: 'All Tools', icon: WrenchScrewdriverIcon, category: 'All' },
    { name: ToolCategory.CALCULATOR, icon: CalculatorIcon, category: ToolCategory.CALCULATOR },
    { name: ToolCategory.CONVERTER, icon: ArrowsRightLeftIcon, category: ToolCategory.CONVERTER },
    { name: ToolCategory.GENERATOR, icon: SparklesIcon, category: ToolCategory.GENERATOR },
    { name: ToolCategory.UTILITY, icon: PencilSquareIcon, category: ToolCategory.UTILITY },
];

export default function AllToolsPage() {
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
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 pt-32 pb-20 text-white">
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
                </div>
            </section>

            {/* Main content with sidebar */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol className="flex items-center space-x-1 text-sm">
                            <li>
                                <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors">Home</Link>
                            </li>
                            <li>
                                <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
                            </li>
                            <li>
                                {activeCategory === 'All' ? (
                                    <span className="font-medium text-gray-800 dark:text-white">All Tools</span>
                                ) : (
                                    <button onClick={() => setActiveCategory('All')} className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-indigo-400 transition-colors">All Tools</button>
                                )}
                            </li>
                            {activeCategory !== 'All' && (
                                <>
                                    <li>
                                        <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
                                    </li>
                                    <li>
                                        <span className="font-medium text-gray-800 dark:text-white">{activeCategory}</span>
                                    </li>
                                </>
                            )}
                        </ol>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <aside className="w-full lg:w-64 flex-shrink-0">
                            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 sticky top-24 border border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-700">Categories</h3>
                                <ul className="space-y-1">
                                    {categoriesWithIcons.map(({ name, icon: Icon, category }) => (
                                        <li key={name}>
                                            <button
                                                onClick={() => setActiveCategory(category)}
                                                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors duration-200 ${
                                                    activeCategory === category
                                                        ? 'bg-primary text-white font-semibold'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                <span>{name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Tools Grid Section */}
                        <main className="flex-1">
                            {filteredTools.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {filteredTools.map(tool => (
                                        <ToolCard key={tool.path} tool={tool} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No tools found</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filter.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
};