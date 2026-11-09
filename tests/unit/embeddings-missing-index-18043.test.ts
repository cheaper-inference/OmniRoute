import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-missing-index-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

const localProvider = {
  id: "localembed",
  baseUrl: "http://localhost:8080/embeddings",
  authType: "none" as const,
  authHeader: "none" as const,
  models: [],
};

function mockUpstream(payload: unknown): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  return () => {
    globalThis.fetch = original;
  };
}

async function embed(input: string | string[]) {
  return handleEmbedding({
    body: { model: "localembed/bge-m3", input },
    credentials: null,
    resolvedProvider: localProvider,
    resolvedModel: "bge-m3",
    log: null,
  });
}

// #18043: Google's OpenAI-compatible endpoint (`v1beta/openai/embeddings`) leaves `index` out of the
// first item of a batch, because 0 is the proto3 default. OpenAI SDK consumers sort the batch
// by `index` (Python: `sorted(response.data, key=lambda x: x.index)`), which raises on None.
test("handleEmbedding restores the index the upstream omits on the first batch item", async () => {
  const restore = mockUpstream({
    data: [
      { object: "embedding", embedding: [1, 2] },
      { object: "embedding", embedding: [3, 4], index: 1 },
      { object: "embedding", embedding: [5, 6], index: 2 },
    ],
    usage: { prompt_tokens: 3, total_tokens: 3 },
  });
  try {
    const result = await embed(["a", "b", "c"]);

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ embedding: number[]; index: number }>;
    assert.deepEqual(
      rows.map((row) => row.index),
      [0, 1, 2]
    );
    assert.deepEqual(rows[0].embedding, [1, 2]);
  } finally {
    restore();
  }
});

test("handleEmbedding fills index on a single item without one", async () => {
  const restore = mockUpstream({
    data: [{ object: "embedding", embedding: [0.1, 0.2] }],
    usage: { prompt_tokens: 1, total_tokens: 1 },
  });
  try {
    const result = await embed("a");

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ index: number }>;
    assert.equal(rows[0].index, 0);
  } finally {
    restore();
  }
});

test("handleEmbedding keeps the upstream index when it is present", async () => {
  const restore = mockUpstream({
    data: [
      { object: "embedding", embedding: [3, 4], index: 1 },
      { object: "embedding", embedding: [1, 2], index: 0 },
    ],
    usage: { prompt_tokens: 2, total_tokens: 2 },
  });
  try {
    const result = await embed(["a", "b"]);

    assert.equal(result.success, true);
    const rows = result.data.data as Array<{ embedding: number[]; index: number }>;
    assert.deepEqual(
      rows.map((row) => row.index),
      [1, 0]
    );
  } finally {
    restore();
  }
});
