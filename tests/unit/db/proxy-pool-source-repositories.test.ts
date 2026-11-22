/**
 * Contract of the free-proxy, 1proxy registry and scope-pool repositories: Promise
 * returns, persistence without facade side effects (no defaults, no stale decision,
 * no generation bump), uniqueness, the promotion transaction and pool ordering.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "proxy-pool-source-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { proxyPoolSourceRepositories } =
  await import("../../../src/lib/db/repositories/proxyPoolSourceRepositories.ts");
const freeFacade = await import("../../../src/lib/db/freeProxies.ts");
const oneproxyFacade = await import("../../../src/lib/db/oneproxy.ts");
const poolFacade = await import("../../../src/lib/db/proxySubscriptions.ts");
const { getProxyRegistryGeneration } =
  await import("../../../src/lib/db/proxies/registryGeneration.ts");

const { freeProxies, oneproxy, poolMembership } = proxyPoolSourceRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function entry(overrides: Record<string, unknown> = {}) {
  return {
    source: "proxifly" as const,
    host: "10.0.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

test("facades expose the same repository instances", () => {
  assert.equal(freeFacade.getFreeProxyRepository(), freeProxies);
  assert.equal(oneproxyFacade.getOneproxyRegistryRepository(), oneproxy);
  assert.equal(poolFacade.getProxyPoolMembershipRepository(), poolMembership);
});

test("free repository: upsert is unique per (source, host, port) and stores values as given", async () => {
  const created = await promised(freeProxies.upsert(entry(), "2026-02-01T00:00:00.000Z"));
  assert.equal(created.action, "created");
  const updated = await promised(
    freeProxies.upsert(entry({ type: "socks5", qualityScore: 5 }), "2026-02-02T00:00:00.000Z")
  );
  assert.deepEqual(updated, { id: created.id, action: "updated" });

  const record = await promised(freeProxies.findById(created.id));
  assert.equal(record?.type, "socks5");
  assert.equal(record?.qualityScore, 5);
  assert.equal(record?.lastValidated, "2026-01-01T00:00:00.000Z", "no default stamping");
  assert.equal(record?.createdAt, "2026-02-01T00:00:00.000Z");
  assert.equal(record?.updatedAt, "2026-02-02T00:00:00.000Z");
  assert.equal(await promised(freeProxies.count()), 1);
  assert.equal(await promised(freeProxies.findById("missing")), null);
});

test("free repository: promotion is one transaction and reports unknown ids", async () => {
  const { id } = await freeProxies.upsert(entry(), "t");
  const payload = { name: "n", type: "http", host: "10.0.0.1", port: 8080, source: "proxifly" };
  assert.equal(await promised(freeProxies.promoteToRegistry("missing", payload)), null);

  const db = core.getDbInstance();
  db.exec(
    `CREATE TEMP TRIGGER fail_flag BEFORE UPDATE OF in_pool ON free_proxies
     BEGIN SELECT RAISE(ABORT, 'boom'); END;`
  );
  await assert.rejects(freeProxies.promoteToRegistry(id, payload), /boom/);
  db.exec("DROP TRIGGER temp.fail_flag");
  const registryCount = () =>
    (db.prepare("SELECT COUNT(*) AS n FROM proxy_registry").get() as { n: number }).n;
  assert.equal(registryCount(), 0);

  const poolId = await freeProxies.promoteToRegistry(id, payload);
  assert.ok(poolId);
  assert.equal(registryCount(), 1);
  assert.equal((await freeProxies.findById(id))?.poolProxyId, poolId);
});

test("free repository: deletes and unpooled endpoints leave the stale decision to the caller", async () => {
  const a = (await freeProxies.upsert(entry({ host: "a" }), "t")).id;
  const b = (await freeProxies.upsert(entry({ host: "b" }), "t")).id;
  const c = (await freeProxies.upsert(entry({ host: "c" }), "t")).id;
  await promised(freeProxies.markInPool(c, "pool-c", "t2"));

  const endpoints = await promised(freeProxies.listUnpooledEndpoints("proxifly"));
  assert.deepEqual(endpoints.map((r) => r.id).sort(), [a, b].sort());
  assert.equal(await promised(freeProxies.deleteByIds([a, "missing"])), 1);
  assert.equal(await promised(freeProxies.deleteUnpooledBySource("proxifly")), 1);
  assert.equal(await promised(freeProxies.deleteById(c)), true);
  assert.equal(await freeProxies.deleteById(c), false);
  assert.equal(await freeProxies.count(), 0);
});

test("free repository: aggregates are raw; recorded sync time and errors are stored as given", async () => {
  await freeProxies.upsert(entry({ host: "a", qualityScore: 1, lastValidated: "x1" }), "t");
  await freeProxies.upsert(entry({ host: "b", qualityScore: 2, lastValidated: "x2" }), "t");
  assert.deepEqual(await promised(freeProxies.aggregates()), {
    total: 2,
    inPool: 0,
    avgQuality: 1.5,
    newestLastValidated: "x2",
    bySource: [{ source: "proxifly", count: 2 }],
  });

  assert.equal(await promised(freeProxies.getRecordedSyncAt()), null);
  await promised(freeProxies.recordSyncAt("2026-03-03"));
  assert.equal(await freeProxies.getRecordedSyncAt(), "2026-03-03");

  await promised(freeProxies.writeSyncErrors("webshare", ["e1"], "t"));
  assert.deepEqual(await promised(freeProxies.listSyncErrors()), { webshare: ["e1"] });
  await promised(freeProxies.clearSyncErrors("webshare"));
  assert.deepEqual(await freeProxies.listSyncErrors(), {});
});

test("oneproxy repository: lists active oneproxy rows only", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO proxy_registry (id, name, type, host, port, status, source, quality_score)
     VALUES (?, ?, 'http', 'h', 1, ?, ?, ?)`
  );
  insert.run("a", "a", "active", "oneproxy", 10);
  insert.run("b", "b", "active", "oneproxy", 90);
  insert.run("c", "c", "error", "oneproxy", 99);
  insert.run("d", "d", "active", "manual", 99);
  const rows = await promised(oneproxy.listActive());
  assert.deepEqual(
    rows.map((r) => r.id),
    ["b", "a"]
  );
  assert.deepEqual(
    (await oneproxy.listActive({ limit: 1 })).map((r) => r.id),
    ["b"]
  );
});

test("pool repository: appends missing members in order without bumping the generation", async () => {
  const db = core.getDbInstance();
  for (const id of ["p1", "p2", "p3"]) {
    db.prepare(
      "INSERT INTO proxy_registry (id, name, type, host, port) VALUES (?, ?, 'http', 'h', 1)"
    ).run(id, id);
  }
  const generation = getProxyRegistryGeneration();
  assert.equal(await promised(poolMembership.appendMissing("provider", "x", ["p2", "p1"])), 2);
  assert.equal(await poolMembership.appendMissing("provider", "x", ["p1", "p3"]), 1);
  assert.equal(getProxyRegistryGeneration(), generation, "the facade owns the generation bump");

  const rows = db
    .prepare(
      "SELECT proxy_id, position FROM proxy_assignments WHERE scope = 'provider' AND scope_id = 'x' ORDER BY position"
    )
    .all();
  assert.deepEqual(rows, [
    { proxy_id: "p2", position: 0 },
    { proxy_id: "p1", position: 1 },
    { proxy_id: "p3", position: 3 },
  ]);

  assert.equal(await poolMembership.appendMissing("global", "__global__", ["p1"]), 1);
  const global = db
    .prepare("SELECT scope_id FROM proxy_assignments WHERE scope = 'global'")
    .get() as { scope_id: string };
  assert.equal(global.scope_id, "__global__", "scope id is stored as passed");
});
