'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Download,
  RotateCcw,
  Plus,
  Trash2,
  Sliders,
  Palette,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { downloadBlob } from '@/src/lib/imageUtils';

interface CollagePhoto {
  id: string;
  file: File;
  previewUrl: string;
  imgElement: HTMLImageElement;
}

type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16';

export function CollageMakerView() {
  const [photos, setPhotos] = useState<CollagePhoto[]>([]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [layoutIndex, setLayoutIndex] = useState<number>(0);
  const [gap, setGap] = useState<number>(12);
  const [padding, setPadding] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [exportFormat, setExportFormat] = useState<'image/png' | 'image/jpeg'>('image/png');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilesAdd = async (newFiles: File[]) => {
    const valid = newFiles.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) return;

    const loaded: CollagePhoto[] = await Promise.all(
      valid.map(
        (file) =>
          new Promise<CollagePhoto>((resolve) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                imgElement: img,
              });
            };
            img.onerror = () => {
              resolve({
                id: Math.random().toString(36).substring(2, 9),
                file,
                previewUrl: url,
                imgElement: img,
              });
            };
            img.src = url;
          })
      )
    );

    setPhotos((prev) => [...prev, ...loaded]);
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  // Render collage to canvas whenever settings change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || photos.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas (2000px base)
    let baseW = 1600;
    let baseH = 1600;
    if (aspectRatio === '4:5') {
      baseW = 1440;
      baseH = 1800;
    } else if (aspectRatio === '16:9') {
      baseW = 1920;
      baseH = 1080;
    } else if (aspectRatio === '9:16') {
      baseW = 1080;
      baseH = 1920;
    }

    canvas.width = baseW;
    canvas.height = baseH;

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, baseW, baseH);

    // Compute cell rectangles based on photo count and layout
    const count = photos.length;
    const availW = baseW - padding * 2;
    const availH = baseH - padding * 2;
    const g = gap;

    interface Rect {
      x: number;
      y: number;
      w: number;
      h: number;
    }
    const rects: Rect[] = [];

    if (count === 1) {
      rects.push({ x: padding, y: padding, w: availW, h: availH });
    } else if (count === 2) {
      if (layoutIndex % 2 === 0) {
        // Vertical split (side by side)
        const w = (availW - g) / 2;
        rects.push({ x: padding, y: padding, w, h: availH });
        rects.push({ x: padding + w + g, y: padding, w, h: availH });
      } else {
        // Horizontal split (stacked)
        const h = (availH - g) / 2;
        rects.push({ x: padding, y: padding, w: availW, h });
        rects.push({ x: padding, y: padding + h + g, w: availW, h });
      }
    } else if (count === 3) {
      if (layoutIndex % 2 === 0) {
        // 1 Big left + 2 right
        const w1 = (availW - g) * 0.6;
        const w2 = (availW - g) * 0.4;
        const h2 = (availH - g) / 2;
        rects.push({ x: padding, y: padding, w: w1, h: availH });
        rects.push({ x: padding + w1 + g, y: padding, w: w2, h: h2 });
        rects.push({ x: padding + w1 + g, y: padding + h2 + g, w: w2, h: h2 });
      } else {
        // 1 Big top + 2 bottom
        const h1 = (availH - g) * 0.6;
        const h2 = (availH - g) * 0.4;
        const w2 = (availW - g) / 2;
        rects.push({ x: padding, y: padding, w: availW, h: h1 });
        rects.push({ x: padding, y: padding + h1 + g, w: w2, h: h2 });
        rects.push({ x: padding + w2 + g, y: padding + h1 + g, w: w2, h: h2 });
      }
    } else if (count === 4) {
      if (layoutIndex % 2 === 0) {
        // 2x2 Grid
        const w = (availW - g) / 2;
        const h = (availH - g) / 2;
        rects.push({ x: padding, y: padding, w, h });
        rects.push({ x: padding + w + g, y: padding, w, h });
        rects.push({ x: padding, y: padding + h + g, w, h });
        rects.push({ x: padding + w + g, y: padding + h + g, w, h });
      } else {
        // 1 large left + 3 right
        const w1 = (availW - g) * 0.55;
        const w2 = (availW - g) * 0.45;
        const h2 = (availH - g * 2) / 3;
        rects.push({ x: padding, y: padding, w: w1, h: availH });
        rects.push({ x: padding + w1 + g, y: padding, w: w2, h: h2 });
        rects.push({ x: padding + w1 + g, y: padding + h2 + g, w: w2, h: h2 });
        rects.push({ x: padding + w1 + g, y: padding + (h2 + g) * 2, w: w2, h: h2 });
      }
    } else {
      // General Grid for 5+
      const cols = count <= 6 ? 3 : Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      const w = (availW - g * (cols - 1)) / cols;
      const h = (availH - g * (rows - 1)) / rows;

      for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        rects.push({
          x: padding + col * (w + g),
          y: padding + row * (h + g),
          w,
          h,
        });
      }
    }

    // Draw each photo inside rounded cell with cover fitting
    photos.forEach((photo, idx) => {
      if (!rects[idx]) return;
      const r = rects[idx];
      const img = photo.imgElement;
      if (!img.naturalWidth) return;

      ctx.save();
      // Rounded clipping path
      ctx.beginPath();
      const rad = Math.min(borderRadius, r.w / 2, r.h / 2);
      ctx.roundRect(r.x, r.y, r.w, r.h, rad);
      ctx.clip();

      // Object fit cover calculation
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const cellRatio = r.w / r.h;

      let drawW = r.w;
      let drawH = r.h;
      let drawX = r.x;
      let drawY = r.y;

      if (imgRatio > cellRatio) {
        drawW = r.h * imgRatio;
        drawX = r.x - (drawW - r.w) / 2;
      } else {
        drawH = r.w / imgRatio;
        drawY = r.y - (drawH - r.h) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      ctx.restore();
    });
  }, [photos, aspectRatio, layoutIndex, gap, padding, borderRadius, bgColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const ext = exportFormat === 'image/png' ? 'png' : 'jpg';
        downloadBlob(blob, `photo-collage-${aspectRatio.replace(':', 'x')}.${ext}`);
      },
      exportFormat,
      0.95
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {photos.length === 0 ? (
        <DropZone
          multiple={true}
          onFilesSelect={handleFilesAdd}
          title="Drop 2 to 9 photos to make a collage"
          subtitle="Combine photos into aesthetic grids with custom borders, rounded corners, and ratios."
          buttonText="Select Photos"
        />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Collage Preview Canvas */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm min-h-[420px]">
            <div className="w-full max-w-xl aspect-square flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/60 p-2 shadow-inner">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              {photos.length} photos &bull; High resolution export canvas
            </p>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-brand-600" />
                <span>Collage Settings</span>
              </h3>

              {/* Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['1:1', '4:5', '16:9', '9:16'] as AspectRatio[]).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setAspectRatio(ratio)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        aspectRatio === ratio
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Variation Toggle */}
              {photos.length >= 2 && (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Layout Variation
                  </span>
                  <button
                    onClick={() => setLayoutIndex((prev) => prev + 1)}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    Switch Layout &rarr;
                  </button>
                </div>
              )}

              {/* Spacing & Gap Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Photo Spacing</span>
                  <span className="font-mono text-brand-600">{gap}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={gap}
                  onChange={(e) => setGap(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Border Radius Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Rounded Corners</span>
                  <span className="font-mono text-brand-600">{borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Outer Padding Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Outer Margin</span>
                  <span className="font-mono text-brand-600">{padding}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={padding}
                  onChange={(e) => setPadding(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Background Color */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  {[
                    '#ffffff',
                    '#0f172a',
                    '#334155',
                    '#fef3c7',
                    '#fce7f3',
                    '#e0f2fe',
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBgColor(c)}
                      className={`h-7 w-7 rounded-full border-2 transition-transform ${
                        bgColor === c ? 'scale-110 border-brand-600 shadow-sm' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-7 w-7 rounded cursor-pointer border-0 p-0"
                    title="Pick custom color"
                  />
                </div>
              </div>

              {/* Export Format */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Export Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setExportFormat('image/png')}
                    className={`py-1.5 rounded-lg text-xs font-bold ${
                      exportFormat === 'image/png'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    PNG (Crisp)
                  </button>
                  <button
                    onClick={() => setExportFormat('image/jpeg')}
                    className={`py-1.5 rounded-lg text-xs font-bold ${
                      exportFormat === 'image/jpeg'
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    JPG (Compact)
                  </button>
                </div>
              </div>

              {/* Download Action */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Photo Collage</span>
              </button>
            </div>

            {/* Photos Queue & Management */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Photos ({photos.length})
                </span>
                <label className="cursor-pointer text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add More</span>
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

              <div className="grid grid-cols-4 gap-2">
                {photos.map((p, idx) => (
                  <div key={p.id} className="relative group rounded-lg overflow-hidden aspect-square border border-slate-200">
                    <img src={p.previewUrl} alt={`Photo ${idx + 1}`} className="h-full w-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(p.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
