/**
 * Credential for A2A skills that call back into OmniRoute over HTTP.
 *
 * The self-loop must act as the A2A caller. Sending OMNIROUTE_API_KEY for an
 * API-key caller lends it the deployment key's `manage` scope and bypasses the
 * caller's model allowlist, budget and quota. The configured key is only used
 * when the caller presented no key: a dashboard session, or the keyless
 * posture where OMNIROUTE_API_KEY is unset anyway.
 *
 * Credentials are only attached when the self-loop target is https, or http on
 * a loopback host. A non-loopback http OMNIROUTE_BASE_URL would otherwise send
 * the caller's Bearer token in cleartext to that host.
 */

import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

const LOOPBACK_HOST = /^(localhost|127\.0\.0\.1|\[::1\]|::1)$/i;

export interface A2ACallerContext {
  /** The API key the A2A caller authenticated with, if any. */
  apiKey?: string | null;
}

/** True when a self-loop may carry an API key to `baseUrl`. */
export function mayForwardSelfLoopCredential(baseUrl: string): boolean {
  try {
    const u = new URL(baseUrl);
    if (u.username || u.password) return false;
    if (u.protocol === "https:") return true;
    if (u.protocol !== "http:") return false;
    return LOOPBACK_HOST.test(u.hostname);
  } catch {
    return false;
  }
}

export class UnsafeSelfLoopTargetError extends Error {
  readonly baseUrl: string;
  constructor(baseUrl: string) {
    super(
      `Refusing to send an API key to OMNIROUTE_BASE_URL=${baseUrl}: use https, or http only for localhost / 127.0.0.1 / [::1]`
    );
    this.name = "UnsafeSelfLoopTargetError";
    this.baseUrl = baseUrl;
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
    throw new UnsafeSelfLoopTargetError(baseUrl);
  }
  headers.Authorization = `Bearer ${key}`;
  return headers;
}
