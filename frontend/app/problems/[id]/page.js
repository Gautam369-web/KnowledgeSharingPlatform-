'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { timeAgo, formatNumber } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import VoteButtons from '@/components/VoteButtons';
import TagBadge from '@/components/TagBadge';
import SolutionCard from '@/components/SolutionCard';
import RichTextEditor from '@/components/RichTextEditor';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
    HiOutlineClock, HiOutlineEye, HiOutlineChatAlt2,
    HiOutlineShare, HiOutlineFlag, HiOutlinePencil,
    HiOutlineCheckCircle, HiOutlineArrowLeft
} from 'react-icons/hi';

export default function ProblemDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newSolution, setNewSolution] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [sortSolutions, setSortSolutions] = useState('votes');

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const fetchProblem = async () => {
        try {
            const res = await fetch(`${API_URL}/api/problems/${id}`);
            const data = await res.json();
            if (res.ok) {
                setProblem(data);
            } else {
                toast.error(data.message || 'Problem not found');
                router.push('/problems');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('Could not connect to the server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProblem();
    }, [id, API_URL]);

    const handleSubmitSolution = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error('Please sign in to post an answer');
            return;
        }
        if (!newSolution.trim() || newSolution.length < 30) {
            toast.error('Please provide a more detailed solution');
            return;
        }

        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/solutions/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newSolution })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Solution posted successfully!');
                setNewSolution('');
                fetchProblem(); // Refresh to show new solution
            } else {
                toast.error(data.message || 'Failed to post solution');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Could not connect to the server');
        } finally {
            setSubmitting(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    const handleProblemVote = async (type) => {
        if (!isAuthenticated) return toast.error('Sign in to vote');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/problems/${id}/vote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type })
            });
            if (res.ok) {
                const data = await res.json();
                setProblem(prev => ({ ...prev, upvotes: data.upvotes, downvotes: data.downvotes }));
            }
        } catch (error) {
            toast.error('Voting failed');
        }
    };

    if (loading) return <div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>;
    if (!problem) return null;

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 100, paddingBottom: 80 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                <Link
                    href="/problems"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: 'rgba(240,235,224,0.4)', textDecoration: 'none', marginBottom: 32 }}
                    className="hover-gold"
                >
                    <HiOutlineArrowLeft /> Back to Problems
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: '1fr 320px', gap: 48, alignItems: 'start' }}>
                    <div style={{ minWidth: 0 }}>
                        {/* Problem Header */}
                        <div style={{ marginBottom: 40 }}>
                            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#f0ebe0', marginBottom: 24, lineHeight: 1.2 }}>
                                {problem.title}
                            </h1>

                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, paddingBottom: 24, borderBottom: '1px solid rgba(74,158,92,0.12)' }}>
                                <span style={{ padding: '4px 12px', borderRadius: 100, background: 'rgba(74,158,92,0.1)', color: '#6ec47a', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {problem.status}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#d4a017' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4a017' }} />
                                    {problem.priority} Priority
                                </span>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, color: 'rgba(240,235,224,0.3)', fontSize: 12, fontWeight: 600 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <HiOutlineClock /> Asked {timeAgo(problem.createdAt)}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <HiOutlineEye /> {formatNumber(problem.views)} views
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <HiOutlineChatAlt2 /> {problem.solutions?.length || 0} answers
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Problem Body */}
                        <div style={{ display: 'flex', gap: 32, marginBottom: 60 }}>
                            <div style={{ display: 'none', md: 'block' }}>
                                <VoteButtons
                                    upvotes={problem.upvotes}
                                    downvotes={problem.downvotes}
                                    onVote={handleProblemVote}
                                />
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 16, color: 'rgba(240,235,224,0.8)', lineHeight: 1.7, marginBottom: 32 }} dangerouslySetInnerHTML={{ __html: problem.description }} />

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
                                    {problem.tags.map(tag => (
                                        <TagBadge key={tag} tag={tag} />
                                    ))}
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: '24px 0', borderTop: '1px solid rgba(74,158,92,0.12)' }}>
                                    <div style={{ display: 'flex', gap: 20 }}>
                                        <button onClick={handleShare} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(240,235,224,0.3)', fontSize: 13, fontWeight: 700 }}>
                                            <HiOutlineShare /> Share
                                        </button>
                                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(240,235,224,0.3)', fontSize: 13, fontWeight: 700 }}>
                                            <HiOutlineFlag /> Report
                                        </button>
                                    </div>

                                    <Link href={`/profile/${problem.author?._id}`} style={{ textDecoration: 'none' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', background: 'rgba(74,158,92,0.05)', borderRadius: 16, border: '1px solid rgba(74,158,92,0.1)' }}>
                                            <img src={problem.author?.avatar} alt="" style={{ width: 40, height: 40, borderRadius: 12 }} />
                                            <div>
                                                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AUTHOR</div>
                                                <div style={{ fontSize: 14, fontWeight: 800, color: '#f0ebe0' }}>{problem.author?.name}</div>
                                                <div style={{ fontSize: 11, fontWeight: 700, color: '#d4a017' }}>{problem.author?.reputation} Reputation</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Solutions Section */}
                        <div style={{ marginBottom: 60 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: '#f0ebe0' }}>
                                    {problem.solutions?.length || 0} {problem.solutions?.length === 1 ? 'Solution' : 'Solutions'}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(240,235,224,0.3)', textTransform: 'uppercase' }}>SORT:</span>
                                    <select
                                        value={sortSolutions}
                                        onChange={(e) => setSortSolutions(e.target.value)}
                                        style={{ background: 'transparent', border: 'none', color: '#6ec47a', fontSize: 12, fontWeight: 700, cursor: 'pointer', outline: 'none' }}
                                    >
                                        <option value="votes">Highest Rated</option>
                                        <option value="newest">Newest First</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                {problem.solutions?.map((solution) => (
                                    <SolutionCard key={solution._id} solution={solution} problemAuthorId={problem.author?._id} />
                                ))}
                            </div>
                        </div>

                        {/* Post Solution Section */}
                        <div style={{
                            padding: 48,
                            borderRadius: 32,
                            background: 'rgba(14, 32, 16, 0.4)',
                            border: '1px solid rgba(74, 158, 92, 0.12)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #d4a017, transparent)' }} />

                            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 40, height: 40, background: 'rgba(212, 160, 23, 0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <HiOutlinePencil style={{ width: 22, height: 22, color: '#d4a017' }} />
                                </div>
                                YOUR SOLUTION
                            </h3>

                            {isAuthenticated ? (
                                <form onSubmit={handleSubmitSolution} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                    <RichTextEditor
                                        value={newSolution}
                                        onChange={setNewSolution}
                                        placeholder="Explain your approach and provide code snippets..."
                                    />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.3)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                                            <HiOutlineCheckCircle style={{ width: 18, height: 18, color: '#6ec47a' }} /> Quality contributions earn +25 reputation
                                        </p>
                                        <button type="submit" disabled={submitting} className="btn-primary" style={{ padding: '16px 40px', fontSize: 14 }}>
                                            {submitting ? 'SYNCING...' : 'PUBLISH SOLUTION'}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '64px 24px', background: 'rgba(74, 158, 92, 0.02)', borderRadius: 24, border: '1px dashed rgba(74, 158, 92, 0.1)' }}>
                                    <div style={{ width: 64, height: 64, background: 'rgba(240,235,224,0.03)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                        <HiOutlineChatAlt2 style={{ width: 32, height: 32, color: 'rgba(240,235,224,0.1)' }} />
                                    </div>
                                    <h4 style={{ fontSize: 18, fontWeight: 800, color: '#f0ebe0', marginBottom: 12 }}>Contribute to the collective</h4>
                                    <p style={{ color: 'rgba(240,235,224,0.4)', fontSize: 14, maxWidth: 400, margin: '0 auto 32px', lineHeight: 1.6 }}>Sign in to share your expertise and help others solve this technical challenge.</p>
                                    <Link href="/login" className="btn-primary" style={{ padding: '14px 40px' }}>Sign In to Participate</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ position: 'sticky', top: 100 }}>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
