/**
 * SQLite implementation of exclusive connection leases (`exclusive_connection_leases`,
 * migration 157: partial unique indexes on ACTIVE owner and ACTIVE connection).
 *
 * SQL text, statement order, `BEGIN IMMEDIATE` boundaries, lazy expiry and the
 * unique-violation mapping are unchanged from the pre-repository module
 * (db/exclusiveConnectionLeases.ts). The database is resolved at call time so a
 * reset/restore never leaves a captured handle.
 *
 * Async repositories and the SQLite-only legacy helpers share these private
 * operations. Owner ids arrive already hashed; validating and hashing the raw
 * owner id stays in db/exclusiveConnectionLeases.ts.
 */

import type {
  ExclusiveConnectionLease,
  ExclusiveConnectionLeaseRepository,
  ExclusiveLeaseConflict,
  ExclusiveLeaseEndReason,
  ExclusiveLeaseFenceResult,
  ExclusiveLeaseOccupancy,
  ExclusiveLeaseState,
  ExclusiveLeaseStatus,
  ExclusiveLeaseSuccess,
  ExclusiveLeaseUpdateResult,
} from "@/domain/persistence/exclusiveConnectionLeaseRepository";
import { getDbInstance, rowToCamel } from "../core";

const DEFAULT_EXCLUSIVE_LEASE_TTL_MS = 120_000;
const MIN_EXCLUSIVE_LEASE_TTL_MS = 1_000;
const MAX_EXCLUSIVE_LEASE_TTL_MS = 1_800_000;

type LeaseRow = {
  id: number;
  api_key_id: string;
  provider: string;
  connection_id: string;
  generation: number;
  state: ExclusiveLeaseState;
  expires_at: string;
};
type LeaseStatusRow = LeaseRow & {
  connection_provider: string;
  connection_auth_type: string | null;
  connection_name: string | null;
  connection_email: string | null;
  connection_display_name: string | null;
};
type Fenced = { ownerHash: string; generation: number; apiKeyId: string; now?: string };

const database = () => getDbInstance();
const ACTIVE_SQL = "SELECT * FROM exclusive_connection_leases WHERE state = 'ACTIVE' AND ";
// Projection, not a cast: joined SELECTs (the status query) carry connection_*
// identity columns (email/display name) that must never escape on the lease object.
const lease = (row: LeaseRow): ExclusiveConnectionLease => {
  const camel = rowToCamel(row) as ExclusiveConnectionLease;
  return {
    id: camel.id,
    leaseOwnerHash: camel.leaseOwnerHash,
    apiKeyId: camel.apiKeyId,
    provider: camel.provider,
    connectionId: camel.connectionId,
    generation: camel.generation,
    state: camel.state,
    acquiredAt: camel.acquiredAt,
    renewedAt: camel.renewedAt,
    expiresAt: camel.expiresAt,
    endedAt: camel.endedAt,
    endReason: camel.endReason,
  };
};
function timestamp(value?: string): string {
  const parsed = Date.parse(value ?? new Date().toISOString());
  if (!Number.isFinite(parsed)) throw new Error("now must be a valid ISO timestamp");
  return new Date(parsed).toISOString();
}
function expiry(now: string, ttlMs?: number): string {
  const ttl = Math.min(
    MAX_EXCLUSIVE_LEASE_TTL_MS,
    Math.max(MIN_EXCLUSIVE_LEASE_TTL_MS, ttlMs ?? DEFAULT_EXCLUSIVE_LEASE_TTL_MS)
  );
  return new Date(Date.parse(now) + ttl).toISOString();
}

function immediate<T>(operation: () => T): T {
  let result: T | undefined;
  database().immediate(() => (result = operation()));
  if (result === undefined) throw new Error("lease transaction did not produce a result");
  return result;
}

function expire(now: string): number {
  return database()
    .prepare(
      `UPDATE exclusive_connection_leases
       SET state = 'EXPIRED', ended_at = ?, end_reason = 'TTL_EXPIRED'
       WHERE state = 'ACTIVE' AND expires_at <= ?`
    )
    .run(now, now).changes;
}
function active(column: "lease_owner_hash" | "connection_id", value: string) {
  return database().prepare(`${ACTIVE_SQL}${column} = ?`).get(value) as LeaseRow | undefined;
}

function configuredConnectionName(row: LeaseStatusRow): string | null {
  const name = row.connection_name?.trim();
  if (!name || name.includes("@")) return null;

  if (row.connection_auth_type === "oauth" || row.connection_auth_type === "access_token") {
    const normalized = name.toLowerCase();
    const generatedFallbacks = [row.connection_email, row.connection_display_name]
      .map((value) => value?.trim().toLowerCase())
      .filter((value): value is string => Boolean(value));
    if (generatedFallbacks.includes(normalized)) return null;
  }

  return name;
}

function historical(ownerHash: string, generation: number) {
  return database()
    .prepare(
      `SELECT * FROM exclusive_connection_leases
       WHERE lease_owner_hash = ? AND generation = ? ORDER BY id DESC LIMIT 1`
    )
    .get(ownerHash, generation) as LeaseRow | undefined;
}

function nextGeneration(ownerHash: string): number {
  const row = database()
    .prepare(
      "SELECT COALESCE(MAX(generation), 0) AS generation FROM exclusive_connection_leases WHERE lease_owner_hash = ?"
    )
    .get(ownerHash) as { generation: number };
  const generation = Number(row.generation) + 1;
  if (!Number.isSafeInteger(generation) || generation <= 0)
    throw new Error("lease generation exhausted");
  return generation;
}

function insert(input: {
  ownerHash: string;
  apiKeyId: string;
  provider: string;
  connectionId: string;
  generation: number;
  now: string;
  ttlMs?: number;
}): ExclusiveConnectionLease {
  const result = database()
    .prepare(
      `INSERT INTO exclusive_connection_leases
       (lease_owner_hash, api_key_id, provider, connection_id, generation, state,
        acquired_at, renewed_at, expires_at)
       VALUES (?, ?, ?, ?, ?, 'ACTIVE', ?, ?, ?)`
    )
    .run(
      input.ownerHash,
      input.apiKeyId,
      input.provider,
      input.connectionId,
      input.generation,
      input.now,
      input.now,
      expiry(input.now, input.ttlMs)
    );
  return lease(
    database()
      .prepare("SELECT * FROM exclusive_connection_leases WHERE id = ?")
      .get(result.lastInsertRowid) as LeaseRow
  );
}

/** SQLite's unique-violation signal on the two ACTIVE indexes (migration 157). */
function isLeaseConflict(error: unknown): boolean {
  return (
    error instanceof Error &&
    (/UNIQUE constraint failed: exclusive_connection_leases\.(connection_id|lease_owner_hash)/i.test(
      error.message
    ) ||
      /idx_exclusive_lease_active_(connection|owner)/i.test(error.message))
  );
}

function conflict(ownerHash: string, connectionId: string): ExclusiveLeaseConflict {
  const owner = active("lease_owner_hash", ownerHash);
  return owner
    ? { kind: "OWNER_ALREADY_ACTIVE", lease: lease(owner) }
    : {
        kind: "CONNECTION_BUSY",
        retryAfter: active("connection_id", connectionId)?.expires_at ?? null,
      };
}

function update<T extends string>(input: {
  ownerHash: string;
  generation: number;
  now: string;
  kind: T;
  sql: string;
  args: unknown[];
  accept?: (row: LeaseRow | undefined) => boolean;
}): ExclusiveLeaseUpdateResult<T> {
  return immediate(() => {
    expire(input.now);
    const changed =
      database()
        .prepare(input.sql)
        .run(...input.args).changes === 1;
    const row = historical(input.ownerHash, input.generation);
    return changed || input.accept?.(row)
      ? { kind: input.kind, lease: lease(row!) }
      : { kind: "STALE" };
  });
}

function reconcileExpired(now?: string): number {
  return immediate(() => expire(timestamp(now)));
}

function getStatus(input: Fenced): ExclusiveLeaseStatus | null {
  const now = timestamp(input.now);
  return immediate(() => {
    expire(now);
    const row = database()
      .prepare(
        `SELECT leases.*, connections.provider AS connection_provider,
                connections.auth_type AS connection_auth_type,
                connections.name AS connection_name,
                connections.email AS connection_email,
                connections.display_name AS connection_display_name
         FROM exclusive_connection_leases leases
         INNER JOIN provider_connections connections ON connections.id = leases.connection_id
         WHERE leases.lease_owner_hash = ? AND leases.api_key_id = ?
           AND leases.generation = ? AND leases.state = 'ACTIVE' AND leases.expires_at > ?
         LIMIT 1`
      )
      .get(input.ownerHash, input.apiKeyId, input.generation, now) as LeaseStatusRow | undefined;
    return row
      ? {
          lease: lease(row),
          provider: row.connection_provider,
          connectionName: configuredConnectionName(row),
        }
      : null;
  });
}

function acquire(input: {
  ownerHash: string;
  apiKeyId: string;
  provider: string;
  connectionId: string;
  now?: string;
  ttlMs?: number;
}): ExclusiveLeaseSuccess | ExclusiveLeaseConflict {
  const { ownerHash } = input;
  const now = timestamp(input.now);
  try {
    return immediate(() => {
      expire(now);
      const owner = active("lease_owner_hash", ownerHash);
      if (owner) {
        if (owner.api_key_id !== input.apiKeyId || owner.connection_id !== input.connectionId) {
          return { kind: "OWNER_ALREADY_ACTIVE", lease: lease(owner) };
        }
        database()
          .prepare(
            `UPDATE exclusive_connection_leases SET renewed_at = ?, expires_at = ?,
             provider = ? WHERE id = ? AND state = 'ACTIVE' AND api_key_id = ?`
          )
          .run(now, expiry(now, input.ttlMs), input.provider, owner.id, input.apiKeyId);
        return { kind: "REUSED", lease: lease(active("lease_owner_hash", ownerHash)!) };
      }
      const occupied = active("connection_id", input.connectionId);
      if (occupied) return { kind: "CONNECTION_BUSY", retryAfter: occupied.expires_at };
      return {
        kind: "ACQUIRED",
        lease: insert({
          ...input,
          ownerHash,
          generation: nextGeneration(ownerHash),
          now,
        }),
      };
    });
  } catch (error) {
    if (!isLeaseConflict(error)) throw error;
    return conflict(ownerHash, input.connectionId);
  }
}

function transition(
  input: Fenced & {
    provider: string;
    connectionId: string;
    reason: ExclusiveLeaseEndReason;
    ttlMs?: number;
  }
): ExclusiveLeaseSuccess | ExclusiveLeaseConflict | { kind: "STALE" } {
  const { ownerHash } = input;
  const now = timestamp(input.now);
  try {
    return immediate(() => {
      expire(now);
      const owner = active("lease_owner_hash", ownerHash);
      if (!owner || owner.generation !== input.generation || owner.api_key_id !== input.apiKeyId)
        return { kind: "STALE" };
      if (owner.connection_id === input.connectionId) {
        return { kind: "REUSED", lease: lease(owner) };
      }
      const occupied = active("connection_id", input.connectionId);
      if (occupied) return { kind: "CONNECTION_BUSY", retryAfter: occupied.expires_at };
      database()
        .prepare(
          `UPDATE exclusive_connection_leases SET state = 'INVALIDATED', ended_at = ?,
           end_reason = ? WHERE id = ? AND state = 'ACTIVE'`
        )
        .run(now, input.reason, owner.id);
      return { kind: "TRANSITIONED", lease: insert({ ...input, ownerHash, now }) };
    });
  } catch (error) {
    if (!isLeaseConflict(error)) throw error;
    return conflict(ownerHash, input.connectionId);
  }
}

function invalidate(
  input: Fenced & { reason: ExclusiveLeaseEndReason }
): ExclusiveLeaseUpdateResult<"INVALIDATED"> {
  const { ownerHash } = input;
  const now = timestamp(input.now);
  return update({
    ownerHash,
    generation: input.generation,
    now,
    kind: "INVALIDATED",
    sql: `UPDATE exclusive_connection_leases SET state = 'INVALIDATED', ended_at = ?, end_reason = ?
          WHERE lease_owner_hash = ? AND generation = ? AND api_key_id = ?
          AND state = 'ACTIVE' AND expires_at > ?`,
    args: [now, input.reason, ownerHash, input.generation, input.apiKeyId, now],
  });
}

function renew(input: Fenced & { ttlMs?: number }): ExclusiveLeaseUpdateResult<"RENEWED"> {
  const { ownerHash } = input;
  const now = timestamp(input.now);
  return update({
    ownerHash,
    generation: input.generation,
    now,
    kind: "RENEWED",
    sql: `UPDATE exclusive_connection_leases SET renewed_at = ?, expires_at = ?
          WHERE lease_owner_hash = ? AND generation = ? AND api_key_id = ?
          AND state = 'ACTIVE' AND expires_at > ?`,
    args: [now, expiry(now, input.ttlMs), ownerHash, input.generation, input.apiKeyId, now],
  });
}

function release(
  input: Fenced & { reason?: "OWNER_EXIT" | "CLIENT_CANCELLED" }
): ExclusiveLeaseUpdateResult<"RELEASED"> {
  const { ownerHash } = input;
  const now = timestamp(input.now);
  return update({
    ownerHash,
    generation: input.generation,
    now,
    kind: "RELEASED",
    sql: `UPDATE exclusive_connection_leases SET state = 'RELEASED', ended_at = ?, end_reason = ?
          WHERE lease_owner_hash = ? AND generation = ? AND api_key_id = ?
          AND state = 'ACTIVE' AND expires_at > ?`,
    args: [now, input.reason ?? "OWNER_EXIT", ownerHash, input.generation, input.apiKeyId, now],
    accept: (row) => row?.state === "RELEASED" && row.api_key_id === input.apiKeyId,
  });
}

function checkFence(input: Fenced & { connectionId: string }): ExclusiveLeaseFenceResult {
  reconcileExpired(input.now);
  const row = active("lease_owner_hash", input.ownerHash);
  if (!row) return { kind: "REQUIRED" };
  if (row.generation !== input.generation) return { kind: "STALE" };
  const current = lease(row);
  if (row.api_key_id !== input.apiKeyId) return { kind: "AUTHORIZATION_MISMATCH", lease: current };
  return row.connection_id === input.connectionId
    ? { kind: "VALID", lease: current }
    : { kind: "CONNECTION_MISMATCH", lease: current };
}

function findActiveByOwner(ownerHash: string, now?: string): ExclusiveConnectionLease | null {
  reconcileExpired(now);
  const row = active("lease_owner_hash", ownerHash);
  return row ? lease(row) : null;
}

function occupancy(connectionIds: readonly string[], now?: string): ExclusiveLeaseOccupancy {
  reconcileExpired(now);
  if (connectionIds.length === 0) return new Map();
  const rows = database()
    .prepare(
      `SELECT connection_id, lease_owner_hash, expires_at FROM exclusive_connection_leases
       WHERE state = 'ACTIVE' AND connection_id IN (${connectionIds.map(() => "?").join(", ")})`
    )
    .all(...connectionIds) as Array<{
    connection_id: string;
    lease_owner_hash: string;
    expires_at: string;
  }>;
  return new Map(
    rows.map((row) => [
      row.connection_id,
      { leaseOwnerHash: row.lease_owner_hash, expiresAt: row.expires_at },
    ])
  );
}

function isConnectionActivelyLeased(connectionId: string, now?: string): boolean {
  if (!connectionId) return false;
  reconcileExpired(now);
  return active("connection_id", connectionId) !== undefined;
}

/** The Promise contract names the owner hash `leaseOwnerHash`; the core calls it `ownerHash`. */
const fenced = <T extends { leaseOwnerHash: string }>(input: T) => ({
  ...input,
  ownerHash: input.leaseOwnerHash,
});

export const sqliteExclusiveConnectionLeaseRepository: ExclusiveConnectionLeaseRepository = {
  reconcileExpired: async (now) => reconcileExpired(now),
  getStatus: async (input) => getStatus(fenced(input)),
  acquire: async (input) => acquire(fenced(input)),
  transition: async (input) => transition(fenced(input)),
  invalidate: async (input) => invalidate(fenced(input)),
  renew: async (input) => renew(fenced(input)),
  release: async (input) => release(fenced(input)),
  checkFence: async (input) => checkFence(fenced(input)),
  findActiveByOwner: async (leaseOwnerHash, now) => findActiveByOwner(leaseOwnerHash, now),
  occupancy: async (connectionIds, now) => occupancy(connectionIds, now),
  isConnectionActivelyLeased: async (connectionId, now) =>
    isConnectionActivelyLeased(connectionId, now),
};

/**
 * Synchronous compatibility is SQLite-only, not part of the portable contract:
 * the routing, fence and auth paths read and write leases synchronously.
 */
export const sqliteExclusiveConnectionLeaseLegacySync = {
  reconcileExpired,
  getStatus,
  acquire,
  transition,
  invalidate,
  renew,
  release,
  checkFence,
  findActiveByOwner,
  occupancy,
  isConnectionActivelyLeased,
};
