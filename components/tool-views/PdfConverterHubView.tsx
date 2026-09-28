'use client';

import React, { useState } from 'react';
import { Layers, FileImage } from 'lucide-react';
import { ImageToPdfView } from './ImageToPdfView';
import { PdfToImageView } from './PdfToImageView';
import { AdBanner } from '../common/AdBanner';

export function PdfConverterHubView() {
  const [activeTab, setActiveTab] = useState<'image-to-pdf' | 'pdf-to-jpg'>('image-to-pdf');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Clean Mode Switcher: [ Image to PDF ] [ PDF to JPG ] */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('image-to-pdf')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'image-to-pdf'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Image to PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pdf-to-jpg')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'pdf-to-jpg'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
            }`}
          >
            <FileImage className="h-4 w-4" />
            <span>PDF to JPG</span>
          </button>
        </div>
      </div>

      {/* Active Converter Engine */}
      {activeTab === 'image-to-pdf' ? (
        <ImageToPdfView sourceFormat="all" />
      ) : (
        <div className="space-y-6">
          <AdBanner className="mb-2" />
          <PdfToImageView targetFormat="jpg" />
          <AdBanner className="mt-2" />
        </div>
      )}
    </div>
  );
}

