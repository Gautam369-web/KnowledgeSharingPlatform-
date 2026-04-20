'use client';

import Link from 'next/link';
import { HiOutlineTag } from 'react-icons/hi';

export default function TagBadge({ tag, interactive = true }) {
    const content = (
        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-sm 
                   font-medium bg-primary-50 dark:bg-primary-900/20 
                   text-primary-700 dark:text-primary-300 border 
                   border-primary-100 dark:border-primary-800/50 
                   transition-all hover:bg-primary-100 dark:hover:bg-primary-900/40">
            <HiOutlineTag className="w-3.5 h-3.5 mr-1.5 opacity-60" />
            {tag}
        </span>
    );

    if (!interactive) return content;

    return (
        <Link href={`/problems?tag=${encodeURIComponent(tag)}`}>
            {content}
        </Link>
    );
}
