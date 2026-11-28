/**
 * SQLite implementation of the startup secret store (key_value rows in the
 * "secrets" namespace).
 *
 * Encryption at rest stays inside this repository boundary: values are written
 * through encrypt() and read through decrypt(), unchanged from the pre-repository
 * module (enc:v1 when STORAGE_ENCRYPTION_KEY is configured, plaintext passthrough
 * otherwise, older plaintext rows still readable). The database is resolved at call
 * time so reset/restore never leaves a captured handle. SQL text is unchanged.
 */

import type { StartupSecretRepository } from "@/domain/persistence/startupSecretRepository";
import { getDbInstance } from "../core";
import { decrypt, encrypt } from "../encryption";

interface SecretRow {
  value?: string;
}

function findSecret(name: string): string | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'secrets' AND key = ?")
    .get(name) as SecretRow | undefined;
  const stored = typeof row?.value === "string" ? JSON.parse(row.value) : null;
  if (typeof stored !== "string") return null;
  // SECURITY: JWT_SECRET / API_KEY_SECRET are persisted via encrypt() below.
  // decrypt() transparently returns plaintext unchanged when the stored
  // value does not carry the `enc:v1:` prefix (pre-existing rows written
  // before this fix, or STORAGE_ENCRYPTION_KEY passthrough mode).
  const decrypted = decrypt(stored);
  return typeof decrypted === "string" ? decrypted : null;
}

function insertSecretIfAbsent(name: string, value: string): void {
  const db = getDbInstance();
  // SECURITY: encrypt with the project's AES-256-GCM field-encryption
  // helper before writing to key_value — matches the calling convention
  // used for provider credentials (encryptConnectionFields()/encrypt() in
  // core.ts). Falls back to plaintext passthrough only when
  // STORAGE_ENCRYPTION_KEY is not configured (encrypt()'s own behavior).
  const toStore = encrypt(value);
  db.prepare(
    "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('secrets', ?, ?)"
  ).run(name, JSON.stringify(toStore ?? value));
}

export const sqliteStartupSecretRepository: StartupSecretRepository = {
  find: async (name) => findSecret(name),
  insertIfAbsent: async (name, value) => insertSecretIfAbsent(name, value),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract:
 * startup restores the secrets into process.env synchronously, before anything
 * that signs or hashes with them runs. Errors propagate; the facade keeps the
 * existing "failure means missing / not persisted" fallback.
 */
export const sqliteStartupSecretLegacySync = {
  find: findSecret,
  insertIfAbsent: insertSecretIfAbsent,
};
