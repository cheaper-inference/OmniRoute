/**
 * T14: Proxy Fast-Fail — TCP health check with in-memory cache.
 *
 * When a configured HTTP/SOCKS5 proxy is unreachable, every request
 * through OmniRoute used to wait for the full PROXY_TIMEOUT_MS (30s)
 * before failing. This module detects dead proxies in <2s via a quick
 * TCP connection check, caching the result to avoid overhead per request.
 *
 * Ref: sub2api PR #1167 (fix: proxy-fast-fail)
 */

import { createConnection } from "node:net";
import { stripIpv6Brackets } from "@omniroute/open-sse/utils/proxyFamily";
import {
  describeEgressForLog,
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

interface ProxyHealthEntry {
  healthy: boolean;
  checkedAt: number;
  ttlMs: number;
}

/**
 * Outcome of a TCP reachability probe. `reachable` (connection accepted) and
 * `unreachable` (frank refusal — ECONNREFUSED/ENOTFOUND/EHOSTUNREACH) are
 * DEFINITIVE verdicts; `timeout` is INDETERMINATE — the host may simply be busy
 * or briefly stalled. Non-definitive outcomes must never be memoized as a
 * permanent failure (oh-my-openagent #12378): a single timeout would otherwise
 * set the proxy aside for 60s and escalate to 600s, i.e. one network hiccup
 * disables routing until the streak expires.
 */
export type ProxyTcpOutcome = "reachable" | "unreachable" | "timeout";

// In-memory cache: proxyUrl → health entry
const proxyHealthCache = new Map<string, ProxyHealthEntry>();
const proxyHealthInflight = new Map<string, Promise<boolean>>();

// The injected probe may return the legacy boolean (true → reachable,
// false → unreachable) or the explicit tri-state outcome, so existing test
// doubles that return booleans keep working unchanged.
type TcpCheck = (
  host: string,
  port: number,
  timeoutMs: number
) => Promise<boolean | ProxyTcpOutcome>;
let tcpCheckImpl: TcpCheck = tcpCheck;

function normalizeTcpOutcome(raw: boolean | ProxyTcpOutcome): ProxyTcpOutcome {
  if (raw === true) return "reachable";
  if (raw === false) return "unreachable";
  return raw;
}

// Feed a DEFINITIVE probe verdict to proxy selection (PROXY_SKIP_RECENTLY_FAILED,
// default on): a proxy that refused the TCP connection is set aside by pools and
// account rotation, and taken back as soon as it answers again. A `timeout` is
// not definitive — it neither sets the proxy aside nor clears a prior set-aside,
// so a transient hiccup can never be memoized as a permanent failure. With the
// flag off nothing is ever written.
function noteProbeVerdict(proxyUrl: string, outcome: ProxyTcpOutcome): void {
  if (outcome === "timeout") return;
  if (outcome === "reachable") {
    if (hasProxyRefusals()) noteProxyRecovered(proxyEgressKey(proxyUrl), "proxy_unreachable");
    return;
  }
  if (isProxySkipRecentlyFailedEnabled()) {
    noteProxyRefusal(proxyEgressKey(proxyUrl), "proxy_unreachable");
  }
}

// Last DEFINITIVE state observed per proxy, so a degraded→restored transition
// is logged exactly once per change instead of on every probe. Keyed by proxy
// URL; never touched by an indeterminate (timeout) probe.
const lastDefinitiveState = new Map<string, "healthy" | "degraded">();

/**
 * Log a proxy's degraded→restored (or healthy→degraded) transition ONCE per
 * state change. A `timeout` is indeterminate and must not be treated as a
 * transition: a single stalled probe neither marks the proxy degraded nor
 * restored. The first definitive verdict only records the baseline silently —
 * transitions require a prior observed state to compare against.
 */
function logHealthTransition(proxyUrl: string, outcome: ProxyTcpOutcome): void {
  if (outcome === "timeout") return;
  const next: "healthy" | "degraded" = outcome === "reachable" ? "healthy" : "degraded";
  const prev = lastDefinitiveState.get(proxyUrl);
  if (prev === next) return;
  lastDefinitiveState.set(proxyUrl, next);
  if (prev === undefined) return;
  const egressKey = proxyEgressKey(proxyUrl);
  // Never log the raw URL: it may carry credentials. Fall back to a generic label.
  const label = egressKey === null ? "(proxy)" : describeEgressForLog(egressKey);
  if (next === "degraded") {
    console.warn(`[ProxyHealth] ${label} degraded: TCP probe refused (unreachable).`);
  } else {
    console.log(`[ProxyHealth] ${label} restored: TCP probe reachable again.`);
  }
}

/** Test-only: forget the transition baselines so each test starts clean. */
export function __resetProxyHealthTransitionsForTesting(): void {
  lastDefinitiveState.clear();
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
    // Malformed URL — treat as unreachable
    proxyHealthCache.set(proxyUrl, {
      healthy: false,
      checkedAt: Date.now(),
      ttlMs: cacheTtlMs,
    });
    return false;
  }

  const host = stripIpv6Brackets(url.hostname);
  const port = parseInt(url.port || defaultPortForScheme(url.protocol), 10);

  if (!host || isNaN(port)) {
    proxyHealthCache.set(proxyUrl, {
      healthy: false,
      checkedAt: Date.now(),
      ttlMs: cacheTtlMs,
    });
    return false;
  }

  const existingProbe = proxyHealthInflight.get(proxyUrl);
  if (existingProbe) {
    return existingProbe;
  }

  const probe = tcpCheckImpl(host, port, timeoutMs).then((raw) => {
    const outcome = normalizeTcpOutcome(raw);
    // Feed the (flag-gated) verdict to proxy selection, then memoize only
    // DEFINITIVE verdicts. A timeout is returned to the caller as unreachable
    // for this attempt but is NOT cached and does NOT set the proxy aside, so
    // the next isProxyReachable re-probes instead of inheriting a permanent
    // "down" verdict from one transient hiccup (#12378).
    noteProbeVerdict(proxyUrl, outcome);
    logHealthTransition(proxyUrl, outcome);
    if (outcome === "timeout") return false;
    proxyHealthCache.set(proxyUrl, {
      healthy: outcome === "reachable",
      checkedAt: Date.now(),
      ttlMs: outcome === "reachable" ? cacheTtlMs : Math.min(cacheTtlMs, UNHEALTHY_CACHE_TTL_MS),
    });
    return outcome === "reachable";
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

function tcpCheck(host: string, port: number, timeoutMs: number): Promise<ProxyTcpOutcome> {
  return new Promise<ProxyTcpOutcome>((resolve) => {
    const socket = createConnection({ host, port }, () => {
      socket.destroy();
      resolve("reachable");
    });
    socket.setTimeout(timeoutMs);
    // A refused/unresolvable host is a DEFINITIVE verdict.
    socket.on("error", () => resolve("unreachable"));
    // Our own deadline fired: the host may simply be busy. INDETERMINATE.
    socket.on("timeout", () => {
      socket.destroy();
      resolve("timeout");
    });
  });
}

export function __setProxyHealthTcpCheckForTesting(check: TcpCheck | null): void {
  tcpCheckImpl = check ?? tcpCheck;
}
