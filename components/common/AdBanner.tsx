'use client';

import React from 'react';

interface AdBannerProps {
  slot?: string;
  className?: string;
  adClient?: string;
  adSlotId?: string;
}

/**
 * Reusable AdBanner component for PDF and media tools.
 * Reserves a compact fixed/minimum height to prevent CLS,
 * displays a small "Advertisement" label, and stays non-intrusive
 * until actual AdSense code is populated.
 */
export function AdBanner({
  slot = 'pdf-banner',
  className = '',
  adClient = 'ca-pub-7732882072230308',
  adSlotId,
}: AdBannerProps) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto my-3 text-center overflow-hidden ${className}`}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <div className="w-full rounded-xl border border-dashed border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 px-3 py-2 flex items-center justify-between min-h-[50px] sm:min-h-[56px] transition-all">
        <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60">
          Advertisement
        </span>

        {/* If live ad slot is configured, render Google AdSense unit */}
        {adSlotId ? (
          <div className="flex-1 flex items-center justify-center overflow-hidden px-2">
            <ins
              className="adsbygoogle block w-full text-center"
              style={{ display: 'block' }}
              data-ad-client={adClient}
              data-ad-slot={adSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          <div className="flex-1 text-center select-none pointer-events-none px-2">
            <span className="text-[11px] text-slate-400/80 dark:text-slate-500 font-medium">
              Reserved Ad Space &bull; Responsive Banner
            </span>
          </div>
        )}

        <span className="hidden sm:inline-block text-[10px] text-slate-300 dark:text-slate-600 font-mono">
          AdSense Ready
        </span>
      </div>
    </div>
  );
}
