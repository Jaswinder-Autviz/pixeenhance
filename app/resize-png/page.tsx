import { notFound } from 'next/navigation';
import { SEOLandingTemplate } from '@/components/seo/SEOLandingTemplate';
import { generateSEOMetadata } from '@/components/seo/SEOMetadata';
import { getSEOLandingPageBySlug } from '@/src/data/seoLandingPages';

const SLUG = 'resize-png';

export const metadata = generateSEOMetadata(SLUG);

export default function Page() {
  const pageData = getSEOLandingPageBySlug(SLUG);
  if (!pageData) notFound();
  return <SEOLandingTemplate data={pageData} />;
}
