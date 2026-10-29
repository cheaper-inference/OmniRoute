/**
 * GHSA-3w2r-vvhm-8h85 — the engine side of the caller API key's connection
 * scope: the pieces the media combo executors (`imageCombo`, `speechCombo`,
 * `videoCombo`) need to keep their fan-out inside the key's scope.
 *
 * Everything here is pure: the app-side work (resolving the key's scope from
 * the DB, evaluating its model policy) happens in the route, which hands the
 * result in as a {@link ComboKeyScope} — `allowedConnections` plus the
 * per-target `isTargetAllowed` gate. `src/sse/services/keyConnectionScope.ts`
 * builds those values and re-exports this module for the app callers.
 */
import { errorResponse, unavailableResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { allowlistPermitsSyntheticNoAuth } from "@omniroute/open-sse/services/autoCombo/resilienceCandidateFilter.ts";

type KeyScopeBlockedCredentials = { blockedByKeyPolicy: true; blockedCount?: number };

/**
 * `getProviderCredentials` returns `{ blockedByKeyPolicy: true }` when the
 * provider has connections but the key's scope hid every one of them. It is a
 * truthy object without any secret, so a caller that only tests `!credentials`
 * would dispatch with it — it must be refused (or skipped) instead.
 */
export function isKeyScopeBlockedCredentials(value: unknown): value is KeyScopeBlockedCredentials {
  return (
    !!value &&
    typeof value === "object" &&
    (value as { blockedByKeyPolicy?: unknown }).blockedByKeyPolicy === true
  );
}

/** Same 403 chat answers for a key-scope-emptied pool (#13832). */
export function keyScopeBlockedResponse(provider: string, credentials: unknown): Response {
  const count =
    (isKeyScopeBlockedCredentials(credentials) && Number(credentials.blockedCount)) || 1;
  return errorResponse(
    HTTP_STATUS.FORBIDDEN,
    `[${provider}] ${count} connection(s) exist but are excluded by this API key's ` +
      `connection allowlist / quota scope — add them to the key in the dashboard, or use a key without that scope`
  );
}

/** Treat a key-scope-blocked sentinel as "no credentials" (fallback loops skip it). */
export function withoutKeyScopeBlocked<T>(credentials: T): T | null {
  return isKeyScopeBlockedCredentials(credentials) ? null : credentials;
}

/** What a combo executor needs to keep its fan-out inside the caller key's scope. */
export interface ComboKeyScope {
  /** The key's connection scope (null/undefined = unscoped). */
  allowedConnections?: string[] | null;
  /**
   * Per-target model gate built by the route (`createComboTargetKeyGate` in
   * `src/sse/services/keyConnectionScope.ts`); undefined = no restriction.
   */
  isTargetAllowed?: (targetModelStr: string) => Promise<boolean>;
}

/** Drop the combo targets the key's model policy does not admit (order preserved). */
export async function filterComboTargetsForKey<T extends { modelStr?: string | null }>(
  targets: T[],
  isTargetAllowed: ComboKeyScope["isTargetAllowed"]
): Promise<T[]> {
  if (!isTargetAllowed) return targets;
  const admitted: T[] = [];
  for (const target of targets) {
    if (target.modelStr && (await isTargetAllowed(target.modelStr))) admitted.push(target);
  }
  return admitted;
}

/** 403 for a combo whose every target is refused by the key's model policy. */
export function comboTargetsNotAllowedResponse(comboName: string): Response {
  return errorResponse(
    HTTP_STATUS.FORBIDDEN,
    `No target of combo "${comboName}" is allowed for this API key`
  );
}

/**
 * A combo executor's view of the caller key: the targets the key's model policy
 * admits (order preserved), the connection scope for their credential lookups,
 * and the 403 when the key refuses every target. No scope = unchanged.
 */
export async function scopeComboTargetsForKey<T extends { modelStr?: string | null }>(
  targets: T[],
  keyScope: ComboKeyScope | null | undefined,
  comboName: string
): Promise<{ targets: T[]; allowedConnections: string[] | null; rejection: Response | null }> {
  const admitted = await filterComboTargetsForKey(targets, keyScope?.isTargetAllowed);
  const refusedAll = targets.length > 0 && admitted.length === 0;
  return {
    targets: admitted,
    allowedConnections: keyScope?.allowedConnections ?? null,
    rejection: refusedAll ? comboTargetsNotAllowedResponse(comboName) : null,
  };
}

/**
 * Whether the key may reach a provider without using any connection — chat's
 * #9057 rule for the synthetic keyless connection: always for an unscoped key,
 * otherwise only when the allowlist names `noauth` explicitly.
 */
export function keyAdmitsKeylessProviders(
  allowedConnections: string[] | null | undefined
): boolean {
  return allowlistPermitsSyntheticNoAuth(allowedConnections ?? null);
}

/** Chat's answer when no connection serves the request (`handleNoCredentials`). */
export function noActiveCredentialsResponse(provider: string): Response {
  return errorResponse(HTTP_STATUS.NOT_FOUND, `No active credentials for provider: ${provider}`);
}

/**
 * Gate a keyless / zero-config provider run for the caller key. `lookup` is the
 * in-scope connection lookup for that provider (a connection may carry e.g. a
 * local base-URL override); it is only consulted when the key's allowlist does
 * not admit keyless providers. Returns null when the run may proceed, otherwise
 * the response chat gives for the same situation.
 */
export async function keylessProviderRejection(
  provider: string,
  allowedConnections: string[] | null | undefined,
  lookup: () => Promise<unknown>
): Promise<Response | null> {
  if (keyAdmitsKeylessProviders(allowedConnections)) return null;
  let credentials: unknown = null;
  try {
    credentials = await lookup();
  } catch {
    credentials = null;
  }
  if (isKeyScopeBlockedCredentials(credentials)) {
    return keyScopeBlockedResponse(provider, credentials);
  }
  const record = credentials as {
    allRateLimited?: boolean;
    allExpired?: boolean;
    retryAfter?: string | number | Date | null;
    retryAfterHuman?: string;
  } | null;
  if (record?.allRateLimited) {
    return unavailableResponse(
      HTTP_STATUS.RATE_LIMITED,
      `[${provider}] All accounts rate limited`,
      record.retryAfter,
      record.retryAfterHuman
    );
  }
  if (record && typeof record === "object" && !record.allExpired) return null;
  return noActiveCredentialsResponse(provider);
}
