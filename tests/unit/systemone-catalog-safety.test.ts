import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-catalog-safety-"));
process.env.DATA_DIR = directory;
const { toDecisionCatalogModel, applyOperatorPricing } =
  await import("../../open-sse/handlers/systemOneCatalog.ts");
const { handleSystemOneModels } = await import("../../open-sse/handlers/systemOneModels.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

for (const pricing of [
  { prompt: "0.000000042" },
  { completion: "0" },
  { prompt: "0.000000042", completion: null },
  { prompt: "0.000000042", completion: "" },
  { prompt: "0.000000042", completion: -1 },
  { prompt: "0.000000042", completion: "NaN" },
  { prompt: Infinity, completion: 0 },
  { prompt: -1, completion: 0 },
  { prompt: "0x10", completion: 0 },
]) {
  test(`incomplete or invalid upstream pricing remains unknown: ${JSON.stringify(pricing)}`, () => {
    const model = toDecisionCatalogModel("openrouter", { id: "typesafe/jev-1.14", pricing });
    assert.equal(model.pricing_status, "unknown");
    assert.equal(model.pricing, undefined);
    assert.equal(model.pricing_source, undefined);
  });
}

test("explicit known zero pricing remains known", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "typesafe/jev-1.14",
    pricing: { prompt: "0", completion: 0 },
  });
  assert.deepEqual(model.pricing, { prompt: "0", completion: "0" });
  assert.equal(model.pricing_source, "upstream");
  assert.equal(model.pricing_status, "known");
});

test("partial or invalid operator overrides preserve existing upstream price provenance", () => {
  const model = toDecisionCatalogModel("openrouter", {
    id: "typesafe/jev-1.14",
    pricing: { prompt: "0.000000042", completion: "0.000001" },
  });
  for (const override of [
    { input: 0.042 },
    { output: 0 },
    { input: NaN, output: 0 },
    { input: 1, output: Infinity },
    { input: 1, output: -1 },
  ]) {
    assert.deepEqual(applyOperatorPricing(model, override), model);
  }
  const known = applyOperatorPricing(model, { input: 0, output: 0 });
  assert.equal(known.pricing_source, "operator");
  assert.deepEqual(known.pricing, { prompt: "0", completion: "0" });
});

for (const declared of [false, true]) {
  test(`catalog ${declared ? "declared-large" : "chunked"} body is byte-bounded without account rotation`, async () => {
    let cancelled = 0,
      reads = 0;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array(1_048_576));
        controller.enqueue(new Uint8Array(1_048_576));
        controller.enqueue(new Uint8Array(1));
      },
      cancel() {
        cancelled++;
      },
    });
    const response = await handleSystemOneModels(
      {},
      {
        listConnections: async () =>
          ["one", "two"].map((id) => ({
            id,
            provider: "typesafe",
            apiKey: "synthetic-provider-key",
          })),
        isConnectionUnavailable: () => false,
        fetchSystemOne: async () => {
          reads++;
          return new Response(stream, { headers: declared ? { "content-length": "2097153" } : {} });
        },
        getPricingForModel: async () => null,
      }
    );
    assert.equal(response.status, 502);
    assert.equal(reads, 1);
    assert.equal(cancelled, 1);
    assert.equal(stream.locked, false);
  });
}

test("catalog cancellation releases a pending reader without another account", async () => {
  let cancelled = 0,
    reads = 0;
  const controller = new AbortController();
  const stream = new ReadableStream<Uint8Array>({
    cancel() {
      cancelled++;
    },
  });
  const response = await handleSystemOneModels(
    { signal: controller.signal },
    {
      listConnections: async () =>
        ["one", "two"].map((id) => ({
          id,
          provider: "typesafe",
          apiKey: "synthetic-provider-key",
        })),
      isConnectionUnavailable: () => false,
      fetchSystemOne: async () => {
        reads++;
        setTimeout(() => controller.abort(), 10);
        return new Response(stream);
      },
      getPricingForModel: async () => null,
    }
  );
  assert.equal(response.status, 499);
  assert.equal(reads, 1);
  assert.equal(cancelled, 1);
  assert.equal(stream.locked, false);
});
