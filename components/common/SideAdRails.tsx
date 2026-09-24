'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';

export function SideAdRails() {
  const [closedLeft, setClosedLeft] = useState(false);
  const [closedRight, setClosedRight] = useState(false);
  const leftRailRef = useRef<HTMLElement>(null);
  const rightRailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const footer = document.querySelector('footer');
      if (!footer) {
        ticking = false;
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const activeRail = leftRailRef.current || rightRailRef.current;
      const bannerHeight = activeRail ? activeRail.offsetHeight : 580;
      const bannerTop = 80; // top-20 (80px)
      const gap = 24; // Margin between banner bottom and footer top
      const threshold = bannerTop + bannerHeight + gap;

      let offset = 0;
      if (footerRect.top < threshold) {
        offset = threshold - footerRect.top;
      }

      const transformStyle = offset > 0 ? `translate3d(0, -${offset}px, 0)` : 'translate3d(0, 0, 0)';

      if (leftRailRef.current) {
        leftRailRef.current.style.transform = transformStyle;
      }
      if (rightRailRef.current) {
        rightRailRef.current.style.transform = transformStyle;
      }

      ticking = false;
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    // Initial positioning
    updatePosition();

    // Observe body and footer resizing
    const resizeObserver = new ResizeObserver(() => {
      handleScrollOrResize();
    });

    const footer = document.querySelector('footer');
    if (footer) {
      resizeObserver.observe(footer);
    }
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      resizeObserver.disconnect();
    };
  }, [closedLeft, closedRight]);

  return (
    <>
      {/* Left Desktop Skyscraper Ad Tower */}
      {/* Positioned strictly outside the center container using calc(50% + 525px) */}
      {!closedLeft && (
        <aside
          ref={leftRailRef}
          className="fixed top-20 right-[calc(50%+525px)] z-20 hidden min-[1360px]:flex flex-col items-center justify-between w-[130px] xl:w-[145px] h-[580px] rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl p-2.5 text-center will-change-transform transition-[border-color,box-shadow,opacity] duration-300 hover:border-indigo-400 pointer-events-auto"
          aria-label="Left Rail Advertisement"
          data-ad-slot="side-rail-left"
          data-ad-format="vertical"
        >
          {/* Top Bar with Badge & Dismiss */}
          <div className="w-full flex items-center justify-between pb-1">
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 px-1.5 py-0.5 rounded">
              AD LEFT
            </span>
            <button
              onClick={() => setClosedLeft(true)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Close Ad"
              aria-label="Close left ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Info Area */}
          <div className="flex flex-col items-center space-y-2 px-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white block">
                Left Ad Tower
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5 font-bold">
                160 × 600
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sponsor Slot</span>
            </div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">
              Non-intrusive outer rail
            </p>
          </div>

          {/* Bottom Compliance Label */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 w-full">
            <span className="text-[8px] text-slate-400 font-mono block uppercase tracking-wider">
              Google AdSense
            </span>
          </div>
        </aside>
      )}

      {/* Right Desktop Skyscraper Ad Tower */}
      {/* Positioned strictly outside the center container using calc(50% + 525px) */}
      {!closedRight && (
        <aside
          ref={rightRailRef}
          className="fixed top-20 left-[calc(50%+525px)] z-20 hidden min-[1360px]:flex flex-col items-center justify-between w-[130px] xl:w-[145px] h-[580px] rounded-2xl border-2 border-dashed border-emerald-200 dark:border-emerald-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl p-2.5 text-center will-change-transform transition-[border-color,box-shadow,opacity] duration-300 hover:border-emerald-400 pointer-events-auto"
          aria-label="Right Rail Advertisement"
          data-ad-slot="side-rail-right"
          data-ad-format="vertical"
        >
          {/* Top Bar with Badge & Dismiss */}
          <div className="w-full flex items-center justify-between pb-1">
            <span className="text-[9px] font-mono font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded">
              AD RIGHT
            </span>
            <button
              onClick={() => setClosedRight(true)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Close Ad"
              aria-label="Close right ad"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Info Area */}
          <div className="flex flex-col items-center space-y-2 px-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-900 dark:text-white block">
                Right Ad Tower
              </span>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5 font-bold">
                160 × 600
              </span>
            </div>
            <div className="flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sponsor Slot</span>
            </div>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 leading-tight">
              Non-intrusive outer rail
            </p>
          </div>

          {/* Bottom Compliance Label */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 w-full">
            <span className="text-[8px] text-slate-400 font-mono block uppercase tracking-wider">
              Google AdSense
            </span>
          </div>
        </aside>
      )}
    </>
  );
}
