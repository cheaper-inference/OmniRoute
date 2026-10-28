import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const directory = mkdtempSync(join(tmpdir(), "family-wire-16227-"));
const previousEnvironment = {
  DATA_DIR: process.env.DATA_DIR,
  MEMORY_STATIC_CACHE_DIR: process.env.MEMORY_STATIC_CACHE_DIR,
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
};
process.env.DATA_DIR = directory;
process.env.MEMORY_STATIC_CACHE_DIR = join(directory, "memory-cache");
process.env.OMNIROUTE_PLUGINS_DIR = join(directory, "plugins");
process.env.API_KEY_SECRET = "wire-lockout-16227-fixture-only";

const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Unexpected network request in the local wire-lockout regression");
};

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const locks = await import("../../open-sse/services/accountFallback.ts");
const family = await import("../../open-sse/services/modelFamilyFallback.ts");

test.after(() => {
  locks.clearAllModelLockouts();
  core.resetDbInstance();
  globalThis.fetch = originalFetch;
  for (const [name, value] of Object.entries(previousEnvironment)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  rmSync(directory, { recursive: true, force: true });
});

test("family fallback skips a sibling locked by a real Anthropic404 under its dashed wire ID", async () => {
  const connection = await providers.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    apiKey: "selected-account-fixture-only",
    isActive: true,
    testStatus: "active",
  });
  const otherConnection = await providers.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    apiKey: "other-account-fixture-only",
    isActive: true,
    testStatus: "active",
  });
  const next = () =>
    family.getNextEligibleFamilyFallback(
      "anthropic/claude-opus-5",
      new Set(["anthropic/claude-opus-5"]),
      "anthropic",
      connection.id
    );
  const errorBody = JSON.stringify({
    error: { type: "not_found_error", message: "model: claude-opus-4-8" },
  });

  assert.equal(next(), "anthropic/claude-opus-4.8", "unlocked sibling control");
  await auth.markAccountUnavailable(
    otherConnection.id,
    404,
    errorBody,
    "anthropic",
    "claude-opus-4-8"
  );
  assert.equal(locks.isModelLocked("anthropic", otherConnection.id, "claude-opus-4-8"), true);
  assert.equal(next(), "anthropic/claude-opus-4.8", "another account's lock must not apply");

  await auth.markAccountUnavailable(connection.id, 404, errorBody, "anthropic", "claude-opus-4-8");
  assert.equal(
    locks.isModelLocked("anthropic", connection.id, "claude-opus-4-8"),
    true,
    "the actual wire model must really be locked on the selected connection"
  );
  const stored = await providers.getProviderConnectionById(connection.id);
  assert.equal(stored.testStatus, "active", "a model404 must preserve account health");
  assert.ok(!stored.rateLimitedUntil, "a model404 must not cool the whole account");
  assert.equal(
    next(),
    "anthropic/claude-opus-4.7",
    "the locked wire alias must be excluded from family dispatch"
  );
});
