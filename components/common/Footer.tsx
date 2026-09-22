import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { VisitorCounter } from './VisitorCounter';

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-600 dark:text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
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

          {/* Column 1: Image Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Image Tools
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
            </ul>
          </div>

          {/* Column 2: Popular Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Popular Tools
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/jpg-to-png" className="hover:text-brand-600 transition-colors">
                  JPG to PNG
                </Link>
              </li>
              <li>
                <Link href="/png-to-jpg" className="hover:text-brand-600 transition-colors">
                  PNG to JPG
                </Link>
              </li>
              <li>
                <Link href="/jpg-to-webp" className="hover:text-brand-600 transition-colors">
                  WebP Converter
                </Link>
              </li>
              <li>
                <Link href="/a4-image-resizer" className="hover:text-brand-600 transition-colors">
                  A4 Resizer (300 DPI)
                </Link>
              </li>
              <li>
                <Link href="/instagram-image-resizer" className="hover:text-brand-600 transition-colors">
                  Instagram Resizer
                </Link>
              </li>
              <li>
                <Link href="/pdf-to-word" className="hover:text-brand-600 transition-colors font-medium">
                  PDF to Word (New)
                </Link>
              </li>
              <li>
                <Link href="/word-to-pdf" className="hover:text-brand-600 transition-colors font-medium">
                  Word to PDF (New)
                </Link>
              </li>
              <li>
                <Link href="/image-to-pdf" className="hover:text-brand-600 transition-colors">
                  Image to PDF
                </Link>
              </li>
              <li>
                <Link href="/passport-photo-resizer" className="hover:text-brand-600 transition-colors">
                  Passport Photo Resizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200 font-mono">
              Company
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools" className="hover:text-brand-600 transition-colors">
                  All 20 Tools
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
