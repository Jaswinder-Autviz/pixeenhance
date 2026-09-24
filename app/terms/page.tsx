import { Metadata } from 'next';
import Link from 'next/link';
import { AdPlaceholder } from '@/components/common/AdPlaceholder';

export const metadata: Metadata = {
  title: 'Terms of Service | PixEnhance',
  description:
    'Terms of service and usage conditions for PixEnhance free online image utility hub.',
  alternates: {
    canonical: 'https://pixenhance.in/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 mb-8">Effective Date: January 1, 2026</p>

        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using PixEnhance (&quot;the Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Description of Service
            </h2>
            <p>
              PixEnhance provides browser-native image utilities including compression, resizing, format conversion, cropping, and dimension inspection. The service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. User Intellectual Property
            </h2>
            <p>
              You retain all ownership, copyright, and intellectual property rights in and to all images you process with PixEnhance. Because PixEnhance operates entirely on your local machine, PixEnhance never acquires any rights, licenses, or possession of your materials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Disclaimer of Liability
            </h2>
            <p>
              Under no circumstances shall PixEnhance or its contributors be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools.
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
