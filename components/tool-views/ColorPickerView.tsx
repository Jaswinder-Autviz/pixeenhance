'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pipette,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Palette,
  Eye,
  Sliders,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';

interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  r: number;
  g: number;
  b: number;
}

function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function ColorPickerView() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorInfo>({
    hex: '#3B82F6',
    rgb: 'rgb(59, 130, 246)',
    hsl: 'hsl(217, 91%, 60%)',
    r: 59,
    g: 130,
    b: 246,
  });
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // Extract dominant palette
      extractPalette(ctx, img.naturalWidth, img.naturalHeight);
    };
    img.src = url;
  };

  const extractPalette = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const step = Math.max(1, Math.floor(Math.sqrt((width * height) / 3000)));
      const imgData = ctx.getImageData(0, 0, width, height).data;
      const colorCounts: Record<string, { r: number; g: number; b: number; count: number }> = {};

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          const a = imgData[idx + 3];
          if (a < 128) continue; // skip transparent

          // Quantize color (round to nearest 24 to group similar shades)
          const qr = Math.round(imgData[idx] / 24) * 24;
          const qg = Math.round(imgData[idx + 1] / 24) * 24;
          const qb = Math.round(imgData[idx + 2] / 24) * 24;
          const key = `${qr},${qg},${qb}`;

          if (!colorCounts[key]) {
            colorCounts[key] = {
              r: imgData[idx],
              g: imgData[idx + 1],
              b: imgData[idx + 2],
              count: 1,
            };
          } else {
            colorCounts[key].count++;
          }
        }
      }

      const sorted = Object.values(colorCounts)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .map((c) => rgbToHex(c.r, c.g, c.b));

      setPalette(sorted);
      if (sorted.length > 0) {
        const hex = sorted[0];
        // Parse hex to r,g,b
        const num = parseInt(hex.slice(1), 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        setSelectedColor({
          hex,
          rgb: `rgb(${r}, ${g}, ${b})`,
          hsl: rgbToHsl(r, g, b),
          r,
          g,
          b,
        });
      }
    } catch (e) {
      console.warn('Palette extraction skipped:', e);
    }
  };

  const getCanvasPixelAt = useCallback((clientX: number, clientY: number): ColorInfo | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return null;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;

    const p = ctx.getImageData(x, y, 1, 1).data;
    const r = p[0];
    const g = p[1];
    const b = p[2];
    const hex = rgbToHex(r, g, b);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r, g, b);

    return { hex, rgb, hsl, r, g, b };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    const color = getCanvasPixelAt(e.clientX, e.clientY);
    if (color) {
      setHoverColor(color.hex);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const color = getCanvasPixelAt(e.clientX, e.clientY);
    if (color) {
      setSelectedColor(color);
    }
  };

  const copyToClipboard = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 1800);
  };

  const handlePaletteClick = (hex: string) => {
    const num = parseInt(hex.slice(1), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    setSelectedColor({
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: rgbToHsl(r, g, b),
      r,
      g,
      b,
    });
  };

  const isDarkColor =
    0.299 * selectedColor.r + 0.587 * selectedColor.g + 0.114 * selectedColor.b < 128;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!imageUrl ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image to pick colors & extract palette"
          subtitle="Interactive pixel eyedropper with HEX, RGB, HSL and auto-generated color palette."
          buttonText="Select Image"
        />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Interactive Image Loupe Canvas */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setHoverColor(null);
              }}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
              className="relative cursor-crosshair rounded-xl overflow-hidden max-h-[520px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 select-none shadow-inner"
            >
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[500px] object-contain block"
              />

              {/* Hover Loupe Magnifier */}
              {isHovering && mousePos && hoverColor && (
                <div
                  className="absolute pointer-events-none rounded-full border-2 border-white shadow-xl flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    width: 68,
                    height: 68,
                    backgroundColor: hoverColor,
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full border border-white/90 bg-black/30" />
                </div>
              )}
            </div>

            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
              <Pipette className="h-3.5 w-3.5 text-brand-600" />
              <span>Hover anywhere to magnify pixels &bull; Click to lock &amp; inspect color</span>
            </p>
          </div>

          {/* Color Inspector & Palette Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Color Swatch Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette className="h-4 w-4 text-brand-600" />
                <span>Selected Color</span>
              </h3>

              {/* Big Swatch Banner */}
              <div
                className="w-full h-24 rounded-xl shadow-md border border-slate-200/50 flex flex-col justify-end p-3 transition-colors"
                style={{ backgroundColor: selectedColor.hex }}
              >
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    isDarkColor ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {selectedColor.hex}
                </span>
              </div>

              {/* Color Formats & Copy Buttons */}
              <div className="space-y-2 pt-1">
                {/* HEX */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">HEX</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{selectedColor.hex}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedColor.hex, 'HEX')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                    title="Copy HEX"
                  >
                    {copiedFormat === 'HEX' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* RGB */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">RGB</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{selectedColor.rgb}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedColor.rgb, 'RGB')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                    title="Copy RGB"
                  >
                    {copiedFormat === 'RGB' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* HSL */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">HSL</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{selectedColor.hsl}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(selectedColor.hsl, 'HSL')}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                    title="Copy HSL"
                  >
                    {copiedFormat === 'HSL' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Dominant Palette Extraction */}
            {palette.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Dominant Palette
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {palette.length} colors
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {palette.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handlePaletteClick(c)}
                      className={`h-9 w-full rounded-xl border-2 transition-transform hover:scale-105 ${
                        selectedColor.hex.toLowerCase() === c.toLowerCase()
                          ? 'border-brand-600 scale-105 shadow-sm'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                      title={`Select ${c}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => {
                    const css = palette.map((c, idx) => `--color-${idx + 1}: ${c};`).join('\n');
                    copyToClipboard(css, 'CSS');
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  {copiedFormat === 'CSS' ? 'CSS Variables Copied!' : 'Copy Palette as CSS'}
                </button>
              </div>
            )}

            <button
              onClick={() => {
                if (imageUrl) URL.revokeObjectURL(imageUrl);
                setImageUrl(null);
                setFile(null);
                setPalette([]);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Choose Another Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
