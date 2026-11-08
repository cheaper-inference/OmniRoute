/**
 * Redirect and DNS handling for /v1/search upstream calls.
 *
 * resolveSearchBaseUrl() (./baseUrl.ts) checks the base URL once, by name. A
 * plain fetch() then follows 3xx by itself, and a name can resolve to a
 * cloud-metadata address. This follows redirects by hand and runs the same
 * block-metadata check on every Location. On a direct connection, every
 * redirect hop goes through the connect-time guarded dispatcher
 * (GHSA-cmhj-wh2f-9cgx), which checks the addresses of the lookup the socket
 * actually uses. The first hop gets that dispatcher only when its origin
 * (scheme, host and port) differs from the provider's registry base URL, i.e.
 * for an operator or caller base URL; the fixed registry origin keeps the
 * pooled dispatcher and its retry, as with dispatchGuarded() for executors.
 * Loopback and LAN hops stay allowed, as they are for the base URL, so a
 * self-hosted SearXNG behind a redirect keeps working.
 *
 * Behind a proxy the proxy resolves the name, so only the name check applies.
 * Under Bun (not a supported runtime) getGuardedDispatcher() throws, so a hop
 * that needs the connect-time check fails closed, as dispatchGuarded() does.
 */

import { canGuardDirectConnection } from "../../executors/dispatchPin.ts";
import { getGuardedDispatcher } from "../../utils/connectGuardDispatcher.ts";
import { validateSearchRedirectUrl } from "./baseUrl.ts";

/** Lower than undici's 20; a search endpoint has no reason for long chains. */
export const MAX_SEARCH_REDIRECTS = 5;

/** The statuses fetch() follows; any other 3xx is returned as is. */
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

// fetch() drops Authorization/Cookie/Proxy-Authorization on a cross-origin
// redirect. Search providers also send x-api-key and x-subscription-token, which
// fetch() would keep; drop those here too so a keyed hop cannot leak the key.
const CROSS_ORIGIN_DROPPED_HEADERS = [
  "authorization",
  "cookie",
  "proxy-authorization",
  "x-api-key",
  "x-subscription-token",
];
const BODY_HEADERS = ["content-type", "content-length", "content-encoding", "content-language"];

/** Request for the next hop, following the fetch spec's method and header rules. */
function nextHopInit(init: RequestInit, status: number, from: URL, to: URL): RequestInit {
  const headers = new Headers(init.headers);
  const method = (init.method || "GET").toUpperCase();
  let next: RequestInit = { ...init, headers };

  const switchToGet =
    (status === 303 && method !== "GET" && method !== "HEAD") ||
    ((status === 301 || status === 302) && method === "POST");
  if (switchToGet) {
    next = { ...next, method: "GET", body: undefined };
    for (const name of BODY_HEADERS) headers.delete(name);
  }
  if (from.origin !== to.origin) {
    for (const name of CROSS_ORIGIN_DROPPED_HEADERS) headers.delete(name);
  }
  return next;
}

/**
 * True when `url` is on the same origin as the provider's registry base URL.
 * Those hosts are fixed values, not operator or caller input, so the first hop
 * there does not need the connect-time guard.
 */
export function isRegistryEndpoint(url: string, registryBaseUrl: string): boolean {
  try {
    return new URL(url).origin === new URL(registryBaseUrl).origin;
  } catch {
    return false;
  }
}

/** Adds the connect-time metadata guard when the hop goes out directly. */
function withConnectGuard(providerId: string, url: URL, init: RequestInit): RequestInit {
  if (!canGuardDirectConnection(providerId, url.toString())) return init;
  return { ...init, dispatcher: getGuardedDispatcher("block-metadata") } as RequestInit;
}

/**
 * fetch() that follows up to {@link MAX_SEARCH_REDIRECTS} redirects, rejecting
 * any hop that points at a cloud-metadata endpoint by name or, on a direct
 * connection, by resolved address. The first URL's name check is the caller's
 * responsibility (resolveSearchBaseUrl already did it). With `guardFirstHop`
 * false the first hop keeps the ordinary dispatcher; redirect hops are guarded
 * either way.
 */
export async function fetchWithCheckedRedirects(
  url: string,
  init: RequestInit,
  providerId = "",
  guardFirstHop = true
): Promise<Response> {
  let currentUrl = new URL(url);
  const firstHopInit = (hopInit: RequestInit) =>
    guardFirstHop ? withConnectGuard(providerId, currentUrl, hopInit) : hopInit;
  // A caller that already refuses redirects ("error") or wants the raw 3xx
  // ("manual"), such as parallelSearch.ts, keeps that mode; only the default
  // "follow" is replaced by the checked loop below.
  if (init.redirect === "error" || init.redirect === "manual") {
    return fetch(currentUrl.toString(), firstHopInit(init));
  }
  let currentInit: RequestInit = { ...init, redirect: "manual" };

  for (let hop = 0; ; hop++) {
    const response = await fetch(
      currentUrl.toString(),
      hop === 0 ? firstHopInit(currentInit) : withConnectGuard(providerId, currentUrl, currentInit)
    );
    const location = REDIRECT_STATUSES.has(response.status)
      ? response.headers.get("location")
      : null;
    if (!location) return response;

    await response.body?.cancel().catch(() => {});
    if (hop >= MAX_SEARCH_REDIRECTS) {
      throw new Error(`Search provider exceeded ${MAX_SEARCH_REDIRECTS} redirects`);
    }
    const nextUrl = validateSearchRedirectUrl(new URL(location, currentUrl));
    currentInit = nextHopInit(currentInit, response.status, currentUrl, nextUrl);
    currentUrl = nextUrl;
  }
}
