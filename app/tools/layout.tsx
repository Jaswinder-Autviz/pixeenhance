import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Online Image & PDF Tools Directory | PixEnhance',
  description:
    'Browse the complete catalog of free online image compression, PDF conversion, photo resizing, vectorization, and editing utilities.',
  alternates: {
    canonical: 'https://pixenhance.in/tools',
  },
  openGraph: {
    title: 'All Online Image & PDF Tools Directory | PixEnhance',
    description:
      'Browse the complete catalog of free online image compression, PDF conversion, photo resizing, vectorization, and editing utilities.',
    url: 'https://pixenhance.in/tools',
    siteName: 'PixEnhance',
    type: 'website',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
