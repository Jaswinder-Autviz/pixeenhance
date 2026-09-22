'use client';

import React, { useState } from 'react';
import {
  Repeat,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  Sparkles,
  Archive,
  Layers,
  FileImage,
  CheckCircle2,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { formatFileSize, downloadBlob } from '@/src/lib/imageUtils';
import { createZipArchive, downloadFileBlob } from '@/src/lib/zipUtils';

export type TargetFormat = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/bmp' | 'image/svg+xml' | 'image/x-icon';

interface ConvertQueueItem {
  id: string;
  file: File;
  previewUrl: string;
  origSize: number;
  status: 'idle' | 'processing' | 'done' | 'error';
  resultBlob?: Blob;
  resultSize?: number;
}

interface UniversalConverterViewProps {
  forcedTargetFormat?: TargetFormat;
  acceptedFileTypes?: string;
  defaultTitle?: string;
  defaultSubtitle?: string;
}

export function UniversalConverterView({
  forcedTargetFormat,
  acceptedFileTypes = 'image/*,.heic,.heif',
  defaultTitle = 'Drop images to convert formats',
  defaultSubtitle = 'Convert JPG, PNG, WebP, SVG, HEIC, BMP directly in your browser.',
}: UniversalConverterViewProps) {
  const [items, setItems] = useState<ConvertQueueItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>(forcedTargetFormat || 'image/png');
  const [quality, setQuality] = useState<number>(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  const handleFilesAdd = (newFiles: File[]) => {
    const queueItems: ConvertQueueItem[] = newFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
      origSize: file.size,
      status: 'idle',
    }));

    setItems((prev) => [...prev, ...queueItems]);
  };

  const convertSingleItem = async (item: ConvertQueueItem): Promise<Blob> => {
    const file = item.file;
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type.includes('heic');

    let sourceBlob: Blob = file;

    // Decode HEIC using heic2any if available or dynamic CDN script
    if (isHeic) {
      if (typeof window !== 'undefined' && !(window as any).heic2any) {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
          s.onload = resolve;
          s.onerror = () => reject(new Error('Failed to load HEIC decoder script'));
          document.head.appendChild(s);
        });
      }
      if ((window as any).heic2any) {
        const converted = await (window as any).heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: quality,
        });
        sourceBlob = Array.isArray(converted) ? converted[0] : converted;
      }
    }

    // Now render sourceBlob to HTML5 Canvas
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(sourceBlob);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context failed'));
          return;
        }

        // Background for opaque formats
        if (targetFormat === 'image/jpeg' || targetFormat === 'image/bmp') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        if (targetFormat === 'image/svg+xml') {
          // Wrap raster image into scalable SVG
          const dataUrl = canvas.toDataURL('image/png');
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas.width} ${canvas.height}" width="100%" height="100%">
  <image width="${canvas.width}" height="${canvas.height}" href="${dataUrl}" />
</svg>`;
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
          resolve(svgBlob);
          return;
        }

        const mime = targetFormat === 'image/x-icon' ? 'image/png' : targetFormat;
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (targetFormat === 'image/x-icon') {
                resolve(new Blob([blob], { type: 'image/x-icon' }));
              } else {
                resolve(blob);
              }
            } else {
              reject(new Error('Blob encoding failed'));
            }
          },
          mime,
          quality
        );
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image for conversion'));
      };
      img.src = url;
    });
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
        const blob = await convertSingleItem(item);
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

  const getExtension = (fmt: TargetFormat) => {
    switch (fmt) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/png':
        return 'png';
      case 'image/webp':
        return 'webp';
      case 'image/bmp':
        return 'bmp';
      case 'image/svg+xml':
        return 'svg';
      case 'image/x-icon':
        return 'ico';
      default:
        return 'jpg';
    }
  };

  const handleDownloadSingle = (item: ConvertQueueItem) => {
    if (!item.resultBlob) return;
    const ext = getExtension(targetFormat);
    const baseName = item.file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(item.resultBlob, `${baseName}_converted.${ext}`);
  };

  const handleDownloadAllZip = async () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.resultBlob);
    if (doneItems.length === 0) return;

    const ext = getExtension(targetFormat);
    const filesToZip = await Promise.all(
      doneItems.map(async (item) => {
        const buffer = await item.resultBlob!.arrayBuffer();
        const baseName = item.file.name.replace(/\.[^/.]+$/, '');
        return {
          name: `${baseName}.${ext}`,
          data: new Uint8Array(buffer),
        };
      })
    );

    const zipBlob = createZipArchive(filesToZip);
    downloadFileBlob(zipBlob, `converted_${ext}_images.zip`);
  };

  const handleRemove = (id: string) => {
    setItems((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
  };

  const doneCount = items.filter((i) => i.status === 'done').length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {items.length === 0 ? (
        <DropZone
          multiple={true}
          accept={acceptedFileTypes}
          onFilesSelect={handleFilesAdd}
          title={defaultTitle}
          subtitle={defaultSubtitle}
          buttonText="Select Image(s)"
        />
      ) : (
        <div className="space-y-6">
          {/* Settings Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Image Conversion Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {items.length} files queued &bull; Fast &amp; secure conversion
                  </p>
                </div>
              </div>

              {/* Add More */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all">
                <Plus className="h-4 w-4 text-brand-600" />
                <span>Add More Images</span>
                <input
                  type="file"
                  multiple
                  accept={acceptedFileTypes}
                  onChange={(e) => {
                    if (e.target.files) handleFilesAdd(Array.from(e.target.files));
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* Target Format & Quality */}
            <div className="pt-5 grid sm:grid-cols-2 gap-5">
              {!forcedTargetFormat && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Target Format
                  </label>
                  <select
                    value={targetFormat}
                    onChange={(e) => setTargetFormat(e.target.value as TargetFormat)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                  >
                    <option value="image/png">PNG (Lossless with Alpha)</option>
                    <option value="image/jpeg">JPG / JPEG (Standard)</option>
                    <option value="image/webp">WebP (Modern Compact)</option>
                    <option value="image/svg+xml">SVG (Scalable Vector)</option>
                    <option value="image/bmp">BMP (Bitmap)</option>
                    <option value="image/x-icon">ICO (Favicon)</option>
                  </select>
                </div>
              )}

              {/* Quality Slider for lossy */}
              {(targetFormat === 'image/jpeg' || targetFormat === 'image/webp') && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Quality</span>
                    <span className="font-mono text-brand-600">{Math.round(quality * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-brand-600"
                  />
                </div>
              )}
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
                      Converting ({processedCount}/{items.length})...
                    </span>
                  </>
                ) : (
                  <>
                    <Repeat className="h-4 w-4" />
                    <span>Convert All ({items.length}) Images</span>
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
              onClick={() => {
                items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
                setItems([]);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors"
            >
              Clear All Images
            </button>
          </div>

          {/* Queue Cards */}
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
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    <span>{formatFileSize(item.origSize)}</span>
                    {item.resultSize && (
                      <span className="text-emerald-600 font-semibold ml-1.5">
                        &bull; {formatFileSize(item.resultSize)}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-brand-600 mt-0.5 uppercase">
                    &rarr; {getExtension(targetFormat)}
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
                      title="Remove"
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
