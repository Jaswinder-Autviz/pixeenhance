import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer id="app-footer" className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 text-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Info */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Pix<span className="text-brand-600">Enhance</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The modern, privacy-first online image utility hub. Resize, compress, convert, crop, and optimize images with zero latency and complete privacy.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-500">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Complete Privacy Guarantee</span>
            </div>
          </div>

          {/* Column 1: Core Image Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Core Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/image-compressor" className="hover:text-brand-600 transition-colors">
                  Compressor
                </Link>
              </li>
              <li>
                <Link href="/image-resizer" className="hover:text-brand-600 transition-colors">
                  Resizer
                </Link>
              </li>
              <li>
                <Link href="/image-splitter" className="hover:text-brand-600 transition-colors">
                  Image Splitter
                </Link>
              </li>
              <li>
                <Link href="/image-cropper" className="hover:text-brand-600 transition-colors">
                  Cropper
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-png" className="hover:text-brand-600 transition-colors">
                  Converter (All)
                </Link>
              </li>
              <li>
                <Link href="/image-rotator" className="hover:text-brand-600 transition-colors">
                  Image Rotator
                </Link>
              </li>
              <li>
                <Link href="/image-flipper" className="hover:text-brand-600 transition-colors">
                  Image Flipper
                </Link>
              </li>
              <li>
                <Link href="/image-to-pdf" className="hover:text-brand-600 transition-colors">
                  Image to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Compress by Size */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Compress Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/compress-jpg" className="hover:text-brand-600 transition-colors">
                  Compress JPG
                </Link>
              </li>
              <li>
                <Link href="/compress-png" className="hover:text-brand-600 transition-colors">
                  Compress PNG
                </Link>
              </li>
              <li>
                <Link href="/compress-webp" className="hover:text-brand-600 transition-colors">
                  Compress WebP
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg-to-50kb" className="hover:text-brand-600 transition-colors font-medium">
                  Compress to 50KB
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg-to-100kb" className="hover:text-brand-600 transition-colors font-medium">
                  Compress to 100KB
                </Link>
              </li>
              <li>
                <Link href="/compress-jpg-to-200kb" className="hover:text-brand-600 transition-colors font-medium">
                  Compress to 200KB
                </Link>
              </li>
              <li>
                <Link href="/compress-pdf" className="hover:text-brand-600 transition-colors">
                  Compress PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resize & Presets */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Resize &amp; Presets
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resize-image" className="hover:text-brand-600 transition-colors">
                  Resize Image Online
                </Link>
              </li>
              <li>
                <Link href="/resize-jpg" className="hover:text-brand-600 transition-colors">
                  Resize JPG
                </Link>
              </li>
              <li>
                <Link href="/resize-png" className="hover:text-brand-600 transition-colors">
                  Resize PNG
                </Link>
              </li>
              <li>
                <Link href="/resize-image-to-1080x1080" className="hover:text-brand-600 transition-colors">
                  Resize 1080×1080 (1:1)
                </Link>
              </li>
              <li>
                <Link href="/resize-image-to-1920x1080" className="hover:text-brand-600 transition-colors">
                  Resize 1920×1080 (16:9)
                </Link>
              </li>
              <li>
                <Link href="/a4-image-resizer" className="hover:text-brand-600 transition-colors">
                  A4 Resizer (300 DPI)
                </Link>
              </li>
              <li>
                <Link href="/passport-photo-resizer" className="hover:text-brand-600 transition-colors">
                  Passport Photo Resizer
                </Link>
              </li>
              <li>
                <Link href="/visa-photo-resizer" className="hover:text-brand-600 transition-colors">
                  Visa Photo Resizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Convert */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Social &amp; Convert
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/resize-image-for-instagram" className="hover:text-brand-600 transition-colors">
                  Instagram Resizer
                </Link>
              </li>
              <li>
                <Link href="/instagram-post-resizer" className="hover:text-brand-600 transition-colors">
                  Instagram Post Resizer
                </Link>
              </li>
              <li>
                <Link href="/instagram-story-resizer" className="hover:text-brand-600 transition-colors">
                  Story &amp; Reel Resizer
                </Link>
              </li>
              <li>
                <Link href="/resize-image-for-youtube-thumbnail" className="hover:text-brand-600 transition-colors">
                  YouTube Thumbnail
                </Link>
              </li>
              <li>
                <Link href="/youtube-banner-resizer" className="hover:text-brand-600 transition-colors">
                  YouTube Banner
                </Link>
              </li>
              <li>
                <Link href="/facebook-image-resizer" className="hover:text-brand-600 transition-colors">
                  Facebook Resizer
                </Link>
              </li>
              <li>
                <Link href="/linkedin-image-resizer" className="hover:text-brand-600 transition-colors">
                  LinkedIn Resizer
                </Link>
              </li>
              <li>
                <Link href="/whatsapp-image-resizer" className="hover:text-brand-600 transition-colors">
                  WhatsApp DP Resizer
                </Link>
              </li>
              <li>
                <Link href="/webp-to-png" className="hover:text-brand-600 transition-colors">
                  WebP to PNG
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="hover:text-brand-600 transition-colors font-medium">
                  PDF to Word
                </Link>
              </li>
              <li>
                <Link href="/word-to-pdf" className="hover:text-brand-600 transition-colors font-medium">
                  Word to PDF
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-brand-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-brand-600 transition-colors">
                  All 60+ Tools
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 PixEnhance. Free online image and PDF utilities.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <VisitorCounter variant="footer" />
            <p className="hidden md:flex items-center gap-1 text-slate-400 dark:text-slate-500">
              Crafted for speed, simplicity &amp; complete privacy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
