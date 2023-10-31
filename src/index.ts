import * as core from '@actions/core';
import { resolve } from 'path';
import { downloadCmpListFiles } from './download-cmp-list';
import { downloadVendorListFiles } from './download-vendor-list';

const main = async () => {
  console.log('Downloading files...');

  // base directory for all downloaded files
  const workingDirectory = core.getInput('working-directory', { required: false });
  const outBaseDir = workingDirectory ? resolve(workingDirectory) : resolve(__dirname, '..', 'out');

  // get a list of all available consent management platforms
  await downloadCmpListFiles({
    sourceBaseUrl: 'https://cmplist.consensu.org/v2',
    targetBaseDir: resolve(outBaseDir, 'cmplist.consensu.org/v2'),
  });

  // download the vendor list version 2
  await downloadVendorListFiles({
    sourceBaseUrl: 'https://vendor-list.consensu.org/v2',
    targetBaseDir: resolve(outBaseDir, 'vendor-list.consensu.org/v2'),
  });

  // download the vendor list version 3
  await downloadVendorListFiles({
    sourceBaseUrl: 'https://vendor-list.consensu.org/v3',
    targetBaseDir: resolve(outBaseDir, 'vendor-list.consensu.org/v3'),
  });
};

main().catch(error => {
  console.error('Error', error);
  process.exit(1);
});
