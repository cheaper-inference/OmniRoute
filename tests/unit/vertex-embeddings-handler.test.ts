import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "vertex-embed-"));
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { EMBEDDING_PROVIDERS, parseEmbeddingModel } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

// Throwaway key made at run time: no key material is stored in this file.
const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const SERVICE_ACCOUNT = JSON.stringify({
  type: "service_account",
  project_id: "demo-project",
  private_key_id: "kid-1",
  client_email: "svc@demo-project.iam.example",
  private_key: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
});
const CREDS = { apiKey: SERVICE_ACCOUNT, providerSpecificData: { region: "europe-west4" } };
const MODEL = "vertex/text-embedding-005";
const PREDICT_URL =
  "https://aiplatform.googleapis.com/v1/projects/demo-project/locations/europe-west4/publishers/google/models/text-embedding-005:predict";

type Call = { url: string; headers: Record<string, string>; body: Record<string, unknown> | null };

async function run(body: Record<string, unknown>, predict: () => Response, creds = CREDS) {
  const original = globalThis.fetch;
  const calls: Call[] = [];
  globalThis.fetch = async (url, init) => {
    const target = String(url);
    if (target === "https://oauth2.googleapis.com/token") {
      return Response.json({ access_token: "tok-vertex-embed", expires_in: 3600 });
    }
    const raw = init?.body ? JSON.parse(String(init.body)) : null;
    calls.push({ url: target, headers: init?.headers as Record<string, string>, body: raw });
    return predict();
  };
  try {
    const result = (await handleEmbedding({ body, credentials: creds, log: null })) as {
      success: boolean;
      status?: number;
      error?: string;
      data?: { data: { embedding: number[]; index: number }[]; usage: { prompt_tokens: number } };
    };
    return { result, calls };
  } finally {
    globalThis.fetch = original;
  }
}

const predictions = (n: number) => ({
  predictions: Array.from({ length: n }, (_, i) => ({
    embeddings: { values: [i + 0.5, i + 1.5], statistics: { token_count: 3, truncated: false } },
  })),
});

test("vertex is a registered embedding provider with text-embedding models", () => {
  assert.ok(EMBEDDING_PROVIDERS.vertex, "vertex entry");
  assert.deepEqual(parseEmbeddingModel(MODEL), { provider: "vertex", model: "text-embedding-005" });
  assert.ok(EMBEDDING_PROVIDERS.vertex.models.some((m) => m.id === "text-embedding-005"));
});

test("posts instances to the publisher :predict URL with a service-account bearer token", async () => {
  const { result, calls } = await run({ model: MODEL, input: ["alpha", "beta"] }, () =>
    Response.json(predictions(2))
  );
  assert.equal(result.success, true, result.error);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, PREDICT_URL);
  assert.equal(calls[0].headers.Authorization, "Bearer tok-vertex-embed");
  assert.deepEqual(calls[0].body, {
    instances: [
      { content: "alpha", task_type: "RETRIEVAL_QUERY" },
      { content: "beta", task_type: "RETRIEVAL_QUERY" },
    ],
  });
});

test("maps predictions to an OpenAI list and estimates usage locally", async () => {
  const { result } = await run({ model: MODEL, input: ["alpha", "beta"] }, () =>
    Response.json(predictions(2))
  );
  assert.equal(result.success, true, result.error);
  assert.deepEqual(
    result.data?.data.map((d) => [d.index, d.embedding]),
    [
      [0, [0.5, 1.5]],
      [1, [1.5, 2.5]],
    ]
  );
  assert.ok((result.data?.usage.prompt_tokens ?? 0) > 0, "usage is estimated, not zero");
});

test("a string input is one instance and dimensions map to outputDimensionality", async () => {
  const { result, calls } = await run({ model: MODEL, input: "solo", dimensions: 256 }, () =>
    Response.json(predictions(1))
  );
  assert.equal(result.success, true, result.error);
  assert.deepEqual(calls[0].body, {
    instances: [{ content: "solo", task_type: "RETRIEVAL_QUERY" }],
    parameters: { outputDimensionality: 256 },
  });
});

test("an express api key (no service account) is refused before any upstream call", async () => {
  const { result, calls } = await run(
    { model: MODEL, input: "x" },
    () => Response.json(predictions(1)),
    { apiKey: "not-a-service-account", providerSpecificData: {} } as never
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});

test("a response with fewer predictions than inputs fails closed", async () => {
  const { result } = await run({ model: MODEL, input: ["a", "b", "c"] }, () =>
    Response.json(predictions(1))
  );
  assert.equal(result.success, false);
});

test("gemini-embedding-001 sends one input per :predict call and merges vectors in order", async () => {
  let served = 0;
  const { result, calls } = await run(
    { model: "vertex/gemini-embedding-001", input: ["alpha", "beta"] },
    () => {
      served += 1;
      return Response.json({ predictions: [{ embeddings: { values: [served, served] } }] });
    }
  );
  assert.equal(result.success, true, result.error);
  assert.equal(calls.length, 2, "one request per input");
  for (const call of calls) {
    assert.ok(call.url.endsWith("/publishers/google/models/gemini-embedding-001:predict"));
  }
  assert.deepEqual(
    calls.map((call) => call.body?.instances),
    [
      [{ content: "alpha", task_type: "RETRIEVAL_QUERY" }],
      [{ content: "beta", task_type: "RETRIEVAL_QUERY" }],
    ]
  );
  assert.deepEqual(
    result.data?.data.map((d) => [d.index, d.embedding]),
    [
      [0, [1, 1]],
      [1, [2, 2]],
    ]
  );
});

test("a failed token exchange is an upstream error (502) under a deadline, not a client 400", async () => {
  // A distinct client_email so no cached token from the tests above is reused.
  const serviceAccount = JSON.stringify({
    ...JSON.parse(SERVICE_ACCOUNT),
    client_email: "svc-token-down@demo-project.iam.example",
  });
  const original = globalThis.fetch;
  const predictCalls: string[] = [];
  let tokenSignal: unknown = null;
  globalThis.fetch = async (url, init) => {
    if (String(url) === "https://oauth2.googleapis.com/token") {
      tokenSignal = init?.signal;
      return new Response("backend error", { status: 503 });
    }
    predictCalls.push(String(url));
    return Response.json(predictions(1));
  };
  try {
    const result = (await handleEmbedding({
      body: { model: MODEL, input: "x" },
      credentials: { apiKey: serviceAccount, providerSpecificData: { region: "europe-west4" } },
      log: null,
    })) as { success: boolean; status?: number };
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(predictCalls.length, 0);
    assert.ok(tokenSignal instanceof AbortSignal, "the token exchange carries a deadline");
  } finally {
    globalThis.fetch = original;
  }
});

test("a service account without a private key is refused with 400 before any upstream call", async () => {
  const { private_key: _omitted, ...rest } = JSON.parse(SERVICE_ACCOUNT) as Record<string, string>;
  const { result, calls } = await run(
    { model: MODEL, input: "x" },
    () => Response.json(predictions(1)),
    { apiKey: JSON.stringify(rest), providerSpecificData: {} } as never
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});
