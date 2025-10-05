'use client';

import { File } from '@/types/file-system';
import { FileText, Image, FileSpreadsheet, Video, Music, Download, Eye, Trash2 } from 'lucide-react';

interface FileListProps {
  files: File[];
}

export default function FileList({ files }: FileListProps) {
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

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <FileText className="w-16 h-16 mx-auto mb-2" />
        <p className="text-sm">No files in this folder</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
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
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                {file.extension.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>Modified {formatDate(file.updatedAt)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              title="Download"
              onClick={() => {
                if (file.url) {
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
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
