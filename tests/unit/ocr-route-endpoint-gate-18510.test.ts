/**
 * #18510: /v1/ocr joins the endpoint capability gate (#16929). The route answers its
 * local 400 only with MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED on and only for a model
 * whose trusted catalog row excludes OCR. Flag off must dispatch exactly as before.
 */
import test from "node:test";
import assert from "node:assert/strict";

const FLAG = "MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED";
delete process.env[FLAG];

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { POST } = await import("../../src/app/api/v1/ocr/route.ts");

const CHAT_ONLY = "mistral-small-latest";
const OCR_MODEL = "mistral-ocr-2512";
const UNDECLARED = "mistral-medium-latest";

const originalFetch = globalThis.fetch;
let upstreamCalls = 0;

function withFlag(value: "true" | undefined) {
  if (value === undefined) delete process.env[FLAG];
  else process.env[FLAG] = value;
}

function ocrRequest(model: string) {
  return new Request("http://localhost/v1/ocr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      document: { type: "document_url", document_url: "https://example.com/a.pdf" },
    }),
  });
}

test.before(async () => {
  globalThis.fetch = async () => {
    upstreamCalls++;
    return new Response(JSON.stringify({ pages: [], model: "stub" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  const connection = await createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "mistral-18510",
    apiKey: "mistral-18510-key",
    isActive: true,
  });
  await replaceSyncedAvailableModelsForConnection("mistral", connection.id, [
    {
      id: CHAT_ONLY,
      name: CHAT_ONLY,
      source: "imported",
      supportedEndpoints: ["chat"],
      endpointCapabilitySource: "declared",
    },
    {
      id: OCR_MODEL,
      name: OCR_MODEL,
      source: "imported",
      supportedEndpoints: ["ocr"],
      endpointCapabilitySource: "declared",
    },
    { id: UNDECLARED, name: UNDECLARED, source: "imported" },
  ]);
});

test.beforeEach(() => {
  upstreamCalls = 0;
  withFlag(undefined);
});

test.after(() => {
  withFlag(undefined);
  globalThis.fetch = originalFetch;
  resetDbInstance();
});

test("flag off: a chat-only model still dispatches, no local 400", async () => {
  const response = await POST(ocrRequest(`mistral/${CHAT_ONLY}`));
  await response.body?.cancel();
  assert.notEqual(response.status, 400);
  assert.equal(upstreamCalls, 1);
});

test("flag on: a model declared chat-only answers 400 before any upstream call", async () => {
  withFlag("true");
  const response = await POST(ocrRequest(`mistral/${CHAT_ONLY}`));
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.match(body.error.message, /does not serve POST \/v1\/ocr/);
  assert.match(body.error.message, /Use POST \/v1\/chat\/completions instead/);
  assert.equal(upstreamCalls, 0);
});

test("flag on: a model declared for OCR dispatches", async () => {
  withFlag("true");
  const response = await POST(ocrRequest(`mistral/${OCR_MODEL}`));
  await response.body?.cancel();
  assert.equal(response.status, 200);
  assert.equal(upstreamCalls, 1);
});

test("flag on: a model with no declared endpoints passes the gate", async () => {
  withFlag("true");
  const response = await POST(ocrRequest(`mistral/${UNDECLARED}`));
  await response.body?.cancel();
  assert.equal(response.status, 200);
  assert.equal(upstreamCalls, 1);
});
