/**
 * Regression tests for oversized-input combo fail-fast & fast token estimation:
 *
 * 1. Heterogeneous combo where every remaining target has a known context limit
 *    <= the failed target's limit (or < estimatedInputTokens) short-circuits
 *    immediately after target 0 instead of dispatching targets 1..N.
 * 2. Heterogeneous combo where ANY remaining target has a strictly larger known
 *    context limit OR an unknown context limit (fail-open) still falls back to
 *    that target.
 * 3. Performance & parity: multi-MB (~2M-token) payload estimation completes in
 *    <1s with exact CJK/ASCII parity and safe WeakMap memoization (including
 *    in-place mutation invalidation).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-oversized-ff-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-oversized-ff-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const {
  hasRemainingTargetWithLargerContext,
  extractEstimatedInputTokensFromOverflowText,
  shouldAbortOnInputBoundFailure,
} = await import("../../open-sse/services/combo/executeTargetClassify.ts");
const { referenceEstimateTokens } = await import("../helpers/context-estimation-reference.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

function contextOverflow400(message: string) {
  return new Response(
    JSON.stringify({
      error: {
        code: "context_length_exceeded",
        message,
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}

function ok200() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

test("heterogeneous combo aborts after target 0 when all remaining targets have known limits <= failed target or < estimatedInputTokens", async () => {
  const called: string[] = [];
  const result = await handleComboChat({
    body: { model: "lite", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "hetero-all-too-small",
      strategy: "priority",
      models: [
        { model: "gemini/gemini-2.5-pro" }, // known ~1M
        { model: "claude/claude-sonnet-4-20250514" }, // known <= 1M (200k)
        { model: "openai/gpt-4o" }, // known <= 1M (128k)
        { model: "codex/gpt-5-codex" }, // known <= 1M (400k)
      ],
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      return contextOverflow400(
        `Input exceeds context window for ${modelStr}: estimated 2100000 input tokens, limit 1000000.`
      );
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(result.status, 400);
  assert.deepEqual(
    called,
    ["gemini/gemini-2.5-pro"],
    `expected immediate abort after target 0, but dispatched: ${called.join(", ")}`
  );
});

test("heterogeneous combo still falls back when a remaining target has a strictly larger known context limit", async () => {
  const called: string[] = [];
  const result = await handleComboChat({
    body: { model: "lite", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "hetero-has-larger-known",
      strategy: "priority",
      models: [
        { model: "openai/gpt-4o" }, // 128k
        { model: "gemini/gemini-2.5-pro" }, // 1M
      ],
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      if (modelStr === "openai/gpt-4o") {
        return contextOverflow400(
          "Input exceeds context window for openai/gpt-4o: estimated 250000 input tokens, limit 128000."
        );
      }
      return ok200();
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(result.status, 200);
  assert.deepEqual(called, ["openai/gpt-4o", "gemini/gemini-2.5-pro"]);
});

test("heterogeneous combo still falls back (fail-open) when a remaining target has an unknown context limit", async () => {
  const called: string[] = [];
  const result = await handleComboChat({
    body: { model: "lite", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "hetero-has-unknown",
      strategy: "priority",
      models: [
        { model: "gemini/gemini-2.5-pro" }, // known 1M
        { model: "custom-uncataloged/my-mystery-model" }, // unknown limit → fail-open
      ],
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      if (modelStr === "gemini/gemini-2.5-pro") {
        return contextOverflow400(
          "Input exceeds context window for gemini/gemini-2.5-pro: estimated 2100000 input tokens, limit 1000000."
        );
      }
      return ok200();
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(result.status, 200);
  assert.deepEqual(called, [
    "gemini/gemini-2.5-pro",
    "custom-uncataloged/my-mystery-model",
  ]);
});

test("hasRemainingTargetWithLargerContext & shouldAbortOnInputBoundFailure unit matrix", () => {
  const limits: Record<string, number | null> = {
    "p/small": 128_000,
    "p/med": 200_000,
    "p/large": 1_000_000,
    "p/unknown": null,
  };
  const resolveLimit = (t: { modelStr: string }) => limits[t.modelStr] ?? null;

  // All remaining <= failed target → false (abort)
  assert.equal(
    hasRemainingTargetWithLargerContext({
      orderedTargets: [{ modelStr: "p/large" }, { modelStr: "p/med" }, { modelStr: "p/small" }],
      index: 0,
      resolveLimit,
    }),
    false
  );

  // Remaining has larger limit than failed, BUT smaller than estimatedInputTokens → false (abort)
  assert.equal(
    hasRemainingTargetWithLargerContext({
      orderedTargets: [{ modelStr: "p/small" }, { modelStr: "p/large" }],
      index: 0,
      estimatedInputTokens: 2_000_000,
      resolveLimit,
    }),
    false
  );

  // Remaining has larger limit AND >= estimatedInputTokens → true (fallback)
  assert.equal(
    hasRemainingTargetWithLargerContext({
      orderedTargets: [{ modelStr: "p/small" }, { modelStr: "p/large" }],
      index: 0,
      estimatedInputTokens: 500_000,
      resolveLimit,
    }),
    true
  );

  // Remaining has unknown limit → true (fail-open)
  assert.equal(
    hasRemainingTargetWithLargerContext({
      orderedTargets: [{ modelStr: "p/large" }, { modelStr: "p/unknown" }],
      index: 0,
      estimatedInputTokens: 2_000_000,
      resolveLimit,
    }),
    true
  );

  // Parsing helper extracts OmniRoute, Claude, OpenAI, and Gemini overflow counts
  // including optional comma separators.
  assert.equal(
    extractEstimatedInputTokensFromOverflowText(
      "Input exceeds context window: estimated 2150000 input tokens, limit 1000000."
    ),
    2_150_000
  );
  assert.equal(
    extractEstimatedInputTokensFromOverflowText(
      "Input exceeds context window: estimated 2,150,000 input tokens, limit 1,000,000."
    ),
    2_150_000
  );
  assert.equal(
    extractEstimatedInputTokensFromOverflowText("prompt is too long: 250,000 tokens > 200,000 maximum"),
    250_000
  );
  assert.equal(
    extractEstimatedInputTokensFromOverflowText(
      "This model's maximum context length is 128000 tokens. However, your messages resulted in 250,432 tokens."
    ),
    250_432
  );
  assert.equal(
    extractEstimatedInputTokensFromOverflowText(
      "The input token count (2,100,000) exceeds the maximum number of tokens allowed (1,048,576)."
    ),
    2_100_000
  );

  // shouldAbortOnInputBoundFailure aborts on heterogeneous 400 overflow when no larger target remains
  assert.equal(
    shouldAbortOnInputBoundFailure({
      structuredError: { code: "context_length_exceeded" },
      remainderIsHomogeneous: false,
      status: 400,
      errorText: "Input exceeds context window",
      hasRemainingLargerContextTarget: false,
    }),
    true
  );

  // Non-400 status (e.g. 500 or 413) with hasRemainingLargerContextTarget: false must NOT
  // trigger heterogeneous abort even if structuredError carries context_length_exceeded.
  assert.equal(
    shouldAbortOnInputBoundFailure({
      structuredError: { code: "context_length_exceeded" },
      remainderIsHomogeneous: false,
      status: 500,
      errorText: "Input exceeds context window",
      hasRemainingLargerContextTarget: false,
    }),
    false
  );
  assert.equal(
    shouldAbortOnInputBoundFailure({
      structuredError: { code: "context_length_exceeded" },
      remainderIsHomogeneous: false,
      status: 413,
      errorText: "Input exceeds context window",
      hasRemainingLargerContextTarget: false,
    }),
    false
  );
});

test("estimateTokens: multi-MB (~2M-token) payload completes in <1s, matches oracle, and never serves stale counts on in-place mutation", () => {
  // ~8 MB payload (~2M ASCII tokens) plus CJK + supplementary Han characters
  const chunk = "The quick brown fox jumps over the lazy dog. ".repeat(200);
  const cjkChunk = "中文テスト한국어\u{20000}\u{2A6D6}".repeat(50);
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    ...Array.from({ length: 850 }, (_, idx) => ({
      role: idx % 2 === 0 ? "user" : "assistant",
      content: idx % 100 === 0 ? chunk + cjkChunk : chunk,
    })),
  ];

  // Single-target full estimation (two passes as in chatCore) completes well under 1s
  const start = performance.now();
  const first = estimateTokens(messages);
  const second = estimateTokens(messages);
  const elapsedMs = performance.now() - start;

  assert.equal(second, first);
  assert.ok(first > 1_800_000, `expected ~2M tokens, got ${first}`);
  assert.ok(
    elapsedMs < 1000,
    `expected multi-MB estimation (2 full passes) in <1000ms, took ${elapsedMs.toFixed(1)}ms`
  );

  // Exact parity against the pre-optimization `for (const char of value)` CJK rule
  // on mixed ASCII + BMP CJK + supplementary Han + emoji + lone surrogates.
  const parityText =
    "Hello 世界 こんにちは 한국어 \u{20000} \u{2FA1F} \u{1F600} \ud83d \udc00";
  let oracleCjkExtra = 0;
  for (const ch of parityText) {
    const cp = ch.codePointAt(0)!;
    if (
      (cp >= 0x3000 && cp <= 0x9fff) ||
      (cp >= 0xac00 && cp <= 0xd7af) ||
      (cp >= 0xf900 && cp <= 0xfaff) ||
      (cp >= 0x20000 && cp <= 0x2fa1f)
    ) {
      oracleCjkExtra += 3;
    }
  }
  assert.equal(estimateTokens(parityText), Math.ceil((parityText.length + oracleCjkExtra) / 4));
  // Non-CJK oracle parity (referenceEstimateTokens does not add CJK extra weight)
  const nonCjkSample = [
    { role: "user", content: "Hello world \u{1F600} \ud83d \udc00 naïve café" },
  ];
  assert.equal(estimateTokens(nonCjkSample), referenceEstimateTokens(nonCjkSample));

  // Mutation safety: in-place mutation of an unsampled array index (messages[1] of 5),
  // nested content[0].text, and a plain object's middle property must always return
  // fresh, updated token counts.
  const fiveMessages = [
    { role: "system", content: "sys" },
    { role: "user", content: "m1" },
    { role: "assistant", content: "m2" },
    { role: "user", content: [{ type: "text", text: "nested-short" }] },
    { role: "assistant", content: "m4" },
  ];
  const baseCount = estimateTokens(fiveMessages);
  fiveMessages[1].content = "a".repeat(8000);
  const afterMidArrayMutate = estimateTokens(fiveMessages);
  assert.ok(
    afterMidArrayMutate >= baseCount + 1900,
    `expected messages[1] mutation to update count (${baseCount} -> ${afterMidArrayMutate})`
  );

  (fiveMessages[3].content as Array<{ type: string; text: string }>)[0].text = "b".repeat(8000);
  const afterNestedContentMutate = estimateTokens(fiveMessages);
  assert.ok(
    afterNestedContentMutate >= afterMidArrayMutate + 1900,
    `expected nested content[0].text mutation to update count (${afterMidArrayMutate} -> ${afterNestedContentMutate})`
  );

  const plainBody: Record<string, unknown> = {
    model: "test-model",
    messages: [{ role: "user", content: "short" }],
    stream: true,
  };
  const bodyBefore = estimateTokens(plainBody);
  plainBody.messages = [{ role: "user", content: "c".repeat(8000) }];
  const bodyAfter = estimateTokens(plainBody);
  assert.ok(
    bodyAfter >= bodyBefore + 1900,
    `expected plain object middle-key mutation to update count (${bodyBefore} -> ${bodyAfter})`
  );
});
