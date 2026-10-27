// Baseten Model APIs reasoning contract. Default-on models read the top-level
// `reasoning_effort` (validated per model); opt-in models (GLM 4.7 / GLM 5.2,
// Kimi K2.6 / K2.7-Code, Nemotron 3 Ultra) also need
// `chat_template_args.enable_thinking: true`. Disabling always uses
// `reasoning_effort: "none"` — GLM 5.2 rejects `enable_thinking: false`.
import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { CHAT_OPENAI_COMPAT_MODELS } = await import("../../open-sse/config/providers/shared.ts");

type Body = Record<string, unknown>;

const GLM_52 = "zai-org/GLM-5.2";
const GLM_53 = "zai-org/GLM-5.3";
const NEMOTRON = "nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B";

function sanitize(model: string, body: Body, provider = "baseten"): Body {
  return sanitizeReasoningEffortForProvider(
    { model, messages: [], ...body },
    provider,
    model
  ) as Body;
}

test("baseten opt-in model: active effort adds chat_template_args.enable_thinking", () => {
  const result = sanitize(GLM_52, { reasoning_effort: "high" });
  assert.deepEqual(result.chat_template_args, { enable_thinking: true });
  assert.equal(result.reasoning_effort, "high");
});

test("baseten opt-in model: none keeps reasoning_effort none and never sends the flag", () => {
  const result = sanitize(GLM_52, { reasoning_effort: "none" });
  assert.equal(result.reasoning_effort, "none");
  assert.equal(result.chat_template_args, undefined);
  assert.ok(!("enable_thinking" in result));
});

test("baseten GLM-5.2: unsupported effort clamps to the nearest supported tier", () => {
  assert.equal(sanitize(GLM_52, { reasoning_effort: "medium" }).reasoning_effort, "high");
  assert.equal(sanitize(GLM_52, { reasoning_effort: "low" }).reasoning_effort, "high");
  assert.equal(sanitize(GLM_52, { reasoning_effort: "xhigh" }).reasoning_effort, "max");
  assert.equal(sanitize(GLM_52, { reasoning_effort: "max" }).reasoning_effort, "max");
});

test("baseten default-on GLM-5.3: no chat_template_args, none passes through", () => {
  const high = sanitize(GLM_53, { reasoning_effort: "high" });
  assert.equal(high.reasoning_effort, "high");
  assert.equal(high.chat_template_args, undefined);

  const none = sanitize(GLM_53, { reasoning_effort: "none" });
  assert.equal(none.reasoning_effort, "none");
  assert.equal(none.chat_template_args, undefined);

  assert.equal(sanitize(GLM_53, { reasoning_effort: "medium" }).reasoning_effort, "high");
});

test("baseten effort-blind opt-in models (Nemotron, Kimi K2.x, GLM-4.7) clamp to none|high", () => {
  for (const model of [
    NEMOTRON,
    "moonshotai/Kimi-K2.6",
    "moonshotai/Kimi-K2.7-Code",
    "zai-org/GLM-4.7",
  ]) {
    const result = sanitize(model, { reasoning_effort: "max" });
    assert.equal(result.reasoning_effort, "high", model);
    assert.deepEqual(result.chat_template_args, { enable_thinking: true }, model);
  }
});

test("baseten: caller chat_template_args are preserved and an explicit flag is not overridden", () => {
  const merged = sanitize(GLM_52, { reasoning_effort: "high", chat_template_args: { foo: 1 } });
  assert.deepEqual(merged.chat_template_args, { foo: 1, enable_thinking: true });

  const explicit = sanitize(GLM_52, {
    reasoning_effort: "high",
    chat_template_args: { enable_thinking: false },
  });
  assert.deepEqual(explicit.chat_template_args, { enable_thinking: false });
});

test("baseten: nested reasoning.effort is moved to the top-level reasoning_effort", () => {
  const result = sanitize(GLM_52, { reasoning: { effort: "high", summary: "auto" } });
  assert.equal(result.reasoning_effort, "high");
  assert.deepEqual(result.reasoning, { summary: "auto" });
  assert.deepEqual(result.chat_template_args, { enable_thinking: true });
});

test("baseten: no effort leaves the body untouched", () => {
  const body = { model: GLM_52, messages: [] };
  assert.equal(sanitizeReasoningEffortForProvider(body, "baseten", GLM_52), body);
});

test("non-baseten provider is untouched by the Baseten mapping", () => {
  const result = sanitize("zai-org/GLM-5.2", { reasoning_effort: "high" }, "together");
  assert.equal(result.chat_template_args, undefined);
});

test("DefaultExecutor: baseten transformRequest applies the opt-in switch", () => {
  const result = new DefaultExecutor("baseten").transformRequest(
    GLM_52,
    { model: GLM_52, reasoning_effort: "medium", messages: [] },
    false,
    {}
  ) as Body;
  assert.deepEqual(result.chat_template_args, { enable_thinking: true });
  assert.equal(result.reasoning_effort, "high");
});

test("baseten seed catalog lists the current Model APIs slugs with context lengths", () => {
  const models = CHAT_OPENAI_COMPAT_MODELS.baseten;
  const ids = models.map((m) => m.id);
  for (const id of [GLM_53, GLM_52, "zai-org/GLM-4.7", "moonshotai/Kimi-K3", NEMOTRON]) {
    assert.ok(ids.includes(id), `${id} missing from baseten seed`);
  }
  for (const stale of ["zai-org/GLM-5", "MiniMaxAI/MiniMax-M2.5", "nvidia/Nemotron-120B-A12B"]) {
    assert.ok(!ids.includes(stale), `${stale} should be dropped from baseten seed`);
  }
  assert.ok(models.every((m) => typeof m.contextLength === "number" && m.contextLength > 0));
});
