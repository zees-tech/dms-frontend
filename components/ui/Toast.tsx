'use client';

import { useEffect } from 'react';
import { Toast as ToastType } from '@/hooks/useToast';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
    toast: ToastType;
    onRemove: (id: string) => void;
}

export default function Toast({ toast, onRemove }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onRemove(toast.id);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onRemove]);

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return CheckCircle;
            case 'error': return XCircle;
            case 'warning': return AlertTriangle;
            case 'info': return Info;
            default: return Info;
        }
    };

    const getColors = () => {
        switch (toast.type) {
            case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
            case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
            case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
            case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
            default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200';
        }
    };

    const IconComponent = getIcon();

    return (
        <div className={`flex items-center gap-3 p-4 rounded-lg border ${getColors()} shadow-lg backdrop-blur-sm animate-in slide-in-from-right-full duration-300`}>
            <IconComponent className="w-5 h-5" />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="text-current opacity-70 hover:opacity-100 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}