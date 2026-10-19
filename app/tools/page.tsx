import { Metadata } from 'next';
import Link from 'next/link';
import { TOOLS_LIST, ToolCategory } from '@/src/data/toolsList';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
  Minimize2,
  Maximize2,
  Repeat,
  Crop,
  FileText,
  Sliders,
  Camera,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Free Online Image & Document Tools | PixEnhance Studio',
  description:
    'Explore 60+ free online image and document tools. Compress, resize, convert, edit, and upscale photos directly in your browser with complete privacy.',
  alternates: {
    canonical: 'https://pixenhance.in/tools',
  },
  openGraph: {
    title: 'All Free Online Image & Document Tools | PixEnhance Studio',
    description:
      'Explore 60+ free online image and document tools. Fast, browser-native, and 100% private with zero cloud uploads.',
    url: 'https://pixenhance.in/tools',
    siteName: 'PixEnhance',
    type: 'website',
    images: [
      {
        url: 'https://pixenhance.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixEnhance Tools Directory',
      },
    ],
  },
};

const CATEGORIES_INFO: Array<{
  id: ToolCategory;
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badge: string;
}> = [
  {
    id: 'Compress',
    slug: 'compress',
    title: 'Image Compression',
    description: 'Reduce file sizes up to 85% for web speed and strict upload portals.',
    icon: Minimize2,
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'High Savings',
  },
  {
    id: 'Convert',
    slug: 'convert',
    title: 'Image Converters',
    description: 'Convert between JPG, PNG, WebP, SVG, and Apple HEIC with zero quality loss.',
    icon: Repeat,
    gradient: 'from-emerald-500 to-teal-600',
    badge: 'Format Conversion',
  },
  {
    id: 'Resize',
    slug: 'resize',
    title: 'Resize & Scale Tools',
    description: 'Scale photos by pixel dimensions, percentages, and standard ISO A-series paper formats.',
    icon: Maximize2,
    gradient: 'from-sky-500 to-blue-600',
    badge: 'Precision Scale',
  },
  {
    id: 'Crop & Edit',
    slug: 'crop-edit',
    title: 'Crop & Photo Editing',
    description: 'Precision aspect-ratio cropping, photo collages, multi-panel splitting, and rotations.',
    icon: Crop,
    gradient: 'from-purple-500 to-pink-600',
    badge: 'Photo Studio',
  },
  {
    id: 'PDF Tools',
    slug: 'pdf-tools',
    title: 'PDF & Document Tools',
    description: 'Convert images to PDF, compress PDF documents, and extract pages to images.',
    icon: FileText,
    gradient: 'from-rose-500 to-red-600',
    badge: 'Document Tools',
  },
  {
    id: 'Social Media',
    slug: 'social-media',
    title: 'Social Media Resizers',
    description: 'Exact preset dimensions for Instagram posts, YouTube thumbnails, and WhatsApp DP.',
    icon: Camera,
    gradient: 'from-pink-500 to-rose-600',
    badge: 'Social Presets',
  },
  {
    id: 'Utilities',
    slug: 'utilities',
    title: 'Developer & Media Utilities',
    description: 'Base64 encoders, pixel color pickers, and code-to-image mockup generators.',
    icon: Sliders,
    gradient: 'from-amber-500 to-orange-600',
    badge: 'Utilities',
  },
];

interface ToolsHubPageProps {
  searchParams?: Promise<{ q?: string }>;
}

export default async function ToolsHubPage({ searchParams }: ToolsHubPageProps) {
  const sp = searchParams ? await searchParams : {};
  const query = (sp.q || '').toLowerCase().trim();

  const filteredTools = query
    ? TOOLS_LIST.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.shortDescription.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.supportedFormats.some((fmt) => fmt.toLowerCase().includes(query))
      )
    : TOOLS_LIST;

  const toolsJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://pixenhance.in/tools#webpage',
        url: 'https://pixenhance.in/tools',
        name: query ? `Search results for "${query}" | Tools Directory` : 'All Free Online Image & Document Tools',
        description:
          'Directory of 60+ browser-native image compression, resizing, conversion, and editing utilities.',
        isPartOf: {
          '@id': 'https://pixenhance.in/#website',
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://pixenhance.in/tools#itemlist',
        name: 'PixEnhance Image & Document Tools Catalog',
        itemListElement: filteredTools.map((tool, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: tool.name,
          url: `https://pixenhance.in${tool.slug}`,
          description: tool.shortDescription,
        })),
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs customItems={[{ name: 'Tools Directory', url: 'https://pixenhance.in/tools' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {query ? `Filter: "${query}" (${filteredTools.length} found)` : `Complete Directory • ${TOOLS_LIST.length} Free Utilities`}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {query ? `Search: "${query}"` : 'All Image & Document Tools'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Every tool runs completely client-side in your web browser. No file uploads, no wait queues, and zero account registration required.
          </p>

          {/* Search Form */}
          <form action="/tools" method="GET" className="max-w-xl mx-auto relative pt-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search tools (e.g. compress, a4, pdf, converter)..."
              className="w-full px-5 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:border-indigo-500 shadow-2xs"
            />
          </form>

          {query && (
            <div className="pt-2">
              <Link
                href="/tools"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Clear search filter &bull; View all {TOOLS_LIST.length} tools
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES_INFO.map((cat) => (
              <a
                key={cat.slug}
                href={`#cat-${cat.slug}`}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>

        {/* Categorized Tools Grid */}
        <div className="space-y-14 pt-4">
          {CATEGORIES_INFO.map((cat) => {
            const CatIcon = cat.icon;
            const categoryTools = TOOLS_LIST.filter(
              (t) => t.category === cat.id || (cat.id === 'Convert' && t.category === 'Compress')
            );

            return (
              <section key={cat.slug} id={`cat-${cat.slug}`} className="space-y-6 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-md shadow-indigo-500/10 shrink-0`}
                    >
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          {cat.title}
                        </h2>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                          {categoryTools.length} {categoryTools.length === 1 ? 'Tool' : 'Tools'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/tools/${cat.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Explore {cat.title} Hub</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.slug}
                      className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all duration-200"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tool.name}
                          </h3>
                          {tool.badge && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                          {tool.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        <span>Open Tool</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Client-Side Security Assurance */}
        <div className="rounded-3xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              100% In-Browser Confidentiality
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              PixEnhance executes image transformations in your local memory using modern HTML5 Canvas, Web Workers, and WebAssembly. Your photos and personal records are never uploaded to remote servers.
            </p>
          </div>
          <Link
            href="/privacy"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
          >
            Review Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
