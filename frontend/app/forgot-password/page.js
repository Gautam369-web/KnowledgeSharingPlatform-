'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineShieldCheck } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1); // 1 = email, 2 = otp & new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Password reset OTP sent to your email!');
                setStep(2);
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword })
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Password reset successfully!');
                setTimeout(() => router.push('/login'), 1500);
            } else {
                toast.error(data.message || 'Failed to reset password');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px', background: '#0a1a0d', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient Solarpunk Background Elements */}
            <div style={{ position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '0%', right: '5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 160, 23, 0.15) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(240,235,224,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,224,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10, animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                {/* Glassmorphism Card */}
                <div style={{ background: 'rgba(14, 32, 16, 0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 32, padding: '48px 40px', boxShadow: '0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #d4a017 0%, #f59e0b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 24, color: '#0a1a0d', fontFamily: "'Bricolage Grotesque', sans-serif", margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(212,160,23,0.3)' }}>
                            <HiOutlineShieldCheck />
                        </div>
                        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 32, fontWeight: 900, color: '#f0ebe0', marginBottom: 12, letterSpacing: '-0.03em' }}>
                            Reset Protocol
                        </h1>
                        <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.5)' }}>
                            {step === 1 ? 'Enter your signal address to recover access.' : 'Verify authorization and set new protocol.'}
                        </p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleRequestOTP} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineMail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                <input
                                    type="email" required
                                    value={email} onChange={e => setEmail(e.target.value)}
                                    placeholder="Communication Signal (Email)"
                                    style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                    onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(212, 160, 23, 0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                />
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary" style={{ height: 52, justifyContent: 'center', marginTop: 12, fontSize: 14, padding: '0', background: 'linear-gradient(135deg, #d4a017 0%, #f59e0b 100%)', color: '#0a1a0d', border: 'none', boxShadow: '0 8px 16px rgba(212,160,23,0.2)' }}>
                                {loading ? 'TRANSMITTING...' : 'SEND OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text" required
                                    value={otp} onChange={e => setOtp(e.target.value)}
                                    placeholder="6-Digit Auth Code"
                                    maxLength={6}
                                    style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px', color: '#f0ebe0', fontSize: 16, fontWeight: 600, outline: 'none', transition: 'all 0.3s', textAlign: 'center', letterSpacing: '0.1em' }}
                                    onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(212, 160, 23, 0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineLockClosed style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                <input
                                    type="password" required
                                    value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                    placeholder="New Security Protocol"
                                    style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                    onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(212, 160, 23, 0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineLockClosed style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20, pointerEvents: 'none' }} />
                                <input
                                    type="password" required
                                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Protocol"
                                    style={{ width: '100%', height: 52, background: 'rgba(10, 26, 13, 0.5)', border: '1px solid rgba(74, 158, 92, 0.2)', borderRadius: 16, padding: '0 20px 0 48px', color: '#f0ebe0', fontSize: 14, fontWeight: 600, outline: 'none', transition: 'all 0.3s' }}
                                    onFocus={e => { e.target.style.borderColor = '#d4a017'; e.target.style.background = 'rgba(212, 160, 23, 0.05)'; }}
                                    onBlur={e => { e.target.style.borderColor = 'rgba(74, 158, 92, 0.2)'; e.target.style.background = 'rgba(10, 26, 13, 0.5)'; }}
                                />
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary" style={{ height: 52, justifyContent: 'center', marginTop: 12, fontSize: 14, padding: '0', background: 'linear-gradient(135deg, #d4a017 0%, #f59e0b 100%)', color: '#0a1a0d', border: 'none', boxShadow: '0 8px 16px rgba(212,160,23,0.2)' }}>
                                {loading ? 'SYNTHESIZING...' : 'RESET PASSWORD'}
                            </button>
                        </form>
                    )}

                    <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(240,235,224,0.05)' }}>
                        <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)', fontWeight: 600 }}>
                            Remember your protocol?{' '}
                            <Link href="/login" style={{ color: '#d4a017', fontWeight: 800, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                Return
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
            `}</style>
        </div>
    );
}
