'use client';

import { Folder, FileText, HardDrive, FolderPlus, Upload } from 'lucide-react';

interface DocumentActionsPanelProps {
    onCreateFolder: () => void;
    onUploadFiles: () => void;
    stats: {
        totalFolders: number;
        totalFiles: number;
        totalSize: number;
        rootFolderCount: number;
        rootFileCount: number;
    };
    currentFolderName: string;
}

export default function DocumentActionsPanel({
    onCreateFolder,
    onUploadFiles,
    stats,
    currentFolderName,
}: DocumentActionsPanelProps) {
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                    <Folder className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{stats.totalFolders}</span>
                    <span className="text-blue-600/70 dark:text-blue-400/70">folders</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                    <FileText className="w-4 h-4 text-violet-500" />
                    <span className="font-medium">{stats.totalFiles}</span>
                    <span className="text-violet-600/70 dark:text-violet-400/70">files</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                    <HardDrive className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">{formatFileSize(stats.totalSize)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onCreateFolder}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition-colors duration-200"
                >
                    <FolderPlus className="w-4 h-4" />
                    New Folder
                </button>
                <button
                    onClick={onUploadFiles}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white font-medium text-sm hover:bg-violet-700 transition-colors duration-200"
                >
                    <Upload className="w-4 h-4" />
                    Upload Files
                </button>
            </div>
        </div>
    );
}