'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';
import { HiOutlineLightningBolt, HiOutlineFolderOpen, HiOutlineChevronRight } from 'react-icons/hi';
import { useState } from 'react';

export default function CategoriesPage() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div style={{ minHeight: '100vh', background: '#0a1a0d', paddingTop: 88, paddingBottom: 64 }}>
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(180deg, #0e2010 0%, #0a1a0d 100%)', borderBottom: '1px solid rgba(74,158,92,0.12)', padding: '60px 24px 40px', position: 'relative', overflow: 'hidden' }}>
                {/* Background Pattern */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />

                <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '8px 16px', borderRadius: 100, background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.2)' }}>
                        <HiOutlineFolderOpen style={{ color: '#d4a017', width: 20, height: 20 }} />
                        <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', color: '#d4a017' }}>DIRECTORY</span>
                    </div>

                    <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 900, color: '#f0ebe0', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Explore Categories <span style={{ color: '#6ec47a' }}>💻</span>
                    </h1>

                    <p style={{ fontSize: 18, color: 'rgba(240,235,224,0.6)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                        Dive into our decentralized network of knowledge. Choose a sector, share your expertise, and synchronize with the collective.
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 24
                }}>
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/problems?category=${cat.name}`} style={{ textDecoration: 'none' }}>
                            <div
                                className="card"
                                onMouseEnter={() => setHoveredId(cat.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    padding: '32px 24px',
                                    height: '100%',
                                    background: hoveredId === cat.id ? 'rgba(74,158,92,0.05)' : '#0e2010',
                                    border: `1px solid ${hoveredId === cat.id ? 'rgba(74,158,92,0.4)' : 'rgba(74,158,92,0.1)'}`,
                                    borderRadius: 24,
                                    position: 'relative',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: hoveredId === cat.id ? 'translateY(-4px)' : 'translateY(0)',
                                    boxShadow: hoveredId === cat.id ? '0 20px 40px rgba(10,26,13,0.8), 0 0 20px rgba(74,158,92,0.2)' : '0 10px 30px rgba(0,0,0,0.5)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                {/* Top Section: Icon & Chevron */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                                    <div style={{
                                        width: 64, height: 64, borderRadius: 20,
                                        background: 'linear-gradient(135deg, rgba(212,160,23,0.1) 0%, rgba(110,196,122,0.1) 100%)',
                                        border: '1px solid rgba(240,235,224,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 32,
                                        boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.02)',
                                        transition: 'transform 0.3s',
                                        transform: hoveredId === cat.id ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                                    }}>
                                        {cat.icon}
                                    </div>

                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%',
                                        background: hoveredId === cat.id ? '#d4a017' : 'rgba(240,235,224,0.05)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.3s',
                                        color: hoveredId === cat.id ? '#0a1a0d' : 'rgba(240,235,224,0.3)',
                                    }}>
                                        <HiOutlineChevronRight style={{ width: 18, height: 18 }} />
                                    </div>
                                </div>

                                {/* Bottom Section: Content */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                    <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: '#f0ebe0', marginBottom: 8 }}>
                                        {cat.name}
                                    </h2>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
                                        <HiOutlineLightningBolt style={{ color: '#6ec47a', width: 14, height: 14 }} />
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(240,235,224,0.5)', letterSpacing: '0.05em' }}>
                                            {cat.count.toLocaleString()} ARTIFACTS
                                        </span>
                                    </div>
                                </div>

                                {/* Glow Effect placed absolute */}
                                <div style={{
                                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                                    width: '100%', height: '1px',
                                    background: hoveredId === cat.id ? 'linear-gradient(90deg, transparent, #6ec47a, transparent)' : 'transparent',
                                    transition: 'background 0.3s'
                                }} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
