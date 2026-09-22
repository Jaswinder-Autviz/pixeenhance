'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Target,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  compressImage,
  compressToTargetSize,
  downloadBlob,
  formatFileSize,
} from '@/src/lib/imageUtils';

export function CompressorView() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  // Settings
  const [mode, setMode] = useState<'quality' | 'target'>('quality');
  const [quality, setQuality] = useState<number>(80);
  const [targetKb, setTargetKb] = useState<number>(200);
  const [outputFormat, setOutputFormat] = useState<string>('image/jpeg');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setOriginalPreview(url);

    // Default target size based on original
    const origKb = Math.round(selectedFile.size / 1024);
    setTargetKb(Math.max(50, Math.round(origKb * 0.5)));

    if (selectedFile.type === 'image/webp') {
      setOutputFormat('image/webp');
    } else {
      setOutputFormat('image/jpeg');
    }
  };

  const processCompression = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      if (mode === 'target') {
        const result = await compressToTargetSize(file, targetKb * 1024, outputFormat);
        setCompressedBlob(result.blob);
        setCompressedSize(result.compressedSize);
        if (compressedPreview) URL.revokeObjectURL(compressedPreview);
        setCompressedPreview(URL.createObjectURL(result.blob));
      } else {
        const result = await compressImage(file, quality / 100, outputFormat);
        setCompressedBlob(result.blob);
        setCompressedSize(result.compressedSize);
        if (compressedPreview) URL.revokeObjectURL(compressedPreview);
        setCompressedPreview(URL.createObjectURL(result.blob));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (file) {
      processCompression();
    }
  }, [file, quality, targetKb, mode, outputFormat]);

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
    setQuality(80);
  };

  const savingsPercent =
    file && compressedSize > 0
      ? Math.max(0, Math.round(((file.size - compressedSize) / file.size) * 100))
      : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to compress"
          subtitle="Supports JPG, PNG, and WebP up to 50MB"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Header Panel */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Compression Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fine-tune quality slider or set an exact target file size
                  </p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setMode('quality')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'quality'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Quality Slider
                </button>
                <button
                  onClick={() => setMode('target')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'target'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Target Size (KB)
                </button>
              </div>
            </div>

            {/* Slider / Target inputs */}
            <div className="pt-5 grid sm:grid-cols-2 gap-6 items-center">
              {mode === 'quality' ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Quality Level</span>
                    <span className="text-brand-600 font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Smallest Size (5%)</span>
                    <span>Balanced (80%)</span>
                    <span>Best Quality (100%)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Target Maximum Size</span>
                    <span className="text-brand-600 font-bold">{targetKb} KB</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={targetKb}
                      onChange={(e) => setTargetKb(Math.max(10, Number(e.target.value)))}
                      className="w-32 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold"
                    />
                    <div className="flex gap-1.5">
                      {[100, 200, 500].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setTargetKb(preset)}
                          className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          {preset} KB
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Format selection */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Output Format
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOutputFormat('image/jpeg')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      outputFormat === 'image/jpeg'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    JPG / JPEG
                  </button>
                  <button
                    onClick={() => setOutputFormat('image/webp')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      outputFormat === 'image/webp'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    WebP (Smaller)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics & Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Original Size</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {formatFileSize(file.size)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Compressed Size</span>
              <p className="text-base font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {formatFileSize(compressedSize)}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Reduction
              </span>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                <span>{savingsPercent}% Saved</span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Privacy</span>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                100% Private
              </p>
            </div>
          </div>

          {/* Previews Side by Side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
                <span>Before (Original)</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
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
            <div className="rounded-2xl border border-brand-200 dark:border-brand-900/50 bg-white dark:bg-slate-900 p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>After (Compressed)</span>
                <span>{formatFileSize(compressedSize)}</span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                {compressedPreview ? (
                  <img
                    src={compressedPreview}
                    alt="Compressed preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Processing...</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Choose Another Image</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!compressedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Compressed Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
