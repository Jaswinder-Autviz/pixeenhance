'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AI image upscaling work?',
      a: 'When you choose 2× or 4× upscale, our super-resolution neural network processes your image directly on your local hardware to reconstruct lost pixel details with total privacy and crisp clarity.'
    },
    {
      q: 'When does the tool use Gemini, and how is my data protected?',
      a: 'Gemini is only invoked when you explicitly choose a Gemini Cloud AI feature (like Gemini Intelligent Enhance). The request is handled securely with complete privacy and zero third-party tracking.'
    },
    {
      q: 'Will my original image quality or aspect ratio be preserved?',
      a: 'Yes. PixEnhance uses non-destructive processing pipelines. Aspect ratio locking is enabled by default to prevent distortion. When changing dimensions, you can choose between Fit (letterbox), Fill (center-crop), or Stretch.'
    },
    {
      q: 'Can I resize photos for print (such as A4 at 300 DPI)?',
      a: 'Yes. PixEnhance includes dedicated print presets like A4 Portrait (2480 × 3508 px) and A4 Landscape (3508 × 2480 px), which correspond precisely to international ISO 216 dimensions at 300 dots per inch.'
    },
    {
      q: 'What formats can I export to, and is compression customizable?',
      a: 'You can export in JPG, PNG, or modern WebP. For lossy formats (JPG & WebP), you can adjust the compression quality slider from 10% to 100% and view an instant real-time byte estimate before downloading.'
    }
  ];

  return (
    <section className="py-20 bg-canvas-warm/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest font-mono text-bronze-deep font-semibold">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-charcoal tracking-tight mt-2 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-charcoal-muted max-w-lg mx-auto font-normal">
            Everything you need to know about processing capabilities, neural models, and data security.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-charcoal-border/80 bg-canvas-light overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between text-left font-serif text-base font-bold text-charcoal hover:text-bronze-deep transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-charcoal-muted transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-bronze' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-muted leading-relaxed border-t border-charcoal-border/40 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
