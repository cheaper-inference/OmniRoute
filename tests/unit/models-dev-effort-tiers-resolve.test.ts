import test from "node:test";
import assert from "node:assert/strict";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";
import type { ModelCapabilityResolutionSnapshot } from "../../src/lib/modelCapabilityResolutionSnapshot.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

const FLAG = "MODELS_DEV_EFFORT_TIERS_ENABLED";

test.after(() => {
  delete process.env[FLAG];
  resetDbInstance();
});

function withFlag<T>(value: "true" | undefined, fn: () => T): T {
  const previous = process.env[FLAG];
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env[FLAG];
    else process.env[FLAG] = previous;
  }
}

function syncedRow(reasoningEfforts: string[] | null) {
  return {
    tool_call: true,
    reasoning: true,
    reasoning_efforts: reasoningEfforts,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: '["text"]',
    modalities_output: '["text"]',
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: 200000,
    limit_input: null,
    limit_output: 64000,
    interleaved_field: null,
  };
}

function snapshotWith(
  synced: ModelCapabilityResolutionSnapshot["synced"]
): ModelCapabilityResolutionSnapshot {
  return {
    synced,
    maxTokenOverrides: new Map(),
    maxInputTokenOverrides: new Map(),
    reasoningEffortsOverrides: new Map(),
    contextOverrides: new Map(),
    customVisionOverrides: new Map(),
    compatVisionOverrides: new Map(),
    syncedAvailableModelVision: new Map(),
  } as ModelCapabilityResolutionSnapshot;
}

// A model with no registry row and no operator override. models.dev publishes tiers
// (one of them, `turbo`, is not an effort any executor accepts).
const unregistered = snapshotWith({
  anthropic: {
    "claude-haiku-9-9": syncedRow(["minimal", "low", "medium", "high", "turbo", "max"]),
  },
} as ModelCapabilityResolutionSnapshot["synced"]);

test("flag off (default): synced models.dev tiers are not used — previous behavior", () => {
  const caps = withFlag(undefined, () =>
    getResolvedModelCapabilities("anthropic/claude-haiku-9-9", undefined, unregistered)
  );
  assert.equal(caps.supportsThinking, true);
  assert.equal(caps.supportedThinkingEfforts, null);
});

test("flag on: synced models.dev tiers reach the resolved model, unknown tiers dropped", () => {
  const caps = withFlag("true", () =>
    getResolvedModelCapabilities("anthropic/claude-haiku-9-9", undefined, unregistered)
  );
  assert.equal(caps.supportsThinking, true);
  assert.deepEqual(caps.supportedThinkingEfforts, ["minimal", "low", "medium", "high", "max"]);
});

test("flag on: a synced list with no known tier resolves to null, not an empty list", () => {
  const onlyUnknown = snapshotWith({
    anthropic: { "claude-haiku-9-9": syncedRow(["turbo"]) },
  } as ModelCapabilityResolutionSnapshot["synced"]);
  const caps = withFlag("true", () =>
    getResolvedModelCapabilities("anthropic/claude-haiku-9-9", undefined, onlyUnknown)
  );
  assert.equal(caps.supportedThinkingEfforts, null);
});

// ZCode's registry declares supportedThinkingEfforts: [] on purpose: the thinking toggle
// exists, reasoning_effort does not. The empty registry list wins over synced tiers with
// the flag in either position.
test("an empty registry effort list stays empty (flag off and on)", () => {
  const zcode = snapshotWith({
    zcode: { "glm-5.3": syncedRow(["low", "medium", "high", "max"]) },
    zai: { "glm-5.3": syncedRow(["low", "medium", "high", "max"]) },
  } as ModelCapabilityResolutionSnapshot["synced"]);
  for (const flag of [undefined, "true"] as const) {
    const caps = withFlag(flag, () =>
      getResolvedModelCapabilities("zcode/glm-5.3", undefined, zcode)
    );
    assert.deepEqual(caps.supportedThinkingEfforts, [], `flag=${flag ?? "off"}`);
  }
});
