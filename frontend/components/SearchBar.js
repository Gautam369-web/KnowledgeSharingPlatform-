'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

export default function SearchBar({ placeholder = "Search for problems, articles, people...", fullWidth = false }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className={`relative group ${fullWidth ? 'w-full' : 'max-w-2xl mx-auto'}`}
        >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <HiOutlineSearch className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-900 
                 border-2 border-slate-100 dark:border-slate-800 rounded-2xl 
                 text-slate-900 dark:text-white placeholder-slate-400 
                 focus:outline-none focus:ring-4 focus:ring-primary-500/10 
                 focus:border-primary-500 transition-all duration-300 
                 shadow-lg shadow-slate-200/50 dark:shadow-none"
            />
            {query && (
                <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                    <HiOutlineX className="h-5 w-5" />
                </button>
            )}
            <div className="absolute inset-y-2 right-2 hidden sm:block">
                <button
                    type="submit"
                    className="px-4 h-full bg-primary-600 text-white font-bold 
                   rounded-xl hover:bg-primary-700 transition-all 
                   active:scale-95 shadow-md shadow-primary-500/20"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
