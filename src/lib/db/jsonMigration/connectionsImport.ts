/**
 * db/jsonMigration/connectionsImport.ts — restores provider connections from a settings
 * JSON backup.
 *
 * Restore rule (same as API keys): a new connection gets every provider_connections
 * column the backup carries (schema defaults for the rest); an existing connection has
 * ONLY the carried columns updated, so columns an older backup lacks (`max_concurrent`,
 * `"group"`, `proxy_enabled`, per-key proxy, quota thresholds, …) keep their value.
 * A null/absent `rateLimitOverrides` also keeps the operator's current overrides.
 *
 * Credentials go through encryptConnectionFields() exactly like createProviderConnection /
 * updateProviderConnection, so with STORAGE_ENCRYPTION_KEY set they are stored as
 * `enc:v1:…` (already-encrypted values are left as they are).
 */

import type { SqliteAdapter } from "../adapters/types";
import { encryptConnectionFields } from "../encryption";
import { mapBackupRecordToColumns, selectExistingRow, upsertColumns } from "./columnUpsert";

type JsonRecord = Record<string, unknown>;

export function importProviderConnectionRecord(
  db: SqliteAdapter,
  columns: string[],
  conn: JsonRecord
) {
  const record = encryptConnectionFields({ ...conn });
  if (record.rateLimitOverrides == null) delete record.rateLimitOverrides;

  const existing = selectExistingRow(db, "provider_connections", conn.id);
  const values = mapBackupRecordToColumns(record, columns);
  if (!existing) {
    const now = new Date().toISOString();
    if (values.auth_type == null) values.auth_type = "oauth";
    if (values.created_at == null) values.created_at = now;
    if (values.updated_at == null) values.updated_at = now;
  }
  upsertColumns(db, "provider_connections", values, existing !== undefined);
}
