#!/usr/bin/env node
/**
 * PixEnhance — Smart Forum Backlink & Traffic Assistant (Node.js)
 * Zero external dependencies. Works out of the box with Node 18+.
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SEARCH_TOPICS = [
  // 1. Core Image Compression (TinyPNG / Lossless alternative)
  {
    query: 'compress image without losing quality OR tinypng alternative',
    category: 'Universal Image Compressor',
    defaultTool: 'https://pixenhance.in/image-compressor',
  },
  {
    query: 'compress png transparent OR compress webp size',
    category: 'PNG / WebP Compression',
    defaultTool: 'https://pixenhance.in/compress-png',
  },
  {
    query: 'reduce jpg size to 50kb OR 100kb free',
    category: 'Target KB Compressor',
    defaultTool: 'https://pixenhance.in/compress-jpg-to-100kb',
  },

  // 2. High-Demand Format Converters
  {
    query: 'convert heic to jpg windows free OR iphone heic photos',
    category: 'HEIC to JPG Converter',
    defaultTool: 'https://pixenhance.in/heic-to-jpg',
  },
  {
    query: 'convert webp to png lossless OR save webp as jpg',
    category: 'WebP to PNG/JPG Converter',
    defaultTool: 'https://pixenhance.in/webp-to-png',
  },
  {
    query: 'convert jpg to png transparent background',
    category: 'JPG to PNG Converter',
    defaultTool: 'https://pixenhance.in/jpg-to-png',
  },

  // 3. PDF & Document Tools
  {
    query: 'convert photos to single pdf free OR image to pdf',
    category: 'Image to PDF Converter',
    defaultTool: 'https://pixenhance.in/image-to-pdf',
  },
  {
    query: 'compress pdf under 1mb OR 2mb free online',
    category: 'PDF Compressor',
    defaultTool: 'https://pixenhance.in/compress-pdf',
  },
  {
    query: 'convert pdf to jpg high resolution images',
    category: 'PDF to JPG Converter',
    defaultTool: 'https://pixenhance.in/pdf-to-jpg',
  },

  // 4. Batch & Bulk Operations
  {
    query: 'bulk resize images free OR batch compress photos',
    category: 'Bulk Image Resizer',
    defaultTool: 'https://pixenhance.in/bulk-image-resizer',
  },

  // 5. Social Media Resizers (Instagram, YouTube, WhatsApp)
  {
    query: 'resize image for instagram without cropping 1080x1080',
    category: 'Instagram Post Resizer',
    defaultTool: 'https://pixenhance.in/resize-image-for-instagram',
  },
  {
    query: 'youtube thumbnail size 1280x720 resizer',
    category: 'YouTube Thumbnail Resizer',
    defaultTool: 'https://pixenhance.in/resize-image-for-youtube-thumbnail',
  },
  {
    query: 'whatsapp dp full photo without crop',
    category: 'WhatsApp DP Resizer',
    defaultTool: 'https://pixenhance.in/whatsapp-image-resizer',
  },

  // 6. Exam & Verification Resizers
  {
    query: 'ssc photo signature resize 20kb 50kb',
    category: 'SSC Exam Resizer',
    defaultTool: 'https://pixenhance.in/ssc-cgl-photo-resizer',
  },
  {
    query: 'bpsc signature 15kb OR photo 25kb',
    category: 'BPSC Bihar Resizer',
    defaultTool: 'https://pixenhance.in/bpsc-photo-resizer',
  },
  {
    query: 'neet photo 10kb to 200kb postcard size 5x7',
    category: 'NEET Exam Resizer',
    defaultTool: 'https://pixenhance.in/neet-photo-resizer',
  },
  {
    query: 'dv lottery photo 240kb 600x600 checker',
    category: 'US DV Lottery Checker',
    defaultTool: 'https://pixenhance.in/dv-lottery-photo-checker-resizer',
  },
];

const CONFIG_FILE = path.join(__dirname, 'reddit_config.json');

function loadCredentials() {
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      if (data.client_id && data.client_id !== 'YOUR_REDDIT_CLIENT_ID') {
        return data;
      }
    } catch {}
  }
  return null;
}

async function getRedditOAuthToken(creds) {
  const authUrl = 'https://www.reddit.com/api/v1/access_token';
  const basicAuth = Buffer.from(`${creds.client_id}:${creds.client_secret}`).toString('base64');
  const params = new URLSearchParams({
    grant_type: 'password',
    username: creds.username,
    password: creds.password,
  });

  try {
    const res = await fetch(authUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'User-Agent': creds.user_agent || 'PixEnhanceAssistant/1.0',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.error(`[-] Reddit Auth Error: ${err.message}`);
    return null;
  }
}

async function postRedditComment(postId, commentText, token, userAgent) {
  const url = 'https://oauth.reddit.com/api/comment';
  const fullname = postId.startsWith('t3_') ? postId : `t3_${postId}`;
  const params = new URLSearchParams({
    thing_id: fullname,
    text: commentText,
    api_type: 'json',
  });

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'User-Agent': userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();
    if (!data?.json?.errors?.length) {
      return true;
    }
    console.error('[-] API Error:', data.json.errors);
    return false;
  } catch (err) {
    console.error('[-] Posting Exception:', err.message);
    return false;
  }
}

async function searchRedditPosts(query, limit = 4) {
  const encodedQuery = encodeURIComponent(query);
  const url = `https://www.reddit.com/search.json?q=${encodedQuery}&sort=new&limit=${limit}`;

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 PixEnhanceFinder/1.0',
      },
    });

    if (!res.ok) return [];
    const data = await res.json();
    const children = data?.data?.children || [];

    return children.map((c) => ({
      id: c.data.id,
      title: c.data.title || '',
      subreddit: c.data.subreddit_name_prefixed || '',
      url: `https://reddit.com${c.data.permalink || ''}`,
      selftext: (c.data.selftext || '').slice(0, 200),
      num_comments: c.data.num_comments || 0,
    }));
  } catch (err) {
    return [];
  }
}

function generateHelpfulReply(title, selftext, defaultTool) {
  const text = `${title} ${selftext}`.toLowerCase();

  // 1. General & Lossless Image Compression (TinyPNG alternative)
  if (text.includes('tinypng') || text.includes('compress image') || text.includes('compress photo') || text.includes('reduce image size') || text.includes('reduce photo size')) {
    return `If you want to compress images without losing quality, check out PixEnhance. It runs 100% locally in your browser (no file uploads to external servers), has no file size limits, and lets you target specific KB sizes or visual quality presets:\nhttps://pixenhance.in/image-compressor\n\nIt handles JPG, PNG, and WebP with instant side-by-side comparison.`;
  }

  // 2. HEIC to JPG (iPhone on Windows)
  if (text.includes('heic') || text.includes('iphone photo on windows') || text.includes('heif')) {
    return `You can convert iPhone HEIC photos to standard high-resolution JPG directly in your browser without uploading your private photos to remote servers:\nhttps://pixenhance.in/heic-to-jpg\n\nPreserves full EXIF details and photo clarity with instant download.`;
  }

  // 3. WebP to PNG / JPG
  if (text.includes('webp to png') || text.includes('save webp') || text.includes('convert webp')) {
    return `Here is a fast in-browser converter to turn WebP files into clean, transparent PNG or JPG with lossless quality:\nhttps://pixenhance.in/webp-to-png\n\nNo sign-up or watermarks required.`;
  }

  // 4. PDF Tools (Image to PDF / Compress PDF)
  if (text.includes('image to pdf') || text.includes('photo to pdf') || text.includes('convert to pdf')) {
    return `You can merge and convert multiple JPG or PNG images into a single lightweight PDF document directly in your browser:\nhttps://pixenhance.in/image-to-pdf\n\nWorks completely client-side for confidential certificates and invoices.`;
  }
  if (text.includes('compress pdf') || text.includes('reduce pdf size')) {
    return `If your PDF is too large for email or web portal uploads, this in-browser tool optimizes and compresses PDF files under 1MB or 2MB without blurring text:\nhttps://pixenhance.in/compress-pdf`;
  }

  // 5. Bulk & Batch Image Resizing
  if (text.includes('batch') || text.includes('bulk resize') || text.includes('multiple photos')) {
    return `If you need to resize or compress multiple photos at once, PixEnhance has a free bulk image resizer that processes batches right on your computer using local browser canvas:\nhttps://pixenhance.in/bulk-image-resizer`;
  }

  // 6. Social Media & Instagram 1080x1080
  if (text.includes('instagram') || text.includes('1080x1080') || text.includes('post resizer')) {
    return `To fit vertical or landscape photos into Instagram feed without unwanted cropping, you can use this free resizer that adds matching blurred borders or exact 1080x1080 / 1080x1350 dimensions:\nhttps://pixenhance.in/resize-image-for-instagram`;
  }

  // 7. YouTube Thumbnail
  if (text.includes('youtube thumbnail') || text.includes('1280x720')) {
    return `Here is a dedicated tool to scale and compress YouTube thumbnails to exact 1280x720 pixels under the 2MB YouTube upload limit:\nhttps://pixenhance.in/resize-image-for-youtube-thumbnail`;
  }

  // 8. WhatsApp DP
  if (text.includes('whatsapp dp') || text.includes('profile picture no crop')) {
    return `You can set full photos as WhatsApp DP without cropping friends or backgrounds using this free tool:\nhttps://pixenhance.in/whatsapp-image-resizer`;
  }

  // 9. Exam & Government Forms
  if (text.includes('ssc') || text.includes('cgl') || text.includes('chsl')) {
    return `Bhai, tension mat lo, phone browser se hi 1 second mein ho jata hai. Maine PixEnhance ka dedicated SSC tool use kiya tha, photo 20KB-50KB aur signature 10KB-20KB exact SSC rules ke according resize ho gaya:\nhttps://pixenhance.in/ssc-cgl-photo-resizer\n\nPhoto kisi server par upload nahi hoti to document privacy safe rehti hai.`;
  }
  if (text.includes('bpsc') || text.includes('tre') || text.includes('bihar')) {
    return `BPSC ke portal par signature under 15KB (220x100 pixels) chahiye hota hai. Is free tool se directly exact size par format kar lo:\nhttps://pixenhance.in/bpsc-photo-resizer\n\nHindi aur English signature dono presets pehle se configured hain.`;
  }
  if (text.includes('neet') || text.includes('nta') || text.includes('jee')) {
    return `NTA forms ke liye photo 10KB se 200KB ke beech honi chahiye with 80% face coverage. Aap browser mein seedha PixEnhance se format kar sakte ho:\nhttps://pixenhance.in/neet-photo-resizer\n\nWhite background aur dimensions pehle se calibrated hain.`;
  }
  if (text.includes('dv') || text.includes('lottery') || text.includes('green card')) {
    return `For the US DV Lottery, the photo must be strictly 600x600 pixels and under 240 KB in sRGB color. You can format and check your photo directly here:\nhttps://pixenhance.in/dv-lottery-photo-checker-resizer\n\nIt checks biometric head height to prevent lottery disqualification.`;
  }

  return `You can resize, convert, or compress your image to exact KB or pixel dimensions directly in your web browser with this free private tool:\n${defaultTool}`;
}

function openBrowser(url) {
  const start = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
  exec(`${start} "${url}"`);
}

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  console.log('='.repeat(70));
  console.log('   PixEnhance — Smart Forum Backlink & Traffic Assistant (Node.js)');
  console.log('='.repeat(70));

  const creds = loadCredentials();
  let token = null;

  if (creds) {
    console.log(`[*] Reddit API configured for user: ${creds.username}`);
    token = await getRedditOAuthToken(creds);
    if (token) {
      console.log('[✓] Direct Terminal Posting: ENABLED');
    } else {
      console.log('[!] Reddit Auth failed. Falling back to 1-Click Browser mode.');
    }
  } else {
    console.log('[i] Reddit API keys not configured. Running in Safe 1-Click Browser Mode.');
    console.log('    (To enable direct terminal posting, edit scripts/reddit_config.json)');
  }

  console.log('\n[*] Scanning active student and applicant queries...\n' + '-'.repeat(70));

  const seenPosts = new Set();
  let totalProcessed = 0;

  for (const topic of SEARCH_TOPICS) {
    console.log(`\n🔍 Searching for: ${topic.category} (${topic.query})...`);
    const posts = await searchRedditPosts(topic.query, 4);

    if (!posts.length) {
      console.log('   No recent unreplied posts found for this query.');
      continue;
    }

    for (const post of posts) {
      if (seenPosts.has(post.id)) continue;
      seenPosts.add(post.id);
      totalProcessed++;

      const replyText = generateHelpfulReply(post.title, post.selftext, topic.defaultTool);

      console.log('\n' + '='.repeat(70));
      console.log(`📌 Community: ${post.subreddit}`);
      console.log(`❓ Question:  ${post.title}`);
      console.log(`🔗 URL:       ${post.url}`);
      console.log(`💬 Comments:  ${post.num_comments} replies currently`);
      console.log('-'.repeat(70));
      console.log('📝 Suggested Helpful Response:');
      console.log(replyText);
      console.log('='.repeat(70));

      console.log('\nSelect Action:');
      if (token) {
        console.log('  [1] Post reply DIRECTLY from terminal (Reddit API)');
      }
      console.log('  [2] Open post in Browser (1-Click Safe Reply)');
      console.log('  [3] Skip to next query');
      console.log('  [4] Exit');

      const choice = await askQuestion('\nEnter choice [1/2/3/4]: ');

      if (choice === '1' && token) {
        console.log('\n[*] Submitting comment via Reddit API...');
        const success = await postRedditComment(
          post.id,
          replyText,
          token,
          creds.user_agent || 'PixEnhance/1.0'
        );
        if (success) {
          console.log('[✓] 200 OK! Comment successfully posted directly from terminal!');
        } else {
          console.log('[!] Failed to post via API. Opening in browser instead...');
          openBrowser(post.url);
        }
      } else if (choice === '2' || (choice === '1' && !token)) {
        console.log(`\n[*] Opening ${post.url} in your browser...`);
        openBrowser(post.url);
        console.log('[i] Copy the suggested response above and paste it into the comment box!');
      } else if (choice === '4') {
        console.log('\n[*] Exiting. Happy ranking!');
        return;
      } else {
        console.log('[*] Skipped.');
      }

      await new Promise((r) => setTimeout(r, 800));
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`[*] Finished scanning! Processed ${totalProcessed} relevant discussions.`);
  console.log('='.repeat(70));
}

main().catch(console.error);
