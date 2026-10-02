import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Lock,
  Heart,
  ArrowRight,
  Users,
  Cpu,
} from 'lucide-react';
import { AdBanner } from '@/components/common/AdBanner';

export const metadata: Metadata = {
  title: 'About Us — The Story Behind PixEnhance | Private & Free Image Tools',
  description:
    'Learn why we built PixEnhance: a lightning-fast, privacy-first image and PDF toolkit that runs 100% inside your browser with zero server uploads.',
  alternates: {
    canonical: 'https://pixenhance.in/about',
  },
  openGraph: {
    title: 'About Us — The Story Behind PixEnhance',
    description:
      'Fast, clean, and uncompromisingly private. Discover the mission and philosophy driving PixEnhance.',
    url: 'https://pixenhance.in/about',
    siteName: 'PixEnhance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://pixenhance.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About PixEnhance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — The Story Behind PixEnhance',
    description:
      'Fast, clean, and uncompromisingly private. Discover the mission and philosophy driving PixEnhance.',
    images: ['https://pixenhance.in/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            <span>Our Mission &amp; Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            We built the image toolkit <br className="hidden sm:inline" />
            we wished existed.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            No signup paywalls. No countdown timers. No watermark surprises. And most
            importantly — zero server uploads. Just fast, honest, and truly private
            digital media tools right in your browser.
          </p>
        </div>

        {/* Top Ad Space */}
        <AdBanner className="my-6" />

        {/* Origin Story Card (Human, relatable narrative) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 font-bold">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Why we started PixEnhance
              </h2>
              <p className="text-xs text-slate-400">Written from the heart by creators who were fed up.</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Like almost everyone on the internet, we have all been there. You are applying for a job,
              registering for a competitive exam, or uploading personal documents to a government portal,
              and you are told: <em>&ldquo;Image size must be strictly under 50 KB&rdquo;</em> or <em>&ldquo;Upload as a single PDF under 200 KB&rdquo;</em>.
            </p>
            <p>
              You search Google for a quick solution, click on the first link, and immediately run into a brick wall:
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 pt-2 pb-2">
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm">
                <span className="text-red-500 font-bold text-base leading-none">&times;</span>
                <span>Forced registration and verification emails just to resize one JPG.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm">
                <span className="text-red-500 font-bold text-base leading-none">&times;</span>
                <span>Artificial 30-second download waiting countdowns designed to force paid upgrades.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm">
                <span className="text-red-500 font-bold text-base leading-none">&times;</span>
                <span>Ugly watermarks stamped right across the center of your downloaded photos.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-xs sm:text-sm">
                <span className="text-red-500 font-bold text-base leading-none">&times;</span>
                <span>Secretly uploading your private ID cards, family pictures, and medical bills to third-party cloud servers.</span>
              </li>
            </ul>

            <p>
              We believed the web deserved much better. Modern computers and smartphones are already supercomputers.
              Your web browser is more than powerful enough to compress a photo, reorder PDF pages, or crop a thumbnail without sending your precious private data halfway across the world to an unknown server.
            </p>
            <p className="font-semibold text-slate-900 dark:text-white">
              So we built PixEnhance — an open, honest, client-first media suite that respects your time, your device, and above all, your privacy.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              The principles we live by
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Every feature we design is guided by these non-negotiable promises.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When you drag a file into PixEnhance, it stays on your computer. All compression, format conversion, and PDF rendering executes locally inside your browser&apos;s memory using WebAssembly and HTML5 Canvas. We never see, save, or store your files.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Instant Processing Speed
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Because there is zero round-trip network upload or server queueing delay, operations complete in fractions of a second. Whether you are resizing 50 photos or combining a 10-page PDF, processing is as fast as your device can compute.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Artificial Restrictions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                We despise artificial paywalls and bait-and-switch tactics. We never put watermarks on your work, we never throttle your daily conversions, and you will never see a popup begging you to enter an email to unlock your file.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Engineered for Exact Targets
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you need an exact 20 KB signature, an under-50 KB passport photo, or a 200 KB multi-page PDF, our precision compression algorithms iteratively optimize quality to meet rigorous portal guidelines without guesswork.
              </p>
            </div>
          </div>
        </div>

        {/* Architectural Benchmark Table (PixEnhance vs Cloud Utilities for GEO) */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-brand-600 dark:text-brand-400">
              Technical Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              PixEnhance vs Traditional Cloud Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Why client-side in-browser processing outperforms server-upload utilities like TinyPNG and iLoveIMG.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4 font-semibold">Key Feature</th>
                  <th className="py-3 px-4 font-bold text-brand-600 dark:text-brand-400 bg-brand-50/50 dark:bg-brand-950/20 rounded-t-lg">PixEnhance (In-Browser)</th>
                  <th className="py-3 px-4 font-semibold">Cloud-Based Tools (TinyPNG / iLoveIMG)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-medium">Data Privacy</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">100% Private (Never leaves your device)</td>
                  <td className="py-3.5 px-4 text-slate-500">Uploaded to third-party cloud servers</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Transfer Latency</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">0 ms (Instant local processing)</td>
                  <td className="py-3.5 px-4 text-slate-500">5–30s upload &amp; download waiting</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Batch Limits</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">Unlimited batch operations</td>
                  <td className="py-3.5 px-4 text-slate-500">Capped (e.g. 3–5 files without premium)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Watermarks</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">Zero watermarks guaranteed</td>
                  <td className="py-3.5 px-4 text-slate-500">Often stamped on free outputs</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Target KB Precision</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">Iterative quantization (20KB, 50KB, 100KB, 200KB)</td>
                  <td className="py-3.5 px-4 text-slate-500">Generic percentage compression</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium">Cost &amp; Sign-in</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-600 dark:text-emerald-400 bg-brand-50/30 dark:bg-brand-950/10">100% Free, No login required</td>
                  <td className="py-3.5 px-4 text-slate-500">Freemium model with upgrade popups</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Who is PixEnhance for */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Who uses PixEnhance?
              </h2>
              <p className="text-xs text-slate-400">Built for anyone who values time and privacy.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Students &amp; Job Seekers</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Easily resize and compress ID cards, certificates, and passport photos to exact 20KB, 50KB, or 100KB requirements for government and university exam portals.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Photographers &amp; Creators</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Batch convert JPGs to WebP for modern web performance, prepare crisp A4 print layouts, or compile presentation PDFs without losing color balance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block">Developers &amp; Businesses</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Quickly convert raster graphics to clean SVGs, generate Carbon-style code screenshots, inspect pixel dimensions, and test compression boundaries locally.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <AdBanner className="my-6" />

        {/* CTA Card */}
        <div className="rounded-3xl border border-brand-200 dark:border-brand-900/60 bg-gradient-to-br from-brand-50 to-white dark:from-brand-950/40 dark:to-slate-900 p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ready to experience simple, private media tools?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore our full directory of over 40 free tools and start enhancing, converting, and compressing your files in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/25 transition-all"
            >
              <span>Explore All 40+ Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/image-compressor"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all"
            >
              <span>Try Image Compressor</span>
            </Link>

            <Link
              href="/image-to-pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all"
            >
              <span>Try Image to PDF</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
