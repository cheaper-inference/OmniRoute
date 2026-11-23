/**
 * db/apiKeys/secretAtRest.ts — how the gateway API key secret is stored.
 *
 * `api_keys.key` holds the client-facing `sk-…` secret through the same `enc:v1:` envelope
 * provider credentials use (`encryptConnectionFields`). The column is reversible ON PURPOSE:
 * the admin reveal route (`/api/keys/[id]/reveal`) and the operator-only settings export
 * (`getApiKeys`) must hand the raw key back so copies and backups round-trip. Authentication
 * never reads it — the hot path resolves the caller by `key_hash` (SHA-256 fingerprint) and
 * never decrypts. `key_prefix` is the only plaintext fragment kept for display.
 *
 * With STORAGE_ENCRYPTION_KEY unset the column stays plaintext (passthrough), exactly like the
 * provider credentials; the hash-only lookup applies either way.
 */

import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { decrypt, encrypt, isEncryptionEnabled, looksEncrypted } from "../encryption";

interface SecretAtRestDb {
  prepare: (sql: string) => {
    all: (...params: unknown[]) => unknown[];
    run: (...params: unknown[]) => unknown;
  };
}

interface LegacyKeyRow {
  id?: unknown;
  key?: unknown;
  key_hash?: unknown;
  key_prefix?: unknown;
}

/** Rows older writers left behind: no hash yet, or (with encryption on) a plaintext secret. */
const LEGACY_ROWS_SQL =
  "SELECT id, key, key_hash, key_prefix FROM api_keys WHERE key_hash IS NULL OR key_hash = ''";
const LEGACY_PLAINTEXT_ROWS_SQL = `${LEGACY_ROWS_SQL} OR substr(key, 1, 7) <> 'enc:v1:'`;
const UPDATE_SECRET_SQL = "UPDATE api_keys SET key = ?, key_hash = ?, key_prefix = ? WHERE id = ?";

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

/** Value to write into `api_keys.key` for a raw secret (envelope, or passthrough). */
export function encryptApiKeySecret(rawKey: string): string {
  if (!isEncryptionEnabled()) return rawKey;
  return encrypt(rawKey) ?? rawKey;
}

/**
 * Raw secret for a stored `api_keys.key` value. Plaintext (legacy or passthrough) comes back
 * unchanged; an envelope that cannot be decrypted (changed STORAGE_ENCRYPTION_KEY) yields null,
 * so callers treat the secret as absent instead of handing out the ciphertext.
 */
export function decryptApiKeySecret(stored: unknown): unknown {
  if (!looksEncrypted(stored)) return stored;
  return decrypt(stored as string) ?? null;
}

function legacyRowUpdate(row: LegacyKeyRow, encryptAtRest: boolean) {
  if (!hasText(row.key)) return null;
  const rawKey = decryptApiKeySecret(row.key);
  if (!hasText(rawKey)) return null; // undecryptable envelope: leave the row alone
  const alreadyEncrypted = looksEncrypted(row.key);
  return {
    key: encryptAtRest && !alreadyEncrypted ? encryptApiKeySecret(rawKey) : row.key,
    keyHash: hasText(row.key_hash) ? row.key_hash : opaqueTokenFingerprint(rawKey),
    keyPrefix: hasText(row.key_prefix) ? row.key_prefix : rawKey.slice(0, 12),
  };
}

/**
 * Idempotent in-place pass over legacy rows: computes a missing `key_hash` / `key_prefix` from
 * the plaintext and, when encryption is on, moves the plaintext secret into the envelope
 * (`looksEncrypted` guard — never double-encrypts). Runs at first use of the api-keys module
 * and again when a hash lookup misses, so a row an older writer or a restore added after
 * module init still authenticates. Returns how many rows it rewrote. No numbered migration:
 * same lazy, in-module style as `ensureApiKeyFallbackColumns`.
 */
export function backfillApiKeySecretsAtRest(db: SecretAtRestDb): number {
  const encryptAtRest = isEncryptionEnabled();
  const rows = db
    .prepare(encryptAtRest ? LEGACY_PLAINTEXT_ROWS_SQL : LEGACY_ROWS_SQL)
    .all() as LegacyKeyRow[];
  if (rows.length === 0) return 0;

  const update = db.prepare(UPDATE_SECRET_SQL);
  let rewritten = 0;
  for (const row of rows) {
    const next = legacyRowUpdate(row, encryptAtRest);
    if (!next) continue;
    try {
      update.run(next.key, next.keyHash, next.keyPrefix, row.id);
      rewritten++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`[DB] Could not secure api_keys row ${String(row.id)}: ${message}`);
    }
  }
  return rewritten;
}
