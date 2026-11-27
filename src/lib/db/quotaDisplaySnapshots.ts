import { getDbInstance, isBuildPhase, isCloud } from "./core";

export interface QuotaDisplaySnapshot {
  connection_id: string;
  window_key: string;
  remaining_percentage: number | null;
  next_reset_at: string | null;
  created_at: string;
  raw_data: string | null;
}

/** Display-only bulk read. Keep tombstones: filtering before projection revives old cache rows. */
export function getQuotaDisplaySnapshots(): QuotaDisplaySnapshot[] {
  if (isBuildPhase || isCloud) return [];
  return getDbInstance()
    .prepare(
      `SELECT connection_id, window_key, remaining_percentage, next_reset_at, created_at, raw_data
       FROM (
         SELECT s.*, ROW_NUMBER() OVER (
           PARTITION BY s.connection_id, s.window_key ORDER BY s.created_at DESC, s.id DESC
         ) AS rn
         FROM quota_snapshots s
         JOIN provider_connections c ON c.id = s.connection_id AND c.provider = s.provider
         WHERE c.provider <> 'codex'
       ) WHERE rn = 1`
    )
    .all() as QuotaDisplaySnapshot[];
}
