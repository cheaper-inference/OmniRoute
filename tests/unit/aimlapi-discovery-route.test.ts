// AI/ML API (aimlapi) — route-level guard for the live catalog envelope (#13667).
//
// The live /models endpoint answers with the OpenAI-style envelope
// `{ object: "list", data: [...] }` and the `openai/chat-completions` type. The
// older route test fed a bare array of `chat-completion` rows — neither of which
// the catalog has produced since the schema change — so the route passed there
// while returning zero models in production. Kept in its own file so the shared
// provider-models-route suite stays under its frozen size ceiling.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-aimlapi-discovery-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("provider models route unwraps the live AI/ML API catalog envelope (#13667)", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "aimlapi",
    authType: "apikey",
    name: "aimlapi-envelope",
    apiKey: "aiml-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });
  let calledUrl = "";
  globalThis.fetch = async (url) => {
    calledUrl = String(url);
    return Response.json({
      object: "list",
      data: [
        { id: "openai/gpt-5", type: "openai/chat-completions", info: { name: "GPT-5" } },
        {
          id: "anthropic/claude-sonnet-4-6",
          type: "openai/chat-completions",
          info: { name: "Claude 4.6 Sonnet" },
        },
        { id: "flux/flux-pro", type: "openai/image-generations", info: { name: "FLUX Pro" } },
      ],
    });
  };

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { source: string; models: Array<{ id: string }> };

  // RED before the fix: `Array.isArray(data)` was false for the envelope, so every
  // row was discarded and the route fell back to the static seed.
  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.equal(calledUrl, "https://api.aimlapi.com/models");
  const ids = body.models.map((m) => m.id);
  assert.ok(ids.includes("openai/gpt-5") && ids.includes("anthropic/claude-sonnet-4-6"));
  assert.ok(!ids.includes("flux/flux-pro"), "non-chat model types are filtered out");
});
