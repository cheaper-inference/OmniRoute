import { recordCost, recordUnpricedBudgetUsage } from "@/domain/costRules";
import { attachOmniRouteMetaToResponse } from "@/domain/omnirouteResponseMeta";
import { getPricingForModel } from "../db/settings/pricing";
import { calculateCostDetailed, getPricingLookupModels } from "./costCalculator";
import { readReportedCost } from "./creditMeteredProviders";
import { isFlatRateProvider } from "./flatRateProviders";
import { saveRequestUsage } from "./usageHistory";

export type MediaBillingUnit = "second" | "character" | "image";
export interface MediaRequestIdentity {
  provider: string;
  model: string;
  endpoint: string;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
  comboStrategy?: string | null;
  startTime: number;
  requestId: string;
}
export interface MediaBill {
  costUsd: number | null;
  reportedCostUsd: number | null;
  unit: MediaBillingUnit;
  quantity: number | null;
  unitPriceUsd: number | null;
  usage: Record<string, unknown>;
  pricingFailed?: boolean;
}

const nonNegative = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;

function tokenDetails(value: unknown): Record<string, number | boolean> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const details = value as Record<string, unknown>;
  const retained: Record<string, number | boolean> = {};
  for (const field of [
    "cached_tokens",
    "cache_creation_tokens",
    "cache_write_tokens",
    "reasoning_tokens",
  ])
    if (nonNegative(details[field])) retained[field] = details[field];
  if (typeof details.cache_creation_in_prompt === "boolean")
    retained.cache_creation_in_prompt = details.cache_creation_in_prompt;
  return retained;
}

/** Keep billing scalars, never transcripts, prompts, image bytes or arbitrary upstream fields. */
export function normalizeMediaUsage(value: unknown): Record<string, unknown> {
  const source = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const usage: Record<string, unknown> = {};
  for (const key of [
    "input",
    "output",
    "input_tokens",
    "output_tokens",
    "prompt_tokens",
    "completion_tokens",
    "cache_read_input_tokens",
    "cache_creation_input_tokens",
    "cacheRead",
    "cached_tokens",
    "cacheCreation",
    "cache_write_tokens",
    "reasoning",
    "reasoning_tokens",
    "provider_credits",
    "cost_usd",
    "cost_in_usd_ticks",
    "seconds",
  ]) {
    if (nonNegative(source[key])) usage[key] = source[key];
  }
  if (!nonNegative(usage.cost_usd) && nonNegative(source.cost)) usage.cost_usd = source.cost;
  for (const key of [
    "prompt_tokens_details",
    "input_tokens_details",
    "completion_tokens_details",
    "output_tokens_details",
  ]) {
    const retained = tokenDetails(source[key]);
    if (Object.keys(retained).length) usage[key] = retained;
  }
  return usage;
}

function mediaUnitRate(unit: MediaBillingUnit, pricing: Record<string, unknown>): unknown {
  if (unit === "image") return pricing.output_cost_per_image ?? pricing.input_cost_per_image;
  if (unit === "second") return pricing.input_cost_per_second ?? pricing.output_cost_per_second;
  return pricing.input_cost_per_character ?? pricing.output_cost_per_character;
}

async function applyMediaTariff(
  bill: MediaBill,
  provider: string,
  model: string,
  pricing: Record<string, unknown>
): Promise<void> {
  // Token-priced image APIs can report real token counts as well as images.
  const hasTokens = [
    "input",
    "output",
    "input_tokens",
    "output_tokens",
    "prompt_tokens",
    "completion_tokens",
  ].some((key) => nonNegative(bill.usage[key]));
  const hasTokenPrice = ["input", "output", "input_cost_per_token", "output_cost_per_token"].some(
    (key) => nonNegative(pricing[key])
  );
  if (hasTokens && hasTokenPrice) {
    const cost = await calculateCostDetailed(provider, model, bill.usage);
    if (cost.priced && nonNegative(cost.costUsd)) bill.costUsd = cost.costUsd;
    return;
  }
  const rate = mediaUnitRate(bill.unit, pricing);
  if (bill.quantity !== null && nonNegative(rate) && nonNegative(rate * bill.quantity)) {
    bill.costUsd = rate * bill.quantity;
    bill.unitPriceUsd = rate;
  }
}

/** Exact provider USD wins. Otherwise snapshot only a tariff with a measured billing dimension. */
export async function priceMediaRequest(input: {
  provider: string;
  model: string;
  unit: MediaBillingUnit;
  quantity?: number | null;
  usage?: unknown;
}): Promise<MediaBill> {
  const usage = normalizeMediaUsage(input.usage);
  const quantity = nonNegative(input.quantity) ? input.quantity : null;
  const reportedCostUsd = readReportedCost(input.provider, usage).providerCostUsd;
  const bill: MediaBill = {
    costUsd: reportedCostUsd,
    reportedCostUsd,
    unit: input.unit,
    quantity,
    unitPriceUsd: null,
    usage,
  };
  if (reportedCostUsd !== null) return bill;
  try {
    const model = input.model.startsWith(`${input.provider}/`)
      ? input.model.slice(input.provider.length + 1)
      : input.model;
    for (const key of getPricingLookupModels(input.provider, model)) {
      const pricing = await getPricingForModel(input.provider, key);
      if (!pricing) continue;
      await applyMediaTariff(bill, input.provider, key, pricing);
      return bill;
    }
  } catch {
    bill.pricingFailed = true;
    console.error("[Media accounting] Pricing lookup failed; cost remains unknown");
  }
  return bill;
}

/** Bookkeeping must never turn already-paid media into a client error/retry. */
export async function safelyRecordMedia(work: () => Promise<unknown>): Promise<void> {
  try {
    await work();
  } catch {
    console.error("[Media accounting] Billing persistence failed");
  }
}

/** One physical successful attempt, including combos. No wrapper-level second debit. */
export async function recordMediaRequest(
  input: MediaRequestIdentity,
  bill: MediaBill
): Promise<void> {
  return safelyRecordMedia(async () => {
    await saveRequestUsage(
      {
        ...input,
        tokens: bill.usage,
        calculatedCostUsd: bill.reportedCostUsd === null ? bill.costUsd : null,
        billingUnit: bill.unit,
        billingQuantity: bill.quantity,
        billingUnitPriceUsd: bill.unitPriceUsd,
        status: "200",
        success: true,
        latencyMs: Date.now() - input.startTime,
      },
      { deduplicate: false }
    );
    if (!input.apiKeyId || isFlatRateProvider(input.provider)) return;
    if (bill.costUsd === null) recordUnpricedBudgetUsage(input.apiKeyId, input);
    else recordCost(input.apiKeyId, bill.costUsd, { ...input, tokens: bill.usage, success: true });
  });
}

/** Unknown is not free. The final asynchronous TTS charge is visible in usage/ledger, not headers. */
export function attachMediaResponseMeta(
  response: Response,
  metadata: Parameters<typeof attachOmniRouteMetaToResponse>[1] & { costUsd: number | null }
): Response {
  const result = attachOmniRouteMetaToResponse(response, metadata);
  if (metadata.costUsd === null) result.headers.delete("X-OmniRoute-Response-Cost");
  result.headers.set("X-OmniRoute-Cost-Status", metadata.costUsd === null ? "unknown" : "known");
  return result;
}
