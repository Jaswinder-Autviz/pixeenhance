import React from 'react';
import {
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Zap,
  HelpCircle,
  FileCode,
  Sparkles,
  Bookmark,
} from 'lucide-react';
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
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
      {/* Content Quick Jump Bar */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 pl-2 text-xs font-bold text-slate-400 uppercase font-mono tracking-wider shrink-0">
          <Bookmark className="h-3.5 w-3.5 text-indigo-500" />
          <span className="hidden sm:inline">Jump to:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#overview"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Overview
          </a>
          <a
            href="#how-to-use"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            How-To
          </a>
          <a
            href="#formats-privacy"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Formats &amp; Privacy
          </a>
          <a
            href="#faqs"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            FAQs
          </a>
          <a
            href="#related-tools"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Related Tools
          </a>
        </div>
      </div>

      {/* 1. What is this tool & Overview */}
      <div
        id="overview"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              In-Depth Overview
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight mt-0.5">
              What is {tool.name}?
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-black dark:text-slate-200 leading-relaxed mb-6 font-normal">
          {tool.subtitle} PixEnhance provides an editorial-grade, privacy-first interface designed to give creators, developers, photographers, and everyday users instant control over their digital media without registration, subscriptions, or watermarks.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid sm:grid-cols-2 gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
          {tool.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 text-sm text-black dark:text-slate-200"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Step-by-Step: How to use */}
      <div
        id="how-to-use"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              How to Use {tool.name}
            </h2>
            <p className="text-sm text-black dark:text-slate-300">
              Simple browser workflow with real-time feedback.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tool.howToUse.map((step, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-200 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-black font-mono shadow-xs group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-sm text-black dark:text-slate-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mid-Article Sponsored Banner */}
      <AdPlaceholder slot="mid-content" label="Sponsored Guide • In-Article Display" />

      {/* 3. Supported Formats & Technical Specifications */}
      <div id="formats-privacy" className="grid md:grid-cols-2 gap-6 scroll-mt-24">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-7 shadow-xs backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <FileCode className="h-4 w-4" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-black dark:text-white">
                Supported File Formats
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 mb-4">
              Directly processed via native browser canvas decoders:
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.supportedFormats.map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono shadow-2xs"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
            Supports standard image files up to 50MB and 16,000 × 16,000 px resolution.
          </p>
        </div>

        {/* Privacy Highlight Card */}
        <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-800/50 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/10 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-base mb-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Complete Privacy Guarantee</span>
            </div>
            <p className="text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-normal">
              Your photos and documents are processed with complete confidentiality. Your files stay strictly on your device, and are never stored, tracked, or shared.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">
            100% Private &bull; Fast &bull; Free Forever
          </div>
        </div>
      </div>

      {/* 4. Frequently Asked Questions */}
      <div
        id="faqs"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-900/50">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-black dark:text-slate-300">
              Clear answers regarding capabilities and security.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqsToRender.map((faq, idx) => (
            <details key={idx} className="group py-4" open={idx === 0}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between text-left text-base sm:text-lg font-bold text-black dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-indigo-600 shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-black dark:text-slate-200 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Pre-Related Tools Native Ad */}
      <AdPlaceholder slot="in-content" label="Sponsored Recommendations • Native Banner" />

      {/* 5. Contextual Related Tools & Next Workflow Steps */}
      <div id="related-tools" className="scroll-mt-24">
        <RelatedTools currentSlug={tool.slug} />
      </div>

      {/* Bottom banner ad */}
      <AdPlaceholder slot="bottom-banner" />
    </section>
  );
}
