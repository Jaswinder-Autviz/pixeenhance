import React from 'react';
import { Metadata } from 'next';
import { BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getAllPosts, BLOG_CATEGORIES } from '@/lib/blog';
import { BlogListClient } from '@/components/blog/BlogListClient';

export const metadata: Metadata = {
  title: 'Practical Image & PDF Guides (SEO, Dimensions & Optimization) | PixEnhance',
  description:
    'Human-written, step-by-step guides for image compression, pixel dimensions, passport visa sizing, format conversion, and PDF optimization without quality loss.',
  alternates: {
    canonical: 'https://pixenhance.in/blog',
  },
  openGraph: {
    title: 'PixEnhance Blog — Guides, Exact Dimensions & Optimization',
    description:
      'Master image compression, DPI calculations, photo resizing, and format conversions with step-by-step practical walk-throughs.',
    url: 'https://pixenhance.in/blog',
    siteName: 'PixEnhance',
    type: 'website',
    images: [
      {
        url: 'https://pixenhance.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixEnhance Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixEnhance Blog — Guides, Exact Dimensions & Optimization',
    description:
      'Master image compression, DPI calculations, photo resizing, and format conversions with step-by-step practical walk-throughs.',
    images: ['https://pixenhance.in/og-image.jpg'],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'PixEnhance Guides & Technical Articles',
    description:
      'Human-written tutorials and exact specifications for image compression, dimensions, and document conversions.',
    url: 'https://pixenhance.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'PixEnhance Studio',
      url: 'https://pixenhance.in',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#070b14] text-slate-800 dark:text-slate-200 relative overflow-hidden bg-grid-pattern">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Atmospheric Ambient Glow Spheres */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-[450px] h-[450px] bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Hero Header */}
      <div className="border-b border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white via-indigo-50/20 to-transparent dark:from-slate-900/90 dark:via-slate-950/60 dark:to-transparent backdrop-blur-md relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-4 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Official PixEnhance Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight mb-4">
            PixEnhance Blog: Sizing, Compression &amp; Format Guides
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Written for creators, students, and professionals. Zero fluff, exact pixel dimensions, exam portal rules, and step-by-step instructions to get the best results every time.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Human-Tested Blueprints
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Direct Tool Links
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              Zero-Cloud Upload Privacy
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10">
        <BlogListClient posts={posts} categories={BLOG_CATEGORIES} />
      </div>
    </div>
  );
}
