import {
  ColorAdjustments,
  CropRect,
  DenoiseLevel,
  ExportConfig,
  FaceEnhanceConfig,
  ImageFormat,
  PipelineSettings,
  ResizeConfig,
  RotateFlipState,
  SharpenLevel,
  UpscaleFactor
} from '../types';
import { ConversionEngine } from './ConversionEngine';
import { EnhancementEngine } from './EnhancementEngine';
import { FilterEngine } from './FilterEngine';
import { ResizeEngine } from './ResizeEngine';
import { UpscalerEngine, UpscaleProgressCallback } from './UpscalerEngine';

export interface ProcessPipelineResult {
  outputCanvas: HTMLCanvasElement;
  intermediateCanvases: {
    original: HTMLCanvasElement;
    croppedRotated: HTMLCanvasElement;
    adjusted: HTMLCanvasElement;
    enhanced: HTMLCanvasElement;
    upscaled: HTMLCanvasElement;
  };
  appliedNotes: string[];
}

export class ImageProcessor {
  /**
   * Decoupled image processing pipeline orchestrator
   */

  public static applyCrop(
    source: HTMLCanvasElement,
    crop: CropRect
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(crop.width));
    canvas.height = Math.max(1, Math.round(crop.height));
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(
        source,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }
    return canvas;
  }

  public static applyRotateFlip(
    source: HTMLCanvasElement,
    rotateFlip: RotateFlipState
  ): HTMLCanvasElement {
    return FilterEngine.applyRotateFlip(source, source.width, source.height, rotateFlip);
  }

  public static applyAdjustments(
    source: HTMLCanvasElement,
    adjustments: ColorAdjustments
  ): HTMLCanvasElement {
    return FilterEngine.applyAdjustments(source, adjustments);
  }

  public static applySharpen(
    source: HTMLCanvasElement,
    sharpen: SharpenLevel
  ): HTMLCanvasElement {
    return FilterEngine.applySharpen(source, sharpen);
  }

  public static applyDenoise(
    source: HTMLCanvasElement,
    denoise: DenoiseLevel
  ): HTMLCanvasElement {
    return EnhancementEngine.applyDenoise(source, denoise);
  }

  public static applyFaceEnhance(
    source: HTMLCanvasElement,
    config: FaceEnhanceConfig
  ) {
    return EnhancementEngine.enhanceFace(source, config);
  }

  public static async applyUpscale(
    source: HTMLCanvasElement,
    factor: UpscaleFactor,
    onProgress?: UpscaleProgressCallback
  ) {
    return UpscalerEngine.upscale(source, factor, onProgress);
  }

  public static applyResize(
    source: HTMLCanvasElement,
    resize: ResizeConfig
  ): HTMLCanvasElement {
    return ResizeEngine.resize(source, resize);
  }

  public static async exportImage(
    source: HTMLCanvasElement,
    config: ExportConfig
  ): Promise<Blob> {
    // If dimensions differ, resize first to ensure EXACT output dimensions
    let finalCanvas = source;
    if (config.width > 0 && config.height > 0 && (source.width !== config.width || source.height !== config.height)) {
      finalCanvas = ResizeEngine.resize(source, {
        width: config.width,
        height: config.height,
        lockAspect: false,
        mode: 'fit'
      });
    }

    return ConversionEngine.convertToBlob(finalCanvas, config.format, config.quality);
  }

  /**
   * Executes the non-destructive multi-stage pipeline:
   * Original -> Crop -> Rotate -> Adjustments -> Sharpen -> Denoise -> FaceEnhance -> Upscale -> Resize
   */
  public static async executePipeline(
    originalCanvas: HTMLCanvasElement,
    settings: PipelineSettings,
    onProgress?: (message: string, percent: number) => void
  ): Promise<ProcessPipelineResult> {
    const notes: string[] = [];

    // Stage 1: Crop
    let currentCanvas = originalCanvas;
    if (settings.crop && settings.crop.width > 0 && settings.crop.height > 0) {
      currentCanvas = this.applyCrop(currentCanvas, settings.crop);
      notes.push(`Cropped to ${currentCanvas.width}×${currentCanvas.height}`);
    }

    // Stage 2: Rotate & Flip
    if (settings.rotateFlip.rotation !== 0 || settings.rotateFlip.flipH || settings.rotateFlip.flipV) {
      currentCanvas = this.applyRotateFlip(currentCanvas, settings.rotateFlip);
      notes.push(`Rotated ${settings.rotateFlip.rotation}°`);
    }
    const croppedRotated = currentCanvas;

    // Stage 3: Color Adjustments (Brightness, Contrast, Saturation, Blur)
    currentCanvas = this.applyAdjustments(currentCanvas, settings.adjustments);
    const adjusted = currentCanvas;

    // Stage 4: Sharpen & Denoise
    if (settings.denoise !== 'none') {
      currentCanvas = this.applyDenoise(currentCanvas, settings.denoise);
      notes.push(`Denoised (${settings.denoise})`);
    }

    if (settings.sharpen !== 'none') {
      currentCanvas = this.applySharpen(currentCanvas, settings.sharpen);
      notes.push(`Sharpened (${settings.sharpen})`);
    }

    // Stage 5: Face Enhance
    if (settings.faceEnhance.enabled && settings.faceEnhance.strength > 0) {
      const faceResult = this.applyFaceEnhance(currentCanvas, settings.faceEnhance);
      currentCanvas = faceResult.canvas;
      notes.push(faceResult.notes);
    }
    const enhanced = currentCanvas;

    // Stage 6: AI Upscale
    let upscaled = currentCanvas;
    if (settings.upscale > 1) {
      const upscaleResult = await this.applyUpscale(currentCanvas, settings.upscale, (msg, pct) => {
        onProgress?.(msg, pct);
      });
      currentCanvas = upscaleResult.canvas;
      upscaled = currentCanvas;
      notes.push(`Upscaled ${settings.upscale}× using ${upscaleResult.engine}`);
    }

    // Stage 7: Target Dimension Resizing
    if (
      settings.resize.width > 0 &&
      settings.resize.height > 0 &&
      (settings.resize.width !== currentCanvas.width || settings.resize.height !== currentCanvas.height)
    ) {
      const unscaledW = settings.crop ? settings.crop.width : originalCanvas.width;
      const unscaledH = settings.crop ? settings.crop.height : originalCanvas.height;
      const isAccidentalDownscale =
        settings.upscale > 1 &&
        settings.resize.width === unscaledW &&
        settings.resize.height === unscaledH;

      if (!isAccidentalDownscale) {
        currentCanvas = this.applyResize(currentCanvas, settings.resize);
        notes.push(`Resized to ${currentCanvas.width}×${currentCanvas.height} (${settings.resize.mode})`);
      }
    }

    return {
      outputCanvas: currentCanvas,
      intermediateCanvases: {
        original: originalCanvas,
        croppedRotated,
        adjusted,
        enhanced,
        upscaled
      },
      appliedNotes: notes
    };
  }
}
