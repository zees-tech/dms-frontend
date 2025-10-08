'use client';

import { useState, useRef } from 'react';
import { Folder } from '@/types/file-system';
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

interface FileUploadDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadFiles: (files: FileList, folderId: string) => void;
    currentFolder: Folder;
}

interface UploadFile {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'completed' | 'error';
    id: string;
}

export default function FileUploadDrawer({
    isOpen,
    onClose,
    onUploadFiles,
    currentFolder,
}: FileUploadDrawerProps) {
    const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles: UploadFile[] = Array.from(files).map((file) => ({
            file: file,
            progress: 0,
            status: 'pending',
            id: Math.random().toString(36).substr(2, 9),
        }));

        setUploadFiles(prev => [...prev, ...newFiles]);
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
        setUploadFiles(prev => prev.filter(f => f.id !== id));
    };

    const startUpload = async () => {
        const pendingFiles = uploadFiles.filter(f => f.status === 'pending');

        for (const uploadFile of pendingFiles) {
            setUploadFiles(prev =>
                prev.map(f => f.id === uploadFile.id ? { ...f, status: 'uploading' } : f)
            );

            // Simulate upload progress
            for (let progress = 0; progress <= 100; progress += 10) {
                await new Promise(resolve => setTimeout(resolve, 100));
                setUploadFiles(prev =>
                    prev.map(f => f.id === uploadFile.id ? { ...f, progress } : f)
                );
            }

            setUploadFiles(prev =>
                prev.map(f => f.id === uploadFile.id ? { ...f, status: 'completed' } : f)
            );
        }

        // Call the upload handler
        const fileList = new DataTransfer();
        pendingFiles.forEach(f => fileList.items.add(f.file));
        onUploadFiles(fileList.files, currentFolder.id);
    };

    const clearCompleted = () => {
        setUploadFiles(prev => prev.filter(f => f.status !== 'completed'));
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
                            Support for multiple files. Max 10MB per file.
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
                    {uploadFiles.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                    Files ({uploadFiles.length})
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
                                {uploadFiles.map((uploadFile) => (
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
                                                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Clock className="w-3 h-3" /> Pending
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
                {uploadFiles.length > 0 && (
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
                                disabled={uploadFiles.filter(f => f.status === 'pending').length === 0}
                                className="flex-1 px-4 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Upload {uploadFiles.filter(f => f.status === 'pending').length} Files
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
