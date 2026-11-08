import test from "node:test";
import assert from "node:assert/strict";

import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";

// Workers AI validates every message against `required: ["role", "content"]`. An assistant turn
// that only carries tool_calls arrives without a `content` key (the Claude→OpenAI translator omits
// it when there is no text) or with `content: null` (standard OpenAI clients), and Cloudflare
// answers HTTP 400 "required properties at '/messages/3' are 'role,content'".
test("CloudflareAIExecutor.transformRequest fills missing/null content with an empty string (#4838)", () => {
  const executor = new CloudflareAIExecutor();
  const toolCalls = [
    {
      id: "call_1",
      type: "function",
      function: { name: "get_weather", arguments: '{"city":"Paris"}' },
    },
  ];
  const body = {
    model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    messages: [
      { role: "user", content: "weather in Paris?" },
      { role: "assistant", tool_calls: toolCalls },
      { role: "assistant", content: null, tool_calls: toolCalls },
      { role: "tool", tool_call_id: "call_1", content: "sunny" },
    ],
  };

  const out = executor.transformRequest(body.model, body, false, null) as {
    messages: Array<Record<string, unknown>>;
  };

  assert.equal(out.messages.length, 4);
  for (const msg of out.messages) {
    assert.ok("content" in msg, `message ${JSON.stringify(msg)} must carry content`);
    assert.equal(typeof msg.content, "string");
  }
  assert.equal(out.messages[0].content, "weather in Paris?");
  assert.equal(out.messages[1].content, "");
  assert.deepEqual(out.messages[1].tool_calls, toolCalls);
  assert.equal(out.messages[2].content, "");
  assert.deepEqual(out.messages[2].tool_calls, toolCalls);
  assert.equal(out.messages[3].content, "sunny");
  assert.equal(out.messages[3].tool_call_id, "call_1");
});

test("CloudflareAIExecutor.transformRequest still flattens all-text arrays alongside the fill (#4838)", () => {
  const executor = new CloudflareAIExecutor();
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "a" },
          { type: "text", text: "b" },
        ],
      },
      { role: "assistant", tool_calls: [] },
    ],
  };
  const out = executor.transformRequest("m", body, false, null) as {
    messages: Array<Record<string, unknown>>;
  };
  assert.equal(out.messages[0].content, "ab");
  assert.equal(out.messages[1].content, "");
});
