'use client';

import React, { useState } from 'react';
import {
  Minimize2,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { formatFileSize, downloadBlob } from '@/src/lib/imageUtils';
import { createPdfFromImages, PdfImageItem } from '@/src/lib/pdfUtils';

type CompressionLevel = 'high' | 'medium' | 'low';

export function CompressPdfView() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progressMsg, setProgressMsg] = useState<string>('');
  const [compressedPdfBlob, setCompressedPdfBlob] = useState<Blob | null>(null);

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
          reject(new Error('pdfjsLib not available'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load PDF script'));
      document.head.appendChild(script);
    });
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      alert('Please upload a PDF document.');
      return;
    }
    setFile(selectedFile);
    setCompressedPdfBlob(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    setProgressMsg('Initializing compression engine...');

    try {
      const pdfjs = await loadPdfJs();
      setProgressMsg('Reading PDF streams...');

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;

      // Determine DPI scale and JPEG quality based on level
      let renderScale = 1.4;
      let quality = 0.65;
      if (compressionLevel === 'high') {
        renderScale = 1.0;
        quality = 0.45;
      } else if (compressionLevel === 'low') {
        renderScale = 1.8;
        quality = 0.85;
      }

      const imageItems: PdfImageItem[] = [];

      for (let i = 1; i <= numPages; i++) {
        setProgressMsg(`Optimizing page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: renderScale });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const blob = await new Promise<Blob | null>((res) =>
            canvas.toBlob((b) => res(b), 'image/jpeg', quality)
          );

          if (blob) {
            const pageFile = new File([blob], `page_${i}.jpg`, { type: 'image/jpeg' });
            imageItems.push({
              id: String(i),
              file: pageFile,
              previewUrl: URL.createObjectURL(blob),
              width: Math.round(viewport.width),
              height: Math.round(viewport.height),
            });
          }
        }
      }

      setProgressMsg('Compiling compressed ISO PDF...');
      const optimizedPdfBlob = await createPdfFromImages(imageItems, {
        pageSize: 'fit',
        orientation: 'auto',
        margin: 'none',
        quality: quality,
      });

      setCompressedPdfBlob(optimizedPdfBlob);
    } catch (err) {
      console.error('PDF compression failed:', err);
      alert('Failed to compress PDF.');
    } finally {
      setIsCompressing(false);
      setProgressMsg('');
    }
  };

  const handleDownload = () => {
    if (!compressedPdfBlob || !file) return;
    const baseName = file.name.replace(/\.pdf$/i, '');
    downloadBlob(compressedPdfBlob, `${baseName}_compressed.pdf`);
  };

  const handleReset = () => {
    setFile(null);
    setCompressedPdfBlob(null);
  };

  const savingsPercent =
    file && compressedPdfBlob
      ? Math.max(0, Math.round(((file.size - compressedPdfBlob.size) / file.size) * 100))
      : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6">
      {!file ? (
        <DropZone
          accept="application/pdf,.pdf"
          onFileSelect={handleFileSelect}
          title="Drop PDF here to compress file size"
          subtitle="Reduce PDF file size up to 75% with smart optimization and complete privacy."
          buttonText="Select PDF Document"
        />
      ) : (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Original Size: {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload Another</span>
              </button>
            </div>

            {/* Compression Level Selection */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Compression Level
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'high',
                    label: 'Extreme Compression',
                    desc: 'Smallest file size (~70% reduction)',
                  },
                  {
                    id: 'medium',
                    label: 'Balanced (Recommended)',
                    desc: 'Great balance of quality and size (~50% reduction)',
                  },
                  {
                    id: 'low',
                    label: 'Light Compression',
                    desc: 'High DPI visual clarity (~30% reduction)',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCompressionLevel(item.id as CompressionLevel);
                      setCompressedPdfBlob(null);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      compressionLevel === item.id
                        ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/20 text-brand-900 dark:text-brand-100 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Compressed Stats Preview */}
            {compressedPdfBlob && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                      Compressed to {formatFileSize(compressedPdfBlob.size)}
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                      Reduced by {savingsPercent}% ({formatFileSize(file.size - compressedPdfBlob.size)} saved)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Compressed PDF</span>
                </button>
              </div>
            )}

            {/* Compress Action Button */}
            {!compressedPdfBlob && (
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-sm font-bold shadow-md shadow-brand-500/20 transition-all"
              >
                {isCompressing ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{progressMsg || 'Compressing PDF...'}</span>
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>Compress PDF Document</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
