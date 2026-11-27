/**
 * Characterization of the LiteLLM pricing sync and Arena ELO sync persistence.
 * Uses only the long-standing exports so it runs unchanged before and after the
 * repository extraction: stored shapes, full-replace atomicity, the truncation
 * guard, the read memo, the historical-alias remap, cache invalidation, the
 * cross-instance sync status, and the Arena ELO failure/backoff bookkeeping.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "external-sync-state-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.PRICING_SYNC_ENABLED;

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const pricingSync = await import("../../../src/lib/pricingSync.ts");
const arena = await import("../../../src/lib/arenaEloSync.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  core.getDbInstance();
});
test.after(() => {
  globalThis.fetch = originalFetch;
  arena.stopArenaEloSync();
  pricingSync.stopPeriodicSync();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function kvRows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

function putKv(namespace: string, key: string, value: string): void {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

function litellmFixture(count: number): Record<string, unknown> {
  const raw: Record<string, unknown> = {};
  for (let i = 0; i < count; i++) {
    raw[`openai/model-${i}`] = {
      input_cost_per_token: 0.000001,
      output_cost_per_token: 0.000002,
      litellm_provider: "openai",
      mode: "chat",
    };
  }
  return raw;
}

function serveJson(body: unknown): void {
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
}

// ── pricing_synced ──────────────────────────────────────────────────────────

test("pricing: save stores one JSON row per provider and fully replaces the namespace", () => {
  putKv("pricing_synced", "stale", JSON.stringify({ old: { input: 1, output: 1 } }));
  putKv("pricing", "openai", JSON.stringify({ keep: { input: 9, output: 9 } }));

  pricingSync.saveSyncedPricing({
    openai: { "gpt-4o": { input: 2.5, output: 10 } },
    groq: { llama: { input: 0.1, output: 0.2, mode: "chat" } },
  });

  assert.deepEqual(kvRows("pricing_synced"), [
    { key: "groq", value: JSON.stringify({ llama: { input: 0.1, output: 0.2, mode: "chat" } }) },
    { key: "openai", value: JSON.stringify({ "gpt-4o": { input: 2.5, output: 10 } }) },
  ]);
  // User overrides live in another namespace and are never touched.
  assert.equal(kvRows("pricing").length, 1);
});

test("pricing: a failing row rolls the whole replace back and skips invalidation", () => {
  pricingSync.saveSyncedPricing({ openai: { a: { input: 1, output: 2 } } });
  const before = kvRows("pricing_synced");
  const version = readCache.getModelCatalogCacheVersion();

  assert.throws(() =>
    pricingSync.saveSyncedPricing({
      groq: { b: { input: 1, output: 2 } },
      bad: { c: { input: 10n as unknown as number, output: 1 } },
    })
  );

  assert.deepEqual(kvRows("pricing_synced"), before);
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("pricing: save and clear bump the model-catalog cache version in the same turn", () => {
  const v0 = readCache.getModelCatalogCacheVersion();
  pricingSync.saveSyncedPricing({ openai: { a: { input: 1, output: 2 } } });
  const v1 = readCache.getModelCatalogCacheVersion();
  assert.ok(v1 > v0);

  pricingSync.clearSyncedPricing();
  assert.ok(readCache.getModelCatalogCacheVersion() > v1);
  assert.deepEqual(kvRows("pricing_synced"), []);
});

test("pricing: reads skip corrupted rows, remap historical buckets and memoize", (t) => {
  const warn = t.mock.method(console, "warn", () => {});
  putKv("pricing_synced", "broken", "{not json");
  putKv("pricing_synced", "vertex_ai", JSON.stringify({ old: { input: 1, output: 1 } }));
  putKv("pricing_synced", "gemini", JSON.stringify({ g: { input: 3, output: 4 } }));
  readCache.invalidateDbCache("pricing");

  const first = pricingSync.getSyncedPricing() as Record<string, Record<string, unknown>>;
  assert.equal(first.broken, undefined);
  assert.ok(
    warn.mock.calls.some((c) =>
      String(c.arguments[0]).includes('Corrupted data for provider "broken"')
    )
  );
  // The historical vertex_ai bucket is copied under its registry aliases.
  assert.deepEqual(Object.keys(first.gemini).sort(), ["g", "old"]);
  assert.deepEqual(Object.keys(first.vertex).sort(), ["old"]);
  assert.ok(first.vertex_ai);

  assert.equal(pricingSync.getSyncedPricing(), first, "memoized within one cache version");
  readCache.invalidateDbCache("pricing");
  assert.notEqual(pricingSync.getSyncedPricing(), first);
});

// ── syncPricingFromSources + pricing_sync_status ────────────────────────────

test("pricing sync: success replaces rows and persists the last-sync record", async () => {
  serveJson(litellmFixture(3));
  const result = await pricingSync.syncPricingFromSources({ sources: ["litellm"] });
  assert.equal(result.success, true);
  // openai models are stored under both registry aliases (openai, cx).
  assert.equal(result.modelCount, 6);

  const rows = kvRows("pricing_synced");
  assert.deepEqual(
    rows.map((r) => r.key),
    ["cx", "openai"]
  );
  const status = kvRows("pricing_sync_status");
  assert.equal(status.length, 1);
  assert.equal(status[0].key, "last_sync");
  const parsed = JSON.parse(status[0].value);
  assert.deepEqual(Object.keys(parsed), ["lastSyncTime", "lastSyncModelCount"]);
  assert.equal(parsed.lastSyncModelCount, 6);
  assert.ok(!Number.isNaN(Date.parse(parsed.lastSyncTime)));
});

test("pricing sync: dry run writes nothing", async () => {
  serveJson(litellmFixture(2));
  const result = await pricingSync.syncPricingFromSources({ sources: ["litellm"], dryRun: true });
  assert.equal(result.success, true);
  assert.ok(result.data);
  assert.deepEqual(kvRows("pricing_synced"), []);
  assert.deepEqual(kvRows("pricing_sync_status"), []);
});

test("pricing sync: the truncation guard counts stored rows before remap and keeps them", async (t) => {
  t.mock.method(console, "warn", () => {});
  pricingSync.saveSyncedPricing({
    openai: Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [`m${i}`, { input: 1, output: 1 }])
    ),
  });
  const before = kvRows("pricing_synced");

  serveJson(litellmFixture(1)); // 1 model ×2 providers = 2 < 5 stored
  const result = await pricingSync.syncPricingFromSources({ sources: ["litellm"] });
  assert.equal(result.success, false);
  assert.match(String(result.error), /Fetched price map rejected: 2 models, stored map has 5/);
  assert.deepEqual(kvRows("pricing_synced"), before);
  assert.deepEqual(kvRows("pricing_sync_status"), []);
});

test("pricing status: a fresh module instance reads the persisted record", async () => {
  putKv(
    "pricing_sync_status",
    "last_sync",
    JSON.stringify({ lastSyncTime: "2026-01-02T03:04:05.000Z", lastSyncModelCount: 7 })
  );
  const fresh = await import("../../../src/lib/pricingSync.ts?instance=status-a");
  const status = fresh.getSyncStatus();
  assert.equal(status.lastSync, "2026-01-02T03:04:05.000Z");
  assert.equal(status.lastSyncModelCount, 7);
  assert.equal(status.nextSync, null, "sync disabled: no future sync advertised");
});

test("pricing status: unreadable or partial records degrade instead of throwing", async () => {
  const fresh = await import("../../../src/lib/pricingSync.ts?instance=status-b");
  putKv(
    "pricing_sync_status",
    "last_sync",
    JSON.stringify({ lastSyncTime: "2026-01-02T00:00:00Z" })
  );
  assert.equal(fresh.getSyncStatus().lastSyncModelCount, 0);

  putKv("pricing_sync_status", "last_sync", JSON.stringify({ lastSyncModelCount: 4 }));
  assert.equal(fresh.getSyncStatus().lastSync, null);

  putKv("pricing_sync_status", "last_sync", "{oops");
  assert.equal(fresh.getSyncStatus().lastSync, null);
  assert.equal(fresh.getSyncStatus().lastSyncModelCount, 0);
});

// ── arena_elo sync state ────────────────────────────────────────────────────

function arenaBoards(): void {
  globalThis.fetch = (async (input: string | URL | Request) => {
    const url = String(input);
    const category = url.includes("name=code") ? "code" : "text";
    return new Response(
      JSON.stringify({
        meta: { leaderboard: category, model_count: 2 },
        models: [
          {
            rank: 1,
            model: "anthropic/claude-a",
            vendor: "A",
            score: 1400,
            ci: 5,
            votes: 9000,
            license: "p",
          },
          {
            rank: 2,
            model: "openai/gpt-b",
            vendor: "B",
            score: 1300,
            ci: 5,
            votes: 9000,
            license: "p",
          },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
}

test("arena: a failed sync stamps lastFailedAt and a sanitized lastError", async (t) => {
  t.mock.method(console, "warn", () => {});
  globalThis.fetch = (async () => new Response("", { status: 503 })) as typeof fetch;
  const result = await arena.syncArenaElo();
  assert.equal(result.success, false);

  const rows = Object.fromEntries(kvRows("arena_elo").map((r) => [r.key, r.value]));
  assert.deepEqual(Object.keys(rows).sort(), ["lastError", "lastFailedAt"]);
  assert.ok(!Number.isNaN(Date.parse(rows.lastFailedAt)));
  assert.ok(rows.lastError.length > 0 && rows.lastError.length <= 500);

  const status = arena.getArenaEloSyncStatus();
  assert.equal(status.lastFailedAt, rows.lastFailedAt);
  assert.equal(status.lastError, rows.lastError);
  assert.equal(status.activeSource, null);
});

test("arena: a fresh lastFailedAt backs off; an unparsable one does not", async (t) => {
  t.mock.method(console, "warn", () => {});
  t.mock.method(console, "log", () => {});
  putKv("arena_elo", "lastFailedAt", new Date().toISOString());
  let fetched = false;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response("", { status: 503 });
  }) as typeof fetch;
  const skipped = await arena.syncArenaElo();
  assert.equal(fetched, false);
  assert.match(String(skipped.error), /backoff window/);

  putKv("arena_elo", "lastFailedAt", "not a date");
  arenaBoards();
  const result = await arena.syncArenaElo();
  assert.equal(result.success, true);
});

test("arena: success clears failure keys, records the source and drops datasetDate", async (t) => {
  t.mock.method(console, "log", () => {});
  putKv("arena_elo", "lastFailedAt", "2000-01-01T00:00:00.000Z");
  putKv("arena_elo", "lastError", "old");
  putKv("arena_elo", "datasetDate", "2026-10-22");
  arenaBoards();

  const result = await arena.syncArenaElo();
  assert.equal(result.success, true);
  assert.deepEqual(kvRows("arena_elo"), [{ key: "activeSource", value: "wulong" }]);

  const status = arena.getArenaEloSyncStatus();
  assert.equal(status.activeSource, "wulong");
  assert.equal(status.lastError, null);
  assert.equal(status.lastFailedAt, null);
  assert.equal(status.datasetDate, null);
});

test("arena status: empty or unknown stored values read as null", () => {
  putKv("arena_elo", "lastError", "");
  putKv("arena_elo", "activeSource", "elsewhere");
  putKv("arena_elo", "datasetDate", "2026-10-22");
  const status = arena.getArenaEloSyncStatus();
  assert.equal(status.lastError, null);
  assert.equal(status.activeSource, null);
  assert.equal(status.datasetDate, "2026-10-22");
});

test("arena status: key_value failures are swallowed", (t) => {
  const db = core.getDbInstance();
  const realPrepare = db.prepare.bind(db);
  t.mock.method(db, "prepare", (sql: string) => {
    if (sql.includes("key_value")) throw new Error("kv down");
    return realPrepare(sql);
  });
  const status = arena.getArenaEloSyncStatus();
  assert.equal(status.lastError, null);
  assert.equal(status.lastFailedAt, null);
  assert.equal(status.activeSource, null);
  assert.equal(status.datasetDate, null);
});
