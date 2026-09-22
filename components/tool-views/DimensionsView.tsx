'use client';

import React, { useState } from 'react';
import { Info, RotateCcw, Copy, Check, Palette, Sparkles, FileText, Maximize } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  loadImage,
  formatFileSize,
  calculateAspectRatio,
  extractDominantColors,
} from '@/src/lib/imageUtils';

export function DimensionsView() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    try {
      const img = await loadImage(selectedFile);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      const palette = extractDominantColors(img, 6);
      setColors(palette);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setWidth(0);
    setHeight(0);
    setColors([]);
  };

  const aspect = calculateAspectRatio(width, height);
  const megapixels = width > 0 && height > 0 ? ((width * height) / 1000000).toFixed(2) : '0';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to inspect dimensions and colors"
          subtitle="Supports JPG, PNG, WebP, SVG, and GIF"
        />
      ) : (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image Metadata &amp; Specification Report
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    File: {file.name}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Inspect Another</span>
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Dimensions</span>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                {width} × {height} <span className="text-xs font-normal text-slate-400">px</span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Aspect Ratio</span>
              <p className="text-base sm:text-lg font-bold text-brand-600 dark:text-brand-400 mt-1">
                {aspect.simplified}{' '}
                <span className="text-xs font-normal text-slate-400">({aspect.decimal}:1)</span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Total Resolution</span>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                {megapixels} <span className="text-xs font-normal text-slate-400">MP</span>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">File Size</span>
              <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          {/* Image Preview & Dominant Palette */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Visual Preview */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs font-semibold text-slate-500 mb-3 block">
                Visual Canvas
              </span>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Inspected target"
                    className="max-h-[300px] max-w-full object-contain rounded shadow-sm"
                  />
                )}
              </div>
            </div>

            {/* Dominant Palette & Deep Specs */}
            <div className="space-y-6">
              {/* Palette */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-3">
                  <Palette className="h-4 w-4 text-brand-600" />
                  <span>Dominant Color Palette</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Extracted pixel clusters. Click any swatch to copy HEX code.
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {colors.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => handleCopyColor(hex)}
                      className="group flex flex-col items-center gap-1.5 p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 hover:scale-105 transition-all"
                    >
                      <div
                        style={{ backgroundColor: hex }}
                        className="h-10 w-full rounded-lg shadow-inner"
                      />
                      <span className="text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {copiedColor === hex ? 'Copied!' : hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical breakdown list */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
                  Technical Specifications
                </h4>
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">MIME Type:</span>
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                      {file.type || 'image/unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Total Pixels:</span>
                    <span className="font-mono font-semibold text-slate-700 dark:text-slate-200">
                      {(width * height).toLocaleString()} px
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Orientation:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {width > height ? 'Landscape' : width < height ? 'Portrait' : 'Square'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-400">Processing Security:</span>
                    <span className="font-semibold text-emerald-600">Local Sandbox Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
