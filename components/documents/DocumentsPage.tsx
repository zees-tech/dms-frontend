'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FolderTree from '@/components/documents/FolderTree';
import FileList from '@/components/documents/FileList';
import Breadcrumb from '@/components/documents/Breadcrumb';
import { mockFileSystem, Folder, File } from '@/types/file-system';

export default function DocumentsPage() {
  const [currentFolder, setCurrentFolder] = useState<Folder>(mockFileSystem);
  const [breadcrumb, setBreadcrumb] = useState<Folder[]>([mockFileSystem]);

  const handleFolderClick = (folder: Folder) => {
    setCurrentFolder(folder);
    // Update breadcrumb - find the path to this folder
    const newBreadcrumb: Folder[] = [];
    let current: Folder | null = folder;
    
    while (current) {
      newBreadcrumb.unshift(current);
      // Find parent in the file system
      if (current.parentId) {
        current = findFolderById(mockFileSystem, current.parentId);
      } else {
        current = null;
      }
    }
    
    setBreadcrumb(newBreadcrumb);
  };

  const handleBreadcrumbClick = (folder: Folder) => {
    setCurrentFolder(folder);
    const folderIndex = breadcrumb.findIndex(f => f.id === folder.id);
    setBreadcrumb(breadcrumb.slice(0, folderIndex + 1));
  };

  const findFolderById = (root: Folder, id: string): Folder | null => {
    if (root.id === id) return root;
    
    if (root.children) {
      for (const child of root.children) {
        if (child.type === 'folder') {
          const found = findFolderById(child, id);
          if (found) return found;
        }
      }
    }
    
    return null;
  };

  const folders = currentFolder.children?.filter(item => item.type === 'folder') as Folder[] || [];
  const files = currentFolder.children?.filter(item => item.type === 'file') as File[] || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Documents
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your files and folders
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb 
          items={breadcrumb} 
          onItemClick={handleBreadcrumbClick}
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Folders Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Folders ({folders.length})
              </h2>
              <FolderTree 
                folders={folders}
                onFolderClick={handleFolderClick}
              />
            </div>
          </div>

          {/* Files Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Files ({files.length})
              </h2>
              <FileList files={files} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
