/**
 * A limiter with no rpm cap must not run Bottleneck's reservoir-refresh timer.
 * With rpm 0 the reservoir is MAX_SAFE_INTEGER, so a refresh to the same value is a no-op,
 * yet the timer woke the event loop about four times a second for every live limiter.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rl-no-timer-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const resilienceSettings = await import("../../src/lib/resilience/settings.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const Bottleneck = (await import("bottleneck")).default;

type StoreProbe = { _store: { heartbeat?: unknown } };

let created: InstanceType<typeof Bottleneck>[] = [];

async function useRequestsPerMinute(requestsPerMinute: number) {
  await rateLimitManager.applyRequestQueueSettings({
    ...resilienceSettings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    autoEnableApiKeyProviders: false,
    requestsPerMinute,
    minTimeBetweenRequestsMs: 0,
    maxQueueDepth: 0,
  });
  rateLimitManager.__setLimiterFactoryForTests((options) => {
    const limiter = new Bottleneck(options);
    created.push(limiter);
    return limiter;
  });
}

test.beforeEach(async () => {
  created = [];
  await rateLimitManager.__resetRateLimitManagerForTests();
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("rpm 0 creates a limiter with no refresh timer", async () => {
  await useRequestsPerMinute(0);
  rateLimitManager.enableRateLimitProtection("no-timer-conn");
  await rateLimitManager.withRateLimit("openai", "no-timer-conn", "m", async () => "ok");

  assert.equal(created.length, 1);
  assert.equal(
    (created[0] as unknown as StoreProbe)._store.heartbeat ?? null,
    null,
    "an unlimited limiter must not start the reservoir heartbeat"
  );
});

test("a positive rpm still creates the refresh timer", async () => {
  await useRequestsPerMinute(60);
  rateLimitManager.enableRateLimitProtection("timer-conn");
  await rateLimitManager.withRateLimit("openai", "timer-conn", "m", async () => "ok");

  assert.equal(created.length, 1);
  assert.notEqual(
    (created[0] as unknown as StoreProbe)._store.heartbeat ?? null,
    null,
    "a capped limiter keeps the reservoir heartbeat"
  );
});

test("a per-connection rpm override on an unlimited limiter starts the timer", async () => {
  await useRequestsPerMinute(0);
  rateLimitManager.enableRateLimitProtection("override-conn");
  await rateLimitManager.withRateLimit("openai", "override-conn", "m", async () => "ok");
  rateLimitManager.refreshConnectionRateLimits("override-conn", { rpm: 5 });
  await rateLimitManager.withRateLimit("openai", "override-conn", "m", async () => "ok");

  const rebuilt = created[created.length - 1];
  assert.notEqual(
    (rebuilt as unknown as StoreProbe)._store.heartbeat ?? null,
    null,
    "rpm override must refill the reservoir"
  );
});

test("raising the global rpm from unlimited starts the timer on a live limiter", async () => {
  // applyRequestQueueSettings reconciles against stored connections, so use a real one.
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "raise-rpm",
    apiKey: ["test", "key", "value"].join("-"),
    isActive: true,
    rateLimitProtection: true,
  });
  await useRequestsPerMinute(0);
  rateLimitManager.enableRateLimitProtection(connection.id);
  await rateLimitManager.withRateLimit("openai", connection.id, "m", async () => "ok");
  assert.equal((created[0] as unknown as StoreProbe)._store.heartbeat ?? null, null);

  await useRequestsPerMinute(60);
  // Bottleneck applies updateSettings() after one event-loop turn.
  await new Promise((resolve) => setTimeout(resolve, 20));

  assert.equal(created.length, 1, "the live limiter is updated, not replaced");
  assert.notEqual((created[0] as unknown as StoreProbe)._store.heartbeat ?? null, null);
});
