'use client';

import Link from 'next/link';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const LINKS = {
    Product: ['Problems', 'Articles', 'Leaderboard', 'Dashboard'],
    Company: ['About', 'Blog', 'Careers', 'Press'],
    Legal: ['Privacy', 'Terms', 'Security', 'Cookies'],
};

export default function Footer() {
    return (
        <footer style={{ background: '#0d0d0f', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px 40px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Top */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr repeat(3,auto)', gap: 48, marginBottom: 56, flexWrap: 'wrap' }}>
                    {/* Brand */}
                    <div>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                            <div style={{ width: 34, height: 34, borderRadius: 9, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 900, color: '#0d0d0f', fontFamily: "'Syne',sans-serif" }}>S</div>
                            <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: "'Syne',sans-serif" }}>SolveHub</span>
                        </Link>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, maxWidth: 260 }}>
                            Where hard problems find great answers. Built for engineers, by engineers.
                        </p>
                        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                            {[FaGithub, FaTwitter].map((Icon, i) => (
                                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(245,158,11,0.4)'; e.currentTarget.style.color = '#f59e0b'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                                >
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([section, items]) => (
                        <div key={section}>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#f59e0b', marginBottom: 16 }}>{section.toUpperCase()}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {items.map(item => (
                                    <Link key={item} href={`/${item.toLowerCase()}`} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s', fontWeight: 500 }}
                                        onMouseEnter={e => e.target.style.color = '#fff'}
                                        onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
                                    >{item}</Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>© 2026 SOLVEHUB · ALL RIGHTS RESERVED</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
                        <HiOutlineLightningBolt style={{ color: '#f59e0b', width: 14 }} />
                        Made with purpose
                    </div>
                </div>
            </div>
        </footer>
    );
}
