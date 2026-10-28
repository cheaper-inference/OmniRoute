import assert from "node:assert/strict";
import test from "node:test";
import { resetDbInstance } from "@/lib/db/core.ts";
import { openaiResponsesToOpenAIRequest } from "@omniroute/open-sse/translator/request/openai-responses.ts";
import { normalizeResponsesReasoningEffort } from "@omniroute/open-sse/translator/request/openai-responses/helpers.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";
import { translateRequest } from "@omniroute/open-sse/translator/index.ts";

test.after(() => resetDbInstance());

const responsesBody = (effort: string) => ({
  input: "Reply OK",
  reasoning: { effort },
});

test("Claude target keeps max for max-capable Claude models, with or without a provider prefix", () => {
  for (const model of [
    "claude-opus-5-5",
    "cc/claude-opus-5-5",
    "claude/claude-opus-5-5",
    "claude-opus-5",
    "claude-fable-5",
    "claude-fable-5-1",
    "claude-opus-4-8",
    "claude-opus-4-7",
    "claude-opus-4-6",
    "claude-sonnet-5",
    "claude-sonnet-4-6",
    "claude-haiku-5-5",
    "cc/claude-haiku-5-5",
    "claude-mythos-5",
  ]) {
    assert.equal(
      normalizeResponsesReasoningEffort("max", model, FORMATS.CLAUDE),
      "max",
      `${model} should keep max`
    );
  }
});

test("Claude target clamps max to xhigh for Claude models without max", () => {
  for (const model of [
    "claude-sonnet-5-5",
    "cc/claude-sonnet-5-5",
    "claude-sonnet-4-5-20250929",
    "cc/claude-sonnet-4-5-20250929",
    "claude-opus-4-5-20251101",
    "claude-haiku-4-5-20251001",
    "cc/claude-haiku-4-5-20251001",
    "glm-5",
    "",
  ]) {
    assert.equal(
      normalizeResponsesReasoningEffort("max", model, FORMATS.CLAUDE),
      "xhigh",
      `${model || "(empty)"} should clamp to xhigh`
    );
  }
});

test("Non-Claude targets keep clamping Claude max to xhigh", () => {
  for (const targetFormat of [
    undefined,
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    FORMATS.GEMINI,
  ]) {
    assert.equal(
      normalizeResponsesReasoningEffort("max", "claude-opus-5-5", targetFormat),
      "xhigh"
    );
    assert.equal(
      normalizeResponsesReasoningEffort("max", "cc/claude-opus-5-5", targetFormat),
      "xhigh"
    );
  }
});

test("Codex and Kiro max handling is unchanged", () => {
  assert.equal(normalizeResponsesReasoningEffort("max", "gpt-5.6-sol"), "max");
  assert.equal(normalizeResponsesReasoningEffort("max", "codex/gpt-5.6-sol"), "max");
  assert.equal(normalizeResponsesReasoningEffort("max", "gpt-5.5"), "xhigh");
  assert.equal(normalizeResponsesReasoningEffort("max", "claude-opus-5.5", FORMATS.KIRO), "max");
  assert.equal(
    normalizeResponsesReasoningEffort("max", "kiro/claude-sonnet-5", FORMATS.KIRO),
    "xhigh"
  );
});

test("Non-max efforts are untouched for Claude targets", () => {
  for (const effort of ["low", "medium", "high", "xhigh"]) {
    assert.equal(
      normalizeResponsesReasoningEffort(effort, "claude-opus-5-5", FORMATS.CLAUDE),
      effort
    );
  }
});

test("Responses -> Chat keeps max on the pivot when the target is Claude", () => {
  const toClaude = openaiResponsesToOpenAIRequest("claude-opus-5-5", responsesBody("max"), true, {
    _targetFormat: FORMATS.CLAUDE,
  }) as Record<string, unknown>;
  assert.equal(toClaude.reasoning_effort, "max");

  const toOpenAI = openaiResponsesToOpenAIRequest("claude-opus-5-5", responsesBody("max"), true, {
    _targetFormat: FORMATS.OPENAI,
  }) as Record<string, unknown>;
  assert.equal(toOpenAI.reasoning_effort, "xhigh");
});

test("Responses -> Claude sends output_config.effort max upstream for Opus 5.5", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "claude-opus-5-5",
    responsesBody("max"),
    true,
    null,
    "claude"
  ) as { output_config?: { effort?: string } };
  assert.equal(translated.output_config?.effort, "max");
});

test("Responses -> Claude still sends xhigh for Sonnet 5.5", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "claude-sonnet-5-5",
    responsesBody("max"),
    true,
    null,
    "claude"
  ) as { output_config?: { effort?: string } };
  assert.equal(translated.output_config?.effort, "xhigh");
});

test("Responses -> Claude does not send max upstream for Opus 4.5", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "claude-opus-4-5-20251101",
    responsesBody("max"),
    true,
    null,
    "claude"
  ) as { output_config?: unknown; thinking?: { type?: string } };
  // max -> xhigh here, then openai-to-claude lowers xhigh to the high thinking budget.
  assert.equal(translated.output_config, undefined);
  assert.equal(translated.thinking?.type, "enabled");
});
