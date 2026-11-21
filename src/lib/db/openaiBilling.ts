import { getDbInstance } from "./core";
import { encrypt, decrypt, looksEncrypted } from "./encryption";

const NAMESPACE = "openai-billing";
export const OPENAI_ORGANIZATION_ID = /^org-[A-Za-z0-9_-]{1,120}$/;

/** Separate from inference credentials and cost ledgers; one credential per organization. */
export function listOpenAIBillingOrganizations(): string[] {
  return (
    getDbInstance()
      .prepare("SELECT key FROM key_value WHERE namespace = ? ORDER BY key")
      .all(NAMESPACE) as { key: string }[]
  ).map((row) => row.key);
}

export function getOpenAIBillingKey(organizationId: string): string | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, organizationId) as { value: string } | undefined;
  if (!row) return null;
  const value: unknown = JSON.parse(row.value);
  if (typeof value !== "string" || !looksEncrypted(value))
    throw new Error("Invalid billing credential storage");
  const key = decrypt(value);
  if (!key) throw new Error("Billing credential could not be decrypted");
  return key;
}

export function saveOpenAIBillingKey(organizationId: string, key: string): void {
  if (!OPENAI_ORGANIZATION_ID.test(organizationId)) throw new Error("Invalid organization ID");
  const encrypted = encrypt(key);
  // Admin credentials must never use the development plaintext fallback.
  if (!looksEncrypted(encrypted)) throw new Error("Storage encryption must be configured");
  getDbInstance()
    .prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?) ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
    )
    .run(NAMESPACE, organizationId, JSON.stringify(encrypted));
}

export function deleteOpenAIBillingKey(organizationId: string): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(NAMESPACE, organizationId);
}
