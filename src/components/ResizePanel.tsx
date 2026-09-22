import React from 'react';
import { PresetSize, ResizeConfig, ResizeFitMode } from '../lib/image-processing/types';
import { PresetSizes } from './PresetSizes';
import { ResizeEngine } from '../lib/image-processing/engines/ResizeEngine';
import { Lock, Unlock, Scaling, Maximize2 } from 'lucide-react';

interface ResizePanelProps {
  config: ResizeConfig;
  originalWidth: number;
  originalHeight: number;
  onChange: (config: ResizeConfig) => void;
  disabled?: boolean;
}

export const ResizePanel: React.FC<ResizePanelProps> = ({
  config,
  originalWidth,
  originalHeight,
  onChange,
  disabled
}) => {
  const handleWidthChange = (val: number) => {
    if (config.lockAspect) {
      const { width, height } = ResizeEngine.calculateAspectRatioDimensions(
        originalWidth,
        originalHeight,
        val,
        config.height,
        'width'
      );
      onChange({ ...config, width, height, presetId: undefined });
    } else {
      onChange({ ...config, width: val, presetId: undefined });
    }
  };

  const handleHeightChange = (val: number) => {
    if (config.lockAspect) {
      const { width, height } = ResizeEngine.calculateAspectRatioDimensions(
        originalWidth,
        originalHeight,
        config.width,
        val,
        'height'
      );
      onChange({ ...config, width, height, presetId: undefined });
    } else {
      onChange({ ...config, height: val, presetId: undefined });
    }
  };

  const toggleAspectLock = () => {
    onChange({ ...config, lockAspect: !config.lockAspect });
  };

  const handlePresetSelect = (preset: PresetSize) => {
    onChange({
      ...config,
      width: preset.width,
      height: preset.height,
      presetId: preset.id
    });
  };

  const setFitMode = (mode: ResizeFitMode) => {
    onChange({ ...config, mode });
  };

  return (
    <div className="tool-panel-content">
      {/* Dimension Inputs */}
      <div className="tool-group">
        <div className="tool-group-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Scaling size={16} color="var(--accent-primary)" />
            Custom Dimensions
          </span>
          <button
            type="button"
            className="btn btn-subtle"
            onClick={toggleAspectLock}
            disabled={disabled}
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', gap: '0.3rem' }}
            title={config.lockAspect ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
          >
            {config.lockAspect ? <Lock size={13} color="var(--accent-primary)" /> : <Unlock size={13} />}
            <span>{config.lockAspect ? 'Ratio Locked' : 'Ratio Unlocked'}</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
              Width (px)
            </label>
            <input
              type="number"
              className="input-number"
              value={config.width || ''}
              min={1}
              max={16000}
              onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
              disabled={disabled}
            />
          </div>

          <span style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>×</span>

          <div>
            <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginBottom: '2px' }}>
              Height (px)
            </label>
            <input
              type="number"
              className="input-number"
              value={config.height || ''}
              min={1}
              max={16000}
              onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Original vs Output Stats */}
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.65rem 0.85rem',
            fontSize: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            color: 'var(--text-secondary)'
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Original: </span>
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{originalWidth} × {originalHeight}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Output: </span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-primary)' }}>
              {config.width} × {config.height}
            </span>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      {/* Resize Scaling Mode */}
      <div className="tool-group">
        <div className="tool-group-title">
          <span>Scaling & Fit Behavior</span>
        </div>
        <p className="tool-group-desc">
          Controls how the photo fits inside the target frame when aspect ratios differ.
        </p>

        <div className="grid-2">
          <button
            type="button"
            className={`option-card-btn ${config.mode === 'fit' ? 'active' : ''}`}
            onClick={() => setFitMode('fit')}
            disabled={disabled}
          >
            <span style={{ fontWeight: 700 }}>Fit (Contain)</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>No cropping, full image visible</span>
          </button>

          <button
            type="button"
            className={`option-card-btn ${config.mode === 'fill' ? 'active' : ''}`}
            onClick={() => setFitMode('fill')}
            disabled={disabled}
          >
            <span style={{ fontWeight: 700 }}>Fill / Cover</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Fills entire frame cleanly</span>
          </button>

          <button
            type="button"
            className={`option-card-btn ${config.mode === 'crop' ? 'active' : ''}`}
            onClick={() => setFitMode('crop')}
            disabled={disabled}
          >
            <span style={{ fontWeight: 700 }}>Center Crop</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cuts edges to match ratio</span>
          </button>

          <button
            type="button"
            className={`option-card-btn ${config.mode === 'stretch' ? 'active' : ''}`}
            onClick={() => setFitMode('stretch')}
            disabled={disabled}
          >
            <span style={{ fontWeight: 700 }}>Stretch</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Forces exact W & H</span>
          </button>
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      {/* Presets List */}
      <PresetSizes
        selectedPresetId={config.presetId}
        onSelectPreset={handlePresetSelect}
        disabled={disabled}
      />
    </div>
  );
};
