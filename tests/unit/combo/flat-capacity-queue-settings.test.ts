import test from "node:test";
import assert from "node:assert/strict";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { cleanup } = createTempDataDir("capacity-queue-settings-");
const manager = await import("../../../open-sse/services/rateLimitManager.ts");
const leaf = await import("../../../open-sse/services/rateLimitManager/queueSettings.ts");
const { DEFAULT_RESILIENCE_SETTINGS } = await import("../../../src/lib/resilience/settings.ts");
test.after(async () => {
  await manager.__resetRateLimitManagerForTests();
  await cleanup();
});
test.afterEach(async () => {
  leaf.connectionRateLimitOverrides.clear();
  await manager.applyRequestQueueSettings({ ...DEFAULT_RESILIENCE_SETTINGS.requestQueue });
  await manager.__resetRateLimitManagerForTests();
});
test("leaf and public queue resolver share live replacement settings and override identity", async () => {
  assert.equal(manager.resolveRequestQueueMaxWaitMs, leaf.resolveRequestQueueMaxWaitMs);
  const next = {
    ...DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    maxWaitMs: 1234,
    executionMaxWaitMs: 5678,
  };
  const pending = manager.applyRequestQueueSettings(next);
  assert.notEqual(leaf.requestQueueState.settings, next);
  assert.equal(
    leaf.resolveRequestQueueMaxWaitMs("fixture"),
    1234,
    "settings publish before async DB read"
  );
  await pending;
  manager.refreshConnectionRateLimits("fixture", { maxWaitMs: 13, executionMaxWaitMs: 17 });
  assert.equal(leaf.connectionRateLimitOverrides.get("fixture")?.maxWaitMs, 13);
  assert.equal(manager.resolveExecutionMaxWaitMs("fixture"), 17);
  assert.equal(
    leaf.resolveRequestQueueMaxWaitMs("maxai", undefined, "fixture"),
    13,
    "positive override beats provider floor"
  );
  manager.refreshConnectionRateLimits("fixture", { maxWaitMs: 0 });
  assert.equal(leaf.resolveRequestQueueMaxWaitMs(" mx ", 12, "fixture"), 300000);
  assert.equal(leaf.resolveRequestQueueMaxWaitMs(" ZAI-WEB ", 12, "fixture"), 60000);
  assert.equal(leaf.resolveRequestQueueMaxWaitMs("fixture", 29, "fixture"), 29);
  manager.refreshConnectionRateLimits("fixture", null);
  assert.equal(leaf.connectionRateLimitOverrides.has("fixture"), false);
  assert.equal(manager.resolveExecutionMaxWaitMs("fixture"), 5678);
});
test("test reset retains shared settings and overrides; reinitialize reloads database state", async () => {
  const { createProviderConnection } = await import("../../../src/lib/db/providers.ts");
  const { updateSettings } = await import("../../../src/lib/db/settings.ts");
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "queue-settings-synthetic",
    rateLimitOverrides: { maxWaitMs: 53, executionMaxWaitMs: 71 },
  });
  await updateSettings({
    resilienceSettings: { requestQueue: { maxWaitMs: 111, executionMaxWaitMs: 222 } },
  });
  await manager.initializeRateLimits();
  assert.equal(leaf.resolveRequestQueueMaxWaitMs("fixture"), 111);
  assert.equal(manager.resolveExecutionMaxWaitMs(), 222);
  assert.equal(leaf.resolveRequestQueueMaxWaitMs("openai", undefined, String(connection.id)), 53);
  assert.equal(manager.resolveExecutionMaxWaitMs(String(connection.id)), 71);
  const map = leaf.connectionRateLimitOverrides;
  const settings = leaf.requestQueueState.settings;
  await manager.__resetRateLimitManagerForTests();
  assert.equal(leaf.connectionRateLimitOverrides, map);
  assert.equal(leaf.requestQueueState.settings, settings);
  assert.equal(leaf.resolveRequestQueueMaxWaitMs("openai", undefined, String(connection.id)), 53);
  manager.refreshConnectionRateLimits(String(connection.id), { maxWaitMs: 7 });
  await manager.initializeRateLimits();
  assert.equal(leaf.resolveRequestQueueMaxWaitMs("openai", undefined, String(connection.id)), 53);
});
