/**
 * PixEnhance Image Processing Utilities
 * High-performance image processing using HTML5 Canvas, File, and Blob APIs.
 */

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AspectRatioResult {
  ratio: string;
  simplified: string;
  decimal: number;
}

/**
 * Loads a File or URL into an HTMLImageElement
 */
export function loadImage(source: File | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    let objectUrl: string | null = null;

    img.onload = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      resolve(img);
    };

    img.onerror = (err) => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error('Failed to load image file.'));
    };

    if (typeof source === 'string') {
      img.src = source;
    } else {
      objectUrl = URL.createObjectURL(source);
      img.src = objectUrl;
    }
  });
}

/**
 * Converts a Canvas to a Blob using Promise wrapper
 */
export function canvasToBlob(
  canvas: HTMLCanvasElement,
  format: string = 'image/jpeg',
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas export to blob failed'));
        }
      },
      format,
      quality
    );
  });
}

/**
 * Triggers a browser download of a given Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Human-readable format of file size in bytes
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Greatest common divisor for aspect ratio calculation
 */
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Calculate aspect ratio details for given dimensions
 */
export function calculateAspectRatio(width: number, height: number): AspectRatioResult {
  if (!width || !height || width <= 0 || height <= 0) {
    return { ratio: '1:1', simplified: '1:1', decimal: 1 };
  }

  const divisor = gcd(Math.round(width), Math.round(height));
  const simpW = Math.round(width) / divisor;
  const simpH = Math.round(height) / divisor;
  const decimal = parseFloat((width / height).toFixed(2));

  return {
    ratio: `${width}:${height}`,
    simplified: `${simpW}:${simpH}`,
    decimal,
  };
}

/**
 * Resize an image with high-quality smoothing and optional background fill
 */
export async function resizeImage(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  format: string = 'image/jpeg',
  quality: number = 0.92,
  bgFill?: string
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(targetWidth);
  canvas.height = Math.round(targetHeight);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (bgFill) {
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvasToBlob(canvas, format, quality);
}

/**
 * Compress an image by re-encoding with specified quality (0.01 to 1.0)
 */
export async function compressImage(
  file: File,
  quality: number = 0.8,
  outputFormat?: string
): Promise<{ blob: Blob; originalSize: number; compressedSize: number }> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  // Determine format (PNG does not support lossy quality via canvas, so default to JPEG or WebP)
  let format = outputFormat || file.type;
  if (format === 'image/png' && quality < 1.0) {
    format = 'image/webp';
  } else if (!format || format === 'image/svg+xml') {
    format = 'image/jpeg';
  }

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const clampedQuality = Math.max(0.01, Math.min(1.0, quality));
  const blob = await canvasToBlob(canvas, format, clampedQuality);

  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
  };
}

/**
 * Compress an image iteratively to match a target file size (e.g. 200 KB)
 */
export async function compressToTargetSize(
  file: File,
  targetBytes: number,
  outputFormat: string = 'image/jpeg'
): Promise<{ blob: Blob; originalSize: number; compressedSize: number; quality: number }> {
  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  if (outputFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(img, 0, 0);

  // Binary search for optimal quality between 0.05 and 0.98
  let minQ = 0.05;
  let maxQ = 0.98;
  let bestBlob: Blob | null = null;
  let bestQuality = 0.8;

  for (let i = 0; i < 6; i++) {
    const testQ = (minQ + maxQ) / 2;
    const currentBlob = await canvasToBlob(canvas, outputFormat, testQ);

    bestBlob = currentBlob;
    bestQuality = testQ;

    if (currentBlob.size > targetBytes) {
      maxQ = testQ;
    } else {
      minQ = testQ;
      // If we are within 5% of target, stop early
      if (targetBytes - currentBlob.size < targetBytes * 0.05) {
        break;
      }
    }
  }

  if (!bestBlob) {
    bestBlob = await canvasToBlob(canvas, outputFormat, 0.7);
  }

  return {
    blob: bestBlob,
    originalSize: file.size,
    compressedSize: bestBlob.size,
    quality: Math.round(bestQuality * 100),
  };
}

/**
 * Format converter: Converts image to PNG, JPEG, or WebP with optional background color fill
 */
export async function convertFormat(
  img: HTMLImageElement,
  format: 'image/jpeg' | 'image/png' | 'image/webp',
  quality: number = 0.92,
  bgColor: string = '#FFFFFF'
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  // If output format is JPEG (which doesn't support alpha), fill with chosen background color
  if (format === 'image/jpeg') {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);
  return canvasToBlob(canvas, format, quality);
}

/**
 * Crop an image based on specified rectangle coordinates
 */
export async function cropImage(
  img: HTMLImageElement,
  crop: CropArea,
  format: string = 'image/png',
  quality: number = 0.95
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(crop.width));
  canvas.height = Math.max(1, Math.round(crop.height));

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    img,
    Math.round(crop.x),
    Math.round(crop.y),
    Math.round(crop.width),
    Math.round(crop.height),
    0,
    0,
    canvas.width,
    canvas.height
  );

  return canvasToBlob(canvas, format, quality);
}

/**
 * Rotate an image by degrees (e.g. 90, 180, 270)
 */
export async function rotateImage(
  img: HTMLImageElement,
  degrees: number,
  format: string = 'image/png',
  quality: number = 0.95
): Promise<Blob> {
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  const canvas = document.createElement('canvas');
  const isPerpendicular = normalizedDegrees === 90 || normalizedDegrees === 270;

  canvas.width = isPerpendicular ? img.naturalHeight : img.naturalWidth;
  canvas.height = isPerpendicular ? img.naturalWidth : img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((normalizedDegrees * Math.PI) / 180);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

  return canvasToBlob(canvas, format, quality);
}

/**
 * Flip an image horizontally, vertically, or both
 */
export async function flipImage(
  img: HTMLImageElement,
  horizontal: boolean,
  vertical: boolean,
  format: string = 'image/png',
  quality: number = 0.95
): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  ctx.translate(horizontal ? canvas.width : 0, vertical ? canvas.height : 0);
  ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
  ctx.drawImage(img, 0, 0);

  return canvasToBlob(canvas, format, quality);
}

/**
 * Extract dominant colors from an image using canvas pixel sampling
 */
export function extractDominantColors(img: HTMLImageElement, count: number = 5): string[] {
  const canvas = document.createElement('canvas');
  const sampleW = 50;
  const sampleH = Math.max(1, Math.round((sampleW * img.naturalHeight) / img.naturalWidth));
  canvas.width = sampleW;
  canvas.height = sampleH;

  const ctx = canvas.getContext('2d');
  if (!ctx) return ['#2563EB', '#0F172A', '#64748B'];

  ctx.drawImage(img, 0, 0, sampleW, sampleH);
  const data = ctx.getImageData(0, 0, sampleW, sampleH).data;

  const colorBuckets: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 16) {
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const a = data[i + 3];

    // Skip transparent or near-white / near-black extremes if possible
    if (a < 128) continue;

    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    colorBuckets[hex] = (colorBuckets[hex] || 0) + 1;
  }

  const sorted = Object.entries(colorBuckets)
    .sort((a, b) => b[1] - a[1])
    .map(([color]) => color);

  return sorted.slice(0, count);
}

/**
 * Read a file as Base64 Data URL string
 */
export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file as Base64.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Convert Base64 / Data URI back to a Blob with detected mimeType
 */
export function base64ToBlob(base64String: string): { blob: Blob; mimeType: string } {
  let cleaned = base64String.trim();
  let mimeType = 'image/png';

  if (cleaned.startsWith('data:')) {
    const match = cleaned.match(/^data:([^;]+);base64,/);
    if (match) {
      mimeType = match[1];
      cleaned = cleaned.substring(match[0].length);
    }
  }

  // Decode base64
  const byteCharacters = atob(cleaned);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  return { blob, mimeType };
}
