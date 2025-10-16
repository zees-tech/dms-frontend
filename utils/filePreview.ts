/**
 * Utility functions for file preview functionality
 */

/**
 * Check if a URL is accessible for preview (handles CORS issues)
 */
export async function isUrlAccessible(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, {
            method: 'HEAD',
            mode: 'cors'
        });
        return response.ok;
    } catch (error) {
        console.warn('URL accessibility check failed:', error);
        return false;
    }
}

/**
 * Get the appropriate preview URL for a file
 * Handles different URL types and fallbacks
 */
export function getPreviewUrl(url: string, mimeType: string): string {
    // For PDFs, we might need to add #view=FitH to make them display better in iframe
    if (mimeType.includes('pdf')) {
        return url.includes('#') ? url : `${url}#view=FitH`;
    }

    return url;
}

/**
 * Check if a file type is previewable
 */
export function isPreviewableFileType(mimeType: string): boolean {
    const previewableTypes = [
        'image/',
        'video/',
        'audio/',
        'application/pdf',
        'text/',
        'application/json',
        'application/xml'
    ];

    return previewableTypes.some(type => mimeType.includes(type));
}

/**
 * Get a human-readable file type description
 */
export function getFileTypeDescription(mimeType: string, extension: string): string {
    if (mimeType.includes('image')) return 'Image';
    if (mimeType.includes('video')) return 'Video';
    if (mimeType.includes('audio')) return 'Audio';
    if (mimeType.includes('pdf')) return 'PDF Document';
    if (mimeType.includes('text')) return 'Text File';
    if (mimeType.includes('json')) return 'JSON File';
    if (mimeType.includes('xml')) return 'XML File';
    if (mimeType.includes('word')) return 'Word Document';
    if (mimeType.includes('excel') || mimeType.includes('sheet')) return 'Spreadsheet';
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'Presentation';

    return extension ? `${extension.toUpperCase()} File` : 'Unknown File Type';
}