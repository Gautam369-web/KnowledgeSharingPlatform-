'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineHome, HiOutlineBookOpen, HiOutlineLightningBolt,
    HiOutlineMenu, HiOutlineX, HiOutlineLogout, HiOutlineChartBar, HiOutlineSearch,
} from 'react-icons/hi';

const NAV = [
    { label: 'Home', href: '/', icon: HiOutlineHome },
    { label: 'Problems', href: '/problems', icon: HiOutlineLightningBolt },
    { label: 'Articles', href: '/articles', icon: HiOutlineBookOpen },
    { label: 'Leaderboard', href: '/leaderboard', icon: HiOutlineChartBar },
];

/* ── Inner nav needs usePathname → must be inside Suspense ── */
function NavInner() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href) => pathname === href;

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            height: 60,
            background: scrolled ? 'rgba(13,13,15,0.95)' : '#131316',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            transition: 'background 0.3s',
            display: 'flex', alignItems: 'center',
        }}>
            <div style={{
                maxWidth: 1280, margin: '0 auto', padding: '0 28px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                gap: 32,
            }}>

                {/* ── Logo ── */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: '#f59e0b',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 16, color: '#0d0d0f',
                        fontFamily: "'Syne', sans-serif",
                        flexShrink: 0,
                    }}>S</div>
                    <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800, fontSize: 16,
                        color: '#fff', letterSpacing: '-0.01em',
                    }}>SolveHub</span>
                </Link>

                {/* ── Center Nav ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }} className="hidden md:flex">
                    {NAV.map(({ label, href, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href} href={href}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '6px 14px', borderRadius: 8,
                                    textDecoration: 'none',
                                    fontSize: 13, fontWeight: 500,
                                    fontFamily: "'Syne', sans-serif",
                                    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
                                    background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                                    transition: 'color 0.18s, background 0.18s',
                                }}
                                onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
                                onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                            >
                                <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* ── Right ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Link href="/search" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.18s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                    >
                        <HiOutlineSearch style={{ width: 17, height: 17 }} />
                    </Link>

                    {user ? (
                        <>
                            <Link href={`/profile/${user.id || user._id}`} style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: 'rgba(245,158,11,0.18)',
                                border: '1px solid rgba(245,158,11,0.45)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 12, fontWeight: 800, color: '#f59e0b',
                                textDecoration: 'none', fontFamily: "'Syne',sans-serif",
                            }}>
                                {user.name?.[0]?.toUpperCase() || 'U'}
                            </Link>
                            <button onClick={logout} style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '6px 12px', borderRadius: 7, border: 'none',
                                background: 'rgba(248,113,113,0.1)', color: '#f87171',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                fontFamily: "'Syne',sans-serif", transition: 'background 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.18)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                            >
                                <HiOutlineLogout style={{ width: 13, height: 13 }} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ padding: '6px 14px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontFamily: "'Syne',sans-serif", transition: 'color 0.18s' }}
                                onMouseEnter={e => e.target.style.color = '#fff'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                            >
                                Sign In
                            </Link>
                            <Link href="/register" style={{
                                padding: '8px 18px', background: '#f59e0b', color: '#0d0d0f',
                                fontSize: 13, fontWeight: 800, fontFamily: "'Syne',sans-serif",
                                letterSpacing: '0.03em', borderRadius: 8, textDecoration: 'none',
                                transition: 'background 0.18s, transform 0.18s', whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                GET STARTED
                            </Link>
                        </>
                    )}

                    <button className="flex md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.55)', padding: 6, marginLeft: 4 }}
                    >
                        {mobileOpen ? <HiOutlineX style={{ width: 20, height: 20 }} /> : <HiOutlineMenu style={{ width: 20, height: 20 }} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    position: 'absolute', top: 60, left: 0, right: 0,
                    background: '#131316', borderBottom: '1px solid rgba(255,255,255,0.07)',
                    padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 2,
                }}>
                    {NAV.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                            display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 8,
                            textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: "'Syne',sans-serif",
                            color: isActive(href) ? '#f59e0b' : 'rgba(255,255,255,0.6)',
                            background: isActive(href) ? 'rgba(245,158,11,0.07)' : 'transparent',
                        }}>
                            <Icon style={{ width: 17, height: 17 }} />{label}
                        </Link>
                    ))}
                    <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
                    <Link href="/login" onClick={() => setMobileOpen(false)} style={{ padding: '11px 14px', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: "'Syne',sans-serif" }}>Sign In</Link>
                    <Link href="/register" onClick={() => setMobileOpen(false)} style={{ margin: '4px 0', padding: '11px 14px', background: '#f59e0b', color: '#0d0d0f', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none', textAlign: 'center', fontFamily: "'Syne',sans-serif" }}>GET STARTED</Link>
                </div>
            )}
        </nav>
    );
}

export default function Navbar() {
    return (
        <Suspense fallback={
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 60, background: '#131316', borderBottom: '1px solid rgba(255,255,255,0.06)', zIndex: 50 }} />
        }>
            <NavInner />
        </Suspense>
    );
}
