'use client';

import React from 'react';
import { ExportConfig, ImageFormat } from '@/lib/image-processing/types';
import { ConversionEngine } from '@/lib/image-processing/engines/ConversionEngine';
import { RefreshCw, Check, ShieldCheck } from 'lucide-react';

interface ConvertPanelProps {
  exportConfig: ExportConfig;
  targetWidth: number;
  targetHeight: number;
  onChange: (config: ExportConfig) => void;
  disabled?: boolean;
}

export const ConvertPanel: React.FC<ConvertPanelProps> = ({
  exportConfig,
  targetWidth,
  targetHeight,
  onChange,
  disabled
}) => {
  const formats: Array<{ format: ImageFormat; label: string; desc: string }> = [
    { format: 'image/jpeg', label: 'JPG / JPEG', desc: 'Universal, compact photo format' },
    { format: 'image/png', label: 'PNG', desc: 'Lossless quality with transparency' },
    { format: 'image/webp', label: 'WebP', desc: 'Modern web image standard' }
  ];

  const estimatedBytes = ConversionEngine.estimateFileSize(
    targetWidth || 1920,
    targetHeight || 1080,
    exportConfig.format,
    exportConfig.quality
  );

  return (
    <div className="flex flex-col gap-6 text-charcoal">
      {/* 1. Format Selection */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw size={16} className="text-bronze-rich" />
            <h3 className="font-serif text-sm font-bold tracking-wide text-charcoal">
              Output Format
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-bronze-deep">
            {ConversionEngine.getExtensionForFormat(exportConfig.format).toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {formats.map((f) => {
            const isSelected = exportConfig.format === f.format;
            return (
              <button
                key={f.format}
                type="button"
                onClick={() => onChange({ ...exportConfig, format: f.format })}
                disabled={disabled}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-charcoal text-canvas-light border-charcoal shadow-sm'
                    : 'bg-canvas-light text-charcoal border-charcoal-border hover:bg-canvas-warm'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{f.label}</div>
                  <div className="text-[11px] opacity-75">{f.desc}</div>
                </div>
                {isSelected && <Check size={16} className="text-bronze" />}
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-charcoal-border/60" />

      {/* 2. Quality Control (for JPG and WebP) */}
      {exportConfig.format !== 'image/png' ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs text-charcoal-muted font-medium">
            <span>Compression Quality</span>
            <span className="font-mono text-charcoal font-bold">{Math.round(exportConfig.quality * 100)}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={Math.round(exportConfig.quality * 100)}
            onChange={(e) => onChange({ ...exportConfig, quality: Number(e.target.value) / 100 })}
            disabled={disabled}
            className="w-full h-1.5 bg-charcoal-border rounded-lg appearance-none cursor-pointer accent-charcoal"
          />
          <span className="text-[11px] text-charcoal-subtle">
            Lower quality reduces file size; 85–92% delivers optimal clarity.
          </span>
        </div>
      ) : (
        <div className="p-3 rounded bg-canvas-warm border border-charcoal-border/60 text-xs text-charcoal-muted">
          PNG uses lossless DEFLATE compression. Quality remains 100% pixel-perfect.
        </div>
      )}

      {/* 3. Estimated Output Size */}
      <div className="flex items-center justify-between p-3 rounded bg-canvas-warm border border-charcoal-border/80 text-xs">
        <span className="text-charcoal-muted">Estimated File Size:</span>
        <span className="font-mono font-bold text-bronze-deep">
          ~{ConversionEngine.formatBytes(estimatedBytes)}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-medium">
        <ShieldCheck size={13} className="text-emerald-700" />
        <span>Fast conversion &bull; 100% Private</span>
      </div>
    </div>
  );
};
