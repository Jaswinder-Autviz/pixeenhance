/**
 * PixEnhance — Universal Google Indexing API Submitter (All Tools & High-Intent Keywords)
 * 
 * Submits every single tool on PixEnhance:
 * 1. Image Compressors & Target KB Solvers (20kb, 50kb, 100kb, 200kb, PNG, WebP)
 * 2. Format Converters (HEIC to JPG, WebP to PNG, JPG to PNG, PNG to SVG, etc.)
 * 3. PDF Studio Tools (Image to PDF, Compress PDF, PDF to Word, Word to PDF, etc.)
 * 4. Image Resizers & Bulk Engines (1080x1080, 1920x1080, A4, Crop, Split, Rotate)
 * 5. Social Media Presets (Instagram, YouTube, WhatsApp, LinkedIn, Facebook)
 * 6. High-CPC Global Tools (Amazon, Shopify, Etsy, Real Estate MLS, DV Lottery, Passports)
 * 7. Category Hubs & In-Depth Technical SEO Guides
 * 8. Exam & Verification Tools (SSC, RRB, UPSC, NEET, etc.)
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

export const INDEXING_TARGETS = [
  // ==========================================
  // 1. CORE STATIC & PORTAL PAGES
  // ==========================================
  { url: `${BASE_URL}`, category: 'Homepage' },
  { url: `${BASE_URL}/tools`, category: 'All Tools Hub' },
  { url: `${BASE_URL}/tools/compress`, category: 'Compress Hub' },
  { url: `${BASE_URL}/tools/convert`, category: 'Convert Hub' },
  { url: `${BASE_URL}/tools/resize`, category: 'Resize Hub' },
  { url: `${BASE_URL}/tools/crop-edit`, category: 'Crop & Edit Hub' },
  { url: `${BASE_URL}/tools/social-media`, category: 'Social Media Hub' },
  { url: `${BASE_URL}/tools/pdf-tools`, category: 'PDF Tools Hub' },
  { url: `${BASE_URL}/tools/utilities`, category: 'Utilities Hub' },
  { url: `${BASE_URL}/blog`, category: 'Blog Hub' },
  { url: `${BASE_URL}/about`, category: 'Trust & About' },
  { url: `${BASE_URL}/privacy`, category: 'GDPR Privacy Policy' },
  { url: `${BASE_URL}/terms`, category: 'Terms of Service' },
  { url: `${BASE_URL}/contact`, category: 'Contact & Support' },

  // ==========================================
  // 2. IMAGE COMPRESSOR & SIZE TOOLS (HIGH SEARCH VOLUME)
  // ==========================================
  { url: `${BASE_URL}/image-compressor`, category: 'Universal Compressor' },
  { url: `${BASE_URL}/compress-jpg`, category: 'JPG Compressor' },
  { url: `${BASE_URL}/compress-jpg-to-20kb`, category: 'Compress to 20KB' },
  { url: `${BASE_URL}/compress-jpg-to-50kb`, category: 'Compress to 50KB' },
  { url: `${BASE_URL}/compress-jpg-to-100kb`, category: 'Compress to 100KB' },
  { url: `${BASE_URL}/compress-jpg-to-200kb`, category: 'Compress to 200KB' },
  { url: `${BASE_URL}/compress-png`, category: 'PNG Compressor' },
  { url: `${BASE_URL}/compress-webp`, category: 'WebP Compressor' },
  { url: `${BASE_URL}/image-quality`, category: 'Image Quality Optimizer' },

  // ==========================================
  // 3. HIGH-DEMAND FORMAT CONVERTERS
  // ==========================================
  { url: `${BASE_URL}/heic-to-jpg`, category: 'iPhone HEIC to JPG' },
  { url: `${BASE_URL}/webp-to-png`, category: 'WebP to Transparent PNG' },
  { url: `${BASE_URL}/jpg-to-png`, category: 'JPG to PNG Converter' },
  { url: `${BASE_URL}/png-to-jpg`, category: 'PNG to JPG Converter' },
  { url: `${BASE_URL}/jpg-to-webp`, category: 'JPG to Next-Gen WebP' },
  { url: `${BASE_URL}/png-to-webp`, category: 'PNG to WebP Converter' },
  { url: `${BASE_URL}/webp-to-jpg`, category: 'WebP to Standard JPG' },
  { url: `${BASE_URL}/png-to-svg`, category: 'PNG to Vector SVG' },
  { url: `${BASE_URL}/svg-converter`, category: 'SVG Vector Converter' },
  { url: `${BASE_URL}/image-converter`, category: 'Universal Format Converter' },
  { url: `${BASE_URL}/image-to-base64`, category: 'Image to Base64 String' },
  { url: `${BASE_URL}/base64-to-image`, category: 'Base64 to Image File' },

  // ==========================================
  // 4. PDF STUDIO & DOCUMENT TOOLS
  // ==========================================
  { url: `${BASE_URL}/image-to-pdf`, category: 'Photos to Single PDF' },
  { url: `${BASE_URL}/compress-pdf`, category: 'PDF Compressor Under 1MB' },
  { url: `${BASE_URL}/pdf-to-word`, category: 'PDF to Word DOCX' },
  { url: `${BASE_URL}/word-to-pdf`, category: 'Word DOCX to PDF' },
  { url: `${BASE_URL}/pdf-to-jpg`, category: 'PDF to High-Res JPG' },
  { url: `${BASE_URL}/pdf-to-png`, category: 'PDF to Crisp PNG' },
  { url: `${BASE_URL}/pdf-to-gif`, category: 'PDF to GIF Animator' },
  { url: `${BASE_URL}/pdf-converter`, category: 'PDF Conversion Studio' },
  { url: `${BASE_URL}/jpg-to-pdf`, category: 'JPG to PDF Document' },
  { url: `${BASE_URL}/png-to-pdf`, category: 'PNG to PDF Document' },

  // ==========================================
  // 5. BULK RESIZERS & IMAGE EDITING SUITE
  // ==========================================
  { url: `${BASE_URL}/bulk-image-resizer`, category: 'Batch / Bulk Resizer' },
  { url: `${BASE_URL}/image-resizer`, category: 'Pixel & Inch Resizer' },
  { url: `${BASE_URL}/resize-jpg`, category: 'JPEG Resizer' },
  { url: `${BASE_URL}/resize-png`, category: 'PNG Resizer' },
  { url: `${BASE_URL}/resize-image-to-1080x1080`, category: '1080x1080 Square Resizer' },
  { url: `${BASE_URL}/resize-image-to-1920x1080`, category: '1920x1080 Full HD Resizer' },
  { url: `${BASE_URL}/image-cropper`, category: 'Aspect Ratio Cropper' },
  { url: `${BASE_URL}/crop-image`, category: 'Freehand Cropper' },
  { url: `${BASE_URL}/image-rotator`, category: 'Rotate 90/180/270' },
  { url: `${BASE_URL}/rotate-image`, category: 'Orientation Adjuster' },
  { url: `${BASE_URL}/image-flipper`, category: 'Horizontal/Vertical Flip' },
  { url: `${BASE_URL}/flip-image`, category: 'Mirror Image' },
  { url: `${BASE_URL}/image-splitter`, category: 'Grid & Tile Splitter' },
  { url: `${BASE_URL}/collage-maker`, category: 'Photo Collage Maker' },
  { url: `${BASE_URL}/image-dimensions`, category: 'Exif & Dimension Checker' },
  { url: `${BASE_URL}/aspect-ratio-calculator`, category: 'Aspect Ratio Calculator' },
  { url: `${BASE_URL}/color-picker`, category: 'Image Hex Color Picker' },
  { url: `${BASE_URL}/code-converter`, category: 'Code to Image Snapshot' },

  // ==========================================
  // 6. SOCIAL MEDIA SIZES & PRESETS
  // ==========================================
  { url: `${BASE_URL}/resize-image-for-instagram`, category: 'Instagram Resizer' },
  { url: `${BASE_URL}/instagram-post-resizer`, category: 'Instagram 1:1 & 4:5' },
  { url: `${BASE_URL}/instagram-story-resizer`, category: 'Instagram 9:16 Story' },
  { url: `${BASE_URL}/instagram-image-resizer`, category: 'Instagram All Sizes' },
  { url: `${BASE_URL}/resize-image-for-youtube-thumbnail`, category: 'YouTube 1280x720 Thumbnail' },
  { url: `${BASE_URL}/youtube-thumbnail-resizer`, category: 'YouTube Thumbnail Tool' },
  { url: `${BASE_URL}/youtube-banner-resizer`, category: 'YouTube 2560x1440 Banner' },
  { url: `${BASE_URL}/whatsapp-image-resizer`, category: 'WhatsApp DP No Crop' },
  { url: `${BASE_URL}/whatsapp-dp-resizer`, category: 'WhatsApp Profile Picture' },
  { url: `${BASE_URL}/facebook-image-resizer`, category: 'Facebook Cover & Feed' },
  { url: `${BASE_URL}/linkedin-image-resizer`, category: 'LinkedIn Banner & Avatar' },

  // ==========================================
  // 7. INTERNATIONAL PRINT SIZES (A-SERIES 300 DPI)
  // ==========================================
  { url: `${BASE_URL}/a4-image-resizer`, category: 'A4 Document Size' },
  { url: `${BASE_URL}/a0-image-resizer`, category: 'A0 Poster Size' },
  { url: `${BASE_URL}/a1-image-resizer`, category: 'A1 Print Size' },
  { url: `${BASE_URL}/a2-image-resizer`, category: 'A2 Print Size' },
  { url: `${BASE_URL}/a3-image-resizer`, category: 'A3 Print Size' },
  { url: `${BASE_URL}/a5-image-resizer`, category: 'A5 Flyer Size' },
  { url: `${BASE_URL}/a6-image-resizer`, category: 'A6 Postcard Size' },
  { url: `${BASE_URL}/a7-image-resizer`, category: 'A7 Label Size' },
  { url: `${BASE_URL}/passport-photo-resizer`, category: 'Passport Size Photo 35x45mm' },

  // ==========================================
  // 8. HIGH-CPC GLOBAL E-COMMERCE & REAL ESTATE
  // ==========================================
  { url: `${BASE_URL}/amazon-product-image-resizer`, category: 'Amazon 2000x2000 White BG' },
  { url: `${BASE_URL}/shopify-image-resizer`, category: 'Shopify 2048x2048 Store' },
  { url: `${BASE_URL}/etsy-listing-photo-resizer`, category: 'Etsy 2000px Listing' },
  { url: `${BASE_URL}/ebay-photo-resizer`, category: 'eBay 1600px High-Res' },
  { url: `${BASE_URL}/poshmark-photo-resizer`, category: 'Poshmark 1:1 Resizer' },
  { url: `${BASE_URL}/mercari-image-resizer`, category: 'Mercari Photo Resizer' },
  { url: `${BASE_URL}/mls-photo-resizer`, category: 'Real Estate MLS 1024x768' },
  { url: `${BASE_URL}/zillow-listing-photo-resizer`, category: 'Zillow 1920x1080 Tour' },
  { url: `${BASE_URL}/realtor-photo-compressor`, category: 'Realtor Under 5MB' },

  // ==========================================
  // 9. PASSPORTS, VISAS & US STATE DMVS
  // ==========================================
  { url: `${BASE_URL}/us-passport-photo-resizer`, category: 'US Passport 2x2 Inch' },
  { url: `${BASE_URL}/dv-lottery-photo-checker-resizer`, category: 'US DV Lottery 600x600 240KB' },
  { url: `${BASE_URL}/us-visa-photo-resizer`, category: 'US DS-160 Visa Photo' },
  { url: `${BASE_URL}/green-card-photo-resizer`, category: 'USCIS Green Card Photo' },
  { url: `${BASE_URL}/canadian-passport-photo-resizer`, category: 'Canada Passport 50x70mm' },
  { url: `${BASE_URL}/schengen-visa-photo-resizer`, category: 'Schengen Europe Visa 35x45mm' },
  { url: `${BASE_URL}/uk-passport-photo-resizer`, category: 'UK HMPO Passport Photo' },
  { url: `${BASE_URL}/australian-passport-photo-resizer`, category: 'Australia Passport Photo' },
  { url: `${BASE_URL}/california-dmv-photo-resizer`, category: 'California DMV Real ID' },
  { url: `${BASE_URL}/texas-driver-license-photo-resizer`, category: 'Texas DPS Driver License' },
  { url: `${BASE_URL}/florida-driver-license-photo-resizer`, category: 'Florida FLHSMV Photo' },
  { url: `${BASE_URL}/new-york-dmv-photo-resizer`, category: 'New York NY DMV Photo' },
  { url: `${BASE_URL}/nclex-photo-resizer`, category: 'NCLEX Nursing Board Photo' },
  { url: `${BASE_URL}/us-bar-exam-photo-resizer`, category: 'US Bar Exam MPRE Photo' },
  { url: `${BASE_URL}/notary-public-photo-resizer`, category: 'Notary Commission Photo' },

  // ==========================================
  // 10. RECRUITMENT & EXAM RESIZERS (HIGH TRAFFIC)
  // ==========================================
  { url: `${BASE_URL}/ssc-photo-resizer`, category: 'SSC Exam 20-50KB' },
  { url: `${BASE_URL}/ssc-cgl-photo-resizer`, category: 'SSC CGL 20-50KB' },
  { url: `${BASE_URL}/ssc-chsl-photo-resizer`, category: 'SSC CHSL 20-50KB' },
  { url: `${BASE_URL}/rrb-photo-resizer`, category: 'Railway RRB NTPC' },
  { url: `${BASE_URL}/upsc-photo-resizer`, category: 'UPSC IAS/IPS Photo' },
  { url: `${BASE_URL}/pan-card-photo-resizer`, category: 'PAN Card 213x213 30KB' },
  { url: `${BASE_URL}/signature-resizer-10kb`, category: 'Signature Under 10KB/20KB' },
  { url: `${BASE_URL}/neet-postcard-photo-resizer`, category: 'NEET 4x6 Postcard' },
  { url: `${BASE_URL}/jee-main-photo-resizer`, category: 'JEE Main 10-200KB' },
  { url: `${BASE_URL}/bpsc-photo-resizer`, category: 'BPSC Bihar 25KB Photo' },
  { url: `${BASE_URL}/up-police-photo-resizer`, category: 'UP Police Constable Photo' },
  { url: `${BASE_URL}/gate-photo-resizer`, category: 'GATE Exam Photo & Signature' },
  { url: `${BASE_URL}/ibps-photo-resizer`, category: 'IBPS Bank PO/Clerk Photo' },
  { url: `${BASE_URL}/ctet-photo-resizer`, category: 'CTET Teacher Exam Photo' },
  { url: `${BASE_URL}/dsssb-photo-resizer`, category: 'DSSSB Delhi Postcard Size' },
  { url: `${BASE_URL}/cuet-photo-resizer`, category: 'CUET NTA Photo Resizer' },
  { url: `${BASE_URL}/cat-photo-resizer`, category: 'IIM CAT Exam Photo' },
  { url: `${BASE_URL}/nda-cds-photo-resizer`, category: 'UPSC NDA/CDS Resizer' },
  { url: `${BASE_URL}/driving-licence-photo-resizer`, category: 'Sarathi Parivahan DL' },
  { url: `${BASE_URL}/indian-passport-photo-resizer`, category: 'Passport Seva Kendra' },

  // ==========================================
  // 11. HIGH-INTENT TUTORIAL ARTICLES (INFORMATIONAL SEO)
  // ==========================================
  { url: `${BASE_URL}/blog/how-to-compress-image-to-20kb`, category: 'Blog: Compress to 20KB' },
  { url: `${BASE_URL}/blog/how-to-compress-image-to-50kb`, category: 'Blog: Compress to 50KB' },
  { url: `${BASE_URL}/blog/how-to-compress-image-to-100kb`, category: 'Blog: Compress to 100KB' },
  { url: `${BASE_URL}/blog/reduce-jpg-size-without-losing-quality`, category: 'Blog: Lossless JPG' },
  { url: `${BASE_URL}/blog/convert-heic-to-jpg-on-windows`, category: 'Blog: HEIC on Windows' },
  { url: `${BASE_URL}/blog/convert-webp-to-png-lossless`, category: 'Blog: WebP to PNG' },
  { url: `${BASE_URL}/blog/convert-image-to-pdf`, category: 'Blog: Image to PDF' },
  { url: `${BASE_URL}/blog/reduce-pdf-size`, category: 'Blog: Compress PDF' },
  { url: `${BASE_URL}/blog/how-to-batch-compress-images-fast`, category: 'Blog: Bulk Compression' },
  { url: `${BASE_URL}/blog/resize-image-for-instagram`, category: 'Blog: Instagram Sizes' },
  { url: `${BASE_URL}/blog/how-to-resize-image-for-youtube-thumbnail`, category: 'Blog: YouTube Thumbnails' },
  { url: `${BASE_URL}/blog/best-image-format-png-vs-jpg-vs-webp`, category: 'Blog: Format Comparison' },
  { url: `${BASE_URL}/blog/a4-photo-size-in-pixels`, category: 'Blog: A4 Pixels 300DPI' },
  { url: `${BASE_URL}/blog/how-to-make-transparent-png-background`, category: 'Blog: Transparent PNG' },
  { url: `${BASE_URL}/blog/how-to-resize-signature-online`, category: 'Blog: Signature Resizer' },
  { url: `${BASE_URL}/blog/how-to-convert-pdf-to-word-free`, category: 'Blog: PDF to Word' },
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
  console.log('='.repeat(70));
  console.log('  PixEnhance — Universal Google Indexing Submitter (All Tools & Keywords)');
  console.log('='.repeat(70));

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

  const historyPath = path.join(__dirname, '.indexing_history.json');
  let history = {};
  if (fs.existsSync(historyPath)) {
    try {
      history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
    } catch {
      history = {};
    }
  }

  // Filter out URLs submitted within last 48 hours unless forced
  const nowMs = Date.now();
  const queue = INDEXING_TARGETS.filter((item) => {
    const lastSub = history[item.url];
    if (!lastSub) return true;
    return nowMs - lastSub > 48 * 3600 * 1000;
  });

  console.log(`[*] Total Universal Tools & Landing Pages: ${INDEXING_TARGETS.length}`);
  console.log(`[*] URLs Pending Indexing Submission: ${queue.length}`);
  console.log(`[*] Daily Google Quota Limit: 200 URLs/day\n`);

  if (queue.length === 0) {
    console.log('✅ All tools & pages have been successfully submitted to Google in the last 48 hours!');
    console.log('Next scheduled run will resume after quota reset.\n');
    return;
  }

  let successCount = 0;
  let errorCount = 0;
  let quotaHit = false;

  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const progress = `[${i + 1}/${queue.length}]`;
    const catLabel = `[${item.category}]`.padEnd(30, ' ');

    try {
      const { status, text } = await submitUrl(item.url, accessToken);

      if (status === 200) {
        console.log(`${progress} ${catLabel} ${item.url} -> ✅ OK (200)`);
        history[item.url] = nowMs;
        successCount++;
      } else if (status === 429) {
        console.log(`\n[!] Google Daily Quota Reached (429 Too Many Requests).`);
        console.log(`[!] Google allows 200 requests/day per project. Saving state.`);
        quotaHit = true;
        break;
      } else {
        console.log(`${progress} ${catLabel} ${item.url} -> ⚠️ Status ${status}: ${text}`);
        errorCount++;
      }
    } catch (err) {
      console.log(`${progress} ${catLabel} ${item.url} -> ❌ Error: ${err.message}`);
      errorCount++;
    }

    // Polite 400ms delay to avoid burst throttling
    await new Promise((r) => setTimeout(r, 400));
  }

  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(70));
  console.log(`📊 Indexing Summary:`);
  console.log(`   - Successfully Sent: ${successCount}`);
  console.log(`   - Errors / Warnings: ${errorCount}`);
  if (quotaHit) {
    console.log(`   - Note: Daily quota reached. Run again tomorrow to index remaining tools.`);
  }
  console.log(`   - History Saved to: ${historyPath}`);
  console.log('='.repeat(70) + '\n');
}

main().catch(console.error);
