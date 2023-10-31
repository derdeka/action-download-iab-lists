import { resolve } from 'path';
import { download } from './utils/download';

export interface DownloadCmpListOptions {
  sourceBaseUrl: string;
  targetBaseDir: string;
}

/**
 * Downloads CMP list files.
 *
 * @param arg0 - DownloadCmpListOptions
 * @returns a promise resolving to void
 */
export const downloadCmpListFiles = async ({ sourceBaseUrl, targetBaseDir }: DownloadCmpListOptions): Promise<void> => {
  await download({
    sourceUrl: `${sourceBaseUrl}/cmp-list.json`,
    targetFile: resolve(targetBaseDir, 'cmp-list.json'),
  });
}
