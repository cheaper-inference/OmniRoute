/**
 * #18671: /v1/images/edits rejected every Leonardo model ("Image edit is not supported for
 * built-in provider"), although Leonardo does image-to-image on its generations call. The
 * reference is uploaded through POST /init-image (a presigned S3 form upload) and the
 * generation is guided by `init_image_id` + `init_strength`.
 */

import assert from "node:assert/strict";
import dns from "node:dns";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-leonardo-edits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "leonardo-edits-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const { handleLeonardoImageGeneration } =
  await import("../../open-sse/handlers/imageGeneration/providers/leonardo.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

const GENERATIONS_URL = "https://cloud.leonardo.ai/api/rest/v1/generations";
const INIT_IMAGE_URL = "https://cloud.leonardo.ai/api/rest/v1/init-image";
const S3_URL = "https://s3.example.test/upload";
const PHOENIX_1_0 = "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3";
const REFERENCE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);

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
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

interface FakeLeonardo {
  initImageBody: Record<string, unknown> | null;
  s3Fields: Record<string, string>;
  s3File: { size: number; type: string } | null;
  s3Auth: string | null;
  generationBody: Record<string, unknown> | null;
}

/** Fake Leonardo + S3. `s3Status` lets a test fail the presigned upload. */
function installFakeLeonardo(s3Status = 204): FakeLeonardo {
  const seen: FakeLeonardo = {
    initImageBody: null,
    s3Fields: {},
    s3File: null,
    s3Auth: null,
    generationBody: null,
  };
  globalThis.fetch = (async (url: unknown, options: RequestInit = {}) => {
    const href = String(url);
    if (href === INIT_IMAGE_URL) {
      seen.initImageBody = JSON.parse(String(options.body));
      return json({
        uploadInitImage: {
          id: "init-1",
          url: S3_URL,
          fields: JSON.stringify({ key: "uploads/init-1.png", policy: "p0licy" }),
        },
      });
    }
    if (href === S3_URL) {
      const form = await new Response(options.body, {
        headers: { "content-type": new Headers(options.headers).get("content-type") || "" },
      }).formData();
      for (const [key, value] of form.entries()) {
        if (typeof value === "string") seen.s3Fields[key] = value;
        else seen.s3File = { size: value.size, type: value.type };
      }
      seen.s3Auth = new Headers(options.headers).get("authorization");
      return new Response(null, { status: s3Status });
    }
    if (href === GENERATIONS_URL) {
      seen.generationBody = JSON.parse(String(options.body));
      return json({ sdGenerationJob: { generationId: "gen-1" } });
    }
    if (href === `${GENERATIONS_URL}/gen-1`) {
      return json({
        generations_by_pk: {
          status: "COMPLETE",
          generated_images: [{ url: "https://cdn.leonardo.ai/edited.jpg" }],
        },
      });
    }
    if (href === "https://cdn.leonardo.ai/edited.jpg") return new Response(new Uint8Array([7, 7]));
    throw new Error(`unexpected fetch ${href}`);
  }) as typeof fetch;
  return seen;
}

function edit(initImage: { bytes: Buffer; mime: string }) {
  return handleLeonardoImageGeneration({
    model: "phoenix",
    provider: "leonardo",
    providerConfig: { baseUrl: GENERATIONS_URL },
    body: { prompt: "make the apple green" },
    credentials: { apiKey: "test-key" },
    log: null,
    pollIntervalMs: 0,
    initImage,
  });
}

test("an edit uploads the reference to Leonardo and guides the generation with it", async () => {
  const seen = installFakeLeonardo();
  const result = await edit({ bytes: REFERENCE, mime: "image/png" });

  assert.equal(result.success, true);
  assert.deepEqual(seen.initImageBody, { extension: "png" });
  // Every presigned field is posted back, the file goes under "file", and the
  // Leonardo bearer token is not sent to S3.
  assert.deepEqual(seen.s3Fields, { key: "uploads/init-1.png", policy: "p0licy" });
  assert.deepEqual(seen.s3File, { size: REFERENCE.length, type: "image/png" });
  assert.equal(seen.s3Auth, null);
  assert.equal(seen.generationBody?.modelId, PHOENIX_1_0);
  assert.equal(seen.generationBody?.prompt, "make the apple green");
  assert.equal(seen.generationBody?.init_image_id, "init-1");
  assert.equal(seen.generationBody?.init_strength, 0.3);
});

test("a jpeg reference is uploaded with the jpg extension", async () => {
  const seen = installFakeLeonardo();
  await edit({ bytes: REFERENCE, mime: "image/jpeg" });
  assert.deepEqual(seen.initImageBody, { extension: "jpg" });
});

test("a failed reference upload returns an error and starts no generation", async () => {
  const seen = installFakeLeonardo(403);
  const result = await edit({ bytes: REFERENCE, mime: "image/png" });
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.equal(seen.generationBody, null);
});

test("a plain generation sends no init image fields", async () => {
  const seen = installFakeLeonardo();
  await handleLeonardoImageGeneration({
    model: "phoenix",
    provider: "leonardo",
    providerConfig: { baseUrl: GENERATIONS_URL },
    body: { prompt: "an apple" },
    credentials: { apiKey: "test-key" },
    log: null,
    pollIntervalMs: 0,
  });
  assert.equal(seen.initImageBody, null);
  assert.equal(seen.generationBody?.init_image_id, undefined);
  assert.equal(seen.generationBody?.init_strength, undefined);
});

test("POST /v1/images/edits routes a leonardo model to the Leonardo edit instead of rejecting it", async () => {
  providersDb.createProviderConnection({
    provider: "leonardo",
    authType: "apikey",
    name: "leonardo-test",
    apiKey: "leo-test-key",
    isActive: true,
    testStatus: "active",
  });
  const seen = installFakeLeonardo();

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "leonardo/phoenix",
        prompt: "make the apple green",
        size: "576x1024",
        images: [`data:image/png;base64,${REFERENCE.toString("base64")}`],
      }),
    })
  );

  const body = (await response.json()) as { data?: Array<{ b64_json?: string }>; error?: unknown };
  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.data?.[0]?.b64_json, Buffer.from([7, 7]).toString("base64"));
  assert.equal(seen.generationBody?.init_image_id, "init-1");
  // The request size reaches Leonardo as width/height, as it does on /v1/images/generations.
  assert.equal(seen.generationBody?.width, 576);
  assert.equal(seen.generationBody?.height, 1024);
});

// A combo target takes one reference too: the single-model route answers 400 for two, and a
// combo must not upload only the first and silently drop the rest.
const combosDb = await import("../../src/lib/db/combos.ts");

function comboEdit(model: string) {
  return imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model,
        prompt: "make the apple green",
        images: [1, 2].map(
          (n) =>
            `data:image/png;base64,${Buffer.concat([REFERENCE, Buffer.from([n])]).toString("base64")}`
        ),
      }),
    })
  );
}

test("a Leonardo combo target given two references returns 400 and uploads nothing", async () => {
  await combosDb.createCombo({
    name: "leonardo-only-edits",
    strategy: "priority",
    models: ["leonardo/phoenix"],
  });
  const seen = installFakeLeonardo();

  const response = await comboEdit("leonardo-only-edits");

  const body = (await response.json()) as { error?: { message?: string } };
  assert.equal(response.status, 400, JSON.stringify(body));
  assert.match(String(body.error?.message), /only one reference image/);
  assert.equal(seen.initImageBody, null);
  assert.equal(seen.generationBody, null);
});

test("a combo with two references moves past Leonardo to a provider that takes them", async () => {
  providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-test",
    apiKey: "sk-or-test",
    isActive: true,
    testStatus: "active",
  });
  await combosDb.createCombo({
    name: "leonardo-then-openrouter-edits",
    strategy: "priority",
    models: ["leonardo/phoenix", "openrouter/google/gemini-3.1-flash-image-preview"],
  });
  const seen = installFakeLeonardo();
  const leonardoFetch = globalThis.fetch;
  let openRouterCalled = false;
  globalThis.fetch = (async (url: unknown, options?: RequestInit) => {
    if (String(url).startsWith("https://openrouter.ai/")) {
      openRouterCalled = true;
      return json({ data: [{ b64_json: Buffer.from([9]).toString("base64") }] });
    }
    return leonardoFetch(url as string, options);
  }) as typeof fetch;

  const response = await comboEdit("leonardo-then-openrouter-edits");

  assert.equal(response.status, 200, JSON.stringify(await response.clone().json()));
  assert.equal(openRouterCalled, true);
  assert.equal(seen.initImageBody, null);
});
