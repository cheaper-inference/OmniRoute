import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The provider page Import button and the scheduled sync must write the same
// catalog. A media-only provider (Soniox, ElevenLabs, …) lists speech and
// transcription models the chat sync filters out, so an explicit import is the
// one way they reach the catalog: it stores them as imported custom rows, which
// every later sync keeps (they declare only non-chat endpoints).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-import-media-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const discoveryRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const { AUDIO_SPEECH_PROVIDERS, AUDIO_TRANSCRIPTION_PROVIDERS } =
  await import("../../open-sse/config/audioRegistry.ts");

const originalFetch = globalThis.fetch;

type StoredRow = { id: string; source?: string; apiFormat?: string; supportedEndpoints?: string[] };

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedSoniox(): Promise<{ id: string }> {
  return (await providersDb.createProviderConnection({
    provider: "soniox",
    authType: "apikey",
    name: "soniox-fixture",
    apiKey: "soniox-fixture-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  })) as { id: string };
}

async function sync(connectionId: string, mode: "import" | "sync") {
  // The sync reads discovery through its own HTTP loopback: answer it with the
  // real discovery route, in-process. Nothing else may leave the process.
  globalThis.fetch = async (input, init) => {
    const rawUrl = input instanceof Request ? input.url : String(input);
    const url = new URL(rawUrl);
    if (url.pathname.includes("__readiness_probe__")) return new Response("", { status: 404 });
    if (url.pathname === `/api/providers/${connectionId}/models`) {
      return discoveryRoute.GET(new Request(rawUrl, init), { params: { id: connectionId } });
    }
    throw new Error(`unexpected outbound request to ${rawUrl}`);
  };
  const query = mode === "import" ? "?mode=import" : "";
  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models${query}`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

async function storedById() {
  const rows = (await modelsDb.getCustomModels("soniox")) as StoredRow[];
  return new Map(rows.map((row) => [row.id, row]));
}

function assertMediaRows(byId: Map<string, StoredRow>) {
  for (const { id } of AUDIO_TRANSCRIPTION_PROVIDERS.soniox.models) {
    assert.equal(byId.get(id)?.source, "imported", id);
    assert.equal(byId.get(id)?.apiFormat, "audio-transcriptions", id);
    assert.deepEqual(byId.get(id)?.supportedEndpoints, ["audio-transcriptions"], id);
  }
  for (const { id } of AUDIO_SPEECH_PROVIDERS.soniox.models) {
    assert.equal(byId.get(id)?.source, "imported", id);
    assert.equal(byId.get(id)?.apiFormat, "audio-speech", id);
    assert.deepEqual(byId.get(id)?.supportedEndpoints, ["audio-speech"], id);
  }
}

test.beforeEach(resetStorage);

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an explicit import stores a media-only provider's models as imported rows", async () => {
  const connection = await seedSoniox();

  const { response, body } = await sync(connection.id, "import");

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assertMediaRows(await storedById());
});

test("the scheduled sync keeps the media rows an import stored", async () => {
  const connection = await seedSoniox();
  await sync(connection.id, "import");

  const { response } = await sync(connection.id, "sync");

  assert.equal(response.status, 200);
  assertMediaRows(await storedById());
});
