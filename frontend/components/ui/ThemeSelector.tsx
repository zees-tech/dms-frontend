'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Theme, ColorScheme, FontFamily } from '@/lib/theme';

export default function ThemeSelector() {
    const {
        theme,
        colorScheme,
        fontFamily,
        setTheme,
        setColorScheme,
        setFontFamily,
        isDark
    } = useTheme();

    const themes: { value: Theme; label: string }[] = [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' }
    ];

    const colorSchemes: { value: ColorScheme; label: string; color: string }[] = [
        { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
        { value: 'green', label: 'Green', color: 'bg-green-500' },
        { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
        { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
        { value: 'red', label: 'Red', color: 'bg-red-500' }
    ];

    const fontFamilies: { value: FontFamily; label: string }[] = [
        { value: 'inter', label: 'Inter' },
        { value: 'roboto', label: 'Roboto' },
        { value: 'poppins', label: 'Poppins' },
        { value: 'opensans', label: 'Open Sans' }
    ];

    return (
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                }`}>
                Theme Settings
            </h3>

            {/* Theme Mode */}
            <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Theme Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {themes.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => setTheme(t.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === t.value
                                    ? 'bg-blue-600 text-white'
                                    : isDark
                                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Scheme */}
            <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Color Scheme
                </label>
                <div className="grid grid-cols-5 gap-2">
                    {colorSchemes.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setColorScheme(c.value)}
                            className={`p-3 rounded-lg border-2 transition-all ${colorScheme === c.value
                                    ? 'border-gray-900 dark:border-white'
                                    : 'border-transparent'
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full ${c.color} mx-auto`}></div>
                            <span className={`text-xs mt-1 block ${isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                {c.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Font Family */}
            <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    Font Family
                </label>
                <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value as FontFamily)}
                    className={`w-full px-3 py-2 rounded-lg border ${isDark
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                    {fontFamilies.map((f) => (
                        <option key={f.value} value={f.value}>
                            {f.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}