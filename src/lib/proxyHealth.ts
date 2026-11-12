/**
 * T14: Proxy Fast-Fail — TCP health check with in-memory cache.
 *
 * When a configured HTTP/SOCKS5 proxy is unreachable, every request
 * through OmniRoute used to wait for the full PROXY_TIMEOUT_MS (30s)
 * before failing. This module detects dead proxies in <2s via a quick
 * TCP connection check, caching the result to avoid overhead per request.
 *
 * Verdict semantics (HAC-107): a TCP timeout is NOT a definitive verdict —
 * a hiccup or a busy host is indistinguishable from a dead proxy at the
 * socket layer. Only definitive outcomes are memoized: `ok` (connection
 * established) and `fail` (connection refused / spawn failure). A timeout
 * is returned to the caller and never written to the cache, so the next
 * call re-probes. Concurrent callers still share one in-flight probe, and
 * degraded/restored transitions log once per state change.
 *
 * Ref: sub2api PR #1167 (fix: proxy-fast-fail)
 */

import { createConnection } from "node:net";
import { stripIpv6Brackets } from "@omniroute/open-sse/utils/proxyFamily";
import {
  hasProxyRefusals,
  noteProxyRecovered,
  noteProxyRefusal,
  proxyEgressKey,
} from "@omniroute/open-sse/utils/proxyRefusalMemory";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";

// Configurable via env vars
const FAST_FAIL_TIMEOUT_MS = parseInt(process.env.PROXY_FAST_FAIL_TIMEOUT_MS ?? "2000", 10);
const HEALTH_CACHE_TTL_MS = parseInt(process.env.PROXY_HEALTH_CACHE_TTL_MS ?? "30000", 10);
const UNHEALTHY_CACHE_TTL_MS = parseInt(
  process.env.PROXY_HEALTH_UNHEALTHY_CACHE_TTL_MS ?? "2000",
  10
);

/**
 * Verdict of one TCP probe.
 *
 * - "ok": the TCP connection was established (definitive success).
 * - "fail": the connection was refused or could not be spawned (definitive
 *   failure — ECONNREFUSED, ENOTFOUND, etc.).
 * - "timeout": our deadline elapsed before the handshake completed. NOT
 *   definitive: never cached, never memoized as a failure.
 * - "inconclusive": the proxy URL was malformed or unparseable. Never
 *   cached (nothing to probe).
 */
export type ProxyProbeVerdict = "ok" | "fail" | "timeout" | "inconclusive";

const LOG_PREFIX = "[ProxyHealth]";

interface ProxyHealthEntry {
  healthy: boolean;
  checkedAt: number;
  ttlMs: number;
}

// In-memory cache: proxyUrl → health entry
const proxyHealthCache = new Map<string, ProxyHealthEntry>();
const proxyHealthInflight = new Map<string, Promise<boolean>>();

// Degraded/restored transition tracking, one entry per proxy, one log per
// state CHANGE. The map only ever holds the *last definitive* state, so a
// timeout never flips it and never logs.
const proxyHealthDegradedStates = new Map<string, boolean>();

/**
 * Test seam for the TCP probe. Returning a boolean keeps the original
 * `true = reachable / false = refused` contract (normalized to `ok`/`fail`);
 * returning a {@link ProxyProbeVerdict} lets a test express a timeout.
 */
type TcpCheck = (
  host: string,
  port: number,
  timeoutMs: number
) => Promise<boolean | ProxyProbeVerdict>;
let tcpCheckImpl: TcpCheck = tcpCheck;

function normalizeVerdict(raw: boolean | ProxyProbeVerdict): ProxyProbeVerdict {
  if (raw === true) return "ok";
  if (raw === false) return "fail";
  return raw;
}

// Feed a real probe verdict to proxy selection (PROXY_SKIP_RECENTLY_FAILED, default on): a proxy
// that refused the TCP connection is set aside by pools and account rotation, and taken back
// as soon as it answers again. With the flag off nothing is ever written. Timeouts are NOT
// refusals — they never reach the side set-aside memory.
function noteProbeVerdict(proxyUrl: string, verdict: ProxyProbeVerdict): void {
  if (verdict === "ok") {
    if (hasProxyRefusals()) noteProxyRecovered(proxyEgressKey(proxyUrl), "proxy_unreachable");
    return;
  }
  if (verdict === "fail" && isProxySkipRecentlyFailedEnabled()) {
    noteProxyRefusal(proxyEgressKey(proxyUrl), "proxy_unreachable");
  }
}

// Log degraded/restored once per definitive state change. Timeout and
// inconclusive verdicts never touch the state map.
function noteProbeTransition(proxyUrl: string, verdict: ProxyProbeVerdict): void {
  if (verdict === "timeout" || verdict === "inconclusive") return;
  const healthy = verdict === "ok";
  const previous = proxyHealthDegradedStates.get(proxyUrl);
  if (previous === healthy) return;
  proxyHealthDegradedStates.set(proxyUrl, healthy);
  const isFirstObservation = previous === undefined;
  if (healthy) {
    if (!isFirstObservation) console.log(`${LOG_PREFIX} ${proxyUrl} restored`);
  } else {
    console.warn(`${LOG_PREFIX} ${proxyUrl} degraded`);
  }
}

/**
 * T14: Perform a fast TCP check to see if a proxy host:port is reachable.
 * Results are cached for `cacheTtlMs` (default 30s) to avoid checking every request.
 *
 * @param proxyUrl - Full proxy URL, e.g. http://user:pass@1.2.3.4:8080
 * @param timeoutMs - TCP connection timeout (default 2000ms)
 * @param cacheTtlMs - How long to cache the health result (default 30000ms)
 * @returns true if proxy TCP port is open, false otherwise
 */
export async function isProxyReachable(
  proxyUrl: string,
  timeoutMs = FAST_FAIL_TIMEOUT_MS,
  cacheTtlMs = HEALTH_CACHE_TTL_MS
): Promise<boolean> {
  const cached = proxyHealthCache.get(proxyUrl);
  if (cached && Date.now() - cached.checkedAt < cached.ttlMs) {
    return cached.healthy;
  }

  let url: URL;
  try {
    url = new URL(proxyUrl);
  } catch {
    // Malformed URL — inconclusive, never cached (nothing was probed).
    return false;
  }

  const host = stripIpv6Brackets(url.hostname);
  const port = parseInt(url.port || defaultPortForScheme(url.protocol), 10);

  if (!host || isNaN(port)) {
    // Unparseable target — inconclusive, never cached (nothing was probed).
    return false;
  }

  const existingProbe = proxyHealthInflight.get(proxyUrl);
  if (existingProbe) {
    return existingProbe;
  }

  const probe = tcpCheckImpl(host, port, timeoutMs).then((rawVerdict) => {
    const verdict = normalizeVerdict(rawVerdict);
    const healthy = verdict === "ok";
    noteProbeTransition(proxyUrl, verdict);
    noteProbeVerdict(proxyUrl, verdict);
    if (verdict === "ok" || verdict === "fail") {
      // Before the cache write, so the verdict's TTL starts after the (flag-gated) note.
      proxyHealthCache.set(proxyUrl, {
        healthy,
        checkedAt: Date.now(),
        ttlMs: healthy ? cacheTtlMs : Math.min(cacheTtlMs, UNHEALTHY_CACHE_TTL_MS),
      });
    }
    return healthy;
  });

  proxyHealthInflight.set(proxyUrl, probe);
  try {
    return await probe;
  } finally {
    if (proxyHealthInflight.get(proxyUrl) === probe) {
      proxyHealthInflight.delete(proxyUrl);
    }
  }
}

/**
 * Get the cached health status of a proxy without re-checking.
 * Returns null if there is no cached entry.
 */
export function getCachedProxyHealth(proxyUrl: string): boolean | null {
  const cached = proxyHealthCache.get(proxyUrl);
  if (!cached) return null;
  if (Date.now() - cached.checkedAt >= cached.ttlMs) return null; // stale
  return cached.healthy;
}

/**
 * Invalidate the cached health for a proxy URL (force re-check on next call).
 */
export function invalidateProxyHealth(proxyUrl: string): void {
  proxyHealthCache.delete(proxyUrl);
  proxyHealthInflight.delete(proxyUrl);
  proxyHealthDegradedStates.delete(proxyUrl);
}

/**
 * Get all currently cached proxy health entries (for dashboard display).
 */
export function getAllProxyHealthStatuses(): Array<{
  proxyUrl: string;
  healthy: boolean;
  checkedAt: number;
  stale: boolean;
}> {
  const now = Date.now();
  return [...proxyHealthCache.entries()].map(([proxyUrl, entry]) => ({
    proxyUrl,
    healthy: entry.healthy,
    checkedAt: entry.checkedAt,
    stale: now - entry.checkedAt >= entry.ttlMs,
  }));
}

// ─── Internals ────────────────────────────────────────────────────────────────

function defaultPortForScheme(protocol: string): string {
  switch (protocol.replace(":", "").toLowerCase()) {
    case "https":
      return "443";
    case "socks5":
    case "socks5h":
      return "1080";
    // #14157: the WHATWG URL parser drops the port when it equals the scheme
    // default, so `http://host:80` reaches this fallback with port === "".
    // The default http proxy port is 80; probing 8080 fast-failed every
    // default-port http proxy and pushed healthy connections into cooldown.
    case "http":
      return "80";
    default:
      return "8080";
  }
}

function tcpCheck(host: string, port: number, timeoutMs: number): Promise<ProxyProbeVerdict> {
  return new Promise<ProxyProbeVerdict>((resolve) => {
    const socket = createConnection({ host, port }, () => {
      socket.destroy();
      resolve("ok");
    });
    socket.setTimeout(timeoutMs);
    socket.on("error", () => resolve("fail"));
    socket.on("timeout", () => {
      socket.destroy();
      resolve("timeout");
    });
  });
}

export function __setProxyHealthTcpCheckForTesting(check: TcpCheck | null): void {
  tcpCheckImpl = check ?? tcpCheck;
}
