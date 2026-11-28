import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// gpt-6-sol, gpt-6-luna and gpt-6.1-terra are Codex-native models (openai/codex
// models.json lists them with visibility "list"), like gpt-6-astra and gpt-6.1-sol.
// gpt-6.1-terra had no Codex registry entry, and none of the three families was in
// CODEX_NATIVE_UNPREFIXED_MODELS, so with a Codex and an OpenAI connection both active
// a bare id went to metered OpenAI instead of the Codex plan.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-gpt6-family-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-gpt6-family-test-secret";

await import("../_helpers/offlineCatalogDiscovery.ts");

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { CODEX_NATIVE_UNPREFIXED_MODELS, getModelInfoCore } =
  await import("../../open-sse/services/model.ts");
const { getProviderModels } = await import("../../open-sse/config/providerModels.ts");

const CODEX_IDS = getProviderModels("codex").map((model) => model.id);
const FAMILIES = {
  "gpt-6-sol": ["ultra", "max", "xhigh", "high", "medium", "low"],
  "gpt-6-luna": ["max", "xhigh", "high", "medium", "low"],
  "gpt-6.1-terra": ["ultra", "max", "xhigh", "high", "medium", "low"],
} as const;

function familyIds(base: string, efforts: readonly string[]): string[] {
  return [base, ...efforts.map((effort) => `${base}-${effort}`)];
}

async function seedConnection(provider: "codex" | "openai") {
  await providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-gpt6-family`,
    email: provider === "codex" ? "codex@example.com" : undefined,
    apiKey: provider === "openai" ? "sk-openai-gpt6-family" : undefined,
    accessToken: provider === "codex" ? "codex-gpt6-family-access" : undefined,
    isActive: true,
    testStatus: "active",
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-gpt6-family" } : {},
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the Codex catalog registers gpt-6.1-terra and its six effort tiers", () => {
  for (const id of familyIds("gpt-6.1-terra", FAMILIES["gpt-6.1-terra"])) {
    assert.ok(CODEX_IDS.includes(id), `codex catalog must list ${id}`);
  }
});

test("every GPT-6 Sol, GPT-6 Luna and GPT-6.1 Terra Codex id is Codex-native when unprefixed", () => {
  for (const [base, efforts] of Object.entries(FAMILIES)) {
    for (const id of familyIds(base, efforts)) {
      assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), true, id);
    }
  }
});

test("bare gpt-6-sol, gpt-6-luna and gpt-6.1-terra route to Codex when Codex and OpenAI are both active", async () => {
  await seedConnection("codex");
  await seedConnection("openai");

  for (const id of ["gpt-6-sol", "gpt-6-luna-max", "gpt-6.1-terra", "gpt-6.1-terra-ultra"]) {
    const info = await getModelInfoCore(id, null);
    assert.equal(info.provider, "codex", id);
    assert.equal(info.model, id);
  }
});

test("bare gpt-6-sol stays on OpenAI when no Codex connection is active", async () => {
  await seedConnection("openai");

  const info = await getModelInfoCore("gpt-6-sol", null);
  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-6-sol");
});
