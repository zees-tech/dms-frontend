"use client";

import { useState, useEffect, useCallback } from "react";

import { Plus, Upload } from 'lucide-react';
import FolderTree from "@/components/documents/FolderTree";
import FolderView from "@/components/documents/FolderView";
import FilePreview from "@/components/documents/FilePreview";
import Breadcrumb from "@/components/documents/Breadcrumb";
import CreateFolderModal from "@/components/documents/CreateFolderModal";
import FileUploadDrawer from "@/components/documents/FileUploadDrawer";
import ToastContainer from "@/components/ui/ToastContainer";
import { Folder, File } from "@/types/file-system";
import { useToast } from "@/hooks/useToast";
import { getFolders, createFolder } from "@/apiComponent/graphql/folder";
import { getFiles } from "@/apiComponent/graphql/file";
import { smartDownloadFile, getPresignedDownloadUrl } from "@/apiComponent/rest/fileDownload";
import { useStoredLoginResponse } from "@/hooks/useStoredLoginResponse";
import { hasPermission } from "@/apiComponent/graphql/permission";

// Create a root folder structure
const createRootFolder = (): Folder => ({
  id: 'root',
  name: 'Documents',
  type: 'folder',
  path: '/',
  parentId: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  children: [],
});

export default function DocumentsPage() {
  const [fileSystem, setFileSystem] = useState<Folder>(createRootFolder());
  const [currentFolder, setCurrentFolder] = useState<Folder>(createRootFolder());
  const [breadcrumb, setBreadcrumb] = useState<Folder[]>([createRootFolder()]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [HasUpdatePermission, setHasUpdatePermission] = useState(false);

  const [, setLoading] = useState(true);
  const { pushToast } = useToast();
  const { storedResponse } = useStoredLoginResponse();

  // Check if user role is 'user' to hide Add Folder and Upload buttons
  const isUserRole = storedResponse?.user?.role === 'user';

  // Fetch folders data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch folders only - files will be fetched when folders are selected
        const foldersResult = await getFolders();
        if (foldersResult.error) {
          throw new Error(foldersResult.error.message);
        }

        // Transform API data to match our file system structure
        const apiFolders = foldersResult.data?.folders?.items || [];

        // Build the folder tree structure without files initially
        const buildFolderTree = (folders: typeof apiFolders): Folder => {
          const rootFolder = createRootFolder();

          // Add folders to the root
          const folderMap = new Map<string, Folder>();
          folderMap.set('root', rootFolder);

          // First pass: create all folders
          apiFolders.forEach(folder => {
            const folderNode: Folder = {
              id: folder.id,
              name: folder.name,
              type: 'folder',
              path: `/${folder.name}`,
              parentId: folder.parentId || 'root',
              createdAt: folder.createdAt,
              updatedAt: folder.updatedAt,
              children: [],
            };
            folderMap.set(folder.id, folderNode);
          });

          // Second pass: build hierarchy
          apiFolders.forEach(folder => {
            const parentId = folder.parentId || 'root';
            const parent = folderMap.get(parentId);
            const current = folderMap.get(folder.id);

            if (parent && current) {
              if (!parent.children) parent.children = [];
              parent.children.push(current);
            }
          });

          return rootFolder;
        };

        const newFileSystem = buildFolderTree(apiFolders);
        setFileSystem(newFileSystem);
        setCurrentFolder(newFileSystem);
        setBreadcrumb([newFileSystem]);

      } catch (error) {
        console.error('Error fetching data:', error);
        pushToast({
          message: 'Failed to load documents',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pushToast]);

  const fetchFolderPermissions = async (folderId: string) => {
    try {
      setLoading(true);
      const updatePermission = await hasPermission(
        folderId,
        'update'
      );
      setHasUpdatePermission(updatePermission);
    } catch (error) {
      console.error('Error checking folder permissions:', error);
      pushToast({
        message: 'Failed to verify folder permissions',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }




  const handleFolderClick = async (folder: Folder) => {
    try {
      setLoading(true);

      // Only fetch files if this is a real folder (not the root)
      if (folder.id !== 'root') {
        await fetchFolderPermissions(folder.id);
        const filesResult = await getFiles(folder.id);
        if (filesResult.error) {
          throw new Error(filesResult.error.message);
        }

        const apiFiles = filesResult.data?.files?.items || [];

        // Update the folder with files
        const updatedFolder: Folder = {
          ...folder,
          children: [
            ...(folder.children || []).filter(child => child.type === 'folder'),
            ...apiFiles.map(file => ({
              id: file.id,
              name: file.name,
              type: 'file' as const,
              size: file.size || 0,
              mimeType: file.mimeType || 'application/octet-stream',
              extension: file.name.split('.').pop() || '',
              folderId: folder.id,
              createdAt: file.createdAt,
              updatedAt: file.updatedAt,
              url: '', // Will be generated when needed
            }))
          ]
        };

        // Update the file system with the folder containing files
        const updatedFileSystem = updateFolder(fileSystem, updatedFolder);
        setFileSystem(updatedFileSystem);
        setCurrentFolder(updatedFolder);
      } else {
        // For root folder, just set it without files
        setCurrentFolder(folder);
      }

      // Update breadcrumb - find the path to this folder
      const newBreadcrumb: Folder[] = [];
      let current: Folder | null = folder;

      while (current) {
        newBreadcrumb.unshift(current);
        // Find parent in the file system
        if (current.parentId) {
          current = findFolderById(fileSystem, current.parentId);
        } else {
          current = null;
        }
      }

      setBreadcrumb(newBreadcrumb);

    } catch (error) {
      console.error('Error fetching folder files:', error);
      pushToast({
        message: 'Failed to load folder contents',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBreadcrumbClick = async (folder: Folder) => {
    try {
      setLoading(true);

      // Only fetch files if this is a real folder (not the root)
      if (folder.id !== 'root') {
        const filesResult = await getFiles(folder.id);
        if (filesResult.error) {
          throw new Error(filesResult.error.message);
        }

        const apiFiles = filesResult.data?.files?.items || [];

        // Update the folder with files
        const updatedFolder: Folder = {
          ...folder,
          children: [
            ...(folder.children || []).filter(child => child.type === 'folder'),
            ...apiFiles.map(file => ({
              id: file.id,
              name: file.name,
              type: 'file' as const,
              size: file.size || 0,
              mimeType: file.mimeType || 'application/octet-stream',
              extension: file.name.split('.').pop() || '',
              folderId: folder.id,
              createdAt: file.createdAt,
              updatedAt: file.updatedAt,
              url: '', // Will be generated when needed
            }))
          ]
        };

        // Update the file system with the folder containing files
        const updatedFileSystem = updateFolder(fileSystem, updatedFolder);
        setFileSystem(updatedFileSystem);
        setCurrentFolder(updatedFolder);
      } else {
        // For root folder, just set it without files
        setCurrentFolder(folder);
      }

      const folderIndex = breadcrumb.findIndex((f) => f.id === folder.id);
      setBreadcrumb(breadcrumb.slice(0, folderIndex + 1));

    } catch (error) {
      console.error('Error fetching folder files:', error);
      pushToast({
        message: 'Failed to load folder contents',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const findFolderById = (root: Folder, id: string): Folder | null => {
    if (root.id === id) return root;

    if (root.children) {
      for (const child of root.children) {
        if (child.type === "folder") {
          const found = findFolderById(child, id);
          if (found) return found;
        }
      }
    }

    return null;
  };

  const updateFolder = (root: Folder, updatedFolder: Folder): Folder => {
    if (root.id === updatedFolder.id) {
      return {
        ...updatedFolder,
        children: updatedFolder.children
          ? [...updatedFolder.children]
          : undefined,
      };
    }

    if (!root.children) return root;

    return {
      ...root,
      children: root.children.map((child) => {
        if (child.type === "file") return child;
        return updateFolder(child, updatedFolder);
      }),
    };
  };

  const upsertChild = (
    root: Folder,
    parentId: string,
    child: Folder | File
  ): Folder => {
    if (root.id === parentId) {
      const existingChildren = root.children ? [...root.children] : [];
      const childIndex = existingChildren.findIndex(
        (item) => item.id === child.id
      );

      if (childIndex > -1) {
        existingChildren[childIndex] = child;
      } else {
        existingChildren.push(child);
      }

      return {
        ...root,
        children: existingChildren,
      };
    }

    if (!root.children) return root;

    return {
      ...root,
      children: root.children.map((item) => {
        if (item.type === "file") return item;
        return upsertChild(item, parentId, child);
      }),
    };
  };

  const removeChild = (root: Folder, targetId: string): Folder => {
    if (!root.children) return root;

    const filteredChildren = root.children
      .filter((child) => child.id !== targetId)
      .map((child) => {
        if (child.type === "file") return child;
        return removeChild(child, targetId);
      });

    return {
      ...root,
      children: filteredChildren,
    };
  };

  const calculateFolderAndFileCounts = (
    folder: Folder
  ): { folderCount: number; fileCount: number; totalSize: number } => {
    let folderCount = 0;
    let fileCount = 0;
    let totalSize = 0;

    folder.children?.forEach((child) => {
      if (child.type === "folder") {
        folderCount += 1;
        const nestedCounts = calculateFolderAndFileCounts(child);
        folderCount += nestedCounts.folderCount;
        fileCount += nestedCounts.fileCount;
        totalSize += nestedCounts.totalSize;
      } else {
        fileCount += 1;
        totalSize += child.size;
      }
    });

    return { folderCount, fileCount, totalSize };
  };

  const mergeFolderUpdates = (
    root: Folder,
    targetId: string,
    updatedChildren: (Folder | File)[]
  ): Folder => {
    if (root.id === targetId) {
      return {
        ...root,
        children: updatedChildren,
        updatedAt: new Date().toISOString(),
      };
    }

    if (!root.children) return root;

    return {
      ...root,
      children: root.children.map((child) => {
        if (child.type === "file") return child;
        return mergeFolderUpdates(child, targetId, updatedChildren);
      }),
    };
  };



  const closeCreateFolder = () => setIsFolderModalOpen(false);
  const openUploadDrawer = () => setIsUploadDrawerOpen(true);
  const closeUploadDrawer = () => setIsUploadDrawerOpen(false);

  const handleFilePreview = async (file: File) => {
    try {
      // If file doesn't have a URL, try to get a presigned URL for preview
      let fileWithUrl = file;
      if (!file.url) {
        pushToast({
          message: 'Loading file preview...',
          type: 'info',
        });

        try {
          const presignedData = await getPresignedDownloadUrl(file.id);
          fileWithUrl = {
            ...file,
            url: presignedData.presignedUrl
          };
        } catch (error) {
          console.warn('Could not get presigned URL for preview:', error);
          pushToast({
            message: 'Preview URL unavailable, showing file details',
            type: 'warning',
          });
          // Continue with file without URL - preview will show "not available"
        }
      }

      setPreviewFile(fileWithUrl);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error('Error opening file preview:', error);
      pushToast({
        message: 'Failed to open file preview',
        type: 'error',
      });
    }
  };

  const closeFilePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

  const handleCreateFolder = async (name: string, parentId: string) => {
    try {
      // Call the createFolder API
      const result = await createFolder({
        name,
        parentId: parentId === 'root' ? null : parentId,
        description: '',
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (!result.data?.createFolder) {
        throw new Error('Failed to create folder');
      }

      const createdFolder = result.data.createFolder;

      // Create the folder object for our local state
      const newFolder: Folder = {
        id: createdFolder.id,
        name: createdFolder.name,
        type: 'folder',
        path: currentFolder.path === '/' ? `/${createdFolder.name}` : `${currentFolder.path}/${createdFolder.name}`,
        parentId: createdFolder.parentId || 'root',
        createdAt: createdFolder.createdAt,
        updatedAt: createdFolder.createdAt, // Use createdAt since updatedAt is not returned
        children: [],
      };

      // Update local state
      const updatedFileSystem = upsertChild(fileSystem, parentId, newFolder);
      setFileSystem(updatedFileSystem);

      // Update current folder if it's the parent
      if (currentFolder.id === parentId) {
        const updatedCurrentFolder = findFolderById(updatedFileSystem, parentId);
        if (updatedCurrentFolder) {
          setCurrentFolder(updatedCurrentFolder);
        }
      }

      pushToast({
        message: `Folder "${name}" created successfully`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error creating folder:', error);
      pushToast({
        message: `Failed to create folder "${name}"`,
        type: 'error',
      });
    }
  };

  const handleUploadFiles = async (files: FileList, folderId: string) => {
    try {
      setLoading(true);

      // Fetch files from backend API to get the actual uploaded files
      if (folderId !== 'root') {
        const filesResult = await getFiles(folderId);
        if (filesResult.error) {
          throw new Error(filesResult.error.message);
        }

        const apiFiles = filesResult.data?.files?.items || [];

        // Map API files to our File type
        const backendFiles: File[] = apiFiles.map(file => ({
          id: file.id,
          name: file.name,
          type: 'file' as const,
          size: file.size || 0,
          mimeType: file.mimeType || 'application/octet-stream',
          extension: file.name.split('.').pop() || '',
          folderId: folderId,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
          url: '', // Will be generated when needed
        }));

        // Update the folder with files from backend (replace all files, keep folders)
        const updatedFolder: Folder = {
          ...currentFolder,
          children: [
            ...(currentFolder.children || []).filter(child => child.type === 'folder'),
            ...backendFiles
          ]
        };

        // Update the file system with the folder containing files
        const updatedFileSystem = updateFolder(fileSystem, updatedFolder);
        setFileSystem(updatedFileSystem);
        setCurrentFolder(updatedFolder);

        pushToast({
          message: `Files refreshed successfully`,
          type: 'success',
        });
      } else {
        pushToast({
          message: `${files.length} file(s) uploaded successfully`,
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error refreshing files after upload:', error);
      pushToast({
        message: 'Files uploaded but failed to refresh file list',
        type: 'warning',
      });
    } finally {
      setLoading(false);
    }
  };



  const handleDownloadFile = async (fileId: string, fileName: string) => {
    try {
      // Show initial download toast
      pushToast({
        message: `Starting download: ${fileName}`,
        type: 'info',
      });

      await smartDownloadFile(fileId, fileName, {
        onProgress: (progress) => {
          // Log progress to console for debugging
          console.log(`Download progress: ${progress.percentage}% (${formatBytes(progress.loaded)}/${formatBytes(progress.total)})`);
        }
      });

      pushToast({
        message: `File "${fileName}" downloaded successfully`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      pushToast({
        message: `Failed to download file "${fileName}"`,
        type: 'error',
      });
    }
  };

  // Helper function to format bytes
  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const files = currentFolder.children?.filter(item => item.type === 'file') as File[] || [];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        {/* <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-300">
              <span
                className="inline-flex h-2 w-2 rounded-full bg-blue-500"
                aria-hidden
              />
              Smart workspace
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Documents
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl">
                Organize your documents effortlessly with nested folders,
                instant uploads, and modern controls.
              </p>
            </div>
          </div>

          <DocumentActionsPanel
            onCreateFolder={openCreateFolder}
            onUploadFiles={openUploadDrawer}
            stats={stats}
            currentFolderName={currentFolder.name}
          />
        </div> */}

        {/* Breadcrumb */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Breadcrumb
              items={breadcrumb}
              onItemClick={handleBreadcrumbClick}
            />
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span
                  className="inline-flex h-2 w-2 rounded-full bg-blue-500"
                  aria-hidden
                />
                Active folder:{" "}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {currentFolder.name}
                </span>
              </div>
              <div
                className="hidden sm:inline-flex h-4 w-px bg-gray-200 dark:bg-gray-700"
                aria-hidden
              />
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <span
                  className="inline-flex h-2 w-2 rounded-full bg-violet-500"
                  aria-hidden
                />
                {files.length} files
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        {/* <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur p-4">
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            totalResults={folders.length + files.length}
          />
        </div> */}

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6">
          {/* Folders Section */}
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Documents
                  </h2>
                </div>
                <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 p-4 max-h-[420px] overflow-y-auto shadow-inner">
                  <FolderTree
                    folders={[fileSystem]}
                    onFolderClick={handleFolderClick}
                    activeFolderId={currentFolder.id}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Files Section */}
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-violet-300 dark:hover:border-violet-600 transition-colors"
            >
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentFolder.name}
                  </h2>
                  {HasUpdatePermission && currentFolder.id !== 'root' && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={openUploadDrawer}
                        className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-600 dark:text-violet-300 transition-colors hover:bg-violet-500/20"
                        aria-label="Upload documents"
                      >
                        <Upload className="w-4 h-4" /> Upload
                      </button>
                    </div>
                  )}
                </div>
                <FolderView
                  folder={currentFolder}
                  onFolderClick={handleFolderClick}
                  onFilePreview={handleFilePreview}
                  onFileDownload={handleDownloadFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={closeCreateFolder}
        onCreateFolder={handleCreateFolder}
        currentFolder={currentFolder}
      />

      <FileUploadDrawer
        isOpen={isUploadDrawerOpen}
        onClose={closeUploadDrawer}
        onUploadFiles={handleUploadFiles}
        currentFolder={currentFolder}
      />

      {/* File Preview Modal */}
      <FilePreview
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={closeFilePreview}
        onDownload={handleDownloadFile}
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
}
