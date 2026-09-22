'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Eye,
  Sliders,
  FileCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { formatFileSize } from '@/src/lib/imageUtils';
import { zipSync } from 'fflate';

interface ExtractedPage {
  pageNumber: number;
  text: string;
  paragraphs: string[];
}

export function PdfToWordView() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pages, setPages] = useState<ExtractedPage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<string>('');
  const [activePageIdx, setActivePageIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<'Calibri' | 'Arial' | 'Times New Roman'>('Calibri');
  const [isGeneratingDocx, setIsGeneratingDocx] = useState<boolean>(false);

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

  const handlePdfSelected = async (file: File) => {
    setPdfFile(file);
    setIsLoading(true);
    setLoadingProgress('Initializing PDF engine...');

    try {
      const pdfjsLib = await loadPdfJs();
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const extracted: ExtractedPage[] = [];

      for (let i = 1; i <= numPages; i++) {
        setLoadingProgress(`Extracting text from page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        // Group text items by vertical position to reconstruct lines and paragraphs
        const items = textContent.items as Array<{ str: string; transform: number[] }>;

        const lineMap = new Map<number, string[]>();

        items.forEach((item) => {
          if (!item.str || item.str.trim() === '') return;
          // transform[5] is the Y-coordinate in PDF space
          const y = Math.round(item.transform[5] / 4) * 4;
          if (!lineMap.has(y)) {
            lineMap.set(y, []);
          }
          lineMap.get(y)!.push(item.str);
        });

        // Sort descending because PDF Y coordinates go bottom-to-top
        const sortedY = Array.from(lineMap.keys()).sort((a, b) => b - a);
        const reconstructedLines = sortedY.map((y) => lineMap.get(y)!.join(' ').trim());

        // Group consecutive lines into paragraphs
        const paragraphs: string[] = [];
        let currentPara: string[] = [];

        reconstructedLines.forEach((line) => {
          if (line.length === 0) {
            if (currentPara.length > 0) {
              paragraphs.push(currentPara.join(' '));
              currentPara = [];
            }
          } else {
            currentPara.push(line);
          }
        });
        if (currentPara.length > 0) {
          paragraphs.push(currentPara.join(' '));
        }

        const fullPageText = paragraphs.join('\n\n');

        extracted.push({
          pageNumber: i,
          text: fullPageText || '(No selectable text found on this page)',
          paragraphs: paragraphs.length > 0 ? paragraphs : ['(No selectable text found on this page)'],
        });
      }

      setPages(extracted);
      setActivePageIdx(0);
    } catch (err: any) {
      alert(`Could not extract PDF text: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setLoadingProgress('');
    }
  };

  const escapeXml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const handleDownloadDocx = () => {
    if (pages.length === 0 || !pdfFile) return;
    setIsGeneratingDocx(true);

    try {
      const encoder = new TextEncoder();

      // 1. [Content_Types].xml
      const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

      // 2. _rels/.rels
      const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

      // 3. word/document.xml
      let bodyXml = '';

      pages.forEach((page, pIdx) => {
        page.paragraphs.forEach((p) => {
          const safeText = escapeXml(p);
          bodyXml += `<w:p>
            <w:r>
              <w:rPr>
                <w:rFonts w:ascii="${fontFamily}" w:hAnsi="${fontFamily}"/>
                <w:sz w:val="24"/>
              </w:rPr>
              <w:t xml:space="preserve">${safeText}</w:t>
            </w:r>
          </w:p>`;
        });

        // Insert Page Break between pages (except after the last page)
        if (pIdx < pages.length - 1) {
          bodyXml += `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
        }
      });

      const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
    </w:sectPr>
  </w:body>
</w:document>`;

      // Build zip package using fflate
      const zipped = zipSync({
        '[Content_Types].xml': encoder.encode(contentTypesXml),
        '_rels/.rels': encoder.encode(rootRelsXml),
        'word/document.xml': encoder.encode(documentXml),
      });

      const docxBlob = new Blob([zipped as unknown as BlobPart], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });

      const fileName = pdfFile.name.replace(/\.[^/.]+$/, '') + '.docx';
      const url = URL.createObjectURL(docxBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (err: any) {
      alert(`Error creating Word document: ${err.message}`);
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  const handleCopyText = () => {
    if (pages.length === 0) return;
    const fullText = pages
      .map((p) => `--- Page ${p.pageNumber} ---\n\n${p.text}`)
      .join('\n\n\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPdfFile(null);
    setPages([]);
    setActivePageIdx(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Tool Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Genuine .DOCX OpenXML Format &bull; 100% Free</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          PDF to Word Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Convert PDF documents into fully editable Microsoft Word (.docx) documents with clean formatting and total privacy.
        </p>
      </div>

      {!pdfFile ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <DropZone
            onFileSelect={handlePdfSelected}
            accept="application/pdf,.pdf"
            title="Drop your PDF document here"
            subtitle="Fast extraction of text, headings, and paragraph structure into editable Word format."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {pdfFile.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>{formatFileSize(pdfFile.size)}</span>
                  <span>&bull;</span>
                  <span>{pages.length} Pages</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Copy all text to clipboard"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload New</span>
              </button>

              <button
                onClick={handleDownloadDocx}
                disabled={isLoading || isGeneratingDocx}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-600/20 transition-all disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>{isGeneratingDocx ? 'Generating DOCX...' : 'Download Word (.docx)'}</span>
              </button>
            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-rose-500 border-t-transparent rounded-full mb-3" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {loadingProgress}
              </p>
            </div>
          )}

          {/* Extracted Document Preview */}
          {!isLoading && pages.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar: Pages Tab */}
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pages ({pages.length})
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Select Page</span>
                </div>

                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                  {pages.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePageIdx(idx)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        activePageIdx === idx
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>Page {p.pageNumber}</span>
                      <span className="text-[10px] font-mono opacity-70">
                        {p.paragraphs.length} paras
                      </span>
                    </button>
                  ))}
                </div>

                {/* Font Choice */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                    Word Font Style:
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value as any)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  >
                    <option value="Calibri">Calibri (Modern Office)</option>
                    <option value="Arial">Arial (Clean Sans)</option>
                    <option value="Times New Roman">Times New Roman (Classic Serif)</option>
                  </select>
                </div>
              </div>

              {/* Right: Live Word Page Preview */}
              <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Live Document Preview — Page {pages[activePageIdx].pageNumber} of {pages.length}
                  </span>
                  <span className="font-mono text-[11px]">Formatted as Word paragraphs</span>
                </div>

                <div className="bg-slate-50/70 dark:bg-slate-950/60 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800/80 min-h-[360px] font-sans leading-relaxed text-sm text-slate-800 dark:text-slate-200 space-y-4 whitespace-pre-wrap selection:bg-rose-500 selection:text-white">
                  {pages[activePageIdx].paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
