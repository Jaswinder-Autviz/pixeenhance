'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  RotateCcw,
  Maximize2,
  Lock,
  Unlock,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  loadImage,
  resizeImage,
  downloadBlob,
  formatFileSize,
  calculateAspectRatio,
} from '@/src/lib/imageUtils';

export function ResizerView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);

  // New dimensions
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatioLocked, setAspectRatioLocked] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<string>('image/jpeg');

  const [previewBlob, setPreviewBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);

      if (selectedFile.type === 'image/png') {
        setExportFormat('image/png');
      } else if (selectedFile.type === 'image/webp') {
        setExportFormat('image/webp');
      } else {
        setExportFormat('image/jpeg');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (aspectRatioLocked && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalHeight / originalWidth;
      setHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (aspectRatioLocked && originalWidth > 0 && originalHeight > 0) {
      const ratio = originalWidth / originalHeight;
      setWidth(Math.round(val * ratio));
    }
  };

  const applyPresetPercentage = (pct: number) => {
    if (!originalWidth || !originalHeight) return;
    const newW = Math.round(originalWidth * (pct / 100));
    const newH = Math.round(originalHeight * (pct / 100));
    setWidth(newW);
    setHeight(newH);
  };

  const applyPresetResolution = (targetW: number, targetH: number) => {
    setWidth(targetW);
    setHeight(targetH);
  };

  // Generate resized blob
  useEffect(() => {
    if (!imgElement || width <= 0 || height <= 0) return;

    const timeout = setTimeout(async () => {
      setIsProcessing(true);
      try {
        const blob = await resizeImage(imgElement, width, height, exportFormat, 0.92);
        setPreviewBlob(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [imgElement, width, height, exportFormat]);

  const handleDownload = () => {
    if (!previewBlob || !file) return;
    const ext =
      exportFormat === 'image/png' ? 'png' : exportFormat === 'image/webp' ? 'webp' : 'jpg';
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(previewBlob, `${nameWithoutExt}-${width}x${height}.${ext}`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setWidth(0);
    setHeight(0);
    setPreviewBlob(null);
    setPreviewUrl(null);
  };

  const originalAspect = calculateAspectRatio(originalWidth, originalHeight);
  const newAspect = calculateAspectRatio(width, height);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to resize"
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Panel */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Dimension Controls
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Original: {originalWidth} × {originalHeight} px ({originalAspect.simplified})
                  </p>
                </div>
              </div>

              {/* Aspect Ratio Lock Button */}
              <button
                onClick={() => setAspectRatioLocked(!aspectRatioLocked)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  aspectRatioLocked
                    ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {aspectRatioLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                <span>{aspectRatioLocked ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}</span>
              </button>
            </div>

            {/* Width and Height Inputs */}
            <div className="pt-5 grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Width (Pixels)
                </label>
                <input
                  type="number"
                  min="10"
                  max="16000"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Height (Pixels)
                </label>
                <input
                  type="number"
                  min="10"
                  max="16000"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-semibold"
                />
              </div>
            </div>

            {/* Quick Percentage Presets */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-400 mr-1">Scale:</span>
              {[25, 50, 75, 100, 150, 200].map((pct) => (
                <button
                  key={pct}
                  onClick={() => applyPresetPercentage(pct)}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
                >
                  {pct}%
                </button>
              ))}

              <span className="text-xs font-medium text-slate-400 mx-1">|</span>

              <button
                onClick={() => applyPresetResolution(1920, 1080)}
                className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
              >
                1080p FHD
              </button>
              <button
                onClick={() => applyPresetResolution(1280, 720)}
                className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
              >
                720p HD
              </button>
              <button
                onClick={() => applyPresetResolution(1080, 1080)}
                className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-brand-50 dark:hover:bg-slate-800 hover:text-brand-600 transition-colors"
              >
                1:1 Square
              </button>
            </div>

            {/* Export Format Selector */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Export As:
                </span>
                <div className="flex gap-1.5">
                  {[
                    { id: 'image/jpeg', label: 'JPG' },
                    { id: 'image/png', label: 'PNG' },
                    { id: 'image/webp', label: 'WebP' },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setExportFormat(fmt.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                        exportFormat === fmt.id
                          ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono">
                Ratio: {newAspect.simplified} ({newAspect.decimal}:1)
              </div>
            </div>
          </div>

          {/* Preview Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Resized Live Preview
                </h4>
                <p className="text-xs text-slate-500">
                  {width} × {height} px &bull;{' '}
                  {previewBlob ? formatFileSize(previewBlob.size) : 'Calculating...'}
                </p>
              </div>
              {isProcessing && (
                <span className="text-xs text-brand-600 font-medium animate-pulse">
                  Rendering canvas...
                </span>
              )}
            </div>

            <div className="w-full min-h-[300px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Resized preview"
                  className="max-h-[460px] max-w-full object-contain rounded shadow-sm"
                />
              )}
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
              disabled={!previewBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Resized Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
