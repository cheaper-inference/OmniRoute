// #10681: the round-robin leg runs its own loop instead of the shared attempt
// loop, so it never reported per-target decisions. Every RR invocation logged
// `decisions=0` and the combo trace could not answer "which targets were
// tried, which were skipped, which were never reached". This drives a real
// handleComboChat round-robin run with one failing and one succeeding target
// and asserts the trace records both.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-trace-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboTrace } = await import("../../open-sse/services/combo/decisionTrace.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function rateLimitedResponse() {
  return new Response(
    JSON.stringify({ error: { message: "今日文本额度已用完", type: "rate_limit_exceeded" } }),
    { status: 429, headers: { "content-type": "application/json" } }
  );
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
});

test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  resetAllSemaphores();
  settingsDb.clearAllLKGP();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("round-robin records each target decision instead of leaving the trace empty", async () => {
  const attempted: string[] = [];

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "hello" }] },
    combo: {
      name: "rr-decision-trace-10681",
      strategy: "round-robin",
      models: ["openai/rr-t1", "anthropic/rr-t2", "google/rr-t3"],
      config: {
        maxRetries: 0,
        failoverBeforeRetry: true,
        concurrencyPerModel: 1,
        queueTimeoutMs: 1000,
      },
    },
    handleSingleModel: async (_body, modelStr) => {
      attempted.push(modelStr);
      if (modelStr === "openai/rr-t1") return rateLimitedResponse();
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable: async () => true,
    log: createLog(),
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.status, 200, "second target should serve the request");
  assert.deepEqual(
    attempted,
    ["openai/rr-t1", "anthropic/rr-t2"],
    "the third target is never attempted once the second succeeds"
  );

  const traceId = result.headers.get("X-OmniRoute-Combo-Trace");
  assert.ok(traceId, "response carries the combo trace id");

  const trace = getComboTrace(traceId);
  assert.ok(trace, "trace exists for the invocation");
  assert.ok(
    trace.decisions.length > 0,
    "round-robin must record decisions; before this fix every RR invocation logged decisions=0"
  );

  const dispatched = trace.decisions
    .filter((d) => d.decision === "dispatched")
    .map((d) => d.target);
  assert.deepEqual(
    dispatched,
    ["openai/rr-t1", "anthropic/rr-t2"],
    "both attempted targets appear as dispatched, in attempt order"
  );

  // The candidate set has to be complete: a target that was never reached is
  // recorded as such, not silently dropped, or the trace cannot be reconciled
  // against every configured target in an incident.
  const notReached = trace.decisions
    .filter((d) => d.decision === "not_reached")
    .map((d) => d.target);
  assert.deepEqual(
    notReached,
    ["google/rr-t3"],
    "the target after the successful one is reported as not_reached"
  );

  // Each target is recorded once, and every entry names the step it belongs to: a wrong or
  // empty executionKey, or a duplicate decision for the same target, would otherwise pass.
  const targets = trace.decisions.map((d) => d.target);
  assert.equal(new Set(targets).size, targets.length, "each target is recorded once");
  for (const decision of trace.decisions) {
    assert.ok(
      typeof decision.step === "string" && decision.step.length > 0,
      `decision for ${decision.target} records its step`
    );
  }
});
