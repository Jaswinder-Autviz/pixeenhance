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
  {
    query: 'photo size 20kb OR 50kb',
    category: 'Exam Form Resizer',
    defaultTool: 'https://pixenhance.in/compress-jpg-to-50kb',
  },
  {
    query: 'ssc photo signature resize OR rejected',
    category: 'SSC Forms',
    defaultTool: 'https://pixenhance.in/ssc-cgl-photo-resizer',
  },
  {
    query: 'signature 10kb OR 20kb resize',
    category: 'Signature Tools',
    defaultTool: 'https://pixenhance.in/signature-resizer-10kb',
  },
  {
    query: 'bpsc signature 15kb OR photo',
    category: 'BPSC Bihar',
    defaultTool: 'https://pixenhance.in/bpsc-photo-resizer',
  },
  {
    query: 'neet photo size OR postcard size 5x7',
    category: 'NTA NEET',
    defaultTool: 'https://pixenhance.in/neet-photo-resizer',
  },
  {
    query: 'dv lottery photo 240kb OR 600x600',
    category: 'US DV Lottery',
    defaultTool: 'https://pixenhance.in/dv-lottery-photo-checker-resizer',
  },
  {
    query: 'amazon product image pure white background 2000x2000',
    category: 'Amazon Sellers',
    defaultTool: 'https://pixenhance.in/amazon-product-image-resizer',
  },
  {
    query: 'driving licence photo 20kb sarathi',
    category: 'Sarathi DL',
    defaultTool: 'https://pixenhance.in/driving-licence-photo-resizer',
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
  if (text.includes('amazon') || text.includes('shopify') || text.includes('etsy')) {
    return `To meet marketplace requirements (like Amazon 2000x2000 pure white background or Shopify 2048x2048), this in-browser tool optimizes listing photos with lossless quality:\nhttps://pixenhance.in/amazon-product-image-resizer`;
  }
  if (text.includes('sarathi') || text.includes('driving') || text.includes('licence') || text.includes('parivahan')) {
    return `Sarathi Parivahan portal requires photo and signature strictly between 10KB and 20KB. Here is a free in-browser tool calibrated to exact DL specifications:\nhttps://pixenhance.in/driving-licence-photo-resizer`;
  }

  return `You can resize or compress your image to exact KB or pixel dimensions directly in your web browser with this free private tool:\n${defaultTool}`;
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
