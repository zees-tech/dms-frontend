import { login } from "@/apiComponent/rest/login";
import { register as registerAPI } from "@/apiComponent/rest/register";
import { User, LoginResponse, UserRole } from "@/types/auth";

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// Auth service that connects to your API
export const authService = {
    async login(email: string, password: string): Promise<User> {
        const response = await login(email, password);

        if (!response) {
            throw new Error('Login failed');
        }

        // Store the complete API response in localStorage
        localStorage.setItem('auth-response', JSON.stringify(response));

        // Store token separately for easy access (in production, use httpOnly cookies)
        localStorage.setItem('auth-token', response.token);

        return response.user;
    },

    async logout(): Promise<void> {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-response');
    },

    async getCurrentUser(): Promise<User | null> {
        // Get user from stored login response instead of calling API
        const storedResponse = this.getStoredLoginResponse();
        
        if (!storedResponse || !storedResponse.user) {
            // Clean up if data is invalid
            localStorage.removeItem('auth-token');
            localStorage.removeItem('auth-response');
            return null;
        }

        // Return the user from stored response
        return storedResponse.user;
    },

    async register(email: string, password: string, name: string, departmentName: string, roleName: string): Promise<void> {
        const role = roleName.toLowerCase() as UserRole; // Convert to lowercase to match UserRole type
        const department = departmentName || null;

        await registerAPI(name, email, password, role, department);

        // Don't store auth data - user needs to login manually after registration
    },

    // Get the complete stored API response
    getStoredLoginResponse(): LoginResponse | null {
        const storedResponse = localStorage.getItem('auth-response');
        if (!storedResponse) {
            return null;
        }

        try {
            return JSON.parse(storedResponse);
        } catch (error) {
            console.error('Error parsing stored auth response:', error);
            localStorage.removeItem('auth-response');
            return null;
        }
    }
};
