/**
 * System One transport — endpoint resolution, headers and the outbound call.
 *
 * Credentials come from the normal provider connection store, so a decision
 * request reuses the same key rotation, cooldown and proxy policy as chat. The
 * endpoint is operator-configurable per connection because vendors move these
 * paths, but only within the provider's own allowlisted hosts: it carries the operator's
 * credential, so an arbitrary host would be a credential-exfiltration path.
 *
 * No URL or header ever comes from the client request body.
 */

import {
  systemOneBackend,
  systemOneCredentialToken,
  type SystemOneBackend,
} from "../config/systemOneRegistry.ts";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { parseAndValidateNonMetadataUrl } from "@/shared/network/outboundUrlGuard";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { assertNativeConnectionUnleased } from "./systemOneLease.ts";

/** A misconfigured endpoint is an operator/config error, never an account fault. */
export class SystemOneEndpointError extends Error {
  readonly status: number;
  readonly code = "SYSTEMONE_URL_REJECTED";

  constructor(message: string, status = 400) {
    super(message);
    this.name = "SystemOneEndpointError";
    this.status = status;
  }
}

export interface SystemOneCredentials {
  apiKey?: string | null;
  accessToken?: string | null;
  connectionId?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
  maxConcurrent?: number | null;
  rateLimitMaxConcurrent?: number | null;
  modelConcurrency?: Record<string, number> | null;
}

export type SystemOneEndpointKind = "decision" | "models";

/** Identifies this native transport, without claiming a browser or another client. */
export const SYSTEMONE_USER_AGENT = "OmniRoute-SystemOne/1.0";

const OVERRIDE_FIELDS: Record<SystemOneEndpointKind, string> = {
  decision: "systemOneUrl",
  models: "systemOneModelsUrl",
};

function isAllowedHost(hostname: string, backend: SystemOneBackend): boolean {
  const host = hostname.toLowerCase();
  return backend.allowedHosts.some(
    (allowed) => host === allowed.toLowerCase() || host.endsWith(`.${allowed.toLowerCase()}`)
  );
}

/**
 * Validate an operator-supplied endpoint override. Rejections name the rule,
 * never the rejected value: an override can contain embedded credentials.
 */
function validateOverride(raw: string, backend: SystemOneBackend): string {
  let url: URL;
  try {
    url = parseAndValidateNonMetadataUrl(raw.trim());
  } catch {
    throw new SystemOneEndpointError(
      `The configured System One endpoint for ${backend.provider} is not a usable URL`
    );
  }
  if (url.protocol !== "https:") {
    throw new SystemOneEndpointError(
      `The configured System One endpoint for ${backend.provider} must use https`
    );
  }
  if (url.username || url.password) {
    throw new SystemOneEndpointError(
      `The configured System One endpoint for ${backend.provider} must not embed credentials`
    );
  }
  if (!isAllowedHost(url.hostname, backend)) {
    throw new SystemOneEndpointError(
      `The configured System One endpoint for ${backend.provider} is not on its host allowlist (${backend.allowedHosts.join(", ")})`
    );
  }
  url.hash = "";
  return url.toString();
}

/**
 * Resolve the URL for one System One call.
 *
 * `kind` keeps the two endpoints independent: a decision-endpoint override must
 * not silently redirect the catalog read (and the reverse), because the two
 * paths differ per vendor.
 */
export function systemOneUrl(
  provider: string,
  credentials: SystemOneCredentials,
  kind: SystemOneEndpointKind = "decision"
): string {
  const backend = systemOneBackend(provider);
  const override = credentials.providerSpecificData?.[OVERRIDE_FIELDS[kind]];
  if (typeof override === "string" && override.trim()) {
    return validateOverride(override, backend);
  }
  const fallback = kind === "models" ? backend.modelsUrl : backend.decisionUrl;
  if (!fallback) {
    throw new SystemOneEndpointError(
      `${backend.provider} publishes no System One ${kind} endpoint`,
      501
    );
  }
  return fallback;
}

/**
 * Headers for a System One call: JSON plus the connection's own bearer token.
 *
 * Every hosted backend requires its configured key. The tier tag only controls
 * whether a key can serve a limited-time free model; it never makes the route
 * anonymous.
 */
export function systemOneHeaders(
  provider: string,
  credentials: SystemOneCredentials
): Record<string, string> {
  const backend = systemOneBackend(provider);
  const token = systemOneCredentialToken(credentials);
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": SYSTEMONE_USER_AGENT,
    ...(token ? { Authorization: `${backend.authorizationScheme ?? "Bearer"} ${token}` } : {}),
  };
}

/** Normal outbound guard and per-connection proxy policy; redirects are not followed. */
export async function fetchSystemOne(
  url: string,
  credentials: SystemOneCredentials,
  init: RequestInit
): Promise<Response> {
  const proxyInfo = credentials.connectionId
    ? await resolveProxyForConnection(credentials.connectionId)
    : null;
  // Proxy resolution may yield while an existing session takes the connection lease.
  if (credentials.connectionId) assertNativeConnectionUnleased(credentials.connectionId);
  // A cancellation during proxy resolution must not start the upstream request.
  init.signal?.throwIfAborted();
  return safeOutboundFetch(url, {
    ...init,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxyInfo?.proxy || null,
    retry: false,
    allowRedirect: false,
  });
}
