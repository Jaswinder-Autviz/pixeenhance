import React from 'react';
import { ExportConfig, ImageFormat, ImageMeta } from '../lib/image-processing/types';
import { ConversionEngine } from '../lib/image-processing/engines/ConversionEngine';
import { RefreshCw, FileText, Check } from 'lucide-react';

interface ConvertPanelProps {
  exportConfig: ExportConfig;
  sourceMeta: ImageMeta | null;
  targetWidth: number;
  targetHeight: number;
  onChange: (config: ExportConfig) => void;
  disabled?: boolean;
}

export const ConvertPanel: React.FC<ConvertPanelProps> = ({
  exportConfig,
  sourceMeta,
  targetWidth,
  targetHeight,
  onChange,
  disabled
}) => {
  const formats: Array<{ format: ImageFormat; label: string; desc: string }> = [
    { format: 'image/jpeg', label: 'JPG / JPEG', desc: 'Universal, compact lossy photo format' },
    { format: 'image/png', label: 'PNG', desc: 'Lossless quality with transparency support' },
    { format: 'image/webp', label: 'WebP', desc: 'Modern high-efficiency web image standard' }
  ];

  const estimatedBytes = ConversionEngine.estimateFileSize(
    targetWidth || sourceMeta?.width || 1000,
    targetHeight || sourceMeta?.height || 1000,
    exportConfig.format,
    exportConfig.quality
  );

  const handleFormatSelect = (format: ImageFormat) => {
    onChange({ ...exportConfig, format });
  };

  const handleQualityChange = (quality: number) => {
    onChange({ ...exportConfig, quality });
  };

  return (
    <div className="tool-panel-content">
      <div className="tool-group">
        <div className="tool-group-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <RefreshCw size={16} color="var(--accent-primary)" />
            Output Format
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
            {ConversionEngine.getExtensionForFormat(exportConfig.format).toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {formats.map((f) => {
            const isSelected = exportConfig.format === f.format;
            return (
              <button
                key={f.format}
                type="button"
                className={`option-card-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleFormatSelect(f.format)}
                disabled={disabled}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  textAlign: 'left'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{f.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                </div>
                {isSelected && <Check size={18} color="var(--accent-primary)" />}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      {/* Quality Control (for lossy formats JPG and WebP) */}
      {exportConfig.format !== 'image/png' ? (
        <div className="tool-group">
          <div className="slider-control">
            <div className="slider-header">
              <span>Compression Quality</span>
              <span className="slider-val">{Math.round(exportConfig.quality * 100)}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={1}
              value={Math.round(exportConfig.quality * 100)}
              onChange={(e) => handleQualityChange(parseInt(e.target.value, 10) / 100)}
              disabled={disabled}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>10% (Smallest file)</span>
              <span>85% (Recommended)</span>
              <span>100% (Max fidelity)</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          PNG encoding is lossless. No compression quality slider needed.
        </div>
      )}

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      {/* Conversion Metadata Overview */}
      <div className="tool-group">
        <div className="tool-group-title">
          <span>Format & Size Comparison</span>
        </div>

        <div
          style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            fontSize: '0.8rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Original Format:</span>
            <span style={{ fontWeight: 600 }}>{sourceMeta?.format?.replace('image/', '').toUpperCase() || 'PNG'}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Output Format:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
              {ConversionEngine.getExtensionForFormat(exportConfig.format).toUpperCase()}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Original File Size:</span>
            <span style={{ fontWeight: 600 }}>
              {sourceMeta ? ConversionEngine.formatBytes(sourceMeta.size) : '—'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Estimated Output Size:</span>
            <span style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
              ~{ConversionEngine.formatBytes(estimatedBytes)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
