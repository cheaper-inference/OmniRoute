/**
 * Contract of the exclusive connection lease repository (Promise-based, SQLite
 * implementation) and of the facade wiring: the facade hands out the
 * composition-root repository, its synchronous exports go through legacySync
 * with the owner already hashed, and Promise and synchronous access share one
 * store. Conflicts come back as result kinds; other storage errors reject.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "exclusive-leases-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { exclusiveConnectionLeaseRepositories } =
  await import("../../../src/lib/db/repositories/exclusiveConnectionLeaseRepositories.ts");
const facade = await import("../../../src/lib/db/exclusiveConnectionLeases.ts");
const sqlite =
  await import("../../../src/lib/db/repositories/sqliteExclusiveConnectionLeaseRepository.ts");

const { leases: repo, legacySync } = exclusiveConnectionLeaseRepositories;
const OWNER = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const HASH = facade.hashLeaseOwnerId(OWNER);
const OTHER_HASH = "f".repeat(64);
const at = (seconds: number) => new Date(Date.UTC(2026, 10, 28, 4, 0, seconds)).toISOString();

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

test("facade hands out the composition-root repository", () => {
  assert.equal(facade.getExclusiveConnectionLeaseRepository(), repo);
  assert.equal(repo, sqlite.sqliteExclusiveConnectionLeaseRepository);
  assert.equal(legacySync, sqlite.sqliteExclusiveConnectionLeaseLegacySync);
});

test("full lifecycle through Promises with a pre-hashed owner", async () => {
  const fence = { leaseOwnerHash: HASH, apiKeyId: "key-a" };
  const acquired = await promised(
    repo.acquire({ ...fence, provider: "codex", connectionId: "conn-1", now: at(0) })
  );
  assert.equal(acquired.kind, "ACQUIRED");
  assert.equal((acquired as { lease: { leaseOwnerHash: string } }).lease.leaseOwnerHash, HASH);

  assert.equal((await promised(repo.findActiveByOwner(HASH, at(1))))?.connectionId, "conn-1");
  assert.equal(await promised(repo.isConnectionActivelyLeased("conn-1", at(1))), true);
  assert.equal(await promised(repo.isConnectionActivelyLeased("", at(1))), false);
  assert.deepEqual(
    [...(await promised(repo.occupancy(["conn-1", "conn-x"], at(1)))).keys()],
    ["conn-1"]
  );
  assert.equal(
    (
      await promised(
        repo.checkFence({ ...fence, generation: 1, connectionId: "conn-1", now: at(1) })
      )
    ).kind,
    "VALID"
  );
  assert.equal(
    (await promised(repo.renew({ ...fence, generation: 1, now: at(2), ttlMs: 5_000 }))).kind,
    "RENEWED"
  );
  const moved = await promised(
    repo.transition({
      ...fence,
      generation: 1,
      provider: "codex",
      connectionId: "conn-2",
      reason: "CONNECTION_INELIGIBLE",
      now: at(3),
    })
  );
  assert.equal(moved.kind, "TRANSITIONED");
  assert.equal(
    await promised(repo.getStatus({ ...fence, generation: 1, now: at(4) })),
    null,
    "status needs a provider_connections row"
  );
  assert.equal(
    (await promised(repo.release({ ...fence, generation: 1, now: at(4) }))).kind,
    "RELEASED"
  );
  assert.equal(
    (await promised(repo.invalidate({ ...fence, generation: 1, reason: "OWNER_EXIT", now: at(5) })))
      .kind,
    "STALE"
  );
  assert.equal(await promised(repo.reconcileExpired(at(6))), 0);
});

test("conflicts are result kinds, not rejections", async () => {
  await repo.acquire({
    leaseOwnerHash: HASH,
    apiKeyId: "k",
    provider: "codex",
    connectionId: "conn-1",
    now: at(0),
  });
  const busy = await repo.acquire({
    leaseOwnerHash: OTHER_HASH,
    apiKeyId: "k",
    provider: "codex",
    connectionId: "conn-1",
    now: at(1),
  });
  assert.equal(busy.kind, "CONNECTION_BUSY");
  const elsewhere = await repo.acquire({
    leaseOwnerHash: HASH,
    apiKeyId: "k",
    provider: "codex",
    connectionId: "conn-2",
    now: at(1),
  });
  assert.equal(elsewhere.kind, "OWNER_ALREADY_ACTIVE");
});

test("validation and storage errors reject instead of throwing synchronously", async () => {
  const fence = { leaseOwnerHash: HASH, generation: 1, apiKeyId: "k", now: "not-a-date" };
  const calls: Array<[string, () => Promise<unknown>]> = [
    ["reconcileExpired", () => repo.reconcileExpired("not-a-date")],
    ["getStatus", () => repo.getStatus(fence)],
    ["acquire", () => repo.acquire({ ...fence, provider: "codex", connectionId: "c" })],
    [
      "transition",
      () =>
        repo.transition({ ...fence, provider: "codex", connectionId: "c", reason: "OWNER_EXIT" }),
    ],
    ["invalidate", () => repo.invalidate({ ...fence, reason: "OWNER_EXIT" })],
    ["renew", () => repo.renew(fence)],
    ["release", () => repo.release(fence)],
    ["checkFence", () => repo.checkFence({ ...fence, connectionId: "c" })],
    ["findActiveByOwner", () => repo.findActiveByOwner(HASH, "not-a-date")],
    ["occupancy", () => repo.occupancy(["c"], "not-a-date")],
    ["isConnectionActivelyLeased", () => repo.isConnectionActivelyLeased("c", "not-a-date")],
  ];
  for (const [name, call] of calls) {
    let pending: Promise<unknown> | undefined;
    assert.doesNotThrow(() => (pending = call()), `${name} must not throw synchronously`);
    await assert.rejects(pending!, { message: "now must be a valid ISO timestamp" }, name);
  }

  core.getDbInstance().exec(`CREATE TRIGGER trap BEFORE INSERT ON exclusive_connection_leases
           BEGIN SELECT RAISE(ABORT, 'disk on fire'); END`);
  await assert.rejects(
    repo.acquire({
      leaseOwnerHash: HASH,
      apiKeyId: "k",
      provider: "codex",
      connectionId: "conn-1",
      now: at(0),
    }),
    /disk on fire/
  );
});

test("Promise and legacy access share one store; the facade hashes before delegating", async () => {
  const viaFacade = facade.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER,
    apiKeyId: "k",
    provider: "codex",
    connectionId: "conn-1",
    now: at(0),
  });
  assert.equal(viaFacade.kind, "ACQUIRED");
  assert.deepEqual(
    await repo.findActiveByOwner(HASH, at(1)),
    legacySync.findActiveByOwner(HASH, at(1))
  );
  assert.deepEqual(
    legacySync.findActiveByOwner(HASH, at(1)),
    facade.getActiveExclusiveConnectionLease(OWNER, at(1))
  );
  const viaRepo = await repo.release({
    leaseOwnerHash: HASH,
    generation: 1,
    apiKeyId: "k",
    now: at(2),
  });
  assert.equal(viaRepo.kind, "RELEASED");
  assert.equal(facade.isExclusiveConnectionActivelyLeased("conn-1", at(3)), false);
});
