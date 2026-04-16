'use client';

import { useState } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { formatNumber } from '@/lib/utils';

export default function VoteButtons({ upvotes, downvotes, initialVote = 0, onVote, vertical = true }) {
    const [vote, setVote] = useState(initialVote); // 1: upvote, -1: downvote, 0: none
    const [currentScore, setCurrentScore] = useState(upvotes - downvotes);

    const handleVote = (type) => {
        let newVote = 0;
        if (type === 'up') {
            newVote = vote === 1 ? 0 : 1;
        } else {
            newVote = vote === -1 ? 0 : -1;
        }

        // Update score locally for instant feedback
        const scoreDiff = newVote - vote;
        setCurrentScore(currentScore + scoreDiff);
        setVote(newVote);

        if (onVote) {
            onVote(newVote);
        }
    };

    return (
        <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center 
                    gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-2xl 
                    border border-slate-100 dark:border-slate-800`}>
            <button
                onClick={() => handleVote('up')}
                className={`p-2 rounded-xl transition-all duration-200 ${vote === 1
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 scale-110'
                        : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                aria-label="Upvote"
            >
                <HiChevronUp className="w-6 h-6" />
            </button>

            <span className={`text-lg font-bold min-w-[1.5rem] text-center ${vote === 1 ? 'text-primary-600 dark:text-primary-400' :
                    vote === -1 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'
                }`}>
                {formatNumber(currentScore)}
            </span>

            <button
                onClick={() => handleVote('down')}
                className={`p-2 rounded-xl transition-all duration-200 ${vote === -1
                        ? 'bg-red-500 text-white shadow-lg shadow-red-500/25 scale-110'
                        : 'text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                aria-label="Downvote"
            >
                <HiChevronDown className="w-6 h-6" />
            </button>
        </div>
    );
}
