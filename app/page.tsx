'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Smartphone,
  CheckCircle2,
  ChevronDown,
  Search,
  Minimize2,
  Maximize2,
  Crop,
  Repeat,
  RotateCw,
  Info,
  Calculator,
  Printer,
  UserCheck,
  Camera,
  Video,
  MessageCircle,
  Sliders,
  Code2,
  FileCode,
  Layers,
  FileImage,
  RefreshCw,
  FileText,
  LayoutGrid,
  ZoomIn,
  Pipette,
  Smile,
  Code,
  Play,
  FlipHorizontal,
} from 'lucide-react';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { TOOLS_LIST, ToolCategory, ToolItem } from '@/src/data/toolsList';

const CATEGORIES: Array<ToolCategory | 'All'> = [
  'All',
  'Convert',
  'PDF Tools',
  'Resize',
  'Crop & Edit',
  'Social Media',
  'Utilities',
];

export interface CategoryThemeConfig {
  bg: string;
  cardBg: string;
  text: string;
  border: string;
  badge: string;
  gradient: string;
  iconBg: string;
  iconText: string;
  iconBorder: string;
  iconHoverBg: string;
  cardBorderHover: string;
  cardTopAccent: string;
  launchBadge: string;
  tabActive: string;
}

interface CategoryMeta {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badge: string;
}

const CATEGORY_META: Record<ToolCategory, CategoryMeta> = {
  Compress: {
    title: 'Image Compression Tools',
    subtitle: 'Reduce file sizes up to 85% without sacrificing visual sharpness. Fast, free & private.',
    icon: Minimize2,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'High Savings',
  },
  Convert: {
    title: 'Image Compression & Vector Converters',
    subtitle: 'Compress image files up to 85%, and convert seamlessly between JPG, PNG, WebP, SVG, and HEIC in seconds',
    icon: Repeat,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'Compress & Convert',
  },
  'PDF Tools': {
    title: 'PDF Tools & Document Converters',
    subtitle: 'Merge photos to multi-page PDF, extract PDF pages to JPG/PNG, animate to GIF, and compress PDFs',
    icon: FileText,
    gradient: 'from-rose-500 via-red-600 to-amber-500',
    badge: 'Multi-Select',
  },
  Resize: {
    title: 'Resize & Scale Tools',
    subtitle: 'Scale photos by dimensions, bulk batches, ISO A0–A7 series, passport photos, and 8× enlargers',
    icon: Maximize2,
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    badge: 'Precision Scale',
  },
  'Crop & Edit': {
    title: 'Crop & Photo Editing Tools',
    subtitle: 'Crop images, make photo collages, rotate, mirror flip, and generate viral memes',
    icon: Crop,
    gradient: 'from-purple-500 via-violet-600 to-pink-500',
    badge: 'Creative Studio',
  },
  'Social Media': {
    title: 'Social Media Image Resizers',
    subtitle: 'Pre-formatted dimension presets for Instagram, YouTube thumbnails, and WhatsApp DP',
    icon: Camera,
    gradient: 'from-pink-500 via-rose-500 to-amber-500',
    badge: 'Social Presets',
  },
  Utilities: {
    title: 'Image Utilities & Developer Tools',
    subtitle: 'Eyedropper pixel color picker, palette extractor, Base64 converters, and dimension inspectors',
    icon: Sliders,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    badge: 'Developer Tools',
  },
};

// Aesthetic category style tokens with distinct color palettes & rich card backgrounds
function getCategoryTheme(category: ToolCategory): CategoryThemeConfig {
  switch (category) {
    case 'Compress':
    case 'Convert':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
        cardBg: 'bg-gradient-to-b from-emerald-50/70 via-white to-slate-50/90 dark:from-emerald-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200/90 dark:border-emerald-900/50',
        badge: 'bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/70',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        iconBg: 'bg-emerald-100/80 dark:bg-emerald-950/70',
        iconText: 'text-emerald-700 dark:text-emerald-400',
        iconBorder: 'border-emerald-300/80 dark:border-emerald-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-emerald-500/15',
        cardTopAccent: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25',
      };
    case 'PDF Tools':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-950/40',
        cardBg: 'bg-gradient-to-b from-rose-50/70 via-white to-slate-50/90 dark:from-rose-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-rose-200/90 dark:border-rose-900/50',
        badge: 'bg-rose-100/90 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800/70',
        gradient: 'from-rose-500 via-red-600 to-amber-500',
        iconBg: 'bg-rose-100/80 dark:bg-rose-950/70',
        iconText: 'text-rose-700 dark:text-rose-400',
        iconBorder: 'border-rose-300/80 dark:border-rose-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-rose-500 dark:hover:border-rose-500 hover:shadow-rose-500/15',
        cardTopAccent: 'bg-gradient-to-r from-rose-500 to-red-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-red-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/25',
      };
    case 'Resize':
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-950/40',
        cardBg: 'bg-gradient-to-b from-sky-50/70 via-white to-slate-50/90 dark:from-sky-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-sky-700 dark:text-sky-400',
        border: 'border-sky-200/90 dark:border-sky-900/50',
        badge: 'bg-sky-100/90 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800/70',
        gradient: 'from-sky-500 via-blue-600 to-indigo-600',
        iconBg: 'bg-sky-100/80 dark:bg-sky-950/70',
        iconText: 'text-sky-700 dark:text-sky-400',
        iconBorder: 'border-sky-300/80 dark:border-sky-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-sky-500/15',
        cardTopAccent: 'bg-gradient-to-r from-sky-500 to-blue-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/25',
      };
    case 'Crop & Edit':
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-950/40',
        cardBg: 'bg-gradient-to-b from-purple-50/70 via-white to-slate-50/90 dark:from-purple-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-purple-200/90 dark:border-purple-900/50',
        badge: 'bg-purple-100/90 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-300 dark:border-purple-800/70',
        gradient: 'from-purple-500 via-violet-600 to-pink-500',
        iconBg: 'bg-purple-100/80 dark:bg-purple-950/70',
        iconText: 'text-purple-700 dark:text-purple-400',
        iconBorder: 'border-purple-300/80 dark:border-purple-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-purple-500/15',
        cardTopAccent: 'bg-gradient-to-r from-purple-500 to-pink-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25',
      };
    case 'Social Media':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-950/40',
        cardBg: 'bg-gradient-to-b from-pink-50/70 via-white to-slate-50/90 dark:from-pink-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-pink-700 dark:text-pink-400',
        border: 'border-pink-200/90 dark:border-pink-900/50',
        badge: 'bg-pink-100/90 text-pink-800 dark:bg-pink-950/80 dark:text-pink-300 border border-pink-300 dark:border-pink-800/70',
        gradient: 'from-pink-500 via-rose-500 to-amber-500',
        iconBg: 'bg-pink-100/80 dark:bg-pink-950/70',
        iconText: 'text-pink-700 dark:text-pink-400',
        iconBorder: 'border-pink-300/80 dark:border-pink-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-pink-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-pink-500 dark:hover:border-pink-500 hover:shadow-pink-500/15',
        cardTopAccent: 'bg-gradient-to-r from-pink-500 to-rose-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/25',
      };
    case 'Utilities':
    default:
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        cardBg: 'bg-gradient-to-b from-amber-50/70 via-white to-slate-50/90 dark:from-amber-950/30 dark:via-slate-900/95 dark:to-slate-900',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200/90 dark:border-amber-900/50',
        badge: 'bg-amber-100/90 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800/70',
        gradient: 'from-amber-500 via-orange-500 to-yellow-500',
        iconBg: 'bg-amber-100/80 dark:bg-amber-950/70',
        iconText: 'text-amber-700 dark:text-amber-400',
        iconBorder: 'border-amber-300/80 dark:border-amber-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-amber-500/15',
        cardTopAccent: 'bg-gradient-to-r from-amber-500 to-orange-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25',
      };
  }
}

// Icon mapper
function getToolIcon(iconName: string) {
  switch (iconName) {
    case 'Minimize2':
      return <Minimize2 className="h-5 w-5" />;
    case 'Maximize2':
      return <Maximize2 className="h-5 w-5" />;
    case 'Crop':
      return <Crop className="h-5 w-5" />;
    case 'Repeat':
      return <Repeat className="h-5 w-5" />;
    case 'FileImage':
      return <FileImage className="h-5 w-5" />;
    case 'Sparkles':
      return <Sparkles className="h-5 w-5" />;
    case 'Layers':
      return <Layers className="h-5 w-5" />;
    case 'RefreshCw':
      return <RefreshCw className="h-5 w-5" />;
    case 'RotateCw':
      return <RotateCw className="h-5 w-5" />;
    case 'FlipHorizontal':
      return <FlipHorizontal className="h-5 w-5" />;
    case 'LayoutGrid':
      return <LayoutGrid className="h-5 w-5" />;
    case 'ZoomIn':
      return <ZoomIn className="h-5 w-5" />;
    case 'Pipette':
      return <Pipette className="h-5 w-5" />;
    case 'Smile':
      return <Smile className="h-5 w-5" />;
    case 'Code':
      return <Code className="h-5 w-5" />;
    case 'Play':
      return <Play className="h-5 w-5" />;
    case 'Info':
      return <Info className="h-5 w-5" />;
    case 'Calculator':
      return <Calculator className="h-5 w-5" />;
    case 'Printer':
      return <Printer className="h-5 w-5" />;
    case 'UserCheck':
      return <UserCheck className="h-5 w-5" />;
    case 'Camera':
      return <Camera className="h-5 w-5" />;
    case 'Video':
      return <Video className="h-5 w-5" />;
    case 'MessageCircle':
      return <MessageCircle className="h-5 w-5" />;
    case 'Sliders':
      return <Sliders className="h-5 w-5" />;
    case 'Code2':
      return <Code2 className="h-5 w-5" />;
    case 'FileCode':
      return <FileCode className="h-5 w-5" />;
    case 'FileText':
      return <FileText className="h-5 w-5" />;
    default:
      return <Sparkles className="h-5 w-5" />;
  }
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.supportedFormats.some((fmt) => fmt.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const homeFaqs = [
    {
      question: 'Are my images ever saved or shared?',
      answer:
        'No. PixEnhance processes your files directly with complete privacy. Your photos and documents stay strictly on your device, ensuring total security and peace of mind.',
    },
    {
      question: 'Is PixEnhance completely free to use?',
      answer:
        'Yes, 100% free. There are no paid subscriptions, no credits, no account registrations, and no watermarks placed on your exported photos.',
    },
    {
      question: 'What is the maximum image file size supported?',
      answer:
        'With optimized high-speed processing and zero upload waiting queues, you can comfortably process large photos up to 50MB and 16,000 pixels wide.',
    },
    {
      question: 'Does PixEnhance work on mobile phones and tablets?',
      answer:
        'Yes! PixEnhance is built with a responsive, mobile-first design. It works smoothly on iPhone, iPad, Android smartphones, and all modern mobile web browsers.',
    },
    {
      question: 'Why choose PixEnhance over other online tools?',
      answer:
        'PixEnhance gives you instant processing speeds with zero waiting queues, eliminates cloud data leaks, and allows you to work securely with complete peace of mind.',
    },
  ];

  // Google Rich Snippets SEO Schema (WebSite, Organization, FAQPage, ItemList)
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://pixenhance.in/#organization',
        name: 'PixEnhance',
        url: 'https://pixenhance.in',
        logo: 'https://pixenhance.in/favicon.svg',
        description:
          'PixEnhance is an editorial-grade, privacy-first online image and PDF utility hub.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pixenhance.in/#website',
        url: 'https://pixenhance.in',
        name: 'PixEnhance — Free Online Image & PDF Studio',
        publisher: {
          '@id': 'https://pixenhance.in/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://pixenhance.in/tools?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://pixenhance.in/#tools-directory',
        name: 'Featured Image and PDF Tools',
        itemListElement: TOOLS_LIST.slice(0, 25).map((tool, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: tool.name,
          url: `https://pixenhance.in${tool.slug}`,
          description: tool.shortDescription,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: homeFaqs.map((faq) => ({
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
      {/* Google Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Atmospheric Ambient Glow Spheres - High-chroma color depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-gradient-to-br from-indigo-500/22 via-purple-500/18 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/18 via-teal-500/14 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-24 w-[600px] h-[600px] bg-gradient-to-tr from-rose-500/18 via-pink-500/14 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[650px] h-[650px] bg-gradient-to-t from-sky-500/18 via-blue-500/14 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 1. Dynamic Hero Section */}
      <section className="relative z-10 overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-18 border-b border-slate-300/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-200/90 via-indigo-100/40 to-slate-200/60 dark:from-[#0b0f1d] dark:via-indigo-950/40 dark:to-[#070b14] backdrop-blur-md">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-aesthetic-radial dark:bg-aesthetic-dark-radial pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Ambient Trust Pill */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            Free Online{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
              Image &amp; PDF Studio
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Compress, resize, convert, edit, and organize your images instantly with zero latency and complete privacy.
          </p>

          {/* Live Search Bar with Ambient Ring */}
          <div className="max-w-xl mx-auto relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search all ${TOOLS_LIST.length} tools... (e.g. compress, a4 resize, pdf, converter)`}
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl border-2 border-indigo-300/80 dark:border-indigo-900/70 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 shadow-lg shadow-indigo-500/10 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 text-sm sm:text-base transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick-Access Popular Tool Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold font-mono text-[11px]">Popular:</span>
            {[
              { label: '⚡ Image Compressor', slug: '/image-compressor', hover: 'hover:border-emerald-500 hover:text-emerald-700' },
              { label: '🔄 JPG to PNG', slug: '/jpg-to-png', hover: 'hover:border-emerald-500 hover:text-emerald-700' },
              { label: '📐 A4 Resizer', slug: '/a4-image-resizer', hover: 'hover:border-sky-500 hover:text-sky-700' },
              { label: '📄 Image to PDF', slug: '/image-to-pdf', hover: 'hover:border-rose-500 hover:text-rose-700' },
              { label: '🎨 Collage Maker', slug: '/collage-maker', hover: 'hover:border-purple-500 hover:text-purple-700' },
              { label: '🔲 PNG to SVG', slug: '/png-to-svg', hover: 'hover:border-teal-500 hover:text-teal-700' },
            ].map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                className={`px-3 py-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium ${item.hover} transition-all duration-200 shadow-2xs hover:scale-105 hover:bg-white`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Dynamic Colorful Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const theme = cat !== 'All' ? getCategoryTheme(cat as ToolCategory) : null;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${isSelected
                    ? cat === 'All'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                      : `${theme?.tabActive} scale-105`
                    : 'bg-slate-200/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-400 hover:shadow-sm shadow-2xs font-semibold'
                    }`}
                >
                  {cat === 'Convert' ? 'Compression & Converters' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Banner Ad Placeholder */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <AdPlaceholder slot="top-banner" />
      </div>

      {/* 2. CATEGORIZED TOOLS SECTIONS WITH MAIN HEADINGS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        {/* Search / Global Summary Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 font-mono">
              {selectedCategory === 'All'
                ? 'All Image & PDF Utilities'
                : selectedCategory === 'Convert'
                  ? 'Compression & Converter Tools'
                  : `${selectedCategory} Tools`}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              ({filteredTools.length} tools available)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Fast, Free &amp; Secure</span>
          </div>
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <p className="text-base text-slate-700 dark:text-slate-200 mb-2 font-semibold">
              No tools found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Try searching for &quot;compress&quot;, &quot;resize&quot;, &quot;pdf&quot;, or &quot;converter&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-sm"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          (
            [
              'Convert',
              'PDF Tools',
              'Resize',
              'Crop & Edit',
              'Social Media',
              'Utilities',
            ] as ToolCategory[]
          )
            .filter((cat) => {
              if (selectedCategory !== 'All' && selectedCategory !== cat) return false;
              return filteredTools.some((t) => t.category === cat);
            })
            .map((cat, catIdx) => {
              const meta = CATEGORY_META[cat];

              const CategoryIcon = meta.icon;
              const toolsInCat = filteredTools.filter((t) => t.category === cat);
              const theme = getCategoryTheme(cat);

              return (
                <div key={cat} className="space-y-6">
                  {/* Category Main Heading Block */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200/90 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-lg shadow-indigo-500/10 shrink-0`}
                      >
                        <CategoryIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {meta.title}
                          </h2>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${theme.badge} font-mono`}>
                            {toolsInCat.length} {toolsInCat.length === 1 ? 'Tool' : 'Tools'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {meta.subtitle}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/tools?category=${cat}`}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.text} hover:opacity-80 transition-opacity`}
                    >
                      <span>Explore all {toolsInCat.length} tools</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* Tools Grid for this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {toolsInCat.map((tool) => {
                      const cardTheme = getCategoryTheme(tool.category);
                      return (
                        <Link
                          key={tool.id}
                          href={tool.slug}
                          className={`group relative flex flex-col justify-between p-5 rounded-2xl border ${cardTheme.border} ${cardTheme.cardBg} ${cardTheme.cardBorderHover} shadow-[0_4px_20px_-2px_rgba(15,23,42,0.08)] dark:shadow-[0_4px_25px_-2px_rgba(0,0,0,0.5)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden`}
                        >
                          {/* Top Accent Line that illuminates on hover */}
                          <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cardTheme.cardTopAccent}`} />

                          <div>
                            {/* Card Header: Icon & Category Badge */}
                            <div className="flex items-center justify-between mb-4">
                              <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl border ${cardTheme.iconBg} ${cardTheme.iconBorder} ${cardTheme.iconText} ${cardTheme.iconHoverBg} transition-all duration-300 shadow-2xs`}
                              >
                                {getToolIcon(tool.icon)}
                              </div>
                              {tool.badge && (
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md font-mono ${cardTheme.badge} shadow-2xs`}>
                                  {tool.badge}
                                </span>
                              )}
                            </div>

                            {/* Category Micro Label */}
                            <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${cardTheme.text}`}>
                              {tool.category === 'Convert' ? 'Compression & Converter' : tool.category}
                            </span>

                            {/* Tool Title */}
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-slate-950 dark:group-hover:text-white transition-colors mt-0.5 mb-1.5">
                              {tool.name}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                              {tool.shortDescription}
                            </p>
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="mt-5 pt-3.5 border-t border-slate-200/90 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                            <span className="text-[11px] text-slate-400 font-medium">Instant &bull; Free</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 ${cardTheme.launchBadge} text-xs font-bold transition-all duration-300 shadow-2xs`}>
                              <span>Launch</span>
                              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}

                    {/* Native In-Feed Ad Card for 1st Category */}
                    {cat === 'Convert' && (
                      <AdPlaceholder slot="in-feed" label="Featured Media Partner" />
                    )}
                  </div>

                  {/* Inter-Category Sponsored Banners */}
                  {catIdx === 0 && (
                    <div className="pt-6">
                      <AdPlaceholder slot="mid-content" label="Sponsored &bull; High-Speed Media Partner" />
                    </div>
                  )}
                  {catIdx === 2 && (
                    <div className="pt-6">
                      <AdPlaceholder slot="in-content" label="Sponsored &bull; PDF &amp; Document Solutions" />
                    </div>
                  )}
                </div>
              );
            })
        )}
      </section>

      {/* In-Content Ad Placeholder */}
      <div className="max-w-4xl mx-auto px-4 my-6">
        <AdPlaceholder slot="in-content" />
      </div>

      {/* 3. Why PixEnhance (Aesthetic Bento Feature Grid) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Uncompromising Privacy &amp; Performance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Why Choose PixEnhance?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered for pure speed, total confidentiality, and effortless editing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Lightning Fast',
              desc: 'High-performance processing engines that deliver results in milliseconds with zero lag or waiting.',
              icon: Zap,
              color: 'text-amber-600 bg-amber-100/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
              cardBg: 'bg-gradient-to-br from-amber-100/60 via-amber-50/20 to-white dark:from-amber-950/30 dark:via-slate-900/95 dark:to-slate-900 border-amber-200/90 dark:border-amber-900/40',
            },
            {
              title: 'Strict Privacy',
              desc: 'Your photos, sensitive documents, and personal graphics stay strictly on your device with complete confidentiality.',
              icon: ShieldCheck,
              color: 'text-emerald-600 bg-emerald-100/90 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800',
              cardBg: 'bg-gradient-to-br from-emerald-100/60 via-emerald-50/20 to-white dark:from-emerald-950/30 dark:via-slate-900/95 dark:to-slate-900 border-emerald-200/90 dark:border-emerald-900/40',
            },
            {
              title: 'Zero Waiting Queues',
              desc: 'No waiting for slow uploads, queues, or cloud limits. Operations complete instantly.',
              icon: Sparkles,
              color: 'text-sky-600 bg-sky-100/90 dark:bg-sky-950/60 border-sky-300 dark:border-sky-800',
              cardBg: 'bg-gradient-to-br from-sky-100/60 via-sky-50/20 to-white dark:from-sky-950/30 dark:via-slate-900/95 dark:to-slate-900 border-sky-200/90 dark:border-sky-900/40',
            },
            {
              title: 'Free Forever',
              desc: 'Zero subscriptions, zero paywalls, and zero watermarks. Commercial-grade image tools accessible to everyone.',
              icon: Lock,
              color: 'text-indigo-600 bg-indigo-100/90 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-800',
              cardBg: 'bg-gradient-to-br from-indigo-100/60 via-indigo-50/20 to-white dark:from-indigo-950/30 dark:via-slate-900/95 dark:to-slate-900 border-indigo-200/90 dark:border-indigo-900/40',
            },
            {
              title: 'Mobile-First Design',
              desc: 'Fully responsive touch-friendly UI optimized for smartphones, tablets, laptops, and 4K displays.',
              icon: Smartphone,
              color: 'text-purple-600 bg-purple-100/90 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800',
              cardBg: 'bg-gradient-to-br from-purple-100/60 via-purple-50/20 to-white dark:from-purple-950/30 dark:via-slate-900/95 dark:to-slate-900 border-purple-200/90 dark:border-purple-900/40',
            },
            {
              title: 'No Account Required',
              desc: 'Start editing immediately. No signup forms, passwords, email verification, or tracking cookies.',
              icon: CheckCircle2,
              color: 'text-rose-600 bg-rose-100/90 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800',
              cardBg: 'bg-gradient-to-br from-rose-100/60 via-rose-50/20 to-white dark:from-rose-950/30 dark:via-slate-900/95 dark:to-slate-900 border-rose-200/90 dark:border-rose-900/40',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`group rounded-3xl border ${item.cardBg} backdrop-blur-sm p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-4 border transition-transform duration-300 group-hover:scale-110 shadow-sm ${item.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* In-Between Bento & Workflow Sponsored Banner */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdPlaceholder slot="mid-content" label="Sponsored Media Suite &bull; High Conversion Placement" />
      </div>

      {/* 4. How It Works Section */}
      <section className="py-20 relative overflow-hidden bg-slate-200/80 dark:bg-slate-900/80 border-y border-slate-300 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Simple 4-Step Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Optimize and convert your files in seconds without software installations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select your tool',
                desc: 'Choose from 40+ tools like Image Compressor, A-Series Resizer, or Image to PDF.',
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                step: '02',
                title: 'Drop your files',
                desc: 'Drag & drop your JPG, PNG, or WebP files directly into the browser, or paste with Ctrl+V.',
                gradient: 'from-sky-500 to-blue-600',
              },
              {
                step: '03',
                title: 'Fine-tune settings',
                desc: 'Configure quality slider, enter dimensions, or pick presets with real-time preview.',
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                step: '04',
                title: 'Download instantly',
                desc: 'Save your optimized files or batch ZIP archive with zero cloud upload wait.',
                gradient: 'from-amber-500 to-orange-600',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl border-2 border-slate-300/80 dark:border-slate-700/80 bg-slate-50/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white font-mono font-black text-base shadow-lg mb-5 group-hover:scale-110 transition-transform`}
                >
                  {step.step}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Zero-Upload Privacy Guarantee Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-700/60 bg-gradient-to-br from-emerald-100/80 via-white/90 to-emerald-50/80 dark:from-emerald-950/50 dark:via-slate-900 dark:to-emerald-950/30 p-8 sm:p-12 shadow-lg">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="h-5 w-5" />
              <span>Complete Privacy Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Your Files Never Leave Your Computer
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              PixEnhance processes all your photos, documents, and code directly on your device. Everything remains entirely confidential with zero tracking and zero data leaks.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/privacy"
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Read Privacy Policy
              </Link>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                Zero Watermarks &bull; Free Forever
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-FAQ In-Content Sponsored Unit */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <AdPlaceholder slot="in-content" label="Sponsored Partner &bull; High Impression Placement" />
      </div>

      {/* 6. Comprehensive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Answers to common questions about PixEnhance features and privacy.
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-300/90 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/90 p-6 sm:p-8 shadow-md divide-y divide-slate-200 dark:divide-slate-800">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between text-left text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-600' : ''
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
      </section>

      {/* Bottom Ad Placeholder */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <AdPlaceholder slot="bottom-banner" />
      </div>
    </div>
  );
}
