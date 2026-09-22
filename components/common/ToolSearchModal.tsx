'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_LIST, ToolItem } from '@/src/data/toolsList';

interface ToolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ToolSearchModal({ isOpen, onClose }: ToolSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools: ToolItem[] = query.trim()
    ? TOOLS_LIST.filter((tool) => {
        const q = query.toLowerCase();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.shortDescription.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.slug.toLowerCase().includes(q) ||
          tool.supportedFormats.some((f) => f.toLowerCase().includes(q))
        );
      })
    : TOOLS_LIST.slice(0, 8); // default suggestions

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 20 image tools... (e.g. compress, resize, webp, crop)"
            className="w-full bg-transparent text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
              aria-label="Clear query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-slate-400 border border-slate-200 dark:border-slate-700 rounded bg-slate-100 dark:bg-slate-800 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>{query.trim() ? `Search Results (${filteredTools.length})` : 'Popular Tools'}</span>
            <span className="text-[10px]">Fast &bull; Private</span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              No image tools found matching &quot;{query}&quot;. Try searching for &quot;compress&quot;, &quot;resize&quot;, or &quot;jpg&quot;.
            </div>
          ) : (
            filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.slug}
                onClick={onClose}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/70 dark:hover:bg-slate-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                        {tool.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                        {tool.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2.5 bg-slate-50 dark:bg-slate-900/80 text-xs text-slate-500">
          <Link
            href="/tools"
            onClick={onClose}
            className="text-brand-600 hover:text-brand-700 font-medium"
          >
            Browse all 20 tools &rarr;
          </Link>
          <span>All processing runs locally in browser</span>
        </div>
      </div>
    </div>
  );
}
