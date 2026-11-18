/**
 * #18417 — the family-pool readiness gate must bound the *models* a pool can
 * offer, not just the provider ids it lists, and a provider that fails the
 * probe must not stay admitted because a previous build saw it pass.
 *
 * The security review of the open PRs asked for this: ordering, fallback and
 * model overrides may reorder candidates but must never widen the set.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-readiness-scope-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const noAuthReadiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");

const DEVIN = "devin-cli-agentic";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  noAuthReadiness.__resetNoAuthReadinessForTests();
  await settingsDb.updateSettings({ excludeTosAvoid: false });
});

test.after(async () => {
  noAuthReadiness.__resetNoAuthReadinessForTests();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

type ComboModel = { providerId: string; model: string };

async function familyModels(family: string): Promise<ComboModel[]> {
  const combo = await builtinCatalog.createBuiltinAutoCombo(`auto/${family}`, family);
  return combo.models as ComboModel[];
}

function devinModels(models: ComboModel[]): ComboModel[] {
  return models.filter((m) => m.providerId === DEVIN);
}

test("a failed probe keeps the provider's models out of the family pool", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => false);
  const models = await familyModels("claude-sonnet");
  assert.deepEqual(
    devinModels(models),
    [],
    `no model may be offered when the host cannot run it: ${JSON.stringify(devinModels(models))}`
  );
});

test("a passing probe adds those models back", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => true);
  const models = await familyModels("claude-sonnet");
  assert.ok(devinModels(models).length > 0, "a ready provider serves the family");
});

test("flipping the probe back to false removes the models again", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => true);
  assert.ok((await familyModels("claude-sonnet")).some((m) => m.providerId === DEVIN));

  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => false);
  const rebuilt = await familyModels("claude-sonnet");
  assert.deepEqual(
    devinModels(rebuilt),
    [],
    "an earlier passing probe must not keep the provider admitted"
  );
});

test("the regular auto pool is bounded the same way", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => false);
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const models = combo.models as ComboModel[];
  assert.deepEqual(devinModels(models), []);
});
