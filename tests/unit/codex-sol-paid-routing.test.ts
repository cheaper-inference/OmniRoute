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

async function seedCodex(plan: string | null, priority: number, rateLimitedUntil?: string) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: `${plan ?? "noplan"}-${priority}@example.com`,
    accessToken: `${plan ?? "noplan"}-${priority}-access`,
    refreshToken: `${plan ?? "noplan"}-${priority}-refresh`,
    isActive: true,
    testStatus: "active",
    priority,
    rateLimitedUntil: rateLimitedUntil ?? null,
    providerSpecificData: plan === null ? {} : { chatgptPlanType: plan },
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
    "gpt-6-sol-none",
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
  for (const model of [
    "gpt-5.6-terra",
    "gpt-5.6-luna",
    "gpt-6-luna",
    "gpt-6-astra",
    "gpt-5.5",
    null,
  ]) {
    assert.equal(eligibility.isCodexSolModel(model), false, String(model));
  }
});

test("paid-only model detection covers Astra and Sol across GPT-6 tiers", () => {
  for (const model of [
    "gpt-5.6-sol",
    "gpt-6-sol",
    "gpt-6.1-sol",
    "gpt-6-astra",
    "gpt-6.1-astra",
    "gpt-6-astra-none",
    "codex/gpt-6-astra-low",
    "cx/gpt-6.1-astra(max)",
    "gpt-6.1-sol(ultra)",
    "gpt-6-astra-xhigh",
  ]) {
    assert.equal(eligibility.isCodexPaidOnlyModel(model), true, model);
  }
  for (const model of [
    "gpt-6-luna",
    "codex/gpt-6-luna-low",
    "gpt-5.6-terra",
    "gpt-6.1",
    "gpt-6-astra-unknown",
    null,
  ]) {
    assert.equal(eligibility.isCodexPaidOnlyModel(model), false, String(model));
  }
});

test("Sol allows paid Codex plans and blocks recorded free or go plans", () => {
  for (const model of [
    "gpt-5.6-sol-high",
    "gpt-6-sol-low",
    "codex/gpt-6.1-sol-high",
    "gpt-6-astra",
    "cx/gpt-6.1-astra(max)",
  ]) {
    for (const plan of [
      "plus",
      "pro",
      "prolite",
      "promax",
      "team",
      "business",
      "enterprise",
      "edu",
    ]) {
      assert.equal(
        eligibility.isCodexPlanEligibleForModel({ chatgptPlanType: plan }, model),
        true,
        model + " / " + plan
      );
    }
    for (const plan of ["free", "go", "Free", "chatgpt_free"]) {
      assert.equal(
        eligibility.isCodexPlanEligibleForModel({ chatgptPlanType: plan }, model),
        false,
        model + " / " + plan
      );
    }
    // Older or imported connections carry no recorded plan: they keep paid-only models (fail open).
    for (const plan of ["unknown", "", "   "]) {
      assert.equal(
        eligibility.isCodexPlanEligibleForModel({ chatgptPlanType: plan }, model),
        true,
        model + " / " + JSON.stringify(plan)
      );
    }
    assert.equal(
      eligibility.isCodexPlanEligibleForModel({}, model),
      true,
      model + " / missing plan"
    );
    assert.equal(
      eligibility.isCodexPlanEligibleForModel(null, model),
      true,
      model + " / no provider data"
    );
  }
  assert.equal(eligibility.isCodexPlanEligibleForModel({}, "gpt-5.6-terra"), true);
  assert.equal(eligibility.isCodexPlanEligibleForModel({}, "gpt-6-luna-low"), true);
});

test("credential routing skips free Codex accounts for Sol", async () => {
  const free = await seedCodex("free", 1);
  const plus = await seedCodex("plus", 2);

  for (const model of [
    "gpt-5.6-sol-high",
    "gpt-6-sol-medium",
    "gpt-6-sol-none",
    "gpt-6.1-sol-low",
    "gpt-6-astra-low",
  ]) {
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

test("Codex Pro Lite and Pro Max connections can serve paid-only models", async () => {
  const proLite = await seedCodex("prolite", 1);
  const proMax = await seedCodex("promax", 2);
  for (const [connection, model] of [
    [proLite, "gpt-6-sol-none"],
    [proMax, "gpt-6-astra-high"],
  ] as const) {
    const selected = await auth.getProviderCredentials("codex", null, [connection.id], model);
    assert.equal(selected?.connectionId, connection.id, model);
  }
});

test("a cooling Free account cannot produce a false Sol retry-after", async () => {
  const free = await seedCodex("free", 1, new Date(Date.now() + 60_000).toISOString());
  const selected = await auth.getProviderCredentials("codex", null, [free.id], "gpt-6-sol-none");
  assert.equal(selected, null);
});

test("a Codex account without a recorded plan still serves paid-only models (fail open)", async () => {
  const legacy = await seedCodex(null, 1);
  for (const model of ["gpt-6-sol-none", "gpt-6.1-astra"]) {
    const selected = await auth.getProviderCredentials("codex", null, [legacy.id], model);
    assert.equal(selected?.connectionId, legacy.id, model);
  }
});

test("plan gate helpers only narrow Codex pools for paid-only models", () => {
  const free = { id: "free", providerSpecificData: { chatgptPlanType: "free" } };
  const plus = { id: "plus", providerSpecificData: { chatgptPlanType: "plus" } };
  const legacy = { id: "legacy", providerSpecificData: undefined };
  const pool = [free, plus, legacy];

  assert.deepEqual(
    eligibility.filterCodexPlanEligible("codex", pool, "gpt-6-sol-high").map((c) => c.id),
    ["plus", "legacy"]
  );
  assert.deepEqual(eligibility.filterCodexPlanEligible("codex", pool, "gpt-6-luna"), pool);
  assert.deepEqual(eligibility.filterCodexPlanEligible("codex", pool, null), pool);
  assert.deepEqual(eligibility.filterCodexPlanEligible("openai", pool, "gpt-6-sol-high"), pool);

  assert.equal(
    eligibility.isConnectionPlanEligible("codex", free.providerSpecificData, "gpt-6-sol"),
    false
  );
  assert.equal(
    eligibility.isConnectionPlanEligible("openai", free.providerSpecificData, "gpt-6-sol"),
    true
  );
  assert.equal(
    eligibility.isConnectionPlanEligible("codex", free.providerSpecificData, undefined),
    true
  );
});

test("isCodexPoolPlanIneligibleForModel reports pools made only of Free/Go accounts", async () => {
  assert.equal(await auth.isCodexPoolPlanIneligibleForModel("gpt-6-sol"), false, "empty pool");

  const free = await seedCodex("free", 1);
  const go = await seedCodex("go", 2);
  assert.equal(await auth.isCodexPoolPlanIneligibleForModel("codex/gpt-5.6-sol"), true);
  assert.equal(await auth.isCodexPoolPlanIneligibleForModel("gpt-6-luna"), false, "not paid-only");

  const plus = await seedCodex("plus", 3);
  assert.equal(await auth.isCodexPoolPlanIneligibleForModel("gpt-6-sol"), false, "mixed pool");
  assert.equal(
    await auth.isCodexPoolPlanIneligibleForModel("gpt-6-sol", [free.id, go.id]),
    true,
    "key restricted to Free/Go accounts"
  );
  assert.equal(
    await auth.isCodexPoolPlanIneligibleForModel("gpt-6-sol", [free.id, plus.id]),
    false,
    "key that still reaches a paid account"
  );
});
