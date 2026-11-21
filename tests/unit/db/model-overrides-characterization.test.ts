/**
 * Characterization of the public model-override and auto-candidate DB helpers.
 * Uses only the long-standing exports so it runs unchanged before and after the
 * repository extraction: ordering, normalization, defaults, cache invalidation,
 * snapshot rebuilds and the never-throw read paths.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-overrides-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const capabilities = await import("../../../src/lib/db/modelCapabilityOverrides.ts");
const contexts = await import("../../../src/lib/db/modelContextOverrides.ts");
const autoCandidates = await import("../../../src/lib/db/autoCandidateOverrides.ts");
const snapshot = await import("../../../src/lib/modelCapabilityResolutionSnapshot.ts");

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

function setRefreshedAt(table: string, provider: string, modelId: string, at: string): void {
  core
    .getDbInstance()
    .prepare(`UPDATE ${table} SET refreshed_at = ? WHERE provider = ? AND model_id = ?`)
    .run(at, provider, modelId);
}

function catalogVersion(): number {
  return readCache.getModelCatalogCacheVersion();
}

test("capability overrides: normalization, typed reads and rejected values", () => {
  assert.equal(
    capabilities.setModelCapabilityOverride(" codex / gpt-5.6 ", "max_output_tokens", 8192),
    true
  );
  assert.equal(
    capabilities.getModelCapabilityOverride("codex", "gpt-5.6", "max_output_tokens"),
    8192
  );
  // Numeric reads are keyed: a different numeric key or a boolean read sees nothing.
  assert.equal(
    capabilities.getModelCapabilityOverride("codex", "gpt-5.6", "max_input_tokens"),
    null
  );
  assert.equal(capabilities.getBooleanModelCapabilityOverride("codex", "gpt-5.6", "vision"), null);

  assert.equal(capabilities.setModelCapabilityOverride("codex/gpt-5.6", "vision", "false"), true);
  assert.equal(capabilities.getBooleanModelCapabilityOverride("codex", "gpt-5.6", "vision"), false);
  assert.equal(
    capabilities.setModelCapabilityOverride("codex/gpt-5.6", "reasoning_efforts", ["low", "HIGH"]),
    true
  );
  assert.deepEqual(capabilities.getReasoningEffortsOverride("codex", "gpt-5.6"), ["low", "high"]);
  assert.equal(
    capabilities.setModelCapabilityOverride("codex/gpt-5.6", "reasoning_efforts", "low, max"),
    true
  );
  assert.deepEqual(capabilities.getReasoningEffortsOverride("codex", "gpt-5.6"), ["low", "max"]);

  for (const [target, key, value] of [
    ["codex", "max_output_tokens", 1],
    ["/gpt", "max_output_tokens", 1],
    ["codex/", "max_output_tokens", 1],
    ["codex/gpt-5.6", "max_output_tokens", 0],
    ["codex/gpt-5.6", "max_output_tokens", 1.5],
    ["codex/gpt-5.6", "max_output_tokens", "8192"],
    ["codex/gpt-5.6", "vision", "yes"],
    ["codex/gpt-5.6", "reasoning_efforts", "turbo"],
    ["codex/gpt-5.6", "unknown_key", 1],
  ] as const) {
    assert.equal(
      capabilities.setModelCapabilityOverride(target, key as never, value as never),
      false,
      `${target} ${key} ${String(value)} must be rejected`
    );
  }
  assert.equal(
    capabilities.getModelCapabilityOverride("codex", "gpt-5.6", "max_output_tokens"),
    8192
  );
  // Provider/model lookups are split on the first slash and tolerate nullish halves.
  assert.equal(capabilities.getModelCapabilityOverride(null, "gpt-5.6", "max_output_tokens"), null);
  assert.equal(
    capabilities.getModelCapabilityOverride("codex", undefined, "max_output_tokens"),
    null
  );
  assert.equal(
    capabilities.getModelCapabilityOverride("codex", "gpt-5.6", "vision" as never),
    null,
    "a non-numeric key never reads through the numeric getter"
  );
});

test("single-row capability reads keep their SQL statements", () => {
  const db = core.getDbInstance();
  const original = db.prepare;
  const statements: string[] = [];
  db.prepare = function (this: typeof db, sql: string) {
    statements.push(sql);
    return original.call(this, sql);
  } as typeof db.prepare;
  try {
    capabilities.getReasoningEffortsOverride("p", "m");
    capabilities.getModelCapabilityOverride("p", "m", "max_token");
    capabilities.getBooleanModelCapabilityOverride("p", "m", "vision");
  } finally {
    db.prepare = original;
  }
  const select = "SELECT provider, model_id, override_key, override_value, refreshed_at ";
  const byPair =
    "FROM model_capability_overrides WHERE provider = ? AND model_id = ? AND override_key = ";
  assert.deepEqual(statements, [
    `${select}${byPair}'reasoning_efforts'`,
    `${select}${byPair}?`,
    `${select}${byPair}?`,
  ]);
});

test("capability overrides: list order, skipped corrupt rows and removal", () => {
  capabilities.setModelCapabilityOverride("a/one", "max_input_tokens", 100);
  capabilities.setModelCapabilityOverride("b/two", "tool_calling", true);
  setRefreshedAt("model_capability_overrides", "a", "one", "2026-01-01 00:00:00");
  setRefreshedAt("model_capability_overrides", "b", "two", "2026-01-02 00:00:00");
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT INTO model_capability_overrides (provider, model_id, override_key, override_value, refreshed_at) VALUES (?, ?, ?, ?, ?)"
  );
  insert.run("c", "bad-json", "max_token", "{", "2026-01-03 00:00:00");
  insert.run("c", "bad-key", "colour", "1", "2026-01-03 00:00:00");
  insert.run("c", "bad-bool", "vision", "1", "2026-01-03 00:00:00");
  insert.run("c", "bad-efforts", "reasoning_efforts", '["low","low"]', "2026-01-03 00:00:00");

  assert.deepEqual(capabilities.listModelCapabilityOverrides(), [
    {
      provider: "b",
      modelId: "two",
      target: "b/two",
      key: "tool_calling",
      value: true,
      refreshedAt: "2026-01-02 00:00:00",
    },
    {
      provider: "a",
      modelId: "one",
      target: "a/one",
      key: "max_input_tokens",
      value: 100,
      refreshedAt: "2026-01-01 00:00:00",
    },
  ]);
  assert.equal(capabilities.getBooleanModelCapabilityOverride("c", "bad-bool", "vision"), null);
  assert.equal(capabilities.removeModelCapabilityOverride("a/one", "max_input_tokens"), true);
  assert.equal(capabilities.removeModelCapabilityOverride("a/one", "max_input_tokens"), false);
  assert.equal(capabilities.removeModelCapabilityOverride("a", "max_input_tokens"), false);
});

test("context overrides: trimming, source normalization, replacement and order", () => {
  assert.equal(contexts.setModelContextOverride(" openai ", " gpt-5 ", 400000), true);
  assert.deepEqual(
    { ...contexts.getModelContextOverrideRecord("openai", "gpt-5"), refreshedAt: "x" },
    {
      provider: "openai",
      modelId: "gpt-5",
      realContext: 400000,
      source: "manual",
      refreshedAt: "x",
    }
  );
  assert.equal(
    contexts.setModelContextOverride("openai", "gpt-5", 200000, "bogus" as never),
    true,
    "an unknown source is stored as manual"
  );
  assert.equal(contexts.getModelContextOverrideRecord("openai", "gpt-5")?.source, "manual");
  assert.equal(contexts.setModelContextOverride("openai", "gpt-5", 128000, "auto:discovery"), true);
  assert.equal(contexts.getModelContextOverride("openai", "gpt-5"), 128000);
  assert.equal(contexts.getModelContextOverrideRecord("openai", "gpt-5")?.source, "auto:discovery");

  for (const value of [0, -1, 1.5, Number.NaN, "4096" as never]) {
    assert.equal(contexts.setModelContextOverride("openai", "gpt-5", value), false);
  }
  assert.equal(contexts.setModelContextOverride(" ", "gpt-5", 1), false);
  assert.equal(contexts.getModelContextOverride("openai", "gpt-5"), 128000);
  assert.equal(contexts.getModelContextOverride(null, "gpt-5"), null);

  contexts.setModelContextOverride("anthropic", "claude", 1000000);
  setRefreshedAt("model_context_overrides", "openai", "gpt-5", "2026-01-01 00:00:00");
  setRefreshedAt("model_context_overrides", "anthropic", "claude", "2026-01-02 00:00:00");
  assert.deepEqual(
    contexts.listModelContextOverrides().map((row) => `${row.provider}/${row.modelId}`),
    ["anthropic/claude", "openai/gpt-5"]
  );

  const bulk = new Map([["openai", new Map([["gpt-5", 7]])]]);
  assert.equal(contexts.getModelContextOverride(" openai ", "gpt-5 ", bulk), 7);
  assert.equal(contexts.getModelContextOverride("anthropic", "claude", bulk), null);
  assert.equal(contexts.getModelContextOverride("", "claude", bulk), null);

  assert.equal(contexts.removeModelContextOverride(" openai", "gpt-5 "), true);
  assert.equal(contexts.removeModelContextOverride("openai", "gpt-5"), false);
  assert.equal(contexts.removeModelContextOverride("", "gpt-5"), false);
});

test("writes invalidate the model catalog only when they change a row", () => {
  let before = catalogVersion();
  capabilities.setModelCapabilityOverride("codex/gpt", "max_output_tokens", 10);
  assert.ok(catalogVersion() > before, "capability set invalidates");
  before = catalogVersion();
  capabilities.setModelCapabilityOverride("codex/gpt", "max_output_tokens", 0);
  assert.equal(catalogVersion(), before, "a rejected capability write does not invalidate");
  capabilities.removeModelCapabilityOverride("codex/missing", "max_output_tokens");
  assert.equal(catalogVersion(), before, "a no-op capability removal does not invalidate");
  capabilities.removeModelCapabilityOverride("codex/gpt", "max_output_tokens");
  assert.ok(catalogVersion() > before, "capability removal invalidates");

  before = catalogVersion();
  contexts.setModelContextOverride("codex", "gpt", 10);
  assert.ok(catalogVersion() > before, "context set invalidates");
  before = catalogVersion();
  contexts.setModelContextOverride("codex", "gpt", 20, "auto:discovery", { invalidate: false });
  contexts.removeModelContextOverride("codex", "missing");
  contexts.setModelContextOverride("codex", "gpt", -1);
  assert.equal(
    catalogVersion(),
    before,
    "batch, no-op and rejected context writes do not invalidate"
  );
  assert.equal(contexts.getModelContextOverride("codex", "gpt"), 20);
  contexts.removeModelContextOverride("codex", "gpt", { invalidate: false });
  assert.equal(catalogVersion(), before);
  assert.equal(contexts.getModelContextOverride("codex", "gpt"), null);
  contexts.setModelContextOverride("codex", "gpt", 30);
  before = catalogVersion();
  contexts.removeModelContextOverride("codex", "gpt");
  assert.ok(catalogVersion() > before, "context removal invalidates");
});

test("a rebuilt resolution snapshot reflects every override family", () => {
  const empty = snapshot.createModelCapabilityResolutionSnapshot();
  assert.equal(empty.maxTokenOverrides.size, 0);
  assert.equal(empty.contextOverrides.size, 0);

  capabilities.setModelCapabilityOverride("p/m", "max_output_tokens", 11);
  capabilities.setModelCapabilityOverride("p/m", "max_input_tokens", 22);
  capabilities.setModelCapabilityOverride("p/m", "reasoning_efforts", "low");
  capabilities.setModelCapabilityOverride("p/m", "attachment", true);
  contexts.setModelContextOverride("p", "m", 33);
  const rebuilt = snapshot.createModelCapabilityResolutionSnapshot();
  assert.equal(rebuilt.maxTokenOverrides.get("p")?.get("m"), 11);
  assert.equal(rebuilt.maxInputTokenOverrides.get("p")?.get("m"), 22);
  assert.deepEqual(rebuilt.reasoningEffortsOverrides.get("p")?.get("m"), ["low"]);
  assert.equal(rebuilt.booleanCapabilityOverrides?.get("p")?.get("m")?.get("attachment"), true);
  assert.equal(rebuilt.contextOverrides.get("p")?.get("m"), 33);
  assert.equal(
    capabilities.getModelCapabilityOverride(
      "p",
      "m",
      "max_output_tokens",
      rebuilt.maxTokenOverrides
    ),
    11
  );

  capabilities.removeModelCapabilityOverride("p/m", "max_output_tokens");
  contexts.removeModelContextOverride("p", "m");
  const afterRemoval = snapshot.createModelCapabilityResolutionSnapshot();
  assert.equal(afterRemoval.maxTokenOverrides.size, 0);
  assert.equal(afterRemoval.contextOverrides.size, 0);
});

test("reads fall back to no override when the tables are missing", () => {
  capabilities.setModelCapabilityOverride("p/m", "max_output_tokens", 11);
  contexts.setModelContextOverride("p", "m", 33);
  const db = core.getDbInstance();
  db.exec("DROP TABLE model_capability_overrides");
  db.exec("DROP TABLE model_context_overrides");
  assert.equal(capabilities.getModelCapabilityOverride("p", "m", "max_output_tokens"), null);
  assert.equal(capabilities.getBooleanModelCapabilityOverride("p", "m", "vision"), null);
  assert.equal(capabilities.getReasoningEffortsOverride("p", "m"), null);
  assert.deepEqual(capabilities.listModelCapabilityOverrides(), []);
  assert.equal(contexts.getModelContextOverrideRecord("p", "m"), null);
  assert.equal(contexts.getModelContextOverride("p", "m"), null);
  assert.deepEqual(contexts.listModelContextOverrides(), []);
  assert.throws(() => capabilities.setModelCapabilityOverride("p/m", "max_output_tokens", 1));
  assert.throws(() => contexts.setModelContextOverride("p", "m", 1));
});

test("auto-candidate exclusions keep their row identity across upserts", async () => {
  assert.deepEqual([...(await autoCandidates.getExcludedConnectionIds("", "auto/x"))], []);
  assert.deepEqual(await autoCandidates.listOverrides("key", ""), []);

  const first = await autoCandidates.setExcluded("key", "auto/coding", "conn-a", true);
  assert.equal(first.excluded, true);
  const toggled = await autoCandidates.setExcluded("key", "auto/coding", "conn-a", false);
  assert.equal(toggled.id, first.id, "the upsert keeps the original id");
  assert.equal(toggled.createdAt, first.createdAt, "the upsert keeps createdAt");
  assert.equal(toggled.excluded, false);

  await autoCandidates.setExcluded("key", "auto/coding", "conn-b", true);
  await autoCandidates.setExcluded("key", "auto/other", "conn-c", true);
  await autoCandidates.setExcluded("other-key", "auto/coding", "conn-d", true);
  assert.deepEqual(
    [...(await autoCandidates.getExcludedConnectionIds("key", "auto/coding"))],
    ["conn-b"]
  );
  assert.deepEqual(
    (await autoCandidates.listOverrides("key", "auto/coding")).map((row) => [
      row.connectionId,
      row.excluded,
    ]),
    [
      ["conn-a", false],
      ["conn-b", true],
    ]
  );
});
