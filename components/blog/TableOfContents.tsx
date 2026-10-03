'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ListOrdered, ChevronRight } from 'lucide-react';

export interface TOCItem {
  id: string;
  label: string;
  number?: string;
  type?: 'section' | 'specs' | 'summary' | 'faqs' | 'tools';
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // If user just clicked, don't let observer override activeId during animation
        if (isScrollingRef.current) return;

        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-90px 0% -65% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [items]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    setActiveId(id);
    isScrollingRef.current = true;

    // Fixed header offset (96px / 6rem) so target section lands perfectly in view
    const headerOffset = 96;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth',
    });

    try {
      window.history.pushState(null, '', `#${id}`);
    } catch {
      // ignore
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-5 sm:p-6 shadow-sm backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/70 dark:border-indigo-800/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-2xs">
            <ListOrdered className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono block leading-none mb-0.5">
              Quick Navigation
            </span>
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Table of Contents
            </h3>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60">
          {items.length} items
        </span>
      </div>

      {/* Navigation Links with Rail Indicator */}
      <nav className="relative pl-3 space-y-1 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500/40 before:to-slate-200 dark:before:to-slate-800 before:rounded-full text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScroll(e, item.id)}
              className={`group flex items-center justify-between py-1.5 px-2.5 rounded-xl font-medium cursor-pointer transition-all ${
                isActive
                  ? 'bg-indigo-50/90 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold shadow-2xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {item.number ? (
                  <span
                    className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors shrink-0 ${
                      isActive
                        ? 'bg-indigo-600 text-white dark:bg-indigo-500'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 group-hover:bg-indigo-100/70 dark:group-hover:bg-indigo-900/60'
                    }`}
                  >
                    {item.number}
                  </span>
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
                      item.type === 'specs'
                        ? 'bg-purple-500'
                        : item.type === 'summary'
                        ? 'bg-indigo-500'
                        : item.type === 'faqs'
                        ? 'bg-sky-500'
                        : item.type === 'tools'
                        ? 'bg-blue-500'
                        : 'bg-emerald-500'
                    } ${isActive ? 'scale-150 ring-2 ring-indigo-400/40' : 'group-hover:scale-125'}`}
                  />
                )}
                <span className="truncate">{item.label}</span>
              </div>
              <ChevronRight
                className={`w-3 h-3 transition-all shrink-0 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 opacity-100 translate-x-0.5'
                    : 'text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                }`}
              />
            </a>
          );
        })}
      </nav>
    </div>
  );
}
