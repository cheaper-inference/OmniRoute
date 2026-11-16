import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-native-reasoning-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "native-reasoning-test-secret";
const core = await import("../../src/lib/db/core.ts");
const { replaceSyncedAvailableModelsForConnection, getSyncedAvailableModelsForConnection } =
  await import("../../src/lib/db/models.ts");
const { getActiveSyncedCatalog, getAllActiveSyncedModels } =
  await import("../../src/lib/db/models/activeSyncedCatalog.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
for (const provider of ["antigravity", "agy"]) {
  test(`${provider}: resolve request reasoning before account selection using live variants`, async () => {
    const db = core.getDbInstance();
    const now = new Date().toISOString();
    for (const [id, efforts] of [
      [`${provider}-low`, ["low"]],
      [`${provider}-high`, ["high", "xhigh"]],
    ] as const) {
      db.prepare(
        "INSERT INTO provider_connections (id,provider,is_active,created_at,updated_at) VALUES (?,?,1,?,?)"
      ).run(id, provider, now, now);
      await replaceSyncedAvailableModelsForConnection(
        provider,
        id,
        efforts.map((effort) => ({
          id: `gemini-4-hydrogen-${effort}`,
          name: `Hydrogen (${effort})`,
        }))
      );
    }
    invalidateDbCache();
    const catalog = await getActiveSyncedCatalog(provider);
    const family = catalog.models.find((m) => m.id === "gemini-4-hydrogen");
    assert.deepEqual(family?.supportedThinkingEfforts, ["low", "high", "xhigh"]);
    for (const body of [{ reasoning_effort: "xhigh" }, { reasoning: { effort: "xhigh" } }]) {
      const resolved = await getModelInfo(`${provider}/gemini-4-hydrogen`, body);
      assert.equal(resolved.model, "gemini-4-hydrogen-xhigh");
      assert.equal(resolved.provider, "antigravity");
      assert.equal(resolved.resolvedThinkingEffort, "xhigh");
    }
    assert.equal(
      (await getModelInfo(`${provider}/gemini-4-hydrogen`, {})).model,
      "gemini-4-hydrogen-high"
    );
    assert.equal(
      (await getModelInfo(`${provider}/gemini-4-hydrogen`, { reasoning_effort: "medium" }))
        .errorType,
      "invalid_reasoning_effort"
    );
    assert.equal(
      (await getModelInfo(`${provider}/gemini-4-hydrogen-low`, { reasoning_effort: "high" })).model,
      "gemini-4-hydrogen-low"
    );
    // Alias metadata must never claim that the low-only account serves xhigh.
    assert.deepEqual(
      (await getSyncedAvailableModelsForConnection(provider, `${provider}-low`)).map((m) => m.id),
      ["gemini-4-hydrogen-low"]
    );
    assert.ok(
      (await getAllActiveSyncedModels())[provider].some((m) => m.id === "gemini-4-hydrogen")
    );
  });
}

test("public catalog exposes only live family tiers and hides fixed ids independently", async () => {
  process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
  const catalog = await import("../../src/app/api/v1/models/catalog.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  type Row = { id: string; capabilities?: { effort_tiers?: string[] } };
  async function rows(): Promise<Row[]> {
    catalog.__resetCatalogBuilderRunsForTest();
    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/models/catalog?includeHidden=1")
    );
    assert.equal(response.status, 200);
    return (await response.json()).data;
  }
  const { createCombo } = await import("../../src/lib/db/combos.ts");
  await createCombo({
    name: "native-low-only",
    strategy: "priority",
    models: [{ model: "antigravity/gemini-4-hydrogen", connectionId: "antigravity-low" }],
  });
  let result = await rows();
  assert.deepEqual(result.find((row) => row.id === "native-low-only")?.capabilities?.effort_tiers, [
    "low",
  ]);
  for (const provider of ["antigravity", "agy"]) {
    const family = result.find((row) => row.id === `${provider}/gemini-4-hydrogen`);
    assert.ok(family, `${provider} neutral family must appear`);
    assert.deepEqual(family.capabilities?.effort_tiers, ["low", "high", "xhigh"]);
    assert.ok(result.some((row) => row.id === `${provider}/gemini-4-hydrogen-low`));
    assert.ok(!result.some((row) => row.id === `${provider}/gemini-4-hydrogen-medium`));
  }
  await settings.updateSettings({ antigravityHideForcedReasoningModels: true });
  result = await rows();
  assert.ok(result.some((row) => row.id === "antigravity/gemini-4-hydrogen"));
  assert.ok(!result.some((row) => row.id === "antigravity/gemini-4-hydrogen-low"));
  assert.ok(result.some((row) => row.id === "agy/gemini-4-hydrogen-low"));
  assert.equal(
    (await getModelInfo("antigravity/gemini-4-hydrogen-low", {})).model,
    "gemini-4-hydrogen-low"
  );
  await settings.updateSettings({ agyHideForcedReasoningModels: true });
  result = await rows();
  assert.ok(!result.some((row) => row.id === "agy/gemini-4-hydrogen-low"));
});

test("all native families resolve each declared tier without suffix folding", async () => {
  const families = [
    "gemini-4-hydrogen",
    "gemini-4-argon",
    "gemini-3.8-flash",
    "claude-opus-5-5",
    "claude-sonnet-5-5",
    "gpt-oss-120b",
  ];
  for (const provider of ["antigravity", "agy"]) {
    await replaceSyncedAvailableModelsForConnection(
      provider,
      `${provider}-high`,
      families.flatMap((base) => ["medium", "high"].map((effort) => ({ id: `${base}-${effort}` })))
    );
    for (const base of families)
      for (const effort of ["medium", "high"]) {
        const actual = await getModelInfo(`${provider}/${base}`, { reasoning_effort: effort });
        assert.equal(actual.model, `${base}-${effort}`, `${provider}/${base} ${effort}`);
      }
  }
});

test("combo materialization happens before dispatch and preserves stored config", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  const { materializeNativeReasoningCombos } =
    await import("../../open-sse/services/combo/nativeReasoningTargets.ts");
  const combo = {
    name: "native-family",
    strategy: "priority",
    models: [{ model: "antigravity/gemini-4-hydrogen", connectionId: "antigravity-high" }],
  };
  const before = structuredClone(combo);
  const seen: string[] = [];
  const response = await handleComboChat({
    body: {
      model: combo.name,
      messages: [{ role: "user", content: "hi" }],
      reasoning_effort: "high",
    },
    combo,
    settings: {},
    allCombos: [],
    log: { info() {}, warn() {}, debug() {}, error() {} },
    handleSingleModel: async (_body: unknown, model: string) => {
      seen.push(model);
      return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
    },
  });
  assert.equal(response.status, 200);
  assert.deepEqual(seen, ["antigravity/gemini-4-hydrogen-high"]);
  assert.deepEqual(combo, before);
  const nested = [
    {
      models: [
        "agy/gemini-4-hydrogen",
        { model: "antigravity/gemini-4-hydrogen", allowedConnectionIds: ["a"] },
        { type: "combo", combo: "child" },
      ],
    },
  ];
  const materialized = await materializeNativeReasoningCombos(nested, {
    reasoning: { effort: "medium" },
  });
  assert.equal(materialized[0].models[0], "agy/gemini-4-hydrogen-medium");
  assert.deepEqual(materialized[0].models[1], {
    model: "antigravity/gemini-4-hydrogen-medium",
    allowedConnectionIds: ["a"],
  });
  assert.equal(nested[0].models[0], "agy/gemini-4-hydrogen");
});

test("final executor preserves native xhigh and fixed tiers in the outgoing envelope", async () => {
  const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
  const original = {
    request: {
      contents: [{ role: "user", parts: [{ text: "hi" }] }],
      generationConfig: {
        thinkingConfig: { thinkingLevel: "high", thinkingBudget: 1024, includeThoughts: false },
      },
    },
  };
  for (const effort of ["low", "medium", "high", "xhigh"]) {
    const model = `gemini-4-hydrogen-${effort}`;
    const result = await new AntigravityExecutor().transformRequest(
      model,
      structuredClone(original),
      false,
      { projectId: "test-project" }
    );
    assert.ok(!(result instanceof Response));
    assert.equal(result.model, model);
    const thinking = result.request?.generationConfig?.thinkingConfig;
    assert.equal(thinking?.thinkingLevel, effort);
    assert.equal(thinking?.thinkingBudget, undefined);
    assert.equal(thinking?.includeThoughts, false);
  }
  assert.equal(original.request.generationConfig.thinkingConfig.thinkingBudget, 1024);
});

test("account admission uses concrete tiers and disabled accounts stop advertising tiers", async () => {
  const { updateProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
  for (const provider of ["antigravity", "agy"])
    for (const tier of ["low", "high"]) {
      await updateProviderConnection(`${provider}-${tier}`, {
        accessToken: "synthetic-token",
        providerSpecificData: { projectId: "synthetic-project" },
      });
    }
  const chosen = await getProviderCredentials(
    "antigravity",
    null,
    ["antigravity-low", "antigravity-high"],
    "gemini-4-hydrogen-high"
  );
  assert.equal(chosen?.connectionId, "antigravity-high");
  const resolved = await getModelInfo("antigravity/gemini-4-hydrogen", {
    reasoning_effort: "high",
  });
  assert.equal(resolved.requireNativeReasoningCatalog, true);
  const denied = await getProviderCredentials(
    "antigravity",
    null,
    ["antigravity-low"],
    resolved.model,
    { requireNativeReasoningCatalog: resolved.requireNativeReasoningCatalog }
  );
  assert.equal(denied?.connectionId, undefined);
  for (const provider of ["antigravity", "agy"])
    await updateProviderConnection(`${provider}-high`, { isActive: false });
  const narrowed = await getActiveSyncedCatalog("antigravity");
  assert.deepEqual(
    narrowed.models.find((row) => row.id === "gemini-4-hydrogen")?.supportedThinkingEfforts,
    ["low"]
  );
  assert.equal(
    (await getModelInfo("antigravity/gemini-4-hydrogen", { reasoning_effort: "high" })).errorType,
    "invalid_reasoning_effort"
  );
  assert.equal(
    (await getModelInfo("antigravity/gemini-4-hydrogen", {})).model,
    "gemini-4-hydrogen-low"
  );
});

test("generated aliases cannot be persisted back as native catalog evidence", async () => {
  const { normalizeSyncedAvailableModels } = await import("../../src/lib/db/models/synced.ts");
  const current = await getActiveSyncedCatalog("antigravity");
  assert.ok(current.models.some((row) => row.catalogOrigin === "reasoning-family"));
  assert.ok(
    !normalizeSyncedAvailableModels(current.models).some((row) => row.id === "gemini-4-hydrogen")
  );
});

test("operator-hidden native variants are not selectable through a neutral alias", async () => {
  const { mergeModelCompatOverride } = await import("../../src/lib/db/models/compat.ts");
  mergeModelCompatOverride("antigravity", "gemini-4-hydrogen-low", { isHidden: true });
  const hidden = await getModelInfo("antigravity/gemini-4-hydrogen", { reasoning_effort: "low" });
  assert.equal(hidden.errorType, "model_not_found");
  mergeModelCompatOverride("antigravity", "gemini-4-hydrogen-low", { isHidden: false });
  assert.equal(
    (await getModelInfo("antigravity/gemini-4-hydrogen", {})).model,
    "gemini-4-hydrogen-low"
  );
});
