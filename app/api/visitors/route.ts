import { NextResponse, type NextRequest } from 'next/server';

// Configuration
const BASELINE_VISITORS = 0; // Starts clean from 0 for real visitors
const HITS_URL = 'https://hits.sh/pixenhance.com.svg';
const BACKUP_URL = 'https://api.visitorbadge.io/api/visitors?path=pixenhance.com';

// In-memory persistent count cache during server runtime
let cachedCount = BASELINE_VISITORS;
let lastRecordedTime = 0;

const KNOWN_BOTS = [
  'bot',
  'crawler',
  'spider',
  'lighthouse',
  'googlebot',
  'bingbot',
  'yandex',
  'baiduspider',
  'facebookexternalhit',
  'headlesschrome',
  'slurp',
  'bytespider',
  'petalbot',
  'curl',
  'wget',
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return KNOWN_BOTS.some((bot) => ua.includes(bot));
}

// Helper to fetch upstream with timeout
async function fetchWithTimeout(url: string, timeoutMs = 3500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'image/svg+xml,application/json,text/plain,*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) PixEnhance/1.0',
      },
      cache: 'no-store',
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Parse count from SVG badge returned by counting services
function parseCountFromSvg(svgText: string): number | null {
  // Regex 1: <title>hits: 123</title> or <title>VISITORS: 123</title>
  const titleMatch = svgText.match(/<title>(?:hits|visitors)?:\s*([\d,]+)<\/title>/i);
  if (titleMatch && titleMatch[1]) {
    return parseInt(titleMatch[1].replace(/,/g, ''), 10);
  }

  // Regex 2: aria-label="hits: 123" or aria-label="VISITORS: 123"
  const ariaMatch = svgText.match(/aria-label="(?:hits|visitors)?:\s*([\d,]+)"/i);
  if (ariaMatch && ariaMatch[1]) {
    return parseInt(ariaMatch[1].replace(/,/g, ''), 10);
  }

  // Regex 3: text tag with numeric value
  const textMatch = svgText.match(/<text[^>]*>([\d,]+)<\/text>/gi);
  if (textMatch && textMatch.length > 0) {
    const last = textMatch[textMatch.length - 1];
    const num = last.replace(/<[^>]+>/g, '').replace(/,/g, '').trim();
    if (/^\d+$/.test(num)) {
      return parseInt(num, 10);
    }
  }

  return null;
}

// Fetch current count from external provider without double-incrementing when possible
async function getLiveCount(): Promise<number> {
  // If we already have a cached count from recent visits, return it
  if (cachedCount > 0 && Date.now() - lastRecordedTime < 60000) {
    return cachedCount;
  }

  try {
    const res = await fetchWithTimeout(HITS_URL, 3000);
    if (res.ok) {
      const text = await res.text();
      const parsed = parseCountFromSvg(text);
      if (parsed !== null && parsed >= cachedCount) {
        cachedCount = parsed + BASELINE_VISITORS;
        lastRecordedTime = Date.now();
        return cachedCount;
      }
    }
  } catch {
    // Primary failed, try backup
    try {
      const backupRes = await fetchWithTimeout(BACKUP_URL, 3000);
      if (backupRes.ok) {
        const text = await backupRes.text();
        const parsed = parseCountFromSvg(text);
        if (parsed !== null && parsed >= cachedCount) {
          cachedCount = parsed + BASELINE_VISITORS;
          lastRecordedTime = Date.now();
          return cachedCount;
        }
      }
    } catch {
      // Keep cached
    }
  }

  return cachedCount;
}

// Increment visit count in production
async function incrementLiveCount(): Promise<number> {
  try {
    const res = await fetchWithTimeout(HITS_URL, 3500);
    if (res.ok) {
      const text = await res.text();
      const parsed = parseCountFromSvg(text);
      if (parsed !== null) {
        cachedCount = Math.max(cachedCount + 1, parsed + BASELINE_VISITORS);
        lastRecordedTime = Date.now();
        return cachedCount;
      }
    }
  } catch {
    // Try backup counter
    try {
      const backupRes = await fetchWithTimeout(BACKUP_URL, 3500);
      if (backupRes.ok) {
        const text = await backupRes.text();
        const parsed = parseCountFromSvg(text);
        if (parsed !== null) {
          cachedCount = Math.max(cachedCount + 1, parsed + BASELINE_VISITORS);
          lastRecordedTime = Date.now();
          return cachedCount;
        }
      }
    } catch {
      // Local fallback increment
      cachedCount += 1;
    }
  }

  cachedCount = Math.max(cachedCount, 1);
  return cachedCount;
}

export async function GET(request: NextRequest) {
  const count = await getLiveCount();
  return NextResponse.json(
    { count, live: true },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');

  // Do not increment for search engine crawlers or audit bots
  if (isBot(userAgent)) {
    return NextResponse.json({ count: cachedCount, skipped: 'bot' });
  }

  const count = await incrementLiveCount();
  return NextResponse.json(
    { count, incremented: true, live: true },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
