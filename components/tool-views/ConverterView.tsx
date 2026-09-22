'use client';

import React, { useState, useEffect } from 'react';
import { Download, RotateCcw, Repeat, Sparkles, CheckCircle2 } from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { loadImage, convertFormat, downloadBlob, formatFileSize } from '@/src/lib/imageUtils';

interface ConverterViewProps {
  sourceType: 'jpg' | 'png' | 'webp';
  targetType: 'jpg' | 'png' | 'webp';
}

export function ConverterView({ sourceType, targetType }: ConverterViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(85);
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const targetMime: 'image/jpeg' | 'image/png' | 'image/webp' =
    targetType === 'png'
      ? 'image/png'
      : targetType === 'webp'
      ? 'image/webp'
      : 'image/jpeg';

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const img = await loadImage(selectedFile);
      setImgElement(img);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!imgElement) return;

    const runConversion = async () => {
      setIsProcessing(true);
      try {
        const blob = await convertFormat(imgElement, targetMime, quality / 100, bgColor);
        setConvertedBlob(blob);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(URL.createObjectURL(blob));
      } catch (err) {
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    };

    runConversion();
  }, [imgElement, targetMime, quality, bgColor]);

  const handleDownload = () => {
    if (!convertedBlob || !file) return;
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(convertedBlob, `${nameWithoutExt}.${targetType}`);
  };

  const handleReset = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setImgElement(null);
    setConvertedBlob(null);
    setPreviewUrl(null);
  };

  const showBgColorPicker = targetType === 'jpg';
  const showQualitySlider = targetType === 'jpg' || targetType === 'webp';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          onFileSelect={handleFileSelect}
          accept={
            sourceType === 'jpg'
              ? 'image/jpeg,image/jpg'
              : sourceType === 'png'
              ? 'image/png'
              : 'image/webp'
          }
          title={`Drop your ${sourceType.toUpperCase()} image here to convert`}
          subtitle={`Instant local conversion to ${targetType.toUpperCase()}`}
        />
      ) : (
        <div className="space-y-6">
          {/* Conversion Settings Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <Repeat className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Convert {sourceType.toUpperCase()} to {targetType.toUpperCase()}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Original: {file.name} ({formatFileSize(file.size)})
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Ready to Convert</span>
              </span>
            </div>

            <div className="pt-5 grid sm:grid-cols-2 gap-6">
              {/* Background Color Picker for JPG output */}
              {showBgColorPicker && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Background Color (for transparent areas)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-9 w-12 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                    />
                    <div className="flex gap-2">
                      {[
                        { label: 'White', color: '#FFFFFF' },
                        { label: 'Black', color: '#000000' },
                        { label: 'Gray', color: '#F1F5F9' },
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => setBgColor(preset.color)}
                          className={`px-3 py-1 text-xs rounded-lg border font-medium ${
                            bgColor === preset.color
                              ? 'border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    JPG cannot store transparency, so transparent pixels are filled with this color.
                  </p>
                </div>
              )}

              {/* Quality Slider for lossy formats */}
              {showQualitySlider && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{targetType.toUpperCase()} Quality</span>
                    <span className="text-brand-600 font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Lower Size</span>
                    <span>Recommended (85%)</span>
                    <span>Lossless / Max</span>
                  </div>
                </div>
              )}

              {targetType === 'png' && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <Sparkles className="h-4 w-4 text-brand-500 shrink-0" />
                  <span>PNG conversion is 100% lossless and retains the highest pixel fidelity.</span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Original Format</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5 uppercase">
                {sourceType} &bull; {formatFileSize(file.size)}
              </p>
            </div>
            <div className="rounded-xl border border-brand-200 dark:border-brand-900/40 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-brand-600 dark:text-brand-400">Target Format</span>
              <p className="text-base font-bold text-brand-600 dark:text-brand-400 mt-0.5 uppercase">
                {targetType} &bull;{' '}
                {convertedBlob ? formatFileSize(convertedBlob.size) : 'Converting...'}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <span className="text-xs text-slate-400">Dimensions</span>
              <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {imgElement?.naturalWidth} × {imgElement?.naturalHeight} px
              </p>
            </div>
          </div>

          {/* Live Preview */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
              Converted {targetType.toUpperCase()} Preview
            </h4>
            <div className="w-full min-h-[300px] max-h-[500px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`Converted ${targetType}`}
                  className="max-h-[460px] max-w-full object-contain rounded shadow-sm"
                />
              ) : (
                <span className="text-xs text-slate-400">Rendering preview...</span>
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
              <span>Choose Another Image</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!convertedBlob || isProcessing}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-base font-bold shadow-md shadow-brand-500/20 transition-all w-full sm:w-auto justify-center"
            >
              <Download className="h-5 w-5" />
              <span>Download {targetType.toUpperCase()}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
