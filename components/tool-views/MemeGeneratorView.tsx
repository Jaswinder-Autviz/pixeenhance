'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Download,
  RotateCcw,
  Type,
  Smile,
  Plus,
  Trash2,
  Sliders,
  Image as ImageIcon,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { downloadBlob } from '@/src/lib/imageUtils';

interface MemeTemplate {
  name: string;
  url: string;
  defaultTop?: string;
  defaultBottom?: string;
}

// Built-in SVG vector template fallbacks for instant offline usage
const TEMPLATES: MemeTemplate[] = [
  {
    name: 'Two Buttons',
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    defaultTop: 'WHEN YOU FIND A BUG',
    defaultBottom: 'FEATURE OR BUG?',
  },
  {
    name: 'Mind Blown',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    defaultTop: 'CLIENT ASKS FOR FAST & FREE',
    defaultBottom: 'AND IT ACTUALLY WORKS',
  },
  {
    name: 'Coding Life',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    defaultTop: 'IT WORKED ON LOCALHOST',
    defaultBottom: 'DEPLOYS TO PRODUCTION',
  },
];

export function MemeGeneratorView() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [topText, setTopText] = useState<string>('TOP MEME TEXT');
  const [bottomText, setBottomText] = useState<string>('BOTTOM MEME TEXT');
  const [fontSize, setFontSize] = useState<number>(44);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [allCaps, setAllCaps] = useState<boolean>(true);
  const [fontFamily, setFontFamily] = useState<string>('Impact, Arial Black, sans-serif');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgElementRef = useRef<HTMLImageElement | null>(null);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    loadImage(url);
  };

  const loadImage = (url: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgElementRef.current = img;
      renderMeme();
    };
    img.src = url;
  };

  const selectTemplate = (template: MemeTemplate) => {
    setImageSrc(template.url);
    if (template.defaultTop) setTopText(template.defaultTop);
    if (template.defaultBottom) setBottomText(template.defaultBottom);
    loadImage(template.url);
  };

  const renderMeme = () => {
    const canvas = canvasRef.current;
    const img = imgElementRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size matches image
    canvas.width = img.naturalWidth || 800;
    canvas.height = img.naturalHeight || 600;

    // Draw background image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Text configuration
    const computedFontSize = Math.max(16, Math.round((canvas.width / 800) * fontSize));
    ctx.font = `900 ${computedFontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(2, Math.round((computedFontSize / 12) * (strokeWidth / 4)));
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;

    const top = allCaps ? topText.toUpperCase() : topText;
    const bottom = allCaps ? bottomText.toUpperCase() : bottomText;

    // Draw Top Text
    if (top) {
      ctx.textBaseline = 'top';
      const lines = wrapText(ctx, top, canvas.width - 40);
      lines.forEach((line, index) => {
        const y = 20 + index * (computedFontSize * 1.15);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }

    // Draw Bottom Text
    if (bottom) {
      ctx.textBaseline = 'bottom';
      const lines = wrapText(ctx, bottom, canvas.width - 40);
      lines.reverse().forEach((line, index) => {
        const y = canvas.height - 20 - index * (computedFontSize * 1.15);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }
  };

  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  useEffect(() => {
    if (imgElementRef.current) {
      renderMeme();
    }
  }, [topText, bottomText, fontSize, textColor, strokeColor, strokeWidth, allCaps, fontFamily]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        downloadBlob(blob, 'custom-meme.png');
      },
      'image/png',
      0.95
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!imageSrc ? (
        <div className="space-y-8">
          <DropZone
            onFileSelect={handleFileSelect}
            title="Drop image here to create a meme"
            subtitle="Upload your photo, reaction shot, or screenshot to add meme text."
            buttonText="Upload Custom Image"
          />

          {/* Quick Starter Templates */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-600" />
              <span>Or Start with a Popular Meme Template</span>
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.name}
                  onClick={() => selectTemplate(tmpl)}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-brand-500 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={tmpl.url}
                      alt={tmpl.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="p-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {tmpl.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Canvas Live Preview */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="max-w-full max-h-[540px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-inner p-2">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Full resolution render with crisp vector stroke outlines
            </p>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <Type className="h-4 w-4 text-brand-600" />
                <span>Meme Text &amp; Styles</span>
              </h3>

              {/* Top Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Top Text
                </label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="Enter top caption..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                />
              </div>

              {/* Bottom Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Bottom Text
                </label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="Enter bottom caption..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                />
              </div>

              {/* Font Size */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Font Size</span>
                  <span className="font-mono text-brand-600">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-brand-600"
                />
              </div>

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-500 font-semibold">Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-8 w-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-xs font-mono">{textColor}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] text-slate-500 font-semibold">Stroke Outline</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="h-8 w-10 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-xs font-mono">{strokeColor}</span>
                  </div>
                </div>
              </div>

              {/* All Caps Toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 pt-1">
                <input
                  type="checkbox"
                  checked={allCaps}
                  onChange={(e) => setAllCaps(e.target.checked)}
                  className="rounded accent-brand-600"
                />
                <span>ALL CAPS (Classic Meme Look)</span>
              </label>

              {/* Download Action */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Meme (PNG)</span>
              </button>

              <button
                onClick={() => {
                  setImageSrc(null);
                  imgElementRef.current = null;
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload Another Photo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
