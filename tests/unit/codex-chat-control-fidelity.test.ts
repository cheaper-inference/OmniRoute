import test from "node:test";
import assert from "node:assert/strict";

import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";

const credentials = { apiKey: "synthetic", providerSpecificData: {} };

function finalBody(parallelToolCalls: boolean | undefined): Record<string, unknown> {
  const chat: Record<string, unknown> = {
    model: "gpt-5.6-sol",
    messages: [{ role: "user", content: "synthetic" }],
    tools: [
      {
        type: "function",
        function: {
          name: "lookup",
          description: "synthetic",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
    verbosity: "low",
  };
  if (parallelToolCalls !== undefined) chat.parallel_tool_calls = parallelToolCalls;
  const translated = openaiToOpenAIResponsesRequest("gpt-5.6-sol", chat, true, credentials);
  return new CodexExecutor().transformRequest(
    "gpt-5.6-sol",
    translated,
    true,
    credentials
  ) as Record<string, unknown>;
}

test("Chat-to-Codex preserves explicit parallel_tool_calls booleans and omission", () => {
  const disabled = finalBody(false);
  const enabled = finalBody(true);
  const omitted = finalBody(undefined);

  assert.equal(disabled.parallel_tool_calls, false);
  assert.equal(enabled.parallel_tool_calls, true);
  assert.equal(Object.hasOwn(omitted, "parallel_tool_calls"), false);
  assert.deepEqual(disabled.text, { verbosity: "low" });
});
