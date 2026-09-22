'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Maximize2,
  ZoomIn,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export function ImageEnlargerView() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origDim, setOrigDim] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const [scaleFactor, setScaleFactor] = useState<2 | 4 | 8>(2);
  const [sharpenAmount, setSharpenAmount] = useState<number>(30); // 0 to 100
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [enlargedCanvas, setEnlargedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50); // comparison slider %

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setOrigDim({ w: img.naturalWidth, h: img.naturalHeight });
      processEnlarge(img, scaleFactor, sharpenAmount);
    };
    img.src = url;
  };

  const processEnlarge = (img: HTMLImageElement, factor: number, sharpen: number) => {
    setIsProcessing(true);
    setTimeout(() => {
      const targetW = img.naturalWidth * factor;
      const targetH = img.naturalHeight * factor;

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);

      // Apply unsharp mask edge enhancement if sharpen > 0
      if (sharpen > 0 && targetW * targetH <= 40000000) {
        try {
          const imgData = ctx.getImageData(0, 0, targetW, targetH);
          const data = imgData.data;
          const strength = (sharpen / 100) * 0.35;
          const w = targetW;
          const h = targetH;

          // Simple 3x3 high-pass filter
          const copy = new Uint8ClampedArray(data);
          for (let y = 1; y < h - 1; y += 2) {
            for (let x = 1; x < w - 1; x += 2) {
              const idx = (y * w + x) * 4;
              for (let c = 0; c < 3; c++) {
                const center = copy[idx + c];
                const up = copy[((y - 1) * w + x) * 4 + c];
                const down = copy[((y + 1) * w + x) * 4 + c];
                const left = copy[(y * w + (x - 1)) * 4 + c];
                const right = copy[(y * w + (x + 1)) * 4 + c];

                const laplacian = 4 * center - (up + down + left + right);
                data[idx + c] = Math.min(255, Math.max(0, center + laplacian * strength));
              }
            }
          }
          ctx.putImageData(imgData, 0, 0);
        } catch (e) {
          console.warn('Sharpening filter bypassed:', e);
        }
      }

      setEnlargedCanvas(canvas);
      setIsProcessing(false);
    }, 50);
  };

  const recompute = (factor: 2 | 4 | 8, sharpen: number) => {
    if (!previewUrl) return;
    const img = new Image();
    img.onload = () => {
      processEnlarge(img, factor, sharpen);
    };
    img.src = previewUrl;
  };

  const handleDownload = () => {
    if (!enlargedCanvas || !file) return;
    enlargedCanvas.toBlob(
      (blob) => {
        if (!blob) return;
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        downloadBlob(blob, `${nameWithoutExt}_enlarged_${scaleFactor}x.png`);
      },
      'image/png',
      0.95
    );
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setEnlargedCanvas(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!previewUrl ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image to enlarge and enhance"
          subtitle="Scale up photos by 2×, 4×, or 8× with high-fidelity edge preservation"
          buttonText="Select Image"
        />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Comparison View */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 select-none">
              {/* Enlarged Result */}
              {enlargedCanvas && (
                <img
                  src={enlargedCanvas.toDataURL('image/jpeg', 0.85)}
                  alt="Enlarged"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
              )}

              {/* Original (Clipped on Left side of slider) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={previewUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Comparison Split Divider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] font-bold text-slate-700">
                  &#x2194;
                </div>
              </div>

              {/* Interactive Range Input overlay for split slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Badges */}
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold z-10">
                Original: {origDim.w}×{origDim.h}
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-brand-600/90 backdrop-blur-sm text-white text-[10px] font-bold z-10">
                Enlarged: {origDim.w * scaleFactor}×{origDim.h * scaleFactor} ({scaleFactor}×)
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
              <span>Drag the slider left and right to inspect before and after clarity</span>
            </p>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ZoomIn className="h-4 w-4 text-brand-600" />
                  <span>Enlarge Factor</span>
                </h3>
                <span className="text-[11px] font-mono text-brand-600 font-bold">
                  {scaleFactor}× Scale
                </span>
              </div>

              {/* Scale Factor Selection */}
              <div className="grid grid-cols-3 gap-2">
                {([2, 4, 8] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setScaleFactor(f);
                      recompute(f, sharpenAmount);
                    }}
                    className={`py-3 rounded-xl text-center font-bold transition-all ${
                      scaleFactor === f
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <div className="text-base font-extrabold">{f}×</div>
                    <div className="text-[10px] font-normal opacity-80">
                      {f === 2 ? 'Super-Sample' : f === 4 ? 'Ultra-HD' : 'Maximum'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Sharpening / Detail Recovery */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Edge Clarity &amp; Sharpen</span>
                  <span className="font-mono text-brand-600">{sharpenAmount}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sharpenAmount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSharpenAmount(val);
                    recompute(scaleFactor, val);
                  }}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Dimensions Summary */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Input:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-200">
                    {origDim.w} × {origDim.h} px
                  </span>
                </div>
                <div className="flex justify-between text-brand-600 dark:text-brand-400 font-bold">
                  <span>Output:</span>
                  <span className="font-mono">
                    {origDim.w * scaleFactor} × {origDim.h * scaleFactor} px
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleDownload}
                disabled={isProcessing || !enlargedCanvas}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Upscaling Image...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Download Enlarged Image</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload Another Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
