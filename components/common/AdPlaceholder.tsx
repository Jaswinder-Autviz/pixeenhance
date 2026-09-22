'use client';

import React from 'react';

export type AdSlotType =
  | 'top-banner'
  | 'in-tool'
  | 'in-content'
  | 'in-feed'
  | 'mid-content'
  | 'bottom-banner'
  | 'sidebar'
  | 'sidebar-sticky'
  | 'side-rail-left'
  | 'side-rail-right'
  | 'billboard';

interface AdPlaceholderProps {
  slot?: AdSlotType;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
  label?: string;
}

export function AdPlaceholder({
  slot = 'in-content',
  format = 'auto',
  className = '',
  label,
}: AdPlaceholderProps) {
  // Dimension and layout specs tailored to standard Google AdSense / IAB ad units
  const getSlotConfig = () => {
    switch (slot) {
      case 'top-banner':
        return {
          wrapper: 'w-full max-w-5xl mx-auto my-4 sm:my-6',
          box: 'min-h-[90px] sm:min-h-[100px] w-full',
          sizeLabel: 'Leaderboard (728×90 / 970×90 Desktop • 320×50/100 Mobile)',
          tag: 'Responsive Top Ad',
        };
      case 'in-tool':
        return {
          wrapper: 'w-full max-w-4xl mx-auto my-6 sm:my-8',
          box: 'min-h-[120px] sm:min-h-[250px] w-full',
          sizeLabel: 'In-Tool Responsive (728×90 / 300×250 / 336×280)',
          tag: 'High Impact Tool Ad',
        };
      case 'in-feed':
        return {
          wrapper: 'h-full w-full',
          box: 'min-h-[260px] h-full w-full',
          sizeLabel: 'Native In-Feed Card (300×250)',
          tag: 'Sponsored Content',
        };
      case 'mid-content':
        return {
          wrapper: 'w-full max-w-5xl mx-auto my-8 sm:my-10',
          box: 'min-h-[100px] sm:min-h-[120px] w-full',
          sizeLabel: 'Mid-Content Banner (728×90 / 970×90)',
          tag: 'In-Stream Ad',
        };
      case 'bottom-banner':
      case 'billboard':
        return {
          wrapper: 'w-full max-w-5xl mx-auto my-8 sm:my-12',
          box: 'min-h-[120px] sm:min-h-[250px] w-full',
          sizeLabel: 'Billboard / Large Banner (970×250 / 728×90)',
          tag: 'Bottom Billboard Ad',
        };
      case 'sidebar':
      case 'sidebar-sticky':
        return {
          wrapper: 'w-full max-w-[300px] sm:max-w-[336px] mx-auto my-4',
          box: 'min-h-[250px] lg:min-h-[600px] w-full',
          sizeLabel: 'Half-Page / Skyscraper (300×600 / 300×250)',
          tag: 'Sidebar Display Ad',
        };
      case 'side-rail-left':
      case 'side-rail-right':
        return {
          wrapper: 'w-[160px]',
          box: 'h-[600px] w-[160px]',
          sizeLabel: 'Wide Skyscraper (160×600)',
          tag: 'Desktop Side Rail',
        };
      case 'in-content':
      default:
        return {
          wrapper: 'w-full max-w-4xl mx-auto my-6 sm:my-8',
          box: 'min-h-[100px] sm:min-h-[140px] w-full',
          sizeLabel: 'Content Banner (728×90 / 300×250)',
          tag: 'Editorial In-Article Ad',
        };
    }
  };

  const config = getSlotConfig();

  // Special presentation for side-rail skyscrapers
  if (slot === 'side-rail-left' || slot === 'side-rail-right') {
    const isLeft = slot === 'side-rail-left';
    return (
      <aside
        className={`hidden 2xl:flex fixed top-24 ${
          isLeft ? 'left-3 3xl:left-8' : 'right-3 3xl:right-8'
        } z-20 flex-col items-center justify-center pointer-events-auto ${className}`}
        aria-label={`Side rail advertisement ${isLeft ? 'left' : 'right'}`}
        data-ad-slot={slot}
        data-ad-format="vertical"
      >
        <div className="relative w-[160px] h-[600px] rounded-2xl border border-dashed border-slate-300/90 dark:border-slate-700/90 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-lg flex flex-col items-center justify-between p-3 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            ADVERTISEMENT
          </span>
          <div className="space-y-1.5 px-1">
            <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-500">
              <span className="text-xs font-bold font-mono">160</span>
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {tagLabel(slot)}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
              160 × 600 Skyscraper
            </p>
          </div>
          <span className="text-[9px] text-slate-400/80 dark:text-slate-600">
            Auto-fills with AdSense
          </span>
        </div>
      </aside>
    );
  }

  // In-feed native ad card formatted like tool cards
  if (slot === 'in-feed') {
    return (
      <div
        className={`group relative flex flex-col justify-between p-5 rounded-2xl border-2 border-dashed border-slate-300/90 dark:border-slate-700/80 bg-gradient-to-br from-slate-50/90 via-white/80 to-indigo-50/30 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-indigo-950/20 backdrop-blur-sm shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all ${className}`}
        aria-label="Sponsored In-Feed Ad"
        data-ad-slot="in-feed"
        data-ad-format="fluid"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 px-2 py-0.5 rounded-md">
            SPONSORED
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
            Ad Space
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center my-4 py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white/60 dark:bg-slate-950/40">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {label || 'Featured Partner / Native Ad'}
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-[200px]">
            High-converting in-feed placement &bull; 300×250 / Fluid
          </span>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Targeted Impression</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Promoted</span>
        </div>
      </div>
    );
  }

  // Standard responsive ad banner container
  return (
    <div
      className={`relative ${config.wrapper} ${className}`}
      aria-label="Advertisement space"
      data-ad-slot={slot}
      data-ad-format={format}
    >
      <div
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700/80 bg-gradient-to-r from-slate-50/80 via-white/90 to-slate-50/80 dark:from-slate-900/60 dark:via-slate-900/90 dark:to-slate-900/60 px-4 py-5 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500/70 transition-all ${config.box}`}
      >
        {/* Top-Right Sponsored Pill */}
        <div className="absolute top-2.5 right-3 flex items-center gap-1.5">
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-700">
            ADVERTISEMENT
          </span>
        </div>

        {/* Top-Left Slot Indicator */}
        <div className="absolute top-2.5 left-3">
          <span className="text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
            {config.tag}
          </span>
        </div>

        {/* Center Ad Info & Guide */}
        <div className="flex flex-col items-center text-center space-y-1 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
              {label || `Reserved Monetization Space • ${slot.replace('-', ' ').toUpperCase()}`}
            </span>
          </div>
          <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-mono">
            {config.sizeLabel}
          </span>
          <span className="text-[10px] text-slate-400/80 dark:text-slate-600">
            Ready for Google AdSense • Mediavine • AdThrive • Auto-responsive container
          </span>
        </div>
      </div>
    </div>
  );
}

function tagLabel(slot: string): string {
  if (slot === 'side-rail-left') return 'Left Rail';
  if (slot === 'side-rail-right') return 'Right Rail';
  return 'Side Rail';
}

