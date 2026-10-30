import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-sol-paid-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "codex-sol-paid-routing-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const eligibility = await import("../../open-sse/services/codexPlanEligibility.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCodex(plan: string, priority: number) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: `${plan}-${priority}@example.com`,
    accessToken: `${plan}-${priority}-access`,
    refreshToken: `${plan}-${priority}-refresh`,
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: { chatgptPlanType: plan },
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Sol model detection covers every Codex Sol tier and provider prefix", () => {
  for (const model of [
    "gpt-5.6-sol",
    "gpt-5.6-sol-ultra",
    "gpt-6-sol",
    "gpt-6-sol-low",
    "gpt-6.1-sol",
    "gpt-6.1-sol-high",
    "codex/gpt-6.1-sol-low",
    "cx/gpt-6-sol(max)",
    "gpt-5.6-sol-max",
    "gpt-5.6-sol-xhigh",
    "gpt-5.6-sol-high",
    "gpt-5.6-sol-medium",
    "gpt-5.6-sol-low",
    "codex/gpt-5.6-sol-high",
    "cx/gpt-5.6-sol",
    "gpt-5.6-sol(ultra)",
  ]) {
    assert.equal(eligibility.isCodexSolModel(model), true, model);
  }
  for (const model of ["gpt-5.6-terra", "gpt-5.6-luna", "gpt-6-luna", "gpt-6-astra", "gpt-5.5", null]) {
    assert.equal(eligibility.isCodexSolModel(model), false, String(model));
  }
});

test("paid-only model detection covers Astra and Sol across GPT-6 tiers", () => {
  for (const model of [
    "gpt-5.6-sol", "gpt-6-sol", "gpt-6.1-sol",
    "gpt-6-astra", "gpt-6.1-astra",
    "codex/gpt-6-astra-low", "cx/gpt-6.1-astra(max)",
    "gpt-6.1-sol(ultra)", "gpt-6-astra-xhigh",
  ]) {
    assert.equal(eligibility.isCodexPaidOnlyModel(model), true, model);
  }
  for (const model of [
    "gpt-6-luna", "codex/gpt-6-luna-low", "gpt-5.6-terra",
    "gpt-6.1", "gpt-6-astra-unknown", null,
  ]) {
    assert.equal(eligibility.isCodexPaidOnlyModel(model), false, String(model));
  }
});

test("Sol allows paid Codex plans and fails closed for free, go, or unknown", () => {
  for (const model of ["gpt-5.6-sol-high", "gpt-6-sol-low", "codex/gpt-6.1-sol-high", "gpt-6-astra", "cx/gpt-6.1-astra(max)"]) {
    for (const plan of ["plus", "pro", "team", "business", "enterprise", "edu"]) {
      assert.equal(eligibility.isCodexPlanEligibleForModel({ chatgptPlanType: plan }, model), true, model + " / " + plan);
    }
    for (const plan of ["free", "go", "unknown", ""]) {
      assert.equal(eligibility.isCodexPlanEligibleForModel({ chatgptPlanType: plan }, model), false, model + " / " + plan);
    }
    assert.equal(eligibility.isCodexPlanEligibleForModel({}, model), false, model + " / missing plan");
  }
  assert.equal(eligibility.isCodexPlanEligibleForModel({}, "gpt-5.6-terra"), true);
  assert.equal(eligibility.isCodexPlanEligibleForModel({}, "gpt-6-luna-low"), true);
});

test("credential routing skips free Codex accounts for Sol", async () => {
  const free = await seedCodex("free", 1);
  const plus = await seedCodex("plus", 2);

  for (const model of ["gpt-5.6-sol-high", "gpt-6-sol-medium", "gpt-6.1-sol-low", "gpt-6-astra-low"]) {
    const selected = await auth.getProviderCredentials("codex", null, null, model);
    assert.equal(selected?.connectionId, plus.id, model);
    assert.notEqual(selected?.connectionId, free.id, model);
  }
});

test("free Codex accounts remain eligible for Terra and Luna", async () => {
  const free = await seedCodex("free", 1);
  await seedCodex("plus", 2);

  const terra = await auth.getProviderCredentials("codex", null, [free.id], "gpt-5.6-terra");
  const luna = await auth.getProviderCredentials("codex", null, [free.id], "gpt-5.6-luna");

  assert.equal(terra.connectionId, free.id);
  assert.equal(luna.connectionId, free.id);
});

test("a Sol request constrained to only free Codex accounts returns no credentials", async () => {
  const free = await seedCodex("free", 1);
  await seedCodex("plus", 2);

  for (const model of ["gpt-5.6-sol", "gpt-6-sol", "gpt-6.1-sol", "gpt-6-astra-low"]) {
    const selected = await auth.getProviderCredentials("codex", null, [free.id], model);
    assert.equal(selected, null, model);
  }
});
