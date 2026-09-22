import React from 'react';
import { ToolSection } from '../lib/image-processing/types';
import { EnhancePanel } from './EnhancePanel';
import { ResizePanel } from './ResizePanel';
import { ConvertPanel } from './ConvertPanel';
import { CropTool } from './CropTool';
import { RotateTool } from './RotateTool';
import { AdjustmentControls } from './AdjustmentControls';
import { PipelineSettings, ImageMeta } from '../lib/image-processing/types';
import { Sparkles, Scaling, RefreshCw, SlidersHorizontal } from 'lucide-react';

interface ToolSidebarProps {
  activeTab: ToolSection;
  onTabChange: (tab: ToolSection) => void;
  settings: PipelineSettings;
  onSettingsChange: (settings: PipelineSettings) => void;
  sourceMeta: ImageMeta | null;
  currentWidth: number;
  currentHeight: number;
  isProcessing: boolean;
}

export const ToolSidebar: React.FC<ToolSidebarProps> = ({
  activeTab,
  onTabChange,
  settings,
  onSettingsChange,
  sourceMeta,
  currentWidth,
  currentHeight,
  isProcessing
}) => {
  return (
    <aside className="tool-sidebar">
      {/* Top Section Nav Tabs */}
      <div className="tool-nav-tabs">
        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'enhance' ? 'active' : ''}`}
          onClick={() => onTabChange('enhance')}
        >
          <Sparkles size={16} />
          <span>AI Enhance</span>
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'resize' ? 'active' : ''}`}
          onClick={() => onTabChange('resize')}
        >
          <Scaling size={16} />
          <span>Resize</span>
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'convert' ? 'active' : ''}`}
          onClick={() => onTabChange('convert')}
        >
          <RefreshCw size={16} />
          <span>Convert</span>
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => onTabChange('edit')}
        >
          <SlidersHorizontal size={16} />
          <span>Edit</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'enhance' && (
        <EnhancePanel
          upscale={settings.upscale}
          faceEnhance={settings.faceEnhance}
          sharpen={settings.sharpen}
          denoise={settings.denoise}
          originalWidth={sourceMeta?.width || 0}
          originalHeight={sourceMeta?.height || 0}
          onUpscaleChange={(factor) => {
            const baseW = settings.crop ? settings.crop.width : (sourceMeta?.width || 800);
            const baseH = settings.crop ? settings.crop.height : (sourceMeta?.height || 600);
            const newW = baseW * factor;
            const newH = baseH * factor;
            onSettingsChange({
              ...settings,
              upscale: factor,
              resize: { ...settings.resize, width: newW, height: newH },
              exportConfig: { ...settings.exportConfig, width: newW, height: newH }
            });
          }}
          onFaceEnhanceChange={(cfg) => onSettingsChange({ ...settings, faceEnhance: cfg })}
          onSharpenChange={(lvl) => onSettingsChange({ ...settings, sharpen: lvl })}
          onDenoiseChange={(lvl) => onSettingsChange({ ...settings, denoise: lvl })}
          isProcessing={isProcessing}
        />
      )}

      {activeTab === 'resize' && (
        <ResizePanel
          config={settings.resize}
          originalWidth={sourceMeta?.width || 0}
          originalHeight={sourceMeta?.height || 0}
          onChange={(resize) =>
            onSettingsChange({
              ...settings,
              resize,
              exportConfig: {
                ...settings.exportConfig,
                width: resize.width,
                height: resize.height
              }
            })
          }
          disabled={isProcessing}
        />
      )}

      {activeTab === 'convert' && (
        <ConvertPanel
          exportConfig={settings.exportConfig}
          sourceMeta={sourceMeta}
          targetWidth={currentWidth}
          targetHeight={currentHeight}
          onChange={(exportConfig) => onSettingsChange({ ...settings, exportConfig })}
          disabled={isProcessing}
        />
      )}

      {activeTab === 'edit' && (
        <div className="tool-panel-content">
          <CropTool
            currentCrop={settings.crop}
            imageWidth={sourceMeta?.width || 800}
            imageHeight={sourceMeta?.height || 600}
            onApplyCrop={(crop) => {
              const newW = crop.width * settings.upscale;
              const newH = crop.height * settings.upscale;
              onSettingsChange({
                ...settings,
                crop,
                resize: { ...settings.resize, width: newW, height: newH },
                exportConfig: { ...settings.exportConfig, width: newW, height: newH }
              });
            }}
            onResetCrop={() => {
              const baseW = sourceMeta?.width || 800;
              const baseH = sourceMeta?.height || 600;
              const newW = baseW * settings.upscale;
              const newH = baseH * settings.upscale;
              onSettingsChange({
                ...settings,
                crop: undefined,
                resize: { ...settings.resize, width: newW, height: newH },
                exportConfig: { ...settings.exportConfig, width: newW, height: newH }
              });
            }}
            disabled={isProcessing}
          />

          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

          <RotateTool
            state={settings.rotateFlip}
            onChange={(rotateFlip) => onSettingsChange({ ...settings, rotateFlip })}
            disabled={isProcessing}
          />

          <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

          <AdjustmentControls
            adjustments={settings.adjustments}
            onChange={(adjustments) => onSettingsChange({ ...settings, adjustments })}
            disabled={isProcessing}
          />
        </div>
      )}
    </aside>
  );
};
