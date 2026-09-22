import { ColorAdjustments, RotateFlipState, SharpenLevel } from '../types';

export class FilterEngine {
  /**
   * Applies rotation and horizontal/vertical flips to an ImageBitmap or HTMLCanvasElement
   */
  public static applyRotateFlip(
    source: CanvasImageSource,
    width: number,
    height: number,
    rotateFlip: RotateFlipState
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const { rotation, flipH, flipV } = rotateFlip;

    const isPerpendicular = rotation === 90 || rotation === 270;
    canvas.width = isPerpendicular ? height : width;
    canvas.height = isPerpendicular ? width : height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (rotation !== 0) {
      ctx.rotate((rotation * Math.PI) / 180);
    }

    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(source, -width / 2, -height / 2, width, height);
    ctx.restore();

    return canvas;
  }

  /**
   * Applies brightness, contrast, saturation, and blur to a canvas
   */
  public static applyAdjustments(
    sourceCanvas: HTMLCanvasElement,
    adjustments: ColorAdjustments
  ): HTMLCanvasElement {
    const { brightness, contrast, saturation, blur } = adjustments;

    // Fast path: if no adjustments, return clone
    if (brightness === 0 && contrast === 0 && saturation === 0 && blur === 0) {
      return this.cloneCanvas(sourceCanvas);
    }

    const canvas = document.createElement('canvas');
    canvas.width = sourceCanvas.width;
    canvas.height = sourceCanvas.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return sourceCanvas;

    // Apply CSS blur first if requested
    if (blur > 0) {
      ctx.filter = `blur(${blur * 0.4}px)`;
    }
    ctx.drawImage(sourceCanvas, 0, 0);
    ctx.filter = 'none';

    // If only blur was changed, return early
    if (brightness === 0 && contrast === 0 && saturation === 0) {
      return canvas;
    }

    // Pixel manipulation for Brightness, Contrast, and Saturation
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const len = data.length;

    // Precalculate contrast factor
    // Contrast slider: -100 to 100
    // Factor formula: (259 * (C + 255)) / (255 * (259 - C))
    const cVal = Math.max(-100, Math.min(100, contrast));
    const contrastFactor = (259 * (cVal + 255)) / (255 * (259 - cVal));

    // Brightness offset: -100 to 100 mapped to -128 to 128
    const bOffset = (brightness / 100) * 128;

    // Saturation factor: -100 (grayscale) -> 0 -> 100 (2x saturation)
    const satFactor = saturation >= 0 ? 1 + saturation / 100 : 1 + saturation / 100;

    for (let i = 0; i < len; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // 1. Brightness
      if (bOffset !== 0) {
        r += bOffset;
        g += bOffset;
        b += bOffset;
      }

      // 2. Contrast
      if (contrast !== 0) {
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;
      }

      // 3. Saturation
      if (saturation !== 0) {
        // Luminance approximation
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        r = lum + satFactor * (r - lum);
        g = lum + satFactor * (g - lum);
        b = lum + satFactor * (b - lum);
      }

      // Clamp to 0..255
      data[i] = r < 0 ? 0 : r > 255 ? 255 : r;
      data[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      data[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  /**
   * Applies an unsharp masking sharpen convolution filter
   */
  public static applySharpen(
    sourceCanvas: HTMLCanvasElement,
    level: SharpenLevel
  ): HTMLCanvasElement {
    if (level === 'none') {
      return this.cloneCanvas(sourceCanvas);
    }

    const weightMap: Record<SharpenLevel, number> = {
      none: 0,
      low: 0.35,
      medium: 0.7,
      high: 1.2
    };

    const k = weightMap[level];
    const canvas = document.createElement('canvas');
    canvas.width = sourceCanvas.width;
    canvas.height = sourceCanvas.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return sourceCanvas;

    ctx.drawImage(sourceCanvas, 0, 0);
    const srcData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dstData = ctx.createImageData(canvas.width, canvas.height);

    const src = srcData.data;
    const dst = dstData.data;
    const w = canvas.width;
    const h = canvas.height;

    // Convolution with 3x3 unsharp kernel:
    //  -k,      -k,     -k
    //  -k,   1 + 8k,    -k
    //  -k,      -k,     -k
    const centerWeight = 1 + 8 * k;

    for (let y = 1; y < h - 1; y++) {
      const yOffset = y * w;
      for (let x = 1; x < w - 1; x++) {
        const idx = (yOffset + x) * 4;

        for (let c = 0; c < 3; c++) {
          const sum =
            src[idx + c] * centerWeight -
            k * (
              src[((y - 1) * w + (x - 1)) * 4 + c] +
              src[((y - 1) * w + x) * 4 + c] +
              src[((y - 1) * w + (x + 1)) * 4 + c] +
              src[(yOffset + (x - 1)) * 4 + c] +
              src[(yOffset + (x + 1)) * 4 + c] +
              src[((y + 1) * w + (x - 1)) * 4 + c] +
              src[((y + 1) * w + x) * 4 + c] +
              src[((y + 1) * w + (x + 1)) * 4 + c]
            );

          dst[idx + c] = sum < 0 ? 0 : sum > 255 ? 255 : sum;
        }
        dst[idx + 3] = src[idx + 3]; // preserve alpha
      }
    }

    // Copy edge pixels directly
    for (let x = 0; x < w; x++) {
      const topIdx = x * 4;
      const botIdx = ((h - 1) * w + x) * 4;
      for (let c = 0; c < 4; c++) {
        dst[topIdx + c] = src[topIdx + c];
        dst[botIdx + c] = src[botIdx + c];
      }
    }
    for (let y = 0; y < h; y++) {
      const leftIdx = (y * w) * 4;
      const rightIdx = (y * w + (w - 1)) * 4;
      for (let c = 0; c < 4; c++) {
        dst[leftIdx + c] = src[leftIdx + c];
        dst[rightIdx + c] = src[rightIdx + c];
      }
    }

    ctx.putImageData(dstData, 0, 0);
    return canvas;
  }

  private static cloneCanvas(src: HTMLCanvasElement): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = src.width;
    c.height = src.height;
    const ctx = c.getContext('2d');
    ctx?.drawImage(src, 0, 0);
    return c;
  }
}
