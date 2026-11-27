/**
 * Characterization of the exclusive connection lease facade
 * (src/lib/db/exclusiveConnectionLeases.ts). Written against the pre-repository
 * module and kept green across the move: exact result objects, stored rows,
 * TTL clamping, lazy expiry, generation fencing, idempotent release and the
 * unique-violation mapping. Only the public facade and the raw table are used,
 * so the same file runs on the base and on the candidate.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "exclusive-leases-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const leases = await import("../../../src/lib/db/exclusiveConnectionLeases.ts");

const A = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const B = "vlo_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
const C = "vlo_CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC";
const HASH_A = leases.hashLeaseOwnerId(A);
const HASH_B = leases.hashLeaseOwnerId(B);

const at = (seconds: number) => new Date(Date.UTC(2026, 10, 28, 3, 0, seconds)).toISOString();
const plus = (iso: string, ms: number) => new Date(Date.parse(iso) + ms).toISOString();

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rows() {
  return core
    .getDbInstance()
    .prepare(
      `SELECT id, lease_owner_hash, api_key_id, provider, connection_id, generation, state,
              acquired_at, renewed_at, expires_at, ended_at, end_reason
       FROM exclusive_connection_leases ORDER BY id`
    )
    .all();
}

function acquire(owner: string, key: string, connectionId: string, now: string, ttlMs?: number) {
  return leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: key,
    provider: "codex",
    connectionId,
    now,
    ...(ttlMs === undefined ? {} : { ttlMs }),
  });
}

test("acquire returns the exact lease object and stores only the owner hash", () => {
  const result = acquire(A, "key-a", "conn-1", at(0));
  assert.deepEqual(result, {
    kind: "ACQUIRED",
    lease: {
      id: 1,
      leaseOwnerHash: HASH_A,
      apiKeyId: "key-a",
      provider: "codex",
      connectionId: "conn-1",
      generation: 1,
      state: "ACTIVE",
      acquiredAt: at(0),
      renewedAt: at(0),
      expiresAt: plus(at(0), 120_000),
      endedAt: null,
      endReason: null,
    },
  });
  assert.deepEqual(rows(), [
    {
      id: 1,
      lease_owner_hash: HASH_A,
      api_key_id: "key-a",
      provider: "codex",
      connection_id: "conn-1",
      generation: 1,
      state: "ACTIVE",
      acquired_at: at(0),
      renewed_at: at(0),
      expires_at: plus(at(0), 120_000),
      ended_at: null,
      end_reason: null,
    },
  ]);
});

test("ttl is clamped to 1 s .. 30 min and defaults to 120 s", () => {
  assert.equal(
    (acquire(A, "k", "c-min", at(0), 10) as { lease: { expiresAt: string } }).lease.expiresAt,
    plus(at(0), 1_000)
  );
  assert.equal(
    (acquire(B, "k", "c-max", at(0), 99_999_999) as { lease: { expiresAt: string } }).lease
      .expiresAt,
    plus(at(0), 1_800_000)
  );
  assert.equal(
    (acquire(C, "k", "c-mid", at(0), 5_000) as { lease: { expiresAt: string } }).lease.expiresAt,
    plus(at(0), 5_000)
  );
});

test("timestamps are normalized and an invalid now throws", () => {
  const result = acquire(A, "key-a", "conn-1", "2026-11-28T11:00:00+08:00");
  assert.equal(result.kind, "ACQUIRED");
  assert.equal((result as { lease: { acquiredAt: string } }).lease.acquiredAt, at(0));
  assert.throws(() => acquire(B, "key-b", "conn-2", "not-a-date"), {
    message: "now must be a valid ISO timestamp",
  });
  assert.throws(() => leases.reconcileExpiredExclusiveConnectionLeases("nope"), {
    message: "now must be a valid ISO timestamp",
  });
});

test("raw owner ids are validated before storage is touched", () => {
  assert.throws(() => acquire("vlo_short", "k", "c", at(0)), {
    message: "lease owner must use the canonical vlo_ base64url format",
  });
  assert.throws(() => leases.getActiveExclusiveConnectionLease("x"), /canonical vlo_/);
  assert.equal(leases.LEASE_OWNER_PATTERN.test(A), true);
  assert.deepEqual(rows(), []);
});

test("same owner, key and connection is REUSED: renews expiry and overwrites provider", () => {
  acquire(A, "key-a", "conn-1", at(0));
  const reused = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: A,
    apiKeyId: "key-a",
    provider: "openai",
    connectionId: "conn-1",
    now: at(30),
    ttlMs: 60_000,
  });
  assert.equal(reused.kind, "REUSED");
  const lease = (reused as { lease: Record<string, unknown> }).lease;
  assert.equal(lease.generation, 1);
  assert.equal(lease.provider, "openai");
  assert.equal(lease.acquiredAt, at(0));
  assert.equal(lease.renewedAt, at(30));
  assert.equal(lease.expiresAt, plus(at(30), 60_000));
  assert.equal(rows().length, 1);
});

test("two owners compete: busy connection reports its expiry, owner elsewhere is OWNER_ALREADY_ACTIVE", () => {
  acquire(A, "key-a", "conn-1", at(0));
  assert.deepEqual(acquire(B, "key-b", "conn-1", at(1)), {
    kind: "CONNECTION_BUSY",
    retryAfter: plus(at(0), 120_000),
  });
  const otherConnection = acquire(A, "key-a", "conn-2", at(2));
  assert.equal(otherConnection.kind, "OWNER_ALREADY_ACTIVE");
  assert.equal(
    (otherConnection as { lease: { connectionId: string } }).lease.connectionId,
    "conn-1"
  );
  const otherKey = acquire(A, "key-x", "conn-1", at(3));
  assert.equal(otherKey.kind, "OWNER_ALREADY_ACTIVE");
  assert.equal(rows().length, 1);
});

test("expiry is lazy and lets another owner take over; the old owner gets a new generation", () => {
  acquire(A, "key-a", "conn-1", at(0), 1_000);
  assert.equal(leases.isExclusiveConnectionActivelyLeased("conn-1", at(0)), true);
  const takeover = acquire(B, "key-b", "conn-1", at(1));
  assert.equal(takeover.kind, "ACQUIRED");
  const [first] = rows() as Array<Record<string, unknown>>;
  assert.equal(first.state, "EXPIRED");
  assert.equal(first.ended_at, at(1));
  assert.equal(first.end_reason, "TTL_EXPIRED");

  leases.releaseExclusiveConnectionLease({
    leaseOwnerId: B,
    generation: 1,
    apiKeyId: "key-b",
    now: at(2),
  });
  const again = acquire(A, "key-a", "conn-1", at(3));
  assert.equal((again as { lease: { generation: number } }).lease.generation, 2);
});

test("reconcile counts expired rows and expires exactly at expires_at", () => {
  acquire(A, "k", "c1", at(0), 1_000);
  acquire(B, "k", "c2", at(0), 5_000);
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(plus(at(0), 999)), 0);
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(plus(at(0), 1_000)), 1);
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(at(10)), 1);
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(at(11)), 0);
});

test("renew, release and invalidate are fenced by generation and key, and STALE after expiry", () => {
  acquire(A, "key-a", "conn-1", at(0), 10_000);
  const fence = { leaseOwnerId: A, apiKeyId: "key-a" };
  assert.deepEqual(leases.renewExclusiveConnectionLease({ ...fence, generation: 2, now: at(1) }), {
    kind: "STALE",
  });
  assert.deepEqual(
    leases.renewExclusiveConnectionLease({
      ...fence,
      apiKeyId: "key-x",
      generation: 1,
      now: at(1),
    }),
    { kind: "STALE" }
  );
  const renewed = leases.renewExclusiveConnectionLease({
    ...fence,
    generation: 1,
    now: at(2),
    ttlMs: 3_000,
  });
  assert.equal(renewed.kind, "RENEWED");
  assert.equal((renewed as { lease: { expiresAt: string } }).lease.expiresAt, plus(at(2), 3_000));

  assert.deepEqual(
    leases.invalidateExclusiveConnectionLease({
      ...fence,
      generation: 1,
      reason: "QUOTA_UNAVAILABLE",
      now: at(5),
    }),
    { kind: "STALE" },
    "expired at 00:05 exactly, so the fenced update finds nothing"
  );
  const [row] = rows() as Array<Record<string, unknown>>;
  assert.equal(row.state, "EXPIRED");
});

test("release is idempotent for the same key and STALE for another key; reason defaults to OWNER_EXIT", () => {
  acquire(A, "key-a", "conn-1", at(0));
  const first = leases.releaseExclusiveConnectionLease({
    leaseOwnerId: A,
    generation: 1,
    apiKeyId: "key-a",
    now: at(1),
  });
  assert.equal(first.kind, "RELEASED");
  assert.equal((first as { lease: { endReason: string } }).lease.endReason, "OWNER_EXIT");
  const second = leases.releaseExclusiveConnectionLease({
    leaseOwnerId: A,
    generation: 1,
    apiKeyId: "key-a",
    reason: "CLIENT_CANCELLED",
    now: at(2),
  });
  assert.deepEqual(second, first);
  assert.deepEqual(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: A,
      generation: 1,
      apiKeyId: "key-b",
      now: at(3),
    }),
    { kind: "STALE" }
  );
});

test("release stores the caller's reason", () => {
  acquire(A, "key-a", "conn-1", at(0));
  const released = leases.releaseExclusiveConnectionLease({
    leaseOwnerId: A,
    generation: 1,
    apiKeyId: "key-a",
    reason: "CLIENT_CANCELLED",
    now: at(1),
  });
  assert.equal((released as { lease: { endReason: string } }).lease.endReason, "CLIENT_CANCELLED");
});

test("invalidate ends the exact generation with its reason", () => {
  acquire(A, "key-a", "conn-1", at(0));
  const result = leases.invalidateExclusiveConnectionLease({
    leaseOwnerId: A,
    generation: 1,
    apiKeyId: "key-a",
    reason: "MANAGED_KEY_REVOKED",
    now: at(1),
  });
  assert.equal(result.kind, "INVALIDATED");
  const lease = (result as { lease: Record<string, unknown> }).lease;
  assert.equal(lease.state, "INVALIDATED");
  assert.equal(lease.endReason, "MANAGED_KEY_REVOKED");
  assert.equal(lease.endedAt, at(1));
  assert.equal(leases.getActiveExclusiveConnectionLease(A, at(2)), null);
});

test("transition keeps the generation, ends the old row and respects a busy target", () => {
  acquire(A, "key-a", "conn-1", at(0));
  acquire(B, "key-b", "conn-busy", at(0));
  const base = {
    leaseOwnerId: A,
    apiKeyId: "key-a",
    provider: "codex",
    reason: "HEALTH_OR_COOLDOWN" as const,
  };
  assert.deepEqual(
    leases.transitionExclusiveConnectionLease({
      ...base,
      generation: 9,
      connectionId: "conn-2",
      now: at(1),
    }),
    { kind: "STALE" }
  );
  assert.deepEqual(
    leases.transitionExclusiveConnectionLease({
      ...base,
      apiKeyId: "key-foreign",
      generation: 1,
      connectionId: "conn-2",
      now: at(1),
    }),
    { kind: "STALE" }
  );
  const same = leases.transitionExclusiveConnectionLease({
    ...base,
    generation: 1,
    connectionId: "conn-1",
    now: at(1),
  });
  assert.equal(same.kind, "REUSED");
  assert.equal((same as { lease: { renewedAt: string } }).lease.renewedAt, at(0), "no renewal");
  assert.deepEqual(
    leases.transitionExclusiveConnectionLease({
      ...base,
      generation: 1,
      connectionId: "conn-busy",
      now: at(2),
    }),
    { kind: "CONNECTION_BUSY", retryAfter: plus(at(0), 120_000) }
  );
  const moved = leases.transitionExclusiveConnectionLease({
    ...base,
    generation: 1,
    connectionId: "conn-2",
    now: at(3),
    ttlMs: 2_000,
  });
  assert.equal(moved.kind, "TRANSITIONED");
  const lease = (moved as { lease: Record<string, unknown> }).lease;
  assert.equal(lease.generation, 1);
  assert.equal(lease.connectionId, "conn-2");
  assert.equal(lease.acquiredAt, at(3));
  assert.equal(lease.expiresAt, plus(at(3), 2_000));
  const old = (rows() as Array<Record<string, unknown>>)[0];
  assert.equal(old.state, "INVALIDATED");
  assert.equal(old.end_reason, "HEALTH_OR_COOLDOWN");
  assert.equal(old.ended_at, at(3));
});

test("fence results: REQUIRED, STALE, AUTHORIZATION_MISMATCH, CONNECTION_MISMATCH, VALID", () => {
  const input = { leaseOwnerId: A, generation: 1, apiKeyId: "key-a", connectionId: "conn-1" };
  assert.deepEqual(leases.assertExclusiveConnectionLeaseFence({ ...input, now: at(0) }), {
    kind: "REQUIRED",
  });
  acquire(A, "key-a", "conn-1", at(0), 5_000);
  assert.deepEqual(
    leases.assertExclusiveConnectionLeaseFence({ ...input, generation: 2, now: at(1) }),
    { kind: "STALE" }
  );
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({ ...input, apiKeyId: "key-x", now: at(1) }).kind,
    "AUTHORIZATION_MISMATCH"
  );
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({ ...input, connectionId: "conn-x", now: at(1) })
      .kind,
    "CONNECTION_MISMATCH"
  );
  const valid = leases.assertExclusiveConnectionLeaseFence({ ...input, now: at(1) });
  assert.equal(valid.kind, "VALID");
  assert.equal((valid as { lease: { leaseOwnerHash: string } }).lease.leaseOwnerHash, HASH_A);
  assert.deepEqual(leases.assertExclusiveConnectionLeaseFence({ ...input, now: at(5) }), {
    kind: "REQUIRED",
  });
});

test("occupancy maps only ACTIVE leases of the asked connections and reconciles first", () => {
  acquire(A, "k", "conn-1", at(0));
  acquire(B, "k", "conn-2", at(0), 1_000);
  assert.deepEqual(leases.getExclusiveLeaseOccupancy([], at(0)), new Map());
  assert.deepEqual(
    leases.getExclusiveLeaseOccupancy(["conn-1", "conn-2", "conn-3"], at(0)),
    new Map([
      ["conn-1", { leaseOwnerHash: HASH_A, expiresAt: plus(at(0), 120_000) }],
      ["conn-2", { leaseOwnerHash: HASH_B, expiresAt: plus(at(0), 1_000) }],
    ])
  );
  assert.deepEqual(
    leases.getExclusiveLeaseOccupancy(["conn-1", "conn-2"], at(1)),
    new Map([["conn-1", { leaseOwnerHash: HASH_A, expiresAt: plus(at(0), 120_000) }]])
  );
});

test("empty occupancy still reconciles; empty connection id never touches storage", () => {
  acquire(A, "k", "conn-1", at(0), 1_000);
  leases.getExclusiveLeaseOccupancy([], at(1));
  assert.equal((rows() as Array<Record<string, unknown>>)[0].state, "EXPIRED");
  assert.equal(leases.isExclusiveConnectionActivelyLeased("", "not-a-date"), false);
  assert.equal(leases.isExclusiveConnectionActivelyLeased("conn-1", at(2)), false);
});

test("active lookups return the lease or null after reconciling", () => {
  assert.equal(leases.getActiveExclusiveConnectionLease(A, at(0)), null);
  acquire(A, "k", "conn-1", at(0), 1_000);
  assert.equal(leases.getActiveExclusiveConnectionLease(A, at(0))?.connectionId, "conn-1");
  assert.equal(leases.getActiveExclusiveConnectionLease(A, at(1)), null);
});

test("status joins the connection, hides account-identity names, and is null when not live", () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO provider_connections (id, provider, auth_type, name, email, display_name, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  insert.run("conn-named", "glm", "api_key", " Team ", null, null, at(0), at(0));
  insert.run("conn-email", "codex", "oauth", "me@example.com", null, null, at(0), at(0));
  insert.run("conn-fallback", "codex", "oauth", "Jane Doe", null, "jane doe", at(0), at(0));
  const owners = [A, B, C];
  const ids = ["conn-named", "conn-email", "conn-fallback"];
  ids.forEach((id, index) => acquire(owners[index], "key", id, at(0), 2_000));

  const status = (owner: string, overrides: Record<string, unknown> = {}) =>
    leases.getExclusiveConnectionLeaseStatus({
      leaseOwnerId: owner,
      generation: 1,
      apiKeyId: "key",
      now: at(1),
      ...overrides,
    });
  const named = status(A);
  assert.equal(named?.provider, "glm");
  assert.equal(named?.connectionName, "Team");
  assert.equal(named?.lease.provider, "codex");
  assert.deepEqual(Object.keys(named?.lease ?? {}).sort(), [
    "acquiredAt",
    "apiKeyId",
    "connectionId",
    "endReason",
    "endedAt",
    "expiresAt",
    "generation",
    "id",
    "leaseOwnerHash",
    "provider",
    "renewedAt",
    "state",
  ]);
  assert.equal(status(B)?.connectionName, null);
  assert.equal(status(C)?.connectionName, null);
  assert.equal(status(A, { generation: 2 }), null);
  assert.equal(status(A, { apiKeyId: "other" }), null);
  assert.equal(status(A, { now: at(2) }), null);
});

test("a unique violation on the ACTIVE indexes maps to a conflict result; other errors propagate", () => {
  const db = core.getDbInstance();
  db.exec(`CREATE TRIGGER trap_connection BEFORE INSERT ON exclusive_connection_leases
           WHEN NEW.connection_id = 'trap-connection'
           BEGIN SELECT RAISE(ABORT, 'UNIQUE constraint failed: exclusive_connection_leases.connection_id'); END`);
  db.exec(`CREATE TRIGGER trap_index BEFORE INSERT ON exclusive_connection_leases
           WHEN NEW.connection_id = 'trap-index'
           BEGIN SELECT RAISE(ABORT, 'constraint idx_exclusive_lease_active_owner violated'); END`);
  db.exec(`CREATE TRIGGER trap_other BEFORE INSERT ON exclusive_connection_leases
           WHEN NEW.connection_id = 'trap-other'
           BEGIN SELECT RAISE(ABORT, 'disk on fire'); END`);

  assert.deepEqual(acquire(A, "k", "trap-connection", at(0)), {
    kind: "CONNECTION_BUSY",
    retryAfter: null,
  });
  assert.deepEqual(acquire(A, "k", "trap-index", at(0)), {
    kind: "CONNECTION_BUSY",
    retryAfter: null,
  });
  assert.throws(() => acquire(A, "k", "trap-other", at(0)), /disk on fire/);

  acquire(B, "k", "conn-b", at(0));
  const transitioned = leases.transitionExclusiveConnectionLease({
    leaseOwnerId: B,
    generation: 1,
    apiKeyId: "k",
    provider: "codex",
    connectionId: "trap-connection",
    reason: "CONNECTION_INELIGIBLE",
    now: at(1),
  });
  assert.equal(transitioned.kind, "OWNER_ALREADY_ACTIVE", "rolled back, so B still holds conn-b");
  assert.equal((transitioned as { lease: { connectionId: string } }).lease.connectionId, "conn-b");
  assert.equal((rows() as Array<Record<string, unknown>>)[0].state, "ACTIVE");
});

test("every read uses the caller's clock rather than the wall clock", () => {
  const future = "2099-01-01T00:00:00.000Z";
  const later = plus(future, 1_000);
  acquire(A, "k", "conn-1", future, 1_000);
  assert.equal(leases.isExclusiveConnectionActivelyLeased("conn-1", later), false);
  acquire(B, "k", "conn-2", future, 1_000);
  assert.equal(leases.getActiveExclusiveConnectionLease(B, later), null);
  acquire(C, "k", "conn-3", future, 1_000);
  assert.deepEqual(leases.getExclusiveLeaseOccupancy(["conn-3"], later), new Map());
});
