'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineHome, HiOutlineBookOpen, HiOutlineLightningBolt,
    HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineLogout,
    HiOutlineChartBar, HiOutlineSearch,
} from 'react-icons/hi';

const NAV = [
    { label: 'Home', href: '/', icon: HiOutlineHome },
    { label: 'Problems', href: '/problems', icon: HiOutlineLightningBolt },
    { label: 'Articles', href: '/articles', icon: HiOutlineBookOpen },
    { label: 'Leaderboard', href: '/leaderboard', icon: HiOutlineChartBar },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user, logout } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isActive = (href) => pathname === href;

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                height: 64,
                background: scrolled ? 'rgba(13,13,15,0.9)' : 'rgba(13,13,15,0.5)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'background 0.3s',
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: '#0d0d0f', fontFamily: "'Syne',sans-serif" }}>S</div>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 17, color: '#fff', letterSpacing: '-0.02em' }}>SolveHub</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden md:flex">
                        {NAV.map(({ label, href, icon: Icon }) => (
                            <Link key={href} href={href} style={{
                                display: 'flex', alignItems: 'center', gap: 6,
                                padding: '6px 14px', borderRadius: 8,
                                fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                                textDecoration: 'none',
                                color: isActive(href) ? '#f59e0b' : 'rgba(255,255,255,0.55)',
                                background: isActive(href) ? 'rgba(245,158,11,0.08)' : 'transparent',
                                transition: 'all 0.2s',
                            }}>
                                <Icon style={{ width: 16, height: 16 }} />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Link href="/search" style={{ display: 'flex', alignItems: 'center', padding: 8, borderRadius: 8, color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', textDecoration: 'none' }}>
                            <HiOutlineSearch style={{ width: 18, height: 18 }} />
                        </Link>

                        {user ? (
                            <>
                                <Link href={`/profile/${user.id || user._id}`} style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: 'rgba(245,158,11,0.2)',
                                    border: '1px solid rgba(245,158,11,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 13, fontWeight: 800, color: '#f59e0b',
                                    textDecoration: 'none',
                                }}>
                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                </Link>
                                <button onClick={logout} style={{
                                    display: 'flex', alignItems: 'center', gap: 5,
                                    padding: '7px 14px', borderRadius: 8, border: 'none',
                                    background: 'rgba(248,113,113,0.1)', color: '#f87171',
                                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                    transition: 'background 0.2s',
                                }}>
                                    <HiOutlineLogout style={{ width: 14, height: 14 }} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', padding: '7px 14px', transition: 'color 0.2s' }}>
                                    Sign In
                                </Link>
                                <Link href="/register" className="btn-primary" style={{ padding: '8px 18px', fontSize: 12 }}>
                                    GET STARTED
                                </Link>
                            </>
                        )}

                        {/* Mobile burger */}
                        <button
                            className="flex md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 8 }}
                        >
                            {mobileOpen ? <HiOutlineX style={{ width: 22, height: 22 }} /> : <HiOutlineMenu style={{ width: 22, height: 22 }} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div style={{
                        position: 'absolute', top: 64, left: 0, right: 0,
                        background: '#111114',
                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                        padding: '16px 24px 24px',
                        display: 'flex', flexDirection: 'column', gap: 4,
                    }}>
                        {NAV.map(({ label, href, icon: Icon }) => (
                            <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 16px', borderRadius: 10,
                                fontSize: 14, fontWeight: 600,
                                textDecoration: 'none',
                                color: isActive(href) ? '#f59e0b' : 'rgba(255,255,255,0.6)',
                                background: isActive(href) ? 'rgba(245,158,11,0.08)' : 'transparent',
                            }}>
                                <Icon style={{ width: 18, height: 18 }} />
                                {label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
}
