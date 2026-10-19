import React from 'react';
import {
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Zap,
  HelpCircle,
  FileCode,
  Sparkles,
  Bookmark,
} from 'lucide-react';
import { ToolItem } from '@/src/data/toolsList';
import { AdPlaceholder } from './AdPlaceholder';
import { RelatedTools } from '@/components/RelatedTools';

interface SEOContentSectionProps {
  tool: ToolItem;
}

export function SEOContentSection({ tool }: SEOContentSectionProps) {
  // Category-specific educational blueprints (100% original, copyright-free technical documentation)
  const getCategoryBlueprint = () => {
    switch (tool.category) {
      case 'Compress':
        return {
          tag: 'Lossy & Lossless Compression Science',
          heading: `How ${tool.name} Optimizes File Size Without Sacrificing Visual Fidelity`,
          overviewParagraph: `Digital cameras and smartphones capture images with massive redundant color metadata and high-frequency noise that the human eye cannot resolve. ${tool.name} uses advanced local quantization matrices and discrete cosine transforms (DCT) to selectively discard imperceptible high-frequency color variations while protecting facial contours, high-contrast edges, and typography.`,
          useCases: [
            {
              title: '1. Web Vitals & Page Load Acceleration',
              desc: 'Trimming image payloads from 3MB down to under 150KB drastically improves Largest Contentful Paint (LCP) scores, accelerating mobile browsing speeds and boosting search rankings.',
            },
            {
              title: '2. Recruitment & Competitive Exam Portals',
              desc: 'Easily meet strict government application file size caps (e.g., strictly between 20KB and 50KB for SSC, UPSC, and State PSCs) without text or signatures becoming unreadable.',
            },
            {
              title: '3. Email Attachments & Messaging Limits',
              desc: 'Bypass restrictive email provider attachment caps (like Gmail 25MB and Outlook limits) to send high-resolution client decks and photo attachments smoothly.',
            },
            {
              title: '4. E-Commerce Product Catalog Optimization',
              desc: 'Standardize thousands of product catalog images to lightweight, uniform file sizes for Shopify, WooCommerce, and Amazon storefronts without losing texture sharpness.',
            },
          ],
          mistakes: [
            {
              title: 'Aggressive Multi-Pass Compression:',
              desc: 'Compressing an already compressed lossy JPEG multiple times compounds compression artifacts, creating unsightly "mosquito noise" around sharp edges.',
            },
            {
              title: 'Compressing Without Cropping Margins:',
              desc: 'Leaving huge empty white margins around a signature or portrait wastes valuable byte budget. Crop tightly around the focal subject first.',
            },
            {
              title: 'Using Lossy Compression for Sharp Vector Logos:',
              desc: 'Lossy JPEG compression introduces blur around flat graphic illustrations. Use WebP or PNG for graphic logos, and reserve JPEG for natural photography.',
            },
          ],
          faqs: [
            {
              question: `How does ${tool.name} reduce image size without making it blurry?`,
              answer: `${tool.name} operates via browser-based quantization and entropy encoding. Instead of discarding actual pixel dimensions, it removes redundant color channels (chroma subsampling) and imperceptible high-frequency gradients. The output retains exact pixel dimensions while dropping file size by up to 85%.`,
            },
            {
              question: `What is the difference between lossy and lossless compression in ${tool.name}?`,
              answer: `Lossless compression rearranges image data into a more compact binary stream without altering a single pixel value (common in PNG). Lossy compression (common in JPEG and WebP) intelligently discards subtle color nuances that the human eye cannot detect, achieving 5x to 10x greater size reductions.`,
            },
          ],
        };

      case 'Resize':
        return {
          tag: 'Resampling Mathematics & Pixel Grids',
          heading: `Precision Resampling: How ${tool.name} Scales Pixel Dimensions`,
          overviewParagraph: `Resizing digital imagery is more than simply changing numbers; it requires mathematical interpolation kernels to re-compute pixel values. ${tool.name} employs adaptive bicubic and bilinear convolution resampling inside browser memory to recalculate sub-pixel gradients, preventing harsh pixelation during downscaling or jagged staircasing during dimension changes.`,
          useCases: [
            {
              title: '1. Print Preparation & DPI Standardization',
              desc: 'Translate physical millimeter and inch specifications into exact 300 DPI high-resolution pixel matrices required by commercial photo labs and passport issuing authorities.',
            },
            {
              title: '2. Responsive Display Density (1x, 2x, 3x)',
              desc: 'Generate multiple resolution variants for modern high-DPI Retina screens, ensuring crisp visuals on 4K monitors without overloading mobile data connections.',
            },
            {
              title: '3. Identity Documents & Visa Photographs',
              desc: 'Format passport and visa photos to mandated dimensions (e.g., 2×2 inches, 35×45 mm, or 138×177 px) with strict aspect-ratio locking.',
            },
            {
              title: '4. CMS & Layout Standardization',
              desc: 'Standardize blog featured images, portfolio grids, and thumbnail galleries to identical pixel dimensions to eliminate cumulative layout shifts (CLS).',
            },
          ],
          mistakes: [
            {
              title: 'Disabling Aspect Ratio Lock:',
              desc: 'Unchecking the aspect ratio lock stretches facial features, logos, and typography, distorting proportions and causing immediate portal rejection.',
            },
            {
              title: 'Confusing DPI with Pixel Resolution:',
              desc: 'DPI (dots per inch) is simply a physical print density tag. On digital monitors, total pixel width and height dictate display size, not DPI metadata.',
            },
            {
              title: 'Extreme Nearest-Neighbor Upscaling:',
              desc: 'Enlarging a low-resolution thumbnail by 400% with basic scaling produces chunky pixel blocks. Use specialized super-resolution upscalers for enlargement.',
            },
          ],
          faqs: [
            {
              question: `Does resizing an image with ${tool.name} lower its sharpness?`,
              answer: `When downscaling, ${tool.name} averages neighboring pixels using bicubic filtering to preserve edge contrast. When upscaling beyond original dimensions, new pixel data must be mathematically estimated, which can soften sharp details. For best results, always start with the highest-resolution source available.`,
            },
            {
              question: `What is the ideal resolution for web images vs print?`,
              answer: `For web displays, images typically range from 800px to 1920px wide at standard screen density (72–96 PPI). For physical printing, target 300 DPI (e.g., a 4×6 inch print requires 1200×1800 pixels) to avoid visible graininess.`,
            },
          ],
        };

      case 'Convert':
        return {
          tag: 'Container Decoding & Format Efficiency',
          heading: `Cross-Format Architecture: Why Format Conversion Matters`,
          overviewParagraph: `Different image formats serve distinct architectural purposes across the web. PNG excels in lossless alpha transparency, JPEG remains the universal standard for photographic capture, and WebP offers next-generation web compression. ${tool.name} decodes source containers in hardware-accelerated browser memory and re-encodes target streams with zero generational data loss.`,
          useCases: [
            {
              title: '1. Transparent Background Preservation',
              desc: 'Extract and preserve transparent alpha channels when converting PNG and WebP assets for logos, UI icons, and design overlays without black background artifacts.',
            },
            {
              title: '2. Next-Gen Web Optimization (WebP Adoption)',
              desc: 'Convert heavy legacy JPEG and PNG images to modern WebP format to achieve 25% to 35% smaller file sizes with visually identical quality.',
            },
            {
              title: '3. Legacy System & Enterprise Compatibility',
              desc: 'Convert modern HEIC photos from iPhones or WebP files from the web into universally supported standard JPEG and PNG files for enterprise portals.',
            },
            {
              title: '4. Vector vs. Raster Optimization',
              desc: 'Prepare clean high-contrast bitmap graphics for SVG vector tracing, producing infinite-scalability graphics for logos and typography.',
            },
          ],
          mistakes: [
            {
              title: 'Converting Transparent PNG to JPG Expecting Transparency:',
              desc: 'JPEG does not support alpha channels. Converting transparent PNG to JPG will automatically fill transparent areas with solid black or white.',
            },
            {
              title: 'Expecting Quality Gains by Converting JPG to PNG:',
              desc: 'PNG is a lossless format, but converting a low-quality, compressed JPEG into PNG cannot magically restore lost frequencies; it only bloats the file size.',
            },
            {
              title: 'Ignoring ICC Color Space Mappings:',
              desc: 'Converting between formats without standardizing to the sRGB color profile can cause washed-out colors when viewed on mobile OLED screens.',
            },
          ],
          faqs: [
            {
              question: `Why should I convert my images to WebP?`,
              answer: `WebP was developed by Google specifically for the web. It supports both lossy and lossless compression as well as transparency, offering 26% smaller file sizes than PNG and 25–34% smaller sizes than comparable JPEG images, leading to faster web performance.`,
            },
            {
              question: `Will converting an image reduce its visual quality?`,
              answer: `Converting to a lossless format like PNG preserves 100% of the input pixel values. When converting to a lossy format like JPEG or WebP, ${tool.name} uses high-quality quantization (90%+ quality default) to ensure the conversion is visually indistinguishable from the source.`,
            },
          ],
        };

      case 'Crop & Edit':
        return {
          tag: 'Framing Geometry & Compositional Ratios',
          heading: `Composition Precision: How ${tool.name} Frames Your Visuals`,
          overviewParagraph: `Cropping is the most effective way to eliminate visual clutter, correct horizon tilt, and guide the viewer's eye to the key subject. ${tool.name} provides interactive, sub-pixel grid overlays based on the Rule of Thirds and Golden Ratio, executing crops directly via HTML5 Canvas coordinate transforms without lossy re-encoding loops.`,
          useCases: [
            {
              title: '1. Rule of Thirds Portrait & Subject Framing',
              desc: 'Re-center off-center focal subjects and adjust headroom to transform ordinary candid snapshots into balanced, professional-looking portraits.',
            },
            {
              title: '2. Document & ID Card Boundary Trimming',
              desc: 'Crop out desk textures, shadows, scanner borders, and binder clips from photographed identity cards, marksheets, and receipts.',
            },
            {
              title: '3. Social Media Multi-Panel Grid Slicing',
              desc: 'Divide panoramic travel landscape shots into seamless multi-panel square segments for swipeable Instagram carousel posts.',
            },
            {
              title: '4. Horizon Alignment & Orientation Correction',
              desc: 'Correct tilted horizon lines in landscape photography and rotate sideways phone photos to clean 90-degree orthogonal orientations.',
            },
          ],
          mistakes: [
            {
              title: 'Cropping Too Tight Around Forehead/Hair:',
              desc: 'Official passport and visa specifications mandate a minimum 20%–30% headroom margin above the crown. Cropping too tightly causes immediate rejection.',
            },
            {
              title: 'Repeatedly Rotating Lossy Files:',
              desc: 'Rotating lossy images in legacy desktop editors often triggers re-compression every save. ${tool.name} executes lossless memory rotation.',
            },
            {
              title: 'Discarding Source Files Before Reviewing:',
              desc: 'Cropping permanently removes outer pixels. Always review the cropped preview before saving, keeping your original high-resolution camera file intact.',
            },
          ],
          faqs: [
            {
              question: `Does cropping an image reduce its file size?`,
              answer: `Yes, significantly! Cropping removes entire blocks of peripheral pixels. If you crop out 40% of the background area, your resulting file size naturally decreases by roughly 30% to 50% because there are fewer pixels to encode.`,
            },
            {
              question: `Can I lock specific aspect ratios like 16:9 or 1:1 while cropping?`,
              answer: `Yes. ${tool.name} includes predefined aspect ratio locks for 1:1 (Square), 4:5 (Instagram Portrait), 16:9 (YouTube Widescreen), and 3:2 (Standard DSLR), as well as free-form cropping.`,
            },
          ],
        };

      case 'Social Media':
        return {
          tag: 'Platform Compression Standards (2026)',
          heading: `Platform Optimization: How to Prevent Aggressive Social Media Blur`,
          overviewParagraph: `Social media platforms like Instagram, Facebook, YouTube, LinkedIn, and WhatsApp enforce strict upload pipelines. When you upload an oversized 15MB phone photo, their backend algorithms aggressively re-encode it, introducing blur, banding, and color shifts. ${tool.name} pre-resizes and optimizes your media to match exact platform display matrices, preventing server-side compression degradation.`,
          useCases: [
            {
              title: '1. Instagram Feed, Stories & Reels (1080px Standards)',
              desc: 'Pre-scale portraits to 1080×1350 px (4:5) and vertical stories to 1080×1920 px (9:16) to ensure your photos occupy maximum screen real estate without cropping.',
            },
            {
              title: '2. YouTube High-CTR Video Thumbnails',
              desc: 'Format thumbnails to exactly 1280×720 px (16:9) under 2MB, ensuring bold typography and facial reactions remain razor-sharp across mobile and TV apps.',
            },
            {
              title: '3. Professional LinkedIn Banners & Avatars',
              desc: 'Format executive header banners to 1584×396 px and company logos to 400×400 px, keeping vital headline copy inside the mobile safe zone.',
            },
            {
              title: '4. WhatsApp DP & Profile Circles',
              desc: 'Format square profile pictures to 500×500 px with circular preview bounds so your face is perfectly centered without awkward edge clipping.',
            },
          ],
          mistakes: [
            {
              title: 'Uploading Raw 48MP Smartphone Files:',
              desc: 'Instagram server scripts aggressively compress massive files down to 1080px, causing severe compression blur. Pre-scaling to 1080px preserves edge sharpness.',
            },
            {
              title: 'Placing Important Text Outside Safe Zones:',
              desc: 'Stories and Reels display UI overlays (username, captions, audio tags) at the top and bottom. Keep vital text within the central 80% safe zone.',
            },
            {
              title: 'Using Horizontal 16:9 Images on Instagram Feeds:',
              desc: 'Horizontal images occupy less than 40% of the mobile screen height. Always crop to 4:5 vertical (1080×1350) for maximum engagement.',
            },
          ],
          faqs: [
            {
              question: `Why do my photos look blurry after uploading to Instagram or WhatsApp?`,
              answer: `When you upload a file with dimensions exceeding the platform's standard (e.g., 4000px wide), the platform compresses it aggressively using automated scripts. Pre-sizing your image to exactly 1080px wide on ${tool.name} with bicubic sharpening prevents the platform from applying harsh compression.`,
            },
            {
              question: `What are the official image dimensions for social media in 2026?`,
              answer: `Standard dimensions include: Instagram Feed (1080×1350 px), Instagram Story/Reel (1080×1920 px), YouTube Thumbnail (1280×720 px), LinkedIn Banner (1584×396 px), Facebook Cover (820×312 px), and WhatsApp DP (500×500 px).`,
            },
          ],
        };

      case 'PDF Tools':
        return {
          tag: 'Document Serialization & PDF Stream Compression',
          heading: `Document Archival: How ${tool.name} Optimizes PDF Workflows`,
          overviewParagraph: `PDF documents handle government certificates, academic marksheets, financial statements, and contracts. Storing uncompressed camera captures inside PDF containers often results in 20MB+ bloated files that crash upload portals. ${tool.name} re-encodes embedded image streams, adjusts DPI resolution matrices, and cleans obsolete trailer cross-references directly in browser memory.`,
          useCases: [
            {
              title: '1. Multi-Page Image Consolidation into Single PDF',
              desc: 'Combine multiple photographed marksheets, Aadhaar card sides, and certificates into a single, beautifully formatted, paginated PDF file.',
            },
            {
              title: '2. Strict Government Portal Size Compliance',
              desc: 'Compress multi-page PDFs to strictly under 200KB or 500KB caps required by immigration, university admissions, and recruitment systems.',
            },
            {
              title: '3. A4 & Letter Physical Geometry Standardization',
              desc: 'Normalize mixed-orientation smartphone photos into standardized A4 portrait pages with uniform print margins and crisp line contrast.',
            },
            {
              title: '4. Confidential Contract & Legal Processing',
              desc: 'Process confidential financial statements, bank passbooks, and identity proofs locally with 100% confidentiality and zero server storage.',
            },
          ],
          mistakes: [
            {
              title: 'Embedding Uncompressed 15MB Photos in PDFs:',
              desc: 'Embedding full-resolution smartphone photos directly into PDFs bloats the file beyond portal limits. Optimize image dimensions before creating the PDF.',
            },
            {
              title: 'Over-compressing Text Documents to Illegibility:',
              desc: 'Aggressive PDF compression can blur tiny text or seal numbers on official certificates. Always verify that numbers and signatures remain readable.',
            },
            {
              title: 'Mixing Random Landscape and Portrait Orientations:',
              desc: 'Scanning documents upside down or mixing orientations forces reviewers to rotate pages manually. Normalize page orientation before export.',
            },
          ],
          faqs: [
            {
              question: `Is it safe to convert sensitive bank statements and identity proofs with ${tool.name}?`,
              answer: `Yes, completely safe! Unlike traditional cloud PDF websites that upload your files to remote servers, ${tool.name} executes all document rasterization, pagination, and compression locally inside your web browser. Your private files never leave your device.`,
            },
            {
              question: `How do I compress a PDF to under 100KB or 200KB?`,
              answer: `Use ${tool.name} to adjust the target resolution and quality preset. The tool recalculates embedded raster image streams using optimized DCT compression to reduce file size while maintaining sharp, legible text.`,
            },
          ],
        };

      case 'Utilities':
      default:
        return {
          tag: 'Web Standards & Media Utility Engineering',
          heading: `Precision Utility: How ${tool.name} Streamlines Media Workflows`,
          overviewParagraph: `Modern web development and content workflows require rapid, accurate media utilities: from inline Base64 data URI encoding to exact hexadecimal palette sampling and geometric aspect ratio calculations. ${tool.name} provides clean, client-side developer and creator utilities engineered for speed, accuracy, and zero bloat.`,
          useCases: [
            {
              title: '1. Base64 Inline Data URI Encoding',
              desc: 'Encode UI icons and vector graphics directly into inline CSS and HTML strings to eliminate extra HTTP requests and improve initial page render speed.',
            },
            {
              title: '2. Accurate Hex & RGB Palette Extraction',
              desc: 'Extract exact brand colors, secondary accents, and contrast ratios directly from photographic assets for design system consistency.',
            },
            {
              title: '3. Mathematical Aspect Ratio Solving',
              desc: 'Calculate exact integer scaling fractions (16:9, 4:3, 21:9) and greatest common divisors (GCD) for responsive canvas and video containers.',
            },
            {
              title: '4. Code Snippet to Social Graphic Rendering',
              desc: 'Transform raw code blocks into beautifully formatted, syntax-highlighted visual cards with modern macOS window styling for tutorials and social media.',
            },
          ],
          mistakes: [
            {
              title: 'Base64-Encoding Large Photographic Files:',
              desc: 'Base64 increases file payload by roughly 33%. Only use Base64 for small icons (<15KB); keep photographic assets as separate WebP/JPEG files.',
            },
            {
              title: 'Sampling Colors from Compressed JPEG Artifacts:',
              desc: 'Compression blocks introduce slight color noise. Sample colors from smooth, uncompressed flat areas to get true hex values.',
            },
            {
              title: 'Ignoring Display Color Gamuts:',
              desc: 'Colors sampled from modern Display P3 iPhone displays may shift when viewed on standard sRGB budget monitors. Always verify standard sRGB hex values.',
            },
          ],
          faqs: [
            {
              question: `What are the advantages of in-browser utilities compared to online cloud converters?`,
              answer: `In-browser utilities execute instantly using your local device CPU/GPU with zero network latency. There are no file size queues, no privacy risks, and no third-party server logging.`,
            },
            {
              question: `Can I use ${tool.name} offline without an internet connection?`,
              answer: `Once the page has loaded in your browser cache, the WebAssembly and Canvas processing scripts run completely client-side, allowing tools to process local files even without active internet connectivity.`,
            },
          ],
        };
    }
  };

  const blueprint = getCategoryBlueprint();

  // Combine tool-specific FAQs with blueprint FAQs and privacy guarantee
  const customFaqs = tool.faqs || [];
  const mergedFaqs = [...customFaqs];
  blueprint.faqs.forEach((bFaq) => {
    if (!mergedFaqs.some((f) => f.question.toLowerCase().includes(bFaq.question.substring(0, 25).toLowerCase()))) {
      mergedFaqs.push(bFaq);
    }
  });

  // Always append universal privacy FAQ
  if (!mergedFaqs.some((f) => f.question.toLowerCase().includes('saved or stored'))) {
    mergedFaqs.push({
      question: `Are my images or documents saved or stored anywhere when using ${tool.name}?`,
      answer: `Never. All image and document processing with ${tool.name} happens completely locally inside your web browser using HTML5 Canvas API and WebAssembly. Your private pictures and sensitive documents are never uploaded to any remote server or stored in any database.`,
    });
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 relative z-10">
      {/* Content Quick Jump Bar */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xs backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 pl-2 text-xs font-bold text-slate-400 uppercase font-mono tracking-wider shrink-0">
          <Bookmark className="h-3.5 w-3.5 text-indigo-500" />
          <span className="hidden sm:inline">Jump to:</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href="#overview"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Overview
          </a>
          <a
            href="#use-cases"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Use Cases
          </a>
          <a
            href="#how-to-use"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            How-To
          </a>
          <a
            href="#common-mistakes"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Mistakes to Avoid
          </a>
          <a
            href="#faqs"
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            FAQs
          </a>
        </div>
      </div>

      {/* 1. What is this tool & Overview */}
      <div
        id="overview"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
              {blueprint.tag}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight mt-0.5">
              {blueprint.heading}
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-black dark:text-slate-200 leading-relaxed mb-4 font-normal">
          {tool.subtitle} PixEnhance provides an editorial-grade, privacy-first interface designed to give creators, developers, students, and job applicants instant control over their digital media without registration, subscriptions, or watermarks.
        </p>

        <p className="text-sm text-black dark:text-slate-300 leading-relaxed mb-6 font-normal">
          {blueprint.overviewParagraph}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid sm:grid-cols-2 gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
          {tool.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 text-sm text-black dark:text-slate-200"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="font-medium">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Key Use Cases & Applications */}
      <div
        id="use-cases"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24 space-y-4"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50">
            <FileCode className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              Primary Use Cases for {tool.name}
            </h2>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300">Practical real-world applications across exams, web development, and media.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {blueprint.useCases.map((uc, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
              <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{uc.title}</h3>
              <p className="text-xs sm:text-sm text-black dark:text-slate-300 leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Step-by-Step: How to use */}
      <div
        id="how-to-use"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              How to Use {tool.name}
            </h2>
            <p className="text-sm text-black dark:text-slate-300">
              Simple browser workflow with real-time feedback.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tool.howToUse.map((step, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-200 shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white text-xs font-black font-mono shadow-xs group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Step {idx + 1}
                  </span>
                </div>
                <p className="text-sm text-black dark:text-slate-200 leading-relaxed font-medium">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Common Mistakes to Avoid */}
      <div
        id="common-mistakes"
        className="rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24 space-y-4"
      >
        <div className="flex items-center gap-3 pb-3 border-b border-amber-200/60 dark:border-amber-900/40">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Common Mistakes to Avoid with {tool.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Prevent export errors, formatting issues, and visual degradation.</p>
          </div>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {blueprint.mistakes.map((m, idx) => (
            <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/40">
              <span className="text-amber-600 font-bold shrink-0">&bull;</span>
              <span><strong>{m.title}</strong> {m.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mid-Article Sponsored Banner */}
      <AdPlaceholder slot="mid-content" label="Sponsored Guide • In-Article Display" />

      {/* 5. Supported Formats & Privacy Highlight */}
      <div id="formats-privacy" className="grid md:grid-cols-2 gap-6 scroll-mt-24">
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-7 shadow-xs backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <FileCode className="h-4 w-4" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-black dark:text-white">
                Supported File Formats
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 mb-4">
              Directly processed via native browser canvas decoders:
            </p>
            <div className="flex flex-wrap gap-2">
              {tool.supportedFormats.map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold font-mono shadow-2xs"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
            Supports standard image files up to 50MB and 16,000 × 16,000 px resolution.
          </p>
        </div>

        {/* Privacy Highlight Card */}
        <div className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-800/50 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/10 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-extrabold text-base mb-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Complete Privacy Guarantee</span>
            </div>
            <p className="text-sm text-emerald-950 dark:text-emerald-200 leading-relaxed font-normal">
              Your photos and documents are processed with complete confidentiality. Your files stay strictly on your device with zero server uploads.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold">
            100% Private Client-Side Processing &bull; Fast &bull; Free Forever
          </div>
        </div>
      </div>

      {/* 6. Frequently Asked Questions */}
      <div
        id="faqs"
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-900/50">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
              Frequently Asked Questions ({mergedFaqs.length} Answers)
            </h2>
            <p className="text-sm text-black dark:text-slate-300">
              Clear technical answers regarding functionality, privacy, and form compliance.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {mergedFaqs.map((faq, idx) => (
            <details key={idx} className="group py-4" open={idx === 0}>
              <summary className="flex w-full cursor-pointer list-none items-center justify-between text-left text-base sm:text-lg font-bold text-black dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-open:rotate-180 group-open:text-indigo-600 shrink-0 ml-2" />
              </summary>
              <p className="mt-3 text-sm sm:text-base text-black dark:text-slate-200 leading-relaxed font-normal">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* Pre-Related Tools Native Ad */}
      <AdPlaceholder slot="in-content" label="Sponsored Recommendations • Native Banner" />

      {/* 7. Contextual Related Tools & Next Workflow Steps */}
      <div id="related-tools" className="scroll-mt-24">
        <RelatedTools currentSlug={tool.slug} />
      </div>

      {/* Bottom banner ad */}
      <AdPlaceholder slot="bottom-banner" />
    </section>
  );
}
