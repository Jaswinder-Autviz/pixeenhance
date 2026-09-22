'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Repeat,
  ArrowRight,
  FileImage,
  Layers,
  Minimize2,
  Sparkles,
  Play,
  Download,
} from 'lucide-react';
import { PdfToImageView } from './PdfToImageView';

export function PdfConverterHubView() {
  const [activeTab, setActiveTab] = useState<'to-jpg' | 'to-png' | 'to-gif'>('to-jpg');

  const pdfTools = [
    {
      title: 'PDF to JPG',
      desc: 'Convert PDF pages into high-resolution JPG images',
      slug: '/pdf-to-jpg',
      icon: FileImage,
      badge: 'Popular',
    },
    {
      title: 'PDF to PNG',
      desc: 'Extract PDF pages as lossless transparent PNGs',
      slug: '/pdf-to-png',
      icon: FileImage,
    },
    {
      title: 'Image to PDF',
      desc: 'Combine multiple JPG, PNG, and WebP photos into a PDF',
      slug: '/image-to-pdf',
      icon: Layers,
      badge: 'Multi-Select',
    },
    {
      title: 'JPG to PDF',
      desc: 'Convert single or batch JPG photos into a clean PDF',
      slug: '/jpg-to-pdf',
      icon: FileText,
    },
    {
      title: 'PNG to PDF',
      desc: 'Convert PNG graphics and screenshots to a multi-page PDF',
      slug: '/png-to-pdf',
      icon: FileText,
    },
    {
      title: 'Compress PDF',
      desc: 'Reduce PDF file size up to 75% in your browser',
      slug: '/compress-pdf',
      icon: Minimize2,
    },
    {
      title: 'PDF to GIF',
      desc: 'Create animated GIF presentation slideshows from PDF pages',
      slug: '/pdf-to-gif',
      icon: Play,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Interactive In-Place PDF Converter Engine */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('to-jpg')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'to-jpg'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            PDF to JPG
          </button>
          <button
            onClick={() => setActiveTab('to-png')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'to-png'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            PDF to PNG
          </button>
          <button
            onClick={() => setActiveTab('to-gif')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'to-gif'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            PDF to GIF
          </button>
        </div>

        {activeTab === 'to-jpg' && <PdfToImageView targetFormat="jpg" />}
        {activeTab === 'to-png' && <PdfToImageView targetFormat="png" />}
        {activeTab === 'to-gif' && <PdfToImageView targetFormat="gif" />}
      </div>

      {/* PDF Tool Directory Hub Grid */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            All PDF Conversion &amp; Compression Tools
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Fast, secure, and completely private PDF utilities. 100% free.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pdfTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-brand-500 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-brand-600 dark:text-brand-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
