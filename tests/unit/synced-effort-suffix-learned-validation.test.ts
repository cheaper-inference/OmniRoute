/**
 * C1 — the `-<tier>` suffix resolver validates against the EFFECTIVE tier set
 * (learned ?? sync), not raw synced metadata. Without this, the catalog
 * advertises <alias>/<model>-max (learned set) but dispatch refuses to strip
 * `-max` because sync metadata lacks the tier — dead-on-arrival variant.
 * Harness mirrors deepseek-thinking-efforts.test.ts (custom provider +
 * persistDiscoveredModels + async getModelInfo).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-c1-effort-dispatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "c1-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelDiscovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { recordLearnedReasoningEffort, __test_resetLearnedReasoningEffortCaps } =
  await import("@omniroute/open-sse/services/learnedReasoningEffortCaps.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

const PROVIDER = "c1prov";
const MODEL_ID = "c1-model";
const PROVIDER2 = "c2prov";
const MODEL_NO_TIERS = "c2-model";

async function seed() {
  const connection = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "c1-runtime-efforts",
    apiKey: `${PROVIDER}-key`,
    isActive: true,
    testStatus: "active",
  });
  // Sync tiers deliberately EXCLUDE max — only the learned set will vouch for it.
  await modelDiscovery.persistDiscoveredModels(PROVIDER, connection.id, [
    { id: MODEL_ID, reasoning: { supported_efforts: ["none", "low", "medium", "high"] } },
  ]);
  const connection2 = await providersDb.createProviderConnection({
    provider: PROVIDER2,
    authType: "apikey",
    name: "c2-no-declared-tiers",
    apiKey: `${PROVIDER2}-key`,
    isActive: true,
    testStatus: "active",
  });
  // A synced model with no reasoning metadata carries no supportedThinkingEfforts,
  // plus a listed row whose real id ends in a tier token.
  await modelDiscovery.persistDiscoveredModels(PROVIDER2, connection2.id, [
    { id: MODEL_NO_TIERS },
    { id: `${MODEL_NO_TIERS}-low`, name: "Literal low model" },
  ]);
}

test.beforeEach(async () => {
  __test_resetLearnedReasoningEffortCaps();
  await resetStorage();
  await seed();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("-max resolves once the learned set advertises it (sync metadata does not)", async () => {
  // Real record path, executor-style CONNECTION key — NOT the provider alias.
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", MODEL_ID, ["low", "high", "max"]);
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-max`);
  assert.equal(info.provider, PROVIDER);
  assert.equal(info.model, MODEL_ID);
  assert.equal(info.resolvedThinkingEffort, "max");
});

test("-medium still resolves via sync tiers even before anything is learned", async () => {
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-medium`);
  assert.equal(info.model, MODEL_ID);
  assert.equal(info.resolvedThinkingEffort, "medium");
});

test("a tier neither learned nor synced is left untouched (literal id)", async () => {
  recordLearnedReasoningEffort("conn-a", MODEL_ID, ["low"]);
  const info = await getModelInfo(`${PROVIDER}/${MODEL_ID}-ultra`);
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("strips a learned-only tier suffix when the synced model declares no tiers", async () => {
  recordLearnedReasoningEffort("c2-learn-conn", MODEL_NO_TIERS, ["low", "medium", "xhigh"]);
  const info = await getModelInfo(`${PROVIDER2}/${MODEL_NO_TIERS}-xhigh`);
  assert.equal(info.provider, PROVIDER2);
  assert.equal(info.model, MODEL_NO_TIERS);
  assert.equal(info.resolvedThinkingEffort, "xhigh");
});

test("leaves the variant id untouched when nothing was learned for a tier-less model", async () => {
  const info = await getModelInfo(`${PROVIDER2}/${MODEL_NO_TIERS}-xhigh`);
  assert.equal(info.model, `${MODEL_NO_TIERS}-xhigh`);
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("leaves a listed model id ending in a tier token untouched even with learned tiers for the base", async () => {
  recordLearnedReasoningEffort("c2-learn-conn", MODEL_NO_TIERS, ["low", "medium", "xhigh"]);
  const info = await getModelInfo(`${PROVIDER2}/${MODEL_NO_TIERS}-low`);
  assert.equal(info.model, `${MODEL_NO_TIERS}-low`);
  assert.equal(info.resolvedThinkingEffort, undefined);
});

test("strips a learned-only tier suffix for a registry model without declared tiers", async () => {
  recordLearnedReasoningEffort("registry-learn-conn", "gpt-5", ["low"]);
  const info = await getModelInfo("aimlapi/gpt-5-low");
  assert.equal(info.model, "gpt-5");
  assert.equal(info.resolvedThinkingEffort, "low");
});
