'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Download, RotateCcw, Crop, Sparkles, Check } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, cropImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

export function CropperView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [ratioMode, setRatioMode] = useState<string>('free'); // 'free', '1:1', '4:3', '3:4', '16:9'

  // Crop rectangle percentages (0-100)
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, width: 80, height: 80 });
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, boxX: 0, boxY: 0 });

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      setCropBox({ x: 10, y: 10, width: 80, height: 80 });
    } catch (err) {
      console.error(err);
    }
  };

  // Adjust crop box based on selected ratio preset
  const applyRatio = (ratio: string) => {
    setRatioMode(ratio);
    if (!imgElement) return;

    const imgAspect = imgElement.naturalWidth / imgElement.naturalHeight;

    let targetRatio = 1;
    if (ratio === '1:1') targetRatio = 1;
    else if (ratio === '4:3') targetRatio = 4 / 3;
    else if (ratio === '3:4') targetRatio = 3 / 4;
    else if (ratio === '16:9') targetRatio = 16 / 9;
    else if (ratio === 'free') return;

    let w = 80;
    let h = 80;

    if (targetRatio > imgAspect) {
      w = 80;
      h = Math.round((w * imgAspect) / targetRatio);
    } else {
      h = 80;
      w = Math.round((h * targetRatio) / imgAspect);
    }

    setCropBox({
      x: Math.max(0, Math.round((100 - w) / 2)),
      y: Math.max(0, Math.round((100 - h) / 2)),
      width: Math.min(100, w),
      height: Math.min(100, h),
    });
  };

  // Perform crop when box or image changes
  useEffect(() => {
    if (!imgElement) return;

    const renderCrop = async () => {
      setIsProcessing(true);
      try {
        const pixelCrop = {
          x: (cropBox.x / 100) * imgElement.naturalWidth,
          y: (cropBox.y / 100) * imgElement.naturalHeight,
          width: (cropBox.width / 100) * imgElement.naturalWidth,
          height: (cropBox.height / 100) * imgElement.naturalHeight,
        };

        const blob = await cropImage(imgElement, pixelCrop, 'image/png');
        setCroppedBlob(blob);
        if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
        setCroppedPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    };

    const timeout = setTimeout(renderCrop, 100);
    return () => clearTimeout(timeout);
  }, [imgElement, cropBox]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      boxX: cropBox.x,
      boxY: cropBox.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dxPercent = ((e.clientX - dragStartPos.current.x) / rect.width) * 100;
    const dyPercent = ((e.clientY - dragStartPos.current.y) / rect.height) * 100;

    const newX = Math.max(
      0,
      Math.min(100 - cropBox.width, dragStartPos.current.boxX + dxPercent)
    );
    const newY = Math.max(
      0,
      Math.min(100 - cropBox.height, dragStartPos.current.boxY + dyPercent)
    );

    setCropBox((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDownload = () => {
    if (!croppedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(croppedBlob, `${nameWithoutExt}-cropped.png`);
  };

  const handleReset = () => {
    if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    setFile(null);
    setImgElement(null);
    setCroppedBlob(null);
    setCroppedPreviewUrl(null);
  };

  const currentCropPixels = imgElement
    ? {
        w: Math.round((cropBox.width / 100) * imgElement.naturalWidth),
        h: Math.round((cropBox.height / 100) * imgElement.naturalHeight),
      }
    : { w: 0, h: 0 };

  return (
    <div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to crop"
          subtitle="Supports JPG, PNG, and WebP"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Crop className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Crop &amp; Frame Image
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cropped size: {currentCropPixels.w} × {currentCropPixels.h} px
                  </p>
                </div>
              </div>

              {/* Ratio Presets */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {[
                  { id: 'free', label: 'Free' },
                  { id: '1:1', label: '1:1 Square' },
                  { id: '4:3', label: '4:3' },
                  { id: '3:4', label: '3:4' },
                  { id: '16:9', label: '16:9' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => applyRatio(preset.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ratioMode === preset.id
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider to adjust crop size */}
            <div className="pt-4 grid sm:grid-cols-2 gap-4 items-center">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Crop Area Size</span>
                  <span className="text-brand-600 font-bold">{Math.round(cropBox.width)}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={cropBox.width}
                  onChange={(e) => {
                    const newW = Number(e.target.value);
                    const newH = ratioMode === '1:1' ? newW : (newW * cropBox.height) / cropBox.width;
                    setCropBox((prev) => ({
                      ...prev,
                      width: newW,
                      height: Math.min(100, newH),
                      x: Math.min(prev.x, 100 - newW),
                      y: Math.min(prev.y, 100 - Math.min(100, newH)),
                    }));
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click and drag the highlighted box over the photo below to reposition your frame.
              </p>
            </div>
          </div>

          {/* Interactive Workspace and Preview */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Interactive Crop Frame */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500">
                <span>Drag to Position Frame</span>
                <span>Original ({imgElement?.naturalWidth} × {imgElement?.naturalHeight} px)</span>
              </div>
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="relative aspect-video w-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden select-none"
              >
                {imgElement && (
                  <img
                    src={imgElement.src}
                    alt="Source to crop"
                    className="max-h-full max-w-full object-contain pointer-events-none opacity-60"
                  />
                )}

                {/* Draggable Crop Box Overlay */}
                <div
                  onMouseDown={handleMouseDown}
                  style={{
                    left: `${cropBox.x}%`,
                    top: `${cropBox.y}%`,
                    width: `${cropBox.width}%`,
                    height: `${cropBox.height}%`,
                  }}
                  className="absolute cursor-move border-2 border-brand-500 bg-brand-500/20 shadow-2xl transition-shadow backdrop-brightness-125"
                >
                  <div className="absolute top-1 left-2 text-[10px] font-mono font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                    {currentCropPixels.w} × {currentCropPixels.h}
                  </div>
                  {/* Corner marks */}
                  <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-white -translate-x-0.5 -translate-y-0.5" />
                  <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-white translate-x-0.5 -translate-y-0.5" />
                  <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-white -translate-x-0.5 translate-y-0.5" />
                  <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-white translate-x-0.5 translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* Live Crop Result Preview */}
            <div className="rounded-2xl border border-brand-200 dark:border-brand-900/50 bg-white dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-brand-600 dark:text-brand-400">
                <span>Live Crop Output</span>
                <span>
                  {croppedBlob ? formatFileSize(croppedBlob.size) : 'Rendering...'}
                </span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/50 dark:border-slate-700/50">
                {croppedPreviewUrl ? (
                  <img
                    src={croppedPreviewUrl}
                    alt="Cropped output"
                    className="max-h-full max-w-full object-contain rounded shadow-sm"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Calculating crop...</span>
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
              disabled={!croppedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download Cropped Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
