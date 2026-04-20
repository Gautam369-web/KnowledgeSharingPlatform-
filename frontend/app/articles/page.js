'use client';

import Link from 'next/link';
import { useState } from 'react';
import { articles } from '@/lib/data';
import { HiOutlineSearch, HiOutlineBookOpen, HiOutlineClock, HiOutlineEye, HiOutlineArrowRight } from 'react-icons/hi';

const CATEGORIES = ['All', 'React', 'Node.js', 'Python', 'DevOps', 'Machine Learning', 'Security'];

export default function ArticlesPage() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = articles.filter(a =>
        (activeCategory === 'All' || a.category === activeCategory) &&
        a.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 88 }}>
            {/* Header */}
            <div style={{ background: '#0e2010', borderBottom: '1px solid rgba(74,158,92,0.12)', padding: '40px 24px 32px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <HiOutlineBookOpen style={{ color: '#d4a017', width: 20, height: 20 }} />
                        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#d4a017' }}>KNOWLEDGE BASE</span>
                    </div>
                    <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(32px,5vw,48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
                        Articles &amp; Guides
                    </h1>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>In-depth knowledge from expert contributors</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div style={{ position: 'relative', maxWidth: 520 }}>
                            <HiOutlineSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', width: 18 }} />
                            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="input-field" style={{ paddingLeft: 44 }} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {CATEGORIES.map(c => (
                                <button key={c} onClick={() => setActiveCategory(c)} style={{
                                    padding: '5px 14px', borderRadius: 100, border: 'none', cursor: 'pointer',
                                    fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', fontFamily: "'Bricolage Grotesque',sans-serif",
                                    background: activeCategory === c ? '#d4a017' : 'rgba(255,255,255,0.04)',
                                    color: activeCategory === c ? '#0a1a0d' : 'rgba(255,255,255,0.5)',
                                    transition: 'all 0.2s',
                                }}>{c}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{filtered.length} ARTICLES</span>
                    <Link href="/articles/new" className="btn-primary" style={{ padding: '9px 20px', fontSize: 12 }}>+ WRITE ARTICLE</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 20 }}>
                    {filtered.map((article, i) => (
                        <Link key={article.id || i} href={`/articles/${article.id}`} style={{ textDecoration: 'none' }}>
                            <div className="card card-hover" style={{ padding: '28px', height: '100%' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.25)'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(74,158,92,0.14)'}
                            >
                                <span className="badge badge-primary" style={{ marginBottom: 14 }}>{article.category}</span>
                                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 10, letterSpacing: '-0.01em' }}>{article.title}</h2>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 20, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>{article.excerpt}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}><HiOutlineClock style={{ width: 13 }} />{article.readTime || 5} min</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}><HiOutlineEye style={{ width: 13 }} />{article.views || 0}</span>
                                    </div>
                                    <HiOutlineArrowRight style={{ color: '#d4a017', width: 18 }} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <HiOutlineBookOpen style={{ width: 48, height: 48, color: 'rgba(212,160,23,0.3)', margin: '0 auto 16px' }} />
                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 15 }}>No articles found. Be the first to write one!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
