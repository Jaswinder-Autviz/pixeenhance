import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { SideAdRails } from '@/components/common/SideAdRails';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pixenhance.com'),
  title: {
    default: 'PixEnhance — Free Online Image & PDF Studio',
    template: '%s | PixEnhance',
  },
  description:
    'Free online studio for image compression, PDF conversion, photo resizing, vectorization, and editing. Fast, private, and 100% free.',
  keywords: [
    'image compressor',
    'image resizer',
    'pdf to word',
    'word to pdf',
    'image to pdf',
    'pdf converter',
    'jpg to png',
    'png to jpg',
    'jpg to webp',
    'png to svg',
    'heic to jpg',
    'a4 image resizer',
    'passport photo resizer',
    'instagram image resizer',
    'bulk image resizer',
    'collage maker',
    'compress pdf',
    'pixenhance',
    'free online image tools',
    'browser image editor',
  ],
  authors: [{ name: 'PixEnhance Studio' }],
  creator: 'PixEnhance',
  publisher: 'PixEnhance',
  category: 'Multimedia & Utilities',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      },
  },
  openGraph: {
    title: 'PixEnhance — Free Online Image & PDF Studio',
    description:
      'Compress, resize, convert, and edit images and PDFs instantly. Fast, private, and 100% free.',
    url: 'https://pixenhance.com',
    siteName: 'PixEnhance',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixEnhance — Free Online Image & PDF Studio',
    description:
      'Compress, resize, convert, and edit images and PDFs instantly. Fast, private, and 100% free.',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PixEnhance',
  url: 'https://pixenhance.com',
  description:
    'Free online studio for image compression, PDF conversion, photo resizing, vectorization, and editing. Fast, private, and 100% free.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://pixenhance.com/tools?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#e5ebf2] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500 selection:text-white antialiased transition-colors relative">
        {/* Global Desktop Left & Right Skyscraper Ad Towers */}
        <SideAdRails />

        <Header />
        <main className="flex-grow" id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
