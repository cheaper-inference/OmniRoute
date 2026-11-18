import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-multi-ref-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ag-multi-ref-test-api-key-secret";

const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options && options.all ? [record] : record;
}) as typeof dns.promises.lookup;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { buildGeminiImagePrompt, GEMINI_IMAGE_MAX_REFERENCES } =
  await import("../../open-sse/handlers/imageGeneration/providers/geminiInline.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");

const originalFetch = globalThis.fetch;

const PNG_BYTES = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1, 2, 3]);
const JPEG_BYTES = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 4, 5, 6]);
const AG_URL = "https://daily-cloudcode-pa.googleapis.com/v1internal:generateContent";

interface CapturedPart {
  text?: string;
  inlineData?: { mimeType?: string; data?: string };
}

interface CapturedBody {
  request: { contents: Array<{ parts: CapturedPart[] }> };
}

interface ImageResult {
  success: boolean;
  status?: number;
  error?: unknown;
  retryable?: boolean;
  data?: { data: Array<{ b64_json?: string }> };
}

function imageResponse(parts: CapturedPart[] = [{ inlineData: { data: "b3V0cHV0" } }]) {
  return new Response(JSON.stringify({ response: { candidates: [{ content: { parts } }] } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function captureFetch(parts?: CapturedPart[]) {
  const calls: Array<{ url: string; body: CapturedBody }> = [];
  globalThis.fetch = (async (url: string | URL | Request, options: RequestInit = {}) => {
    calls.push({ url: String(url), body: JSON.parse(String(options.body || "{}")) });
    return imageResponse(parts);
  }) as typeof fetch;
  return calls;
}

async function generate(body: Record<string, unknown>): Promise<ImageResult> {
  return (await handleImageGeneration({
    body: { model: "antigravity/gemini-3.1-flash-image", prompt: "blend them", ...body },
    credentials: { accessToken: "ag-token", projectId: "project-123" },
    log: null,
  })) as ImageResult;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  setPinnedFetchTestOverride(undefined);
});

test.after(() => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Antigravity forwards every referenceImages entry as its own inlineData part", async () => {
  const calls = captureFetch();
  const result = await generate({
    referenceImages: [
      { bytes: PNG_BYTES, mime: "image/png" },
      { bytes: JPEG_BYTES, mime: "image/jpeg" },
    ],
  });

  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  const parts = calls[0].body.request.contents[0].parts;
  assert.equal(parts.length, 3);
  assert.deepEqual(parts[0].inlineData, {
    mimeType: "image/png",
    data: PNG_BYTES.toString("base64"),
  });
  assert.deepEqual(parts[1].inlineData, {
    mimeType: "image/jpeg",
    data: JPEG_BYTES.toString("base64"),
  });
  assert.match(String(parts[2].text), /Use all 2 attached reference images in the result\./);
  assert.match(String(parts[2].text), /Do not answer with text only\./);
  assert.ok(String(parts[2].text).endsWith("\n\nblend them"));
});

test("Antigravity accepts images[] data URLs and raw base64 references", async () => {
  const calls = captureFetch();
  const rawBase64 = Buffer.alloc(120, 7).toString("base64");
  const result = await generate({
    images: [`data:image/webp;base64,${PNG_BYTES.toString("base64")}`, rawBase64],
  });

  assert.equal(result.success, true);
  const parts = calls[0].body.request.contents[0].parts;
  assert.equal(parts.length, 3);
  assert.equal(parts[0].inlineData?.mimeType, "image/webp");
  assert.equal(parts[0].inlineData?.data, PNG_BYTES.toString("base64"));
  assert.equal(parts[1].inlineData?.data, rawBase64);
  assert.match(String(parts[2].text), /Use all 2 attached reference images/);
});

test("Antigravity rejects an HTTP(S) reference among inline ones without fetching it", async () => {
  // Remote URLs are never fetched for Gemini image models (#18148 / 9router #5190): the whole
  // multi-reference request fails instead of being built from fewer images than were sent.
  const calls = captureFetch();
  const remoteCalls: string[] = [];
  setPinnedFetchTestOverride((async (url: string | URL | Request) => {
    remoteCalls.push(String(url));
    return new Response(new Uint8Array(JPEG_BYTES), {
      status: 200,
      headers: { "content-type": "image/jpeg" },
    });
  }) as typeof fetch);

  const result = await generate({
    images: [
      `data:image/png;base64,${PNG_BYTES.toString("base64")}`,
      "https://cdn.example.com/reference.jpg",
    ],
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.retryable, false);
  assert.match(String(result.error), /Remote reference image URLs are not supported/);
  assert.match(String(result.error), /base64 data URI/);
  assert.deepEqual(remoteCalls, []);
  assert.equal(calls.length, 0);
});

test("Antigravity rejects an invalid reference with a non-retryable 400 before dispatch", async () => {
  const calls = captureFetch();
  const result = await generate({ images: ["not-an-image"] });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.retryable, false);
  assert.match(String(result.error), /Invalid reference image 1/);
  assert.equal(calls.length, 0);
});

test("Antigravity rejects a private-network reference URL without fetching it", async () => {
  const calls = captureFetch();
  let remoteFetches = 0;
  setPinnedFetchTestOverride((async () => {
    remoteFetches += 1;
    return new Response("nope", { status: 200 });
  }) as typeof fetch);

  const result = await generate({ images: ["http://127.0.0.1/secret.png"] });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(result.retryable, false);
  assert.equal(remoteFetches, 0);
  assert.equal(calls.length, 0);
});

test("Antigravity caps the number of reference images", async () => {
  const calls = captureFetch();
  const references = Array.from({ length: GEMINI_IMAGE_MAX_REFERENCES + 1 }, () => ({
    bytes: PNG_BYTES,
    mime: "image/png",
  }));
  const result = await generate({ referenceImages: references });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), new RegExp(`at most ${GEMINI_IMAGE_MAX_REFERENCES}`));
  assert.equal(calls.length, 0);
});

test("Antigravity surfaces a text-only answer as an error instead of an empty success", async () => {
  captureFetch([{ text: "I cannot create that image." }]);
  const result = await generate({ referenceImages: [{ bytes: PNG_BYTES, mime: "image/png" }] });

  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(String(result.error), /returned text instead of an image/);
  assert.match(String(result.error), /I cannot create that image\./);
});

test("Antigravity text-to-image without references keeps the prompt untouched", async () => {
  const calls = captureFetch();
  const result = await generate({});

  assert.equal(result.success, true);
  assert.deepEqual(calls[0].body.request.contents[0].parts, [{ text: "blend them" }]);
  assert.equal(buildGeminiImagePrompt("p", 0), "p");
});

test("/v1/images/edits forwards every multipart reference to Antigravity", async () => {
  await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "antigravity-multi-ref",
    accessToken: "ag-route-token",
    expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    projectId: "route-project",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Array<{ url: string; body: CapturedBody }> = [];
  globalThis.fetch = (async (url: string | URL | Request, options: RequestInit = {}) => {
    calls.push({ url: String(url), body: JSON.parse(String(options.body || "{}")) });
    return imageResponse();
  }) as typeof fetch;

  const formData = new FormData();
  formData.set("model", "antigravity/gemini-3.1-flash-image");
  formData.set("prompt", "combine both references");
  formData.set("image", new File([PNG_BYTES], "one.png", { type: "image/png" }));
  formData.append("image[]", new File([JPEG_BYTES], "two.jpg", { type: "image/jpeg" }));

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", { method: "POST", body: formData })
  );

  assert.equal(response.status, 200);
  const upstream = calls.filter((call) => call.url === AG_URL);
  assert.equal(upstream.length, 1);
  const parts = upstream[0].body.request.contents[0].parts;
  assert.equal(parts.length, 3);
  assert.equal(parts[0].inlineData?.data, PNG_BYTES.toString("base64"));
  assert.equal(parts[1].inlineData?.mimeType, "image/jpeg");
  assert.equal(parts[1].inlineData?.data, JPEG_BYTES.toString("base64"));
  assert.match(String(parts[2].text), /Use all 2 attached reference images/);
});
