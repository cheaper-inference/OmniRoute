"use client";

/**
 * Per-account display reads the server's canonical cached snapshots. Polling is
 * local-only and visible-tab-only; only the explicit refresh button probes upstream.
 * The probe's response only reports how the refresh went (providerQuotaRefresh.ts);
 * the panels keep showing the canonical projection, which is re-read right afterwards.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { startVisibleCachePolling } from "@/shared/utils/visiblePolling";
import { classifyQuotaObservation, type QuotaRefreshState } from "./providerQuotaRefresh";

const LIVE_READ_TIMEOUT_MS = 15000;

export interface ProviderQuotaCacheEntry {
  quotas?: Record<string, unknown> | null;
  modelQuotas?: Record<string, unknown>;
  plan?: unknown;
  message?: string | null;
  fetchedAt?: string;
  source?: string | null;
  bankedResetCredits?: number;
}

interface QuotaOptions {
  providerId?: string;
  connectionIds?: string[];
  refreshConnections?: () => Promise<boolean>;
}

interface PendingRefresh {
  controller: AbortController;
  providerId?: string;
  promise: Promise<void>;
}

async function readObservation(
  id: string,
  providerId: string | undefined,
  signal: AbortSignal
): Promise<QuotaRefreshState> {
  if (signal.aborted) return { status: "error" };
  // The deadline stays off `signal`, so a timed-out read is a failed observation and not an
  // obsolete request: the button must report it and become available again.
  const deadline = new AbortController();
  const abort = () => deadline.abort();
  signal.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, LIVE_READ_TIMEOUT_MS);
  try {
    const response = await fetch(`/api/usage/${encodeURIComponent(id)}`, {
      cache: "no-store",
      signal: deadline.signal,
    });
    if (!response.ok) throw new Error("Quota request failed");
    return classifyQuotaObservation(await response.json(), providerId);
  } catch {
    return { status: "error" };
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener("abort", abort);
  }
}

async function refreshProjection(refresh?: () => Promise<boolean>): Promise<boolean> {
  if (!refresh) return true;
  try {
    return await refresh();
  } catch {
    return false;
  }
}

function useQuotaCache() {
  const [quotaByConnectionId, setQuotaByConnectionId] = useState<
    Record<string, ProviderQuotaCacheEntry>
  >({});
  const [quotaLoading, setQuotaLoading] = useState(true);
  const polling = useRef<ReturnType<typeof startVisibleCachePolling> | null>(null);
  const liveReads = useRef(0);

  useEffect(() => {
    let alive = true;
    const reader = startVisibleCachePolling(async (signal) => {
      if (liveReads.current > 0) return;
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
    return () => {
      alive = false;
      polling.current = null;
      reader.dispose();
    };
  }, []);

  const beginLiveRead = useCallback(() => {
    // A pre-refresh cached GET must not arrive later and roll back the refreshed panel.
    polling.current?.cancel();
    liveReads.current += 1;
  }, []);
  const endLiveRead = useCallback(() => {
    liveReads.current -= 1;
  }, []);
  const rereadCache = useCallback(async () => {
    await polling.current?.refresh(true);
  }, []);

  return { quotaByConnectionId, quotaLoading, beginLiveRead, endLiveRead, rereadCache };
}

function usePendingQuotaRequests(options: QuotaOptions) {
  const pending = useRef(new Map<string, PendingRefresh>());
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const requests = pending.current;
    return () => {
      mounted.current = false;
      for (const request of requests.values()) request.controller.abort();
    };
  }, []);

  useEffect(() => {
    for (const [id, request] of pending.current) {
      if (
        request.providerId !== options.providerId ||
        (options.connectionIds && !options.connectionIds.includes(id))
      ) {
        request.controller.abort();
      }
    }
  }, [options.providerId, options.connectionIds]);

  return { pending, mounted };
}

export function useProviderQuota(options: QuotaOptions = {}) {
  const { quotaByConnectionId, quotaLoading, beginLiveRead, endLiveRead, rereadCache } =
    useQuotaCache();
  const [refreshingIds, setRefreshingIds] = useState<ReadonlySet<string>>(new Set());
  const [refreshStates, setRefreshStates] = useState<Record<string, QuotaRefreshState>>({});
  const { pending, mounted } = usePendingQuotaRequests(options);

  const refreshConnection = useCallback(
    (connectionId: string): Promise<void> => {
      if (!connectionId || !mounted.current) return Promise.resolve();
      const existing = pending.current.get(connectionId);
      if (existing && !existing.controller.signal.aborted) return existing.promise;
      const request: PendingRefresh = {
        controller: new AbortController(),
        providerId: options.providerId,
        promise: Promise.resolve(),
      };
      // Register before the first asynchronous operation, including calls in the same event tick.
      pending.current.set(connectionId, request);
      beginLiveRead();
      setRefreshingIds((prev) => new Set(prev).add(connectionId));
      setRefreshStates((prev) => ({ ...prev, [connectionId]: { status: "loading" } }));
      request.promise = Promise.resolve().then(async () => {
        try {
          const state = await readObservation(
            connectionId,
            options.providerId,
            request.controller.signal
          ).finally(endLiveRead);
          if (!mounted.current || request.controller.signal.aborted) return;
          const [, refreshed] = await Promise.all([
            rereadCache(),
            refreshProjection(options.refreshConnections),
          ]);
          if (!mounted.current || request.controller.signal.aborted) return;
          setRefreshStates((prev) => ({
            ...prev,
            [connectionId]: { ...state, ...(!refreshed ? { connectionsRefreshFailed: true } : {}) },
          }));
        } finally {
          if (pending.current.get(connectionId) === request) {
            pending.current.delete(connectionId);
            if (mounted.current)
              setRefreshingIds((prev) => {
                const next = new Set(prev);
                next.delete(connectionId);
                return next;
              });
          }
        }
      });
      return request.promise;
    },
    [
      options.providerId,
      options.refreshConnections,
      pending,
      mounted,
      beginLiveRead,
      endLiveRead,
      rereadCache,
    ]
  );

  return { quotaByConnectionId, quotaLoading, refreshingIds, refreshConnection, refreshStates };
}
