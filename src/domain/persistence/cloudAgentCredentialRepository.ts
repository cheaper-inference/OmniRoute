// ── Cloud agent credentials (one API key per cloud coding-agent provider) ────

/** A decrypted credential as handed to a cloud agent client. */
export interface CloudAgentCredential {
  apiKey: string;
  /** Present only when a non-empty base URL is stored. */
  baseUrl?: string;
}

/** A listed credential: the key is masked, the other columns are returned as stored. */
export interface CloudAgentCredentialSummary {
  providerId: string;
  apiKey: string;
  baseUrl: string | null;
  updatedAt: string;
}

/** Mask an API key for display — last 4 characters only; 4 or fewer → "****". */
export function maskApiKey(key: string): string {
  if (!key || key.length <= 4) return "****";
  return "****" + key.slice(-4);
}

/**
 * Persistence of cloud agent credentials. Encryption at rest is owned by the
 * implementation: keys are encrypted before they are written and decrypted when read,
 * and plaintext keys are only returned by `findByProviderId`. Listing masks keys.
 */
export interface CloudAgentCredentialRepository {
  /** Decrypted credential, or null when absent or when the stored key cannot be decrypted. */
  findByProviderId(providerId: string): Promise<CloudAgentCredential | null>;
  /** Every stored credential with its key masked (undecryptable keys mask to "****"). */
  listMasked(): Promise<CloudAgentCredentialSummary[]>;
  /**
   * Encrypts and upserts the key; an omitted base URL is stored as null. Rejects without
   * writing when the key cannot be encrypted.
   */
  save(providerId: string, apiKey: string, baseUrl?: string): Promise<void>;
  /** Deletes the provider's credential; unknown ids are a no-op. */
  delete(providerId: string): Promise<void>;
}
