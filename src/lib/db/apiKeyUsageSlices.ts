/**
 * GET /v1/me/status list-price source rows: one API key's usage_history requests summed per
 * time window, provider, model, service tier and prompt-size band, so the caller prices each
 * slice once instead of every request.
 *
 * One pass over the earliest window (better-sqlite3 is synchronous, so the scan blocks): every
 * window runs from its start to now, so a request is counted once, in the bucket of the latest
 * window start it reaches, and each window adds up the buckets from its own start on. Grouping
 * by raw columns and 0/1 flags with plain sums is cheaper in SQLite than per-window conditional
 * sums or a join per window; names are normalized when the groups are merged here.
 *
 * Prompt-size bands keep long-context pricing per request: a pricing row may switch to other
 * rates when one request's prompt crosses a threshold, so requests are only summed with others
 * on the same side of every threshold (see `promptBandCuts`).
 */

export type ApiKeyUsageSliceTokens = {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
};

export interface ApiKeyUsageSlice {
  /** Index of the window in the `windowStarts` passed to listApiKeyUsageSlices. */
  windowIndex: number;
  /** Lower-cased, like the other per-key cost groupings. */
  provider: string | null;
  model: string | null;
  /** usage_history.service_tier; empty or NULL reads as "standard". */
  serviceTier: string;
  /** Number of `promptBandCuts` the requests' prompt size (tokens_input) reaches. */
  promptBand: number;
  /** Sum of provider-reported exact costs (`provider_cost_usd`, when the column exists). */
  storedCostUsd: number;
  /**
   * Requests priced from their tokens: successful, no provider-reported cost, and tokens used
   * (input + output + cache read + cache creation > 0, the agent sessions' rule). Only these
   * can be unpriced.
   */
  priceableRequests: number;
  /** Token sums of the successful requests without a provider-reported cost. */
  tokens: ApiKeyUsageSliceTokens;
}

export interface UsageSliceDb {
  prepare(sql: string): { all(...params: unknown[]): unknown[] };
}

const HAS_TOKENS = `COALESCE(uh.tokens_input, 0) + COALESCE(uh.tokens_output, 0)
  + COALESCE(uh.tokens_cache_read, 0) + COALESCE(uh.tokens_cache_creation, 0) > 0`;

// The provider-reported cost column ships with a later migration than this module; read it
// only where it exists. Cached per DB handle (a reset opens a new handle).
const providerCostColumnByDb = new WeakMap<object, boolean>();

function hasProviderCostColumn(db: UsageSliceDb): boolean {
  let known = providerCostColumnByDb.get(db);
  if (known === undefined) {
    const columns = db.prepare("PRAGMA table_info(usage_history)").all() as Array<{
      name?: unknown;
    }>;
    known = columns.some((column) => column?.name === "provider_cost_usd");
    providerCostColumnByDb.set(db, known);
  }
  return known;
}

function lowerOrNull(value: unknown): string | null {
  return typeof value === "string" ? value.toLowerCase() : null;
}

function emptySlice(windowIndex: number, row: Record<string, unknown>): ApiKeyUsageSlice {
  return {
    windowIndex,
    provider: lowerOrNull(row.provider),
    model: lowerOrNull(row.model),
    serviceTier:
      typeof row.service_tier === "string" && row.service_tier !== ""
        ? row.service_tier
        : "standard",
    promptBand: Number(row.prompt_band ?? 0),
    storedCostUsd: 0,
    priceableRequests: 0,
    tokens: { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 },
  };
}

function addGroup(slice: ApiKeyUsageSlice, row: Record<string, unknown>): void {
  slice.storedCostUsd += Number(row.stored_cost ?? 0);
  if (Number(row.from_tokens) !== 1) return;
  if (Number(row.has_tokens) === 1) slice.priceableRequests += Number(row.requests ?? 0);
  slice.tokens.input += Number(row.tokens_input ?? 0);
  slice.tokens.output += Number(row.tokens_output ?? 0);
  slice.tokens.cacheRead += Number(row.tokens_cache_read ?? 0);
  slice.tokens.cacheCreation += Number(row.tokens_cache_creation ?? 0);
  slice.tokens.reasoning += Number(row.tokens_reasoning ?? 0);
}

/**
 * @param windowStarts ISO timestamps (`toISOString()` form); a window runs from its start to
 *   now, like the other /v1/me/status windows.
 * @param promptBandCuts Prompt sizes (tokens_input) at which a pricing tier switches: a
 *   request is in band N when its prompt reaches N of the cuts. Non-positive or non-integer
 *   values are ignored.
 */
export function listApiKeyUsageSlices(
  db: UsageSliceDb,
  apiKeyId: string,
  windowStarts: string[],
  promptBandCuts: number[] = []
): ApiKeyUsageSlice[] {
  if (windowStarts.length === 0) return [];
  const starts = [...new Set(windowStarts)].sort();
  const laterStarts = starts.slice(1);
  const cuts = [...new Set(promptBandCuts)].filter((cut) => Number.isInteger(cut) && cut > 0);
  const sumOfFlags = (flags: string[]) => (flags.length === 0 ? "0" : flags.join(" + "));

  const storedCost = hasProviderCostColumn(db);
  // Like the per-key usage-limit spend: only successful requests without a stored cost are
  // priced from their tokens; a stored cost counts whatever the request's outcome.
  const fromTokens = storedCost
    ? "uh.success = 1 AND uh.provider_cost_usd IS NULL"
    : "uh.success = 1";

  const rows = db
    .prepare(
      `SELECT uh.provider AS provider, uh.model AS model, uh.service_tier AS service_tier,
              ${sumOfFlags(cuts.map(() => "(COALESCE(uh.tokens_input, 0) >= ?)"))} AS prompt_band,
              ${sumOfFlags(laterStarts.map(() => "(uh.timestamp >= ?)"))} AS window_bucket,
              (${fromTokens}) AS from_tokens, (${HAS_TOKENS}) AS has_tokens,
              COUNT(*) AS requests,
              ${storedCost ? "TOTAL(uh.provider_cost_usd)" : "0"} AS stored_cost,
              TOTAL(uh.tokens_input) AS tokens_input, TOTAL(uh.tokens_output) AS tokens_output,
              TOTAL(uh.tokens_cache_read) AS tokens_cache_read,
              TOTAL(uh.tokens_cache_creation) AS tokens_cache_creation,
              TOTAL(uh.tokens_reasoning) AS tokens_reasoning
       FROM usage_history uh
       WHERE uh.api_key_id = ?
         AND uh.timestamp >= ?
       GROUP BY uh.provider, uh.model, uh.service_tier, prompt_band, window_bucket,
                from_tokens, has_tokens`
    )
    .all(...cuts, ...laterStarts, apiKeyId, starts[0]) as Array<Record<string, unknown>>;

  const slices = new Map<string, ApiKeyUsageSlice>();
  windowStarts.forEach((start, windowIndex) => {
    const firstBucket = starts.indexOf(start);
    for (const row of rows) {
      if (Number(row.window_bucket) < firstBucket) continue;
      const base = emptySlice(windowIndex, row);
      const key = JSON.stringify([
        windowIndex,
        base.provider,
        base.model,
        base.serviceTier,
        base.promptBand,
      ]);
      const slice = slices.get(key) ?? base;
      slices.set(key, slice);
      addGroup(slice, row);
    }
  });
  return [...slices.values()];
}
