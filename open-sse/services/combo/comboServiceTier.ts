import { OPENAI_SERVICE_TIERS, SERVICE_TIER_PROVIDERS } from "../../config/serviceTier.ts";
import { parseModel } from "../model.ts";
import type { HandleSingleModel, SingleModelTarget } from "./types.ts";

type ComboWithConfig = { config?: Record<string, unknown> | null } | null | undefined;

/** The combo's configured tier (`service_tier` beats `serviceTier`), or null when absent or invalid. */
export function resolveComboServiceTier(combo: ComboWithConfig): string | null {
  const raw = combo?.config?.service_tier ?? combo?.config?.serviceTier;
  if (typeof raw !== "string") return null;
  const tier = raw.trim().toLowerCase();
  return OPENAI_SERVICE_TIERS.has(tier) ? tier : null;
}

function targetProvider(modelStr: string, target?: SingleModelTarget): string | null {
  const resolved = target && "provider" in target ? target.provider : null;
  return resolved || parseModel(modelStr).provider;
}

/**
 * Per-combo tier is a bucket policy: on a target that accepts `service_tier` it replaces the
 * client's tier on every strategy and attempt. Any other target gets the body as the client
 * sent it, so a mixed combo never sends a strict gateway a field it rejects. An API key's
 * forced Codex tier still wins in the executor, and the tier beats a connection's default.
 */
export function withComboServiceTier(
  handleSingleModel: HandleSingleModel,
  combo: ComboWithConfig
): HandleSingleModel {
  const tier = resolveComboServiceTier(combo);
  if (!tier) return handleSingleModel;
  return (body, modelStr, target) => {
    const provider = targetProvider(modelStr, target);
    const accepted = provider !== null && SERVICE_TIER_PROVIDERS.has(provider);
    return handleSingleModel(accepted ? { ...body, service_tier: tier } : body, modelStr, target);
  };
}
