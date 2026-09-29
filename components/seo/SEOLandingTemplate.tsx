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
} from 'lucide-react';
import { SEOLandingPage } from '@/src/data/seoLandingPages';

// Existing Working Tool Views
import { CompressorView } from '@/components/tool-views/CompressorView';
import { ResizerView } from '@/components/tool-views/ResizerView';
import { ConverterView } from '@/components/tool-views/ConverterView';
import { SocialResizerView } from '@/components/tool-views/SocialResizerView';
import { PassportResizerView } from '@/components/tool-views/PassportResizerView';

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
    <div className="w-full min-h-screen bg-[#e5ebf2] dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors relative overflow-hidden bg-grid-pattern">
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
      <section className="py-4 sm:py-6 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white/90 via-slate-50/60 to-transparent dark:from-slate-900/80 dark:via-slate-950/60 dark:to-transparent backdrop-blur-xs relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium mb-2.5"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/tools"
              className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              Tools
            </Link>
            <span>/</span>
            <span className="text-slate-500 dark:text-slate-400">{data.category}</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[200px] sm:max-w-none">
              {data.h1}
            </span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/60 dark:via-purple-950/60 dark:to-pink-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold mb-2.5 shadow-2xs">
            <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
            <span>{data.badge || '100% Free &bull; Private &bull; Instant'}</span>
          </div>

          {/* H1 */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2.5">
            {data.h1}
          </h1>

          {/* Short Useful Introduction */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-3.5 font-normal">
            {data.intro}
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {data.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium shadow-2xs"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Existing Relevant PixEnhance Tool View */}
      <section className="py-4 sm:py-6 relative z-10">
        <div className="w-full">
          {renderInteractiveTool()}
        </div>
      </section>

      {/* Educational & Search-Intent Content Container */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 relative z-10">
        {/* 3. How to Use Section */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                How to Use {data.h1}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Follow these simple steps to optimize your image in seconds.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.howToUse.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold mb-3 shadow-xs">
                  {item.step}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Benefits / Key Features */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            Key Features &amp; Benefits
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {data.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Useful Information Related to Specific Search Intent */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {data.usefulInfo.heading}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {data.usefulInfo.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Optional Reference Table */}
          {data.usefulInfo.table && (
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/80">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                  <tr>
                    {data.usefulInfo.table.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {data.usefulInfo.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Privacy Highlight Card */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-base mb-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Client-Side Privacy Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
            Your images and personal documents are processed strictly in your local web browser using client-side canvas technology. Your files are never uploaded to any remote server, stored in any database, or viewed by third parties.
          </p>
        </div>

        {/* 6. FAQ Section (Accordion) */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left gap-4 font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. Related Tools Section (Internal Links) */}
        {data.relatedLinks && data.relatedLinks.length > 0 && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Related PixEnhance Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Explore other fast, free, in-browser media optimization tools:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.relatedLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/${link.slug}`}
                  className="group flex flex-col justify-between p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs transition-all"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-3">
                    <span>Open tool</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 8. Call To Action (CTA) */}
        <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-r from-indigo-50/80 via-purple-50/60 to-pink-50/80 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-pink-950/40 p-6 sm:p-8 text-center shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
            {data.cta.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-6">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={data.cta.buttonHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all"
            >
              <span>{data.cta.buttonText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-all"
            >
              <span>Browse All Tools</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
