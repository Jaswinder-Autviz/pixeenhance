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
  adClient?: string;
  adSlotId?: string;
}

/**
 * AdPlaceholder component.
 * Returns null by default to eliminate intrusive dummy placeholder boxes
 * and keep the layout clean, fast, and compliant with Google AdSense policies.
 * Only renders an actual ad unit when an active `adSlotId` is provided.
 */
export function AdPlaceholder({
  adClient = 'ca-pub-7732882072230308',
  adSlotId,
  format = 'auto',
  className = '',
}: AdPlaceholderProps) {
  // If no live ad slot ID is configured, return null (Google Auto Ads handles ads automatically)
  if (!adSlotId) {
    return null;
  }

  return (
    <aside
      className={`w-full max-w-4xl mx-auto my-3 overflow-hidden text-center ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
