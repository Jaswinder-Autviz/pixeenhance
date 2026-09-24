import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | PixEnhance Support & Feedback',
  description:
    'Have a feature request, bug report, or partnership inquiry? Reach out to the PixEnhance team.',
  alternates: {
    canonical: 'https://pixenhance.in/contact',
  },
  openGraph: {
    title: 'Contact Us | PixEnhance Support & Feedback',
    description:
      'Have a feature request, bug report, or partnership inquiry? Reach out to the PixEnhance team.',
    url: 'https://pixenhance.in/contact',
    siteName: 'PixEnhance',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
