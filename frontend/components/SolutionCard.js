'use client';

import { useState } from 'react';
import Link from 'next/link';
import { timeAgo, formatNumber } from '@/lib/utils';
import VoteButtons from '@/components/VoteButtons';
import CommentSection from '@/components/CommentSection';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import { HiOutlineCheckCircle, HiCheck } from 'react-icons/hi';

export default function SolutionCard({ solution, problemAuthorId }) {
    const { user, isAuthenticated } = useAuth();
    const [localSolution, setLocalSolution] = useState(solution);
    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const handleVote = async (type) => {
        if (!isAuthenticated) return toast.error('Sign in to vote');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/solutions/vote/${localSolution._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type })
            });
            if (res.ok) {
                const data = await res.json();
                setLocalSolution(prev => ({ ...prev, upvotes: data.upvotes, downvotes: data.downvotes }));
            }
        } catch (error) {
            toast.error('Voting failed');
        }
    };

    const handleAccept = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/solutions/accept/${localSolution._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                setLocalSolution(prev => ({ ...prev, isAccepted: true }));
                toast.success('Solution accepted!');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to accept solution');
            }
        } catch (error) {
            toast.error('Connection error');
        }
    };

    const isProblemAuthor = user && problemAuthorId === user._id;

    return (
        <div className="card" style={{
            padding: 32,
            border: localSolution.isAccepted ? '2px solid #6ec47a' : '1px solid rgba(74,158,92,0.12)',
            background: localSolution.isAccepted ? 'rgba(110,196,122,0.03)' : '#0e2010',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {localSolution.isAccepted && (
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    background: '#6ec47a', color: '#0a1a0d',
                    padding: '4px 12px', fontSize: 10, fontWeight: 900,
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    borderRadius: '0 0 0 12px'
                }}>
                    OPTIMAL SOLUTION
                </div>
            )}

            <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <VoteButtons
                        upvotes={localSolution.upvotes}
                        downvotes={localSolution.downvotes}
                        onVote={handleVote}
                    />
                    {localSolution.isAccepted ? (
                        <div style={{ color: '#6ec47a', textAlign: 'center' }}>
                            <HiOutlineCheckCircle style={{ width: 32, height: 32 }} />
                            <div style={{ fontSize: 10, fontWeight: 800, marginTop: 4 }}>ACCEPTED</div>
                        </div>
                    ) : (
                        isProblemAuthor && (
                            <button
                                onClick={handleAccept}
                                style={{
                                    background: 'transparent', border: '1px solid rgba(74,158,92,0.2)',
                                    color: 'rgba(74,158,92,0.6)', cursor: 'pointer', padding: 8,
                                    borderRadius: 12, transition: 'all 0.2s'
                                }}
                                title="Mark as accepted"
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#6ec47a'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(74,158,92,0.2)'}
                            >
                                <HiCheck style={{ width: 24, height: 24 }} />
                            </button>
                        )
                    )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontSize: 16, color: 'rgba(240,235,224,0.85)',
                        lineHeight: 1.7, marginBottom: 24, whiteSpace: 'pre-wrap'
                    }} dangerouslySetInnerHTML={{ __html: localSolution.content }} />

                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 24, paddingBottom: 24, borderTop: '1px solid rgba(74, 158, 92, 0.1)'
                    }}>
                        <Link href={`/profile/${localSolution.author?._id}`} style={{ textDecoration: 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <img
                                    src={localSolution.author?.avatar}
                                    alt=""
                                    style={{ width: 36, height: 36, borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(74, 158, 92, 0.2)' }}
                                />
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: '#f0ebe0' }}>{localSolution.author?.name}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(240, 235, 224, 0.4)', fontWeight: 600 }}>
                                        contributed {timeAgo(localSolution.createdAt)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Integrated Comment Section */}
                    <div style={{
                        marginTop: 0,
                        padding: '32px',
                        background: 'rgba(74, 158, 92, 0.02)',
                        borderRadius: '0 0 24px 24px',
                        borderTop: '1px solid rgba(74, 158, 92, 0.08)',
                        margin: '0 -32px -32px -32px'
                    }}>
                        <CommentSection
                            comments={localSolution.comments || []}
                            parentId={localSolution._id}
                            parentType="solution"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
