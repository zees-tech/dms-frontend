import { Storage } from '@google-cloud/storage';
import { BlobStorageService, UploadResult, FileMetadata, PresignedUrlResponse } from './types';

export class GCPStorageService implements BlobStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor(config: {
    projectId: string;
    credentials: {
      client_email: string;
      private_key: string;
    };
    bucketName: string;
  }) {
    this.storage = new Storage({
      projectId: config.projectId,
      credentials: config.credentials,
    });
    this.bucketName = config.bucketName;
  }

  async uploadFile(
    file: File,
    folderId: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate storage key with folder structure
      const storageKey = `${folderId}/${fileName}`;

      // Get bucket
      const bucket = this.storage.bucket(this.bucketName);

      // Create file object
      const gcsFile = bucket.file(storageKey);

      // Upload file
      await gcsFile.save(buffer, {
        metadata: {
          contentType: file.type || 'application/octet-stream',
        },
      });

      // Make file publicly accessible
      await gcsFile.makePublic();

      // Generate public URL
      const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${storageKey}`;

      const fileMetadata: FileMetadata = {
        id: Math.random().toString(36).substring(2, 11),
        name: file.name.replace(/\.[^/.]+$/, ""),
        originalName: file.name,
        fileName: fileName,
        type: 'file',
        size: file.size,
        mimeType: file.type || 'application/octet-stream',
        extension: file.name.split('.').pop() || '',
        folderId: folderId,
        url: publicUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        storageProvider: 'gcp',
        storageKey: storageKey,
      };

      return {
        success: true,
        fileName: file.name,
        url: publicUrl,
        key: storageKey,
        metadata: fileMetadata,
      };
    } catch (error) {
      console.error('GCP Storage upload error:', error);
      return {
        success: false,
        fileName: file.name,
        error: 'Failed to upload file to Google Cloud Storage',
      };
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const bucket = this.storage.bucket(this.bucketName);
      const file = bucket.file(key);
      
      await file.delete();
      return true;
    } catch (error) {
      console.error('GCP Storage delete error:', error);
      return false;
    }
  }

  async getFileUrl(key: string): Promise<string> {
    return `https://storage.googleapis.com/${this.bucketName}/${key}`;
  }

  async generatePresignedUrl(
    fileName: string,
    folderId: string,
    fileSize: number,
    contentType: string,
    expiresIn: number = 3600 // Default to 1 hour
  ): Promise<PresignedUrlResponse> {
    try {
      // Generate storage key with folder structure
      const storageKey = `${folderId}/${fileName}`;
      
      // Get bucket
      const bucket = this.storage.bucket(this.bucketName);
      
      // Get file object
      const file = bucket.file(storageKey);
      
      // Generate signed URL for upload
      const [signedUrl] = await file.getSignedUrl({
        version: 'v4',
        action: 'write',
        expires: Date.now() + expiresIn * 1000,
        contentType: contentType || 'application/octet-stream',
      });

      return {
        uploadUrl: signedUrl,
        fileKey: storageKey,
        expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
      };
    } catch (error) {
      console.error('GCP Storage presigned URL generation error:', error);
      throw new Error('Failed to generate presigned URL for Google Cloud Storage');
    }
  }
}
