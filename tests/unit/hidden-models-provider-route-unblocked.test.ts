/**
 * `GET /api/providers/[id]/models` and model hiding.
 *
 * Default (no flag): the pre-existing contract — callers opt in with `?excludeHidden=true`,
 * everything else still sees hidden rows. `ENFORCE_HIDDEN_MODELS=true` makes hiding a
 * model-level policy for every caller, independently of Security > Blocked Providers.
 * Hiding is written under whatever key the dashboard used (alias like `cmd`, canonical id,
 * compatible-node prefix), so enforcement resolves through the shared hidden lookup rather
 * than a raw provider-id match.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-unblocked-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const modelRouteProjection =
  await import("../../src/app/api/providers/[id]/models/modelRouteProjection.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-hidden-check`,
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  } as never);
}

async function callRoute(connectionId: string, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

async function readIds(response: Response): Promise<string[]> {
  assert.equal(response.status, 200);
  const body = (await response.json()) as { models?: Array<{ id: string }> };
  return (body.models || []).map((model) => model.id);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("ENFORCE_HIDDEN_MODELS=true hides a model from discovery without any query flag", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  assert.ok(baseline.length >= 2, `need at least two catalog models, got: ${baseline.join(", ")}`);

  const [victim, survivor] = baseline;
  modelsDb.setModelIsHidden("command-code", victim, true);

  process.env.ENFORCE_HIDDEN_MODELS = "true";
  try {
    const afterHide = await readIds(await callRoute(connection.id));
    assert.ok(!afterHide.includes(victim), `${victim} must not be listed after hiding`);
    assert.ok(afterHide.includes(survivor), `${survivor} (same provider) must stay visible`);
  } finally {
    delete process.env.ENFORCE_HIDDEN_MODELS;
  }
});

test("hidden model hidden under the provider alias is filtered for the canonical provider id", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  assert.ok(baseline.length >= 1);

  const victim = baseline[0];
  // Dashboard writes the key it rendered; "cmd" is the public alias of "command-code".
  modelsDb.setModelIsHidden("cmd", victim, true);

  process.env.ENFORCE_HIDDEN_MODELS = "true";
  try {
    const ids = await readIds(await callRoute(connection.id));
    assert.ok(!ids.includes(victim), `${victim} hidden under alias "cmd" must not be listed`);
  } finally {
    delete process.env.ENFORCE_HIDDEN_MODELS;
  }
});

test("flag unset keeps the pre-fix contract: hidden rows stay listed without a query flag", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  const victim = baseline[0];
  modelsDb.setModelIsHidden("command-code", victim, true);

  assert.equal(process.env.ENFORCE_HIDDEN_MODELS, undefined);
  const ids = await readIds(await callRoute(connection.id));
  assert.ok(ids.includes(victim), "without enforcement, discovery still lists the hidden row");
});

test("ENFORCE_HIDDEN_MODELS=true enforces and the flag going away restores listing", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  const victim = baseline[0];
  modelsDb.setModelIsHidden("command-code", victim, true);

  process.env.ENFORCE_HIDDEN_MODELS = "true";
  try {
    const enforced = await readIds(await callRoute(connection.id));
    assert.ok(!enforced.includes(victim), "with the flag ON, hidden rows are dropped");
  } finally {
    delete process.env.ENFORCE_HIDDEN_MODELS;
  }

  const restored = await readIds(await callRoute(connection.id));
  assert.ok(restored.includes(victim), "unsetting the flag returns to the opt-in contract");
});
test("includeHidden=true wins even with enforcement on", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  const victim = baseline[0];
  modelsDb.setModelIsHidden("command-code", victim, true);

  process.env.ENFORCE_HIDDEN_MODELS = "true";
  try {
    const ids = await readIds(await callRoute(connection.id, "?includeHidden=true"));
    assert.ok(ids.includes(victim), "config surfaces must still be able to render hidden rows");
  } finally {
    delete process.env.ENFORCE_HIDDEN_MODELS;
  }
});
test("excludeHidden=true stays supported for existing callers", async () => {
  const connection = await seedConnection("command-code");
  const baseline = await readIds(await callRoute(connection.id));
  const victim = baseline[0];
  modelsDb.setModelIsHidden("command-code", victim, true);

  const ids = await readIds(await callRoute(connection.id, "?excludeHidden=true"));
  assert.ok(!ids.includes(victim));
});

test("no-auth provider projection drops hidden models without the opt-in flag", async () => {
  const provider = "reka";
  const before = await modelRouteProjection.buildNoAuthModelsResponse(
    provider,
    `conn-${provider}`,
    true,
    true
  );
  const beforeBody = (await before.json()) as { models?: Array<{ id: string }> };
  const ids = (beforeBody.models || []).map((model) => model.id);
  assert.ok(ids.length >= 1, `${provider} should expose a local catalog`);

  const victim = ids[0];
  modelsDb.setModelIsHidden(provider, victim, true);

  const after = await modelRouteProjection.buildNoAuthModelsResponse(
    provider,
    `conn-${provider}`,
    true,
    true
  );
  const afterBody = (await after.json()) as { models?: Array<{ id: string }> };
  const afterIds = (afterBody.models || []).map((model) => model.id);
  assert.ok(!afterIds.includes(victim), `${victim} must not be listed for a no-auth provider`);
});
