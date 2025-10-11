import { BlobStorageConfig } from './types';

export function getBlobStorageConfig(): BlobStorageConfig {
  const provider = process.env.BLOB_STORAGE_PROVIDER as 'cloudflare' | 'azure' | 'gcp' | 'local';
  
  if (!provider) {
    throw new Error('BLOB_STORAGE_PROVIDER environment variable is required');
  }

  const baseConfig = {
    provider,
    bucketName: process.env.BLOB_STORAGE_BUCKET_NAME || 'dms-files',
  };

  switch (provider) {
    case 'cloudflare':
      return {
        ...baseConfig,
        credentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
          accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
          secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
        },
      };

    case 'azure':
      return {
        ...baseConfig,
        credentials: {
          connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
          accountName: process.env.AZURE_STORAGE_ACCOUNT_NAME,
          accountKey: process.env.AZURE_STORAGE_ACCOUNT_KEY,
        },
      };

    case 'gcp':
      return {
        ...baseConfig,
        credentials: {
          projectId: process.env.GCP_PROJECT_ID,
          clientEmail: process.env.GCP_CLIENT_EMAIL,
          privateKey: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle newlines in env vars
        },
      };

    default:
      throw new Error(`Unsupported blob storage provider: ${provider}`);
  }
}

export function validateBlobStorageConfig(config: BlobStorageConfig): void {
  switch (config.provider) {
    case 'cloudflare':
      if (!config.credentials.accountId || !config.credentials.accessKeyId || !config.credentials.secretAccessKey) {
        throw new Error('Missing required Cloudflare R2 credentials');
      }
      break;

    case 'azure':
      if (!config.credentials.connectionString && (!config.credentials.accountName || !config.credentials.accountKey)) {
        throw new Error('Missing required Azure Blob Storage credentials (either connection string or account name + key)');
      }
      break;

    case 'gcp':
      if (!config.credentials.projectId || !config.credentials.clientEmail || !config.credentials.privateKey) {
        throw new Error('Missing required GCP credentials');
      }
      break;

    default:
      throw new Error(`Unsupported blob storage provider: ${config.provider}`);
  }
}
