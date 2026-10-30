"use client";

/**
 * Per-account display reads the server's canonical cached snapshots. Polling is
 * local-only and visible-tab-only; only the explicit refresh button probes upstream.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { startVisiblePolling } from "@/shared/utils/visiblePolling";

export interface ProviderQuotaCacheEntry {
  quotas?: Record<string, unknown> | null;
  modelQuotas?: Record<string, unknown>;
  plan?: unknown;
  message?: string | null;
  fetchedAt?: string;
  source?: string | null;
  bankedResetCredits?: number;
}

export function useProviderQuota() {
  const [quotaByConnectionId, setQuotaByConnectionId] = useState<
    Record<string, ProviderQuotaCacheEntry>
  >({});
  const [quotaLoading, setQuotaLoading] = useState(true);
  const [refreshingIds, setRefreshingIds] = useState<ReadonlySet<string>>(new Set());
  const polling = useRef<ReturnType<typeof startVisiblePolling> | null>(null);
  const manualReads = useRef(new Map<string, AbortController>());

  useEffect(() => {
    let alive = true;
    const reader = startVisiblePolling(async (signal) => {
      if (manualReads.current.size > 0) return;
      try {
        const res = await fetch("/api/usage/provider-limits", { cache: "no-store", signal });
        if (!res.ok) return;
        const data = await res.json();
        if (
          signal.aborted ||
          !alive ||
          !data?.caches ||
          typeof data.caches !== "object" ||
          Array.isArray(data.caches)
        )
          return;
        // Preserve observation times supplied by the server. A cache read is not new evidence.
        setQuotaByConnectionId(data.caches as Record<string, ProviderQuotaCacheEntry>);
      } finally {
        if (alive && !signal.aborted) setQuotaLoading(false);
      }
    });
    polling.current = reader;
    const controllers = manualReads.current;
    return () => {
      alive = false;
      polling.current = null;
      reader.dispose();
      for (const controller of controllers.values()) controller.abort();
      controllers.clear();
    };
  }, []);

  const refreshConnection = useCallback(async (connectionId: string) => {
    if (!connectionId || !polling.current || manualReads.current.has(connectionId)) return;
    // A pre-refresh cached GET must not arrive later and roll back the refreshed panel.
    polling.current.cancel();
    const controller = new AbortController();
    manualReads.current.set(connectionId, controller);
    setRefreshingIds((prev) => new Set(prev).add(connectionId));
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`/api/usage/${encodeURIComponent(connectionId)}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      await response.body?.cancel();
      // Ignore the live route's payload: newer inference evidence may have arrived meanwhile.
      // Both manual and background reads must display the canonical server projection.
    } catch {
      // An explicit refresh can fail; keep the last observation and its original age.
    } finally {
      clearTimeout(timeout);
      manualReads.current.delete(connectionId);
      if (polling.current) {
        // A timed-out request must not leave the refresh button disabled either.
        setRefreshingIds((prev) => {
          const next = new Set(prev);
          next.delete(connectionId);
          return next;
        });
        if (!controller.signal.aborted) await polling.current.refresh(true);
      }
    }
  }, []);

  return { quotaByConnectionId, quotaLoading, refreshingIds, refreshConnection };
}
