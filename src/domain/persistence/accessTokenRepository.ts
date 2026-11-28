// ── CLI access tokens (scoped credentials for remote-mode management) ────────

/**
 * One stored CLI access token exactly as persisted (snake_case columns). Only the
 * SHA-256 hash of the secret is stored. The DB facade owns the camelCase mapping and
 * scope normalization.
 */
export interface AccessTokenRow {
  id: string;
  token_hash: string;
  token_prefix: string;
  name: string;
  scope: string;
  created_at: string;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
}

/** Column values for a new token, already generated, hashed and normalized by the facade. */
export interface AccessTokenInsert {
  id: string;
  tokenHash: string;
  tokenPrefix: string;
  name: string;
  scope: string;
  createdAt: string;
  expiresAt: string | null;
}

/** A row that may be the target of a revoke (matched by id or by display prefix). */
export interface AccessTokenRevokeCandidate {
  id: string;
  revoked_at: string | null;
}

/**
 * Persistence only. The facade owns secret generation and hashing, name and scope
 * rules, expiry checks, the last-used write window (and swallowing a failed stamp),
 * and how a revoke picks its target among id and prefix matches.
 */
export interface AccessTokenRepository {
  insert(token: AccessTokenInsert): Promise<void>;
  findByHash(tokenHash: string): Promise<AccessTokenRow | null>;
  findById(id: string): Promise<AccessTokenRow | null>;
  /** Every token, newest created_at first. */
  list(): Promise<AccessTokenRow[]>;
  /** Writes last_used_at for the token. Rejects when the write fails. */
  touchLastUsed(id: string, lastUsedAt: string): Promise<void>;
  /** Every row whose id or display prefix equals the argument, revoked or not. */
  findRevokeCandidates(idOrPrefix: string): Promise<AccessTokenRevokeCandidate[]>;
  /**
   * Sets revoked_at only while the token is still live. Resolves true when this call
   * revoked it, false when it was already revoked (or does not exist).
   */
  markRevoked(id: string, revokedAt: string): Promise<boolean>;
}
