/**
 * Tests for #21507:
 * Pre-skip combo targets when estimated input tokens exceed model/provider limit (e.g. Groq 413 ITPM),
 * and ensure upstream 413 fails over cleanly to subsequent targets.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { COMBO_SKIP_REASONS, startComboTrace, getComboTrace, resetComboTraceStore } =
  await import("../../open-sse/services/combo/decisionTrace.ts");
const { evaluateExecuteTargetGates } = await import(
  "../../open-sse/services/combo/executeTargetGates.ts"
);
const { resolveInputTokenCapForGate } = await import(
  "../../src/lib/modelCapabilities.ts"
);
const { groqProvider } = await import(
  "../../open-sse/config/providers/registry/groq/index.ts"
);
const { isComboRequestScopedFailure } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);
const { handleComboChat } = await import(
  "../../open-sse/services/combo.ts"
);

test("#21507: Groq registry declares maxInputTokens for qwen/qwen3.8-27b", () => {
  const model = groqProvider.models?.find((m) => m.id === "qwen/qwen3.8-27b");
  assert.ok(model, "qwen/qwen3.8-27b should be in groq registry");
  assert.equal(model.maxInputTokens, 7000);
});

test("#21507: resolveInputTokenCapForGate resolves maxInputTokens for groq/qwen/qwen3.8-27b in combo", () => {
  const cap = resolveInputTokenCapForGate(
    { provider: "groq", model: "qwen/qwen3.8-27b" },
    { isCombo: true }
  );
  assert.equal(cap, 7000);
});

test("#21507: input_token_limit_exceeded is registered as an allowlisted COMBO_SKIP_REASON", () => {
  assert.ok(
    (COMBO_SKIP_REASONS as readonly string[]).includes("input_token_limit_exceeded"),
    "COMBO_SKIP_REASONS should include input_token_limit_exceeded"
  );
});

test("#21507: isComboRequestScopedFailure classifies HTTP 413 as request-scoped", () => {
  const res413 = new Response(
    JSON.stringify({ error: { message: "Request too large" } }),
    { status: 413, headers: { "Content-Type": "application/json" } }
  );
  assert.equal(isComboRequestScopedFailure(res413, "Request too large"), true);
});

test("#21507: evaluateExecuteTargetGates pre-skips target when estimated input exceeds inputTokenLimit", async () => {
  resetComboTraceStore();
  const traceId = "test-trace-21507";
  startComboTrace(traceId, "test-combo", "priority");

  const target = {
    modelStr: "groq/qwen/qwen3.8-27b",
    provider: "groq",
    executionKey: "groq/qwen/qwen3.8-27b:conn1",
    connectionId: "conn1",
  };

  const largeMessages = [
    { role: "user", content: "word ".repeat(10000) }, // ~10k tokens > 7k cap
  ];

  const state: Record<string, unknown> = {
    orderedTargets: [target],
    fallbackCount: 0,
    transientRateLimitedProviders: new Set(),
    abortControllers: new Map(),
    exhaustedProviders: new Set(),
    exhaustedConnections: new Set(),
    targetFailureTrust: new Map(),
    observeFailure: () => {},
  };

  const deps: Record<string, unknown> = {
    strategy: "priority",
    combo: { name: "test-combo", id: "combo-1" },
    traceInvocationId: traceId,
    resilienceSettings: { providerCooldown: { enabled: true } },
    preScreenMap: new Map(),
    body: { messages: largeMessages },
    log: { info: () => {}, warn: () => {}, debug: () => {} },
    clearStaleLKGP: () => {},
  };

  const decision = await evaluateExecuteTargetGates({
    index: 0,
    state: state as unknown as Parameters<typeof evaluateExecuteTargetGates>[0]["state"],
    deps: deps as unknown as Parameters<typeof evaluateExecuteTargetGates>[0]["deps"],
  });

  assert.equal(decision.kind, "skip");
  assert.equal(state.fallbackCount, 1);

  const trace = getComboTrace(traceId);
  assert.ok(trace, "Trace should exist");
  const recorded = trace.decisions.find(
    (d) => d.reason === "input_token_limit_exceeded"
  );
  assert.ok(recorded, "Should record input_token_limit_exceeded skip in decision trace");
  assert.equal(recorded.target, "groq/qwen/qwen3.8-27b");
});

test("#21507: 413 response in combo cleanly falls over to next candidate target", async () => {
  const combo = {
    id: "combo-413-failover",
    name: "combo-413-failover",
    models: ["mock-provider/model-small", "mock-provider/model-large"],
    strategy: "priority",
  };

  let firstAttemptDone = false;
  let secondAttemptDone = false;

  const mockHandleSingleModel = async (
    _body: unknown,
    modelStr: string,
    _target: unknown
  ): Promise<Response> => {
    if (modelStr.includes("model-small")) {
      firstAttemptDone = true;
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Request too large for model in service tier on_demand on input tokens per minute (ITPM): Limit 7000, Requested 10240",
            type: "invalid_request_error",
          },
        }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }
    secondAttemptDone = true;
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "Success from larger model" } }],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const result = await handleComboChat({
    combo,
    body: { messages: [{ role: "user", content: "test" }] },
    handleSingleModel: mockHandleSingleModel,
    allCombosData: [combo],
    log: { info: () => {}, warn: () => {}, debug: () => {}, error: () => {} },
  });

  assert.equal(firstAttemptDone, true, "First target should have been attempted");
  assert.equal(secondAttemptDone, true, "Second target should have succeeded via failover");
  assert.equal(result.status, 200);
  const data = await result.json();
  assert.equal(data.choices[0].message.content, "Success from larger model");
});
