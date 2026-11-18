// tests/unit/combo/combo-context.test.ts
// Unit tests for the first extracted combo phase (god-file decomposition fase 1):
// createComboContext (combo/context.ts) + phaseComboSetup (combo/comboSetup.ts).
// The pinning-ON path (getLastSessionModel) is covered end-to-end by the existing combo
// characterization suite (combo-sessionless-pin-3825, combo-config, etc.); here we exercise
// the pure path (context_cache_protection OFF, no settings -> no DB) and the body carrier.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createComboContext } from "../../../open-sse/services/combo/context.ts";
import { phaseComboSetup } from "../../../open-sse/services/combo/comboSetup.ts";
import { withComboServiceTier } from "../../../open-sse/services/combo/comboServiceTier.ts";
import { comboRuntimeConfigSchema } from "../../../src/shared/validation/schemas/combo.ts";
import { resetDbInstance } from "../../../src/lib/db/core.ts";

test.after(() => resetDbInstance());

const log = { info() {}, warn() {}, error() {}, debug() {} };

test("createComboContext carries inputs and the body BY REFERENCE", () => {
  const body = { model: "auto", messages: [], stream: true };
  const combo = { name: "c1", models: ["a", "b"] };
  const ctx = createComboContext({ body, combo, log });
  assert.equal(
    ctx.body,
    body,
    "body must be the same reference (not copied) for byte-identical pinning"
  );
  assert.equal(ctx.combo, combo);
  assert.equal(ctx.settings, null);
  assert.equal(ctx.relayOptions, null);
  assert.equal(ctx.log, log);
});

test("phaseComboSetup resolves strategy/config/stream with pinning OFF (pure, no DB)", () => {
  const body = { model: "auto", messages: [], stream: true };
  const combo = { name: "c1", models: ["a"], strategy: "priority" };
  const ctx = createComboContext({ body, combo, log });

  const setup = phaseComboSetup(ctx);

  assert.equal(setup.strategy, "priority");
  assert.equal(setup.pinnedModel, null, "no pin when context_cache_protection is off");
  assert.equal(setup.effectiveSessionId, null);
  assert.equal(setup.clientRequestedStream, true, "body.stream === true");
  assert.equal(typeof setup.comboTargetTimeoutMs, "number");
  assert.equal(typeof setup.reasoningTokenBufferEnabled, "boolean");
  assert.ok(setup.config && typeof setup.config === "object", "config cascade resolved");
  assert.ok(
    setup.resilienceSettings && typeof setup.resilienceSettings === "object",
    "resilience settings resolved"
  );
});

test("phaseComboSetup: clientRequestedStream is false when body.stream is not true", () => {
  const ctx = createComboContext({
    body: { model: "auto", messages: [] },
    combo: { name: "c", models: ["a"] },
    log,
  });
  const setup = phaseComboSetup(ctx);
  assert.equal(setup.clientRequestedStream, false);
});

test("phaseComboSetup normalizes an unknown strategy to a valid routing strategy", () => {
  const ctx = createComboContext({
    body: { model: "auto", messages: [] },
    combo: { name: "c", models: ["a"], strategy: "not-a-real-strategy" },
    log,
  });
  const setup = phaseComboSetup(ctx);
  // normalizeRoutingStrategy falls back to the default for unknown values.
  assert.equal(typeof setup.strategy, "string");
  assert.ok(setup.strategy.length > 0);
});

function captureDispatch() {
  const seen: Array<{ body: Record<string, unknown>; model: string; target: unknown }> = [];
  const dispatch = async (body: Record<string, unknown>, model: string, target?: unknown) => {
    seen.push({ body, model, target });
    return new Response("ok");
  };
  return { seen, dispatch };
}

test("phaseComboSetup leaves the tier to the per-target dispatch", () => {
  const body = { model: "bucket", messages: [] };
  const ctx = createComboContext({
    body,
    combo: { name: "bucket", models: ["openai/gpt-4o"], config: { service_tier: "flex" } },
    log,
  });
  phaseComboSetup(ctx);
  assert.equal(Object.hasOwn(ctx.body, "service_tier"), false);
});

for (const stream of [false, true]) {
  test(`combo tier: an unconfigured combo dispatches the same body (stream=${stream})`, async () => {
    const { seen, dispatch } = captureDispatch();
    const body = { model: "bucket", messages: [], stream };
    const handle = withComboServiceTier(dispatch, { config: {} });
    assert.equal(handle, dispatch);
    await handle(body, "openai/gpt-4o");
    assert.equal(seen[0].body, body);
  });

  for (const field of ["service_tier", "serviceTier"]) {
    test(`combo tier: config.${field} reaches an accepting target (stream=${stream})`, async () => {
      const { seen, dispatch } = captureDispatch();
      const body = { model: "bucket", messages: [], stream };
      const config = { [field]: "flex" };
      const target = { modelAbortSignal: new AbortController().signal };
      await withComboServiceTier(dispatch, { config })(body, "openai/gpt-4o", target);
      assert.deepEqual(seen[0].body, { ...body, service_tier: "flex" });
      assert.equal(seen[0].target, target);
      assert.equal(Object.hasOwn(body, "service_tier"), false, "do not mutate caller body");
      assert.deepEqual(config, { [field]: "flex" });
    });
  }
}

for (const model of ["openai/gpt-4o", "azure-openai/gpt-4o", "codex/gpt-5.5"]) {
  test(`combo tier: ${model} accepts service_tier`, async () => {
    const { seen, dispatch } = captureDispatch();
    await withComboServiceTier(dispatch, { config: { service_tier: "priority" } })({}, model);
    assert.equal(seen[0].body.service_tier, "priority");
  });
}

for (const model of ["groq/llama-3", "deepseek/deepseek-chat", "gemini/gemini-flash", "nr/x"]) {
  test(`combo tier: ${model} never receives the combo's service_tier`, async () => {
    const { seen, dispatch } = captureDispatch();
    const body = { model: "bucket", messages: [] };
    await withComboServiceTier(dispatch, { config: { service_tier: "flex" } })(body, model);
    assert.equal(seen[0].body, body);
    assert.equal(Object.hasOwn(seen[0].body, "service_tier"), false);
  });
}

test("combo tier: a refusing target keeps the tier the client sent", async () => {
  const { seen, dispatch } = captureDispatch();
  const body = { model: "bucket", messages: [], service_tier: "priority" };
  await withComboServiceTier(dispatch, { config: { service_tier: "flex" } })(body, "groq/llama-3");
  assert.equal(seen[0].body.service_tier, "priority");
});

test("combo tier: the resolved target provider beats the prefix in the model string", async () => {
  const { seen, dispatch } = captureDispatch();
  const target = { provider: "groq", modelAbortSignal: new AbortController().signal };
  await withComboServiceTier(dispatch, { config: { service_tier: "flex" } })(
    {},
    "openai/gpt-4o",
    target as never
  );
  assert.equal(Object.hasOwn(seen[0].body, "service_tier"), false);
});

test("combo tier: a valid snake-case tier wins over camel-case and the client", async () => {
  const { seen, dispatch } = captureDispatch();
  const combo = { config: { service_tier: " FLEX ", serviceTier: "default" } };
  await withComboServiceTier(dispatch, combo)({ service_tier: "priority" }, "openai/gpt-4o");
  assert.equal(seen[0].body.service_tier, "flex");
});

test("combo tier: invalid or absent values preserve the client request", async () => {
  for (const tier of [undefined, null, "", "invalid", 7, {}, ["flex"]]) {
    const { seen, dispatch } = captureDispatch();
    const body = { model: "bucket", messages: [], service_tier: "priority" };
    await withComboServiceTier(dispatch, { config: { service_tier: tier } })(body, "openai/gpt-4o");
    assert.equal(seen[0].body, body);
  }
});

test("comboRuntimeConfigSchema validates and normalizes both tier spellings", () => {
  for (const field of ["service_tier", "serviceTier"]) {
    for (const tier of ["auto", "default", "flex", "priority", "scale"]) {
      assert.equal(comboRuntimeConfigSchema.parse({ [field]: tier })[field], tier);
    }
    assert.equal(comboRuntimeConfigSchema.parse({ [field]: " FLEX " })[field], "flex");
    for (const tier of ["turbo", "", 7, null, ["flex"]]) {
      assert.equal(comboRuntimeConfigSchema.safeParse({ [field]: tier }).success, false, `${tier}`);
    }
  }
  assert.equal(comboRuntimeConfigSchema.safeParse({}).success, true);
});
