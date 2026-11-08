import test from "node:test";
import assert from "node:assert/strict";

const { modelDisplayName, resolveModelDisplayName } =
  await import("../../src/shared/utils/modelDisplayName.ts");

test("modelDisplayName keeps the canonical casing of brand tokens", () => {
  assert.equal(modelDisplayName("claude-opus-5-5"), "Claude Opus 5.5");
  assert.equal(modelDisplayName("glm-5.3-flash"), "GLM 5.3 Flash");
  assert.equal(modelDisplayName("kimi-k2.7-code"), "Kimi K2.7 Code");
  assert.equal(modelDisplayName("deepseek-v4.1-flash"), "DeepSeek V4.1 Flash");
  assert.equal(modelDisplayName("gpt-oss-120b"), "GPT OSS 120B");
});

test("modelDisplayName glues a version to GPT with a dash and to other brands with a space", () => {
  assert.equal(modelDisplayName("gpt-6.1-sol"), "GPT-6.1 Sol");
  assert.equal(modelDisplayName("gpt-5.6-luna"), "GPT-5.6 Luna");
  // Only the version right behind the brand attaches: "GPT-4 Turbo", not "GPT-Turbo".
  assert.equal(modelDisplayName("gpt-4-turbo"), "GPT-4 Turbo");
  assert.equal(modelDisplayName("gpt5.6-sol"), "GPT-5.6 Sol");
});

test("modelDisplayName folds a version split over dash tokens back into one number", () => {
  assert.equal(modelDisplayName("claude-fable-5-1"), "Claude Fable 5.1");
  assert.equal(modelDisplayName("claude-3-5-sonnet-20241022"), "Claude 3.5 Sonnet");
});

test("modelDisplayName drops release-date stamps instead of merging them into the version", () => {
  assert.equal(modelDisplayName("claude-sonnet-4-20250514"), "Claude Sonnet 4");
  assert.equal(modelDisplayName("claude-opus-4-5-20251101"), "Claude Opus 4.5");
});

test("modelDisplayName names from the last path segment of a routed id", () => {
  assert.equal(modelDisplayName("cmc/deepseek/deepseek-v4.1-flash"), "DeepSeek V4.1 Flash");
  assert.equal(modelDisplayName("cmc/z-ai/glm-5.3-flash"), "GLM 5.3 Flash");
  assert.equal(
    modelDisplayName("oc/muse-spark-1.3-contributor-free"),
    "Muse Spark 1.3 Contributor Free"
  );
  assert.equal(modelDisplayName("mmf/mimo-auto"), "MiMo Auto");
});

test("modelDisplayName keeps v-prefixed version markers and unknown words", () => {
  assert.equal(modelDisplayName("oc/mimo-v2.6-flash-free"), "MiMo V2.6 Flash Free");
  assert.equal(modelDisplayName("oc/jev-1.13-free"), "Jev 1.13 Free");
  assert.equal(modelDisplayName("qwen3.8-max"), "Qwen 3.8 Max");
});

test("modelDisplayName round-trips names that are already human-readable", () => {
  for (const name of [
    "Claude Opus 5.5",
    "GPT-6.1 Sol",
    "GLM 5.3 Flash",
    "MiMo V2.6 Flash Free",
    "Muse Spark 1.3 Contributor Free",
    "My Daily Driver",
  ]) {
    assert.equal(modelDisplayName(name), name);
  }
});

test("modelDisplayName returns an empty string for a missing id so callers can fall back", () => {
  assert.equal(modelDisplayName(""), "");
  assert.equal(modelDisplayName("   "), "");
  assert.equal(modelDisplayName(undefined), "");
  assert.equal(modelDisplayName(null), "");
  assert.equal(modelDisplayName(42), "");
});

test("resolveModelDisplayName keeps a name the registry, a synced row or a custom model published", () => {
  assert.equal(
    resolveModelDisplayName("claude-sonnet-4-20250514", "Claude Sonnet 4"),
    "Claude Sonnet 4"
  );
  assert.equal(resolveModelDisplayName("x", "My Daily Driver"), "My Daily Driver");
  assert.equal(resolveModelDisplayName("claude-opus-5-5", "My Daily Driver"), "My Daily Driver");
});

test("resolveModelDisplayName derives a name when the published name is the raw id or missing", () => {
  assert.equal(resolveModelDisplayName("claude-opus-5-5", "claude-opus-5-5"), "Claude Opus 5.5");
  assert.equal(resolveModelDisplayName("oc/space-bunny-free", ""), "Space Bunny Free");
  assert.equal(resolveModelDisplayName("", "claude-opus-5-5"), "Claude Opus 5.5");
  assert.equal(resolveModelDisplayName("claude-opus-5-5", undefined), "Claude Opus 5.5");
  assert.equal(resolveModelDisplayName("", ""), "");
});
