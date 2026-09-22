import React from 'react';
import Link from 'next/link';
import { Scaling, ArrowRight, Printer, Share2, Monitor } from 'lucide-react';

export const PopularPresets: React.FC = () => {
  const presets = [
    {
      name: 'A4 Document & Print',
      dim: '2480 × 3508 px',
      ratio: '1:1.41 (300 DPI)',
      category: 'Print',
      icon: Printer,
      link: '/resize-image-to-a4'
    },
    {
      name: 'Instagram Square Post',
      dim: '1080 × 1080 px',
      ratio: '1:1 Square',
      category: 'Social',
      icon: Share2,
      link: '/resize-image-for-instagram'
    },
    {
      name: 'Instagram Story / Reel',
      dim: '1080 × 1920 px',
      ratio: '9:16 Vertical',
      category: 'Social',
      icon: Share2,
      link: '/resize-image-for-instagram'
    },
    {
      name: 'YouTube HD Thumbnail',
      dim: '1280 × 720 px',
      ratio: '16:9 Widescreen',
      category: 'Display',
      icon: Monitor,
      link: '/youtube-thumbnail-resizer'
    },
    {
      name: 'Full HD Standard',
      dim: '1920 × 1080 px',
      ratio: '16:9 Display',
      category: 'Display',
      icon: Monitor,
      link: '/image-resizer'
    },
    {
      name: '4K Ultra High Definition',
      dim: '3840 × 2160 px',
      ratio: '16:9 Cinema UHD',
      category: 'Display',
      icon: Monitor,
      link: '/image-upscaler'
    }
  ];

  return (
    <section className="py-20 bg-canvas border-b border-charcoal-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-bronze-deep font-semibold">
              Pre-Configured Dimensions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2">
              Popular Format Presets
            </h2>
          </div>
          <p className="text-sm text-charcoal-muted max-w-md font-normal">
            Calibrated with exact aspect ratio calculations to eliminate letterboxing and preserve visual focal points.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {presets.map((preset, idx) => {
            const Icon = preset.icon;
            return (
              <Link
                key={idx}
                href={preset.link}
                className="group rounded-xl border border-charcoal-border/70 bg-canvas-light p-5 hover:border-bronze hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-2 py-0.5 rounded bg-canvas-warm border border-charcoal-border text-charcoal-subtle">
                      {preset.category}
                    </span>
                    <Icon size={16} className="text-bronze-rich opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-charcoal group-hover:text-bronze-deep transition-colors mb-1">
                    {preset.name}
                  </h3>
                  <div className="font-mono text-xs font-semibold text-charcoal mb-0.5">
                    {preset.dim}
                  </div>
                  <div className="text-[11px] text-charcoal-subtle">
                    {preset.ratio}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-charcoal-border/50 flex items-center justify-between text-xs font-medium text-charcoal-muted group-hover:text-charcoal transition-colors">
                  <span>Open Preset</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 text-bronze" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
