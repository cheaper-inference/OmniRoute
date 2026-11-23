/**
 * SQLite implementation of the CLI access token store (cli_access_tokens table).
 *
 * The async repository and the SQLite-only synchronous helpers share these private
 * operations. The database is resolved at call time so reset/restore never leaves a
 * captured handle. SQL text is unchanged from the pre-repository module.
 */

import type {
  AccessTokenInsert,
  AccessTokenRepository,
  AccessTokenRevokeCandidate,
  AccessTokenRow,
} from "@/domain/persistence/accessTokenRepository";
import { getDbInstance } from "../core";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

function getDb(): DbLike {
  return getDbInstance() as unknown as DbLike;
}

function insertToken(token: AccessTokenInsert): void {
  getDb()
    .prepare(
      `INSERT INTO cli_access_tokens
       (id, token_hash, token_prefix, name, scope, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      token.id,
      token.tokenHash,
      token.tokenPrefix,
      token.name,
      token.scope,
      token.createdAt,
      token.expiresAt
    );
}

function findTokenByHash(tokenHash: string): AccessTokenRow | null {
  const row = getDb()
    .prepare<AccessTokenRow>("SELECT * FROM cli_access_tokens WHERE token_hash = ?")
    .get(tokenHash);
  return row ?? null;
}

function findTokenById(id: string): AccessTokenRow | null {
  const row = getDb()
    .prepare<AccessTokenRow>("SELECT * FROM cli_access_tokens WHERE id = ?")
    .get(id);
  return row ?? null;
}

function listTokens(): AccessTokenRow[] {
  return getDb()
    .prepare<AccessTokenRow>("SELECT * FROM cli_access_tokens ORDER BY created_at DESC")
    .all();
}

function touchTokenLastUsed(id: string, lastUsedAt: string): void {
  getDb().prepare("UPDATE cli_access_tokens SET last_used_at = ? WHERE id = ?").run(lastUsedAt, id);
}

function findTokenRevokeCandidates(idOrPrefix: string): AccessTokenRevokeCandidate[] {
  return getDb()
    .prepare<AccessTokenRevokeCandidate>(
      `SELECT id, revoked_at FROM cli_access_tokens
         WHERE id = ? OR token_prefix = ?`
    )
    .all(idOrPrefix, idOrPrefix);
}

function markTokenRevoked(id: string, revokedAt: string): boolean {
  const res = getDb()
    .prepare(
      `UPDATE cli_access_tokens SET revoked_at = ?
         WHERE id = ? AND revoked_at IS NULL`
    )
    .run(revokedAt, id);
  return res.changes > 0;
}

export const sqliteAccessTokenRepository: AccessTokenRepository = {
  insert: async (token) => insertToken(token),
  findByHash: async (tokenHash) => findTokenByHash(tokenHash),
  findById: async (id) => findTokenById(id),
  list: async () => listTokens(),
  touchLastUsed: async (id, lastUsedAt) => touchTokenLastUsed(id, lastUsedAt),
  findRevokeCandidates: async (idOrPrefix) => findTokenRevokeCandidates(idOrPrefix),
  markRevoked: async (id, revokedAt) => markTokenRevoked(id, revokedAt),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract:
 * management auth verifies tokens synchronously on every request, and the CLI token
 * routes call the store without awaiting.
 */
export const sqliteAccessTokenLegacySync = {
  insert: insertToken,
  findByHash: findTokenByHash,
  findById: findTokenById,
  list: listTokens,
  touchLastUsed: touchTokenLastUsed,
  findRevokeCandidates: findTokenRevokeCandidates,
  markRevoked: markTokenRevoked,
};
