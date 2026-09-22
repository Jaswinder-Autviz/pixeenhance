'use client';

import React, { useState } from 'react';
import { ExportConfig } from '@/lib/image-processing/types';
import { ConversionEngine } from '@/lib/image-processing/engines/ConversionEngine';
import { Download, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BottomToolbarProps {
  exportConfig: ExportConfig;
  currentWidth: number;
  currentHeight: number;
  originalName: string;
  onExport: () => Promise<void>;
  onReset: () => void;
  isProcessing: boolean;
}

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  exportConfig,
  currentWidth,
  currentHeight,
  originalName,
  onExport,
  onReset,
  isProcessing
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    setIsSuccess(false);
    try {
      await onExport();
      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 }
      });
      setTimeout(() => setIsSuccess(false), 4500);
    } catch (err) {
      console.error('Download export failed:', err);
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
    <div className="w-full bg-canvas-warm/95 border-t border-charcoal-border/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4 z-20">
      {/* Ready Status & Output Metrics */}
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 rounded-lg bg-emerald-900/10 border border-emerald-700/20 flex items-center justify-center text-emerald-800">
          <CheckCircle2 size={18} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 font-mono">
              Ready for Export
            </span>
            {isSuccess && (
              <span className="text-[11px] font-medium text-emerald-700">
                &bull; Download complete!
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-charcoal font-medium">
            <span className="font-mono font-bold text-charcoal">
              {currentWidth} × {currentHeight} px
            </span>
            <span className="text-charcoal-subtle">&bull;</span>
            <span className="text-bronze-deep font-semibold">{ext}</span>
            <span className="text-charcoal-subtle">&bull;</span>
            <span className="text-charcoal-muted">~{ConversionEngine.formatBytes(estimatedBytes)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isProcessing || isExporting}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-medium text-charcoal-muted hover:text-charcoal hover:bg-canvas-light transition-colors disabled:opacity-40"
        >
          <RotateCcw size={14} />
          <span>Reset Edits</span>
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isProcessing || isExporting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-charcoal text-canvas-light text-xs sm:text-sm font-semibold hover:bg-charcoal-warm transition-all duration-200 shadow-luxury active:scale-[0.99] disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 size={15} className="animate-spin text-bronze" />
              <span>Exporting {ext}...</span>
            </>
          ) : (
            <>
              <Download size={15} className="text-bronze" />
              <span>Download {ext}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
