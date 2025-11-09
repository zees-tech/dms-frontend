import { localClient, createServerClient } from "@/utils/client";

export interface UploadFileResponse {
  message: string;
  uploadedFiles: Array<{
    fileName: string;
    fileUrl?: string;
    fileSize?: number;
    contentType?: string;
    uploadedAt?: string;
  }>;
  failedFiles: Array<{
    fileName: string;
    error: string;
  }>;
}

export interface UploadFileError {
  error: string;
  details?: Array<{
    fileName: string;
    error: string;
  }>;
}

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileKey: string;
  expiresAt: string;
}

export interface FileMetadata {
  id: string;
  name: string;
  originalName: string;
  fileName: string;
  type: string;
  size: number;
  mimeType: string;
  extension: string;
  folderId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  storageProvider?: string;
  storageKey?: string;
}

export interface UploadCompleteResponse {
  success: boolean;
  message: string;
  fileMetadata: FileMetadata;
}

/**
 * Uploads one or more files to the server
 * @param files - File or array of files to upload
 * @param folderId - The ID of the folder where files should be uploaded
 * @returns Promise with upload results
 */
export async function uploadFiles(
  files: File | File[],
  folderId: string
): Promise<UploadFileResponse> {
  try {
    // Convert single file to array for consistent handling
    const filesArray = Array.isArray(files) ? files : [files];

    // Validate input
    if (filesArray.length === 0) {
      throw new Error("No files provided");
    }

    if (!folderId) {
      throw new Error("No folder ID provided");
    }

    // Create FormData
    const formData = new FormData();

    // Add files to FormData
    filesArray.forEach((file) => {
      formData.append("files", file);
    });

    // Add folder ID
    formData.append("folderId", folderId);

    // Make upload request
    const response = await localClient.post<UploadFileResponse>(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error("File upload error:", error);

    // Handle axios error response
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: UploadFileError } };
      if (axiosError.response?.data) {
        throw axiosError.response.data;
      }
    }

    // Handle network or other errors
    throw {
      error: error instanceof Error ? error.message : "Failed to upload files",
    } as UploadFileError;
  }
}

/**
 * Uploads a single file to the server
 * @param file - File to upload
 * @param folderId - The ID of the folder where the file should be uploaded
 * @returns Promise with upload result
 */
export async function uploadFile(
  file: File,
  folderId: string
): Promise<UploadFileResponse> {
  return uploadFiles(file, folderId);
}

/**
 * Generates a pre-signed URL for direct upload to storage
 * @param fileName - Original file name
 * @param folderId - The ID of the folder where the file should be uploaded
 * @param fileSize - Size of the file in bytes
 * @param contentType - MIME type of the file
 * @returns Promise with pre-signed URL response
 */
export async function generatePresignedUrl(
  fileName: string,
  folderId: string,
  fileSize: number,
  contentType: string
): Promise<PresignedUrlResponse> {
  try {
    const response = await localClient.post<PresignedUrlResponse>(
      "/upload/presigned-url",
      {
        fileName,
        folderId,
        fileSize,
        contentType,
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error("Pre-signed URL generation error:", error);

    // Handle axios error response
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: { error: string } } };
      if (axiosError.response?.data) {
        throw new Error(axiosError.response.data.error);
      }
    }

    // Handle network or other errors
    throw new Error("Failed to generate pre-signed URL");
  }
}

/**
 * Uploads a file directly to storage using a pre-signed URL
 * @param file - File to upload
 * @param presignedUrl - Pre-signed URL for direct upload
 * @param onProgress - Optional progress callback
 * @returns Promise with upload result
 */
export async function uploadFileWithPresignedUrl(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Set up progress tracking
    if (onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });
    }

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Upload failed due to network error"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload was aborted"));
    });

    xhr.open("PUT", presignedUrl);
    xhr.setRequestHeader(
      "Content-Type",
      file.type || "application/octet-stream"
    );
    xhr.send(file);
  });
}

/**
 * Completes the upload process by storing file metadata
 * @param fileKey - Storage key of the uploaded file
 * @param originalFileName - Original file name
 * @param fileSize - Size of the file in bytes
 * @param contentType - MIME type of the file
 * @param folderId - The ID of the folder where the file was uploaded
 * @param token - Authentication token
 * @param refresh_token - Refresh token
 * @param documentSettings - Optional document settings (expiration, password protection)
 * @returns Promise with upload completion response
 */
export async function completeUpload(
  fileKey: string,
  originalFileName: string,
  fileSize: number,
  contentType: string,
  folderId: string,
  token: string,
  refresh_token?: string,
  documentSettings?: {
    hasExpiration?: boolean;
    expirationDate?: string;
    isSecret?: boolean;
    password?: string;
  },
  fileId: string | null = null
): Promise<UploadCompleteResponse> {
  try {
    const client = await createServerClient(
      "http",
      token,
      refresh_token || "",
      ""
    );
    folderId = folderId;
    const response = fileId
      ? await client.patch<UploadCompleteResponse>("/upload/complete", {
          fileId,
          fileKey,
          originalFileName,
          fileSize,
          contentType,
          folderId,
          documentSettings,
        })
      : await client.post<UploadCompleteResponse>("/upload/complete", {
          fileKey,
          originalFileName,
          fileSize,
          contentType,
          folderId,
          documentSettings,
        });

    return response.data;
  } catch (error: unknown) {
    console.error("Upload completion error:", error);

    // Handle axios error response
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { data?: { error: string } } };
      if (axiosError.response?.data) {
        throw new Error(axiosError.response.data.error);
      }
    }

    // Handle network or other errors
    throw new Error("Failed to complete upload");
  }
}
