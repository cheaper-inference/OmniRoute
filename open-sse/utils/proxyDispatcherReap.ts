import {
  clearDispatcherCache,
  evictDispatcherPool,
  evictProxyDispatcher,
  type DispatcherPoolScope,
} from "./proxyDispatcherCache.ts";
import { isLocalEgressHostname } from "./proxyDispatcher.ts";

/**
 * Minimum delay between two reaps of a bounded pool. Under a real outage
 * every request fails, so reaping on each failure would rebuild the pool on
 * every request; the window keeps one reap per interval instead. Well above
 * the retry backoff (10 ms) and the keep-alive timeout (4 s), so the reap
 * stays observable in tests and out of the hot path.
 */
export const REAP_MIN_INTERVAL_MS = 30_000;
export const PROXY_DISPATCHER_EVICT_THRESHOLD = 3;
export const PROXY_DISPATCHER_FAILURE_WINDOW_MS = 60_000;
export const MAX_PROXY_FAILURE_STREAKS = 1024;

const lastReapByScope = new Map<DispatcherPoolScope, number>();
const proxyFailureStreaks = new Map<string, number[]>();

/** Test seam: drop the stored reap timestamps between tests. */
export function __resetDispatcherReapForTest(): void {
  lastReapByScope.clear();
  proxyFailureStreaks.clear();
}

/** Test seam: how many reap timestamps are stored (always at most 2). */
export function __dispatcherReapSizeForTest(): number {
  return lastReapByScope.size;
}

export function __proxyFailureStreakSizeForTest(): number {
  return proxyFailureStreaks.size;
}

export function recordProxyDispatcherSuccess(proxyUrl: string): void {
  if (!proxyUrl) return;
  proxyFailureStreaks.delete(proxyUrl);
}

function parseProxyHost(proxyUrl: string): { hostname: string | null; isLocal: boolean } {
  try {
    const hostname = new URL(proxyUrl).hostname;
    return { hostname, isLocal: isLocalEgressHostname(hostname) };
  } catch {
    return { hostname: null, isLocal: false };
  }
}

function pruneProxyFailureStreaks(now: number): void {
  for (const [url, timestamps] of proxyFailureStreaks) {
    const recent = timestamps.filter((ts) => now - ts <= PROXY_DISPATCHER_FAILURE_WINDOW_MS);
    if (recent.length === 0) {
      proxyFailureStreaks.delete(url);
    } else if (recent.length !== timestamps.length) {
      proxyFailureStreaks.set(url, recent);
    }
  }
}

function setBoundedFailureStreak(proxyUrl: string, timestamps: number[]): void {
  proxyFailureStreaks.delete(proxyUrl);
  while (proxyFailureStreaks.size >= MAX_PROXY_FAILURE_STREAKS) {
    const oldestKey = proxyFailureStreaks.keys().next().value;
    if (oldestKey === undefined) break;
    proxyFailureStreaks.delete(oldestKey);
  }
  proxyFailureStreaks.set(proxyUrl, timestamps);
}

function appendProxyFailureTimestamp(proxyUrl: string, now: number): number[] {
  const existing = proxyFailureStreaks.get(proxyUrl);
  return existing ? [...existing, now] : [now];
}

function evictAndReapProxyDispatcher(proxyUrl: string, now: number): void {
  proxyFailureStreaks.delete(proxyUrl);
  evictProxyDispatcher(proxyUrl);
  const { hostname, isLocal } = parseProxyHost(proxyUrl);
  maybeReapDispatcherPool(hostname, isLocal, now);
}

export function recordProxyDispatcherFailure(
  proxyUrl: string,
  now: number = Date.now()
): boolean {
  if (!proxyUrl) return false;
  pruneProxyFailureStreaks(now);
  const recent = appendProxyFailureTimestamp(proxyUrl, now);

  if (recent.length >= PROXY_DISPATCHER_EVICT_THRESHOLD) {
    evictAndReapProxyDispatcher(proxyUrl, now);
    return true;
  }

  setBoundedFailureStreak(proxyUrl, recent);
  return false;
}

function reapBounded(scope: DispatcherPoolScope, now: number): void {
  const last = lastReapByScope.get(scope);
  if (last !== undefined && now - last < REAP_MIN_INTERVAL_MS) return;
  lastReapByScope.set(scope, now);
  evictDispatcherPool(scope);
}

/**
 * Evict the dispatcher pool named by hostname after an unreachable error, so
 * the next request rebuilds it with fresh sockets. Local hostnames reap on
 * every failure; other hostnames reap at most once per window. An empty
 * hostname cannot be classified, so both pools reap instead.
 */
export function maybeReapDispatcherPool(
  hostname: string | null | undefined,
  isLocal: boolean,
  now: number = Date.now()
): void {
  if (!hostname) {
    clearDispatcherCache();
    lastReapByScope.set("local", now);
    lastReapByScope.set("cloud", now);
    return;
  }
  if (isLocal) {
    evictDispatcherPool("local");
    return;
  }
  reapBounded("cloud", now);
}
