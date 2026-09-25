import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'visitor_stats.json');

interface VisitorStats {
  totalUniqueVisitors: number;
  ipHashes: string[];
  lastUpdated: string;
}

// In-memory cache
let statsCache: VisitorStats | null = null;
const ipSetCache = new Set<string>();

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
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return '127.0.0.1';
}

function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
}

function loadStats(): VisitorStats {
  if (statsCache) {
    return statsCache;
  }

  try {
    if (fs.existsSync(STATS_FILE_PATH)) {
      const data = fs.readFileSync(STATS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data) as VisitorStats;
      statsCache = parsed;
      if (Array.isArray(parsed.ipHashes)) {
        parsed.ipHashes.forEach((h) => ipSetCache.add(h));
      }
      return statsCache;
    }
  } catch (err) {
    console.error('Error reading visitor stats file:', err);
  }

  // Initial stats fallback
  statsCache = {
    totalUniqueVisitors: 0,
    ipHashes: [],
    lastUpdated: new Date().toISOString(),
  };
  return statsCache;
}

function saveStats(stats: VisitorStats) {
  try {
    stats.lastUpdated = new Date().toISOString();
    // Keep max 50,000 hashes to maintain compact file size
    if (stats.ipHashes.length > 50000) {
      stats.ipHashes = stats.ipHashes.slice(-50000);
    }
    fs.writeFileSync(STATS_FILE_PATH, JSON.stringify(stats, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving visitor stats file:', err);
  }
}

export async function GET(request: NextRequest) {
  const stats = loadStats();
  return NextResponse.json(
    {
      count: stats.totalUniqueVisitors,
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
  const stats = loadStats();

  if (isBot(userAgent)) {
    return NextResponse.json({
      count: stats.totalUniqueVisitors,
      skipped: 'bot',
    });
  }

  const clientIp = getClientIp(request);
  const ipHash = hashIp(clientIp);

  let isNewIp = false;

  if (!ipSetCache.has(ipHash)) {
    // Brand new unique IP detected
    ipSetCache.add(ipHash);
    stats.ipHashes.push(ipHash);
    stats.totalUniqueVisitors += 1;
    isNewIp = true;
    saveStats(stats);
  }

  return NextResponse.json(
    {
      count: stats.totalUniqueVisitors,
      isNewVisitor: isNewIp,
      live: true,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
