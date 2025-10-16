import { NextRequest, NextResponse } from "next/server";
import { BlobStorageFactory } from "../../../lib/blob-storage/factory";
import {
  getBlobStorageConfig,
  validateBlobStorageConfig,
} from "../../../lib/blob-storage/config";
import { createFile } from "../../../apiComponent/graphql/file";
import { createServerClient } from "../../../utils/client";

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "") || "";
    const refresh_token = request.headers.get("refresh_token") || "";
    console.log("Tokens: 52", { token, refresh_token });
    // Get blob storage configuration
    const blobConfig = getBlobStorageConfig();
    validateBlobStorageConfig(blobConfig);
    console.log("Blob Storage Config:", blobConfig);
    // Create blob storage service
    const blobService = BlobStorageFactory.createService(blobConfig);

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const folderId = formData.get("folderId") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (!folderId) {
      return NextResponse.json(
        { error: "No folder ID provided" },
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
            error: "File size exceeds 10MB limit",
          });
          continue;
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileExtension = file.name.split(".").pop() || "";
        const uniqueFileName = `${timestamp}-${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExtension}`;

        // Upload file to blob storage
        const uploadResult = await blobService.uploadFile(
          file,
          folderId,
          uniqueFileName
        );

        if (uploadResult.success && uploadResult.metadata) {
          // Generate public URL for the uploaded file
          const publicUrl = await blobService.getFileUrl(
            uploadResult.metadata.storageKey || uniqueFileName
          );

          // Call GraphQL mutation to create file record in database
          const createFileInput = {
            name: file.name,
            description: file.name,
            contentUrl: publicUrl,
            parentId: folderId,
            size: file.size,
            mimeType: file.type || "application/octet-stream",
            pathName: file.name, // Use the original file name as pathName
          };

          const { data: createdFile, error } = await createFile(
            createFileInput,
            await createServerClient("graphql", token, refresh_token, "/api")
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
            originalName: file.name,
            fileName: uniqueFileName,
            type: "file",
            size: createdFile.createFile.size,
            mimeType: createdFile.createFile.mimeType,
            extension: file.name.split(".").pop() || "",
            folderId: createdFile.createFile.parentId || folderId,
            url: publicUrl,
            createdAt: createdFile.createFile.createdAt,
            updatedAt: createdFile.createFile.updatedAt,
            storageProvider: blobConfig.provider,
            storageKey: uploadResult.metadata.storageKey || uniqueFileName,
          };

          uploadResults.push({
            fileName: file.name,
            success: true,
            fileMetadata,
          });
        } else {
          uploadResults.push({
            fileName: file.name,
            success: false,
            error: uploadResult.error || "Failed to upload file",
          });
        }
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        uploadResults.push({
          fileName: file.name,
          success: false,
          error: "Failed to upload file",
        });
      }
    }

    // Check if any files were successfully uploaded
    const successfulUploads = uploadResults.filter((result) => result.success);

    if (successfulUploads.length === 0) {
      return NextResponse.json(
        {
          error: "All files failed to upload",
          details: uploadResults,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: `${successfulUploads.length} file(s) uploaded successfully`,
      uploadedFiles: successfulUploads.map((result) => result.fileMetadata),
      failedFiles: uploadResults.filter((result) => !result.success),
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
