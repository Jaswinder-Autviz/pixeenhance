import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TOOLS_LIST, TOOL_MAP } from '@/src/data/toolsList';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';
import { SEOContentSection } from '@/components/common/SEOContentSection';

// Tool Views
import { CompressorView } from '@/components/tool-views/CompressorView';
import { ResizerView } from '@/components/tool-views/ResizerView';
import { ConverterView } from '@/components/tool-views/ConverterView';
import { CropperView } from '@/components/tool-views/CropperView';
import { RotatorView } from '@/components/tool-views/RotatorView';
import { FlipperView } from '@/components/tool-views/FlipperView';
import { DimensionsView } from '@/components/tool-views/DimensionsView';
import { AspectRatioCalculatorView } from '@/components/tool-views/AspectRatioCalculatorView';
import { A4ResizerView } from '@/components/tool-views/A4ResizerView';
import { PassportResizerView } from '@/components/tool-views/PassportResizerView';
import { SocialResizerView } from '@/components/tool-views/SocialResizerView';
import { QualityView } from '@/components/tool-views/QualityView';
import { Base64View } from '@/components/tool-views/Base64View';
import { ImageToPdfView } from '@/components/tool-views/ImageToPdfView';
import { BulkResizerView } from '@/components/tool-views/BulkResizerView';
import { CollageMakerView } from '@/components/tool-views/CollageMakerView';
import { ImageEnlargerView } from '@/components/tool-views/ImageEnlargerView';
import { ColorPickerView } from '@/components/tool-views/ColorPickerView';
import { MemeGeneratorView } from '@/components/tool-views/MemeGeneratorView';
import { UniversalConverterView } from '@/components/tool-views/UniversalConverterView';
import { PdfToImageView } from '@/components/tool-views/PdfToImageView';
import { PngToSvgView } from '@/components/tool-views/PngToSvgView';
import { CompressPdfView } from '@/components/tool-views/CompressPdfView';
import { PdfConverterHubView } from '@/components/tool-views/PdfConverterHubView';
import { PdfToWordView } from '@/components/tool-views/PdfToWordView';
import { WordToPdfView } from '@/components/tool-views/WordToPdfView';
import { CodeConverterView } from '@/components/tool-views/CodeConverterView';

interface ToolPageProps {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const tool = TOOL_MAP.get(toolSlug);

  if (!tool) {
    return { title: 'Tool Not Found | PixEnhance' };
  }

  const baseKeywords = [
    tool.name,
    tool.h1,
    `${tool.name.toLowerCase()} online`,
    `free ${tool.name.toLowerCase()}`,
    `best ${tool.name.toLowerCase()} online`,
    `${tool.name.toLowerCase()} without watermark`,
    `${tool.id.replace(/-/g, ' ')}`,
    ...tool.features,
    ...tool.supportedFormats.map((fmt) => `${fmt} ${tool.name.toLowerCase()}`),
    'PixEnhance',
    'pixenhance.in',
    'free online image tools',
  ];

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: Array.from(new Set(baseKeywords)),
    alternates: {
      canonical: `https://pixenhance.in${tool.slug}`,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: 'website',
      siteName: 'PixEnhance',
      url: `https://pixenhance.in${tool.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  return Array.from(TOOL_MAP.keys()).map((toolSlug) => ({
    toolSlug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolSlug } = await params;
  const tool = TOOL_MAP.get(toolSlug);

  if (!tool) {
    notFound();
  }

  // Render the appropriate interactive client-side tool engine
  const renderToolEngine = () => {
    switch (tool.id) {
      case 'image-compressor':
        return <CompressorView />;
      case 'image-resizer':
        return <ResizerView />;
      case 'bulk-image-resizer':
        return <BulkResizerView />;
      case 'jpg-to-png':
        return <ConverterView sourceType="jpg" targetType="png" />;
      case 'png-to-jpg':
        return <ConverterView sourceType="png" targetType="jpg" />;
      case 'jpg-to-webp':
        return <ConverterView sourceType="jpg" targetType="webp" />;
      case 'png-to-webp':
        return <ConverterView sourceType="png" targetType="webp" />;
      case 'webp-to-jpg':
        return <ConverterView sourceType="webp" targetType="jpg" />;
      case 'image-cropper':
      case 'crop-image':
        return <CropperView />;
      case 'image-rotator':
      case 'rotate-image':
        return <RotatorView />;
      case 'image-flipper':
      case 'flip-image':
        return <FlipperView />;
      case 'collage-maker':
        return <CollageMakerView />;
      case 'image-enlarger':
        return <ImageEnlargerView />;
      case 'color-picker':
        return <ColorPickerView />;
      case 'meme-generator':
        return <MemeGeneratorView />;
      case 'image-converter':
        return <UniversalConverterView />;
      case 'heic-to-jpg':
        return (
          <UniversalConverterView
            forcedTargetFormat="image/jpeg"
            acceptedFileTypes=".heic,.heif,image/*"
            defaultTitle="Drop Apple HEIC / HEIF photos here"
            defaultSubtitle="Convert iPhone & iPad photos to standard JPG format directly in your browser."
          />
        );
      case 'svg-converter':
        return <PngToSvgView initialMode="raster-to-svg" />;
      case 'png-to-svg':
        return <PngToSvgView initialMode="raster-to-svg" />;
      case 'pdf-to-jpg':
        return <PdfToImageView targetFormat="jpg" />;
      case 'pdf-to-png':
        return <PdfToImageView targetFormat="png" />;
      case 'pdf-to-gif':
        return <PdfToImageView targetFormat="gif" />;
      case 'compress-pdf':
        return <CompressPdfView />;
      case 'pdf-converter':
        return <PdfConverterHubView />;
      case 'image-dimensions':
        return <DimensionsView />;
      case 'aspect-ratio-calculator':
        return <AspectRatioCalculatorView />;
      case 'a0-image-resizer':
        return <A4ResizerView initialSize="A0" />;
      case 'a1-image-resizer':
        return <A4ResizerView initialSize="A1" />;
      case 'a2-image-resizer':
        return <A4ResizerView initialSize="A2" />;
      case 'a3-image-resizer':
        return <A4ResizerView initialSize="A3" />;
      case 'a4-image-resizer':
        return <A4ResizerView initialSize="A4" />;
      case 'a5-image-resizer':
        return <A4ResizerView initialSize="A5" />;
      case 'a6-image-resizer':
        return <A4ResizerView initialSize="A6" />;
      case 'a7-image-resizer':
        return <A4ResizerView initialSize="A7" />;
      case 'passport-photo-resizer':
        return <PassportResizerView />;
      case 'instagram-image-resizer':
        return <SocialResizerView platform="instagram" />;
      case 'youtube-thumbnail-resizer':
        return <SocialResizerView platform="youtube" />;
      case 'whatsapp-dp-resizer':
        return <SocialResizerView platform="whatsapp" />;
      case 'image-quality':
        return <QualityView />;
      case 'image-to-base64':
        return <Base64View mode="image-to-base64" />;
      case 'base64-to-image':
        return <Base64View mode="base64-to-image" />;
      case 'image-to-pdf':
        return <ImageToPdfView sourceFormat="all" />;
      case 'jpg-to-pdf':
        return <ImageToPdfView sourceFormat="jpg" />;
      case 'png-to-pdf':
        return <ImageToPdfView sourceFormat="png" />;
      case 'pdf-to-word':
        return <PdfToWordView />;
      case 'word-to-pdf':
        return <WordToPdfView />;
      case 'code-converter':
        return <CodeConverterView initialMode="code-transformer" />;
      case 'code-to-image':
        return <CodeConverterView initialMode="code-to-image" />;
      default:
        return notFound();
    }
  };

  // Rich JSON-LD Schemas for WebApplication, BreadcrumbList, HowTo, and FAQPage
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `https://pixenhance.in${tool.slug}#software`,
        name: tool.name,
        url: `https://pixenhance.in${tool.slug}`,
        description: tool.metaDescription,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'All modern web browsers (Chrome, Safari, Firefox, Edge)',
        browserRequirements: 'Requires JavaScript and HTML5 Canvas',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: tool.features.join(', '),
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
            name: tool.name,
            item: `https://pixenhance.in${tool.slug}`,
          },
        ],
      },
      ...(tool.howToUse && tool.howToUse.length > 0
        ? [
            {
              '@type': 'HowTo',
              name: `How to use ${tool.name} online for free`,
              description: tool.subtitle,
              step: tool.howToUse.map((step, idx) => ({
                '@type': 'HowToStep',
                position: idx + 1,
                name: `Step ${idx + 1}`,
                text: step,
              })),
            },
          ]
        : []),
      ...(tool.faqs && tool.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: tool.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="w-full min-h-screen bg-[#e5ebf2] dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors relative overflow-hidden bg-grid-pattern">
      {/* Google Rich Snippets JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      {/* Ambient Multi-Color Background Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[550px] h-[550px] bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/8 via-teal-500/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[550px] h-[550px] bg-gradient-to-t from-sky-500/8 via-blue-500/6 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Top Banner Ad Placeholder */}
      <div className="max-w-5xl mx-auto px-4 pt-4 relative z-10">
        <AdPlaceholder slot="top-banner" />
      </div>

      {/* Editorial Tool Hero Header */}
      <section className="py-8 sm:py-12 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white/90 via-slate-50/60 to-transparent dark:from-slate-900/80 dark:via-slate-950/60 dark:to-transparent backdrop-blur-xs relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Tools
            </Link>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{tool.name}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/60 dark:via-purple-950/60 dark:to-pink-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Instant &bull; 100% Free &bull; Private</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {tool.h1}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            {tool.subtitle}
          </p>

          {/* Quick Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tool.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-xs font-semibold shadow-2xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Engine View */}
      <section className="py-8 relative z-10">
        {renderToolEngine()}
      </section>

      {/* High-Engagement In-Tool / Post-Action Ad Placement */}
      <section className="max-w-5xl mx-auto px-4 relative z-10">
        <AdPlaceholder slot="in-tool" label="Post-Processing Sponsored Unit &bull; High Conversion" />
      </section>

      {/* In-Depth Educational & Technical SEO Article Section */}
      <SEOContentSection tool={tool} />
    </div>
  );
}
