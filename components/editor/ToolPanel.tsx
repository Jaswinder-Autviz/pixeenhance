'use client';

import React from 'react';
import { PipelineSettings, ImageMeta } from '@/lib/image-processing/types';
import { AIEnhancePanel } from '@/components/tools/AIEnhancePanel';
import { ResizePanel } from '@/components/tools/ResizePanel';
import { EditPanel } from '@/components/tools/EditPanel';
import { ConvertPanel } from '@/components/tools/ConvertPanel';

interface ToolPanelProps {
  activeSection: 'ai' | 'resize' | 'edit' | 'convert';
  settings: PipelineSettings;
  sourceMeta: ImageMeta | null;
  currentWidth: number;
  currentHeight: number;
  onSettingsChange: (newSettings: PipelineSettings) => void;
  onGeminiEnhance?: (mode: 'general' | 'face' | 'restore') => Promise<void>;
  isProcessing: boolean;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({
  activeSection,
  settings,
  sourceMeta,
  currentWidth,
  currentHeight,
  onSettingsChange,
  onGeminiEnhance,
  isProcessing
}) => {
  return (
    <div className="w-full lg:w-80 xl:w-96 bg-canvas-light border-l border-charcoal-border/80 p-6 flex flex-col justify-start overflow-y-auto max-h-[750px] shadow-sm">
      {activeSection === 'ai' && (
        <AIEnhancePanel
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
          onGeminiEnhance={onGeminiEnhance}
          isProcessing={isProcessing}
        />
      )}

      {activeSection === 'resize' && (
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

      {activeSection === 'edit' && (
        <EditPanel
          crop={settings.crop}
          rotateFlip={settings.rotateFlip}
          adjustments={settings.adjustments}
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
          onRotateFlipChange={(rf) => onSettingsChange({ ...settings, rotateFlip: rf })}
          onAdjustmentsChange={(adj) => onSettingsChange({ ...settings, adjustments: adj })}
          disabled={isProcessing}
        />
      )}

      {activeSection === 'convert' && (
        <ConvertPanel
          exportConfig={settings.exportConfig}
          targetWidth={currentWidth}
          targetHeight={currentHeight}
          onChange={(cfg) => onSettingsChange({ ...settings, exportConfig: cfg })}
          disabled={isProcessing}
        />
      )}
    </div>
  );
};
