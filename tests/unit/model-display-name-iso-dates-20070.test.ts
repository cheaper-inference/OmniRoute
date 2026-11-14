import test from "node:test";
import assert from "node:assert/strict";

const { modelDisplayName, resolveModelDisplayName } =
  await import("../../src/shared/utils/modelDisplayName.ts");

test("modelDisplayName drops ISO YYYY-MM-DD release-date snapshot stamps (#20070)", () => {
  assert.equal(modelDisplayName("gpt-5-2025-08-07"), "GPT-5");
  assert.equal(modelDisplayName("gpt-4.1-2025-04-14"), "GPT-4.1");
  assert.equal(modelDisplayName("gpt-5-mini-2025-08-07"), "GPT-5 Mini");
  assert.equal(modelDisplayName("openai/gpt-5-2025-08-07"), "GPT-5");
  assert.equal(modelDisplayName("cmc/openai/gpt-4.1-2025-04-14"), "GPT-4.1");
  assert.equal(modelDisplayName("gpt-5-2025-08-07-preview"), "GPT-5 Preview");
});

test("resolveModelDisplayName derives correct name for snapshot ids without explicit names", () => {
  assert.equal(resolveModelDisplayName("gpt-5-2025-08-07"), "GPT-5");
  assert.equal(resolveModelDisplayName("gpt-5-2025-08-07", "gpt-5-2025-08-07"), "GPT-5");
  assert.equal(resolveModelDisplayName("gpt-5-2025-08-07", "Custom Label"), "Custom Label");
});
