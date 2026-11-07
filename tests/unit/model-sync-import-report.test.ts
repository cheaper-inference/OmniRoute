import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// What an import reports is what the dialog tells the operator: where the list
// came from, and which models the import added or found no longer listed.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-report-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const discoveryRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const { AUDIO_TRANSCRIPTION_PROVIDERS } = await import("../../open-sse/config/audioRegistry.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seed(provider: string): Promise<{ id: string }> {
  return (await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-fixture`,
    apiKey: `${provider}-fixture-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { autoFetchModels: true },
  })) as { id: string };
}

/** Run an import, answering the sync's discovery loopback in-process and the upstream listing with `listing`. */
async function runImport(connectionId: string, listing?: Array<{ id: string }>) {
  globalThis.fetch = async (input, init) => {
    const rawUrl = input instanceof Request ? input.url : String(input);
    const url = new URL(rawUrl);
    if (url.pathname.includes("__readiness_probe__")) return new Response("", { status: 404 });
    if (url.pathname === `/api/providers/${connectionId}/models`) {
      return discoveryRoute.GET(new Request(rawUrl, init), { params: { id: connectionId } });
    }
    if (listing && rawUrl === "https://openrouter.ai/api/v1/models") {
      return Response.json({ data: listing });
    }
    throw new Error(`unexpected outbound request to ${rawUrl}`);
  };
  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an import of a live listing names its source and the models it added", async () => {
  const connection = await seed("openrouter");

  const first = await runImport(connection.id, [{ id: "vendor/a" }, { id: "vendor/b" }]);

  assert.equal(first.response.status, 200);
  assert.equal(first.body.source, "api");
  assert.equal(first.body.intentional, undefined);
  // OpenRouter's curated embedding/rerank entries (#6976) join the first import too.
  const firstAdded = first.body.addedModelIds as string[];
  for (const id of ["vendor/a", "vendor/b"]) assert.ok(firstAdded.includes(id), id);
  assert.deepEqual(first.body.removedModelIds, []);

  const second = await runImport(connection.id, [{ id: "vendor/a" }, { id: "vendor/c" }]);

  assert.deepEqual(second.body.addedModelIds, ["vendor/c"]);
  assert.deepEqual(
    second.body.removedModelIds,
    ["vendor/b"],
    "a model the provider stopped listing"
  );
});

test("an import of a provider with no model listing says so", async () => {
  const connection = await seed("soniox");

  const { response, body } = await runImport(connection.id);

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal(typeof body.warning, "string");
  const added = body.addedModelIds as string[];
  for (const { id } of AUDIO_TRANSCRIPTION_PROVIDERS.soniox.models) {
    assert.ok(added.includes(id), `${id} was stored by the import`);
  }
});
