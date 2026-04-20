'use client';

import { useTheme } from '@/context/ThemeContext';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 
               dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 
               transition-all duration-300 border border-slate-200 dark:border-slate-700"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <HiOutlineSun className="w-5 h-5 animate-scale-in" />
            ) : (
                <HiOutlineMoon className="w-5 h-5 animate-scale-in" />
            )}
        </button>
    );
}
