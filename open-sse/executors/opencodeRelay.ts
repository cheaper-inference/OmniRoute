/**
 * opencodeRelay.ts — what changes for a gated free-tier request once it goes through the Bun
 * relay (`freeTierRelayUrl`, see `opencodeFreeTierContract.ts`): where it is sent, what the
 * relay is told and how its egress is attributed. With no relay configured the request is
 * sent and attributed as if this module did not exist.
 */
import { FREE_TIER_INFERENCE_BASE_URL, freeTierRelayUrl } from "./opencodeFreeTierContract.ts";
import { resolveProxyForRequest } from "../utils/proxyFetch.ts";

/**
 * Base URL of a gated free-tier request. The upstream answers 429 to any HTTP client but
 * Bun's fetch, so with a relay configured the base is the relay origin plus the inference
 * path; the relay keeps the path and forwards it to https://opencode.ai. A path configured on
 * the relay URL is ignored, otherwise it would prefix the upstream path.
 */
export function freeTierDispatchBase(): string {
  const relay = freeTierRelayUrl();
  if (!relay) return FREE_TIER_INFERENCE_BASE_URL;
  return `${new URL(relay).origin}${new URL(FREE_TIER_INFERENCE_BASE_URL).pathname}`;
}

/**
 * The URL whose egress a dispatch really uses. A relay dispatch is addressed to the relay,
 * which a proxy never applies to on loopback, but the request leaves through the proxy the
 * relay was told about, so pacing and refusal memory must be keyed on the real upstream.
 * Anything not addressed to the relay is returned as it came, including when the configured
 * relay URL is one the gated path refuses: a paid request never uses it.
 */
export function relayEgressUrl(dispatchUrl: string): string {
  let origin: string;
  try {
    const relay = freeTierRelayUrl();
    if (!relay) return dispatchUrl;
    origin = new URL(relay).origin;
  } catch {
    return dispatchUrl;
  }
  if (!dispatchUrl.startsWith(`${origin}/`)) return dispatchUrl;
  return `${new URL(FREE_TIER_INFERENCE_BASE_URL).origin}${dispatchUrl.slice(origin.length)}`;
}

/**
 * The relay runs outside this process's proxy plumbing, so the egress proxy that would apply
 * to the real upstream rides along in a header it consumes (loopback is always direct, so the
 * ambient proxy would otherwise be lost).
 */
export function applyRelayHeaders(headers: Record<string, string>): void {
  if (!freeTierRelayUrl()) return;
  try {
    const route = resolveProxyForRequest(FREE_TIER_INFERENCE_BASE_URL);
    if (route.proxyUrl) headers["x-opencode-relay-proxy"] = route.proxyUrl;
  } catch {
    // unresolvable proxy config: relay goes direct, same as an unproxied request
  }
  // A relay bound to a non-loopback address requires this shared secret.
  const relayToken = (process.env.OPENCODE_FREE_RELAY_TOKEN || "").trim();
  if (relayToken) headers["x-opencode-relay-auth"] = relayToken;
}
