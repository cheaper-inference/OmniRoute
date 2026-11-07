/**
 * db/jsonMigration/apiKeysImport.ts — restores API keys from a settings JSON backup.
 *
 * Restore rule:
 *  - New key (id unknown to this instance): every api_keys column the backup carries is
 *    inserted; columns it does not carry take the schema defaults.
 *  - Existing key: only the columns the backup carries are updated. Columns an older or
 *    legacy backup does not have keep their current value, so a restore never silently
 *    drops allow-lists, scopes, rate limits or spend limits added after that backup.
 *  - Lifecycle only ever gets stricter on an existing key: a set `revoked_at` is kept,
 *    `is_banned = 1` and `is_active = 0` stay, and the earliest `expires_at` wins. The
 *    stored secret (`key`, `key_hash`, `key_prefix`) is never replaced either, so a
 *    rotated credential cannot come back from an older backup.
 */

import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import type { SqliteAdapter } from "../adapters/types";
import { parseModelAccessMode } from "../apiKeys/modelAccessMode";
import { parseAllowedModels, parseIsActive, parseIsBanned } from "../apiKeys/rowParsers";
import { ensureApiKeyFallbackColumns } from "../apiKeyColumnFallbacks";
import { decryptApiKeySecret, encryptApiKeySecret } from "../apiKeys/secretAtRest";
import {
  getTableColumns,
  mapBackupRecordToColumns,
  selectExistingRow,
  upsertColumns,
  type ColumnValues,
} from "./columnUpsert";

type JsonRecord = Record<string, unknown>;

const SECRET_COLUMNS = ["key", "key_hash", "key_prefix"] as const;

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function earliestExpiry(current: unknown, incoming: unknown): unknown {
  if (!hasText(current)) return incoming;
  if (!hasText(incoming)) return current;
  const currentMs = Date.parse(current);
  const incomingMs = Date.parse(incoming);
  if (!Number.isFinite(currentMs) || !Number.isFinite(incomingMs)) return current;
  return incomingMs < currentMs ? incoming : current;
}

/** Legacy backups only carried `allowedModels`; keep the access mode consistent with it. */
function applyModelAccess(values: ColumnValues, apiKey: JsonRecord, existing?: ColumnValues) {
  const touchesModelAccess =
    apiKey.allowedModels !== undefined || apiKey.modelAccessMode !== undefined;
  if (existing && !touchesModelAccess) return;
  const allowedModels = parseAllowedModels(
    apiKey.allowedModels !== undefined ? apiKey.allowedModels : existing?.allowed_models
  );
  values.allowed_models = JSON.stringify(allowedModels);
  values.model_access_mode = parseModelAccessMode(
    apiKey.modelAccessMode ?? existing?.model_access_mode,
    allowedModels
  );
}

function applyNewKeyDefaults(values: ColumnValues, columns: string[]) {
  if (values.created_at == null) values.created_at = new Date().toISOString();
  if (!hasText(values.key)) return;
  // The export carries the raw key (getApiKeys decrypts it); a raw column dump carries the
  // envelope. Hash and prefix come from the plaintext; the stored value goes back through
  // the envelope. An envelope this instance cannot decrypt is kept as carried.
  const rawKey = decryptApiKeySecret(values.key);
  if (!hasText(rawKey)) return;
  if (!hasText(values.key_hash) && columns.includes("key_hash")) {
    values.key_hash = opaqueTokenFingerprint(rawKey);
  }
  if (!hasText(values.key_prefix) && columns.includes("key_prefix")) {
    values.key_prefix = rawKey.slice(0, 12);
  }
  values.key = encryptApiKeySecret(rawKey);
}

function applyStricterLifecycle(values: ColumnValues, existing: ColumnValues) {
  for (const column of SECRET_COLUMNS) delete values[column];
  if (hasText(existing.revoked_at)) values.revoked_at = existing.revoked_at;
  if (parseIsBanned(existing.is_banned)) values.is_banned = 1;
  if (!parseIsActive(existing.is_active)) values.is_active = 0;
  if (values.expires_at !== undefined || hasText(existing.expires_at)) {
    values.expires_at = earliestExpiry(existing.expires_at, values.expires_at) ?? null;
  }
}

/**
 * api_keys columns to restore. Lifecycle columns such as `is_banned` / `revoked_at` are
 * added lazily by the api-keys module, so make sure they exist first — otherwise an
 * import into a fresh database would silently drop them.
 */
export function getApiKeyImportColumns(db: SqliteAdapter): string[] {
  ensureApiKeyFallbackColumns(db);
  return getTableColumns(db, "api_keys");
}

export function importApiKeyRecord(db: SqliteAdapter, columns: string[], apiKey: JsonRecord) {
  const existing = selectExistingRow(db, "api_keys", apiKey.id);
  const values = mapBackupRecordToColumns(apiKey, columns);
  applyModelAccess(values, apiKey, existing);
  if (existing) applyStricterLifecycle(values, existing);
  else applyNewKeyDefaults(values, columns);
  upsertColumns(db, "api_keys", values, existing !== undefined);
}
