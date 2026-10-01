import { Metadata } from 'next';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
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
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Privacy First Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400 mb-8">Effective Date: January 1, 2026</p>

        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 mb-8 text-emerald-900 dark:text-emerald-200">
          <h2 className="text-base font-bold flex items-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-emerald-600" />
            <span>The Zero-Upload Guarantee</span>
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed">
            PixEnhance is built with complete privacy at its core. Every single image conversion, resize, crop, or compression operation takes place privately on your device. Your files are never transmitted, stored, or accessed by anyone.
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Information We Do Not Collect
            </h2>
            <p>
              When using PixEnhance:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
              <li>We never receive, store, or transmit your uploaded images.</li>
              <li>We never log image dimensions, EXIF data, or visual contents.</li>
              <li>We do not require user accounts, emails, or personal identifiers.</li>
              <li>We do not share any data with third-party advertising brokers or AI training datasets.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Local Storage and Preferences
            </h2>
            <p>
              PixEnhance uses browser <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-xs">localStorage</code> solely to remember your chosen visual theme (Light or Dark mode). No tracking cookies or cross-site fingerprinting tokens are deployed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Google AdSense &amp; Third-Party Cookies Policy
            </h2>
            <p>
              PixEnhance uses Google AdSense to serve advertisements when you visit our website. To comply with Google AdSense policies, please review the following information regarding advertising cookies:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm">
              <li>
                <strong>Third-party vendors</strong>, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
              </li>
              <li>
                <strong>Google&apos;s use of advertising cookies</strong> (such as the DoubleClick cookie) enables it and its partners to serve ads to users based on their visits to PixEnhance and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out Options:</strong> Users may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline font-medium"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 underline font-medium"
                >
                  www.aboutads.info
                </a>
                .
              </li>
            </ul>
            <p className="text-xs text-slate-500 pt-1">
              Advertisements are served in isolated sandboxed containers and have zero access to the files you edit, convert, or compress in your browser.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Analytics &amp; Performance Monitoring
            </h2>
            <p>
              We use aggregated analytics tools (Google Analytics 4 and Microsoft Clarity) solely to monitor website traffic, aggregate user engagement, and fix browser compatibility issues. These tools collect non-personally identifiable diagnostic data (such as browser type, operating system, and page load latency) and do not record or view user image content.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Contact &amp; Data Protection Inquiries
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, cookie preferences, or data practices, please contact us directly at{' '}
              <a href="mailto:pa.jaswindersingh@gmail.com" className="text-brand-600 font-semibold underline">
                pa.jaswindersingh@gmail.com
              </a>{' '}
              or submit a message via our{' '}
              <Link href="/contact" className="text-brand-600 hover:underline">
                Contact Page
              </Link>.
            </p>
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
