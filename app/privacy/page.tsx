import { Metadata } from 'next';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  XCircle,
  HardDrive,
  Cookie,
  BarChart3,
  Mail,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Privacy Policy — Complete Privacy Guarantee | PixEnhance',
  description:
    'PixEnhance privacy policy: Your photos and files are processed with strict privacy and never stored or collected.',
  alternates: {
    canonical: 'https://pixenhance.in/privacy',
  },
};

export default function PrivacyPage() {
  const quickLinks = [
    { href: '#zero-upload', label: 'Zero-Upload Guarantee' },
    { href: '#no-collection', label: '1. Information Not Collected' },
    { href: '#local-storage', label: '2. Local Storage & Preferences' },
    { href: '#adsense-cookies', label: '3. Google AdSense & Cookies' },
    { href: '#analytics', label: '4. Analytics & Diagnostics' },
    { href: '#contact', label: '5. Contact & Data Inquiries' },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50/70 dark:bg-[#070b14] text-slate-900 dark:text-white py-12 sm:py-16 relative overflow-hidden bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-[450px] h-[450px] bg-gradient-to-bl from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="h-4 w-4" />
            <span>Privacy First Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Effective Date: <span className="font-semibold text-slate-700 dark:text-slate-200">January 1, 2026</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            PixEnhance is engineered to process your photos and documents completely on your own device with zero data transmission.
          </p>
        </div>

        {/* Trust Stat Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {[
            { label: 'Client-Side', value: '100% Local', desc: 'No files upload to servers' },
            { label: 'Cloud Storage', value: 'Zero', desc: 'Never stored or saved' },
            { label: 'User Accounts', value: 'None', desc: 'No signup or passwords' },
            { label: 'Watermarks', value: 'Zero', desc: 'Free clean downloads' },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center backdrop-blur-xs"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {stat.label}
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block">
                {stat.value}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Navigation / Table of Contents Pill Bar */}
        <div className="mb-10 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Table of Contents / Quick Jump</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 border border-slate-200 dark:border-slate-700/60 transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8">
          {/* Zero-Upload Guarantee Highlight Box */}
          <section
            id="zero-upload"
            className="rounded-3xl border-2 border-emerald-500/40 dark:border-emerald-600/50 bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 p-6 sm:p-8 shadow-sm scroll-mt-24"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 shrink-0">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                  Guaranteed Confidentiality
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 mb-2.5">
                  The Zero-Upload Guarantee
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                  PixEnhance is built with complete privacy at its core. Every single image conversion, resize, crop, or compression operation takes place privately on your device. Your files are never transmitted, stored, or accessed by anyone.
                </p>
              </div>
            </div>
          </section>

          {/* Section 1: Information We Do Not Collect */}
          <section
            id="no-collection"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/50">
                <XCircle className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  1. Information We Do Not Collect
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Strict boundaries ensuring total data isolation
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              When using PixEnhance:
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'We never receive, store, or transmit your uploaded images.',
                'We never log image dimensions, EXIF data, or visual contents.',
                'We do not require user accounts, emails, or personal identifiers.',
                'We do not share any data with third-party advertising brokers or AI training datasets.',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Local Storage and Preferences */}
          <section
            id="local-storage"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/50">
                <HardDrive className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  2. Local Storage and Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Minimal on-device preference storage
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              PixEnhance uses browser{' '}
              <code className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                localStorage
              </code>{' '}
              solely to remember your chosen visual theme (Light or Dark mode). No tracking cookies or cross-site fingerprinting tokens are deployed.
            </p>
          </section>

          {/* Section 3: Google AdSense & Third-Party Cookies Policy */}
          <section
            id="adsense-cookies"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/50">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  3. Google AdSense &amp; Third-Party Cookies Policy
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Transparent advertising disclosure &amp; compliance
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              PixEnhance uses Google AdSense to serve advertisements when you visit our website. To comply with Google AdSense policies, please review the following information regarding advertising cookies:
            </p>

            <div className="space-y-3 pt-1">
              <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Third-party vendors</strong>, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Google&apos;s use of advertising cookies</strong> (such as the DoubleClick cookie) enables it and its partners to serve ads to users based on their visits to PixEnhance and/or other sites on the Internet.
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <ExternalLink className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Opt-Out Options:</span>
                </div>
                Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:opacity-80"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:opacity-80"
                >
                  www.aboutads.info
                </a>
                .
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              Advertisements are served in isolated sandboxed containers and have zero access to the files you edit, convert, or compress in your browser.
            </div>
          </section>

          {/* Section 4: Analytics & Performance Monitoring */}
          <section
            id="analytics"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-900/50">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  4. Analytics &amp; Performance Monitoring
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Aggregated telemetry to maintain reliability
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We use aggregated analytics tools (Google Analytics 4 and Microsoft Clarity) solely to monitor website traffic, aggregate user engagement, and fix browser compatibility issues. These tools collect non-personally identifiable diagnostic data (such as browser type, operating system, and page load latency) and do not record or view user image content.
            </p>
          </section>

          {/* Section 5: Contact & Data Protection Inquiries */}
          <section
            id="contact"
            className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-6 sm:p-8 shadow-xs backdrop-blur-sm scroll-mt-24"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-900/50">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  5. Contact &amp; Data Protection Inquiries
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Reach out directly with privacy questions
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions regarding this Privacy Policy, cookie preferences, or data practices, please contact us directly at{' '}
              <a
                href="mailto:pa.jaswindersingh@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:opacity-80"
              >
                pa.jaswindersingh@gmail.com
              </a>{' '}
              or submit a message via our{' '}
              <Link
                href="/contact"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Contact Page
              </Link>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:pa.jaswindersingh@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Email Data Protection Officer</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
              >
                <span>Visit Contact Page</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* Ad Placement */}
        <div className="pt-10">
          <AdPlaceholder slot="in-content" />
        </div>
      </div>
    </div>
  );
}
