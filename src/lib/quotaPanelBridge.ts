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

/** The methods the quota panel port relays. */
export const QUOTA_PANEL_METHODS: ReadonlySet<string> = new Set(["GET", "HEAD"]);

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
