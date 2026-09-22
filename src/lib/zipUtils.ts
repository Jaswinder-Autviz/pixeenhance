import { zipSync, Zippable } from 'fflate';

export interface ZipFileItem {
  name: string;
  data: Uint8Array;
}

/**
 * Creates a zip archive in memory and returns a downloadable Blob
 */
export function createZipArchive(files: ZipFileItem[]): Blob {
  const zippable: Zippable = {};
  for (const file of files) {
    // Avoid duplicate names in zip
    let finalName = file.name;
    let counter = 1;
    while (zippable[finalName]) {
      const parts = file.name.split('.');
      if (parts.length > 1) {
        const ext = parts.pop();
        finalName = `${parts.join('.')}_${counter}.${ext}`;
      } else {
        finalName = `${file.name}_${counter}`;
      }
      counter++;
    }
    zippable[finalName] = file.data;
  }

  const zipped = zipSync(zippable);
  return new Blob([zipped as unknown as BlobPart], { type: 'application/zip' });
}

/**
 * Helper to download any Blob
 */
export function downloadFileBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
