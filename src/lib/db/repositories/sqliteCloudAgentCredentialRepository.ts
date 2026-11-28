/**
 * SQLite implementation of the cloud agent credential store (cloud_agent_credentials,
 * migration 061).
 *
 * Encryption at rest stays inside this repository boundary: the existing field
 * encryption helpers are applied here, so ciphertext never leaves and plaintext keys
 * are only returned by the single-provider read. The async repository and the
 * SQLite-only synchronous helpers share these private operations. The database is
 * resolved at call time so reset/restore never leaves a captured handle. SQL text is
 * unchanged from the pre-repository module.
 */

import {
  maskApiKey,
  type CloudAgentCredential,
  type CloudAgentCredentialRepository,
  type CloudAgentCredentialSummary,
} from "@/domain/persistence/cloudAgentCredentialRepository";
import { getDbInstance } from "../core";
import { decrypt, encrypt } from "../encryption";

interface CredentialRow {
  provider_id: string;
  api_key_encrypted: string;
  base_url: string | null;
  updated_at: string;
}

function findCredential(providerId: string): CloudAgentCredential | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT api_key_encrypted, base_url FROM cloud_agent_credentials WHERE provider_id = ?"
    )
    .get(providerId) as Pick<CredentialRow, "api_key_encrypted" | "base_url"> | undefined;

  if (!row) return null;

  const decryptedKey = decrypt(row.api_key_encrypted);
  if (!decryptedKey) return null;

  const creds: CloudAgentCredential = { apiKey: decryptedKey };
  if (row.base_url) creds.baseUrl = row.base_url;
  return creds;
}

function listMaskedCredentials(): CloudAgentCredentialSummary[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT provider_id, api_key_encrypted, base_url, updated_at FROM cloud_agent_credentials"
    )
    .all() as CredentialRow[];

  return rows.map((row) => {
    const decrypted = decrypt(row.api_key_encrypted) ?? "";
    return {
      providerId: row.provider_id,
      apiKey: maskApiKey(decrypted),
      baseUrl: row.base_url,
      updatedAt: row.updated_at,
    };
  });
}

function saveCredential(providerId: string, apiKey: string, baseUrl?: string): void {
  const encrypted = encrypt(apiKey);
  if (!encrypted) throw new Error("Failed to encrypt API key");

  const db = getDbInstance();
  db.prepare(
    `INSERT INTO cloud_agent_credentials (provider_id, api_key_encrypted, base_url, updated_at)
     VALUES (@providerId, @apiKey, @baseUrl, datetime('now'))
     ON CONFLICT(provider_id) DO UPDATE SET
       api_key_encrypted = excluded.api_key_encrypted,
       base_url = excluded.base_url,
       updated_at = excluded.updated_at`
  ).run({ providerId, apiKey: encrypted, baseUrl: baseUrl ?? null });
}

function deleteCredential(providerId: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM cloud_agent_credentials WHERE provider_id = ?").run(providerId);
}

export const sqliteCloudAgentCredentialRepository: CloudAgentCredentialRepository = {
  findByProviderId: async (providerId) => findCredential(providerId),
  listMasked: async () => listMaskedCredentials(),
  save: async (providerId, apiKey, baseUrl) => saveCredential(providerId, apiKey, baseUrl),
  delete: async (providerId) => deleteCredential(providerId),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract: the
 * credential and health routes read and write credentials without awaiting.
 */
export const sqliteCloudAgentCredentialLegacySync = {
  findByProviderId: findCredential,
  listMasked: listMaskedCredentials,
  save: saveCredential,
  delete: deleteCredential,
};
