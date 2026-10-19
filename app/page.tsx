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
  Cpu,
  Eye,
  AlertTriangle,
  HelpCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { AdBanner } from '@/components/common/AdBanner';
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

interface CategoryMeta {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badge: string;
  accentColor: string;
  badgeStyle: string;
  hubSlug: string;
}

const CATEGORY_META: Record<ToolCategory, CategoryMeta> = {
  Compress: {
    title: 'Image Compression',
    subtitle: 'Reduce file sizes up to 85% without visible loss of sharpness.',
    icon: Minimize2,
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    badge: 'High Savings',
    badgeStyle: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    hubSlug: 'compress',
  },
  Convert: {
    title: 'Compression & Image Converters',
    subtitle: 'Convert between JPG, PNG, WebP, SVG, and Apple HEIC in fractions of a second.',
    icon: Repeat,
    gradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    badge: 'Compress & Convert',
    badgeStyle: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    hubSlug: 'convert',
  },
  'PDF Tools': {
    title: 'PDF Tools & Document Converters',
    subtitle: 'Merge images into multi-page PDF, extract PDF pages, and compress documents.',
    icon: FileText,
    gradient: 'from-rose-500 to-red-600',
    accentColor: 'rose',
    badge: 'Document Tools',
    badgeStyle: 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    hubSlug: 'pdf-tools',
  },
  Resize: {
    title: 'Resize & Scale Tools',
    subtitle: 'Scale photos by pixel dimensions, percentages, and ISO A-series paper formats.',
    icon: Maximize2,
    gradient: 'from-sky-500 to-blue-600',
    accentColor: 'sky',
    badge: 'Precision Scale',
    badgeStyle: 'bg-sky-50 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    hubSlug: 'resize',
  },
  'Crop & Edit': {
    title: 'Crop & Photo Editing',
    subtitle: 'Precision crop ratios, multi-photo collages, rotations, and grid splitting.',
    icon: Crop,
    gradient: 'from-purple-500 to-pink-600',
    accentColor: 'purple',
    badge: 'Photo Studio',
    badgeStyle: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    hubSlug: 'crop-edit',
  },
  'Social Media': {
    title: 'Social Media Resizers',
    subtitle: 'Verified dimension presets for Instagram posts, YouTube thumbnails, and WhatsApp DP.',
    icon: Camera,
    gradient: 'from-pink-500 to-rose-600',
    accentColor: 'pink',
    badge: 'Social Presets',
    badgeStyle: 'bg-pink-50 text-pink-700 dark:bg-pink-950/80 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    hubSlug: 'social-media',
  },
  Utilities: {
    title: 'Developer & Media Utilities',
    subtitle: 'Base64 image encoding, pixel color pickers, and code screenshot generators.',
    icon: Sliders,
    gradient: 'from-amber-500 to-orange-600',
    accentColor: 'amber',
    badge: 'Developer Tools',
    badgeStyle: 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    hubSlug: 'utilities',
  },
};

function getToolIcon(iconName: string) {
  switch (iconName) {
    case 'Minimize2': return <Minimize2 className="h-5 w-5" />;
    case 'Maximize2': return <Maximize2 className="h-5 w-5" />;
    case 'Crop': return <Crop className="h-5 w-5" />;
    case 'Repeat': return <Repeat className="h-5 w-5" />;
    case 'FileImage': return <FileImage className="h-5 w-5" />;
    case 'Sparkles': return <Sparkles className="h-5 w-5" />;
    case 'Layers': return <Layers className="h-5 w-5" />;
    case 'RefreshCw': return <RefreshCw className="h-5 w-5" />;
    case 'RotateCw': return <RotateCw className="h-5 w-5" />;
    case 'FlipHorizontal': return <FlipHorizontal className="h-5 w-5" />;
    case 'LayoutGrid': return <LayoutGrid className="h-5 w-5" />;
    case 'ZoomIn': return <ZoomIn className="h-5 w-5" />;
    case 'Pipette': return <Pipette className="h-5 w-5" />;
    case 'Smile': return <Smile className="h-5 w-5" />;
    case 'Code': return <Code className="h-5 w-5" />;
    case 'Play': return <Play className="h-5 w-5" />;
    case 'Info': return <Info className="h-5 w-5" />;
    case 'Calculator': return <Calculator className="h-5 w-5" />;
    case 'Printer': return <Printer className="h-5 w-5" />;
    case 'UserCheck': return <UserCheck className="h-5 w-5" />;
    case 'Camera': return <Camera className="h-5 w-5" />;
    case 'Video': return <Video className="h-5 w-5" />;
    case 'MessageCircle': return <MessageCircle className="h-5 w-5" />;
    case 'Sliders': return <Sliders className="h-5 w-5" />;
    case 'Code2': return <Code2 className="h-5 w-5" />;
    case 'FileCode': return <FileCode className="h-5 w-5" />;
    case 'FileText': return <FileText className="h-5 w-5" />;
    default: return <Sparkles className="h-5 w-5" />;
  }
}

function ClassicToolCard({ tool }: { tool: ToolItem }) {
  const meta = CATEGORY_META[tool.category] || CATEGORY_META['Utilities'];

  return (
    <Link
      href={tool.slug}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div>
        <div className="flex items-center justify-between mb-5">
          <div className={`p-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} text-white shadow-md shadow-indigo-500/15 group-hover:scale-110 transition-transform duration-300`}>
            {getToolIcon(tool.icon)}
          </div>
          {tool.badge && (
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full font-mono border ${meta.badgeStyle} shadow-2xs`}>
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-2">
          {tool.name}
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal line-clamp-2 mb-4">
          {tool.shortDescription}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {(tool.supportedFormats || []).slice(0, 3).map((fmt, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-200/70 dark:border-slate-700/70"
            >
              {fmt}
            </span>
          ))}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-2xs shrink-0 ml-2">
          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
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
      tool.supportedFormats?.some((fmt) => fmt.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const homeFaqs = [
    {
      question: 'How does client-side image processing protect my privacy?',
      answer:
        'Unlike cloud-based services that upload your pictures to remote servers, PixEnhance executes all compression, format conversion, and resizing algorithms directly in your browser using modern HTML5 Canvas, Web Workers, and WebAssembly. Your photos and confidential documents stay entirely in your device’s volatile memory (RAM) and are never transmitted over the network or saved to remote databases.',
    },
    {
      question: 'What is the difference between AI super-resolution and traditional bicubic resizing?',
      answer:
        'Traditional bicubic or bilinear interpolation scales an image by calculating mathematical weighted averages between existing adjacent pixels, which smooths the grid but causes blurriness and soft edges. Deep neural super-resolution (such as Real-ESRGAN running locally via ONNX Runtime Web) analyzes trained convolutional feature patterns to reconstruct realistic high-frequency textures—such as hair strands, text boundaries, and fabric weaves—producing noticeably crisper details.',
    },
    {
      question: 'How does edge-preserving bilateral denoising work?',
      answer:
        'Standard blurring filters smooth noise by averaging all neighboring pixels, which inadvertently blurs sharp boundaries. Bilateral filtering evaluates two factors simultaneously: spatial distance (how close a pixel is) and radiometric photometric difference (how similar the pixel color is). When neighboring pixels have high contrast differences (an edge), their smoothing weight drops exponentially, eliminating grain on flat surfaces while keeping edges sharp.',
    },
    {
      question: 'What are the realistic limitations of image upscaling?',
      answer:
        'No algorithm can magically invent detail that has been entirely lost. If a face or license plate is reduced to a tiny 5×5 pixel blur, super-resolution cannot reliably reconstruct the authentic original identity without hallucinating synthetic patterns. Best results are obtained when starting from clean, uncompressed PNG or high-bitrate WebP sources with at least moderate resolution.',
    },
    {
      question: 'What is the maximum file size supported by PixEnhance?',
      answer:
        'Because processing runs on your local computer or phone hardware, you can comfortably process large images up to 50MB and canvas dimensions up to 16,000 pixels wide without waiting in upload queues. For mobile devices with lower available memory, we recommend staying below 25MB per file for smooth performance.',
    },
    {
      question: 'Is PixEnhance completely free to use?',
      answer:
        'Yes. All utilities on PixEnhance are 100% free with no account registrations, no paid subscriptions, no credits, and zero watermarks applied to your exported images.',
    },
  ];

  // Google Rich Snippets SEO Schema (Compliant & Honest)
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://pixenhance.in/#website',
        url: 'https://pixenhance.in',
        name: 'PixEnhance',
        alternateName: ['PixEnhance Studio', 'pixenhance.in'],
        description:
          'Free in-browser image enhancement, AI super-resolution, compression, resizing, and format conversion studio.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://pixenhance.in/tools?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://pixenhance.in/#tools-directory',
        name: 'Featured Image and PDF Tools',
        itemListElement: TOOLS_LIST.slice(0, 20).map((tool, idx) => ({
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

  const getCategoryCount = (cat: ToolCategory | 'All') => {
    if (cat === 'All') return TOOLS_LIST.length;
    return TOOLS_LIST.filter((t) => t.category === cat).length;
  };

  return (
    <div className="w-full min-h-screen bg-[#E5EBF2] dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors relative overflow-hidden bg-grid-pattern">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[550px] h-[550px] bg-gradient-to-bl from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 1. Hero Section */}
      <section className="relative z-10 overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-18 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white/90 via-[#E5EBF2]/50 to-[#E5EBF2] dark:from-[#0b0f1d] dark:via-indigo-950/30 dark:to-[#070b14] backdrop-blur-md">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono mb-4 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>100% In-Browser &bull; Zero Server Uploads &bull; Free &amp; Private</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
            Free Online{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
              Image Enhancement &amp; Editing Studio
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-normal">
            Enhance, upscale, compress, resize, and convert your photos and documents with hardware-accelerated algorithms. All processing executes securely in your browser with complete privacy.
          </p>

          {/* Featured Studios Quick Navigation Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
            <Link
              href="/image-resizer"
              className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Image Resizer</span>
                <Maximize2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Scale by pixels, % &amp; A4 print DPI</p>
            </Link>

            <Link
              href="/image-compressor"
              className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Image Compressor</span>
                <Minimize2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Hit exact KB targets (20KB, 50KB)</p>
            </Link>

            <Link
              href="/image-converter"
              className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Format Converter</span>
                <Repeat className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">JPG, PNG, WebP, SVG &amp; HEIC</p>
            </Link>

            <Link
              href="/image-to-pdf"
              className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">PDF Converter</span>
                <FileText className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Merge pictures into PDF &amp; compress</p>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${TOOLS_LIST.length} tools... (e.g. compress, a4 resize, pdf, converter)`}
              className="w-full pl-12 pr-16 py-3.5 rounded-2xl border-2 border-indigo-200/90 dark:border-indigo-900/70 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 shadow-md focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/15 text-sm sm:text-base transition-all"
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

          {/* Dynamic Category Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                      : 'bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-indigo-300 shadow-2xs font-semibold'
                  }`}
                >
                  <span>{cat === 'Convert' ? 'Compression & Converters' : cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-current'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Categorized Tools Directory */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
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

              return (
                <div key={cat} className="space-y-6">
                  {/* Category Header */}
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
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                            {toolsInCat.length} {toolsInCat.length === 1 ? 'Tool' : 'Tools'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {meta.subtitle}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/tools/${meta.hubSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity"
                    >
                      <span>Explore all {meta.title}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {/* 4-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {toolsInCat.map((tool) => (
                      <ClassicToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            })
        )}
      </section>

      {/* Mid Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner slot="home-mid-banner" />
      </div>

      {/* 3. Deep Educational Section: The Science of Image Enhancement */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            Technical Guide &bull; How PixEnhance Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            Understanding Digital Image Enhancement
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            From deep learning super-resolution to convolution-based sharpening and bilateral noise reduction, learn how modern algorithms transform visual fidelity without leaving your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Module 1: Super-Resolution vs Interpolation */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Super-Resolution vs. Traditional Interpolation
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Deep Learning vs Mathematical Resampling</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Standard resampling methods—such as Bilinear, Bicubic, or Lanczos-3—scale an image by mathematically estimating intermediate pixel values between known coordinates. While effective for simple enlargements, interpolation softens high-contrast edges and cannot add high-frequency information.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              In contrast, deep neural super-resolution models (like Real-ESRGAN running in WebAssembly and WebGPU) analyze learned feature maps to reconstruct authentic textural patterns—such as fabric weaves, fine hair, architectural details, and crisp lettering—yielding true visual clarity.
            </p>
          </div>

          {/* Module 2: Bilateral Denoising */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Edge-Preserving Bilateral Denoising
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Spatial &amp; Radiometric Filtering</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Traditional Gaussian blurring averages all neighboring pixels uniformly, which suppresses digital sensor noise but smears fine object outlines and text.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Bilateral filtering solves this by combining two Gaussian kernels: one measuring geometric spatial distance and another measuring radiometric color similarity. If a neighbor pixel has a significantly different luminance or color value (indicating an edge), its weight drops exponentially. Flat, noisy backgrounds are smoothed cleanly while subject edges remain crisp.
            </p>
          </div>

          {/* Module 3: Unsharp Masking Sharpening */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Convolution-Based Unsharp Masking
                </h3>
                <span className="text-[11px] font-mono text-slate-400">High-Pass Frequency Amplification</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Image sharpening does not generate new data; it increases local acutance (perceived sharpness) by boosting contrast along high-frequency gradient boundaries.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              PixEnhance implements a 3×3 unsharp masking convolution kernel that subtracts a smoothed version of the image from the original to isolate high frequencies, then amplifies those edges with controlled strength. This sharpens eyes, typography, and textures without creating halo artifacts or amplifying background grain.
            </p>
          </div>

          {/* Module 4: Face Enhancement */}
          <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Selective Facial Feature Enhancement
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Skin Smoothing &amp; Eye Contrast</span>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Portraits require specialized handling to prevent skin textures from becoming either overly noisy or unnaturally plastic.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our client-side face enhancement engine analyzes skin-tone clusters and applies selective micro-smoothing across low-variance cheek and forehead surfaces, while simultaneously preserving or boosting contrast around irises, eyelashes, and lip contours—preserving authentic personal identity.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Client-Side Lifecycle & Privacy Workflow */}
      <section className="py-16 relative overflow-hidden bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              Zero-Cloud Execution Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
              How Your Files Are Processed
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
              Step-by-step breakdown of how PixEnhance manipulates files purely inside your browser memory.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'In-Memory File Ingestion',
                desc: 'When you drop a file, the HTML5 File API and URL.createObjectURL load raw binary data into your browser’s volatile RAM. No file packets are sent over the internet.',
                gradient: 'from-emerald-500 to-teal-600',
              },
              {
                step: '02',
                title: 'Hardware-Accelerated Canvas',
                desc: 'The image renders into an OffscreenCanvas. Pixel data is converted into a 32-bit Uint8ClampedArray for high-speed parallel manipulation across CPU and GPU cores.',
                gradient: 'from-sky-500 to-blue-600',
              },
              {
                step: '03',
                title: 'WebAssembly Inference',
                desc: 'Quantization, bicubic resampling, and neural super-resolution models run via WebAssembly and WebGPU threads, completing transformations in milliseconds.',
                gradient: 'from-purple-500 to-pink-600',
              },
              {
                step: '04',
                title: 'Direct Client Download',
                desc: 'The optimized canvas is serialized via canvas.toBlob() and saved straight to your computer’s disk. Memory buffers are immediately garbage-collected.',
                gradient: 'from-amber-500 to-orange-600',
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white font-mono font-black text-sm shadow-md mb-4 group-hover:scale-105 transition-transform`}
                >
                  {step.step}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Realistic Technical Limitations & Practical Tips */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-3xl border border-amber-300/80 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/20 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white font-bold shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Realistic Technical Limitations &amp; Practical Tips
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Honest engineering guidelines to help you achieve the best possible results.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Severe Pixelation Limits
              </h3>
              <p>
                Enhancement algorithms cannot accurately reconstruct information that has been completely destroyed. If a face or vehicle plate is smaller than 12×12 pixels, upscaling will generate smoothed approximations rather than verifiable photographic facts.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Input Quality Matters
              </h3>
              <p>
                Heavily re-compressed JPEG files containing 8×8 block artifacts require gentle denoising before upscaling. For superior clarity, always upload original PNG, lossless WebP, or high-bitrate camera photos.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Client Device Memory
              </h3>
              <p>
                Because all processing executes on your device, images larger than 12,000 pixels wide require significant RAM. If your browser runs out of memory, try scaling in smaller increments or closing background tabs.
              </p>
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
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
            Answers to common questions regarding PixEnhance image processing, privacy, and technical features.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
          {homeFaqs.map((faq, idx) => (
            <details key={idx} className="group py-4" open={idx === 0}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between text-left text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-indigo-600 shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
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
