import test from "node:test";
import assert from "node:assert/strict";
import {
  evaluateWithLaya,
  prioritizeCandidatesWithLaya,
  detectLanguage,
  prefilterMessagesWithLaya,
  isLayaOptedIn,
  fastFallbackEvaluate,
} from "../../open-sse/services/autoCombo/layaRouter.ts";
import { resolveAutoStrategyOrder } from "../../open-sse/services/combo/resolveAutoStrategy.ts";

test("layaRouter does not pollute globalThis with Float16Array polyfill", async () => {
  const beforeFloat16 = (globalThis as Record<string, unknown>).Float16Array;
  await import("../../open-sse/services/autoCombo/layaRouter.ts");
  const afterFloat16 = (globalThis as Record<string, unknown>).Float16Array;
  assert.strictEqual(afterFloat16, beforeFloat16);
});

test("isLayaOptedIn is disabled by default and respects flags", () => {
  // 1. Default state: off
  assert.equal(isLayaOptedIn({}, {}, {}), false);
  assert.equal(isLayaOptedIn(undefined, undefined, {}), false);

  // 2. Explicitly disabled via environment takes precedence
  assert.equal(
    isLayaOptedIn(
      { laya: true, autoConfig: { routerStrategy: "laya" } },
      { enableLayaRouting: true },
      { OMNIROUTE_ENABLE_LAYA: "false" }
    ),
    false
  );
  assert.equal(
    isLayaOptedIn({ laya: true }, { enableLaya: true }, { OMNIROUTE_ENABLE_LAYA: "0" }),
    false
  );

  // 3. Environment opt-in
  assert.equal(isLayaOptedIn({}, {}, { OMNIROUTE_ENABLE_LAYA: "true" }), true);
  assert.equal(isLayaOptedIn({}, {}, { OMNIROUTE_ENABLE_LAYA: "1" }), true);

  // 4. Settings opt-in
  assert.equal(isLayaOptedIn({}, { enableLayaRouting: true }, {}), true);
  assert.equal(isLayaOptedIn({}, { enableLaya: true }, {}), true);

  // 5. Combo opt-in
  assert.equal(isLayaOptedIn({ laya: true }, {}, {}), true);
  assert.equal(isLayaOptedIn({ autoConfig: { routerStrategy: "laya" } }, {}, {}), true);
  assert.equal(isLayaOptedIn({ autoConfig: { laya: true } }, {}, {}), true);
  assert.equal(isLayaOptedIn({ config: { auto: { routerStrategy: "laya" } } }, {}, {}), true);
});

test("fastFallbackEvaluate anchors keyword patterns and avoids substring false positives", () => {
  // 'which...this' should not match greeting 'hi'
  const whichResult = fastFallbackEvaluate("which book is this?");
  assert.notEqual(whichResult.domain, "simple");

  // 'capital' should not match 'api'
  const capitalResult = fastFallbackEvaluate("What is the capital of France?");
  assert.notEqual(capitalResult.domain, "coding");

  // Legitimate keywords match correctly
  const codeResult = fastFallbackEvaluate("write a python async function to call the api");
  assert.equal(codeResult.domain, "coding");
  assert.ok(codeResult.complexity >= 0.5);

  const greetingResult = fastFallbackEvaluate("hi, good morning");
  assert.equal(greetingResult.domain, "simple");
  assert.ok(greetingResult.complexity < 0.35);
});

test("evaluateWithLaya returns valid structured evaluation", async () => {
  const result = await evaluateWithLaya("Write a python script to sort an array");
  assert.equal(typeof result.isSafe, "boolean");
  assert.equal(typeof result.domain, "string");
  assert.equal(typeof result.complexity, "number");
  assert.ok(result.complexity >= 0 && result.complexity <= 1);
});

test("prioritizeCandidatesWithLaya prioritizes models and preserves unmatched order", () => {
  const candidates = [
    { provider: "generic", model: "custom-unmatched-model-1" },
    { provider: "openrouter", model: "meta-llama/llama-3-8b-instruct" },
    { provider: "anthropic", model: "claude-sonnet-4-6-thinking" },
    { provider: "google-antigravity", model: "gemini-3.6-flash-medium" },
    { provider: "generic", model: "custom-unmatched-model-2" },
  ];

  const sortedForCode = prioritizeCandidatesWithLaya(candidates, {
    domain: "coding",
    complexity: 0.8,
    isSafe: true,
  });

  assert.equal(sortedForCode[0].model, "claude-sonnet-4-6-thinking");

  // Unmatched models stay at the end and preserve their relative incoming order
  const unmatched1Idx = sortedForCode.findIndex((c) => c.model === "custom-unmatched-model-1");
  const unmatched2Idx = sortedForCode.findIndex((c) => c.model === "custom-unmatched-model-2");
  assert.ok(unmatched1Idx !== -1 && unmatched2Idx !== -1);
  assert.ok(unmatched1Idx < unmatched2Idx);

  const sortedForSimple = prioritizeCandidatesWithLaya(candidates, {
    domain: "simple",
    complexity: 0.1,
    isSafe: true,
  });

  assert.equal(sortedForSimple[0].model, "gemini-3.6-flash-medium");
});

test("detectLanguage correctly detects scripts and languages", () => {
  assert.equal(detectLanguage("Hello world").language, "en");
  assert.equal(detectLanguage("안녕하세요").language, "ko");
  assert.equal(detectLanguage("こんにちは").language, "ja");
  assert.equal(detectLanguage("你好").language, "zh");
});

test("prefilterMessagesWithLaya prunes history for simple domain and skips fallback", () => {
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "turn 1" },
    { role: "assistant", content: "reply 1" },
    { role: "user", content: "hello" },
  ];

  // 1. Fallback evaluation never prunes history
  const skippedPruning = prefilterMessagesWithLaya(
    messages,
    { domain: "simple", complexity: 0.1, isSafe: true, isFallback: true },
    "hello"
  );
  assert.equal(skippedPruning.length, 4);

  // 2. Neural evaluation prunes redundant context
  const pruned = prefilterMessagesWithLaya(
    messages,
    { domain: "simple", complexity: 0.1, isSafe: true, isFallback: false },
    "hello"
  );
  assert.equal(pruned.length, 2);
  assert.equal(pruned[0].role, "system");
  assert.equal(pruned[1].content, "hello");
});

test("resolveAutoStrategyOrder leaves routing unchanged when Laya is not opted in", async () => {
  const targets = [
    {
      kind: "model" as const,
      stepId: "s1",
      executionKey: "google-antigravity>gemini-3.6-flash-medium",
      provider: "google-antigravity",
      model: "gemini-3.6-flash-medium",
      modelStr: "google-antigravity/gemini-3.6-flash-medium",
      costPer1MTokens: 150,
      active: true,
    },
    {
      kind: "model" as const,
      stepId: "s2",
      executionKey: "anthropic>claude-sonnet-4-6",
      provider: "anthropic",
      model: "claude-sonnet-4-6",
      modelStr: "anthropic/claude-sonnet-4-6",
      costPer1MTokens: 3000,
      active: true,
    },
  ];

  const body = {
    messages: [{ role: "user", content: "Write a quick hello script" }],
  };

  const combo = {
    id: "test-auto-combo",
    name: "test-auto-combo",
    type: "auto",
    models: targets.map((t) => t.modelStr),
  };

  const mockBuildCandidates = async () =>
    targets.map((t) => ({
      kind: t.kind,
      stepId: t.stepId,
      executionKey: t.executionKey,
      provider: t.provider,
      model: t.model,
      modelStr: t.modelStr,
      quotaRemaining: 100,
      quotaTotal: 100,
      circuitBreakerState: "CLOSED" as const,
      costPer1MTokens: t.costPer1MTokens,
      p95LatencyMs: 200,
      latencyStdDev: 10,
      errorRate: 0,
      accountTier: "pro",
      quotaResetIntervalSecs: 3600,
    }));

  const log = {
    info: () => {},
    warn: () => {},
    error: () => {},
    debug: () => {},
  };

  const originalEnv = process.env.OMNIROUTE_ENABLE_LAYA;
  delete process.env.OMNIROUTE_ENABLE_LAYA;

  try {
    const result = await resolveAutoStrategyOrder({
      orderedTargets: targets,
      body,
      combo,
      settings: {},
      config: {},
      resilienceSettings: {
        circuitBreaker: { failureThreshold: 5, resetTimeoutMs: 10000 },
        retryPolicy: { maxRetries: 3, backoffMultiplier: 2, initialDelayMs: 500, maxDelayMs: 5000 },
        timeoutPolicy: { requestTimeoutMs: 30000 },
      },
      log,
      buildAutoCandidates: mockBuildCandidates as never,
    });

    assert.ok(!("earlyResponse" in result));
    assert.ok(Array.isArray(result.orderedTargets));
    assert.equal(result.orderedTargets.length, 2);
  } finally {
    if (originalEnv !== undefined) {
      process.env.OMNIROUTE_ENABLE_LAYA = originalEnv;
    } else {
      delete process.env.OMNIROUTE_ENABLE_LAYA;
    }
  }
});
