'use client';

import { Folder, File } from '@/types/file-system';
import { Folder as FolderIcon, FileText, Image, FileSpreadsheet, Video, Music, Download, Eye, Trash2, Star } from 'lucide-react';

interface FolderViewProps {
  folder: Folder;
  onFolderClick: (folder: Folder) => void;
  onFileClick?: (file: File) => void;
  onFileDownload?: (fileId: string, fileName: string) => void;
}

export default function FolderView({ folder, onFolderClick, onFileClick, onFileDownload }: FolderViewProps) {
  // Extract folders and files from the current folder's children
  const folders = folder.children?.filter(child => child.type === 'folder') as Folder[] || [];
  const files = folder.children?.filter(child => child.type === 'file') as File[] || [];
  const getFileIcon = (mimeType: string, extension: string) => {
    if (mimeType.includes('pdf')) return FileText;
    if (mimeType.includes('word') || extension === 'docx' || extension === 'doc') return FileText;
    if (mimeType.includes('excel') || extension === 'xlsx' || extension === 'xls') return FileSpreadsheet;
    if (mimeType.includes('image')) return Image;
    if (mimeType.includes('video')) return Video;
    if (mimeType.includes('audio')) return Music;
    if (mimeType.includes('text')) return FileText;
    return FileText;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFolderItemCount = (folder: Folder): string => {
    const folderCount = folder.children?.filter(child => child.type === 'folder').length || 0;
    const fileCount = folder.children?.filter(child => child.type === 'file').length || 0;
    
    if (folderCount === 0 && fileCount === 0) return 'Empty';
    if (folderCount > 0 && fileCount > 0) return `${folderCount} folder${folderCount > 1 ? 's' : ''}, ${fileCount} file${fileCount > 1 ? 's' : ''}`;
    if (folderCount > 0) return `${folderCount} folder${folderCount > 1 ? 's' : ''}`;
    return `${fileCount} file${fileCount > 1 ? 's' : ''}`;
  };

  const totalItems = folders.length + files.length;

  if (totalItems === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <FolderIcon className="w-16 h-16 mx-auto mb-2" />
        <p className="text-sm">This folder is empty</p>
        <p className="text-xs mt-1">Add files or create subfolders to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Folders */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
          onClick={() => onFolderClick(folder)}
        >
          {/* Folder Icon */}
          <div className="flex-shrink-0">
            <FolderIcon className="w-8 h-8 text-blue-500" />
          </div>

          {/* Folder Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {folder.name}
              </h3>
              {folder.isStarred && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>Folder</span>
              <span>•</span>
              <span>{getFolderItemCount(folder)}</span>
              <span>•</span>
              <span>Modified {formatDate(folder.updatedAt)}</span>
            </div>
            {folder.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {folder.description}
              </p>
            )}
          </div>

          {/* Folder Actions */}
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              title="Open folder"
              onClick={(e) => {
                e.stopPropagation();
                onFolderClick(folder);
              }}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete folder"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Files */}
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
          onClick={() => onFileClick?.(file)}
        >
          {/* File Icon */}
          <div className="flex-shrink-0">
            {(() => {
              const IconComponent = getFileIcon(file.mimeType, file.extension);
              return <IconComponent className="w-8 h-8 text-gray-500" />;
            })()}
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {file.name}
              </h3>
              {file.isStarred && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                {file.extension.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>Modified {formatDate(file.updatedAt)}</span>
            </div>
            {file.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {file.description}
              </p>
            )}
            {file.tags && file.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {file.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {file.tags.length > 3 && (
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                    +{file.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* File Actions */}
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              title="Download"
              onClick={(e) => {
                e.stopPropagation();
                if (onFileDownload) {
                  onFileDownload(file.id, `${file.name}.${file.extension}`);
                } else if (file.url) {
                  const a = document.createElement('a');
                  a.href = file.url;
                  a.download = `${file.name}.${file.extension}`;
                  a.click();
                }
              }}
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
              title="Preview"
              onClick={(e) => e.stopPropagation()}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
