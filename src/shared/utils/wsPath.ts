/**
 * Derive the live WebSocket path from `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL`.
 *
 * Only `ws://` or `wss://` URLs are accepted (mirrors the scheme guard in
 * `getLivePublicUrl()`). The pathname is extracted and used as the WS upgrade
 * path; if the URL has no pathname (or is `/`), falls back to `/live-ws`.
 *
 * Used by:
 * - `src/app/api/v1/ws/route.ts` — handshake response `path` field
 * - `src/hooks/useLiveDashboard.ts` — build-time path constant + runtime discovery
 *
 * No env var is introduced — this reads the existing `NEXT_PUBLIC_LIVE_WS_PUBLIC_URL`.
 */
export function deriveLiveWsPath(publicUrl?: string): string {
  if (!publicUrl) return "/live-ws";
  if (!publicUrl.startsWith("ws://") && !publicUrl.startsWith("wss://")) return "/live-ws";
  try {
    const parsed = new URL(publicUrl);
    const pathname = parsed.pathname;
    return pathname && pathname !== "/" ? pathname : "/live-ws";
  } catch {
    return "/live-ws";
  }
}

/**
 * The operator-declared public WebSocket URL, resolved at RUNTIME.
 *
 * `NEXT_PUBLIC_*` is inlined into the client bundle at BUILD time, so a prebuilt
 * Docker or npm image can never carry an operator's value — which is exactly why
 * the server echoes this in `/api/v1/ws?handshake=1` for the client to discover.
 * Reading only the `NEXT_PUBLIC_`-prefixed name on the server made that echo
 * unreachable too: behind a reverse proxy the dashboard kept dialling
 * `wss://<host>:20132/live-ws` and reported "Live disabled" (#11331).
 *
 * `LIVE_WS_PUBLIC_URL` is the runtime name, alongside the existing runtime
 * `LIVE_WS_HOST` / `LIVE_WS_PORT`. The prefixed name still wins nothing and loses
 * nothing — it stays supported as the fallback so existing deployments that set it
 * (build-time or in the container) keep working.
 */
export function resolveLiveWsPublicUrl(env: NodeJS.ProcessEnv = process.env): string | null {
  const candidates = [env.LIVE_WS_PUBLIC_URL, env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL];
  for (const candidate of candidates) {
    if (typeof candidate !== "string") continue;
    const trimmed = candidate.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("ws://") || trimmed.startsWith("wss://")) return trimmed;
  }
  return null;
}

/** Convenience: read the env var at call time and derive the path. */
export function getLiveWsPath(): string {
  return deriveLiveWsPath(resolveLiveWsPublicUrl() ?? undefined);
}

/** A port the handshake may report, or null when it is not usable. */
export function sanitizeLiveWsPort(port: unknown): number | null {
  const value = typeof port === "string" ? Number(port) : port;
  if (typeof value !== "number" || !Number.isInteger(value)) return null;
  return value > 0 && value < 65536 ? value : null;
}

/**
 * Whether the live dashboard WebSocket server is switched on (`OMNIROUTE_ENABLE_LIVE_WS`,
 * default on). Same reading as `isLiveWsEnabled()` in src/server/ws/liveServer.ts, which
 * cannot be imported here because it starts the server on import. The handshake reports it,
 * so the client never dials a server that is off (KEA-9514).
 */
export function isLiveWsServerEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const flag = env.OMNIROUTE_ENABLE_LIVE_WS;
  if (flag === undefined) return true;
  return flag === "1" || flag.toLowerCase() === "true";
}

/**
 * Set to `true` by the production server wrapper (scripts/dev/standalone-server-ws.mjs),
 * which relays `/live-ws` upgrades on the main HTTP port to the live server. `next dev` and
 * `npm start` (scripts/dev/run-next.mjs) do not relay, so the flag stays unset there.
 */
export const LIVE_WS_SAME_ORIGIN_RELAY_FLAG = "__omnirouteLiveWsSameOriginRelay";

/** True when this process's main HTTP port relays `/live-ws` upgrades (see the flag above). */
export function isLiveWsSameOriginRelayActive(): boolean {
  return (globalThis as Record<string, unknown>)[LIVE_WS_SAME_ORIGIN_RELAY_FLAG] === true;
}

/**
 * True for a page hostname on this machine: `localhost`, 127.0.0.0/8, `::1` (bracketed, as
 * `location.hostname` gives it, or bare) and `0.0.0.0`. On these the dashboard keeps dialling
 * the live server's own port, because `next dev` has no upgrade handler on the HTTP port.
 */
export function isLoopbackLiveWsHostname(hostname: string): boolean {
  const host = hostname.trim().toLowerCase();
  if (host === "localhost" || host === "0.0.0.0" || host === "[::1]" || host === "::1") {
    return true;
  }
  return /^127(?:\.\d{1,3}){3}$/.test(host);
}

export interface LiveWsUrlParts {
  /** Explicit `wsUrl` passed by the caller - always wins. */
  explicit?: string | null;
  /** `live.publicUrl` from the handshake - a complete URL, used as-is. */
  handshakeUrl?: string | null;
  /** `live.port` from the handshake, i.e. the running LIVE_WS_PORT. */
  handshakePort?: number | null;
  /** `live.path` from the handshake. */
  handshakePath?: string | null;
  /** `live.enabled` from the handshake: `false` when the live server is turned off. */
  handshakeEnabled?: boolean | null;
  /**
   * `live.sameOrigin` from the handshake: `false` when the main HTTP port cannot relay the
   * upgrade (`next dev`, `npm start`), so the client must dial the live port instead.
   */
  handshakeSameOrigin?: boolean | null;
  /** The page's location. Off loopback, the default is the page's own origin. */
  location?: { protocol: string; hostname: string; host: string } | null;
  /** The compiled-in default, used for everything the handshake does not say. */
  defaultUrl: string;
}

function pathOf(url: string): string {
  try {
    const { pathname } = new URL(url);
    return pathname && pathname !== "/" ? pathname : "/live-ws";
  } catch {
    return "/live-ws";
  }
}

function applyLiveWsPortAndPath(
  defaultUrl: string,
  port: number | null,
  path: string | null
): string {
  if (port === null && path === null) return defaultUrl;

  try {
    const url = new URL(defaultUrl);
    if (port !== null) url.port = String(port);
    if (path !== null) url.pathname = path;
    return url.toString();
  } catch {
    return defaultUrl;
  }
}

/**
 * Resolve the live dashboard WebSocket URL, or `null` when there is nothing to dial.
 *
 * The handshake reports the port the live server is actually listening on, but
 * the client read only `publicUrl` and `path` from it. An operator who moved
 * the server with `LIVE_WS_PORT` still got the compiled-in 20132, and the
 * dashboard sat on "Live disabled - WebSocket disconnected" with no way to
 * correct it short of rebuilding the image (#11331).
 *
 * Off loopback the live port is usually not reachable: a reverse proxy exposes only
 * the dashboard's port, and the production server relays `/live-ws` upgrades on that
 * port to the live server (scripts/dev/standalone-server-ws.mjs). So a page that is not
 * on loopback dials its own origin, unless the handshake says the HTTP port cannot relay
 * (KEA-9514).
 *
 * Precedence: an explicit `wsUrl` wins; then a handshake saying the live server is
 * disabled yields `null`; then a complete `publicUrl` from the handshake; then, off
 * loopback, the page's own origin with the reported path; otherwise the default URL
 * with whatever port and path the handshake reported applied to it.
 */
export function resolveLiveWsUrl({
  explicit,
  handshakeUrl,
  handshakePort,
  handshakePath,
  handshakeEnabled,
  handshakeSameOrigin,
  location,
  defaultUrl,
}: LiveWsUrlParts): string | null {
  if (explicit) return explicit;
  if (handshakeEnabled === false) return null;
  if (handshakeUrl) return handshakeUrl;

  const port = sanitizeLiveWsPort(handshakePort);
  const path =
    typeof handshakePath === "string" && handshakePath.startsWith("/") ? handshakePath : null;

  if (location && !isLoopbackLiveWsHostname(location.hostname) && handshakeSameOrigin !== false) {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    return `${protocol}//${location.host}${path ?? pathOf(defaultUrl)}`;
  }

  return applyLiveWsPortAndPath(defaultUrl, port, path);
}
