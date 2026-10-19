import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface CategoryConfig {
  id: ToolCategory;
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  features: string[];
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_MAP: Record<string, CategoryConfig> = {
  compress: {
    id: 'Compress',
    slug: 'compress',
    name: 'Image Compression',
    h1: 'Free Online Image Compression Tools',
    metaTitle: 'Free Online Image Compressor Tools — Compress JPG, PNG, WebP | PixEnhance',
    metaDescription:
      'Compress JPG, PNG, and WebP images online with visually lossless quality. Hit exact file sizes like 20KB, 50KB, and 100KB with 100% in-browser privacy.',
    intro:
      'Optimize digital graphics and documents with precision client-side compression. Whether you are submitting online government forms (SSC, UPSC, State PSC) requiring files under 20KB or 50KB, or optimizing web imagery for blazing fast page loads, our compression tools preserve sharpness while reducing file weight by up to 85%.',
    features: [
      'Target KB file size solver with automatic binary search',
      'Dual lossy and visually lossless quantizer algorithms',
      '100% private in-browser execution with zero server upload',
      'Interactive before and after comparison preview',
    ],
    gradient: 'from-emerald-500 to-teal-600',
    icon: Minimize2,
  },
  convert: {
    id: 'Convert',
    slug: 'convert',
    name: 'Image Converters',
    h1: 'Free Online Image & Format Converters',
    metaTitle: 'Free Online Image Converters — JPG, PNG, WebP, SVG, HEIC | PixEnhance',
    metaDescription:
      'Convert between modern and legacy image formats online for free. Transform JPG, PNG, WebP, SVG, and iPhone HEIC photos directly inside your browser.',
    intro:
      'Seamlessly convert digital images across popular formats with zero quality degradation. Our converters leverage native browser hardware acceleration, meaning your files never leave your computer and convert in fractions of a second with preserved color profiles and transparency.',
    features: [
      'Lossless alpha channel transparency preservation',
      'Instant Apple iPhone HEIC and HEIF to universal JPG conversion',
      'Raster to vector SVG tracing and conversion',
      'Zero cloud storage risks or file transfer delays',
    ],
    gradient: 'from-emerald-500 to-teal-600',
    icon: Repeat,
  },
  resize: {
    id: 'Resize',
    slug: 'resize',
    name: 'Image Resizers',
    h1: 'Free Online Image & Photo Resizers',
    metaTitle: 'Free Online Image Resizer Tools — Scale Photos by Pixels & DPI | PixEnhance',
    metaDescription:
      'Resize images by width, height, percentage, or standard print formats (A0 to A7) with high-fidelity resampling and aspect ratio locking.',
    intro:
      'Scale photographs and graphics with pixel-level precision. Choose from popular dimensions like 1080×1080 and 1920×1080, standard international ISO paper sizes (A0 to A7 at 300 DPI print quality), or custom percentage scaling with locked aspect ratios.',
    features: [
      'High-precision bicubic and Lanczos resampling algorithms',
      'Aspect ratio constraint lock to prevent warping or distortion',
      'ISO international paper sizes (A0–A7) at 300 DPI print standards',
      'Bulk image resizer with ZIP archive export',
    ],
    gradient: 'from-sky-500 to-blue-600',
    icon: Maximize2,
  },
  'crop-edit': {
    id: 'Crop & Edit',
    slug: 'crop-edit',
    name: 'Crop & Photo Editing',
    h1: 'Free Online Photo Crop & Editing Tools',
    metaTitle: 'Free Online Photo Crop & Edit Tools — Aspect Ratios & Collages | PixEnhance',
    metaDescription:
      'Crop photos to custom aspect ratios, create multi-photo collages, split images into grids, and rotate or flip photos in your browser.',
    intro:
      'Refine image framing, orientation, and layout with browser-native editing tools. Crop photos to standard aspect ratios (16:9, 4:3, 1:1), split wide panoramas into multi-panel Instagram carousels, or assemble modern photo collage grids effortlessly.',
    features: [
      'Precise crop box adjustment with aspect ratio presets',
      'Multi-panel image splitter for Instagram swipe carousels',
      'Modern photo collage builder supporting 2 to 9 photos',
      'Lossless 90°/180° rotation and horizontal/vertical flipping',
    ],
    gradient: 'from-purple-500 to-pink-600',
    icon: Crop,
  },
  'pdf-tools': {
    id: 'PDF Tools',
    slug: 'pdf-tools',
    name: 'PDF & Document Tools',
    h1: 'Free Online PDF & Document Tools',
    metaTitle: 'Free Online PDF Tools — Image to PDF, Compress PDF & Extract | PixEnhance',
    metaDescription:
      'Merge images into single or multi-page PDFs, compress large PDF files, and extract PDF pages to high-resolution JPG or PNG images online.',
    intro:
      'Manage documents and digital paperwork without expensive software suites. Convert batches of JPG, PNG, and WebP images into standardized PDF files, compress bulky documents for email distribution, or extract individual pages as crisp images.',
    features: [
      'Multi-image batch to single PDF document conversion',
      'PDF compression targeting exact email and upload requirements',
      'High-DPI page extraction to lossless PNG or JPG',
      'Zero server upload: documents are processed strictly in local browser memory',
    ],
    gradient: 'from-rose-500 to-red-600',
    icon: FileText,
  },
  'social-media': {
    id: 'Social Media',
    slug: 'social-media',
    name: 'Social Media Resizers',
    h1: 'Social Media Photo & Banner Resizers',
    metaTitle: 'Social Media Image Resizers — Instagram, YouTube, WhatsApp | PixEnhance',
    metaDescription:
      'Pre-configured image resizers for Instagram posts, stories, YouTube channel banners, video thumbnails, and WhatsApp DP.',
    intro:
      'Format visual content perfectly for every major social network. Prevent awkward cropping and blurriness with verified dimension presets for Instagram square posts, portrait reels, YouTube thumbnails, channel banners, and WhatsApp profile photos.',
    features: [
      'Instagram 1080×1080 square and 1080×1920 story presets',
      'YouTube 1280×720 thumbnail and 2560×1440 banner presets',
      'WhatsApp 500×500 square profile picture optimizer',
      'Built-in smart crop framing with background color fills',
    ],
    gradient: 'from-pink-500 to-rose-600',
    icon: Camera,
  },
  utilities: {
    id: 'Utilities',
    slug: 'utilities',
    name: 'Developer & Pixel Utilities',
    h1: 'Developer & Precision Pixel Utilities',
    metaTitle: 'Developer Image Utilities — Color Picker, Base64 & Code Mockups | PixEnhance',
    metaDescription:
      'Pixel color magnifier loupe, Base64 image encoder/decoder, image dimensions calculator, and code-to-image screenshot generator.',
    intro:
      'A collection of precision browser tools engineered for frontend developers, UI designers, and technical creators. Inspect image dimensions, extract hexadecimal color palettes with a pixel loupe, convert graphics to Base64 data strings, or generate syntax-highlighted code screenshots.',
    features: [
      'Interactive pixel magnifier loupe with RGB and HEX readout',
      'Instant bidirectional Image to Base64 Data URI conversion',
      'Code-to-image mockup generator with themes and syntax highlighting',
      'Exact pixel dimension and aspect ratio inspection',
    ],
    gradient: 'from-amber-500 to-orange-600',
    icon: Sliders,
  },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = CATEGORY_MAP[category.toLowerCase()];
  if (!config) {
    return { title: 'Category Not Found | PixEnhance' };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: `https://pixenhance.in/tools/${config.slug}`,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: `https://pixenhance.in/tools/${config.slug}`,
      siteName: 'PixEnhance',
      type: 'website',
      images: [
        {
          url: 'https://pixenhance.in/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${config.name} — PixEnhance`,
        },
      ],
    },
  };
}

export default async function CategoryHubPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = CATEGORY_MAP[category.toLowerCase()];
  if (!config) {
    notFound();
  }

  const CategoryIcon = config.icon;
  const relevantTools = TOOLS_LIST.filter(
    (t) => t.category === config.id || (config.id === 'Convert' && t.category === 'Compress')
  );

  const categoryJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `https://pixenhance.in/tools/${config.slug}#webpage`,
        url: `https://pixenhance.in/tools/${config.slug}`,
        name: config.h1,
        description: config.metaDescription,
        isPartOf: {
          '@id': 'https://pixenhance.in/#website',
        },
      },
      {
        '@type': 'ItemList',
        '@id': `https://pixenhance.in/tools/${config.slug}#itemlist`,
        name: `${config.name} Tools`,
        itemListElement: relevantTools.map((tool, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: tool.name,
          url: `https://pixenhance.in${tool.slug}`,
          description: tool.shortDescription,
        })),
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
            name: config.name,
            item: `https://pixenhance.in/tools/${config.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumbs */}
        <Breadcrumbs
          customItems={[
            { name: 'Tools Directory', url: 'https://pixenhance.in/tools' },
            { name: config.name, url: `https://pixenhance.in/tools/${config.slug}` },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono">
            <CategoryIcon className="h-4 w-4" />
            <span>
              {config.name} &bull; {relevantTools.length} Available Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {config.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {config.intro}
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-start gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">
                {feat}
              </p>
            </div>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Available {config.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relevantTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.slug}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${config.gradient} text-white shadow-xs group-hover:scale-105 transition-transform`}
                    >
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    {tool.badge && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal mb-4">
                    {tool.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <span>Launch Tool</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Security & Client-Side Privacy Note */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Client-Side Security Guaranteed
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All transformations execute on your own machine. Files never transmit across networks.
              </p>
            </div>
          </div>
          <Link
            href="/privacy"
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition-colors shrink-0"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
