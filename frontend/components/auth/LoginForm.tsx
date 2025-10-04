'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const { colorScheme, isDark } = useTheme();
    const colors = colorSchemes[colorScheme];
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(email, password);
            // Redirect to dashboard after successful login
            router.push('/dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'
            }`}>
            <div className={`max-w-md w-full space-y-8 p-8 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div>
                    <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md placeholder-gray-500 ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${colors.primary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-center">
                        <a href="/register" className={`text-sm ${colors.accent} hover:underline`}>
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>

                {/* Demo Credentials */}
                <div className={`mt-6 p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                        Demo Credentials:
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            <span>Admin:</span>
                            <span className="font-mono">admin@example.com / password123</span>
                        </div>
                        <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                            <span>User:</span>
                            <span className="font-mono">user@example.com / password123</span>
                        </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                        <button
                            type="button"
                            onClick={() => {
                                setEmail('admin@example.com');
                                setPassword('password123');
                            }}
                            className={`px-3 py-1 text-xs rounded ${isDark
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                        >
                            Use Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setEmail('user@example.com');
                                setPassword('password123');
                            }}
                            className={`px-3 py-1 text-xs rounded ${isDark
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                }`}
                        >
                            Use User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}