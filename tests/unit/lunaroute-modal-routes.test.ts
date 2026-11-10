import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lunaroute-modal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "lunaroute-modal-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const imageGenerationRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const providerEmbeddingsRoute =
  await import("../../src/app/api/v1/providers/[provider]/embeddings/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

function seedLunaRouteConnection() {
  return providersDb.createProviderConnection({
    provider: "lunaroute",
    authType: "apikey",
    name: "lunaroute-test",
    apiKey: "lr_test_modal_routes",
    isActive: true,
    testStatus: "active",
  });
}

function dataUrlPng(bytes: number[]): string {
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
}

const SOURCE_BYTES = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3];
const SOURCE_IMAGE = dataUrlPng(SOURCE_BYTES);

test.beforeEach(async () => {
  await resetStorage();
  await seedLunaRouteConnection();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function installImageEditFetchMock() {
  const calls: Array<{
    url: string;
    auth: string;
    contentType: string;
    body: Uint8Array | string;
  }> = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    const raw = init.body;
    const body =
      typeof raw === "string"
        ? raw
        : raw instanceof Uint8Array
          ? raw
          : raw instanceof ArrayBuffer
            ? new Uint8Array(raw)
            : new Uint8Array();
    calls.push({
      url: String(url),
      auth: headers.get("authorization") || "",
      contentType: headers.get("content-type") || "",
      body,
    });

    if (String(url).endsWith("/v1/images/uploads")) {
      return Response.json({ id: "img_source_1" });
    }
    if (String(url).endsWith("/v1/images/edits")) {
      return Response.json({ data: [{ url: "https://images.example/edited.png" }] });
    }
    throw new Error(`Unexpected URL: ${String(url)}`);
  };
  return calls;
}

function assertUploadThenEdit(calls: ReturnType<typeof installImageEditFetchMock>) {
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://gw.lunaroute.com/v1/images/uploads");
  assert.equal(calls[0].auth, "Bearer lr_test_modal_routes");
  assert.equal(calls[0].contentType, "image/png");
  assert.deepEqual(Array.from(calls[0].body as Uint8Array), SOURCE_BYTES);

  assert.equal(calls[1].url, "https://gw.lunaroute.com/v1/images/edits");
  const editBody = JSON.parse(calls[1].body as string) as {
    model?: string;
    prompt?: string;
    image_ids?: string[];
  };
  assert.equal(editBody.model, "qwen-image-edit-2511");
  assert.equal(editBody.prompt, "make the background blue");
  assert.deepEqual(editBody.image_ids, ["img_source_1"]);
}

test("LunaRoute /v1/images/edits uploads source bytes before editing by image id", async () => {
  const calls = installImageEditFetchMock();
  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "lunaroute/qwen-image-edit-2511",
        prompt: "make the background blue",
        images: [SOURCE_IMAGE],
      }),
    })
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).data[0].url, "https://images.example/edited.png");
  assertUploadThenEdit(calls);
});

test("LunaRoute edit model on /v1/images/generations uses the same upload/edit workflow", async () => {
  const calls = installImageEditFetchMock();
  const response = await imageGenerationRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "lunaroute/qwen-image-edit-2511",
        prompt: "make the background blue",
        image_url: SOURCE_IMAGE,
      }),
    })
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).data[0].url, "https://images.example/edited.png");
  assertUploadThenEdit(calls);
});

test("provider-scoped LunaRoute embeddings canonicalize lr to lunaroute before dispatch", async () => {
  let upstreamBody: { model?: string; input?: unknown } | null = null;
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    assert.equal(String(url), "https://gw.lunaroute.com/v1/embeddings");
    assert.equal(new Headers(init.headers).get("authorization"), "Bearer lr_test_modal_routes");
    upstreamBody = JSON.parse(String(init.body));
    return Response.json({
      object: "list",
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      model: "emb-qwen3",
      usage: { prompt_tokens: 1, total_tokens: 1 },
    });
  };

  const response = await providerEmbeddingsRoute.POST(
    new Request("http://localhost/api/v1/providers/lunaroute/embeddings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "emb-qwen3", input: "hello" }),
    }),
    { params: Promise.resolve({ provider: "lunaroute" }) }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(upstreamBody, { model: "emb-qwen3", input: "hello" });
});
