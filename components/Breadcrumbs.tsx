import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  categorySlug?: string;
  categoryTitle?: string;
  toolTitle?: string;
  toolSlug?: string;
  customItems?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({
  categorySlug,
  categoryTitle,
  toolTitle,
  toolSlug,
  customItems,
  className = '',
}: BreadcrumbsProps) {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://pixenhance.in' },
  ];

  if (customItems && customItems.length > 0) {
    items.push(...customItems);
  } else {
    if (categorySlug && categoryTitle) {
      items.push({
        name: categoryTitle,
        url: `https://pixenhance.in/tools/${categorySlug}`,
      });
    } else {
      items.push({
        name: 'Tools',
        url: 'https://pixenhance.in/tools',
      });
    }

    if (toolTitle && toolSlug) {
      items.push({
        name: toolTitle,
        url: `https://pixenhance.in${toolSlug.startsWith('/') ? toolSlug : `/${toolSlug}`}`,
      });
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const relativePath = item.url.replace('https://pixenhance.in', '') || '/';

            return (
              <li key={index} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600 shrink-0" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={relativePath}
                    className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumbs;
