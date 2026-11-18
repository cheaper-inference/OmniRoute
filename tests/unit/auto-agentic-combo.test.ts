import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agentic-combo-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auto-agentic-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { parseAutoPrefix } = await import("../../open-sse/services/autoCombo/autoPrefix.ts");
const { parseAutoSuffix, buildAutoCandidateFilter } =
  await import("../../open-sse/services/autoCombo/suffixComposition.ts");
const { createBuiltinAutoCombo, isResolvableBuiltinAutoId } =
  await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const { parseAutoConfig } = await import("../../open-sse/services/combo/autoConfig.ts");
const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedProviders() {
  await settingsDb.updateSettings({ requireLogin: false });
  for (const provider of ["openai", "anthropic", "gemini", "groq", "deepseek"]) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-test-agentic-${provider}`,
      name: `test-agentic-${provider}`,
      isActive: true,
    });
  }
}

test.beforeEach(async () => {
  resetStorage();
  await seedProviders();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("auto/agentic prefix and suffix parsing", () => {
  const prefixRes = parseAutoPrefix("auto/agentic");
  assert.equal(prefixRes.valid, true);
  assert.equal(prefixRes.variant, "agentic");

  const suffixRes = parseAutoSuffix("agentic");
  assert.equal(suffixRes.valid, true);
  assert.equal(suffixRes.category, "agentic");
  assert.equal(suffixRes.tier, undefined);

  const freeSuffixRes = parseAutoSuffix("agentic:free");
  assert.equal(freeSuffixRes.valid, true);
  assert.equal(freeSuffixRes.category, "agentic");
  assert.equal(freeSuffixRes.tier, "free");

  assert.equal(isResolvableBuiltinAutoId("auto/agentic"), true);
  assert.equal(isResolvableBuiltinAutoId("auto/agentic:free"), true);
});

test("auto/agentic materializes with quality-first weights and debugging taskType", async () => {
  const combo = await createBuiltinAutoCombo("auto/agentic", "agentic");
  assert.equal(combo.id, "auto/agentic");
  assert.equal(combo.name, "auto/agentic");
  assert.equal(combo.autoConfig.taskType, "debugging");
  assert.ok(Math.abs(combo.weights.taskFit - 0.5) < 0.01);

  const targets = resolveComboTargets(combo, [combo]);
  const parsed = parseAutoConfig(combo, targets);
  assert.equal(parsed.taskType, "debugging");
  assert.ok(Math.abs(parsed.weights.taskFit - 0.5) < 0.01);
});

test("auto/agentic:free materializes with tier filter and debugging taskType", async () => {
  const combo = await createBuiltinAutoCombo("auto/agentic:free", "agentic:free");
  assert.equal(combo.id, "auto/agentic:free");
  assert.equal(combo.name, "auto/agentic:free");
  assert.equal(combo.autoConfig.taskType, "debugging");
  assert.ok(Math.abs(combo.weights.taskFit - 0.5) < 0.01);

  const filter = buildAutoCandidateFilter("agentic", "free");
  assert.equal(typeof filter, "function");

  const freeCandidate = { provider: "openrouter", model: "qwen/qwen-2.5-coder-32b-instruct:free" };
  const premiumCandidate = { provider: "openai", model: "gpt-4o" };
  assert.equal(filter!(freeCandidate), true);
  assert.equal(filter!(premiumCandidate), false);
});
