import { BlobServiceClient, BlobSASPermissions } from '@azure/storage-blob';
import { BlobStorageService, UploadResult, FileMetadata, PresignedUrlResponse } from './types';

export class AzureStorageService implements BlobStorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(config: {
    connectionString: string;
    containerName: string;
  }) {
    this.blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionString);
    this.containerName = config.containerName;
  }

  async uploadFile(
    file: File,
    folderId: string,
    fileName: string
  ): Promise<UploadResult> {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate blob name with folder structure
      const blobName = `${folderId}/${fileName}`;

      // Get container client
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      // Ensure container exists
      await containerClient.createIfNotExists({
        access: 'blob', // Public read access
      });

      // Get block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload file
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: file.type || 'application/octet-stream',
        },
      });

      // Generate public URL
      const publicUrl = blockBlobClient.url;

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
        storageProvider: 'azure',
        storageKey: blobName,
      };

      return {
        success: true,
        fileName: file.name,
        url: publicUrl,
        key: blobName,
        metadata: fileMetadata,
      };
    } catch (error) {
      console.error('Azure Blob Storage upload error:', error);
      return {
        success: false,
        fileName: file.name,
        error: 'Failed to upload file to Azure Blob Storage',
      };
    }
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(key);
      
      await blockBlobClient.delete();
      return true;
    } catch (error) {
      console.error('Azure Blob Storage delete error:', error);
      return false;
    }
  }

  async getFileUrl(key: string): Promise<string> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(key);
    return blockBlobClient.url;
  }

  async generatePresignedUrl(
    fileName: string,
    folderId: string,
    fileSize: number,
    contentType: string,
    expiresIn: number = 3600 // Default to 1 hour
  ): Promise<PresignedUrlResponse> {
    try {
      // Generate blob name with folder structure
      const blobName = `${folderId}/${fileName}`;
      
      // Get container client
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      
      // Ensure container exists
      await containerClient.createIfNotExists({
        access: 'blob', // Public read access
      });

      // Get block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Generate SAS token for upload
      const startsOn = new Date();
      const expiresOn = new Date(startsOn.getTime() + expiresIn * 1000);
      
      // Create SAS permissions for read and write
      const sasPermissions = new BlobSASPermissions();
      sasPermissions.read = true;
      sasPermissions.write = true;
      
      // Generate SAS token with write permissions
      const sasToken = await blockBlobClient.generateSasUrl({
        permissions: sasPermissions,
        expiresOn,
        startsOn,
      });

      // For Azure, the SAS token is already a full URL, so we return it directly
      return {
        uploadUrl: sasToken,
        fileKey: blobName,
        expiresAt: expiresOn.toISOString(),
      };
    } catch (error) {
      console.error('Azure Blob Storage presigned URL generation error:', error);
      throw new Error('Failed to generate presigned URL for Azure Blob Storage');
    }
  }
}
