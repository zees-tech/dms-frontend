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
        const response = await httpClient.get(`/api/Files/${fileId}/preview`);

        if (response.status !== 200) {
            throw new Error(`Failed to get preview URL: ${response.status}`);
        }

        const data = response.data as FilePreviewResponse;

        // Validate response structure
        if (!data.previewUrl) {
            throw new Error('Invalid response: previewUrl not found');
        }

        return {
            previewUrl: data.previewUrl,
            expiresIn: data.expiresIn || 3600,
            fileName: data.fileName || '',
            fileSize: data.fileSize || 0,
            mimeType: data.mimeType || 'application/octet-stream'
        };
    } catch (error) {
        console.error('Error getting preview URL:', error);
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
//         console.error('Error checking preview availability:', error);
//         return false;
//     }
// }