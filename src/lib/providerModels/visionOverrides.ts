import { getBooleanModelCapabilityOverride } from "@/lib/db/modelCapabilityOverrides";
import { getModelCompatVisionOverride, mergeModelCompatOverride } from "@/lib/db/models/compat";
import { getExactCustomModelVisionOverride } from "@/lib/db/models/customVisionOverride";
import { getSyncedAvailableModelVision } from "@/lib/db/models/syncedAvailableModelVision";
import { getProviderNodePrefixSync } from "@/lib/db/providers/nodePrefix";

/** Require explicit or synced vision evidence owned by the compatible provider node. */
export function hasOwnedCompatibleNodeVision(
  providerId: string,
  model: string,
  { includeCapabilityOverride = false }: { includeCapabilityOverride?: boolean } = {}
): boolean {
  const slash = model.indexOf("/");
  const prefix = slash > 0 ? model.slice(0, slash) : null;
  const ownPrefix = getProviderNodePrefixSync(providerId);
  const hasOwnPrefix = Boolean(
    prefix &&
    (prefix === providerId || (ownPrefix && prefix.toLowerCase() === ownPrefix.toLowerCase()))
  );
  // Only strip this node's own routing prefix. Upstream vendor/model paths stay intact.
  const candidates = hasOwnPrefix ? [model.slice(slash + 1), model] : [model];
  for (const id of candidates) {
    const custom = getExactCustomModelVisionOverride(providerId, id);
    if (custom !== null) return custom;
  }
  const compat = getModelCompatVisionOverride(providerId, candidates);
  if (compat !== null) return compat;
  if (includeCapabilityOverride) {
    for (const id of candidates) {
      const override = getBooleanModelCapabilityOverride(providerId, id, "vision");
      if (override !== null) return override;
    }
  }
  return candidates.some((id) => getSyncedAvailableModelVision(providerId, id) === true);
}

/** Clearing the operator override must not expose an older manual compat value. */
export function clearLegacyVisionOverride(
  provider: string,
  modelId: string,
  updates: Record<string, unknown>
): void {
  if (updates.supportsVision !== null) return;
  mergeModelCompatOverride(provider, modelId, { supportsVision: null });
}
