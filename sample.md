🚀 Knowledge Sharing Platform - Complete Next.js Code
Project Structure

text

knowledge-platform/
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── .env.local
├── app/
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   ├── login/page.js
│   ├── register/page.js
│   ├── problems/
│   │   ├── page.js
│   │   ├── [id]/page.js
│   │   └── new/page.js
│   ├── articles/
│   │   ├── page.js
│   │   ├── [id]/page.js
│   │   └── new/page.js
│   ├── profile/[id]/page.js
│   ├── leaderboard/page.js
│   ├── dashboard/page.js
│   ├── search/page.js
│   ├── api/
│   │   ├── auth/[...nextauth]/route.js
│   │   ├── problems/route.js
│   │   ├── problems/[id]/route.js
│   │   ├── solutions/route.js
│   │   ├── solutions/[id]/vote/route.js
│   │   ├── articles/route.js
│   │   ├── users/route.js
│   │   ├── users/[id]/route.js
│   │   └── leaderboard/route.js
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── Sidebar.js
│   ├── ProblemCard.js
│   ├── SolutionCard.js
│   ├── ArticleCard.js
│   ├── UserCard.js
│   ├── SearchBar.js
│   ├── TagBadge.js
│   ├── StatsCard.js
│   ├── RichTextEditor.js
│   ├── VoteButtons.js
│   ├── CommentSection.js
│   ├── ProfileHeader.js
│   ├── LeaderboardTable.js
│   ├── TrendingSection.js
│   ├── CategoryFilter.js
│   ├── HeroSection.js
│   ├── FeatureCard.js
│   ├── NotificationDropdown.js
│   ├── BadgeDisplay.js
│   ├── ActivityFeed.js
│   ├── DashboardStats.js
│   └── ThemeToggle.js
├── context/
│   ├── AuthContext.js
│   └── ThemeContext.js
├── lib/
│   ├── mongodb.js
│   ├── utils.js
│   └── data.js
├── models/
│   ├── User.js
│   ├── Problem.js
│   ├── Solution.js
│   ├── Article.js
│   ├── Comment.js
│   └── Notification.js
└── public/
    └── images/

1. Configuration Files
package.json

JSON

{
  "name": "knowledge-sharing-platform",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "mongoose": "^8.1.0",
    "next-auth": "^4.24.5",
    "bcryptjs": "^2.4.3",
    "react-icons": "^5.0.1",
    "react-hot-toast": "^2.4.1",
    "react-markdown": "^9.0.1",
    "react-syntax-highlighter": "^15.5.0",
    "framer-motion": "^11.0.3",
    "date-fns": "^3.3.1",
    "sharp": "^0.33.2"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.33",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.1.0"
  }
}

next.config.js

JavaScript

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'ui-avatars.com',
      'images.unsplash.com'
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

tailwind.config.js

JavaScript

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
};

postcss.config.js

JavaScript

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

jsconfig.json

JSON

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

.env.local

env

MONGODB_URI=mongodb://localhost:27017/knowledge-platform
NEXTAUTH_SECRET=your-super-secret-key-here-change-this
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

2. Global Styles & Layout
app/globals.css

CSS

@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

@layer base {
  :root {
    --background: 255 255 255;
    --foreground: 15 23 42;
    --card: 255 255 255;
    --card-foreground: 15 23 42;
    --border: 226 232 240;
    --input: 241 245 249;
    --ring: 99 102 241;
  }

  .dark {
    --background: 15 23 42;
    --foreground: 248 250 252;
    --card: 30 41 59;
    --card-foreground: 248 250 252;
    --border: 51 65 85;
    --input: 30 41 59;
    --ring: 129 140 248;
  }

  * {
    @apply border-slate-200 dark:border-slate-700;
  }

  body {
    @apply bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100;
    font-family: 'Inter', system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 
           bg-gradient-to-r from-primary-600 to-primary-700 
           text-white font-semibold rounded-xl 
           hover:from-primary-700 hover:to-primary-800 
           transition-all duration-300 shadow-lg shadow-primary-500/25 
           hover:shadow-xl hover:shadow-primary-500/30 
           hover:-translate-y-0.5 active:translate-y-0
           focus:outline-none focus:ring-2 focus:ring-primary-500 
           focus:ring-offset-2 dark:focus:ring-offset-slate-900;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 
           bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
           font-semibold rounded-xl border-2 border-slate-200 
           dark:border-slate-700 hover:border-primary-300 
           dark:hover:border-primary-600 hover:text-primary-600 
           dark:hover:text-primary-400 transition-all duration-300 
           hover:-translate-y-0.5 active:translate-y-0;
  }

  .btn-accent {
    @apply inline-flex items-center justify-center px-6 py-3 
           bg-gradient-to-r from-accent-500 to-accent-600 
           text-white font-semibold rounded-xl 
           hover:from-accent-600 hover:to-accent-700 
           transition-all duration-300 shadow-lg shadow-accent-500/25;
  }

  .btn-danger {
    @apply inline-flex items-center justify-center px-6 py-3 
           bg-gradient-to-r from-red-500 to-red-600 
           text-white font-semibold rounded-xl 
           hover:from-red-600 hover:to-red-700 
           transition-all duration-300 shadow-lg shadow-red-500/25;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center px-4 py-2 
           text-slate-600 dark:text-slate-400 font-medium rounded-lg 
           hover:bg-slate-100 dark:hover:bg-slate-800 
           transition-all duration-200;
  }

  .card {
    @apply bg-white dark:bg-slate-900 rounded-2xl border 
           border-slate-200 dark:border-slate-800 
           shadow-sm hover:shadow-lg transition-all duration-300;
  }

  .card-hover {
    @apply card hover:-translate-y-1 hover:border-primary-200 
           dark:hover:border-primary-800 cursor-pointer;
  }

  .input-field {
    @apply w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 
           border border-slate-200 dark:border-slate-700 
           rounded-xl text-slate-900 dark:text-slate-100 
           placeholder:text-slate-400 dark:placeholder:text-slate-500 
           focus:outline-none focus:ring-2 focus:ring-primary-500 
           focus:border-transparent transition-all duration-200;
  }

  .textarea-field {
    @apply input-field resize-none min-h-[120px];
  }

  .select-field {
    @apply input-field appearance-none cursor-pointer;
  }

  .label-text {
    @apply block text-sm font-semibold text-slate-700 
           dark:text-slate-300 mb-2;
  }

  .badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs 
           font-semibold transition-colors duration-200;
  }

  .badge-primary {
    @apply badge bg-primary-100 text-primary-700 
           dark:bg-primary-900/50 dark:text-primary-300;
  }

  .badge-accent {
    @apply badge bg-accent-100 text-accent-700 
           dark:bg-accent-900/50 dark:text-accent-300;
  }

  .badge-warning {
    @apply badge bg-amber-100 text-amber-700 
           dark:bg-amber-900/50 dark:text-amber-300;
  }

  .badge-danger {
    @apply badge bg-red-100 text-red-700 
           dark:bg-red-900/50 dark:text-red-300;
  }

  .badge-success {
    @apply badge bg-emerald-100 text-emerald-700 
           dark:bg-emerald-900/50 dark:text-emerald-300;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 via-purple-600 
           to-primary-600 bg-clip-text text-transparent 
           bg-300% animate-gradient;
  }

  .glass {
    @apply bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
           border border-white/20 dark:border-slate-700/50;
  }

  .section-title {
    @apply text-3xl md:text-4xl font-bold text-slate-900 
           dark:text-white;
  }

  .section-subtitle {
    @apply text-lg text-slate-600 dark:text-slate-400 
           max-w-2xl mx-auto;
  }

  .page-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8;
  }

  .prose-content {
    @apply prose prose-slate dark:prose-invert 
           prose-headings:font-bold prose-a:text-primary-600 
           prose-code:text-primary-600 prose-pre:bg-slate-900 
           max-w-none;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-slate-100 dark:bg-slate-900;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-700 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-400 dark:bg-slate-600;
}

/* Animations */
.animate-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }

/* Glow effect */
.glow {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.glow-accent {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

app/layout.js

React

import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'SolveHub - Knowledge Sharing Platform for Problem Solving',
  description: 'A collaborative platform where communities come together to solve problems, share knowledge, and grow together.',
  keywords: 'knowledge sharing, problem solving, collaboration, Q&A, community',
  authors: [{ name: 'SolveHub Team' }],
  openGraph: {
    title: 'SolveHub - Knowledge Sharing Platform',
    description: 'Collaborative problem-solving platform',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#f8fafc',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f8fafc',
                  },
                },
              }}
            />
            <Navbar />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

3. Context Providers
context/ThemeContext.js

React

'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

context/AuthContext.js

React

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

4. Mock Data
lib/data.js

JavaScript

export const categories = [
  { id: 1, name: 'Technology', icon: '💻', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300', count: 1234 },
  { id: 2, name: 'Science', icon: '🔬', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300', count: 856 },
  { id: 3, name: 'Mathematics', icon: '📐', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300', count: 643 },
  { id: 4, name: 'Business', icon: '📊', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300', count: 521 },
  { id: 5, name: 'Health', icon: '🏥', color: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300', count: 398 },
  { id: 6, name: 'Education', icon: '📚', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300', count: 765 },
  { id: 7, name: 'Engineering', icon: '⚙️', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', count: 432 },
  { id: 8, name: 'Design', icon: '🎨', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300', count: 367 },
];

export const problems = [
  {
    id: '1',
    title: 'How to implement real-time notifications in a Next.js application?',
    description: `I'm building a collaborative platform using Next.js and need to implement real-time notifications. I've considered using WebSockets with Socket.io, but I'm not sure how to integrate it properly with the Next.js App Router.

**What I've tried:**
- Server-Sent Events (SSE) - works but limited
- Polling - too many requests
- Socket.io - integration issues with App Router

**Requirements:**
1. Real-time push notifications
2. Persistent notification storage
3. Read/unread status tracking
4. Works with Next.js App Router

Any guidance on the best approach would be greatly appreciated!`,
    author: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
      reputation: 15420,
    },
    category: 'Technology',
    tags: ['Next.js', 'WebSocket', 'Real-time', 'Notifications'],
    status: 'open',
    priority: 'high',
    upvotes: 47,
    downvotes: 2,
    views: 1234,
    solutions: 8,
    comments: 12,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:20:00Z',
  },
  {
    id: '2',
    title: 'Best practices for database schema design in MongoDB for a social platform',
    description: `I'm designing a database schema for a social media-like platform using MongoDB. The platform needs to handle:

- User profiles with followers/following
- Posts with likes, comments, and shares
- Real-time messaging
- Notification system

Should I use embedding or referencing? How do I handle many-to-many relationships efficiently?

Looking for practical advice from experienced developers.`,
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
      reputation: 12800,
    },
    category: 'Technology',
    tags: ['MongoDB', 'Database Design', 'Schema', 'NoSQL'],
    status: 'solved',
    priority: 'medium',
    upvotes: 83,
    downvotes: 1,
    views: 2567,
    solutions: 12,
    comments: 23,
    createdAt: '2024-01-10T08:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: '3',
    title: 'Understanding quantum entanglement for beginners',
    description: `I'm a physics undergraduate trying to understand quantum entanglement at a deeper level. I understand the basic EPR paradox and Bell's theorem conceptually, but I'm struggling with the mathematical formalism.

**Specific questions:**
1. How do we mathematically describe an entangled state?
2. What's the physical intuition behind the tensor product of Hilbert spaces?
3. How does decoherence affect entanglement in practice?

Any recommended resources or explanations would be wonderful!`,
    author: {
      id: '3',
      name: 'Michael Park',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Park&background=10b981&color=fff',
      reputation: 3200,
    },
    category: 'Science',
    tags: ['Physics', 'Quantum Mechanics', 'Education'],
    status: 'open',
    priority: 'medium',
    upvotes: 156,
    downvotes: 3,
    views: 5892,
    solutions: 6,
    comments: 34,
    createdAt: '2024-01-08T15:20:00Z',
    updatedAt: '2024-01-12T09:30:00Z',
  },
  {
    id: '4',
    title: 'Optimizing React component re-renders in a large-scale application',
    description: `Our React application has grown significantly and we're experiencing performance issues due to unnecessary re-renders. The app has:

- 200+ components
- Complex state management with Redux
- Real-time data updates every 5 seconds
- Large lists with 1000+ items

**Current performance metrics:**
- First Contentful Paint: 3.2s
- Time to Interactive: 5.8s
- Largest Contentful Paint: 4.5s

What strategies can we use to optimize performance?`,
    author: {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff',
      reputation: 8900,
    },
    category: 'Technology',
    tags: ['React', 'Performance', 'Optimization', 'Redux'],
    status: 'open',
    priority: 'high',
    upvotes: 92,
    downvotes: 0,
    views: 3456,
    solutions: 15,
    comments: 28,
    createdAt: '2024-01-12T11:00:00Z',
    updatedAt: '2024-01-15T08:20:00Z',
  },
  {
    id: '5',
    title: 'Machine Learning model selection for time series forecasting',
    description: `I'm working on a time series forecasting project for predicting energy consumption. The dataset has:

- 3 years of hourly data
- Multiple seasonal patterns (daily, weekly, yearly)
- Some missing values
- External features (weather, holidays)

Which ML model would be best suited? I've considered:
- ARIMA/SARIMA
- Prophet
- LSTM Neural Networks
- XGBoost with feature engineering

Any recommendations based on practical experience?`,
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
      reputation: 12800,
    },
    category: 'Technology',
    tags: ['Machine Learning', 'Time Series', 'Python', 'Data Science'],
    status: 'solved',
    priority: 'medium',
    upvotes: 124,
    downvotes: 2,
    views: 4521,
    solutions: 9,
    comments: 19,
    createdAt: '2024-01-05T09:45:00Z',
    updatedAt: '2024-01-11T17:30:00Z',
  },
  {
    id: '6',
    title: 'How to build a scalable microservices architecture?',
    description: `Our startup is transitioning from a monolithic architecture to microservices. We need guidance on:

1. Service decomposition strategies
2. Inter-service communication (REST vs gRPC vs message queues)
3. Data management patterns (database per service vs shared)
4. Service discovery and load balancing
5. Monitoring and observability

Our current stack: Node.js, PostgreSQL, Redis, Docker

What are the best practices and common pitfalls to avoid?`,
    author: {
      id: '5',
      name: 'David Kumar',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff',
      reputation: 11200,
    },
    category: 'Technology',
    tags: ['Microservices', 'Architecture', 'Docker', 'Node.js'],
    status: 'open',
    priority: 'high',
    upvotes: 201,
    downvotes: 5,
    views: 7823,
    solutions: 11,
    comments: 42,
    createdAt: '2024-01-03T14:00:00Z',
    updatedAt: '2024-01-14T10:15:00Z',
  },
];

export const solutions = [
  {
    id: 's1',
    problemId: '1',
    content: `Great question! Here's a comprehensive approach to implementing real-time notifications in Next.js:

## Approach: Server-Sent Events + Database

For the Next.js App Router, I recommend using **Server-Sent Events (SSE)** combined with a database for persistence. Here's why and how:

### 1. Create an SSE Endpoint

\`\`\`javascript
// app/api/notifications/stream/route.js
export async function GET(request) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const data = JSON.stringify({ 
          type: 'notification',
          timestamp: Date.now() 
        });
        controller.enqueue(
          encoder.encode(\`data: \${data}\\n\\n\`)
        );
      }, 5000);
      
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
\`\`\`

### 2. Client-side Hook

\`\`\`javascript
function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const eventSource = new EventSource('/api/notifications/stream');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(prev => [data, ...prev]);
    };
    return () => eventSource.close();
  }, []);
  
  return notifications;
}
\`\`\`

This approach works perfectly with the App Router and doesn't require Socket.io.`,
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
      reputation: 12800,
    },
    upvotes: 34,
    downvotes: 1,
    isAccepted: true,
    createdAt: '2024-01-15T14:30:00Z',
    comments: [
      {
        id: 'c1',
        content: 'This is exactly what I needed! The SSE approach works great with App Router.',
        author: { id: '1', name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff' },
        createdAt: '2024-01-15T15:00:00Z',
      },
      {
        id: 'c2',
        content: 'You might also want to consider using Pusher or Ably for production-grade real-time features.',
        author: { id: '4', name: 'Emma Wilson', avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff' },
        createdAt: '2024-01-15T16:30:00Z',
      },
    ],
  },
  {
    id: 's2',
    problemId: '1',
    content: `Another approach worth considering is using **Vercel's AI SDK** with streaming, or **Upstash Redis** for pub/sub:

### Using Upstash Redis Pub/Sub

\`\`\`javascript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

// Publish notification
await redis.publish('notifications', JSON.stringify({
  userId: 'user123',
  message: 'New solution posted!',
  type: 'solution',
}))
\`\`\`

This scales much better than SSE for large applications.`,
    author: {
      id: '5',
      name: 'David Kumar',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff',
      reputation: 11200,
    },
    upvotes: 18,
    downvotes: 0,
    isAccepted: false,
    createdAt: '2024-01-15T16:00:00Z',
    comments: [],
  },
];

export const articles = [
  {
    id: 'a1',
    title: 'Complete Guide to Building Scalable APIs with Next.js 14',
    excerpt: 'Learn how to build production-ready APIs using Next.js 14 App Router, including middleware, error handling, rate limiting, and authentication.',
    content: `# Complete Guide to Building Scalable APIs with Next.js 14

Building APIs with Next.js 14 has never been easier. In this comprehensive guide, we'll cover everything you need to know...

## Table of Contents
1. Setting up Route Handlers
2. Middleware and Authentication
3. Error Handling
4. Rate Limiting
5. Database Integration
6. Testing

## 1. Setting up Route Handlers

The App Router introduces a new way to create API endpoints using Route Handlers...`,
    author: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
      reputation: 15420,
    },
    category: 'Technology',
    tags: ['Next.js', 'API', 'Backend', 'Tutorial'],
    likes: 234,
    views: 8934,
    readTime: 12,
    createdAt: '2024-01-10T09:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
  },
  {
    id: 'a2',
    title: 'Understanding Neural Networks: From Perceptrons to Transformers',
    excerpt: 'A visual journey through the evolution of neural networks, explaining complex concepts with intuitive analogies and interactive examples.',
    content: 'Full article content here...',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
      reputation: 12800,
    },
    category: 'Science',
    tags: ['AI', 'Neural Networks', 'Deep Learning', 'Education'],
    likes: 567,
    views: 15234,
    readTime: 18,
    createdAt: '2024-01-08T14:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  },
  {
    id: 'a3',
    title: 'The Art of System Design: Lessons from Building at Scale',
    excerpt: 'Real-world system design lessons learned from building applications that serve millions of users, with practical examples and diagrams.',
    content: 'Full article content here...',
    author: {
      id: '5',
      name: 'David Kumar',
      avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff',
      reputation: 11200,
    },
    category: 'Technology',
    tags: ['System Design', 'Architecture', 'Scalability'],
    likes: 892,
    views: 23456,
    readTime: 15,
    createdAt: '2024-01-05T11:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  },
  {
    id: 'a4',
    title: 'Mastering CSS Grid and Flexbox: A Practical Guide',
    excerpt: 'Stop struggling with layouts! This guide covers every CSS Grid and Flexbox concept with real-world examples you can use today.',
    content: 'Full article content here...',
    author: {
      id: '6',
      name: 'Lisa Wang',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=ec4899&color=fff',
      reputation: 7600,
    },
    category: 'Design',
    tags: ['CSS', 'Web Design', 'Frontend', 'Tutorial'],
    likes: 445,
    views: 12890,
    readTime: 10,
    createdAt: '2024-01-12T16:00:00Z',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
  },
];

export const leaderboardUsers = [
  {
    id: '1', rank: 1, name: 'Alex Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff',
    reputation: 15420, solutions: 567, badges: 12,
    streak: 45, level: 'Legend',
  },
  {
    id: '2', rank: 2, name: 'Sarah Chen',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff',
    reputation: 12800, solutions: 423, badges: 10,
    streak: 32, level: 'Master',
  },
  {
    id: '5', rank: 3, name: 'David Kumar',
    avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff',
    reputation: 11200, solutions: 389, badges: 9,
    streak: 28, level: 'Master',
  },
  {
    id: '4', rank: 4, name: 'Emma Wilson',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=f59e0b&color=fff',
    reputation: 8900, solutions: 312, badges: 8,
    streak: 21, level: 'Expert',
  },
  {
    id: '6', rank: 5, name: 'Lisa Wang',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=ec4899&color=fff',
    reputation: 7600, solutions: 267, badges: 7,
    streak: 18, level: 'Expert',
  },
  {
    id: '3', rank: 6, name: 'Michael Park',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Park&background=10b981&color=fff',
    reputation: 3200, solutions: 98, badges: 4,
    streak: 12, level: 'Rising Star',
  },
  {
    id: '7', rank: 7, name: 'James Anderson',
    avatar: 'https://ui-avatars.com/api/?name=James+Anderson&background=06b6d4&color=fff',
    reputation: 2800, solutions: 87, badges: 3,
    streak: 9, level: 'Contributor',
  },
  {
    id: '8', rank: 8, name: 'Priya Patel',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=f97316&color=fff',
    reputation: 2400, solutions: 76, badges: 3,
    streak: 7, level: 'Contributor',
  },
  {
    id: '9', rank: 9, name: 'Robert Kim',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Kim&background=14b8a6&color=fff',
    reputation: 1900, solutions: 54, badges: 2,
    streak: 5, level: 'Learner',
  },
  {
    id: '10', rank: 10, name: 'Nina Petrov',
    avatar: 'https://ui-avatars.com/api/?name=Nina+Petrov&background=a855f7&color=fff',
    reputation: 1500, solutions: 43, badges: 2,
    streak: 4, level: 'Learner',
  },
];

export const notifications = [
  { id: 'n1', type: 'solution', message: 'Sarah Chen answered your question', time: '5 min ago', read: false },
  { id: 'n2', type: 'upvote', message: 'Your solution received 10 upvotes', time: '1 hour ago', read: false },
  { id: 'n3', type: 'badge', message: 'You earned the "Problem Solver" badge!', time: '3 hours ago', read: false },
  { id: 'n4', type: 'comment', message: 'Emma Wilson commented on your solution', time: '5 hours ago', read: true },
  { id: 'n5', type: 'accepted', message: 'Your answer was accepted!', time: '1 day ago', read: true },
];

export const stats = {
  totalProblems: 12543,
  totalSolutions: 34567,
  totalUsers: 8923,
  totalArticles: 2345,
  solvedRate: 78,
  activeUsers: 1234,
};

lib/utils.js

JavaScript

export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

export function getStatusColor(status) {
  switch (status) {
    case 'open': return 'badge-primary';
    case 'solved': return 'badge-success';
    case 'in-progress': return 'badge-warning';
    case 'closed': return 'badge-danger';
    default: return 'badge-primary';
  }
}

export function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return 'text-red-500';
    case 'medium': return 'text-amber-500';
    case 'low': return 'text-green-500';
    default: return 'text-slate-500';
  }
}

export function truncate(str, length = 150) {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export function getLevelColor(level) {
  switch (level) {
    case 'Legend': return 'text-amber-500';
    case 'Master': return 'text-purple-500';
    case 'Expert': return 'text-blue-500';
    case 'Rising Star': return 'text-emerald-500';
    case 'Contributor': return 'text-cyan-500';
    case 'Learner': return 'text-slate-500';
    default: return 'text-slate-500';
  }
}

5. Components
components/Navbar.js

React

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { notifications as mockNotifications } from '@/lib/data';
import {
  HiOutlineMenu, HiOutlineX, HiOutlineBell,
  HiOutlinePlus, HiOutlineSearch, HiOutlineMoon,
  HiOutlineSun, HiOutlineLogout, HiOutlineUser,
  HiOutlineCog, HiOutlineChartBar, HiOutlineBookOpen,
  HiOutlineLightBulb, HiOutlineTrendingUp, HiOutlineHome,
} from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowNotifications(false);
    setShowProfile(false);
  }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home', icon: HiOutlineHome },
    { href: '/problems', label: 'Problems', icon: HiOutlineLightBulb },
    { href: '/articles', label: 'Articles', icon: HiOutlineBookOpen },
    { href: '/leaderboard', label: 'Leaderboard', icon: HiOutlineTrendingUp },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass shadow-lg shadow-slate-900/5' 
        : 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-purple-600 
                          rounded-xl flex items-center justify-center shadow-lg 
                          shadow-primary-500/30 group-hover:shadow-primary-500/50 
                          transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 
                           to-purple-600 bg-clip-text text-transparent hidden sm:block">
              SolveHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl 
                            text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Search toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 
                       dark:hover:bg-slate-800 dark:text-slate-400 
                       transition-colors duration-200"
            >
              <HiOutlineSearch className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 
                       dark:hover:bg-slate-800 dark:text-slate-400 
                       transition-colors duration-200"
            >
              {theme === 'dark' ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <>
                {/* Post Problem Button */}
                <Link
                  href="/problems/new"
                  className="hidden sm:flex items-center space-x-1.5 px-4 py-2 
                           bg-gradient-to-r from-primary-600 to-purple-600 
                           text-white text-sm font-semibold rounded-xl 
                           hover:from-primary-700 hover:to-purple-700 
                           transition-all duration-300 shadow-md 
                           shadow-primary-500/25 hover:shadow-lg 
                           hover:shadow-primary-500/30"
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  <span>Ask Question</span>
                </Link>

                {/* Notifications */}
                <div ref={notifRef} className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfile(false);
                    }}
                    className="relative p-2 rounded-xl text-slate-500 
                             hover:bg-slate-100 dark:hover:bg-slate-800 
                             dark:text-slate-400 transition-colors duration-200"
                  >
                    <HiOutlineBell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 
                                     bg-red-500 text-white text-xs font-bold 
                                     rounded-full flex items-center justify-center 
                                     animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 
                                  rounded-2xl shadow-2xl border border-slate-200 
                                  dark:border-slate-700 overflow-hidden animate-slide-down">
                      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {mockNotifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`p-4 border-b border-slate-100 
                                      dark:border-slate-800 hover:bg-slate-50 
                                      dark:hover:bg-slate-800 cursor-pointer 
                                      transition-colors ${
                              !notif.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                                !notif.read ? 'bg-primary-500' : 'bg-transparent'
                              }`} />
                              <div>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                  {notif.message}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
                        <button className="w-full text-center text-sm text-primary-600 
                                         dark:text-primary-400 font-medium hover:underline">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => {
                      setShowProfile(!showProfile);
                      setShowNotifications(false);
                    }}
                    className="flex items-center space-x-2 p-1 rounded-xl 
                             hover:bg-slate-100 dark:hover:bg-slate-800 
                             transition-colors duration-200"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-lg object-cover ring-2 
                               ring-primary-200 dark:ring-primary-800"
                    />
                  </button>

                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 
                                  rounded-2xl shadow-2xl border border-slate-200 
                                  dark:border-slate-700 overflow-hidden animate-slide-down">
                      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">
                              {user?.name}
                            </p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-2">
                          <span className="badge-primary text-xs">
                            ⭐ {user?.reputation?.toLocaleString()} rep
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          href={`/profile/${user?.id}`}
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                        >
                          <HiOutlineUser className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                        >
                          <HiOutlineChartBar className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg 
                                   text-slate-700 dark:text-slate-300 
                                   hover:bg-slate-100 dark:hover:bg-slate-800 
                                   transition-colors text-sm"
                        >
                          <HiOutlineCog className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      <div className="p-2 border-t border-slate-200 dark:border-slate-700">
                        <button
                          onClick={logout}
                          className="flex items-center space-x-3 px-3 py-2 w-full 
                                   rounded-lg text-red-600 dark:text-red-400 
                                   hover:bg-red-50 dark:hover:bg-red-900/20 
                                   transition-colors text-sm"
                        >
                          <HiOutlineLogout className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/login" className="btn-ghost text-sm">
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm !px-4 !py-2">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-500 
                       hover:bg-slate-100 dark:hover:bg-slate-800 
                       transition-colors duration-200"
            >
              {isOpen ? <HiOutlineX className="w-5 h-5" /> : <HiOutlineMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {showSearch && (
          <div className="pb-4 animate-slide-down">
            <form onSubmit={handleSearch} className="relative">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems, articles, users..."
                className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 
                         rounded-xl border-0 focus:outline-none focus:ring-2 
                         focus:ring-primary-500 text-slate-900 dark:text-white 
                         placeholder:text-slate-400"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t 
                      border-slate-200 dark:border-slate-800 animate-slide-down">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl 
                            text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/problems/new"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl 
                           bg-primary-600 text-white text-sm font-semibold"
                >
                  <HiOutlinePlus className="w-5 h-5" />
                  <span>Ask a Question</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl 
                           text-slate-600 dark:text-slate-400 text-sm font-medium 
                           hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <HiOutlineChartBar className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </>
            ) : (
              <div className="pt-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
                <Link href="/login" className="block w-full btn-secondary text-center text-sm">
                  Sign In
                </Link>
                <Link href="/register" className="block w-full btn-primary text-center text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

components/Footer.js

React

import Link from 'next/link';
import {
  HiOutlineLightBulb, HiOutlineBookOpen,
  HiOutlineTrendingUp, HiOutlineHeart,
} from 'react-icons/hi';
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const footerLinks = {
    Platform: [
      { label: 'Problems', href: '/problems' },
      { label: 'Articles', href: '/articles' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Categories', href: '/categories' },
    ],
    Community: [
      { label: 'Guidelines', href: '/guidelines' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Press', href: '/press' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'DMCA', href: '/dmca' },
    ],
  };

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaDiscord, href: '#', label: 'Discord' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 border-t 
                      border-slate-800 mt-20">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 
                            rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">SolveHub</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              A collaborative platform where communities come together to solve 
              problems, share knowledge, and grow together.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-slate-800 flex items-center 
                           justify-center text-slate-400 hover:bg-primary-600 
                           hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-primary-400 
                               transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} SolveHub. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center">
              Made with <HiOutlineHeart className="w-4 h-4 text-red-500 mx-1" /> 
              for the community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

components/ProblemCard.js

React

'use client';

import Link from 'next/link';
import { formatNumber, timeAgo, getStatusColor, getPriorityColor, truncate } from '@/lib/utils';
import {
  HiOutlineEye, HiOutlineChatAlt2, HiOutlineChevronUp,
  HiOutlineLightBulb, HiOutlineClock, HiOutlineCheckCircle,
} from 'react-icons/hi';

export default function ProblemCard({ problem, compact = false }) {
  if (!problem) return null;

  return (
    <Link href={`/problems/${problem.id}`}>
      <div className={`card-hover p-6 group ${compact ? 'p-4' : ''}`}>
        <div className="flex gap-4">
          {/* Vote & Stats Column */}
          <div className="hidden sm:flex flex-col items-center space-y-3 min-w-[60px]">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                <HiOutlineChevronUp className="w-4 h-4" />
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  {formatNumber(problem.upvotes - problem.downvotes)}
                </span>
              </div>
              <span className="text-xs text-slate-400">votes</span>
            </div>
            
            <div className={`flex flex-col items-center px-3 py-1.5 rounded-lg ${
              problem.status === 'solved'
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}>
              <span className="font-bold text-sm">{problem.solutions}</span>
              <span className="text-xs">
                {problem.status === 'solved' ? '✓' : 'ans'}
              </span>
            </div>

            <div className="flex flex-col items-center text-slate-400">
              <span className="font-medium text-sm">{formatNumber(problem.views)}</span>
              <span className="text-xs">views</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Status & Priority */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={getStatusColor(problem.status)}>
                {problem.status === 'solved' && <HiOutlineCheckCircle className="w-3 h-3 mr-1 inline" />}
                {problem.status}
              </span>
              {problem.priority === 'high' && (
                <span className="badge-danger">
                  🔥 High Priority
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-slate-900 dark:text-white 
                          group-hover:text-primary-600 dark:group-hover:text-primary-400 
                          transition-colors line-clamp-2 ${compact ? 'text-base' : 'text-lg'}`}>
              {problem.title}
            </h3>

            {/* Description preview */}
            {!compact && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {truncate(problem.description.replace(/[#*`\n]/g, ' '), 200)}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {problem.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-primary-50 dark:bg-primary-900/20 
                           text-primary-600 dark:text-primary-400 text-xs font-medium 
                           rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 
                           transition-colors"
                >
                  {tag}
                </span>
              ))}
              {problem.tags.length > 4 && (
                <span className="text-xs text-slate-400 self-center">
                  +{problem.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500 
                          dark:text-slate-400">
              {/* Author */}
              <div className="flex items-center space-x-2">
                <img
                  src={problem.author.avatar}
                  alt={problem.author.name}
                  className="w-5 h-5 rounded-md"
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {problem.author.name}
                </span>
                <span className="text-primary-500 font-medium">
                  {formatNumber(problem.author.reputation)}
                </span>
              </div>

              <div className="flex items-center space-x-1">
                <HiOutlineClock className="w-3.5 h-3.5" />
                <span>{timeAgo(problem.createdAt)}</span>
              </div>

              {/* Mobile stats */}
              <div className="flex items-center space-x-3 sm:hidden">
                <span className="flex items-center space-x-1">
                  <HiOutlineChevronUp className="w-3.5 h-3.5" />
                  <span>{problem.upvotes - problem.downvotes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HiOutlineChatAlt2 className="w-3.5 h-3.5" />
                  <span>{problem.solutions}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  <span>{formatNumber(problem.views)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

components/ArticleCard.js

React

'use client';

import Link from 'next/link';
import { formatNumber, timeAgo } from '@/lib/utils';
import { HiOutlineHeart, HiOutlineEye, HiOutlineClock } from 'react-icons/hi';

export default function ArticleCard({ article, featured = false }) {
  if (!article) return null;

  if (featured) {
    return (
      <Link href={`/articles/${article.id}`}>
        <div className="card-hover overflow-hidden group">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 
                       transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="badge-primary mb-2">{article.category}</span>
              <h3 className="text-lg font-bold text-white line-clamp-2">
                {article.title}
              </h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-lg"
                />
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-slate-400">{timeAgo(article.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <HiOutlineHeart className="w-4 h-4" />
                  <span>{formatNumber(article.likes)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>{article.readTime}m</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.id}`}>
      <div className="card-hover p-5 group">
        <div className="flex gap-4">
          {article.coverImage && (
            <div className="hidden sm:block flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-110 
                         transition-transform duration-500"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge-primary text-xs">{article.category}</span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <HiOutlineClock className="w-3 h-3" />
                <span>{article.readTime} min read</span>
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white 
                         group-hover:text-primary-600 dark:group-hover:text-primary-400 
                         transition-colors line-clamp-1 text-base">
              {article.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-5 h-5 rounded-md"
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {article.author.name}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-400">{timeAgo(article.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center space-x-1">
                  <HiOutlineHeart className="w-3.5 h-3.5" />
                  <span>{formatNumber(article.likes)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HiOutlineEye className="w-3.5 h-3.5" />
                  <span>{formatNumber(article.views)}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

components/StatsCard.js

React

'use client';

import { formatNumber } from '@/lib/utils';

export default function StatsCard({ icon: Icon, label, value, trend, color = 'primary' }) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 shadow-primary-500/30',
    purple: 'from-purple-500 to-purple-600 shadow-purple-500/30',
    emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/30',
    amber: 'from-amber-500 to-amber-600 shadow-amber-500/30',
    red: 'from-red-500 to-red-600 shadow-red-500/30',
    cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/30',
  };

  return (
    <div className="card p-6 group hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {trend && (
            <p className={`text-xs font-medium mt-2 ${
              trend > 0 ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClasses[color]} 
                       shadow-lg flex items-center justify-center 
                       group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

components/VoteButtons.js

React

'use client';

import { useState } from 'react';
import { HiChevronUp, HiChevronDown, HiBookmark, HiOutlineBookmark } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function VoteButtons({
  upvotes = 0,
  downvotes = 0,
  userVote = null,
  onVote,
  vertical = true,
  size = 'md',
}) {
  const [currentVote, setCurrentVote] = useState(userVote);
  const [votes, setVotes] = useState(upvotes - downvotes);
  const [bookmarked, setBookmarked] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleVote = (type) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to vote');
      return;
    }

    if (currentVote === type) {
      setCurrentVote(null);
      setVotes(type === 'up' ? votes - 1 : votes + 1);
    } else {
      const diff = currentVote ? 2 : 1;
      setCurrentVote(type);
      setVotes(type === 'up' ? votes + diff : votes - diff);
    }

    if (onVote) onVote(type);
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to bookmark');
      return;
    }
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Bookmark removed' : 'Bookmarked!');
  };

  const sizeClasses = {
    sm: { button: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
    md: { button: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { button: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl' },
  };

  const s = sizeClasses[size];

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-1`}>
      <button
        onClick={() => handleVote('up')}
        className={`${s.button} rounded-xl flex items-center justify-center 
                   transition-all duration-200 ${
          currentVote === 'up'
            ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 ring-2 ring-primary-200 dark:ring-primary-800'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500'
        }`}
      >
        <HiChevronUp className={s.icon} />
      </button>

      <span className={`${s.text} font-bold text-slate-900 dark:text-white 
                       ${vertical ? 'my-1' : 'mx-2'}`}>
        {votes}
      </span>

      <button
        onClick={() => handleVote('down')}
        className={`${s.button} rounded-xl flex items-center justify-center 
                   transition-all duration-200 ${
          currentVote === 'down'
            ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 ring-2 ring-red-200 dark:ring-red-800'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
        }`}
      >
        <HiChevronDown className={s.icon} />
      </button>

      {vertical && (
        <button
          onClick={handleBookmark}
          className={`${s.button} rounded-xl flex items-center justify-center 
                     transition-all duration-200 mt-2 ${
            bookmarked
              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-500'
          }`}
        >
          {bookmarked ? (
            <HiBookmark className={s.icon} />
          ) : (
            <HiOutlineBookmark className={s.icon} />
          )}
        </button>
      )}
    </div>
  );
}

components/CommentSection.js

React

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { timeAgo } from '@/lib/utils';
import toast from 'react-hot-toast';
import { HiOutlineReply, HiOutlineHeart, HiHeart } from 'react-icons/hi';

export default function CommentSection({ comments: initialComments = [], parentId, parentType }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to comment');
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      id: `c_${Date.now()}`,
      content: newComment.trim(),
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
    };

    setComments([...comments, comment]);
    setNewComment('');
    setReplyTo(null);
    toast.success('Comment posted!');
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-slate-900 dark:text-white">
        Comments ({comments.length})
      </h4>

      {/* Comment list */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={() => {
              setReplyTo(comment.id);
              setNewComment(`@${comment.author.name} `);
            }}
          />
        ))}
      </div>

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex gap-3 items-start">
        {isAuthenticated && (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-lg flex-shrink-0 mt-1"
          />
        )}
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAuthenticated ? "Add a comment..." : "Sign in to comment..."}
            className="input-field min-h-[60px] text-sm resize-none"
            disabled={!isAuthenticated}
            rows={2}
          />
          {newComment.trim() && (
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => { setNewComment(''); setReplyTo(null); }}
                className="btn-ghost text-sm mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary text-sm !px-4 !py-2">
                Post Comment
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

function CommentItem({ comment, onReply }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-7 h-7 rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {comment.author.name}
          </span>
          <span className="text-xs text-slate-400">
            {timeAgo(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {comment.content}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={toggleLike}
            className={`flex items-center space-x-1 text-xs transition-colors ${
              liked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
            }`}
          >
            {liked ? <HiHeart className="w-3.5 h-3.5" /> : <HiOutlineHeart className="w-3.5 h-3.5" />}
            <span>{likes > 0 ? likes : ''}</span>
          </button>
          <button
            onClick={onReply}
            className="flex items-center space-x-1 text-xs text-slate-400 
                     hover:text-primary-500 transition-colors"
          >
            <HiOutlineReply className="w-3.5 h-3.5" />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
}

components/Sidebar.js

React

'use client';

import Link from 'next/link';
import { categories } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import { HiOutlineFire, HiOutlineTag, HiOutlineUsers } from 'react-icons/hi';

export default function Sidebar() {
  const trendingTags = [
    { name: 'React', count: 1234 },
    { name: 'Next.js', count: 987 },
    { name: 'Python', count: 876 },
    { name: 'Machine Learning', count: 765 },
    { name: 'TypeScript', count: 654 },
    { name: 'Node.js', count: 543 },
    { name: 'CSS', count: 432 },
    { name: 'Docker', count: 321 },
  ];

  const topContributors = [
    { name: 'Alex Johnson', avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6366f1&color=fff', reputation: 15420 },
    { name: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff', reputation: 12800 },
    { name: 'David Kumar', avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ef4444&color=fff', reputation: 11200 },
  ];

  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="card p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <HiOutlineTag className="w-5 h-5 mr-2 text-primary-500" />
          Categories
        </h3>
        <div className="space-y-1.5">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/problems?category=${cat.name}`}
              className="flex items-center justify-between px-3 py-2 rounded-lg 
                       hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
            >
              <span className="flex items-center space-x-2">
                <span>{cat.icon}</span>
                <span className="text-sm text-slate-600 dark:text-slate-400 
                               group-hover:text-slate-900 dark:group-hover:text-white">
                  {cat.name}
                </span>
              </span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 
                             px-2 py-0.5 rounded-full">
                {formatNumber(cat.count)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Tags */}
      <div className="card p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <HiOutlineFire className="w-5 h-5 mr-2 text-orange-500" />
          Trending Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <Link
              key={tag.name}
              href={`/problems?tag=${tag.name}`}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 
                       dark:text-slate-400 text-xs font-medium rounded-lg 
                       hover:bg-primary-50 dark:hover:bg-primary-900/20 
                       hover:text-primary-600 dark:hover:text-primary-400 
                       transition-colors"
            >
              #{tag.name}
              <span className="ml-1 text-slate-400">×{formatNumber(tag.count)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Contributors */}
      <div className="card p-5">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <HiOutlineUsers className="w-5 h-5 mr-2 text-emerald-500" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map((user, i) => (
            <Link
              key={user.name}
              href={`/profile/${i + 1}`}
              className="flex items-center space-x-3 p-2 rounded-lg 
                       hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="text-sm font-bold text-slate-400 w-5">
                #{i + 1}
              </span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-lg"
              />
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user.name}
                </p>
                <p className="text-xs text-primary-500">
                  {formatNumber(user.reputation)} rep
                </p>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/leaderboard"
          className="block text-center text-sm text-primary-600 dark:text-primary-400 
                   font-medium mt-4 hover:underline"
        >
          View Leaderboard →
        </Link>
      </div>
    </aside>
  );
}

6. Pages
app/page.js (Home Page)

React

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProblemCard from '@/components/ProblemCard';
import ArticleCard from '@/components/ArticleCard';
import StatsCard from '@/components/StatsCard';
import { problems, articles, stats, categories, leaderboardUsers } from '@/lib/data';
import { formatNumber } from '@/lib/utils';
import {
  HiOutlineLightBulb, HiOutlineAcademicCap, HiOutlineUsers,
  HiOutlineTrendingUp, HiOutlineBookOpen, HiOutlineCode,
  HiOutlineSearch, HiOutlineArrowRight, HiOutlineCheckCircle,
  HiOutlineChatAlt2, HiOutlineSparkles, HiOutlineGlobeAlt,
  HiOutlineShieldCheck, HiOutlineStar,
} from 'react-icons/hi';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: HiOutlineLightBulb,
      title: 'Ask & Solve',
      description: 'Post your problems and get solutions from experts worldwide.',
      color: 'from-amber-500 to-orange-500',
      shadowColor: 'shadow-amber-500/25',
    },
    {
      icon: HiOutlineChatAlt2,
      title: 'Real-time Collaboration',
      description: 'Chat, discuss, and work together in real-time workspaces.',
      color: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-500/25',
    },
    {
      icon: HiOutlineBookOpen,
      title: 'Knowledge Base',
      description: 'Access thousands of articles, tutorials, and guides.',
      color: 'from-purple-500 to-pink-500',
      shadowColor: 'shadow-purple-500/25',
    },
    {
      icon: HiOutlineTrendingUp,
      title: 'Gamification',
      description: 'Earn reputation, badges, and climb the leaderboard.',
      color: 'from-emerald-500 to-teal-500',
      shadowColor: 'shadow-emerald-500/25',
    },
    {
      icon: HiOutlineSparkles,
      title: 'AI-Powered',
      description: 'Smart recommendations and expert matching powered by AI.',
      color: 'from-violet-500 to-purple-500',
      shadowColor: 'shadow-violet-500/25',
    },
    {
      icon: HiOutlineGlobeAlt,
      title: 'Global Community',
      description: 'Connect with problem solvers from around the world.',
      color: 'from-rose-500 to-red-500',
      shadowColor: 'shadow-rose-500/25',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 
                        via-primary-950 to-purple-950 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 
                        rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 
                        rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
                      py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 
                          bg-white/10 backdrop-blur-sm rounded-full border 
                          border-white/10 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">
                {formatNumber(stats.activeUsers)} problem solvers online now
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight 
                         mb-6 animate-slide-up">
              Solve Problems{' '}
              <span className="bg-gradient-to-r from-primary-400 via-purple-400 
                             to-pink-400 bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl 
                        mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Join a thriving community of problem solvers. Share knowledge, 
              collaborate in real-time, and find solutions to any challenge.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 animate-slide-up" 
                 style={{ animationDelay: '200ms' }}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 
                              to-purple-500 rounded-2xl blur opacity-30 
                              group-hover:opacity-50 transition duration-300" />
                <div className="relative flex items-center bg-white/10 backdrop-blur-xl 
                              rounded-2xl border border-white/10">
                  <HiOutlineSearch className="w-6 h-6 text-slate-400 ml-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search problems, articles, or topics..."
                    className="w-full bg-transparent px-4 py-4 text-white 
                             placeholder:text-slate-500 focus:outline-none text-lg"
                  />
                  <Link
                    href={searchQuery ? `/search?q=${searchQuery}` : '/problems'}
                    className="flex-shrink-0 mr-2 px-6 py-2.5 bg-gradient-to-r 
                             from-primary-500 to-purple-500 text-white font-semibold 
                             rounded-xl hover:from-primary-600 hover:to-purple-600 
                             transition-all duration-300"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center 
                          gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Link
                href="/problems/new"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 
                         to-purple-500 text-white font-semibold rounded-2xl 
                         hover:from-primary-600 hover:to-purple-600 transition-all 
                         duration-300 shadow-lg shadow-primary-500/30 
                         hover:shadow-xl hover:shadow-primary-500/40 
                         hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <HiOutlineLightBulb className="w-5 h-5" />
                <span>Ask a Question</span>
              </Link>
              <Link
                href="/problems"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm 
                         text-white font-semibold rounded-2xl border border-white/20 
                         hover:bg-white/20 transition-all duration-300 
                         hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>Browse Problems</span>
                <HiOutlineArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 
                          animate-slide-up" style={{ animationDelay: '400ms' }}>
              {[
                { label: 'Problems Posted', value: stats.totalProblems, icon: '💡' },
                { label: 'Solutions Given', value: stats.totalSolutions, icon: '✅' },
                { label: 'Active Users', value: stats.totalUsers, icon: '👥' },
                { label: 'Success Rate', value: `${stats.solvedRate}%`, icon: '🎯' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">
                    {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-auto fill-slate-50 dark:fill-slate-950">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,50 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-primary mb-4">✨ Features</span>
            <h2 className="section-title mb-4">
              Everything you need to{' '}
              <span className="gradient-text">solve problems</span>
            </h2>
            <p className="section-subtitle">
              A comprehensive platform designed to make collaborative problem-solving 
              efficient, rewarding, and enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card p-8 group hover:-translate-y-2 transition-all 
                         duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} 
                              shadow-lg ${feature.shadowColor} flex items-center 
                              justify-center mb-6 group-hover:scale-110 
                              transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Problems */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="badge-warning mb-2">🔥 Trending</span>
              <h2 className="section-title">Trending Problems</h2>
            </div>
            <Link
              href="/problems"
              className="btn-secondary text-sm hidden sm:flex items-center space-x-2"
            >
              <span>View All</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {problems.slice(0, 4).map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/problems" className="btn-primary">
              View All Problems
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-accent mb-4">📂 Categories</span>
            <h2 className="section-title mb-4">Explore by Category</h2>
            <p className="section-subtitle">
              Find problems and knowledge in your area of expertise
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/problems?category=${category.name}`}
                className="card p-6 text-center group hover:-translate-y-1 
                         transition-all duration-300"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 
                              transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {formatNumber(category.count)} problems
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="badge-primary mb-2">📚 Articles</span>
              <h2 className="section-title">Featured Articles</h2>
            </div>
            <Link
              href="/articles"
              className="btn-secondary text-sm hidden sm:flex items-center space-x-2"
            >
              <span>View All</span>
              <HiOutlineArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-20 bg-gradient-to-br from-primary-950 via-slate-900 
                        to-purple-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/10 
                        rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 
                        rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center space-x-2 px-4 py-2 
                           bg-white/10 rounded-full mb-4">
              <HiOutlineStar className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-300">Leaderboard</span>
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Top Problem Solvers
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our most active and helpful community members
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {leaderboardUsers.slice(0, 3).map((user, i) => (
              <Link
                key={user.id}
                href={`/profile/${user.id}`}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border 
                         border-white/10 p-6 text-center hover:bg-white/10 
                         transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative inline-block mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-2xl ring-4 ring-white/20"
                  />
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full 
                                flex items-center justify-center text-sm font-bold ${
                    i === 0 ? 'bg-amber-400 text-amber-900' :
                    i === 1 ? 'bg-slate-300 text-slate-700' :
                    'bg-amber-600 text-amber-100'
                  }`}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-white text-lg">{user.name}</h3>
                <p className="text-sm text-primary-400 mb-3">{user.level}</p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span className="text-slate-400">
                    <strong className="text-white">{formatNumber(user.reputation)}</strong> rep
                  </span>
                  <span className="text-slate-400">
                    <strong className="text-white">{user.solutions}</strong> solutions
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/leaderboard"
              className="inline-flex items-center space-x-2 px-8 py-3 
                       bg-white/10 backdrop-blur-sm text-white font-semibold 
                       rounded-xl border border-white/20 hover:bg-white/20 
                       transition-all duration-300"
            >
              <span>View Full Leaderboard</span>
              <HiOutlineArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to start{' '}
            <span className="gradient-text">solving problems?</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of problem solvers, share your knowledge, and make 
            a difference in the community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg !px-10 !py-4">
              Create Free Account
            </Link>
            <Link href="/problems" className="btn-secondary text-lg !px-10 !py-4">
              Browse Problems
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

app/login/page.js

React

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result.success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 
                            rounded-xl flex items-center justify-center shadow-lg 
                            shadow-primary-500/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SolveHub</span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Sign in to continue solving problems
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 
                             bg-slate-900 dark:bg-white text-white dark:text-slate-900 
                             rounded-xl font-medium hover:bg-slate-800 
                             dark:hover:bg-slate-100 transition-colors">
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 
                             bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
                             rounded-xl font-medium border border-slate-200 
                             dark:border-slate-700 hover:bg-slate-50 
                             dark:hover:bg-slate-700 transition-colors">
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-50 dark:bg-slate-950 text-slate-400">
                or continue with email
              </span>
            </div>
          </div>

          {/* Demo credentials notice */}
          <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl 
                        border border-primary-200 dark:border-primary-800">
            <p className="text-sm text-primary-700 dark:text-primary-300">
              <strong>Demo Credentials:</strong><br />
              Email: alex@example.com<br />
              Password: password123
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="label-text !mb-0">Password</label>
                <Link href="/forgot-password" 
                      className="text-sm text-primary-600 dark:text-primary-400 
                               hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 
                                              w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 
                           text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-primary-600 
                         focus:ring-primary-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 
                                                  dark:text-slate-400">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full !py-3.5 text-base disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white 
                                rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary-600 dark:text-primary-400 
                                            font-semibold hover:underline">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 
                    to-purple-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 
                        rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/5 
                        rounded-full blur-3xl" />
        </div>
        <div className="relative text-center text-white max-w-md">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-3xl font-bold mb-4">
            Collective Intelligence
          </h2>
          <p className="text-lg text-primary-100/80">
            Join a community of over {formatNumber(8923)} problem solvers 
            sharing knowledge and helping each other grow.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 text-left">
            {[
              'Ask questions freely',
              'Get expert answers',
              'Build your reputation',
              'Learn and grow',
            ].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center 
                              justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" 
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" 
                          strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-primary-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

app/register/page.js

React

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  HiOutlineMail, HiOutlineLockClosed, HiOutlineUser,
  HiOutlineEye, HiOutlineEyeOff,
} from 'react-icons/hi';
import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }
    if (!agreed) {
      return alert('Please agree to the terms');
    }
    setIsLoading(true);
    const result = await register(formData);
    setIsLoading(false);
    if (result.success) {
      router.push('/');
    }
  };

  const passwordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = passwordStrength(formData.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decoration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 
                    to-primary-700 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 
                        rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/5 
                        rounded-full blur-3xl" />
        </div>
        <div className="relative text-center text-white max-w-md">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold mb-4">
            Start Your Journey
          </h2>
          <p className="text-lg text-purple-100/80 mb-8">
            Create your free account and join the world&apos;s best 
            problem-solving community.
          </p>
          <div className="space-y-4 text-left">
            {[
              { icon: '💡', text: 'Ask unlimited questions' },
              { icon: '🏆', text: 'Earn reputation and badges' },
              { icon: '👥', text: 'Connect with experts' },
              { icon: '📚', text: 'Access the knowledge base' },
            ].map((item) => (
              <div key={item.text} className="flex items-center space-x-3 bg-white/10 
                                            backdrop-blur-sm rounded-xl p-4">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-purple-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 
                            rounded-xl flex items-center justify-center shadow-lg 
                            shadow-primary-500/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SolveHub</span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Create your account
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Join the community and start solving problems
            </p>
          </div>

          {/* Social Register */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 
                             bg-slate-900 dark:bg-white text-white dark:text-slate-900 
                             rounded-xl font-medium hover:bg-slate-800 
                             dark:hover:bg-slate-100 transition-colors">
              <FaGithub className="w-5 h-5" />
              <span>GitHub</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 
                             bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 
                             rounded-xl font-medium border border-slate-200 
                             dark:border-slate-700 hover:bg-slate-50 
                             dark:hover:bg-slate-700 transition-colors">
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Google</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-50 dark:bg-slate-950 text-slate-400">
                or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-text">Full Name</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-text">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 
                                              w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="input-field pl-12 pr-12"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          i <= strength ? strengthColors[strength] : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    strength <= 1 ? 'text-red-500' : 
                    strength <= 2 ? 'text-amber-500' : 
                    strength <= 3 ? 'text-blue-500' : 'text-emerald-500'
                  }`}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="label-text">Confirm Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 
                                              w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input-field pl-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-600 
                         focus:ring-primary-500"
              />
              <label htmlFor="agree" className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="btn-primary w-full !py-3.5 text-base disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white 
                                rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-600 dark:text-primary-400 
                                         font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

app/problems/page.js

React

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProblemCard from '@/components/ProblemCard';
import Sidebar from '@/components/Sidebar';
import { problems as allProblems, categories } from '@/lib/data';
import {
  HiOutlinePlus, HiOutlineSearch, HiOutlineFilter,
  HiOutlineSortDescending, HiOutlineViewGrid, HiOutlineViewList,
  HiOutlineFire, HiOutlineClock, HiOutlineCheckCircle,
  HiOutlineChevronDown,
} from 'react-icons/hi';

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  const filteredProblems = useMemo(() => {
    let filtered = [...allProblems];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p => p.title.toLowerCase().includes(query) ||
             p.description.toLowerCase().includes(query) ||
             p.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'votes':
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'answers':
        filtered.sort((a, b) => b.solutions - a.solutions);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  const statusTabs = [
    { key: 'all', label: 'All Problems', icon: HiOutlineViewGrid },
    { key: 'open', label: 'Open', icon: HiOutlineFire },
    { key: 'solved', label: 'Solved', icon: HiOutlineCheckCircle },
  ];

  const sortOptions = [
    { key: 'newest', label: 'Newest' },
    { key: 'votes', label: 'Most Voted' },
    { key: 'views', label: 'Most Viewed' },
    { key: 'answers', label: 'Most Answers' },
  ];

  return (
    <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center 
                        justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Problems
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                {filteredProblems.length} problems found
              </p>
            </div>
            <Link href="/problems/new" className="btn-primary">
              <HiOutlinePlus className="w-5 h-5 mr-2" />
              Ask a Question
            </Link>
          </div>

          {/* Search & Filters */}
          <div className="card p-4 mb-6">
            {/* Search */}
            <div className="relative mb-4">
              <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                                        w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems by title, description, or tags..."
                className="input-field pl-12"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {statusTabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedStatus(key)}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl 
                            text-sm font-medium transition-all ${
                    selectedStatus === key
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Sort & Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg 
                            text-sm font-medium transition-colors ${
                    showFilters
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <HiOutlineFilter className="w-4 h-4" />
                  <span>Filters</span>
                  <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <HiOutlineSortDescending className="w-4 h-4 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 
                           dark:text-slate-300 focus:outline-none cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 
                            animate-slide-down">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text text-xs">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="select-field text-sm"
                    >
                      <option value="All">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-text text-xs">Tags</label>
                    <input
                      type="text"
                      placeholder="Filter by tag..."
                      className="input-field text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Problems List */}
          <div className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
            ) : (
              <div className="card p-12 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  No problems found
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Link href="/problems/new" className="btn-primary">
                  Post the first problem
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProblems.length > 0 && (
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                                 text-slate-500 text-sm font-medium hover:bg-slate-200 
                                 dark:hover:bg-slate-700 transition-colors">
                  Previous
                </button>
                {[1, 2, 3, '...', 10].map((page, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-xl text-sm font-medium 
                              transition-colors ${
                      page === 1
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                                 text-slate-500 text-sm font-medium hover:bg-slate-200 
                                 dark:hover:bg-slate-700 transition-colors">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

app/problems/[id]/page.js

React

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import VoteButtons from '@/components/VoteButtons';
import CommentSection from '@/components/CommentSection';
import Sidebar from '@/components/Sidebar';
import { problems, solutions as allSolutions } from '@/lib/data';
import { timeAgo, formatNumber, getStatusColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';
import {
  HiOutlineShare, HiOutlineFlag, HiOutlineCheckCircle,
  HiOutlineEye, HiOutlineChatAlt2, HiOutlineClock,
  HiOutlineUser, HiOutlineCode, HiOutlinePencil,
} from 'react-icons/hi';

export default function ProblemDetailPage() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === id) || problems[0];
  const problemSolutions = allSolutions.filter(s => s.problemId === problem.id);
  
  const [newSolution, setNewSolution] = useState('');
  const [solutions, setSolutions] = useState(problemSolutions);
  const [sortSolutions, setSortSolutions] = useState('votes');
  const { user, isAuthenticated } = useAuth();

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to submit a solution');
      return;
    }
    if (!newSolution.trim()) return;

    const solution = {
      id: `s_${Date.now()}`,
      problemId: problem.id,
      content: newSolution,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        reputation: user.reputation,
      },
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    setSolutions([...solutions, solution]);
    setNewSolution('');
    toast.success('Solution posted successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="page-container">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {/* Problem Section */}
          <div className="card p-6 sm:p-8 mb-6">
            <div className="flex gap-4 sm:gap-6">
              {/* Vote Buttons */}
              <div className="hidden sm:block">
                <VoteButtons
                  upvotes={problem.upvotes}
                  downvotes={problem.downvotes}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Status & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={getStatusColor(problem.status)}>
                    {problem.status === 'solved' && <HiOutlineCheckCircle className="w-3.5 h-3.5 mr-1 inline" />}
                    {problem.status}
                  </span>
                  <span className="badge-primary">{problem.category}</span>
                  {problem.priority === 'high' && (
                    <span className="badge-danger">🔥 High Priority</span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 
                             dark:text-white mb-4 leading-tight">
                  {problem.title}
                </h1>

                {/* Author & Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm 
                              text-slate-500 dark:text-slate-400">
                  <Link
                    href={`/profile/${problem.author.id}`}
                    className="flex items-center space-x-2 hover:text-primary-500 
                             transition-colors"
                  >
                    <img
                      src={problem.author.avatar}
                      alt={problem.author.name}
                      className="w-6 h-6 rounded-md"
                    />
                    <span className="font-medium">{problem.author.name}</span>
                    <span className="text-primary-500 text-xs font-semibold">
                      {formatNumber(problem.author.reputation)}
                    </span>
                  </Link>
                  <span className="flex items-center space-x-1">
                    <HiOutlineClock className="w-4 h-4" />
                    <span>Asked {timeAgo(problem.createdAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <HiOutlineEye className="w-4 h-4" />
                    <span>{formatNumber(problem.views)} views</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <HiOutlineChatAlt2 className="w-4 h-4" />
                    <span>{solutions.length} answers</span>
                  </span>
                </div>

                {/* Description */}
                <div className="prose-content mb-6">
                  {problem.description.split('\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={i} className="font-bold text-slate-900 dark:text-white mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                      return (
                        <li key={i} className="text-slate-600 dark:text-slate-400 ml-4">
                          {paragraph.replace(/^[-\d.]\s*/, '')}
                        </li>
                      );
                    }
                    if (paragraph.trim()) {
                      return (
                        <p key={i} className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {problem.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/problems?tag=${tag}`}
                      className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 
                               text-primary-600 dark:text-primary-400 text-sm 
                               font-medium rounded-lg hover:bg-primary-100 
                               dark:hover:bg-primary-900/40 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>

                {/* Mobile vote buttons */}
                <div className="sm:hidden mb-4">
                  <VoteButtons
                    upvotes={problem.upvotes}
                    downvotes={problem.downvotes}
                    vertical={false}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t 
                              border-slate-200 dark:border-slate-700">
                  <button
                    onClick={handleShare}
                    className="btn-ghost text-sm"
                  >
                    <HiOutlineShare className="w-4 h-4 mr-1.5" />
                    Share
                  </button>
                  <button className="btn-ghost text-sm">
                    <HiOutlinePencil className="w-4 h-4 mr-1.5" />
                    Edit
                  </button>
                  <button className="btn-ghost text-sm text-slate-400">
                    <HiOutlineFlag className="w-4 h-4 mr-1.5" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {solutions.length} {solutions.length === 1 ? 'Answer' : 'Answers'}
              </h2>
              <select
                value={sortSolutions}
                onChange={(e) => setSortSolutions(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-600 
                         dark:text-slate-400 focus:outline-none cursor-pointer"
              >
                <option value="votes">Highest Score</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <div className="space-y-4">
              {solutions.map((solution) => (
                <div
                  key={solution.id}
                  className={`card p-6 ${
                    solution.isAccepted
                      ? 'ring-2 ring-emerald-500 dark:ring-emerald-400'
                      : ''
                  }`}
                >
                  <div className="flex gap-4 sm:gap-6">
                    <div className="hidden sm:block">
                      <VoteButtons
                        upvotes={solution.upvotes}
                        downvotes={solution.downvotes}
                      />
                      {solution.isAccepted && (
                        <div className="mt-3 flex flex-col items-center">
                          <HiOutlineCheckCircle className="w-10 h-10 text-emerald-500" />
                          <span className="text-xs text-emerald-500 font-medium mt-1">
                            Accepted
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {solution.isAccepted && (
                        <div className="flex items-center space-x-2 mb-3">
                          <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-sm font-semibold text-emerald-600 
                                         dark:text-emerald-400">
                            Accepted Answer
                          </span>
                        </div>
                      )}

                      <div className="prose-content mb-4">
                        {solution.content.split('\n').map((line, i) => {
                          if (line.startsWith('## ')) {
                            return (
                              <h3 key={i} className="text-lg font-bold text-slate-900 
                                                   dark:text-white mt-4 mb-2">
                                {line.replace('## ', '')}
                              </h3>
                            );
                          }
                          if (line.startsWith('### ')) {
                            return (
                              <h4 key={i} className="text-base font-bold text-slate-900 
                                                   dark:text-white mt-3 mb-1">
                                {line.replace('### ', '')}
                              </h4>
                            );
                          }
                          if (line.startsWith('```')) {
                            return null; // Simplified - in production use a markdown renderer
                          }
                          if (line.trim()) {
                            return (
                              <p key={i} className="text-slate-600 dark:text-slate-400 
                                                  mb-2 leading-relaxed text-sm">
                                {line}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Solution Author */}
                      <div className="flex items-center justify-between pt-4 border-t 
                                    border-slate-100 dark:border-slate-800">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={handleShare}
                            className="btn-ghost text-xs"
                          >
                            <HiOutlineShare className="w-3.5 h-3.5 mr-1" />
                            Share
                          </button>
                          <button className="btn-ghost text-xs text-slate-400">
                            <HiOutlineFlag className="w-3.5 h-3.5 mr-1" />
                            Report
                          </button>
                        </div>
                        <div className="flex items-center space-x-2 bg-primary-50 
                                      dark:bg-primary-900/20 px-3 py-2 rounded-lg">
                          <img
                            src={solution.author.avatar}
                            alt={solution.author.name}
                            className="w-7 h-7 rounded-md"
                          />
                          <div>
                            <p className="text-xs font-medium text-slate-700 
                                        dark:text-slate-300">
                              {solution.author.name}
                            </p>
                            <p className="text-xs text-slate-400">
                              answered {timeAgo(solution.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Comments */}
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <CommentSection
                          comments={solution.comments}
                          parentId={solution.id}
                          parentType="solution"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Solution */}
          <div className="card p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Your Answer
            </h3>
            
            {isAuthenticated ? (
              <form onSubmit={handleSubmitSolution}>
                <div className="mb-4">
                  <textarea
                    value={newSolution}
                    onChange={(e) => setNewSolution(e.target.value)}
                    placeholder="Write your solution here... (Markdown supported)"
                    className="textarea-field min-h-[200px] font-mono text-sm"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    💡 Tip: Use markdown for formatting. Be specific and include code examples.
                  </p>
                  <button type="submit" className="btn-primary">
                    Post Your Answer
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  Sign in to post your answer
                </p>
                <Link href="/login" className="btn-primary">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

app/problems/new/page.js

React

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/lib/data';
import toast from 'react-hot-toast';
import {
  HiOutlineLightBulb, HiOutlineTag, HiOutlineX,
  HiOutlinePhotograph, HiOutlineCode, HiOutlineInformationCircle,
} from 'react-icons/hi';

export default function NewProblemPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [],
    priority: 'medium',
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to post a question');
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Question posted successfully!');
    router.push('/problems');
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Sign in Required
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            You need to be signed in to post a question
          </p>
          <Link href="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  const tips = [
    'Summarize your problem in the title',
    'Describe what you\'ve tried',
    'Include relevant code or examples',
    'Add appropriate tags for visibility',
    'Be specific about the expected outcome',
  ];

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Ask a Question
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Get help from the community by asking a clear, specific question.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="card p-6">
                <label className="label-text text-base">
                  Title
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-400 mb-3">
                  Be specific and imagine you&apos;re asking a question to another person.
                </p>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., How to implement authentication in Next.js 14?"
                  className="input-field"
                  maxLength={200}
                  required
                />
                <p className="text-xs text-slate-400 mt-2 text-right">
                  {formData.title.length}/200
                </p>
              </div>

              {/* Description */}
              <div className="card p-6">
                <label className="label-text text-base">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-400 mb-3">
                  Include all the information someone would need to answer your question.
                </p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your problem in detail. Include what you've tried, error messages, code snippets, etc."
                  className="textarea-field min-h-[250px] font-mono text-sm"
                  required
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <button type="button" className="p-2 rounded-lg hover:bg-slate-100 
                                                   dark:hover:bg-slate-800 text-slate-400 
                                                   transition-colors" title="Add Code">
                      <HiOutlineCode className="w-5 h-5" />
                    </button>
                    <button type="button" className="p-2 rounded-lg hover:bg-slate-100 
                                                   dark:hover:bg-slate-800 text-slate-400 
                                                   transition-colors" title="Add Image">
                      <HiOutlinePhotograph className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">Markdown supported</p>
                </div>
              </div>

              {/* Category & Priority */}
              <div className="card p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">
                      Category
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="select-field"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.icon} {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="select-field"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="card p-6">
                <label className="label-text">
                  Tags
                  <span className="text-slate-400 text-xs font-normal ml-2">
                    (up to 5)
                  </span>
                </label>
                <p className="text-sm text-slate-400 mb-3">
                  Add tags to help categorize your question and reach the right people.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 
                               bg-primary-100 dark:bg-primary-900/30 text-primary-600 
                               dark:text-primary-400 text-sm font-medium rounded-lg"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <HiOutlineX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                {formData.tags.length < 5 && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                      placeholder="Type a tag and press Enter"
                      className="input-field flex-1"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="btn-secondary !px-4"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between">
                <Link href="/problems" className="btn-ghost">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white 
                                    rounded-full animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <>
                      <HiOutlineLightBulb className="w-5 h-5 mr-2" />
                      Post Question
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Tips Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="card p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-4">
                <HiOutlineInformationCircle className="w-5 h-5 text-primary-500" />
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Tips for a Great Question
                </h3>
              </div>
              <ul className="space-y-3">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-primary-100 dark:bg-primary-900/30 
                                   text-primary-600 dark:text-primary-400 rounded-full 
                                   flex items-center justify-center text-xs font-bold 
                                   flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

app/articles/page.js

React

'use client';

import { useState } from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/lib/data';
import {
  HiOutlinePencilAlt, HiOutlineSearch, HiOutlineFire,
  HiOutlineClock, HiOutlineTrendingUp,
} from 'react-icons/hi';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: 'all', label: 'All Articles', icon: HiOutlineFire },
    { key: 'trending', label: 'Trending', icon: HiOutlineTrendingUp },
    { key: 'latest', label: 'Latest', icon: HiOutlineClock },
  ];

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center 
                      justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Articles & Tutorials
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Learn from community-written guides and tutorials
            </p>
          </div>
          <Link href="/articles/new" className="btn-primary">
            <HiOutlinePencilAlt className="w-5 h-5 mr-2" />
            Write Article
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 
                                    w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="input-field pl-12"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto no-scrollbar">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedTab(key)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl 
                        text-sm font-medium whitespace-nowrap transition-all ${
                selectedTab === key
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {filteredArticles.slice(0, 2).map((article) => (
            <ArticleCard key={article.id} article={article} featured />
          ))}
        </div>

        {/* All Articles */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          All Articles
        </h2>
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Be the first to write about this topic!
            </p>
            <Link href="/articles/new" className="btn-primary">
              Write an Article
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

app/articles/[id]/page.js

React

'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/lib/data';
import { timeAgo, formatNumber } from '@/lib/utils';
import CommentSection from '@/components/CommentSection';
import {
  HiOutlineHeart, HiHeart, HiOutlineBookmark, HiOutlineShare,
  HiOutlineEye, HiOutlineClock, HiOutlineArrowLeft,
} from 'react-icons/hi';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id) || articles[0];
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(article.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied!');
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          href="/articles"
          className="inline-flex items-center space-x-2 text-sm text-slate-500 
                   hover:text-primary-500 transition-colors mb-6"
        >
          <HiOutlineArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Cover Image */}
        {article.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-primary">{article.category}</span>
            <span className="text-sm text-slate-400 flex items-center space-x-1">
              <HiOutlineClock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white 
                       mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/profile/${article.author.id}`}
              className="flex items-center space-x-3"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {article.author.name}
                </p>
                <p className="text-sm text-slate-400">
                  Published {timeAgo(article.createdAt)}
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleLike}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl 
                          transition-all ${
                  liked
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500'
                }`}
              >
                {liked ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
                <span className="text-sm font-medium">{formatNumber(likes)}</span>
              </button>
              <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                               text-slate-500 hover:text-amber-500 transition-colors">
                <HiOutlineBookmark className="w-5 h-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                         text-slate-500 hover:text-primary-500 transition-colors"
              >
                <HiOutlineShare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="card p-8 sm:p-12 mb-8">
          <div className="prose-content">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {article.content}
            </p>
            {/* More content would go here in production */}
            <div className="my-8 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl 
                          border border-primary-200 dark:border-primary-800">
              <p className="text-primary-700 dark:text-primary-300 italic">
                💡 This is a demo article. In a production application, the full 
                article content with rich formatting, code blocks, images, and 
                interactive elements would be displayed here using a markdown renderer.
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-slate-200 
                        dark:border-slate-700">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 
                         text-primary-600 dark:text-primary-400 text-sm 
                         font-medium rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-slate-400">
          <span className="flex items-center space-x-1">
            <HiOutlineEye className="w-4 h-4" />
            <span>{formatNumber(article.views)} views</span>
          </span>
          <span className="flex items-center space-x-1">
            <HiOutlineHeart className="w-4 h-4" />
            <span>{formatNumber(likes)} likes</span>
          </span>
        </div>

        {/* Comments */}
        <div className="card p-6 sm:p-8">
          <CommentSection
            comments={[]}
            parentId={article.id}
            parentType="article"
          />
        </div>
      </div>
    </div>
  );
}

app/articles/new/page.js

React

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/lib/data';
import toast from 'react-hot-toast';
import { HiOutlinePhotograph, HiOutlineX } from 'react-icons/hi';

export default function NewArticlePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    coverImage: '',
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 5) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Article published successfully!');
    router.push('/articles');
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container text-center py-20">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Sign in to Write
        </h1>
        <Link href="/login" className="btn-primary">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Write an Article
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Share your knowledge with the community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image */}
          <div className="card p-6">
            <label className="label-text">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="input-field"
            />
            {formData.coverImage && (
              <div className="mt-3 rounded-xl overflow-hidden aspect-video">
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.style.display = 'none'}
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="card p-6">
            <label className="label-text">Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="An engaging title for your article"
              className="input-field text-xl font-semibold"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="card p-6">
            <label className="label-text">Excerpt <span className="text-red-500">*</span></label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A brief summary of your article (shown in previews)"
              className="textarea-field min-h-[80px]"
              maxLength={300}
              required
            />
            <p className="text-xs text-slate-400 mt-1 text-right">
              {formData.excerpt.length}/300
            </p>
          </div>

          {/* Content */}
          <div className="card p-6">
            <label className="label-text">Content <span className="text-red-500">*</span></label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here... (Markdown supported)"
              className="textarea-field min-h-[400px] font-mono text-sm"
              required
            />
          </div>

          {/* Category & Tags */}
          <div className="card p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label-text">Category <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select-field"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="label-text">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 
                           badge-primary rounded-lg"
                >
                  <span>{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)}>
                    <HiOutlineX className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
            {formData.tags.length < 5 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                  placeholder="Add a tag"
                  className="input-field flex-1"
                />
                <button type="button" onClick={addTag} className="btn-secondary !px-4">
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Link href="/articles" className="btn-ghost">Cancel</Link>
            <div className="flex space-x-3">
              <button type="button" className="btn-secondary">
                Save Draft
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

app/leaderboard/page.js

React

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { leaderboardUsers } from '@/lib/data';
import { formatNumber, getLevelColor } from '@/lib/utils';
import {
  HiOutlineTrendingUp, HiOutlineFire, HiOutlineStar,
  HiOutlineLightningBolt, HiOutlineAcademicCap,
} from 'react-icons/hi';

export default function LeaderboardPage() {
  const [timeRange, setTimeRange] = useState('all');
  const [category, setCategory] = useState('reputation');

  const getRankBadge = (rank) => {
    if (rank === 1) return { emoji: '🥇', bg: 'bg-amber-100 dark:bg-amber-900/30 ring-amber-300' };
    if (rank === 2) return { emoji: '🥈', bg: 'bg-slate-100 dark:bg-slate-800 ring-slate-300' };
    if (rank === 3) return { emoji: '🥉', bg: 'bg-amber-50 dark:bg-amber-900/20 ring-amber-200' };
    return { emoji: '', bg: '' };
  };

  return (
    <div className="page-container">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 badge-warning mb-4">
            <HiOutlineTrendingUp className="w-4 h-4" />
            <span>Leaderboard</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Top Contributors
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Recognizing our most active and helpful community members
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 sm