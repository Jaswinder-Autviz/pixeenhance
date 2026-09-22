import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ImageMeta,
  PipelineSettings,
  ProcessingState,
  ToolSection
} from '../lib/image-processing/types';
import { PipelineManager, DEFAULT_PIPELINE_SETTINGS } from '../lib/image-processing/pipeline';
import { ImageProcessor } from '../lib/image-processing/engines/ImageProcessor';
import { ConversionEngine } from '../lib/image-processing/engines/ConversionEngine';
import { ToolSidebar } from './ToolSidebar';
import { BeforeAfterSlider, ViewMode } from './BeforeAfterSlider';
import { DownloadPanel } from './DownloadPanel';
import { ProcessingProgress } from './ProcessingProgress';
import { BatchProcessor } from './BatchProcessor';
import {
  Undo2,
  Redo2,
  RotateCcw,
  UploadCloud,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sparkles,
  Columns
} from 'lucide-react';

interface ImageWorkspaceProps {
  sourceImage: HTMLImageElement;
  sourceFile: File;
  sourceMeta: ImageMeta;
  initialTab?: ToolSection;
  initialFactor?: 1 | 2 | 4;
  onStartOver: () => void;
}

export const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({
  sourceImage,
  sourceFile,
  sourceMeta,
  initialTab = 'enhance',
  initialFactor = 1,
  onStartOver
}) => {
  const [activeTab, setActiveTab] = useState<ToolSection>(initialTab);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Original pristine canvas
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [processedCanvas, setProcessedCanvas] = useState<HTMLCanvasElement | null>(null);

  // Processing state
  const [procState, setProcState] = useState<ProcessingState>({
    isProcessing: false,
    stepName: '',
    progress: 0,
    canCancel: false
  });

  // Pipeline manager with undo/redo
  const pipelineMgrRef = useRef<PipelineManager>(
    new PipelineManager({
      ...DEFAULT_PIPELINE_SETTINGS,
      upscale: initialFactor,
      resize: {
        width: sourceImage.width * initialFactor,
        height: sourceImage.height * initialFactor,
        lockAspect: true,
        mode: 'fit'
      },
      exportConfig: {
        format: 'image/jpeg',
        quality: 0.92,
        width: sourceImage.width * initialFactor,
        height: sourceImage.height * initialFactor
      }
    })
  );

  const [currentSettings, setCurrentSettings] = useState<PipelineSettings>(() =>
    pipelineMgrRef.current.getCurrentSettings()
  );

  // Initialize original canvas
  useEffect(() => {
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

  // Execute pipeline
  const runPipeline = useCallback(
    async (settings: PipelineSettings) => {
      if (!originalCanvasRef.current) return;

      const needsHeavyAI = settings.upscale > 1;

      setProcState({
        isProcessing: needsHeavyAI,
        stepName: needsHeavyAI ? `Upscaling image ${settings.upscale}× with AI...` : 'Rendering canvas...',
        progress: needsHeavyAI ? 15 : 50,
        canCancel: false
      });

      try {
        const result = await ImageProcessor.executePipeline(
          originalCanvasRef.current,
          settings,
          (stepMsg, pct) => {
            setProcState((prev) => ({
              ...prev,
              stepName: stepMsg,
              progress: pct
            }));
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
    },
    []
  );

  const handleSettingsChange = (newSettings: PipelineSettings) => {
    const baseW = newSettings.crop && newSettings.crop.width > 0 ? newSettings.crop.width : sourceImage.width;
    const baseH = newSettings.crop && newSettings.crop.height > 0 ? newSettings.crop.height : sourceImage.height;

    let targetW = newSettings.resize.width;
    let targetH = newSettings.resize.height;

    // If upscale factor changed, recalculate target dimensions to match the new multiplier
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
    const fresh = pipelineMgrRef.current.reset(sourceImage.width, sourceImage.height);
    setCurrentSettings(fresh);
    runPipeline(fresh);
  };

  // Zoom controls
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

  // Export & Download
  const handleExport = async () => {
    if (!processedCanvas) return;

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

  const currentW = processedCanvas ? processedCanvas.width : sourceMeta.width;
  const currentH = processedCanvas ? processedCanvas.height : sourceMeta.height;

  return (
    <div className="workspace-container">
      {/* Top Bar: Studio Header, File Metadata & History Tools */}
      <div className="workspace-topbar">
        <div className="workspace-file-info">
          <span className="file-info-badge">
            <Sparkles size={14} color="var(--accent-primary)" />
            {sourceMeta.name}
          </span>
          <div className="file-info-meta">
            <span>{sourceMeta.width} × {sourceMeta.height} px</span>
            <span>&bull;</span>
            <span>{ConversionEngine.formatBytes(sourceMeta.size)}</span>
            <span>&bull;</span>
            <span>{sourceMeta.megapixels} MP</span>
          </div>
        </div>

        <div className="workspace-history-tools">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleUndo}
            disabled={!pipelineMgrRef.current.canUndo() || procState.isProcessing}
            title="Undo Edit (Ctrl+Z)"
            style={{ padding: '0.4rem 0.65rem' }}
          >
            <Undo2 size={16} />
            <span style={{ fontSize: '0.8rem' }}>Undo</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleRedo}
            disabled={!pipelineMgrRef.current.canRedo() || procState.isProcessing}
            title="Redo Edit (Ctrl+Y)"
            style={{ padding: '0.4rem 0.65rem' }}
          >
            <Redo2 size={16} />
            <span style={{ fontSize: '0.8rem' }}>Redo</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleReset}
            disabled={procState.isProcessing}
            title="Reset All Edits to Original"
            style={{ padding: '0.4rem 0.65rem' }}
          >
            <RotateCcw size={15} />
            <span style={{ fontSize: '0.8rem' }}>Reset</span>
          </button>

          <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)', margin: '0 0.25rem' }} />

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setIsBatchOpen(true)}
            title="Open Multi-Image Batch Queue"
            style={{ padding: '0.4rem 0.65rem', gap: '0.35rem' }}
          >
            <Layers size={15} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.8rem' }}>Batch Queue</span>
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={onStartOver}
            title="Upload a new image"
            style={{ padding: '0.4rem 0.65rem' }}
          >
            <UploadCloud size={15} />
            <span style={{ fontSize: '0.8rem' }}>New Image</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Sidebar + Viewport */}
      <div className="workspace-body">
        {/* Tool Sidebar */}
        <ToolSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          settings={currentSettings}
          onSettingsChange={handleSettingsChange}
          sourceMeta={sourceMeta}
          currentWidth={currentW}
          currentHeight={currentH}
          isProcessing={procState.isProcessing}
        />

        {/* Central Viewport with Checkerboard Background */}
        <div ref={viewportRef} className="canvas-viewport canvas-viewport-checkerboard">
          {originalCanvasRef.current && (
            <BeforeAfterSlider
              originalCanvas={originalCanvasRef.current}
              processedCanvas={processedCanvas || originalCanvasRef.current}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              zoomLevel={zoomLevel}
            />
          )}

          {/* Floating Zoom / Fit / Mode Toolbar */}
          <div className="viewport-control-bar">
            <button
              type="button"
              className="viewport-btn"
              onClick={zoomOut}
              disabled={zoomLevel <= 0.5}
              title="Zoom Out"
            >
              <ZoomOut size={13} />
            </button>

            <button
              type="button"
              className="viewport-btn"
              onClick={resetZoom}
              title="Reset to 100%"
              style={{ fontFamily: 'monospace' }}
            >
              {Math.round(zoomLevel * 100)}%
            </button>

            <button
              type="button"
              className="viewport-btn"
              onClick={zoomIn}
              disabled={zoomLevel >= 3}
              title="Zoom In"
            >
              <ZoomIn size={13} />
            </button>

            <div style={{ width: '1px', height: '14px', background: 'var(--border-subtle)', margin: '0 2px' }} />

            <button
              type="button"
              className={`viewport-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
              title="Split Comparison Slider"
            >
              <Columns size={13} />
              <span>Split</span>
            </button>

            <button
              type="button"
              className={`viewport-btn ${viewMode === 'before' ? 'active' : ''}`}
              onClick={() => setViewMode('before')}
              title="View Original Image Only"
            >
              <span>Before</span>
            </button>

            <button
              type="button"
              className={`viewport-btn ${viewMode === 'after' ? 'active' : ''}`}
              onClick={() => setViewMode('after')}
              title="View Enhanced Image Only"
            >
              <span>After</span>
            </button>

            <div style={{ width: '1px', height: '14px', background: 'var(--border-subtle)', margin: '0 2px' }} />

            <button
              type="button"
              className="viewport-btn"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen View"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Studio Bottom Bar: Export & Ready Card */}
      <div className="workspace-bottombar">
        <DownloadPanel
          exportConfig={currentSettings.exportConfig}
          currentWidth={currentW}
          currentHeight={currentH}
          originalName={sourceMeta.name}
          onExport={handleExport}
          onReset={handleReset}
          isProcessing={procState.isProcessing}
        />
      </div>

      {/* Non-blocking progress modal */}
      <ProcessingProgress state={procState} />

      {/* Batch Processing Queue Modal */}
      <BatchProcessor
        currentSettings={currentSettings}
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
      />
    </div>
  );
};
