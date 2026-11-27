import { createHash } from "node:crypto";

import type {
  ExclusiveConnectionLease,
  ExclusiveConnectionLeaseRepository,
  ExclusiveLeaseConflict,
  ExclusiveLeaseEndReason,
  ExclusiveLeaseFenceResult,
  ExclusiveLeaseOccupancy,
  ExclusiveLeaseStatus,
  ExclusiveLeaseSuccess,
  ExclusiveLeaseUpdateResult,
} from "@/domain/persistence/exclusiveConnectionLeaseRepository";
import { exclusiveConnectionLeaseRepositories } from "./repositories/exclusiveConnectionLeaseRepositories";

export type {
  ExclusiveConnectionLease,
  ExclusiveLeaseEndReason,
} from "@/domain/persistence/exclusiveConnectionLeaseRepository";

export const LEASE_OWNER_PATTERN = /^vlo_[A-Za-z0-9_-]{43}$/;

/**
 * Lease storage lives behind ExclusiveConnectionLeaseRepository. The exports
 * below stay synchronous (SQLite-only legacy access) because the routing, fence
 * and auth paths call them without awaiting. Raw owner ids are validated and
 * hashed here; the store only sees the hash.
 */
const leases = exclusiveConnectionLeaseRepositories.legacySync;

/** Async lease storage contract. */
export function getExclusiveConnectionLeaseRepository(): ExclusiveConnectionLeaseRepository {
  return exclusiveConnectionLeaseRepositories.leases;
}

export function hashLeaseOwnerId(leaseOwnerId: string): string {
  if (!LEASE_OWNER_PATTERN.test(leaseOwnerId))
    throw new Error("lease owner must use the canonical vlo_ base64url format");
  return createHash("sha256").update(leaseOwnerId).digest("hex");
}

export function reconcileExpiredExclusiveConnectionLeases(now?: string): number {
  return leases.reconcileExpired(now);
}

export function getExclusiveConnectionLeaseStatus(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  now?: string;
}): ExclusiveLeaseStatus | null {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.getStatus({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    now: input.now,
  });
}

export function acquireExclusiveConnectionLease(input: {
  leaseOwnerId: string;
  apiKeyId: string;
  provider: string;
  connectionId: string;
  now?: string;
  ttlMs?: number;
}): ExclusiveLeaseSuccess | ExclusiveLeaseConflict {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.acquire({
    ownerHash,
    apiKeyId: input.apiKeyId,
    provider: input.provider,
    connectionId: input.connectionId,
    now: input.now,
    ttlMs: input.ttlMs,
  });
}

export function transitionExclusiveConnectionLease(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  provider: string;
  connectionId: string;
  reason: ExclusiveLeaseEndReason;
  now?: string;
  ttlMs?: number;
}): ExclusiveLeaseSuccess | ExclusiveLeaseConflict | { kind: "STALE" } {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.transition({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    provider: input.provider,
    connectionId: input.connectionId,
    reason: input.reason,
    now: input.now,
    ttlMs: input.ttlMs,
  });
}

export function invalidateExclusiveConnectionLease(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  reason: ExclusiveLeaseEndReason;
  now?: string;
}): ExclusiveLeaseUpdateResult<"INVALIDATED"> {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.invalidate({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    reason: input.reason,
    now: input.now,
  });
}

export function renewExclusiveConnectionLease(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  now?: string;
  ttlMs?: number;
}): ExclusiveLeaseUpdateResult<"RENEWED"> {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.renew({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    now: input.now,
    ttlMs: input.ttlMs,
  });
}

export function releaseExclusiveConnectionLease(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  reason?: "OWNER_EXIT" | "CLIENT_CANCELLED";
  now?: string;
}): ExclusiveLeaseUpdateResult<"RELEASED"> {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.release({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    reason: input.reason,
    now: input.now,
  });
}

export function assertExclusiveConnectionLeaseFence(input: {
  leaseOwnerId: string;
  generation: number;
  apiKeyId: string;
  connectionId: string;
  now?: string;
}): ExclusiveLeaseFenceResult {
  const ownerHash = hashLeaseOwnerId(input.leaseOwnerId);
  return leases.checkFence({
    ownerHash,
    generation: input.generation,
    apiKeyId: input.apiKeyId,
    connectionId: input.connectionId,
    now: input.now,
  });
}

export function getActiveExclusiveConnectionLease(
  leaseOwnerId: string,
  now?: string
): ExclusiveConnectionLease | null {
  const ownerHash = hashLeaseOwnerId(leaseOwnerId);
  return leases.findActiveByOwner(ownerHash, now);
}

export function getExclusiveLeaseOccupancy(
  connectionIds: readonly string[],
  now?: string
): ExclusiveLeaseOccupancy {
  return leases.occupancy(connectionIds, now);
}

export function isExclusiveConnectionActivelyLeased(connectionId: string, now?: string): boolean {
  return leases.isConnectionActivelyLeased(connectionId, now);
}
