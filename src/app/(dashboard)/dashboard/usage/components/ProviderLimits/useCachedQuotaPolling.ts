"use client";

import { useEffect } from "react";
import { startVisiblePolling } from "@/shared/utils/visiblePolling";

/** Re-read only server caches. Never call the live per-account or POST refresh paths. */
export function useCachedQuotaPolling<T>(
  readConnections: (signal?: AbortSignal) => Promise<T[] | null>,
  readLimits: (signal?: AbortSignal) => Promise<Record<string, unknown> | null>,
  apply: (connections: T[], caches: Record<string, unknown>) => void
) {
  useEffect(() => {
    let connections: T[] | null = null;
    let nextConnectionRead = 0;
    const polling = startVisiblePolling(async (signal) => {
      // Quotas change during generation. The expensive account list need not be
      // re-scanned at the same cadence; retain its existing five-minute interval.
      const refreshConnections = !connections || Date.now() >= nextConnectionRead;
      const [next, caches] = await Promise.all([
        refreshConnections ? readConnections(signal) : Promise.resolve(connections),
        readLimits(signal),
      ]);
      if (signal.aborted || !next || !caches) return;
      connections = next;
      if (refreshConnections) nextConnectionRead = Date.now() + 5 * 60_000;
      apply(next, caches);
    }, false);
    return () => polling.dispose();
  }, [readConnections, readLimits, apply]);
}
