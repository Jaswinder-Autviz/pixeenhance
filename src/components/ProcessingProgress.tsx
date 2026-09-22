import React from 'react';
import { Cpu, Loader2 } from 'lucide-react';
import { ProcessingState } from '../lib/image-processing/types';

interface ProcessingProgressProps {
  state: ProcessingState;
  onCancel?: () => void;
}

export const ProcessingProgress: React.FC<ProcessingProgressProps> = ({ state, onCancel }) => {
  if (!state.isProcessing) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Processing Image">
      <div className="modal-card">
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--accent-primary)'
          }}
        >
          <Loader2 size={28} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>
          {state.stepName || 'Processing Image...'}
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Computing locally in your browser using Web Workers and GPU shaders.
        </p>

        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${Math.max(5, state.progress)}%` }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <span className="pulsing-dot" /> Device Acceleration
          </span>
          <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)' }}>
            {Math.round(state.progress)}%
          </span>
        </div>

        {state.canCancel && onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            style={{ marginTop: '1.5rem', width: '100%', fontSize: '0.85rem' }}
          >
            Cancel Task
          </button>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
