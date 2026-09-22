'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  Sparkles,
  Archive,
  Layers,
  Image as ImageIcon,
  Play,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { downloadBlob, formatFileSize } from '@/src/lib/imageUtils';
import { createZipArchive, downloadFileBlob } from '@/src/lib/zipUtils';
import { createAnimatedGif } from '@/src/lib/gifEncoder';

interface PdfPageData {
  pageNumber: number;
  canvas: HTMLCanvasElement;
  dataUrl: string;
  width: number;
  height: number;
}

interface PdfToImageViewProps {
  targetFormat: 'jpg' | 'png' | 'gif';
}

export function PdfToImageView({ targetFormat }: PdfToImageViewProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<string>('');
  const [scale, setScale] = useState<number>(2.0); // 2x gives crisp 150-200 DPI
  const [gifDelaySec, setGifDelaySec] = useState<number>(1.2);
  const [isCompilingGif, setIsCompilingGif] = useState<boolean>(false);

  const loadPdfJs = async (): Promise<any> => {
    if (typeof window === 'undefined') return null;
    if ((window as any).pdfjsLib) return (window as any).pdfjsLib;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (lib) {
          lib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(lib);
        } else {
          reject(new Error('pdfjsLib not found on window'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js script'));
      document.head.appendChild(script);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('Please upload a valid PDF document.');
      return;
    }

    setPdfFile(file);
    setIsLoading(true);
    setLoadingProgress('Loading PDF engine...');

    try {
      const pdfjs = await loadPdfJs();
      setLoadingProgress('Reading document data...');

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      const renderedPages: PdfPageData[] = [];

      for (let i = 1; i <= numPages; i++) {
        setLoadingProgress(`Rendering page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // White background for transparent PDF elements
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          renderedPages.push({
            pageNumber: i,
            canvas,
            dataUrl: canvas.toDataURL('image/jpeg', 0.85),
            width: Math.round(viewport.width),
            height: Math.round(viewport.height),
          });
        }
      }

      setPages(renderedPages);
    } catch (err) {
      console.error('PDF parsing error:', err);
      alert('Failed to parse PDF pages. Please ensure the file is not password-protected.');
    } finally {
      setIsLoading(false);
      setLoadingProgress('');
    }
  };

  const handleDownloadPage = (page: PdfPageData) => {
    const ext = targetFormat === 'png' ? 'png' : 'jpg';
    const mime = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
    const baseName = pdfFile ? pdfFile.name.replace(/\.pdf$/i, '') : 'document';

    page.canvas.toBlob(
      (blob) => {
        if (blob) downloadBlob(blob, `${baseName}_page_${page.pageNumber}.${ext}`);
      },
      mime,
      0.95
    );
  };

  const handleDownloadAllZip = async () => {
    if (pages.length === 0 || !pdfFile) return;
    const ext = targetFormat === 'png' ? 'png' : 'jpg';
    const mime = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
    const baseName = pdfFile.name.replace(/\.pdf$/i, '');

    const filesToZip = await Promise.all(
      pages.map(
        (p) =>
          new Promise<{ name: string; data: Uint8Array }>((resolve) => {
            p.canvas.toBlob(
              async (blob) => {
                const buffer = await blob!.arrayBuffer();
                resolve({
                  name: `${baseName}_page_${p.pageNumber}.${ext}`,
                  data: new Uint8Array(buffer),
                });
              },
              mime,
              0.95
            );
          })
      )
    );

    const zipBlob = createZipArchive(filesToZip);
    downloadFileBlob(zipBlob, `${baseName}_${ext}_pages.zip`);
  };

  const handleDownloadGif = async () => {
    if (pages.length === 0 || !pdfFile) return;
    setIsCompilingGif(true);
    try {
      // Scale down frames to reasonable GIF resolution (e.g. max 800px)
      const gifFrames = pages.map((p) => {
        const maxDim = 720;
        const scale = Math.min(1, maxDim / Math.max(p.width, p.height));
        const c = document.createElement('canvas');
        c.width = Math.round(p.width * scale);
        c.height = Math.round(p.height * scale);
        const ctx = c.getContext('2d');
        if (ctx) {
          ctx.drawImage(p.canvas, 0, 0, c.width, c.height);
        }
        return {
          canvas: c,
          delayMs: Math.round(gifDelaySec * 1000),
        };
      });

      const gifBlob = createAnimatedGif(gifFrames);
      const baseName = pdfFile.name.replace(/\.pdf$/i, '');
      downloadBlob(gifBlob, `${baseName}_animated.gif`);
    } catch (err) {
      console.error('GIF generation error:', err);
      alert('Could not compile animated GIF.');
    } finally {
      setIsCompilingGif(false);
    }
  };

  const handleReset = () => {
    setPdfFile(null);
    setPages([]);
  };

  const toolTitle =
    targetFormat === 'jpg'
      ? 'PDF to JPG Converter'
      : targetFormat === 'png'
      ? 'PDF to PNG Converter'
      : 'PDF to GIF Animator';

  const toolSubtitle =
    targetFormat === 'jpg'
      ? 'Extract every page from your PDF into a high-quality JPG image'
      : targetFormat === 'png'
      ? 'Extract PDF pages as crisp, lossless PNG photos'
      : 'Convert PDF document pages into an animated GIF slideshow presentation';

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      {!pdfFile ? (
        <DropZone
          accept="application/pdf,.pdf"
          onFileSelect={handleFileSelect}
          title={`Drop PDF here to convert to ${targetFormat.toUpperCase()}`}
          subtitle={toolSubtitle}
          buttonText="Select PDF Document"
        />
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {pdfFile.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatFileSize(pdfFile.size)} &bull; {pages.length} pages ready
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {targetFormat === 'gif' ? (
                  <button
                    onClick={handleDownloadGif}
                    disabled={isCompilingGif || pages.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
                  >
                    {isCompilingGif ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Compiling GIF...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Download Animated GIF</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleDownloadAllZip}
                    disabled={pages.length === 0}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
                  >
                    <Archive className="h-4 w-4" />
                    <span>Download All Pages ({targetFormat.toUpperCase()} ZIP)</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Upload another PDF"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Extra Controls */}
            {targetFormat === 'gif' && (
              <div className="pt-4 flex items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Frame Delay:</span>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={gifDelaySec}
                  onChange={(e) => setGifDelaySec(Number(e.target.value))}
                  className="w-48 accent-brand-600"
                />
                <span className="font-mono text-brand-600">{gifDelaySec.toFixed(1)}s per slide</span>
              </div>
            )}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="py-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <span className="inline-block h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{loadingProgress}</p>
            </div>
          )}

          {/* Pages Grid */}
          {!isLoading && pages.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Rendered Document Pages ({pages.length})</span>
                <span className="text-slate-400 font-normal">Click download on any page</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pages.map((p) => (
                  <div
                    key={p.pageNumber}
                    className="group flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:border-brand-500 transition-all"
                  >
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/50 mb-3 flex items-center justify-center">
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        className="max-h-full max-w-full object-contain shadow"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          Page {p.pageNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-mono">
                          {p.width} × {p.height} px
                        </span>
                      </div>

                      <button
                        onClick={() => handleDownloadPage(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-brand-600 dark:hover:bg-brand-600 text-slate-700 dark:text-slate-200 hover:text-white dark:hover:text-white text-xs font-bold transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>{targetFormat.toUpperCase()}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
