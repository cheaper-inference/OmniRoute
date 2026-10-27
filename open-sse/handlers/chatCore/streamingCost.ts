/**
 * chatCore streaming per-request cost recording (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's onStreamComplete: resolves the real per-request cost for a
 * completed streaming response and records it against the api key. onStreamComplete is synchronous,
 * so this is a sync fire-and-forget driven through calculateCost().then().catch() that never throws
 * to the caller. calculateCost and recordCost are injected so the hook stays decoupled. Behaviour
 * is byte-identical to the previous inline block. A resolver may return the detailed
 * `{ costUsd, priced }` result instead of a bare number; an unpriced one is reported through
 * `recordUnpricedCost` so a metered model with no price is not silently charged $0.
 */

/** The `{ costUsd, priced }` shape of `calculateCostDetailed` (lib/usage/costCalculator). */
type DetailedCost = { costUsd: number; priced: boolean; failed?: boolean };

type CostResolver = (
  provider: string,
  model: string,
  usage: Record<string, number | undefined> | null | undefined,
  options: { serviceTier?: string }
) => Promise<number | DetailedCost>;

/** Extra per-request ledger context threaded from the handler. */
type LedgerDetails = {
  serviceTier?: string | null;
  success?: boolean;
  timestamp?: string;
  requestId?: string | null;
};

/** Build a {@link LedgerDetails} for a completed streaming response. */
export function buildStreamLedgerDetails(
  serviceTier: string | null | undefined,
  success: boolean,
  requestId: string | null | undefined
): LedgerDetails {
  return { serviceTier, success, timestamp: new Date().toISOString(), requestId };
}

export function recordStreamingCost(args: {
  apiKeyId: string | null | undefined;
  provider: string | null | undefined;
  model: string | null | undefined;
  streamUsage: Record<string, number | undefined> | null | undefined;
  serviceTier?: string;
  calculateCost: CostResolver;
  recordCost: (
    apiKeyId: string,
    cost: number,
    details?: {
      provider?: string | null;
      model?: string | null;
      tokens?: unknown;
      serviceTier?: string | null;
      success?: boolean;
      timestamp?: string;
      requestId?: string | null;
    }
  ) => void;
  recordUnpricedCost?: (apiKeyId: string, cost: DetailedCost) => void;
  ledger?: LedgerDetails;
}): void {
  if (!args.apiKeyId || !args.streamUsage) return;

  const apiKeyId = args.apiKeyId;
  args
    .calculateCost(args.provider, args.model, args.streamUsage, { serviceTier: args.serviceTier })
    .then((resolved) => {
      const cost = typeof resolved === "number" ? { costUsd: resolved, priced: true } : resolved;
      if (!cost.priced) args.recordUnpricedCost?.(apiKeyId, cost);
      const estimatedCost = cost.costUsd;
      if (estimatedCost > 0) {
        args.recordCost(apiKeyId, estimatedCost, {
          provider: args.provider,
          model: args.model,
          tokens: args.streamUsage,
          serviceTier: args.serviceTier ?? args.ledger?.serviceTier,
          success: args.ledger?.success ?? true,
          timestamp: args.ledger?.timestamp,
          requestId: args.ledger?.requestId,
        });
      }
    })
    .catch(() => {});
}
