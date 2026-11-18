import { recordCost, recordUnpricedBudgetUsage } from "@/domain/costRules";
import { isFlatRateProvider } from "./flatRateProviders";
import { calculateCostDetailed } from "./costCalculator";
import { saveRequestUsage, type UsageEntry } from "./usageHistory";
import { saveCallLog } from "./callLogs";
import { calculateOcrPageCost } from "./ocrCost";
import { readReportedCost } from "./creditMeteredProviders";
import { getLoggedInputTokens } from "./tokenAccounting";

type Identity = {
  provider: string;
  model: string;
  apiKeyId?: string | null;
  apiKeyName?: string | null;
  connectionId?: string | null;
  startTime: number;
  requestId?: string | null;
};

function recordBill(input: Identity, costUsd: number | null, tokens?: unknown): void {
  if (!input.apiKeyId || isFlatRateProvider(input.provider)) return;
  try {
    if (costUsd === null) {
      recordUnpricedBudgetUsage(input.apiKeyId, input);
      return;
    }
    recordCost(input.apiKeyId, costUsd, { ...input, tokens, success: true });
  } catch {
    console.error("[Specialty accounting] Failed to record key spend");
  }
}

function normalizeEmbeddingUsage(raw: Record<string, unknown> | null): Record<string, unknown> {
  const usage = raw ? { ...raw } : {};
  // OpenRouter's raw embeddings usage reports dollars as `cost`; the shared
  // calculator/persistence consume its normalized `cost_usd` spelling.
  if (typeof usage.cost === "number" && Number.isFinite(usage.cost) && usage.cost >= 0) {
    usage.cost_usd ??= usage.cost;
  }
  if (usage.prompt_tokens === undefined && typeof usage.total_tokens === "number") {
    usage.prompt_tokens = usage.total_tokens;
  }
  return usage;
}

function hasMeasuredTokenCount(usage: Record<string, unknown>): boolean {
  const count = usage.prompt_tokens ?? usage.input_tokens;
  return typeof count === "number" && Number.isSafeInteger(count) && count >= 0;
}

/** One successful physical embedding batch, not one row per vector or combo wrapper. */
export async function recordEmbeddingRequest(
  input: Identity & { usage: Record<string, unknown> | null }
): Promise<number | null> {
  const usage = normalizeEmbeddingUsage(input.usage);
  const reportedCost = readReportedCost(input.provider, usage).providerCostUsd;
  const hasMeasuredUsage = reportedCost !== null || hasMeasuredTokenCount(usage);
  const pricing = hasMeasuredUsage
    ? await calculateCostDetailed(input.provider, input.model, usage)
    : { costUsd: 0, priced: false };
  await saveRequestUsage(
    {
      ...input,
      tokens: usage,
      calculatedCostUsd: pricing.priced && reportedCost === null ? pricing.costUsd : null,
      billingUnit: "token",
      billingQuantity: hasMeasuredUsage ? getLoggedInputTokens(usage) : null,
      status: "200",
      success: true,
      endpoint: "/v1/embeddings",
      latencyMs: Date.now() - input.startTime,
    },
    { deduplicate: false }
  );
  recordBill(input, pricing.priced ? pricing.costUsd : null, usage);
  return pricing.priced ? pricing.costUsd : null;
}

/** OCR payloads are never retained here: only scalar billing and attribution metadata. */
export async function recordOcrRequest(
  input: Identity & { usageInfo?: Record<string, unknown>; annotated: boolean }
): Promise<number | null> {
  const billing = await calculateOcrPageCost(
    input.provider,
    input.model,
    input.usageInfo,
    input.annotated
  );
  const latencyMs = Date.now() - input.startTime;
  const entry: UsageEntry = {
    ...input,
    tokens: {},
    calculatedCostUsd: billing.costUsd,
    billingUnit: "page",
    billingQuantity: billing.pages,
    billingUnitPriceUsd: billing.unitPriceUsd,
    status: "200",
    success: true,
    latencyMs,
    endpoint: "/v1/ocr",
  };
  await saveRequestUsage(entry, { deduplicate: false });
  recordBill(input, billing.costUsd);
  await saveCallLog({
    ...input,
    id: input.requestId,
    method: "POST",
    path: "/v1/ocr",
    requestType: "ocr",
    status: 200,
    duration: latencyMs,
    tokens: {},
  });
  return billing.costUsd;
}
