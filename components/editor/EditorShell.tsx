'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ImageMeta,
  PipelineSettings,
  ProcessingState
} from '@/lib/image-processing/types';
import { PipelineManager, DEFAULT_PIPELINE_SETTINGS } from '@/lib/image-processing/pipeline';
import { ImageProcessor } from '@/lib/image-processing/engines/ImageProcessor';
import { ConversionEngine } from '@/lib/image-processing/engines/ConversionEngine';
import { EditorSidebar, ToolTab } from './EditorSidebar';
import { ToolPanel } from './ToolPanel';
import { ImageCanvas } from './ImageCanvas';
import { BottomToolbar } from './BottomToolbar';
import { ViewMode } from '@/src/components/BeforeAfterSlider';
import {
  UploadCloud,
  FileImage,
  Sparkles,
  Undo2,
  Redo2,
  RotateCcw,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface EditorShellProps {
  initialImage?: { img: HTMLImageElement; file: File; meta: ImageMeta } | null;
  initialTab?: ToolTab;
  initialFactor?: 1 | 2 | 4;
}

export const EditorShell: React.FC<EditorShellProps> = ({
  initialImage,
  initialTab = 'ai',
  initialFactor = 1
}) => {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(initialImage?.img || null);
  const [sourceFile, setSourceFile] = useState<File | null>(initialImage?.file || null);
  const [sourceMeta, setSourceMeta] = useState<ImageMeta | null>(initialImage?.meta || null);
  const [activeTab, setActiveTab] = useState<ToolTab>(initialTab);

  const [processedCanvas, setProcessedCanvas] = useState<HTMLCanvasElement | null>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const [procState, setProcState] = useState<ProcessingState>({
    isProcessing: false,
    stepName: '',
    progress: 0,
    canCancel: false
  });

  const pipelineMgrRef = useRef<PipelineManager>(new PipelineManager(DEFAULT_PIPELINE_SETTINGS));
  const [currentSettings, setCurrentSettings] = useState<PipelineSettings>(DEFAULT_PIPELINE_SETTINGS);

  // Initialize Canvas when sourceImage changes
  useEffect(() => {
    if (!sourceImage) return;

    const canvas = document.createElement('canvas');
    canvas.width = sourceImage.width;
    canvas.height = sourceImage.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(sourceImage, 0, 0);
    originalCanvasRef.current = canvas;

    const fresh = pipelineMgrRef.current.reset(sourceImage.width, sourceImage.height);
    if (initialFactor > 1) {
      fresh.upscale = initialFactor;
      fresh.resize.width = sourceImage.width * initialFactor;
      fresh.resize.height = sourceImage.height * initialFactor;
      fresh.exportConfig.width = sourceImage.width * initialFactor;
      fresh.exportConfig.height = sourceImage.height * initialFactor;
    }
    setCurrentSettings(fresh);
    runPipeline(fresh);
  }, [sourceImage, initialFactor]);

  // Execute Pipeline on settings change
  const runPipeline = useCallback(async (settings: PipelineSettings) => {
    if (!originalCanvasRef.current) return;

    const needsHeavyAI = settings.upscale > 1;
    setProcState({
      isProcessing: needsHeavyAI,
      stepName: needsHeavyAI ? `Super-Resolution ${settings.upscale}× with AI...` : 'Rendering image...',
      progress: needsHeavyAI ? 20 : 60,
      canCancel: false
    });

    try {
      const result = await ImageProcessor.executePipeline(
        originalCanvasRef.current,
        settings,
        (msg, pct) => {
          setProcState((prev) => ({ ...prev, stepName: msg, progress: pct }));
        }
      );
      setProcessedCanvas(result.outputCanvas);
    } catch (err) {
      console.error('Pipeline execution error:', err);
    } finally {
      setProcState({
        isProcessing: false,
        stepName: '',
        progress: 100,
        canCancel: false
      });
    }
  }, []);

  const handleSettingsChange = (newSettings: PipelineSettings) => {
    const baseW = newSettings.crop && newSettings.crop.width > 0 ? newSettings.crop.width : (sourceImage?.width || 800);
    const baseH = newSettings.crop && newSettings.crop.height > 0 ? newSettings.crop.height : (sourceImage?.height || 600);

    let targetW = newSettings.resize.width;
    let targetH = newSettings.resize.height;

    // Recalculate if upscale factor changed
    if (newSettings.upscale !== currentSettings.upscale) {
      targetW = baseW * newSettings.upscale;
      targetH = baseH * newSettings.upscale;
    } else if (targetW <= 0 || targetH <= 0) {
      targetW = baseW * newSettings.upscale;
      targetH = baseH * newSettings.upscale;
    }

    const updated: PipelineSettings = {
      ...newSettings,
      resize: {
        ...newSettings.resize,
        width: targetW,
        height: targetH
      },
      exportConfig: {
        ...newSettings.exportConfig,
        width: targetW,
        height: targetH
      }
    };

    pipelineMgrRef.current.pushState(updated);
    setCurrentSettings(updated);
    runPipeline(updated);
  };

  // Secure Gemini Server-side Call
  const handleGeminiEnhance = async (mode: 'general' | 'face' | 'restore') => {
    if (!originalCanvasRef.current) return;

    setProcState({
      isProcessing: true,
      stepName: 'Consulting Gemini Neural Vision model...',
      progress: 30,
      canCancel: false
    });

    try {
      // Convert current original/adjusted canvas to data URL (JPEG for optimal transmission)
      const dataUrl = originalCanvasRef.current.toDataURL('image/jpeg', 0.88);

      const response = await fetch('/api/gemini/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataUrl,
          mimeType: 'image/jpeg',
          mode
        })
      });

      const json = await response.json();
      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Gemini API call failed.');
      }

      // Apply intelligent suggestions returned by Gemini
      const suggested = json.analysis?.suggestedAdjustments;
      if (suggested) {
        const nextSettings: PipelineSettings = {
          ...currentSettings,
          adjustments: {
            ...currentSettings.adjustments,
            contrast: suggested.contrast || currentSettings.adjustments.contrast,
            brightness: suggested.brightness || currentSettings.adjustments.brightness,
            saturation: suggested.saturation || currentSettings.adjustments.saturation
          },
          sharpen: suggested.sharpen || 'medium'
        };
        handleSettingsChange(nextSettings);
      }
    } catch (err: any) {
      console.error('Gemini error:', err);
    } finally {
      setProcState({
        isProcessing: false,
        stepName: '',
        progress: 100,
        canCancel: false
      });
    }
  };

  const handleUndo = () => {
    const prev = pipelineMgrRef.current.undo();
    if (prev) {
      setCurrentSettings(prev);
      runPipeline(prev);
    }
  };

  const handleRedo = () => {
    const next = pipelineMgrRef.current.redo();
    if (next) {
      setCurrentSettings(next);
      runPipeline(next);
    }
  };

  const handleReset = () => {
    if (!sourceImage) return;
    const fresh = pipelineMgrRef.current.reset(sourceImage.width, sourceImage.height);
    setCurrentSettings(fresh);
    runPipeline(fresh);
  };

  const handleExport = async () => {
    if (!processedCanvas || !sourceMeta) return;

    const targetW = currentSettings.exportConfig.width || processedCanvas.width;
    const targetH = currentSettings.exportConfig.height || processedCanvas.height;

    const blob = await ImageProcessor.exportImage(processedCanvas, {
      ...currentSettings.exportConfig,
      width: targetW,
      height: targetH
    });

    const ext = ConversionEngine.getExtensionForFormat(currentSettings.exportConfig.format);
    const baseName = sourceMeta.name.substring(0, sourceMeta.name.lastIndexOf('.')) || sourceMeta.name;
    const fileName = `${baseName}-pixenhance-${targetW}x${targetH}.${ext}`;

    ConversionEngine.downloadBlob(blob, fileName);
  };

  const handleFileLoad = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const meta: ImageMeta = {
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height,
          format: file.type || 'image/jpeg',
          megapixels: parseFloat(((img.width * img.height) / 1000000).toFixed(2))
        };
        setSourceImage(img);
        setSourceFile(file);
        setSourceMeta(meta);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const currentW = processedCanvas ? processedCanvas.width : (sourceMeta?.width || 0);
  const currentH = processedCanvas ? processedCanvas.height : (sourceMeta?.height || 0);

  // Zoom helpers
  const zoomIn = () => setZoomLevel((z) => Math.min(3, parseFloat((z + 0.25).toFixed(2))));
  const zoomOut = () => setZoomLevel((z) => Math.max(0.5, parseFloat((z - 0.25).toFixed(2))));
  const resetZoom = () => setZoomLevel(1);

  const toggleFullscreen = () => {
    if (!viewportRef.current) return;
    if (!document.fullscreenElement) {
      viewportRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div id="studio-workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 scroll-mt-20">
      {/* If No Image is Loaded: Show Classic Luxury Upload Zone */}
      {!sourceImage && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
              handleFileLoad(e.dataTransfer.files[0]);
            }
          }}
          className={`relative w-full rounded-2xl border-2 transition-all p-12 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer shadow-luxury ${
            isDragOver
              ? 'border-bronze bg-canvas-warm scale-[1.008]'
              : 'border-dashed border-charcoal-border/80 bg-canvas-light hover:border-bronze hover:bg-canvas-warm/50'
          }`}
          onClick={() => {
            const input = document.getElementById('hidden-file-input') as HTMLInputElement;
            input?.click();
          }}
        >
          <input
            id="hidden-file-input"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileLoad(e.target.files[0]);
              }
            }}
          />

          <div className="w-16 h-16 rounded-full bg-canvas-warm border border-charcoal-border/70 flex items-center justify-center text-bronze-rich mb-5 shadow-sm">
            <UploadCloud size={30} />
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal tracking-tight mb-2">
            Drop an image to begin
          </h2>
          <p className="text-sm text-charcoal-muted max-w-sm mb-6 font-normal">
            or <span className="text-bronze-deep font-semibold underline underline-offset-4">choose a file</span> from your computer
          </p>

          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-charcoal-subtle">
            <span className="px-2.5 py-1 rounded bg-canvas-warm border border-charcoal-border/60">JPG</span>
            <span className="px-2.5 py-1 rounded bg-canvas-warm border border-charcoal-border/60">PNG</span>
            <span className="px-2.5 py-1 rounded bg-canvas-warm border border-charcoal-border/60">WebP</span>
          </div>
        </div>
      )}

      {/* If Image is Loaded: Show Full Desktop-Class Photo Editor */}
      {sourceImage && sourceMeta && (
        <div className="relative rounded-2xl border border-charcoal-border/80 bg-canvas-light shadow-luxury-lg overflow-hidden flex flex-col">
          {/* Top Bar: Metadata & History Controls */}
          <div className="bg-canvas-warm/95 border-b border-charcoal-border/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-charcoal text-canvas-light text-xs font-semibold tracking-wide">
                <Sparkles size={13} className="text-bronze" />
                <span className="truncate max-w-[200px] sm:max-w-xs">{sourceMeta.name}</span>
              </span>
              <div className="hidden sm:flex items-center gap-2 text-xs text-charcoal-muted">
                <span>{sourceMeta.width} &times; {sourceMeta.height} px</span>
                <span>&bull;</span>
                <span>{ConversionEngine.formatBytes(sourceMeta.size)}</span>
                <span>&bull;</span>
                <span>{sourceMeta.megapixels} MP</span>
              </div>
            </div>

            {/* History & New Image Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUndo}
                disabled={!pipelineMgrRef.current.canUndo() || procState.isProcessing}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-charcoal-muted hover:text-charcoal hover:bg-canvas-light transition-colors disabled:opacity-30"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 size={14} />
                <span className="hidden sm:inline">Undo</span>
              </button>

              <button
                type="button"
                onClick={handleRedo}
                disabled={!pipelineMgrRef.current.canRedo() || procState.isProcessing}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium text-charcoal-muted hover:text-charcoal hover:bg-canvas-light transition-colors disabled:opacity-30"
                title="Redo (Ctrl+Y)"
              >
                <Redo2 size={14} />
                <span className="hidden sm:inline">Redo</span>
              </button>

              <div className="w-px h-4 bg-charcoal-border/80 mx-1" />

              <button
                type="button"
                onClick={() => {
                  setSourceImage(null);
                  setSourceFile(null);
                  setSourceMeta(null);
                  setProcessedCanvas(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-charcoal-border text-xs font-medium text-charcoal hover:bg-canvas-warm transition-colors"
              >
                <FileImage size={14} className="text-bronze-rich" />
                <span>New Image</span>
              </button>
            </div>
          </div>

          {/* Editor Workspace: Left Sidebar + Center Canvas + Right Tool Panel */}
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
            {/* Left Nav Strip */}
            <EditorSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              disabled={procState.isProcessing}
            />

            {/* Center Canvas Viewport */}
            <ImageCanvas
              originalCanvas={originalCanvasRef.current}
              processedCanvas={processedCanvas}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              zoomLevel={zoomLevel}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onResetZoom={resetZoom}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              viewportRef={viewportRef}
            />

            {/* Right Contextual Tool Panel */}
            <ToolPanel
              activeSection={activeTab}
              settings={currentSettings}
              sourceMeta={sourceMeta}
              currentWidth={currentW}
              currentHeight={currentH}
              onSettingsChange={handleSettingsChange}
              onGeminiEnhance={handleGeminiEnhance}
              isProcessing={procState.isProcessing}
            />
          </div>

          {/* Bottom Export & Status Bar */}
          <BottomToolbar
            exportConfig={currentSettings.exportConfig}
            currentWidth={currentW}
            currentHeight={currentH}
            originalName={sourceMeta.name}
            onExport={handleExport}
            onReset={handleReset}
            isProcessing={procState.isProcessing}
          />
        </div>
      )}

      {/* Non-blocking progress indicator modal */}
      {procState.isProcessing && (
        <div className="fixed bottom-6 right-6 z-50 bg-charcoal text-canvas-light px-5 py-3.5 rounded-xl shadow-luxury-lg flex items-center gap-3 border border-charcoal-border">
          <Loader2 size={18} className="animate-spin text-bronze" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold">{procState.stepName || 'Processing...'}</span>
            <span className="text-[11px] text-bronze-light font-mono">{procState.progress}% completed</span>
          </div>
        </div>
      )}
    </div>
  );
};
