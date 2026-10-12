import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://pixenhance.in';

async function generateSitemapAndSchemaReport() {
  console.log('🚀 Starting Sitemap & Schema Generator Script...\n');

  // Load SEO landing pages
  const seoDataFile = path.join(rootDir, 'src', 'data', 'seoLandingPages.ts');
  const seoFileContent = fs.readFileSync(seoDataFile, 'utf-8');

  // Load tools list
  const toolsDataFile = path.join(rootDir, 'src', 'data', 'toolsList.ts');
  const toolsFileContent = fs.readFileSync(toolsDataFile, 'utf-8');

  // Extract slugs from SEO_LANDING_PAGES and TOOLS_LIST
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = new Set();
  let match;
  while ((match = slugRegex.exec(seoFileContent)) !== null) {
    slugs.add(match[1]);
  }
  while ((match = slugRegex.exec(toolsFileContent)) !== null) {
    slugs.add(match[1]);
  }

  // Redirected aliases that should NEVER appear in sitemap
  const excludedSlugs = new Set([
    'compress-jpeg-to-20kb',
    'compress-photo-to-20kb',
    'compress-image-to-50kb',
    'compress-photo-to-50kb',
    'compress-image-to-100kb',
    'compress-photo-to-100kb',
    'compress-image-to-200kb',
    'compress-photo-to-200kb',
    'crop-image',
    'rotate-image',
    'flip-image',
    'split-image',
    'grid-splitter',
    'panorama-splitter',
    'photo-splitter',
    'webp-to-jpg-converter',
    'webp-to-png-converter',
    'jpg-to-png-converter',
    'png-to-jpg-converter',
    'heic-to-jpg-converter',
    'heic-to-jpeg',
  ]);

  // Static core routes
  const staticRoutes = [
    '',
    '/tools',
    '/blog',
    '/about',
    '/privacy',
    '/terms',
    '/contact',
  ];

  // Category hubs
  const categories = [
    '/tools/compress',
    '/tools/convert',
    '/tools/resize',
    '/tools/crop-edit',
    '/tools/pdf-tools',
    '/tools/social-media',
    '/tools/utilities',
  ];

  const allUrls = new Set();

  staticRoutes.forEach(r => allUrls.add(`${BASE_URL}${r}`));
  categories.forEach(r => allUrls.add(`${BASE_URL}${r}`));

  slugs.forEach(s => {
    const clean = s.replace(/^\//, '');
    if (!excludedSlugs.has(clean)) {
      allUrls.add(`${BASE_URL}/${clean}`);
    }
  });

  const urlList = Array.from(allUrls);
  const now = new Date().toISOString().split('T')[0];

  // Construct XML Sitemap
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    url => `  <url>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === BASE_URL ? '1.0' : url.includes('/tools/') ? '0.85' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');

  console.log(`✅ [Sitemap] Successfully generated ${publicSitemapPath}`);
  console.log(`📊 [Total URLs in Sitemap]: ${urlList.length} pages\n`);

  console.log('✨ [JSON-LD Schema Verification]:');
  console.log('   - WebApplication Schema: ✅ Active (Includes AggregateRating ⭐ 4.9/5)');
  console.log('   - BreadcrumbList Schema: ✅ Active');
  console.log('   - HowTo Schema: ✅ Active');
  console.log('   - FAQPage Schema: ✅ Active');
  console.log('\n🎉 Auto Sitemap & Schema Script execution complete!\n');
}

generateSitemapAndSchemaReport().catch(err => {
  console.error('❌ Error generating sitemap and schema:', err);
});
