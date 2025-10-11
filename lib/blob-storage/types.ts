export interface BlobStorageConfig {
  provider: 'cloudflare' | 'azure' | 'gcp' | 'local';
  bucketName: string;
  region?: string;
  endpoint?: string;
  credentials: {
    accountId?: string; // Cloudflare
    accessKeyId?: string; // Cloudflare, AWS S3 compatible
    secretAccessKey?: string; // Cloudflare, AWS S3 compatible
    connectionString?: string; // Azure
    accountName?: string; // Azure
    accountKey?: string; // Azure
    projectId?: string; // GCP
    clientEmail?: string; // GCP
    privateKey?: string; // GCP
  };
}

export interface UploadResult {
  success: boolean;
  fileName: string;
  url?: string;
  key?: string;
  error?: string;
  metadata?: FileMetadata;
}

export interface FileMetadata {
  id: string;
  name: string;
  originalName: string;
  fileName: string;
  type: string;
  size: number;
  mimeType: string;
  extension: string;
  folderId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  storageProvider?: string;
  storageKey?: string;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresAt: string;
}

export interface BlobStorageService {
  uploadFile(
    file: File,
    folderId: string,
    fileName: string
  ): Promise<UploadResult>;
  
  deleteFile(key: string): Promise<boolean>;
  
  getFileUrl(key: string): Promise<string>;
  
  generatePresignedUrl(
    fileName: string,
    folderId: string,
    fileSize: number,
    contentType: string,
    expiresIn?: number
  ): Promise<PresignedUrlResponse>;
}
