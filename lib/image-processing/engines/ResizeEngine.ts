import { ResizeConfig } from '../types';

export class ResizeEngine {
  /**
   * Calculates new dimensions when maintaining aspect ratio
   */
  public static calculateAspectRatioDimensions(
    originalWidth: number,
    originalHeight: number,
    targetWidth: number,
    targetHeight: number,
    modifiedField: 'width' | 'height'
  ): { width: number; height: number } {
    if (originalWidth <= 0 || originalHeight <= 0) {
      return { width: targetWidth, height: targetHeight };
    }

    const ratio = originalWidth / originalHeight;

    if (modifiedField === 'width') {
      const calculatedHeight = Math.round(targetWidth / ratio);
      return { width: targetWidth, height: Math.max(1, calculatedHeight) };
    } else {
      const calculatedWidth = Math.round(targetHeight * ratio);
      return { width: Math.max(1, calculatedWidth), height: targetHeight };
    }
  }

  /**
   * Resizes an image or canvas according to the specified config and mode (fit, fill, crop, stretch)
   */
  public static resize(
    source: HTMLCanvasElement,
    config: ResizeConfig
  ): HTMLCanvasElement {
    const { width: targetW, height: targetH, mode } = config;

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(targetW));
    canvas.height = Math.max(1, Math.round(targetH));

    const ctx = canvas.getContext('2d');
    if (!ctx) return source;

    // Enable best quality resampling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const srcW = source.width;
    const srcH = source.height;

    if (mode === 'stretch') {
      // Stretch directly into new bounds
      ctx.drawImage(source, 0, 0, srcW, srcH, 0, 0, canvas.width, canvas.height);
      return canvas;
    }

    if (mode === 'fit') {
      // Fit entire image inside canvas without cropping (letterboxed / centered)
      const scale = Math.min(canvas.width / srcW, canvas.height / srcH);
      const drawW = Math.round(srcW * scale);
      const drawH = Math.round(srcH * scale);
      const dx = Math.round((canvas.width - drawW) / 2);
      const dy = Math.round((canvas.height - drawH) / 2);

      ctx.drawImage(source, 0, 0, srcW, srcH, dx, dy, drawW, drawH);
      return canvas;
    }

    if (mode === 'crop' || mode === 'fill') {
      // Scale up to cover canvas completely and center-crop the excess
      const scale = Math.max(canvas.width / srcW, canvas.height / srcH);
      const scaledW = Math.round(srcW * scale);
      const scaledH = Math.round(srcH * scale);
      const dx = Math.round((canvas.width - scaledW) / 2);
      const dy = Math.round((canvas.height - scaledH) / 2);

      ctx.drawImage(source, 0, 0, srcW, srcH, dx, dy, scaledW, scaledH);
      return canvas;
    }

    // Default fallback
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    return canvas;
  }
}
