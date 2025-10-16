'use client';

import React, { useState } from 'react';
import { X, Calendar, Lock, Eye, EyeOff } from 'lucide-react';

interface DocumentSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (settings: DocumentSettings) => void;
    onSkipAll?: () => void;
    fileName: string;
    hasMultipleFiles?: boolean;
}

export interface DocumentSettings {
    hasExpiration: boolean;
    expirationDate?: string;
    isSecret: boolean;
    password?: string;
}

export default function DocumentSettingsModal({
    isOpen,
    onClose,
    onConfirm,
    onSkipAll,
    fileName,
    hasMultipleFiles = false
}: DocumentSettingsModalProps) {
    const [hasExpiration, setHasExpiration] = useState(false);
    const [expirationDate, setExpirationDate] = useState('');
    const [isSecret, setIsSecret] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Fixed password as requested
    const password = 'Pass1234@';

    const handleConfirm = () => {
        // Validate required fields
        if (hasExpiration && !expirationDate) {
            console.error('Expiration date is required when expiration is enabled');
            return;
        }

        const settings: DocumentSettings = {
            hasExpiration,
            expirationDate: hasExpiration ? expirationDate : undefined,
            isSecret,
            password: isSecret ? password : undefined
        };

        console.log('Confirming settings:', settings);
        console.log('Date format check:', {
            originalDate: expirationDate,
            hasExpiration,
            dateLength: expirationDate?.length,
            dateValid: expirationDate ? new Date(expirationDate).toString() : 'N/A'
        });

        // Call onConfirm first, then close
        onConfirm(settings);

        // Don't call handleClose() here as it resets the form
        // Let the parent component handle closing
    };

    const handleClose = () => {
        // Reset form
        setHasExpiration(false);
        setExpirationDate('');
        setIsSecret(false);
        setShowPassword(false);
        onClose();
    };

    const resetForm = () => {
        setHasExpiration(false);
        setExpirationDate('');
        setIsSecret(false);
        setShowPassword(false);
    };

    // Reset form when modal opens
    React.useEffect(() => {
        if (isOpen) {
            console.log('Modal opened, resetting form for file:', fileName);
            setHasExpiration(false);
            setExpirationDate('');
            setIsSecret(false);
            setShowPassword(false);
        }
    }, [isOpen, fileName]);

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Document Settings
                        </h2>
                        <button
                            onClick={handleClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Configure settings for: {fileName}
                        {hasMultipleFiles && (
                            <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                Multiple files
                            </span>
                        )}
                    </p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Document Expiration */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Document Expiration
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="hasExpiration"
                                checked={hasExpiration}
                                onChange={(e) => {
                                    console.log('Expiration checkbox changed:', e.target.checked);
                                    setHasExpiration(e.target.checked);
                                }}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="hasExpiration" className="text-sm text-gray-700 dark:text-gray-300">
                                Set expiration date for this document
                            </label>
                        </div>

                        {hasExpiration && (
                            <div className="ml-7">
                                <input
                                    type="date"
                                    value={expirationDate}
                                    onChange={(e) => {
                                        console.log('Expiration date changed:', e.target.value);
                                        setExpirationDate(e.target.value);
                                    }}
                                    min={today}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${hasExpiration && !expirationDate
                                        ? 'border-red-300 dark:border-red-600'
                                        : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                    required
                                />
                                <p className={`text-xs mt-1 ${hasExpiration && !expirationDate
                                    ? 'text-red-500 dark:text-red-400'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {hasExpiration && !expirationDate
                                        ? 'Please select an expiration date'
                                        : 'Document will be automatically deleted after this date'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Document Security */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5 text-gray-500" />
                            <label className="text-sm font-medium text-gray-900 dark:text-white">
                                Document Security
                            </label>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isSecret"
                                checked={isSecret}
                                onChange={(e) => setIsSecret(e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label htmlFor="isSecret" className="text-sm text-gray-700 dark:text-gray-300">
                                Mark as secret document (password protected)
                            </label>
                        </div>

                        {isSecret && (
                            <div className="ml-7 space-y-2">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        readOnly
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Default password will be applied to protect this document
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                        {hasMultipleFiles && onSkipAll && (
                            <button
                                onClick={onSkipAll}
                                className="px-4 py-2 text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 rounded-lg font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                            >
                                Skip All
                            </button>
                        )}
                        <button
                            onClick={() => {
                                const defaultSettings: DocumentSettings = {
                                    hasExpiration: false,
                                    isSecret: false
                                };
                                console.log('Skipping settings for this file');
                                resetForm();
                                onConfirm(defaultSettings);
                            }}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                        >
                            Skip This
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={hasExpiration && (!expirationDate || expirationDate.trim() === '')}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title={hasExpiration && (!expirationDate || expirationDate.trim() === '') ? 'Please select an expiration date' : ''}
                        >
                            {hasExpiration && (!expirationDate || expirationDate.trim() === '')
                                ? 'Select Expiration Date'
                                : 'Apply Settings'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}