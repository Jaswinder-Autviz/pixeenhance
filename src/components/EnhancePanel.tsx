import React from 'react';
import { UpscaleControls } from './UpscaleControls';
import { FaceEnhance } from './FaceEnhance';
import { SharpenControl } from './SharpenControl';
import { DenoiseControl } from './DenoiseControl';
import {
  DenoiseLevel,
  FaceEnhanceConfig,
  SharpenLevel,
  UpscaleFactor
} from '../lib/image-processing/types';

interface EnhancePanelProps {
  upscale: UpscaleFactor;
  faceEnhance: FaceEnhanceConfig;
  sharpen: SharpenLevel;
  denoise: DenoiseLevel;
  originalWidth: number;
  originalHeight: number;
  onUpscaleChange: (factor: UpscaleFactor) => void;
  onFaceEnhanceChange: (config: FaceEnhanceConfig) => void;
  onSharpenChange: (level: SharpenLevel) => void;
  onDenoiseChange: (level: DenoiseLevel) => void;
  isProcessing: boolean;
}

export const EnhancePanel: React.FC<EnhancePanelProps> = ({
  upscale,
  faceEnhance,
  sharpen,
  denoise,
  originalWidth,
  originalHeight,
  onUpscaleChange,
  onFaceEnhanceChange,
  onSharpenChange,
  onDenoiseChange,
  isProcessing
}) => {
  return (
    <div className="tool-panel-content">
      <UpscaleControls
        currentFactor={upscale}
        originalWidth={originalWidth}
        originalHeight={originalHeight}
        onFactorChange={onUpscaleChange}
        isProcessing={isProcessing}
      />

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      <FaceEnhance
        config={faceEnhance}
        onChange={onFaceEnhanceChange}
        isProcessing={isProcessing}
      />

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      <SharpenControl
        level={sharpen}
        onChange={onSharpenChange}
        isProcessing={isProcessing}
      />

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      <DenoiseControl
        level={denoise}
        onChange={onDenoiseChange}
        isProcessing={isProcessing}
      />
    </div>
  );
};
