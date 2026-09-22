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
  slotId = '1234567890',
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX',
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  // Attempt to push ad via window.adsbygoogle if AdSense script is injected
  useEffect(() => {
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (w.adsbygoogle && adRef.current) {
        w.adsbygoogle.push({});
      }
    } catch {
      // Gracefully handle ad blocker or non-production environment
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
        <span className="ad-label">Advertisement</span>
        {/* Placeholder container styled cleanly to avoid layout shifts */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            textAlign: 'center'
          }}
        >
          {/* Real Google AdSense tag insertion target */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', textAlign: 'center' }}
            data-ad-client={adClient}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>Google AdSense Placement Area</span>
        </div>
      </div>
    </aside>
  );
};
