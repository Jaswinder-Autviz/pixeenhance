import React from 'react';
import Link from 'next/link';

const POPULAR_TOOLS = [
  { name: 'Image Compressor', href: '/image-compressor' },
  { name: 'Compress JPG', href: '/compress-jpg' },
  { name: 'Compress PNG', href: '/compress-png' },
  { name: 'Compress WebP', href: '/compress-webp' },
  { name: 'Compress JPG to 50KB', href: '/compress-jpg-to-50kb' },
  { name: 'Compress JPG to 100KB', href: '/compress-jpg-to-100kb' },
  { name: 'Compress JPG to 200KB', href: '/compress-jpg-to-200kb' },
  { name: 'Image Resizer Online', href: '/resize-image' },
  { name: 'Resize JPG Photos', href: '/resize-jpg' },
  { name: 'Resize PNG Graphics', href: '/resize-png' },
  { name: 'Resize 1080×1080 (1:1)', href: '/resize-image-to-1080x1080' },
  { name: 'Resize 1920×1080 (16:9)', href: '/resize-image-to-1920x1080' },
  { name: 'Resize Image to A4', href: '/resize-image-to-a4' },
  { name: 'Passport Photo Resizer', href: '/passport-photo-resizer' },
  { name: 'Visa Photo Resizer', href: '/visa-photo-resizer' },
  { name: 'Instagram Post Resizer', href: '/instagram-post-resizer' },
  { name: 'Instagram Story & Reel Resizer', href: '/instagram-story-resizer' },
  { name: 'YouTube Thumbnail Resizer', href: '/resize-image-for-youtube-thumbnail' },
  { name: 'YouTube Banner Resizer', href: '/youtube-banner-resizer' },
  { name: 'Facebook Image Resizer', href: '/facebook-image-resizer' },
  { name: 'LinkedIn Image Resizer', href: '/linkedin-image-resizer' },
  { name: 'WhatsApp DP Resizer', href: '/whatsapp-image-resizer' },
  { name: 'WebP to PNG Converter', href: '/webp-to-png' },
  { name: 'Image to PDF Converter', href: '/image-to-pdf' },
  { name: 'PDF to High-DPI JPG', href: '/pdf-to-jpg' },
  { name: 'Compress PDF Size', href: '/compress-pdf' },
  { name: 'PDF to Word Converter', href: '/pdf-to-word' },
  { name: 'Word to PDF Converter', href: '/word-to-pdf' },
  { name: 'Image Splitter Online', href: '/image-splitter' },
  { name: 'Image Cropper Online', href: '/image-cropper' },
  { name: 'Image Rotator & Flipper', href: '/image-rotator' },
];

export function Footer() {
  return (
    <footer id="app-footer" className="w-full border-t border-slate-200/80 dark:border-slate-800 bg-[#F9FAFB] dark:bg-[#070b14] text-slate-600 dark:text-slate-400 text-sm relative z-30 pt-8 pb-5 sm:pt-10 sm:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Row: Brand, Quick Links, Legal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-6 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#4f46e5] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-sm">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h2v-3h-2v3zm0 3h3v-2h-3v2zm3-3h3v-3h-3v3zm0 3h3v-2h-3v2z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#4f46e5] dark:text-indigo-400">
                PixEnhance <span className="text-slate-900 dark:text-white font-bold">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
              The free online studio for image compression, high-resolution upscaling, PDF conversion, photo resizing, and format conversion. Fast, high-fidelity, and 100% private with zero cloud uploads.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 lg:col-span-3 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  About PixEnhance
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link href="/image-resizer" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link href="/image-compressor" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Image Compressor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="md:col-span-3 lg:col-span-3 space-y-2.5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-500 dark:text-slate-400 hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Popular Tools Section */}
        <div className="pt-6 pb-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            Popular Tools
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400 leading-normal">
            {POPULAR_TOOLS.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="hover:text-[#4f46e5] dark:hover:text-indigo-400 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center text-xs text-slate-400 dark:text-slate-500 text-center">
          <p>© 2026 PixEnhance Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


