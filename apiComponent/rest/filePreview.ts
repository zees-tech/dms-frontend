import { httpClient } from "@/utils/client";

interface FilePreviewResponse {
    previewUrl: string;
    expiresIn: number;
    fileName: string;
    fileSize: number;
    mimeType: string;
}

/**
 * Get a preview URL for a file
 * This allows the browser to preview the file directly
 */
export async function getFilePreviewUrl(fileId: string): Promise<FilePreviewResponse> {
    try {
        // Try preview endpoint first
        try {
            const response = await httpClient.get(`/Files/${fileId}/preview`);

            const previewData = response.data as any;
            if (response.status === 200 && previewData?.previewUrl) {
                return {
                    previewUrl: previewData.previewUrl,
                    expiresIn: previewData.expiresIn || 3600,
                    fileName: previewData.fileName || '',
                    fileSize: previewData.fileSize || 0,
                    mimeType: previewData.mimeType || 'application/octet-stream'
                };
            }
        } catch (previewError) {
            // Fallback to download endpoint
        }

        // Fallback to download endpoint with presigned URL
        const downloadResponse = await httpClient.get(`/Files/${fileId}/download?usePresignedUrl=true`);

        if (downloadResponse.status !== 200) {
            throw new Error(`Failed to get download URL: ${downloadResponse.status}`);
        }

        const data = downloadResponse.data as any;

        // Validate response structure
        if (!data.presignedUrl) {
            throw new Error('Invalid response: presignedUrl not found');
        }

        return {
            previewUrl: data.presignedUrl,
            expiresIn: data.expiresIn || 3600,
            fileName: data.fileName || '',
            fileSize: data.fileSize || 0,
            mimeType: data.mimeType || 'application/octet-stream'
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Check if a file can be previewed
 */
// export async function canPreviewFile(fileId: string): Promise<boolean> {
//     try {
//         const response = await httpClient.get(`/api/Files/${fileId}/can-preview`);
//         return response.status === 200 && response.data?.canPreview === true;
//     } catch (error) {
//         return false;
//     }
// }