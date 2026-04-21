'use client';

import { useState, useEffect } from 'react';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';
import { formatNumber } from '@/lib/utils';

export default function VoteButtons({ upvotes = 0, downvotes = 0, initialVote = 0, onVote, vertical = true }) {
    const [vote, setVote] = useState(initialVote); // 1: upvote, -1: downvote, 0: none
    const [currentScore, setCurrentScore] = useState(upvotes - downvotes);

    // Sync score if props change
    useEffect(() => {
        setCurrentScore(upvotes - downvotes);
    }, [upvotes, downvotes]);

    const handleVote = (type) => {
        let newVote = 0;
        if (type === 'up') {
            newVote = vote === 1 ? 0 : 1;
        } else {
            newVote = vote === -1 ? 0 : -1;
        }

        // Update score locally for instant feedback
        const scoreDiff = newVote - vote;
        setCurrentScore(prev => prev + scoreDiff);
        setVote(newVote);

        if (onVote) {
            // Pass the action type to the parent
            onVote(type === 'up' ? 'upvote' : 'downvote');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(74,158,92,0.05)',
            padding: 12,
            borderRadius: 20,
            border: '1px solid rgba(74,158,92,0.1)'
        }}>
            <button
                onClick={() => handleVote('up')}
                style={{
                    background: vote === 1 ? '#d4a017' : 'transparent',
                    border: 'none',
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: vote === 1 ? '#0a1a0d' : 'rgba(240,235,224,0.4)',
                    transition: 'all 0.2s',
                    boxShadow: vote === 1 ? '0 8px 24px rgba(212,160,23,0.3)' : 'none'
                }}
            >
                <HiChevronUp style={{ width: 28, height: 28 }} />
            </button>

            <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 18,
                fontWeight: 800,
                color: vote === 1 ? '#d4a017' : vote === -1 ? '#ff5555' : '#f0ebe0',
                minWidth: 40,
                textAlign: 'center'
            }}>
                {formatNumber(currentScore)}
            </span>

            <button
                onClick={() => handleVote('down')}
                style={{
                    background: vote === -1 ? '#ff5555' : 'transparent',
                    border: 'none',
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: vote === -1 ? '#0a1a0d' : 'rgba(240,235,224,0.4)',
                    transition: 'all 0.2s',
                    boxShadow: vote === -1 ? '0 8px 24px rgba(255,85,85,0.2)' : 'none'
                }}
            >
                <HiChevronDown style={{ width: 28, height: 28 }} />
            </button>
        </div>
    );
}
