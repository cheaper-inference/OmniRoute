import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-claude-system-effort-"));

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

function turns(directive?: Record<string, unknown>) {
  return [
    { role: "user", content: "hi" },
    { role: "assistant", content: "ok" },
    ...(directive ? [{ role: "system", content: [], output_config: directive }] : []),
    { role: "user", content: "again" },
  ];
}

test("Claude to OpenAI takes reasoning effort from the last system directive", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: [
        { role: "system", content: [], output_config: { effort: "medium" } },
        ...turns({ effort: "high" }),
      ],
    },
    false
  );

  assert.equal(out.reasoning_effort, "high");
});

test("Claude to OpenAI keeps the top-level effort without a system directive", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    { max_tokens: 64, output_config: { effort: "low" }, messages: turns() },
    false
  );

  assert.equal(out.reasoning_effort, "low");
});

test("Claude to OpenAI ignores a system directive that has no effort", () => {
  const out = claudeToOpenAIRequest(
    "gpt-5",
    {
      max_tokens: 64,
      output_config: { effort: "low" },
      messages: turns({ format: { type: "json_schema", schema: {} } }),
    },
    false
  );

  assert.equal(out.reasoning_effort, "low");
});
