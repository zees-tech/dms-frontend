import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BlobStorageService, UploadResult, FileMetadata, PresignedUrlResponse } from './types';

export class CloudflareStorageService implements BlobStorageService {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(config: {
    accountId: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  }) {
    this.bucketName = config.bucketName;
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  async uploadFile(
    file: File,
    folderId: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate storage key
      const storageKey = `${folderId}/${fileName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: storageKey,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
        ContentLength: file.size,
      });

      await this.s3Client.send(command);

      // Generate public URL (Cloudflare R2 public URL format)
      const endpoint = this.s3Client.config.endpoint?.toString() || '';
      const publicUrl = `https://pub-${this.bucketName}.${endpoint.replace('https://', '')}/${storageKey}`;

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
        storageProvider: 'cloudflare',
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
      console.error('Cloudflare R2 upload error:', error);
      return {
        success: false,
        fileName: file.name,
        error: 'Failed to upload file to Cloudflare R2',
      };
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      console.error('Cloudflare R2 delete error:', error);
      return false;
    }
  }

  async getFileUrl(key: string): Promise<string> {
    const endpoint = this.s3Client.config.endpoint?.toString() || '';
    return `https://pub-${this.bucketName}.${endpoint.replace('https://', '')}/${key}`;
  }

  async generatePresignedUrl(
    fileName: string,
    folderId: string,
    fileSize: number,
    contentType: string,
    expiresIn: number = 3600 // Default 1 hour
  ): Promise<PresignedUrlResponse> {
    try {
      // Generate unique file key
      const timestamp = Date.now();
      const fileExtension = fileName.split('.').pop() || '';
      const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
      const fileKey = `${folderId}/${uniqueFileName}`;

      // Create PutObject command
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: contentType,
        ContentLength: fileSize,
      });

      // Generate pre-signed URL
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: expiresIn,
      });

      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      return {
        uploadUrl,
        fileKey,
        expiresAt,
      };
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      throw new Error('Failed to generate pre-signed URL');
    }
  }
}
