'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { UploadCloud, Image as ImageIcon, ShieldCheck, Sparkles, FolderOpen, Zap } from 'lucide-react';

interface DropZoneProps {
  onFileSelect?: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  className?: string;
  showPrivacyBadge?: boolean;
}

export function DropZone({
  onFileSelect,
  onFilesSelect,
  accept = 'image/jpeg,image/png,image/webp,image/svg+xml',
  multiple = false,
  title = 'Drop your files here, or browse',
  subtitle = 'Supports JPG, PNG, WebP, SVG, HEIC & PDF up to 50MB',
  buttonText,
  className = '',
  showPrivacyBadge = true,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleSelectedFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;

      if (onFilesSelect) {
        onFilesSelect(files);
      } else if (onFileSelect) {
        if (multiple) {
          files.forEach((f) => onFileSelect(f));
        } else {
          onFileSelect(files[0]);
        }
      }
    },
    [onFilesSelect, onFileSelect, multiple]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleSelectedFiles(e.dataTransfer.files);
      }
    },
    [handleSelectedFiles]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSelectedFiles(e.target.files);
      // reset so re-selecting same file triggers change
      e.target.value = '';
    }
  };

  // Support Ctrl+V clipboard image paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/') || file.type === 'application/pdf') {
          if (onFilesSelect) {
            onFilesSelect([file]);
          } else if (onFileSelect) {
            onFileSelect(file);
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [onFileSelect, onFilesSelect]);

  const formats = ['JPG', 'PNG', 'WEBP', 'PDF', 'SVG', 'HEIC'];

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Cool Interactive DropZone Card */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative w-full cursor-pointer rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 overflow-hidden ${
          isDragging
            ? 'scale-[1.02] shadow-2xl shadow-indigo-500/30 border-2 border-dashed border-indigo-500 bg-gradient-to-b from-indigo-50/90 via-purple-50/50 to-white dark:from-indigo-950/40 dark:via-purple-950/20 dark:to-slate-900'
            : 'border-2 border-dashed border-slate-300/90 dark:border-slate-700/80 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-950/80 hover:border-indigo-500/80 dark:hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10'
        }`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-label="Upload files"
      >
        {/* Ambient Top Glow Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-teal-500/20 blur-3xl pointer-events-none rounded-full transition-opacity duration-300 group-hover:opacity-100 opacity-60" />

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="relative z-10 flex flex-col items-center justify-center space-y-5">
          {/* Animated Cool Icon with Outer Halo */}
          <div className="relative">
            <div
              className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 opacity-30 blur-md transition-all duration-300 ${
                isDragging ? 'opacity-80 scale-125 animate-pulse' : 'group-hover:opacity-60 group-hover:scale-110'
              }`}
            />
            <div
              className={`relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
                isDragging
                  ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white scale-110 shadow-indigo-500/40'
                  : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-600 text-white shadow-indigo-500/25 group-hover:scale-105 group-hover:rotate-1'
              }`}
            >
              {isDragging ? (
                <Zap className="h-10 w-10 animate-bounce text-white" />
              ) : (
                <UploadCloud className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1" />
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {isDragging ? (
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold animate-pulse">
                  Drop your files now!
                </span>
              ) : (
                title
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {subtitle}
            </p>
          </div>

          {/* Supported Format Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {formats.map((fmt) => (
              <span
                key={fmt}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-2xs group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-colors"
              >
                {fmt}
              </span>
            ))}
          </div>

          {/* Glossy Gradient Action Button */}
          <div className="pt-2">
            <span
              className={`inline-flex items-center gap-2.5 rounded-2xl px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 ${
                isDragging
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 scale-105 shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600 shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:scale-[1.03]'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              <span>{buttonText || (multiple ? 'Browse Multiple Files' : 'Browse From Device')}</span>
              <Sparkles className="h-3.5 w-3.5 opacity-80" />
            </span>
          </div>

          {/* Hotkey Hint */}
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 pt-1">
            <span>or paste directly with</span>
            <kbd className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
              Ctrl + V
            </kbd>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Pill */}
      {showPrivacyBadge && (
        <div className="mt-3.5 inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Your files stay strictly on your device &bull; 100% Private</span>
        </div>
      )}
    </div>
  );
}
