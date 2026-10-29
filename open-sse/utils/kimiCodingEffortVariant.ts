/**
 * Kimi Coding effort-variant splitter (#16985), shared by the chatCore dispatch strip
 * (handlers/chatCore/kimiCodingEffortVariant.ts) and reasoning-rule intent matching
 * (src/lib/reasoningRouting/policy.ts) so both agree on what is a variant.
 *
 * Scoped to `kimi-coding` / `kimi-coding-apikey`. A suffix is stripped only when the id
 * is not itself a registry id and the remaining base is a registry id or a spec alias
 * of one (`kimi-k3` → wire `k3`). Cursor's genuine `kimi-k3-high` never qualifies: it
 * belongs to another provider.
 */

import { getProviderModels } from "../config/providerModels.ts";
import { KIMI_CODING_WIRE_MODEL_ALIASES } from "../config/providers/registry/kimi/coding/runtime.ts";

const KIMI_CODING_PROVIDERS = new Set(["kimi-coding", "kimi-coding-apikey"]);
const KIMI_CODING_PREFIXES = new Set(["kimi-coding", "kimi-coding-apikey", "kmc", "kmca"]);

// Kimi Code documents low/high/max for k3 (runtime.ts static policy); medium/none are the
// canonical neighbours the executor constrains. xhigh/ultra are not Kimi tiers.
const EFFORT_SUFFIXES = ["medium", "high", "none", "low", "max"] as const;

export type KimiCodingEffortSuffix = (typeof EFFORT_SUFFIXES)[number];

/** Split `<base>-<effort>` into the provider's wire base id; null when it is not a variant. */
export function splitKimiCodingEffortVariant(
  provider: string | null | undefined,
  modelId: string
): { wireModel: string; effort: KimiCodingEffortSuffix } | null {
  if (!provider || !KIMI_CODING_PROVIDERS.has(provider) || typeof modelId !== "string") {
    return null;
  }
  const registryIds = new Set(getProviderModels(provider).map((model) => model.id));
  // A provider-prefixed id (`kmc/kimi-k3-high`) is matched on its bare part; the
  // translated-request finalizer strips the same prefix off the upstream model.
  const slash = modelId.indexOf("/");
  const bareId =
    slash > 0 && KIMI_CODING_PREFIXES.has(modelId.slice(0, slash).toLowerCase())
      ? modelId.slice(slash + 1)
      : modelId;
  if (registryIds.has(bareId)) return null;

  for (const effort of EFFORT_SUFFIXES) {
    const suffix = `-${effort}`;
    if (!bareId.toLowerCase().endsWith(suffix)) continue;
    const base = bareId.slice(0, -suffix.length);
    const wireModel = registryIds.has(base)
      ? base
      : KIMI_CODING_WIRE_MODEL_ALIASES[base.toLowerCase()];
    if (!wireModel || !registryIds.has(wireModel)) return null;
    return { wireModel, effort };
  }
  return null;
}
