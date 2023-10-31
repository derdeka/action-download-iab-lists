import { resolve } from 'path';
import { createNumberArray } from './utils/array';
import { download } from './utils/download';

// array of supported languages of the vendor list
const SUPPORTED_LANGUAGES = ['bg', 'ca', 'cs', 'da', 'de', 'el', 'es', 'et', 'fi', 'fr', 'hu', 'it', 'lt', 'lv', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sv', 'zh'];

export interface DownloadVendorListOptions {
  sourceBaseUrl: string;
  targetBaseDir: string;
}

/**
 * Downloads vendor list files including archives and localized versions.
 *
 * @param arg0 - DownloadVendorListOptions
 * @returns a promise resolving to void
 */
export const downloadVendorListFiles = async ({ sourceBaseUrl, targetBaseDir }: DownloadVendorListOptions): Promise<void> => {
  // download the current / most recent vendor list
  const gvl = await download<{ vendorListVersion: number }>({
    sourceUrl: `${sourceBaseUrl}/vendor-list.json`,
    targetFile: resolve(targetBaseDir, 'vendor-list.json'),
  });

  await Promise.allSettled([
    // download vendor list archives, for each version from 1 to the current version
    ...createNumberArray(gvl?.vendorListVersion ?? 0).map(version => download({
      sourceUrl: `${sourceBaseUrl}/archives/vendor-list-v${version}.json`,
      targetFile: resolve(targetBaseDir, `archives/vendorlist-v${version}.json`),
    })),
    // download localized translations for each supported language
    ...SUPPORTED_LANGUAGES.map(language => download({
      sourceUrl: `${sourceBaseUrl}/purposes-${language}.json`,
      targetFile: resolve(targetBaseDir, `purposes-${language}.json`),
    })),
  ]);
};
