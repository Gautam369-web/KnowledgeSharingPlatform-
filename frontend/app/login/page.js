'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowRight } from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setLoginError('');

        const result = await login(formData.email, formData.password);

        // If login successful, context update will trigger the useEffect redirect.
        // We only reset submitting state if there's an error.
        if (result && result.error) {
            setIsSubmitting(false);
            if (result.error.toLowerCase().includes('verify')) {
                setLoginError('unverified');
            } else {
                setLoginError(result.error);
            }
        }
    };

    if (isAuthenticated) return null; // Wait for redirect to happen

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: '#0a1a0d', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Solarpunk Background Elements */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 160, 23, 0.15) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(240,235,224,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,224,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10, animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                {/* Glassmorphism Card */}
                <div style={{ background: 'rgba(14, 32, 16, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 32, padding: '48px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #d4a017 0%, #f59e0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 32, color: '#0a1a0d', fontFamily: "'Bricolage Grotesque', sans-serif", margin: '0 auto 24px', boxShadow: '0 10px 20px rgba(212,160,23,0.3)' }}>
                            S
                        </div>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 12, letterSpacing: '-0.03em' }}>Welcome back</h1>
                        <p style={{ fontSize: 15, color: 'rgba(240,235,224,0.5)' }}>Access your Knowledge Node</p>
                    </div>

                    {loginError === 'unverified' && (
                        <div style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)', borderRadius: 16, padding: '20px', marginBottom: 28, textAlign: 'center', animation: 'fadeIn 0.3s' }}>
                            <p style={{ fontSize: 14, color: '#d4a017', marginBottom: 16, fontWeight: 700 }}>Identity verification pending</p>
                            <Link href={`/register?verify=${encodeURIComponent(formData.email)}`} className="btn-primary" style={{ padding: '8px 24px', fontSize: 13, display: 'inline-flex', background: '#d4a017', color: '#0a1a0d' }}>
                                Verify Identity
                            </Link>
                        </div>
                    )}

                    {loginError !== '' && loginError !== 'unverified' && (
                        <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, color: '#ef4444', fontSize: 13, fontWeight: 600, textAlign: 'center', marginBottom: 24 }}>
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ position: 'relative' }}>
                            <HiOutlineMail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 22, height: 22, pointerEvents: 'none' }} />
                            <input
                                type="email" required
                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Email Address"
                                style={{ width: '100%', height: 56, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 52px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                            />
                        </div>

                        <div style={{ position: 'relative' }}>
                            <HiOutlineLockClosed style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 22, height: 22, pointerEvents: 'none' }} />
                            <input
                                type="password" required
                                value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Password Payload"
                                style={{ width: '100%', height: 56, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 52px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-8px' }}>
                            <Link href="#" style={{ color: 'rgba(240,235,224,0.4)', fontSize: 12, fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s' }} className="hover-gold">Recovery Protocol?</Link>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ height: 56, justifyContent: 'center', marginTop: 12, fontSize: 15, padding: '0', background: 'linear-gradient(135deg, #d4a017 0%, #b8860b 100%)', color: '#0a1a0d', border: 'none', boxShadow: '0 8px 16px rgba(212,160,23,0.2)' }}>
                            {isSubmitting ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 18, height: 18, border: '2px solid rgba(10,26,13,0.2)', borderTop: '2px solid #0a1a0d', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                    <span>AUTHORIZING...</span>
                                </div>
                            ) : (
                                <><span>INITIALIZE SESSION</span><HiOutlineArrowRight style={{ width: 20, height: 20 }} /></>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '32px 0' }}>
                        <div style={{ flex: 1, height: 1, background: 'rgba(240,235,224,0.05)' }} />
                        <span style={{ fontSize: 11, color: 'rgba(240,235,224,0.2)', fontWeight: 800, letterSpacing: '0.1em' }}>EXTERNAL AUTH</span>
                        <div style={{ flex: 1, height: 1, background: 'rgba(240,235,224,0.05)' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[{ icon: FaGoogle, label: 'Google', color: '#ea4335' }, { icon: FaGithub, label: 'GitHub', color: '#f0ebe0' }].map(({ icon: Icon, label, color }) => (
                            <button key={label} style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 14, border: '1px solid rgba(240,235,224,0.1)', background: 'rgba(240,235,224,0.02)', color: 'rgba(240,235,224,0.6)', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,235,224,0.05)'; e.currentTarget.style.color = '#f0ebe0'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(240,235,224,0.02)'; e.currentTarget.style.color = 'rgba(240,235,224,0.6)'; }}
                            >
                                <Icon style={{ color, width: 18, height: 18 }} /> {label}
                            </button>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(240,235,224,0.05)' }}>
                        <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)', fontWeight: 600 }}>
                            Unregistered node?{' '}
                            <Link href="/register" style={{ color: '#d4a017', fontWeight: 800, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                Initialize Connection
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
