/**
 * #18038 — the Kimi K3.1 model matcher and effort alias table live in one module
 * (open-sse/utils/kimiK31.ts). The executors, the reasoning-effort sanitizer and the
 * chatCore Kimi Coding normalizer import it instead of carrying their own copies.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  hasUnsupportedK31Effort,
  isK31MappableEffort,
  isK31RejectionFinal,
  isKimiK31Model,
  mapK31EffortAlias,
} from "../../open-sse/utils/kimiK31.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("isKimiK31Model matches bare, kimi-prefixed and namespaced K3.1 ids only", () => {
  for (const id of [
    "k3.1-pro",
    "k3.1-pro-highspeed",
    "kimi-k3.1-pro",
    "Kimi-K3.1-Pro-Highspeed",
    "moonshot/kimi-k3.1-pro",
    "kmc/k3.1-pro",
    "k3.1",
  ]) {
    assert.equal(isKimiK31Model(id), true, id);
  }
  for (const id of ["k3", "kimi-k3", "kimi-k3-high", "k3.10", "kimi-k3.1x", "kimi-k2.7-code"]) {
    assert.equal(isKimiK31Model(id), false, id);
  }
  assert.equal(isKimiK31Model(undefined), false);
  assert.equal(isKimiK31Model(null), false);
});

test("mapK31EffortAlias folds the mappable aliases onto low/high/max", () => {
  const expected: Record<string, string> = {
    ultra: "max",
    xhigh: "max",
    max: "max",
    high: "high",
    medium: "high",
    low: "low",
    minimum: "low",
    light: "low",
  };
  for (const [alias, tier] of Object.entries(expected)) {
    assert.equal(mapK31EffortAlias(alias), tier, alias);
    assert.equal(mapK31EffortAlias(alias.toUpperCase()), tier, alias.toUpperCase());
    assert.equal(isK31MappableEffort(alias), true, alias);
  }
  for (const effort of ["none", "off", "auto", "bogus", "constructor", "toString", ""]) {
    assert.equal(mapK31EffortAlias(effort), effort, effort);
    assert.equal(isK31MappableEffort(effort), false, effort);
  }
});

test("hasUnsupportedK31Effort flags any carrier outside low/high/max", () => {
  assert.equal(hasUnsupportedK31Effort({ reasoning_effort: "high" }), false);
  assert.equal(hasUnsupportedK31Effort({ reasoning_effort: "MAX" }), false);
  assert.equal(hasUnsupportedK31Effort({ reasoning: { effort: "medium" } }), true);
  assert.equal(hasUnsupportedK31Effort({ output_config: { effort: "none" } }), true);
  assert.equal(hasUnsupportedK31Effort({ thinking: { effort: 3 } }), true);
  assert.equal(hasUnsupportedK31Effort({}), false);
  assert.equal(hasUnsupportedK31Effort(null), false);
  assert.equal(hasUnsupportedK31Effort([]), false);
});

test("isK31RejectionFinal: disabled thinking or an unsupported effort on K3.1 only", () => {
  assert.equal(isK31RejectionFinal("kimi-k3.1-pro", { enable_thinking: false }), true);
  assert.equal(isK31RejectionFinal("k3.1-pro", { thinking: { type: "disabled" } }), true);
  assert.equal(isK31RejectionFinal("k3.1-pro", { reasoning_effort: "none" }), true);
  assert.equal(isK31RejectionFinal("k3.1-pro", { reasoning_effort: "low" }), false);
  assert.equal(isK31RejectionFinal("kimi-k3", { reasoning_effort: "none" }), false);
  assert.equal(isK31RejectionFinal("k3.1-pro", null), false);
});

test("no layer keeps its own copy of the K3.1 matcher or alias table", () => {
  const consumers = [
    "open-sse/executors/kimi.ts",
    "open-sse/executors/moonshot.ts",
    "open-sse/executors/base/reasoningEffort.ts",
    "open-sse/handlers/chatCore/kimiCodingEffortVariant.ts",
    "open-sse/utils/kimiCodingEffortVariant.ts",
  ];
  for (const rel of consumers) {
    const source = readFileSync(path.join(ROOT, rel), "utf8");
    assert.doesNotMatch(source, /k3\\\.1/, `${rel} must import the K3.1 matcher from kimiK31.ts`);
    assert.doesNotMatch(source, /K31_EFFORT_ALIASES/, `${rel} must not redefine the alias table`);
    assert.match(source, /kimiK31\.ts/, `${rel} must import open-sse/utils/kimiK31.ts`);
  }
});
