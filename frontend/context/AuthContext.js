'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        const token = localStorage.getItem('token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        } else {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, []);

    const normalizeUser = (u) => ({
        ...u,
        id: u._id || u.id,
        _id: u._id || u.id,
    });

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                const normalized = normalizeUser(data.user);
                setUser(normalized);
                localStorage.setItem('currentUser', JSON.stringify(normalized));
                localStorage.setItem('token', data.token);
                toast.success(`Welcome back, ${normalized.name}!`);
                return { success: true };
            } else {
                toast.error(data.message || 'Invalid email or password');
                return { success: false, error: data.message };
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Account created successfully!');
                return { success: true };
            } else {
                toast.error(data.message || 'Registration failed');
                return { success: false, error: data.message };
            }
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/api/users/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setUser(prev => {
                    const updated = {
                        ...prev,
                        problemsSolved: data.stats.problemsSolved,
                        problemsPosted: data.stats.problemsPosted,
                        articlesWritten: data.stats.articlesWritten,
                        reputation: data.stats.reputation,
                        level: data.stats.level,
                        streak: data.stats.streak,
                    };
                    localStorage.setItem('currentUser', JSON.stringify(updated));
                    return updated;
                });
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
    };

    const updateProfile = async (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            updateProfile,
            refreshUser,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
