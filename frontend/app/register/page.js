'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineMail, HiOutlineLockClosed,
    HiOutlineUser, HiOutlineArrowRight, HiOutlineShieldCheck
} from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                setShowOTP(true);
                toast.success('Check your email for the OTP!');
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Email verified successfully!');
                router.push('/login?verified=true');
            } else {
                toast.error(data.message || 'Verification failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setResending(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });
            const data = await response.json();
            toast.success(data.message || 'OTP resent!');
        } catch (error) {
            toast.error('Failed to resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: '#0d0d0f', position: 'relative', overflow: 'hidden' }}>
            {/* Grid background */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(245,158,11,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
            {/* Glows */}
            <div style={{ position: 'absolute', top: '20%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(129,140,248,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: showOTP ? 400 : 460, position: 'relative', zIndex: 1 }}>

                {/* ── Card ── */}
                <div style={{ background: '#111114', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '40px 32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>

                    {/* Logo/Header */}
                    <div style={{ textAlign: 'center', marginBottom: 36 }}>
                        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: '#0d0d0f', fontFamily: "'Syne',sans-serif" }}>S</div>
                        </Link>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em' }}>
                            {showOTP ? 'Check your mail' : 'Create an Account'}
                        </h1>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                            {showOTP
                                ? `We've sent a verify code to ${formData.email}`
                                : 'Join the elite community of problem solvers and tech experts.'}
                        </p>
                    </div>

                    {!showOTP ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                                <div>
                                    <label className="label-text">Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <HiOutlineUser style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', width: 18, height: 18 }} />
                                        <input
                                            type="text" name="name" required
                                            value={formData.name} onChange={handleChange}
                                            className="input-field" placeholder="John Doe"
                                            style={{ paddingLeft: 44 }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label-text">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <HiOutlineMail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', width: 18, height: 18 }} />
                                        <input
                                            type="email" name="email" required
                                            value={formData.email} onChange={handleChange}
                                            className="input-field" placeholder="you@example.com"
                                            style={{ paddingLeft: 44 }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="reg-pass-grid">
                                    <div>
                                        <label className="label-text">Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <HiOutlineLockClosed style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', width: 18, height: 18 }} />
                                            <input
                                                type="password" name="password" required
                                                value={formData.password} onChange={handleChange}
                                                className="input-field" placeholder="••••••••"
                                                style={{ paddingLeft: 44 }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label-text">Repeat</label>
                                        <div style={{ position: 'relative' }}>
                                            <HiOutlineLockClosed style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', width: 18, height: 18 }} />
                                            <input
                                                type="password" name="confirmPassword" required
                                                value={formData.confirmPassword} onChange={handleChange}
                                                className="input-field" placeholder="••••••••"
                                                style={{ paddingLeft: 44 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 12, width: '100%', height: 50, justifyContent: 'center' }}>
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.2)', borderTop: '2px solid #000', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                        <span>CREATING ACCOUNT...</span>
                                    </div>
                                ) : (
                                    <><span>CREATE ACCOUNT</span><HiOutlineArrowRight /></>
                                )}
                            </button>

                            {/* Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '14px 0' }}>
                                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontWeight: 700, letterSpacing: '0.08em' }}>OR CONTINUE WITH</span>
                                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', fontFamily: "'Syne',sans-serif" }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <FaGoogle style={{ color: '#ea4335', width: 14 }} /> Google
                                </button>
                                <button type="button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', fontFamily: "'Syne',sans-serif" }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                >
                                    <FaGithub style={{ color: '#fff', width: 14 }} /> GitHub
                                </button>
                            </div>

                            <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 12 }}>
                                By signing up you agree to our <Link href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Terms</Link>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div style={{ textAlign: 'center' }}>
                                <label className="label-text" style={{ display: 'block', marginBottom: 12 }}>Verification Code</label>
                                <input
                                    type="text" maxLength="6" required
                                    value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                                    style={{
                                        width: '100%', height: 64, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: 14, textAlign: 'center', fontSize: 32, fontWeight: 800, color: '#f59e0b',
                                        letterSpacing: 8, fontFamily: "'Syne',sans-serif",
                                    }}
                                    placeholder="000000"
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <button type="submit" disabled={loading || otp.length !== 6} className="btn-primary" style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                                    {loading ? <div style={{ width: 18, height: 18, border: '2px solid rgba(13,13,15,0.3)', borderTop: '2px solid #0d0d0f', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> : <><span>VERIFY ACCOUNT</span><HiOutlineShieldCheck /></>}
                                </button>

                                <button type="button" onClick={handleResendOTP} disabled={resending} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 8 }}>
                                    {resending ? 'RESENDING...' : "DIDN'T RECEIVE? RESEND"}
                                </button>
                            </div>
                        </form>
                    )}

                    {!showOTP && (
                        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                            Joined us already?{' '}
                            <Link href="/login" style={{ color: '#f59e0b', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
                        </p>
                    )}
                </div>
            </div>

            <style>{`
                @media (max-width: 480px) {
                    .reg-pass-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
