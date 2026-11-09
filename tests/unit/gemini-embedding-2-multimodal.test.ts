import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-gemini-embed2-"));

import {
  GEMINI_ENV_CONNECTION_ID,
  buildGeminiEnvCredentials,
  isGeminiCredentialProvider,
  readGeminiEnvApiKey,
} from "../../src/lib/providers/gemini.ts";
import { parseEmbeddingModel, getEmbeddingDimension } from "../../open-sse/config/embeddingRegistry.ts";
import { v1EmbeddingsSchema } from "../../src/shared/validation/schemas/apiV1.ts";
import { handleEmbedding } from "../../open-sse/handlers/embeddings.ts";

const ENV_KEYS = ["GEMINI_API_KEY", "GOOGLE_API_KEY"] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

function restoreEnv() {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
}

test.afterEach(restoreEnv);

const PNG_B64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
const IMAGE_URL = "https://example.com/bike.png";

function batchEmbeddingResponse(count: number) {
  return new Response(
    JSON.stringify({
      embeddings: Array.from({ length: count }, (_, index) => ({
        values: [0.1 * (index + 1), 0.2],
      })),
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function singleEmbeddingResponse() {
  return new Response(JSON.stringify({ embedding: { values: [0.1, 0.2] } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("Gemini env helper prefers GEMINI_API_KEY over GOOGLE_API_KEY", () => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.GOOGLE_API_KEY;
  process.env.GOOGLE_API_KEY = "alias-key";
  assert.equal(readGeminiEnvApiKey(), "alias-key");
  process.env.GEMINI_API_KEY = "primary-key";
  assert.equal(readGeminiEnvApiKey(), "primary-key");
});

test("Gemini env credentials are scoped to gemini and honor filters", () => {
  process.env.GEMINI_API_KEY = "env-gemini-key";
  assert.equal(isGeminiCredentialProvider("gemini"), true);
  assert.equal(isGeminiCredentialProvider("google"), false);
  assert.equal(isGeminiCredentialProvider("jina-ai"), false);
  assert.equal(buildGeminiEnvCredentials("openai"), null);

  const creds = buildGeminiEnvCredentials("gemini");
  assert.ok(creds);
  assert.equal(creds.apiKey, "env-gemini-key");
  assert.equal(creds.connectionId, GEMINI_ENV_CONNECTION_ID);
  assert.equal(buildGeminiEnvCredentials("gemini", { forcedConnectionId: "dashboard-row" }), null);
  assert.ok(buildGeminiEnvCredentials("gemini", { forcedConnectionId: GEMINI_ENV_CONNECTION_ID }));
  assert.equal(buildGeminiEnvCredentials("gemini", { allowedConnections: ["other-id"] }), null);
  assert.equal(
    buildGeminiEnvCredentials("gemini", { excludedConnectionIds: [GEMINI_ENV_CONNECTION_ID] }),
    null
  );
});

test("catalog id is gemini/gemini-embedding-2; google/ is an alias", () => {
  const native = parseEmbeddingModel("gemini/gemini-embedding-2");
  assert.equal(native.provider, "gemini");
  assert.equal(native.model, "gemini-embedding-2");
  assert.equal(getEmbeddingDimension("gemini/gemini-embedding-2"), 3072);

  const aliased = parseEmbeddingModel("google/gemini-embedding-2");
  assert.equal(aliased.provider, "gemini");
  assert.equal(aliased.model, "gemini-embedding-2");

  const preview = parseEmbeddingModel("google/gemini-embedding-2-preview");
  assert.equal(preview.provider, "gemini");
  assert.equal(preview.model, "gemini-embedding-2-preview");

  // Custom provider_node prefix `google` plus embedding-001 must stay unaliased.
  const custom = parseEmbeddingModel("google/gemini-embedding-001");
  assert.equal(custom.provider, "google");
  assert.equal(custom.model, "gemini-embedding-001");
});

test("schema accepts Gemini native text + inline_data mixed batches", () => {
  const parsed = v1EmbeddingsSchema.safeParse({
    model: "gemini/gemini-embedding-2",
    task: "retrieval.query",
    input: [
      { text: "a red bicycle" },
      { inline_data: { mime_type: "image/png", data: PNG_B64 } },
    ],
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.deepEqual(parsed.data.input, [
      { text: "a red bicycle" },
      { inline_data: { mime_type: "image/png", data: PNG_B64 } },
    ]);
  }
});

test("schema accepts fused Gemini Content and rejects unsafe file URIs", () => {
  assert.equal(
    v1EmbeddingsSchema.safeParse({
      model: "gemini/gemini-embedding-2",
      input: {
        parts: [{ text: "caption" }, { inline_data: { mime_type: "image/png", data: PNG_B64 } }],
      },
    }).success,
    true
  );
  for (const file_uri of [
    "http://example.com/bike.png",
    "https://127.0.0.1/bike.png",
    "https://169.254.169.254/latest/meta-data/",
    "file:///etc/passwd",
  ]) {
    const parsed = v1EmbeddingsSchema.safeParse({
      model: "gemini/gemini-embedding-2",
      input: [{ file_data: { mime_type: "image/png", file_uri } }],
    });
    assert.equal(parsed.success, false, `expected reject: ${file_uri}`);
  }
});

test("handleEmbedding sends N Gemini Embedding 2 inputs as N batch requests", async () => {
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; headers: Record<string, string>; body: Record<string, unknown> }> =
    [];
  globalThis.fetch = async (url, init = {}) => {
    const headers = (init.headers || {}) as Record<string, string>;
    seen.push({
      url: String(url),
      headers,
      body: JSON.parse(String(init.body || "{}")) as Record<string, unknown>,
    });
    return batchEmbeddingResponse(3);
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/gemini-embedding-2",
        input: ["alpha", "beta", "gamma"],
        dimensions: 768,
      },
      credentials: { apiKey: "test-gemini-token", connectionId: "conn-gemini-embed" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(seen.length, 1);
    assert.equal(
      seen[0].url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:batchEmbedContents"
    );
    assert.equal(seen[0].headers["x-goog-api-key"], "test-gemini-token");
    assert.equal(seen[0].headers.Authorization, undefined);
    const requests = seen[0].body.requests as Array<{ content: { parts: unknown[] } }>;
    assert.equal(requests.length, 3);
    assert.deepEqual(
      requests.map((request) => request.content.parts),
      [[{ text: "alpha" }], [{ text: "beta" }], [{ text: "gamma" }]]
    );
    const data = (result.data as { data: Array<{ embedding: number[]; index: number }> }).data;
    assert.equal(data.length, 3);
    assert.deepEqual(
      data.map((row) => row.index),
      [0, 1, 2]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding forwards Gemini native text+image parts and does not strip to string[]", async () => {
  const originalFetch = globalThis.fetch;
  const seen: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    if (target === IMAGE_URL || target.includes("bike.png")) {
      throw new Error("Gemini-native inline_data must not trigger a media fetch");
    }
    seen.push({
      url: target,
      body: JSON.parse(String(init.body || "{}")) as Record<string, unknown>,
    });
    return batchEmbeddingResponse(2);
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "google/gemini-embedding-2",
        input: [
          { text: "a red bicycle" },
          { inline_data: { mime_type: "image/png", data: PNG_B64 } },
        ],
      },
      credentials: { apiKey: "test-gemini-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(seen.length, 1);
    assert.equal(
      seen[0].url,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:batchEmbedContents"
    );
    const requests = seen[0].body.requests as Array<{ content: { parts: unknown[] } }>;
    assert.equal(requests.length, 2);
    assert.deepEqual(requests[0].content.parts, [{ text: "a red bicycle" }]);
    assert.deepEqual(requests[1].content.parts, [
      { inline_data: { mime_type: "image/png", data: PNG_B64 } },
    ]);
    assert.equal(typeof seen[0].body.input, "undefined");
    const data = (result.data as { data: unknown[] }).data;
    assert.equal(data.length, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding fuses one Gemini Content with multiple parts into one vector", async () => {
  const originalFetch = globalThis.fetch;
  let seenBody: Record<string, unknown> | null = null;
  let seenUrl = "";
  globalThis.fetch = async (url, init = {}) => {
    seenUrl = String(url);
    seenBody = JSON.parse(String(init.body || "{}")) as Record<string, unknown>;
    return singleEmbeddingResponse();
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/gemini-embedding-2",
        input: {
          parts: [{ text: "caption" }, { inline_data: { mime_type: "image/png", data: PNG_B64 } }],
        },
      },
      credentials: { apiKey: "test-gemini-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(
      seenUrl,
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent"
    );
    assert.deepEqual(seenBody?.content, {
      parts: [{ text: "caption" }, { inline_data: { mime_type: "image/png", data: PNG_B64 } }],
    });
    const data = (result.data as { data: unknown[] }).data;
    assert.equal(data.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleEmbedding keeps gemini-embedding-001 text batches on the OpenAI shim", async () => {
  const originalFetch = globalThis.fetch;
  let seenUrl = "";
  let seenBody: Record<string, unknown> | null = null;
  globalThis.fetch = async (url, init = {}) => {
    seenUrl = String(url);
    seenBody = JSON.parse(String(init.body || "{}")) as Record<string, unknown>;
    return new Response(
      JSON.stringify({
        data: [
          { object: "embedding", embedding: [0.1], index: 0 },
          { object: "embedding", embedding: [0.2], index: 1 },
        ],
        usage: { prompt_tokens: 2, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "gemini/gemini-embedding-001",
        input: ["alpha", "beta"],
      },
      credentials: { apiKey: "test-gemini-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    assert.equal(seenUrl, "https://generativelanguage.googleapis.com/v1beta/openai/embeddings");
    assert.deepEqual(seenBody?.input, ["alpha", "beta"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#18244: Gemini native embedContent usage reaches the API response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({
    embedding: { values: [0.125, -0.25] },
    usageMetadata: {
      promptTokenCount: 8,
      promptTokenDetails: [{ modality: "TEXT", tokenCount: 8 }],
    },
  }), { status: 200, headers: { "content-type": "application/json" } });

  try {
    const result = await handleEmbedding({
      body: { model: "gemini/gemini-embedding-2", input: "account for these tokens" },
      credentials: { apiKey: "test-gemini-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    const data = result.data as {
      data: Array<{ object: string; embedding: number[]; index: number }>;
      usage: { prompt_tokens: number; total_tokens: number };
    };
    assert.deepEqual(data.usage, { prompt_tokens: 8, total_tokens: 8 });
    assert.deepEqual(data.data, [
      { object: "embedding", embedding: [0.125, -0.25], index: 0 },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#18244: Gemini native batch token usage is accounted once, not once per embedding", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({
    embeddings: [{ values: [0.1, 0.2] }, { values: [-0.3, 0.4] }, { values: [0.5, -0.6] }],
    usageMetadata: {
      promptTokenCount: 19,
      promptTokenDetails: [{ modality: "TEXT", tokenCount: 19 }],
    },
  }), { status: 200, headers: { "content-type": "application/json" } });

  try {
    const result = await handleEmbedding({
      body: { model: "gemini/gemini-embedding-2", input: ["first", "second", "third"] },
      credentials: { apiKey: "test-gemini-token" },
      log: null,
    });
    assert.equal(result.success, true, result.error);
    const data = result.data as {
      data: Array<{ object: string; embedding: number[]; index: number }>;
      usage: { prompt_tokens: number; total_tokens: number };
    };
    assert.deepEqual(data.usage, { prompt_tokens: 19, total_tokens: 19 });
    assert.deepEqual(data.data, [
      { object: "embedding", embedding: [0.1, 0.2], index: 0 },
      { object: "embedding", embedding: [-0.3, 0.4], index: 1 },
      { object: "embedding", embedding: [0.5, -0.6], index: 2 },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
