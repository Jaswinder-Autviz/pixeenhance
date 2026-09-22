import { ImageFormat } from '../types';

export class ConversionEngine {
  /**
   * Converts a canvas to a Blob in the specified format and quality
   */
  public static async convertToBlob(
    canvas: HTMLCanvasElement,
    format: ImageFormat,
    quality: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // PNG does not accept quality parameter in toBlob
      const q = format === 'image/png' ? undefined : Math.max(0.1, Math.min(1.0, quality));
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to encode image canvas to blob'));
          }
        },
        format,
        q
      );
    });
  }

  /**
   * Generates a realistic estimate of the resulting file size in bytes
   */
  public static estimateFileSize(
    width: number,
    height: number,
    format: ImageFormat,
    quality: number
  ): number {
    const totalPixels = width * height;

    if (format === 'image/png') {
      // PNG uses deflate compression (typically 1.5 to 2.8 bytes per pixel for RGB/RGBA)
      return Math.round(totalPixels * 1.8);
    }

    if (format === 'image/jpeg') {
      // JPEG bitrates: at 0.9 quality ~ 0.35 bytes/pixel; at 0.5 quality ~ 0.15 bytes/pixel
      const bpp = 0.05 + (quality * 0.35);
      return Math.round(totalPixels * bpp);
    }

    if (format === 'image/webp') {
      // WebP is ~25-34% more compact than JPEG for equal visual quality
      const bpp = 0.035 + (quality * 0.25);
      return Math.round(totalPixels * bpp);
    }

    return Math.round(totalPixels * 0.2);
  }

  /**
   * Formats raw bytes to human-readable string (KB, MB, etc.)
   */
  public static formatBytes(bytes: number): string {
    if (bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Triggers a browser file download for a given Blob
   */
  public static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * Determines default file extension for an ImageFormat
   */
  public static getExtensionForFormat(format: ImageFormat): string {
    switch (format) {
      case 'image/png':
        return 'png';
      case 'image/webp':
        return 'webp';
      case 'image/jpeg':
      default:
        return 'jpg';
    }
  }
}
