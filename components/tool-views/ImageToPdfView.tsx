'use client';

import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  FileText,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Target,
  Check,
  AlertCircle,
  FileCheck,
  Loader2,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { AdBanner } from '../common/AdBanner';
import {
  PdfImageItem,
  PdfOptions,
  PdfCompressionResult,
  TARGET_PDF_SIZE_OPTIONS,
  createTargetCompressedPdf,
} from '@/src/lib/pdfUtils';
import { downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

interface TargetPdfSizeButtonsProps {
  selectedTarget: string;
  onSelectTarget: (value: string) => void;
  customValue: number;
  setCustomValue: (val: number) => void;
  customUnit: 'KB' | 'MB';
  setCustomUnit: (unit: 'KB' | 'MB') => void;
  onApplyCustom: () => void;
  isGenerating?: boolean;
}

function TargetPdfSizeButtons({
  selectedTarget,
  onSelectTarget,
  customValue,
  setCustomValue,
  customUnit,
  setCustomUnit,
  onApplyCustom,
  isGenerating = false,
}: TargetPdfSizeButtonsProps) {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Target PDF Size
        </label>
        {isGenerating && (
          <div className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-semibold animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Compressing toward target...</span>
          </div>
        )}
      </div>

      {/* Selectable Size Buttons (Pills) */}
      <div className="flex flex-wrap gap-2">
        {TARGET_PDF_SIZE_OPTIONS.map((opt) => {
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

      {/* When Custom Size is selected: [ 350 ] [ KB ▼ ] [ Apply ] */}
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

interface ImageToPdfViewProps {
  sourceFormat?: 'all' | 'jpg' | 'png';
  hideBanners?: boolean;
  initialTargetSize?: string;
}

export function ImageToPdfView({
  sourceFormat = 'all',
  hideBanners = false,
  initialTargetSize,
}: ImageToPdfViewProps) {
  const [images, setImages] = useState<PdfImageItem[]>([]);
  const [options, setOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'small',
    quality: 0.9,
  });

  // Target PDF Size State (Defaults to initialTargetSize, query param, or '200kb')
  const [selectedTarget, setSelectedTarget] = useState<string>(() => {
    if (initialTargetSize) return initialTargetSize;
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const querySize = sp.get('size') || sp.get('target');
      if (querySize) {
        const normalized = querySize.toLowerCase().trim();
        const match = TARGET_PDF_SIZE_OPTIONS.find((o) => o.value === normalized);
        if (match) return match.value;
      }
    }
    return '200kb';
  });
  const [customValue, setCustomValue] = useState<number>(350);
  const [customUnit, setCustomUnit] = useState<'KB' | 'MB'>('KB');
  const [appliedCustomBytes, setAppliedCustomBytes] = useState<number>(350 * 1024);

  // Conversion & Generation State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [conversionResult, setConversionResult] = useState<PdfCompressionResult | null>(null);

  const handleFilesBatchAdd = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (f) =>
        f.type.startsWith('image/') ||
        /\.(jpg|jpeg|png|webp|avif|bmp|gif)$/i.test(f.name)
    );
    if (validFiles.length === 0) return;

    const loadedItems: PdfImageItem[] = await Promise.all(
      validFiles.map(
        (file) =>
          new Promise<PdfImageItem>((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                width: img.naturalWidth || 800,
                height: img.naturalHeight || 600,
              });
            };
            img.onerror = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                width: 800,
                height: 600,
              });
            };
            img.src = url;
          })
      )
    );

    setImages((prev) => [...prev, ...loadedItems]);
    setConversionResult(null);
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesBatchAdd(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleRemove = (id: string) => {
    setImages((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
    setConversionResult(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setConversionResult(null);
  };

  const getTargetBytesFor = (targetValue: string, customBytes?: number): number | null => {
    if (targetValue === 'auto') return null;
    if (targetValue === 'custom') return customBytes ?? appliedCustomBytes;
    const opt = TARGET_PDF_SIZE_OPTIONS.find((o) => o.value === targetValue);
    return opt?.bytes ?? null;
  };

  const getTargetBytes = (): number | null => {
    return getTargetBytesFor(selectedTarget);
  };

  const getTargetDisplay = (): string => {
    if (selectedTarget === 'auto') return 'Auto / Best Quality';
    if (selectedTarget === 'custom') return `Under ${customValue} ${customUnit}`;
    const opt = TARGET_PDF_SIZE_OPTIONS.find((o) => o.value === selectedTarget);
    return opt?.label || 'Auto / Best Quality';
  };

  // When a size button is clicked: select it, and if already converted, immediately re-compress
  const handleSelectTarget = async (value: string) => {
    setSelectedTarget(value);
    if (value === 'custom') return;

    if (conversionResult && images.length > 0) {
      setIsGenerating(true);
      try {
        const targetBytes = getTargetBytesFor(value);
        const result = await createTargetCompressedPdf(images, options, targetBytes);
        setConversionResult(result);
      } catch (err) {
        console.error('PDF creation error:', err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleApplyCustom = async () => {
    const bytes = customValue * (customUnit === 'MB' ? 1024 * 1024 : 1024);
    setAppliedCustomBytes(bytes);
    setSelectedTarget('custom');

    if (conversionResult && images.length > 0) {
      setIsGenerating(true);
      try {
        const result = await createTargetCompressedPdf(images, options, bytes);
        setConversionResult(result);
      } catch (err) {
        console.error('PDF creation error:', err);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      const targetBytes = getTargetBytes();
      const result = await createTargetCompressedPdf(images, options, targetBytes);
      setConversionResult(result);
    } catch (err) {
      console.error('PDF creation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAndDownload = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      const targetBytes = getTargetBytes();
      const result = await createTargetCompressedPdf(images, options, targetBytes);
      setConversionResult(result);
      if (result.blob) {
        const count = images.length;
        const filename = `converted-document-${count}-pages.pdf`;
        downloadBlob(result.blob, filename);
      }
    } catch (err) {
      console.error('PDF creation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!conversionResult?.blob) return;
    const count = images.length;
    const filename = `converted-document-${count}-pages.pdf`;
    downloadBlob(conversionResult.blob, filename);
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setConversionResult(null);
  };

  const totalInputBytes = images.reduce((acc, curr) => acc + curr.file.size, 0);

  const savingsPercent =
    conversionResult && totalInputBytes > 0
      ? Math.max(
          0,
          parseFloat(
            (((totalInputBytes - conversionResult.finalBytes) / totalInputBytes) * 100).toFixed(1)
          )
        )
      : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-6">
      {/* 1. Advertisement Banner above PDF Tools */}
      {!hideBanners && <AdBanner slot="top-pdf-banner" />}

      {images.length === 0 ? (
        <div className="space-y-6">
          {/* Target PDF Size Selector card placed directly above upload area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Target PDF Size
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select a target size button or enter a custom size before creating your PDF
                  </p>
                </div>
              </div>
            </div>

            {/* Target Size Selectable Buttons */}
            <TargetPdfSizeButtons
              selectedTarget={selectedTarget}
              onSelectTarget={handleSelectTarget}
              customValue={customValue}
              setCustomValue={setCustomValue}
              customUnit={customUnit}
              setCustomUnit={setCustomUnit}
              onApplyCustom={handleApplyCustom}
              isGenerating={isGenerating}
            />
          </div>

          {/* Upload DropZone */}
          <DropZone
            multiple={true}
            onFilesSelect={handleFilesBatchAdd}
            onFileSelect={(f) => handleFilesBatchAdd([f])}
            title={
              sourceFormat === 'jpg'
                ? 'Drop JPG / JPEG images here, or browse'
                : sourceFormat === 'png'
                ? 'Drop PNG images here, or browse'
                : 'Drop multiple images here to convert to PDF'
            }
            subtitle="Supports JPG, PNG, and WebP. Each image creates a separate page."
            buttonText="Select Images"
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls & Target PDF Size Header Panel */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image to PDF Conversion
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {images.length} {images.length === 1 ? 'image' : 'images'} queued &bull;{' '}
                    {formatFileSize(totalInputBytes)} total
                  </p>
                </div>
              </div>

              {/* Add More Images Button */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all">
                <Plus className="h-4 w-4 text-brand-600" />
                <span>Add More Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.jpg,.jpeg,.png,.webp,.avif"
                  onChange={handleMultipleFiles}
                  className="hidden"
                />
              </label>
            </div>

            {/* Target PDF Size Selectable Buttons */}
            <div className="space-y-5">
              <TargetPdfSizeButtons
                selectedTarget={selectedTarget}
                onSelectTarget={handleSelectTarget}
                customValue={customValue}
                setCustomValue={setCustomValue}
                customUnit={customUnit}
                setCustomUnit={setCustomUnit}
                onApplyCustom={handleApplyCustom}
                isGenerating={isGenerating}
              />

              {/* Page Layout Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Page Size
                  </label>
                  <select
                    value={options.pageSize}
                    onChange={(e) => {
                      setOptions({ ...options, pageSize: e.target.value as any });
                      setConversionResult(null);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="a4">A4 (210×297)</option>
                    <option value="letter">US Letter</option>
                    <option value="fit">Fit Image</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Orientation
                  </label>
                  <select
                    value={options.orientation}
                    onChange={(e) => {
                      setOptions({ ...options, orientation: e.target.value as any });
                      setConversionResult(null);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="auto">Auto</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Margins
                  </label>
                  <select
                    value={options.margin}
                    onChange={(e) => {
                      setOptions({ ...options, margin: e.target.value as any });
                      setConversionResult(null);
                    }}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    <option value="none">No Margin</option>
                    <option value="small">Small</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Convert & Download Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear All Images</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleGeneratePdf}
                  disabled={isGenerating || images.length === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/50 disabled:opacity-50 text-sm font-bold transition-all w-full sm:w-auto justify-center cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4" />
                      <span>Convert to PDF</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={conversionResult ? handleDownloadPdf : handleGenerateAndDownload}
                  disabled={isGenerating || images.length === 0}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>
                    {conversionResult
                      ? `Download PDF (${formatFileSize(conversionResult.finalBytes)})`
                      : 'Convert & Download PDF'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Advertisement Banner between upload area and conversion controls */}
          {!hideBanners && <AdBanner slot="mid-pdf-banner" />}

          {/* Post-Conversion Results & Download Section */}
          {conversionResult && (
            <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 shadow-sm space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-900/60 pb-4">
                <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 font-bold text-base">
                  <Check className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900 p-0.5" />
                  <span>PDF Document Successfully Created!</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300">
                  Ready to Download
                </span>
              </div>

              {/* Exact Metrics Specified by User */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-white dark:bg-slate-900 p-3 text-center">
                  <span className="text-[11px] text-slate-400 font-medium block">Original Images</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">
                    {images.length}
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-white dark:bg-slate-900 p-3 text-center">
                  <span className="text-[11px] text-slate-400 font-medium block">Original Size</span>
                  <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">
                    {formatFileSize(conversionResult.originalBytes)}
                  </span>
                </div>
                <div className="rounded-xl border border-brand-200/80 dark:border-brand-900/60 bg-brand-50/50 dark:bg-brand-950/40 p-3 text-center">
                  <span className="text-[11px] text-brand-600 dark:text-brand-400 font-medium block">Target</span>
                  <span className="text-base font-bold text-brand-700 dark:text-brand-300 mt-0.5 block truncate">
                    {getTargetDisplay()}
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-white dark:bg-slate-900 p-3 text-center">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block">Final PDF</span>
                  <span className="text-base font-bold text-emerald-700 dark:text-emerald-300 mt-0.5 block">
                    {formatFileSize(conversionResult.finalBytes)}
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-100/60 dark:bg-emerald-900/40 p-3 text-center col-span-2 sm:col-span-1">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block">Saved</span>
                  <span className="text-base font-bold text-emerald-800 dark:text-emerald-200 mt-0.5 block">
                    {savingsPercent}%
                  </span>
                </div>
              </div>

              {/* Notice if requested target was technically impossible while maintaining readable quality */}
              {conversionResult.noticeMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>{conversionResult.noticeMessage}</span>
                </div>
              )}

              {/* Download Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-md shadow-emerald-500/25 transition-all w-full sm:w-auto justify-center cursor-pointer"
                >
                  <Download className="h-5 w-5" />
                  <span>Download PDF Document ({formatFileSize(conversionResult.finalBytes)})</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Convert Another Batch</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. Advertisement Banner below the result/download area */}
          {!hideBanners && <AdBanner slot="bottom-pdf-banner" />}

          {/* Page Order & Thumbnail Management */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>PDF Pages Sequence ({images.length})</span>
              <span className="text-slate-400 font-normal">
                Use arrows to rearrange page sequence
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-white font-mono text-[11px] font-bold shrink-0">
                    {idx + 1}
                  </div>

                  <div className="h-16 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/50">
                    <img
                      src={item.previewUrl}
                      alt={`Page ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.width} × {item.height} px
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatFileSize(item.file.size)}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === images.length - 1}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500 cursor-pointer"
                      title="Delete page"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
