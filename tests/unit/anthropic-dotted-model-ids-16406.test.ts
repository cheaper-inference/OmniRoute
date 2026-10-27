// Regression test for #16406: the first-party `anthropic` registry (and /v1/models) lists dotted
// ids such as `claude-haiku-4.5`, but the Anthropic Messages API only accepts the dashed form.
// The dotted id used to go upstream unchanged and 404 (and, via model-family fallback, silently
// serve a different model).
import test from "node:test";
import assert from "node:assert/strict";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";

const { getModelInfoCore } = await import("../../open-sse/services/model.ts");
const { resolveProviderModelAlias } =
  await import("../../open-sse/services/modelCanonicalization.ts");
const { applyClaudeEffortVariant } =
  await import("../../open-sse/handlers/chatCore/claudeEffortVariant.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const DOTTED_TO_DASHED: Record<string, string> = {
  "claude-opus-4.8": "claude-opus-4-8",
  "claude-opus-4.7": "claude-opus-4-7",
  "claude-opus-4.6": "claude-opus-4-6",
  "claude-opus-4.5": "claude-opus-4-5",
  "claude-sonnet-4.6": "claude-sonnet-4-6",
  "claude-sonnet-4.5": "claude-sonnet-4-5",
  "claude-haiku-4.5": "claude-haiku-4-5",
};

test("anthropic dotted catalog ids resolve to the dashed ids the Messages API accepts", () => {
  for (const [dotted, dashed] of Object.entries(DOTTED_TO_DASHED)) {
    assert.equal(resolveProviderModelAlias("anthropic", dotted), dashed, dotted);
  }
});

test("a request for anthropic/<dotted id> is routed with the dashed model", async () => {
  for (const [dotted, dashed] of Object.entries(DOTTED_TO_DASHED)) {
    const info = await getModelInfoCore(`anthropic/${dotted}`, null);
    assert.equal(info.provider, "anthropic", dotted);
    assert.equal(info.model, dashed, dotted);
  }
});

test("dashed anthropic ids and other providers are left alone", async () => {
  assert.equal(resolveProviderModelAlias("anthropic", "claude-haiku-4-5"), "claude-haiku-4-5");
  assert.equal(resolveProviderModelAlias("anthropic", "claude-sonnet-5"), "claude-sonnet-5");
  // kiro keeps its own direction (dashed -> dotted).
  assert.equal(resolveProviderModelAlias("kiro", "claude-sonnet-4-6"), "claude-sonnet-4.6");
  assert.equal(resolveProviderModelAlias("kiro", "claude-sonnet-4.6"), "claude-sonnet-4.6");
});

test("an effort-suffixed dotted anthropic id is stripped to the dashed base id", () => {
  const body: Record<string, unknown> = { model: "claude-opus-4.7-high", messages: [] };
  const result = applyClaudeEffortVariant({
    provider: "anthropic",
    effectiveModel: "claude-opus-4.7-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(result.effectiveModel, "claude-opus-4-7");
  assert.equal(body.model, "claude-opus-4-7");
  assert.equal(body.reasoning_effort, "high");
  assert.match(String(result.log), /claude-opus-4-7/);
});
