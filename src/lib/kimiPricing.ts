import { mergeConfig } from "./db/models/kimiModelMerge";

type PricingModels = Record<string, Record<string, unknown>>;
type PricingByProvider = Record<string, PricingModels>;

/** Historical rows and late legacy writes share the native API's canonical prices. */
export function mergeKimiPricingTables(
  legacy: PricingModels | undefined,
  canonical: PricingModels | undefined
): PricingModels | null {
  if (!legacy) return canonical ?? null;
  if (!canonical) return legacy;
  return mergeConfig(legacy, canonical) as PricingModels;
}

export function normalizeKimiPricingLayer(layer: PricingByProvider): PricingByProvider {
  if (!layer.moonshot) return layer;
  const normalized: PricingByProvider = {
    ...layer,
    kimi: mergeKimiPricingTables(layer.moonshot, layer.kimi)!,
  };
  delete normalized.moonshot;
  return normalized;
}
