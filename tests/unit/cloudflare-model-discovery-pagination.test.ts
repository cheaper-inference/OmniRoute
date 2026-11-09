import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Cloudflare Workers AI `/ai/models/search` is page-numbered
// (`result_info.page` / `total_pages`). Discovery used to read only page 1 and
// imported every row, so embeddings, speech and classifier models showed up as
// chat models. These tests drive the real route with a mocked fetch.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cf-models-paging-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { nextCloudflareModelsPageUrl, parseCloudflareModelsSearch } =
  await import("../../src/app/api/providers/[id]/models/discovery/cloudflareModels.ts");

const originalFetch = globalThis.fetch;

type CfRow = { id: string; name: string; description?: string; task?: { name: string } };

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCloudflareConnection() {
  return providersDb.createProviderConnection({
    provider: "cloudflare-ai",
    authType: "apikey",
    name: `cloudflare-ai-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "cf-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { accountId: "acc-123" },
  });
}

async function callRoute(connectionId: string) {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models?refresh=true`),
    { params: { id: connectionId } }
  );
}

function chatRow(slug: string, uuid: string): CfRow {
  return { id: uuid, name: slug, task: { name: "Text Generation" } };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("cloudflare-ai discovery follows result_info pagination across pages", async () => {
  const connection = await seedCloudflareConnection();
  const calledUrls: string[] = [];
  globalThis.fetch = (async (url: unknown) => {
    const href = String(url);
    calledUrls.push(href);
    const page = Number(new URL(href).searchParams.get("page") || "1");
    const rows =
      page === 1
        ? [chatRow("@cf/meta/llama-3.1-8b-instruct", "uuid-1")]
        : [
            chatRow("@cf/qwen/qwq-32b", "uuid-2"),
            // Same model repeated on a later page must not be imported twice.
            chatRow("@cf/meta/llama-3.1-8b-instruct", "uuid-1"),
          ];
    return Response.json({
      result: rows,
      result_info: { page, per_page: 100, total_pages: 2, total_count: 3 },
    });
  }) as typeof fetch;

  const response = await callRoute(connection.id);
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, "api");
  const ids: string[] = body.models.map((m: { id: string }) => m.id);

  assert.equal(calledUrls.length, 2, `expected 2 page fetches, got ${JSON.stringify(calledUrls)}`);
  assert.ok(calledUrls[0].includes("/accounts/acc-123/ai/models/search"));
  assert.equal(new URL(calledUrls[0]).searchParams.get("per_page"), "100");
  const second = new URL(calledUrls[1]);
  assert.equal(second.searchParams.get("page"), "2");
  assert.equal(second.searchParams.get("per_page"), "100");

  assert.deepEqual([...ids].sort(), ["@cf/meta/llama-3.1-8b-instruct", "@cf/qwen/qwq-32b"]);
});

test("cloudflare-ai discovery drops embeddings, speech and classifier models", async () => {
  const connection = await seedCloudflareConnection();
  const rows: CfRow[] = [
    chatRow("@cf/meta/llama-3.3-70b-instruct-fp8-fast", "uuid-chat"),
    { id: "uuid-e1", name: "@cf/baai/bge-base-en-v1.5", task: { name: "Text Embeddings" } },
    // id fallback: no task metadata at all.
    { id: "uuid-e2", name: "@cf/baai/bge-m3" },
    { id: "uuid-e3", name: "@cf/google/embeddinggemma-300m" },
    {
      id: "uuid-s1",
      name: "@cf/openai/whisper",
      task: { name: "Automatic Speech Recognition" },
    },
    { id: "uuid-s2", name: "@cf/myshell-ai/melotts", task: { name: "Text-to-Speech" } },
    { id: "uuid-s3", name: "@cf/deepgram/aura-1" },
    {
      id: "uuid-c1",
      name: "@cf/huggingface/distilbert-sst-2-int8",
      task: { name: "Text Classification" },
    },
    { id: "uuid-c2", name: "@cf/microsoft/resnet-50", task: { name: "Image Classification" } },
    { id: "uuid-r1", name: "@cf/baai/bge-reranker-base" },
    { id: "uuid-t1", name: "@cf/meta/m2m100-1.2b", task: { name: "Translation" } },
    // Safety classifier published under the "Text Generation" task.
    chatRow("@cf/meta/llama-guard-3-8b", "uuid-g1"),
    {
      id: "uuid-i1",
      name: "@cf/black-forest-labs/flux-1-schnell",
      task: { name: "Text-to-Image" },
    },
  ];
  globalThis.fetch = (async () =>
    Response.json({
      result: rows,
      result_info: { page: 1, per_page: 100, total_pages: 1, total_count: rows.length },
    })) as typeof fetch;

  const response = await callRoute(connection.id);
  assert.equal(response.status, 200);
  const body = await response.json();
  const ids: string[] = body.models.map((m: { id: string }) => m.id);

  assert.ok(ids.includes("@cf/meta/llama-3.3-70b-instruct-fp8-fast"), JSON.stringify(ids));
  for (const dropped of [
    "@cf/baai/bge-base-en-v1.5",
    "@cf/baai/bge-m3",
    "@cf/google/embeddinggemma-300m",
    "@cf/openai/whisper",
    "@cf/myshell-ai/melotts",
    "@cf/deepgram/aura-1",
    "@cf/huggingface/distilbert-sst-2-int8",
    "@cf/microsoft/resnet-50",
    "@cf/baai/bge-reranker-base",
    "@cf/meta/m2m100-1.2b",
    "@cf/meta/llama-guard-3-8b",
  ]) {
    assert.ok(!ids.includes(dropped), `${dropped} must not reach the chat catalog`);
  }

  const image = body.models.find(
    (m: { id: string }) => m.id === "@cf/black-forest-labs/flux-1-schnell"
  );
  assert.ok(image, "text-to-image model stays importable");
  assert.equal(image.modelType, "image");
  assert.deepEqual(image.supportedEndpoints, ["images"]);
});

test("cloudflare-ai pagination is bounded and never re-requests the same page", async () => {
  const connection = await seedCloudflareConnection();
  const calledUrls: string[] = [];
  let n = 0;
  globalThis.fetch = (async (url: unknown) => {
    calledUrls.push(String(url));
    n++;
    // Claims 500 pages and always returns a fresh model so the loop cannot end
    // on an empty page — only the page cap can stop it.
    return Response.json({
      result: [chatRow(`@cf/vendor/model-${n}`, `uuid-${n}`)],
      result_info: { page: n, per_page: 100, total_pages: 500 },
    });
  }) as typeof fetch;

  const response = await callRoute(connection.id);
  assert.equal(response.status, 200);
  assert.equal(calledUrls.length, 20, "pagination stops at the 20-page safety cap");
  assert.equal(new Set(calledUrls).size, calledUrls.length, "no page URL is fetched twice");
});

test("nextCloudflareModelsPageUrl stops on the last page, a repeated page and an empty page", () => {
  const base = "https://api.cloudflare.com/client/v4/accounts/a/ai/models/search?per_page=100";
  const row = [chatRow("@cf/x/y", "u")];
  assert.equal(
    nextCloudflareModelsPageUrl({ result: row, result_info: { page: 2, total_pages: 2 } }, base),
    null
  );
  assert.equal(nextCloudflareModelsPageUrl({ result: row }, base), null);
  assert.equal(
    nextCloudflareModelsPageUrl({ result: [], result_info: { page: 1, total_pages: 3 } }, base),
    null
  );
  // total_count fallback when total_pages is missing.
  const next = nextCloudflareModelsPageUrl(
    { result: row, result_info: { page: 1, per_page: 100, total_count: 150 } },
    base
  );
  assert.ok(next);
  assert.equal(new URL(next).searchParams.get("page"), "2");
  assert.equal(new URL(next).searchParams.get("per_page"), "100");
});

test("parseCloudflareModelsSearch keeps the #4259 name-as-id mapping", () => {
  const models = parseCloudflareModelsSearch({
    result: [
      {
        id: "429b9e8b-d99e-44de-91ad-706cf8183658",
        name: "@cf/meta/llama-3.1-8b-instruct",
        description: "Llama 3.1 8B Instruct",
        task: { name: "Text Generation" },
      },
      { id: "no-name-uuid" },
    ],
  });
  assert.deepEqual(models, [
    {
      id: "@cf/meta/llama-3.1-8b-instruct",
      name: "@cf/meta/llama-3.1-8b-instruct",
      description: "Llama 3.1 8B Instruct",
    },
  ]);
});
