import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-cloudflare-ai-410-model-scope-")
);

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "cloudflare-ai-410-model-scope-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const modelLockoutSettings = await import("../../src/lib/resilience/modelLockoutSettings.ts");

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// The retired-model lock must be bounded by the operator's model-lockout cap
// (mlSettings.maxCooldownMs, ~30min by default), not the old 24h connection cooldown.
async function assertLockBoundedByMaxCooldown(
  provider: string,
  connectionId: string,
  model: string,
  cooldownMs: number | undefined
) {
  const { maxCooldownMs } = modelLockoutSettings.resolveModelLockoutSettings(
    await readCache.getCachedSettings()
  );
  const lock = fallback.getModelLockoutInfo(provider, connectionId, model);

  assert.ok(lock, "the retired model must hold an active lock");
  assert.ok(lock.remainingMs > 0, "the retired model lock must still be active");
  // remainingMs is measured after the lock was created, so it can only shrink: no slack needed.
  assert.ok(
    lock.remainingMs <= maxCooldownMs,
    `lock must be bounded by maxCooldownMs (${maxCooldownMs}ms), got ${lock.remainingMs}ms`
  );
  assert.ok(
    lock.remainingMs < ONE_DAY_MS,
    "lock must be far below the old 24h connection cooldown"
  );
  assert.ok(
    typeof cooldownMs === "number" && cooldownMs > 0 && cooldownMs <= maxCooldownMs,
    `reported cooldown must be bounded by maxCooldownMs (${maxCooldownMs}ms), got ${cooldownMs}ms`
  );
}

// #21202: Cloudflare Workers AI retired @cf/nvidia/nemotron-3-120b-a12b and
// answers 410 Gone for it, while every sibling model still works upstream.
const DEAD_MODEL = "@cf/nvidia/nemotron-3-120b-a12b";
const HEALTHY_MODEL = "@cf/openai/gpt-oss-120b";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCloudflareConnection(name: string) {
  return providersDb.createProviderConnection({
    provider: "cloudflare-ai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Cloudflare AI 410 on a retired model stays model-scoped and leaves the connection usable", async () => {
  const connection = await seedCloudflareConnection("cloudflare-ai-410-model-scope");

  assert.equal(
    fallback.hasPerModelQuota("cloudflare-ai", DEAD_MODEL),
    false,
    "Cloudflare AI is not a per-model quota provider — the 410 must be model-scoped anyway"
  );

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "cloudflare-ai",
    DEAD_MODEL
  );

  assert.equal(
    result.shouldFallback,
    false,
    "a retired model is retired for every account, so the first 410 must not walk sibling accounts"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired Cloudflare AI model must not apply a connection-wide cooldown"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired Cloudflare AI model must leave the connection active"
  );

  assert.equal(
    fallback.isModelLocked("cloudflare-ai", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  await assertLockBoundedByMaxCooldown(
    "cloudflare-ai",
    connection.id,
    DEAD_MODEL,
    result.cooldownMs
  );

  assert.equal(
    fallback.isModelLocked("cloudflare-ai", connection.id, HEALTHY_MODEL),
    false,
    "a healthy sibling Cloudflare AI model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials(
    "cloudflare-ai",
    null,
    null,
    HEALTHY_MODEL
  );

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same Cloudflare AI connection must remain selectable for healthy sibling models"
  );
});

test("Cloudflare AI 410 with retired wording still locks only that model", async () => {
  const connection = await seedCloudflareConnection("cloudflare-ai-410-retired-wording");

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Model @cf/nvidia/nemotron-3-120b-a12b has been retired.",
    "cloudflare-ai",
    DEAD_MODEL
  );

  assert.equal(
    result.shouldFallback,
    false,
    "a retired model is retired for every account, so the first 410 must not walk sibling accounts"
  );

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "a retired-wording 410 must not cool the whole Cloudflare AI connection either"
  );

  assert.equal(after?.testStatus, "active", "the connection must stay active for sibling models");

  assert.equal(
    fallback.isModelLocked("cloudflare-ai", connection.id, DEAD_MODEL),
    true,
    "the retired model should be locked even when the body names the model"
  );

  await assertLockBoundedByMaxCooldown(
    "cloudflare-ai",
    connection.id,
    DEAD_MODEL,
    result.cooldownMs
  );
});
