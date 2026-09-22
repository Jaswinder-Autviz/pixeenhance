import React from 'react';
import { FaceEnhanceConfig } from '../lib/image-processing/types';
import { UserCheck, Info } from 'lucide-react';

interface FaceEnhanceProps {
  config: FaceEnhanceConfig;
  onChange: (config: FaceEnhanceConfig) => void;
  isProcessing: boolean;
}

export const FaceEnhance: React.FC<FaceEnhanceProps> = ({ config, onChange, isProcessing }) => {
  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <UserCheck size={16} color="var(--accent-primary)" />
          Face Enhance
        </span>
        <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', gap: '0.4rem' }}>
          <input
            type="checkbox"
            checked={config.enabled}
            onChange={(e) => onChange({ ...config, enabled: e.target.checked })}
            disabled={isProcessing}
            style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Enable</span>
        </label>
      </div>

      <p className="tool-group-desc">
        Locally detects portrait skin tones and smooths facial blemishes while sharpening eye and lip contours.
      </p>

      {config.enabled && (
        <div className="slider-control" style={{ marginTop: '0.5rem' }}>
          <div className="slider-header">
            <span>Enhancement Strength</span>
            <span className="slider-val">{config.strength}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={config.strength}
            onChange={(e) => onChange({ ...config, strength: parseInt(e.target.value, 10) })}
            disabled={isProcessing}
          />
        </div>
      )}

      <div
        style={{
          fontSize: '0.725rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.4rem',
          background: 'var(--bg-surface-elevated)',
          padding: '0.5rem 0.65rem',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <Info size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          High-precision portrait detail restoration and bilateral skin smoothing.
        </span>
      </div>
    </div>
  );
};
