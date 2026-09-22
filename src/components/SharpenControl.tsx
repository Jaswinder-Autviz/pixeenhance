import React from 'react';
import { SharpenLevel } from '../lib/image-processing/types';
import { Focus } from 'lucide-react';

interface SharpenControlProps {
  level: SharpenLevel;
  onChange: (level: SharpenLevel) => void;
  isProcessing: boolean;
}

export const SharpenControl: React.FC<SharpenControlProps> = ({ level, onChange, isProcessing }) => {
  const levels: SharpenLevel[] = ['none', 'low', 'medium', 'high'];

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Focus size={16} color="var(--accent-primary)" />
          Sharpen
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          {level}
        </span>
      </div>

      <p className="tool-group-desc">
        Unsharp masking convolution to restore soft edges and line clarity.
      </p>

      <div className="grid-2" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {levels.map((lvl) => (
          <button
            key={lvl}
            type="button"
            className={`option-card-btn ${level === lvl ? 'active' : ''}`}
            onClick={() => onChange(lvl)}
            disabled={isProcessing}
            style={{ padding: '0.5rem 0.25rem', textTransform: 'capitalize', fontSize: '0.8rem' }}
          >
            {lvl === 'none' ? 'Off' : lvl}
          </button>
        ))}
      </div>
    </div>
  );
};
