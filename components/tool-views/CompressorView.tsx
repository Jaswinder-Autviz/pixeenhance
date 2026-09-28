'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Download,
  RotateCcw,
  TrendingDown,
  Target,
  Check,
  Loader2,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  compressImage,
  compressToTargetSize,
  downloadBlob,
  formatFileSize,
} from '@/src/lib/imageUtils';

interface TargetSizeOption {
  label: string;
  value: string;
  bytes?: number;
}

const TARGET_SIZE_OPTIONS: TargetSizeOption[] = [
  { label: 'Auto / Best Quality', value: 'auto' },
  { label: '5 KB', value: '5kb', bytes: 5 * 1024 },
  { label: '10 KB', value: '10kb', bytes: 10 * 1024 },
  { label: '15 KB', value: '15kb', bytes: 15 * 1024 },
  { label: '20 KB', value: '20kb', bytes: 20 * 1024 },
  { label: '20–50 KB', value: '20-50kb', bytes: 35 * 1024 },
  { label: '25 KB', value: '25kb', bytes: 25 * 1024 },
  { label: '30 KB', value: '30kb', bytes: 30 * 1024 },
  { label: '40 KB', value: '40kb', bytes: 40 * 1024 },
  { label: '50 KB', value: '50kb', bytes: 50 * 1024 },
  { label: '60 KB', value: '60kb', bytes: 60 * 1024 },
  { label: '70 KB', value: '70kb', bytes: 70 * 1024 },
  { label: '80 KB', value: '80kb', bytes: 80 * 1024 },
  { label: '90 KB', value: '90kb', bytes: 90 * 1024 },
  { label: '100 KB', value: '100kb', bytes: 100 * 1024 },
  { label: '150 KB', value: '150kb', bytes: 150 * 1024 },
  { label: '200 KB', value: '200kb', bytes: 200 * 1024 },
  { label: '300 KB', value: '300kb', bytes: 300 * 1024 },
  { label: '500 KB', value: '500kb', bytes: 500 * 1024 },
  { label: '1 MB', value: '1mb', bytes: 1024 * 1024 },
  { label: '2 MB', value: '2mb', bytes: 2 * 1024 * 1024 },
  { label: 'Custom Size', value: 'custom' },
];

interface TargetSizeButtonsProps {
  selectedTarget: string;
  onSelectTarget: (value: string) => void;
  customValue: number;
  setCustomValue: (val: number) => void;
  customUnit: 'KB' | 'MB';
  setCustomUnit: (unit: 'KB' | 'MB') => void;
  onApplyCustom: () => void;
  isProcessing?: boolean;
}

function TargetSizeButtons({
  selectedTarget,
  onSelectTarget,
  customValue,
  setCustomValue,
  customUnit,
  setCustomUnit,
  onApplyCustom,
  isProcessing = false,
}: TargetSizeButtonsProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Target File Size
        </label>
        {isProcessing && (
          <div className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Compressing toward target...</span>
          </div>
        )}
      </div>

      {/* Selectable Size Buttons */}
      <div className="flex flex-wrap gap-2">
        {TARGET_SIZE_OPTIONS.map((opt) => {
          const isSelected = selectedTarget === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelectTarget(opt.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-brand-600 dark:bg-brand-500 text-white border-brand-600 dark:border-brand-500 shadow-sm shadow-brand-500/25 ring-2 ring-brand-500/20 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400 dark:hover:border-brand-600 hover:bg-brand-50/40 dark:hover:bg-slate-750'
              }`}
            >
              {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Custom Size Input Controls: [ 350 ] [ KB ] [ Apply ] */}
      {selectedTarget === 'custom' && (
        <div className="flex items-center gap-2 pt-2 animate-in fade-in slide-in-from-top-1 duration-150 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Enter custom target:
          </span>
          <div className="w-24 sm:w-28 relative">
            <input
              type="number"
              min="1"
              max={customUnit === 'MB' ? 100 : 50000}
              value={customValue}
              onChange={(e) => setCustomValue(Math.max(1, Number(e.target.value)))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onApplyCustom();
                }
              }}
              className="w-full px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-2xs"
              placeholder="350"
            />
          </div>

          <select
            value={customUnit}
            onChange={(e) => setCustomUnit(e.target.value as 'KB' | 'MB')}
            className="px-3 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-2xs cursor-pointer"
          >
            <option value="KB">KB</option>
            <option value="MB">MB</option>
          </select>

          <button
            type="button"
            onClick={onApplyCustom}
            className="px-4 py-1.5 sm:py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export function CompressorView() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  // Target size state (default: 'auto')
  const [selectedTarget, setSelectedTarget] = useState<string>('auto');
  const [customValue, setCustomValue] = useState<number>(350);
  const [customUnit, setCustomUnit] = useState<'KB' | 'MB'>('KB');
  const [appliedCustomBytes, setAppliedCustomBytes] = useState<number>(350 * 1024);

  // Settings
  const [outputFormat, setOutputFormat] = useState<string>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setOriginalPreview(url);

    if (selectedFile.type === 'image/webp') {
      setOutputFormat('image/webp');
    } else {
      setOutputFormat('image/jpeg');
    }
  };

  const getTargetInfo = useCallback(() => {
    if (selectedTarget === 'auto') {
      return { bytes: null, label: 'Auto / Best Quality' };
    }
    if (selectedTarget === 'custom') {
      return {
        bytes: appliedCustomBytes,
        label: `${customValue} ${customUnit}`,
      };
    }
    const option = TARGET_SIZE_OPTIONS.find((o) => o.value === selectedTarget);
    return {
      bytes: option?.bytes || null,
      label: option?.label || 'Auto / Best Quality',
    };
  }, [selectedTarget, appliedCustomBytes, customValue, customUnit]);

  const processCompression = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const { bytes } = getTargetInfo();

      if (bytes && selectedTarget !== 'auto') {
        // Target file size compression with automatic quality & aspect ratio preservation
        const result = await compressToTargetSize(file, bytes, outputFormat);
        setCompressedBlob(result.blob);
        setCompressedSize(result.compressedSize);
        if (compressedPreview) URL.revokeObjectURL(compressedPreview);
        setCompressedPreview(URL.createObjectURL(result.blob));
      } else {
        // Auto / Best Quality: use existing PixEnhance compression behavior (quality: 82%)
        const result = await compressImage(file, 0.82, outputFormat);
        // Never increase file size if original was already smaller than or equal
        let finalBlob = result.blob;
        if (result.compressedSize > file.size && file.type === outputFormat) {
          finalBlob = file;
        }
        setCompressedBlob(finalBlob);
        setCompressedSize(finalBlob.size);
        if (compressedPreview) URL.revokeObjectURL(compressedPreview);
        setCompressedPreview(URL.createObjectURL(finalBlob));
      }
    } catch (err) {
      console.error('Compression error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [file, getTargetInfo, selectedTarget, outputFormat, compressedPreview]);

  useEffect(() => {
    if (file) {
      processCompression();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, selectedTarget, appliedCustomBytes, outputFormat]);

  const handleSelectTarget = (val: string) => {
    setSelectedTarget(val);
  };

  const handleApplyCustom = () => {
    const bytes = customValue * (customUnit === 'MB' ? 1024 * 1024 : 1024);
    setAppliedCustomBytes(bytes);
    setSelectedTarget('custom');
  };

  const handleDownload = () => {
    if (!compressedBlob || !file) return;
    const ext = outputFormat === 'image/webp' ? 'webp' : 'jpg';
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(compressedBlob, `${nameWithoutExt}-compressed.${ext}`);
  };

  const handleReset = () => {
    if (originalPreview) URL.revokeObjectURL(originalPreview);
    if (compressedPreview) URL.revokeObjectURL(compressedPreview);
    setFile(null);
    setOriginalPreview(null);
    setCompressedBlob(null);
    setCompressedPreview(null);
    setCompressedSize(0);
  };

  const savingsPercent =
    file && compressedSize > 0
      ? Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100))
      : 0;

  const targetDisplay = getTargetInfo().label;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <div className="space-y-6">
          {/* Target File Size Selectable Buttons Control positioned cleanly above the compressor */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Choose Target Compression Size
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any size button to compress directly toward that target, or choose Auto / Best Quality
                </p>
              </div>
            </div>

            {/* Target Size Selectable Buttons */}
            <TargetSizeButtons
              selectedTarget={selectedTarget}
              onSelectTarget={handleSelectTarget}
              customValue={customValue}
              setCustomValue={setCustomValue}
              customUnit={customUnit}
              setCustomUnit={setCustomUnit}
              onApplyCustom={handleApplyCustom}
              isProcessing={isProcessing}
            />
          </div>

          {/* Main Upload DropZone */}
          <DropZone
            onFileSelect={handleFileSelect}
            title="Drop image here to compress"
            subtitle="Supports JPG, PNG, and WebP up to 50MB"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Metrics & Statistics Bar showing Original, Target, and Compressed Size */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 1. Original Size */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Original Size</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                {formatFileSize(file.size)}
              </p>
            </div>

            {/* 2. Target Size */}
            <div className="rounded-xl border border-brand-200/80 dark:border-brand-900/60 bg-brand-50/30 dark:bg-brand-950/20 p-4 shadow-2xs">
              <span className="text-xs text-brand-600 dark:text-brand-400 font-medium">Target Size</span>
              <p className="text-base font-bold text-brand-700 dark:text-brand-300 mt-0.5 truncate">
                {targetDisplay}
              </p>
            </div>

            {/* 3. Compressed Size */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xs">
              <span className="text-xs text-slate-400 font-medium">Compressed Size</span>
              <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 truncate flex items-center gap-1.5">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                    <span className="text-sm font-semibold text-slate-500">Processing...</span>
                  </>
                ) : (
                  formatFileSize(compressedSize)
                )}
              </p>
            </div>

            {/* 4. Reduction Percentage */}
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 shadow-2xs">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Reduction
              </span>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <TrendingDown className="h-4 w-4 shrink-0" />
                <span>{savingsPercent}% Saved</span>
              </p>
            </div>
          </div>

          {/* Previews Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 overflow-hidden shadow-2xs">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
                <span>Before (Original)</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                {originalPreview && (
                  <img
                    src={originalPreview}
                    alt="Original preview"
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
            </div>

            {/* Compressed Preview */}
            <div className="rounded-2xl border border-brand-200 dark:border-brand-900/50 bg-white dark:bg-slate-900 p-4 overflow-hidden shadow-2xs">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>After (Compressed)</span>
                <span>{isProcessing ? 'Optimizing...' : formatFileSize(compressedSize)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-700/50 relative">
                {compressedPreview ? (
                  <img
                    src={compressedPreview}
                    alt="Compressed preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-500" />
                    <span>Compressing image...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Target File Size Buttons & Action Card directly placed above the main action button */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              {/* Target File Size Selectable Buttons */}
              <div className="flex-1">
                <TargetSizeButtons
                  selectedTarget={selectedTarget}
                  onSelectTarget={handleSelectTarget}
                  customValue={customValue}
                  setCustomValue={setCustomValue}
                  customUnit={customUnit}
                  setCustomUnit={setCustomUnit}
                  onApplyCustom={handleApplyCustom}
                  isProcessing={isProcessing}
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                  Clicking any size instantly recompresses the image toward that target while preserving aspect ratio.
                </p>
              </div>

              {/* Output Format Selection */}
              <div className="w-full lg:w-auto shrink-0">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Output Format
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOutputFormat('image/jpeg')}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      outputFormat === 'image/jpeg'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 shadow-2xs font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    JPG / JPEG
                  </button>
                  <button
                    type="button"
                    onClick={() => setOutputFormat('image/webp')}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      outputFormat === 'image/webp'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 shadow-2xs font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    WebP (Smaller)
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons directly below the Target File Size selector */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Choose Another Image</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={!compressedBlob || isProcessing}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Compressing...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Download Compressed Image</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
