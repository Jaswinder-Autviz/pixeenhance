import React from 'react';
import { DenoiseLevel } from '../lib/image-processing/types';
import { Wand2 } from 'lucide-react';

interface DenoiseControlProps {
  level: DenoiseLevel;
  onChange: (level: DenoiseLevel) => void;
  isProcessing: boolean;
}

export const DenoiseControl: React.FC<DenoiseControlProps> = ({ level, onChange, isProcessing }) => {
  const levels: DenoiseLevel[] = ['none', 'low', 'medium', 'high'];

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Wand2 size={16} color="var(--accent-primary)" />
          Denoise
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          {level}
        </span>
      </div>

      <p className="tool-group-desc">
        Edge-preserving bilateral filter to suppress ISO sensor noise and compression grain.
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
