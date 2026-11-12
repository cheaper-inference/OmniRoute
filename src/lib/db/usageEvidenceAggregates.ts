import { getDbInstance } from "./core";
// The legacy marker is conservative; field evidence also covers mixed receipts.
export const ESTIMATED_USAGE_SQL = `CASE WHEN usage_provenance = 'estimated' OR
  EXISTS (SELECT 1 FROM json_each(CASE WHEN json_valid(usage_evidence) THEN usage_evidence ELSE '{}' END)
    WHERE json_extract(value, '$.source') = 'estimated') THEN 1 ELSE 0 END`;
export const UNKNOWN_USAGE_SQL = `CASE WHEN usage_evidence IS NULL THEN 1 ELSE 0 END`;
/** Called inside the existing archive transaction; never alters historical-only rows. */
export function rollupUsageEvidenceBeforeDate(beforeDate: string): void {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT LOWER(provider) provider, LOWER(model) model, DATE(timestamp) date,
    SUM(${ESTIMATED_USAGE_SQL}) estimated, SUM(${UNKNOWN_USAGE_SQL}) unknown, SUM(tokens_cache_read) cacheRead,
    SUM(CASE WHEN tokens_cache_read IS NULL THEN 1 ELSE 0 END) cacheUnknown
    FROM usage_history WHERE timestamp < ? AND provider IS NOT NULL AND provider != ''
    AND model IS NOT NULL AND model != '' GROUP BY LOWER(provider), LOWER(model), DATE(timestamp)`
    )
    .all(beforeDate) as Array<{
    provider: string;
    model: string;
    date: string;
    estimated: number;
    unknown: number;
    cacheRead: number | null;
    cacheUnknown: number;
  }>;
  const update = db.prepare(`UPDATE daily_usage_summary SET estimated_requests = ?,
    unknown_evidence_requests = ?, total_cache_read_tokens = ?, cached_input_unknown_requests = ?
    WHERE provider = ? AND model = ? AND date = ?`);
  for (const row of rows)
    update.run(
      row.estimated,
      row.unknown,
      row.cacheRead,
      row.cacheUnknown,
      row.provider,
      row.model,
      row.date
    );
}
