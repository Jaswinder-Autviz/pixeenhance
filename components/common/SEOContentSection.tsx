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
  const universalFaqs = [
    {
      question: `Are my images or documents saved or stored anywhere when using ${tool.name}?`,
      answer: `Never. All image and document processing with ${tool.name} happens completely locally inside your web browser using WebAssembly and HTML5 Canvas API. Your private pictures and sensitive documents are never uploaded to any remote server or stored in any database.`,
    },
    {
      question: `Is ${tool.name} completely free to use?`,
      answer: `Yes, 100% free with no hidden fees, paid subscriptions, account registrations, or watermarks placed on exported files.`,
    },
    {
      question: `What file formats are compatible with ${tool.name}?`,
      answer: `${tool.name} supports ${tool.supportedFormats.join(', ')} files with high-speed in-browser hardware acceleration and instant local downloads.`,
    },
    {
      question: `Why should I use ${tool.name} instead of uploading files to cloud converters?`,
      answer: `Traditional cloud converter websites upload your files to remote servers across the internet, exposing confidential photos, Aadhaar/PAN identity proofs, or financial marksheets to potential privacy breaches. ${tool.name} processes everything locally in browser memory.`,
    },
    {
      question: `Will using ${tool.name} add watermarks to my exported files?`,
      answer: `No. PixEnhance exports clean, high-resolution original files without adding promotional logos, brand watermarks, or quality restrictions.`,
    },
    {
      question: `Does ${tool.name} work on mobile phones and tablets?`,
      answer: `Yes. ${tool.name} is fully responsive and optimized for Android, iPhone, iPad, Windows, Mac, and Linux browsers without installing third-party mobile apps.`,
    },
    {
      question: `How can I ensure my output file meets exact online form requirements?`,
      answer: `Always check official recruitment notification PDFs for exact minimum and maximum KB limits and pixel dimensions before uploading. Use ${tool.name} to adjust target size sliders or lock aspect ratios accordingly.`,
    },
  ];

  // Combine tool-specific FAQs with universal FAQs to guarantee 7-8 detailed FAQs per page
  const customFaqs = tool.faqs || [];
  const mergedFaqs = [...customFaqs];
  universalFaqs.forEach((uFaq) => {
    if (!mergedFaqs.some((f) => f.question.toLowerCase().includes(uFaq.question.substring(0, 25).toLowerCase()))) {
      mergedFaqs.push(uFaq);
    }
  });

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
              In-Depth Overview &amp; Specifications
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight mt-0.5">
              What is {tool.name}?
            </h2>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg text-black dark:text-slate-200 leading-relaxed mb-4 font-normal">
          {tool.subtitle} PixEnhance provides an editorial-grade, privacy-first interface designed to give creators, developers, students, and job applicants instant control over their digital media without registration, subscriptions, or watermarks.
        </p>

        <p className="text-sm text-black dark:text-slate-300 leading-relaxed mb-6 font-normal">
          Whether you are preparing identity documents for recruitment portals, optimizing website graphics for faster Core Web Vitals page speed, or formatting media for social channels, {tool.name} processes all data directly inside browser memory via HTML5 Canvas and WebAssembly.
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
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">1. Online Exam &amp; Recruitment Applications</h3>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 leading-relaxed">
              Format passport photos, signatures, and certificates to meet strict portal limits (e.g. 20KB–50KB or 100KB–200KB caps). Always verify exact requirements from official recruitment notification PDFs before uploading.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">2. Website Speed &amp; SEO Optimization</h3>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 leading-relaxed">
              Reduce image payload on WordPress or Blogger sites by up to 85%. Lower image sizes improve Largest Contentful Paint (LCP) scores and boost Google rankings.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">3. Document Archival &amp; Verification</h3>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 leading-relaxed">
              Prepare high-contrast scans of Aadhaar, PAN card, marksheets, and identity proofs for college admissions, bank KYC, or visa applications in complete privacy.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 space-y-2">
            <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">4. Social Media &amp; Graphic Delivery</h3>
            <p className="text-xs sm:text-sm text-black dark:text-slate-300 leading-relaxed">
              Scale graphics to exact platform dimensions (Instagram 1080×1350, YouTube 1280×720, WhatsApp DP 320×320) to prevent aggressive social media compression blur.
            </p>
          </div>
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
              Common Mistakes to Avoid
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Prevent upload errors and visual degradation.</p>
          </div>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-amber-600 font-bold shrink-0">&bull;</span>
            <span><strong>Stretching Aspect Ratios:</strong> Unchecking aspect ratio lock stretches faces and signature strokes. Keep aspect ratio locked when resizing photos.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-amber-600 font-bold shrink-0">&bull;</span>
            <span><strong>Compressing Without Cropping:</strong> Trying to compress a full 4000×3000 photo to 20KB without cropping background margins makes the image blurry. Crop tightly around the subject first.</span>
          </li>
          <li className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/40">
            <span className="text-amber-600 font-bold shrink-0">&bull;</span>
            <span><strong>Uploading Wrong Formats:</strong> Portals expecting JPG files will reject `.png` or `.webp` files. Use our format converters to output standard `.jpg` files when required.</span>
          </li>
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
