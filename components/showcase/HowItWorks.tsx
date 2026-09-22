import React from 'react';
import { UploadCloud, SlidersHorizontal, Download } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Import Imagery',
      desc: 'Drop any JPEG, PNG, or WebP photo into the studio editor. Files are ingested locally with instantaneous metadata inspection.',
      icon: UploadCloud
    },
    {
      num: '02',
      title: 'Refine & Enhance',
      desc: 'Choose on-device 2×/4× neural super-resolution, precision preset resizing, tonal balance, or consult Gemini AI vision for deep restoration.',
      icon: SlidersHorizontal
    },
    {
      num: '03',
      title: 'Export in Full Fidelity',
      desc: 'Compare results interactively with the Before/After slider, tune compression quality, and download your export immediately.',
      icon: Download
    }
  ];

  return (
    <section className="py-20 bg-canvas-warm/50 border-b border-charcoal-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-mono text-bronze-deep font-semibold">
            Seamless Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2 mb-4">
            How PixEnhance Works
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-normal">
            No complex sign-ups, subscriptions, or credit systems. A direct, high-performance studio built for uninterrupted focus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-xl border border-charcoal-border/70 bg-canvas-light p-8 shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-3xl font-bold text-bronze-deep/60">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-canvas-warm border border-charcoal-border flex items-center justify-center text-charcoal">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-charcoal mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
