'use client';

import { useState } from 'react';
import Link from 'next/link';
import { problems, articles } from '@/lib/data';
import { HiOutlineSearch, HiOutlineLightningBolt, HiOutlineBookOpen } from 'react-icons/hi';

export default function SearchPage() {
    const [query, setQuery] = useState('');

    const matchedProblems = query.length > 1
        ? problems.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
        : [];
    const matchedArticles = query.length > 1
        ? articles.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).slice(0, 4)
        : [];

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 88 }}>
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
                <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 32, textAlign: 'center' }}>
                    Search <em style={{ color: '#d4a017', fontStyle: 'italic' }}>Everything</em>
                </h1>

                {/* Search input */}
                <div style={{ position: 'relative', marginBottom: 40 }}>
                    <HiOutlineSearch style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#d4a017', width: 22, height: 22 }} />
                    <input
                        autoFocus type="text"
                        placeholder="Search problems, articles, topics..."
                        value={query} onChange={e => setQuery(e.target.value)}
                        style={{
                            width: '100%', padding: '18px 18px 18px 54px',
                            background: '#0e2010', border: '1px solid rgba(212,160,23,0.3)',
                            borderRadius: 14, color: '#fff', fontSize: 16, outline: 'none',
                            fontFamily: "'Bricolage Grotesque',sans-serif", transition: 'border-color 0.2s, box-shadow 0.2s',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(212,160,23,0.6)'; e.target.style.boxShadow = '0 0 0 4px rgba(212,160,23,0.08)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(212,160,23,0.3)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>

                {/* Results */}
                {query.length > 1 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        {matchedProblems.length > 0 && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                    <HiOutlineLightningBolt style={{ color: '#d4a017', width: 16 }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#d4a017' }}>PROBLEMS</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {matchedProblems.map((p, i) => (
                                        <Link key={i} href={`/problems/${p.id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{p.title}</span>
                                                <span className="badge badge-primary">{p.category || 'General'}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {matchedArticles.length > 0 && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                    <HiOutlineBookOpen style={{ color: '#34d399', width: 16 }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#34d399' }}>ARTICLES</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {matchedArticles.map((a, i) => (
                                        <Link key={i} href={`/articles/${a.id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{a.title}</span>
                                                <span className="badge badge-accent">{a.category}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {matchedProblems.length === 0 && matchedArticles.length === 0 && (
                            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 15, padding: '40px 0' }}>No results for &ldquo;{query}&rdquo;</p>
                        )}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>Type at least 2 characters to search</p>
                )}
            </div>
        </div>
    );
}
