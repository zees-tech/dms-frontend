import { httpClient } from "@/utils/client";

interface DownloadProgress {
  loaded: number;
  total: number;
  percentage: number;
  speed: number;
  timeRemaining: number;
}

interface DownloadOptions {
  onProgress?: (progress: DownloadProgress) => void;
  chunkSize?: number;
  maxParallelRequests?: number;
}

interface PresignedUrlResponse {
  presignedUrl: string;
  expiresIn: number;
  fileName: string;
  fileSize: number;
}

export async function downloadFile(
  fileId: string,
  fileName: string,
  options: DownloadOptions = {}
): Promise<void> {
  const {
    onProgress,
    chunkSize = 256 * 1024, // 256KB chunks (matches backend default)
    maxParallelRequests = 4
  } = options;

  try {
    // First, get file metadata to determine size
    const fileSize = await getFileSize(fileId);
    
    if (!fileSize) {
      throw new Error('Could not determine file size');
    }

    console.log(`Downloading file: ${fileName}, Size: ${fileSize} bytes`);

    // Calculate number of chunks needed
    const totalChunks = Math.ceil(fileSize / chunkSize);
    console.log(`Total chunks: ${totalChunks}, Chunk size: ${chunkSize}`);

    // Download chunks in parallel with progress tracking
    const chunks = await downloadChunksParallel(
      fileId,
      fileSize,
      chunkSize,
      totalChunks,
      maxParallelRequests,
      onProgress
    );

    // Combine all chunks into a single blob
    const blob = new Blob(chunks as BlobPart[]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    // For video files, we need to add additional attributes to force download
    const isVideoFile = fileName.match(/\.(mp4|avi|mov|wmv|flv|mkv|webm)$/i);
    if (isVideoFile) {
      link.setAttribute('download', fileName);
      link.setAttribute('type', 'application/octet-stream');
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    console.log(`Download completed: ${fileName}`);
    
  } catch (error) {
    console.error("File download error:", error);
    throw error;
  }
}

async function getFileSize(fileId: string): Promise<number | null> {
  try {
    // Make a GET request with Range header for first byte only to get file size
    const response = await httpClient.get(`/api/Files/${fileId}/download`, {
      headers: {
        'Range': 'bytes=0-0', // Request only first byte
      },
      responseType: 'arraybuffer' as const,
    });

    if (response.status !== 200 && response.status !== 206) {
      return null;
    }

    // Get content range header to determine total file size
    const contentRange = response.headers['content-range'];
    if (contentRange) {
      // Content-Range format: "bytes 0-0/123456" where 123456 is total size
      const match = contentRange.match(/\/(\d+)$/);
      if (match) {
        return parseInt(match[1], 10);
      }
    }

    // Fallback to content-length if available
    const contentLength = response.headers['content-length'];
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    console.error('Error getting file size:', error);
    return null;
  }
}

async function downloadChunksParallel(
  fileId: string,
  fileSize: number,
  chunkSize: number,
  totalChunks: number,
  maxParallelRequests: number,
  onProgress?: (progress: DownloadProgress) => void
): Promise<Uint8Array[]> {
  const chunks: Uint8Array[] = new Array(totalChunks);
  let downloadedBytes = 0;
  const startTime = Date.now();

  // Download chunks in batches
  for (let batchStart = 0; batchStart < totalChunks; batchStart += maxParallelRequests) {
    const batchEnd = Math.min(batchStart + maxParallelRequests, totalChunks);
    const batchPromises: Promise<{ index: number; chunk: Uint8Array }>[] = [];

    // Create promises for current batch
    for (let i = batchStart; i < batchEnd; i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min(startByte + chunkSize - 1, fileSize - 1);
      
      batchPromises.push(
        downloadChunk(fileId, startByte, endByte, i)
          .then(result => {
            // Update progress
            downloadedBytes += result.chunk.length;
            updateProgress(downloadedBytes, fileSize, startTime, onProgress);
            return result;
          })
      );
    }

    // Wait for current batch to complete
    const batchResults = await Promise.all(batchPromises);
    
    // Store chunks in correct positions
    batchResults.forEach(result => {
      chunks[result.index] = result.chunk;
    });

    console.log(`Batch ${batchStart / maxParallelRequests + 1} completed: ${downloadedBytes}/${fileSize} bytes`);
  }

  return chunks;
}

async function downloadChunk(
  fileId: string,
  startByte: number,
  endByte: number,
  chunkIndex: number
): Promise<{ index: number; chunk: Uint8Array }> {
  const response = await httpClient.get(`/api/Files/${fileId}/download`, {
    headers: {
      'Range': `bytes=${startByte}-${endByte}`,
    },
    responseType: 'arraybuffer' as const,
  });

  if (response.status !== 200 && response.status !== 206) {
    throw new Error(`Failed to download chunk ${chunkIndex}: ${response.status}`);
  }

  return {
    index: chunkIndex,
    chunk: new Uint8Array(response.data as ArrayBuffer)
  };
}

function updateProgress(
  loaded: number,
  total: number,
  startTime: number,
  onProgress?: (progress: DownloadProgress) => void
): void {
  if (!onProgress) return;

  const elapsedTime = (Date.now() - startTime) / 1000; // seconds
  const speed = elapsedTime > 0 ? loaded / elapsedTime : 0;
  const timeRemaining = speed > 0 ? (total - loaded) / speed : 0;
  const percentage = Math.round((loaded / total) * 100);

  onProgress({
    loaded,
    total,
    percentage,
    speed,
    timeRemaining
  });
}

/**
 * Get a presigned URL for direct file download
 * This allows the browser to download the file directly from storage
 * without going through the backend proxy
 */
export async function getPresignedDownloadUrl(fileId: string): Promise<PresignedUrlResponse> {
  try {
    // Use the presigned-url endpoint instead of the download endpoint
    const response = await httpClient.get(`/api/Files/${fileId}/download?usePresignedUrl=true`);

    if (response.status !== 200) {
      throw new Error(`Failed to get presigned URL: ${response.status}`);
    }

    const data = response.data as PresignedUrlResponse;
    
    // Validate response structure
    if (!data.presignedUrl) {
      throw new Error('Invalid response: presignedUrl not found');
    }

    return {
      presignedUrl: data.presignedUrl,
      expiresIn: data.expiresIn || 3600,
      fileName: data.fileName || '',
      fileSize: data.fileSize || 0
    };
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
}

/**
 * Download file using presigned URL
 * This is more efficient for large files as it bypasses the backend proxy
 */
export async function downloadFileWithPresignedUrl(
  fileId: string, 
  fileName: string
): Promise<void> {
  try {
    // Get presigned URL
    const presignedData = await getPresignedDownloadUrl(fileId);
    
    // For video files and other media types, we need to force download behavior
    // by using fetch and creating a blob URL to ensure the browser downloads instead of playing
    const isMediaFile = fileName.match(/\.(mp4|avi|mov|wmv|flv|mkv|webm|mp3|wav|ogg|aac|flac|jpg|jpeg|png|gif|bmp|webp)$/i);
    
    if (isMediaFile) {
      // For media files, fetch the file and create a blob URL to force download
      const response = await fetch(presignedData.presignedUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName || presignedData.fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } else {
      // For non-media files, use the direct presigned URL approach
      const link = document.createElement('a');
      link.href = presignedData.presignedUrl;
      link.download = fileName || presignedData.fileName;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    console.log(`Download initiated via presigned URL: ${fileName}`);
    
  } catch (error) {
    console.error('Error downloading with presigned URL:', error);
    throw error;
  }
}

/**
 * Check if presigned URL download is available for a file
 * This can be used to determine which download method to use
 */
export async function isPresignedUrlAvailable(fileId: string): Promise<boolean> {
  try {
    const response = await httpClient.get(`/api/Files/${fileId}/download?usePresignedUrl=true`);

    if (response.status !== 200) {
      return false;
    }

    const data = response.data as PresignedUrlResponse;
    return !!data.presignedUrl;
  } catch (error) {
    console.error('Error checking presigned URL availability:', error);
    return false;
  }
}

/**
 * Smart download function that automatically chooses the best method
 * Tries presigned URL first, falls back to chunked download if not available
 */
export async function smartDownloadFile(
  fileId: string,
  fileName: string,
  options: DownloadOptions = {}
): Promise<void> {
  try {
    // Try presigned URL first
    if (await isPresignedUrlAvailable(fileId)) {
      console.log('Using presigned URL for download');
      await downloadFileWithPresignedUrl(fileId, fileName);
    } else {
      // Fallback to chunked download
      console.log('Using chunked download (presigned URL not available)');
      await downloadFile(fileId, fileName, options);
    }
  } catch (error) {
    console.error('Error in smart download:', error);
    throw error;
  }
}
