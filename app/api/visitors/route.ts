import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// In-memory real-time active users presence tracker
const activeUsers = new Map<string, number>();
const seenIps = new Set<string>();

let cachedTotalCount = 28;
let lastUpstreamFetch = 0;

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
  'python',
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return KNOWN_BOTS.some((bot) => ua.includes(bot));
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

function cleanupActiveUsers() {
  const cutoff = Date.now() - 45000; // Active within last 45 seconds
  for (const [id, time] of activeUsers.entries()) {
    if (time < cutoff) {
      activeUsers.delete(id);
    }
  }
}

// Fetch upstream persistent count safely across all hosting environments
async function fetchPersistentCount(): Promise<number> {
  if (Date.now() - lastUpstreamFetch < 30000 && cachedTotalCount > 0) {
    return cachedTotalCount;
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://api.counterapi.dev/v1/pixenhance_v1/visitors/up', {
      signal: controller.signal,
      headers: { 'User-Agent': 'PixEnhance/1.0' },
      cache: 'no-store',
    });
    clearTimeout(id);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.count === 'number' && data.count > 0) {
        cachedTotalCount = Math.max(cachedTotalCount, data.count);
        lastUpstreamFetch = Date.now();
        return cachedTotalCount;
      }
    }
  } catch {
    // fallback
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('https://hits.sh/pixenhance.in.svg', {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(id);
    if (res.ok) {
      const text = await res.text();
      const match =
        text.match(/<title>(?:hits|visitors)?:\s*([\d,]+)<\/title>/i) ||
        text.match(/aria-label="(?:hits|visitors)?:\s*([\d,]+)"/i);
      if (match && match[1]) {
        const num = parseInt(match[1].replace(/,/g, ''), 10);
        if (num > 0) {
          cachedTotalCount = Math.max(cachedTotalCount, num);
          lastUpstreamFetch = Date.now();
          return cachedTotalCount;
        }
      }
    }
  } catch {
    // fallback
  }

  return cachedTotalCount;
}

export async function GET(request: NextRequest) {
  cleanupActiveUsers();
  const activeCount = Math.max(activeUsers.size, 1);
  const totalCount = await fetchPersistentCount();

  return NextResponse.json(
    {
      activeUsers: activeCount,
      totalVisitors: totalCount,
      count: totalCount,
      live: true,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  if (isBot(userAgent)) {
    cleanupActiveUsers();
    return NextResponse.json({
      activeUsers: Math.max(activeUsers.size, 1),
      totalVisitors: cachedTotalCount,
      count: cachedTotalCount,
      skipped: 'bot',
    });
  }

  const clientIp = getClientIp(request);
  const now = Date.now();

  // Register active heartbeat
  activeUsers.set(clientIp, now);
  cleanupActiveUsers();

  if (!seenIps.has(clientIp)) {
    seenIps.add(clientIp);
    cachedTotalCount += 1;
  }

  const totalCount = await fetchPersistentCount();
  const activeCount = Math.max(activeUsers.size, 1);

  return NextResponse.json(
    {
      activeUsers: activeCount,
      totalVisitors: totalCount,
      count: totalCount,
      live: true,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
