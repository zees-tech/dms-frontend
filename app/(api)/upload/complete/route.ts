import { NextRequest, NextResponse } from "next/server";
import { BlobStorageFactory } from "../../../../lib/blob-storage/factory";
import {
  getBlobStorageConfig,
  validateBlobStorageConfig,
} from "../../../../lib/blob-storage/config";
import { createFile } from "../../../../apiComponent/graphql/file";
import { createServerClient } from "../../../../utils/client";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "") || "";
    const refresh_token = request.headers.get("refresh_token") || "";
    // Get blob storage configuration
    const blobConfig = getBlobStorageConfig();
    validateBlobStorageConfig(blobConfig);

    // Create blob storage service
    const blobService = BlobStorageFactory.createService(blobConfig);

    const body = await request.json();

    const { fileKey, originalFileName, fileSize, contentType, folderId, documentSettings } = body;

    // Validate required fields
    if (!fileKey) {
      return NextResponse.json(
        { error: "File key is required" },
        { status: 400 }
      );
    }

    if (!originalFileName) {
      return NextResponse.json(
        { error: "Original file name is required" },
        { status: 400 }
      );
    }

    if (!fileSize || fileSize <= 0) {
      return NextResponse.json(
        { error: "Valid file size is required" },
        { status: 400 }
      );
    }

    if (!folderId) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    // Generate public URL for the uploaded file
    const publicUrl = await blobService.getFileUrl(fileKey);
    console.log("Public URL:", publicUrl);
    // Call GraphQL mutation to create file record in database
    const createFileInput = {
      name: originalFileName,
      pathName: fileKey,
      description: originalFileName,
      contentUrl: publicUrl,
      parentId: folderId,
      size: fileSize,
      expiry: documentSettings?.expiry ? new Date(documentSettings?.expiry) : null,
      mimeType: contentType || "application/octet-stream",
    };
    const client = await createServerClient("graphql", token, refresh_token, "/api");
    const { data: createdFile, error } = await createFile(
      createFileInput,
      client
    );

    if (error) {
      throw new Error(`Failed to create file record: ${error.message}`);
    }

    if (!createdFile?.createFile) {
      throw new Error("Failed to create file record in database");
    }

    // Create file metadata response
    const fileMetadata = {
      id: createdFile.createFile.id,
      name: createdFile.createFile.name,
      originalName: originalFileName,
      fileName: fileKey.split("/").pop() || originalFileName,
      type: "file",
      size: createdFile.createFile.size,
      mimeType: createdFile.createFile.mimeType,
      extension: originalFileName.split(".").pop() || "",
      folderId: createdFile.createFile.parentId || folderId,
      url: publicUrl,
      createdAt: createdFile.createFile.createdAt,
      updatedAt: createdFile.createFile.updatedAt,
      storageProvider: blobConfig.provider,
      storageKey: fileKey,
    };

    return NextResponse.json({
      success: true,
      message: "File upload completed successfully",
      fileMetadata,
    });
  } catch (error) {
    console.error("Upload completion error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
