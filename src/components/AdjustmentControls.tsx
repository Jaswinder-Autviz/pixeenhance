import React from 'react';
import { ColorAdjustments } from '../lib/image-processing/types';
import { Sliders, Sun, Contrast, Droplet, Sparkles } from 'lucide-react';

interface AdjustmentControlsProps {
  adjustments: ColorAdjustments;
  onChange: (adjustments: ColorAdjustments) => void;
  disabled?: boolean;
}

export const AdjustmentControls: React.FC<AdjustmentControlsProps> = ({
  adjustments,
  onChange,
  disabled
}) => {
  const handleChange = (key: keyof ColorAdjustments, val: number) => {
    onChange({ ...adjustments, [key]: val });
  };

  const resetAll = () => {
    onChange({ brightness: 0, contrast: 0, saturation: 0, blur: 0 });
  };

  const isModified =
    adjustments.brightness !== 0 ||
    adjustments.contrast !== 0 ||
    adjustments.saturation !== 0 ||
    adjustments.blur !== 0;

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sliders size={16} color="var(--accent-primary)" />
          Light & Color
        </span>
        {isModified && (
          <button
            type="button"
            className="btn btn-subtle"
            onClick={resetAll}
            disabled={disabled}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', color: 'var(--accent-rose)' }}
          >
            Reset
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '0.25rem' }}>
        {/* Brightness */}
        <div className="slider-control">
          <div className="slider-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sun size={14} color="var(--accent-amber)" /> Brightness
            </span>
            <span className="slider-val">{adjustments.brightness > 0 ? `+${adjustments.brightness}` : adjustments.brightness}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            step={1}
            value={adjustments.brightness}
            onChange={(e) => handleChange('brightness', parseInt(e.target.value, 10))}
            disabled={disabled}
          />
        </div>

        {/* Contrast */}
        <div className="slider-control">
          <div className="slider-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Contrast size={14} color="var(--accent-cyan)" /> Contrast
            </span>
            <span className="slider-val">{adjustments.contrast > 0 ? `+${adjustments.contrast}` : adjustments.contrast}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            step={1}
            value={adjustments.contrast}
            onChange={(e) => handleChange('contrast', parseInt(e.target.value, 10))}
            disabled={disabled}
          />
        </div>

        {/* Saturation */}
        <div className="slider-control">
          <div className="slider-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Droplet size={14} color="var(--accent-rose)" /> Saturation
            </span>
            <span className="slider-val">{adjustments.saturation > 0 ? `+${adjustments.saturation}` : adjustments.saturation}</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            step={1}
            value={adjustments.saturation}
            onChange={(e) => handleChange('saturation', parseInt(e.target.value, 10))}
            disabled={disabled}
          />
        </div>

        {/* Blur */}
        <div className="slider-control">
          <div className="slider-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} color="var(--accent-secondary)" /> Blur
            </span>
            <span className="slider-val">{adjustments.blur}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={adjustments.blur}
            onChange={(e) => handleChange('blur', parseInt(e.target.value, 10))}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
