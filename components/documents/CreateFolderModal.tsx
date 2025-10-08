'use client';

import { useState } from 'react';
import { Folder } from '@/types/file-system';
import { Folder as FolderIcon, X, MapPin } from 'lucide-react';

interface CreateFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateFolder: (name: string, parentId: string) => void;
    currentFolder: Folder;
}

export default function CreateFolderModal({
    isOpen,
    onClose,
    onCreateFolder,
    currentFolder,
}: CreateFolderModalProps) {
    const [folderName, setFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!folderName.trim()) return;

        setIsCreating(true);
        try {
            await onCreateFolder(folderName.trim(), currentFolder.id);
            setFolderName('');
            onClose();
        } catch (error) {
            console.error('Failed to create folder:', error);
        } finally {
            setIsCreating(false);
        }
    };

    const handleClose = () => {
        setFolderName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Create New Folder
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Create a new folder in "{currentFolder.name}"
                            </p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="folderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Folder Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FolderIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="folderName"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    placeholder="Enter folder name..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    autoFocus
                                    disabled={isCreating}
                                />
                            </div>
                        </div>

                        {/* Current Location */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span>Location:</span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {currentFolder.path === '/' ? 'Root' : currentFolder.path}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                disabled={isCreating}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!folderName.trim() || isCreating}
                                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isCreating ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating...
                                    </div>
                                ) : (
                                    'Create Folder'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}