import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';
import { LoginResponse } from '@/types/auth';

export function useStoredLoginResponse() {
    const [storedResponse, setStoredResponse] = useState<LoginResponse | null>(null);

    useEffect(() => {
        const response = authService.getStoredLoginResponse();
        setStoredResponse(response);
    }, []);

    const refreshStoredResponse = () => {
        const response = authService.getStoredLoginResponse();
        setStoredResponse(response);
    };

    return {
        storedResponse,
        refreshStoredResponse
    };
}