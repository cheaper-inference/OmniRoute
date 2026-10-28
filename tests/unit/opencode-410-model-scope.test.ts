import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-410-model-scope-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "opencode-410-model-scope-test-secret";

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

const DEAD_MODEL = "mimo-v2.5-free";
const HEALTHY_MODEL = "mimo-v2.6-flash-free";

// OpenCode Zen answers a retired free model with a 410 whose body names the
// model and points at its successor (observed on the live Zen API).
const GONE_BODY = "Model mimo-v2.5-free has been deprecated. Use mimo-v2.6-flash-free instead.";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOpencodeConnection(provider: string, name: string) {
  return providersDb.createProviderConnection({
    provider,
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

test("OpenCode 410 on a retired model stays model-scoped and leaves the connection usable", async () => {
  const connection = await seedOpencodeConnection("opencode-zen", "opencode-410-model-scope");

  assert.equal(
    fallback.hasPerModelQuota("opencode-zen", DEAD_MODEL),
    true,
    "OpenCode Zen must use per-model failure scoping (one credential fronts many models)"
  );

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    GONE_BODY,
    "opencode-zen",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "410 for one retired OpenCode model must not apply a connection-wide cooldown"
  );

  assert.equal(
    after?.testStatus,
    "active",
    "410 for one retired OpenCode model must leave the OpenCode connection active"
  );

  assert.equal(
    fallback.isModelLocked("opencode-zen", connection.id, DEAD_MODEL),
    true,
    "the retired model itself should be locked"
  );

  await assertLockBoundedByMaxCooldown(
    "opencode-zen",
    connection.id,
    DEAD_MODEL,
    result.cooldownMs
  );

  assert.equal(
    fallback.isModelLocked("opencode-zen", connection.id, HEALTHY_MODEL),
    false,
    "a healthy sibling OpenCode model must remain unlocked"
  );

  const healthyCredentials = await auth.getProviderCredentials(
    "opencode-zen",
    null,
    null,
    HEALTHY_MODEL
  );

  assert.equal(
    healthyCredentials?.connectionId,
    connection.id,
    "the same OpenCode connection must remain selectable for healthy sibling models"
  );
});

test("OpenCode 410 without a model name in the body still locks only that model", async () => {
  const connection = await seedOpencodeConnection("opencode-zen", "opencode-410-bare-body");

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "opencode-zen",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.equal(
    after?.rateLimitedUntil ?? null,
    null,
    "a body-less 410 must not cool the whole OpenCode connection either"
  );

  assert.equal(after?.testStatus, "active", "the connection must stay active for sibling models");

  assert.equal(
    fallback.isModelLocked("opencode-zen", connection.id, DEAD_MODEL),
    true,
    "the retired model should be locked even when the body names no model"
  );

  await assertLockBoundedByMaxCooldown(
    "opencode-zen",
    connection.id,
    DEAD_MODEL,
    result.cooldownMs
  );
});

test("other per-model providers retain existing 410 connection scope", async () => {
  assert.equal(
    fallback.hasPerModelQuota("gemini", DEAD_MODEL),
    true,
    "Gemini provides a non-OpenCode per-model control case"
  );

  const connection = await seedOpencodeConnection("gemini", "gemini-410-control");

  const result = await auth.markAccountUnavailable(
    connection.id,
    410,
    "Gone",
    "gemini",
    DEAD_MODEL
  );

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(connection.id);

  assert.ok(
    after?.rateLimitedUntil,
    "410 must remain connection-scoped for per-model providers without an explicit 410 contract"
  );

  assert.equal(
    after?.testStatus,
    "unavailable",
    "the OpenCode-specific 410 fix must not change other provider semantics"
  );

  assert.equal(
    fallback.isModelLocked("gemini", connection.id, DEAD_MODEL),
    false,
    "a generic per-model provider must not inherit the OpenCode 410 model lock"
  );
});
