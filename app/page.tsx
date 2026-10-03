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
  Bookmark,
  Compass,
} from 'lucide-react';
import { AdBanner } from '@/components/common/AdBanner';
import { TOOLS_LIST, ToolCategory } from '@/src/data/toolsList';

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
    subtitle: 'Split images, crop photos, make photo collages, rotate, and mirror flip',
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

// Refined, high-contrast category theme styling with clean backgrounds
function getCategoryTheme(category: ToolCategory): CategoryThemeConfig {
  switch (category) {
    case 'Compress':
    case 'Convert':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/70',
        iconText: 'text-emerald-700 dark:text-emerald-400',
        iconBorder: 'border-emerald-200/80 dark:border-emerald-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-emerald-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-emerald-500/80 dark:hover:border-emerald-500/80 hover:shadow-xl hover:shadow-emerald-500/10',
        cardTopAccent: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        launchBadge: 'group-hover:bg-emerald-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20',
      };
    case 'PDF Tools':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-rose-700 dark:text-rose-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800/70',
        gradient: 'from-rose-500 via-red-600 to-amber-500',
        iconBg: 'bg-rose-50 dark:bg-rose-950/70',
        iconText: 'text-rose-700 dark:text-rose-400',
        iconBorder: 'border-rose-200/80 dark:border-rose-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-rose-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-rose-500/80 dark:hover:border-rose-500/80 hover:shadow-xl hover:shadow-rose-500/10',
        cardTopAccent: 'bg-gradient-to-r from-rose-500 to-red-500',
        launchBadge: 'group-hover:bg-rose-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-500/20',
      };
    case 'Resize':
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-sky-700 dark:text-sky-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-200 dark:border-sky-800/70',
        gradient: 'from-sky-500 via-blue-600 to-indigo-600',
        iconBg: 'bg-sky-50 dark:bg-sky-950/70',
        iconText: 'text-sky-700 dark:text-sky-400',
        iconBorder: 'border-sky-200/80 dark:border-sky-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-sky-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-sky-500/80 dark:hover:border-sky-500/80 hover:shadow-xl hover:shadow-sky-500/10',
        cardTopAccent: 'bg-gradient-to-r from-sky-500 to-blue-500',
        launchBadge: 'group-hover:bg-sky-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-500/20',
      };
    case 'Crop & Edit':
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-purple-700 dark:text-purple-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800/70',
        gradient: 'from-purple-500 via-violet-600 to-pink-500',
        iconBg: 'bg-purple-50 dark:bg-purple-950/70',
        iconText: 'text-purple-700 dark:text-purple-400',
        iconBorder: 'border-purple-200/80 dark:border-purple-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-purple-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-purple-500/80 dark:hover:border-purple-500/80 hover:shadow-xl hover:shadow-purple-500/10',
        cardTopAccent: 'bg-gradient-to-r from-purple-500 to-pink-500',
        launchBadge: 'group-hover:bg-purple-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20',
      };
    case 'Social Media':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-pink-700 dark:text-pink-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-pink-50 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300 border border-pink-200 dark:border-pink-800/70',
        gradient: 'from-pink-500 via-rose-500 to-amber-500',
        iconBg: 'bg-pink-50 dark:bg-pink-950/70',
        iconText: 'text-pink-700 dark:text-pink-400',
        iconBorder: 'border-pink-200/80 dark:border-pink-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-pink-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-pink-500/80 dark:hover:border-pink-500/80 hover:shadow-xl hover:shadow-pink-500/10',
        cardTopAccent: 'bg-gradient-to-r from-pink-500 to-rose-500',
        launchBadge: 'group-hover:bg-pink-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-500/20',
      };
    case 'Utilities':
    default:
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        cardBg: 'bg-white dark:bg-slate-900/90',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-slate-200/90 dark:border-slate-800',
        badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800/70',
        gradient: 'from-amber-500 via-orange-500 to-yellow-500',
        iconBg: 'bg-amber-50 dark:bg-amber-950/70',
        iconText: 'text-amber-700 dark:text-amber-400',
        iconBorder: 'border-amber-200/80 dark:border-amber-800/70',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-amber-500/20 group-hover:border-transparent',
        cardBorderHover: 'hover:border-amber-500/80 dark:hover:border-amber-500/80 hover:shadow-xl hover:shadow-amber-500/10',
        cardTopAccent: 'bg-gradient-to-r from-amber-500 to-orange-500',
        launchBadge: 'group-hover:bg-amber-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20',
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

  // Google Rich Snippets SEO Schema (ItemList directory & FAQPage)
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
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

  // Helper to count tools per category
  const getCategoryCount = (cat: ToolCategory | 'All') => {
    if (cat === 'All') return TOOLS_LIST.length;
    return TOOLS_LIST.filter((t) => t.category === cat).length;
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors relative overflow-hidden bg-grid-pattern">
      {/* Google Rich Snippets Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Atmospheric Ambient Glow Spheres */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-gradient-to-bl from-emerald-500/12 via-teal-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-24 w-[550px] h-[550px] bg-gradient-to-tr from-rose-500/12 via-pink-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[600px] h-[600px] bg-gradient-to-t from-sky-500/12 via-blue-500/8 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 1. Dynamic Hero Section */}
      <section className="relative z-10 overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-18 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50/80 dark:from-[#0b0f1d] dark:via-indigo-950/30 dark:to-[#070b14] backdrop-blur-md">
        {/* Soft Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-aesthetic-radial dark:bg-aesthetic-dark-radial pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-4 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Fast • 100% Private • No Sign-Up Needed</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Free Online{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
              Image &amp; PDF Studio
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
            Compress, resize, convert, edit, and organize your images instantly with zero latency and complete privacy.
          </p>

          {/* Live Search Bar */}
          <div className="max-w-xl mx-auto relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search all ${TOOLS_LIST.length} tools... (e.g. compress, a4 resize, pdf, converter)`}
              className="w-full pl-12 pr-16 py-3.5 rounded-2xl border-2 border-indigo-200/90 dark:border-indigo-900/70 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 shadow-md shadow-indigo-500/5 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/15 text-sm sm:text-base transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800"
              >
                Clear
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
                {filteredTools.length} tools
              </span>
            )}
          </div>

          {/* Quick-Access Popular Tool Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-semibold font-mono text-[11px]">Popular:</span>
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
                className={`px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium ${item.hover} transition-all duration-200 shadow-2xs hover:scale-105 hover:bg-white`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Dynamic Colorful Category Filter Pills with Item Counts */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const theme = cat !== 'All' ? getCategoryTheme(cat as ToolCategory) : null;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${isSelected
                    ? cat === 'All'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                      : `${theme?.tabActive} scale-105`
                    : 'bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300 shadow-2xs font-semibold'
                    }`}
                >
                  <span>{cat === 'Convert' ? 'Compression & Converters' : cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected
                    ? 'bg-white/20 text-current'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Homepage Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdBanner slot="home-top-banner" />
      </div>

      {/* 2. CATEGORIZED TOOLS SECTIONS WITH MAIN HEADINGS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
        {/* Search / Global Summary Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              {selectedCategory === 'All'
                ? 'All Image & PDF Utilities'
                : selectedCategory === 'Convert'
                  ? 'Compression & Converter Tools'
                  : `${selectedCategory} Tools`}
            </span>
            <span className="text-xs text-slate-400 font-medium font-mono">
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
          <div className="py-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <p className="text-base text-slate-700 dark:text-slate-200 mb-2 font-bold">
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
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
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
            .map((cat) => {
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
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-md shadow-indigo-500/10 shrink-0`}
                      >
                        <CategoryIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
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
                      href={
                        cat === 'Compress'
                          ? '/tools/compress'
                          : cat === 'Convert'
                          ? '/tools/convert'
                          : cat === 'PDF Tools'
                          ? '/tools/pdf-tools'
                          : cat === 'Resize'
                          ? '/tools/resize'
                          : cat === 'Crop & Edit'
                          ? '/tools/crop-edit'
                          : cat === 'Social Media'
                          ? '/tools/social-media'
                          : cat === 'Utilities'
                          ? '/tools/utilities'
                          : `/tools?category=${cat}`
                      }
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
                        <div
                          key={tool.id}
                          className={`group relative flex flex-col justify-between p-4.5 sm:p-5 rounded-2xl border ${cardTheme.border} ${cardTheme.cardBg} ${cardTheme.cardBorderHover} shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden backdrop-blur-sm`}
                        >
                          {/* Top Accent Line */}
                          <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cardTheme.cardTopAccent}`} />

                          <div>
                            {/* Card Header: Icon & Category Badge */}
                            <div className="flex items-center justify-between mb-3.5">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${cardTheme.iconBg} ${cardTheme.iconBorder} ${cardTheme.iconText} ${cardTheme.iconHoverBg} transition-all duration-300 shadow-2xs`}
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
                            <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${cardTheme.text} block mb-0.5`}>
                              {tool.category === 'Convert' ? 'Compression & Converter' : tool.category}
                            </span>

                            {/* Tool Title */}
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1.5 leading-snug">
                              <Link href={tool.slug} className="after:absolute after:inset-0">
                                {tool.name}
                              </Link>
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-normal">
                              {tool.shortDescription}
                            </p>
                          </div>

                          {/* Bottom Action Footer */}
                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                            <span className="text-[11px] text-slate-400 font-mono">Instant • Free</span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 ${cardTheme.launchBadge} text-xs font-bold transition-all duration-300 shadow-2xs`}>
                              <span>Launch</span>
                              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
        )}
      </section>

      {/* Mid Homepage Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner slot="home-mid-banner" />
      </div>

      {/* 3. Why PixEnhance (Aesthetic Bento Feature Grid) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Uncompromising Privacy &amp; Performance
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Why Choose PixEnhance?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Engineered for pure speed, total confidentiality, and effortless editing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {[
            {
              title: 'Lightning Fast',
              desc: 'High-performance processing engines that deliver results in milliseconds with zero lag or waiting.',
              icon: Zap,
              color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
            },
            {
              title: 'Strict Privacy',
              desc: 'Your photos, sensitive documents, and personal graphics stay strictly on your device with complete confidentiality.',
              icon: ShieldCheck,
              color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
            },
            {
              title: 'Zero Waiting Queues',
              desc: 'No waiting for slow uploads, queues, or cloud limits. Operations complete instantly.',
              icon: Sparkles,
              color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',
            },
            {
              title: 'Free Forever',
              desc: 'Zero subscriptions, zero paywalls, and zero watermarks. Commercial-grade image tools accessible to everyone.',
              icon: Lock,
              color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
            },
            {
              title: 'Mobile-First Design',
              desc: 'Fully responsive touch-friendly UI optimized for smartphones, tablets, laptops, and 4K displays.',
              icon: Smartphone,
              color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
            },
            {
              title: 'No Account Required',
              desc: 'Start editing immediately. No signup forms, passwords, email verification, or tracking cookies.',
              icon: CheckCircle2,
              color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl mb-3.5 border transition-transform duration-300 group-hover:scale-110 shadow-2xs ${item.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-16 relative overflow-hidden bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Select your tool',
                desc: 'Choose from 60+ tools like Image Compressor, A-Series Resizer, or Image to PDF.',
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
                className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-sm p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white font-mono font-black text-sm shadow-md mb-4 group-hover:scale-105 transition-transform`}
                >
                  {step.step}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Zero-Upload Privacy Guarantee Callout */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-700/60 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50 dark:from-emerald-950/50 dark:via-slate-900 dark:to-emerald-950/30 p-8 sm:p-12 shadow-xs">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="h-5 w-5" />
              <span>Complete Privacy Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Your Files Never Leave Your Computer
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
              PixEnhance processes all your photos, documents, and code directly on your device. Everything remains entirely confidential with zero tracking and zero data leaks.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/privacy"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                Read Privacy Policy
              </Link>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
                Zero Watermarks &bull; Free Forever
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comprehensive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Answers to common questions about PixEnhance features and privacy.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          {homeFaqs.map((faq, idx) => (
            <details key={idx} className="group py-4" open={idx === 0}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between text-left text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-indigo-600 shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AdBanner slot="home-bottom-banner" />
      </div>
    </div>
  );
}
