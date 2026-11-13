import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-cache-fail-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const {
  getCombosCached,
  getUpstreamProxyConfigCached,
  clearCombosCache,
  clearUpstreamProxyConfigCache,
} = await import("../../open-sse/handlers/chatCore/comboContextCache.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.afterEach(() => {
  clearCombosCache();
  clearUpstreamProxyConfigCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed combos read is not cached: the next call reads again", async () => {
  const db = core.getDbInstance() as unknown as { exec: (sql: string) => void };
  db.exec("ALTER TABLE combos RENAME TO combos_hidden");
  try {
    await assert.rejects(() => getCombosCached());
  } finally {
    db.exec("ALTER TABLE combos_hidden RENAME TO combos");
  }
  const rows = await getCombosCached();
  assert.ok(Array.isArray(rows), "the retry must reach the restored table, not the cached failure");
});

test("a failed proxy-config read returns the default but does not cache it", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "claude",
    mode: "cliproxyapi",
    enabled: true,
  });
  const db = core.getDbInstance() as unknown as { exec: (sql: string) => void };
  db.exec("ALTER TABLE upstream_proxy_config RENAME TO upstream_proxy_config_hidden");
  let during;
  try {
    during = await getUpstreamProxyConfigCached("claude");
  } finally {
    db.exec("ALTER TABLE upstream_proxy_config_hidden RENAME TO upstream_proxy_config");
  }
  assert.equal(during.mode, "native", "a failed read falls back to the native default");
  const after = await getUpstreamProxyConfigCached("claude");
  assert.equal(after.mode, "cliproxyapi", "the failed read must not stay cached for the TTL");
  assert.equal(after.enabled, true);
});

test("a successful proxy-config read is cached for the TTL", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  const first = await getUpstreamProxyConfigCached("openai");
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "native",
    enabled: true,
  });
  const second = await getUpstreamProxyConfigCached("openai");
  assert.equal(first.mode, "fallback");
  assert.equal(second.mode, "fallback", "the cached value is served inside the TTL");
});
