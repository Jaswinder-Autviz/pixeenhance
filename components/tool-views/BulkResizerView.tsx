'use client';

import React, { useState } from 'react';
import {
  Maximize2,
  Sliders,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Archive,
  Layers,
  FileImage,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { formatFileSize, downloadBlob } from '@/src/lib/imageUtils';
import { createZipArchive, downloadFileBlob } from '@/src/lib/zipUtils';

interface BulkImageItem {
  id: string;
  file: File;
  previewUrl: string;
  origWidth: number;
  origHeight: number;
  newWidth: number;
  newHeight: number;
  status: 'idle' | 'processing' | 'done' | 'error';
  resultBlob?: Blob;
  resultSize?: number;
}

type ResizeMode = 'percentage' | 'max-dimension' | 'exact';

export function BulkResizerView() {
  const [items, setItems] = useState<BulkImageItem[]>([]);
  const [mode, setMode] = useState<ResizeMode>('percentage');
  const [percentage, setPercentage] = useState<number>(50);
  const [maxDimension, setMaxDimension] = useState<number>(1920);
  const [exactWidth, setExactWidth] = useState<number>(1200);
  const [exactHeight, setExactHeight] = useState<number>(800);
  const [keepAspect, setKeepAspect] = useState<boolean>(true);
  const [format, setFormat] = useState<'original' | 'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(0.85);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  const calculateTargetDimensions = (origW: number, origH: number): { w: number; h: number } => {
    if (mode === 'percentage') {
      const scale = percentage / 100;
      return {
        w: Math.max(1, Math.round(origW * scale)),
        h: Math.max(1, Math.round(origH * scale)),
      };
    } else if (mode === 'max-dimension') {
      const maxDim = maxDimension;
      if (origW <= maxDim && origH <= maxDim) {
        return { w: origW, h: origH };
      }
      if (origW > origH) {
        return {
          w: maxDim,
          h: Math.max(1, Math.round((origH * maxDim) / origW)),
        };
      } else {
        return {
          w: Math.max(1, Math.round((origW * maxDim) / origH)),
          h: maxDim,
        };
      }
    } else {
      // exact
      if (keepAspect) {
        const aspect = origW / origH;
        return {
          w: exactWidth,
          h: Math.max(1, Math.round(exactWidth / aspect)),
        };
      }
      return { w: exactWidth, h: exactHeight };
    }
  };

  const handleFilesAdd = async (newFiles: File[]) => {
    const valid = newFiles.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    const loaded: BulkImageItem[] = await Promise.all(
      valid.map(
        (file) =>
          new Promise<BulkImageItem>((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              const origW = img.naturalWidth || 800;
              const origH = img.naturalHeight || 600;
              const { w, h } = calculateTargetDimensions(origW, origH);
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                origWidth: origW,
                origHeight: origH,
                newWidth: w,
                newHeight: h,
                status: 'idle',
              });
            };
            img.onerror = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                origWidth: 800,
                origHeight: 600,
                newWidth: 400,
                newHeight: 300,
                status: 'idle',
              });
            };
            img.src = url;
          })
      )
    );

    setItems((prev) => [...prev, ...loaded]);
  };

  const updateAllTargetDimensions = (newMode: ResizeMode, p: number, maxD: number, eW: number, eH: number, keep: boolean) => {
    setItems((prev) =>
      prev.map((item) => {
        let w = item.origWidth;
        let h = item.origHeight;
        if (newMode === 'percentage') {
          const scale = p / 100;
          w = Math.max(1, Math.round(item.origWidth * scale));
          h = Math.max(1, Math.round(item.origHeight * scale));
        } else if (newMode === 'max-dimension') {
          if (item.origWidth > maxD || item.origHeight > maxD) {
            if (item.origWidth > item.origHeight) {
              w = maxD;
              h = Math.max(1, Math.round((item.origHeight * maxD) / item.origWidth));
            } else {
              w = Math.max(1, Math.round((item.origWidth * maxD) / item.origHeight));
              h = maxD;
            }
          }
        } else {
          if (keep) {
            const aspect = item.origWidth / item.origHeight;
            w = eW;
            h = Math.max(1, Math.round(eW / aspect));
          } else {
            w = eW;
            h = eH;
          }
        }
        return { ...item, newWidth: w, newHeight: h, status: 'idle', resultBlob: undefined };
      })
    );
  };

  const handleProcessAll = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setProcessedCount(0);

    const updated = [...items];
    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      item.status = 'processing';
      setItems([...updated]);

      try {
        const blob = await resizeSingleItem(item);
        item.resultBlob = blob;
        item.resultSize = blob.size;
        item.status = 'done';
      } catch (err) {
        console.error(err);
        item.status = 'error';
      }
      setProcessedCount(i + 1);
      setItems([...updated]);
    }

    setIsProcessing(false);
  };

  const resizeSingleItem = (item: BulkImageItem): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = item.newWidth;
        canvas.height = item.newHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context error'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw background if converting transparent image to JPEG
        const targetFormat = format === 'original' ? item.file.type || 'image/jpeg' : format;
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, item.newWidth, item.newHeight);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Resize blob generation failed'));
          },
          targetFormat,
          quality
        );
      };
      img.onerror = reject;
      img.src = item.previewUrl;
    });
  };

  const handleDownloadSingle = (item: BulkImageItem) => {
    if (!item.resultBlob) return;
    const targetFormat = format === 'original' ? item.file.type || 'image/jpeg' : format;
    const ext = targetFormat.includes('png') ? 'png' : targetFormat.includes('webp') ? 'webp' : 'jpg';
    const nameWithoutExt = item.file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(item.resultBlob, `${nameWithoutExt}_resized_${item.newWidth}x${item.newHeight}.${ext}`);
  };

  const handleDownloadAllZip = async () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.resultBlob);
    if (doneItems.length === 0) return;

    const filesToZip = await Promise.all(
      doneItems.map(async (item) => {
        const buffer = await item.resultBlob!.arrayBuffer();
        const targetFormat = format === 'original' ? item.file.type || 'image/jpeg' : format;
        const ext = targetFormat.includes('png') ? 'png' : targetFormat.includes('webp') ? 'webp' : 'jpg';
        const nameWithoutExt = item.file.name.replace(/\.[^/.]+$/, '');
        return {
          name: `${nameWithoutExt}_resized.${ext}`,
          data: new Uint8Array(buffer),
        };
      })
    );

    const zipBlob = createZipArchive(filesToZip);
    downloadFileBlob(zipBlob, 'resized_images.zip');
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const handleClearAll = () => {
    items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    setItems([]);
  };

  const doneCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {items.length === 0 ? (
        <DropZone
          multiple={true}
          onFilesSelect={handleFilesAdd}
          title="Drop multiple images to resize in bulk"
          subtitle="Scale dozens of photos simultaneously with aspect ratio lock. Fast, free & private."
          buttonText="Select Images (Bulk)"
        />
      ) : (
        <div className="space-y-6">
          {/* Global Batch Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Maximize2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Bulk Resize Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {items.length} images queued for resizing
                  </p>
                </div>
              </div>

              {/* Add More Button */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all">
                <Plus className="h-4 w-4 text-brand-600" />
                <span>Add More Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) handleFilesAdd(Array.from(e.target.files));
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Resize Mode Selector */}
            <div className="pt-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setMode('percentage');
                    updateAllTargetDimensions('percentage', percentage, maxDimension, exactWidth, exactHeight, keepAspect);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'percentage'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  By Percentage (%)
                </button>
                <button
                  onClick={() => {
                    setMode('max-dimension');
                    updateAllTargetDimensions('max-dimension', percentage, maxDimension, exactWidth, exactHeight, keepAspect);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'max-dimension'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  By Max Dimension (px)
                </button>
                <button
                  onClick={() => {
                    setMode('exact');
                    updateAllTargetDimensions('exact', percentage, maxDimension, exactWidth, exactHeight, keepAspect);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    mode === 'exact'
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Exact Dimensions
                </button>
              </div>

              {/* Mode Specific Inputs */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {mode === 'percentage' && (
                  <div className="space-y-2 sm:col-span-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                      <span>Scale Factor</span>
                      <span className="font-mono text-brand-600">{percentage}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="10"
                        max="200"
                        step="5"
                        value={percentage}
                        onChange={(e) => {
                          const p = Number(e.target.value);
                          setPercentage(p);
                          updateAllTargetDimensions('percentage', p, maxDimension, exactWidth, exactHeight, keepAspect);
                        }}
                        className="w-full accent-brand-600"
                      />
                    </div>
                    <div className="flex gap-2">
                      {[25, 50, 75, 125, 150].map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setPercentage(p);
                            updateAllTargetDimensions('percentage', p, maxDimension, exactWidth, exactHeight, keepAspect);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                            percentage === p
                              ? 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {p}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mode === 'max-dimension' && (
                  <div className="space-y-2 sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Max Width / Height (px)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="100"
                        max="8000"
                        value={maxDimension}
                        onChange={(e) => {
                          const maxD = Number(e.target.value) || 1080;
                          setMaxDimension(maxD);
                          updateAllTargetDimensions('max-dimension', percentage, maxD, exactWidth, exactHeight, keepAspect);
                        }}
                        className="w-48 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                      />
                      <div className="flex gap-1.5">
                        {[800, 1080, 1920, 2560].map((d) => (
                          <button
                            key={d}
                            onClick={() => {
                              setMaxDimension(d);
                              updateAllTargetDimensions('max-dimension', percentage, d, exactWidth, exactHeight, keepAspect);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
                          >
                            {d}px
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {mode === 'exact' && (
                  <div className="space-y-2 sm:col-span-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Width (px)</label>
                        <input
                          type="number"
                          value={exactWidth}
                          onChange={(e) => {
                            const w = Number(e.target.value) || 800;
                            setExactWidth(w);
                            updateAllTargetDimensions('exact', percentage, maxDimension, w, exactHeight, keepAspect);
                          }}
                          className="w-28 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1 font-semibold">Height (px)</label>
                        <input
                          type="number"
                          disabled={keepAspect}
                          value={exactHeight}
                          onChange={(e) => {
                            const h = Number(e.target.value) || 600;
                            setExactHeight(h);
                            updateAllTargetDimensions('exact', percentage, maxDimension, exactWidth, h, keepAspect);
                          }}
                          className="w-28 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold disabled:opacity-50"
                        />
                      </div>
                      <label className="flex items-center gap-2 pt-5 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={keepAspect}
                          onChange={(e) => {
                            setKeepAspect(e.target.checked);
                            updateAllTargetDimensions('exact', percentage, maxDimension, exactWidth, exactHeight, e.target.checked);
                          }}
                          className="rounded accent-brand-600"
                        />
                        <span>Lock Aspect Ratio</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Output Format */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Output Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <option value="image/jpeg">JPG / JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP (Smallest)</option>
                    <option value="original">Preserve Original</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Action Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleProcessAll}
                disabled={isProcessing || items.length === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>
                      Processing ({processedCount}/{items.length})...
                    </span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Resize All ({items.length}) Images</span>
                  </>
                )}
              </button>

              {doneCount > 0 && (
                <button
                  onClick={handleDownloadAllZip}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Archive className="h-4 w-4" />
                  <span>Download All as ZIP ({doneCount})</span>
                </button>
              )}
            </div>

            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
            >
              Clear All Images
            </button>
          </div>

          {/* Batch Images List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
              >
                <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/50">
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.file.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span>
                      {item.origWidth}×{item.origHeight}
                    </span>
                    <span>&rarr;</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">
                      {item.newWidth}×{item.newHeight}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span>{formatFileSize(item.file.size)}</span>
                    {item.resultSize && (
                      <span className="text-emerald-600 font-semibold">
                        &bull; New: {formatFileSize(item.resultSize)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  {item.status === 'done' ? (
                    <button
                      onClick={() => handleDownloadSingle(item)}
                      className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 hover:bg-brand-600 hover:text-white transition-colors"
                      title="Download image"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  ) : item.status === 'processing' ? (
                    <span className="h-4 w-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin m-2" />
                  ) : (
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-500 transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
