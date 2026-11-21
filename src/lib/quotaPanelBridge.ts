/**
 * The path allowlist of the quota panel port.
 *
 * The list is the minimum set the self-service quota page needs: the page itself, the two
 * API routes it calls and their `/v1` aliases, the build assets and the tab icons. Every
 * pattern is anchored and case sensitive, like the route it serves, and is matched against
 * the path without its query. The bridge runs its dot segment and fragment guard before this
 * list is consulted.
 */

const PANEL_PATH_PATTERNS: readonly RegExp[] = [
  /^\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/,
  /^\/api\/v1\/me\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/,
  /^\/v1\/me\/quota\/[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/,
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

/** The methods the quota panel port relays. Each panel role builds its own set from this list. */
export const QUOTA_PANEL_METHOD_NAMES: readonly string[] = Object.freeze(["GET", "HEAD"]);

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
  let path = pathname;
  if (basePath) {
    if (!pathname.startsWith(`${basePath}/`)) return false;
    path = pathname.slice(basePath.length);
  }
  return PANEL_EXACT_PATHS.has(path) || PANEL_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

/** The address the quota panel listener binds when QUOTA_PANEL_HOST is empty. */
export const QUOTA_PANEL_DEFAULT_HOST = "127.0.0.1";

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
const LOOPBACK_BIND_HOSTS: ReadonlySet<string> = new Set(["127.0.0.1", "::1", "localhost"]);
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
  return enabled ? parseInt(env.LIVE_WS_PORT || String(LIVE_WS_DEFAULT_PORT), 10) : null;
}

/** The base path, "" for none, or null for an unsupported shape. */
function resolvePanelBasePath(value: string | undefined): string | null {
  const trimmed = (value || "").trim();
  if (trimmed === "") return "";
  return isQuotaPanelBasePath(trimmed) ? trimmed : null;
}

/**
 * True for a base path the quota panel role supports: a leading slash and one or more segments,
 * with no trailing slash, no empty segment and none of `\ ? # %`.
 */
export function isQuotaPanelBasePath(basePath: string): boolean {
  return BASE_PATH_SHAPE.test(basePath);
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
  const host = (env.QUOTA_PANEL_HOST || "").trim() || QUOTA_PANEL_DEFAULT_HOST;
  return { kind: "listen", port, host, basePath };
}

/** True for the loopback spellings of a bind address, case insensitive. */
export function isLoopbackBindHost(host: string): boolean {
  return LOOPBACK_BIND_HOSTS.has(host.toLowerCase());
}
