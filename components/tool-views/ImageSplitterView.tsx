'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  LayoutGrid,
  Download,
  RotateCcw,
  Sparkles,
  Columns,
  Rows,
  Layers,
  Check,
  Eye,
  Sliders,
  FileArchive,
  ArrowRight,
  Maximize2,
  Info,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DropZone } from '../common/DropZone';
import { loadImage, formatFileSize } from '@/src/lib/imageUtils';
import { createZipArchive, downloadFileBlob, ZipFileItem } from '@/src/lib/zipUtils';

interface SliceItem {
  id: string;
  index: number;
  row: number;
  col: number;
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}

type SplitMode = 'columns' | 'grid' | 'rows';

interface PresetItem {
  id: string;
  name: string;
  mode: SplitMode;
  cols: number;
  rows: number;
  badge?: string;
  description: string;
}

const PRESETS: PresetItem[] = [
  {
    id: 'landscape-3',
    name: '3 Parts (Landscape)',
    mode: 'columns',
    cols: 3,
    rows: 1,
    badge: 'Popular',
    description: 'Split wide landscape image into 3 vertical swipe parts',
  },
  {
    id: 'landscape-2',
    name: '2 Parts (Swipe)',
    mode: 'columns',
    cols: 2,
    rows: 1,
    description: 'Split panorama photo into 2 seamless carousel slides',
  },
  {
    id: 'landscape-4',
    name: '4 Parts (Panorama)',
    mode: 'columns',
    cols: 4,
    rows: 1,
    description: 'Ultra-wide landscape into 4 seamless carousel slides',
  },
  {
    id: 'landscape-5',
    name: '5 Parts',
    mode: 'columns',
    cols: 5,
    rows: 1,
    description: '5-slide panorama split for long Instagram carousels',
  },
  {
    id: 'insta-3x3',
    name: 'Instagram 3×3 Grid',
    mode: 'grid',
    cols: 3,
    rows: 3,
    badge: '9 Tiles',
    description: 'Split into 9 square tiles for Instagram profile feed layout',
  },
  {
    id: 'insta-3x2',
    name: 'Instagram 3×2 Grid',
    mode: 'grid',
    cols: 3,
    rows: 2,
    description: '6 square tiles for a 2-row Instagram profile banner',
  },
  {
    id: 'grid-2x2',
    name: '2×2 Quad Grid',
    mode: 'grid',
    cols: 2,
    rows: 2,
    description: 'Split evenly into 4 quadrants',
  },
  {
    id: 'vertical-3',
    name: 'Vertical 3 Strips',
    mode: 'rows',
    cols: 1,
    rows: 3,
    description: 'Cut tall photo into 3 horizontal sections',
  },
];

export function ImageSplitterView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Split Configuration
  const [splitMode, setSplitMode] = useState<SplitMode>('columns');
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<string>('landscape-3');

  // Export Settings
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [quality, setQuality] = useState<number>(92);
  const [prefix, setPrefix] = useState<string>('slice');

  // Generated Slices
  const [slices, setSlices] = useState<SliceItem[]>([]);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [activeSliceIndex, setActiveSliceIndex] = useState<number | null>(null);
  const [modalSlice, setModalSlice] = useState<SliceItem | null>(null);
  const [copiedSliceId, setCopiedSliceId] = useState<string | null>(null);

  // Load File
  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);

      // Clean default filename prefix
      const baseName = selectedFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      setPrefix(baseName ? `${baseName}_part` : 'slice');

      // Auto-choose best mode based on aspect ratio
      if (img.naturalWidth >= img.naturalHeight) {
        // Landscape photo: default to 3 columns (user's primary request)
        setSplitMode('columns');
        setCols(3);
        setRows(1);
        setActivePreset('landscape-3');
      } else {
        // Portrait photo: 3 rows or 3x1
        setSplitMode('rows');
        setCols(1);
        setRows(3);
        setActivePreset('vertical-3');
      }
    } catch (err) {
      console.error('Failed to load image:', err);
    }
  };

  // Preset Selection
  const applyPreset = (preset: PresetItem) => {
    setActivePreset(preset.id);
    setSplitMode(preset.mode);
    setCols(preset.cols);
    setRows(preset.rows);
  };

  // Mode Selection
  const handleModeChange = (mode: SplitMode) => {
    setSplitMode(mode);
    setActivePreset('custom');
    if (mode === 'columns') {
      setRows(1);
      if (cols < 2) setCols(3);
    } else if (mode === 'rows') {
      setCols(1);
      if (rows < 2) setRows(3);
    } else {
      if (cols < 2) setCols(2);
      if (rows < 2) setRows(2);
    }
  };

  // Perform Slicing
  const performSplit = useCallback(async () => {
    if (!imgElement) return;

    setIsSplitting(true);

    try {
      // Revoke prior slice URLs
      slices.forEach((s) => URL.revokeObjectURL(s.url));

      const totalCols = Math.max(1, Math.min(12, cols));
      const totalRows = Math.max(1, Math.min(12, rows));
      const imgW = imgElement.naturalWidth;
      const imgH = imgElement.naturalHeight;

      const newSlices: SliceItem[] = [];
      let sequence = 1;

      for (let r = 0; r < totalRows; r++) {
        // Exact pixel integer boundaries to ensure zero pixel gaps
        const y0 = Math.round((r * imgH) / totalRows);
        const y1 = Math.round(((r + 1) * imgH) / totalRows);
        const sliceH = y1 - y0;

        for (let c = 0; c < totalCols; c++) {
          const x0 = Math.round((c * imgW) / totalCols);
          const x1 = Math.round(((c + 1) * imgW) / totalCols);
          const sliceW = x1 - x0;

          const canvas = document.createElement('canvas');
          canvas.width = sliceW;
          canvas.height = sliceH;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // Draw slice
            ctx.drawImage(imgElement, x0, y0, sliceW, sliceH, 0, 0, sliceW, sliceH);

            const qualityVal = format === 'image/png' ? undefined : quality / 100;
            const blob = await new Promise<Blob>((resolve, reject) => {
              canvas.toBlob(
                (b) => {
                  if (b) resolve(b);
                  else reject(new Error('Canvas slice failed'));
                },
                format,
                qualityVal
              );
            });

            const url = URL.createObjectURL(blob);
            newSlices.push({
              id: `${r}_${c}_${sequence}`,
              index: sequence,
              row: r,
              col: c,
              blob,
              url,
              width: sliceW,
              height: sliceH,
              size: blob.size,
            });

            sequence++;
          }
        }
      }

      setSlices(newSlices);
    } catch (err) {
      console.error('Error during image split:', err);
    } finally {
      setIsSplitting(false);
    }
  }, [imgElement, cols, rows, format, quality]);

  // Recalculate slices with debounce
  useEffect(() => {
    if (!imgElement) return;

    const timer = setTimeout(() => {
      performSplit();
    }, 150);

    return () => clearTimeout(timer);
  }, [imgElement, cols, rows, format, quality, performSplit]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      slices.forEach((s) => URL.revokeObjectURL(s.url));
    };
  }, [previewUrl, slices]);

  // Download Single Slice
  const downloadSlice = (slice: SliceItem) => {
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
    const cleanPrefix = prefix.trim() || 'slice';
    const fileName = `${cleanPrefix}_${slice.index}.${ext}`;
    downloadFileBlob(slice.blob, fileName);
  };

  // Download All as ZIP
  const downloadAllAsZip = async () => {
    if (slices.length === 0) return;

    setIsZipping(true);
    try {
      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
      const cleanPrefix = prefix.trim() || 'slice';

      const filesToZip: ZipFileItem[] = await Promise.all(
        slices.map(async (slice) => {
          const arrayBuffer = await slice.blob.arrayBuffer();
          return {
            name: `${cleanPrefix}_${slice.index}.${ext}`,
            data: new Uint8Array(arrayBuffer),
          };
        })
      );

      const zipBlob = createZipArchive(filesToZip);
      downloadFileBlob(zipBlob, `${cleanPrefix}_${slices.length}parts.zip`);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch {
        // Confetti fallback
      }
    } catch (err) {
      console.error('Failed to create ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  // Reset
  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    slices.forEach((s) => URL.revokeObjectURL(s.url));
    setFile(null);
    setImgElement(null);
    setPreviewUrl(null);
    setSlices([]);
    setActiveSliceIndex(null);
    setModalSlice(null);
  };

  // Calculate slice dimensions summary
  const sliceWidthEst = imgElement ? Math.round(imgElement.naturalWidth / cols) : 0;
  const sliceHeightEst = imgElement ? Math.round(imgElement.naturalHeight / rows) : 0;
  const totalPieces = cols * rows;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop landscape or any image to split"
          subtitle="Supports JPG, PNG, and WebP — split into 2, 3, or more parts & grids"
        />
      ) : (
        <div className="space-y-6">
          {/* Top Controls Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-6 shadow-sm backdrop-blur-md">
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                  <LayoutGrid className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Image Splitter &amp; Grid Slicer
                    </h2>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                      {totalPieces} {totalPieces === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Original: {imgElement?.naturalWidth} × {imgElement?.naturalHeight} px &bull;
                    Each Slice: ~{sliceWidthEst} × {sliceHeightEst} px
                  </p>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => handleModeChange('columns')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                    splitMode === 'columns'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Columns className="h-3.5 w-3.5" />
                  <span>Columns (Landscape)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('grid')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                    splitMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span>Grid (Rows × Cols)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('rows')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
                    splitMode === 'rows'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Rows className="h-3.5 w-3.5" />
                  <span>Rows (Vertical)</span>
                </button>
              </div>
            </div>

            {/* Presets Bar */}
            <div className="pt-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 block">
                Quick Presets
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {PRESETS.map((preset) => {
                  const isActive = activePreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-600/30'
                          : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60'
                      }`}
                    >
                      <span>{preset.name}</span>
                      {preset.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold'
                          }`}
                        >
                          {preset.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Manual Slicers & Custom Controls */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Columns Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Columns className="h-3.5 w-3.5 text-indigo-500" />
                    Columns (Vertical Cuts)
                  </span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                    {cols}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    disabled={splitMode === 'rows'}
                    value={cols}
                    onChange={(e) => {
                      setCols(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-40"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1</span>
                  <span>3</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Rows Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Rows className="h-3.5 w-3.5 text-purple-500" />
                    Rows (Horizontal Cuts)
                  </span>
                  <span className="font-mono text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md">
                    {rows}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    disabled={splitMode === 'columns'}
                    value={rows}
                    onChange={(e) => {
                      setRows(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 disabled:opacity-40"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1</span>
                  <span>3</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              {/* Output Format */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Output Format</span>
                  <span className="text-slate-400 uppercase text-[10px]">
                    {format.replace('image/', '')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                  {[
                    { id: 'image/jpeg', label: 'JPG' },
                    { id: 'image/png', label: 'PNG' },
                    { id: 'image/webp', label: 'WebP' },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setFormat(fmt.id as typeof format)}
                      className={`py-1.5 rounded-lg text-center transition-all ${
                        format === fmt.id
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
                {format !== 'image/png' && (
                  <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Quality: {quality}%</span>
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                )}
              </div>

              {/* Filename Prefix */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>File Name Prefix</span>
                  <span className="text-[10px] text-slate-400">_1, _2, _3</span>
                </div>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="e.g. landscape_part"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[10px] text-slate-400">
                  Saves as {prefix || 'slice'}_1.{format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp'}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Visual Overlay Preview */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Cut-Line Preview
                </h3>
                <span className="text-xs text-slate-400">
                  ({cols} cols × {rows} rows = {totalPieces} slices)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="hidden sm:inline">Click any slice to highlight below</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors ml-2"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Change Image</span>
                </button>
              </div>
            </div>

            {/* Container with Image + Grid Overlay */}
            <div className="relative w-full max-h-[500px] rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2 select-none border border-slate-200 dark:border-slate-800">
              {previewUrl && (
                <div className="relative inline-block max-w-full max-h-[460px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Original photo to split"
                    className="block max-w-full max-h-[460px] object-contain rounded-xl shadow-lg"
                  />

                  {/* Cut Lines & Number Badges Overlay */}
                  <div
                    className="absolute inset-0 grid rounded-xl pointer-events-auto"
                    style={{
                      gridTemplateColumns: `repeat(${cols}, 1fr)`,
                      gridTemplateRows: `repeat(${rows}, 1fr)`,
                    }}
                  >
                    {Array.from({ length: totalPieces }).map((_, i) => {
                      const sliceNum = i + 1;
                      const isHighlighted = activeSliceIndex === sliceNum;
                      return (
                        <div
                          key={i}
                          onClick={() => {
                            setActiveSliceIndex(sliceNum);
                            const element = document.getElementById(`slice-card-${sliceNum}`);
                            element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }}
                          className={`relative border border-dashed transition-all duration-150 cursor-pointer flex flex-col justify-between p-2.5 ${
                            isHighlighted
                              ? 'border-indigo-400 bg-indigo-500/30 ring-2 ring-indigo-400'
                              : 'border-white/70 hover:border-indigo-300 hover:bg-white/15'
                          }`}
                        >
                          {/* Number Badge */}
                          <div className="flex items-center gap-1 self-start">
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-md transition-all ${
                                isHighlighted
                                  ? 'bg-indigo-600 text-white ring-2 ring-white/50'
                                  : 'bg-black/75 text-white backdrop-blur-sm'
                              }`}
                            >
                              Slide #{sliceNum}
                            </span>
                          </div>

                          {/* Dimension indicator on bottom right */}
                          <div className="self-end">
                            <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/60 text-white/90 backdrop-blur-sm">
                              {sliceWidthEst} × {sliceHeightEst} px
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Bar & Slices Gallery */}
          <div className="space-y-5">
            {/* Top Download Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-indigo-200/80 dark:border-indigo-900/50 p-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span>Ready to Export: {slices.length} Slices</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Download all parts packaged as a clean ZIP, or download each slide individually.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isZipping || slices.length === 0}
                  onClick={downloadAllAsZip}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <FileArchive className="h-4 w-4" />
                  <span>{isZipping ? 'Archiving ZIP...' : `Download All (${slices.length}) as ZIP`}</span>
                </button>
              </div>
            </div>

            {/* Slices Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {slices.map((slice) => {
                const isSelected = activeSliceIndex === slice.index;
                return (
                  <div
                    key={slice.id}
                    id={`slice-card-${slice.index}`}
                    className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden bg-white dark:bg-slate-900 p-3 shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-indigo-500/10'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">
                        Slide #{slice.index}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formatFileSize(slice.size)}
                      </span>
                    </div>

                    {/* Thumbnail */}
                    <div
                      onClick={() => setModalSlice(slice)}
                      className="relative aspect-video w-full rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden cursor-pointer group-hover:opacity-95"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slice.url}
                        alt={`Slide ${slice.index}`}
                        className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1 text-xs font-semibold">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </div>
                    </div>

                    {/* Metadata & Download Button */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{slice.width} × {slice.height} px</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => downloadSlice(slice)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/70 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slicing Tips Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-5">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
              <Info className="h-4 w-4 text-indigo-500" />
              <span>Pro Tips for Instagram Landscape Carousel Posts</span>
            </h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
              <li>
                <strong>3-Slide Panorama:</strong> Choose the &ldquo;3 Parts (Landscape)&rdquo; preset. In the Instagram app, select &ldquo;Multiple Photos&rdquo; and upload Slide #1, Slide #2, and Slide #3 in sequential order.
              </li>
              <li>
                <strong>Zero Seams:</strong> Our precision pixel calculations divide your photo without losing a single pixel, ensuring a 100% seamless transition when swiped.
              </li>
              <li>
                <strong>Instagram 3×3 Grid:</strong> Slices your photo into 9 square tiles. Post them in reverse order (Slide #9 first, ending with Slide #1) to assemble the full photo on your profile grid.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {modalSlice && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setModalSlice(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">
                  Slide #{modalSlice.index}
                </span>
                <span className="text-xs text-slate-400">
                  ({modalSlice.width} × {modalSlice.height} px &bull; {formatFileSize(modalSlice.size)})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalSlice(null)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2 py-1"
              >
                &times;
              </button>
            </div>

            <div className="my-4 max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalSlice.url}
                alt={`Slide ${modalSlice.index}`}
                className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            <div className="w-full flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => downloadSlice(modalSlice)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Slide #{modalSlice.index}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
