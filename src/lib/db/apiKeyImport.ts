import { randomUUID } from "node:crypto";
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { importKeySchema, type ImportKeyInput } from "@/shared/validation/schemas/keyImport";
import { ALL_COMBOS_ACCESS_RULE } from "@/shared/constants/comboAccess";
import { normalizeSelfServiceScopesForCreate } from "@/shared/constants/selfServiceScopes";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";
import { setNoLog } from "../compliance/noLog";
import { getDbInstance } from "./core";
import { clearApiKeyCaches } from "./apiKeys";
import { ensureApiKeyFallbackColumns } from "./apiKeyColumnFallbacks";
import { normalizeApiKeyPermissionsUpdate } from "./apiKeys/permissionsUpdate";
import { decryptApiKeySecret, encryptApiKeySecret } from "./apiKeys/secretAtRest";
import { isSelfLoopBearer } from "./apiKeys/selfLoopKey";
import { parseNullablePositiveNumber } from "./apiKeyUsageLimitFields";
import { backupDbFile } from "./backup";

export class ApiKeyImportConflictError extends Error {
  readonly code = "API_KEY_IMPORT_CONFLICT";
  constructor() {
    super("API key import conflicts with an existing credential");
  }
}

interface IdentityRow {
  id: string;
  key_hash: string | null;
  key: string;
}

/** No legacy backfill here: even an idempotent retry must leave stored rows untouched. */
function matchesHash(row: IdentityRow, hash: string): boolean {
  if (row.key_hash) return row.key_hash === hash;
  const raw = decryptApiKeySecret(row.key);
  return typeof raw === "string" && opaqueTokenFingerprint(raw) === hash;
}

/**
 * Import is insert-only. The IMMEDIATE lock covers identity checks and the complete policy
 * insert, including permission overrides; updateApiKeyPermissions is async and must NOT be
 * called from here. Never await inside this critical section or expose a half-configured row.
 */
export function importApiKey(input: ImportKeyInput, machineId: string) {
  const data = importKeySchema.parse(input);
  if (!machineId) throw new Error("machineId is required");
  const reserved = [process.env.OMNIROUTE_API_KEY, process.env.ROUTER_API_KEY];
  if (
    reserved.some((key) => key && timingSafeCompare(data.key, key.trim())) ||
    isSelfLoopBearer(data.key)
  ) {
    throw new ApiKeyImportConflictError();
  }
  const db = getDbInstance();
  const hash = opaqueTokenFingerprint(data.key);
  const id = data.id ?? randomUUID();
  const scopes = normalizeSelfServiceScopesForCreate(data.scopes);
  const access = normalizeApiKeyPermissionsUpdate({
    modelAccessMode: data.modelAccessMode,
    allowedModels: data.allowedModels,
  });
  let created = false;
  db.immediate(() => {
    // Serialize first-use fallback DDL too: cold processes may lack the same column.
    ensureApiKeyFallbackColumns(db);
    const existing = db.prepare("SELECT id, key_hash, key FROM api_keys WHERE id = ?").get(id) as
      IdentityRow | undefined;
    if (existing) {
      if (!data.id || !matchesHash(existing, hash)) throw new ApiKeyImportConflictError();
      return;
    }
    // key_hash is intentionally NOT UNIQUE upstream; encrypted ciphertext uniqueness cannot
    // detect plaintext duplicates. Also inspect legacy hashless rows without mutating them.
    const duplicates = db
      .prepare(
        "SELECT id, key_hash, key FROM api_keys WHERE key_hash = ? OR key_hash IS NULL OR key_hash = ''"
      )
      .all(hash) as IdentityRow[];
    if (duplicates.some((row) => matchesHash(row, hash))) throw new ApiKeyImportConflictError();
    db.prepare(
      `INSERT INTO api_keys (
      id, name, key, machine_id, created_at, key_hash, key_prefix, scopes,
      model_access_mode, allowed_models, allowed_combos, allowed_connections, expires_at,
      no_log, allow_usage_command, usage_limit_enabled, daily_usage_limit_usd,
      weekly_usage_limit_usd, chaos_mode_enabled
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      data.name,
      encryptApiKeySecret(data.key),
      machineId,
      new Date().toISOString(),
      hash,
      data.key.slice(0, 12),
      JSON.stringify(scopes),
      access.modelAccessMode ?? "all",
      JSON.stringify(access.allowedModels ?? []),
      JSON.stringify(data.allowedCombos ?? [ALL_COMBOS_ACCESS_RULE]),
      JSON.stringify(data.allowedConnections ?? []),
      data.expiresAt ?? null,
      data.noLog === true ? 1 : 0,
      data.allowUsageCommand === true ? 1 : 0,
      data.usageLimitEnabled === true ? 1 : 0,
      parseNullablePositiveNumber(data.dailyUsageLimitUsd),
      parseNullablePositiveNumber(data.weeklyUsageLimitUsd),
      data.chaosModeEnabled === true ? 1 : 0
    );
    created = true;
  });
  if (created) {
    setNoLog(id, data.noLog === true);
    clearApiKeyCaches();
    backupDbFile("pre-write");
  }
  return { id, created };
}
