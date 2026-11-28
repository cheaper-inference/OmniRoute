/**
 * Exclusive connection leases: at most one ACTIVE lease per owner and at most
 * one ACTIVE lease per provider connection, fenced by a per-owner generation.
 *
 * Every operation first expires ACTIVE leases whose `expiresAt <= now` (lazy
 * reclaim), then works on what is left. Conflicts are returned as result kinds,
 * never thrown: a store must map its own unique-violation signal on the two
 * ACTIVE indexes to `CONNECTION_BUSY` / `OWNER_ALREADY_ACTIVE`. Any other
 * storage failure rejects. (The SQLite store keeps its historical detection by
 * error message text, so an abort whose message names those indexes is also
 * treated as a conflict; a network store should use the driver's structured
 * constraint name instead.)
 *
 * Owners are identified only by `leaseOwnerHash`; the raw owner id never
 * reaches the store. `now` is an ISO timestamp; when omitted the store uses its
 * own clock. `ttlMs` is clamped to 1 s .. 30 min and defaults to 120 s.
 */

export type ExclusiveLeaseState = "ACTIVE" | "RELEASED" | "EXPIRED" | "INVALIDATED";

export type ExclusiveLeaseEndReason =
  | "AUTHORIZATION_CHANGED"
  | "CLIENT_CANCELLED"
  | "CONNECTION_INELIGIBLE"
  | "HEALTH_OR_COOLDOWN"
  | "MANAGED_KEY_REVOKED"
  | "MODEL_INELIGIBLE"
  | "OWNER_EXIT"
  | "QUOTA_UNAVAILABLE"
  | "TTL_EXPIRED";

export type ExclusiveConnectionLease = {
  id: number;
  leaseOwnerHash: string;
  apiKeyId: string;
  provider: string;
  connectionId: string;
  generation: number;
  state: ExclusiveLeaseState;
  acquiredAt: string;
  renewedAt: string;
  expiresAt: string;
  endedAt: string | null;
  endReason: string | null;
};

export type ExclusiveLeaseSuccess = {
  kind: "ACQUIRED" | "REUSED" | "TRANSITIONED";
  lease: ExclusiveConnectionLease;
};

export type ExclusiveLeaseConflict =
  | { kind: "CONNECTION_BUSY"; retryAfter: string | null }
  | { kind: "OWNER_ALREADY_ACTIVE"; lease: ExclusiveConnectionLease };

export type ExclusiveLeaseUpdateResult<T extends string> =
  { kind: T; lease: ExclusiveConnectionLease } | { kind: "STALE" };

export type ExclusiveLeaseFenceResult =
  | { kind: "VALID"; lease: ExclusiveConnectionLease }
  | { kind: "AUTHORIZATION_MISMATCH" | "CONNECTION_MISMATCH"; lease: ExclusiveConnectionLease }
  | { kind: "REQUIRED" | "STALE" };

export type ExclusiveLeaseStatus = {
  lease: ExclusiveConnectionLease;
  provider: string;
  /** Operator-configured connection name; null when it is only an account identity. */
  connectionName: string | null;
};

export type ExclusiveLeaseOccupancy = Map<string, { leaseOwnerHash: string; expiresAt: string }>;

type Fenced = { leaseOwnerHash: string; generation: number; apiKeyId: string; now?: string };

export interface ExclusiveConnectionLeaseRepository {
  /** Expire overdue ACTIVE leases; returns how many were expired. */
  reconcileExpired(now?: string): Promise<number>;
  /** Live lease of this exact owner, key and generation, with its connection label. */
  getStatus(input: Fenced): Promise<ExclusiveLeaseStatus | null>;
  /**
   * Same owner, key and connection renews (REUSED); same owner elsewhere is
   * OWNER_ALREADY_ACTIVE; a connection held by another owner is CONNECTION_BUSY;
   * otherwise a new lease with the owner's next generation (ACQUIRED).
   */
  acquire(input: {
    leaseOwnerHash: string;
    apiKeyId: string;
    provider: string;
    connectionId: string;
    now?: string;
    ttlMs?: number;
  }): Promise<ExclusiveLeaseSuccess | ExclusiveLeaseConflict>;
  /**
   * Move the owner's live lease to another connection, keeping its generation.
   * STALE when the owner has no live lease of this generation and key.
   */
  transition(
    input: Fenced & {
      provider: string;
      connectionId: string;
      reason: ExclusiveLeaseEndReason;
      ttlMs?: number;
    }
  ): Promise<ExclusiveLeaseSuccess | ExclusiveLeaseConflict | { kind: "STALE" }>;
  invalidate(
    input: Fenced & { reason: ExclusiveLeaseEndReason }
  ): Promise<ExclusiveLeaseUpdateResult<"INVALIDATED">>;
  renew(input: Fenced & { ttlMs?: number }): Promise<ExclusiveLeaseUpdateResult<"RENEWED">>;
  /** Idempotent: releasing an already RELEASED lease of the same key succeeds again. */
  release(
    input: Fenced & { reason?: "OWNER_EXIT" | "CLIENT_CANCELLED" }
  ): Promise<ExclusiveLeaseUpdateResult<"RELEASED">>;
  checkFence(input: Fenced & { connectionId: string }): Promise<ExclusiveLeaseFenceResult>;
  findActiveByOwner(leaseOwnerHash: string, now?: string): Promise<ExclusiveConnectionLease | null>;
  occupancy(connectionIds: readonly string[], now?: string): Promise<ExclusiveLeaseOccupancy>;
  /** False for an empty connection id, without touching storage. */
  isConnectionActivelyLeased(connectionId: string, now?: string): Promise<boolean>;
}
