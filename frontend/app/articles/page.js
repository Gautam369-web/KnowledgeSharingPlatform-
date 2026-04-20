'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import CategoryFilter from '@/components/CategoryFilter';
import { articles } from '@/lib/data';
import { HiOutlineSearch, HiOutlinePencilAlt, HiOutlineLightningBolt } from 'react-icons/hi';

export default function ArticlesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredArticle = articles.find(a => a.featured) || articles[0];

    return (
        <div className="page-container">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Knowledge Base
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Deep dives, tutorials and expert insights
                            </p>
                        </div>
                        <Link href="/articles/new" className="btn-primary">
                            <HiOutlinePencilAlt className="w-5 h-5 mr-2" />
                            Write Article
                        </Link>
                    </div>

                    {!searchQuery && selectedCategory === 'All' && (
                        <div className="mb-12">
                            <div className="flex items-center space-x-2 mb-6">
                                <HiOutlineLightningBolt className="w-5 h-5 text-amber-500" />
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">
                                    Featured Story
                                </h2>
                            </div>
                            <ArticleCard article={featuredArticle} featured />
                        </div>
                    )}

                    <div className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <CategoryFilter
                                selected={selectedCategory}
                                onSelect={setSelectedCategory}
                            />
                            <div className="relative w-full md:w-64">
                                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field pl-10 !py-2 text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredArticles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>

                        {filteredArticles.length === 0 && (
                            <div className="card p-12 text-center bg-slate-50 dark:bg-slate-900/50">
                                <p className="text-slate-500">No articles found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
