import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pinned-16718-"));
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const log = { info() {}, warn() {}, error() {}, debug() {} };
const NOW = Date.parse("2030-01-01T00:00:00Z");

test.beforeEach((context) => {
  context.mock.timers.enable({ apis: ["Date"], now: NOW });
  clearAllModelLockouts();
  resetAllComboMetrics();
});
test.after(() => {
  clearAllModelLockouts();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function run(
  options: {
    pinnedFirst?: boolean;
    status?: string;
    active?: boolean;
    until?: string | null;
    peerStatus?: number;
  } = {}
) {
  const connection = await createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "pinned-cooldown-fixture",
    apiKey: "fixture-not-a-real-key",
    isActive: options.active ?? true,
    testStatus: options.status ?? "unavailable",
    lastErrorAt: new Date(NOW).toISOString(),
    rateLimitedUntil:
      options.until === undefined ? new Date(NOW + 5000).toISOString() : options.until,
  });
  invalidateDbCache("connections");
  const pinned = {
    kind: "model" as const,
    model: "anthropic/claude-sonnet-4",
    connectionId: connection.id,
  };
  const peer = "openai/gpt-4o";
  const dispatched: string[] = [];
  const messages: string[] = [];
  const response = await handleComboChat({
    body: {},
    combo: {
      name: "pinned-connection-cooldown-16718",
      strategy: "priority",
      models: options.pinnedFirst ? [pinned, peer] : [peer, pinned],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    isModelAvailable: async () => true,
    handleSingleModel: async (_body, model) => {
      dispatched.push(model);
      if (model.startsWith("anthropic/") || options.peerStatus === 200) {
        return Response.json({ choices: [{ message: { content: "success" } }] });
      }
      return Response.json(
        { error: { message: "Payment required" } },
        { status: options.peerStatus ?? 402 }
      );
    },
    log: {
      ...log,
      info: (...args: unknown[]) => {
        messages.push(args.join(" "));
      },
    },
    settings: {
      resilienceSettings: {
        comboCooldownWait: { enabled: false, maxWaitMs: 90_000, maxAttempts: 1, budgetMs: 90_000 },
      },
    },
    allCombos: null,
  });
  return { response, dispatched, messages };
}

for (const pinnedFirst of [false, true]) {
  test(`a pinned temporary peer makes 402 retryable, pinnedFirst=${pinnedFirst}`, async () => {
    const { response, dispatched, messages } = await run({ pinnedFirst });
    assert.deepEqual(dispatched, ["openai/gpt-4o"]);
    assert.ok(
      messages.some((message) => message.includes("has persisted cooldown until")),
      "must exercise the persisted gate"
    );
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "5");
  });
}

for (const status of ["banned", "expired", "credits_exhausted", "deactivated"]) {
  test(`a terminal ${status} row with a future timestamp never supplies a retry hint`, async () => {
    const { response, dispatched } = await run({ status });
    assert.equal(response.status, 402);
    assert.equal(response.headers.get("retry-after"), null);
    assert.deepEqual(dispatched, ["openai/gpt-4o"]);
  });
}

test("an inactive row with a future cooldown never supplies a retry hint or dispatches", async () => {
  const { response, dispatched } = await run({ active: false });
  assert.equal(response.status, 402);
  assert.equal(response.headers.get("retry-after"), null);
  assert.deepEqual(dispatched, ["openai/gpt-4o"]);
});

for (const until of [null, "invalid-timestamp", new Date(NOW - 1000).toISOString()]) {
  test(`a recent unavailable label without a future deadline does not invent a retry: ${until}`, async () => {
    const { response } = await run({ until });
    assert.equal(response.status, 402);
    assert.equal(response.headers.get("retry-after"), null);
  });
}

test("an elapsed cooldown on an active pinned connection succeeds", async () => {
  const { response, dispatched } = await run({
    status: "active",
    until: new Date(NOW - 1000).toISOString(),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(dispatched, ["openai/gpt-4o", "anthropic/claude-sonnet-4"]);
});

test("a request error stays 400 even with a pinned cooldown", async () => {
  const { response } = await run({ pinnedFirst: true, peerStatus: 400 });
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("retry-after"), null);
});

test("a healthy peer still succeeds while the pinned connection cools down", async () => {
  const { response, dispatched } = await run({ pinnedFirst: true, peerStatus: 200 });
  assert.equal(response.status, 200);
  assert.deepEqual(dispatched, ["openai/gpt-4o"]);
});
