import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A Volcano Ark plan import answers from its own branch of the sync route (the
// console API, not /models). Its response must name the models it added and the
// ones the plan no longer lists, like every other import, or the import dialog
// reports "All models already imported" for a catalog that changed.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-volc-plan-sync-ids-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const syncModelsRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const scheduler = await import("../../src/shared/services/modelSyncScheduler.ts");
const { MockAgent, getGlobalDispatcher, setGlobalDispatcher } = await import("undici");

// The console client calls undici's fetch directly (not the patched global
// fetch), so the console is answered through undici's dispatcher, and every
// unmatched request fails instead of reaching the network.
const originalDispatcher = getGlobalDispatcher();

function servePlan(modelIds: string[]) {
  const agent = new MockAgent();
  agent.disableNetConnect();
  agent
    .get("https://console.volcengine.com")
    .intercept({ path: () => true, method: "POST" })
    .reply(200, {
      Result: { Data: modelIds.map((id) => ({ ModelId: id, OutputName: id, Enabled: true })) },
    })
    .persist();
  setGlobalDispatcher(agent);
}

async function importPlan(connectionId: string) {
  const response = await syncModelsRoute.POST(
    new Request(`http://localhost/api/providers/${connectionId}/sync-models?mode=import`, {
      method: "POST",
      headers: scheduler.buildModelSyncInternalHeaders(),
    }),
    { params: { id: connectionId } }
  );
  return { response, body: (await response.json()) as Record<string, unknown> };
}

test.after(() => {
  setGlobalDispatcher(originalDispatcher);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a Volcano plan import reports the model ids it added and the ones no longer listed", async () => {
  const connection = (await providersDb.createProviderConnection({
    provider: "volcengine-coding-plan",
    authType: "apikey",
    name: "volc-plan-fixture",
    apiKey: "volc-fixture-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      volcConsoleCookie: "AccountID=1000001; csrfToken=fixture-csrf",
      volcCsrfToken: "fixture-csrf",
    },
  })) as { id: string };

  servePlan(["model-a", "model-b"]);
  const first = await importPlan(connection.id);
  assert.equal(first.response.status, 200, JSON.stringify(first.body));
  assert.deepEqual(first.body.addedModelIds, ["model-a", "model-b"]);
  assert.deepEqual(first.body.removedModelIds, []);

  servePlan(["model-a", "model-c"]);
  const second = await importPlan(connection.id);
  assert.deepEqual(second.body.addedModelIds, ["model-c"]);
  assert.deepEqual(second.body.removedModelIds, ["model-b"]);
});
