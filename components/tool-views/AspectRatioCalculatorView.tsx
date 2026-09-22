'use client';

import React, { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, UploadCloud, RefreshCw } from 'lucide-react';
import { calculateAspectRatio, loadImage } from '@/src/lib/imageUtils';

export function AspectRatioCalculatorView() {
  const [w1, setW1] = useState<number>(1920);
  const [h1, setH1] = useState<number>(1080);

  // Missing dimension solver
  const [w2, setW2] = useState<number>(1280);
  const [h2, setH2] = useState<number>(720);
  const [lastEdited, setLastEdited] = useState<'w' | 'h'>('w');

  const aspect = calculateAspectRatio(w1, h1);

  const handleW1Change = (val: number) => {
    setW1(val);
    if (val > 0 && h1 > 0) {
      const ratio = h1 / val;
      if (lastEdited === 'w') {
        setH2(Math.round(w2 * ratio));
      }
    }
  };

  const handleH1Change = (val: number) => {
    setH1(val);
    if (w1 > 0 && val > 0) {
      const ratio = val / w1;
      if (lastEdited === 'w') {
        setH2(Math.round(w2 * ratio));
      }
    }
  };

  const handleW2Change = (val: number) => {
    setW2(val);
    setLastEdited('w');
    if (w1 > 0 && h1 > 0) {
      setH2(Math.round((val * h1) / w1));
    }
  };

  const handleH2Change = (val: number) => {
    setH2(val);
    setLastEdited('h');
    if (w1 > 0 && h1 > 0) {
      setW2(Math.round((val * w1) / h1));
    }
  };

  const applyPreset = (width: number, height: number) => {
    setW1(width);
    setH1(height);
    setH2(Math.round((w2 * height) / width));
  };

  // Allow dropping an image to automatically read dimensions
  const handleImageDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const img = await loadImage(e.target.files[0]);
        setW1(img.naturalWidth);
        setH1(img.naturalHeight);
        setH2(Math.round((w2 * img.naturalHeight) / img.naturalWidth));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const presets = [
    { label: '16:9 Widescreen (FHD)', w: 1920, h: 1080, ratio: '16:9' },
    { label: '16:9 4K UHD', w: 3840, h: 2160, ratio: '16:9' },
    { label: '4:3 Standard TV / Tablet', w: 1024, h: 768, ratio: '4:3' },
    { label: '1:1 Square (Instagram)', w: 1080, h: 1080, ratio: '1:1' },
    { label: '9:16 Reel / Story / TikTok', w: 1080, h: 1920, ratio: '9:16' },
    { label: '4:5 Instagram Portrait', w: 1080, h: 1350, ratio: '4:5' },
    { label: '21:9 Ultrawide Cinema', w: 2560, h: 1080, ratio: '21:9' },
    { label: '3:2 Classic 35mm Photo', w: 1500, h: 1000, ratio: '3:2' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* 1. Ratio Finder from Dimensions */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Calculate Ratio from Dimensions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your image or screen resolution to compute the exact ratio
              </p>
            </div>
          </div>

          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors">
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Load Image File</span>
            <input type="file" accept="image/*" onChange={handleImageDrop} className="hidden" />
          </label>
        </div>

        <div className="pt-6 grid sm:grid-cols-3 gap-6 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Width (Pixels)
            </label>
            <input
              type="number"
              min="1"
              value={w1}
              onChange={(e) => handleW1Change(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Height (Pixels)
            </label>
            <input
              type="number"
              min="1"
              value={h1}
              onChange={(e) => handleH1Change(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
            />
          </div>

          <div className="rounded-xl border border-brand-200 dark:border-brand-900/40 bg-brand-50/50 dark:bg-brand-950/20 p-4 text-center">
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider">
              Calculated Ratio
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {aspect.simplified}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              ({aspect.decimal}:1 decimal)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Solve Missing Dimension */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          2. Solve Missing Dimension (Scaling)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Maintain the {aspect.simplified} ratio while scaling to a new width or height
        </p>

        <div className="grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              New Width
            </label>
            <input
              type="number"
              min="1"
              value={w2}
              onChange={(e) => handleW2Change(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Calculated Height
            </label>
            <input
              type="number"
              min="1"
              value={h2}
              onChange={(e) => handleH2Change(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-300 dark:border-brand-700 bg-brand-50/30 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 font-mono font-bold text-lg"
            />
          </div>
        </div>
      </div>

      {/* 3. Industry Standards & Presets Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Common Aspect Ratio Presets
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset.w, preset.h)}
              className="flex flex-col text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 hover:bg-brand-50/40 dark:hover:bg-slate-800 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>{preset.ratio}</span>
                <span className="text-[10px] text-brand-600 font-semibold">Apply &rarr;</span>
              </div>
              <span className="text-xs text-slate-500 mt-1">{preset.label}</span>
              <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                {preset.w} × {preset.h} px
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
