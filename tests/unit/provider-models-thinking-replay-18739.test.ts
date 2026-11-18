import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #18739: `thinkingReplay` is a modelCompatOverrides field read by the Claude translator.
// PUT /api/provider-models must accept it (the schema used to strip it, leaving the
// feature reachable only through hand-written key_value rows), persist it on the compat
// entry, and never upsert a customModels row for a native catalog model.

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-models-thinking-replay-18739-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
const { providerModelMutationSchema } = await import("../../src/shared/validation/schemas.ts");

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function put(body: unknown) {
  return providerModelsRoute.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

const NODE = "anthropic-compatible-thinking-replay-node";

function compatEntry(provider: string, modelId: string) {
  return modelsDb.getModelCompatOverrides(provider).find((e) => e.id === modelId);
}

test("the mutation schema keeps thinkingReplay and rejects unknown modes", () => {
  const ok = providerModelMutationSchema.safeParse({
    provider: NODE,
    modelId: "m",
    thinkingReplay: "none",
  });
  assert.equal(ok.success, true);
  assert.equal(ok.success && ok.data.thinkingReplay, "none");
  const cleared = providerModelMutationSchema.safeParse({
    provider: NODE,
    modelId: "m",
    thinkingReplay: null,
  });
  assert.equal(cleared.success && cleared.data.thinkingReplay, null);
  assert.equal(
    providerModelMutationSchema.safeParse({ provider: NODE, modelId: "m", thinkingReplay: "x" })
      .success,
    false
  );
});

test("thinkingReplay-only PUT sets and clears the compat entry without a customModels row", async () => {
  const setRes = await put({ provider: NODE, modelId: "m3", thinkingReplay: "text" });
  assert.equal(setRes.status, 200);
  assert.equal(compatEntry(NODE, "m3")?.thinkingReplay, "text");
  assert.deepEqual(await modelsDb.getCustomModels(NODE), []);

  const clearRes = await put({ provider: NODE, modelId: "m3", thinkingReplay: null });
  assert.equal(clearRes.status, 200);
  assert.equal(compatEntry(NODE, "m3"), undefined);
  assert.deepEqual(await modelsDb.getCustomModels(NODE), []);
});

test("thinkingReplay PUT rejects an unknown mode and an unknown provider", async () => {
  const bad = await put({ provider: NODE, modelId: "m3", thinkingReplay: "verbatim" });
  assert.equal(bad.status, 400);
  assert.equal(compatEntry(NODE, "m3"), undefined);

  const unknown = await put({ provider: "no-such-provider", modelId: "x", thinkingReplay: "none" });
  assert.equal(unknown.status, 400);
});

test("thinkingReplay on an existing custom model lands on the compat entry and keeps the row", async () => {
  await modelsDb.addCustomModel(NODE, "custom-m", "Custom M");
  const res = await put({ provider: NODE, modelId: "custom-m", thinkingReplay: "none" });
  assert.equal(res.status, 200);
  assert.equal(compatEntry(NODE, "custom-m")?.thinkingReplay, "none");
  const rows = await modelsDb.getCustomModels(NODE);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "custom-m");
  assert.equal((rows[0] as Record<string, unknown>).thinkingReplay, undefined);
});
