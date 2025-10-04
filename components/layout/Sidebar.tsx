'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { colorSchemes } from '@/lib/theme';

interface MenuItem {
    name: string;
    href: string;
    icon: string;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Analytics', href: '/analytics', icon: '📈' },
    { name: 'Users', href: '/users', icon: '👥' },
    { name: 'Products', href: '/products', icon: '📦' },
    { name: 'Orders', href: '/orders', icon: '🛒' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const { colorScheme, isDark } = useTheme();

    const colors = colorSchemes[colorScheme];

    return (
        <aside className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
            } border-r flex flex-col`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`w-full flex items-center justify-between ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'
                        } p-2 rounded-lg`}
                >
                    {!isCollapsed && <span className="font-semibold">Menu</span>}
                    <span className="text-lg">☰</span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                            ? `${colors.primary} text-white`
                                            : isDark
                                                ? 'text-gray-300 hover:bg-gray-800'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {!isCollapsed && (
                                        <span className="font-medium">{item.name}</span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className={`flex items-center space-x-3 ${isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                    <span className="text-lg">💡</span>
                    {!isCollapsed && (
                        <div>
                            <p className="text-sm font-medium">Need help?</p>
                            <p className="text-xs">Contact support</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}