import assert from "node:assert/strict";
import test, { mock } from "node:test";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";
const h = await createChatPipelineHarness("kimi-settings");
const settings = await import("../../../src/lib/db/settings.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
const { resolveComboConfig } = await import("../../../open-sse/services/comboConfig.ts");
const errors = await import("../../../open-sse/config/providerErrorRules.ts");
const resilience = await import("../../../src/lib/resilience/settings.ts");
const preferred = await import("../../../src/sse/services/preferredConnectionFailover.ts");
const preflight = await import("../../../src/sse/services/quotaPreflightPolicy.ts");
const rate = await import("../../../open-sse/services/providerDefaultRateLimit.ts");
const tierDb = await import("../../../src/lib/db/tierConfig.ts");
const tiers = await import("../../../open-sse/services/tierResolver.ts");
const chaosConfig = await import("../../../src/lib/chaos/chaosConfig.ts");
const chaos = await import("../../../src/lib/chaos/chaosExecutor.ts");
const quotaUi =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");
const { PROVIDER_LABEL } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts");
const transforms = await import("../../../open-sse/services/systemTransforms.ts");
const exposure = await import("../../../src/shared/utils/modelExposureList.ts");
const autoExposure = await import("../../../open-sse/services/autoCombo/modelExposureFilter.ts");
const models = await import("../../../src/lib/db/models.ts");
const { getUnifiedModelsResponse } = await import("../../../src/app/api/v1/models/catalog.ts");
const manifest = await import("../../../open-sse/services/manifestAdapter.ts");
const { GET: getSearchProviders } = await import("../../../src/app/api/v1/search/route.ts");
let db: ReturnType<typeof h.core.getDbInstance>;
function kv(key: string, value: unknown) {
  db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('settings',?,?)").run(
    key,
    JSON.stringify(value)
  );
}
function migrate() {
  runMigrations(db);
  invalidateDbCache();
  chaosConfig.invalidateChaosConfigCache();
}
function raw(key: string) {
  return JSON.parse(
    db.prepare("SELECT value FROM key_value WHERE namespace='settings' AND key=?").get(key)!
      .value as string
  );
}
test.beforeEach(async () => {
  await h.resetStorage();
  db = h.core.getDbInstance();
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='240'").run();
  chaosConfig.invalidateChaosConfigCache();
});
test.afterEach(() => {
  mock.restoreAll();
  rate.setProviderQuotaOverrides(null);
  tiers.setTierConfig({ providerOverrides: [], modelOverrides: [], freeProviders: [] });
});
test.after(() => h.cleanup());

test("C11 migrated provider strategy controls actual leased chat account selection", async () => {
  const a = await h.seedConnection("moonshot", {
    name: "strategy-a",
    apiKey: "strategy-a",
    priority: 1,
  });
  const b = await h.seedConnection("moonshot", {
    name: "strategy-b",
    apiKey: "strategy-b",
    priority: 2,
  });
  assert.notEqual(a.id, b.id);
  kv("providerStrategies", {
    moonshot: { fallbackStrategy: "round-robin", stickyRoundRobinLimit: 1 },
  });
  kv("disableSessionStickiness", false);
  kv("fallbackStrategy", "fill-first");
  migrate();
  const original = globalThis.fetch;
  const selected: string[] = [];
  globalThis.fetch = (async (_input, init) => {
    selected.push(new Headers(init?.headers).get("authorization") || "");
    const frame = {
      id: "strategy",
      choices: [{ index: 0, delta: { content: "fixture" }, finish_reason: "stop" }],
    };
    return new Response(
      ["data: " + JSON.stringify(frame), "", "data: [DONE]", "", ""].join(String.fromCharCode(10)),
      { headers: { "content-type": "text/event-stream" } }
    );
  }) as typeof fetch;
  try {
    for (const content of ["first strategy request", "second strategy request"]) {
      const response = await h.handleChat(
        h.buildRequest({ body: { model: "kimi/kimi-k3", messages: [{ role: "user", content }] } })
      );
      assert.equal(response.status, 200, await response.clone().text());
      await response.text();
    }
    assert.deepEqual(new Set(selected), new Set(["Bearer strategy-a", "Bearer strategy-b"]));
  } finally {
    globalThis.fetch = original;
  }
});
test("C11 legacy maps remain effective at combo, error, timeout, quota and system-transform consumers", async () => {
  kv("providerOverrides", { moonshot: { retryDelayMs: 17, trackMetrics: false } });
  kv("providerErrorRules", {
    moonshot: [{ status: 429, match: "fixture exact", scope: "connection", cooldownMs: 1234 }],
  });
  kv("providerErrorDefaults", { moonshot: { cooldownMs: 4321, scope: "provider" } });
  kv("resilienceSettings", {
    preferredAccountFailover: {
      enabled: true,
      defaultTimeoutMs: 20000,
      providerTimeoutsMs: { moonshot: 1200 },
      modelTimeoutsMs: { "moonshot/moonshot/*": 700 },
    },
    quotaPreflight: { providerWindowDefaults: { moonshot: { session: 7 } } },
    providerQuotaOverrides: { moonshot: { rpm: 17, concurrency: 3, rateLimitCooldownSeconds: 8 } },
  });
  const pipeline = [{ kind: "prepend_system_block", text: "moonshot/keep this prompt" }];
  kv("systemTransforms", { providers: { moonshot: { enabled: true, pipeline } } });
  migrate();
  const saved = await settings.getSettings();
  const combo = resolveComboConfig({}, saved as Parameters<typeof resolveComboConfig>[1], "kimi");
  assert.equal(combo.retryDelayMs, 17);
  assert.equal(combo.trackMetrics, false);
  assert.equal(
    errors.getProviderErrorRuleMatch(
      "kimi",
      429,
      null,
      "fixture exact",
      saved.providerErrorRules as Parameters<typeof errors.getProviderErrorRuleMatch>[4],
      saved.providerErrorDefaults as Parameters<typeof errors.getProviderErrorRuleMatch>[5]
    )?.cooldownMs,
    1234
  );
  const resolved = resilience.resolveResilienceSettings(saved);
  const credentials = { selectedByApiKeyPreference: true, preferredFallbackAvailable: true };
  assert.equal(
    preferred.resolvePreferredConnectionUpstreamStartTimeoutMs(
      "kimi",
      credentials,
      undefined,
      "other",
      resolved.preferredAccountFailover
    ).timeoutMs,
    1200
  );
  assert.equal(
    preferred.resolvePreferredConnectionUpstreamStartTimeoutMs(
      "kimi",
      credentials,
      undefined,
      "moonshot/custom",
      resolved.preferredAccountFailover
    ).timeoutMs,
    700
  );
  assert.equal(
    preflight.resolveMinRemainingPercent("kimi", {}, resolved.quotaPreflight, "session"),
    7
  );
  rate.setProviderQuotaOverrides(resolved.providerQuotaOverrides);
  assert.equal(rate.getProviderDefaultRateLimit("kimi")?.requests, 17);
  assert.equal(rate.getProviderConcurrencyCap("kimi", 99), 3);
  assert.equal(rate.getProviderRateLimitCooldownOverrideMs("kimi"), 8000);
  const transformed = transforms.applyProviderSystemTransforms(
    "kimi",
    { messages: [{ role: "user", content: "question" }] },
    saved.systemTransforms as Parameters<typeof transforms.applyProviderSystemTransforms>[2]
  );
  assert.ok(transformed.appliedOpKinds.includes("prepend_system_block"));
  assert.match(JSON.stringify(transformed.body), /moonshot\/keep this prompt/);
  assert.deepEqual(raw("systemTransforms").providers.kimi.pipeline, pipeline);
});
test("C11 canonical false/zero/null/empty arrays and ordered rules win, missing fields fill and rerun is inert", async () => {
  kv("providerStrategies", {
    moonshot: {
      fallbackStrategy: "random",
      stickyRoundRobinLimit: 9,
      planWeights: { old: 1, same: 9, nullable: 3 },
    },
    kimi: { stickyRoundRobinLimit: 0, planWeights: { same: 0, nullable: null, current: 2 } },
    openai: { fallbackStrategy: "fill-first" },
  });
  kv("providerErrorRules", { moonshot: [{ match: "old", scope: "provider" }], kimi: [] });
  kv("providerErrorDefaults", {
    moonshot: { cooldownMs: 999, scope: "provider" },
    kimi: { cooldownMs: 0 },
  });
  kv("providerOverrides", {
    moonshot: { retryDelayMs: 90, trackMetrics: true, handoffProviders: ["old"] },
    kimi: { retryDelayMs: 0, trackMetrics: false, handoffProviders: [] },
  });
  kv("resilienceSettings", {
    preferredAccountFailover: {
      providerTimeoutsMs: { moonshot: 2000, kimi: 0 },
      modelTimeoutsMs: {
        "moonshot/moonshot/*": 500,
        "kimi/moonshot/*": 0,
        "openrouter/moonshot/*": 900,
      },
    },
    quotaPreflight: {
      providerWindowDefaults: {
        moonshot: { session: 8, daily: 9 },
        kimi: { session: 0, monthly: 2 },
      },
    },
    providerQuotaOverrides: { moonshot: { rpm: 8, concurrency: 3 }, kimi: { rpm: 0 } },
  });
  kv("systemTransforms", {
    providers: {
      moonshot: { enabled: true, pipeline: [{ kind: "prepend_system_block", text: "legacy" }] },
      kimi: { enabled: false, pipeline: [] },
    },
    unknown: "moonshot/preserve",
  });
  migrate();
  assert.deepEqual(raw("providerStrategies"), {
    kimi: {
      fallbackStrategy: "random",
      stickyRoundRobinLimit: 0,
      planWeights: { old: 1, same: 0, nullable: null, current: 2 },
    },
    openai: { fallbackStrategy: "fill-first" },
  });
  assert.deepEqual(raw("providerErrorRules"), { kimi: [] });
  assert.deepEqual(raw("providerErrorDefaults"), { kimi: { cooldownMs: 0, scope: "provider" } });
  assert.deepEqual(raw("providerOverrides"), {
    kimi: { retryDelayMs: 0, trackMetrics: false, handoffProviders: [] },
  });
  const saved = raw("resilienceSettings");
  assert.deepEqual(saved.preferredAccountFailover.providerTimeoutsMs, { kimi: 0 });
  assert.deepEqual(saved.preferredAccountFailover.modelTimeoutsMs, {
    "kimi/moonshot/*": 0,
    "openrouter/moonshot/*": 900,
  });
  assert.deepEqual(saved.quotaPreflight.providerWindowDefaults, {
    kimi: { session: 0, daily: 9, monthly: 2 },
  });
  assert.deepEqual(saved.providerQuotaOverrides, { kimi: { rpm: 0, concurrency: 3 } });
  assert.deepEqual(raw("systemTransforms"), {
    providers: { kimi: { enabled: false, pipeline: [] } },
    unknown: "moonshot/preserve",
  });
  const snapshot = db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all();
  assert.equal(runMigrations(db), 0);
  assert.deepEqual(db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all(), snapshot);
});
test("C11 operator quota fallbacks and canonical order survive through the real UI helpers", async () => {
  const quota = { name: "legacy row" };
  kv(
    "quotaVisibility",
    quotaUi.buildNextQuotaVisibility(
      { account: { hidden: [] } },
      "moonshot",
      quotaUi.getQuotaVisibilityKey(quota),
      true
    )
  );
  kv("quotaProviderOrder", ["openai", "moonshot", "anthropic", "kimi", "kimi", "deepseek"]);
  migrate();
  assert.deepEqual(
    quotaUi.filterQuotasByVisibility(
      { connectionId: "another", provider: "kimi" },
      [quota],
      raw("quotaVisibility")
    ),
    []
  );
  assert.deepEqual(
    quotaUi.filterQuotasByVisibility(
      { connectionId: "account", provider: "kimi" },
      [quota],
      raw("quotaVisibility")
    ),
    [quota]
  );
  assert.deepEqual(raw("quotaProviderOrder"), ["openai", "anthropic", "kimi", "deepseek"]);
  assert.equal(PROVIDER_LABEL.kimi, "Kimi");
});
test("C11 connection-ID quota visibility entries and unknown shapes remain unchanged", () => {
  db.prepare(
    "INSERT INTO provider_connections(id,provider,created_at,updated_at) VALUES('moonshot','openai','old','old')"
  ).run();
  const visibility = {
    moonshot: { hidden: ["account row"] },
    kimi: { hidden: [] },
    other: { hidden: ["other"] },
  };
  kv("quotaVisibility", visibility);
  kv("providerStrategies", ["unknown"]);
  kv("systemTransforms", { providers: "unknown", prompt: "moonshot/text" });
  migrate();
  assert.deepEqual(raw("quotaVisibility"), visibility);
  assert.deepEqual(raw("providerStrategies"), ["unknown"]);
  assert.deepEqual(raw("systemTransforms"), { providers: "unknown", prompt: "moonshot/text" });
});

function tierBase() {
  return {
    version: "1.0.0",
    defaults: { freeThreshold: 0, cheapThreshold: 1 },
    providerOverrides: [],
    modelOverrides: [],
    freeProviders: [],
  };
}
test("C12 loaded tier config provider override and free list still classify canonical Kimi", () => {
  tierDb.saveTierConfig({
    ...tierBase(),
    providerOverrides: [{ provider: "moonshot", tier: "cheap" }],
  });
  migrate();
  const loaded = tierDb.loadTierConfigFromDb()!;
  tiers.setTierConfig(loaded);
  assert.match(tiers.classifyTier("kimi", "moonshot/custom").reason, /Provider-level override/);
  assert.equal(tiers.classifyTier("kimi", "moonshot/custom").tier, "cheap");
  assert.equal(loaded.providerOverrides[0].provider, "kimi");
});
test("C12 distinct model pattern order remains first-match and canonical exact duplicate retains its own position", () => {
  tierDb.saveTierConfig({
    ...tierBase(),
    modelOverrides: [
      { provider: "moonshot", modelPattern: "moonshot/*", tier: "cheap" },
      { provider: "kimi", modelPattern: "*", tier: "premium" },
    ],
  });
  migrate();
  tiers.setTierConfig(tierDb.loadTierConfigFromDb());
  assert.equal(tiers.classifyTier("kimi", "moonshot/custom").tier, "cheap");
  db.prepare("DELETE FROM _omniroute_migrations WHERE version='240'").run();
  tierDb.saveTierConfig({
    ...tierBase(),
    modelOverrides: [
      { provider: "moonshot", modelPattern: "moonshot/*", tier: "cheap" },
      { provider: "kimi", modelPattern: "*", tier: "premium" },
      { provider: "kimi", modelPattern: "moonshot/*", tier: "free" },
    ],
    freeProviders: ["openai", "moonshot", "kimi", "anthropic"],
  });
  migrate();
  const loaded = tierDb.loadTierConfigFromDb()!;
  assert.deepEqual(loaded.modelOverrides, [
    { provider: "kimi", modelPattern: "*", tier: "premium" },
    { provider: "kimi", modelPattern: "moonshot/*", tier: "free" },
  ]);
  assert.deepEqual(loaded.freeProviders, ["openai", "kimi", "anthropic"]);
  tiers.setTierConfig({ ...loaded, freeProviders: [] });
  assert.equal(tiers.classifyTier("kimi", "moonshot/custom").tier, "premium");
  const before = db.prepare("SELECT * FROM tier_config").all();
  assert.equal(runMigrations(db), 0);
  assert.deepEqual(db.prepare("SELECT * FROM tier_config").all(), before);
});

for (const mode of ["migrated override", "later old connection", "old request"]) {
  test("C13 chaos selects only intended API account and keeps wire model: " + mode, async () => {
    const account = await h.seedConnection(mode === "later old connection" ? "kimi" : "moonshot", {
      apiKey: "chaos-api",
    });
    await h.seedConnection("openai", { apiKey: "chaos-unrelated" });
    kv("chaosModeConfig", {
      ...chaosConfig.DEFAULT_CHAOS_CONFIG,
      enabled: true,
      providerOverrides: [
        {
          providerId: mode === "later old connection" ? "kimi" : "moonshot",
          modelId: "moonshot/custom",
          enabled: true,
        },
      ],
      systemPrompt: "moonshot/preserve prompt",
    });
    migrate();
    if (mode === "later old connection")
      db.prepare("UPDATE provider_connections SET provider='moonshot' WHERE id=?").run(account.id);
    const calls: string[] = [];
    mock.method(chaos.chatDispatch, "postChatCompletion", async (request: Request) => {
      calls.push((await request.json()).model);
      return Response.json({ choices: [{ message: { content: "fixture" } }] });
    });
    const result = await chaos.executeChaosRun({
      task: "fixture",
      ...(mode === "old request" ? { providers: ["moonshot"] } : {}),
    });
    assert.equal(result.totalProviders, 1);
    assert.equal(result.models[0].providerId, account.id);
    assert.deepEqual(calls, ["moonshot/custom"]);
  });
}

for (const pattern of [
  "moonshot/kimi-k3.1-pro",
  "moonshot/kimi-*",
  "kimi/kimi-k3.1-pro",
  "kimi/kimi-*",
])
  for (const kind of ["Allowlist", "Denylist"]) {
    test(
      "C14 catalog and auto pool preserve alias exposure and unrelated wire namespaces: " +
        kind +
        " " +
        pattern,
      async () => {
        await h.seedConnection("kimi", { apiKey: "exposure-kimi" });
        const third = await h.seedConnection("openrouter", { apiKey: "exposure-other" });
        await models.replaceSyncedAvailableModelsForConnection("openrouter", third.id, [
          {
            id: "moonshot/kimi-k3.1-pro",
            name: "literal vendor model",
            supportedEndpoints: ["chat"],
          },
        ]);
        const key = "modelVisibility" + kind;
        kv(key, [pattern]);
        migrate();
        assert.deepEqual(raw(key), [pattern]);
        const config = await settings.getSettings();
        const pool = [
          { provider: "kimi", model: "kimi-k3.1-pro" },
          { provider: "moonshot", model: "kimi-k3.1-pro" },
          { provider: "openrouter", model: "moonshot/kimi-k3.1-pro" },
          { provider: "openrouter", model: "kimi/kimi-k3.1-pro" },
          { provider: "kimi-coding", model: "kimi-k3.1-pro" },
        ];
        const response = await getUnifiedModelsResponse(
          new Request("http://localhost/v1/models"),
          {},
          { scheduleBackgroundRefresh: () => {} }
        );
        assert.equal(response.status, 200);
        const data = (await response.json()).data as Array<{ id: string }>;
        assert.equal(
          data.some((row) => row.id === "kimi/kimi-k3.1-pro"),
          kind === "Allowlist"
        );
        assert.equal(
          data.some((row) => row.id.endsWith("/moonshot/kimi-k3.1-pro")),
          pattern.startsWith("moonshot/") ? kind === "Allowlist" : kind === "Denylist"
        );
        assert.equal(
          exposure.isModelExposureAllowed("kimi", "kimi-k3.1-pro", config),
          kind === "Allowlist"
        );
        assert.equal(
          exposure.isModelExposureAllowed("openrouter", "moonshot/kimi-k3.1-pro", config),
          pattern.startsWith("moonshot/") ? kind === "Allowlist" : kind === "Denylist"
        );
        assert.equal(
          exposure.isModelExposureAllowed("openrouter", "kimi/kimi-k3.1-pro", config),
          pattern.startsWith("moonshot/") ? kind === "Denylist" : kind === "Allowlist"
        );
        assert.deepEqual(
          autoExposure.filterModelExposureCandidates(pool, config),
          pool.filter(
            (_, index) =>
              (index < 2 || index === (pattern.startsWith("moonshot/") ? 2 : 3)) ===
              (kind === "Allowlist")
          )
        );
      }
    );
  }

test("C14 auto exposure mirror preserves canonical and legacy candidates under saved legacy pattern", () => {
  const pool = [
    { provider: "kimi", model: "kimi-k3.1-pro" },
    { provider: "moonshot", model: "kimi-k3.1-pro" },
    { provider: "openrouter", model: "kimi/kimi-k3.1-pro" },
  ];
  assert.deepEqual(
    autoExposure.filterModelExposureCandidates(pool, { modelVisibilityAllowlist: ["moonshot/*"] }),
    pool.slice(0, 2)
  );
});
test("C13 canonical disabled provider wins regardless of legacy model while connection selectors stay exact", async () => {
  const connection = await h.seedConnection("openai", { apiKey: "chaos-connection" });
  const config = {
    ...chaosConfig.DEFAULT_CHAOS_CONFIG,
    systemPrompt: "moonshot/unchanged",
    providerOverrides: [
      { providerId: "moonshot", modelId: "moonshot/custom", enabled: true },
      { providerId: "kimi", modelId: "moonshot/custom", enabled: false },
      { providerId: connection.id, modelId: "moonshot/custom", enabled: true },
      { providerId: "moonshot", modelId: "kimi/custom", enabled: true },
    ],
  };
  kv("chaosModeConfig", config);
  migrate();
  assert.deepEqual(raw("chaosModeConfig"), {
    ...config,
    providerOverrides: [config.providerOverrides[1], config.providerOverrides[2]],
  });
});

function manifestTarget(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: "fixture",
    executionKey: "kimi/" + modelStr,
    modelStr,
    provider: "kimi",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}
for (const canonicalFirst of [false, true]) {
  test(
    "C12 manifest qualified target respects first matching rule order: " + canonicalFirst,
    async () => {
      const legacy = { provider: "kimi", modelPattern: "moonshot/*", tier: "cheap" as const };
      const current = { provider: "kimi", modelPattern: "kimi/*", tier: "premium" as const };
      tiers.setTierConfig({
        ...tierBase(),
        modelOverrides: canonicalFirst ? [current, legacy] : [legacy, current],
      });
      const target = manifestTarget("kimi/custom");
      assert.equal(manifest.getTargetTier(target).tier, canonicalFirst ? "premium" : "cheap");
      const hints = await manifest.generateRoutingHints([target], {
        messages: [{ content: "hello" }],
      });
      assert.equal(
        hints.tierAssignments.get("kimi::kimi/custom")?.tier,
        canonicalFirst ? "premium" : "cheap"
      );
      assert.equal(tiers.classifyTier("kimi", "moonshot/custom").tier, "cheap");
      assert.equal(tiers.classifyTier("kimi", "kimi/custom").tier, "premium");
    }
  );
}
for (const modes of [
  ["wire", "local-qualified"],
  ["local-qualified", "wire"],
] as const) {
  test(
    "C12 assignment caches isolate wire and local-qualified modes in warm order " + modes.join(","),
    async () => {
      tiers.setTierConfig({
        ...tierBase(),
        modelOverrides: [
          { provider: "kimi", modelPattern: "moonshot/*", tier: "cheap" },
          { provider: "kimi", modelPattern: "kimi/*", tier: "premium" },
        ],
      });
      for (const mode of modes) {
        const assignment = tiers.classifyTier("kimi", "kimi/custom", mode);
        assert.equal(assignment.tier, mode === "wire" ? "premium" : "cheap");
        assert.equal(assignment.model, "kimi/custom");
        const asynchronous = await tiers.classifyTierAsync("kimi", "kimi/custom", mode);
        assert.equal(asynchronous.tier, mode === "wire" ? "premium" : "cheap");
        assert.equal(asynchronous.model, "kimi/custom");
      }
    }
  );
}
for (const remainder of [false, true])
  test(
    "C13 disabled canonical conflict rolls back with unmatched remainder=" + remainder,
    async () => {
      await h.seedConnection("moonshot", { apiKey: "preflight-api" });
      const inactive = await h.seedConnection("openai", {
        apiKey: "preflight-inactive",
        isActive: false,
      });
      await h.seedConnection("deepseek", { apiKey: "preflight-unrelated" });
      const config = {
        ...chaosConfig.DEFAULT_CHAOS_CONFIG,
        enabled: true,
        providerOverrides: [
          { providerId: "moonshot", modelId: "wire/custom", enabled: true },
          { providerId: "kimi", modelId: "wire/custom", enabled: false },
          ...(remainder
            ? [
                { providerId: inactive.id, enabled: true },
                { providerId: "deleted-connection", enabled: true },
                { providerId: "unmatched-provider", enabled: true },
              ]
            : []),
        ],
      };
      kv("chaosModeConfig", config);
      const before = db.prepare("SELECT * FROM provider_connections ORDER BY id").all();
      const stored = db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all();
      assert.throws(migrate, /chaos|conflict|selection/i);
      assert.deepEqual(db.prepare("SELECT * FROM provider_connections ORDER BY id").all(), before);
      assert.deepEqual(db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all(), stored);
      assert.equal(
        db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version='240'").get(),
        undefined
      );
    }
  );

for (const source of ["static", "synced"])
  for (const blocked of [[], ["moonshot"], ["kimi"], ["moonshot", "kimi"], ["kimi-search"]]) {
    test(
      "C11 API blocked provider list preserves " +
        source +
        " chat/Search baseline: " +
        JSON.stringify(blocked),
      async () => {
        const connection = await h.seedConnection("moonshot", { apiKey: "blocked-api" });
        const model = source === "static" ? "kimi-k3.1-pro" : "blocked-synced-model";
        if (source === "synced")
          await models.replaceSyncedAvailableModelsForConnection("moonshot", connection.id, [
            { id: model, name: model, supportedEndpoints: ["chat"] },
          ]);
        kv("blockedProviders", blocked);
        migrate();
        assert.deepEqual(raw("blockedProviders"), blocked);
        const search = await getSearchProviders();
        assert.equal(
          (await search.json()).data.some((entry: { id: string }) => entry.id === "kimi-search"),
          !blocked.includes("kimi") && !blocked.includes("kimi-search")
        );
        const response = await getUnifiedModelsResponse(
          new Request("http://localhost/v1/models"),
          {},
          { scheduleBackgroundRefresh: () => {} }
        );
        const data = (await response.json()).data as Array<{ id: string }>;
        assert.equal(
          data.some((row) => row.id === "kimi/" + model),
          !blocked.includes("kimi") && !blocked.includes("moonshot")
        );
      }
    );
  }

test("C11 API checkbox predicate and explicit unblock retain separate Search entry", async () => {
  const { isKimiApiProviderBlocked } = await import("../../../open-sse/config/kimiProvider.ts");
  const { computeNextBlockedProviders } =
    await import("../../../src/shared/utils/noAuthProviders.ts");
  assert.equal(isKimiApiProviderBlocked("kimi", ["moonshot"]), true);
  assert.equal(isKimiApiProviderBlocked("moonshot", ["kimi"]), true);
  assert.equal(isKimiApiProviderBlocked("kimi-search", ["moonshot"]), false);
  assert.equal(isKimiApiProviderBlocked("kimi-coding", ["moonshot"]), false);
  assert.deepEqual(
    computeNextBlockedProviders(
      ["openai", "moonshot", "kimi-search", "kimi"],
      ["kimi", "moonshot"],
      true
    ),
    ["openai", "kimi-search"]
  );
});
test("C12 and C13 malformed policy documents remain byte-for-byte", () => {
  const tier = ' { "providerOverrides":[{"provider":"moonshot"}] } ';
  db.prepare("INSERT OR REPLACE INTO tier_config(key,value) VALUES('tier_config',?)").run(tier);
  const config = ' { "providerOverrides":[{"providerId":"moonshot","enabled":"invalid"}] } ';
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('settings','chaosModeConfig',?)"
  ).run(config);
  migrate();
  assert.equal(
    db.prepare("SELECT value FROM tier_config WHERE key='tier_config'").get()?.value,
    tier
  );
  assert.equal(
    db
      .prepare("SELECT value FROM key_value WHERE namespace='settings' AND key='chaosModeConfig'")
      .get()?.value,
    config
  );
});

test("C13 a literal API-spelling connection selector never expands into the API provider family", async () => {
  await h.seedConnection("kimi", { apiKey: "chaos-not-selected" });
  db.prepare(
    "INSERT INTO provider_connections(id,provider,is_active,created_at,updated_at) VALUES('moonshot','openai',1,'old','old')"
  ).run();
  kv("chaosModeConfig", {
    ...chaosConfig.DEFAULT_CHAOS_CONFIG,
    enabled: true,
    providerOverrides: [
      { providerId: "moonshot", modelId: "moonshot/connection-wire", enabled: true },
    ],
  });
  migrate();
  assert.equal(raw("chaosModeConfig").providerOverrides[0].providerId, "moonshot");
  const calls: string[] = [];
  mock.method(chaos.chatDispatch, "postChatCompletion", async (request: Request) => {
    calls.push((await request.json()).model);
    return Response.json({ choices: [{ message: { content: "fixture" } }] });
  });
  const result = await chaos.executeChaosRun({ task: "connection selector" });
  assert.equal(result.totalProviders, 1);
  assert.equal(result.models[0].providerId, "moonshot");
  assert.deepEqual(calls, ["moonshot/connection-wire"]);
});
test("C11 legacy-only quota order renames in place and explicit canonical visibility stays empty", () => {
  kv("quotaProviderOrder", ["openai", "moonshot", "anthropic"]);
  kv("quotaVisibility", {
    moonshot: { hidden: ["legacy"] },
    kimi: { hidden: [] },
    account: { hidden: ["account"] },
  });
  migrate();
  assert.deepEqual(raw("quotaProviderOrder"), ["openai", "kimi", "anthropic"]);
  assert.deepEqual(raw("quotaVisibility"), {
    kimi: { hidden: [] },
    account: { hidden: ["account"] },
  });
});
test("C12 both API provider spellings share an explicit free-provider policy without changing wire names", () => {
  tiers.setTierConfig({ ...tierBase(), freeProviders: ["moonshot"] });
  for (const provider of ["kimi", "moonshot"])
    for (const model of ["moonshot/custom", "kimi/custom"]) {
      const result = tiers.classifyTier(provider, model);
      assert.equal(result.tier, "free");
      assert.equal(result.provider, provider);
      assert.equal(result.model, model);
    }
});

test("C14 alias deny takes precedence and empty exposure lists preserve the pool identity", () => {
  const pool = [
    { provider: "kimi", model: "kimi-k3" },
    { provider: "moonshot", model: "kimi-k3" },
    { provider: "openrouter", model: "moonshot/vendor" },
  ];
  assert.equal(autoExposure.filterModelExposureCandidates(pool, {}), pool);
  const rules = { modelVisibilityAllowlist: ["moonshot/*"], modelVisibilityDenylist: ["kimi/*"] };
  assert.deepEqual(autoExposure.filterModelExposureCandidates(pool, rules), [pool[2]]);
});

for (const canonicalFirst of [false, true]) {
  test(
    "R6 Chaos canonical provider override wins differing models in order " + canonicalFirst,
    async () => {
      const account = await h.seedConnection("moonshot", { apiKey: "chaos-canonical" });
      await h.seedConnection("openai", { apiKey: "chaos-foreign" });
      const legacy = { providerId: "moonshot", modelId: "moonshot/legacy-wire", enabled: true };
      const canonical = { providerId: "kimi", modelId: "moonshot/canonical-wire", enabled: true };
      kv("chaosModeConfig", {
        ...chaosConfig.DEFAULT_CHAOS_CONFIG,
        enabled: true,
        providerOverrides: canonicalFirst ? [canonical, legacy] : [legacy, canonical],
      });
      migrate();
      assert.deepEqual(raw("chaosModeConfig").providerOverrides, [canonical]);
      const calls: string[] = [];
      mock.method(chaos.chatDispatch, "postChatCompletion", async (request: Request) => {
        calls.push((await request.json()).model);
        return Response.json({ choices: [{ message: { content: "fixture" } }] });
      });
      const result = await chaos.executeChaosRun({ task: "canonical override" });
      assert.equal(result.totalProviders, 1);
      assert.equal(result.models[0].providerId, account.id);
      assert.deepEqual(calls, ["moonshot/canonical-wire"]);
    }
  );
}
for (const connectionProvider of ["moonshot", "kimi"])
  for (const unmatchedSurvivor of [false, true]) {
    test(
      "R6 Chaos differing disabled collision rolls back for " +
        connectionProvider +
        " with unmatched survivor " +
        unmatchedSurvivor,
      async () => {
        await h.seedConnection(connectionProvider, { apiKey: "chaos-prior" });
        await h.seedConnection("deepseek", { apiKey: "chaos-not-selected" });
        kv("chaosModeConfig", {
          ...chaosConfig.DEFAULT_CHAOS_CONFIG,
          enabled: true,
          providerOverrides: [
            { providerId: "moonshot", modelId: "moonshot/legacy-wire", enabled: true },
            { providerId: "kimi", modelId: "moonshot/canonical-wire", enabled: false },
            ...(unmatchedSurvivor ? [{ providerId: "missing-provider", enabled: true }] : []),
          ],
        });
        const connections = db.prepare("SELECT * FROM provider_connections ORDER BY id").all();
        const stored = db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all();
        assert.throws(migrate, /chaos|conflict|selection/i);
        assert.deepEqual(
          db.prepare("SELECT * FROM provider_connections ORDER BY id").all(),
          connections
        );
        assert.deepEqual(
          db.prepare("SELECT * FROM key_value ORDER BY namespace,key").all(),
          stored
        );
        assert.equal(
          db.prepare("SELECT 1 FROM _omniroute_migrations WHERE version='240'").get(),
          undefined
        );
      }
    );
  }
test("R6 Chaos keeps a matching connection selector while canonical disable wins", async () => {
  await h.seedConnection("moonshot", { apiKey: "chaos-prior" });
  const survivor = await h.seedConnection("openai", { apiKey: "chaos-selected" });
  const canonical = { providerId: "kimi", modelId: "moonshot/canonical-wire", enabled: false };
  const connection = {
    providerId: survivor.id,
    modelId: "moonshot/connection-wire",
    enabled: true,
  };
  kv("chaosModeConfig", {
    ...chaosConfig.DEFAULT_CHAOS_CONFIG,
    enabled: true,
    providerOverrides: [
      { providerId: "moonshot", modelId: "moonshot/legacy-wire", enabled: true },
      canonical,
      connection,
    ],
  });
  migrate();
  assert.deepEqual(raw("chaosModeConfig").providerOverrides, [canonical, connection]);
  const calls: string[] = [];
  mock.method(chaos.chatDispatch, "postChatCompletion", async (request: Request) => {
    calls.push((await request.json()).model);
    return Response.json({ choices: [{ message: { content: "fixture" } }] });
  });
  const result = await chaos.executeChaosRun({ task: "connection selector" });
  assert.equal(result.totalProviders, 1);
  assert.equal(result.models[0].providerId, survivor.id);
  assert.deepEqual(calls, ["moonshot/connection-wire"]);
});

for (const inactive of [false, true])
  for (const reverse of [false, true]) {
    test(
      "R7 Chaos connection/provider ambiguity rolls back with inactive=" +
        inactive +
        " reversed=" +
        reverse,
      () => {
        const connections = [
          [inactive ? "KiMi" : "kimi", inactive ? "openai" : "moonshot"],
          ["native-account", inactive ? "KiMi" : "kimi"],
        ];
        for (const [id, provider] of reverse ? [...connections].reverse() : connections)
          db.prepare(
            "INSERT INTO provider_connections(id,provider,is_active,created_at,updated_at) VALUES(?,?,?,'old','old')"
          ).run(id, provider, inactive ? 0 : 1);
        const overrides = [
          inactive
            ? { providerId: "kImI", enabled: false }
            : { providerId: "kimi", modelId: "moonshot/canonical-wire" },
          { providerId: "moonshot", modelId: "moonshot/legacy-wire", enabled: true },
        ];
        kv("chaosModeConfig", {
          ...chaosConfig.DEFAULT_CHAOS_CONFIG,
          enabled: false,
          providerOverrides: reverse ? [...overrides].reverse() : overrides,
        });
        kv("providerStrategies", { moonshot: { fallbackStrategy: "random" } });
        db.prepare(
          "INSERT INTO combos(id,name,data,created_at,updated_at) VALUES('ambiguity','ambiguity',?,'old','old')"
        ).run(JSON.stringify({ models: ["moonshot/kimi-k3"] }));
        const queries = [
          "SELECT * FROM provider_connections ORDER BY id",
          "SELECT * FROM key_value ORDER BY namespace,key",
          "SELECT * FROM combos ORDER BY id",
          "SELECT * FROM _omniroute_migrations ORDER BY version",
        ];
        const before = queries.map((sql) => db.prepare(sql).all());
        assert.throws(migrate, /Kimi.*connection.*provider.*ambig.*rename.*override/i);
        assert.deepEqual(
          queries.map((sql) => db.prepare(sql).all()),
          before
        );
      }
    );
  }

for (const matchingSelector of [false, true]) {
  test(
    matchingSelector
      ? "R7 Chaos preserves a literal kimi ID with no raw provider ambiguity"
      : "R7 Chaos does not reject a selector other than kimi",
    () => {
      db.prepare(
        "INSERT INTO provider_connections(id,provider,created_at,updated_at) VALUES('kimi',?,'old','old'),('other-account',?,'old','old')"
      ).run(matchingSelector ? "kimi" : "openai", matchingSelector ? "moonshot" : "kimi");
      const overrides = [{ providerId: matchingSelector ? "kimi" : "moonshot", enabled: true }];
      kv("chaosModeConfig", {
        ...chaosConfig.DEFAULT_CHAOS_CONFIG,
        providerOverrides: overrides,
      });
      migrate();
      assert.deepEqual(raw("chaosModeConfig").providerOverrides, overrides);
      assert.equal(
        db.prepare("SELECT provider FROM provider_connections WHERE id='other-account'").get()
          ?.provider,
        "kimi"
      );
    }
  );
}
