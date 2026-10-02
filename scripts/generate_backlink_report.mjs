import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_TOOL_TOPICS = [
  {
    category: '1. Image Compressor & TinyPNG Alternatives',
    query: 'compress image without losing quality OR tinypng alternative OR compress image free',
    toolUrl: 'https://pixenhance.in/image-compressor',
    commentTemplate: (title) => 
`If you're looking for a free, no-limit alternative to TinyPNG that doesn't compress your privacy, check out [PixEnhance Image Compressor](https://pixenhance.in/image-compressor).

- Runs 100% in your browser using local canvas/WebAssembly (no file uploads to external servers).
- Supports JPG, PNG, and WebP.
- You can target exact KB file sizes (e.g. under 50KB or 100KB) or use visual quality sliders.
- Completely free with zero watermarks or daily batch limits.`
  },
  {
    category: '2. HEIC to JPG Converter (iPhone Photos on Windows/Web)',
    query: 'convert heic to jpg windows OR iphone heic photos to jpg',
    toolUrl: 'https://pixenhance.in/heic-to-jpg',
    commentTemplate: (title) =>
`If you need to quickly convert iPhone .HEIC files to standard JPG without installing bloatware or uploading private photos to unknown cloud servers, you can use [PixEnhance HEIC to JPG](https://pixenhance.in/heic-to-jpg).

It decodes HEIC right inside your browser locally, preserves full resolution, and gives you instant high-quality JPG downloads.`
  },
  {
    category: '3. WebP to PNG / JPG Converter',
    query: 'convert webp to png OR save webp as jpg transparent',
    toolUrl: 'https://pixenhance.in/webp-to-png',
    commentTemplate: (title) =>
`WebP files downloaded from websites can be annoying when software like Photoshop or Discord doesn't support them. 

You can convert them instantly to transparent PNG or JPG here: [PixEnhance WebP to PNG](https://pixenhance.in/webp-to-png). It does the conversion client-side in milliseconds without any quality loss.`
  },
  {
    category: '4. Image to PDF & Compress PDF',
    query: 'convert images to single pdf free OR combine photos into pdf',
    toolUrl: 'https://pixenhance.in/image-to-pdf',
    commentTemplate: (title) =>
`You can combine multiple JPG/PNG images into a single clean PDF document directly in your browser using [PixEnhance Image to PDF](https://pixenhance.in/image-to-pdf). 

Because it processes locally, it's safe for confidential documents, IDs, and certificates without uploading your data.`
  },
  {
    category: '5. Specific KB Target Compressor (20KB, 50KB, 100KB)',
    query: 'reduce photo size to 50kb OR compress image to 20kb',
    toolUrl: 'https://pixenhance.in/compress-jpg-to-50kb',
    commentTemplate: (title) =>
`For government job portals and online forms that strictly require photos under 20KB or 50KB, you can use [PixEnhance 50KB Compressor](https://pixenhance.in/compress-jpg-to-50kb).

It automatically calculates the optimal compression ratio to get under the target limit while keeping text and facial features sharp.`
  },
  {
    category: '6. Bulk Image Resizer & Optimizer',
    query: 'bulk resize images free OR batch resize photos online',
    toolUrl: 'https://pixenhance.in/bulk-image-resizer',
    commentTemplate: (title) =>
`For bulk resizing or batch compression without hitting arbitrary 5-photo upload limits, check out [PixEnhance Bulk Image Resizer](https://pixenhance.in/bulk-image-resizer). Handles dozens of photos locally in parallel using hardware acceleration.`
  }
];

async function fetchRedditDiscussions(query, limit = 3) {
  try {
    const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&t=year&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 PixEnhanceFinder/1.0',
      }
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data?.children || []).map(child => ({
      title: child.data.title,
      subreddit: child.data.subreddit_name_prefixed,
      url: `https://www.reddit.com${child.data.permalink}`,
      numComments: child.data.num_comments,
      score: child.data.score
    }));
  } catch (e) {
    return [];
  }
}

async function run() {
  console.log('🔍 Scanning Reddit & Forums for Image Tools Backlink Opportunities...\n');
  const results = [];

  for (const topic of IMAGE_TOOL_TOPICS) {
    console.log(`Searching: ${topic.category}...`);
    const threads = await fetchRedditDiscussions(topic.query, 3);
    results.push({
      ...topic,
      threads
    });
    // Brief polite pause between searches
    await new Promise(r => setTimeout(r, 600));
  }

  // Generate a clean markdown report
  let md = `# 🚀 PixEnhance Image Tools: Live Backlink & Traffic Opportunities\n\n`;
  md += `Generated on: ${new Date().toLocaleString()}\n\n`;
  md += `### Why Backlinks on These Threads Are Super Powerful:\n`;
  md += `1. **Google Rank #1:** Reddit and Quora threads rank at the very top of Google when users search for image tools.\n`;
  md += `2. **Direct Referral Traffic:** Users reading these threads will click your link immediately.\n`;
  md += `3. **High Domain Authority:** Reddit (DA 95+) passes immense trust to \`pixenhance.in\`.\n\n`;
  md += `---\n\n`;

  for (const r of results) {
    md += `## 📌 ${r.category}\n`;
    md += `**Target PixEnhance Tool:** [${r.toolUrl}](${r.toolUrl})\n\n`;
    
    if (r.threads.length > 0) {
      md += `### 🎯 Live Active Threads to Drop Backlink:\n`;
      r.threads.forEach((t, i) => {
        md += `${i + 1}. **[${t.title}](${t.url})**  \n`;
        md += `   - Community: \`${t.subreddit}\` | Upvotes: ${t.score} | Comments: ${t.numComments}  \n`;
        md += `   - Direct Link: ${t.url}\n\n`;
      });
    } else {
      md += `*Search queries: \`${r.query}\`*\n\n`;
    }

    md += `#### 💬 Ready-to-Post Helpful Reply (Copy & Paste):\n`;
    md += `\`\`\`markdown\n${r.commentTemplate('')}\n\`\`\`\n\n`;
    md += `---\n\n`;
  }

  const reportPath = path.join(__dirname, '..', 'BACKLINK_OPPORTUNITIES.md');
  fs.writeFileSync(reportPath, md, 'utf-8');
  console.log(`\n✅ Backlink report saved successfully to: BACKLINK_OPPORTUNITIES.md`);
}

run();
