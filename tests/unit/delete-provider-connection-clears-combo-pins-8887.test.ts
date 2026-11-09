import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-pins-8887-"));

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

type JsonRecord = Record<string, unknown>;

async function resetStorage(): Promise<void> {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      fs.rmSync(TEST_DATA_DIR, {
        recursive: true,
        force: true,

        maxRetries: 5,
        retryDelay: 100,
      });
      break;
    } catch (error: unknown) {
      const code =
        error && typeof error === "object" && "code" in error
          ? String((error as { code?: unknown }).code)
          : "";

      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
        continue;
      }

      throw error;
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, {
    recursive: true,
  });
}

async function createConnection(provider: string, name: string): Promise<string> {
  const connection = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `test-key-${name}`,
  });

  assert.equal(typeof connection.id, "string", "provider fixture must return a connection id");

  return connection.id as string;
}

async function createPinnedCombo(name: string, models: JsonRecord[]): Promise<void> {
  await combosDb.createCombo({
    name,
    strategy: "priority",
    models,
  });
}

async function readModels(name: string): Promise<JsonRecord[]> {
  const combo = await combosDb.getComboByName(name);

  assert.ok(combo, `combo ${name} must still exist`);
  assert.ok(Array.isArray(combo.models), `combo ${name} must retain a models array`);

  return combo.models as JsonRecord[];
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();

  fs.rmSync(TEST_DATA_DIR, {
    recursive: true,
    force: true,

    maxRetries: 5,
    retryDelay: 100,
  });
});

// The deleted connection's pin is deliberately kept. Clearing it turned the step
// into "any account of this provider", so deleting one account silently moved
// that step's traffic onto the survivors. A dead pin cannot resolve: the target
// reports ineligible, the combo moves to its next step, and the dashboard shows
// the account as deleted until the user repoints or removes the step.
test("#8887: single connection delete keeps the deleted step's pin", async () => {
  const doomedId = await createConnection("openai", "single-doomed");
  const survivorId = await createConnection("openai", "single-survivor");

  await createPinnedCombo("single-delete-8887", [
    {
      provider: "openai",
      model: "gpt-5.6-sol",
      connectionId: doomedId,
      allowedConnectionIds: [doomedId, survivorId],
    },
    {
      provider: "openai",
      model: "gpt-5.6-sol",
      connectionId: survivorId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);

  const models = await readModels("single-delete-8887");

  assert.equal(
    models[0].connectionId,
    doomedId,
    "single delete must not unpin the step whose account was removed"
  );
  assert.deepEqual(
    models[0].allowedConnectionIds,
    [survivorId],
    "single delete must still prune the deleted id from allowedConnectionIds"
  );
  assert.equal(
    models[1].connectionId,
    survivorId,
    "single delete must preserve surviving connection pins"
  );
});

test("#8887: bulk connection delete keeps both deleted pins", async () => {
  const doomedA = await createConnection("anthropic", "bulk-doomed-a");
  const doomedB = await createConnection("anthropic", "bulk-doomed-b");
  const survivorId = await createConnection("anthropic", "bulk-survivor");

  await createPinnedCombo("bulk-delete-8887", [
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: doomedA,
      allowedConnectionIds: [doomedA, survivorId],
    },
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: doomedB,
      allowedConnectionIds: [doomedB, survivorId],
    },
    {
      provider: "anthropic",
      model: "claude-sonnet-5",
      connectionId: survivorId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnections([doomedA, doomedB]), 2);

  const models = await readModels("bulk-delete-8887");

  assert.equal(models[0].connectionId, doomedA, "bulk delete must keep the first dead pin");
  assert.equal(models[1].connectionId, doomedB, "bulk delete must keep the second dead pin");
  assert.deepEqual(models[0].allowedConnectionIds, [survivorId]);
  assert.deepEqual(models[1].allowedConnectionIds, [survivorId]);
  assert.equal(models[2].connectionId, survivorId);
});

test("#8887: provider-wide delete keeps that provider's pins and other providers' scope", async () => {
  const doomedA = await createConnection("nvidia", "provider-doomed-a");
  const doomedB = await createConnection("nvidia", "provider-doomed-b");
  const otherProviderId = await createConnection("cerebras", "provider-survivor");

  await createPinnedCombo("provider-delete-8887", [
    {
      provider: "nvidia",
      model: "z-ai/glm-5.2",
      connectionId: doomedA,
      allowedConnectionIds: [doomedA, doomedB, otherProviderId],
    },
    {
      provider: "nvidia",
      model: "deepseek-ai/deepseek-v4-pro",
      connectionId: doomedB,
    },
    {
      provider: "cerebras",
      model: "zai-glm-4.7",
      connectionId: otherProviderId,
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnectionsByProvider("nvidia"), 2);

  const models = await readModels("provider-delete-8887");

  assert.equal(models[0].connectionId, doomedA, "provider delete must keep its first dead pin");
  assert.equal(models[1].connectionId, doomedB, "provider delete must keep its second dead pin");
  assert.deepEqual(
    models[0].allowedConnectionIds,
    [otherProviderId],
    "provider delete must preserve ids belonging to other providers"
  );
  assert.equal(
    models[2].connectionId,
    otherProviderId,
    "provider delete must preserve another provider's direct pin"
  );
});

test("#8887: a scope that loses every id stays restrictive instead of becoming the whole pool", async () => {
  const doomedId = await createConnection("google", "scope-doomed");

  await createPinnedCombo("scope-only-delete-8887", [
    {
      provider: "google",
      model: "gemini-3.8-pro",
      allowedConnectionIds: [doomedId],
    },
  ]);

  assert.equal(await providersDb.deleteProviderConnection(doomedId), true);

  const models = await readModels("scope-only-delete-8887");

  // The step keeps the list naming the dead id. It is still non-empty, so the
  // scope filter runs and matches no connection: the target is ineligible
  // rather than unrestricted. An empty list would mean "whole active pool".
  assert.equal(
    "connectionId" in models[0],
    false,
    "the scope-only fixture must stay unpinned so the allowlist is the only scope"
  );
  assert.deepEqual(
    models[0].allowedConnectionIds,
    [doomedId],
    "an emptied allowlist must not become an unrestricted pool"
  );
});
