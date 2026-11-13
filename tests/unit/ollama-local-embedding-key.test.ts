import test from "node:test";
import assert from "node:assert/strict";

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

// ollama-local accepts an optional key (a reverse proxy in front of Ollama). The embedding
// registry entry used authHeader "none", so a configured key was never sent.

async function embedWith(credentials: Record<string, unknown> | null) {
  const originalFetch = globalThis.fetch;
  let headers: Record<string, string> = {};
  globalThis.fetch = (async (_url: unknown, init: { headers?: Record<string, string> } = {}) => {
    headers = init.headers || {};
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1], index: 0 }],
        usage: { prompt_tokens: 1, total_tokens: 1 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
  try {
    const result = await handleEmbedding({
      body: { model: "ollama-local/bge-m3", input: "hi" },
      credentials,
      log: null,
    });
    assert.equal(result.success, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return headers;
}

test("ollama-local embeddings send a configured API key as a bearer token", async () => {
  const key = ["k", "e", "y", "-1"].join("");
  const headers = await embedWith({ apiKey: key });
  assert.equal(headers.Authorization, `Bearer ${key}`);
});

test("ollama-local embeddings send no Authorization header without a key", async () => {
  const headers = await embedWith(null);
  assert.equal(headers.Authorization, undefined);
});
