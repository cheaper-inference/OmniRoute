import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ModelAvailabilityResult } from "../../open-sse/services/combo/types.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-16718-"));
process.env.DATA_DIR = dataDir;
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const log = { info() {}, warn() {}, error() {}, debug() {} };

test.beforeEach(() => {
  clearAllModelLockouts();
  resetAllComboMetrics();
});
test.after(() => {
  clearAllModelLockouts();
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

async function run(models: string[], availability: ModelAvailabilityResult, failureStatus = 402) {
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: {},
    combo: {
      name: "connection-cooldown-16718",
      strategy: "priority",
      models,
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    isModelAvailable: async (model) => (model.startsWith("anthropic/") ? availability : true),
    handleSingleModel: async (_body, model) => {
      dispatched.push(model);
      return model.startsWith("anthropic/")
        ? Response.json({ choices: [{ message: { content: "recovered" } }] })
        : Response.json({ error: { message: "Payment required" } }, { status: failureStatus });
    },
    log,
    settings: {
      resilienceSettings: {
        comboCooldownWait: { enabled: false, maxWaitMs: 90_000, maxAttempts: 1, budgetMs: 90_000 },
      },
    },
    allCombos: null,
  });
  return { response, dispatched };
}

for (const models of [
  ["openai/gpt-4o", "anthropic/claude-sonnet-4"],
  ["anthropic/claude-sonnet-4", "openai/gpt-4o"],
]) {
  test(`a temporary peer makes 402 retryable in order ${models.join(", ")}`, async () => {
    const { response, dispatched } = await run(models, {
      available: false,
      reason: "connection_cooldown",
      retryAfterMs: 30_000,
    });
    assert.equal(response.status, 429);
    const retryAfter = Number(response.headers.get("retry-after"));
    assert.ok(retryAfter > 0 && retryAfter <= 30, `expected a bounded Retry-After: ${retryAfter}`);
    assert.deepEqual(dispatched, ["openai/gpt-4o"]);
  });
}

test("an unavailable peer without a cooldown does not change payment failure", async () => {
  const { response } = await run(["openai/gpt-4o", "anthropic/claude-sonnet-4"], false);
  assert.equal(response.status, 402);
  assert.equal(response.headers.get("retry-after"), null);
});

test("a ready peer still serves the request", async () => {
  const { response } = await run(["openai/gpt-4o", "anthropic/claude-sonnet-4"], true);
  assert.equal(response.status, 200);
});

test("a request error is not converted into a payment cooldown retry", async () => {
  const { response } = await run(
    ["openai/gpt-4o", "anthropic/claude-sonnet-4"],
    { available: false, reason: "connection_cooldown", retryAfterMs: 30_000 },
    400
  );
  assert.equal(response.status, 400);
});
