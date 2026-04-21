'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiOutlineSearch, HiOutlineLightningBolt, HiOutlineArrowRight, HiOutlineCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

const FILTERS = ['All', 'React', 'Node.js', 'Python', 'Database', 'AWS', 'Security'];
const PRIORITIES = { high: '#f87171', medium: '#d4a017', low: '#34d399' };

export default function ProblemsPage() {
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const fetchProblems = async () => {
            setLoading(true);
            try {
                let url = `${API_URL}/api/problems?`;
                if (activeFilter !== 'All') url += `category=${activeFilter}&`;
                if (search) url += `search=${search}&`;
                url += `sort=newest`;

                const res = await fetch(url);
                const data = await res.json();

                if (res.ok) {
                    setProblems(data);
                } else {
                    toast.error(data.message || 'Failed to fetch problems');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Could not connect to the server');
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchProblems, 300);
        return () => clearTimeout(debounce);
    }, [activeFilter, search, API_URL]);

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 88 }}>
            {/* Header */}
            <div style={{ background: '#0e2010', borderBottom: '1px solid rgba(74,158,92,0.12)', padding: '40px 24px 32px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <HiOutlineLightningBolt style={{ color: '#d4a017', width: 20, height: 20 }} />
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#d4a017' }}>PROBLEMS</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: '#f0ebe0', letterSpacing: '-0.02em', marginBottom: 8 }}>
                        Open Challenges
                    </h1>
                    <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)', marginBottom: 28 }}>Unsolved problems waiting for experts like you</p>

                    {/* Search + filters */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ position: 'relative', maxWidth: 520 }}>
                            <HiOutlineSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 18 }} />
                            <input
                                type="text" placeholder="Search problems..."
                                value={search} onChange={e => setSearch(e.target.value)}
                                className="input-field" style={{ paddingLeft: 44 }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {FILTERS.map(f => (
                                <button key={f} onClick={() => setActiveFilter(f)} style={{
                                    padding: '5px 14px', borderRadius: 100, border: 'none', cursor: 'pointer',
                                    fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', fontFamily: "'Bricolage Grotesque',sans-serif",
                                    background: activeFilter === f ? '#d4a017' : 'rgba(240,235,224,0.04)',
                                    color: activeFilter === f ? '#0a1a0d' : 'rgba(240,235,224,0.5)',
                                    transition: 'all 0.2s',
                                }}>{f}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Problems list */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 13, color: 'rgba(240,235,224,0.35)', fontWeight: 600 }}>{loading ? 'LOADING...' : `${problems.length} PROBLEMS FOUND`}</span>
                    <Link href="/problems/new" className="btn-primary" style={{ padding: '9px 20px', fontSize: 12 }}>+ POST PROBLEM</Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {loading ? (
                        [1, 2, 3].map(i => <div key={i} className="card" style={{ height: 140, opacity: 0.3, animation: 'pulse 1.5s infinite' }} />)
                    ) : (
                        problems.map((problem) => (
                            <Link key={problem._id} href={`/problems/${problem._id}`} style={{ textDecoration: 'none' }}>
                                <div className="card" style={{ padding: '24px 28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: PRIORITIES[problem.priority] || '#d4a017' }} />
                                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: PRIORITIES[problem.priority] || '#d4a017', textTransform: 'uppercase' }}>{problem.priority || 'medium'}</span>
                                            {problem.status === 'solved' && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#34d399', fontWeight: 700, letterSpacing: '0.06em' }}><HiOutlineCheck style={{ width: 12 }} />SOLVED</span>}
                                        </div>
                                        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#f0ebe0', marginBottom: 8, lineHeight: 1.4 }}>{problem.title}</h2>
                                        <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.4)', lineHeight: 1.6, marginBottom: 12, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{problem.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                            {(problem.tags || []).slice(0, 4).map(tag => (
                                                <span key={tag} className="badge badge-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                        <div style={{ fontSize: 20, fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 900, color: '#d4a017' }}>{problem.solutions?.length || 0}</div>
                                        <div style={{ fontSize: 11, color: 'rgba(240,235,224,0.3)', fontWeight: 600, letterSpacing: '0.06em' }}>SOLUTIONS</div>
                                        <HiOutlineArrowRight style={{ marginTop: 12, color: 'rgba(240,235,224,0.2)', width: 18, height: 18 }} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}

                    {!loading && problems.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <HiOutlineLightningBolt style={{ width: 48, height: 48, color: 'rgba(212,160,23,0.3)', margin: '0 auto 16px' }} />
                            <p style={{ color: 'rgba(240,235,224,0.3)', fontSize: 15 }}>No problems found. Be the first to post one!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
