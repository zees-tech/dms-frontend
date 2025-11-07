'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface RequestActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (comment: string) => void;
    action: 'approve' | 'reject';
    isLoading: boolean;
}

export default function RequestActionModal({
    isOpen,
    onClose,
    onSubmit,
    action,
    isLoading
}: RequestActionModalProps) {
    const { isDark } = useTheme();
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(comment);
    };

    const handleClose = () => {
        if (!isLoading) {
            setComment('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                    onClick={handleClose}
                />

                {/* Modal panel */}
                <div className={`inline-block w-full max-w-md p-6 -mt-20 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            {action === 'approve' ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : (
                                <XCircle className="w-6 h-6 text-red-600" />
                            )}
                            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {action === 'approve' ? 'Approve Request' : 'Reject Request'}
                            </h3>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className={`p-1 rounded-full hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''} ${isLoading ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                        >
                            <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                                {action === 'approve' ? 'Comments (optional)' : 'Reason for rejection'}
                            </label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${isDark
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    }`}
                                placeholder={
                                    action === 'approve'
                                        ? 'Add any comments about this approval...'
                                        : 'Please provide a reason for rejection...'
                                }
                                disabled={isLoading}
                            />
                        </div>

                        {/* Action buttons */}
                        <div className="flex space-x-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={isLoading}
                                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${isDark
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                    } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${action === 'approve'
                                    ? isLoading
                                        ? 'bg-green-400 cursor-not-allowed'
                                        : 'bg-green-600 hover:bg-green-700'
                                    : isLoading
                                        ? 'bg-red-400 cursor-not-allowed'
                                        : 'bg-red-600 hover:bg-red-700'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>{action === 'approve' ? 'Approving...' : 'Rejecting...'}</span>
                                    </>
                                ) : (
                                    <span>{action === 'approve' ? 'Approve' : 'Reject'}</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}