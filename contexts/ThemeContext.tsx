'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ThemeConfig, defaultTheme, Theme, ColorScheme, FontFamily } from '@/lib/theme';

interface ThemeContextType extends ThemeConfig {
    setTheme: (theme: Theme) => void;
    setColorScheme: (colorScheme: ColorScheme) => void;
    setFontFamily: (fontFamily: FontFamily) => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<ThemeConfig>(defaultTheme);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Load theme from localStorage
        const saved = localStorage.getItem('theme-config');
        if (saved) {
            setConfig(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        // Save theme to localStorage
        localStorage.setItem('theme-config', JSON.stringify(config));

        // Apply theme to document
        const root = document.documentElement;

        // Handle dark/light mode
        if (config.theme === 'dark' || (config.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            root.classList.add('dark');
            setIsDark(true);
        } else {
            root.classList.remove('dark');
            setIsDark(false);
        }

        // Apply font family
        root.className = root.className.replace(/font-\w+/g, '');
        root.classList.add(`font-${config.fontFamily}`);
    }, [config]);

    const setTheme = (theme: Theme) => {
        setConfig(prev => ({ ...prev, theme }));
    };

    const setColorScheme = (colorScheme: ColorScheme) => {
        setConfig(prev => ({ ...prev, colorScheme }));
    };

    const setFontFamily = (fontFamily: FontFamily) => {
        setConfig(prev => ({ ...prev, fontFamily }));
    };

    return (
        <ThemeContext.Provider value={{
            ...config,
            setTheme,
            setColorScheme,
            setFontFamily,
            isDark
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}