'use client';

import { Folder } from '@/types/file-system';

interface BreadcrumbProps {
  items: Folder[];
  onItemClick: (folder: Folder) => void;
}

export default function Breadcrumb({ items, onItemClick }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      {items.map((folder, index) => (
        <div key={folder.id} className="flex items-center space-x-2">
          {index > 0 && (
            <span className="text-gray-300 dark:text-gray-600">/</span>
          )}
          <button
            onClick={() => onItemClick(folder)}
            className={`px-2 py-1 rounded transition-colors ${
              index === items.length - 1
                ? 'text-gray-900 dark:text-white font-medium cursor-default'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            disabled={index === items.length - 1}
          >
            {folder.name}
          </button>
        </div>
      ))}
    </nav>
  );
}
