'use client';

import { useState, useRef } from 'react';
import { Folder } from '@/types/file-system';
import {
    generatePresignedUrl,
    uploadFileWithPresignedUrl,
    completeUpload
} from '@/apiComponent/rest/fileUpload';
import {
    X,
    Paperclip,
    FileText,
    Image,
    FileSpreadsheet,
    Video,
    Music,
    CheckCircle,
    XCircle,
    Clock,
    FolderOpen
} from 'lucide-react';
import DocumentSettingsModal, { DocumentSettings } from './DocumentSettingsModal';

interface FileUploadDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadFiles: (files: FileList, folderId: string) => void;
    currentFolder: Folder;
}

interface UploadFile {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error' | 'configuring';
    id: string;
    settings?: DocumentSettings;
}

export default function FileUploadDrawer({
    isOpen,
    onClose,
    onUploadFiles,
    currentFolder,
}: FileUploadDrawerProps) {
    const [uploadFilesState, setUploadFilesState] = useState<UploadFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [currentConfigFile, setCurrentConfigFile] = useState<UploadFile | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: UploadFile[] = Array.from(files).map((file) => ({
            file: file,
            progress: 0,
            status: 'configuring',
            id: Math.random().toString(36).substring(2, 9),
        }));

        setUploadFilesState(prev => [...prev, ...newFiles]);

        // Show settings modal for the first file
        if (newFiles.length > 0) {
            setCurrentConfigFile(newFiles[0]);
            setShowSettingsModal(true);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const removeFile = (id: string) => {
        setUploadFilesState(prev => prev.filter(f => f.id !== id));
    };

    const handleSettingsConfirm = (settings: DocumentSettings) => {
        if (!currentConfigFile) return;

        console.log('Received settings for file:', currentConfigFile.file.name, settings);

        // Apply settings to current file and mark as pending
        setUploadFilesState(prev =>
            prev.map(f =>
                f.id === currentConfigFile.id
                    ? { ...f, status: 'pending', settings }
                    : f
            )
        );

        // Find next file that needs configuration
        const nextConfigFile = uploadFilesState.find(
            f => f.status === 'configuring' && f.id !== currentConfigFile.id
        );

        if (nextConfigFile) {
            setCurrentConfigFile(nextConfigFile);
            // Modal stays open for next file
        } else {
            // All files configured, close modal and start upload
            setCurrentConfigFile(null);
            setShowSettingsModal(false);

            // Auto-start upload once all files are configured
            setTimeout(() => {
                console.log('Starting upload with configured settings...');
                startUpload();
            }, 100);
        }
    };

    const handleSettingsCancel = () => {
        if (currentConfigFile) {
            // Remove the file being configured
            removeFile(currentConfigFile.id);
        }
        setCurrentConfigFile(null);
        setShowSettingsModal(false);
    };

    const handleSkipAllSettings = () => {
        console.log('Skipping settings for all files');

        // Apply default settings to all configuring files
        const defaultSettings: DocumentSettings = {
            hasExpiration: false,
            isSecret: false
        };

        setUploadFilesState(prev =>
            prev.map(f =>
                f.status === 'configuring'
                    ? { ...f, status: 'pending', settings: defaultSettings }
                    : f
            )
        );

        setCurrentConfigFile(null);
        setShowSettingsModal(false);

        // Auto-start upload
        setTimeout(() => {
            console.log('Starting upload with default settings for all files...');
            startUpload();
        }, 100);
    };

    const startUpload = async () => {
        const pendingFiles = uploadFilesState.filter(f => f.status === 'pending');

        console.log('Starting upload for files:', pendingFiles.map(f => ({ name: f.file.name, settings: f.settings })));

        if (pendingFiles.length === 0) {
            console.log('No pending files to upload');
            return;
        }

        try {
            // Update all pending files to uploading status
            setUploadFilesState(prev =>
                prev.map(f =>
                    f.status === 'pending' ? { ...f, status: 'uploading', progress: 0 } : f
                )
            );

            // Upload files using pre-signed URLs for better performance and no size limits
            const uploadPromises = pendingFiles.map(async (uploadFile) => {
                try {
                    // Generate pre-signed URL for direct upload
                    const presignedUrlResponse = await generatePresignedUrl(
                        uploadFile.file.name,
                        currentFolder.id,
                        uploadFile.file.size,
                        uploadFile.file.type || 'application/octet-stream'
                    );

                    // Upload file directly to storage using pre-signed URL
                    await uploadFileWithPresignedUrl(
                        uploadFile.file,
                        presignedUrlResponse.uploadUrl,
                        (progress) => {
                            // Update progress for this specific file
                            setUploadFilesState(prev =>
                                prev.map(f =>
                                    f.id === uploadFile.id ? { ...f, progress } : f
                                )
                            );
                        }
                    );

                    const token = localStorage.getItem("auth-token");
                    const refresh_token = "";

                    // Complete the upload by storing file metadata with settings
                    console.log('Uploading file with settings:', uploadFile.file.name, uploadFile.settings);
                    console.log('API call parameters:', {
                        fileKey: presignedUrlResponse.fileKey,
                        fileName: uploadFile.file.name,
                        fileSize: uploadFile.file.size,
                        contentType: uploadFile.file.type || 'application/octet-stream',
                        folderId: currentFolder.id,
                        settings: uploadFile.settings
                    });

                    const completeResponse = await completeUpload(
                        presignedUrlResponse.fileKey,
                        uploadFile.file.name,
                        uploadFile.file.size,
                        uploadFile.file.type || 'application/octet-stream',
                        currentFolder.id,
                        token || "",
                        refresh_token,
                        uploadFile.settings
                    );

                    console.log('Upload completed successfully:', completeResponse);

                    // Mark file as completed
                    setUploadFilesState(prev =>
                        prev.map(f =>
                            f.id === uploadFile.id ? { ...f, status: 'completed', progress: 100 } : f
                        )
                    );

                    return { success: true, file: uploadFile.file, metadata: completeResponse.fileMetadata };
                } catch (error) {
                    console.error(`Upload failed for ${uploadFile.file.name}:`, error);
                    console.error('Error details:', {
                        errorMessage: error instanceof Error ? error.message : 'Unknown error',
                        errorStack: error instanceof Error ? error.stack : 'No stack trace',
                        fileSettings: uploadFile.settings
                    });

                    // Mark file as failed with error message
                    setUploadFilesState(prev =>
                        prev.map(f =>
                            f.id === uploadFile.id ? { ...f, status: 'error', progress: 0 } : f
                        )
                    );

                    return { success: false, file: uploadFile.file, error: error instanceof Error ? error.message : 'Upload failed' };
                }
            });

            // Wait for all uploads to complete
            const results = await Promise.all(uploadPromises);

            // Call the parent upload handler with the successful files
            const successfulFiles = results.filter(result => result.success);

            if (successfulFiles.length > 0) {
                const fileList = new DataTransfer();
                successfulFiles.forEach(result => fileList.items.add(result.file));
                onUploadFiles(fileList.files, currentFolder.id);
            }

        } catch (error) {
            console.error('Upload process failed:', error);

            // Mark all uploading files as failed
            setUploadFilesState(prev =>
                prev.map(f =>
                    f.status === 'uploading' ? { ...f, status: 'error', progress: 0 } : f
                )
            );
        }
    };

    const clearCompleted = () => {
        setUploadFilesState(prev => prev.filter(f => f.status !== 'completed'));
    };

    const getFileIcon = (file: File) => {
        const type = file.type || '';
        if (type.includes('image')) return Image;
        if (type.includes('pdf')) return FileText;
        if (type.includes('word')) return FileText;
        if (type.includes('excel')) return FileSpreadsheet;
        if (type.includes('video')) return Video;
        if (type.includes('audio')) return Music;
        return FileText;
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="relative ml-auto bg-white dark:bg-gray-900 w-full max-w-lg shadow-2xl border-l border-gray-200 dark:border-gray-700 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Upload Files
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Upload to {currentFolder.name}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Upload Area */}
                <div className="p-6 flex-1 overflow-y-auto">
                    <div
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragOver
                            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                    >
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Drop files here or click to browse
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Support for multiple files. Large files supported via direct upload.
                        </p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Paperclip className="w-4 h-4" />
                            Choose Files
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => handleFileSelect(e.target.files)}
                        />
                    </div>

                    {/* File List */}
                    {uploadFilesState.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    Files ({uploadFilesState.length})
                                </h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={clearCompleted}
                                        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    >
                                        Clear completed
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {uploadFilesState.map((uploadFile) => (
                                    <div
                                        key={uploadFile.id}
                                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                    >
                                        {(() => {
                                            const IconComponent = getFileIcon(uploadFile.file);
                                            return <IconComponent className="w-5 h-5 text-gray-500" />;
                                        })()}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {uploadFile.file.name}
                                                </p>
                                                <button
                                                    onClick={() => removeFile(uploadFile.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatFileSize(uploadFile.file.size)}
                                            </p>

                                            {/* Progress Bar */}
                                            {uploadFile.status === 'uploading' && (
                                                <div className="mt-2">
                                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                        <div
                                                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadFile.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Status */}
                                            <div className="flex items-center gap-1 mt-1">
                                                {uploadFile.status === 'completed' && (
                                                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                                        <CheckCircle className="w-3 h-3" /> Uploaded
                                                    </span>
                                                )}
                                                {uploadFile.status === 'error' && (
                                                    <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                                                        <XCircle className="w-3 h-3" /> Failed
                                                    </span>
                                                )}
                                                {uploadFile.status === 'pending' && (
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                            <Clock className="w-3 h-3" /> Ready
                                                        </span>
                                                        {uploadFile.settings && (
                                                            <div className="flex gap-1">
                                                                {uploadFile.settings.hasExpiration && (
                                                                    <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-1 py-0.5 rounded">
                                                                        Expires
                                                                    </span>
                                                                )}
                                                                {uploadFile.settings.isSecret && (
                                                                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-1 py-0.5 rounded">
                                                                        Protected
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {uploadFile.status === 'configuring' && (
                                                    <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                                                        <Clock className="w-3 h-3" /> Configuring...
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {uploadFilesState.length > 0 && (
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={startUpload}
                                disabled={
                                    uploadFilesState.filter(f => f.status === 'pending').length === 0 ||
                                    uploadFilesState.some(f => f.status === 'configuring')
                                }
                                className="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {uploadFilesState.some(f => f.status === 'configuring')
                                    ? 'Configure Files First'
                                    : `Upload ${uploadFilesState.filter(f => f.status === 'pending').length} Files`
                                }
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Document Settings Modal */}
            <DocumentSettingsModal
                isOpen={showSettingsModal}
                onClose={handleSettingsCancel}
                onConfirm={handleSettingsConfirm}
                onSkipAll={handleSkipAllSettings}
                fileName={currentConfigFile?.file.name || ''}
                hasMultipleFiles={uploadFilesState.filter(f => f.status === 'configuring').length > 1}
            />
        </div>
    );
}
