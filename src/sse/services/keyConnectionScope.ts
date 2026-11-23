/**
 * GHSA-3w2r-vvhm-8h85 — keep the direct /v1 routes (media, embeddings,
 * retrieval, voice proxies) inside the caller API key's connection scope, the
 * same scope chat dispatch applies in `handleSingleModelChat`.
 *
 * Chat narrows credential selection to the key's `allowedConnections`, then
 * to the connections of its quota pools (`allowedQuotas`), refuses an empty
 * result, and skips combo targets the key's model policy does not admit. The
 * direct routes picked from the provider's whole pool instead. They now share
 * this module so the rule lives in one place:
 *
 *   - {@link resolveKeyConnectionScope} — the key's scope (null = unscoped);
 *   - {@link narrowConnectionScope} — intersect it with a route's own
 *     connection constraint without ever widening;
 *   - {@link isKeyScopeBlockedCredentials} / {@link keyScopeBlockedResponse} —
 *     the "every connection was hidden by the key's scope" sentinel that
 *     `getProviderCredentials` returns, which callers must never treat as
 *     usable credentials;
 *   - {@link createComboTargetKeyGate} — the combo per-target model check;
 *   - {@link keylessProviderRejection} — chat's #9057 rule for keyless /
 *     zero-config providers (local ComfyUI/Ollama defaults, DuckDuckGo free
 *     search, …): a connection-scoped key reaches them only when its allowlist
 *     names the synthetic `noauth` connection or an in-scope connection serves
 *     the provider.
 *
 * Unrestricted keys and keyless/local callers get `allowedConnections: null`
 * and no combo gate, so their selection is exactly what it was before.
 */
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { isModelAllowedForKey } from "@/lib/db/apiKeys";
import { constrainConnectionsToQuota, resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { intersectAllowedConnectionIds } from "@/sse/handlers/chat/connectionConstraints";
import type { ComboTargetKeyPolicyInfo } from "@/sse/handlers/chat/comboTargetKeyPolicy";
import { hasApiKeyModelRestrictions } from "@/shared/utils/resolvedModelAccess";
import * as log from "@/sse/utils/logger";

// The pure pieces live in the engine so the media combo executors can use them
// without importing the app (open-sse → src boundary); re-exported for the app.
export {
  comboTargetsNotAllowedResponse,
  filterComboTargetsForKey,
  isKeyScopeBlockedCredentials,
  keyAdmitsKeylessProviders,
  keylessProviderRejection,
  keyScopeBlockedResponse,
  noActiveCredentialsResponse,
  scopeComboTargetsForKey,
  withoutKeyScopeBlocked,
  type ComboKeyScope,
} from "@omniroute/open-sse/services/comboKeyScope.ts";

/**
 * Never matches a real connection id. An empty allow-list means "no filter"
 * to `getProviderCredentials`, so a disjoint narrowing is expressed as a list
 * nothing can match instead.
 */
export const NO_ELIGIBLE_CONNECTION_ID = "__omniroute_key_scope_no_connection__";

export interface KeyScopeApiKeyInfo extends ComboTargetKeyPolicyInfo {
  allowedConnections?: unknown;
  allowedQuotas?: unknown;
}

export interface KeyConnectionScope {
  /** Connection ids the key may use, or null when the key is not connection-scoped. */
  allowedConnections: string[] | null;
  /** Set when the key's scope admits no connection at all (chat answers the same 503). */
  rejection: Response | null;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

function noEligibleConnectionResponse(): Response {
  return errorResponse(
    HTTP_STATUS.SERVICE_UNAVAILABLE,
    "No eligible connections matched the requested routing constraints"
  );
}

/**
 * The caller key's connection scope, computed the way chat computes it: the
 * key's `allowedConnections`, narrowed to its quota pools' connections when
 * the key is quota-exclusive. An empty result is refused, never "unfiltered".
 */
export async function resolveKeyConnectionScope(
  apiKeyInfo: KeyScopeApiKeyInfo | null | undefined
): Promise<KeyConnectionScope> {
  let allowed = intersectAllowedConnectionIds(apiKeyInfo?.allowedConnections ?? null, null);

  const allowedQuotas = stringList(apiKeyInfo?.allowedQuotas);
  if (allowedQuotas.length > 0) {
    try {
      const quotaScope = await resolveQuotaKeyScope(allowedQuotas);
      allowed = constrainConnectionsToQuota(allowed ?? [], quotaScope.connectionIds);
    } catch (error) {
      // The scope can only narrow: when the quota pools cannot be resolved,
      // admit nothing rather than the whole provider pool.
      log.warn("AUTH", "Quota scope unavailable; refusing connection selection", {
        error: error instanceof Error ? error.name : "unknown",
      });
      allowed = [];
    }
  }

  if (Array.isArray(allowed) && allowed.length === 0) {
    return { allowedConnections: null, rejection: noEligibleConnectionResponse() };
  }
  return { allowedConnections: allowed, rejection: null };
}

/**
 * Intersect the key scope with a route's own connection constraint (e.g. the
 * connections that serve a synced local endpoint). `null` on either side means
 * "no constraint from that side". A disjoint pair admits nothing.
 */
export function narrowConnectionScope(
  keyScope: string[] | null | undefined,
  routeScope: string[] | null | undefined
): string[] | null {
  const narrowed = intersectAllowedConnectionIds(keyScope ?? null, routeScope ?? null);
  return Array.isArray(narrowed) && narrowed.length === 0 ? [NO_ELIGIBLE_CONNECTION_ID] : narrowed;
}

export interface ComboTargetKeyPolicy {
  apiKey?: string | null;
  apiKeyInfo?: ComboTargetKeyPolicyInfo | null;
}

/**
 * Per-target model check for combo fan-out, the one chat runs before
 * dispatching each target (`comboTargetPassesKeyModelPolicy`). Returns
 * `undefined` when the key has no model restriction, so unrestricted callers
 * keep today's behavior. Any evaluation failure denies the target.
 */
export function createComboTargetKeyGate(
  policy: ComboTargetKeyPolicy | null | undefined,
  requestedModelStr: string
): ((targetModelStr: string) => Promise<boolean>) | undefined {
  const apiKey = policy?.apiKey;
  const apiKeyInfo = policy?.apiKeyInfo;
  if (!apiKey || !apiKeyInfo || !hasApiKeyModelRestrictions(apiKeyInfo)) return undefined;
  return async (targetModelStr: string) => {
    try {
      // Lazy for the same reason as modelFallbackAuthorization: comboTargetKeyPolicy imports
      // apiKeyPolicy, and since #16499 this module is on the embeddings path that the MCP
      // server bundle includes.
      const { comboTargetPassesKeyModelPolicy } =
        await import("@/sse/handlers/chat/comboTargetKeyPolicy");
      return await comboTargetPassesKeyModelPolicy({
        apiKey,
        apiKeyInfo,
        requestedModelStr,
        targetModelStr,
        isModelAllowedForKey,
      });
    } catch {
      return false;
    }
  };
}
