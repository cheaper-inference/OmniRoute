/** Native catalogs may reuse only explicit, complete, compatible user token tariffs. */
import { getUserPricingForModel } from "@/lib/db/settings/pricing";
import {
  isSystemOneProvider,
  systemOneAllowsGenericTokenPricing,
} from "@omniroute/open-sse/config/systemOneRegistry";

export async function getNativeCatalogPricing(
  provider: string,
  model: string
): Promise<{ input: number; output: number } | null> {
  // Same model id can have unrelated chat, GPU, per-question or native pricing.
  // There is no endpoint-scoped user tariff here, so keep those APIs unknown.
  if (!isSystemOneProvider(provider) || !systemOneAllowsGenericTokenPricing(provider)) return null;
  const value = await getUserPricingForModel(provider, model);
  if (
    typeof value?.input !== "number" ||
    typeof value.output !== "number" ||
    !Number.isFinite(value.input) ||
    !Number.isFinite(value.output) ||
    value.input < 0 ||
    value.output < 0
  )
    return null;
  return { input: value.input, output: value.output };
}
