"use client";

import { useEffect } from "react";

/** Re-read only server caches. Never call the live per-account or POST refresh paths. */
export function useCachedQuotaPolling<T>(
  readConnections: () => Promise<T[] | null>,
  readLimits: () => Promise<Record<string, unknown> | null>,
  apply: (connections: T[], caches: Record<string, unknown>) => void
) {
  useEffect(() => {
    let pending = false;
    let alive = true;
    const read = async () => {
      if (pending || document.visibilityState !== "visible") return;
      pending = true;
      try {
        const [connections, caches] = await Promise.all([readConnections(), readLimits()]);
        if (alive && connections && caches) apply(connections, caches);
      } finally {
        pending = false;
      }
    };
    const timer = window.setInterval(() => {
      void read();
    }, 5 * 60_000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [readConnections, readLimits, apply]);
}
