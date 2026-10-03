import React from 'react';
import Link from 'next/link';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer id="app-footer" className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 text-sm relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-5 sm:pt-10 sm:pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Column 1: Core Image Tools */}
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Core Tools
            </h3>
            <ul className="space-y-1.5 text-xs">
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
                <Link href="/image-converter" className="hover:text-brand-600 transition-colors">
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
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Compress Tools
            </h3>
            <ul className="space-y-1.5 text-xs">
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
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Resize &amp; Presets
            </h3>
            <ul className="space-y-1.5 text-xs">
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
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Social &amp; Convert
            </h3>
            <ul className="space-y-1.5 text-xs">
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
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/blog" className="hover:text-brand-600 transition-colors font-medium text-emerald-600 dark:text-emerald-400">
                  Blog
                </Link>
              </li>
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

        {/* Compact Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 PixEnhance. Free online image and PDF utilities.</p>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
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
