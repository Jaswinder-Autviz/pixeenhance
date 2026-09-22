'use client';

import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  FileText,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Sliders,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  PdfImageItem,
  PdfOptions,
  createPdfFromImages,
} from '@/src/lib/pdfUtils';
import { downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

interface ImageToPdfViewProps {
  sourceFormat?: 'all' | 'jpg' | 'png';
}

export function ImageToPdfView({ sourceFormat = 'all' }: ImageToPdfViewProps) {
  const [images, setImages] = useState<PdfImageItem[]>([]);
  const [options, setOptions] = useState<PdfOptions>({
    pageSize: 'a4',
    orientation: 'auto',
    margin: 'small',
    quality: 0.9,
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPdfBlob, setGeneratedPdfBlob] = useState<Blob | null>(null);

  const handleFilesBatchAdd = async (newFiles: File[]) => {
    const validFiles = newFiles.filter(
      (f) =>
        f.type.startsWith('image/') ||
        /\.(jpg|jpeg|png|webp|avif|bmp|gif)$/i.test(f.name)
    );
    if (validFiles.length === 0) return;

    const loadedItems: PdfImageItem[] = await Promise.all(
      validFiles.map(
        (file) =>
          new Promise<PdfImageItem>((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                width: img.naturalWidth || 800,
                height: img.naturalHeight || 600,
              });
            };
            img.onerror = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                width: 800,
                height: 600,
              });
            };
            img.src = url;
          })
      )
    );

    setImages((prev) => [...prev, ...loadedItems]);
    setGeneratedPdfBlob(null);
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesBatchAdd(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleRemove = (id: string) => {
    setImages((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((x) => x.id !== id);
    });
    setGeneratedPdfBlob(null);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
    setGeneratedPdfBlob(null);
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    try {
      const pdfBlob = await createPdfFromImages(images, options);
      setGeneratedPdfBlob(pdfBlob);
      downloadBlob(pdfBlob, 'converted-document.pdf');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
    setGeneratedPdfBlob(null);
  };

  const totalInputBytes = images.reduce((acc, curr) => acc + curr.file.size, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {images.length === 0 ? (
        <DropZone
          multiple={true}
          onFilesSelect={handleFilesBatchAdd}
          onFileSelect={(f) => handleFilesBatchAdd([f])}
          title={
            sourceFormat === 'jpg'
              ? 'Drop JPG / JPEG images here, or browse'
              : sourceFormat === 'png'
              ? 'Drop PNG images here, or browse'
              : 'Drop multiple images here to convert to PDF'
          }
          subtitle="Select multiple JPG, PNG, or WebP photos to create a multi-page PDF document"
          buttonText="Select Images"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    PDF Page Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {images.length} {images.length === 1 ? 'page' : 'pages'} queued &bull;{' '}
                    {formatFileSize(totalInputBytes)} total
                  </p>
                </div>
              </div>

              {/* Add More Images Button */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all">
                <Plus className="h-4 w-4 text-brand-600" />
                <span>Add More Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleMultipleFiles}
                  className="hidden"
                />
              </label>
            </div>

            {/* Layout Options */}
            <div className="pt-5 grid sm:grid-cols-3 gap-5">
              {/* Page Size */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Size
                </label>
                <select
                  value={options.pageSize}
                  onChange={(e) =>
                    setOptions({ ...options, pageSize: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="fit">Fit to Image Resolution</option>
                </select>
              </div>

              {/* Orientation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Orientation
                </label>
                <select
                  value={options.orientation}
                  onChange={(e) =>
                    setOptions({ ...options, orientation: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="auto">Auto (Match Image Ratio)</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              {/* Margins */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Page Margins
                </label>
                <select
                  value={options.margin}
                  onChange={(e) =>
                    setOptions({ ...options, margin: e.target.value as any })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="none">No Margin (Full Bleed)</option>
                  <option value="small">Compact Margins (Recommended)</option>
                  <option value="large">Large Margins</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reorderable Image Page Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>PDF Pages Order ({images.length})</span>
              <span className="text-slate-400 font-normal">
                Use arrows to rearrange page sequence
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"
                >
                  {/* Page Number Badge */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand-600 text-white font-mono text-[11px] font-bold shrink-0">
                    {idx + 1}
                  </div>

                  {/* Thumbnail */}
                  <div className="h-16 w-16 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/50">
                    <img
                      src={item.previewUrl}
                      alt={`Page ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {item.width} × {item.height} px
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {formatFileSize(item.file.size)}
                    </p>
                  </div>

                  {/* Reorder & Remove Controls */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === images.length - 1}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5 text-slate-500" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500"
                      title="Delete page"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All Images</span>
            </button>

            <button
              onClick={handleGeneratePdf}
              disabled={isGenerating || images.length === 0}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              {isGenerating ? (
                <>
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Compiling PDF Document...</span>
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  <span>Generate &amp; Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
