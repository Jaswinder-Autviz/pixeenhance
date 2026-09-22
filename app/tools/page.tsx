'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Minimize2,
  Maximize2,
  Crop,
  Repeat,
  RotateCw,
  FlipHorizontal,
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
  FileText,
  LayoutGrid,
  ZoomIn,
  Pipette,
  Smile,
  Code,
  Play,
} from 'lucide-react';
import { TOOLS_LIST, ToolCategory, ToolItem } from '@/src/data/toolsList';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';

const CATEGORIES: Array<ToolCategory | 'All'> = [
  'All',
  'Convert',
  'PDF Tools',
  'Resize',
  'Crop & Edit',
  'Social Media',
  'Utilities',
];

interface CategoryMeta {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badge: string;
  bgTint: string;
}

export interface CategoryThemeConfig {
  bg: string;
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

function getCategoryTheme(category: ToolCategory): CategoryThemeConfig {
  switch (category) {
    case 'Convert':
      return {
        bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/20 dark:border-emerald-800/50',
        badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        iconBorder: 'border-emerald-200/80 dark:border-emerald-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-emerald-400/80 dark:hover:border-emerald-500/60 hover:shadow-emerald-500/10',
        cardTopAccent: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25',
      };
    case 'Resize':
      return {
        bg: 'bg-sky-500/10 dark:bg-sky-950/40',
        text: 'text-sky-600 dark:text-sky-400',
        border: 'border-sky-500/20 dark:border-sky-800/50',
        badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60',
        gradient: 'from-sky-500 via-blue-600 to-indigo-600',
        iconBg: 'bg-sky-50 dark:bg-sky-950/60',
        iconText: 'text-sky-600 dark:text-sky-400',
        iconBorder: 'border-sky-200/80 dark:border-sky-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-sky-400/80 dark:hover:border-sky-500/60 hover:shadow-sky-500/10',
        cardTopAccent: 'bg-gradient-to-r from-sky-500 to-blue-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-blue-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/25',
      };
    case 'PDF Tools':
      return {
        bg: 'bg-rose-500/10 dark:bg-rose-950/40',
        text: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/20 dark:border-rose-800/50',
        badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60',
        gradient: 'from-rose-500 via-red-600 to-amber-500',
        iconBg: 'bg-rose-50 dark:bg-rose-950/60',
        iconText: 'text-rose-600 dark:text-rose-400',
        iconBorder: 'border-rose-200/80 dark:border-rose-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-red-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-rose-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-rose-400/80 dark:hover:border-rose-500/60 hover:shadow-rose-500/10',
        cardTopAccent: 'bg-gradient-to-r from-rose-500 to-red-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-red-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-500/25',
      };
    case 'Crop & Edit':
      return {
        bg: 'bg-purple-500/10 dark:bg-purple-950/40',
        text: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500/20 dark:border-purple-800/50',
        badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60',
        gradient: 'from-purple-500 via-violet-600 to-pink-500',
        iconBg: 'bg-purple-50 dark:bg-purple-950/60',
        iconText: 'text-purple-600 dark:text-purple-400',
        iconBorder: 'border-purple-200/80 dark:border-purple-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-purple-400/80 dark:hover:border-purple-500/60 hover:shadow-purple-500/10',
        cardTopAccent: 'bg-gradient-to-r from-purple-500 to-pink-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25',
      };
    case 'Social Media':
      return {
        bg: 'bg-pink-500/10 dark:bg-pink-950/40',
        text: 'text-pink-600 dark:text-pink-400',
        border: 'border-pink-500/20 dark:border-pink-800/50',
        badge: 'bg-pink-50 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300 border border-pink-200 dark:border-pink-800/60',
        gradient: 'from-pink-500 via-rose-500 to-amber-500',
        iconBg: 'bg-pink-50 dark:bg-pink-950/60',
        iconText: 'text-pink-600 dark:text-pink-400',
        iconBorder: 'border-pink-200/80 dark:border-pink-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-pink-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-pink-400/80 dark:hover:border-pink-500/60 hover:shadow-pink-500/10',
        cardTopAccent: 'bg-gradient-to-r from-pink-500 to-rose-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-600 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/25',
      };
    case 'Utilities':
    default:
      return {
        bg: 'bg-amber-500/10 dark:bg-amber-950/40',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/20 dark:border-amber-800/50',
        badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60',
        gradient: 'from-amber-500 via-orange-500 to-yellow-500',
        iconBg: 'bg-amber-50 dark:bg-amber-950/60',
        iconText: 'text-amber-600 dark:text-amber-400',
        iconBorder: 'border-amber-200/80 dark:border-amber-800/60',
        iconHoverBg: 'group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-500/30 group-hover:border-transparent',
        cardBorderHover: 'hover:border-amber-400/80 dark:hover:border-amber-500/60 hover:shadow-amber-500/10',
        cardTopAccent: 'bg-gradient-to-r from-amber-500 to-orange-500',
        launchBadge: 'group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white',
        tabActive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25',
      };
  }
}

const CATEGORY_META: Record<ToolCategory, CategoryMeta> = {
  Compress: {
    title: 'Image Compression Tools',
    subtitle: 'Reduce file sizes up to 85% without sacrificing visual sharpness. Fast & free.',
    icon: Minimize2,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'High Savings',
    bgTint: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  Resize: {
    title: 'Resize & Scale Tools',
    subtitle: 'Scale photos by pixels, percentages, bulk batches, ISO A0–A7 series, passport photos, and 8× enlargers.',
    icon: Maximize2,
    gradient: 'from-sky-500 via-blue-600 to-indigo-600',
    badge: 'Precision Scale',
    bgTint: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  Convert: {
    title: 'Image Compression & Vector Converters',
    subtitle: 'Compress image files up to 85%, and convert seamlessly between JPG, PNG, WebP, SVG, and HEIC in seconds.',
    icon: Repeat,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    badge: 'Compress & Convert',
    bgTint: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  'PDF Tools': {
    title: 'PDF Tools & Document Converters',
    subtitle: 'Merge photos to multi-page PDF, extract PDF pages to JPG/PNG, animate to GIF, and compress PDFs.',
    icon: FileText,
    gradient: 'from-rose-500 via-red-600 to-amber-500',
    badge: 'Multi-Select',
    bgTint: 'bg-rose-50 text-rose-600 border-rose-200',
  },
  'Crop & Edit': {
    title: 'Crop & Creative Studio Tools',
    subtitle: 'Crop images, make photo collages, rotate, mirror flip, and generate viral memes.',
    icon: Crop,
    gradient: 'from-purple-500 via-violet-600 to-pink-500',
    badge: 'Creative Studio',
    bgTint: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  'Social Media': {
    title: 'Social Media Resizers',
    subtitle: 'Pre-formatted dimensions for Instagram posts & stories, YouTube thumbnails, and WhatsApp DP.',
    icon: Camera,
    gradient: 'from-pink-500 via-rose-500 to-amber-500',
    badge: 'Social Presets',
    bgTint: 'bg-pink-50 text-pink-600 border-pink-200',
  },
  Utilities: {
    title: 'Image Utilities & Inspect Tools',
    subtitle: 'Eyedropper pixel color picker, palette extractor, Base64 converters, and dimension inspectors.',
    icon: Sliders,
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    badge: 'Developer Tools',
    bgTint: 'bg-amber-50 text-amber-600 border-amber-200',
  },
};

// Helper to render icon by name
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

export default function ToolsDirectoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const q = searchQuery.toLowerCase().trim();

  // Filter tools based on query & category
  const filteredTools = TOOLS_LIST.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.supportedFormats.some((fmt) => fmt.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  // Categories to render (ordered - Convert on top, PDF Tools right below)
  const orderedCategoryKeys: ToolCategory[] = [
    'Convert',
    'PDF Tools',
    'Resize',
    'Crop & Edit',
    'Social Media',
    'Utilities',
  ];

  const categoriesToDisplay = orderedCategoryKeys.filter((cat) => {
    if (selectedCategory !== 'All' && selectedCategory !== cat) return false;
    return filteredTools.some((t) => t.category === cat);
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors relative overflow-hidden">
      {/* Ambient Multi-Color Background Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/12 via-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/10 via-teal-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 -left-24 w-[500px] h-[500px] bg-gradient-to-tr from-rose-500/10 via-pink-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[550px] h-[550px] bg-gradient-to-t from-sky-500/10 via-blue-500/8 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Top Banner Ad */}
      <div className="max-w-5xl mx-auto px-4 pt-6 relative z-10">
        <AdPlaceholder slot="top-banner" />
      </div>

      {/* Hero Header */}
      <section className="py-12 sm:py-16 text-center max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/60 dark:via-purple-950/60 dark:to-pink-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-4 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          <span>All {TOOLS_LIST.length} Tools &bull; Fast &bull; 100% Free Forever</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Online Image &amp; PDF Tools Directory
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          Browse our organized suite of privacy-first utilities. Compress, resize, convert, edit, and inspect files directly in your browser with zero cloud latency.
        </p>

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${TOOLS_LIST.length} tools... (e.g. compress, a4 resize, pdf, converter, collage)`}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm sm:text-base transition-all"
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
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? TOOLS_LIST.length
                : TOOLS_LIST.filter((t) => t.category === cat).length;
            const isSelected = selectedCategory === cat;
            const theme = cat !== 'All' ? getCategoryTheme(cat as ToolCategory) : null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isSelected
                    ? cat === 'All'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                      : `${theme?.tabActive} scale-105`
                    : 'bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <span>{cat === 'Convert' ? 'Compression & Converters' : cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Grouped Tools Sections */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-16">
        {filteredTools.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-base text-slate-600 dark:text-slate-300 mb-2 font-semibold">
              No tools matched your search &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-400 mb-4">
              Try searching for &quot;compress&quot;, &quot;pdf&quot;, &quot;resize&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          categoriesToDisplay.map((cat, catIdx) => {
            const meta = CATEGORY_META[cat];
            const CategoryIcon = meta.icon;
            const toolsInCat = filteredTools.filter((t) => t.category === cat);

            return (
              <div key={cat} className="space-y-6">
                {/* Main Heading for this tool category */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.gradient} text-white shadow-md shadow-brand-500/15 shrink-0`}
                    >
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {meta.title}
                        </h2>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                          {toolsInCat.length} {toolsInCat.length === 1 ? 'Tool' : 'Tools'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {meta.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${meta.bgTint} font-mono self-start sm:self-end`}>
                    {meta.badge}
                  </span>
                </div>

                {/* Cards Grid under this heading */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {toolsInCat.map((tool) => {
                    const cardTheme = getCategoryTheme(tool.category);
                    return (
                      <div
                        key={tool.id}
                        className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm p-5 shadow-sm ${cardTheme.cardBorderHover} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                      >
                        {/* Top Accent Line on hover */}
                        <div className={`absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 ${cardTheme.cardTopAccent} transition-opacity duration-300`} />

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${cardTheme.iconBg} ${cardTheme.iconText} ${cardTheme.iconBorder} ${cardTheme.iconHoverBg}`}
                            >
                              {getToolIcon(tool.icon)}
                            </div>
                            {tool.badge && (
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${cardTheme.badge} uppercase tracking-wide font-mono`}
                              >
                                {tool.badge}
                              </span>
                            )}
                          </div>

                          <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${cardTheme.text}`}>
                            {tool.category === 'Convert' ? 'Compression & Converter' : tool.category}
                          </span>
                          <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-slate-950 dark:group-hover:text-white transition-colors mt-0.5 mb-1.5">
                            {tool.name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {tool.shortDescription}
                          </p>
                        </div>

                        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-medium">Instant &bull; Free</span>
                          <Link
                            href={tool.slug}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 ${cardTheme.launchBadge} text-xs font-bold transition-all duration-300 shadow-2xs`}
                          >
                            <span>Launch Tool</span>
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}

                  {/* In-Feed Native Card for First Category */}
                  {cat === 'Convert' && (
                    <AdPlaceholder slot="in-feed" label="Featured Media Partner" />
                  )}
                </div>

                {/* Inter-Category Sponsored Banners */}
                {catIdx === 1 && (
                  <div className="pt-6">
                    <AdPlaceholder slot="mid-content" label="Sponsored &bull; High Conversion Banner" />
                  </div>
                )}
                {catIdx === 3 && (
                  <div className="pt-6">
                    <AdPlaceholder slot="in-content" label="Sponsored &bull; Tools Suite Partner" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Bottom Banner Ad */}
        <div className="pt-6">
          <AdPlaceholder slot="bottom-banner" />
        </div>
      </section>
    </div>
  );
}
