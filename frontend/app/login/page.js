'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(formData.email, formData.password);
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', background: '#0d0d0f', position: 'relative', overflow: 'hidden' }}>
            {/* Grid background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
            {/* Glow */}
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 1 }}>
                {/* Card */}
                <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '40px 36px' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 24 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#0d0d0f', fontFamily: "'Syne',sans-serif" }}>S</div>
                        </Link>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>Welcome back</h1>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Sign in to your SolveHub account</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <label className="label-text">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineMail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', width: 18, height: 18 }} />
                                <input
                                    type="email" required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="input-field" placeholder="you@example.com"
                                    style={{ paddingLeft: 44 }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="label-text">Password</label>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineLockClosed style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', width: 18, height: 18 }} />
                                <input
                                    type="password" required
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    className="input-field" placeholder="••••••••"
                                    style={{ paddingLeft: 44 }}
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
                            {loading ? <div style={{ width: 18, height: 18, border: '2px solid rgba(13,13,15,0.3)', borderTop: '2px solid #0d0d0f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <><span>SIGN IN</span><HiOutlineArrowRight /></>}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontWeight: 600, letterSpacing: '0.08em' }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[{ icon: FaGoogle, label: 'Google', color: '#ea4335' }, { icon: FaGithub, label: 'GitHub', color: '#fff' }].map(({ icon: Icon, label, color }) => (
                            <button key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s', fontFamily: "'Syne',sans-serif" }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                            >
                                <Icon style={{ color, width: 15, height: 15 }} /> {label}
                            </button>
                        ))}
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 28 }}>
                        No account?{' '}
                        <Link href="/register" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'none' }}>Create one free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
