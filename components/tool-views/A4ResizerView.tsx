'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export type ASeriesSize = 'A0' | 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7';

export interface ASizeMeta {
  code: ASeriesSize;
  name: string;
  useCase: string;
  widthMm: number;
  heightMm: number;
  dpi300: { w: number; h: number };
  dpi150: { w: number; h: number };
  dpi72: { w: number; h: number };
}

export const A_SIZES: Record<ASeriesSize, ASizeMeta> = {
  A0: {
    code: 'A0',
    name: 'A0 Poster',
    useCase: 'Blueprints, architectural plans & large posters',
    widthMm: 841,
    heightMm: 1189,
    dpi300: { w: 4967, h: 7022 }, // using 150/200 safe canvas
    dpi150: { w: 4967, h: 7022 },
    dpi72: { w: 2384, h: 3370 },
  },
  A1: {
    code: 'A1',
    name: 'A1 Plan',
    useCase: 'Posters, CAD banners & technical drawings',
    widthMm: 594,
    heightMm: 841,
    dpi300: { w: 7016, h: 9933 },
    dpi150: { w: 3508, h: 4967 },
    dpi72: { w: 1684, h: 2384 },
  },
  A2: {
    code: 'A2',
    name: 'A2 Print',
    useCase: 'Art prints, medium posters & notices',
    widthMm: 420,
    heightMm: 594,
    dpi300: { w: 4960, h: 7016 },
    dpi150: { w: 2480, h: 3508 },
    dpi72: { w: 1191, h: 1684 },
  },
  A3: {
    code: 'A3',
    name: 'A3 Tabloid',
    useCase: 'Drawings, charts & double A4 presentation sheets',
    widthMm: 297,
    heightMm: 420,
    dpi300: { w: 3508, h: 4960 },
    dpi150: { w: 1754, h: 2480 },
    dpi72: { w: 842, h: 1191 },
  },
  A4: {
    code: 'A4',
    name: 'A4 Standard',
    useCase: 'Standard letters, documents, forms & reports',
    widthMm: 210,
    heightMm: 297,
    dpi300: { w: 2480, h: 3508 },
    dpi150: { w: 1240, h: 1754 },
    dpi72: { w: 595, h: 842 },
  },
  A5: {
    code: 'A5',
    name: 'A5 Booklet',
    useCase: 'Flyers, notepads, invitations & small books',
    widthMm: 148,
    heightMm: 210,
    dpi300: { w: 1748, h: 2480 },
    dpi150: { w: 874, h: 1240 },
    dpi72: { w: 420, h: 595 },
  },
  A6: {
    code: 'A6',
    name: 'A6 Postcard',
    useCase: 'Postcards, greeting cards & pocket photo prints',
    widthMm: 105,
    heightMm: 148,
    dpi300: { w: 1240, h: 1748 },
    dpi150: { w: 620, h: 874 },
    dpi72: { w: 298, h: 420 },
  },
  A7: {
    code: 'A7',
    name: 'A7 Pocket',
    useCase: 'Mini brochures, pocket calendars & product tags',
    widthMm: 74,
    heightMm: 105,
    dpi300: { w: 874, h: 1240 },
    dpi150: { w: 437, h: 620 },
    dpi72: { w: 210, h: 298 },
  },
};

interface A4ResizerViewProps {
  initialSize?: ASeriesSize;
}

export function A4ResizerView({ initialSize = 'A4' }: A4ResizerViewProps) {
  const [selectedSize, setSelectedSize] = useState<ASeriesSize>(initialSize);

  useEffect(() => {
    setSelectedSize(initialSize);
  }, [initialSize]);

  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [dpi, setDpi] = useState<300 | 150 | 72>(300);
  const [fitMode, setFitMode] = useState<'fit' | 'fill'>('fit');

  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const currentSizeMeta = A_SIZES[selectedSize] || A_SIZES.A4;
  const baseDims =
    dpi === 300
      ? currentSizeMeta.dpi300
      : dpi === 150
      ? currentSizeMeta.dpi150
      : currentSizeMeta.dpi72;

  const targetW = orientation === 'portrait' ? baseDims.w : baseDims.h;
  const targetH = orientation === 'portrait' ? baseDims.h : baseDims.w;

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      // Auto-detect orientation based on source
      if (img.naturalWidth > img.naturalHeight) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const renderSheet = async () => {
      setIsProcessing(true);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        if (fitMode === 'fit') {
          // Contain within page boundaries with clean margins
          const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          const canvasRatio = targetW / targetH;
          let drawW = targetW;
          let drawH = targetH;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > canvasRatio) {
            drawH = targetW / imgRatio;
            offsetY = (targetH - drawH) / 2;
          } else {
            drawW = targetH * imgRatio;
            offsetX = (targetW - drawW) / 2;
          }

          ctx.drawImage(imgElement, offsetX, offsetY, drawW, drawH);
        } else {
          // Fill canvas (cover)
          const imgRatio = imgElement.naturalWidth / imgElement.naturalHeight;
          const canvasRatio = targetW / targetH;
          let sourceX = 0;
          let sourceY = 0;
          let sourceW = imgElement.naturalWidth;
          let sourceH = imgElement.naturalHeight;

          if (imgRatio > canvasRatio) {
            sourceW = imgElement.naturalHeight * canvasRatio;
            sourceX = (imgElement.naturalWidth - sourceW) / 2;
          } else {
            sourceH = imgElement.naturalWidth / canvasRatio;
            sourceY = (imgElement.naturalHeight - sourceH) / 2;
          }

          ctx.drawImage(imgElement, sourceX, sourceY, sourceW, sourceH, 0, 0, targetW, targetH);
        }

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setResizedBlob(blob);
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              setPreviewUrl(URL.createObjectURL(blob));
            }
            setIsProcessing(false);
          },
          'image/jpeg',
          0.94
        );
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    };

    renderSheet();
  }, [imgElement, targetW, targetH, fitMode, selectedSize]);

  const handleDownload = () => {
    if (!resizedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(
      resizedBlob,
      `${nameWithoutExt}-${selectedSize}-${orientation}-${dpi}dpi.jpg`
    );
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setResizedBlob(null);
    setPreviewUrl(null);
  };

  const aSizeKeys: ASeriesSize[] = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {/* Quick A-Series Paper Size Selector Pills */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
            Choose Standard ISO Paper Size (A-Series)
          </span>
          <span className="text-xs text-slate-400">
            Current: <strong className="text-brand-600 font-mono">{selectedSize}</strong> ({currentSizeMeta.widthMm} × {currentSizeMeta.heightMm} mm)
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {aSizeKeys.map((code) => {
            const meta = A_SIZES[code];
            const isSelected = selectedSize === code;
            return (
              <button
                key={code}
                onClick={() => setSelectedSize(code)}
                className={`py-2 px-1.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-600 text-white shadow-sm font-bold scale-[1.02]'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-brand-400'
                }`}
              >
                <div className="text-sm font-extrabold">{code}</div>
                <div className="text-[10px] opacity-80 truncate font-mono">
                  {meta.widthMm}×{meta.heightMm}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title={`Drop image here to resize for ${selectedSize} paper printing`}
          subtitle={`${currentSizeMeta.name} (${currentSizeMeta.widthMm} × ${currentSizeMeta.heightMm} mm) &bull; ${currentSizeMeta.useCase}`}
          buttonText={`Select Image for ${selectedSize}`}
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Printer className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedSize} Print Dimensions Preset
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Target: {targetW} × {targetH} px &bull; {orientation.toUpperCase()} &bull; {dpi} DPI
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-brand-600 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800">
                  {orientation === 'portrait'
                    ? `${currentSizeMeta.widthMm} × ${currentSizeMeta.heightMm} mm`
                    : `${currentSizeMeta.heightMm} × ${currentSizeMeta.widthMm} mm`}
                </span>
              </div>
            </div>

            <div className="pt-5 grid sm:grid-cols-3 gap-6">
              {/* Orientation */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Orientation
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrientation('portrait')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      orientation === 'portrait'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Portrait
                  </button>
                  <button
                    onClick={() => setOrientation('landscape')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      orientation === 'landscape'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              {/* DPI Quality */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Print Resolution (DPI)
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDpi(300)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      dpi === 300
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    300 DPI (HD)
                  </button>
                  <button
                    onClick={() => setDpi(150)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      dpi === 150
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    150 DPI
                  </button>
                  <button
                    onClick={() => setDpi(72)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      dpi === 72
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    72 DPI
                  </button>
                </div>
              </div>

              {/* Fit Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Fitting Strategy
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFitMode('fit')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      fitMode === 'fit'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fit (White Borders)
                  </button>
                  <button
                    onClick={() => setFitMode('fill')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      fitMode === 'fill'
                        ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Fill (Crop Edge)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview & Download Area */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Paper Visualizer */}
              <div className="flex-1 w-full flex flex-col items-center justify-center p-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200/50">
                <div
                  className={`bg-white shadow-xl transition-all duration-300 overflow-hidden flex items-center justify-center border border-slate-200 ${
                    orientation === 'portrait'
                      ? 'w-[240px] h-[340px]'
                      : 'w-[340px] h-[240px]'
                  }`}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={`${selectedSize} Print Preview`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">Rendering preview...</span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-4">
                  {selectedSize} {orientation.toUpperCase()} &bull; {targetW} × {targetH} px
                </span>
              </div>

              {/* Actions & Metrics */}
              <div className="w-full lg:w-80 space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Selected Paper:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {selectedSize} ({currentSizeMeta.widthMm} × {currentSizeMeta.heightMm} mm)
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Output Dimensions:</span>
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {targetW} × {targetH} px
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500">Original Dimensions:</span>
                    <span className="font-mono text-slate-600 dark:text-slate-400">
                      {imgElement?.naturalWidth} × {imgElement?.naturalHeight} px
                    </span>
                  </div>
                  {resizedBlob && (
                    <div className="flex justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-500">Estimated File Size:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {formatFileSize(resizedBlob.size)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleDownload}
                    disabled={isProcessing || !resizedBlob}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download {selectedSize} Image</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Resize Another Image</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
