'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
    HiOutlineMail, HiOutlineLockClosed,
    HiOutlineUser, HiOutlineArrowRight
} from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setLoading(true);
        const result = await register(formData);
        if (result.success) {
            router.push('/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md">
                <div className="card p-8 sm:p-10">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-6 group">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 
                            rounded-2xl flex items-center justify-center shadow-lg 
                            group-hover:scale-110 transition-transform duration-300">
                                <span className="text-white font-bold text-xl uppercase">S</span>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                            Create Account
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">
                            Join the SolveHub expert community
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="label-text">Full Name</label>
                            <div className="relative">
                                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field pl-12"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="label-text">Email Address</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field pl-12"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="label-text">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="label-text">Confirm Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input-field pl-12"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary !py-4 text-lg"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <span className="flex items-center justify-center">
                                        Create Account <HiOutlineArrowRight className="ml-2 w-5 h-5" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 font-bold tracking-widest">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center px-4 py-3 border-2 
                             border-slate-100 dark:border-slate-800 rounded-xl 
                             hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm">
                            <FaGoogle className="w-4 h-4 mr-2 text-red-500" />
                            Google
                        </button>
                        <button className="flex items-center justify-center px-4 py-3 border-2 
                             border-slate-100 dark:border-slate-800 rounded-xl 
                             hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm">
                            <FaGithub className="w-4 h-4 mr-2 text-slate-900 dark:text-white" />
                            GitHub
                        </button>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="font-bold text-primary-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
