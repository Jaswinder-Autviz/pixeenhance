import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://pixenhance.in'),
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
  alternates: {
    canonical: 'https://pixenhance.in',
  },
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PixEnhance',
  },
  openGraph: {
    title: 'PixEnhance — Free Online Image & PDF Studio',
    description:
      'Compress, resize, convert, and edit images and PDFs instantly. Fast, private, and 100% free.',
    url: 'https://pixenhance.in',
    siteName: 'PixEnhance',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://pixenhance.in/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixEnhance — Free Online Image & PDF Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixEnhance — Free Online Image & PDF Studio',
    description:
      'Compress, resize, convert, and edit images and PDFs instantly. Fast, private, and 100% free.',
    images: ['https://pixenhance.in/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'googleac95a75a7ab9db56',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://pixenhance.in/#website',
      url: 'https://pixenhance.in',
      name: 'PixEnhance',
      alternateName: [
        'pixenhance',
        'pixenhance.in',
        'Pix Enhance',
        'PixEnhance Studio',
      ],
      description:
        'Free online studio for image compression, PDF conversion, photo resizing, vectorization, and editing. Fast, private, and 100% free.',
      publisher: {
        '@id': 'https://pixenhance.in/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://pixenhance.in/tools?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://pixenhance.in/#organization',
      name: 'PixEnhance',
      alternateName: ['pixenhance', 'Pix Enhance', 'PixEnhance Studio', 'pixenhance.in'],
      url: 'https://pixenhance.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pixenhance.in/favicon.svg',
      },
      sameAs: [],
    },
    {
      '@type': 'WebApplication',
      '@id': 'https://pixenhance.in/#webapp',
      name: 'PixEnhance',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      url: 'https://pixenhance.in',
      description:
        'Free high-speed browser-based image and PDF processing studio.',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#e5ebf2] dark:bg-[#070b14] text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-500 selection:text-white antialiased transition-colors relative"
        suppressHydrationWarning
      >
        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google Analytics 4 (GA4) - Loaded safely via next/script after hydration */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-V7KYB6XEHV"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V7KYB6XEHV', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Google AdSense - Loaded safely via next/script after hydration */}
        <Script
          id="google-adsense"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7732882072230308"
          crossOrigin="anonymous"
        />

        <Header />
        <main className="flex-grow" id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
