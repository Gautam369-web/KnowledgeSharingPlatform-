'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HiOutlineSearch, HiOutlineLightningBolt, HiOutlineBookOpen, HiOutlineChevronRight } from 'react-icons/hi';
import toast from 'react-hot-toast';

function SearchContent() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const [query, setQuery] = useState(initialQuery);
    const [results, setResults] = useState({ problems: [], articles: [] });
    const [loading, setLoading] = useState(false);
    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length > 1) {
                setLoading(true);
                try {
                    const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
                    const data = await res.json();
                    if (res.ok) {
                        setResults(data);
                    }
                } catch (error) {
                    console.error('Search failed');
                } finally {
                    setLoading(false);
                }
            } else {
                setResults({ problems: [], articles: [] });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, API_URL]);

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 100 }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(212,160,23,0.1)', padding: '6px 16px', borderRadius: 100, marginBottom: 24 }}>
                        <HiOutlineSearch style={{ color: '#d4a017' }} />
                        <span style={{ fontSize: 11, fontWeight: 900, color: '#d4a017', letterSpacing: '0.1em' }}>GLOBAL ACCESS</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: '#f0ebe0', marginBottom: 20, letterSpacing: '-0.02em' }}>
                        Scan the <span style={{ color: '#d4a017' }}>Ecosystem</span>
                    </h1>
                </div>

                {/* Search input */}
                <div style={{ position: 'relative', marginBottom: 60 }}>
                    <HiOutlineSearch style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', color: '#d4a017', fontSize: 24 }} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Search problems, articles, wisdom..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '24px 24px 24px 64px',
                            background: '#0e2010',
                            border: '1px solid rgba(74,158,92,0.2)',
                            borderRadius: 24,
                            color: '#f0ebe0',
                            fontSize: 18,
                            outline: 'none',
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            transition: 'all 0.3s',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.2)'
                        }}
                        onFocus={e => e.target.style.borderColor = '#d4a017'}
                        onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'}
                    />
                </div>

                {/* Results */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                        <div className="loading-spinner" />
                    </div>
                ) : query.length > 1 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                        {results.problems.length > 0 && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(212,160,23,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <HiOutlineLightningBolt style={{ color: '#d4a017' }} />
                                    </div>
                                    <h2 style={{ fontSize: 13, fontWeight: 900, color: '#f0ebe0', letterSpacing: '0.1em' }}>PROBLEMS FOUND</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {results.problems.map((p) => (
                                        <Link key={p._id} href={`/problems/${p._id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card hover-lift" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                    <span style={{ fontSize: 16, fontWeight: 700, color: '#f0ebe0' }}>{p.title}</span>
                                                    <span className="badge-primary" style={{ fontSize: 10 }}>{p.category}</span>
                                                </div>
                                                <HiOutlineChevronRight style={{ color: 'rgba(240,235,224,0.2)' }} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.articles.length > 0 && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(110,196,122,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <HiOutlineBookOpen style={{ color: '#6ec47a' }} />
                                    </div>
                                    <h2 style={{ fontSize: 13, fontWeight: 900, color: '#f0ebe0', letterSpacing: '0.1em' }}>ARTICLES FOUND</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {results.articles.map((a) => (
                                        <Link key={a._id} href={`/articles/${a._id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card hover-lift" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                    <span style={{ fontSize: 16, fontWeight: 700, color: '#f0ebe0' }}>{a.title}</span>
                                                    <span className="badge-accent" style={{ fontSize: 10, background: 'rgba(110,196,122,0.1)', color: '#6ec47a' }}>{a.category}</span>
                                                </div>
                                                <HiOutlineChevronRight style={{ color: 'rgba(240,235,224,0.2)' }} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {results.problems.length === 0 && results.articles.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                <p style={{ fontSize: 18, color: 'rgba(240,235,224,0.3)' }}>No wisdom found for &ldquo;{query}&rdquo;</p>
                                <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.15)', marginTop: 8 }}>Try different keywords or contribute your own knowledge.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.3 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.05em' }}>AWAITING INPUT</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a1a0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner" /></div>}>
            <SearchContent />
        </Suspense>
    );
}

