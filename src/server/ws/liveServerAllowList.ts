/**
 * liveServerAllowList — extract of the host/origin allow-list logic from
 * `src/server/ws/liveServer.ts`.
 *
 * Lives in its own module so unit tests can exercise it without booting the
 * full WebSocket server. The behaviour here MUST match the one used by the
 * connection handler exactly.
 *
 * Bug #1 (plans/2026-06-23-omniroute-v3.8.34-deep-audit.md) added the
 * `LIVE_WS_ALLOWED_HOSTS` opt-in for LAN/Tailscale deployments.
 */

import { getTrustProxyMode } from "@/server/origin/trustProxyMode";

const DEFAULT_HOST = "127.0.0.1";

/**
 * Default origins allowed to open a WebSocket against the local dashboard.
 * These match the loopback HTTP listener at port 20128.
 */
export const DEFAULT_ALLOWED_ORIGINS: readonly string[] = Object.freeze([
  "http://127.0.0.1:20128",
  "http://localhost:20128",
  "http://[::1]:20128",
  // 0.0.0.0 is the "unspecified" address but browsers treat it as loopback
  // when the user pastes it into the address bar; the dashboard is reachable
  // at http://0.0.0.0:20128 and its WS Origin is exactly that string. Same
  // local-only posture as the entries above — it never refers to a LAN host.
  "http://0.0.0.0:20128",
]);

/**
 * Parse a comma-separated env value into a set of trimmed, non-empty entries.
 * Centralized so tests can exercise empty / whitespace / dup behaviour.
 */
export function parseCsvEnv(value: string | undefined | null): Set<string> {
  return new Set(
    (value ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

/**
 * Build the static origin allow-list from defaults + LIVE_WS_ALLOWED_ORIGINS.
 */
export function buildAllowedOrigins(env: NodeJS.ProcessEnv = process.env): Set<string> {
  const extra = parseCsvEnv(env.LIVE_WS_ALLOWED_ORIGINS);
  const runtimePort = env.PORT || env.DASHBOARD_PORT;
  const dynamicDefaults: string[] = [];
  if (runtimePort && runtimePort !== "20128") {
    dynamicDefaults.push(
      `http://127.0.0.1:${runtimePort}`,
      `http://localhost:${runtimePort}`,
      `http://[::1]:${runtimePort}`,
      `http://0.0.0.0:${runtimePort}`
    );
  }
  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...dynamicDefaults, ...extra]);
}

/**
 * Build the host-based allow-list (LAN/Tailscale extension).
 */
export function buildAllowedHosts(env: NodeJS.ProcessEnv = process.env): Set<string> {
  return parseCsvEnv(env.LIVE_WS_ALLOWED_HOSTS);
}

/**
 * Parse the host portion of an Origin URL.
 *
 * Returns `null` when the input is not a well-formed absolute URL — callers
 * should treat `null` as "not a match".
 */
export function originHost(origin: string): { host: string; hostname: string } | null {
  try {
    const url = new URL(origin);
    return { host: url.host, hostname: url.hostname };
  } catch {
    return null;
  }
}

/**
 * Whether the given Origin's host (or `host:port`) is in the host
 * allow-list. Returns false when the list is empty.
 */
export function originHostMatches(origin: string, allowedHosts: Set<string>): boolean {
  if (allowedHosts.size === 0) return false;
  const parsed = originHost(origin);
  if (!parsed) return false;
  return allowedHosts.has(parsed.host) || allowedHosts.has(parsed.hostname);
}

/**
 * Top-level Origin allow decision. The contract:
 *
 *   - When `origin` is undefined (no Origin header, e.g. CLI/MCP), we only
 *     accept the request when the WS listener is bound to loopback. This
 *     prevents drive-by LAN clients from omitting Origin to bypass the
 *     browser-side check.
 *
 *   - When `origin` is present, we accept it if it matches an entry in the
 *     static origin list (defaults + LIVE_WS_ALLOWED_ORIGINS) or if its
 *     host matches an entry in the LAN allow-list (LIVE_WS_ALLOWED_HOSTS).
 */
export function isOriginAllowed(
  origin: string | undefined,
  env: NodeJS.ProcessEnv = process.env,
  options: { allowedOrigins?: Set<string>; allowedHosts?: Set<string> } = {}
): boolean {
  const allowedOrigins = options.allowedOrigins ?? buildAllowedOrigins(env);
  const allowedHosts = options.allowedHosts ?? buildAllowedHosts(env);

  if (!origin) {
    const host = env.LIVE_WS_HOST || DEFAULT_HOST;
    return host === "127.0.0.1" || host === "::1" || host === "localhost";
  }
  if (allowedOrigins.has(origin)) return true;
  if (originHostMatches(origin, allowedHosts)) return true;
  return false;
}

// ── Same-origin upgrades through the main HTTP port (KEA-9514) ───────────────

/** Upgrade request headers, as Node's `IncomingMessage.headers` gives them. */
export type LiveWsUpgradeHeaders = Record<string, string | string[] | undefined>;

/**
 * Where an upgrade's Origin stands:
 *   - `allowed`: the static allow-list (`isOriginAllowed`) admits it, as before;
 *   - `same-origin`: not allow-listed, but it is the origin the browser dialled. The
 *     connection must then present a real credential (`isLiveWsAuthAcceptedForOrigin`);
 *   - `forbidden`: refused.
 */
export type LiveWsOriginVerdict = "allowed" | "same-origin" | "forbidden";

function firstHeaderValue(headers: LiveWsUpgradeHeaders, name: string): string | null {
  const raw = headers[name];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.split(",")[0]?.trim() || null;
}

/** `host[:port]` of a Host-style header value for `protocol`, or null when malformed. */
function normalizeHostHeader(protocol: string, raw: string | null): string | null {
  if (!raw || /[/\\\s@\x00-\x1f\x7f]/.test(raw)) return null;
  try {
    const url = new URL(`${protocol}//${raw}`);
    if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
      return null;
    }
    return url.host;
  } catch {
    return null;
  }
}

/**
 * True when `origin` is the origin the browser dialled, i.e. the page and the socket share
 * an origin. The dashboard opens `/live-ws` on its own origin off loopback, and the
 * production server relays that upgrade with the browser's headers unchanged
 * (scripts/dev/standalone-server-ws.mjs::proxyLiveWs), so the `Host` that arrives here is
 * the one the browser sent.
 *
 * Why this cannot be used for cross-site WebSocket hijacking: a browser always sends the
 * Origin of the page that opened the socket and the Host of the URL it dialled, and page
 * code can set neither (nor any other header on a WebSocket). A page on another site
 * therefore never produces a matching pair. A DNS-rebinding page does (its own host in
 * both), but the browser sends it no cookie of this instance, which is why a same-origin
 * socket must still present a real credential (`isLiveWsAuthAcceptedForOrigin`).
 *
 * `X-Forwarded-Host` / `X-Forwarded-Proto` are read only when the operator declared a
 * reverse proxy with `OMNIROUTE_TRUST_PROXY` (for proxies that rewrite Host); with them, the
 * Origin's scheme must also match the forwarded one.
 */
export function isSameOriginLiveWsUpgrade(
  origin: string,
  headers: LiveWsUpgradeHeaders,
  env: NodeJS.ProcessEnv = process.env
): boolean {
  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  // A browser's Origin is scheme://host[:port] and nothing else.
  if (parsed.origin !== origin.trim().toLowerCase()) return false;

  const candidates = [firstHeaderValue(headers, "host")];
  if (getTrustProxyMode(env) !== "none") {
    const proto = firstHeaderValue(headers, "x-forwarded-proto")?.toLowerCase();
    if ((proto === "http" || proto === "https") && parsed.protocol !== `${proto}:`) return false;
    candidates.push(firstHeaderValue(headers, "x-forwarded-host"));
  }
  return candidates.some((raw) => normalizeHostHeader(parsed.protocol, raw) === parsed.host);
}

/** The Origin verdict for a live dashboard upgrade (see `LiveWsOriginVerdict`). */
export function resolveLiveWsOriginVerdict(
  origin: string | undefined,
  headers: LiveWsUpgradeHeaders,
  env: NodeJS.ProcessEnv = process.env,
  options: { allowedOrigins?: Set<string>; allowedHosts?: Set<string> } = {}
): LiveWsOriginVerdict {
  if (isOriginAllowed(origin, env, options)) return "allowed";
  if (origin && isSameOriginLiveWsUpgrade(origin, headers, env)) return "same-origin";
  return "forbidden";
}

/**
 * Whether an authorization result is enough for a connection with this Origin verdict. An
 * allow-listed origin keeps today's rules, open/anonymous mode included. A same-origin one
 * needs a real credential (dashboard session cookie or a `manage` API key): the anonymous
 * modes (requireLogin=false, fresh install) would otherwise let a DNS-rebinding page in.
 */
export function isLiveWsAuthAcceptedForOrigin(
  verdict: LiveWsOriginVerdict,
  auth: { authorized: boolean; anonymous?: boolean }
): boolean {
  if (verdict === "forbidden" || !auth.authorized) return false;
  return verdict === "allowed" || auth.anonymous !== true;
}
