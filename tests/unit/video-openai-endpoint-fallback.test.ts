import test from "node:test";
import assert from "node:assert/strict";

/**
 * `resolveVideoEndpoint` accepts a fallback address and must use it.
 *
 * The function is declared as `(credentials, fallback)` and the caller passes
 * `providerConfig.baseUrl` - address from the registry. But so far the address was taken only from
 * credentials: with a built-in provider, where the node does not store its baseUrl,
 * the result was `null.endsWith(...)` and the route responded with 500 with an empty body.
 *
 * The defect was not visible because the only built-in format provider
 * `openai-video` (nanogpt) did not reach this branch - its format in the registry was
 * written as `openai` and the dispatcher has dropped it before (400 Unsupported
 * video format). Live check 2026-08-30: as soon as the format name was corrected,
 * the same request returned 500 and a stack with `Cannot read properties of null`.
 *
 * The address from the registry is a ready endpoint, not the root of the node: for nanogpt this is
 * `/api/v1/video/generations` (singular), and append to it
 * `/videos/generations` is not allowed.
 */

const { handleOpenAIVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/openai.ts");

const REGISTRY_ENDPOINT = "https://nano-gpt.com/api/v1/video/generations";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function captureRequestUrl() {
  const seen: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    seen.push(typeof input === "string" ? input : input.toString());
    return new Response(JSON.stringify({ data: [{ url: "https://example.test/out.mp4" }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  return seen;
}

test("falls back to the registry endpoint when the node carries no baseUrl", async () => {
  const seen = captureRequestUrl();

  const result = await handleOpenAIVideoGeneration({
    model: "default",
    provider: "nanogpt",
    providerConfig: { baseUrl: REGISTRY_ENDPOINT, authHeader: "bearer" },
    body: { prompt: "hello world" },
    credentials: { apiKey: "test-key" },
  });

  assert.notEqual(result, undefined, "обработчик обязан вернуть результат, а не упасть");
  assert.deepEqual(seen, [REGISTRY_ENDPOINT]);
});

test("still prefers the node's own baseUrl and appends the OpenAI path", async () => {
  const seen = captureRequestUrl();

  await handleOpenAIVideoGeneration({
    model: "default",
    provider: "custom-node",
    providerConfig: { baseUrl: REGISTRY_ENDPOINT, authHeader: "bearer" },
    body: { prompt: "hello world" },
    credentials: { apiKey: "test-key", baseUrl: "https://node.test/v1/" },
  });

  assert.deepEqual(seen, ["https://node.test/v1/videos/generations"]);
});
