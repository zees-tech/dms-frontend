'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';
import NotificationBell from '@/components/ui/NotificationBell';
import { useNotifications } from '@/contexts/NotificationContext';
import { GetNotifications } from '@/apiComponent/graphql/notification';

export default function Header() {
    const { user, logout } = useAuth();
    const { colorScheme, isDark } = useTheme();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const colors = colorSchemes[colorScheme];

    const { addNotification } = useNotifications();

    const fetchNotifications = useCallback(async () => {
        const { data, error } = await GetNotifications(0, 10, null);
        if (error) {
            console.error('Error fetching notifications:', error);
        }
        if (data && data.myNotifications) {
            data.myNotifications.items?.map((notif) => {
                addNotification({
                    message: notif.message,
                    type: notif.type as 'info' | 'success' | 'warning' | 'error',
                });
            });
        }
    },[]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return (
        <header className={`sticky top-0 z-50 border-b ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <h1 className={`text-xl font-bold ${colors.accent}`}>
                        Document Genius
                    </h1>
                </div>
                {/* User Menu */}
                <div className="flex items-center space-x-2">
                    {/* Notification Bell */}
                    <NotificationBell />
                    
                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full ${colors.primary} flex items-center justify-center text-white text-sm font-medium`}>
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <span className={isDark ? 'text-white' : 'text-gray-900'}>
                                {user?.name || 'User'}
                            </span>
                        </button>

                        {isProfileOpen && (
                            <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                                } border`}>
                                <div className="py-1">
                                    <button
                                        onClick={logout}
                                        className={`block w-full text-left px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
