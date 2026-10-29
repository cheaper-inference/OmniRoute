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

for (const stream of [false, true]) {
  test(`phaseComboSetup: default bucket omits service_tier (stream=${stream})`, () => {
    const body = { model: "nr-gemini-flash", messages: [], stream };
    const ctx = createComboContext({
      body,
      combo: { name: "nr-gemini-flash", models: ["nr/gemini-flash"], config: {} },
      log,
    });
    phaseComboSetup(ctx);
    assert.equal(Object.hasOwn(ctx.body, "service_tier"), false);
    assert.deepEqual(ctx.body, body);
  });

  for (const field of ["service_tier", "serviceTier"]) {
    test(`phaseComboSetup: combo config.${field} forwards flex (stream=${stream})`, () => {
      const body = { model: "nr-gemini-flash-flex", messages: [], stream };
      const models = ["nr/gemini-flash", "nr/fallback"];
      const combo = {
        name: "nr-gemini-flash-flex",
        models,
        strategy: "priority",
        config: { [field]: "flex" },
      };
      const ctx = createComboContext({ body, combo, log });
      const setup = phaseComboSetup(ctx);
      assert.equal(ctx.body.service_tier, "flex");
      assert.deepEqual(ctx.body, { ...body, service_tier: "flex" });
      assert.equal(Object.hasOwn(body, "service_tier"), false, "do not mutate caller body");
      assert.equal(setup.clientRequestedStream, stream);
      assert.equal(setup.strategy, "priority");
      assert.equal(combo.models, models);
      assert.deepEqual(combo.config, { [field]: "flex" });
    });
  }
}

test("phaseComboSetup: valid combo snake-case tier wins over camel-case and client", () => {
  const ctx = createComboContext({
    body: { model: "bucket", messages: [], service_tier: "priority" },
    combo: {
      name: "bucket",
      models: ["nr/gemini-flash"],
      config: { service_tier: " FLEX ", serviceTier: "default" },
    },
    log,
  });
  phaseComboSetup(ctx);
  assert.equal(ctx.body.service_tier, "flex");
});

test("phaseComboSetup: invalid/absent combo tiers preserve client requests", () => {
  for (const tier of [undefined, null, "", "invalid", 7, {}, ["flex"]]) {
    const body = { model: "bucket", messages: [], service_tier: "priority" };
    const ctx = createComboContext({
      body,
      combo: { name: "bucket", models: ["nr/gemini-flash"], config: { service_tier: tier } },
      log,
    });
    phaseComboSetup(ctx);
    assert.deepEqual(ctx.body, body);
  }
});
