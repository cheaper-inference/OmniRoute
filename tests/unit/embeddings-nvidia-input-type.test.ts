import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-nvidia-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

// Verified asymmetric NVIDIA NIM models require input_type. The handler defaults
// queries to "query"; clients indexing passages must send "passage" explicitly.

const verifiedIds = [
  "nvidia/nemotron-3.5-embed-8b",
  "nvidia/nemotron-3.5-embed-1b",
  "nvidia/nemotron-3-embed-1b",
  "nvidia/llama-nemotron-embed-1b-v2",
  "nvidia/nv-embedqa-e5-v5",
];

interface Captured {
  body?: Record<string, unknown>;
  url?: string;
}

function captureFetch(captured: Captured) {
  return async (url: unknown, options: { body?: unknown } = {}) => {
    captured.url = String(url);
    captured.body = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 4, total_tokens: 4 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
}

async function callWithModel(model: string, inputType?: string) {
  const captured: Captured = {};
  const originalFetch = globalThis.fetch;
  globalThis.fetch = captureFetch(captured) as typeof fetch;
  try {
    const result = await handleEmbedding({
      body: {
        model,
        input: "What is the capital of France?",
        ...(inputType === undefined ? {} : { input_type: inputType }),
      },
      credentials: { apiKey: "nvidia-key" },
      log: null,
    });
    return { result, captured };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("default input_type applies for every verified NVIDIA model", async () => {
  for (const model of verifiedIds) {
    const { result, captured } = await callWithModel(model);
    assert.equal(result.success, true, model);
    assert.equal(captured.url, "https://integrate.api.nvidia.com/v1/embeddings", model);
    assert.equal(captured.body?.model, model, model);
    assert.equal(captured.body?.input_type, "query", model);
  }
});

test("double-prefixed model IDs reach the same registry entry and default", async () => {
  for (const [model, normalized] of [
    ["nvidia/nvidia/nv-embedqa-e5-v5", "nvidia/nv-embedqa-e5-v5"],
    ["nvidia/nvidia/nemotron-3.5-embed-8b", "nvidia/nemotron-3.5-embed-8b"],
  ]) {
    const { result, captured } = await callWithModel(model);
    assert.equal(result.success, true, model);
    assert.equal(captured.body?.model, normalized, model);
    assert.equal(captured.body?.input_type, "query", model);
  }
});

test("client input_type wins", async () => {
  for (const model of ["nvidia/nemotron-3.5-embed-8b", "nvidia/nvidia/nv-embedqa-e5-v5"]) {
    const { result, captured } = await callWithModel(model, "passage");
    assert.equal(result.success, true, model);
    assert.equal(captured.body?.input_type, "passage", model);
  }
});

test("unlisted NVIDIA and non-NVIDIA models are untouched", async () => {
  for (const model of ["nvidia/nv-embedqa-mistral-7b-v2", "openai/text-embedding-3-small"]) {
    const { result, captured } = await callWithModel(model);
    assert.equal(result.success, true, model);
    assert.equal("input_type" in (captured.body || {}), false, model);
  }
});
