import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-charcoal-border bg-canvas-warm/80 text-charcoal-muted text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-charcoal-border/60">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-charcoal flex items-center justify-center text-bronze-light shadow-sm">
                <span className="font-serif text-base font-bold">P</span>
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-charcoal">
                PIX<span className="font-normal text-bronze-rich italic">ENHANCE</span>
              </span>
            </Link>
            <p className="text-xs text-charcoal-subtle leading-relaxed">
              An editorial-grade creative studio for image upscaling, neural enhancement, precision resizing, and format conversion.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-emerald-800 font-medium mt-1">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>Zero cloud uploads for local tools</span>
            </div>
          </div>

          {/* Tools Col 1: AI & Resolution */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal font-serif">
              Neural & Enhancement
            </h3>
            <Link href="/image-upscaler" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              AI Image Upscaler 2× & 4×
            </Link>
            <Link href="/image-enhancer" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Intelligent Photo Enhancer
            </Link>
            <Link href="/image-editor" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Precision Contrast & Clarity
            </Link>
          </div>

          {/* Tools Col 2: Resizing & Presets */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal font-serif">
              Dimensions & Presets
            </h3>
            <Link href="/image-resizer" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Custom Image Resizer
            </Link>
            <Link href="/resize-image-to-a4" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Resize Image to A4 (Print)
            </Link>
            <Link href="/resize-image-for-instagram" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Instagram Post & Story Presets
            </Link>
            <Link href="/youtube-thumbnail-resizer" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              YouTube 1280×720 Thumbnail
            </Link>
          </div>

          {/* Tools Col 3: Format Conversion & PDF */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xs uppercase tracking-wider font-bold text-charcoal font-serif">
              Convert &amp; PDF Tools
            </h3>
            <Link href="/image-converter" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Convert JPG, PNG, WebP
            </Link>
            <Link href="/image-to-pdf" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Image to Multi-Page PDF
            </Link>
            <Link href="/pdf-to-jpg" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              PDF to High-DPI JPG
            </Link>
            <Link href="/compress-pdf" className="text-xs text-charcoal-muted hover:text-charcoal transition-colors">
              Compress PDF Size
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-subtle">
          <p>&copy; {new Date().getFullYear()} PixEnhance Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for Creators &amp; Photographers</span>
            <span>&bull;</span>
            <span className="text-bronze-deep font-serif italic">Classic Luxury Aesthetic</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
