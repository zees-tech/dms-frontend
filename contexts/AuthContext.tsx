'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthState, authService } from '@/lib/auth';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        isLoading: true,
        isAuthenticated: false
    });

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const user = await authService.getCurrentUser();
            setAuthState({
                user,
                isLoading: false,
                isAuthenticated: !!user
            });
        } catch (error) {
            setAuthState({
                user: null,
                isLoading: false,
                isAuthenticated: false
            });
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const user = await authService.login(email, password);
            setAuthState({
                user,
                isLoading: false,
                isAuthenticated: true
            });
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setAuthState({
                user: null,
                isLoading: false,
                isAuthenticated: false
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}