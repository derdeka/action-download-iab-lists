import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'path';
// Note: fetch natively included in node 18 without import

/**
 * Download options.
 */
export interface DownloadOptions {
  sourceUrl: string;
  targetFile: string;
}

/**
 * Downloads a file from a URL and saves it to a specified location in the file system.
 *
 * @param arg0 - the download options.
 * @returns A promise resolving to the downloaded data, or undefined if the download fails.
 */
export const download = async <T = any>({ sourceUrl, targetFile }: DownloadOptions): Promise<T | undefined> => {
  console.log(`${sourceUrl} => ${targetFile}`);

  await mkdir(dirname(targetFile), { recursive: true });

  const response = await fetch(sourceUrl);

  if (response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
    const data: T = await response.json();
    const content = JSON.stringify(data, null, 0);
    await writeFile(targetFile, content, 'utf8');
    return data;
  }
  return undefined;
}
