/**
 * db/usageAnalytics/apiKeyScope.ts — the usage source a single API key may read about itself
 * (GET /v1/me/usage).
 *
 * This is the only place the per-key filter of the self-service usage view is written. Rows are
 * selected by the calling key's id, passed as a bound parameter, and by nothing else: the
 * `api_key_name` column is never matched, so a row of another key whose name happens to equal
 * the caller's id stays out. Rows without a key id (NULL or empty, written before keys were
 * recorded) never equal a non-empty id, so they are never attributed to the caller. With a key
 * filter, `buildUnifiedSource` reads `usage_history` only, never the daily summaries (which carry
 * no key).
 */

import { buildUnifiedSource, type UnifiedSourceResult } from "./sources";

export interface ApiKeyOwnedSourceOptions {
  /** Id of the calling key, as stored in `usage_history.api_key_id`. Must be non-empty. */
  apiKeyId: string;
  /** ISO-8601 lower bound of the window, or null for every stored row. */
  sinceIso: string | null;
  /** ISO-8601 upper bound (inclusive), or null for no bound. Rows stamped later are left out. */
  untilIso: string | null;
  /** YYYY-MM-DD raw-retention boundary, required by the source builder. */
  rawCutoffDate: string;
}

export function buildApiKeyOwnedSource(opts: ApiKeyOwnedSourceOptions): UnifiedSourceResult {
  if (typeof opts.apiKeyId !== "string" || opts.apiKeyId.trim() === "") {
    throw new Error("buildApiKeyOwnedSource: apiKeyId is required");
  }
  return buildUnifiedSource({
    sinceIso: opts.sinceIso,
    untilIso: opts.untilIso,
    rawCutoffDate: opts.rawCutoffDate,
    apiKeyWhere: "api_key_id = @ownerApiKeyId",
    apiKeyParams: { ownerApiKeyId: opts.apiKeyId },
  });
}
