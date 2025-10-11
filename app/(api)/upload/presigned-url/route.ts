import { NextRequest, NextResponse } from 'next/server';
import { BlobStorageFactory } from '../../../../lib/blob-storage/factory';
import { getBlobStorageConfig, validateBlobStorageConfig } from '../../../../lib/blob-storage/config';

export async function POST(request: NextRequest) {
  try {
    // Get blob storage configuration
    const blobConfig = getBlobStorageConfig();
    validateBlobStorageConfig(blobConfig);
    
    // Create blob storage service
    const blobService = BlobStorageFactory.createService(blobConfig);

    const body = await request.json();
    
    const { fileName, folderId, fileSize, contentType } = body;

    // Validate required fields
    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 }
      );
    }

    if (!folderId) {
      return NextResponse.json(
        { error: 'Folder ID is required' },
        { status: 400 }
      );
    }

    if (!fileSize || fileSize <= 0) {
      return NextResponse.json(
        { error: 'Valid file size is required' },
        { status: 400 }
      );
    }

    if (!contentType) {
      return NextResponse.json(
        { error: 'Content type is required' },
        { status: 400 }
      );
    }

    // Generate pre-signed URL
    const presignedUrlResponse = await blobService.generatePresignedUrl(
      fileName,
      folderId,
      fileSize,
      contentType,
      3600 // 1 hour expiration
    );

    return NextResponse.json(presignedUrlResponse);

  } catch (error) {
    console.error('Pre-signed URL generation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
