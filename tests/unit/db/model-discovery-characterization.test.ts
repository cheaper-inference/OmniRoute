/**
 * Characterization of the discovery-outcome store (`discoveryState`) and the
 * Claude Code discovery-alias overrides (`ccDiscoveryAliases`) through their DB
 * facades. These pin the behavior that existed before the repositories were
 * introduced: stored shapes, read defaults, delete counts and the synchronous
 * call shape with model-catalog invalidation in the same turn.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-discovery-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const featureFlags = await import("../../../src/lib/db/featureFlags.ts");
const discoveryState = await import("../../../src/lib/db/discoveryState.ts");
const ccAliases = await import("../../../src/lib/db/ccDiscoveryAliases.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  featureFlags.clearFeatureFlagOverrideCache();
  delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rows(namespace: string): Array<{ key: string; value: string }> {
  return core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ? ORDER BY key")
    .all(namespace) as Array<{ key: string; value: string }>;
}

function putRaw(namespace: string, key: string, value: string) {
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(namespace, key, value);
}

function assertNotPromise(value: unknown) {
  assert.ok(!(value instanceof Promise), "the facade stays synchronous");
}

// ── discoveryState ─────────────────────────────────────────────────────────

test("discoveryState: save writes one JSON row with the attempt time stamped by the facade", () => {
  const before = Date.now();
  const result = discoveryState.saveDiscoveryState("prov", "c1", {
    status: "degraded",
    cause: "HTTP 500",
  });
  assert.equal(result, undefined);
  const stored = rows("discoveryState");
  assert.equal(stored.length, 1);
  assert.equal(stored[0].key, "prov:c1");
  const value = JSON.parse(stored[0].value);
  assert.deepEqual(Object.keys(value), ["status", "cause", "at"]);
  assert.equal(value.status, "degraded");
  assert.equal(value.cause, "HTTP 500");
  assert.match(value.at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.ok(Date.parse(value.at) >= before - 1);

  discoveryState.saveDiscoveryState("prov", "c1", { status: "healthy", cause: null });
  const replaced = rows("discoveryState");
  assert.equal(replaced.length, 1);
  assert.deepEqual(JSON.parse(replaced[0].value).cause, null);
});

test("discoveryState: reads are synchronous and keyed by provider:connection", () => {
  discoveryState.saveDiscoveryState("p", "a", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("p", "b", { status: "degraded", cause: "timeout" });
  discoveryState.saveDiscoveryState("q", "a", { status: "degraded", cause: "x" });

  const states = discoveryState.getDiscoveryStatesForConnections([
    { provider: "p", id: "a" },
    { provider: "p", id: "b" },
    { provider: "p", id: "missing" },
  ]);
  assertNotPromise(states);
  assert.ok(states instanceof Map);
  assert.deepEqual([...states.keys()].sort(), ["p:a", "p:b"]);
  assert.equal(states.get("p:a")?.status, "healthy");
  assert.equal(states.get("p:a")?.cause, null);
  assert.equal(states.get("p:b")?.cause, "timeout");
});

test("discoveryState: an empty entry list returns an empty map", () => {
  const states = discoveryState.getDiscoveryStatesForConnections([]);
  assert.ok(states instanceof Map);
  assert.equal(states.size, 0);
});

test("discoveryState: unreadable rows read as absent, an empty cause reads as null", () => {
  const at = new Date().toISOString();
  putRaw("discoveryState", "p:bad-json", "{not json");
  putRaw("discoveryState", "p:array", JSON.stringify([1, 2]));
  putRaw("discoveryState", "p:bad-status", JSON.stringify({ status: "ok", cause: null, at }));
  putRaw("discoveryState", "p:no-at", JSON.stringify({ status: "healthy", cause: null }));
  putRaw("discoveryState", "p:bad-at", JSON.stringify({ status: "healthy", at: "yesterday" }));
  putRaw("discoveryState", "p:empty-cause", JSON.stringify({ status: "degraded", cause: "", at }));
  putRaw("discoveryState", "p:num-cause", JSON.stringify({ status: "degraded", cause: 5, at }));
  putRaw("otherNamespace", "p:other", JSON.stringify({ status: "healthy", cause: null, at }));

  const ids = ["bad-json", "array", "bad-status", "no-at", "bad-at", "empty-cause", "num-cause"];
  const states = discoveryState.getDiscoveryStatesForConnections([
    ...ids.map((id) => ({ provider: "p", id })),
    { provider: "p", id: "other" },
  ]);
  assert.deepEqual([...states.keys()].sort(), ["p:empty-cause", "p:num-cause"]);
  assert.deepEqual(states.get("p:empty-cause"), { status: "degraded", cause: null, at });
  assert.deepEqual(states.get("p:num-cause"), { status: "degraded", cause: null, at });
});

test("discoveryState: connection deletes return the number of rows removed", () => {
  discoveryState.saveDiscoveryState("p", "a", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("p", "b", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("q", "a", { status: "healthy", cause: null });

  assert.equal(discoveryState.deleteDiscoveryStatesForConnections([]), 0);
  const removed = discoveryState.deleteDiscoveryStatesForConnections([
    { provider: "p", id: "a" },
    { provider: "p", id: "a" },
    { provider: "p", id: "missing" },
  ]);
  assertNotPromise(removed);
  assert.equal(removed, 1);
  assert.deepEqual(
    rows("discoveryState").map((row) => row.key),
    ["p:b", "q:a"]
  );
});

test("discoveryState: provider delete matches the literal provider prefix only", () => {
  discoveryState.saveDiscoveryState("p", "a", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("p", "b", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("pp", "a", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("p_", "a", { status: "healthy", cause: null });
  discoveryState.saveDiscoveryState("p%", "a", { status: "healthy", cause: null });
  putRaw("syncedAvailableModels", "p:a", "[]");

  const removed = discoveryState.deleteDiscoveryStatesForProvider("p");
  assertNotPromise(removed);
  assert.equal(removed, 2);
  assert.deepEqual(
    rows("discoveryState").map((row) => row.key),
    ["p%:a", "p_:a", "pp:a"]
  );
  assert.equal(rows("syncedAvailableModels").length, 1);
  assert.equal(discoveryState.deleteDiscoveryStatesForProvider("p%"), 1);
  assert.equal(discoveryState.deleteDiscoveryStatesForProvider("none"), 0);
});

// ── ccDiscoveryAliases ─────────────────────────────────────────────────────

test("ccDiscoveryAliases: settings are stored as raw on/off values under prefixed keys", () => {
  ccAliases.setCcAliasProviderSetting("prov", "on");
  ccAliases.setCcAliasModelSetting("prov", "m/1", "off");
  assert.deepEqual(rows("ccDiscoveryAliases"), [
    { key: "model:prov/m/1", value: "off" },
    { key: "provider:prov", value: "on" },
  ]);

  ccAliases.setCcAliasProviderSetting("prov", null);
  ccAliases.setCcAliasModelSetting("prov", "m/1", null);
  ccAliases.setCcAliasModelSetting("prov", "never-set", null);
  assert.deepEqual(rows("ccDiscoveryAliases"), []);
});

test("ccDiscoveryAliases: reads default to inherit and ignore unknown values", () => {
  const unset = ccAliases.getCcAliasProviderSetting("prov");
  assertNotPromise(unset);
  assert.equal(unset, null);
  assert.equal(ccAliases.getCcAliasModelSetting("prov", "m"), null);

  putRaw("ccDiscoveryAliases", "provider:prov", "yes");
  putRaw("ccDiscoveryAliases", "model:prov/m", '"on"');
  assert.equal(ccAliases.getCcAliasProviderSetting("prov"), null);
  assert.equal(ccAliases.getCcAliasModelSetting("prov", "m"), null);

  putRaw("ccDiscoveryAliases", "provider:prov", "off");
  putRaw("ccDiscoveryAliases", "model:prov/m", "on");
  assert.equal(ccAliases.getCcAliasProviderSetting("prov"), "off");
  assert.equal(ccAliases.getCcAliasModelSetting("prov", "m"), "on");
});

test("ccDiscoveryAliases: every write invalidates the model catalog in the same turn", () => {
  const writes: Array<() => void> = [
    () => ccAliases.setCcAliasProviderSetting("prov", "on"),
    () => ccAliases.setCcAliasProviderSetting("prov", null),
    () => ccAliases.setCcAliasModelSetting("prov", "m", "off"),
    () => ccAliases.setCcAliasModelSetting("prov", "m", null),
  ];
  for (const write of writes) {
    const version = readCache.getModelCatalogCacheVersion();
    const result = write() as unknown;
    // Synchronous: no Promise, so the write and the invalidation finish before any other task.
    assert.equal(result, undefined);
    assert.equal(readCache.getModelCatalogCacheVersion(), version + 1);
  }

  const version = readCache.getModelCatalogCacheVersion();
  ccAliases.getCcAliasProviderSetting("prov");
  ccAliases.getCcAliasModelSetting("prov", "m");
  ccAliases.getCcAliasSettingsBulk();
  assert.equal(readCache.getModelCatalogCacheVersion(), version);
});

test("ccDiscoveryAliases: bulk read splits provider and model overrides", () => {
  ccAliases.setCcAliasProviderSetting("a", "on");
  ccAliases.setCcAliasProviderSetting("b", "off");
  ccAliases.setCcAliasModelSetting("a", "x", "off");
  putRaw("ccDiscoveryAliases", "provider:c", "maybe");
  putRaw("ccDiscoveryAliases", "stray", "on");
  putRaw("functionalGatewayMirrors", "provider:z", "on");

  const bulk = ccAliases.getCcAliasSettingsBulk();
  assertNotPromise(bulk);
  assert.deepEqual([...bulk.providers.entries()].sort(), [
    ["a", "on"],
    ["b", "off"],
  ]);
  assert.deepEqual([...bulk.models.entries()], [["a/x", "off"]]);
});

test("ccDiscoveryAliases: global state precedence is env > feature-flag override > default", () => {
  assert.deepEqual(ccAliases.getCcAliasGlobalState(), { enabled: false, source: "default" });
  assert.equal(ccAliases.isCcAliasGlobalEnabled(), false);

  featureFlags.setFeatureFlagOverride("EXPOSE_CC_DISCOVERY_ALIASES", "1");
  assert.deepEqual(ccAliases.getCcAliasGlobalState(), { enabled: true, source: "db" });
  featureFlags.setFeatureFlagOverride("EXPOSE_CC_DISCOVERY_ALIASES", "false");
  assert.deepEqual(ccAliases.getCcAliasGlobalState(), { enabled: false, source: "db" });

  process.env.EXPOSE_CC_DISCOVERY_ALIASES = "true";
  assert.deepEqual(ccAliases.getCcAliasGlobalState(), { enabled: true, source: "env" });
  process.env.EXPOSE_CC_DISCOVERY_ALIASES = "0";
  assert.deepEqual(ccAliases.getCcAliasGlobalState(), { enabled: false, source: "db" });
  assert.equal(ccAliases.isCcAliasGlobalEnabled(), false);
});

test("ccDiscoveryAliases: the precedence resolver is unchanged", () => {
  assert.equal(
    ccAliases.resolveCcAliasEnabled({ model: "on", provider: "off", global: false }),
    true
  );
  assert.equal(
    ccAliases.resolveCcAliasEnabled({ model: "off", provider: "on", global: true }),
    false
  );
  assert.equal(
    ccAliases.resolveCcAliasEnabled({ model: null, provider: "off", global: true }),
    false
  );
  assert.equal(ccAliases.resolveCcAliasEnabled({ provider: "on", global: false }), true);
  assert.equal(ccAliases.resolveCcAliasEnabled({ global: true }), true);
});
