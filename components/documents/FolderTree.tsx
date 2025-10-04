'use client';

import { useState } from 'react';
import { Folder } from '@/types/file-system';

interface FolderTreeProps {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
  level?: number;
  parentHasMoreSiblings?: boolean;
}

export default function FolderTree({ 
  folders, 
  onFolderClick, 
  level = 0,
  parentHasMoreSiblings = false 
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFolderClick = (folder: Folder) => {
    if (folder.children && folder.children.some(child => child.type === 'folder')) {
      toggleFolder(folder.id);
    }
    onFolderClick(folder);
  };

  if (folders.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        <div className="text-4xl mb-2">📁</div>
        <p className="text-sm">No folders</p>
      </div>
    );
  }

  return (
    <div className="font-sans text-sm">
      {folders.map((folder, index) => {
        const hasSubfolders = folder.children?.some(child => child.type === 'folder');
        const isExpanded = expandedFolders.has(folder.id);
        const isLastItem = index === folders.length - 1;
        const hasMoreSiblings = index < folders.length - 1;
        
        return (
          <div key={folder.id} className="relative">
            {/* Connecting lines */}
            {level > 0 && (
              <div 
                className="absolute left-0 top-0 bottom-0 w-4 border-l border-gray-300 dark:border-gray-600"
                style={{ 
                  marginLeft: `${(level - 1) * 16}px`,
                  borderLeft: parentHasMoreSiblings ? '1px solid' : 'none',
                  borderColor: 'rgb(156 163 175)'
                }}
              />
            )}
            
            {/* Folder Item */}
            <div
              className={`flex items-center py-1 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                level > 0 ? 'pl-4' : ''
              }`}
              onClick={() => handleFolderClick(folder)}
              style={{ 
                paddingLeft: `${level * 16 + 8}px`
              }}
            >
              {/* Expand/Collapse Icon with connecting line */}
              {hasSubfolders ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(folder.id);
                  }}
                  className="w-4 h-4 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mr-1"
                >
                  {/* Windows-style expand/collapse icons */}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="currentColor"
                    className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  >
                    <path d="M4.5 3L7.5 6L4.5 9Z" />
                  </svg>
                </button>
              ) : (
                <div className="w-4 h-4 mr-1 flex items-center justify-center">
                  {/* Dot for folders without children */}
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
              )}
              
              {/* Folder Icon */}
              <div className="w-4 h-4 mr-2 flex items-center justify-center">
                {isExpanded ? (
                  // Open folder icon
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-yellow-500">
                    <path d="M14.5 3H7.71l-.85-.85L6.51 2h-5l-.5.5v11l.5.5h13l.5-.5v-8L14.5 3zm-.5 9H2V4h5.29l.85.85.35.15H14v7z"/>
                  </svg>
                ) : (
                  // Closed folder icon
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-yellow-500">
                    <path d="M14.5 3H7.71l-.85-.85L6.51 2h-5l-.5.5v11l.5.5h13l.5-.5v-8L14.5 3zm-.5 9H2V4h5.29l.85.85.35.15H14v7z"/>
                  </svg>
                )}
              </div>
              
              {/* Folder Name */}
              <span className="flex-1 text-gray-900 dark:text-gray-100 truncate">
                {folder.name}
              </span>
            </div>

            {/* Subfolders */}
            {isExpanded && hasSubfolders && (
              <FolderTree
                folders={folder.children!.filter(child => child.type === 'folder') as Folder[]}
                onFolderClick={onFolderClick}
                level={level + 1}
                parentHasMoreSiblings={hasMoreSiblings}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
