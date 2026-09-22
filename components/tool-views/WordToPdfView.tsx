'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Download,
  RotateCcw,
  Sparkles,
  Sliders,
  CheckCircle2,
  Eye,
  Layers,
  Printer,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DropZone } from '../common/DropZone';
import { formatFileSize, downloadBlob } from '@/src/lib/imageUtils';
import { createPdfFromImages, PdfImageItem } from '@/src/lib/pdfUtils';
import { unzipSync } from 'fflate';

interface ParsedParagraph {
  text: string;
  isHeading: boolean;
  isBold: boolean;
  alignment: 'left' | 'center' | 'right';
}

export function WordToPdfView() {
  const [docFile, setDocFile] = useState<File | null>(null);
  const [paragraphs, setParagraphs] = useState<ParsedParagraph[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<'a4' | 'letter'>('a4');
  const [margin, setMargin] = useState<'normal' | 'narrow' | 'wide'>('normal');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [renderedPages, setRenderedPages] = useState<string[]>([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parse DOCX using fflate and DOMParser
  const handleWordFileSelected = async (file: File) => {
    setDocFile(file);
    setIsLoading(true);

    try {
      const buffer = await file.arrayBuffer();
      const unzipped = unzipSync(new Uint8Array(buffer));

      const documentXmlBytes = unzipped['word/document.xml'];
      if (!documentXmlBytes) {
        throw new Error('word/document.xml not found inside this .docx file. Ensure it is a valid Word document.');
      }

      const xmlText = new TextDecoder('utf-8').decode(documentXmlBytes);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

      const pNodes = xmlDoc.getElementsByTagName('w:p');
      const parsed: ParsedParagraph[] = [];

      for (let i = 0; i < pNodes.length; i++) {
        const p = pNodes[i];

        // Check if heading or bold
        const pStyle = p.getElementsByTagName('w:pStyle')[0];
        const styleVal = pStyle?.getAttribute('w:val') || '';
        const isHeading = /heading|title/i.test(styleVal);

        const jc = p.getElementsByTagName('w:jc')[0];
        const jcVal = jc?.getAttribute('w:val') || 'left';
        const alignment: 'left' | 'center' | 'right' =
          jcVal === 'center' ? 'center' : jcVal === 'right' ? 'right' : 'left';

        // Extract all text runs
        const tNodes = p.getElementsByTagName('w:t');
        let pText = '';
        for (let j = 0; j < tNodes.length; j++) {
          pText += tNodes[j].textContent || '';
        }

        const bNode = p.getElementsByTagName('w:b')[0];
        const isBold = isHeading || (bNode !== undefined && bNode.getAttribute('w:val') !== '0');

        if (pText.trim().length > 0) {
          parsed.push({
            text: pText.trim(),
            isHeading,
            isBold,
            alignment,
          });
        }
      }

      if (parsed.length === 0) {
        parsed.push({
          text: 'Document loaded successfully, but no readable body text was found.',
          isHeading: false,
          isBold: false,
          alignment: 'left',
        });
      }

      setParagraphs(parsed);
      setCurrentPageIdx(0);
    } catch (err: any) {
      alert(`Could not parse Word document: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Render pages onto Canvas whenever settings change
  useEffect(() => {
    if (paragraphs.length === 0) return;

    renderDocumentToCanvases();
  }, [paragraphs, pageSize, margin, fontFamily]);

  const renderDocumentToCanvases = async () => {
    // High-resolution A4 / Letter dimensions (2× scaling for crisp 150-200 DPI print quality)
    const dimensions =
      pageSize === 'a4'
        ? { width: 1240, height: 1754 } // A4 at 150 DPI
        : { width: 1275, height: 1650 }; // US Letter at 150 DPI

    const marginPx = margin === 'narrow' ? 60 : margin === 'wide' ? 140 : 100;
    const contentWidth = dimensions.width - marginPx * 2;
    const contentHeight = dimensions.height - marginPx * 2;

    const canvas = document.createElement('canvas');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseFont = fontFamily === 'sans' ? 'Calibri, Arial, sans-serif' : 'Georgia, "Times New Roman", serif';

    // Helper to wrap text
    function wrapText(text: string, maxWidth: number, font: string): string[] {
      ctx!.font = font;
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = ctx!.measureText(testLine);
        if (metrics.width < maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = words[i];
        }
      }
      lines.push(currentLine);
      return lines;
    }

    // Paginate paragraphs
    interface RenderedLine {
      text: string;
      font: string;
      color: string;
      alignment: 'left' | 'center' | 'right';
      lineHeight: number;
    }

    const pagesData: RenderedLine[][] = [[]];
    let currentY = 0;

    paragraphs.forEach((p) => {
      const fontSize = p.isHeading ? 36 : 22;
      const font = `${p.isBold ? 'bold ' : ''}${fontSize}px ${baseFont}`;
      const color = p.isHeading ? '#0f172a' : '#334155';
      const lineHeight = p.isHeading ? 48 : 34;

      const wrappedLines = wrapText(p.text, contentWidth, font);

      wrappedLines.forEach((line) => {
        if (currentY + lineHeight > contentHeight) {
          pagesData.push([]);
          currentY = 0;
        }
        pagesData[pagesData.length - 1].push({
          text: line,
          font,
          color,
          alignment: p.alignment,
          lineHeight,
        });
        currentY += lineHeight;
      });

      // Paragraph spacing
      currentY += 16;
    });

    // Render each page to an image data URL
    const pageDataUrls: string[] = [];

    for (let pageNum = 0; pageNum < pagesData.length; pageNum++) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Page Header Accent Line
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(marginPx, marginPx - 30, contentWidth, 1);

      let y = marginPx + 20;

      const lines = pagesData[pageNum];
      lines.forEach((l) => {
        ctx.font = l.font;
        ctx.fillStyle = l.color;

        let x = marginPx;
        if (l.alignment === 'center') {
          x = dimensions.width / 2 - ctx.measureText(l.text).width / 2;
        } else if (l.alignment === 'right') {
          x = dimensions.width - marginPx - ctx.measureText(l.text).width;
        }

        ctx.fillText(l.text, x, y);
        y += l.lineHeight;
      });

      // Page Number at Bottom
      ctx.font = `14px ${baseFont}`;
      ctx.fillStyle = '#94a3b8';
      const footerText = `Page ${pageNum + 1} of ${pagesData.length}`;
      ctx.fillText(
        footerText,
        dimensions.width / 2 - ctx.measureText(footerText).width / 2,
        dimensions.height - marginPx / 2
      );

      pageDataUrls.push(canvas.toDataURL('image/jpeg', 0.95));
    }

    setRenderedPages(pageDataUrls);
  };

  const handleDownloadPdf = async () => {
    if (renderedPages.length === 0 || !docFile) return;
    setIsGeneratingPdf(true);

    try {
      // Convert dataURLs into PdfImageItems
      const items: PdfImageItem[] = await Promise.all(
        renderedPages.map(async (dataUrl, idx) => {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `page_${idx + 1}.jpg`, { type: 'image/jpeg' });
          return {
            id: `p_${idx}`,
            file,
            previewUrl: dataUrl,
            width: pageSize === 'a4' ? 1240 : 1275,
            height: pageSize === 'a4' ? 1754 : 1650,
          };
        })
      );

      const pdfBlob = await createPdfFromImages(items, {
        pageSize: pageSize === 'a4' ? 'a4' : 'letter',
        orientation: 'portrait',
        margin: 'none',
        quality: 0.95,
      });

      const outName = docFile.name.replace(/\.[^/.]+$/, '') + '.pdf';
      downloadBlob(pdfBlob, outName);
    } catch (err: any) {
      alert(`Could not compile PDF: ${err.message}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleReset = () => {
    setDocFile(null);
    setParagraphs([]);
    setRenderedPages([]);
    setCurrentPageIdx(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Tool Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>High-Resolution ISO PDF Output &bull; 100% Free</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Word to PDF Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Convert Microsoft Word (.docx) documents into high-DPI, print-ready PDF files instantly. 100% private and secure.
        </p>
      </div>

      {!docFile ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          <DropZone
            onFileSelect={handleWordFileSelected}
            accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            title="Drop your Word (.docx) file here"
            subtitle="High-fidelity conversion with A4/Letter pagination and crisp typographic rendering."
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
                  {docFile.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>{formatFileSize(docFile.size)}</span>
                  <span>&bull;</span>
                  <span>{renderedPages.length} PDF Pages</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Upload New</span>
              </button>

              <button
                onClick={handleDownloadPdf}
                disabled={isLoading || isGeneratingPdf || renderedPages.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
              >
                <Download className="h-4 w-4" />
                <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download PDF Document'}</span>
              </button>
            </div>
          </div>

          {/* Settings Grid & Document Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Layout & Page Settings */}
            <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sliders className="h-4 w-4 text-blue-500" />
                <span>Page Layout Options</span>
              </div>

              {/* Page Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Page Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPageSize('a4')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      pageSize === 'a4'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    A4 (ISO Standard)
                  </button>
                  <button
                    onClick={() => setPageSize('letter')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      pageSize === 'letter'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    US Letter
                  </button>
                </div>
              </div>

              {/* Margins */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Document Margins
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['narrow', 'normal', 'wide'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMargin(m)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize border transition-colors ${
                        margin === m
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Typography Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFontFamily('sans')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      fontFamily === 'sans'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    Modern Sans
                  </button>
                  <button
                    onClick={() => setFontFamily('serif')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      fontFamily === 'serif'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    Classic Serif
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>100% Private &bull; Files stay on your device.</span>
              </div>
            </div>

            {/* Right: Paginated PDF Preview Canvas */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center">
              <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  PDF Page Preview ({renderedPages.length} Pages Total)
                </span>

                {/* Page Switcher */}
                {renderedPages.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPageIdx((p) => Math.max(0, p - 1))}
                      disabled={currentPageIdx === 0}
                      className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-xs">
                      {currentPageIdx + 1} / {renderedPages.length}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPageIdx((p) => Math.min(renderedPages.length - 1, p + 1))
                      }
                      disabled={currentPageIdx === renderedPages.length - 1}
                      className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Document Page Canvas Sheet */}
              <div className="w-full max-w-md bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-center shadow-inner">
                {renderedPages.length > 0 ? (
                  <img
                    src={renderedPages[currentPageIdx]}
                    alt={`Page ${currentPageIdx + 1}`}
                    className="w-full max-w-sm rounded shadow-lg border border-slate-200 dark:border-slate-800 bg-white"
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center text-slate-400 text-xs">
                    Rendering pages...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
