'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Upload, FileText, AlertCircle, Eye } from 'lucide-react';
import DocumentPreview from './DocumentPreview';

interface ResubmitRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (file: File, comment: string) => void;
    isLoading: boolean;
    currentFileName?: string;
    currentFile?: {
        id: string;
        name: string;
        mimeType: string;
        size: number;
        contentUrl?: string;
        description?: string;
    };
    onDownload?: () => void;
}

export default function ResubmitRequestModal({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    currentFileName,
    currentFile,
    onDownload
}: ResubmitRequestModalProps) {
    const { isDark } = useTheme();
    const [comment, setComment] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: File is required
        if (!selectedFile) {
            setError('Please upload a document before submitting.');
            return;
        }

        // Validation: Comment is required
        if (comment.trim() === '') {
            setError('Please provide a comment explaining the changes.');
            return;
        }

        setError('');
        onSubmit(selectedFile, comment);
    };

    const handleClose = () => {
        if (!isLoading) {
            setComment('');
            setSelectedFile(null);
            setError('');
            onClose();
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handlePreviewDocument = () => {
        if (currentFile) {
            setIsPreviewOpen(true);
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
                <div className={`inline-block w-full max-w-lg p-6 -mt-20 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'
                    }`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <Upload className="w-6 h-6 text-blue-600" />
                            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Re-Submit Request
                            </h3>
                        </div>
                        <button
                            onClick={handleClose}
                            disabled={isLoading}
                            className={`p-1 rounded-full hover:bg-gray-100 ${isDark ? 'hover:bg-gray-700' : ''
                                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                    </div>

                    {/* Current Document Info */}
                    {currentFileName && (
                        <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Current Document:
                                    </p>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {currentFileName}
                                    </p>
                                </div>
                                {currentFile && (
                                    <button
                                        type="button"
                                        onClick={handlePreviewDocument}
                                        disabled={isLoading}
                                        className={`ml-3 px-3 py-1.5 text-sm font-medium rounded-lg flex items-center space-x-1 transition-colors ${isDark
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span>Preview</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* File Upload */}
                        <div className="mb-4">
                            <label
                                htmlFor="file-upload"
                                className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                            >
                                Upload Updated Document <span className="text-red-500">*</span>
                            </label>
                            <div
                                onClick={handleBrowseClick}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDark
                                    ? 'border-gray-600 hover:border-gray-500 bg-gray-700'
                                    : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                                    } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="file-upload"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={isLoading}
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                                />
                                {selectedFile ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {selectedFile.name}
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'
                                            }`} />
                                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            Click to browse or drag and drop
                                        </p>
                                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                            PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="mb-4">
                            <label
                                htmlFor="comment"
                                className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'
                                    }`}
                            >
                                Describe Changes Made <span className="text-red-500">*</span>
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
                                placeholder="Please describe the changes you made to the document..."
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
                                className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Submit Request</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Document Preview Modal */}
            {currentFile && (
                <DocumentPreview
                    file={currentFile}
                    isOpen={isPreviewOpen}
                    onClose={() => setIsPreviewOpen(false)}
                    onDownload={onDownload}
                />
            )}
        </div>
    );
}
