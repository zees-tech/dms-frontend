import { BlobStorageService, BlobStorageConfig } from './types';
import { CloudflareStorageService } from './cloudflare-storage';
import { AzureStorageService } from './azure-storage';
import { GCPStorageService } from './gcp-storage';

export class BlobStorageFactory {
  static createService(config: BlobStorageConfig): BlobStorageService {
    switch (config.provider) {
      case 'cloudflare':
        if (!config.credentials.accountId || !config.credentials.accessKeyId || !config.credentials.secretAccessKey) {
          throw new Error('Missing required Cloudflare R2 credentials');
        }
        return new CloudflareStorageService({
          accountId: config.credentials.accountId,
          accessKeyId: config.credentials.accessKeyId,
          secretAccessKey: config.credentials.secretAccessKey,
          bucketName: config.bucketName,
        });

      case 'azure':
        if (!config.credentials.connectionString) {
          throw new Error('Missing required Azure Blob Storage connection string');
        }
        return new AzureStorageService({
          connectionString: config.credentials.connectionString,
          containerName: config.bucketName,
        });

      case 'gcp':
        if (!config.credentials.clientEmail || !config.credentials.privateKey || !config.credentials.projectId) {
          throw new Error('Missing required GCP credentials');
        }
        return new GCPStorageService({
          projectId: config.credentials.projectId!,
          credentials: {
            client_email: config.credentials.clientEmail,
            private_key: config.credentials.privateKey,
          },
          bucketName: config.bucketName,
        });

      default:
        throw new Error(`Unsupported blob storage provider: ${config.provider}`);
    }
  }
}
