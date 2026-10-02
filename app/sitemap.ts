import { MetadataRoute } from 'next';
import { getAllTools, CATEGORIES } from '@/lib/tools';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixenhance.in';
  const currentDate = new Date();

  // Core static landing pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  // New clean category hub pages
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // All active tools from the unified registry (ensuring no live URL is omitted)
  const seenUrls = new Set<string>(staticRoutes.map((r) => r.url));
  categoryRoutes.forEach((r) => seenUrls.add(r.url));

  const toolRoutes: MetadataRoute.Sitemap = [];

  for (const tool of getAllTools()) {
    const slug = tool.slug.startsWith('/') ? tool.slug : `/${tool.slug}`;
    const fullUrl = `${baseUrl}${slug}`;

    if (!seenUrls.has(fullUrl)) {
      seenUrls.add(fullUrl);
      toolRoutes.push({
        url: fullUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      });
    }
  }

  // All high-intent SEO blog articles
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || currentDate),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes];
}

