'use client';

import { categories } from '@/lib/data';

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar 
                  pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onSelect('All')}
        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap 
                  transition-all duration-200 border-2 ${selected === 'All'
            ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/25'
            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary-200 dark:hover:border-primary-800'
          }`}
      >
        All Categories
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.name)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm 
                    font-bold whitespace-nowrap transition-all duration-200 
                    border-2 ${selected === cat.name
              ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/25'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-primary-200 dark:hover:border-primary-800'
            }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
}
