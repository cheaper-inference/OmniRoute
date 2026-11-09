import { isLocalProvider, isSelfHostedChatProvider } from "@/shared/constants/providers";
import {
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
} from "@/shared/network/outboundUrlGuard";
import { getProviderValidationGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { getGuardedDispatcher } from "../utils/connectGuardDispatcher.ts";
import {
  hasAmbientProxyContext,
  isDirectFetchContext,
  isTlsFingerprintActive,
  resolveProxyForRequest,
} from "../utils/proxyFetch.ts";

/**
 * String-level SSRF guard for the runtime dispatch path (GHSA-4f49-hj64-448x) — moved verbatim
 * from `BaseExecutor.assertOutboundUrlAllowed()` (which now delegates here) so the guard and the
 * connect-time guard below live together and `base.ts` stays within its file-size ceiling.
 * Local / self-hosted providers are exempt; `public-only` blocks private + metadata, the default
 * mode blocks the cloud-metadata IMDS pivot. Throws on a blocked URL.
 */
export function assertDispatchUrlAllowed(provider: string, url: string): void {
  if (!url) return;
  if (isLocalProvider(provider) || isSelfHostedChatProvider(provider)) {
    // Exempt from public-host checks, never from the cloud-metadata block.
    parseAndValidateNonMetadataUrl(url);
    return;
  }
  if (getProviderValidationGuard() === "public-only") {
    parseAndValidatePublicUrl(url);
    return;
  }
  parseAndValidateNonMetadataUrl(url);
}

/**
 * True when a request to `url`, issued from the current async scope, would take the ordinary
 * direct undici path of the patched fetch — so a caller-supplied guarded `dispatcher` can be
 * handed to it without skipping anything the patched fetch does for that request.
 *
 * Deliberately conservative — anything else answers `false` and the caller keeps its plain
 * (string-level) URL guard instead:
 * - a proxy applies (per-connection context proxy or env proxy): the proxy resolves the name
 *   itself, and a caller dispatcher would bypass it and leak the egress IP;
 * - the explicit direct sentinel is active: `patchedFetch` then uses the native fetch, which
 *   cannot drive an undici dispatcher;
 * - TLS-fingerprint impersonation would carry the request: a caller dispatcher short-circuits it;
 * - the proxy configuration cannot be resolved (`resolveProxyForRequest` throws).
 */
export function canGuardDirectConnection(provider: string, url: string): boolean {
  if (hasAmbientProxyContext() || isDirectFetchContext()) return false;
  if (isTlsFingerprintActive(provider, false)) return false;
  try {
    return resolveProxyForRequest(url).source === "direct";
  } catch {
    return false;
  }
}

type DispatchCredentials = { providerSpecificData?: { baseUrl?: unknown } } | null;

/**
 * `fetch(url, init)` for provider dispatch, with a connect-time DNS-rebinding guard
 * (GHSA-cmhj-wh2f-9cgx) on operator-supplied base URLs.
 *
 * `assertDispatchUrlAllowed()` validates the host NAME, but the real `fetch()` re-resolves DNS at
 * connect time — a short-TTL record can be public for the string check and private/metadata
 * moments later (classic TOCTOU). That is exploitable where the host is operator-controlled: the
 * `providerSpecificData.baseUrl` override (#6147), which is also where every `openai-compatible-*`
 * node gets its host. Built-in providers' hosts are fixed registry values, so they keep the
 * ordinary pooled dispatcher (and its retry policy).
 *
 * For an operator URL the call goes through the AMBIENT global `fetch` — the patched one from
 * `proxyFetch.ts`, or whatever a test stubbed in — carrying a `dispatcher` whose connections are
 * validated at connect time (`getGuardedDispatcher`). No DNS lookup happens here, so stubbed
 * fetches never touch DNS. Nothing is guarded (string-level check only) when the provider is
 * exempt, the guard is `"none"`, or {@link canGuardDirectConnection} says a proxy /
 * TLS-impersonation / explicit-direct route applies — when in doubt we do NOT swap the transport.
 */
export function dispatchGuarded(
  provider: string,
  url: string,
  init: RequestInit,
  credentials?: DispatchCredentials
): Promise<Response> {
  // A caller that pinned a redirect mode (strict validation: "error") keeps it.
  if (init.redirect) return dispatchOnce(provider, url, init, credentials, false);
  return dispatchFollowingRedirects(provider, url, init, credentials);
}

function dispatchOnce(
  provider: string,
  url: string,
  init: RequestInit,
  credentials: DispatchCredentials | undefined,
  isRedirectHop: boolean
): Promise<Response> {
  const override = credentials?.providerSpecificData?.baseUrl;
  const guard = getProviderValidationGuard();
  if (
    guard === "none" ||
    // A redirect target is never a fixed registry host, so it is guarded like an override.
    (!isRedirectHop && (typeof override !== "string" || override.trim() === "")) ||
    isLocalProvider(provider) ||
    isSelfHostedChatProvider(provider) ||
    !canGuardDirectConnection(provider, url)
  ) {
    return fetch(url, init);
  }
  return fetch(url, { ...init, dispatcher: getGuardedDispatcher(guard) } as RequestInit);
}

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REDIRECTS = 5;
const CREDENTIAL_HEADER = /^(authorization|proxy-authorization|cookie)$|key|token|secret/i;
const BODY_HEADERS = ["content-type", "content-length", "content-encoding", "content-language"];

/** Request options for the next hop: drops credentials across origins, applies Fetch method rules. */
function redirectHopOptions(
  options: RequestInit,
  status: number,
  fromUrl: string,
  toUrl: string
): RequestInit {
  const headers = new Headers(options.headers);
  if (new URL(toUrl).origin !== new URL(fromUrl).origin) {
    for (const name of [...headers.keys()]) {
      if (CREDENTIAL_HEADER.test(name)) headers.delete(name);
    }
  }
  const method = (options.method || "GET").toUpperCase();
  const switchesToGet = status === 303 ? method !== "HEAD" : status <= 302 && method === "POST";
  if (!switchesToGet) return { ...options, headers: Object.fromEntries(headers.entries()) };
  for (const name of BODY_HEADERS) headers.delete(name);
  return {
    ...options,
    method: "GET",
    body: undefined,
    headers: Object.fromEntries(headers.entries()),
  };
}

/**
 * Follows redirects by hand: an auto-followed redirect would reach a Location target
 * that neither guard above ever saw, and on 307/308 forward the POST body and the key to it.
 * Every hop gets the string guard and the connect-time guard; credential headers are dropped
 * when the origin changes; method rules follow the Fetch standard.
 */
async function dispatchFollowingRedirects(
  provider: string,
  url: string,
  init: RequestInit,
  credentials: DispatchCredentials | undefined
): Promise<Response> {
  let currentUrl = url;
  let options: RequestInit = { ...init, redirect: "manual" };
  for (let hop = 0; ; hop++) {
    const response = await dispatchOnce(provider, currentUrl, options, credentials, hop > 0);
    const location = response.headers.get("location");
    if (!REDIRECT_STATUSES.has(response.status) || !location) return response;
    void response.body?.cancel().catch(() => {});
    if (hop >= MAX_REDIRECTS) {
      throw new Error(`Provider dispatch stopped after ${MAX_REDIRECTS} redirects`);
    }
    const nextUrl = new URL(location, currentUrl).toString();
    assertDispatchUrlAllowed(provider, nextUrl);
    options = redirectHopOptions(options, response.status, currentUrl, nextUrl);
    currentUrl = nextUrl;
  }
}
