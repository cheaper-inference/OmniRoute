import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import {
  EMERGENCY_FALLBACK_CONFIG,
  isFallbackDecision,
  shouldUseFallback,
  type EmergencyFallbackConfig,
  type FallbackResult,
} from "@omniroute/open-sse/services/emergencyFallback.ts";
import {
  catalogContainsModel,
  getActiveSyncedCatalog,
  type ActiveSyncedCatalog,
} from "@/lib/db/models/activeSyncedCatalog";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import * as log from "../utils/logger";

/**
 * Mark a response that was served by the budget-exhaustion emergency fallback
 * (`OMNIROUTE_EMERGENCY_FALLBACK`). Without it the reroute is only visible by
 * diffing `X-OmniRoute-Provider` / `X-OmniRoute-Model` against the request, so a
 * caller that must keep roles on distinct providers cannot tell a 200 from the
 * requested model apart from one served by the free fallback. The value only
 * carries the two `provider/model` ids (never the upstream error text).
 */
export function withEmergencyFallbackHeader(
  response: Response,
  fromModel: string,
  toModel: string
): Response {
  if (!response) return response;
  // Header values must be ByteStrings: a non-Latin-1 model id would make
  // Headers#set throw and turn a served 200 into an error, so keep printable ASCII.
  const clean = (value: string) => value.replace(/[^\x20-\x7e]/g, "");
  const value = `from=${clean(fromModel)}; to=${clean(toModel)}`;

  try {
    response.headers.set(OMNIROUTE_RESPONSE_HEADERS.emergencyFallback, value);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    cloned.headers.set(OMNIROUTE_RESPONSE_HEADERS.emergencyFallback, value);
    return inheritTrustedLocalRateLimitResponse(response, cloned);
  }
}

/**
 * Call-site helper for chat.ts (#14956): log that the emergency fallback served
 * the request and stamp the response. Kept here so the chat.ts hunk stays one line.
 */
export function markEmergencyFallback(
  response: Response,
  fromModel: string,
  toModel: string
): Response {
  log.warn("EMERGENCY_FALLBACK", `Served by emergency fallback: ${fromModel} -> ${toModel}`);
  return withEmergencyFallbackHeader(response, fromModel, toModel);
}

type CatalogLoader = (providerId: string) => Promise<ActiveSyncedCatalog>;

const catalogByScope = new WeakMap<object, Map<string, Promise<ActiveSyncedCatalog>>>();
const warnedAbsentTargets = new Set<string>();
const warnedUnknownTargets = new Set<string>();

function loadScopedCatalog(
  scope: object,
  providerId: string,
  loadCatalog: CatalogLoader
): Promise<ActiveSyncedCatalog> {
  let byProvider = catalogByScope.get(scope);
  if (!byProvider) {
    byProvider = new Map();
    catalogByScope.set(scope, byProvider);
  }
  let pending = byProvider.get(providerId);
  if (!pending) {
    pending = loadCatalog(providerId);
    byProvider.set(providerId, pending);
  }
  return pending;
}

/** Test-only reset for the process-once warning sets. */
export function resetEmergencyFallbackWarnForTest(): void {
  warnedAbsentTargets.clear();
  warnedUnknownTargets.clear();
}

/**
 * Live-catalog guard for the budget-exhaustion emergency fallback. The
 * synchronous trigger runs unchanged (no catalog read without a 402 or budget
 * keyword). The catalog check only runs on a confirmed trigger and keeps the
 * redirect only when the configured target is in the provider's authoritative
 * live catalog. An unknown catalog (no sync yet, no active connection, stale
 * snapshot, or a read failure) keeps the redirect and warns once per process,
 * mirroring the model-resolution fail-open path.
 */
export async function resolveEmergencyFallbackDecision(
  status: number,
  errorBody: string,
  requestHasTools: boolean,
  scope: object,
  loadCatalog: CatalogLoader = getActiveSyncedCatalog,
  config: EmergencyFallbackConfig = EMERGENCY_FALLBACK_CONFIG
): Promise<FallbackResult> {
  const trigger = shouldUseFallback(status, errorBody, requestHasTools, config);
  if (!isFallbackDecision(trigger)) return trigger;
  const targetKey = `${config.provider}/${config.model}`;
  const catalog = await loadScopedCatalog(scope, config.provider, loadCatalog);
  const served = catalogContainsModel(catalog, config.model);
  if (served === true) return trigger;
  if (served === false) {
    const reason = `emergency fallback target ${targetKey} not in the live catalog; keeping original routing`;
    if (warnedAbsentTargets.has(targetKey)) {
      log.debug("EMERGENCY_FALLBACK", reason);
    } else {
      warnedAbsentTargets.add(targetKey);
      log.warn("EMERGENCY_FALLBACK", reason);
    }
    return { shouldFallback: false, reason };
  }
  const unknownReason = `emergency fallback target ${targetKey} has no authoritative live catalog; keeping redirect`;
  if (!warnedUnknownTargets.has(targetKey)) {
    warnedUnknownTargets.add(targetKey);
    log.warn("EMERGENCY_FALLBACK", unknownReason);
  }
  return trigger;
}
