'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineHome, HiOutlineBookOpen, HiOutlineLightningBolt,
    HiOutlineMenu, HiOutlineX, HiOutlineLogout, HiOutlineChartBar, HiOutlineSearch,
    HiOutlineUserCircle, HiOutlineGlobeAlt
} from 'react-icons/hi';

const NAV = [
    { label: 'Network', href: '/', icon: HiOutlineHome },
    { label: 'Challenges', href: '/problems', icon: HiOutlineLightningBolt },
    { label: 'Knowledge', href: '/articles', icon: HiOutlineBookOpen },
    { label: 'IQ Web', href: '/knowledge', icon: HiOutlineGlobeAlt },
    { label: 'Council', href: '/leaderboard', icon: HiOutlineChartBar },
];

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
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            height: 72,
            background: scrolled ? 'rgba(10,26,13,0.95)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(74,158,92,0.1)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex', alignItems: 'center',
        }}>
            <div style={{
                maxWidth: 1280, margin: '0 auto', padding: '0 32px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 12,
                        background: '#d4a017',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 18, color: '#0a1a0d',
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        boxShadow: '0 4px 20px rgba(212,160,23,0.3)',
                    }}>K</div>
                    <span style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 900, fontSize: 18,
                        color: '#f0ebe0', letterSpacing: '-0.02em',
                        display: 'none', lg: 'block'
                    }}>Solar<span style={{ color: '#d4a017' }}>Hub</span></span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="hidden md:flex">
                    {NAV.map(({ label, href, icon: Icon }) => {
                        const active = isActive(href);
                        return (
                            <Link
                                key={href} href={href}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 18px', borderRadius: 12,
                                    textDecoration: 'none',
                                    fontSize: 13, fontWeight: 800,
                                    fontFamily: "'Bricolage Grotesque', sans-serif",
                                    color: active ? '#d4a017' : 'rgba(240,235,224,0.4)',
                                    background: active ? 'rgba(212,160,23,0.05)' : 'transparent',
                                    transition: 'all 0.2s',
                                    letterSpacing: '0.02em'
                                }}
                            >
                                <Icon style={{ fontSize: 16 }} />
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/search" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 40, height: 40, borderRadius: 12,
                        background: 'rgba(240,235,224,0.05)', color: 'rgba(240,235,224,0.4)',
                        textDecoration: 'none', transition: 'all 0.2s'
                    }}>
                        <HiOutlineSearch style={{ fontSize: 20 }} />
                    </Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <Link href="/dashboard" style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '10px 18px', borderRadius: 12,
                                textDecoration: 'none',
                                fontSize: 13, fontWeight: 900,
                                fontFamily: "'Bricolage Grotesque', sans-serif",
                                color: '#0a1a0d',
                                background: '#d4a017',
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 15px rgba(212,160,23,0.2)'
                            }}>
                                <HiOutlineLightningBolt />
                                Dashboard
                            </Link>
                            <Link href={`/profile/${user.id || user._id}`} style={{
                                width: 42, height: 42, borderRadius: 16,
                                background: 'rgba(212,160,23,0.1)',
                                border: '2px solid rgba(212,160,23,0.5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                overflow: 'hidden', textDecoration: 'none',
                                transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(212,160,23,0.3)'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = '#f59e0b'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(212,160,23,0.5)'; }}>
                                {user.avatar ? (
                                    <img src={user.avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                                ) : (
                                    <span style={{ fontSize: 16, fontWeight: 900, color: '#f59e0b', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                        {user.name ? user.name[0].toUpperCase() : 'U'}
                                    </span>
                                )}
                            </Link>
                            <button onClick={logout} style={{
                                background: 'transparent', border: 'none', color: 'rgba(248,113,113,0.6)',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, fontWeight: 800, fontFamily: "'Bricolage Grotesque', sans-serif"
                            }}>
                                <HiOutlineLogout />
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <Link href="/login" style={{ fontSize: 13, fontWeight: 800, color: 'rgba(240,235,224,0.4)', textDecoration: 'none', fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                                Login
                            </Link>
                            <Link href="/register" style={{
                                padding: '12px 24px', background: '#d4a017', color: '#0a1a0d',
                                fontSize: 13, fontWeight: 900, fontFamily: "'Bricolage Grotesque', sans-serif",
                                borderRadius: 14, textDecoration: 'none', transition: 'all 0.2s',
                                boxShadow: '0 4px 15px rgba(212,160,23,0.2)'
                            }}>
                                JOIN NETWORK
                            </Link>
                        </div>
                    )}

                    <button className="flex md:hidden" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: '#f0ebe0', fontSize: 24, cursor: 'pointer' }}>
                        {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div style={{
                    position: 'absolute', top: 72, left: 0, right: 0,
                    background: '#0a1a0d', borderBottom: '1px solid rgba(74,158,92,0.1)',
                    padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 8,
                    zIndex: 90
                }}>
                    {NAV.map(({ label, href, icon: Icon }) => (
                        <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12,
                            textDecoration: 'none', fontSize: 15, fontWeight: 800, color: isActive(href) ? '#d4a017' : '#f0ebe0',
                            background: isActive(href) ? 'rgba(212,160,23,0.05)' : 'rgba(240,235,224,0.02)',
                        }}>
                            <Icon /> {label}
                        </Link>
                    ))}
                    {user && (
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)} style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 12,
                            textDecoration: 'none', fontSize: 15, fontWeight: 900, color: '#0a1a0d', background: '#d4a017',
                        }}>
                            <HiOutlineLightningBolt /> Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

export default function Navbar() {
    return (
        <Suspense fallback={<div style={{ height: 72, background: '#0a1a0d' }} />}>
            <NavInner />
        </Suspense>
    );
}

