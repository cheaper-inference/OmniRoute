import {
  sanitizeProviderBillingStatus,
  type ProviderBillingStatus,
} from "@/shared/utils/providerBilling";
import { getDbInstance, isBuildPhase, isCloud } from "./core";
import { parseCodexPaidCredits, type CodexPaidCredits } from "@/lib/providers/codexPaidCredits";
import { projectCodexQuotaDisplay } from "@/lib/providers/codexQuotaDisplay";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
  transaction: <T extends (...args: any[]) => unknown>(fn: T) => T;
}

interface KeyValueRow {
  key: string;
  value: string;
}

export interface ProviderLimitsCacheEntry {
  quotas: JsonRecord | null;
  modelQuotas?: JsonRecord;
  plan: unknown;
  message: string | null;
  fetchedAt: string;
  source?: string | null;
  bankedResetCredits?: number;
  paidCredits?: CodexPaidCredits;
  billing?: ProviderBillingStatus;
  quotaGroups?: Array<Record<string, unknown>>;
  limitReached?: boolean;
  sparkLimitReached?: boolean;
  rateLimitReachedType?: string;
}

const PROVIDER_LIMITS_CACHE_NAMESPACE = "providerLimitsCache";

interface CodexQuotaDisplayRow {
  id: string;
  quota_data: string | null;
}

// Exclude credentials and potentially large synced model catalogs even from the read result.
const CODEX_QUOTA_DISPLAY_SQL = `SELECT id,
  CASE WHEN json_valid(provider_specific_data) THEN json_object(
    'codexQuotaStateByScope', json_extract(provider_specific_data, '$.codexQuotaStateByScope'),
    'codexQuotaState', json_extract(provider_specific_data, '$.codexQuotaState')
  ) ELSE NULL END AS quota_data
  FROM provider_connections WHERE provider = 'codex'`;

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function sanitizeCacheEntryForStorage(entry: ProviderLimitsCacheEntry): ProviderLimitsCacheEntry {
  const { billing: rawBilling, ...rest } = entry;
  const billing = sanitizeProviderBillingStatus(rawBilling);
  return billing ? { ...rest, billing } : rest;
}

function normalizeOptionalCacheFields(record: JsonRecord): Partial<ProviderLimitsCacheEntry> {
  const bankedResetCredits = Number(record.bankedResetCredits);
  const paidCredits = parseCodexPaidCredits(record.paidCredits);
  const billing = sanitizeProviderBillingStatus(record.billing);
  const modelQuotas = toRecord(record.modelQuotas);
  return {
    ...(modelQuotas ? { modelQuotas } : {}),
    ...(typeof record.limitReached === "boolean" ? { limitReached: record.limitReached } : {}),
    ...(typeof record.sparkLimitReached === "boolean"
      ? { sparkLimitReached: record.sparkLimitReached }
      : {}),
    ...(typeof record.rateLimitReachedType === "string"
      ? { rateLimitReachedType: record.rateLimitReachedType }
      : {}),
    ...(Number.isFinite(bankedResetCredits) ? { bankedResetCredits } : {}),
    ...(paidCredits ? { paidCredits } : {}),
    ...(billing ? { billing } : {}),
    ...(Array.isArray(record.quotaGroups)
      ? { quotaGroups: record.quotaGroups as Array<Record<string, unknown>> }
      : {}),
  };
}
function normalizeCacheEntry(value: unknown): ProviderLimitsCacheEntry | null {
  const record = toRecord(value);
  if (!record) return null;

  const fetchedAt =
    typeof record.fetchedAt === "string" && record.fetchedAt.trim() ? record.fetchedAt : null;
  if (!fetchedAt) return null;

  return {
    quotas: toRecord(record.quotas),
    ...normalizeOptionalCacheFields(record),
    plan: record.plan ?? null,
    message: typeof record.message === "string" ? record.message : null,
    fetchedAt,
    source: typeof record.source === "string" ? record.source : null,
  };
}

export function getProviderLimitsCache(connectionId: string): ProviderLimitsCacheEntry | null {
  if (isBuildPhase || isCloud) return null;
  const db = getDbInstance() as unknown as DbLike;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(PROVIDER_LIMITS_CACHE_NAMESPACE, connectionId) as KeyValueRow | undefined;
  const cached = row?.value ? normalizeCacheEntry(parseJson(row.value)) : null;
  const connection = db.prepare(`${CODEX_QUOTA_DISPLAY_SQL} AND id = ?`).get(connectionId) as
    CodexQuotaDisplayRow | undefined;
  return connection
    ? projectCodexQuotaDisplay(cached, parseJson(connection.quota_data || "null"))
    : cached;
}

export function getAllProviderLimitsCache(): Record<string, ProviderLimitsCacheEntry> {
  if (isBuildPhase || isCloud) return {};
  const db = getDbInstance() as unknown as DbLike;
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(PROVIDER_LIMITS_CACHE_NAMESPACE) as KeyValueRow[];

  const result: Record<string, ProviderLimitsCacheEntry> = {};
  for (const row of rows) {
    const parsed = normalizeCacheEntry(parseJson(row.value));
    if (parsed) {
      result[row.key] = parsed;
    }
  }
  // Only quota metadata is read: no credential decryption, network calls or per-account writes.
  const observations = db.prepare(CODEX_QUOTA_DISPLAY_SQL).all() as CodexQuotaDisplayRow[];
  for (const observation of observations) {
    const entry = projectCodexQuotaDisplay(
      result[observation.id] ?? null,
      parseJson(observation.quota_data || "null")
    );
    if (entry) result[observation.id] = entry;
  }
  return result;
}

export function setProviderLimitsCache(
  connectionId: string,
  entry: ProviderLimitsCacheEntry
): ProviderLimitsCacheEntry {
  const sanitized = sanitizeCacheEntryForStorage(entry);
  if (isBuildPhase || isCloud) return sanitized;
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    PROVIDER_LIMITS_CACHE_NAMESPACE,
    connectionId,
    JSON.stringify(sanitized)
  );
  return sanitized;
}

export function setProviderLimitsCacheBatch(
  entries: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }>
): number {
  if (isBuildPhase || isCloud || entries.length === 0) return 0;
  const db = getDbInstance() as unknown as DbLike;
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  const tx = db.transaction(
    (items: Array<{ connectionId: string; entry: ProviderLimitsCacheEntry }>) => {
      for (const item of items) {
        insert.run(
          PROVIDER_LIMITS_CACHE_NAMESPACE,
          item.connectionId,
          JSON.stringify(sanitizeCacheEntryForStorage(item.entry))
        );
      }
    }
  );
  tx(entries);
  return entries.length;
}

export function deleteProviderLimitsCache(connectionId: string): void {
  if (isBuildPhase || isCloud) return;
  const db = getDbInstance() as unknown as DbLike;
  db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
    PROVIDER_LIMITS_CACHE_NAMESPACE,
    connectionId
  );
}
