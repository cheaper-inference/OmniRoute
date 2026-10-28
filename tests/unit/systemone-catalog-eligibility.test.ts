import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-catalog-eligibility-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "systemone-catalog-eligibility-test-secret";

const { handleSystemOneModels } = await import("../../open-sse/handlers/systemOneModels.ts");
const { clearAllModelLockouts, recordModelLockoutFailure } =
  await import("../../open-sse/services/accountFallback.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type CatalogConnection =
  import("../../open-sse/handlers/systemOneModels.ts").SystemOneCatalogConnection;

const MODEL = "typesafe/jev-1.13";

function connection(
  id: string,
  providerSpecificData: Record<string, unknown> = {}
): CatalogConnection {
  return { id, provider: "openrouter", apiKey: "fixture-key", providerSpecificData };
}

async function listed(connections: CatalogConnection[]) {
  const response = await handleSystemOneModels(
    {},
    {
      listConnections: async () => connections,
      isConnectionUnavailable: () => false,
      fetchSystemOne: async () =>
        new Response(
          JSON.stringify({
            data: [{ id: MODEL, architecture: { output_modalities: ["decisions"] } }],
          })
        ),
      getPricingForModel: async () => null,
    }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((model) => model.id);
}

test.afterEach(() => clearAllModelLockouts());
test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a model excluded on every connection is absent from the decision catalog", async () => {
  assert.deepEqual(await listed([connection("excluded", { excludedModels: [MODEL] })]), []);
});

test("an eligible sibling keeps a decision model visible", async () => {
  assert.deepEqual(
    await listed([connection("excluded", { excludedModels: [MODEL] }), connection("eligible")]),
    [`openrouter/${MODEL}`]
  );
});

test("current model lockouts filter the catalog using the upstream model id", async () => {
  recordModelLockoutFailure("openrouter", "locked", MODEL, "server_error", 503, 60_000, null, {
    exactCooldownMs: 60_000,
  });
  assert.deepEqual(await listed([connection("locked")]), []);
  assert.deepEqual(await listed([connection("locked"), connection("eligible")]), [
    `openrouter/${MODEL}`,
  ]);
});

test("an unavailable catalog has a bounded account retry budget", async () => {
  let fetches = 0;
  const response = await handleSystemOneModels(
    {},
    {
      listConnections: async () =>
        Array.from({ length: 8 }, (_, index) => connection(`fixture-${index}`)),
      fetchSystemOne: async () => {
        fetches++;
        throw new Error("fixture unavailable");
      },
      getPricingForModel: async () => null,
    }
  );
  assert.equal(response.status, 502);
  assert.equal(fetches, 3);
});
