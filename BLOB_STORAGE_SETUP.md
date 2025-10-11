# Blob Storage Setup Guide

This document explains how to configure and use blob storage services (Cloudflare R2, Azure Blob Storage, Google Cloud Storage) for file uploads in the DMS application.

## Overview

The application now supports uploading files to various blob storage providers instead of storing them locally. This provides better scalability, reliability, and cost-effectiveness for file storage.

## Supported Providers

1. **Cloudflare R2** - S3-compatible object storage
2. **Azure Blob Storage** - Microsoft's object storage solution
3. **Google Cloud Storage** - Google's object storage service

## Configuration

### Environment Variables

Copy the `.env.example` file to `.env.local` and configure the variables for your chosen provider:

```bash
cp .env.example .env.local
```

### Provider-Specific Setup

#### Cloudflare R2

1. **Create an R2 bucket** in your Cloudflare dashboard
2. **Generate API credentials**:
   - Go to R2 → Manage R2 API Tokens
   - Create a new token with read/write permissions
3. **Configure environment variables**:

```env
BLOB_STORAGE_PROVIDER=cloudflare
BLOB_STORAGE_BUCKET_NAME=your-bucket-name
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_SECRET_ACCESS_KEY=your-secret-access-key
```

#### Azure Blob Storage

1. **Create a Storage Account** in Azure Portal
2. **Create a Container** within the storage account
3. **Get connection string** or account credentials:
   - **Option 1 (Recommended)**: Use connection string
   - **Option 2**: Use account name + key
4. **Configure environment variables**:

```env
# Option 1: Connection String
BLOB_STORAGE_PROVIDER=azure
BLOB_STORAGE_BUCKET_NAME=your-container-name
AZURE_STORAGE_CONNECTION_STRING=your-connection-string

# Option 2: Account Name + Key
BLOB_STORAGE_PROVIDER=azure
BLOB_STORAGE_BUCKET_NAME=your-container-name
AZURE_STORAGE_ACCOUNT_NAME=your-account-name
AZURE_STORAGE_ACCOUNT_KEY=your-account-key
```

#### Google Cloud Storage

1. **Create a project** in Google Cloud Console
2. **Enable Cloud Storage API**
3. **Create a service account** with Storage Admin role
4. **Generate and download JSON key** for the service account
5. **Configure environment variables**:

```env
BLOB_STORAGE_PROVIDER=gcp
BLOB_STORAGE_BUCKET_NAME=your-bucket-name
GCP_PROJECT_ID=your-project-id
GCP_CLIENT_EMAIL=your-service-account-email
GCP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**Note**: For GCP_PRIVATE_KEY, you need to copy the entire private key from the JSON file and replace newlines with `\n`.

## Architecture

### File Structure

```
lib/blob-storage/
├── types.ts           # Interfaces and type definitions
├── factory.ts         # Service factory for creating storage instances
├── config.ts          # Configuration management
├── cloudflare-storage.ts  # Cloudflare R2 implementation
├── azure-storage.ts       # Azure Blob Storage implementation
└── gcp-storage.ts         # Google Cloud Storage implementation
```

### Key Components

1. **BlobStorageService Interface**: Common interface for all storage providers
2. **BlobStorageFactory**: Creates appropriate storage service based on configuration
3. **Configuration Management**: Loads and validates environment variables
4. **File Metadata**: Extended to include storage provider information

### Upload Flow

1. Client sends file upload request to `/api/upload`
2. Server validates configuration and creates appropriate storage service
3. File is uploaded to the configured blob storage provider
4. File metadata is returned with public URL and storage information

## File Metadata

Uploaded files now include additional metadata:

```typescript
{
  id: string;
  name: string;
  originalName: string;
  fileName: string;
  type: string;
  size: number;
  mimeType: string;
  extension: string;
  folderId: string;
  url: string;           // Public URL to access the file
  createdAt: string;
  updatedAt: string;
  storageProvider?: string;  // 'cloudflare', 'azure', or 'gcp'
  storageKey?: string;       // Storage provider's key/path for the file
}
```

## Error Handling

The system includes comprehensive error handling:

- Configuration validation errors
- Provider-specific upload errors
- File size validation (10MB limit)
- Network and authentication errors

## Migration from Local Storage

If you're migrating from the previous local file storage:

1. Configure your blob storage provider as described above
2. The upload API will automatically use the configured provider
3. Existing local files will remain in the `uploads/` directory
4. New uploads will go to the configured blob storage

## Testing

To test the blob storage integration:

1. Configure your environment variables
2. Start the development server: `npm run dev`
3. Use the file upload functionality in the application
4. Check that files are uploaded to your blob storage provider
5. Verify that file URLs are accessible

## Troubleshooting

### Common Issues

1. **Missing environment variables**: Ensure all required variables are set
2. **Authentication errors**: Verify credentials and permissions
3. **Bucket/container not found**: Ensure the bucket/container exists
4. **Network connectivity**: Check firewall and network settings

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` to see detailed error messages and upload progress.

## Security Considerations

- Ensure your blob storage buckets/containers have appropriate access controls
- Use environment variables for sensitive credentials
- Consider implementing signed URLs for private file access
- Regularly rotate access keys and credentials
