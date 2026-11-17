/**
 * #18910: legacy Gemini major versions (<= 3, including 3.8) keep the numeric
 * thinkingBudget off-switch; major versions >= 4 (gemini-4-argon, hypothetical
 * 5/6/10) reject that off-switch and must get the lowest thinkingLevel instead.
 * Zed's hosted Google proxy only accepts the uppercase Rust enum, so the adapter
 * uppercases a string thinkingLevel.
 *
 * Expected values below were probed on the base commit first (legacy lines are
 * byte-identical there and after the fix).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const zed = await import("../../open-sse/executors/zed-hosted.ts");
const budgetModule = await import("../../open-sse/services/thinkingBudget.ts");

// Pull the predicates off the module so a missing export fails a test instead of
// crashing the file load (the base tree has no isGeminiThinkingLevelModel).
const isGeminiThinkingLevelModel: (model: string) => boolean =
  budgetModule.isGeminiThinkingLevelModel;
const isGemini4PlusModel: (model: string) => boolean = budgetModule.isGemini4PlusModel;

type ThinkingConfig = {
  thinkingBudget?: number;
  thinkingLevel?: string;
  includeThoughts?: boolean;
};

type GeminiReq = {
  generationConfig?: {
    maxOutputTokens?: number;
    thinkingConfig?: ThinkingConfig;
  };
};

const messages = [{ role: "user", content: "ping" }];
const claudeMessages = [{ role: "user", content: [{ type: "text", text: "ping" }] }];

function openaiThinking(model: string, extra: Record<string, unknown>) {
  const result = openaiToGeminiRequest(model, { messages, ...extra }, false) as GeminiReq;
  return result.generationConfig?.thinkingConfig;
}

function claudeThinking(model: string, extra: Record<string, unknown>) {
  const result = claudeToGeminiRequest(
    model,
    { messages: claudeMessages, stream: false, ...extra },
    false
  ) as GeminiReq;
  return result.generationConfig?.thinkingConfig;
}

// ── A. Legacy models stay byte-identical to the base tree ────────────

test("legacy models keep the numeric off-switch for reasoning_effort none", () => {
  for (const model of [
    "gemini-2.5-flash",
    "gemini-3-flash",
    "gemini-3.1-pro",
    "gemini-3.5-flash",
    "gemini-3.8-flash-high",
  ]) {
    const tc = openaiThinking(model, { max_tokens: 65536, reasoning_effort: "none" });
    assert.deepEqual(tc, { thinkingBudget: 0, includeThoughts: false }, model);
    assert.equal(tc?.thinkingLevel, undefined, model);
  }
});

test("gemini-3.8-flash-high reasoning_effort high emits thinkingLevel high, no numeric budget", () => {
  const tc = openaiThinking("gemini-3.8-flash-high", {
    max_tokens: 65536,
    reasoning_effort: "high",
  });
  // includeThoughts defaults to true on the thinking-level path (#19302).
  assert.deepEqual(tc, { thinkingLevel: "high", includeThoughts: true });
  assert.equal(tc?.includeThoughts, true);
  assert.equal(tc?.thinkingBudget, undefined);
});

test("gemini-3.1-pro thinking.budget_tokens 5000 keeps the base budget mapping", () => {
  const tc = openaiThinking("gemini-3.1-pro", {
    max_tokens: 65536,
    thinking: { type: "enabled", budget_tokens: 5000 },
  });
  assert.deepEqual(tc, { thinkingBudget: 5000, includeThoughts: true });
});

test("gemini-3.8 default injection at max_tokens 1 keeps the base zero budget", () => {
  const tc = openaiThinking("gemini-3.8", { max_tokens: 1 });
  assert.deepEqual(tc, { thinkingBudget: 0, includeThoughts: false });
  assert.equal(tc?.thinkingLevel, undefined);
});

test("Claude path keeps the numeric off-switch for gemini-3.8-flash-high budget_tokens 0", () => {
  const tc = claudeThinking("gemini-3.8-flash-high", {
    max_tokens: 65536,
    thinking: { type: "enabled", budget_tokens: 0 },
  });
  assert.deepEqual(tc, { thinkingBudget: 0, includeThoughts: false });
  assert.equal(tc?.thinkingLevel, undefined);
});

// ── B. Gemini 4 and later majors get thinkingLevel low when off ──────

test("gemini-4 family sends only thinkingLevel low for reasoning_effort none", () => {
  for (const model of [
    "gemini-4-argon",
    "vertex/gemini-4-argon",
    "zed-hosted/gemini-4-argon",
    "gemini-4-argon-low",
  ]) {
    const tc = openaiThinking(model, { max_tokens: 65536, reasoning_effort: "none" });
    assert.deepEqual(tc, { thinkingLevel: "low" }, model);
    assert.equal(tc?.thinkingBudget, undefined, model);
    assert.equal(tc?.includeThoughts, undefined, model);
  }
});

test("future Gemini majors 5/6/10 also send thinkingLevel low for none", () => {
  for (const model of ["gemini-5-pro", "gemini-6-flash", "gemini-10-flash"]) {
    const tc = openaiThinking(model, { max_tokens: 65536, reasoning_effort: "none" });
    assert.deepEqual(tc, { thinkingLevel: "low" }, model);
  }
});

test("gemini-4-argon keeps thinkingLevel high for effort high", () => {
  const tc = openaiThinking("gemini-4-argon", { max_tokens: 65536, reasoning_effort: "high" });
  assert.deepEqual(tc, { thinkingLevel: "high", includeThoughts: true });
});

test("gemini-4-argon thinking.budget_tokens 0 is low, 24576 is high", () => {
  const zero = openaiThinking("gemini-4-argon", {
    max_tokens: 65536,
    thinking: { type: "enabled", budget_tokens: 0 },
  });
  assert.deepEqual(zero, { thinkingLevel: "low" });
  const high = openaiThinking("gemini-4-argon", {
    max_tokens: 65536,
    thinking: { type: "enabled", budget_tokens: 24576 },
  });
  assert.deepEqual(high, { thinkingLevel: "high", includeThoughts: true });
});

test("Claude path sends thinkingLevel low for gemini-4-argon budget_tokens 0", () => {
  const tc = claudeThinking("gemini-4-argon", {
    max_tokens: 65536,
    thinking: { type: "enabled", budget_tokens: 0 },
  });
  assert.deepEqual(tc, { thinkingLevel: "low" });
});

test("gemini-4-argon default injection at max_tokens 1 sends thinkingLevel low", () => {
  const tc = openaiThinking("gemini-4-argon", { max_tokens: 1 });
  assert.deepEqual(tc, { thinkingLevel: "low" });
});

// ── C. Predicate boundaries ─────────────────────────────────────────

test("isGeminiThinkingLevelModel accepts 3.8 and every major >= 4", () => {
  for (const model of [
    "gemini-3.8-flash-high",
    "agy/gemini-3.8-flash-high",
    "gemini-4",
    "gemini-4-argon",
    "gemini-4.5-flash",
    "gemini-5-pro",
    "gemini-10-flash",
    "vertex/gemini-4-argon",
  ]) {
    assert.equal(isGeminiThinkingLevelModel(model), true, model);
  }
});

test("isGeminiThinkingLevelModel rejects majors <= 3 and gemma-4", () => {
  for (const model of [
    "gemini-2.5-flash",
    "gemini-3",
    "gemini-3-flash",
    "gemini-3.1-pro",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
    "gemini-1.5-pro",
    "gemma-4-27b-it",
  ]) {
    assert.equal(isGeminiThinkingLevelModel(model), false, model);
  }
});

test("isGemini4PlusModel excludes 3.8 and includes major >= 4", () => {
  assert.equal(isGemini4PlusModel("gemini-3.8-flash-high"), false);
  for (const model of ["gemini-4-argon", "gemini-5-pro", "gemini-10-flash"]) {
    assert.equal(isGemini4PlusModel(model), true, model);
  }
});

test("gemma-4-27b-it still gets no thinkingConfig (existing guard)", () => {
  const tc = openaiThinking("gemma-4-27b-it", { max_tokens: 65536, reasoning_effort: "none" });
  assert.equal(tc, undefined);
});

// ── D. Zed adapter uppercases the enum ──────────────────────────────

const { adaptGeminiRequestForZed } = zed.__test__;

function translated(model: string, extra: Record<string, unknown>) {
  return openaiToGeminiRequest(model, { messages, ...extra }, false) as GeminiReq;
}

test("Zed uppercases the low level produced for gemini-4-argon none", () => {
  const request = translated("gemini-4-argon", { max_tokens: 64, reasoning_effort: "none" });
  assert.deepEqual(request.generationConfig?.thinkingConfig, { thinkingLevel: "low" });
  adaptGeminiRequestForZed(request);
  assert.equal(request.generationConfig?.thinkingConfig?.thinkingLevel, "LOW");
});

test("Zed uppercases gemini-3.8 high but leaves its numeric off-switch alone", () => {
  const high = translated("gemini-3.8-flash-high", {
    max_tokens: 65536,
    reasoning_effort: "high",
  });
  adaptGeminiRequestForZed(high);
  assert.equal(high.generationConfig?.thinkingConfig?.thinkingLevel, "HIGH");

  const off = translated("gemini-3.8-flash-high", {
    max_tokens: 65536,
    reasoning_effort: "none",
  });
  adaptGeminiRequestForZed(off);
  assert.deepEqual(off.generationConfig?.thinkingConfig, {
    thinkingBudget: 0,
    includeThoughts: false,
  });
  assert.equal(off.generationConfig?.thinkingConfig?.thinkingLevel, undefined);
});

test("Zed leaves a missing or non-string thinkingLevel untouched", () => {
  const noConfig = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  const beforeNoConfig = JSON.stringify(noConfig);
  assert.equal(adaptGeminiRequestForZed(noConfig), noConfig);
  assert.equal(JSON.stringify(noConfig), beforeNoConfig);

  const nonString = { generationConfig: { thinkingConfig: { thinkingLevel: 2 } } };
  const beforeNonString = JSON.stringify(nonString);
  adaptGeminiRequestForZed(nonString);
  assert.equal(JSON.stringify(nonString), beforeNonString);
});
