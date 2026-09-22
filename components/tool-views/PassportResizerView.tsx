'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, UserCheck, Sparkles, Grid, Eye } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

interface PassportPreset {
  id: string;
  name: string;
  widthPx: number;
  heightPx: number;
  description: string;
}

const PASSPORT_PRESETS: PassportPreset[] = [
  {
    id: 'us',
    name: 'United States & India (2 × 2 in)',
    widthPx: 600,
    heightPx: 600,
    description: '600 × 600 px @ 300 DPI (51 × 51 mm)',
  },
  {
    id: 'uk_eu',
    name: 'UK, EU & Schengen (35 × 45 mm)',
    widthPx: 413,
    heightPx: 531,
    description: '413 × 531 px @ 300 DPI',
  },
  {
    id: 'canada',
    name: 'Canada (50 × 70 mm)',
    widthPx: 590,
    heightPx: 826,
    description: '590 × 826 px @ 300 DPI',
  },
  {
    id: 'china',
    name: 'China & Asian Visa (33 × 48 mm)',
    widthPx: 390,
    heightPx: 567,
    description: '390 × 567 px @ 300 DPI',
  },
];

export function PassportResizerView() {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('us');

  // Alignment / framing adjustments
  const [zoom, setZoom] = useState<number>(100);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [showFaceGuide, setShowFaceGuide] = useState<boolean>(true);
  const [exportMode, setExportMode] = useState<'single' | 'sheet4x6'>('single');

  const [singleBlob, setSingleBlob] = useState<Blob | null>(null);
  const [sheetBlob, setSheetBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const currentPreset =
    PASSPORT_PRESETS.find((p) => p.id === selectedPresetId) || PASSPORT_PRESETS[0];

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
      setZoom(100);
      setOffsetY(0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const renderPassport = async () => {
      setIsProcessing(true);
      try {
        // 1. Render single photo
        const singleCanvas = document.createElement('canvas');
        singleCanvas.width = currentPreset.widthPx;
        singleCanvas.height = currentPreset.heightPx;
        const sCtx = singleCanvas.getContext('2d');
        if (!sCtx) return;

        sCtx.fillStyle = '#FFFFFF';
        sCtx.fillRect(0, 0, singleCanvas.width, singleCanvas.height);
        sCtx.imageSmoothingEnabled = true;
        sCtx.imageSmoothingQuality = 'high';

        // Compute scaling to fill passport frame
        const scale = (zoom / 100) * Math.max(
          singleCanvas.width / imgElement.naturalWidth,
          singleCanvas.height / imgElement.naturalHeight
        );

        const drawW = imgElement.naturalWidth * scale;
        const drawH = imgElement.naturalHeight * scale;
        const drawX = (singleCanvas.width - drawW) / 2;
        const drawY = (singleCanvas.height - drawH) / 2 + offsetY;

        sCtx.drawImage(imgElement, drawX, drawY, drawW, drawH);

        singleCanvas.toBlob(
          (blob) => {
            if (blob) {
              setSingleBlob(blob);
              if (exportMode === 'single') {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(blob));
              }
            }
          },
          'image/jpeg',
          0.95
        );

        // 2. Render 4x6 Printable Sheet (1200 x 1800 px @ 300 DPI)
        const sheetCanvas = document.createElement('canvas');
        sheetCanvas.width = 1800;
        sheetCanvas.height = 1200;
        const shCtx = sheetCanvas.getContext('2d');
        if (!shCtx) return;

        shCtx.fillStyle = '#FFFFFF';
        shCtx.fillRect(0, 0, 1800, 1200);

        // Tile 6 photos (2 rows of 3, or 2 rows of 4 depending on aspect)
        const cols = 3;
        const rows = 2;
        const gapX = 60;
        const gapY = 50;
        const startX = (1800 - (cols * currentPreset.widthPx + (cols - 1) * gapX)) / 2;
        const startY = (1200 - (rows * currentPreset.heightPx + (rows - 1) * gapY)) / 2;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const x = startX + c * (currentPreset.widthPx + gapX);
            const y = startY + r * (currentPreset.heightPx + gapY);

            // Draw border line
            shCtx.strokeStyle = '#E2E8F0';
            shCtx.lineWidth = 1;
            shCtx.strokeRect(x - 1, y - 1, currentPreset.widthPx + 2, currentPreset.heightPx + 2);

            shCtx.drawImage(singleCanvas, x, y);
          }
        }

        sheetCanvas.toBlob(
          (blob) => {
            if (blob) {
              setSheetBlob(blob);
              if (exportMode === 'sheet4x6') {
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl(URL.createObjectURL(blob));
              }
            }
            setIsProcessing(false);
          },
          'image/jpeg',
          0.95
        );
      } catch (err) {
        console.error(err);
        setIsProcessing(false);
      }
    };

    renderPassport();
  }, [imgElement, currentPreset, zoom, offsetY, exportMode]);

  const handleDownload = () => {
    const blobToDownload = exportMode === 'single' ? singleBlob : sheetBlob;
    if (!blobToDownload || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const suffix = exportMode === 'single' ? `passport-${selectedPresetId}` : 'passport-4x6-sheet';
    downloadBlob(blobToDownload, `${nameWithoutExt}-${suffix}.jpg`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setSingleBlob(null);
    setSheetBlob(null);
    setPreviewUrl(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          title="Drop portrait photo here for Passport resizing"
          subtitle="Supports official biometric standards and 4x6 printable sheets"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Passport Photo Standards
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Preset: {currentPreset.name} &bull; {currentPreset.description}
                  </p>
                </div>
              </div>

              {/* Export Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setExportMode('single')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    exportMode === 'single'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Single Photo
                </button>
                <button
                  onClick={() => setExportMode('sheet4x6')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    exportMode === 'sheet4x6'
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Printable 4×6 Sheet
                </button>
              </div>
            </div>

            {/* Country Selector */}
            <div className="pt-5 space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Select Country / Requirement
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {PASSPORT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPresetId(preset.id)}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      selectedPresetId === preset.id
                        ? 'border-brand-600 bg-brand-50/70 text-brand-900 dark:bg-brand-950/40 dark:text-brand-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs">{preset.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {preset.widthPx} × {preset.heightPx} px
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Adjustments: Zoom & Vertical Shift */}
            <div className="pt-5 grid sm:grid-cols-3 gap-6 items-center">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Zoom / Crop Scale</span>
                  <span className="text-brand-600 font-bold">{zoom}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="200"
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Vertical Head Position</span>
                  <span className="text-brand-600 font-bold">{offsetY} px</span>
                </div>
                <input
                  type="range"
                  min="-150"
                  max="150"
                  value={offsetY}
                  onChange={(e) => setOffsetY(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-3 sm:pt-0">
                <button
                  onClick={() => setShowFaceGuide(!showFaceGuide)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold w-full justify-center transition-all ${
                    showFaceGuide
                      ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{showFaceGuide ? 'Face Oval Guide: On' : 'Face Oval Guide: Off'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              {exportMode === 'single'
                ? `Single Passport Photo Preview (${currentPreset.widthPx} × ${currentPreset.heightPx} px)`
                : 'Printable 4×6 Inch Sheet Preview (6 Photos)'}
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              {exportMode === 'single'
                ? 'Align head between top and bottom oval boundaries.'
                : 'Ready to print on 4×6 photo paper at home or photo pharmacy kiosks.'}
            </p>

            <div className="relative w-full min-h-[350px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6 overflow-hidden">
              {previewUrl ? (
                <div className="relative shadow-xl border border-slate-300 dark:border-slate-700 bg-white">
                  <img
                    src={previewUrl}
                    alt="Passport Preview"
                    className="max-h-[420px] max-w-full object-contain"
                  />

                  {/* Facial Biometric Oval Guide Overlay */}
                  {showFaceGuide && exportMode === 'single' && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="w-[58%] h-[68%] rounded-[50%] border-2 border-dashed border-red-500/80 shadow-sm flex flex-col justify-between py-2 items-center">
                        <span className="text-[9px] font-mono text-red-600 font-bold bg-white/90 px-1 rounded">
                          Top of Head
                        </span>
                        <div className="w-full border-t border-dotted border-red-400/60" />
                        <span className="text-[9px] font-mono text-red-600 font-bold bg-white/90 px-1 rounded">
                          Chin Line
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-xs text-slate-400">Rendering photo...</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors w-full sm:w-auto justify-center"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Choose Another Photo</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={(!singleBlob && !sheetBlob) || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>
                {exportMode === 'single'
                  ? 'Download Passport Photo'
                  : 'Download Printable 4×6 Sheet'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
