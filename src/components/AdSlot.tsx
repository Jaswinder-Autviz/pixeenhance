import React, { useEffect, useRef } from 'react';

export type AdSlotType = 'leaderboard' | 'rectangle' | 'banner' | 'responsive';

interface AdSlotProps {
  type?: AdSlotType;
  slotId?: string;
  adClient?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  type = 'responsive',
  slotId,
  adClient = 'ca-pub-7732882072230308',
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  // If no valid ad unit slot ID is specified, return null to avoid dummy placeholders
  if (!slotId || slotId === '1234567890') {
    return null;
  }

  // Attempt to push ad via window.adsbygoogle if AdSense script is injected
  useEffect(() => {
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (w.adsbygoogle && adRef.current) {
        w.adsbygoogle.push({});
      }
    } catch {
      // Gracefully handle ad blocker
    }
  }, []);

  const getDimensions = (): { width: string; height: string; minHeight: string } => {
    switch (type) {
      case 'leaderboard':
        return { width: '100%', height: 'auto', minHeight: '90px' };
      case 'rectangle':
        return { width: '300px', height: '250px', minHeight: '250px' };
      case 'banner':
        return { width: '100%', height: 'auto', minHeight: '120px' };
      case 'responsive':
      default:
        return { width: '100%', height: 'auto', minHeight: '100px' };
    }
  };

  const dim = getDimensions();

  return (
    <aside
      className={`ad-slot-container ${className}`}
      aria-label="Advertisement"
      role="complementary"
    >
      <div
        ref={adRef}
        className="ad-slot-box"
        style={{
          width: dim.width,
          maxWidth: type === 'rectangle' ? '300px' : '970px',
          minHeight: dim.minHeight
        }}
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
};
