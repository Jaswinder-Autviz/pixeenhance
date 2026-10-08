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
  // If no live ad slot is configured, render nothing visible and reserve no blank space
  if (!adSlotId) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-5xl mx-auto my-4 text-center overflow-hidden min-h-[250px] bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-center items-center ${className}`}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
