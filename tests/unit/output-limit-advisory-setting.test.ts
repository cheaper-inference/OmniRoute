/**
 * Explicit output-limit advisory keeps combo targets whose known output ceiling
 * sits below the request's max_tokens in strategy order. The combo resolver has
 * read it from three places for a while -- the per-combo config, the round-robin
 * config, and the global settings row -- but only the per-combo copy could be set
 * from the dashboard, so an operator with a dozen combos had to edit every one.
 *
 * It lives in settings now, which means it needs a schema entry or the settings API
 * strips it. An absent setting is distinct from opting out of automatic fallback.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-output-limit-advisory-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
const { getSettings, updateSettings } = await import("../../src/lib/db/settings.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility, handleComboChat, resolveComboTargets } =
  await import("../../open-sse/services/combo.ts");
const { partitionJevTargetsForAsk } =
  await import("../../open-sse/services/combo/jevBlockChecker.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { getExplicitModelOutputCap } = await import("../../src/lib/modelCapabilities.ts");
const { enforceOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/outputTokenBudget.ts");

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

function capabilityEntry(
  limitOutput: number,
  limitContext = 128_000,
  toolCall = true,
  vision = false
) {
  return {
    tool_call: toolCall,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(vision ? ["text", "image"] : ["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: limitOutput,
    interleaved_field: null,
  };
}

test("an unset outputLimitAdvisory is distinct from explicitly opting out", async () => {
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, undefined);
});

test("the schema accepts outputLimitAdvisory as a boolean and keeps its neighbours", () => {
  const parsed = updateSettingsSchema.parse({ outputLimitAdvisory: true, theme: "dark" });
  assert.equal(parsed.outputLimitAdvisory, true);
  assert.equal(parsed.theme, "dark");
});

test("the schema rejects a non-boolean advisory instead of coercing it", () => {
  assert.equal(updateSettingsSchema.safeParse({ outputLimitAdvisory: "yes" }).success, false);
});

const ceilingBody = {
  messages: [{ role: "user", content: "hello" }],
  max_tokens: 128_000,
};

function saveCeilingFixtures() {
  saveModelsDevCapabilities({
    "unit-ceiling-a": { normal: capabilityEntry(65_536, 100_000) },
    "unit-ceiling-b": { normal: capabilityEntry(65_536, 100_000) },
    "unit-ceiling-wide": { normal: capabilityEntry(65_536, 200_000) },
    "unit-ceiling-vision": { normal: capabilityEntry(65_536, 100_000, true, true) },
    "unit-ceiling-vision-overflow": { normal: capabilityEntry(65_536, 65_536, true, true) },
    "unit-ceiling-full": { normal: capabilityEntry(128_000, 200_000) },
    "unit-ceiling-overflow": { normal: capabilityEntry(65_536, 65_536) },
    "unit-ceiling-no-tools": { normal: capabilityEntry(65_536, 100_000, false) },
  });
}

async function runCeilingCombo(
  strategy: "priority" | "round-robin",
  models = ["unit-ceiling-a/normal", "unit-ceiling-b/normal"],
  body: Record<string, unknown> = ceilingBody,
  settings: Record<string, unknown> = {},
  config: Record<string, unknown> = {},
  sourceFormat = "claude",
  isModelAvailable?: (model: string) => Promise<boolean>
) {
  const calls: Array<{ model: string; maxTokens: unknown }> = [];
  const response = await handleComboChat({
    body,
    combo: { name: `unit-ceiling-${strategy}`, strategy, models, config },
    sourceFormat,
    settings,
    isModelAvailable,
    handleSingleModel: async (input, model) => {
      const output = enforceOutputTokenBudget(
        input,
        32,
        200_000,
        0,
        getExplicitModelOutputCap(model)
      );
      assert.equal(output.ok, true);
      if (output.ok) calls.push({ model, maxTokens: output.body.max_tokens });
      return Response.json({ choices: [{ message: { content: "ok" } }] });
    },
    log: noopLog,
  });
  return { response, calls };
}

for (const strategy of ["priority", "round-robin"] as const) {
  test(`${strategy}: an oversized max_tokens ceiling falls back to the target's dispatch cap`, async () => {
    saveCeilingFixtures();
    const { response, calls } = await runCeilingCombo(
      strategy,
      undefined,
      undefined,
      await getSettings()
    );
    assert.equal(response.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].maxTokens, 65_536);
    assert.equal(ceilingBody.max_tokens, 128_000);
  });

  test(`${strategy}: the automatic fallback never displaces a full-budget target`, async () => {
    saveCeilingFixtures();
    const { response, calls } = await runCeilingCombo(strategy, [
      "unit-ceiling-a/normal",
      "unit-ceiling-full/normal",
    ]);
    assert.equal(response.status, 200);
    assert.deepEqual(calls, [{ model: "unit-ceiling-full/normal", maxTokens: 128_000 }]);
  });

  test(`${strategy}: explicit strict settings still reject an all-output-limited pool`, async () => {
    saveCeilingFixtures();
    for (const [settings, config] of [
      [{ outputLimitAdvisory: false }, {}],
      [{}, { outputLimitAdvisory: false }],
      [{ outputLimitAdvisory: true }, { outputLimitAdvisory: false }],
    ]) {
      const { response, calls } = await runCeilingCombo(
        strategy,
        undefined,
        undefined,
        settings,
        config
      );
      assert.equal(response.status, 400);
      assert.match(await response.text(), /highest known output limit in the pool is 65536/);
      assert.deepEqual(calls, []);
    }
  });
}

test("Jev preflight keeps safe output-limited targets without undoing explicit strict mode", async () => {
  saveCeilingFixtures();
  const combo = {
    name: "unit-jev-ceiling",
    models: ["unit-ceiling-a/normal", "unit-ceiling-b/normal"],
  };
  const targets = resolveComboTargets(combo, []);
  const deps = {
    body: ceilingBody,
    comboName: combo.name,
    config: {},
    sourceFormat: "claude",
    resilienceSettings: resolveResilienceSettings({}),
    log: noopLog,
  };
  const automatic = await partitionJevTargetsForAsk(targets, deps);
  assert.deepEqual(automatic.eligible, targets);
  const strict = await partitionJevTargetsForAsk(targets, {
    ...deps,
    settings: { outputLimitAdvisory: false },
  });
  assert.deepEqual(strict.eligible, []);
});

test("automatic fallback finds an explicit output cap in the target's provider scope", () => {
  saveCeilingFixtures();
  const [target] = resolveComboTargets(
    { name: "unit-scoped", models: ["unit-ceiling-a/normal"] },
    []
  );
  const scoped = { ...target, providerId: "unit-ceiling-a", modelStr: "normal" };
  assert.equal(getExplicitModelOutputCap(scoped.modelStr), null);
  assert.equal(
    getExplicitModelOutputCap({ provider: scoped.providerId, model: scoped.modelStr }),
    65_536
  );
  assert.deepEqual(
    filterTargetsByRequestCompatibility([scoped], ceilingBody, noopLog, undefined, {
      sourceFormat: "claude",
    }),
    [scoped]
  );
});

test("Jev applies the effective cap only to targets admitted by compatibility", async () => {
  saveCeilingFixtures();
  const combo = { name: "unit-jev-mixed-window" };
  const tight = "unit-ceiling-a/normal";
  const wide = "unit-ceiling-wide/normal";
  const full = "unit-ceiling-full/normal";
  const tooSmall = "unit-ceiling-overflow/normal";
  const deps = {
    body: { ...ceilingBody, messages: [{ role: "user", content: "x".repeat(40_000) }] },
    comboName: combo.name,
    config: {},
    sourceFormat: "claude",
    resilienceSettings: resolveResilienceSettings({}),
    log: noopLog,
  };
  const automatic = await partitionJevTargetsForAsk(
    resolveComboTargets({ ...combo, models: [tight, wide, tooSmall] }, []),
    deps
  );
  assert.deepEqual(
    automatic.eligible.map((target) => target.modelStr),
    [tight, wide]
  );

  const withFull = resolveComboTargets({ ...combo, models: [tight, full, tooSmall] }, []);
  const defaultPolicy = await partitionJevTargetsForAsk(withFull, deps);
  assert.deepEqual(
    defaultPolicy.eligible.map((target) => target.modelStr),
    [full]
  );
  const advisory = await partitionJevTargetsForAsk(withFull, {
    ...deps,
    settings: { outputLimitAdvisory: true },
  });
  assert.deepEqual(
    advisory.eligible.map((target) => target.modelStr),
    [tight, full]
  );
  assert.ok(
    advisory.blocked.some(
      (block) => block.target.modelStr === tooSmall && block.reason === "context_window"
    )
  );
});

const withTools = {
  ...ceilingBody,
  tools: [{ name: "noop", input_schema: { type: "object" } }],
};
const withVision = {
  ...ceilingBody,
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "hello" },
        { type: "image", source: { type: "base64", media_type: "image/png", data: "aGVsbG8=" } },
      ],
    },
  ],
};

for (const strategy of ["priority", "round-robin"] as const) {
  test(`${strategy}: automatic fallback admits only the safely clampable mixed targets`, async () => {
    saveCeilingFixtures();
    for (const [good, bad, body] of [
      ["unit-ceiling-a/normal", "unit-ceiling-overflow/normal", ceilingBody],
      ["unit-ceiling-a/normal", "unit-ceiling-no-tools/normal", withTools],
      ["unit-ceiling-vision/normal", "unit-ceiling-a/normal", withVision],
    ] as const) {
      const { response, calls } = await runCeilingCombo(strategy, [bad, good], body);
      assert.equal(response.status, 200);
      assert.deepEqual(calls, [{ model: good, maxTokens: 65_536 }]);
    }
  });

  test(`${strategy}: automatic fallback cannot dispatch a mixed reject if its safe target is unavailable`, async () => {
    saveCeilingFixtures();
    const good = "unit-ceiling-a/normal";
    const bad = "unit-ceiling-no-tools/normal";
    const { response, calls } = await runCeilingCombo(
      strategy,
      [bad, good],
      withTools,
      {},
      {},
      "claude",
      async (model) => model !== good
    );
    assert.notEqual(response.status, 200);
    assert.deepEqual(calls, []);
  });

  test(`${strategy}: automatic fallback fails closed when no capped fit is safe`, async () => {
    saveCeilingFixtures();
    for (const [models, body] of [
      [["unit-ceiling-overflow/normal", "unit-ceiling-no-tools/normal"], withTools],
      [["unit-ceiling-vision-overflow/normal", "unit-ceiling-a/normal"], withVision],
    ] as const) {
      for (const config of [{}, { compatFilterFailOpen: true }]) {
        const { response, calls } = await runCeilingCombo(strategy, [...models], body, {}, config);
        assert.equal(response.status, 400);
        assert.deepEqual(calls, []);
      }
    }
  });
}

test("a non-Anthropic request keeps the strict output budget check", async () => {
  saveCeilingFixtures();
  const { response, calls } = await runCeilingCombo(
    "priority",
    undefined,
    undefined,
    {},
    {},
    "openai"
  );
  assert.equal(response.status, 400);
  assert.deepEqual(calls, []);
});

test("an explicit max_completion_tokens budget is not treated as a max_tokens ceiling", async () => {
  saveCeilingFixtures();
  const { response, calls } = await runCeilingCombo("priority", undefined, {
    ...ceilingBody,
    max_completion_tokens: 128_000,
  });
  assert.equal(response.status, 400);
  assert.deepEqual(calls, []);
});

test("turning it on through updateSettings is visible to the combo resolver", async () => {
  await updateSettings({ outputLimitAdvisory: true });
  const settings = await getSettings();
  assert.equal(settings.outputLimitAdvisory, true);

  await updateSettings({ outputLimitAdvisory: false });
  const restored = await getSettings();
  assert.equal(restored.outputLimitAdvisory, false);
});

test("a combo with no advisory in its own config honours the global setting", async () => {
  saveModelsDevCapabilities({
    // Separate providers: a 503 from one provider must not skip the other.
    "unit-global-advisory-a": { insufficient: capabilityEntry(128) },
    "unit-global-advisory-b": { sufficient: capabilityEntry(4_096) },
  });
  const run = async () => {
    const calls: string[] = [];
    const response = await handleComboChat({
      body: { messages: [{ role: "user", content: "hello" }], max_tokens: 512 },
      combo: {
        name: "global-output-limit-advisory",
        strategy: "priority",
        models: ["unit-global-advisory-a/insufficient", "unit-global-advisory-b/sufficient"],
      },
      // Same source the chat handler passes to handleComboChat.
      settings: await getSettings(),
      handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
        calls.push(modelStr);
        const ok = modelStr.endsWith("/insufficient");
        return new Response(
          JSON.stringify(ok ? { choices: [{ message: { content: "ok" } }] } : { error: "down" }),
          { status: ok ? 200 : 503, headers: { "Content-Type": "application/json" } }
        );
      },
      log: noopLog,
    });
    return { status: response.status, calls };
  };

  await updateSettings({ outputLimitAdvisory: false });
  const strict = await run();
  assert.notEqual(strict.status, 200);
  assert.ok(!strict.calls.includes("unit-global-advisory-a/insufficient"));

  await updateSettings({ outputLimitAdvisory: true });
  try {
    const advisory = await run();
    assert.equal(advisory.status, 200);
    assert.deepEqual(advisory.calls, ["unit-global-advisory-a/insufficient"]);
  } finally {
    await updateSettings({ outputLimitAdvisory: false });
  }
});
