'use client';

import React, { useState } from 'react';
import {
  Download,
  RotateCcw,
  Copy,
  Check,
  Code2,
  FileCode,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import {
  readFileAsBase64,
  base64ToBlob,
  downloadBlob,
  formatFileSize,
} from '@/src/lib/imageUtils';

interface Base64ViewProps {
  mode: 'image-to-base64' | 'base64-to-image';
}

export function Base64View({ mode }: Base64ViewProps) {
  // Mode 1: Image to Base64
  const [file, setFile] = useState<File | null>(null);
  const [base64String, setBase64String] = useState<string>('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Mode 2: Base64 to Image
  const [inputBase64, setInputBase64] = useState<string>('');
  const [decodedBlob, setDecodedBlob] = useState<Blob | null>(null);
  const [decodedPreviewUrl, setDecodedPreviewUrl] = useState<string | null>(null);
  const [detectedMime, setDetectedMime] = useState<string>('');
  const [decodeError, setDecodeError] = useState<string | null>(null);

  // Handle Image -> Base64
  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    try {
      const dataUri = await readFileAsBase64(selectedFile);
      setBase64String(dataUri);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1500);
  };

  const handleDownloadTxt = () => {
    if (!base64String || !file) return;
    const blob = new Blob([base64String], { type: 'text/plain;charset=utf-8' });
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    downloadBlob(blob, `${nameWithoutExt}-base64.txt`);
  };

  const handleResetEncode = () => {
    setFile(null);
    setBase64String('');
  };

  // Handle Base64 -> Image
  const handleDecodeInput = (val: string) => {
    setInputBase64(val);
    setDecodeError(null);

    if (!val.trim()) {
      setDecodedBlob(null);
      if (decodedPreviewUrl) URL.revokeObjectURL(decodedPreviewUrl);
      setDecodedPreviewUrl(null);
      return;
    }

    try {
      const { blob, mimeType } = base64ToBlob(val);
      setDecodedBlob(blob);
      setDetectedMime(mimeType);
      if (decodedPreviewUrl) URL.revokeObjectURL(decodedPreviewUrl);
      setDecodedPreviewUrl(URL.createObjectURL(blob));
    } catch (err: any) {
      setDecodeError('Invalid Base64 string. Please check the format.');
      setDecodedBlob(null);
    }
  };

  const handleDownloadDecodedImage = () => {
    if (!decodedBlob) return;
    const ext = detectedMime.includes('jpeg')
      ? 'jpg'
      : detectedMime.includes('webp')
      ? 'webp'
      : detectedMime.includes('svg')
      ? 'svg'
      : 'png';
    downloadBlob(decodedBlob, `decoded-image.${ext}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {mode === 'image-to-base64' ? (
        // Mode 1: Image to Base64
        !file ? (
          <DropZone
            onFileSelect={handleFileSelect}
            title="Drop image here to convert to Base64"
            subtitle="Supports JPG, PNG, WebP, SVG, and GIF"
          />
        ) : (
          <div className="space-y-6">
            {/* Header / Stats */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Base64 Encoded Image Data
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      File: {file.name} ({formatFileSize(file.size)}) &bull; Base64 size:{' '}
                      {formatFileSize(base64String.length)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleResetEncode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-center"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Choose Another Image</span>
                </button>
              </div>

              {/* One Click Copy Snippets */}
              <div className="pt-5 space-y-4">
                {/* 1. Raw Data URI */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>1. Data URI (Ready for src attribute)</span>
                    <button
                      onClick={() => handleCopy(base64String, 'uri')}
                      className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-bold text-xs"
                    >
                      {copiedType === 'uri' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Data URI</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300 break-all max-h-24 overflow-y-auto">
                    {base64String.slice(0, 300)}...
                  </div>
                </div>

                {/* 2. HTML <img> tag */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>2. HTML &lt;img&gt; Tag</span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `<img src="${base64String}" alt="${file.name}" />`,
                          'html'
                        )
                      }
                      className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-bold text-xs"
                    >
                      {copiedType === 'html' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy HTML Tag</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300 break-all max-h-16 overflow-y-auto">
                    {`<img src="${base64String.slice(0, 100)}..." alt="${file.name}" />`}
                  </div>
                </div>

                {/* 3. CSS Background snippet */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>3. CSS background-image</span>
                    <button
                      onClick={() =>
                        handleCopy(`background-image: url("${base64String}");`, 'css')
                      }
                      className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-bold text-xs"
                    >
                      {copiedType === 'css' ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy CSS Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-600 dark:text-slate-300 break-all max-h-16 overflow-y-auto">
                    {`background-image: url("${base64String.slice(0, 100)}...");`}
                  </div>
                </div>
              </div>

              {/* Download text file button */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-sm transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Base64 (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        )
      ) : (
        // Mode 2: Base64 to Image
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                <FileCode className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Paste Base64 Encoded String
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Accepts Data URIs (data:image/png;base64,...) or raw base64 string
                </p>
              </div>
            </div>

            <textarea
              rows={6}
              value={inputBase64}
              onChange={(e) => handleDecodeInput(e.target.value)}
              placeholder="Paste your Base64 string or Data URI here..."
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />

            {decodeError && (
              <div className="mt-3 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-medium">
                <AlertCircle className="h-4 w-4" />
                <span>{decodeError}</span>
              </div>
            )}
          </div>

          {/* Decoded Output Preview */}
          {decodedPreviewUrl && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Decoded Image Preview
                  </h4>
                  <p className="text-xs text-slate-500">
                    Detected MIME: {detectedMime} &bull; Size:{' '}
                    {decodedBlob ? formatFileSize(decodedBlob.size) : ''}
                  </p>
                </div>

                <button
                  onClick={handleDownloadDecodedImage}
                  className="flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Image</span>
                </button>
              </div>

              <div className="w-full min-h-[300px] max-h-[480px] rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
                <img
                  src={decodedPreviewUrl}
                  alt="Decoded result"
                  className="max-h-[440px] max-w-full object-contain rounded shadow-sm"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
