import React from 'react';
import { RotateFlipState } from '../lib/image-processing/types';
import { RotateCcw, RotateCw, RefreshCw, FlipHorizontal, FlipVertical } from 'lucide-react';

interface RotateToolProps {
  state: RotateFlipState;
  onChange: (state: RotateFlipState) => void;
  disabled?: boolean;
}

export const RotateTool: React.FC<RotateToolProps> = ({ state, onChange, disabled }) => {
  const rotateLeft = () => {
    const nextRot = ((state.rotation - 90 + 360) % 360) as 0 | 90 | 180 | 270;
    onChange({ ...state, rotation: nextRot });
  };

  const rotateRight = () => {
    const nextRot = ((state.rotation + 90) % 360) as 0 | 90 | 180 | 270;
    onChange({ ...state, rotation: nextRot });
  };

  const rotate180 = () => {
    const nextRot = ((state.rotation + 180) % 360) as 0 | 90 | 180 | 270;
    onChange({ ...state, rotation: nextRot });
  };

  const toggleFlipH = () => {
    onChange({ ...state, flipH: !state.flipH });
  };

  const toggleFlipV = () => {
    onChange({ ...state, flipV: !state.flipV });
  };

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <RotateCw size={16} color="var(--accent-primary)" />
          Rotate & Flip
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {state.rotation}° {state.flipH ? '• Flip H' : ''} {state.flipV ? '• Flip V' : ''}
        </span>
      </div>

      <div className="grid-3" style={{ marginBottom: '0.5rem' }}>
        <button
          type="button"
          className="option-card-btn"
          onClick={rotateLeft}
          disabled={disabled}
          title="Rotate Left 90°"
        >
          <RotateCcw size={16} />
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>-90° Left</span>
        </button>

        <button
          type="button"
          className="option-card-btn"
          onClick={rotateRight}
          disabled={disabled}
          title="Rotate Right 90°"
        >
          <RotateCw size={16} />
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>+90° Right</span>
        </button>

        <button
          type="button"
          className="option-card-btn"
          onClick={rotate180}
          disabled={disabled}
          title="Rotate 180°"
        >
          <RefreshCw size={16} />
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>180° Flip</span>
        </button>
      </div>

      <div className="grid-2">
        <button
          type="button"
          className={`option-card-btn ${state.flipH ? 'active' : ''}`}
          onClick={toggleFlipH}
          disabled={disabled}
          title="Horizontal Mirror Flip"
        >
          <FlipHorizontal size={16} />
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>Flip Horizontal</span>
        </button>

        <button
          type="button"
          className={`option-card-btn ${state.flipV ? 'active' : ''}`}
          onClick={toggleFlipV}
          disabled={disabled}
          title="Vertical Mirror Flip"
        >
          <FlipVertical size={16} />
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>Flip Vertical</span>
        </button>
      </div>
    </div>
  );
};
