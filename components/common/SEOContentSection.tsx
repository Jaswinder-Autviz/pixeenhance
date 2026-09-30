import React from 'react';
import { ChevronDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ToolItem } from '@/src/data/toolsList';
import { AdPlaceholder } from './AdPlaceholder';
import { RelatedTools } from '@/components/RelatedTools';

interface SEOContentSectionProps {
  tool: ToolItem;
}

export function SEOContentSection({ tool }: SEOContentSectionProps) {
  const defaultFaqs = [
    {
      question: `Are my images or documents saved or stored anywhere when using ${tool.name}?`,
      answer: `Never. All image processing with ${tool.name} happens completely locally inside your web browser. Your private pictures and sensitive documents are never uploaded to any remote server or stored in any database.`,
    },
    {
      question: `Is ${tool.name} completely free to use?`,
      answer: `Yes, 100% free with no hidden fees, paid subscriptions, account registrations, or watermarks placed on exported files.`,
    },
    {
      question: `What formats are compatible with ${tool.name}?`,
      answer: `${tool.name} supports ${tool.supportedFormats.join(', ')} files with high-speed in-browser processing and instant downloads.`,
    },
  ];

  const faqsToRender = tool.faqs && tool.faqs.length > 0 ? tool.faqs : defaultFaqs;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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

      {/* 4. Frequently Asked Questions (Server-rendered HTML with details/summary) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqsToRender.map((faq, idx) => (
            <details key={idx} className="group py-4" open={idx === 0}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-brand-600 shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Pre-Related Tools Native Ad */}
      <AdPlaceholder slot="in-content" label="Sponsored Recommendations &bull; Native Banner" />

      {/* 5. Contextual Related Tools & Next Workflow Steps (Server Component) */}
      <RelatedTools currentSlug={tool.slug} />

      {/* Bottom banner ad */}
      <AdPlaceholder slot="bottom-banner" />
    </section>
  );
}
