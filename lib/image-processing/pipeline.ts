import { PipelineSettings, ResizeFitMode, UpscaleFactor } from './types';

export const DEFAULT_PIPELINE_SETTINGS: PipelineSettings = {
  rotateFlip: { rotation: 0, flipH: false, flipV: false },
  adjustments: { brightness: 0, contrast: 0, saturation: 0, blur: 0 },
  sharpen: 'none',
  denoise: 'none',
  upscale: 1,
  faceEnhance: { enabled: false, strength: 50 },
  resize: { width: 0, height: 0, lockAspect: true, mode: 'fit' as ResizeFitMode },
  exportConfig: { format: 'image/jpeg', quality: 0.92, width: 0, height: 0 }
};

export class PipelineManager {
  private history: PipelineSettings[] = [];
  private historyIndex = -1;
  private maxHistory = 30;

  constructor(initialSettings: PipelineSettings = DEFAULT_PIPELINE_SETTINGS) {
    this.pushState(initialSettings);
  }

  public getCurrentSettings(): PipelineSettings {
    if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
      return JSON.parse(JSON.stringify(this.history[this.historyIndex]));
    }
    return JSON.parse(JSON.stringify(DEFAULT_PIPELINE_SETTINGS));
  }

  public pushState(settings: PipelineSettings): void {
    // If we were in the middle of history, discard redo future
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push(JSON.parse(JSON.stringify(settings)));

    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  public canUndo(): boolean {
    return this.historyIndex > 0;
  }

  public canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }

  public undo(): PipelineSettings | null {
    if (!this.canUndo()) return null;
    this.historyIndex--;
    return this.getCurrentSettings();
  }

  public redo(): PipelineSettings | null {
    if (!this.canRedo()) return null;
    this.historyIndex++;
    return this.getCurrentSettings();
  }

  public reset(originalWidth: number, originalHeight: number): PipelineSettings {
    const fresh: PipelineSettings = {
      ...DEFAULT_PIPELINE_SETTINGS,
      resize: {
        width: originalWidth,
        height: originalHeight,
        lockAspect: true,
        mode: 'fit'
      },
      exportConfig: {
        format: 'image/jpeg',
        quality: 0.92,
        width: originalWidth,
        height: originalHeight
      }
    };
    this.pushState(fresh);
    return fresh;
  }
}
