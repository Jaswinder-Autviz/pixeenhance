/**
 * PixEnhance — Google Indexing API Fast Submitter (Zero Dependencies, Pure Node.js)
 * 
 * Works out-of-the-box with Node.js (v18+). No pip, no npm packages required!
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for service_account.json in scripts/ or project root
let keyPath = path.join(__dirname, 'service_account.json');
if (!fs.existsSync(keyPath)) {
  keyPath = path.join(__dirname, '..', 'service_account.json');
}

const BASE_URL = 'https://pixenhance.in';

const URLS_TO_INDEX = [
  // Core Static
  `${BASE_URL}`,
  `${BASE_URL}/tools`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/about`,
  `${BASE_URL}/privacy`,
  `${BASE_URL}/terms`,
  `${BASE_URL}/contact`,

  // Popular Compression Tools
  `${BASE_URL}/image-compressor`,
  `${BASE_URL}/compress-jpg`,
  `${BASE_URL}/compress-jpg-to-20kb`,
  `${BASE_URL}/compress-jpg-to-50kb`,
  `${BASE_URL}/compress-jpg-to-100kb`,
  `${BASE_URL}/compress-jpg-to-200kb`,
  `${BASE_URL}/compress-png`,
  `${BASE_URL}/compress-webp`,
  `${BASE_URL}/compress-pdf`,

  // Popular Resizers
  `${BASE_URL}/image-resizer`,
  `${BASE_URL}/resize-jpg`,
  `${BASE_URL}/resize-png`,
  `${BASE_URL}/resize-image-to-1080x1080`,
  `${BASE_URL}/resize-image-to-1920x1080`,
  `${BASE_URL}/resize-image-for-instagram`,
  `${BASE_URL}/instagram-post-resizer`,
  `${BASE_URL}/instagram-story-resizer`,
  `${BASE_URL}/visa-photo-resizer`,
  `${BASE_URL}/whatsapp-image-resizer`,
  `${BASE_URL}/facebook-image-resizer`,
  `${BASE_URL}/linkedin-image-resizer`,
  `${BASE_URL}/resize-image-for-youtube-thumbnail`,
  `${BASE_URL}/youtube-banner-resizer`,

  // Converter & PDF Tools
  `${BASE_URL}/image-converter`,
  `${BASE_URL}/jpg-to-png`,
  `${BASE_URL}/png-to-jpg`,
  `${BASE_URL}/webp-to-png`,
  `${BASE_URL}/heic-to-jpg`,
  `${BASE_URL}/image-to-pdf`,
  `${BASE_URL}/pdf-to-word`,
  `${BASE_URL}/word-to-pdf`,
  `${BASE_URL}/pdf-to-jpg`,
  `${BASE_URL}/pdf-to-png`,

  // 32 High-Intent SEO Articles
  `${BASE_URL}/blog/how-to-compress-image-to-20kb`,
  `${BASE_URL}/blog/reduce-jpg-size-without-losing-quality`,
  `${BASE_URL}/blog/resize-image-for-instagram`,
  `${BASE_URL}/blog/resize-photo-for-passport`,
  `${BASE_URL}/blog/convert-png-to-jpg`,
  `${BASE_URL}/blog/convert-heic-to-jpg-on-windows`,
  `${BASE_URL}/blog/convert-image-to-pdf`,
  `${BASE_URL}/blog/reduce-pdf-size`,
  `${BASE_URL}/blog/a4-photo-size-in-pixels`,
  `${BASE_URL}/blog/passport-photo-size-in-pixels`,
  `${BASE_URL}/blog/how-to-compress-image-to-50kb`,
  `${BASE_URL}/blog/how-to-compress-image-to-100kb`,
  `${BASE_URL}/blog/how-to-resize-signature-online`,
  `${BASE_URL}/blog/best-image-format-png-vs-jpg-vs-webp`,
  `${BASE_URL}/blog/how-to-resize-image-for-youtube-thumbnail`,
  `${BASE_URL}/blog/pan-card-photo-signature-resize-guide`,
  `${BASE_URL}/blog/ssc-photo-and-signature-resizer-guide`,
  `${BASE_URL}/blog/how-to-convert-pdf-to-word-free`,
  `${BASE_URL}/blog/whatsapp-dp-size-and-dimensions`,
  `${BASE_URL}/blog/facebook-cover-photo-size-guide`,
  `${BASE_URL}/blog/linkedin-banner-and-profile-size`,
  `${BASE_URL}/blog/dpi-vs-ppi-explained-for-print`,
  `${BASE_URL}/blog/how-to-batch-compress-images-fast`,
  `${BASE_URL}/blog/how-to-make-transparent-png-background`,
  `${BASE_URL}/blog/fix-blurry-image-after-uploading`,
  `${BASE_URL}/blog/convert-webp-to-png-lossless`,
  `${BASE_URL}/blog/compress-image-for-email-attachment`,
  `${BASE_URL}/blog/how-to-convert-svg-to-png-high-res`,
  `${BASE_URL}/blog/how-to-crop-image-to-circle`,
  `${BASE_URL}/blog/how-to-split-image-for-instagram-grid`,
  `${BASE_URL}/blog/how-to-convert-word-to-pdf-cleanly`,
  `${BASE_URL}/blog/how-to-extract-images-from-pdf`,
];

function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(serviceAccount) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaim = base64url(JSON.stringify(claimSet));
  const signInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signInput);
  signer.end();
  const signature = signer.sign(serviceAccount.private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${signInput}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error(`Auth failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function submitUrl(url, accessToken) {
  const endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      type: 'URL_UPDATED',
    }),
  });

  return { status: res.status, text: await res.text() };
}

async function main() {
  console.log('='.repeat(65));
  console.log('  PixEnhance — Google Indexing API Fast Submitter (Node.js)');
  console.log('='.repeat(65));

  if (!fs.existsSync(keyPath)) {
    console.log(`\n[!] ERROR: 'service_account.json' not found!`);
    console.log(`Expected at: ${keyPath}`);
    console.log('\nPlease place your downloaded Google Cloud service_account.json in the "scripts" folder.');
    return;
  }

  const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf-8'));
  console.log(`\n[*] Authenticating as: ${serviceAccount.client_email}`);

  let accessToken;
  try {
    accessToken = await getAccessToken(serviceAccount);
    console.log('[*] Google authentication successful!\n');
  } catch (err) {
    console.error(`[!] Authentication error: ${err.message}`);
    return;
  }

  console.log(`[*] Submitting ${URLS_TO_INDEX.length} URLs to Googlebot...\n` + '-'.repeat(65));

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < URLS_TO_INDEX.length; i++) {
    const url = URLS_TO_INDEX[i];
    try {
      const { status, text } = await submitUrl(url, accessToken);
      if (status === 200) {
        console.log(`[${i + 1}/${URLS_TO_INDEX.length}] [200 OK] Submitted: ${url}`);
        successCount++;
      } else {
        console.log(`[${i + 1}/${URLS_TO_INDEX.length}] [${status}] Error: ${url} -> ${text.slice(0, 70)}`);
        failCount++;
      }
    } catch (err) {
      console.log(`[${i + 1}/${URLS_TO_INDEX.length}] [FAILED] ${url}: ${err.message}`);
      failCount++;
    }

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 400));
  }

  console.log('-'.repeat(65));
  console.log(`[*] Finished! Success: ${successCount} | Failed: ${failCount}`);
  console.log('[*] Googlebot will now rapidly crawl and index these pages.\n' + '='.repeat(65));
}

main().catch(console.error);
