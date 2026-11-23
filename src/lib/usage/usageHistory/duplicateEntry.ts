import type { getDbInstance } from "../../db/core";
import { resolveProviderId } from "@/shared/constants/providers";
import type { UsageEntry } from "../usageHistory";

/** Look up and backfill a legacy natural-key duplicate inside the caller's transaction. */
export function backfillDuplicateUsageEntry(
  db: ReturnType<typeof getDbInstance>,
  entry: UsageEntry,
  timestamp: string,
  tokensInput: number,
  tokensOutput: number
): boolean {
  const existing = db
    .prepare(
      `SELECT id, endpoint, cpa_auth_index FROM usage_history
       WHERE timestamp = ?
         AND COALESCE(provider, '')     = COALESCE(?, '')
         AND COALESCE(model, '')        = COALESCE(?, '')
         AND COALESCE(connection_id, '') = COALESCE(?, '')
         AND COALESCE(api_key_id, '')   = COALESCE(?, '')
         AND tokens_input  = ?
         AND tokens_output = ?
       ORDER BY id DESC LIMIT 1`
    )
    .get(
      timestamp,
      entry.provider ? resolveProviderId(entry.provider) : null,
      entry.model || null,
      entry.connectionId || null,
      entry.apiKeyId || null,
      tokensInput,
      tokensOutput
    ) as { id: number; endpoint: string | null; cpa_auth_index: string | null } | undefined;

  if (!existing) return false;
  // Back-fill endpoint if the original row missed it.
  if (!existing.endpoint && entry.endpoint) {
    db.prepare(`UPDATE usage_history SET endpoint = ? WHERE id = ?`).run(
      entry.endpoint,
      existing.id
    );
  }
  // A later completed attempt can carry the trace the first write missed.
  if (!existing.cpa_auth_index && entry.cpaAuthIndex) {
    db.prepare(`UPDATE usage_history SET cpa_auth_index = ? WHERE id = ?`).run(
      entry.cpaAuthIndex,
      existing.id
    );
  }
  return true;
}
