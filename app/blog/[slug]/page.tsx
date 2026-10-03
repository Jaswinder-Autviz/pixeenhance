import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Wrench,
  BookOpen,
  ChevronDown,
  Table as TableIcon,
  Lightbulb,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import TableOfContents, { TOCItem } from '@/components/blog/TableOfContents';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | PixEnhance',
    };
  }

  const canonicalUrl = `https://pixenhance.in/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.secondaryKeywords],
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      siteName: 'PixEnhance',
      images: [
        {
          url: 'https://pixenhance.in/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${post.title} — PixEnhance`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: ['https://pixenhance.in/og-image.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems: TOCItem[] = [
    ...post.contentSections.map((sec, idx) => ({
      id: `section-${idx + 1}`,
      label: sec.heading,
      number: `0${idx + 1}`,
      type: 'section' as const,
    })),
    ...(post.specsTable
      ? [
          {
            id: 'specs',
            label: 'Specs & Dimensions',
            type: 'specs' as const,
          },
        ]
      : []),
    ...(post.quickSummary && post.quickSummary.length > 0
      ? [
          {
            id: 'summary',
            label: 'Summary & Takeaways',
            type: 'summary' as const,
          },
        ]
      : []),
    ...(post.relatedTools && post.relatedTools.length > 0
      ? [
          {
            id: 'related-tools',
            label: 'Related Online Tools',
            type: 'tools' as const,
          },
        ]
      : []),
    ...(post.faqs && post.faqs.length > 0
      ? [
          {
            id: 'faqs',
            label: 'Frequently Asked Questions',
            type: 'faqs' as const,
          },
        ]
      : []),
  ];

  // Structured Data (BlogPosting + FAQPage + BreadcrumbList)
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pixenhance.in/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PixEnhance Studio',
      url: 'https://pixenhance.in',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: [post.targetKeyword, ...post.secondaryKeywords].join(', '),
  };

  const faqJsonLd =
    post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Blog',
        item: 'https://pixenhance.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://pixenhance.in/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen bg-slate-50/70 dark:bg-[#070b14] text-slate-800 dark:text-slate-200 relative overflow-x-clip bg-grid-pattern">
      {/* Schema scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* Atmospheric Ambient Glow Spheres */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-[450px] h-[450px] bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header Container - Centered */}
      <div className="border-b border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white via-indigo-50/20 to-transparent dark:from-slate-900/90 dark:via-slate-950/60 dark:to-transparent backdrop-blur-md relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center">
          {/* Breadcrumb Navigation - Centered */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-5 flex-wrap">
            <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[240px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          {/* Badges & Meta - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
            <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/70 shadow-2xs">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Updated {post.updatedAt}
            </span>
          </div>

          {/* Main H1 Title - Centered */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Main 2-Column Layout: Left Sticky Sidebar (TOC) & Right Unified Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 sm:pb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT SIDEBAR: Sticky Table of Contents (Stationary while main content scrolls) */}
          <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6 lg:sticky lg:top-24 self-start">
            <TableOfContents items={tocItems} />

            {/* Direct Tool Companion Launcher Card (Under Table of Contents) */}
            <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-700/50 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Utility Launcher</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                {post.featuredTool.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {post.featuredTool.description}
              </p>
              <div className="pt-1">
                <Link
                  href={post.featuredTool.slug}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-[1.02]"
                >
                  <span>Launch Tool Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Online Tools in Sidebar */}
            {post.relatedTools && post.relatedTools.length > 0 && (
              <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-5 shadow-xs backdrop-blur-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono flex items-center gap-2">
                  <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Online Tools</span>
                </h4>
                <div className="space-y-2">
                  {post.relatedTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={tool.slug}
                      className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 group"
                    >
                      <span>{tool.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* RIGHT SIDE: Single Unified Article Container (lg:col-span-8) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-10 md:p-12 shadow-sm backdrop-blur-sm space-y-12">
              
              {/* Continuous Article Content Sections (Starting at the very top) */}
              <div id="guide-content" className="space-y-12">
                {post.contentSections.map((sec, idx) => (
                  <section
                    key={idx}
                    id={`section-${idx + 1}`}
                    className="space-y-5 scroll-mt-28 border-b border-slate-100 dark:border-slate-800/80 pb-12 last:border-b-0 last:pb-0"
                  >
                    {/* Section Label & Heading */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/50">
                          Section 0{idx + 1}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                        {sec.heading}
                      </h2>
                    </div>

                    {/* Paragraphs with Editorial Typography */}
                    <div className="space-y-5 text-base sm:text-lg md:text-[17px] text-black dark:text-slate-100 leading-relaxed md:leading-8 font-normal">
                      {sec.content.map((p, pIdx) => (
                        <p key={pIdx}>
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Integrated Callout Box */}
                    {sec.callout && (
                      <div
                        className={`rounded-2xl p-5 border text-sm sm:text-base flex items-start gap-4 mt-6 ${
                          sec.callout.type === 'warning'
                            ? 'border-amber-300/80 dark:border-amber-800/80 bg-amber-50/80 dark:bg-amber-950/30 text-black dark:text-amber-100'
                            : sec.callout.type === 'tip'
                            ? 'border-emerald-300/80 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/30 text-black dark:text-emerald-100'
                            : 'border-blue-300/80 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/30 text-black dark:text-blue-100'
                        }`}
                      >
                        {sec.callout.type === 'warning' ? (
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                        ) : sec.callout.type === 'tip' ? (
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Info className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                        )}
                        <div>
                          <strong className="block font-bold text-base mb-1 text-black dark:text-white">{sec.callout.title}</strong>
                          <span className="leading-relaxed font-normal text-black dark:text-slate-200">{sec.callout.text}</span>
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Specification Table (Moved below the main guide content) */}
              {post.specsTable && (
                <div id="specs" className="space-y-4 scroll-mt-28 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                      <TableIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                        Official Reference Table
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white">
                        Reference Specifications &amp; Dimensions
                      </h2>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
                    <table className="w-full text-left text-sm sm:text-base">
                      <thead className="bg-slate-100/90 dark:bg-slate-800/90 text-black dark:text-white uppercase font-mono text-xs sm:text-sm font-bold border-b border-slate-200 dark:border-slate-700">
                        <tr>
                          {post.specsTable.headers.map((h, i) => (
                            <th key={i} className="py-3.5 px-4 tracking-wider">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-black dark:text-slate-100">
                        {post.specsTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="py-3.5 px-4 font-normal">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Scroll horizontally on mobile devices to view all table columns.
                  </p>
                </div>
              )}

              {/* Quick Summary / Key Takeaways Callout (Adjusted below into sections flow) */}
              {post.quickSummary && post.quickSummary.length > 0 && (
                <div
                  id="summary"
                  className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-indigo-950/40 dark:via-slate-900 dark:to-purple-950/20 p-6 sm:p-8 scroll-mt-28 shadow-2xs"
                >
                  <div className="flex items-center gap-2 mb-3.5 text-indigo-700 dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider font-mono">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Summary &bull; Key Takeaways</span>
                  </div>
                  <ul className="space-y-3.5 text-sm sm:text-base text-black dark:text-slate-100 font-medium">
                    {post.quickSummary.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Tools Box */}
              {post.relatedTools && post.relatedTools.length > 0 && (
                <div
                  id="related-tools"
                  className="pt-8 border-t border-slate-100 dark:border-slate-800/80 space-y-4 scroll-mt-28"
                >
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-indigo-500" />
                    <h3 className="text-xs font-bold text-black dark:text-white uppercase font-mono tracking-wider">
                      Related Online Tools
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {post.relatedTools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={tool.slug}
                        className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all flex items-center justify-between text-sm font-bold text-black dark:text-slate-100 group"
                      >
                        <span>{tool.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Frequently Asked Questions */}
              {post.faqs && post.faqs.length > 0 && (
                <div
                  id="faqs"
                  className="pt-8 border-t border-slate-100 dark:border-slate-800/80 scroll-mt-28 space-y-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-900/50">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Important answers regarding exam rules, dimensions, and optimization.
                      </p>
                    </div>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {post.faqs.map((faq, idx) => (
                      <details key={idx} className="group py-4" open={idx === 0}>
                        <summary className="w-full flex cursor-pointer list-none items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
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

              {/* In-Browser Privacy Guarantee Box */}
              <div className="rounded-2xl border border-emerald-500/30 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="leading-relaxed">
                    All PixEnhance utilities operate locally inside your browser via WebAssembly and Canvas. Zero upload waiting queues.
                  </span>
                </div>
                <Link
                  href="/privacy"
                  className="hover:underline font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shrink-0"
                >
                  Read Our Privacy Policy &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
