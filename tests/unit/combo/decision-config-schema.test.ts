/**
 * Decision routing, step 8: the strict decision block in the combo save schema, at the top
 * level (`config.decision`, what the dashboard writes) and nested (`config.auto.decision`).
 * No secret is storable: `apiKey` is rejected; the credential is a `connectionId` reference.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  createComboSchema,
  updateComboSchema,
} from "../../../src/shared/validation/schemas/combo.ts";
import { decisionRoutingConfigSchema } from "../../../open-sse/services/decision/schema.ts";

const base = {
  name: "decision-combo",
  strategy: "auto" as const,
  models: [{ kind: "model" as const, model: "openai/gpt-4o-mini" }],
};

const valid = {
  decider: "http",
  baseUrl: "https://decider.example/v1",
  wire: "openai-chat",
  model: "qwen-small",
  connectionId: "conn-1",
  timeoutMs: 1500,
  minConfidence: 0.6,
  descriptions: { "gpt-4o-mini": "cheap drafts" },
};

test("a full decision block is accepted at the top level and under config.auto", () => {
  const top = createComboSchema.parse({
    ...base,
    config: { routerStrategy: "decision", decision: valid },
  });
  assert.deepEqual(top.config?.decision, valid);
  const nested = updateComboSchema.parse({
    config: { auto: { routerStrategy: "decision", decision: { decider: "systemone" } } },
  });
  assert.deepEqual(
    (nested.config as { auto?: { decision?: unknown } } | undefined)?.auto?.decision,
    { decider: "systemone" }
  );
});

test("a plain-text apiKey (or any unknown field) is rejected — top level and nested", () => {
  for (const config of [
    { decision: { ...valid, apiKey: "sk-plain" } },
    { auto: { decision: { decider: "systemone", apiKey: "sk-plain" } } },
    { decision: { decider: "systemone", extra: true } },
  ]) {
    assert.equal(
      createComboSchema.safeParse({ ...base, config }).success,
      false,
      JSON.stringify(config)
    );
  }
});

test("decider and wire are closed enums", () => {
  assert.equal(decisionRoutingConfigSchema.safeParse({ decider: "local" }).success, false);
  assert.equal(decisionRoutingConfigSchema.safeParse({ decider: "decisions" }).success, false);
  assert.equal(
    decisionRoutingConfigSchema.safeParse({ decider: "http", wire: "decisions" }).success,
    false
  );
});

test("baseUrl: http(s) only, ≤500 chars, no credentials, query or fragment", () => {
  for (const baseUrl of [
    "ftp://decider.example",
    "https://user:pw@decider.example",
    "https://decider.example/?key=1",
    "https://decider.example/#x",
    `https://decider.example/${"a".repeat(500)}`,
  ]) {
    assert.equal(
      decisionRoutingConfigSchema.safeParse({ decider: "http", baseUrl }).success,
      false,
      baseUrl
    );
  }
});

test("timeoutMs is an integer in [100, 5000]; minConfidence in [0, 1]; model ≤200", () => {
  const ok = (extra: Record<string, unknown>) =>
    decisionRoutingConfigSchema.safeParse({ decider: "systemone", ...extra }).success;
  assert.equal(ok({ timeoutMs: 100 }), true);
  assert.equal(ok({ timeoutMs: 5000 }), true);
  assert.equal(ok({ timeoutMs: 99 }), false);
  assert.equal(ok({ timeoutMs: 5001 }), false);
  assert.equal(ok({ timeoutMs: 1500.5 }), false);
  assert.equal(ok({ minConfidence: 1.01 }), false);
  assert.equal(ok({ minConfidence: -0.1 }), false);
  assert.equal(ok({ model: "m".repeat(201) }), false);
});

test("descriptions: at most 50 entries, key ≤300 and value ≤1000 characters", () => {
  const ok = (descriptions: Record<string, string>) =>
    decisionRoutingConfigSchema.safeParse({ decider: "systemone", descriptions }).success;
  const fifty = Object.fromEntries(Array.from({ length: 50 }, (_, i) => [`m${i}`, "d"]));
  assert.equal(ok(fifty), true);
  assert.equal(ok({ ...fifty, extra: "d" }), false);
  assert.equal(ok({ ["k".repeat(301)]: "d" }), false);
  assert.equal(ok({ m: "d".repeat(1001) }), false);
});
