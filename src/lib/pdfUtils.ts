/**
 * PixEnhance Image to PDF Generator
 * Generates standard ISO PDF 1.4 documents
 * with embedded DCTDecode (JPEG) images and custom page layouts.
 */

export interface PdfImageItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

export interface PdfOptions {
  pageSize: 'a4' | 'letter' | 'fit';
  orientation: 'portrait' | 'landscape' | 'auto';
  margin: 'none' | 'small' | 'large';
  quality: number; // 0.1 to 1.0
}

/**
 * Standard page sizes in points (72 points = 1 inch)
 */
const PAGE_DIMENSIONS: Record<'a4' | 'letter', { width: number; height: number }> = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612.0, height: 792.0 },
};

/**
 * Margin presets in points
 */
const MARGIN_PRESETS: Record<'none' | 'small' | 'large', number> = {
  none: 0,
  small: 20,
  large: 40,
};

/**
 * Convert an image file to JPEG Uint8Array bytes using HTML5 Canvas
 */
async function imageToJpegBytes(
  file: File,
  quality: number = 0.92
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context unavailable'));
        return;
      }

      // Fill with white background (in case of PNG transparency)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            reject(new Error('Canvas toBlob failed'));
            return;
          }
          const buffer = await blob.arrayBuffer();
          resolve({
            bytes: new Uint8Array(buffer),
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for PDF embedding'));
    };

    img.src = url;
  });
}

/**
 * Encodes string to Uint8Array using TextEncoder
 */
const encoder = new TextEncoder();
function strToBytes(str: string): Uint8Array {
  return encoder.encode(str);
}

/**
 * Builds a multi-page PDF from an array of image files
 */
export async function createPdfFromImages(
  images: PdfImageItem[],
  options: PdfOptions
): Promise<Blob> {
  if (images.length === 0) {
    throw new Error('At least one image is required to generate a PDF.');
  }

  // Pre-process all images into JPEG bytes
  const processedImages = await Promise.all(
    images.map((item) => imageToJpegBytes(item.file, options.quality))
  );

  const numPages = processedImages.length;
  const chunks: Uint8Array[] = [];
  const objectOffsets: number[] = [];
  let currentOffset = 0;

  function write(bytes: Uint8Array) {
    chunks.push(bytes);
    currentOffset += bytes.length;
  }

  function writeStr(str: string) {
    write(strToBytes(str));
  }

  // PDF Header
  writeStr('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // We have:
  // Obj 1: Catalog
  // Obj 2: Pages
  // For each page i (0 to numPages - 1):
  //   Obj (3 + i*3): Page
  //   Obj (4 + i*3): Image XObject
  //   Obj (5 + i*3): Contents stream
  const totalObjects = 2 + numPages * 3;

  // Obj 1: Catalog
  objectOffsets[1] = currentOffset;
  writeStr('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Obj 2: Pages
  const pageObjectIds: string[] = [];
  for (let i = 0; i < numPages; i++) {
    pageObjectIds.push(`${3 + i * 3} 0 R`);
  }
  objectOffsets[2] = currentOffset;
  writeStr(
    `2 0 obj\n<< /Type /Pages /Kids [${pageObjectIds.join(' ')}] /Count ${numPages} >>\nendobj\n`
  );

  // Generate each page and its resources
  for (let i = 0; i < numPages; i++) {
    const imgData = processedImages[i];
    const pageObjId = 3 + i * 3;
    const imgObjId = 4 + i * 3;
    const contentsObjId = 5 + i * 3;

    // Determine page width and height in points
    let pageW = 595.28;
    let pageH = 841.89;

    if (options.pageSize === 'fit') {
      pageW = imgData.width * 0.75;
      pageH = imgData.height * 0.75;
    } else {
      const baseDim = PAGE_DIMENSIONS[options.pageSize];
      let isLandscape = options.orientation === 'landscape';

      if (options.orientation === 'auto') {
        isLandscape = imgData.width > imgData.height;
      }

      pageW = isLandscape ? baseDim.height : baseDim.width;
      pageH = isLandscape ? baseDim.width : baseDim.height;
    }

    const margin = MARGIN_PRESETS[options.margin];
    const availW = Math.max(10, pageW - margin * 2);
    const availH = Math.max(10, pageH - margin * 2);

    // Compute proportional scale
    const imgRatio = imgData.width / imgData.height;
    const availRatio = availW / availH;

    let drawW = availW;
    let drawH = availH;

    if (imgRatio > availRatio) {
      drawH = availW / imgRatio;
    } else {
      drawW = availH * imgRatio;
    }

    const drawX = margin + (availW - drawW) / 2;
    const drawY = margin + (availH - drawH) / 2;

    // Obj: Page
    objectOffsets[pageObjId] = currentOffset;
    writeStr(
      `${pageObjId} 0 obj\n` +
        `<< /Type /Page /Parent 2 0 R\n` +
        `   /MediaBox [0 0 ${pageW.toFixed(2)} ${pageH.toFixed(2)}]\n` +
        `   /Resources << /XObject << /Im1 ${imgObjId} 0 R >> /ProcSet [/PDF /ImageC] >>\n` +
        `   /Contents ${contentsObjId} 0 R\n` +
        `>>\nendobj\n`
    );

    // Obj: Image XObject (embed JPEG bytes directly with DCTDecode)
    objectOffsets[imgObjId] = currentOffset;
    const imgDict =
      `${imgObjId} 0 obj\n` +
      `<< /Type /XObject /Subtype /Image\n` +
      `   /Width ${imgData.width} /Height ${imgData.height}\n` +
      `   /ColorSpace /DeviceRGB /BitsPerComponent 8\n` +
      `   /Filter /DCTDecode\n` +
      `   /Length ${imgData.bytes.length}\n` +
      `>>\nstream\n`;
    writeStr(imgDict);
    write(imgData.bytes);
    writeStr('\nendstream\nendobj\n');

    // Obj: Page Contents stream
    objectOffsets[contentsObjId] = currentOffset;
    const streamContent =
      `q\n` +
      `${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm\n` +
      `/Im1 Do\n` +
      `Q\n`;
    const streamBytes = strToBytes(streamContent);
    writeStr(
      `${contentsObjId} 0 obj\n` +
        `<< /Length ${streamBytes.length} >>\n` +
        `stream\n`
    );
    write(streamBytes);
    writeStr('\nendstream\nendobj\n');
  }

  // Cross-reference table (XREF)
  const startXref = currentOffset;
  writeStr(`xref\n0 ${totalObjects + 1}\n0000000000 65535 f \n`);

  for (let i = 1; i <= totalObjects; i++) {
    const offset = objectOffsets[i] || 0;
    const padded = String(offset).padStart(10, '0');
    writeStr(`${padded} 00000 n \n`);
  }

  // Trailer
  writeStr(
    `trailer\n` +
      `<< /Size ${totalObjects + 1}\n` +
      `   /Root 1 0 R\n` +
      `>>\n` +
      `startxref\n` +
      `${startXref}\n` +
      `%%EOF\n`
  );

  return new Blob(chunks as any, { type: 'application/pdf' });
}
