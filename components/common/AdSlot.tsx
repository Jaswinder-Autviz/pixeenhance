'use client';

import React from 'react';

export interface AdSlotProps {
  slot?: string;
  className?: string;
  adClient?: string;
  adSlotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
}

/**
 * AdSlot component compliant with Google AdSense policies.
 * Renders nothing visible and reserves NO blank space until a valid `adSlotId` is configured.
 * Preserves Google AdSense <ins> markup safely without layout shift.
 */
export function AdSlot({
  slot = 'content-ad',
  className = '',
  adClient = 'ca-pub-7732882072230308',
  adSlotId,
  format = 'auto',
}: AdSlotProps) {
  // Hide completely until real ad unit is configured
  if (!adSlotId) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-5xl mx-auto my-4 text-center overflow-hidden ${className}`}
      aria-label="Advertisement"
      data-ad-slot={slot}
    >
      <ins
        className="adsbygoogle block w-full text-center"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default AdSlot;
