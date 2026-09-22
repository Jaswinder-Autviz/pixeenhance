'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const BeforeAfterShowcase: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section className="py-20 bg-canvas-warm/70 border-b border-charcoal-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs uppercase tracking-widest font-mono text-bronze-deep font-semibold">
            Visual Fidelity
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2 mb-4">
            Witness the Neural Difference
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal">
            Drag the comparison slider to evaluate authentic texture reconstruction versus conventional pixel interpolation.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-charcoal-border/90 bg-canvas-light shadow-luxury-lg overflow-hidden p-3">
          <div
            onPointerMove={handlePointerMove}
            className="relative w-full h-[380px] sm:h-[460px] rounded-xl overflow-hidden cursor-ew-resize select-none"
          >
            {/* Left Layer: Before (Simulated standard/low-res) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                width: `${sliderPos}%`,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #2b2723 0%, #1a1816 100%)'
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 filter blur-[2px] opacity-70">
                <div className="font-serif text-5xl sm:text-7xl font-bold text-charcoal-subtle tracking-tighter opacity-40">
                  720p
                </div>
                <div className="text-xs sm:text-sm text-canvas-subtle mt-2 font-mono">
                  Standard Bicubic Upscale &bull; Blurry Transitions
                </div>
              </div>
            </div>

            {/* Right Layer: After (Simulated 4K UHD Neural Super-Resolution) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                left: `${sliderPos}%`,
                width: `${100 - sliderPos}%`,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1f1b16 0%, #12100e 100%)'
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6">
                <div className="font-serif text-5xl sm:text-7xl font-bold text-bronze-light tracking-tighter drop-shadow-md">
                  4K UHD
                </div>
                <div className="text-xs sm:text-sm text-bronze font-mono mt-2 font-semibold">
                  Real-ESRGAN Neural Weights &bull; Micro-Detail Restored
                </div>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-bronze z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-charcoal text-bronze-light border border-bronze flex items-center justify-center shadow-lg text-xs">
                &#8596;
              </div>
            </div>

            {/* Frosted Badges */}
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded bg-charcoal/80 text-canvas-light text-[11px] font-mono uppercase tracking-wider backdrop-blur-sm z-10">
              Before &bull; 1× Native
            </span>
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded bg-bronze/90 text-charcoal font-semibold text-[11px] font-mono uppercase tracking-wider backdrop-blur-sm z-10">
              After &bull; 4× Super-Res
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
