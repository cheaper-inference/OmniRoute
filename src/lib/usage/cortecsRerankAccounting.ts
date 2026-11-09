import { recordCost, recordUnpricedBudgetUsage } from "@/domain/costRules";
import { saveRequestUsage } from "./usageHistory";

type Usage = Record<string, number>;
/** Numerical provenance and the optional request-time USD valuation. */
export interface CortecsRerankBill {
  usage: Usage;
  costUsd: number | null;
}

/** Match the actual upstream, not a user-controlled provider-node alias. */
export function isCortecsRerankUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.origin === "https://api.cortecs.ai" &&
      !url.username &&
      !url.password &&
      ["/v1/rerank", "/rerank"].includes(url.pathname)
    );
  } catch {
    return false;
  }
}

/** Credit and token quantities use the upstream's nonnegative-integer contract. */
const isCount = (value: unknown): value is number =>
  typeof value === "number" && Number.isSafeInteger(value) && value >= 0;

/**
 * Cortecs documents usage.cost as credits, NOT USD. Keep only numerical
 * metering fields. A positive USD-per-credit rate is explicit operator input;
 * no credit denomination, EUR/USD parity, live FX request or default is assumed.
 */
export function normalizeCortecsRerankUsage(
  raw: unknown,
  creditPriceUsd = process.env.CORTECS_CREDIT_PRICE_USD
): CortecsRerankBill {
  const source =
    raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const usage: Usage = {};
  for (const key of ["prompt_tokens", "completion_tokens", "total_tokens"]) {
    if (isCount(source[key])) usage[key] = source[key];
  }
  const credits = isCount(source.cost) ? source.cost : null;
  if (credits !== null) usage.provider_credits = credits;
  const rate = creditPriceUsd?.trim() ? Number(creditPriceUsd) : Number.NaN;
  const converted =
    credits === 0
      ? 0
      : credits !== null && Number.isFinite(rate) && rate > 0
        ? credits * rate
        : Number.NaN;
  const costUsd = Number.isFinite(converted) && converted >= 0 ? converted : null;
  if (costUsd !== null) usage.cost_usd = costUsd;
  return { usage, costUsd };
}

/**
 * Account once per successful physical Cortecs request. Vendor identity is
 * canonical, while the selected custom connection and caller remain attributed.
 * Bookkeeping failure must not turn a paid success into a retryable HTTP error.
 */
export async function accountCortecsRerankRequest(
  input: {
    upstreamUrl: string;
    usage: unknown;
    model: string;
    connectionId?: string | null;
    apiKeyId?: string | null;
    apiKeyName?: string | null;
    startTime: number;
    requestId: string;
  },
  deps: {
    saveUsage?: typeof saveRequestUsage;
    recordSpend?: typeof recordCost;
    recordUnpriced?: typeof recordUnpricedBudgetUsage;
  } = {}
): Promise<CortecsRerankBill | null> {
  if (!isCortecsRerankUrl(input.upstreamUrl)) return null;
  const bill = normalizeCortecsRerankUsage(input.usage);
  const identity = {
    provider: "cortecs",
    model: input.model,
    connectionId: input.connectionId,
    apiKeyId: input.apiKeyId,
    apiKeyName: input.apiKeyName,
  };
  try {
    await (deps.saveUsage ?? saveRequestUsage)(
      {
        ...identity,
        tokens: bill.usage,
        endpoint: "/v1/rerank",
        status: "200",
        success: true,
        latencyMs: Date.now() - input.startTime,
      },
      { deduplicate: false }
    );
  } catch {
    console.error("[Rerank accounting] Usage persistence failed");
  }
  if (input.apiKeyId) {
    try {
      if (bill.costUsd === null)
        (deps.recordUnpriced ?? recordUnpricedBudgetUsage)(input.apiKeyId, identity);
      else {
        (deps.recordSpend ?? recordCost)(input.apiKeyId, bill.costUsd, {
          ...identity,
          tokens: bill.usage,
          requestId: input.requestId,
          success: true,
        });
      }
    } catch {
      console.error("[Rerank accounting] Key spend persistence failed");
    }
  }
  return bill;
}
