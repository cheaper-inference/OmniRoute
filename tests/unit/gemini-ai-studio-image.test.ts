import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-gemini-ai-image-"));

const { parseImageModel, getImageProvider } =
  await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { GEMINI_AI_IMAGE_MAX_N } =
  await import("../../open-sse/handlers/imageGeneration/providers/geminiAiStudio.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type Captured = { url: string; init: RequestInit; body: Record<string, unknown> };

function imageResponse(data = "aW1n") {
  return new Response(
    JSON.stringify({
      candidates: [{ content: { parts: [{ inlineData: { mimeType: "image/png", data } }] } }],
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function capture(respond: (call: number) => Response | Promise<Response>) {
  const calls: Captured[] = [];
  globalThis.fetch = (async (url: string | URL, init: RequestInit = {}) => {
    calls.push({ url: String(url), init, body: JSON.parse(String(init.body || "{}")) });
    return respond(calls.length);
  }) as typeof fetch;
  return calls;
}

test("the gemini image provider registers the public -preview model ids", () => {
  const ids = getImageProvider("gemini")?.models.map((m) => m.id);
  assert.deepEqual(ids, ["gemini-3-pro-image-preview", "gemini-3.1-flash-image-preview"]);
  assert.deepEqual(parseImageModel("gemini/gemini-3.1-flash-image-preview"), {
    provider: "gemini",
    model: "gemini-3.1-flash-image-preview",
  });
});

test("a bare gemini-3.1-flash-image-preview keeps resolving to Antigravity (default unchanged)", () => {
  assert.equal(parseImageModel("gemini-3.1-flash-image-preview").provider, "antigravity");
});

test("requests go through a timed fetch (an AbortSignal is always attached)", async () => {
  const calls = capture(() => imageResponse());
  const result = await handleImageGeneration({
    body: { model: "gemini/gemini-3.1-flash-image-preview", prompt: "a fox" },
    credentials: { apiKey: "k" },
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(calls.length, 1);
  assert.ok(calls[0].init.signal instanceof AbortSignal, "fetch must carry a timeout signal");
  assert.equal(
    calls[0].url,
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent"
  );
});

test("a client abort signal is forwarded to the upstream fetch", async () => {
  const controller = new AbortController();
  globalThis.fetch = (async (_url: string | URL, init: RequestInit = {}) =>
    new Promise<Response>((_resolve, reject) => {
      // Without a forwarded signal the call would hang: fail fast instead (non-timeout → 502).
      const guard = setTimeout(() => reject(new Error("signal not forwarded")), 2000);
      init.signal?.addEventListener("abort", () => {
        clearTimeout(guard);
        reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
      });
    })) as typeof fetch;
  const pending = handleImageGeneration({
    body: { model: "gemini/gemini-3.1-flash-image-preview", prompt: "a fox" },
    credentials: { apiKey: "k" },
    log: null,
    signal: controller.signal,
  });
  controller.abort();
  const result = await pending;
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
});

test("n > 1 fans out into single-candidate calls instead of sending candidateCount", async () => {
  const calls = capture((call) => imageResponse(`img${call}`));
  const result = await handleImageGeneration({
    body: { model: "gemini/gemini-3-pro-image-preview", prompt: "two cats", n: 2 },
    credentials: { apiKey: "k" },
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  for (const call of calls) {
    const config = call.body.generationConfig as Record<string, unknown>;
    assert.equal("candidateCount" in config, false);
  }
  assert.deepEqual(result.data.data.map((d) => d.b64_json).sort(), ["img1", "img2"]);
});

test("n is bounded so one request cannot fan out without limit", async () => {
  const calls = capture(() => imageResponse());
  const result = await handleImageGeneration({
    body: { model: "gemini/gemini-3-pro-image-preview", prompt: "cats", n: 50 },
    credentials: { apiKey: "k" },
    log: null,
  });
  assert.equal(result.success, true);
  assert.equal(calls.length, GEMINI_AI_IMAGE_MAX_N);
});

test("an upstream error keeps its status and a sanitized body", async () => {
  capture(
    () =>
      new Response(
        JSON.stringify({
          error: { code: 400, message: "bad request", status: "INVALID_ARGUMENT" },
        }),
        { status: 400, headers: { "content-type": "application/json" } }
      )
  );
  const result = await handleImageGeneration({
    body: { model: "gemini/gemini-3-pro-image-preview", prompt: "cats" },
    credentials: { apiKey: "k" },
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.ok(!JSON.stringify(result.error).includes("at /"), "no stack trace in the error body");
});

test("a missing API key fails with 401 before any upstream call", async () => {
  const calls = capture(() => imageResponse());
  const result = await handleImageGeneration({
    body: { model: "gemini/gemini-3-pro-image-preview", prompt: "cats" },
    credentials: {},
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(calls.length, 0);
});
