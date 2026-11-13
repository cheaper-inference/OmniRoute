import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-base64-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

const localProvider = {
  id: "localembed",
  baseUrl: "http://localhost:8080/embeddings",
  authType: "none" as const,
  authHeader: "none" as const,
  models: [],
};

async function embedWithUpstream(payload: unknown, encodingFormat?: string) {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    const result = await handleEmbedding({
      body: {
        model: "localembed/bge-m3",
        input: ["a", "b"],
        ...(encodingFormat ? { encoding_format: encodingFormat } : {}),
      },
      credentials: null,
      resolvedProvider: localProvider,
      resolvedModel: "bge-m3",
      log: null,
    });
    assert.equal(result.success, true);
    return (result.data as { data: Array<{ embedding: unknown }> }).data;
  } finally {
    globalThis.fetch = original;
  }
}

const floatUpstream = {
  data: [
    { object: "embedding", index: 0, embedding: [0.5, -1.25, 3] },
    { object: "embedding", index: 1, embedding: [1, 2] },
  ],
  usage: { prompt_tokens: 2, total_tokens: 2 },
};

test("encoding_format base64 packs float vectors as little-endian float32 base64", async () => {
  const rows = await embedWithUpstream(floatUpstream, "base64");

  // Node SDK v4+ asks for base64 and decodes a string; a float array would be misread as bytes.
  assert.equal(rows[0].embedding, "AAAAPwAAoL8AAEBA");
  assert.equal(rows[1].embedding, "AACAPwAAAEA=");
});

test("a vector the upstream already returned as base64 is left untouched", async () => {
  const rows = await embedWithUpstream(
    { data: [{ object: "embedding", index: 0, embedding: "AAAAPwAAoL8AAEBA" }], usage: {} },
    "base64"
  );

  assert.equal(rows[0].embedding, "AAAAPwAAoL8AAEBA");
});

test("float and default requests keep number arrays", async () => {
  for (const format of [undefined, "float"]) {
    const rows = await embedWithUpstream(floatUpstream, format);
    assert.deepEqual(rows[0].embedding, [0.5, -1.25, 3]);
  }
});
