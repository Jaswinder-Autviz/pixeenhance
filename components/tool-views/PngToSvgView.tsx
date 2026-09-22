'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Code,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Sparkles,
  Layers,
  ZoomIn,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { downloadBlob } from '@/src/lib/imageUtils';

type VectorMode = 'silhouette' | 'color-palette' | 'detailed';

interface PngToSvgViewProps {
  initialMode?: 'raster-to-svg' | 'svg-to-raster';
}

export function PngToSvgView({ initialMode = 'raster-to-svg' }: PngToSvgViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [vectorMode, setVectorMode] = useState<VectorMode>('color-palette');
  const [threshold, setThreshold] = useState<number>(128);
  const [colorCount, setColorCount] = useState<number>(6);
  const [invert, setInvert] = useState<boolean>(false);
  const [svgOutput, setSvgOutput] = useState<string>('');
  const [isTracing, setIsTracing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // SVG to Raster state
  const [isSvgInput, setIsSvgInput] = useState<boolean>(false);
  const [rasterScale, setRasterScale] = useState<number>(2);
  const [rasterFormat, setRasterFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const isSvg = selectedFile.type.includes('svg') || selectedFile.name.toLowerCase().endsWith('.svg');
    setIsSvgInput(isSvg);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    if (isSvg) {
      // Read SVG text directly
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setSvgOutput(text);
      };
      reader.readAsText(selectedFile);
    } else {
      traceRasterToSvg(url, vectorMode, threshold, colorCount, invert);
    }
  };

  const traceRasterToSvg = (
    url: string,
    mode: VectorMode,
    thresh: number,
    colors: number,
    inv: boolean
  ) => {
    setIsTracing(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Limit processing resolution to 600px for speed & crisp paths
      const maxDim = 600;
      const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsTracing(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      if (mode === 'silhouette') {
        // High-precision black and white path tracing
        const paths: string[] = [];
        for (let y = 0; y < h; y += 2) {
          let spanStart = -1;
          for (let x = 0; x < w; x += 2) {
            const idx = (y * w + x) * 4;
            const a = data[idx + 3];
            const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            const isDark = a > 100 && (inv ? lum >= thresh : lum < thresh);

            if (isDark && spanStart === -1) {
              spanStart = x;
            } else if (!isDark && spanStart !== -1) {
              paths.push(`M${spanStart},${y}h${x - spanStart}v2h-${x - spanStart}z`);
              spanStart = -1;
            }
          }
          if (spanStart !== -1) {
            paths.push(`M${spanStart},${y}h${w - spanStart}v2h-${w - spanStart}z`);
          }
        }

        const colorFill = inv ? '#FFFFFF' : '#1E293B';
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
  <path d="${paths.join('')}" fill="${colorFill}" />
</svg>`;
        setSvgOutput(svg);
      } else {
        // Multi-color quantized SVG vector layers
        const palette = quantizeColors(data, colors);
        const layers: { color: string; paths: string[] }[] = palette.map((col) => ({
          color: col,
          paths: [],
        }));

        for (let y = 0; y < h; y += 3) {
          for (let x = 0; x < w; x += 3) {
            const idx = (y * w + x) * 4;
            const a = data[idx + 3];
            if (a < 50) continue;

            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];

            // Find closest palette color index
            let bestIdx = 0;
            let bestDist = Infinity;
            palette.forEach((hex, pIdx) => {
              const num = parseInt(hex.slice(1), 16);
              const pr = (num >> 16) & 255;
              const pg = (num >> 8) & 255;
              const pb = num & 255;
              const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = pIdx;
              }
            });

            layers[bestIdx].paths.push(`M${x},${y}h3v3h-3z`);
          }
        }

        const layerElements = layers
          .filter((l) => l.paths.length > 0)
          .map((l) => `  <path d="${l.paths.join('')}" fill="${l.color}" />`)
          .join('\n');

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
${layerElements}
</svg>`;
        setSvgOutput(svg);
      }

      setIsTracing(false);
    };
    img.src = url;
  };

  const quantizeColors = (data: Uint8ClampedArray, k: number): string[] => {
    // Quick sampling of top distinct colors
    const colors: { r: number; g: number; b: number }[] = [];
    const step = Math.max(1, Math.floor(data.length / (k * 100)));
    for (let i = 0; i < data.length; i += step * 4) {
      if (data[i + 3] < 128) continue;
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i + 1] / 32) * 32;
      const b = Math.round(data[i + 2] / 32) * 32;
      if (!colors.some((c) => Math.abs(c.r - r) + Math.abs(c.g - g) + Math.abs(c.b - b) < 60)) {
        colors.push({ r, g, b });
      }
      if (colors.length >= k) break;
    }

    if (colors.length === 0) {
      colors.push({ r: 30, g: 41, b: 59 });
    }

    return colors.map(
      (c) =>
        '#' +
        [c.r, c.g, c.b]
          .map((x) => x.toString(16).padStart(2, '0'))
          .join('')
    );
  };

  const handleCopySvg = () => {
    if (!svgOutput) return;
    navigator.clipboard.writeText(svgOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadSvg = () => {
    if (!svgOutput || !file) return;
    const blob = new Blob([svgOutput], { type: 'image/svg+xml' });
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    downloadBlob(blob, `${nameWithoutExt}_vector.svg`);
  };

  const handleDownloadRasterFromSvg = () => {
    if (!svgOutput || !file) return;
    const img = new Image();
    const svgBlob = new Blob([svgOutput], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement('canvas');
      canvas.width = (img.naturalWidth || 800) * rasterScale;
      canvas.height = (img.naturalHeight || 600) * rasterScale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (rasterFormat === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const ext = rasterFormat === 'image/png' ? 'png' : rasterFormat === 'image/webp' ? 'webp' : 'jpg';
          const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
          downloadBlob(blob, `${nameWithoutExt}_${rasterScale}x.${ext}`);
        },
        rasterFormat,
        0.95
      );
    };
    img.src = url;
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setSvgOutput('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!previewUrl ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop image here to convert or vectorize"
          subtitle="Trace PNG, JPG into resolution-independent SVG, or render SVG into high-res PNG."
          buttonText="Select Image / SVG"
        />
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Vector Preview Canvas */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="w-full max-h-[520px] aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800/80 p-4 flex items-center justify-center border border-slate-200/50 shadow-inner">
              {isTracing ? (
                <div className="flex flex-col items-center gap-3">
                  <span className="h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-semibold text-slate-500">
                    Tracing geometric vector curves...
                  </span>
                </div>
              ) : svgOutput ? (
                <div
                  className="w-full h-full flex items-center justify-center [&>svg]:max-h-full [&>svg]:max-w-full [&>svg]:object-contain"
                  dangerouslySetInnerHTML={{ __html: svgOutput }}
                />
              ) : (
                <span className="text-xs text-slate-400">Processing vector output...</span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 mt-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              <span>Infinite vector scalability &bull; Zero pixelation at any display zoom</span>
            </p>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Code className="h-4 w-4 text-brand-600" />
                <span>{isSvgInput ? 'SVG Raster Settings' : 'Vector Tracing Settings'}</span>
              </h3>

              {!isSvgInput ? (
                <>
                  {/* Tracing Mode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Vector Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setVectorMode('color-palette');
                          if (previewUrl) traceRasterToSvg(previewUrl, 'color-palette', threshold, colorCount, invert);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          vectorMode === 'color-palette'
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        Color Palette
                      </button>
                      <button
                        onClick={() => {
                          setVectorMode('silhouette');
                          if (previewUrl) traceRasterToSvg(previewUrl, 'silhouette', threshold, colorCount, invert);
                        }}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                          vectorMode === 'silhouette'
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        B&amp;W Silhouette
                      </button>
                    </div>
                  </div>

                  {/* Settings based on mode */}
                  {vectorMode === 'silhouette' ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span>Luminance Threshold</span>
                        <span className="font-mono text-brand-600">{threshold}</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="240"
                        value={threshold}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setThreshold(val);
                          if (previewUrl) traceRasterToSvg(previewUrl, vectorMode, val, colorCount, invert);
                        }}
                        className="w-full accent-brand-600"
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span>Color Complexity</span>
                        <span className="font-mono text-brand-600">{colorCount} shades</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="12"
                        value={colorCount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setColorCount(val);
                          if (previewUrl) traceRasterToSvg(previewUrl, vectorMode, threshold, val, invert);
                        }}
                        className="w-full accent-brand-600"
                      />
                    </div>
                  )}

                  {/* Invert */}
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
                    <input
                      type="checkbox"
                      checked={invert}
                      onChange={(e) => {
                        setInvert(e.target.checked);
                        if (previewUrl) traceRasterToSvg(previewUrl, vectorMode, threshold, colorCount, e.target.checked);
                      }}
                      className="rounded accent-brand-600"
                    />
                    <span>Invert Color Tones</span>
                  </label>

                  {/* Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleDownloadSvg}
                      disabled={isTracing || !svgOutput}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download .SVG File</span>
                    </button>

                    <button
                      onClick={handleCopySvg}
                      disabled={isTracing || !svgOutput}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'SVG Code Copied!' : 'Copy Raw SVG Code'}</span>
                    </button>
                  </div>
                </>
              ) : (
                /* SVG to Raster Actions */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Raster Resolution Scale
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 4].map((s) => (
                        <button
                          key={s}
                          onClick={() => setRasterScale(s)}
                          className={`py-2 rounded-xl text-xs font-bold ${
                            rasterScale === s
                              ? 'bg-brand-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {s}× ({s === 1 ? 'Standard' : s === 2 ? 'HD' : '4K UHD'})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Output Format
                    </label>
                    <select
                      value={rasterFormat}
                      onChange={(e) => setRasterFormat(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                    >
                      <option value="image/png">PNG (Crisp Transparent)</option>
                      <option value="image/jpeg">JPG / JPEG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </div>

                  <button
                    onClick={handleDownloadRasterFromSvg}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Scaled Image</span>
                  </button>
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload Another Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
