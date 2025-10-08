import { toast, ToastOptions } from 'react-toastify';

export const showToast = {
    success: (message: string) => {
        toast.success(message);
    },

    error: (message: string) => {
        toast.error(message);
    },

    info: (message: string) => {
        toast.info(message);
    },

    warning: (message: string) => {
        toast.warning(message);
    },

    // Custom toast with options
    custom: (message: string, type: 'success' | 'error' | 'info' | 'warning', options?: ToastOptions) => {
        toast[type](message, options);
    }
};