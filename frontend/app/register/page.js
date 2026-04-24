'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineMail, HiOutlineLockClosed,
    HiOutlineUser, HiOutlineArrowRight
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
    const [step, setStep] = useState('details');
    const [otp, setOtp] = useState('');
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    // Prevent rendering form if logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

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
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Registration successful! Please check your email.');
                setRegisteredEmail(formData.email);
                setStep('otp');
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: registeredEmail, otp })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Email verified successfully!');
                localStorage.setItem('token', data.token);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                setTimeout(() => window.location.href = '/dashboard', 400);
            } else {
                toast.error(data.message || 'Verification failed');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isAuthenticated) return null;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: '#0a1a0d', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Solarpunk Background Elements */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 160, 23, 0.15) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(240,235,224,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,224,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 10, animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                {/* Glassmorphism Card */}
                <div style={{ background: 'rgba(14, 32, 16, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 32, padding: '48px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #6ec47a 0%, #34d399 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: '#0a1a0d', fontFamily: "'Bricolage Grotesque', sans-serif", margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(110,196,122,0.3)' }}>
                            <HiOutlineUser />
                        </div>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 12, letterSpacing: '-0.03em' }}>
                            Join the Network
                        </h1>
                        <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.5)' }}>
                            Establish your identity as a Knowledge Contributor.
                        </p>
                    </div>

                    {step === 'details' ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 20 }}>
                                <div style={{ position: 'relative' }}>
                                    <HiOutlineUser style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                    <input
                                        type="text" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        placeholder="Display Name"
                                        style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                        onFocus={e => { e.target.style.borderColor = '#6ec47a'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <HiOutlineMail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                    <input
                                        type="email" name="email" required
                                        value={formData.email} onChange={handleChange}
                                        placeholder="Communication Signal (Email)"
                                        style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                        onFocus={e => { e.target.style.borderColor = '#6ec47a'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                        onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16 }}>
                                    <div style={{ position: 'relative' }}>
                                        <HiOutlineLockClosed style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                        <input
                                            type="password" name="password" required
                                            value={formData.password} onChange={handleChange}
                                            placeholder="Security Protocol"
                                            style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                            onFocus={e => { e.target.style.borderColor = '#6ec47a'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                            onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <HiOutlineLockClosed style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                        <input
                                            type="password" name="confirmPassword" required
                                            value={formData.confirmPassword} onChange={handleChange}
                                            placeholder="Confirm Protocol"
                                            style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                            onFocus={e => { e.target.style.borderColor = '#6ec47a'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                            onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary" style={{ height: 52, justifyContent: 'center', marginTop: 12, fontSize: 14, padding: '0', background: 'linear-gradient(135deg, #6ec47a 0%, #34d399 100%)', color: '#0a1a0d', border: 'none', boxShadow: '0 8px 16px rgba(110,196,122,0.2)' }}>
                                {loading ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 16, height: 16, border: '2px solid rgba(10,26,13,0.2)', borderTop: '2px solid #0a1a0d', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                        <span>SYNTHESIZING IDENTITY...</span>
                                    </div>
                                ) : (
                                    <><span>REGISTER</span><HiOutlineArrowRight style={{ width: 18, height: 18 }} /></>
                                )}
                            </button>

                            {/* Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '20px 0' }}>
                                <div style={{ flex: 1, height: 1, background: 'rgba(240,235,224,0.05)' }} />
                                <span style={{ fontSize: 11, color: 'rgba(240,235,224,0.2)', fontWeight: 800, letterSpacing: '0.1em' }}>FOREIGN PROTOCOLS</span>
                                <div style={{ flex: 1, height: 1, background: 'rgba(240,235,224,0.05)' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {[{ icon: FaGoogle, label: 'Google', color: '#ea4335' }, { icon: FaGithub, label: 'GitHub', color: '#f0ebe0' }].map(({ icon: Icon, label, color }) => (
                                    <button type="button" key={label} style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 14, border: '1px solid rgba(240,235,224,0.1)', background: 'rgba(240,235,224,0.02)', color: 'rgba(240,235,224,0.6)', fontSize: 13, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Bricolage Grotesque', sans-serif" }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,235,224,0.05)'; e.currentTarget.style.color = '#f0ebe0'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(240,235,224,0.02)'; e.currentTarget.style.color = 'rgba(240,235,224,0.6)'; }}
                                    >
                                        <Icon style={{ color, width: 16, height: 16 }} /> {label}
                                    </button>
                                ))}
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                <p style={{ color: 'rgba(240,235,224,0.6)', fontSize: 14 }}>
                                    We've sent a verification code to <span style={{ color: '#d4a017', fontWeight: 800 }}>{registeredEmail}</span>
                                </p>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text" required
                                    value={otp} onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px', color: '#f0ebe0', fontSize: 18, fontWeight: 600, outline: 'none', transition: 'all 0.3s', textAlign: 'center', letterSpacing: '0.2em' }}
                                    onFocus={e => { e.target.style.borderColor = '#6ec47a'; e.target.style.background = 'rgba(74, 158, 92, 0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ height: 52, justifyContent: 'center', fontSize: 14, padding: '0', background: 'linear-gradient(135deg, #6ec47a 0%, #34d399 100%)', color: '#0a1a0d', border: 'none', boxShadow: '0 8px 16px rgba(110,196,122,0.2)', marginTop: 12 }}>
                                {loading ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 16, height: 16, border: '2px solid rgba(10,26,13,0.2)', borderTop: '2px solid #0a1a0d', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                                        <span>VERIFYING...</span>
                                    </div>
                                ) : (
                                    'VERIFY & ENTER'
                                )}
                            </button>
                        </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(240,235,224,0.05)' }}>
                        <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)', fontWeight: 600 }}>
                            Profile established?{' '}
                            <Link href="/login" style={{ color: '#6ec47a', fontWeight: 800, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                Sign In Interface
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
