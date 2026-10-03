import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CATEGORIES, getCategory, getToolsByCategory } from '@/lib/tools';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: catSlug } = await params;
  const category = getCategory(catSlug);

  if (!category) {
    return {
      title: 'Category Not Found | PixEnhance',
    };
  }

  const url = `https://pixenhance.in/tools/${category.slug}`;

  return {
    title: `${category.title} — Free Online Tools | PixEnhance`,
    description: category.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.title} — Free Online Tools | PixEnhance`,
      description: category.description,
      url,
      type: 'website',
      siteName: 'PixEnhance',
      images: [
        {
          url: 'https://pixenhance.in/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${category.title} — PixEnhance`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.title} — Free Online Tools | PixEnhance`,
      description: category.description,
      images: ['https://pixenhance.in/og-image.jpg'],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: catSlug } = await params;
  const category = getCategory(catSlug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(category.slug);

  return (
    <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070b14] text-slate-900 dark:text-white transition-colors py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb Header */}
        <div className="space-y-4">
          <Breadcrumbs
            categorySlug={category.slug}
            categoryTitle={category.title}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                <span>Category Hub &bull; {tools.length} Free Tools</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {category.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {category.intro}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-white/80 dark:bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs shrink-0">
              <ShieldCheck className="h-4 w-4" />
              <span>100% In-Browser Privacy</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <section aria-label={`${category.title} tools list`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="group relative flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 hover:border-brand-500 dark:hover:border-brand-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                      {category.title.split(' ')[0]}
                    </span>
                    <Sparkles className="h-3.5 w-3.5 text-brand-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Accessible stretched-link title */}
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    <Link href={tool.slug} className="after:absolute after:inset-0">
                      {tool.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mt-2">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-600 dark:text-brand-400">
                  <span>Launch Tool</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Navigation Bar */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Explore Other Tool Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isCurrent = cat.slug === category.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/tools/${cat.slug}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${isCurrent
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                    }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
