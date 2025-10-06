"use client";

import { useState } from "react";
import { Folder } from "@/types/file-system";
import { Folder as FolderIcon, FolderOpen, ChevronRight } from 'lucide-react';

interface FolderTreeProps {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
  level?: number;
  parentHasMoreSiblings?: boolean;
  activeFolderId?: string;
}

export default function FolderTree({
  folders,
  onFolderClick,
  level = 0,
  parentHasMoreSiblings = false,
  activeFolderId,
}: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

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
    if (
      folder.children &&
      folder.children.some((child) => child.type === "folder")
    ) {
      toggleFolder(folder.id);
    }
    onFolderClick(folder);
  };

  if (folders.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-400">
        <FolderIcon className="w-16 h-16 mx-auto mb-2" />
        <p className="text-sm">No folders</p>
      </div>
    );
  }

  return (
    <div className="font-sans text-sm">
      {folders.map((folder, index) => {
        const hasSubfolders = folder.children?.some(
          (child) => child.type === "folder"
        );
        const isExpanded = expandedFolders.has(folder.id);
        const isLastItem = index === folders.length - 1;
        const hasMoreSiblings = index < folders.length - 1;

        return (
          <div key={folder.id} className="relative">
            {/* Connecting lines */}
            {/* {level > 0 && (
              <div
                className="absolute left-0 top-0 bottom-0 w-4 border-l border-gray-300 dark:border-gray-600 py-1"
                style={{
                  marginLeft: `${(level - 1) * 16}px`,
                  borderLeft: parentHasMoreSiblings ? "1px solid" : "none",
                  borderColor: "rgb(156 163 175)",
                }}
              />
            )} */}

            {/* Folder Item */}
            <div
              className={`flex items-center py-1 cursor-pointer rounded-md transition-colors ${activeFolderId === folder.id
                ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                } ${level > 0 ? "pl-4" : ""}`}
              onClick={() => handleFolderClick(folder)}
              style={{
                marginLeft: `${level * 16 + 8}px`,
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
                  <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""
                    }`} />
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
                  <FolderOpen className="w-4 h-4 text-blue-500" />
                ) : (
                  <FolderIcon className="w-4 h-4 text-blue-500" />
                )}
              </div>

              {/* Folder Name */}
              <span
                className={`flex-1 text-gray-900 dark:text-gray-100 truncate ${activeFolderId === folder.id
                  ? "font-semibold text-blue-600 dark:text-blue-300"
                  : ""
                  }`}
              >
                {folder.name}
              </span>
            </div>

            {/* Subfolders */}
            {isExpanded && hasSubfolders && (
              <div
                className={` ${activeFolderId === folder.id
                  ? "border-blue-400/60 dark:border-blue-500/60"
                  : "border-gray-200 dark:border-gray-700"
                  } pl-3 mt-2 space-y-1`}
              >
                <FolderTree
                  folders={
                    folder.children!.filter(
                      (child) => child.type === "folder"
                    ) as Folder[]
                  }
                  onFolderClick={onFolderClick}
                  level={level + 1}
                  parentHasMoreSiblings={hasMoreSiblings}
                  activeFolderId={activeFolderId}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
