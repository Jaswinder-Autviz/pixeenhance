'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, Sliders, TrendingDown, Sparkles } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, convertFormat, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export function QualityView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState<number>(75);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');

  const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      if (selectedFile.type === 'image/webp') {
        setFormat('image/webp');
      } else {
        setFormat('image/jpeg');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const runQualityAdjust = async () => {
      setIsProcessing(true);
      try {
        const blob = await convertFormat(imgElement, format, quality / 100, '#FFFFFF');
        setOutputBlob(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    };

    const timeout = setTimeout(runQualityAdjust, 100);
    return () => clearTimeout(timeout);
  }, [imgElement, quality, format]);

  const handleDownload = () => {
    if (!outputBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const ext = format === 'image/webp' ? 'webp' : 'jpg';
    downloadBlob(outputBlob, `${nameWithoutExt}-q${quality}.${ext}`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setOutputBlob(null);
    setPreviewUrl(null);
  };

  const reduction =
    file && outputBlob
      ? Math.round(((file.size - outputBlob.size) / file.size) * 100)
      : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to adjust quality"
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image Quality Controls
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Fine-tune encoder compression with real-time byte savings feedback
                  </p>
                </div>
              </div>

              {/* Format selection */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFormat('image/jpeg')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    format === 'image/jpeg'
                      ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  JPEG
                </button>
                <button
                  onClick={() => setFormat('image/webp')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                    format === 'image/webp'
                      ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  WebP (Higher Efficiency)
                </button>
              </div>
            </div>

            {/* Quality Slider */}
            <div className="pt-5 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Compression Quality Factor</span>
                <span className="text-brand-600 font-bold text-sm">{quality}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                <span>5% (Aggressive Compression)</span>
                <span>75% (Recommended Balance)</span>
                <span>100% (Maximum Quality)</span>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Original Size</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {formatFileSize(file.size)}
              </p>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-900/40 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-brand-600 dark:text-brand-400">Tuned Size</span>
              <p className="text-base font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                {outputBlob ? formatFileSize(outputBlob.size) : 'Calculating...'}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                Savings
              </span>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                <TrendingDown className="h-4 w-4" />
                <span>{reduction > 0 ? `${reduction}% Reduction` : 'Original Fidelity'}</span>
              </p>
            </div>
          </div>

          {/* Live Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Adjusted Output Preview ({quality}%)
            </h4>
            <div className="w-full min-h-[340px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Quality Adjusted Preview"
                  className="max-h-[460px] max-w-full object-contain rounded shadow-sm"
                />
              ) : (
                <span className="text-xs text-slate-400">Re-encoding canvas...</span>
              )}
            </div>
          </div>

          {/* Actions */}
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
              disabled={!outputBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Tuned Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
