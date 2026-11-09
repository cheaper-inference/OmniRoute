import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// A combo that pins `dimensions` asks every target for that size, so the family guard must
// compare the effective size, not the registry default. Same model through two providers
// (Gemini direct = 768 in the registry, OpenRouter = 3072) is the motivating case.
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embed-combo-pinned-"));

const { detectEmbeddingDimensionConflict } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

test.after(() => {
  resetDbInstance();
});

const SAME_MODEL = ["gemini/gemini-embedding-001", "openrouter/google/gemini-embedding-001"];

test("detectEmbeddingDimensionConflict flags the registry defaults without a pinned size", () => {
  const res = detectEmbeddingDimensionConflict(SAME_MODEL);
  assert.equal(res.conflict, true);
  assert.deepEqual(res.distinct, [768, 3072]);
});

test("detectEmbeddingDimensionConflict accepts targets truncated to a pinned size", () => {
  const res = detectEmbeddingDimensionConflict(SAME_MODEL, 768);
  assert.equal(res.conflict, false);
  assert.deepEqual(res.distinct, [768]);
});

test("detectEmbeddingDimensionConflict still flags a target smaller than the pinned size", () => {
  const res = detectEmbeddingDimensionConflict(SAME_MODEL, 1536);
  assert.equal(res.conflict, true);
  assert.deepEqual(res.distinct, [768, 1536]);
});

test("detectEmbeddingDimensionConflict ignores an invalid pinned size", () => {
  assert.equal(detectEmbeddingDimensionConflict(SAME_MODEL, 0).conflict, true);
  assert.equal(detectEmbeddingDimensionConflict(SAME_MODEL, Number.NaN).conflict, true);
});

test("createEmbeddingResponse lets a combo with pinned dimensions pass the guard", async () => {
  await createCombo({
    name: "pinned-embeds-combo",
    strategy: "priority",
    dimensions: "768",
    models: SAME_MODEL,
  });
  const res = await createEmbeddingResponse({ model: "pinned-embeds-combo", input: "hello world" });
  assert.doesNotMatch(JSON.stringify(await res.json()), /incompatible vector dimensions/);
});

test("createEmbeddingResponse honours the client's dimensions on an unpinned combo", async () => {
  await createCombo({
    name: "client-pinned-embeds-combo",
    strategy: "priority",
    models: SAME_MODEL,
  });
  const unpinned = await createEmbeddingResponse({
    model: "client-pinned-embeds-combo",
    input: "hi",
  });
  assert.equal(unpinned.status, 400);
  assert.match(JSON.stringify(await unpinned.json()), /incompatible vector dimensions/);

  const pinned = await createEmbeddingResponse({
    model: "client-pinned-embeds-combo",
    input: "hi",
    dimensions: 768,
  });
  assert.doesNotMatch(JSON.stringify(await pinned.json()), /incompatible vector dimensions/);
});
