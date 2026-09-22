'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  Repeat,
  Maximize2,
  FileText,
  Crop,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ToolSearchModal } from './ToolSearchModal';

interface NavToolItem {
  name: string;
  slug: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
}

interface NavCategory {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  count: number;
  gradient: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  tools: NavToolItem[];
  exploreLink: string;
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'convert',
    label: 'Convert',
    heading: 'Compression & Converters',
    subheading: 'Lossless compression & cross-format conversion',
    count: 10,
    gradient: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: Repeat,
    exploreLink: '/tools?category=Convert',
    tools: [
      { name: 'Image Compressor', slug: '/image-compressor', desc: 'Shrink file sizes up to 85%', badge: 'Popular', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
      { name: 'Universal Converter', slug: '/image-converter', desc: 'Convert between all image formats', badge: 'Multi', badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
      { name: 'JPG to PNG', slug: '/jpg-to-png', desc: 'Convert JPG to transparent lossless PNG' },
      { name: 'PNG to JPG', slug: '/png-to-jpg', desc: 'Convert PNG with white background fallback' },
      { name: 'WebP to JPG', slug: '/webp-to-jpg', desc: 'Convert WebP photos to universal JPG' },
      { name: 'PNG to WebP', slug: '/png-to-webp', desc: 'Convert PNG to modern lightweight WebP' },
      { name: 'SVG Converter', slug: '/svg-converter', desc: 'Convert vector SVG to PNG or JPG' },
      { name: 'PNG to SVG', slug: '/png-to-svg', desc: 'Vectorize logos & drawings to SVG', badge: 'Vector', badgeColor: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' },
      { name: 'HEIC to JPG', slug: '/heic-to-jpg', desc: 'Convert Apple iPhone HEIC/HEIF photos', badge: 'Apple', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
      { name: 'Compress PDF', slug: '/compress-pdf', desc: 'Reduce PDF document file size quickly' },
    ],
  },
  {
    id: 'pdf',
    label: 'PDF Tools',
    heading: 'PDF Tools & Document Converters',
    subheading: 'PDF to Word, Word to PDF, image merge & extract',
    count: 10,
    gradient: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    icon: FileText,
    exploreLink: '/tools?category=PDF+Tools',
    tools: [
      { name: 'PDF to Word (.docx)', slug: '/pdf-to-word', desc: 'Convert PDF to editable Word document', badge: 'Hot', badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
      { name: 'Word to PDF', slug: '/word-to-pdf', desc: 'Convert DOCX Word documents to PDF', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
      { name: 'Image to PDF', slug: '/image-to-pdf', desc: 'Batch merge multiple images into one PDF', badge: 'Multi-Select', badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
      { name: 'JPG to PDF', slug: '/jpg-to-pdf', desc: 'Convert JPG camera photos into a PDF' },
      { name: 'PNG to PDF', slug: '/png-to-pdf', desc: 'Convert PNG graphics & screenshots to PDF' },
      { name: 'PDF to JPG', slug: '/pdf-to-jpg', desc: 'Extract PDF pages as high-res JPG files', badge: 'Extract', badgeColor: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' },
      { name: 'PDF to PNG', slug: '/pdf-to-png', desc: 'Extract pages as crisp lossless PNGs' },
      { name: 'PDF to Animated GIF', slug: '/pdf-to-gif', desc: 'Turn PDF slides into looping animated GIF', badge: 'GIF', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
      { name: 'Compress PDF', slug: '/compress-pdf', desc: 'Reduce PDF file size up to 75%' },
      { name: 'PDF Converter Hub', slug: '/pdf-converter', desc: 'Central studio for all PDF transformations' },
    ],
  },
  {
    id: 'resize',
    label: 'Resize',
    heading: 'Resize & Scale Tools',
    subheading: 'Pixel dimensions, DPI scaling & ISO paper standards',
    count: 7,
    gradient: 'from-sky-500 to-blue-600',
    badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    icon: Maximize2,
    exploreLink: '/tools?category=Resize',
    tools: [
      { name: 'Image Resizer', slug: '/image-resizer', desc: 'Resize by exact pixels or percentage', badge: 'Popular', badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
      { name: 'Bulk Image Resizer', slug: '/bulk-image-resizer', desc: 'Batch scale multiple files with ZIP export', badge: 'ZIP', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
      { name: 'Image Enlarger (8×)', slug: '/image-enlarger', desc: 'Upscale 2× to 8× with sharpness recovery', badge: '8× AI', badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
      { name: 'A4 Paper Resizer', slug: '/a4-image-resizer', desc: '210 × 297 mm at 300 DPI print quality', badge: 'Print', badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
      { name: 'A0–A7 Print Series', slug: '/a3-image-resizer', desc: 'All ISO standard paper sizes (A0 to A7)' },
      { name: 'Passport Photo Resizer', slug: '/passport-photo-resizer', desc: '2×2 inch & 35×45 mm official photos', badge: 'Official', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
      { name: 'Aspect Ratio Calculator', slug: '/aspect-ratio-calculator', desc: 'Compute 16:9, 4:3, 1:1 dimension ratios' },
    ],
  },
  {
    id: 'crop',
    label: 'Crop & Edit',
    heading: 'Crop & Creative Studio',
    subheading: 'Precision crop box, photo collages & meme generation',
    count: 6,
    gradient: 'from-purple-500 to-pink-600',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    icon: Crop,
    exploreLink: '/tools?category=Crop+%26+Edit',
    tools: [
      { name: 'Crop Image', slug: '/crop-image', desc: 'Custom crop box & ratio presets (16:9, 1:1)', badge: 'Popular', badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
      { name: 'Collage Maker', slug: '/collage-maker', desc: 'Combine 2–9 photos in modern grid layouts', badge: 'New', badgeColor: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300' },
      { name: 'Flip Image', slug: '/flip-image', desc: 'Horizontal & vertical mirror reflection' },
      { name: 'Rotate Image', slug: '/rotate-image', desc: 'Rotate by 90°, 180° or any custom angle' },
      { name: 'Meme Generator', slug: '/meme-generator', desc: 'Viral Impact font meme maker with captions', badge: 'Viral', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
      { name: 'Social Media Resizers', slug: '/instagram-image-resizer', desc: 'Presets for Instagram, YouTube, and WhatsApp' },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilities',
    heading: 'Developer & Pixel Utilities',
    subheading: 'Code converter, snippet to image, base64 & palette tools',
    count: 7,
    gradient: 'from-amber-500 to-orange-600',
    badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    icon: Sliders,
    exploreLink: '/tools?category=Utilities',
    tools: [
      { name: 'Code Converter', slug: '/code-converter', desc: 'Code to Image + JSON, TS, YAML, JSX converter', badge: 'New', badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' },
      { name: 'Code to Image', slug: '/code-to-image', desc: 'Carbon & Ray style code screenshot generator', badge: 'Studio', badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' },
      { name: 'Color Picker & Loupe', slug: '/color-picker', desc: 'Magnifier pixel loupe & HEX/RGB palette', badge: 'Loupe', badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
      { name: 'Image to Base64', slug: '/image-to-base64', desc: 'Convert image to Data URI code string' },
      { name: 'Base64 to Image', slug: '/base64-to-image', desc: 'Decode base64 string back into image file' },
      { name: 'Dimensions Inspector', slug: '/image-dimensions', desc: 'Inspect exact pixel dimensions & ratio' },
      { name: 'Quality Adjuster', slug: '/image-quality-adjuster', desc: 'Tune compression balance & visual clarity' },
    ],
  },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string>('convert');

  const navContainerRef = useRef<HTMLElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('pixenhance-theme');
    if (
      savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pixenhance-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pixenhance-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Keyboard shortcut Ctrl+K to open search & Esc to close active dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close active dropdown when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <div className="mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/"
              onClick={closeDropdowns}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Pix<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">Enhance</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                  Online Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links: INDIVIDUAL DEDICATED DROPDOWNS FOR EACH CATEGORY */}
            <nav
              ref={navContainerRef}
              className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300"
              aria-label="Main Navigation"
            >
              {NAV_CATEGORIES.map((cat) => {
                const isOpen = activeDropdown === cat.id;
                const Icon = cat.icon;

                // Dynamic alignment to prevent right-overflow on narrower desktop displays
                const alignmentClass =
                  cat.id === 'convert'
                    ? 'left-0'
                    : cat.id === 'pdf'
                      ? 'left-0 sm:left-2'
                      : cat.id === 'resize'
                        ? 'left-1/2 -translate-x-1/3'
                        : cat.id === 'crop'
                          ? 'left-1/2 -translate-x-1/2'
                          : 'right-0';

                return (
                  <div key={cat.id} className="relative">
                    {/* Category Nav Button */}
                    <button
                      type="button"
                      onClick={() => toggleDropdown(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${isOpen
                          ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                        }`}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      <Icon className="h-3.5 w-3.5 opacity-70" />
                      <span>{cat.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'opacity-50'
                          }`}
                      />
                    </button>

                    {/* ========================================================================= */}
                    {/* DEDICATED CATEGORY DROPDOWN: SOLID WHITE BG & HIGH Z-INDEX (z-50)         */}
                    {/* ========================================================================= */}
                    {isOpen && (
                      <div
                        className={`absolute top-full ${alignmentClass} mt-2 w-80 sm:w-[360px] max-h-[480px] overflow-hidden flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/20 dark:shadow-black/70 z-50 animate-in fade-in zoom-in-95 duration-150`}
                      >
                        {/* Dropdown Header */}
                        <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-lg bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center shadow-xs shrink-0`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                                {cat.heading}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                                {cat.subheading}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${cat.badgeColor}`}
                          >
                            {cat.count} Tools
                          </span>
                        </div>

                        {/* Dropdown Scrollable Tool Links */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                          {cat.tools.map((tool) => (
                            <Link
                              key={tool.slug}
                              href={tool.slug}
                              onClick={closeDropdowns}
                              className="group flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors block truncate">
                                  {tool.name}
                                </span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                                  {tool.desc}
                                </span>
                              </div>
                              {tool.badge && (
                                <span
                                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 ${tool.badgeColor || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                    }`}
                                >
                                  {tool.badge}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>

                        {/* Dropdown Footer Callout */}
                        <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Fast &bull; Private</span>
                          </span>
                          <Link
                            href={cat.exploreLink}
                            onClick={closeDropdowns}
                            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 text-[11px]"
                          >
                            <span>Explore Category</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Direct "All Tools" Directory Link */}
              <Link
                href="/tools"
                onClick={closeDropdowns}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              >
                <span>All Tools</span>
                <span className="px-1.5 py-0.2 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-[10px] font-mono font-extrabold">
                  40+
                </span>
              </Link>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/90 text-xs text-slate-500 dark:text-slate-400 hover:border-indigo-400 transition-all shadow-2xs"
              aria-label="Search all tools"
            >
              <Search className="h-3.5 w-3.5 text-indigo-500" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-mono">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle light and dark theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Accordion Sections */}
        {isMobileMenuOpen && (
          <div className="lg:hidden max-h-[80vh] overflow-y-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-8 space-y-3 z-50">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Categorized Tools
              </span>
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1"
              >
                <span>All 40+ Tools</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {NAV_CATEGORIES.map((cat) => {
              const isExpanded = mobileExpandedCat === cat.id;
              const CatIcon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
                >
                  <button
                    onClick={() =>
                      setMobileExpandedCat(isExpanded ? '' : cat.id)
                    }
                    className="w-full flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center`}
                      >
                        <CatIcon className="w-3 h-3" />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200">
                        {cat.heading}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {cat.count}
                      </span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                          }`}
                      />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-2 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                      {cat.tools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={tool.slug}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <div>
                            <span className="text-slate-800 dark:text-slate-200 font-semibold block">
                              {tool.name}
                            </span>
                            <span className="text-[10px] text-slate-400 line-clamp-1">
                              {tool.desc}
                            </span>
                          </div>
                          {tool.badge && (
                            <span
                              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${tool.badgeColor || 'bg-slate-100 text-slate-600'
                                }`}
                            >
                              {tool.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <ToolSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
