import test from "node:test";
import assert from "node:assert/strict";

const { qoderProvider } = await import("../../open-sse/config/providers/registry/qoder/index.ts");

// Sonus (smodel) and Cantus (cmodel) are served by Qoder under opaque ids. The
// static registry listed neither, so the ids stopped resolving whenever the live
// /models catalog was unavailable.

for (const [id, name] of [
  ["smodel", "Sonus"],
  ["cmodel", "Cantus"],
] as const) {
  test(`qoder static fallback lists ${name} (${id}) with vision, reasoning and the 180k input cap`, () => {
    const model = qoderProvider.models.find((m) => m.id === id);
    assert.ok(model, `${id} must be in the qoder static registry`);
    assert.equal(model.name, name);
    assert.equal(model.supportsVision, true);
    assert.equal(model.supportsReasoning, true);
    assert.equal(model.maxInputTokens, 180_000);
  });
}

test("the existing qoder rows stay unchanged", () => {
  const ids = qoderProvider.models.map((m) => m.id);
  assert.ok(ids.includes("qwen3.8-max-preview"));
  assert.equal(ids.length, 11);
});
