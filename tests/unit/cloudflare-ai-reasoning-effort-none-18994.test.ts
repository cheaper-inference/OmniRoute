import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");
const { applyReasoningRuleDirective } = await import("../../src/lib/reasoningRouting/policy.ts");

function makeLog() {
  const messages: Array<[string, string]> = [];
  return {
    info: (tag: string, msg: string) => messages.push([tag, msg]),
    messages,
  };
}

function sanitize(body: Record<string, unknown>, model: string, log = null) {
  return sanitizeReasoningEffortForProvider(body, "cloudflare-ai", model, log) as Record<
    string,
    unknown
  >;
}

// #18994: a `force` + `none` reasoning-routing rule emits `reasoning_effort: "none"`
// (src/lib/reasoningRouting/policy.ts). Verified live against Workers AI on 2026-11-05:
// these models reject it (400, code 8001 or "Supported types are xhigh (default),
// medium, and low") and accept `low`, which reasons less than an absent field.
const REJECTING = [
  "@cf/openai/gpt-oss-20b",
  "@cf/openai/gpt-oss-120b",
  "@cf/qwen/qwen3.8-27b",
  "@cf/nvidia/nemotron-3-120b-a12b",
  "@cf/zai-org/glm-4.7-flash",
];

test("force+none rule on a Workers AI model that rejects none reaches the wire as low", () => {
  const log = makeLog();
  const ruled = applyReasoningRuleDirective({
    model: "@cf/qwen/qwen3.8-27b",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
    _omnirouteReasoningRule: {
      id: "rule-1",
      effortMode: "force",
      targetEffort: "none",
      budgetAction: "remove",
      budgetTokens: null,
    },
  }) as Record<string, unknown>;
  assert.equal(ruled.reasoning_effort, "none", "the rule itself still emits the none carrier");

  const result = sanitizeReasoningEffortForProvider(
    ruled,
    "cloudflare-ai",
    "@cf/qwen/qwen3.8-27b",
    log
  ) as Record<string, unknown>;

  assert.equal(result.reasoning_effort, "low");
  assert.deepEqual(result.messages, [{ role: "user", content: "hi" }], "other fields preserved");
  assert.ok(
    log.messages.some(([tag, msg]) => tag === "REASONING_SANITIZE" && /none → low/.test(msg)),
    "the clamp must be logged"
  );
});

test("every Workers AI model verified to reject none is clamped to low", () => {
  for (const model of REJECTING) {
    assert.equal(
      sanitize({ model, reasoning_effort: "none" }, model).reasoning_effort,
      "low",
      model
    );
  }
});

test("the nested reasoning carrier is clamped too", () => {
  const model = "@cf/openai/gpt-oss-20b";
  const result = sanitize({ model, reasoning: { effort: "none" } }, model);

  assert.deepEqual(result.reasoning, { effort: "low" });
});

// Dropping the field instead would turn reasoning back on: an absent effort runs the
// model's default tier. qwen3-30b-a3b accepts `none` and stops thinking (3 completion
// tokens vs 202 absent),
// and glm-5.2 / kimi-k2.6 / deepseek-v4 list `none` as a supported effort.
test("Workers AI models that accept none keep it", () => {
  for (const model of [
    "@cf/qwen/qwen3-30b-a3b-fp8",
    "@cf/zai-org/glm-5.2",
    "@cf/moonshotai/kimi-k2.6",
    "@cf/deepseek-ai/deepseek-v4-flash-0731",
  ]) {
    const body = { model, reasoning_effort: "none" };
    assert.equal(sanitize(body, model).reasoning_effort, "none", model);
  }
});

test("glm-5.3 on Workers AI (none normalizes to max there) still maps none to low", () => {
  const model = "@cf/zai-org/glm-5.3";
  assert.equal(sanitize({ model, reasoning_effort: "none" }, model).reasoning_effort, "low");
});

test("rejecting models keep accepted efforts unchanged", () => {
  const model = "@cf/openai/gpt-oss-20b";
  for (const effort of ["low", "medium", "high"]) {
    const body = { model, reasoning_effort: effort };
    assert.equal(sanitize(body, model), body, `${effort} passes through`);
  }
});

test("only cloudflare-ai is affected: the same model id elsewhere keeps none", () => {
  const body = { model: "openai/gpt-oss-20b", reasoning_effort: "none" };
  const result = sanitizeReasoningEffortForProvider(body, "groq", "openai/gpt-oss-20b", null);

  assert.equal((result as Record<string, unknown>).reasoning_effort, "none");
});
