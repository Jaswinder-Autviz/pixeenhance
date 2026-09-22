'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, FlipHorizontal, FlipVertical, Sparkles } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, flipImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export function FlipperView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [flippedBlob, setFlippedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      setFlipH(false);
      setFlipV(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const runFlip = async () => {
      setIsProcessing(true);
      try {
        const blob = await flipImage(imgElement, flipH, flipV, 'image/png');
        setFlippedBlob(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    };

    runFlip();
  }, [imgElement, flipH, flipV]);

  const handleDownload = () => {
    if (!flippedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(flippedBlob, `${nameWithoutExt}-flipped.png`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setFlipH(false);
    setFlipV(false);
    setFlippedBlob(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to flip"
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FlipHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image Flip Controls
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Horizontal: {flipH ? 'Mirrored' : 'Normal'} &bull; Vertical:{' '}
                    {flipV ? 'Inverted' : 'Normal'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFlipH(!flipH)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    flipH
                      ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <FlipHorizontal className="h-4 w-4" />
                  <span>Flip Horizontal (Mirror)</span>
                </button>
                <button
                  onClick={() => setFlipV(!flipV)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
                    flipV
                      ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <FlipVertical className="h-4 w-4" />
                  <span>Flip Vertical (Invert)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Live Flipped Preview
            </h4>
            <div className="w-full min-h-[340px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Flipped preview"
                  className="max-h-[460px] max-w-full object-contain rounded shadow-sm"
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
              disabled={!flippedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Flipped Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
