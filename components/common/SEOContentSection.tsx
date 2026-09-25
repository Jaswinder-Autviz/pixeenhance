'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ToolItem, TOOL_MAP } from '@/src/data/toolsList';
import { AdPlaceholder } from './AdPlaceholder';

interface SEOContentSectionProps {
  tool: ToolItem;
}

export function SEOContentSection({ tool }: SEOContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const relatedTools = tool.relatedSlugs
    .map((slug) => TOOL_MAP.get(slug))
    .filter((t): t is ToolItem => !!t);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* In-tool / between tool and content ad */}
      <AdPlaceholder slot="in-content" />

      {/* 1. What is this tool & Overview */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          What is {tool.name}?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {tool.subtitle} PixEnhance provides an editorial-grade, privacy-first interface designed to give creators, developers, photographers, and everyday users instant control over their digital media without registration, subscriptions, or watermarks.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {tool.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Step-by-Step: How to use */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          How to Use {tool.name}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tool.howToUse.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold mb-3 shadow-sm">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mid-Article Sponsored Banner */}
      <AdPlaceholder slot="mid-content" label="Sponsored Guide &bull; In-Article Display" />

      {/* 3. Supported Formats & Technical Specifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Supported File Formats
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Directly processed via native browser canvas decoders:
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.supportedFormats.map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">
            Supports standard image files up to 50MB and 16,000 × 16,000 px resolution.
          </p>
        </div>

        {/* Privacy Highlight Card */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base mb-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <span>Complete Privacy Guarantee</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
              Your photos and documents are processed with complete confidentiality. Your files stay strictly on your device, and are never stored, tracked, or shared.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200/60 dark:border-emerald-900/40 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            100% Private &bull; Fast &bull; Free Forever
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions (Interactive Accordion) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pre-Related Tools Native Ad */}
      <AdPlaceholder slot="in-content" label="Sponsored Recommendations &bull; Native Banner" />

      {/* 5. Related Tools Grid */}
      {relatedTools.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Related Tools
            </h2>
            <Link
              href="/tools"
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 flex items-center gap-1"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rel) => (
              <Link
                key={rel.id}
                href={rel.slug}
                className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-card-hover transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {rel.category}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform">
                  <span>Use tool &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom banner ad */}
      <AdPlaceholder slot="bottom-banner" />
    </section>
  );
}
