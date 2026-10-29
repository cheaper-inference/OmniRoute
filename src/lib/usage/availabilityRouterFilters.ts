import { evaluatePeakHourProtection } from "@/lib/providers/peakHourProtection";
import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import {
  getCodexChildCooldown,
  isCodexChildUnavailable,
} from "@omniroute/open-sse/services/codexAccount/index.ts";
import {
  getAlibabaFreeDrainedModels,
  isAlibabaModelFreeDrained,
  isAlibabaModelStudioProvider,
} from "@omniroute/open-sse/services/alibabaFreeTier.ts";
import { getAntigravityFamilyCooldownUntil } from "@omniroute/open-sse/services/antigravityFamilyCooldown.ts";
import {
  getAntigravityQuotaFamily,
  isAntigravityQuotaProvider,
} from "@omniroute/open-sse/services/antigravityQuotaFamily.ts";
import { CODEX_SPARK_MODEL_ID } from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { getProviderModels } from "@omniroute/open-sse/config/providerModels.ts";
import type { QuotaAvailabilityWindow } from "./availabilityTypes";
import type { AvailabilityScopeInput } from "./availabilityScopes";

function timedBlocker(
  name: string,
  resetAt: string | null,
  reason: QuotaAvailabilityWindow["reason"]
): QuotaAvailabilityWindow {
  return {
    name,
    resetAt,
    kind: resetAt && Date.parse(resetAt) - Date.now() <= 5 * 3600_000 ? "fiveHour" : "overall",
    reason,
  };
}

/** Independent saved-state gates used by credential selection, never a quota fetch. */
export function savedRouterBlockers(
  connection: ProviderConnectionView,
  model: string | null
): QuotaAvailabilityWindow[] {
  const blockers: QuotaAvailabilityWindow[] = [];
  if (connection.provider === "codex" && isCodexChildUnavailable(connection, model))
    blockers.push(
      timedBlocker(model || "codex", getCodexChildCooldown(connection, model), "scopeCooldown")
    );
  const peak = evaluatePeakHourProtection(connection.providerSpecificData);
  if (peak.active) blockers.push(timedBlocker("peakHour", peak.retryAfter, "peakHour"));
  if (isAlibabaModelFreeDrained(connection.provider, connection.providerSpecificData, model))
    blockers.push(timedBlocker(model!, null, "modelLockout"));
  if (isAntigravityQuotaProvider(connection.provider) && model) {
    const until = getAntigravityFamilyCooldownUntil(
      connection.providerSpecificData,
      getAntigravityQuotaFamily(model)
    );
    if (until !== null)
      blockers.push(timedBlocker(model, new Date(until).toISOString(), "modelLockout"));
  }
  return blockers;
}

/** Saved restrictions can exist without any corresponding usage window. */
export function appendSavedRouterScopes(
  connection: ProviderConnectionView,
  scopes: AvailabilityScopeInput[]
): AvailabilityScopeInput[] {
  const result = [...scopes];
  if (
    connection.provider === "codex" &&
    isCodexChildUnavailable(connection, CODEX_SPARK_MODEL_ID) &&
    !result.some((scope) => scope.id === "spark")
  )
    result.push({ id: "spark", kind: "scoped", model: CODEX_SPARK_MODEL_ID, windows: [] });
  if (isAlibabaModelStudioProvider(connection.provider)) {
    const model = getProviderModels(connection.provider)[0]?.id;
    if (model) result.push({ id: "account", kind: "account", model, windows: [] });
    for (const drained of getAlibabaFreeDrainedModels(connection.providerSpecificData))
      result.push({ id: drained, kind: "scoped", model: drained, windows: [] });
  }
  return result;
}
