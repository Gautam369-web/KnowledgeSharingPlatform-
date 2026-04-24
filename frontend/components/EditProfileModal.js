import { useState } from 'react';
import { HiOutlineX, HiOutlineCode, HiOutlineGlobe, HiOutlineLocationMarker, HiOutlineUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function EditProfileModal({ user, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || ''
    });
    const [loading, setLoading] = useState(false);

    const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                toast.success('Bio-Technical parameters updated successfully.');
                onUpdate(data);
                onClose();
            } else {
                toast.error(data.message || 'Update failed');
            }
        } catch (error) {
            toast.error('Network Error during synchronization');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            {/* Backdrop */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,26,13,0.8)', backdropFilter: 'blur(8px)' }} onClick={onClose} />

            <div style={{ position: 'relative', width: '100%', maxWidth: 640, background: 'rgba(14,32,16,0.9)', border: '1px solid rgba(74,158,92,0.3)', borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.5)', overflow: 'hidden', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid rgba(74,158,92,0.1)' }}>
                    <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 900, color: '#f0ebe0', margin: 0 }}>Configure Identity Node</h2>
                    <button onClick={onClose} style={{ background: 'rgba(240,235,224,0.05)', border: 'none', color: 'rgba(240,235,224,0.5)', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#f0ebe0'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.5)'}>
                        <HiOutlineX style={{ fontSize: 20 }} />
                    </button>
                </div>

                {/* Form Content */}
                <div style={{ padding: '32px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(240,235,224,0.4)', marginBottom: 8, letterSpacing: '0.05em' }}>DISPLAY DESIGNATION</label>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineUser style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20 }} />
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', background: 'rgba(10,26,13,0.5)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px 14px 48px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#d4a017'} onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(240,235,224,0.4)', marginBottom: 8, letterSpacing: '0.05em' }}>BIO-TECHNICAL SUMMARY</label>
                            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" placeholder="Define your role within the ecosystem..." style={{ width: '100%', background: 'rgba(10,26,13,0.5)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '16px', color: '#f0ebe0', fontSize: 15, fontWeight: 500, outline: 'none', transition: 'border-color 0.2s', resize: 'vertical' }} onFocus={e => e.target.style.borderColor = '#d4a017'} onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(240,235,224,0.4)', marginBottom: 8, letterSpacing: '0.05em' }}>LOCATION NODE</label>
                                <div style={{ position: 'relative' }}>
                                    <HiOutlineLocationMarker style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20 }} />
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Physical or Virtual coordinates" style={{ width: '100%', background: 'rgba(10,26,13,0.5)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px 14px 48px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#d4a017'} onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(240,235,224,0.4)', marginBottom: 8, letterSpacing: '0.05em' }}>EXTERNAL LINK</label>
                                <div style={{ position: 'relative' }}>
                                    <HiOutlineGlobe style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20 }} />
                                    <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="https://..." style={{ width: '100%', background: 'rgba(10,26,13,0.5)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px 14px 48px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#d4a017'} onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: 'rgba(240,235,224,0.4)', marginBottom: 8, letterSpacing: '0.05em' }}>GITHUB REPOSITORY</label>
                            <div style={{ position: 'relative' }}>
                                <HiOutlineCode style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', width: 20, height: 20 }} />
                                <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Handle" style={{ width: '100%', background: 'rgba(10,26,13,0.5)', border: '1px solid rgba(74,158,92,0.2)', borderRadius: 12, padding: '14px 16px 14px 48px', color: '#f0ebe0', fontSize: 15, fontWeight: 600, outline: 'none', transition: 'border-color 0.2s' }} onFocus={e => e.target.style.borderColor = '#d4a017'} onBlur={e => e.target.style.borderColor = 'rgba(74,158,92,0.2)'} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 16 }}>
                            <button type="button" onClick={onClose} style={{ padding: '14px 24px', background: 'transparent', border: 'none', color: '#f0ebe0', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#d4a017'} onMouseLeave={e => e.currentTarget.style.color = '#f0ebe0'}>CANCEL</button>
                            <button type="submit" disabled={loading} style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #d4a017 0%, #b8860b 100%)', color: '#0a1a0d', border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 900, cursor: 'pointer', boxShadow: '0 8px 20px rgba(212,160,23,0.3)' }}>
                                {loading ? 'SYNCHRONIZING...' : 'UPLOAD SPECIFICATIONS'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(40px) scale(0.98); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
