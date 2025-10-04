export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  path: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children?: (Folder | File)[];
}

export interface File {
  id: string;
  name: string;
  type: 'file';
  size: number;
  mimeType: string;
  extension: string;
  folderId: string;
  createdAt: string;
  updatedAt: string;
  url?: string;
}

export type FileSystemItem = Folder | File;

// Mock data for development
export const mockFileSystem: Folder = {
  id: 'root',
  name: 'Documents',
  type: 'folder',
  path: '/',
  parentId: null,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  children: [
    {
      id: 'folder1',
      name: 'Projects',
      type: 'folder',
      path: '/Projects',
      parentId: 'root',
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      children: [
        {
          id: 'file1',
          name: 'project-plan',
          type: 'file',
          size: 1024,
          mimeType: 'application/pdf',
          extension: 'pdf',
          folderId: 'folder1',
          createdAt: '2024-01-03T00:00:00Z',
          updatedAt: '2024-01-03T00:00:00Z',
        },
        {
          id: 'file2',
          name: 'requirements',
          type: 'file',
          size: 2048,
          mimeType: 'application/vnd.ms-word',
          extension: 'docx',
          folderId: 'folder1',
          createdAt: '2024-01-04T00:00:00Z',
          updatedAt: '2024-01-04T00:00:00Z',
        }
      ]
    },
    {
      id: 'folder2',
      name: 'Reports',
      type: 'folder',
      path: '/Reports',
      parentId: 'root',
      createdAt: '2024-01-05T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z',
      children: [
        {
          id: 'file3',
          name: 'monthly-report',
          type: 'file',
          size: 1536,
          mimeType: 'application/vnd.ms-excel',
          extension: 'xlsx',
          folderId: 'folder2',
          createdAt: '2024-01-06T00:00:00Z',
          updatedAt: '2024-01-06T00:00:00Z',
        }
      ]
    },
    {
      id: 'file4',
      name: 'readme',
      type: 'file',
      size: 512,
      mimeType: 'text/plain',
      extension: 'txt',
      folderId: 'root',
      createdAt: '2024-01-07T00:00:00Z',
      updatedAt: '2024-01-07T00:00:00Z',
    }
  ]
};
