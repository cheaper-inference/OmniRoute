import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const previousDataDir = process.env.DATA_DIR;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-antigravity-v1518-"));
process.env.DATA_DIR = testDataDir;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const {
  ANTIGRAVITY_PUBLIC_MODELS,
  isDiscoverableAntigravityModelId,
  isUserCallableAntigravityModelId,
  isUserVisibleAntigravityQuotaModelId,
} = await import("../../open-sse/config/antigravityModelAliases.ts");
const {
  AGY_PUBLIC_MODELS,
  isDiscoverableAgyModelId,
  isUserCallableAgyModelId,
  isUserVisibleAgyQuotaModelId,
} = await import("../../open-sse/config/agyModels.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const { resolveAntigravityOutputCap } =
  await import("../../open-sse/executors/antigravityOutputCap.ts");
const { resolveNativeGeminiThinking } = await import("../../open-sse/services/thinkingBudget.ts");
const { getNativeGeminiThinkingSpec } = await import("../../src/lib/modelCapabilities.ts");
const { filterUserCallableAntigravityModels, normalizeAntigravityModelsResponse } =
  await import("../../src/app/api/providers/[id]/models/discovery/normalizers.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
});

test("agy 1.5.18 Hydrogen models declare 262,144 output tokens (65,536 for Sonar) on both catalogs", () => {
  for (const catalog of [ANTIGRAVITY_PUBLIC_MODELS, AGY_PUBLIC_MODELS]) {
    for (const id of [
      "gemini-4-hydrogen-low",
      "gemini-4-hydrogen-medium",
      "gemini-4-hydrogen-high",
      "gemini-4-hydrogen-xhigh",
      "gemini-4-hydrogen-tiered-high",
      "gemini-4-hydrogen-tiered-xhigh",
    ]) {
      const entry = catalog.find((model) => model.id === id);
      assert.ok(entry, `${id} must exist in shared catalog`);
      assert.equal(entry.contextLength, 1048576);
      assert.equal(entry.maxOutputTokens, 262144);
    }

    const sonar = catalog.find((model) => model.id === "gemini-4-hydrogen-sonar");
    assert.ok(sonar, "gemini-4-hydrogen-sonar must exist in shared catalog");
    assert.equal(sonar.contextLength, 1048576);
    assert.equal(sonar.maxOutputTokens, 65536);
  }

  for (const id of [
    "gemini-4-hydrogen-tiered-high",
    "gemini-4-hydrogen-tiered-xhigh",
    "gemini-4-hydrogen-sonar",
  ]) {
    assert.equal(isUserCallableAntigravityModelId(id), true);
    assert.equal(isUserCallableAgyModelId(id), true);
  }
});

test("AntigravityExecutor preserves 262,144 maxOutputTokens for Hydrogen and clamps Sonar to 65,536", async () => {
  const executor = new AntigravityExecutor();

  const exactHydrogen = await executor.transformRequest(
    "agy/gemini-4-hydrogen-high",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "hello" }] }],
        generationConfig: { maxOutputTokens: 262144 },
      },
    },
    true,
    { projectId: "project-1" }
  );
  if (exactHydrogen instanceof Response) throw new Error("Unexpected Response");
  assert.equal(
    (exactHydrogen.request.generationConfig as Record<string, unknown>).maxOutputTokens,
    262144
  );

  assert.equal(resolveAntigravityOutputCap("gemini-4-hydrogen-tiered-xhigh"), 262144);
  assert.equal(resolveAntigravityOutputCap("gemini-4-hydrogen-sonar"), 65536);

  const clampedSonar = await executor.transformRequest(
    "antigravity/gemini-4-hydrogen-sonar",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "hello" }] }],
        generationConfig: { maxOutputTokens: 262144 },
      },
    },
    true,
    { projectId: "project-1" }
  );
  if (clampedSonar instanceof Response) throw new Error("Unexpected Response");
  assert.equal(
    (clampedSonar.request.generationConfig as Record<string, unknown>).maxOutputTokens,
    65536
  );
});

test("Hydrogen tiered-high and tiered-xhigh preserve fixed thinking levels without affecting sonar", () => {
  const tieredHigh = getNativeGeminiThinkingSpec("gemini-4-hydrogen-tiered-high");
  assert.equal(tieredHigh.fixedTier, "high");
  assert.equal(tieredHigh.defaultLevel, "high");
  assert.deepEqual(resolveNativeGeminiThinking("gemini-4-hydrogen-tiered-high", {}), {
    thinkingLevel: "high",
    includeThoughts: true,
  });

  const tieredXhigh = getNativeGeminiThinkingSpec("gemini-4-hydrogen-tiered-xhigh");
  assert.equal(tieredXhigh.fixedTier, "xhigh");
  assert.equal(tieredXhigh.defaultLevel, "xhigh");
  assert.deepEqual(resolveNativeGeminiThinking("gemini-4-hydrogen-tiered-xhigh", {}), {
    thinkingLevel: "xhigh",
    includeThoughts: true,
  });

  const sonarSpec = getNativeGeminiThinkingSpec("gemini-4-hydrogen-sonar");
  assert.equal(sonarSpec.fixedTier, undefined);
});

test("discovery normalizer extracts maxTokens from live :fetchAvailableModels and drops *-disabled models", () => {
  const normalized = normalizeAntigravityModelsResponse({
    models: {
      "gemini-4-hydrogen-high": {
        displayName: "Gemini 4 Hydrogen (High)",
        maxTokens: 1048576,
        maxOutputTokens: 262144,
      },
      "gemini-4-hydrogen-tiered-xhigh": {
        displayName: "Gemini 4 Hydrogen (XHigh)",
        maxTokens: 1048576,
        maxOutputTokens: 262144,
      },
      "gemini-4-hydrogen-sonar": {
        displayName: "Gemini 4 Hydrogen (Sonar)",
        maxTokens: 1048576,
        maxOutputTokens: 65536,
      },
      "claude-sonnet-4-6": {
        displayName: "Claude Sonnet 4.6 (Thinking)",
        maxTokens: 250000,
        maxOutputTokens: 64000,
      },
      "gemini-4-neon-disabled": {
        displayName: "Gemini 4 Neon",
        maxTokens: 1048576,
        maxOutputTokens: 262144,
      },
      "gemini-4-carbon-disabled": {
        displayName: "Gemini 4 Carbon",
        maxTokens: 1048576,
        maxOutputTokens: 262144,
      },
      "gemini-4-argon-disabled": {
        displayName: "Gemini 4 Argon",
        maxTokens: 1048576,
        maxOutputTokens: 65536,
      },
    },
  });

  const byId = Object.fromEntries(normalized.map((model) => [model.id, model]));
  assert.equal(byId["gemini-4-hydrogen-high"].inputTokenLimit, 1048576);
  assert.equal(byId["gemini-4-hydrogen-high"].outputTokenLimit, 262144);
  assert.equal(byId["claude-sonnet-4-6"].inputTokenLimit, 250000);
  assert.equal(byId["claude-sonnet-4-6"].outputTokenLimit, 64000);

  for (const provider of ["antigravity", "agy"] as const) {
    const callable = filterUserCallableAntigravityModels(normalized, provider);
    const ids = callable.map((model) => model.id);
    assert.ok(ids.includes("gemini-4-hydrogen-high"));
    assert.ok(ids.includes("gemini-4-hydrogen-tiered-xhigh"));
    assert.ok(ids.includes("gemini-4-hydrogen-sonar"));
    assert.ok(ids.includes("claude-sonnet-4-6"));
    for (const disabledId of [
      "gemini-4-neon-disabled",
      "gemini-4-carbon-disabled",
      "gemini-4-argon-disabled",
    ]) {
      assert.equal(ids.includes(disabledId), false, `${provider}: ${disabledId} must be excluded`);
    }
  }

  for (const disabledId of [
    "gemini-4-neon-disabled",
    "gemini-4-carbon-disabled",
    "gemini-4-argon-disabled",
  ]) {
    assert.equal(isDiscoverableAntigravityModelId(disabledId), false);
    assert.equal(isDiscoverableAgyModelId(disabledId), false);
    assert.equal(isUserVisibleAntigravityQuotaModelId(disabledId), false);
    assert.equal(isUserVisibleAgyQuotaModelId(disabledId), false);
  }
});
