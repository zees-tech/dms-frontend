'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';

export default function NotificationBell() {
    const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
    const { isDark } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const colors = colorSchemes.blue; // Using blue color scheme for notifications

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success': return CheckCircle;
            case 'error': return XCircle;
            case 'warning': return AlertTriangle;
            case 'info': return Info;
            default: return Info;
        }
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'success': return 'text-green-500';
            case 'error': return 'text-red-500';
            case 'warning': return 'text-yellow-500';
            case 'info': return 'text-blue-500';
            default: return 'text-gray-500';
        }
    };

    const formatTime = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                    isDark 
                        ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className={`absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full ${colors.primary} text-white`}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border ${
                    isDark 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                } z-50`}>
                    {/* Header */}
                    <div className={`flex items-center justify-between p-4 border-b ${
                        isDark ? 'border-gray-700' : 'border-gray-200'
                    }`}>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Notifications
                        </h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className={`text-sm ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center">
                                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                                    No notifications
                                </p>
                            </div>
                        ) : (
                            notifications.map((notification) => {
                                const IconComponent = getIcon(notification.type);
                                return (
                                    <div
                                        key={notification.id}
                                        className={`p-4 border-b ${
                                            isDark 
                                                ? 'border-gray-700 hover:bg-gray-700' 
                                                : 'border-gray-100 hover:bg-gray-50'
                                        } transition-colors ${!notification.read ? (isDark ? 'bg-gray-700/50' : 'bg-blue-50') : ''}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${getTypeColor(notification.type)}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'} mb-1`}>
                                                    {notification.message}
                                                </p>
                                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    {formatTime(notification.timestamp)}
                                                </p>
                                                {notification.action && (
                                                    <button
                                                        onClick={notification.action.onClick}
                                                        className={`mt-2 text-xs font-medium ${
                                                            isDark 
                                                                ? 'text-blue-400 hover:text-blue-300' 
                                                                : 'text-blue-600 hover:text-blue-800'
                                                        }`}
                                                    >
                                                        {notification.action.label}
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className={`p-1 rounded ${
                                                            isDark 
                                                                ? 'hover:bg-gray-600 text-gray-400' 
                                                                : 'hover:bg-gray-200 text-gray-500'
                                                        }`}
                                                        title="Mark as read"
                                                    >
                                                        <CheckCircle className="w-3 h-3" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => removeNotification(notification.id)}
                                                    className={`p-1 rounded ${
                                                        isDark 
                                                            ? 'hover:bg-gray-600 text-gray-400' 
                                                            : 'hover:bg-gray-200 text-gray-500'
                                                    }`}
                                                    title="Remove notification"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
