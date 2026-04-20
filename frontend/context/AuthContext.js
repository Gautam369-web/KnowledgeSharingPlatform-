'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Mock user data for demonstration
const MOCK_USERS = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: 'password123',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff&size=200',
        bio: 'Full-stack developer passionate about open source and knowledge sharing.',
        skills: ['React', 'Node.js', 'Python', 'MongoDB'],
        reputation: 15420,
        badges: ['gold-contributor', 'problem-solver', 'mentor', 'early-adopter'],
        role: 'expert',
        joinedAt: '2023-01-15',
        problemsSolved: 234,
        articlesWritten: 45,
        solutionsGiven: 567,
        location: 'San Francisco, CA',
        github: 'alexjohnson',
        website: 'https://alexjohnson.dev',
    },
    {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        password: 'password123',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff&size=200',
        bio: 'AI/ML researcher and educator. Love helping others learn.',
        skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
        reputation: 12800,
        badges: ['ai-expert', 'top-writer', 'helpful'],
        role: 'expert',
        joinedAt: '2023-03-20',
        problemsSolved: 189,
        articlesWritten: 67,
        solutionsGiven: 423,
        location: 'Boston, MA',
        github: 'sarahchen',
        website: 'https://sarahchen.ai',
    },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            // Since we don't have [...nextauth] yet, we can't use signIn from next-auth/react
            // But we can implement a temporary login API or just wait for NextAuth setup.
            // For now, let's just use the mock logic but prepare for real API

            // TODO: Implement real login API call
            console.log('Login attempt with:', email);

            // Temporary: keep mock until NextAuth is fully configured
            const HARDCODED_USER = {
                id: '1',
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            };

            if (email === HARDCODED_USER.email && password === HARDCODED_USER.password) {
                setUser(HARDCODED_USER);
                localStorage.setItem('currentUser', JSON.stringify(HARDCODED_USER));
                toast.success(`Welcome back!`);
                return { success: true };
            } else {
                toast.error('Invalid email or password');
                return { success: false, error: 'Invalid credentials' };
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
            const response = await fetch('http://localhost:5000/api/auth/register', {
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

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
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
