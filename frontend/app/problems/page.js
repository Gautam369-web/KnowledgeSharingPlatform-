'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProblemCard from '@/components/ProblemCard';
import Sidebar from '@/components/Sidebar';
import CategoryFilter from '@/components/CategoryFilter';
import { problems } from '@/lib/data';
import { HiOutlineSearch, HiOutlinePlus, HiOutlineAdjustments } from 'react-icons/hi';

export default function ProblemsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    const filteredProblems = problems.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="page-container">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                Technical Challenges
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 mt-1">
                                Browse and solve problems from the community
                            </p>
                        </div>
                        <Link href="/problems/new" className="btn-primary">
                            <HiOutlinePlus className="w-5 h-5 mr-2" />
                            Ask Question
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Filters Bar */}
                        <div className="space-y-4">
                            <div className="relative">
                                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search problems by title, description or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field pl-12"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <CategoryFilter
                                    selected={selectedCategory}
                                    onSelect={setSelectedCategory}
                                />

                                <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 
                              p-1 rounded-xl border border-slate-100 dark:border-slate-800">
                                    <span className="pl-3 text-xs font-bold text-slate-400 uppercase">Sort:</span>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-transparent text-sm font-bold text-slate-700 
                             dark:text-slate-300 focus:outline-none px-3 py-1.5 cursor-pointer"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="active">Recently Active</option>
                                        <option value="votes">Highest Votes</option>
                                        <option value="unsolved">Unsolved</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Results Info */}
                        <div className="flex items-center justify-between text-sm">
                            <p className="text-slate-500 font-medium">
                                Showing <span className="text-slate-900 dark:text-white font-bold">{filteredProblems.length}</span> problems
                            </p>
                            {selectedCategory !== 'All' && (
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className="text-primary-600 font-bold hover:underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* Problems List */}
                        <div className="space-y-4">
                            {filteredProblems.length > 0 ? (
                                filteredProblems.map((problem) => (
                                    <ProblemCard key={problem.id} problem={problem} />
                                ))
                            ) : (
                                <div className="card p-20 text-center">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full 
                                flex items-center justify-center mx-auto mb-6">
                                        <HiOutlineSearch className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
                                        We couldn&apos;t find any problems matching your search criteria.
                                        Try adjusting your keywords or category.
                                    </p>
                                    <button
                                        onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                        className="btn-secondary"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination placeholder */}
                        {filteredProblems.length > 0 && (
                            <div className="flex items-center justify-center pt-8">
                                <nav className="flex items-center space-x-2">
                                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-50" disabled>Previous</button>
                                    <button className="w-10 h-10 rounded-lg bg-primary-600 text-white font-bold">1</button>
                                    <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">2</button>
                                    <button className="w-10 h-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">3</button>
                                    <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800">Next</button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
