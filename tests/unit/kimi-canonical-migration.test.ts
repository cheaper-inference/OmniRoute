import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-migration-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "kimi-migration-fixture-secret";
const core = await import("../../src/lib/db/core.ts");
const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");
const limits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");
const quota = await import("../../src/lib/quota/providerQuotaState.ts");
const affinity = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const { resolveUsageAccountIdentity } = await import("../../src/lib/usage/accountIdentity.ts");

const NOW = Date.UTC(2026, 10, 12, 12);
const DAY = Date.UTC(2026, 10, 12);
type Row = Record<string, unknown>;
let db: ReturnType<typeof core.getDbInstance>;
function insert(table: string, row: Row) {
  const keys = Object.keys(row);
  db.prepare(
    "INSERT INTO " +
      table +
      "(" +
      keys.join(",") +
      ") VALUES (" +
      keys.map(() => "?").join(",") +
      ")"
  ).run(...Object.values(row));
}
function kv(namespace: string, key: string, value: unknown) {
  insert("key_value", { namespace, key, value: JSON.stringify(value) });
}
function read(table: string) {
  return db.prepare<Row>("SELECT * FROM " + table + " ORDER BY 1,2").all();
}
function migrate() {
  return runMigrations(db);
}
function connection(provider: string) {
  insert("provider_connections", {
    id: provider,
    provider,
    api_key: "encrypted-fixture",
    provider_specific_data: '{"baseUrl":"https://api.moonshot.cn/v1","label":"moonshot/keep"}',
    default_model: provider + "/kimi-k3",
    created_at: "old",
    updated_at: "old",
  });
}
function budget(provider: string, options: Row = {}) {
  insert("api_key_token_limits", {
    id: provider,
    api_key_id: "key",
    scope_type: "provider",
    scope_value: provider,
    token_limit: 100,
    reset_interval: "daily",
    reset_time: "00:00",
    enabled: 1,
    ...options,
  });
}
function usage(provider: string, model = "kimi-k3", tokens = 40) {
  insert("usage_history", {
    provider,
    model,
    api_key_id: "key",
    timestamp: new Date(NOW - 1000).toISOString(),
    tokens_input: tokens,
    tokens_output: 0,
  });
}
test.beforeEach(() => {
  mock.timers.enable({ apis: ["Date"], now: NOW });
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  counter.clearTokenLimitCache();
  db = core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version = '239'").run();
});
test.afterEach(() => {
  core.resetDbInstance();
  mock.timers.reset();
});
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

for (const providers of [[], ["moonshot"], ["kimi"], ["moonshot", "kimi"]]) {
  test("runner preserves connection accounts/history and reruns: " + providers.join(","), () => {
    for (const provider of providers) connection(provider);
    usage("moonshot");
    insert("call_logs", {
      id: "historical",
      timestamp: "2026-11-12",
      provider: "moonshot",
      model: "moonshot/kimi-k3",
      requested_model: "moonshot/kimi-k3",
      error_summary: "moonshot/preserve",
    });
    const calls = read("call_logs");
    const history = read("usage_history");
    const before = read("provider_connections");
    assert.equal(migrate(), 1);
    assert.deepEqual(
      read("provider_connections"),
      before.map((row) => ({ ...row, provider: "kimi" }))
    );
    assert.deepEqual(read("usage_history"), history);
    assert.deepEqual(read("call_logs"), calls);
    const snapshot = read("provider_connections");
    assert.equal(migrate(), 0);
    assert.deepEqual(read("provider_connections"), snapshot);
  });
}

test("schema-aware settings/targets preserve explicit values, manual fields, aliases and arbitrary text", () => {
  kv("customModels", "moonshot", [
    { id: "shared", source: "manual", supportsVision: false, extra: 1 },
    { id: "old" },
  ]);
  kv("customModels", "kimi", [
    { id: "shared", source: "discovered", supportsVision: true, name: "new" },
    { id: "new" },
  ]);
  kv("pricing", "moonshot", { shared: { input: 3, output: 4 }, old: { input: 2 } });
  kv("pricing", "kimi", { shared: { input: 0, cached: null } });
  kv("modelCompatOverrides", "moonshot", [
    {
      id: "shared",
      normalizeToolCallId: true,
      compatByProtocol: { openai: { preserveVideoUrl: false } },
    },
  ]);
  kv("modelCompatOverrides", "kimi", [
    {
      id: "shared",
      normalizeToolCallId: false,
      compatByProtocol: { claude: { preserveVideoUrl: true } },
    },
  ]);
  kv("providerAliases", "moonshot", { fast: "moonshot/wire-id" });
  kv("syncedAvailableModels", "moonshot:connection", ["kimi-k3"]);
  kv("modelAliases", "moonshot/kimi-k3", "nickname");
  kv("modelAliases", "nickname", "moonshot/kimi-k3");
  kv("modelAliases", "moonshot/collision", "old nickname");
  kv("modelAliases", "kimi/collision", "user nickname");
  kv("managedModelAliasNames", "names", ["moonshot/kimi-k3", "moonshot/collision", "human"]);
  kv("proxyConfig", "providers", {
    moonshot: { url: "https://moonshot/preserve" },
    kimi: { enabled: false },
    other: { url: "moonshot/keep" },
  });
  kv("mitmAlias", "tool", { model: "moonshot/kimi-k3", name: "moonshot/keep" });
  insert("key_value", { namespace: "ccDiscoveryAliases", key: "provider:moonshot", value: "off" });
  kv("functionalGatewayMirrors", "model:moonshot/kimi-k3", false);
  insert("key_value", { namespace: "providerAliases", key: "kimi", value: "malformed{" });
  insert("combos", {
    id: "combo",
    name: "combo",
    data: JSON.stringify({
      models: [
        "moonshot/kimi-k3",
        {
          provider: "moonshot",
          model: "kimi-k3",
          connectionId: "moonshot",
          label: "moonshot/keep",
        },
      ],
      systemPrompt: "moonshot/keep",
    }),
    created_at: "old",
    updated_at: "old",
  });
  insert("session_model_history", {
    session_id: "session",
    combo_name: "combo",
    provider: "moonshot",
    model_str: "moonshot/kimi-k3",
    connection_id: "moonshot",
  });
  migrate();
  const get = (namespace: string, key: string) =>
    JSON.parse(
      db
        .prepare<{ value: string }>("SELECT value FROM key_value WHERE namespace=? AND key=?")
        .get(namespace, key)!.value
    );
  assert.deepEqual(get("pricing", "kimi"), {
    shared: { input: 0, output: 4, cached: null },
    old: { input: 2 },
  });
  const custom = get("customModels", "kimi");
  assert.equal(custom.find((v: Row) => v.id === "shared").supportsVision, false);
  assert.equal(custom.length, 3);
  assert.equal(get("modelCompatOverrides", "kimi")[0].normalizeToolCallId, false);
  assert.equal(
    get("providerAliases", "moonshot").fast,
    "moonshot/wire-id",
    "malformed destination retains both original rows"
  );
  assert.equal(get("modelAliases", "kimi/kimi-k3"), "nickname");
  assert.equal(get("modelAliases", "nickname"), "kimi/kimi-k3");
  assert.deepEqual(get("managedModelAliasNames", "names"), ["kimi/kimi-k3", "human"]);
  assert.equal(
    db
      .prepare<{ value: string }>(
        "SELECT value FROM key_value WHERE namespace=\'ccDiscoveryAliases\' AND key=\'provider:kimi\'"
      )
      .get()?.value,
    "off"
  );
  assert.equal(get("functionalGatewayMirrors", "model:kimi/kimi-k3"), false);
  assert.deepEqual(get("mitmAlias", "tool"), { model: "kimi/kimi-k3", name: "moonshot/keep" });
  const combo = JSON.parse(String(read("combos")[0].data));
  assert.equal(combo.systemPrompt, "moonshot/keep");
  assert.equal(combo.models[1].connectionId, "moonshot");
  assert.equal(read("session_model_history")[0].model_str, combo.models[0]);
});

test("issuance, learned snapshots, manual context and relational affinity merge by their contracts", () => {
  for (const provider of ["moonshot", "kimi"]) {
    insert("provider_key_limits", {
      provider,
      max_active_keys: provider === "kimi" ? null : 5,
      daily_issue_limit: provider === "kimi" ? 10 : 20,
      hourly_issue_limit: null,
      daily_issued: 2,
      hourly_issued: 3,
      last_reset_day: "2026-11-12",
      last_reset_hour: provider === "kimi" ? "2026-11-12T12" : "2026-11-12T11",
    });
    insert("combo_adaptation_state", {
      combo_id: "combo",
      provider_id: provider,
      learned_score: provider === "kimi" ? 0.1 : 0.9,
      request_count: provider === "kimi" ? 10 : 20,
      success_count: 1,
      updated_at: provider === "kimi" ? "2026-11-11" : "2026-11-12",
      excluded_until: provider === "kimi" ? "2026-11-14" : "2026-11-13",
      last_failure_at: provider === "kimi" ? "2026-11-10" : "2026-11-12",
    });
    insert("model_context_overrides", {
      provider,
      model_id: "kimi-k3",
      real_context: provider === "kimi" ? 10 : 20,
      source: provider === "kimi" ? "auto:discovery" : "manual",
    });
    insert("session_account_affinity", {
      session_key: "session",
      provider,
      connection_id: provider,
      created_at: "old",
      last_seen_at: provider === "kimi" ? "2026-11-11" : "2026-11-12",
    });
  }
  migrate();
  const cap = read("provider_key_limits")[0];
  assert.equal(cap.max_active_keys, 5);
  assert.equal(cap.daily_issue_limit, 10);
  assert.equal(cap.daily_issued, 4);
  assert.equal(cap.hourly_issued, 3);
  const learned = read("combo_adaptation_state")[0];
  assert.equal(learned.request_count, 20);
  assert.equal(learned.learned_score, 0.9);
  assert.equal(learned.excluded_until, "2026-11-14");
  assert.equal(read("model_context_overrides")[0].real_context, 20);
  assert.equal(read("session_account_affinity")[0].connection_id, "moonshot");
});

for (const scope of ["provider", "model"]) {
  for (const warm of ["neither", "moonshot", "kimi"]) {
    test("cold/mixed " + scope + " budgets preserve separated history: " + warm, async () => {
      for (const provider of ["moonshot", "kimi"]) {
        budget(provider, {
          scope_type: scope,
          scope_value: scope === "model" ? provider + "/kimi-k3" : provider,
          token_limit: warm === "neither" ? 80 : 100,
        });
        usage(provider);
        if (provider === warm)
          insert("api_key_token_counters", {
            limit_id: provider,
            window_start: String(DAY),
            tokens_used: 60,
          });
      }
      usage("other", "kimi-k3", 10000);
      const history = read("usage_history");
      insert("api_key_token_counters", {
        limit_id: "moonshot",
        window_start: String(DAY - 86400000),
        tokens_used: 5,
      });
      insert("api_key_token_limit_reset_logs", {
        limit_id: "moonshot",
        prev_tokens: 7,
        window_start: "old",
        reset_at: "audit",
      });
      const before = [
        read("api_key_token_limits"),
        read("api_key_token_counters"),
        read("api_key_token_limit_reset_logs"),
      ];
      migrate();
      if (scope === "model") {
        assert.deepEqual(
          [
            read("api_key_token_limits"),
            read("api_key_token_counters"),
            read("api_key_token_limit_reset_logs"),
          ],
          before
        );
        const applicable = limits.getTokenLimitsForRequest("key", "kimi", "kimi-k3");
        assert.equal(applicable.length, 2);
        const expected = applicable.map((limit) => (limit.id === warm ? 60 : 80));
        assert.deepEqual(
          applicable.map((limit) => counter.getCurrentWindowUsage(limit, NOW, true)),
          expected
        );
        assert.equal(read("api_key_token_counters").length, 3);
        assert.equal(read("api_key_token_limit_reset_logs")[0].limit_id, "moonshot");
        for (const prefix of ["moonshot", "kimi"]) {
          assert.equal(limits.getTokenLimitsForRequest("key", "", prefix + "/kimi-k3").length, 2);
          assert.equal(
            Boolean(counter.checkTokenLimits("key", "", prefix + "/kimi-k3")),
            warm === "neither"
          );
        }
        counter.recordTokenUsage("key", "moonshot", "kimi-k3", 10, NOW);
        await new Promise(setImmediate);
        assert.deepEqual(
          applicable.map((limit) => limits.getWindowUsage(limit, NOW)),
          expected.map((used) => used + 10)
        );
        assert.deepEqual(read("usage_history"), history);
        assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(), []);
        return;
      }
      const expected = warm === "neither" ? 80 : 100;
      assert.equal(read("api_key_token_limits")[0].id, "kimi");
      assert.equal(
        counter.getCurrentWindowUsage(
          limits.getTokenLimitsForRequest("key", "kimi", "kimi-k3")[0],
          NOW,
          true
        ),
        expected
      );
      assert.equal(read("api_key_token_limit_reset_logs")[0].reset_at, "audit");
      assert.equal(read("api_key_token_counters").length, 2);
      for (const prefix of ["moonshot", "kimi"]) {
        assert.equal(limits.getTokenLimitsForRequest("key", "", prefix + "/kimi-k3").length, 1);
        assert.equal(Boolean(counter.checkTokenLimits("key", "", prefix + "/kimi-k3")), true);
      }
      counter.recordTokenUsage("key", "moonshot", "kimi-k3", 10, NOW);
      await new Promise(setImmediate);
      assert.equal(
        limits.getWindowUsage(limits.getTokenLimitsForRequest("key", "kimi", "kimi-k3")[0], NOW),
        expected + 10
      );
      assert.deepEqual(read("usage_history"), history);
      assert.deepEqual(db.prepare("PRAGMA foreign_key_check").all(), []);
    });
  }
}

for (const enabled of ["moonshot", "kimi"]) {
  test("sole-enabled cap/schedule remains exhausted: " + enabled, () => {
    for (const provider of ["moonshot", "kimi"]) {
      budget(provider, {
        enabled: provider === enabled ? 1 : 0,
        reset_time: provider === enabled ? "08:00" : "01:00",
        token_limit: provider === enabled ? 50 : 1,
      });
    }
    insert("api_key_token_counters", {
      limit_id: enabled,
      window_start: String(DAY + 8 * 3600000),
      tokens_used: 60,
    });
    migrate();
    const row = read("api_key_token_limits")[0];
    assert.equal(row.token_limit, 50);
    assert.equal(row.reset_time, "08:00");
    assert.equal(row.enabled, 1);
    assert.ok(counter.checkTokenLimits("key", "moonshot", "kimi-k3"));
  });
}
test("incompatible enabled schedules roll back every migration write", () => {
  connection("moonshot");
  budget("moonshot", { reset_time: "08:00" });
  budget("kimi", { reset_time: "09:00" });
  const before = read("provider_connections");
  assert.throws(migrate, /incompatible active reset schedules/);
  assert.deepEqual(read("provider_connections"), before);
  assert.equal(read("api_key_token_limits").length, 2);
  assert.equal(
    db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version='239'").get(),
    undefined
  );
});

for (const kind of ["same", "old-expired", "new-expired", "both-expired", "conflict"]) {
  test("provider quota additive window policy: " + kind, () => {
    insert("provider_connections", {
      id: "account",
      provider: "moonshot",
      created_at: "old",
      updated_at: "old",
    });
    for (const provider of ["moonshot", "kimi"]) {
      const expired =
        kind === "both-expired" ||
        kind === (provider === "moonshot" ? "old-expired" : "new-expired");
      insert("provider_quota_state", {
        connection_id: "account",
        model: provider + "/kimi-k3",
        tokens_used: 40,
        token_limit: provider === "kimi" ? 100 : 80,
        window_start: expired
          ? DAY - 100
          : kind === "conflict" && provider === "moonshot"
            ? NOW - 20
            : DAY,
        window_reset: expired ? DAY : NOW + 10000,
      });
    }
    if (kind === "conflict") {
      assert.throws(migrate, /incompatible active windows/);
      assert.equal(read("provider_quota_state").length, 2);
      return;
    }
    migrate();
    const row = read("provider_quota_state")[0];
    assert.equal(row.model, "kimi/kimi-k3");
    assert.equal(row.tokens_used, kind === "same" ? 80 : 40);
    if (kind === "same") {
      assert.equal(row.token_limit, 80);
      quota.recordProviderQuotaUsage("account", "moonshot/kimi-k3", 5);
      assert.equal(quota.getProviderQuota("account", "kimi/kimi-k3")?.tokensUsed, 85);
    }
  });
}

function hashKey(session: string, provider: string) {
  return (
    provider +
    ":" +
    createHash("sha256")
      .update(provider + ":" + session)
      .digest("hex")
  );
}
function pin(connectionId: string, accountIdentity?: string, expires = NOW + 60000) {
  return {
    connectionId,
    ...(accountIdentity ? { accountIdentity } : {}),
    createdAt: new Date(NOW).toISOString(),
    lastUsedAt: new Date(NOW).toISOString(),
    expiresAt: new Date(expires).toISOString(),
  };
}
function rawPin(session: string, provider: string, value: unknown) {
  kv("session_account_affinity", hashKey(session, provider), value);
}
test("legacy hashed pins verify the exact candidate digest; lifecycle never resurrects older pins", async () => {
  connection("moonshot");
  const candidate = { id: "moonshot" };
  const legacyDigest = createHash("sha256")
    .update(resolveUsageAccountIdentity({ ...candidate, provider: "moonshot" }).accountKey)
    .digest("hex");
  const canonicalDigest = identity.sessionAffinityAccountIdentity(candidate, "kimi");
  const legacy = pin(candidate.id, legacyDigest);
  rawPin("session", "moonshot", legacy);
  migrate();
  const selected = affinity.getSessionAccountAffinity("session", "kimi", 60000, NOW);
  assert.equal(
    identity.resolveSessionAffinityConnection(selected, [{ id: "wrong" }, candidate], "kimi"),
    candidate
  );
  assert.equal(
    identity.resolveSessionAffinityConnection(
      { ...legacy, accountIdentity: "f".repeat(64) },
      [candidate],
      "kimi"
    ),
    null
  );
  const { selectSessionAffinityConnection } =
    await import("../../src/sse/services/sessionAffinityPin.ts");
  const routed = await selectSessionAffinityConnection(
    "kimi",
    "session",
    [
      { id: "wrong", lastUsedAt: "2000-01-01" },
      { id: "moonshot", lastUsedAt: "2026-11-12" },
    ],
    60000
  );
  assert.equal(
    routed?.id,
    "moonshot",
    "the verified legacy pin overrides the other candidate's older LRU timestamp"
  );
  affinity.touchSessionAccountAffinity("session", "moonshot", NOW, 60000);
  assert.equal(
    db.prepare("SELECT 1 FROM key_value WHERE key=?").get(hashKey("session", "moonshot")),
    undefined
  );
  assert.equal(
    affinity.evictSessionAccountAffinityForConnection(
      "session",
      "kimi",
      candidate.id,
      canonicalDigest
    ),
    true
  );
  assert.equal(affinity.getSessionAccountAffinity("session", "kimi", 60000, NOW), null);
  rawPin("session", "moonshot", legacy);
  rawPin("session", "kimi", pin("healthy"));
  const oldBytes = JSON.stringify(legacy);
  assert.equal(affinity.deleteSessionAccountAffinityIfValue("session", "kimi", oldBytes), false);
  assert.equal(
    affinity.evictSessionAccountAffinityForConnection(
      "session",
      "kimi",
      candidate.id,
      canonicalDigest
    ),
    false
  );
  affinity.deleteSessionAccountAffinity("session", "moonshot");
  assert.equal(affinity.getSessionAccountAffinity("session", "kimi", 60000, NOW), null);
  rawPin("session", "moonshot", legacy);
  rawPin("session", "kimi", pin("expired", undefined, NOW - 1));
  affinity.cleanupStaleSessionAccountAffinities(60000, NOW);
  assert.equal(affinity.getSessionAccountAffinity("session", "kimi", 60000, NOW), null);
  assert.equal(affinity.getSessionAccountAffinity("session", "moonshot", 60000, NOW), null);
});

test("migrated templates enforce budgets and deterministic saved reasoning order on repeated applications", async () => {
  const { createDefaultKeyTemplatePolicy } = await import("../../src/shared/types/keyTemplates.ts");
  const { createApiKeyFromPolicy, isModelAllowedForKey } =
    await import("../../src/lib/db/apiKeys.ts");
  const { invalidateReasoningRoutingRuleCache } =
    await import("../../src/lib/db/reasoningRoutingRules.ts");
  const { resolveReasoningRoutingRule } = await import("../../src/lib/reasoningRouting/policy.ts");
  const policy = createDefaultKeyTemplatePolicy();
  policy.key.modelAccessMode = "restricted";
  policy.key.allowedModels = ["moonshot/*"];
  policy.key.blockedModels = ["moonshot/denied"];
  policy.key.forcedModel = "moonshot/kimi-k3";
  policy.related.tokenLimits = [
    {
      scopeType: "provider",
      scopeValue: "moonshot",
      tokenLimit: 10,
      resetInterval: "daily",
      resetTime: "08:00",
      enabled: true,
    },
    {
      scopeType: "provider",
      scopeValue: "kimi",
      tokenLimit: 1,
      resetInterval: "daily",
      resetTime: "01:00",
      enabled: false,
    },
  ];
  policy.related.reasoningRules = ["moonshot", "kimi"].map((prefix, index) => ({
    name: "saved-" + index,
    description: "moonshot/keep",
    scope: "apiKey" as const,
    comboId: null,
    connectionId: null,
    modelPattern: prefix + "/kimi-k3",
    sourceEffort: "any" as const,
    requestTags: [],
    tagMatchMode: "any" as const,
    effortMode: "force" as const,
    targetEffort: index === 0 ? ("high" as const) : ("low" as const),
    targetKind: "keep" as const,
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve" as const,
    budgetTokens: null,
    priority: 5,
    enabled: true,
  }));
  insert("key_templates", {
    id: "template",
    name: "template",
    description: "moonshot/keep",
    revision: 1,
    schema_version: 1,
    policy: JSON.stringify(policy),
    created_at: "old",
    updated_at: "old",
  });
  migrate();
  const migrated = JSON.parse(String(read("key_templates")[0].policy)) as typeof policy;
  assert.equal(migrated.related.tokenLimits.length, 1);
  assert.equal(migrated.related.tokenLimits[0].tokenLimit, 10);
  assert.equal(migrated.related.tokenLimits[0].resetTime, "08:00");
  assert.equal(migrated.key.forcedModel, "kimi/kimi-k3");
  for (let apply = 0; apply < 3; apply++) {
    const key = await createApiKeyFromPolicy("template-" + apply, "machine", migrated);
    for (const prefix of ["kimi", "moonshot"]) {
      assert.equal(await isModelAllowedForKey(key.key, prefix + "/kimi-k3"), true);
      assert.equal(await isModelAllowedForKey(key.key, prefix + "/denied"), false);
      invalidateReasoningRoutingRuleCache();
      const decision = await resolveReasoningRoutingRule({
        apiKeyId: key.id,
        sourceModel: prefix + "/kimi-k3",
        sourceEffort: "missing",
        hasReasoningSignal: false,
      });
      assert.equal(decision?.rule.name, "saved-0");
    }
    counter.recordTokenUsage(key.id, "moonshot", "kimi-k3", 11, NOW);
    await new Promise(setImmediate);
    assert.ok(counter.checkTokenLimits(key.id, "", "kimi/kimi-k3"));
  }
});

test("saved reasoning overlaps keep IDs, priority and stable tie order; later legacy rules still match", async () => {
  const { invalidateReasoningRoutingRuleCache } =
    await import("../../src/lib/db/reasoningRoutingRules.ts");
  const { resolveReasoningRoutingRule } = await import("../../src/lib/reasoningRouting/policy.ts");
  for (const [index, prefix] of ["moonshot", "kimi"].entries()) {
    insert("reasoning_routing_rules", {
      id: "rule-" + index,
      name: "rule-" + index,
      scope: "model",
      model_pattern: prefix + "/kimi-k3",
      target_kind: "model",
      target_model: prefix + "/kimi-k3",
      priority: 1,
      created_at: "same",
      updated_at: "same",
    });
  }
  migrate();
  assert.deepEqual(
    read("reasoning_routing_rules").map((r) => r.id),
    ["rule-0", "rule-1"]
  );
  for (const prefix of ["moonshot", "kimi"]) {
    invalidateReasoningRoutingRuleCache();
    const decision = await resolveReasoningRoutingRule({
      sourceModel: prefix + "/kimi-k3",
      sourceEffort: "missing",
      hasReasoningSignal: false,
    });
    assert.equal(decision?.rule.id, "rule-0");
  }
  db.prepare(
    "UPDATE reasoning_routing_rules SET model_pattern='moonshot/kimi-k3',priority=2 WHERE id='rule-1'"
  ).run();
  invalidateReasoningRoutingRuleCache();
  assert.equal(
    (
      await resolveReasoningRoutingRule({
        sourceModel: "kimi/kimi-k3",
        sourceEffort: "missing",
        hasReasoningSignal: false,
      })
    )?.rule.id,
    "rule-1"
  );
});

test("single cold model policy remains unseeded until a read of exact wire plus literal family suffix", () => {
  budget("moonshot", { scope_type: "model", scope_value: "moonshot/kimi-k3" });
  usage("moonshot", "kimi-k3", 20);
  usage("kimi", "kimi-k3", 20);
  usage("moonshot", "moonshot/kimi-k3", 20);
  usage("kimi", "kimi/kimi-k3", 20);
  usage("other", "kimi-k3", 10000);
  migrate();
  const limit = limits.getTokenLimitsForRequest("key", "kimi", "kimi-k3")[0];
  assert.equal(limit.scopeValue, "moonshot/kimi-k3");
  assert.equal(limits.getWindowUsage(limit, NOW), 0);
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW, NOW - 1000), 0);
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW), 60);
});

test("remaining configuration tables and keyed namespaces merge without losing disjoint fields", async () => {
  const apiKeys = await import("../../src/lib/db/apiKeys.ts");
  const key = await apiKeys.createApiKey("saved", "machine");
  db.prepare("UPDATE api_keys SET allowed_models=?,blocked_models=?,forced_model=? WHERE id=?").run(
    '["moonshot/*"]',
    '["moonshot/denied"]',
    "moonshot/kimi-k3",
    key.id
  );
  for (const provider of ["moonshot", "kimi"]) {
    insert("registered_keys", {
      id: provider,
      key: "hash-" + provider,
      key_prefix: "fixture",
      name: "moonshot/keep",
      provider,
      daily_used: 3,
    });
    insert("provider_plans", {
      connection_id: provider,
      provider,
      dimensions_json: '[{"limit":100}]',
      source: "manual",
    });
    insert("tier_assignments", {
      provider,
      model: "kimi-k3",
      tier: provider === "kimi" ? "free" : "cheap",
      cost_per_1m_input: provider === "kimi" ? 0 : 2,
    });
    insert("model_capabilities", {
      provider,
      model_id: "kimi-k3",
      tool_call: provider === "kimi" ? 0 : 1,
    });
    insert("model_capability_overrides", {
      provider,
      model_id: "kimi-k3",
      override_key: "supportsVision",
      override_value: provider === "kimi" ? "false" : "true",
    });
    insert("upstream_proxy_config", {
      provider_id: provider,
      cliproxyapi_model_mapping: JSON.stringify({
        [provider + "/kimi-k3"]: "wire-" + provider,
        [provider + "-only"]: "wire-id",
      }),
      enabled: provider === "kimi" ? 0 : 1,
    });
    insert("discovery_results", {
      provider_id: provider,
      method: "public_api",
      endpoint: "https://same/models",
      models: JSON.stringify([provider + "-only", "shared"]),
    });
    insert("domain_fallback_chains", {
      model: provider + "/kimi-k3",
      chain: JSON.stringify([provider + "/fallback", provider + "-wire"]),
    });
    for (const namespace of ["pricing_synced", "models_dev_pricing"])
      kv(namespace, provider, {
        shared: { input: provider === "kimi" ? 0 : 2 },
        [provider + "-only"]: { input: 1 },
      });
    kv("providerAliases", provider, { [provider + "-only"]: "moonshot/wire-model" });
    kv("discoveryState", provider + ":same", {
      status: "healthy",
      cause: provider === "kimi" ? null : "old",
      at: "2026-11-12",
    });
  }
  for (const provider of ["kimi-coding", "kimi-coding-apikey", "kimi-web"]) connection(provider);
  insert("relay_tokens", {
    id: "relay",
    name: "relay",
    token_hash: "fixture-hash",
    token_prefix: "fixture",
    allowed_models: '["moonshot/*"]',
    created_at: NOW,
    updated_at: NOW,
  });
  const excluded = read("provider_connections");
  migrate();
  assert.deepEqual(read("provider_connections"), excluded);
  assert.ok(
    read("registered_keys").every(
      (r) => r.provider === "kimi" && r.daily_used === 3 && r.name === "moonshot/keep"
    )
  );
  assert.equal(read("provider_plans").length, 2);
  assert.equal(read("relay_tokens")[0].allowed_models, '["kimi/*"]');
  assert.equal(read("tier_assignments")[0].cost_per_1m_input, 0);
  assert.equal(read("model_capabilities")[0].tool_call, 0);
  assert.equal(read("model_capability_overrides")[0].override_value, "false");
  const mapping = JSON.parse(String(read("upstream_proxy_config")[0].cliproxyapi_model_mapping));
  assert.equal(mapping["kimi/kimi-k3"], "wire-kimi");
  assert.equal(mapping["moonshot-only"], "wire-id");
  const discovered = JSON.parse(String(read("discovery_results")[0].models));
  assert.equal(discovered.length, 3);
  assert.ok(discovered.includes("shared"));
  const row = read("api_keys").find((r) => r.id === key.id)!;
  assert.equal(row.allowed_models, '["kimi/*"]');
  assert.equal(row.blocked_models, '["kimi/denied"]');
  assert.equal(row.forced_model, "kimi/kimi-k3");
  const unknownFallbacks = ["kimi", "moonshot"].map((provider) => ({
    model: provider + "/kimi-k3",
    chain: JSON.stringify([provider + "/fallback", provider + "-wire"]),
  }));
  assert.deepEqual(read("domain_fallback_chains"), unknownFallbacks);
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='239'").run();
  migrate();
  assert.deepEqual(read("domain_fallback_chains"), unknownFallbacks);
  assert.equal(read("key_value").filter((r) => r.key === "moonshot").length, 0);
});

test("legacy-only hashed affinity mutations retain digest guards and retire the old key", () => {
  connection("moonshot");
  const canonical = identity.sessionAffinityAccountIdentity({ id: "moonshot" }, "kimi");
  const legacy = createHash("sha256")
    .update(resolveUsageAccountIdentity({ id: "moonshot", provider: "moonshot" }).accountKey)
    .digest("hex");
  for (const operation of ["evict", "compare", "delete", "upsert"]) {
    const session = "legacy-" + operation;
    const value = pin("moonshot", legacy);
    rawPin(session, "moonshot", value);
    if (operation === "evict")
      assert.equal(
        affinity.evictSessionAccountAffinityForConnection(session, "kimi", "moonshot", canonical),
        true
      );
    if (operation === "compare")
      assert.equal(
        affinity.deleteSessionAccountAffinityIfValue(session, "kimi", JSON.stringify(value)),
        true
      );
    if (operation === "delete") affinity.deleteSessionAccountAffinity(session, "kimi");
    if (operation === "upsert")
      affinity.upsertSessionAccountAffinity(session, "moonshot", "healthy", NOW, 60000);
    assert.equal(
      db
        .prepare("SELECT 1 FROM key_value WHERE namespace='session_account_affinity' AND key=?")
        .get(hashKey(session, "moonshot")),
      undefined
    );
    assert.equal(
      affinity.getSessionAccountAffinity(session, "kimi", 60000, NOW)?.connectionId,
      operation === "upsert" ? "healthy" : undefined
    );
  }
});

test("daily/weekly/monthly alias limits retain separate definitions and disabled canonical config", () => {
  for (const interval of ["daily", "weekly", "monthly"]) {
    for (const provider of ["moonshot", "kimi"])
      budget(provider, {
        id: provider + "-" + interval,
        reset_interval: interval,
        enabled: interval === "weekly" ? 0 : 1,
        token_limit: provider === "kimi" ? 2 : 1,
      });
  }
  migrate();
  const rows = read("api_key_token_limits");
  assert.equal(rows.length, 3);
  assert.ok(rows.every((r) => String(r.id).startsWith("kimi-")));
  assert.equal(rows.find((r) => r.reset_interval === "weekly")?.token_limit, 2);
  assert.equal(limits.getTokenLimitsForRequest("key", "moonshot", "kimi-k3").length, 2);
});
test("unexpected database errors roll back earlier writes and leave migration pending", () => {
  connection("moonshot");
  kv("modelAliases", "user", "moonshot/kimi-k3");
  const before = read("provider_connections");
  db.exec(
    "CREATE TRIGGER reject_kimi_fixture BEFORE UPDATE ON key_value BEGIN SELECT RAISE(ABORT,'fixture failure'); END"
  );
  assert.throws(migrate, /fixture failure/);
  assert.deepEqual(read("provider_connections"), before);
  assert.equal(
    db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version='239'").get(),
    undefined
  );
});

test("explicit unrelated providers retain vendor model namespaces and defaults byte-for-byte", () => {
  connection("openrouter");
  db.prepare(
    "UPDATE provider_connections SET default_model='moonshot/vendor-model' WHERE id='openrouter'"
  ).run();
  insert("model_capabilities", {
    provider: "openrouter",
    model_id: "moonshot/vendor-model",
    tool_call: 1,
  });
  insert("discovery_results", {
    provider_id: "openrouter",
    method: "public_api",
    endpoint: "https://other/models",
    models: JSON.stringify(["moonshot/vendor-model"]),
  });
  insert("combos", {
    id: "vendor",
    name: "vendor",
    data: JSON.stringify({ models: [{ provider: "openrouter", model: "moonshot/vendor-model" }] }),
    created_at: "old",
    updated_at: "old",
  });
  const before = ["provider_connections", "model_capabilities", "discovery_results", "combos"].map(
    read
  );
  migrate();
  assert.deepEqual(
    ["provider_connections", "model_capabilities", "discovery_results", "combos"].map(read),
    before
  );
});
