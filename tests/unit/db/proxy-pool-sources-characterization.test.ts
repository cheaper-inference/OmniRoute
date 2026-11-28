/**
 * Characterization of the free-proxy, 1proxy marketplace and subscription pool-binding
 * DB helpers. Uses only the long-standing public exports so it runs unchanged before
 * and after the repository extraction: upsert identity, filters and sort orders,
 * atomic promotion into the registry, stale pruning, sync timestamps and errors, the
 * 1proxy fallback listing, and the batched scope-pool append.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "proxy-pool-sources-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const free = await import("../../../src/lib/db/freeProxies.ts");
const oneproxy = await import("../../../src/lib/db/oneproxy.ts");
const proxies = await import("../../../src/lib/db/proxies.ts");

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

type Source = "1proxy" | "proxifly" | "iplocate" | "webshare";

function item(overrides: Record<string, unknown> = {}) {
  return {
    source: "proxifly" as Source,
    host: "10.0.0.1",
    port: 8080,
    type: "http" as const,
    countryCode: "US",
    qualityScore: 50,
    latencyMs: 100,
    anonymity: "elite",
    lastValidated: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function db() {
  return core.getDbInstance();
}

function freeRow(id: string) {
  return db().prepare("SELECT * FROM free_proxies WHERE id = ?").get(id) as
    Record<string, unknown> | undefined;
}

function insertRegistry(id: string, fields: Record<string, unknown> = {}): void {
  const row = {
    name: id,
    type: "http",
    host: `${id}.example`,
    port: 3128,
    status: "active",
    source: "manual",
    quality_score: null,
    latency_ms: null,
    anonymity: null,
    google_access: 0,
    last_validated: null,
    country_code: null,
    region: null,
    notes: null,
    ...fields,
  };
  db()
    .prepare(
      `INSERT INTO proxy_registry
        (id, name, type, host, port, username, password, region, notes, status, source,
         quality_score, latency_ms, anonymity, google_access, last_validated, country_code,
         created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, '', '', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      row.name,
      row.type,
      row.host,
      row.port,
      row.region,
      row.notes,
      row.status,
      row.source,
      row.quality_score,
      row.latency_ms,
      row.anonymity,
      row.google_access,
      row.last_validated,
      row.country_code,
      "2026-01-01T00:00:00.000Z",
      "2026-01-02T00:00:00.000Z"
    );
}

// ── Free proxies: identity and upsert ───────────────────────────────────────

test("free: upsert keys on (source, host, port); an update keeps id and pool state", async () => {
  const created = await free.upsertFreeProxy(item());
  assert.equal(created.action, "created");

  await free.markFreeProxyInPool(created.id, "pool-1");
  const updated = await free.upsertFreeProxy(
    item({ type: "socks5", countryCode: null, qualityScore: 90, latencyMs: null, anonymity: null })
  );
  assert.deepEqual(updated, { id: created.id, action: "updated" });

  const row = freeRow(created.id)!;
  assert.equal(row.type, "socks5");
  assert.equal(row.country_code, null);
  assert.equal(row.quality_score, 90);
  assert.equal(row.latency_ms, null);
  assert.equal(row.anonymity, null);
  assert.equal(row.in_pool, 1, "an update never touches the pool flag");
  assert.equal(row.pool_proxy_id, "pool-1");

  const otherSource = await free.upsertFreeProxy(item({ source: "iplocate" }));
  const otherPort = await free.upsertFreeProxy(item({ port: 8081 }));
  assert.equal(otherSource.action, "created");
  assert.equal(otherPort.action, "created");
  assert.equal(await free.countFreeProxies(), 3);
});

test("free: a missing lastValidated is stamped with the write time on insert and update", async () => {
  const before = new Date().toISOString();
  const { id } = await free.upsertFreeProxy(item({ lastValidated: null }));
  const inserted = freeRow(id)!;
  assert.ok(String(inserted.last_validated) >= before);
  assert.equal(inserted.last_validated, inserted.updated_at);
  assert.equal(inserted.created_at, inserted.updated_at);
  assert.equal(inserted.in_pool, 0);
  assert.equal(inserted.pool_proxy_id, null);

  await free.upsertFreeProxy(item({ lastValidated: undefined }));
  const again = freeRow(id)!;
  assert.equal(again.last_validated, again.updated_at);
  assert.equal(again.created_at, inserted.created_at);
});

test("free: getFreeProxyById maps a row and returns null for an unknown id", async () => {
  assert.equal(await free.getFreeProxyById("missing"), null);
  const { id } = await free.upsertFreeProxy(
    item({ countryCode: null, qualityScore: null, latencyMs: null, anonymity: null })
  );
  const record = await free.getFreeProxyById(id);
  assert.deepEqual(
    { ...record, createdAt: "", updatedAt: "" },
    {
      id,
      source: "proxifly",
      host: "10.0.0.1",
      port: 8080,
      type: "http",
      countryCode: null,
      qualityScore: null,
      latencyMs: null,
      anonymity: null,
      lastValidated: "2026-01-01T00:00:00.000Z",
      inPool: false,
      poolProxyId: null,
      createdAt: "",
      updatedAt: "",
    }
  );
});

// ── Free proxies: filters, sorting, paging ──────────────────────────────────

async function seedList() {
  const ids: Record<string, string> = {};
  ids.a = (
    await free.upsertFreeProxy(
      item({ host: "a.host", qualityScore: 80, latencyMs: 300, lastValidated: "2026-01-01" })
    )
  ).id;
  ids.b = (
    await free.upsertFreeProxy(
      item({
        host: "b.host",
        qualityScore: 80,
        latencyMs: null,
        lastValidated: "2026-01-03",
        type: "socks5",
      })
    )
  ).id;
  ids.c = (
    await free.upsertFreeProxy(
      item({
        source: "iplocate",
        host: "c.other",
        qualityScore: 20,
        latencyMs: 50,
        countryCode: "DE",
        lastValidated: "2026-01-02",
      })
    )
  ).id;
  ids.d = (
    await free.upsertFreeProxy(
      item({
        source: "webshare",
        host: "d.host",
        qualityScore: null,
        latencyMs: 10,
        lastValidated: "2025-12-31",
      })
    )
  ).id;
  await free.markFreeProxyInPool(ids.c, "pool-c");
  return ids;
}

test("free: default order is quality desc then last_validated desc; latency puts nulls last", async () => {
  const ids = await seedList();
  const byQuality = (await free.listFreeProxies()).map((r) => r.id);
  assert.deepEqual(byQuality, [ids.b, ids.a, ids.c, ids.d]);

  const byLatency = (await free.listFreeProxies({ sortBy: "latency" })).map((r) => r.id);
  assert.deepEqual(byLatency, [ids.d, ids.c, ids.a, ids.b]);

  const recent = (await free.listFreeProxies({ sortBy: "recent" })).map((r) => r.id);
  assert.deepEqual(recent, [ids.b, ids.c, ids.a, ids.d]);
});

test("free: filters combine and count uses the same filter", async () => {
  const ids = await seedList();
  const pick = async (opts: Record<string, unknown>) =>
    (await free.listFreeProxies(opts as never)).map((r) => r.id).sort();

  assert.deepEqual(await pick({ sources: ["iplocate", "webshare"] }), [ids.c, ids.d].sort());
  assert.deepEqual(
    await pick({ sources: [] }),
    Object.values(ids).sort(),
    "empty list = no filter"
  );
  assert.deepEqual(await pick({ protocol: "socks5" }), [ids.b]);
  assert.deepEqual(await pick({ country: "de" }), [ids.c], "country is upper-cased");
  assert.deepEqual(await pick({ minQuality: 80 }), [ids.a, ids.b].sort());
  assert.deepEqual(
    await pick({ minQuality: 0 }),
    [ids.a, ids.b, ids.c].sort(),
    "null quality drops"
  );
  assert.deepEqual(await pick({ onlyInPool: true }), [ids.c]);
  assert.deepEqual(await pick({ onlyNotInPool: true }), [ids.a, ids.b, ids.d].sort());
  assert.deepEqual(await pick({ search: ".host" }), [ids.a, ids.b, ids.d].sort());
  assert.deepEqual(await pick({ sources: ["proxifly"], search: "b." }), [ids.b]);

  assert.equal(await free.countFreeProxies(), 4);
  assert.equal(await free.countFreeProxies({ sources: ["proxifly"], minQuality: 80 }), 2);
  assert.equal(await free.countFreeProxies({ onlyInPool: true }), 1);
  assert.equal(await free.countFreeProxies({ country: "zz" }), 0);
});

test("free: limit pages with offset; offset alone is ignored", async () => {
  const ids = await seedList();
  const page = async (opts: Record<string, unknown>) =>
    (await free.listFreeProxies(opts as never)).map((r) => r.id);
  assert.deepEqual(await page({ limit: 2 }), [ids.b, ids.a]);
  assert.deepEqual(await page({ limit: 2, offset: 2 }), [ids.c, ids.d]);
  assert.deepEqual(await page({ offset: 2 }), [ids.b, ids.a, ids.c, ids.d]);
});

test("free: listFreeProxiesBySource returns provider items for one source", async () => {
  await seedList();
  const items = await free.listFreeProxiesBySource("proxifly", { protocol: "socks5", limit: 5 });
  assert.deepEqual(items, [
    {
      source: "proxifly",
      host: "b.host",
      port: 8080,
      type: "socks5",
      countryCode: "US",
      qualityScore: 80,
      latencyMs: null,
      anonymity: "elite",
      lastValidated: "2026-01-03",
    },
  ]);
});

// ── Free proxies: promotion into the registry ───────────────────────────────

test("free: promote inserts the registry row and flips the flag together", async () => {
  const { id } = await free.upsertFreeProxy(item());
  const poolId = await free.promoteFreeProxyToPool(id, {
    name: "[proxifly] 10.0.0.1:8080",
    type: "http",
    host: "10.0.0.1",
    port: "8080" as unknown as number,
    source: "proxifly",
  });
  assert.ok(poolId);

  const registry = db().prepare("SELECT * FROM proxy_registry WHERE id = ?").get(poolId) as Record<
    string,
    unknown
  >;
  assert.equal(registry.name, "[proxifly] 10.0.0.1:8080");
  assert.equal(registry.port, 8080, "port is coerced to a number");
  assert.equal(registry.username, "");
  assert.equal(registry.password, "");
  assert.equal(registry.region, null);
  assert.equal(registry.notes, null);
  assert.equal(registry.status, "active");
  assert.equal(registry.source, "proxifly");

  const record = await free.getFreeProxyById(id);
  assert.equal(record?.inPool, true);
  assert.equal(record?.poolProxyId, poolId);
  assert.equal(record?.updatedAt, registry.updated_at);
});

test("free: promote returns null for an unknown id and writes nothing", async () => {
  const result = await free.promoteFreeProxyToPool("missing", {
    name: "x",
    type: "http",
    host: "h",
    port: 1,
    source: "proxifly",
  });
  assert.equal(result, null);
  const count = db().prepare("SELECT COUNT(*) AS n FROM proxy_registry").get() as { n: number };
  assert.equal(count.n, 0);
});

test("free: promote does not re-check in_pool; a second promotion adds another registry row", async () => {
  const { id } = await free.upsertFreeProxy(item());
  const payload = { name: "n", type: "http", host: "10.0.0.1", port: 8080, source: "proxifly" };
  const first = await free.promoteFreeProxyToPool(id, payload);
  const second = await free.promoteFreeProxyToPool(id, payload);
  assert.notEqual(first, second);
  assert.equal((await free.getFreeProxyById(id))?.poolProxyId, second);
  const count = db().prepare("SELECT COUNT(*) AS n FROM proxy_registry").get() as { n: number };
  assert.equal(count.n, 2);
});

test("free: promote rolls back the registry insert when the flag update fails", async () => {
  const { id } = await free.upsertFreeProxy(item());
  db().exec(
    `CREATE TEMP TRIGGER fail_promote BEFORE UPDATE OF in_pool ON free_proxies
     BEGIN SELECT RAISE(ABORT, 'flag update failed'); END;`
  );
  try {
    await assert.rejects(
      free.promoteFreeProxyToPool(id, {
        name: "n",
        type: "http",
        host: "10.0.0.1",
        port: 8080,
        source: "proxifly",
      }),
      /flag update failed/
    );
  } finally {
    db().exec("DROP TRIGGER IF EXISTS temp.fail_promote");
  }
  const count = db().prepare("SELECT COUNT(*) AS n FROM proxy_registry").get() as { n: number };
  assert.equal(count.n, 0);
  assert.equal((await free.getFreeProxyById(id))?.inPool, false);
});

// ── Free proxies: deletes, clears and stale pruning ─────────────────────────

test("free: delete reports whether a row went; clear keeps pooled rows and other sources", async () => {
  const ids = await seedList();
  assert.equal(await free.deleteFreeProxy("missing"), false);
  assert.equal(await free.deleteFreeProxy(ids.d), true);
  assert.equal(await free.getFreeProxyById(ids.d), null);

  await free.markFreeProxyInPool(ids.a, "pool-a");
  assert.equal(await free.clearFreeProxiesBySource("proxifly"), 1);
  assert.equal(await free.getFreeProxyById(ids.b), null);
  assert.ok(await free.getFreeProxyById(ids.a));
  assert.ok(await free.getFreeProxyById(ids.c));
  assert.equal(await free.clearFreeProxiesBySource("1proxy"), 0);
});

test("free: prune removes only unpooled rows of the source whose host:port went away", async () => {
  const keep = (await free.upsertFreeProxy(item({ source: "webshare", host: "k", port: 1 }))).id;
  const gone = (await free.upsertFreeProxy(item({ source: "webshare", host: "g", port: 2 }))).id;
  const pooled = (await free.upsertFreeProxy(item({ source: "webshare", host: "p", port: 3 }))).id;
  const other = (await free.upsertFreeProxy(item({ source: "proxifly", host: "g", port: 2 }))).id;
  await free.markFreeProxyInPool(pooled, "pool-p");

  assert.equal(await free.pruneStaleFreeProxies("webshare", new Set(["k:1"])), 1);
  assert.ok(await free.getFreeProxyById(keep));
  assert.equal(await free.getFreeProxyById(gone), null);
  assert.ok(await free.getFreeProxyById(pooled));
  assert.ok(await free.getFreeProxyById(other));

  assert.equal(await free.pruneStaleFreeProxies("webshare", new Set(["k:1"])), 0);
  assert.equal(await free.pruneStaleFreeProxies("webshare", new Set()), 1);
  assert.equal(await free.getFreeProxyById(keep), null);
});

// ── Free proxies: stats, sync time and sync errors ──────────────────────────

test("free: stats on an empty table", async () => {
  assert.deepEqual(await free.getFreeProxyStats(), {
    total: 0,
    inPool: 0,
    avgQuality: null,
    bySource: [],
    lastSyncAt: null,
  });
});

test("free: stats aggregate rows and prefer the recorded sync time over last_validated", async () => {
  await seedList();
  await free.upsertFreeProxy(item({ source: "iplocate", host: "e", qualityScore: 21 }));
  const derived = await free.getFreeProxyStats();
  assert.equal(derived.total, 5);
  assert.equal(derived.inPool, 1);
  assert.equal(derived.avgQuality, 50, "AVG(80, 80, 20, 21) = 50.25 rounds to 50");
  assert.deepEqual(derived.bySource.slice(0, 2), [
    { source: derived.bySource[0].source, count: 2 },
    { source: derived.bySource[1].source, count: 2 },
  ]);
  assert.deepEqual(derived.bySource[2], { source: "webshare", count: 1 });
  assert.deepEqual(
    derived.bySource
      .map((r) => r.source)
      .slice(0, 2)
      .sort(),
    ["iplocate", "proxifly"]
  );
  assert.equal(derived.lastSyncAt, "2026-01-03", "falls back to MAX(last_validated)");

  assert.equal(
    await free.recordFreeProxySync("2020-05-05T00:00:00.000Z"),
    "2020-05-05T00:00:00.000Z"
  );
  assert.equal((await free.getFreeProxyStats()).lastSyncAt, "2020-05-05T00:00:00.000Z");

  const stamped = await free.recordFreeProxySync();
  assert.ok(!Number.isNaN(Date.parse(stamped)));
  assert.equal((await free.getFreeProxyStats()).lastSyncAt, stamped);
  const raw = db()
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'free_proxies' AND key = 'last_sync_at'"
    )
    .get() as { value: string };
  assert.equal(raw.value, stamped);
});

test("free: sync errors replace per source, clear per source and tolerate bad rows", async () => {
  assert.deepEqual(await free.getFreeProxySyncErrors(), {});
  await free.recordFreeProxySyncErrors("proxifly", ["first"]);
  await free.recordFreeProxySyncErrors("proxifly", ["second", "third"]);
  await free.recordFreeProxySyncErrors("webshare", []);
  db()
    .prepare("INSERT INTO free_proxy_sync_errors (source, errors, updated_at) VALUES (?, ?, ?)")
    .run("iplocate", "not json", "x");
  db()
    .prepare("INSERT INTO free_proxy_sync_errors (source, errors, updated_at) VALUES (?, ?, ?)")
    .run("1proxy", '{"a":1}', "x");
  db()
    .prepare("INSERT INTO free_proxy_sync_errors (source, errors, updated_at) VALUES (?, ?, ?)")
    .run("", '["skipped"]', "x");

  assert.deepEqual(await free.getFreeProxySyncErrors(), {
    proxifly: ["second", "third"],
    webshare: [],
    iplocate: ["not json"],
    "1proxy": ['{"a":1}'],
  });

  await free.clearFreeProxySyncErrors("proxifly");
  const after = await free.getFreeProxySyncErrors();
  assert.equal("proxifly" in after, false);
  assert.deepEqual(after.webshare, []);
});

// ── 1proxy marketplace rows in the registry ─────────────────────────────────

test("oneproxy: lists only active oneproxy rows, best quality and freshest first", async () => {
  insertRegistry("manual-1", { quality_score: 99 });
  insertRegistry("op-off", { source: "oneproxy", status: "inactive", quality_score: 99 });
  insertRegistry("op-a", { source: "oneproxy", quality_score: 70, last_validated: "2026-01-01" });
  insertRegistry("op-b", {
    source: "oneproxy",
    quality_score: 70,
    last_validated: "2026-02-01",
    type: "socks5",
    country_code: "DE",
    google_access: 1,
    anonymity: "elite",
    latency_ms: 42,
    region: "eu",
    notes: "n",
  });
  insertRegistry("op-c", { source: "oneproxy", quality_score: null });

  const all = await oneproxy.listOneproxyProxies();
  assert.deepEqual(
    all.map((r) => r.id),
    ["op-b", "op-a", "op-c"]
  );
  assert.deepEqual(all[0], {
    id: "op-b",
    name: "op-b",
    type: "socks5",
    host: "op-b.example",
    port: 3128,
    region: "eu",
    notes: "n",
    status: "active",
    source: "oneproxy",
    qualityScore: 70,
    latencyMs: 42,
    anonymity: "elite",
    googleAccess: true,
    lastValidated: "2026-02-01",
    countryCode: "DE",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
  });
  assert.equal(all[2].qualityScore, null);
  assert.equal(all[2].googleAccess, false);
});

test("oneproxy: protocol, country (as given), minimum quality and limit", async () => {
  insertRegistry("op-a", { source: "oneproxy", quality_score: 70, country_code: "DE" });
  insertRegistry("op-b", { source: "oneproxy", quality_score: 90, type: "socks5" });
  insertRegistry("op-c", { source: "oneproxy", quality_score: 10, country_code: "DE" });
  const ids = async (opts: Record<string, unknown>) =>
    (await oneproxy.listOneproxyProxies(opts as never)).map((r) => r.id);

  assert.deepEqual(await ids({ protocol: "socks5" }), ["op-b"]);
  assert.deepEqual(await ids({ countryCode: "DE" }), ["op-a", "op-c"]);
  assert.deepEqual(await ids({ countryCode: "de" }), [], "country is not upper-cased here");
  assert.deepEqual(await ids({ minQuality: 50 }), ["op-b", "op-a"]);
  assert.deepEqual(await ids({ limit: 1 }), ["op-b"]);
  assert.deepEqual(await ids({ limit: 0 }), ["op-b", "op-a", "op-c"], "limit 0 means no limit");
});

// ── Subscription pool binding (addProxiesToScopePool) ───────────────────────

function poolRows(scope: string, scopeId: string | null) {
  return db()
    .prepare(
      "SELECT proxy_id, position FROM proxy_assignments WHERE scope = ? AND scope_id IS ? ORDER BY position"
    )
    .all(scope, scopeId) as Array<{ proxy_id: string; position: number }>;
}

test("pool: appends new members after the highest position, skips existing and duplicates", async () => {
  for (const id of ["p1", "p2", "p3", "p4"]) insertRegistry(id);
  const gen0 = proxies.getProxyRegistryGeneration();

  assert.equal(
    await proxies.addProxiesToScopePool("provider", "openai", ["p1", "p2", "p1", ""]),
    2
  );
  const gen1 = proxies.getProxyRegistryGeneration();
  assert.equal(gen1, gen0 + 1);
  assert.deepEqual(poolRows("provider", "openai"), [
    { proxy_id: "p1", position: 0 },
    { proxy_id: "p2", position: 1 },
  ]);

  assert.equal(await proxies.addProxiesToScopePool("provider", "openai", ["p2", "p3", "p4"]), 2);
  assert.deepEqual(poolRows("provider", "openai"), [
    { proxy_id: "p1", position: 0 },
    { proxy_id: "p2", position: 1 },
    { proxy_id: "p3", position: 3 },
    { proxy_id: "p4", position: 4 },
  ]);
  assert.equal(proxies.getProxyRegistryGeneration(), gen1 + 1);

  assert.equal(await proxies.addProxiesToScopePool("provider", "openai", ["p1", "p4"]), 0);
  assert.equal(proxies.getProxyRegistryGeneration(), gen1 + 1, "no bump when nothing was added");
  assert.equal(await proxies.addProxiesToScopePool("provider", "openai", []), 0);
  assert.equal(
    await proxies.addProxiesToScopePool("provider", "openai", null as unknown as string[]),
    0
  );
});

test("pool: scopes are normalized; global ignores scopeId; pools are kept per scope id", async () => {
  for (const id of ["p1", "p2"]) insertRegistry(id);
  assert.equal(await proxies.addProxiesToScopePool("global", "ignored", ["p1"]), 1);
  assert.deepEqual(poolRows("global", "__global__"), [{ proxy_id: "p1", position: 0 }]);

  assert.equal(await proxies.addProxiesToScopePool("KEY", "conn-1", ["p1"]), 1);
  assert.deepEqual(poolRows("account", "conn-1"), [{ proxy_id: "p1", position: 0 }]);
  assert.equal(await proxies.addProxiesToScopePool("bogus", null, ["p2"]), 1);
  assert.deepEqual(poolRows("global", "__global__"), [
    { proxy_id: "p1", position: 0 },
    { proxy_id: "p2", position: 1 },
  ]);
  assert.equal(await proxies.addProxiesToScopePool("provider", "other", ["p1"]), 1);
  assert.deepEqual(poolRows("provider", "other"), [{ proxy_id: "p1", position: 0 }]);
});

test("pool: a non-global scope without an id throws before touching rows, even when empty", async () => {
  insertRegistry("p1");
  const message = "scopeId is required for non-global proxy assignments";
  await assert.rejects(proxies.addProxiesToScopePool("account", null, ["p1"]), { message });
  await assert.rejects(proxies.addProxiesToScopePool("provider", "  ", []), { message });
  const count = db().prepare("SELECT COUNT(*) AS n FROM proxy_assignments").get() as { n: number };
  assert.equal(count.n, 0);
});
