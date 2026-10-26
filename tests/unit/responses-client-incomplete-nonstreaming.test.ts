import test from "node:test";
import assert from "node:assert/strict";

import { translateNonStreamingClientResponse } from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";

function responsesClient(finishReason: string) {
  return translateNonStreamingClientResponse({
    responseBody: {
      id: "chatcmpl-incomplete",
      object: "chat.completion",
      created: 1,
      model: "gpt-test",
      choices: [{ index: 0, message: { role: "assistant", content: "partial" }, finish_reason: finishReason }],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
    responsePayloadFormat: "openai",
    clientResponseFormat: "openai-responses",
    sourceFormat: "openai-responses",
    provider: "openai",
    model: "gpt-test",
    requestBody: { input: "hi" },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
  }).response;
}

test("Chat upstream to a Responses client, non-streaming: a length finish is status incomplete with max_output_tokens", () => {
  const response = responsesClient("length");
  assert.equal(response.object, "response");
  assert.equal(response.status, "incomplete");
  assert.deepEqual(response.incomplete_details, { reason: "max_output_tokens" });
});

test("Chat upstream to a Responses client, non-streaming: a content filter finish is status incomplete with content_filter", () => {
  const response = responsesClient("content_filter");
  assert.equal(response.status, "incomplete");
  assert.deepEqual(response.incomplete_details, { reason: "content_filter" });
});

test("Chat upstream to a Responses client, non-streaming: a clean stop stays completed", () => {
  const response = responsesClient("stop");
  assert.equal(response.status, "completed");
  assert.equal(response.incomplete_details, undefined);
});
