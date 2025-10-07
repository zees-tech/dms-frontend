import { httpClient } from "@/utils/client";
import fs from "fs";

export async function downloadFile(
  fileId: string,
  outputPath: string
): Promise<void> {
  try {
    const response = await httpClient.get(
      `api/Files/${fileId}/download`,
      {
        responseType: "stream",
      }
    );

    // Create a write stream and pipe the response data to it
    const writer = fs.createWriteStream(outputPath);

    return new Promise((resolve, reject) => {
      // Type assertion for stream response
      const streamData = response.data as NodeJS.ReadableStream;
      streamData.pipe(writer);

      writer.on("finish", () => {
        resolve();
      });

      writer.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    console.error("File download error:", error);
    throw error;
  }
}
