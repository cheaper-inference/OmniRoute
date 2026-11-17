// Uncataloged models of passthrough providers must not inherit the provider's generic
// defaultContextLength as a *known* window. OpenRouter serves models this build has no
// capability data for (released after the last model sync); the 128000 generic default is
// a placeholder, not that model's window. Resolver side of
// openspec change fix-passthrough-unknown-context-cap.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passthrough-ctx-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "passthrough-unknown-context-secret";

const core = await import("../../src/lib/db/core.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { isRegistryPassthroughProvider } =
  await import("../../open-sse/services/passthroughRegistry.ts");
const { resolveComboContextLimit } = await import("../../open-sse/services/comboContextLimit.ts");
const { resolveTokenLimit, getTokenLimit, getSourcedTokenLimit, getComboTargetTokenLimit } =
  await import("../../open-sse/services/contextManager.ts");

const UNCATALOGED = "vendor/uncataloged-model-passthrough-ctx";
const ENV_KEYS = ["CONTEXT_LENGTH_OPENROUTER", "CONTEXT_LENGTH_DEFAULT", "CONTEXT_LENGTH_MISTRAL"];
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

test.beforeEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
});

test.after(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("fixture: openrouter is a passthrough provider with a generic 128000 default", () => {
  assert.equal(REGISTRY.openrouter.passthroughModels, true);
  assert.equal(REGISTRY.openrouter.defaultContextLength, 128000);
});

test("1.1 uncataloged openrouter model resolves the provider default as an unsourced placeholder", () => {
  const resolved = resolveTokenLimit("openrouter", UNCATALOGED);
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.specific, false);
  assert.equal(resolved.placeholder, true);
});

test("1.1 getTokenLimit keeps returning the numeric placeholder (signature unchanged)", () => {
  assert.equal(getTokenLimit("openrouter", UNCATALOGED), 128000);
});

test("1.1 getSourcedTokenLimit / getComboTargetTokenLimit treat the placeholder as unknown", () => {
  assert.equal(getSourcedTokenLimit("openrouter", UNCATALOGED), undefined);
  assert.equal(getComboTargetTokenLimit({ modelStr: `openrouter/${UNCATALOGED}` }), undefined);
});

test("1.2 a persisted context override keeps the model sourced", () => {
  const model = "deepseek/deepseek-v4.1-flash-1017";
  assert.equal(contextOverrides.setModelContextOverride("openrouter", model, 1048576), true);
  try {
    const resolved = resolveTokenLimit("openrouter", model);
    assert.equal(resolved.limit, 1048576);
    assert.equal(resolved.specific, true);
    assert.ok(!resolved.placeholder);
    assert.equal(getSourcedTokenLimit("openrouter", model), 1048576);
  } finally {
    contextOverrides.removeModelContextOverride("openrouter", model);
  }
});

test("1.2 an env override keeps every openrouter model sourced", () => {
  process.env.CONTEXT_LENGTH_OPENROUTER = "262144";
  const resolved = resolveTokenLimit("openrouter", UNCATALOGED);
  assert.equal(resolved.limit, 262144);
  assert.equal(resolved.specific, true);
  assert.ok(!resolved.placeholder);
});

test("1.3 a non-passthrough provider's defaultContextLength stays sourced", () => {
  assert.ok(!REGISTRY.mistral.passthroughModels, "fixture: mistral is not a passthrough provider");
  const providerDefault = REGISTRY.mistral.defaultContextLength;
  assert.ok(providerDefault && providerDefault > 0, "fixture: mistral declares a default");
  const resolved = resolveTokenLimit("mistral", UNCATALOGED);
  assert.equal(resolved.limit, providerDefault);
  assert.equal(resolved.specific, true);
  assert.ok(!resolved.placeholder);
});

test("1.3 a passthrough provider's own static model keeps the provider default sourced", () => {
  const staticModel = REGISTRY.openrouter.models.find((m: { id: string }) => m.id === "auto");
  assert.ok(staticModel, "fixture: openrouter lists the static model `auto`");
  const resolved = resolveTokenLimit("openrouter", "auto");
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.specific, true);
  assert.ok(!resolved.placeholder);
});

test("1.3 a provider-level lookup (no model) keeps the provider default sourced", () => {
  const resolved = resolveTokenLimit("openrouter", null);
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.specific, true);
  assert.ok(!resolved.placeholder);
});

test("1.3 the generic catch-all for an unregistered provider is unchanged (specific:false, no placeholder)", () => {
  const resolved = resolveTokenLimit("not-a-real-provider", "no-such-model");
  assert.equal(resolved.limit, 128000);
  assert.equal(resolved.specific, false);
  assert.ok(!resolved.placeholder);
});

test("1.3 a passthrough provider that declares its default authoritative keeps it sourced", () => {
  assert.equal(isRegistryPassthroughProvider("uncloseai"), true);
  assert.equal(REGISTRY.uncloseai.defaultContextLengthAuthoritative, true);
  const resolved = resolveTokenLimit("uncloseai", UNCATALOGED);
  assert.equal(resolved.limit, REGISTRY.uncloseai.defaultContextLength);
  assert.equal(resolved.specific, true);
  assert.ok(!resolved.placeholder);
  assert.equal(getSourcedTokenLimit("uncloseai", UNCATALOGED), resolved.limit);
});

test("1.4 combo resolution flags a placeholder own-limit so chatCore can skip enforcement", () => {
  // A sibling's window is no evidence about the uncataloged model's: the own placeholder is
  // reported as the target's limit (flagged), never replaced by the sibling's combo-min.
  const withSibling = resolveComboContextLimit({
    provider: "openrouter",
    model: UNCATALOGED,
    comboTargetLimits: [200000],
  });
  assert.equal(withSibling.source, "target");
  assert.equal(withSibling.limit, 128000);
  assert.equal(withSibling.placeholder, true);

  const alone = resolveComboContextLimit({
    provider: "openrouter",
    model: UNCATALOGED,
    comboTargetLimits: [],
  });
  assert.equal(alone.source, "target");
  assert.equal(alone.placeholder, true);

  const explicit = resolveComboContextLimit({
    provider: "openrouter",
    model: UNCATALOGED,
    comboTargetLimits: [],
    comboContextLength: 64000,
  });
  assert.equal(explicit.source, "combo-explicit");
  assert.ok(!explicit.placeholder, "an operator-declared combo window is a sourced limit");

  const unregistered = resolveComboContextLimit({
    provider: "not-a-real-provider",
    model: "no-such-model",
    comboTargetLimits: [640000],
  });
  assert.equal(unregistered.source, "combo-min");
  assert.ok(!unregistered.placeholder);
});
