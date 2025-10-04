'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const { isDark } = useTheme();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'
                }`}>
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}