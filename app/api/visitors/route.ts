import { NextResponse, type NextRequest } from 'next/server';

// Configuration
const COUNTER_NAMESPACE = process.env.COUNTER_NAMESPACE || 'pixenhance_prod';
const COUNTER_KEY = process.env.COUNTER_KEY || 'total_unique_visitors';
const COUNTER_API_BASE = 'https://api.counterapi.dev/v1';

// Starting baseline for newly deployed site
const BASELINE_VISITORS = 1240;

// In-memory fallback cache in case of upstream rate limit or outage
let fallbackCount = BASELINE_VISITORS;
let lastSuccessfulFetch = 0;

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
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function GET(request: NextRequest) {
  try {
    const res = await fetchWithTimeout(`${COUNTER_API_BASE}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`);
    if (res.ok) {
      const data = await res.json();
      const count = (data.count || 0) + BASELINE_VISITORS;
      fallbackCount = count;
      lastSuccessfulFetch = Date.now();
      return NextResponse.json({ count, live: true });
    }
  } catch {
    // Graceful fallback to cache
  }

  return NextResponse.json({ count: fallbackCount, live: false });
}

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');

  // Do not increment for search engine crawlers or audit bots
  if (isBot(userAgent)) {
    return NextResponse.json({ count: fallbackCount, skipped: 'bot' });
  }

  try {
    const res = await fetchWithTimeout(
      `${COUNTER_API_BASE}/${COUNTER_NAMESPACE}/${COUNTER_KEY}/up`,
      4000
    );
    if (res.ok) {
      const data = await res.json();
      const count = (data.count || 0) + BASELINE_VISITORS;
      fallbackCount = count;
      lastSuccessfulFetch = Date.now();
      return NextResponse.json({ count, incremented: true, live: true });
    }
  } catch {
    // Upstream unavailable, increment local fallback cache
    fallbackCount += 1;
  }

  return NextResponse.json({ count: fallbackCount, incremented: true, live: false });
}
