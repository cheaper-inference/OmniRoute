import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");
const { applyReasoningRuleDirective } = await import("../../src/lib/reasoningRouting/policy.ts");

const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";

function makeLog() {
  const messages: Array<[string, string]> = [];
  return {
    info: (tag: string, msg: string) => messages.push([tag, msg]),
    messages,
  };
}

// #18994: a `force` + `none` reasoning-routing rule emits `reasoning_effort: "none"`
// (src/lib/reasoningRouting/policy.ts). Workers AI rejects that literal with
//   400 AiError: Invalid input (code 8001)
// while low/medium and an absent field are accepted, so the dispatch-time sanitizer
// must drop it for cloudflare-ai.
test("force+none rule on a cloudflare-ai target reaches the wire without reasoning_effort", () => {
  const log = makeLog();
  const ruled = applyReasoningRuleDirective({
    model: MODEL,
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

  const result = sanitizeReasoningEffortForProvider(ruled, "cloudflare-ai", MODEL, log) as Record<
    string,
    unknown
  >;

  assert.equal("reasoning_effort" in result, false);
  assert.deepEqual(result.messages, [{ role: "user", content: "hi" }], "other fields preserved");
  assert.ok(
    log.messages.some(([tag, msg]) => tag === "REASONING_SANITIZE" && /none/.test(msg)),
    "the strip must be logged"
  );
});

test("cloudflare-ai drops none from the nested reasoning carrier too", () => {
  const body = { model: MODEL, reasoning: { effort: "none" } };
  const result = sanitizeReasoningEffortForProvider(body, "cloudflare-ai", MODEL, null) as Record<
    string,
    unknown
  >;

  assert.equal("reasoning" in result, false);
});

test("cloudflare-ai keeps accepted efforts unchanged", () => {
  for (const effort of ["low", "medium", "high"]) {
    const body = { model: MODEL, reasoning_effort: effort };
    const result = sanitizeReasoningEffortForProvider(body, "cloudflare-ai", MODEL, null);
    assert.equal(result, body, `${effort} passes through`);
  }
});

test("only cloudflare-ai is affected: native deepseek keeps none", () => {
  const body = { model: "deepseek-flash", reasoning_effort: "none" };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-flash", null);

  assert.equal(result, body);
});
