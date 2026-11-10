import { recordCost, recordUnpricedBudgetUsage } from "@/domain/costRules";
import { saveRequestUsage } from "./usageHistory";

type Usage = Record<string, number>;
export type CortecsRerankCostUnit = "credits" | "USD";
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

/** Read the nonnegative-integer token counts the upstream reported. */
function readTokenCounts(source: Record<string, unknown>): Usage {
  const usage: Usage = {};
  for (const key of ["prompt_tokens", "completion_tokens", "total_tokens"]) {
    if (isCount(source[key])) usage[key] = source[key];
  }
  return usage;
}

/** A USD response carries any finite, nonnegative amount verbatim. */
function readUsdCost(cost: unknown): number | null {
  return typeof cost === "number" && Number.isFinite(cost) && cost >= 0 ? cost : null;
}

/** Credits become USD only with an explicit positive operator rate; zero stays zero. */
function convertCreditsToUsd(credits: number | null, creditPriceUsd?: string): number | null {
  if (credits === 0) return 0;
  if (credits === null) return null;
  const rate = creditPriceUsd?.trim() ? Number(creditPriceUsd) : Number.NaN;
  if (!Number.isFinite(rate) || rate <= 0) return null;
  const converted = credits * rate;
  return Number.isFinite(converted) && converted >= 0 ? converted : null;
}

/**
 * Default responses use credits; requests with x-cortecs-cost-unit: USD
 * receive USD instead. The trusted outbound request selects the unit, never
 * a guessed magnitude or a raw USD-looking field. Only the legacy credit
 * path uses an optional operator-supplied rate; USD must not be converted twice.
 */
export function normalizeCortecsRerankUsage(
  raw: unknown,
  creditPriceUsd = process.env.CORTECS_CREDIT_PRICE_USD,
  costUnit: CortecsRerankCostUnit = "credits"
): CortecsRerankBill {
  const source =
    raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const usage = readTokenCounts(source);
  let costUsd: number | null;
  if (costUnit === "USD") {
    costUsd = readUsdCost(source.cost);
  } else {
    const credits = isCount(source.cost) ? source.cost : null;
    if (credits !== null) usage.provider_credits = credits;
    costUsd = convertCreditsToUsd(credits, creditPriceUsd);
  }
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
    costUnit?: CortecsRerankCostUnit;
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
  const bill = normalizeCortecsRerankUsage(input.usage, undefined, input.costUnit);
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
