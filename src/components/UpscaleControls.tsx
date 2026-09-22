import React from 'react';
import { UpscaleFactor } from '../lib/image-processing/types';
import { Sparkles, Cpu, Check } from 'lucide-react';

interface UpscaleControlsProps {
  currentFactor: UpscaleFactor;
  originalWidth: number;
  originalHeight: number;
  onFactorChange: (factor: UpscaleFactor) => void;
  isProcessing: boolean;
}

export const UpscaleControls: React.FC<UpscaleControlsProps> = ({
  currentFactor,
  originalWidth,
  originalHeight,
  onFactorChange,
  isProcessing
}) => {
  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Sparkles size={16} color="var(--accent-primary)" />
          AI Super-Resolution
        </span>
        <span className="badge-privacy" style={{ fontSize: '0.65rem', padding: '0.15rem 0.55rem' }}>
          Real-ESRGAN
        </span>
      </div>

      <p className="tool-group-desc">
        Reconstruct lost high-frequency details with deep neural super-resolution models.
      </p>

      {/* Modern Studio Scale Cards */}
      <div className="grid-3" style={{ gap: '0.65rem' }}>
        <button
          type="button"
          className={`option-card-btn ${currentFactor === 1 ? 'active' : ''}`}
          onClick={() => onFactorChange(1)}
          disabled={isProcessing}
          style={{ padding: '0.85rem 0.5rem', textAlign: 'center' }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>1×</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>Native</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Original</span>
        </button>

        <button
          type="button"
          className={`option-card-btn ${currentFactor === 2 ? 'active' : ''}`}
          onClick={() => onFactorChange(2)}
          disabled={isProcessing}
          style={{ padding: '0.85rem 0.5rem', textAlign: 'center', position: 'relative' }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '2px' }}>✦</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>Upscale 2×</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '4px' }}>2× output</span>
        </button>

        <button
          type="button"
          className={`option-card-btn ${currentFactor === 4 ? 'active' : ''}`}
          onClick={() => onFactorChange(4)}
          disabled={isProcessing}
          style={{ padding: '0.85rem 0.5rem', textAlign: 'center', position: 'relative' }}
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-violet)', marginBottom: '2px' }}>✦</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>Upscale 4×</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-violet)', fontWeight: 600, marginTop: '4px' }}>4× output</span>
        </button>
      </div>

      {/* Target Canvas Metrics */}
      {originalWidth > 0 && originalHeight > 0 && (
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>Target Dimensions:</span>
          <span style={{ fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
            {originalWidth * currentFactor} × {originalHeight * currentFactor} px
          </span>
        </div>
      )}

      {/* Engine Provider info */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          background: 'rgba(255, 255, 255, 0.02)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <Cpu size={14} color="var(--accent-emerald)" />
        <span>Hardware Provider: WebGPU / WASM Local Shaders</span>
      </div>
    </div>
  );
};
