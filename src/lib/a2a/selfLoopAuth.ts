/**
 * Credential for A2A skills that call back into OmniRoute over HTTP.
 *
 * The self-loop must act as the A2A caller. Sending OMNIROUTE_API_KEY for an
 * API-key caller lends it the deployment key's `manage` scope and bypasses the
 * caller's model allowlist, budget and quota. The configured key is only used
 * when the caller presented no key: a dashboard session, or the keyless
 * posture where OMNIROUTE_API_KEY is unset anyway.
 *
 * Credentials are only attached when the self-loop target is https, or http
 * that stays inside the private network: loopback, a container or service name
 * (BASE_URL=http://omniroute:20128 is the documented Compose setup), or a private
 * address. A plain-http URL to anywhere else would send the caller's Bearer token
 * in cleartext across a network the operator does not control. Cloud-metadata hosts
 * are refused even under a private-looking name such as metadata.google.internal.
 */

import { classifyIpScope } from "@/lib/ipUtils";
import { SHORT_METADATA_HOSTNAMES } from "@/shared/network/localNodeHosts";
import { isCloudMetadataHost } from "@/shared/network/outboundUrlGuard";
import { embeddedIpv4Host, ipVersion, normalizeHost } from "@/shared/network/privateHost";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

const PRIVATE_DNS_SUFFIX = /\.(localhost|local|internal)$/;
// Link-local is where cloud metadata services listen, never an OmniRoute instance.
const LINK_LOCAL_IP = /^(169\.254\.|fe[89ab])/;

export interface A2ACallerContext {
  /** The API key the A2A caller authenticated with, if any. */
  apiKey?: string | null;
}

function isPrivateNetworkHost(hostname: string): boolean {
  const host = normalizeHost(hostname);
  if (isCloudMetadataHost(host) || SHORT_METADATA_HOSTNAMES.has(host)) return false;
  // new URL() spells ::ffff:8.8.8.8 as ::ffff:808:808, which classifyIpScope cannot read.
  const ip = embeddedIpv4Host(host, true) ?? host;
  // Only an IP literal gets an IP verdict: classifyIpScope calls 127.evil.example loopback.
  if (ipVersion(ip) !== 0) {
    if (ip === "0.0.0.0") return true;
    const scope = classifyIpScope(ip);
    return scope === "loopback" || (scope === "private" && !LINK_LOCAL_IP.test(ip));
  }
  return !host.includes(".") || PRIVATE_DNS_SUFFIX.test(host);
}

/** True when a self-loop may carry an API key to `baseUrl`. */
export function mayForwardSelfLoopCredential(baseUrl: string): boolean {
  try {
    const u = new URL(baseUrl);
    if (u.username || u.password) return false;
    if (u.protocol === "https:") return true;
    if (u.protocol !== "http:") return false;
    return isPrivateNetworkHost(u.hostname);
  } catch {
    return false;
  }
}

/**
 * Reaches the A2A caller and the logs, so it never carries the URL: that may hold
 * proxy credentials or an internal hostname.
 */
export class UnsafeSelfLoopTargetError extends Error {
  constructor() {
    super(
      "Refusing to send an API key to the configured OmniRoute base URL: use https, or http to a loopback, container or private-network host, with no credentials in the URL"
    );
    this.name = "UnsafeSelfLoopTargetError";
  }
}

export function buildSelfLoopHeaders(
  caller?: A2ACallerContext,
  baseUrl: string = resolveOmniRouteBaseUrl()
): Record<string, string> {
  const key = caller?.apiKey || process.env.OMNIROUTE_API_KEY || "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (!key) return headers;
  if (!mayForwardSelfLoopCredential(baseUrl)) {
    throw new UnsafeSelfLoopTargetError();
  }
  headers.Authorization = `Bearer ${key}`;
  return headers;
}
