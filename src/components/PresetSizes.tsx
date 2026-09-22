import React from 'react';
import { PRESET_SIZES } from '../lib/image-processing/presets';
import { PresetSize } from '../lib/image-processing/types';

interface PresetSizesProps {
  selectedPresetId?: string;
  onSelectPreset: (preset: PresetSize) => void;
  disabled?: boolean;
}

export const PresetSizes: React.FC<PresetSizesProps> = ({
  selectedPresetId,
  onSelectPreset,
  disabled
}) => {
  const categories: Array<PresetSize['category']> = ['Social', 'Display', 'Print'];

  return (
    <div className="tool-group">
      <div className="tool-group-title">
        <span>One-Click Preset Sizes</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {categories.map((cat) => (
          <div key={cat}>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.35rem',
                display: 'block'
              }}
            >
              {cat}
            </span>
            <div className="grid-2">
              {PRESET_SIZES.filter((p) => p.category === cat).map((p) => {
                const isSelected = selectedPresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`option-card-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => onSelectPreset(p)}
                    disabled={disabled}
                    style={{ padding: '0.55rem 0.5rem', alignItems: 'flex-start', textAlign: 'left' }}
                    title={p.description}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                      {p.name}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {p.width} × {p.height} px
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
