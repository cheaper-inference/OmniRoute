/**
 * Leonardo's v1 REST API takes a platform-model UUID as `modelId`. The handler sent the
 * catalog id (`phoenix`, `sdxl`) as-is, and Leonardo answers that with HTTP 500
 * `{"error":"internal error","code":"unexpected"}`, so every `leonardo/*` image request
 * failed. The UUIDs below are from `GET /api/rest/v1/platformModels`.
 */

import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-leonardo-model-id-"));

const { handleLeonardoImageGeneration } =
  await import("../../open-sse/handlers/imageGeneration/providers/leonardo.ts");

const BASE_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";
const PHOENIX_1_0 = "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3";
const SDXL_1_0 = "16e7060a-803e-4df3-97ee-edcfa5dc9cc8";

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

function json(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Fake Leonardo: records the submitted modelId and completes the generation on first poll. */
async function submittedModelId(model: string): Promise<unknown> {
  let modelId: unknown;
  globalThis.fetch = (async (url: unknown, options?: RequestInit) => {
    const href = String(url);
    if (href === BASE_URL && options?.method === "POST") {
      modelId = JSON.parse(String(options.body)).modelId;
      return json({ sdGenerationJob: { generationId: "gen-1" } });
    }
    if (href === `${BASE_URL}/gen-1`) {
      return json({
        generations_by_pk: {
          status: "COMPLETE",
          generated_images: [{ url: "https://cdn.leonardo.ai/img.png" }],
        },
      });
    }
    if (href === "https://cdn.leonardo.ai/img.png") return new Response(new Uint8Array([1, 2, 3]));
    throw new Error(`unexpected fetch ${href}`);
  }) as typeof fetch;

  const result = await handleLeonardoImageGeneration({
    model,
    provider: "leonardo",
    providerConfig: { baseUrl: BASE_URL },
    body: { prompt: "a red apple" },
    credentials: { apiKey: "test-key" },
    log: null,
    pollIntervalMs: 0,
  });
  assert.equal(result.success, true);
  return modelId;
}

test("the phoenix catalog id is sent as the Phoenix 1.0 model UUID", async () => {
  assert.equal(await submittedModelId("phoenix"), PHOENIX_1_0);
});

test("the sdxl catalog id is sent as the SDXL 1.0 model UUID", async () => {
  assert.equal(await submittedModelId("sdxl"), SDXL_1_0);
});

test("a model UUID passes through unchanged, so any Leonardo model can be used", async () => {
  const custom = "b24e16ff-06e3-43eb-8d33-4416c2d75876";
  assert.equal(await submittedModelId(custom), custom);
});

test("no model falls back to Phoenix 1.0", async () => {
  assert.equal(await submittedModelId(""), PHOENIX_1_0);
});
