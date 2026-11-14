import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-model-policy-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "model-policy-fixture";
const core = await import("../../../src/lib/db/core.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const limits = await import("../../../src/lib/db/tokenLimits.ts");
const counter = await import("../../../open-sse/services/tokenLimitCounter.ts");
const templates = await import("../../../src/lib/db/keyTemplates.ts");
const apiKeys = await import("../../../src/lib/db/apiKeys.ts");
const { createDefaultKeyTemplatePolicy } =
  await import("../../../src/shared/types/keyTemplates.ts");
const NOW = Date.UTC(2026, 10, 12, 12);
let db: ReturnType<typeof core.getDbInstance>;
test.beforeEach(() => {
  mock.timers.enable({ apis: ["Date"], now: NOW });
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  counter.clearTokenLimitCache();
  db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='240'").run();
});
test.afterEach(() => {
  core.resetDbInstance();
  mock.timers.reset();
});
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));
function read(table: string) {
  return db.prepare("SELECT * FROM " + table + " ORDER BY 1,2").all();
}
function modelLimit(scopeValue: string, tokenLimit = 50000, resetTime = "00:00") {
  return limits.upsertTokenLimit({
    apiKeyId: "key",
    scopeType: "model",
    scopeValue,
    tokenLimit,
    resetInterval: "daily",
    resetTime,
    enabled: true,
  });
}
for (const differentSchedules of [false, true]) {
  test(
    "A independent opaque model policies retain rows/counters/logs and schedules: " +
      differentSchedules,
    async () => {
      const entries = [
        modelLimit("moonshot/custom", 7),
        modelLimit("kimi/custom", 11, differentSchedules ? "06:00" : "00:00"),
      ];
      for (const [index, entry] of entries.entries()) {
        limits.incrementWindowTokens(
          entry.id,
          limits.resetWindowIfElapsed(entry, NOW).windowStart,
          2 + index * 2
        );
        db.prepare(
          "INSERT INTO api_key_token_limit_reset_logs(limit_id,reset_at,prev_tokens,window_start) VALUES(?,?,?,?)"
        ).run(entry.id, "original-audit-" + index, 13 + index, "older-window-" + index);
      }
      const before = [
        "api_key_token_limits",
        "api_key_token_counters",
        "api_key_token_limit_reset_logs",
      ].map(read);
      assert.doesNotThrow(() => runMigrations(db));
      assert.deepEqual(
        ["api_key_token_limits", "api_key_token_counters", "api_key_token_limit_reset_logs"].map(
          read
        ),
        before
      );
      counter.recordTokenUsage("key", "kimi", "custom", 3, NOW);
      await new Promise(setImmediate);
      assert.deepEqual(
        entries.map((entry) => limits.getWindowUsage(entry, NOW)),
        [5, 7]
      );
      assert.equal(counter.checkTokenLimits("key", "moonshot", "custom", NOW), null);
      counter.recordTokenUsage("key", "moonshot", "custom", 2, NOW);
      await new Promise(setImmediate);
      assert.deepEqual(
        entries.map((entry) => limits.getWindowUsage(entry, NOW)),
        [7, 9]
      );
      assert.equal(counter.checkTokenLimits("key", "kimi", "custom", NOW)?.limitId, entries[0].id);
    }
  );
}

test("A cold model history retains exact unrelated wire matches and only literal API suffix matches", () => {
  for (const [provider, model, tokens] of [
    ["openrouter", "moonshot/custom", 100],
    ["api-airforce", "kimi/custom", 200],
    ["moonshot", "custom", 2],
    ["kimi", "custom", 3],
    ["moonshot", "moonshot/custom", 5],
    ["kimi", "kimi/custom", 7],
    ["moonshot", "kimi/custom", 11],
    ["kimi", "moonshot/custom", 13],
    [null, "moonshot/custom", 17],
    ["openai", "custom", 1000],
    ["openai", "openrouter/moonshot/custom", 19],
  ])
    db.prepare(
      "INSERT INTO usage_history(api_key_id,provider,model,timestamp,tokens_input) VALUES('key',?,?,?,?)"
    ).run(provider, model, new Date(NOW - 1000).toISOString(), tokens);
  db.prepare(
    "INSERT INTO usage_history(api_key_id,provider,model,timestamp,tokens_input) VALUES('key','openrouter','moonshot/custom',?,10000)"
  ).run(new Date(NOW - 100).toISOString());
  const history = read("usage_history");
  const entries = [
    modelLimit("moonshot/custom"),
    modelLimit("kimi/custom"),
    modelLimit("openrouter/moonshot/custom"),
    modelLimit("custom"),
  ];
  assert.deepEqual(
    entries.map((entry) => counter.seedWindowUsageFromHistory(entry, NOW, NOW - 100)),
    [140, 223, 19, 1005]
  );
  assert.deepEqual(read("usage_history"), history);
});

test("A intact resolved wire IDs record into their exact and surrounding qualified policies independently", async () => {
  runMigrations(db);
  const entries = [
    modelLimit("moonshot/custom", 30),
    modelLimit("kimi/custom", 30),
    modelLimit("kimi/moonshot/custom", 3),
    modelLimit("moonshot/moonshot/custom", 30),
  ];
  counter.recordTokenUsage("key", "kimi", "moonshot/custom", 3, NOW);
  await new Promise(setImmediate);
  assert.deepEqual(
    entries.map((entry) => limits.getWindowUsage(entry, NOW)),
    [3, 0, 3, 3]
  );
  assert.equal(
    counter.checkTokenLimits("key", "moonshot", "moonshot/custom", NOW)?.limitId,
    entries[2].id
  );
  assert.equal(counter.checkTokenLimits("key", "kimi", "kimi/custom", NOW), null);
  counter.recordTokenUsage("key", "moonshot", "kimi/custom", 5, NOW);
  await new Promise(setImmediate);
  assert.deepEqual(
    entries.map((entry) => limits.getWindowUsage(entry, NOW)),
    [3, 5, 3, 3]
  );
  assert.deepEqual(
    limits
      .getTokenLimitsForRequest("key", "", "moonshot/moonshot/custom")
      .map((entry) => entry.id)
      .sort(),
    [entries[0].id, entries[2].id, entries[3].id].sort()
  );
});

test("A saved template keeps every model policy independent while only provider scopes merge", async () => {
  const policy = createDefaultKeyTemplatePolicy();
  const models = [
    {
      scopeType: "model" as const,
      scopeValue: "moonshot/custom",
      tokenLimit: 7,
      resetInterval: "daily" as const,
      resetTime: "00:00",
      enabled: true,
    },
    {
      scopeType: "model" as const,
      scopeValue: "kimi/custom",
      tokenLimit: 11,
      resetInterval: "daily" as const,
      resetTime: "06:00",
      enabled: true,
    },
    {
      scopeType: "model" as const,
      scopeValue: "openrouter/moonshot/custom",
      tokenLimit: 19,
      resetInterval: "weekly" as const,
      resetTime: "01:00",
      enabled: false,
    },
  ];
  policy.related.tokenLimits = [
    ...models,
    ...["moonshot", "kimi"].map((scopeValue) => ({
      scopeType: "provider" as const,
      scopeValue,
      tokenLimit: scopeValue === "kimi" ? 3 : 5,
      resetInterval: "daily" as const,
      resetTime: "00:00",
      enabled: true,
    })),
  ];
  const stored = await templates.createKeyTemplate({ name: "opaque model policies", policy });
  assert.doesNotThrow(() => runMigrations(db));
  const migrated = templates.getKeyTemplate(stored.id)!.template.policy;
  assert.deepEqual(
    migrated.related.tokenLimits.filter((entry) => entry.scopeType === "model"),
    models
  );
  assert.deepEqual(
    migrated.related.tokenLimits.filter((entry) => entry.scopeType === "provider"),
    [
      {
        scopeType: "provider",
        scopeValue: "kimi",
        tokenLimit: 3,
        resetInterval: "daily",
        resetTime: "00:00",
        enabled: true,
      },
    ]
  );
  const key = await apiKeys.createApiKeyFromPolicy("applied opaque policy", "fixture", migrated);
  assert.deepEqual(
    limits
      .listTokenLimits(key.id)
      .filter((entry) => entry.scopeType === "model")
      .map(({ scopeValue, tokenLimit, resetInterval, resetTime, enabled }) => ({
        scopeValue,
        tokenLimit,
        resetInterval,
        resetTime,
        enabled,
      }))
      .sort((a, b) => a.scopeValue.localeCompare(b.scopeValue)),
    models
      .map(({ scopeType, ...entry }) => entry)
      .sort((a, b) => a.scopeValue.localeCompare(b.scopeValue))
  );
});
