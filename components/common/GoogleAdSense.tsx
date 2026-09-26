'use client';

import { useEffect } from 'react';

interface GoogleAdSenseProps {
  publisherId: string;
}

/**
 * Loads the Google AdSense library dynamically on the client side.
 * Avoids Next.js next/script which injects `data-nscript`, triggering the AdSense warning:
 * "AdSense head tag doesn't support data-nscript attribute."
 */
export function GoogleAdSense({ publisherId }: GoogleAdSenseProps) {
  useEffect(() => {
    if (!publisherId) return;

    // Check if script already exists
    const existing = document.querySelector(
      'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
    );
    if (existing) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [publisherId]);

  return null;
}
