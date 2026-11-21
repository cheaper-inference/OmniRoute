/**
 * OpenCode Go model catalog alignment with the official Go docs.
 *
 * Port of decolua/9router 8efacc114 (thanks @nguyenha935): the official Go API
 * advertises `glm-5.2` and routes Kimi chat traffic through `kimi-k2.7-code`
 * (the live API rejects the plain `kimi-k2.7` alias for `/chat/completions`
 * even though the public docs example uses it). OmniRoute previously shipped
 * the older registry without these IDs.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { opencode_goProvider } =
  await import("../../open-sse/config/providers/registry/opencode/go/index.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

function modelIds(): string[] {
  return (opencode_goProvider.models ?? []).map((m) => m.id);
}

const DEPRECATED_MIMO_V2_MODELS = ["mimo-v2-pro", "mimo-v2-omni"];

test("opencode-go advertises glm-5.3 (official Go endpoint addition)", () => {
  assert.ok(
    modelIds().includes("glm-5.3"),
    `expected glm-5.3 in opencode-go catalog, got: ${modelIds().join(", ")}`
  );
});

test("opencode-go advertises glm-5.3 and glm-5.3-flash with the vendor Go list limits", () => {
  // Vendor: GET https://opencode.ai/zen/go/v1/models (glm-5.3: 1M context, 131072 output,
  // efforts low/high/max; glm-5.3-flash: same limits, image and video input).
  const byId = new Map(
    (opencode_goProvider.models ?? []).map((m) => [m.id, m as Record<string, unknown>])
  );
  for (const id of ["glm-5.3", "glm-5.3-flash"]) {
    const model = byId.get(id);
    assert.ok(model, `expected ${id} in opencode-go catalog, got: ${modelIds().join(", ")}`);
    assert.equal(model.contextLength, 1000000, `${id} context`);
    assert.equal(model.maxOutputTokens, 131072, `${id} max output`);
    assert.deepEqual(model.supportedThinkingEfforts, ["low", "high", "max"], `${id} efforts`);
  }
  assert.equal(byId.get("glm-5.3-flash")?.supportsVision, true);
  assert.notEqual(byId.get("glm-5.3")?.supportsVision, true);
});

test("opencode-go advertises kimi-k2.7-code (live API rejects plain kimi-k2.7 for chat)", () => {
  assert.ok(
    modelIds().includes("kimi-k2.7-code"),
    `expected kimi-k2.7-code in opencode-go catalog, got: ${modelIds().join(", ")}`
  );
});

test("opencode-go does not advertise deprecated MiMo V2 models", () => {
  const ids = modelIds();
  for (const modelId of DEPRECATED_MIMO_V2_MODELS) {
    assert.ok(!ids.includes(modelId), `${modelId} is deprecated`);
  }
});

test("opencode-go preserves the pre-existing minimax-m3 and qwen routing via targetFormat=claude", () => {
  // Routing through the /messages endpoint is OmniRoute's declarative
  // equivalent of upstream's MESSAGES_FORMAT_MODELS set; the alignment
  // change must not regress this.
  const byId = new Map(
    (opencode_goProvider.models ?? []).map((m) => [m.id, m as Record<string, unknown>])
  );
  assert.equal(byId.get("minimax-m3")?.targetFormat, "claude");
  assert.equal(byId.get("qwen3.7-max")?.targetFormat, "claude");
});

test("opencode-go hy3 variants expose their context window to combo compatibility filtering", () => {
  for (const modelId of ["hy3", "hy3-none", "hy3-low", "hy3-high"]) {
    assert.equal(
      getResolvedModelCapabilities(`opencode-go/${modelId}`).contextWindow,
      256000,
      `${modelId} should resolve a 256K context window`
    );
  }
});

test("opencode-go exposes Muse Spark Contributor effort aliases with a 1M context", () => {
  const museModelIds = [
    "muse-spark-1.2-contributor",
    "muse-spark-1.2-contributor-minimal",
    "muse-spark-1.2-contributor-low",
    "muse-spark-1.2-contributor-medium",
    "muse-spark-1.2-contributor-high",
    "muse-spark-1.2-contributor-xhigh",
  ];
  for (const modelId of museModelIds) {
    assert.ok(
      modelIds().includes(modelId),
      `expected ${modelId} in opencode-go catalog, got: ${modelIds().join(", ")}`
    );
    assert.equal(
      getResolvedModelCapabilities(`opencode-go/${modelId}`).contextWindow,
      1048576,
      `${modelId} should resolve a 1M context window`
    );
  }
});
