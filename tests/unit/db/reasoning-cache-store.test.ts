/**
 * Contract of the reasoning replay cache store (Promise-based, SQLite implementation)
 * and of the facade wiring: the facade hands out the composition-root store, the store
 * keeps exactly what it is given (policy stays in the facade), and the synchronous
 * legacy access is the same SQLite store.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "reasoning-cache-store-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { reasoningCacheStores } =
  await import("../../../src/lib/db/repositories/reasoningCacheStores.ts");
const facade = await import("../../../src/lib/db/reasoningCache.ts");

const store = reasoningCacheStores.reasoning;
const legacy = reasoningCacheStores.legacySync.reasoning;

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
  assert.ok(value instanceof Promise, "every store operation returns a Promise");
  return value;
}

function write(toolCallId: string, overrides: Record<string, unknown> = {}) {
  return {
    toolCallId,
    provider: "deepseek",
    model: "deepseek-chat",
    reasoning: `reasoning ${toolCallId}`,
    charCount: `reasoning ${toolCallId}`.length,
    ...overrides,
  };
}

test("the facade hands out the composition-root store", () => {
  assert.equal(facade.getReasoningCacheStore(), store);
});

test("put stores the given values verbatim; policy (size cap, placeholder) is not the store's", async () => {
  const long = "A".repeat(12_000);
  await promised(store.put(write("call_long", { reasoning: long, charCount: 7 }), 60_000));
  await store.put(write("call_ph", { reasoning: "(prior reasoning summary unavailable)" }), 60_000);
  const row = await promised(store.get("call_long"));
  assert.equal(row?.reasoning.length, 12_000);
  assert.equal(
    (await store.list({ limit: 10, offset: 0 })).find((e) => e.toolCallId === "call_long")
      ?.charCount,
    7
  );
  assert.equal((await store.get("call_ph"))?.reasoning, "(prior reasoning summary unavailable)");
  // The facade still filters the placeholder on read.
  assert.equal(facade.getReasoningCache("call_ph"), null);
});

test("put replaces by tool_call_id and get returns an ISO expiry about ttl from now", async () => {
  await store.put(write("call_a"), 60_000);
  const before = Date.now();
  await store.put(write("call_a", { provider: "kimi", reasoning: "second" }), 120_000);
  const row = await store.get("call_a");
  assert.equal(row?.provider, "kimi");
  assert.equal(row?.reasoning, "second");
  const expiresMs = Date.parse(row!.expiresAt);
  assert.ok(expiresMs > before + 118_000 && expiresMs <= Date.now() + 120_000);
  assert.equal((await store.stats()).totalEntries, 1);
});

test("expired entries are invisible to get, list and stats before deleteExpired removes them", async () => {
  await store.put(write("call_live"), 60_000);
  await store.put(write("call_old"), -1_000);
  assert.equal(await store.get("call_old"), null);
  assert.equal(await store.get("call_missing"), null);
  assert.deepEqual(
    (await promised(store.list({ limit: 10, offset: 0 }))).map((e) => e.toolCallId),
    ["call_live"]
  );
  assert.equal((await promised(store.stats())).totalEntries, 1);
  assert.equal(await promised(store.deleteExpired()), 1);
  assert.equal(await store.deleteExpired(), 0);
});

test("delete and clear report removed counts; clear can target one provider", async () => {
  await store.put(write("a"), 60_000);
  await store.put(write("b", { provider: "kimi" }), 60_000);
  await store.put(write("c", { provider: "kimi" }), -1_000);
  assert.equal(await promised(store.delete("a")), 1);
  assert.equal(await store.delete("a"), 0);
  assert.equal(await promised(store.clear("kimi")), 2);
  await store.put(write("d"), 60_000);
  assert.equal(await store.clear(), 1);
});

test("list honors limit, offset and filters exactly as given (no clamp in the store)", async () => {
  for (let i = 0; i < 5; i++) await store.put(write(`call_${i}`), 60_000);
  core
    .getDbInstance()
    .prepare(
      "UPDATE reasoning_cache SET created_at = '2026-01-0' || substr(tool_call_id, 6) || ' 00:00:00'"
    )
    .run();
  assert.deepEqual(
    (await store.list({ limit: 2, offset: 1 })).map((e) => e.toolCallId),
    ["call_3", "call_2"]
  );
  assert.equal(
    (await store.list({ limit: 500, offset: 0, provider: "deepseek", model: "deepseek-chat" }))
      .length,
    5
  );
  assert.equal((await store.list({ limit: 500, offset: 0, provider: "kimi" })).length, 0);
});

test("legacy sync access and the Promise store share one table", async () => {
  legacy.put(write("call_sync"), 60_000);
  assert.equal((await store.get("call_sync"))?.reasoning, "reasoning call_sync");
  await store.put(write("call_async"), 60_000);
  const row = legacy.get("call_async");
  assert.ok(!(row instanceof Promise));
  assert.equal(row?.provider, "deepseek");
});

test("facade writes and deletes go through the store", async () => {
  facade.setReasoningCache("call_facade", "deepseek", "deepseek-chat", "via facade", 60_000);
  assert.equal((await store.get("call_facade"))?.reasoning, "via facade");
  assert.equal(facade.deleteReasoningCache("call_facade"), 1);
  assert.equal(await store.get("call_facade"), null);
});
