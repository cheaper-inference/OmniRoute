/**
 * The path allowlist of the quota panel port.
 *
 * The list is the minimum set the self-service quota page needs: the page itself, the two
 * API routes it calls and their `/v1` aliases, the build assets and the tab icons. Every
 * pattern is anchored and case sensitive, like the route it serves, and is matched against
 * the path without its query. The bridge runs its dot segment and fragment guard before this
 * list is consulted. The write paths are the two quota view paths, where one bounded `PATCH`
 * is relayed (`isQuotaPanelWritePath`).
 */

import net from "net";

const QUOTA_VIEW_PATH = /^\/api\/v1\/me\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const QUOTA_VIEW_ALIAS_PATH = /^\/v1\/me\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/;
const PANEL_WRITE_PATH_PATTERNS: readonly RegExp[] = [QUOTA_VIEW_PATH, QUOTA_VIEW_ALIAS_PATH];
const PANEL_PATH_PATTERNS: readonly RegExp[] = [
  /^\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/,
  QUOTA_VIEW_PATH,
  QUOTA_VIEW_ALIAS_PATH,
  /^\/api\/v1\/me\/usage$/,
  /^\/v1\/me\/usage$/,
  /^\/_next\/static\/[^/\\]/,
];
const PANEL_EXACT_PATHS: ReadonlySet<string> = new Set([
  "/favicon.ico",
  "/favicon.svg",
  "/icon-512.png",
  "/apple-touch-icon.png",
]);
const PRINTABLE_ASCII_TARGET = /^[\x21-\x7e]+$/;

/**
 * Request headers the framework reserves for its own use. The panel does not relay a header
 * whose lower-case name starts with one of the prefixes or equals one of the names.
 */
export const QUOTA_PANEL_DROPPED_HEADER_PREFIXES: readonly string[] = Object.freeze([
  "x-middleware-",
  "x-invoke-",
  "x-nextjs-",
  "x-now-",
  "x-next-",
]);
export const QUOTA_PANEL_DROPPED_HEADER_NAMES: readonly string[] = Object.freeze([
  "x-matched-path",
  "next-resume",
]);

/**
 * Response headers of the main port that the panel does not copy to its client. They describe
 * the main port's own connection, so the listener's HTTP server writes its own.
 */
export const QUOTA_PANEL_DROPPED_RESPONSE_HEADERS: readonly string[] = Object.freeze([
  "keep-alive",
  "connection",
]);

/** The methods the quota panel port relays without a body. */
export const QUOTA_PANEL_METHOD_NAMES: readonly string[] = Object.freeze(["GET", "HEAD"]);

/** The one method the quota panel port relays with a body, on the write paths only. */
export const QUOTA_PANEL_WRITE_METHOD = "PATCH";
/** The largest body of that request, in bytes, as declared by its `Content-Length`. */
export const QUOTA_PANEL_WRITE_MAX_BYTES = 4096;
/** The time a client has to send that body before the request is refused. */
export const QUOTA_PANEL_WRITE_TIMEOUT_MS = 5_000;

/** True when every character of the request target is printable ASCII, space excluded. */
export function isPrintableAsciiTarget(rawUrl: string): boolean {
  return PRINTABLE_ASCII_TARGET.test(rawUrl);
}

/**
 * True when the path, without its query, is on the quota panel allowlist.
 *
 * With a base path (`/seg` or `/seg/seg`, no trailing slash), the path must start with that
 * exact prefix followed by `/`, and only the rest is compared with the list.
 */
export function isQuotaPanelPath(pathname: string, basePath = ""): boolean {
  const path = pathUnderBasePath(pathname, basePath);
  if (path === null) return false;
  return PANEL_EXACT_PATHS.has(path) || PANEL_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

/**
 * True when the path, without its query, is a write path: the quota view or its `/v1` alias.
 * The base path rule is the one of `isQuotaPanelPath`.
 */
export function isQuotaPanelWritePath(pathname: string, basePath = ""): boolean {
  const path = pathUnderBasePath(pathname, basePath);
  return path !== null && PANEL_WRITE_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

/** The path without the base path, or null when it does not start with the base path and `/`. */
function pathUnderBasePath(pathname: string, basePath: string): string | null {
  if (!basePath) return pathname;
  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : null;
}

/** The address the quota panel listener binds when QUOTA_PANEL_HOST is empty. */
export const QUOTA_PANEL_DEFAULT_HOST = "127.0.0.1";

/** The most connections the quota panel listener holds at a time. */
export const QUOTA_PANEL_MAX_CONNECTIONS = 256;
/** The time a client of the quota panel listener has to send the request headers. */
export const QUOTA_PANEL_HEADERS_TIMEOUT_MS = 10_000;
/** The time a client of the quota panel listener has to send the whole request. */
export const QUOTA_PANEL_REQUEST_TIMEOUT_MS = 30_000;
/** The time an idle kept-alive connection of the quota panel listener stays open. */
export const QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS = 5_000;
/**
 * How often the quota panel listener checks the header and request timeouts. The HTTP server
 * checks them every 30 seconds by default, which would let them run past their values.
 */
export const QUOTA_PANEL_TIMEOUT_CHECK_INTERVAL_MS = 1_000;
/** A connection of the quota panel listener with no activity for this long is closed. */
export const QUOTA_PANEL_SOCKET_TIMEOUT_MS = 60_000;

/**
 * The first segments of application routes, rewrite prefixes included. A base path that starts
 * with one of them is refused, so the allowlist never lines up with another route.
 */
export const QUOTA_PANEL_RESERVED_BASE_SEGMENTS: readonly string[] = Object.freeze([
  "api",
  "v1",
  "v1beta",
  "_next",
  "quota",
  "dashboard",
  "docs",
  "login",
  "codex",
  "responses",
  "anthropic",
  "openai",
  "v0",
  "connect",
]);

export type QuotaPanelListenerDecision =
  | { kind: "off" }
  | { kind: "refused"; warning: string }
  | { kind: "listen"; port: number; host: string; basePath: string };

type ListenerEnv = Record<string, string | undefined>;

const STAYS_OFF = "The quota panel port stays off.";
const INVALID_PORT_WARNING = `QUOTA_PANEL_PORT is not a port number from 1 to 65535. ${STAYS_OFF}`;
const PORT_CLASH_WARNING = `QUOTA_PANEL_PORT equals the dashboard port or the API port. ${STAYS_OFF}`;
const LIVE_WS_CLASH_WARNING =
  "QUOTA_PANEL_PORT equals the live dashboard WebSocket port (LIVE_WS_PORT, default 20132). " +
  STAYS_OFF;
const BASE_PATH_WARNING = `OMNIROUTE_BASE_PATH has a shape the quota panel port does not support. ${STAYS_OFF}`;

const PORT_DIGITS = /^[0-9]{1,5}$/;
// A leading slash and one or more segments, with no trailing slash and no empty segment.
const BASE_PATH_SHAPE = /^(?:\/[A-Za-z0-9_~-][A-Za-z0-9._~-]*)+$/;
const RESERVED_BASE_SEGMENTS: ReadonlySet<string> = new Set(QUOTA_PANEL_RESERVED_BASE_SEGMENTS);
const LOOPBACK_BIND_HOSTS: ReadonlySet<string> = new Set(["::1", "localhost"]);
// 127.0.0.0/8, written as four decimal octets, alone or in its IPv4-mapped IPv6 form.
const LOOPBACK_IPV4 = /^(?:::ffff:)?127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;
const BRACKETED = /^\[(.+)\]$/;
// Same default and same reading as the live dashboard WebSocket server
// (src/server/ws/liveServer.ts). That module starts its server on import, so it is not imported.
const LIVE_WS_DEFAULT_PORT = 20132;

function parsePanelPort(value: string): number | null {
  if (!PORT_DIGITS.test(value)) return null;
  const port = Number(value);
  return port >= 1 && port <= 65535 ? port : null;
}

/** The port of the live dashboard WebSocket server, or null while that server is off. */
function liveWsPort(env: ListenerEnv): number | null {
  const flag = env.OMNIROUTE_ENABLE_LIVE_WS;
  const enabled = flag === undefined || flag === "1" || flag.toLowerCase() === "true";
  return enabled ? Number.parseInt(env.LIVE_WS_PORT || String(LIVE_WS_DEFAULT_PORT), 10) : null;
}

/** The base path, "" for none, or null for an unsupported shape. */
function resolvePanelBasePath(value: string | undefined): string | null {
  const trimmed = (value || "").trim();
  if (trimmed === "") return "";
  return isQuotaPanelBasePath(trimmed) ? trimmed : null;
}

/**
 * True for a base path the quota panel role supports: a leading slash and one or more segments,
 * with no trailing slash, no empty segment and none of `\ ? # %`. The first segment must not be
 * the first segment of an application route (`QUOTA_PANEL_RESERVED_BASE_SEGMENTS`, in any case).
 */
export function isQuotaPanelBasePath(basePath: string): boolean {
  if (!BASE_PATH_SHAPE.test(basePath)) return false;
  const firstSegment = basePath.split("/")[1].toLowerCase();
  return !RESERVED_BASE_SEGMENTS.has(firstSegment);
}

/** The bind address as `listen` takes it: an IPv6 literal loses its brackets. */
function resolvePanelHost(value: string | undefined): string {
  const host = (value || "").trim() || QUOTA_PANEL_DEFAULT_HOST;
  const inner = BRACKETED.exec(host)?.[1];
  return inner !== undefined && net.isIPv6(inner) ? inner : host;
}

/**
 * Decides whether the quota panel listener starts, and where.
 *
 * The listener follows QUOTA_PANEL_PORT only. A refused value is never echoed in the warning.
 */
export function resolveQuotaPanelListener(
  env: ListenerEnv,
  ports: { apiPort: number; dashboardPort: number }
): QuotaPanelListenerDecision {
  const rawPort = (env.QUOTA_PANEL_PORT || "").trim();
  if (rawPort === "") return { kind: "off" };
  const port = parsePanelPort(rawPort);
  if (port === null) return { kind: "refused", warning: INVALID_PORT_WARNING };
  if (port === ports.dashboardPort || port === ports.apiPort) {
    return { kind: "refused", warning: PORT_CLASH_WARNING };
  }
  if (port === liveWsPort(env)) return { kind: "refused", warning: LIVE_WS_CLASH_WARNING };
  const basePath = resolvePanelBasePath(env.OMNIROUTE_BASE_PATH);
  if (basePath === null) return { kind: "refused", warning: BASE_PATH_WARNING };
  return { kind: "listen", port, host: resolvePanelHost(env.QUOTA_PANEL_HOST), basePath };
}

/**
 * True for a loopback bind address, case insensitive: `localhost`, `::1`, and the whole
 * 127.0.0.0/8 range, also in its IPv4-mapped IPv6 form.
 */
export function isLoopbackBindHost(host: string): boolean {
  const lower = host.toLowerCase();
  return LOOPBACK_BIND_HOSTS.has(lower) || LOOPBACK_IPV4.test(lower);
}
