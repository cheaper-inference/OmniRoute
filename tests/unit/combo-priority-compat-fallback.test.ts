// Priority combos route through the universal dispatch loop, where the
// #6238 last-resort compat fallback was missing: a request whose
// compatibility-KEPT targets all got skipped before a single real attempt
// (availability / cooldown / breaker gates) crystallized 503 without ever
// reconsidering a compatibility-REJECTED-but-healthy target. Only the
// round-robin path had the fallback tier.
//
// The compat pre-filter (filterTargetsByRequestCompatibility) drops
// request-incompatible targets BEFORE availability is known, so the rejected
// set is computed at resolution time and threaded into the dispatch loop;
// with zero recorded attempts the loop probes it before the terminal 503.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-priority-compat-fb-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { recordProviderCooldown, clearCooldownState } =
  await import("../../open-sse/services/providerCooldownTracker.ts");

function createLog() {
  return {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };
}

function okResponse(model: string) {
  return new Response(
    JSON.stringify({ choices: [{ message: { content: `served by ${model}` } }] }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

// pr-a is tool-INCAPABLE, so a tools-requiring request makes the compat
// pre-filter reject it. pr-b is tool-capable and survives the filter, which
// lets the harness steer it either runtime-unavailable (skipped, zero
// recorded attempts) or attempted-but-failing (recorded attempts > 0).
const TOOL_BODY = {
  messages: [{ role: "user", content: "Use a tool to look something up" }],
  tools: [{ type: "function", function: { name: "lookup_weather" } }],
};

function runCombo(overrides: {
  keepUnavailability: boolean;
  keepOutcome: "ok" | "fail" | "abort";
  rejectedOutcome: "ok" | "fail";
  settings?: Record<string, unknown> | null;
  models?: Array<string | Record<string, unknown>>;
}) {
  const attempted: string[] = [];
  return handleComboChat({
    body: TOOL_BODY,
    combo: {
      name: "priority-compat-fallback",
      strategy: "priority",
      models: overrides.models ?? [
        { kind: "model", provider: "openai", model: "pr-a", connectionId: "conn-a", id: "step-a" },
        "openai/pr-b",
      ],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_body, modelStr) => {
      attempted.push(modelStr);
      if (modelStr === "openai/pr-b" && overrides.keepOutcome === "abort") {
        // An opaque network failure records the attempt without a status,
        // so the loop reaches the zero-status terminal with a recorded
        // attempt — the case the fallback guard must skip.
        return Response.error();
      }
      const failed =
        (modelStr === "openai/pr-a" && overrides.rejectedOutcome === "fail") ||
        (modelStr === "openai/pr-b" && overrides.keepOutcome === "fail");
      if (failed) {
        return new Response(
          JSON.stringify({ error: { message: "upstream rejected the request" } }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }
      return okResponse(modelStr);
    },
    isModelAvailable: async (modelStr) =>
      modelStr === "openai/pr-a" || !overrides.keepUnavailability,
    log: createLog(),
    settings: overrides.settings ?? null,
    relayOptions: null,
    allCombos: null,
  }).then((response) => ({ response, attempted }));
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearCooldownState();
  clearModelsDevCapabilities();
  saveModelsDevCapabilities({
    openai: {
      "pr-a": capabilityEntry(128000, { tool_call: false }),
      "pr-b": capabilityEntry(128000),
    },
  });
});

test.after(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearCooldownState();
  clearModelsDevCapabilities();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("priority serves the request from a compat-rejected healthy target when every kept target was skipped", async () => {
  // The compat-kept pr-b is runtime-unavailable (skipped before dispatch,
  // zero recorded attempts); the compat-rejected pr-a is healthy.
  const { response, attempted } = await runCombo({
    keepUnavailability: true,
    keepOutcome: "ok",
    rejectedOutcome: "ok",
  });

  assert.equal(
    response.status,
    200,
    "expected 200 from the compat-rejected target, not the skipped 503"
  );
  assert.deepEqual(attempted, ["openai/pr-a"], "only the healthy compat-rejected target is used");
  const payload = (await response.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(payload.choices[0].message.content, "served by openai/pr-a");
});

test("priority keeps the 503 error surface when the compat-rejected target also fails", async () => {
  const { response, attempted } = await runCombo({
    keepUnavailability: true,
    keepOutcome: "ok",
    rejectedOutcome: "fail",
  });

  assert.deepEqual(attempted, ["openai/pr-a"], "the rejected target was probed as last resort");
  assert.equal(response.status, 503, "a failed fallback keeps the original terminal status");
  const body = (await response.json()) as { error?: { message?: string } };
  assert.ok(
    body.error,
    "the terminal error surface is unchanged when the fallback tier yields no success"
  );
});

test("priority does not probe the compat-rejected tier once a kept target was attempted", async () => {
  // pr-b is available: the loop dispatches to it and records the failed
  // attempt (a network failure leaves the status unset, so the terminal
  // still reaches the no-status block). The recordedAttempts === 0 guard
  // must keep the fallback tier dormant: without it the healthy pr-a would
  // serve a request that already had a recorded attempt.
  const { response, attempted } = await runCombo({
    keepUnavailability: false,
    keepOutcome: "abort",
    rejectedOutcome: "ok",
  });

  assert.equal(
    response.status,
    503,
    `expected the terminal 503 to surface, got ${response.status}`
  );
  const body = (await response.json()) as { error: { code?: string } };
  assert.equal(body.error.code, "ALL_ACCOUNTS_INACTIVE");
  assert.deepEqual(
    attempted,
    ["openai/pr-b"],
    "a recorded attempt forbids the last-resort probe of the rejected target"
  );
});

test("priority skips a compat-rejected target whose connection is in global cooldown", async () => {
  // pr-a (rejected, connection conn-a) is in the provider-cooldown tracker;
  // the kept pr-b has no connection and is only runtime-unavailable. The
  // fallback tier must honor the same cooldown gate the round-robin mirror
  // passes (isProviderInCooldown in the fallback context) and leave pr-a
  // alone — dispatching it would 200 a provider the operator has cooled.
  recordProviderCooldown("openai", "conn-a");
  const { response, attempted } = await runCombo({
    keepUnavailability: true,
    keepOutcome: "ok",
    rejectedOutcome: "ok",
    settings: { resilienceSettings: { providerCooldown: { enabled: true } } },
  });

  assert.equal(
    response.status,
    503,
    "a cooled-down compat-rejected target must not serve the request"
  );
  assert.deepEqual(
    attempted,
    [],
    "the compat-rejected target in global cooldown is skipped by the fallback tier"
  );
});
