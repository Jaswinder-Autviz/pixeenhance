'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Sparkles, Shield, Compass } from 'lucide-react';

// Lazy-load Three.js 3D hero scene with zero SSR overhead
const ImageTransformation3D = dynamic(
  () => import('./ImageTransformation3D').then((mod) => mod.ImageTransformation3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] md:h-[500px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-bronze/30 border-t-bronze animate-spin" />
      </div>
    ),
  }
);

interface HeroProps {
  onUploadClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUploadClick, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-charcoal-border/60 bg-gradient-to-b from-canvas-light via-canvas to-canvas-warm">
      {/* Subtle classic paper background grid texture */}
      <div className="absolute inset-0 bg-paper-texture opacity-60 pointer-events-none" />

      {/* Gentle warm spotlight glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-bronze/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-canvas-warm border border-charcoal-border/80 text-charcoal-muted text-xs uppercase tracking-widest font-semibold mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-rich" />
              <span>AI-Powered Image Studio</span>
            </div>

            {/* Editorial Headline with Playfair Serif */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-serif text-charcoal leading-[1.15] tracking-tight mb-6">
              Make Every Image <br />
              <span className="italic font-normal text-bronze-deep underline decoration-bronze/40 underline-offset-8">
                Look Extraordinary.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-lg sm:text-xl text-charcoal-muted max-w-xl font-normal leading-relaxed mb-8">
              Enhance, upscale, resize and refine your images with intelligent studio tools engineered for photographers, designers, and creators.
            </p>

            {/* CTA Button Group */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                type="button"
                onClick={onUploadClick}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-charcoal text-canvas-light text-sm font-semibold tracking-wide hover:bg-charcoal-warm hover:shadow-luxury transition-all duration-200 group active:scale-[0.99]"
              >
                <Sparkles size={16} className="text-bronze" />
                <span>Upload Image</span>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-bronze-light" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-canvas-light text-charcoal text-sm font-semibold border border-charcoal-border hover:bg-canvas-warm hover:border-bronze transition-all duration-200 active:scale-[0.99]"
              >
                <Compass size={16} className="text-charcoal-subtle" />
                <span>Explore Tools</span>
              </button>
            </div>

            {/* Supporting Trust & Format Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-subtle tracking-wide">
              <span className="font-semibold text-charcoal-muted">JPG &bull; PNG &bull; WebP</span>
              <span className="text-charcoal-border">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-800 font-medium">
                <Shield size={13} className="text-emerald-700" />
                100% Private On-Device Processing Available
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Transformation Installation */}
          <div className="lg:col-span-6 xl:col-span-5 relative w-full flex items-center justify-center">
            <div className="relative w-full rounded-2xl bg-canvas-warm/70 border border-charcoal-border/80 shadow-luxury p-2">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-charcoal text-bronze-light text-[11px] font-mono uppercase tracking-wider rounded-full shadow-sm z-20">
                Interactive 3D Preview
              </div>
              <ImageTransformation3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
