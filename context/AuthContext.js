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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const foundUser = MOCK_USERS.find(
                u => u.email === email && u.password === password
            );

            if (foundUser) {
                const { password: _, ...userWithoutPassword } = foundUser;
                setUser(userWithoutPassword);
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
                toast.success(`Welcome back, ${foundUser.name}!`);
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
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=6366f1&color=fff&size=200`,
                bio: '',
                skills: [],
                reputation: 0,
                badges: ['newcomer'],
                role: 'user',
                joinedAt: new Date().toISOString(),
                problemsSolved: 0,
                articlesWritten: 0,
                solutionsGiven: 0,
                location: '',
                github: '',
                website: '',
            };

            setUser(newUser);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            toast.success('Account created successfully! Welcome to SolveHub!');
            return { success: true };
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
