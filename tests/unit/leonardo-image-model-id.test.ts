/**
 * Leonardo's v1 REST API takes a platform-model UUID as `modelId`. The handler sent the
 * catalog id (`phoenix`, `sdxl`) as-is, and Leonardo answers that with HTTP 500
 * `{"error":"internal error","code":"unexpected"}`, so every `leonardo/*` image request
 * failed. The UUIDs below are from `GET /api/rest/v1/platformModels`.
 */

import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-leonardo-model-id-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleLeonardoImageGeneration, resolveLeonardoImageSize } =
  await import("../../open-sse/handlers/imageGeneration/providers/leonardo.ts");

const BASE_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";
const PHOENIX_1_0 = "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3";
const SDXL_1_0 = "16e7060a-803e-4df3-97ee-edcfa5dc9cc8";

const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

const originalFetch = globalThis.fetch;
// The result download goes through the guarded media fetch, which resolves the host and then
// connects through a pinned agent. Resolve cdn.leonardo.ai to a public address and send the
// pinned request to the mocked globalThis.fetch.
const originalLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async () => [
  { address: "93.184.216.34", family: 4 },
]) as typeof dns.promises.lookup;
setPinnedFetchTestOverride(((input: string | URL | Request, init?: RequestInit) =>
  globalThis.fetch(input, init)) as typeof fetch);
test.after(async () => {
  globalThis.fetch = originalFetch;
  (dns.promises as { lookup: unknown }).lookup = originalLookup;
  setPinnedFetchTestOverride(undefined);
  await waitForCallLogSaves(1_000);
  resetDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function json(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

/** Fake Leonardo: records the submitted body and completes the generation on first poll. */
async function submitted(
  model: string,
  body: Record<string, unknown> = {}
): Promise<Record<string, unknown>> {
  let sent: Record<string, unknown> = {};
  globalThis.fetch = (async (url: unknown, options?: RequestInit) => {
    const href = String(url);
    if (href === BASE_URL && options?.method === "POST") {
      sent = JSON.parse(String(options.body));
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
    body: { prompt: "a red apple", ...body },
    credentials: { apiKey: "test-key" },
    log: null,
    pollIntervalMs: 0,
  });
  assert.equal(result.success, true);
  return sent;
}

async function submittedModelId(model: string): Promise<unknown> {
  return (await submitted(model)).modelId;
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

test("an OpenAI-style size is sent as Leonardo's width and height", async () => {
  const body = await submitted("phoenix", { size: "576x1024" });
  assert.deepEqual([body.width, body.height], [576, 1024]);
});

test("explicit width/height win over size, and a missing size defaults to 1024", () => {
  assert.deepEqual(resolveLeonardoImageSize({ size: "576x1024", width: 768 }), {
    width: 768,
    height: 1024,
  });
  assert.deepEqual(resolveLeonardoImageSize({}), { width: 1024, height: 1024 });
  assert.deepEqual(resolveLeonardoImageSize({ size: "auto" }), { width: 1024, height: 1024 });
});
