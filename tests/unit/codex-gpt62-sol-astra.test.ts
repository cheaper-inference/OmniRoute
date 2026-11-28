import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// GPT-6.2 Sol and GPT-6.2 Astra are live on the Codex OAuth catalog (ChatGPT plans,
// minimal_client_version 0.166.0) and on the OpenAI API. Without catalog, pricing and
// routing rows the bare ids go to metered OpenAI instead of the Codex plan, their
// effort aliases are not recognised, and every request is costed at $0.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-gpt62-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "codex-gpt62-test-secret";

await import("../_helpers/offlineCatalogDiscovery.ts");

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { CODEX_NATIVE_UNPREFIXED_MODELS, getModelInfoCore } =
  await import("../../open-sse/services/model.ts");
const { getProviderModels, getModelTargetFormat } =
  await import("../../open-sse/config/providerModels.ts");
const { getPricingForModel } = await import("../../src/shared/constants/pricing.ts");
const { splitCodexReasoningSuffix, getCodexAliasEffortCap } =
  await import("../../open-sse/executors/codex/reasoningSuffix.ts");
const { isCodexUltrafastModel } = await import("../../open-sse/config/codexServiceTierModels.ts");
const { CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS } =
  await import("../../src/lib/providers/codexFastTier.ts");
const { getModelSpec } = await import("../../src/shared/constants/modelSpecs.ts");
const { DEFAULT_CODEX_CLIENT_VERSION } = await import("../../src/shared/constants/codexClient.ts");

const EFFORTS = ["ultra", "max", "xhigh", "high", "medium", "low"];
const BASES = ["gpt-6.2-sol", "gpt-6.2-astra"] as const;
const idsFor = (base: string) => [base, ...EFFORTS.map((effort) => `${base}-${effort}`)];

async function seedConnection(provider: "codex" | "openai") {
  await providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-gpt62`,
    email: provider === "codex" ? "codex@example.com" : undefined,
    apiKey: provider === "openai" ? "sk-openai-gpt62" : undefined,
    accessToken: provider === "codex" ? "codex-gpt62-access" : undefined,
    isActive: true,
    testStatus: "active",
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-gpt62" } : {},
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

test("the Codex catalog registers GPT-6.2 Sol and Astra with their six effort tiers", () => {
  const codexIds = getProviderModels("codex").map((model) => model.id);
  for (const base of BASES) {
    const registered = codexIds.filter((id) => id === base || id.startsWith(`${base}-`));
    assert.deepEqual(registered.sort(), idsFor(base).sort(), base);
  }
  const sol61 = getProviderModels("codex").find((model) => model.id === "gpt-6.1-sol");
  const sol62 = getProviderModels("codex").find((model) => model.id === "gpt-6.2-sol");
  assert.equal(sol62?.contextLength, sol61?.contextLength);
});

test("every GPT-6.2 Codex id is Codex-native when unprefixed", () => {
  for (const id of BASES.flatMap(idsFor)) {
    assert.equal(CODEX_NATIVE_UNPREFIXED_MODELS.has(id), true, id);
  }
});

test("bare GPT-6.2 ids route to Codex when Codex and OpenAI are both active", async () => {
  await seedConnection("codex");
  await seedConnection("openai");
  for (const id of ["gpt-6.2-sol", "gpt-6.2-sol-ultra", "gpt-6.2-astra", "gpt-6.2-astra-low"]) {
    const info = await getModelInfoCore(id, null);
    assert.equal(info.provider, "codex", id);
    assert.equal(info.model, id);
  }
});

test("bare GPT-6.2 ids stay on OpenAI when no Codex connection is active", async () => {
  await seedConnection("openai");
  for (const id of ["gpt-6.2-sol", "gpt-6.2-astra"]) {
    const info = await getModelInfoCore(id, null);
    assert.equal(info.provider, "openai", id);
    assert.equal(info.model, id);
  }
});

test("the fallback Codex client version is new enough for GPT-6.2", () => {
  // The backend serves gpt-6.2-* only to minimal_client_version 0.166.0 or newer;
  // the fallback is what a caller that sends no Codex version advertises.
  const [major, minor] = DEFAULT_CODEX_CLIENT_VERSION.split(".").map(Number);
  assert.ok(major > 0 || minor >= 166, DEFAULT_CODEX_CLIENT_VERSION);
});

test("GPT-6.2 effort aliases split to their base model, up to ultra", () => {
  for (const base of BASES) {
    assert.deepEqual(splitCodexReasoningSuffix(`${base}-ultra`), {
      baseModel: base,
      effort: "ultra",
    });
    assert.equal(getCodexAliasEffortCap(base), "ultra");
  }
});

test("GPT-6.2 service tiers follow the live Codex catalog", () => {
  assert.equal(isCodexUltrafastModel("gpt-6.2-sol"), true);
  assert.equal(isCodexUltrafastModel("codex/gpt-6.2-sol"), true);
  // gpt-6.2-astra lists only the `priority` (Fast) tier.
  assert.equal(isCodexUltrafastModel("gpt-6.2-astra"), false);
  for (const base of BASES) {
    assert.ok(CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS.includes(base), base);
  }
});

test("GPT-6.2 Sol is priced like GPT-6.1 Sol on the API and on Codex", () => {
  const api61 = getPricingForModel("openai", "gpt-6.1-sol");
  const api62 = getPricingForModel("openai", "gpt-6.2-sol");
  assert.deepEqual(api62, api61);
  for (const id of idsFor("gpt-6.2-sol")) {
    assert.deepEqual(getPricingForModel("cx", id), getPricingForModel("cx", "gpt-6.1-sol"), id);
  }
});

test("GPT-6.2 Astra carries its published price, below GPT-6 Astra", () => {
  const api = getPricingForModel("openai", "gpt-6.2-astra");
  assert.ok(api);
  assert.deepEqual([api.input, api.cached, api.output], [8, 0.4, 40]);
  const astra6 = getPricingForModel("openai", "gpt-6-astra");
  assert.ok(api.input < astra6.input && api.output < astra6.output);
  for (const id of idsFor("gpt-6.2-astra")) {
    const price = getPricingForModel("cx", id);
    assert.ok(price, `cx/${id}`);
    assert.deepEqual([price.input, price.cached, price.output], [8, 0.4, 40], id);
  }
});

test("openai GPT-6.2 models route through Responses with the public 1.05M window", () => {
  for (const id of BASES) {
    assert.equal(getModelTargetFormat("openai", id), "openai-responses", id);
    assert.equal(getModelSpec(id)?.contextWindow, 1050000, id);
  }
});
