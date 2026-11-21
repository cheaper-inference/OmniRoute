// A combo gives every target a shallow copy of the client body, so nested objects are shared.
// The Codex effort-suffix guard removes output_config.effort; it must do that on its own copy,
// or the next target of the combo loses the client's effort.
import test from "node:test";
import assert from "node:assert/strict";

import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";

function run(outputConfig: Record<string, unknown>, model: string) {
  const comboBody: Record<string, unknown> = {
    model: "m",
    messages: [],
    output_config: outputConfig,
  };
  const translatedBody: Record<string, unknown> = { ...comboBody };
  finalizeTranslatedRequest({
    translatedBody,
    body: comboBody,
    provider: "codex",
    alias: "cx",
    effectiveModel: model,
    finalModelToUpstream: model,
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    isClaudePassthrough: false,
    credentials: {},
    previousResponseIdMode: "auto",
    log: null,
  } as unknown as Parameters<typeof finalizeTranslatedRequest>[0]);
  return { comboBody, translatedBody };
}

test("the effort is stripped from the target body but kept in the shared combo body", () => {
  const { comboBody, translatedBody } = run(
    { effort: "high", format: { type: "json_schema" } },
    "gpt-5.5-high"
  );
  assert.equal((translatedBody.output_config as Record<string, unknown>)?.effort, undefined);
  assert.deepEqual(comboBody.output_config, { effort: "high", format: { type: "json_schema" } });
});

test("an output_config left empty is removed from the target body only", () => {
  const { comboBody, translatedBody } = run({ effort: "high" }, "gpt-5.5-high");
  assert.equal(translatedBody.output_config, undefined);
  assert.deepEqual(comboBody.output_config, { effort: "high" });
});

test("guard: a model without an effort suffix keeps the effort", () => {
  const { translatedBody } = run({ effort: "high" }, "gpt-5.5");
  assert.deepEqual(translatedBody.output_config, { effort: "high" });
});
