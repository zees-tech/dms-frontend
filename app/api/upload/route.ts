import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Define the upload directory
const UPLOAD_DIR = join(process.cwd(), 'uploads');

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    await ensureUploadDir();

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const folderId = formData.get('folderId') as string;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    if (!folderId) {
      return NextResponse.json(
        { error: 'No folder ID provided' },
        { status: 400 }
      );
    }

    const uploadResults = [];

    for (const file of files) {
      try {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          uploadResults.push({
            fileName: file.name,
            success: false,
            error: 'File size exceeds 10MB limit',
          });
          continue;
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop() || '';
        const uniqueFileName = `${timestamp}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
        
        // Create folder-specific directory
        const folderDir = join(UPLOAD_DIR, folderId);
        if (!existsSync(folderDir)) {
          await mkdir(folderDir, { recursive: true });
        }

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = join(folderDir, uniqueFileName);
        
        await writeFile(filePath, buffer);

        // Create file metadata
        const fileMetadata = {
          id: Math.random().toString(36).substring(2, 11),
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          originalName: file.name,
          fileName: uniqueFileName,
          type: 'file',
          size: file.size,
          mimeType: file.type || 'application/octet-stream',
          extension: fileExtension,
          folderId: folderId,
          url: `/api/files/${folderId}/${uniqueFileName}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        uploadResults.push({
          fileName: file.name,
          success: true,
          fileMetadata,
        });

      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: 'Failed to upload file',
        });
      }
    }

    // Check if any files were successfully uploaded
    const successfulUploads = uploadResults.filter(result => result.success);
    
    if (successfulUploads.length === 0) {
      return NextResponse.json(
        { 
          error: 'All files failed to upload',
          details: uploadResults 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `${successfulUploads.length} file(s) uploaded successfully`,
      uploadedFiles: successfulUploads.map(result => result.fileMetadata),
      failedFiles: uploadResults.filter(result => !result.success),
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
