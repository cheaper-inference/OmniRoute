import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-gemini-dim-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

// Regression guard for diegosouzapw/OmniRoute#17158.
//
// Gemini embedding models return 3072 dimensions by default. OpenAI-compatible clients
// may request a smaller vector (e.g. 768 for pgvector's 2000-dim HNSW limit) via the
// `dimensions` field. The Gemini TEXT path posts to Google's OpenAI-compatible endpoint
// (https://generativelanguage.googleapis.com/v1beta/openai/embeddings — see the `gemini`
// entry in open-sse/config/embeddingRegistry.ts), and that endpoint honors `dimensions`
// on its own while REJECTING the extra field:
//   400 INVALID_ARGUMENT: Invalid JSON payload received. Unknown name
//   "outputDimensionality": Cannot find field.
// So injecting `outputDimensionality` there made every sized Gemini embedding fail and
// left only the default 3072-dim output reachable. The native embedContent/batchEmbedContents
// transport maps `dimensions` to snake_case `output_dimensionality` itself
// (embeddingStructuredInput.ts::geminiRequestExtras), so buildUpstreamBody must forward
// `dimensions` untouched and never inject `outputDimensionality` for Gemini.

function captureFetch(captured: { body?: Record<string, unknown> }) {
  return async (_url: unknown, options: { headers?: unknown; body?: unknown } = {}) => {
    captured.body = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: new Array(1536).fill(0.1), index: 0 }],
        usage: { prompt_tokens: 4, total_tokens: 4 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
}

test("handleEmbedding forwards Gemini dimensions without injecting outputDimensionality (single input)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
        dimensions: 1536,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    // Google's OpenAI-compatible endpoint honors `dimensions` on its own.
    assert.equal(captured.body?.dimensions, 1536);
    // ...and rejects the camelCase Gemini-native field with 400 "Unknown name".
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "outputDimensionality must not be injected into the OpenAI-compatible Gemini request"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding forwards Gemini dimensions without injecting outputDimensionality (batch input)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: ["hello", "world"],
        dimensions: 1536,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.body?.dimensions, 1536);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "batch Gemini requests must not carry outputDimensionality either"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding does not inject outputDimensionality when dimensions is omitted (Gemini)", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "outputDimensionality must not be injected when the client did not request a specific size"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding does not inject outputDimensionality for non-Gemini providers", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "openai/text-embedding-3-small",
        input: "test",
        dimensions: 1536,
      },
      credentials: { apiKey: "openai-key" },
      log: null,
    });

    assert.equal(result.success, true);
    // OpenAI gets the standard `dimensions` field — not `outputDimensionality`.
    assert.equal(captured.body?.dimensions, 1536);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "outputDimensionality is Gemini-specific and must not leak into other providers"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding ignores non-finite/non-positive dimensions for Gemini", async () => {
  const originalFetch = globalThis.fetch;
  const captured: { body?: Record<string, unknown> } = {};
  globalThis.fetch = captureFetch(captured) as typeof fetch;

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/text-embedding-004",
        input: "test",
        dimensions: 0,
      },
      credentials: { apiKey: "gemini-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(
      "outputDimensionality" in (captured.body || {}),
      false,
      "0/NaN/negative dimensions must not map to outputDimensionality"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
