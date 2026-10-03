'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  ArrowRight,
  Zap,
  HelpCircle,
  FileCheck2,
  Bookmark,
  Layers,
  Table as TableIcon,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { SEOLandingPage } from '@/src/data/seoLandingPages';

// Existing Working Tool Views
import { CompressorView } from '@/components/tool-views/CompressorView';
import { ResizerView } from '@/components/tool-views/ResizerView';
import { ConverterView } from '@/components/tool-views/ConverterView';
import { SocialResizerView } from '@/components/tool-views/SocialResizerView';
import { PassportResizerView } from '@/components/tool-views/PassportResizerView';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';

interface SEOLandingTemplateProps {
  data: SEOLandingPage;
}

export function SEOLandingTemplate({ data }: SEOLandingTemplateProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Render the existing relevant PixEnhance tool engine
  const renderInteractiveTool = () => {
    switch (data.tool) {
      case 'image-compressor':
        return <CompressorView initialTargetSize={data.toolConfig?.initialTargetSize} />;
      case 'image-resizer':
        return <ResizerView />;
      case 'converter':
        return (
          <ConverterView
            sourceType={data.toolConfig?.sourceType || 'webp'}
            targetType={data.toolConfig?.targetType || 'png'}
          />
        );
      case 'social-resizer':
        return (
          <SocialResizerView
            platform={data.toolConfig?.platform || 'instagram'}
          />
        );
      case 'passport-resizer':
        return <PassportResizerView />;
      default:
        return <ResizerView />;
    }
  };

  // JSON-LD Structured Data (WebApplication, BreadcrumbList, HowTo, FAQPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `https://pixenhance.in/${data.slug}#software`,
        name: data.h1,
        url: `https://pixenhance.in/${data.slug}`,
        description: data.description,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All modern web browsers (Chrome, Safari, Firefox, Edge)',
        browserRequirements: 'Requires JavaScript and HTML5 Canvas',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '1420',
          bestRating: '5',
          worstRating: '1',
        },
        featureList: data.features.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://pixenhance.in',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://pixenhance.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: data.category,
            item: 'https://pixenhance.in/tools',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: data.h1,
            item: `https://pixenhance.in/${data.slug}`,
          },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to use ${data.h1}`,
        description: data.intro,
        step: data.howToUse.map((item, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: item.title,
          text: item.description,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#E5EBF2] dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors relative overflow-hidden bg-grid-pattern">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Multi-Color Background Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/8 via-teal-500/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[550px] h-[550px] bg-gradient-to-t from-sky-500/8 via-blue-500/6 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 1. Hero Header Section */}
      <section className="py-5 sm:py-7 border-b border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white/95 via-slate-50/80 to-transparent dark:from-slate-900/90 dark:via-slate-950/70 dark:to-transparent backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium mb-3"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              Home
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <Link
              href="/tools"
              className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              Tools
            </Link>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-500 dark:text-slate-400">{data.category}</span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              {data.h1}
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/70 dark:via-purple-950/70 dark:to-pink-950/70 border border-indigo-200/80 dark:border-indigo-800/70 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold mb-3 shadow-2xs">
            <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
            <span>{data.badge || '100% Free • Private • Instant'}</span>
          </div>

          {/* H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight mb-3">
            {data.h1}
          </h1>

          {/* Short Useful Introduction */}
          <p className="text-sm sm:text-base md:text-lg text-black dark:text-slate-200 max-w-2xl mx-auto leading-relaxed mb-4 font-normal">
            {data.intro}
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {data.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 text-black dark:text-slate-200 text-xs sm:text-sm font-medium shadow-2xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Interactive Tool View Engine */}
      <section id="tool-engine" className="py-4 sm:py-6 relative z-10 scroll-mt-20">
        <div className="w-full">
          {renderInteractiveTool()}
        </div>
      </section>

      {/* Content Management: Quick Jump Anchor Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 pl-2 text-xs font-bold text-slate-400 uppercase font-mono tracking-wider shrink-0">
            <Bookmark className="h-3.5 w-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Jump to:</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="#tool-engine"
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Tool
            </a>
            <a
              href="#how-to-use"
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              How-To
            </a>
            <a
              href="#features"
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Features
            </a>
            <a
              href="#guide-specs"
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Guide &amp; Specs
            </a>
            {data.faqs && data.faqs.length > 0 && (
              <a
                href="#faqs"
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                FAQs
              </a>
            )}
            {data.relatedLinks && data.relatedLinks.length > 0 && (
              <a
                href="#related-tools"
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Related
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Educational & Search-Intent Content Container */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
        {/* 3. How to Use Section (Step progression) */}
        <div
          id="how-to-use"
          className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  How to Use {data.h1}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Follow these simple steps to optimize your image in seconds.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 self-start sm:self-auto">
              {data.howToUse.length} Simple Steps
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.howToUse.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-200 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-black font-mono shadow-xs group-hover:scale-105 transition-transform">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-black dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-black dark:text-slate-200 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Benefits / Key Features */}
        <div
          id="features"
          className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                Key Features &amp; Benefits
              </h2>
              <p className="text-sm text-black dark:text-slate-300">
                Engineered for quality, accuracy, and maximum compatibility.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {data.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800/70 transition-colors shadow-2xs"
              >
                <div className="p-1 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-sm sm:text-base text-black dark:text-slate-200 font-medium leading-relaxed">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Useful Information Related to Specific Search Intent */}
        <div
          id="guide-specs"
          className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm space-y-6 scroll-mt-24"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono">
                Technical Guide &bull; Best Practices
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight mt-0.5">
                {data.usefulInfo.heading}
              </h2>
            </div>
          </div>

          {/* Formatted Reading Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-black dark:text-slate-200 leading-relaxed font-normal">
            {data.usefulInfo.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'text-base sm:text-lg font-medium text-black dark:text-slate-200 leading-relaxed' : ''}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Optional Reference Table */}
          {data.usefulInfo.table && (
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-black dark:text-slate-200">
                <TableIcon className="h-4 w-4 text-indigo-500" />
                <span>Reference Specification Table</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100/90 dark:bg-slate-800/90 text-black dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      {data.usefulInfo.table.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-mono text-xs uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-black dark:text-slate-300">
                    {data.usefulInfo.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 font-normal">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Scroll horizontally on mobile devices to view all table columns.
              </p>
            </div>
          )}
        </div>

        {/* Privacy Highlight Card */}
        <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-800/50 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/10 p-6 sm:p-7 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                Total Confidentiality
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-black dark:text-white mt-0.5 mb-1.5">
                100% Client-Side Privacy Guarantee
              </h3>
              <p className="text-sm sm:text-base text-black dark:text-slate-200 leading-relaxed font-normal">
                Your images and personal documents are processed strictly in your local web browser using client-side canvas technology. Your files are never uploaded to any remote server, stored in any database, or viewed by third parties.
              </p>
            </div>
          </div>
        </div>

        {/* Mid-content Ad Slot */}
        <AdPlaceholder slot="mid-content" />

        {/* 6. FAQ Section (Accordion) */}
        {data.faqs && data.faqs.length > 0 && (
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
                  Helpful answers about formatting, compression, and browser compatibility.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.faqs.map((faq, idx) => (
                <details key={idx} className="group py-4" open={idx === 0}>
                  <summary className="w-full flex cursor-pointer list-none items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-black dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-indigo-600 dark:group-open:text-indigo-400" />
                  </summary>
                  <p className="mt-3 text-sm sm:text-base text-black dark:text-slate-200 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* 7. Related Tools Section (Internal Links) */}
        {data.relatedLinks && data.relatedLinks.length > 0 && (
          <div
            id="related-tools"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Related PixEnhance Tools
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Explore other fast, free, in-browser media optimization tools:
                </p>
              </div>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 self-start sm:self-auto"
              >
                <span>View All Tools</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/${link.slug}`}
                  className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-xs transition-all"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                    <span>Open tool</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Banner Ad Slot */}
        <AdPlaceholder slot="bottom-banner" />

        {/* 8. Call To Action (CTA) */}
        <div className="rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-pink-50/90 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/40 p-6 sm:p-10 text-center shadow-xs">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2.5">
            {data.cta.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-6 leading-relaxed">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={data.cta.buttonHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all hover:scale-105"
            >
              <span>{data.cta.buttonText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition-all shadow-2xs"
            >
              <span>Browse All Tools</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
