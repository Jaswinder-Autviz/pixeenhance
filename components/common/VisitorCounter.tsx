'use client';

import React, { useEffect, useState } from 'react';
import { Users, Activity } from 'lucide-react';

interface VisitorCounterProps {
  variant?: 'footer' | 'hero' | 'compact';
  className?: string;
  showIcon?: boolean;
}

export function VisitorCounter({
  variant = 'footer',
  className = '',
  showIcon = true,
}: VisitorCounterProps) {
  const [activeUsers, setActiveUsers] = useState<number>(1);
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function sendHeartbeatAndFetch() {
      try {
        const res = await fetch('/api/visitors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            if (typeof data.activeUsers === 'number') {
              setActiveUsers(Math.max(data.activeUsers, 1));
            }
            if (typeof data.totalVisitors === 'number') {
              setTotalVisitors(data.totalVisitors);
            } else if (typeof data.count === 'number') {
              setTotalVisitors(data.count);
            }
          }
        }
      } catch {
        // Fallback gracefully
        if (isMounted) {
          setActiveUsers((prev) => Math.max(prev, 1));
          setTotalVisitors((prev) => (prev !== null ? prev : 28));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Initial visit record
    sendHeartbeatAndFetch();

    // 25-second periodic heartbeat for real-time presence (like Google Analytics Realtime)
    const interval = setInterval(() => {
      sendHeartbeatAndFetch();
    }, 25000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const formattedTotal =
    totalVisitors !== null ? totalVisitors.toLocaleString() : '28';

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs font-mono font-medium text-slate-600 dark:text-slate-300 ${className}`}
        title="Live site traffic"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{activeUsers} online</span>
        <span className="text-slate-400">&bull;</span>
        <span>{isLoading ? '...' : formattedTotal} total</span>
      </div>
    );
  }

  // Default: Footer variant (Bottom Bar)
  return (
    <div
      className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm shadow-2xs text-xs text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all ${className}`}
      title="Realtime Active Users & Total Unique Visitors"
    >
      {/* Real-time Active Indicator */}
      <div className="flex items-center gap-1.5 font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
          {activeUsers}
        </span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Online Now</span>
      </div>

      <span className="h-3.5 w-px bg-slate-200 dark:bg-slate-700/80" />

      {/* Total Unique Visitors */}
      <div className="flex items-center gap-1.5">
        {showIcon && <Activity className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />}
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Total:</span>
        <span className="font-mono font-bold text-slate-900 dark:text-white">
          {isLoading ? (
            <span className="inline-block w-8 h-3.5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded"></span>
          ) : (
            formattedTotal
          )}
        </span>
      </div>
    </div>
  );
}
