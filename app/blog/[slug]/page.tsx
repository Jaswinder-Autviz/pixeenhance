import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || true))
    .slice(0, 3);

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
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
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

      {/* Header Container */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blog" className="hover:text-indigo-600 transition-colors">
              Blog &amp; Guides
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              Updated {post.updatedAt}
            </span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            {post.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {post.author.role} &bull; PixEnhance Studio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="space-y-10">
          {/* Quick Summary Callout */}
          {post.quickSummary && post.quickSummary.length > 0 && (
            <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/80 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-4 h-4" />
                <span>At A Glance (Key Takeaways)</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {post.quickSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Direct Tool CTA Banner */}
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-bold font-mono">
                <Sparkles className="w-4 h-4" />
                <span>Recommended Instant Utility</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {post.featuredTool.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {post.featuredTool.description}
              </p>
            </div>
            <Link
              href={post.featuredTool.slug}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all shrink-0"
            >
              <span>Open Tool Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Specification Table (If Available) */}
          {post.specsTable && (
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-500" />
                <span>Reference Specifications &amp; Dimensions</span>
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-mono text-[11px]">
                    <tr>
                      {post.specsTable.headers.map((h, i) => (
                        <th key={i} className="py-3 px-4 font-bold border-b border-slate-200 dark:border-slate-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {post.specsTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-8 prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {post.contentSections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {sec.heading}
                </h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.callout && (
                  <div
                    className={`rounded-2xl p-4 sm:p-5 border text-xs sm:text-sm flex items-start gap-3 my-4 ${
                      sec.callout.type === 'warning'
                        ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
                        : sec.callout.type === 'tip'
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                        : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
                    }`}
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-1">{sec.callout.title}</strong>
                      <span>{sec.callout.text}</span>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Related Tools Box */}
          {post.relatedTools && post.relatedTools.length > 0 && (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Wrench className="w-4 h-4 text-indigo-500" />
                <span>Related Online Tools</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {post.relatedTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.slug}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30 transition-all flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <span>{tool.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Frequently Asked Questions */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {post.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Sign-off & Privacy Guarantee */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                All PixEnhance utilities operate locally inside your browser via WebAssembly and Canvas.
              </span>
            </div>
            <Link href="/privacy" className="hover:underline font-mono text-[11px] shrink-0">
              Read Our Privacy Policy &rarr;
            </Link>
          </div>

          {/* Related Articles Grid */}
          {relatedPosts.length > 0 && (
            <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>More Practical Guides</span>
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View All Guides &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3" />
                      {rel.readTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
