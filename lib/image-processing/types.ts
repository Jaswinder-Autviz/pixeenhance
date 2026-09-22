export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageMeta {
  name: string;
  size: number;
  width: number;
  height: number;
  format: string;
  megapixels: number;
}

export type AspectRatioOption = 'free' | '1:1' | '4:5' | '16:9' | '9:16' | '2:3' | 'custom';

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
  aspect: AspectRatioOption;
}

export interface RotateFlipState {
  rotation: 0 | 90 | 180 | 270;
  flipH: boolean;
  flipV: boolean;
}

export interface ColorAdjustments {
  brightness: number; // -100 to 100
  contrast: number;   // -100 to 100
  saturation: number; // -100 to 100
  blur: number;       // 0 to 100
}

export type SharpenLevel = 'none' | 'low' | 'medium' | 'high';
export type DenoiseLevel = 'none' | 'low' | 'medium' | 'high';
export type UpscaleFactor = 1 | 2 | 4;

export interface FaceEnhanceConfig {
  enabled: boolean;
  strength: number; // 0 to 100
}

export type ResizeFitMode = 'fit' | 'fill' | 'crop' | 'stretch';

export interface ResizeConfig {
  width: number;
  height: number;
  lockAspect: boolean;
  mode: ResizeFitMode;
  presetId?: string;
}

export interface PresetSize {
  id: string;
  category: 'Print' | 'Social' | 'Display' | 'Custom';
  name: string;
  width: number;
  height: number;
  aspectRatioLabel: string;
  description: string;
}

export interface ExportConfig {
  format: ImageFormat;
  quality: number; // 0.1 to 1.0
  width: number;
  height: number;
}

export interface ProcessingState {
  isProcessing: boolean;
  stepName: string;
  progress: number; // 0 to 100
  canCancel: boolean;
}

export interface PipelineSettings {
  crop?: CropRect;
  rotateFlip: RotateFlipState;
  adjustments: ColorAdjustments;
  sharpen: SharpenLevel;
  denoise: DenoiseLevel;
  upscale: UpscaleFactor;
  faceEnhance: FaceEnhanceConfig;
  resize: ResizeConfig;
  exportConfig: ExportConfig;
}

export interface BatchItem {
  id: string;
  file: File;
  meta: ImageMeta;
  previewUrl: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  error?: string;
  outputBlob?: Blob;
  outputUrl?: string;
  outputDimensions?: { width: number; height: number };
}

export type ToolSection = 'enhance' | 'resize' | 'convert' | 'edit';
