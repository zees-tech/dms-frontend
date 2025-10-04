// Authentication utilities
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'user' | 'systemAdmin';
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// Auth service that connects to your API
export const authService = {
    async login(email: string, password: string): Promise<User> {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, action: 'login' }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();

        // Store token in localStorage (in production, use httpOnly cookies)
        localStorage.setItem('auth-token', data.token);

        return data.user;
    },

    async logout(): Promise<void> {
        localStorage.removeItem('auth-token');
    },

    async getCurrentUser(): Promise<User | null> {
        const token = localStorage.getItem('auth-token');

        if (!token) {
            return null;
        }

        try {
            const response = await fetch('/api/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                localStorage.removeItem('auth-token');
                return null;
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            localStorage.removeItem('auth-token');
            return null;
        }
    },

    async register(email: string, password: string): Promise<User> {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, action: 'register' }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Registration failed');
        }

        const data = await response.json();

        // Store token in localStorage
        localStorage.setItem('auth-token', data.token);

        return data.user;
    }
};