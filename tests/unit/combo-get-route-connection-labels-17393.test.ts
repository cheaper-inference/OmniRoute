/**
 * #17393 — GET /api/combos/[id] ships `connectionLabels` next to the combo row so
 * the Combo Control Center can name the account each target is pinned to.
 *
 * The labels are cosmetic: a failed lookup must degrade to `{}` instead of
 * turning the whole combo read into a 500, and an unknown id keeps its 404.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-get-labels-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

function getRequest(id: string) {
  return comboRoute.GET(new Request(`http://localhost/api/combos/${id}`), {
    params: Promise.resolve({ id }),
  });
}

async function createPinnedCombo(name: string, connectionId: string) {
  const combo = (await combosDb.createCombo({
    name,
    strategy: "priority",
    models: [
      {
        id: `${name}-step`,
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-5-codex",
        connectionId,
        weight: 0,
      },
    ],
  } as never)) as { id: string };
  return combo;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("GET returns the combo with the pinned account names in connectionLabels", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    apiKey: "sk-get-route-labels",
  });
  const combo = await createPinnedCombo("labels-get", connection.id as string);

  const response = await getRequest(combo.id);
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    id: string;
    name: string;
    connectionLabels?: Record<string, string>;
  };
  assert.equal(body.id, combo.id);
  assert.equal(body.name, "labels-get");
  assert.deepEqual(body.connectionLabels, { [connection.id as string]: "Primary" });
});

test("GET keeps the 404 for an unknown combo id", async () => {
  const response = await getRequest("does-not-exist");
  assert.equal(response.status, 404);
});

test("GET falls back to empty connectionLabels when the account lookup fails", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Secondary",
    apiKey: "sk-get-route-labels-failure",
  });
  const combo = await createPinnedCombo("labels-get-failure", connection.id as string);

  // Make the label query throw: the combo row itself is still readable.
  const db = core.getDbInstance();
  db.exec("ALTER TABLE provider_connections RENAME TO provider_connections_hidden_17393");
  try {
    const response = await getRequest(combo.id);
    assert.equal(response.status, 200, "a failed label lookup must not become a 500");
    const body = (await response.json()) as {
      id: string;
      connectionLabels?: Record<string, string>;
    };
    assert.equal(body.id, combo.id);
    assert.deepEqual(body.connectionLabels, {});
  } finally {
    db.exec("ALTER TABLE provider_connections_hidden_17393 RENAME TO provider_connections");
  }
});
