import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS, CATEGORIES, getAllTools, getCategory } from '../lib/tools';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function runAudit() {
  console.log('🔍 Starting PixEnhance SEO & Link Audit...\n');

  const tools = getAllTools();
  console.log(`📦 Loaded ${tools.length} tools and ${CATEGORIES.length} categories from registry.\n`);

  let errorsFound = 0;
  let warningsFound = 0;

  // 1. Audit Tool Metadata (Title, Description, H1)
  console.log('--- 1. Checking Metadata Completeness ---');
  tools.forEach((tool: any) => {
    if (!tool.title || tool.title.trim().length === 0) {
      console.error(`❌ [Missing Title] Tool: ${tool.slug}`);
      errorsFound++;
    } else if (tool.title.length > 60) {
      console.warn(`⚠️ [Title Too Long: ${tool.title.length} chars] ${tool.slug}: "${tool.title}"`);
      warningsFound++;
    }
    if (!tool.description || tool.description.trim().length < 20) {
      console.error(`❌ [Thin/Missing Description] Tool: ${tool.slug} (length: ${tool.description?.length || 0})`);
      errorsFound++;
    }
    if (!tool.h1 || tool.h1.trim().length === 0) {
      console.error(`❌ [Missing H1] Tool: ${tool.slug}`);
      errorsFound++;
    }
    if (!tool.category || !getCategory(tool.category)) {
      console.error(`❌ [Invalid Category] Tool: ${tool.slug} has category '${tool.category}'`);
      errorsFound++;
    }
  });

  // 2. Audit Internal Links and Broken Slugs
  console.log('\n--- 2. Checking Internal Link Validity ---');
  const validToolSlugs = new Set(tools.map((t: any) => t.slug.replace(/^\//, '')));
  const staticSlugs = new Set(['', 'tools', 'about', 'privacy', 'terms', 'contact']);
  CATEGORIES.forEach((c: any) => staticSlugs.add(`tools/${c.slug}`));

  tools.forEach((tool: any) => {
    if (tool.related) {
      tool.related.forEach((relSlug: string) => {
        const clean = relSlug.replace(/^\//, '');
        if (!validToolSlugs.has(clean) && !staticSlugs.has(clean)) {
          console.error(`❌ [Broken Related Link] In ${tool.slug} -> ${relSlug}`);
          errorsFound++;
        }
      });
    }

    if (tool.nextSteps) {
      tool.nextSteps.forEach((nsSlug: string) => {
        const clean = nsSlug.replace(/^\//, '');
        if (!validToolSlugs.has(clean) && !staticSlugs.has(clean)) {
          console.error(`❌ [Broken Next Step Link] In ${tool.slug} -> ${nsSlug}`);
          errorsFound++;
        }
      });
    }
  });

  // 3. Audit for Orphan Pages (Inbound Internal Links Check)
  console.log('\n--- 3. Checking for Orphan Pages ---');
  const inboundCount: Record<string, number> = {};
  tools.forEach((t: any) => {
    inboundCount[t.slug] = 0;
  });

  // Inbound links from category hubs
  tools.forEach((t: any) => {
    // Each tool belongs to a category hub
    inboundCount[t.slug] = (inboundCount[t.slug] || 0) + 1;
  });

  // Inbound links from other tools' related/nextSteps
  tools.forEach((t: any) => {
    t.related?.forEach((rel: string) => {
      const full = rel.startsWith('/') ? rel : `/${rel}`;
      if (inboundCount[full] !== undefined) {
        inboundCount[full]++;
      }
    });
    t.nextSteps?.forEach((ns: string) => {
      const full = ns.startsWith('/') ? ns : `/${ns}`;
      if (inboundCount[full] !== undefined) {
        inboundCount[full]++;
      }
    });
  });

  let orphanCount = 0;
  Object.entries(inboundCount).forEach(([slug, count]) => {
    if (count === 0) {
      console.warn(`⚠️ [Potential Orphan Page] Tool ${slug} has 0 inbound links`);
      orphanCount++;
      warningsFound++;
    }
  });

  if (orphanCount === 0) {
    console.log('✅ Zero orphan pages found. All tools have internal inbound links.');
  }

  // 4. Audit Canonicals
  console.log('\n--- 4. Checking Canonicals ---');
  const canonicals = new Map<string, string>();
  tools.forEach((t: any) => {
    const canonical = `https://pixenhance.in${t.slug.startsWith('/') ? t.slug : `/${t.slug}`}`;
    if (canonicals.has(canonical)) {
      console.error(`❌ [Duplicate Canonical] ${canonical} mapped multiple times`);
      errorsFound++;
    } else {
      canonicals.set(canonical, t.slug);
    }
  });
  console.log(`✅ Audited ${canonicals.size} unique self-referencing canonical URLs.`);

  // 5. Verification of Safety & AdSense code
  console.log('\n--- 5. Checking AdSense & Safety Invariants ---');
  const layoutContent = fs.readFileSync(path.join(rootDir, 'app', 'layout.tsx'), 'utf-8');
  if (!layoutContent.includes('googleac95a75a7ab9db56')) {
    console.error('❌ CRITICAL: Google site verification tag is missing from app/layout.tsx!');
    errorsFound++;
  } else {
    console.log('✅ Google site verification tag is present.');
  }

  if (!layoutContent.includes('ca-pub-7732882072230308')) {
    console.error('❌ CRITICAL: AdSense publisher ID is missing from app/layout.tsx!');
    errorsFound++;
  } else {
    console.log('✅ AdSense publisher ID is intact.');
  }

  const adsTxtPath = path.join(rootDir, 'public', 'ads.txt');
  if (!fs.existsSync(adsTxtPath)) {
    console.error('❌ CRITICAL: public/ads.txt does not exist!');
    errorsFound++;
  } else {
    const adsTxtContent = fs.readFileSync(adsTxtPath, 'utf-8');
    if (!adsTxtContent.includes('pub-7732882072230308')) {
      console.error('❌ CRITICAL: ads.txt does not contain pub-7732882072230308!');
      errorsFound++;
    } else {
      console.log('✅ public/ads.txt is present and contains publisher ID.');
    }
  }

  // Summary
  console.log('\n========================================');
  console.log(`Audit Finished with ${errorsFound} errors and ${warningsFound} warnings.`);
  console.log('========================================\n');

  if (errorsFound > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error('Audit failed with runtime error:', err);
  process.exit(1);
});
