/**
 * Test verifying that GET /api/providers/[id]/models returns normalized discovered models
 * with supportedEndpoints, endpointCapabilitySource, supportsVision, and token limits,
 * rather than unnormalized raw upstream cards.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-discovery-resp-"));
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

test("GET /api/providers/[id]/models returns normalized models with supportedEndpoints and capabilities", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "mistral-discovery-test",
    apiKey: "sk-test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  });

  globalThis.fetch = (async (_url: string | URL | Request) => {
    return Response.json({
      object: "list",
      data: [
        {
          id: "mistral-embed",
          object: "model",
          capabilities: {
            completion_chat: false,
            completion_fim: false,
            function_calling: false,
            vision: false,
          },
          max_context_length: 8192,
        },
        {
          id: "pixtral-large-latest",
          object: "model",
          capabilities: {
            completion_chat: true,
            completion_fim: false,
            function_calling: true,
            vision: true,
          },
          max_context_length: 131072,
        },
        {
          id: "mistral-large-latest",
          object: "model",
          capabilities: {
            completion_chat: true,
            completion_fim: false,
            function_calling: true,
            vision: false,
          },
          max_context_length: 262144,
        },
      ],
    });
  }) as typeof fetch;

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    source: string;
    models: Array<{
      id: string;
      supportedEndpoints?: string[];
      endpointCapabilitySource?: string;
      supportsVision?: boolean;
      supportsTools?: boolean;
      inputTokenLimit?: number;
    }>;
  };

  assert.equal(body.source, "api");
  assert.ok(Array.isArray(body.models));
  assert.equal(body.models.length, 3);

  const embedModel = body.models.find((m) => m.id === "mistral-embed");
  assert.ok(embedModel, "mistral-embed should be returned");
  // RED before fix: supportedEndpoints was undefined on raw upstream object
  assert.deepEqual(embedModel.supportedEndpoints, ["embeddings"]);
  assert.equal(embedModel.endpointCapabilitySource, "inferred");
  assert.equal(embedModel.supportsVision, undefined);
  assert.equal(embedModel.supportsTools, false);
  assert.equal(embedModel.inputTokenLimit, 8192);

  const pixtralModel = body.models.find((m) => m.id === "pixtral-large-latest");
  assert.ok(pixtralModel, "pixtral-large-latest should be returned");
  assert.equal(pixtralModel.supportsVision, true);
  assert.equal(pixtralModel.supportsTools, true);
  assert.equal(pixtralModel.inputTokenLimit, 131072);

  const textModel = body.models.find((m) => m.id === "mistral-large-latest");
  assert.ok(textModel, "mistral-large-latest should be returned");
  assert.equal(textModel.supportsVision, undefined);
  assert.equal(textModel.supportsTools, true);
  assert.equal(textModel.inputTokenLimit, 262144);
});
