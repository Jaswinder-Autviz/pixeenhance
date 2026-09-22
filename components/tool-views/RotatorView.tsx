'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, RotateCw, Sparkles, RefreshCw } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, rotateImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export function RotatorView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [angle, setAngle] = useState<number>(0);
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      setAngle(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRotateLeft = () => {
    setAngle((prev) => ((prev - 90) % 360 + 360) % 360);
  };

  const handleRotateRight = () => {
    setAngle((prev) => (prev + 90) % 360);
  };

  const handleRotate180 = () => {
    setAngle((prev) => (prev + 180) % 360);
  };

  useEffect(() => {
    if (!imgElement) return;

    const runRotation = async () => {
      setIsProcessing(true);
      try {
        const blob = await rotateImage(imgElement, angle, 'image/png');
        setRotatedBlob(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    };

    runRotation();
  }, [imgElement, angle]);

  const handleDownload = () => {
    if (!rotatedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(rotatedBlob, `${nameWithoutExt}-rotated-${angle}deg.png`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setAngle(0);
    setRotatedBlob(null);
    setPreviewUrl(null);
  };

  const isSwapped = angle === 90 || angle === 270;
  const currentWidth = isSwapped ? imgElement?.naturalHeight : imgElement?.naturalWidth;
  const currentHeight = isSwapped ? imgElement?.naturalWidth : imgElement?.naturalHeight;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to rotate"
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <RotateCw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image Rotation Controls
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Current angle: {angle}° &bull; Dimensions: {currentWidth} × {currentHeight} px
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRotateLeft}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>90° Left</span>
                </button>
                <button
                  onClick={handleRotateRight}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 text-xs font-semibold transition-colors"
                >
                  <RotateCw className="h-4 w-4" />
                  <span>90° Right</span>
                </button>
                <button
                  onClick={handleRotate180}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 hover:text-brand-600 text-xs font-semibold transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>180° Flip</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Rotated Output Preview ({angle}°)
            </h4>
            <div className="w-full min-h-[340px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Rotated preview"
                  className="max-h-[460px] max-w-full object-contain rounded shadow-sm transition-all duration-300"
                />
              ) : (
                <span className="text-xs text-slate-400">Processing canvas...</span>
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
              disabled={!rotatedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Rotated Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
