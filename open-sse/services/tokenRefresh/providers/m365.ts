import {
  currentM365AccessToken,
  currentM365ChathubPath,
  decodeJwtClaims,
  refreshM365AccessToken,
} from "../../../executors/copilot-m365-connection.ts";
import type { ProviderCredentials } from "../../../executors/base.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import {
  isProviderBlocked,
  recordRefreshFailure,
  recordRefreshSuccess,
} from "../circuitBreaker.ts";
import { extractOAuthErrorCode, type RefreshLogger } from "../shared.ts";

/**
 * #19433: `unauthorized_client` means the tenant rejects the client, not that the refresh
 * token is dead, so it no longer deactivates the account. Without a bound, every chat request
 * on an expiring connection would redeem the grant again. The shared token-refresh breaker
 * caps it per connection: after this many consecutive rejections, no token-endpoint call
 * until the cooldown ends.
 */
export const M365_CLIENT_CONFIG_REFRESH_MAX_ATTEMPTS = 3;
export const M365_CLIENT_CONFIG_REFRESH_COOLDOWN_MS = 30 * 60 * 1000;
const M365_CLIENT_CONFIG_ERROR = "unauthorized_client";
// Own breaker key: chatCore's reactive breaker for this provider counts other failures.
const M365_CLIENT_CONFIG_BREAKER = "copilot-m365-web:client-config";

function invalidM365RoutingPath(psd: Record<string, unknown>, path: string): boolean {
  const hasPath =
    Object.prototype.hasOwnProperty.call(psd, "chathubPath") ||
    Object.prototype.hasOwnProperty.call(psd, "userTenant") ||
    Boolean(path);
  return hasPath && !/^[\w.-]+@[\w.-]+$/.test(path);
}

function m365RoutingTenant(credentials: ProviderCredentials): string | null {
  const psd = credentials?.providerSpecificData ?? {};
  const claims = decodeJwtClaims(currentM365AccessToken(credentials));
  // Explicit routing is authoritative. Invalid hints are refused by the shared
  // helper, never normalized or spliced into a credential-bearing arbitrary URL.
  const hasTenant =
    Object.prototype.hasOwnProperty.call(psd, "tenantId") ||
    Object.prototype.hasOwnProperty.call(psd, "tid");
  const explicit = Object.prototype.hasOwnProperty.call(psd, "tenantId") ? psd.tenantId : psd.tid;
  const path = currentM365ChathubPath(credentials);
  if ((hasTenant && typeof explicit !== "string") || invalidM365RoutingPath(psd, path)) {
    return null;
  }
  const tenant = hasTenant ? explicit : path ? path.split("@")[1] : claims?.tid;
  if (tenant !== undefined && typeof tenant !== "string") {
    return null;
  }
  return typeof tenant === "string" ? tenant : "common";
}

/**
 * Redeem the stored refresh token for another resource the M365 first-party client is
 * preauthorized for (e.g. {@link M365_IMAGE_ARTIFACT_SCOPE}), routed to the same tenant as the
 * chat refresh. Returns the projected result; the caller persists a rotated refresh token.
 */
export async function refreshM365ScopedToken(
  refreshToken: string,
  credentials: ProviderCredentials,
  scope: string,
  options: { log?: RefreshLogger; signal?: AbortSignal } = {}
) {
  const routingTenant = m365RoutingTenant(credentials);
  if (routingTenant === null) return { error: "invalid_tenant" };
  return refreshM365AccessToken(refreshToken, routingTenant, options.log ?? undefined, {
    scope,
    signal: options.signal,
  });
}

/** Shared bounded M365 grant; orchestration, mutex and persistence stay in getAccessToken. */
export async function refreshM365Token(
  refreshToken: string,
  credentials: ProviderCredentials,
  log?: RefreshLogger,
  proxyConfig: unknown = null
) {
  const routingTenant = m365RoutingTenant(credentials);
  if (routingTenant === null) {
    return { error: "unrecoverable_refresh_error", code: "invalid_tenant" };
  }
  const breaker = {
    connectionId: typeof credentials?.connectionId === "string" ? credentials.connectionId : "",
    scope: "connection" as const,
    failureThreshold: M365_CLIENT_CONFIG_REFRESH_MAX_ATTEMPTS,
    cooldownMs: M365_CLIENT_CONFIG_REFRESH_COOLDOWN_MS,
  };
  if (isProviderBlocked(M365_CLIENT_CONFIG_BREAKER, breaker)) {
    return { error: M365_CLIENT_CONFIG_ERROR };
  }
  const result = await runWithProxyContext(proxyConfig, () =>
    refreshM365AccessToken(refreshToken, routingTenant, log ?? undefined)
  );
  // Only a client rejection counts toward the cap; any other answer ends the streak.
  if ("error" in result && result.error === M365_CLIENT_CONFIG_ERROR) {
    recordRefreshFailure(M365_CLIENT_CONFIG_BREAKER, breaker, log);
  } else {
    recordRefreshSuccess(M365_CLIENT_CONFIG_BREAKER, breaker);
  }
  if ("error" in result) {
    const code = extractOAuthErrorCode(result);
    if (code || result.error === "invalid_tenant") {
      return { error: "unrecoverable_refresh_error", code: code ?? "invalid_tenant" };
    }
    return result;
  }
  return {
    ...result,
    refreshToken: result.refreshToken || refreshToken,
    ...(result.expiresIn !== undefined
      ? { expiresAt: new Date(Date.now() + result.expiresIn * 1000).toISOString() }
      : {}),
  };
}
