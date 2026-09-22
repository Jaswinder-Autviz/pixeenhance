import React, { useState } from 'react';
import { ExportConfig } from '../lib/image-processing/types';
import { ConversionEngine } from '../lib/image-processing/engines/ConversionEngine';
import { Download, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadPanelProps {
  exportConfig: ExportConfig;
  currentWidth: number;
  currentHeight: number;
  originalName: string;
  onExport: () => Promise<void>;
  onReset?: () => void;
  isProcessing: boolean;
}

export const DownloadPanel: React.FC<DownloadPanelProps> = ({
  exportConfig,
  currentWidth,
  currentHeight,
  originalName,
  onExport,
  onReset,
  isProcessing
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    setDownloadSuccess(false);
    try {
      await onExport();
      setDownloadSuccess(true);
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.85 }
      });
      setTimeout(() => setDownloadSuccess(false), 4500);
    } catch (err) {
      console.error('Export download failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const ext = ConversionEngine.getExtensionForFormat(exportConfig.format).toUpperCase();
  const estimatedBytes = ConversionEngine.estimateFileSize(
    currentWidth,
    currentHeight,
    exportConfig.format,
    exportConfig.quality
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}
    >
      {/* Ready Status Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(99, 102, 241, 0.12)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}
        >
          <CheckCircle2 size={20} color="var(--accent-emerald)" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              Your image is ready
            </span>
            {downloadSuccess && (
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                &bull; Downloaded!
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
            <span style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
              {currentWidth} × {currentHeight} px
            </span>
            <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
            <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>{ext}</span>
            <span style={{ color: 'var(--text-muted)' }}>&bull;</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              ~{ConversionEngine.formatBytes(estimatedBytes)}
            </span>
          </div>
        </div>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {onReset && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onReset}
            disabled={isProcessing}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
          >
            <RotateCcw size={15} />
            <span>Reset Edits</span>
          </button>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isProcessing || isExporting}
          style={{
            padding: '0.75rem 1.65rem',
            fontSize: '0.95rem',
            minWidth: '200px',
            gap: '0.55rem'
          }}
        >
          <Download size={18} />
          <span>{isExporting ? 'Exporting...' : `Download ${ext}`}</span>
        </button>
      </div>
    </div>
  );
};
