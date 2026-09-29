import type { Metadata } from 'next';
import { getSEOLandingPageBySlug } from '@/src/data/seoLandingPages';

export function generateSEOMetadata(slug: string): Metadata {
  const page = getSEOLandingPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found | PixEnhance',
      robots: { index: false, follow: false },
    };
  }

  const url = `https://pixenhance.in/${page.slug}`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: 'PixEnhance',
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: 'https://pixenhance.in/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${page.h1} — PixEnhance`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ['https://pixenhance.in/og-image.jpg'],
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
  };
}
