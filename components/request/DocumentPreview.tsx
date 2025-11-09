'use client';

import { useState, useEffect } from 'react';
import { X, Download, ExternalLink, FileText, Image as ImageIcon, Video, Music, File as FileIcon } from 'lucide-react';
import { getFilePreviewUrl } from '@/apiComponent/rest/filePreview';
import { getPreviewUrl, isPreviewableFileType, getFileTypeDescription } from '@/utils/filePreview';

interface DocumentFile {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    contentUrl?: string;
    description?: string;
}

interface DocumentPreviewProps {
    file: DocumentFile | null;
    isOpen: boolean;
    onClose: () => void;
    onDownload?: (fileId: string, fileName: string) => void;
}

export default function DocumentPreview({ file, isOpen, onClose, onDownload }: DocumentPreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle escape key to close preview
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Load preview URL when file changes
    useEffect(() => {
        if (!file || !isOpen) {
            setPreviewUrl(null);
            setLoading(false);
            return;
        }

        setImageError(false);
        setVideoError(false);
        setLoading(true);
        setError(null);

        // Try to get preview URL from API
        const loadPreviewUrl = async () => {
            try {
                // First try to use existing contentUrl if available
                if (file.contentUrl) {
                    setPreviewUrl(file.contentUrl);
                    setLoading(false);
                    return;
                }

                // Otherwise, try to get preview URL from API
                const previewData = await getFilePreviewUrl(file.id);
                setPreviewUrl(previewData.previewUrl);
                setLoading(false);
            } catch (err) {
                console.error('Failed to load preview URL:', err);
                setError('Failed to load preview');
                setLoading(false);
            }
        };

        loadPreviewUrl();
    }, [file, isOpen]);

    if (!isOpen || !file) return null;

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.includes('image')) return ImageIcon;
        if (mimeType.includes('video')) return Video;
        if (mimeType.includes('audio')) return Music;
        if (mimeType.includes('pdf') || mimeType.includes('text')) return FileText;
        return FileIcon;
    };

    const renderPreviewContent = () => {
        const { mimeType, name } = file;

        if (loading) {
            return (
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            );
        }

        if (error || !previewUrl) {
            const IconComponent = getFileIcon(mimeType);
            const isPreviewableType = isPreviewableFileType(mimeType);
            const fileTypeDescription = getFileTypeDescription(mimeType, name.split('.').pop() || '');

            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                    <div className="flex flex-col items-center space-y-4 text-gray-500 dark:text-gray-400">
                        <IconComponent className="w-16 h-16" />
                        <div className="text-center">
                            <p className="text-lg font-medium">
                                {error ? 'Preview failed to load' : 'Preview not available'}
                            </p>
                            <p className="text-sm">
                                {error || (isPreviewableType
                                    ? 'Unable to generate preview URL for this file'
                                    : 'This file type cannot be previewed inline'
                                )}
                            </p>
                            <p className="text-xs mt-2">File type: {fileTypeDescription}</p>
                            <p className="text-xs mt-1 text-blue-500">
                                Try downloading the file to view it
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // Image preview
        if (mimeType.includes('image') && !imageError) {
            return (
                <div className="relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <img
                        src={previewUrl}
                        alt={name}
                        className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                        onError={() => setImageError(true)}
                    />
                </div>
            );
        }

        // PDF preview
        if (mimeType.includes('pdf')) {
            const finalPreviewUrl = getPreviewUrl(previewUrl, mimeType);
            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <iframe
                        src={finalPreviewUrl}
                        className="w-full h-96 rounded-lg border border-gray-200 dark:border-gray-600"
                        title={`Preview of ${name}`}
                    />
                </div>
            );
        }

        // Video preview
        if (mimeType.includes('video') && !videoError) {
            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <video
                        controls
                        className="w-full max-h-96 rounded-lg"
                        onError={() => setVideoError(true)}
                    >
                        <source src={previewUrl} type={mimeType} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }

        // Audio preview
        if (mimeType.includes('audio')) {
            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                    <div className="flex flex-col items-center space-y-4">
                        <Music className="w-16 h-16 text-gray-400" />
                        <audio controls className="w-full max-w-md">
                            <source src={previewUrl} type={mimeType} />
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                </div>
            );
        }

        // Text preview
        if (mimeType.includes('text')) {
            return (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <iframe
                        src={previewUrl}
                        className="w-full h-96 rounded-lg border border-gray-200 dark:border-gray-600"
                        title={`Preview of ${name}`}
                    />
                </div>
            );
        }

        // Default fallback
        const IconComponent = getFileIcon(mimeType);
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <div className="flex flex-col items-center space-y-4 text-gray-500 dark:text-gray-400">
                    <IconComponent className="w-16 h-16" />
                    <div className="text-center">
                        <p className="text-lg font-medium">Preview not supported</p>
                        <p className="text-sm">This file type cannot be previewed inline</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-5xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            {(() => {
                                const IconComponent = getFileIcon(file.mimeType);
                                return <IconComponent className="w-8 h-8 text-gray-500" />;
                            })()}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {file.name}
                            </h2>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{formatFileSize(file.size)}</span>
                                <span>•</span>
                                <span>{getFileTypeDescription(file.mimeType, file.name.split('.').pop() || '')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        {onDownload && (
                            <button
                                onClick={() => onDownload(file.id, file.name)}
                                className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                title="Download file"
                            >
                                <Download className="w-5 h-5" />
                            </button>
                        )}

                        {previewUrl && (
                            <button
                                onClick={() => window.open(previewUrl, '_blank')}
                                className="p-2 text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                                title="Open in new tab"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Close preview"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {renderPreviewContent()}

                    {/* Description */}
                    {file.description && (
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                {file.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}