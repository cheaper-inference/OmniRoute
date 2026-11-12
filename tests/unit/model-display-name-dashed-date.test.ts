import test from "node:test";
import assert from "node:assert/strict";

const { modelDisplayName } = await import("../../src/shared/utils/modelDisplayName.ts");

test("modelDisplayName drops YYYY-MM-DD release dates instead of merging them into the version", () => {
  assert.equal(modelDisplayName("gpt-5-2025-08-07"), "GPT-5");
  assert.equal(modelDisplayName("gpt-4.1-2025-04-14"), "GPT-4.1");
  assert.equal(modelDisplayName("gpt-5-mini-2025-08-07"), "GPT-5 Mini");
  assert.equal(modelDisplayName("openai/gpt-4.1-nano-2025-04-14"), "GPT-4.1 Nano");
});

test("modelDisplayName still folds split versions and keeps compact date stamps dropped", () => {
  assert.equal(modelDisplayName("claude-opus-4-5-20251101"), "Claude Opus 4.5");
  assert.equal(modelDisplayName("claude-3-5-sonnet-20241022"), "Claude 3.5 Sonnet");
  assert.equal(modelDisplayName("claude-opus-5-5"), "Claude Opus 5.5");
});
