export interface Folder {
  id: string;
  name: string;
  type: 'folder';
  path: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  children?: (Folder | File)[];
  color?: string;
  description?: string;
  isStarred?: boolean;
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
  tags?: string[];
  description?: string;
  isStarred?: boolean;
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
      color: '#3B82F6',
      children: [
        {
          id: 'subfolder1',
          name: 'Web Development',
          type: 'folder',
          path: '/Projects/Web Development',
          parentId: 'folder1',
          createdAt: '2024-01-08T00:00:00Z',
          updatedAt: '2024-01-08T00:00:00Z',
          color: '#10B981',
          children: [
            {
              id: 'file1',
              name: 'project-plan',
              type: 'file',
              size: 1024000,
              mimeType: 'application/pdf',
              extension: 'pdf',
              folderId: 'subfolder1',
              createdAt: '2024-01-03T00:00:00Z',
              updatedAt: '2024-01-03T00:00:00Z',
              tags: ['planning', 'important'],
            },
            {
              id: 'file2',
              name: 'requirements',
              type: 'file',
              size: 2048000,
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              extension: 'docx',
              folderId: 'subfolder1',
              createdAt: '2024-01-04T00:00:00Z',
              updatedAt: '2024-01-04T00:00:00Z',
              tags: ['documentation'],
            }
          ]
        },
        {
          id: 'subfolder2',
          name: 'Mobile Apps',
          type: 'folder',
          path: '/Projects/Mobile Apps',
          parentId: 'folder1',
          createdAt: '2024-01-09T00:00:00Z',
          updatedAt: '2024-01-09T00:00:00Z',
          color: '#8B5CF6',
          children: [
            {
              id: 'file5',
              name: 'app-mockups',
              type: 'file',
              size: 5120000,
              mimeType: 'image/png',
              extension: 'png',
              folderId: 'subfolder2',
              createdAt: '2024-01-10T00:00:00Z',
              updatedAt: '2024-01-10T00:00:00Z',
              tags: ['design', 'mockup'],
            }
          ]
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
      color: '#F59E0B',
      children: [
        {
          id: 'subfolder3',
          name: '2024',
          type: 'folder',
          path: '/Reports/2024',
          parentId: 'folder2',
          createdAt: '2024-01-11T00:00:00Z',
          updatedAt: '2024-01-11T00:00:00Z',
          children: [
            {
              id: 'file3',
              name: 'monthly-report-january',
              type: 'file',
              size: 1536000,
              mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              extension: 'xlsx',
              folderId: 'subfolder3',
              createdAt: '2024-01-06T00:00:00Z',
              updatedAt: '2024-01-06T00:00:00Z',
              tags: ['report', 'monthly'],
            },
            {
              id: 'file6',
              name: 'quarterly-summary',
              type: 'file',
              size: 3072000,
              mimeType: 'application/pdf',
              extension: 'pdf',
              folderId: 'subfolder3',
              createdAt: '2024-01-12T00:00:00Z',
              updatedAt: '2024-01-12T00:00:00Z',
              tags: ['report', 'quarterly'],
              isStarred: true,
            }
          ]
        }
      ]
    },
    {
      id: 'folder3',
      name: 'Media',
      type: 'folder',
      path: '/Media',
      parentId: 'root',
      createdAt: '2024-01-13T00:00:00Z',
      updatedAt: '2024-01-13T00:00:00Z',
      color: '#EF4444',
      children: [
        {
          id: 'file7',
          name: 'presentation-video',
          type: 'file',
          size: 15728640, // 15MB
          mimeType: 'video/mp4',
          extension: 'mp4',
          folderId: 'folder3',
          createdAt: '2024-01-14T00:00:00Z',
          updatedAt: '2024-01-14T00:00:00Z',
          tags: ['video', 'presentation'],
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
      tags: ['documentation'],
    }
  ]
};
