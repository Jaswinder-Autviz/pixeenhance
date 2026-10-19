import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | PixEnhance Studio',
  description:
    'Terms of service and usage conditions for PixEnhance free in-browser image and document processing tools.',
  alternates: {
    canonical: 'https://pixenhance.in/terms',
  },
  openGraph: {
    title: 'Terms of Service | PixEnhance Studio',
    description: 'Terms of service and usage conditions for PixEnhance free in-browser media tools.',
    url: 'https://pixenhance.in/terms',
    siteName: 'PixEnhance',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-400">Effective Date: January 1, 2026</p>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using PixEnhance (&quot;the Service&quot; or &quot;we&quot;), available at https://pixenhance.in, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please discontinue using the service immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Description of In-Browser Service
            </h2>
            <p>
              PixEnhance provides browser-native digital media utilities, including image compression, resizing, resolution scaling, format conversion, cropping, and document transformations. All operations execute directly on the user’s client device using HTML5 Canvas, Web Workers, and WebAssembly technologies without uploading image files to remote servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. User Intellectual Property &amp; Ownership
            </h2>
            <p>
              You retain 100% of your ownership, copyright, trademarks, and intellectual property rights in and to all images, graphics, and documents processed using PixEnhance. Because our software operates locally inside your browser session, PixEnhance never acquires any license, title, possession, or storage rights to your materials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              4. Acceptable Use
            </h2>
            <p>
              You agree to use PixEnhance solely for lawful purposes. You agree not to use the service to process, generate, or distribute material that infringes third-party intellectual property rights, violates privacy rights, or contains unlawful, abusive, or harmful content.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              5. Disclaimer of Warranties
            </h2>
            <p>
              PixEnhance is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express, implied, or statutory. We make no warranty that the tools will be completely error-free, uninterrupted, or that the resulting file compression or scaling will meet exact governmental or institutional requirements without user verification. Users are responsible for verifying generated outputs before formal submission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall PixEnhance, its developers, or contributors be liable for any direct, indirect, incidental, consequential, special, or exemplary damages—including but not limited to loss of data, missed application deadlines, or hardware crashes—arising out of the use or inability to use the tools.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              7. Third-Party Advertisements &amp; Links
            </h2>
            <p>
              PixEnhance displays advertisements served by third-party ad networks, including Google AdSense. These third parties may use cookies to serve ads based on your visit to this and other websites. We do not endorse or assume responsibility for any third-party products or services advertised on our pages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              8. Contact &amp; Questions
            </h2>
            <p>
              If you have any questions or legal inquiries regarding these Terms of Service, please contact our team directly at{' '}
              <a
                href="mailto:pa.jaswindersingh@gmail.com"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline hover:opacity-80"
              >
                pa.jaswindersingh@gmail.com
              </a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 font-semibold underline">
                Contact Page
              </Link>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>PixEnhance Studio</span>
          <Link href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            View Privacy Policy &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
