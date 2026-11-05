import test from "node:test";
import assert from "node:assert/strict";

import { CloudflareAIExecutor } from "../../open-sse/executors/cloudflare-ai.ts";

const MODEL = "@cf/qwen/qwen3-30b-a3b-fp8";
const CREDENTIALS = { apiKey: "cf-api-token", providerSpecificData: { accountId: "account-123" } };

// Verified live on 2026-11-05: with thinking off (`reasoning_effort: "none"` or
// `chat_template_kwargs.enable_thinking: false`), Workers AI returns qwen3-30b-a3b's
// whole answer in `reasoning_content`/`reasoning` and sets `content: null`.
function cloudflareReply(message: Record<string, unknown>, init: ResponseInit = {}) {
  return new Response(
    JSON.stringify({
      id: "id-1",
      object: "chat.completion",
      model: MODEL,
      choices: [{ index: 0, message: { role: "assistant", ...message }, finish_reason: "stop" }],
      usage: { prompt_tokens: 27, completion_tokens: 3, total_tokens: 30 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" }, ...init }
  );
}

async function run(
  body: Record<string, unknown>,
  reply: () => Response,
  stream = false
): Promise<Response> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => reply();
  try {
    const result = await new CloudflareAIExecutor().execute({
      model: MODEL,
      body: { model: MODEL, messages: [{ role: "user", content: "17+25?" }], ...body },
      stream,
      credentials: CREDENTIALS,
    });
    return (result as { response: Response }).response;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

const REASONING_ONLY = { content: null, reasoning: "42", reasoning_content: "42" };

test("thinking off via reasoning_effort none: the answer moves from reasoning_content to content", async () => {
  const response = await run({ reasoning_effort: "none" }, () => cloudflareReply(REASONING_ONLY));
  const payload = await response.json();
  const message = payload.choices[0].message;

  assert.equal(response.status, 200);
  assert.equal(message.content, "42");
  assert.equal("reasoning_content" in message, false);
  assert.equal("reasoning" in message, false);
  assert.deepEqual(payload.usage, { prompt_tokens: 27, completion_tokens: 3, total_tokens: 30 });
});

test("thinking off via chat_template_kwargs.enable_thinking false is handled the same way", async () => {
  const response = await run({ chat_template_kwargs: { enable_thinking: false } }, () =>
    cloudflareReply(REASONING_ONLY)
  );
  const message = (await response.json()).choices[0].message;

  assert.equal(message.content, "42");
});

// With thinking on, a null content next to reasoning means the model never got past
// its chain of thought (e.g. max_tokens hit). Promoting it would hand the client the
// reasoning as if it were the answer.
test("thinking on: a reasoning-only reply is left alone", async () => {
  const reply = { content: null, reasoning_content: "Okay, let's see. 17 plus" };
  const response = await run({}, () => cloudflareReply(reply));
  const message = (await response.json()).choices[0].message;

  assert.equal(message.content, null);
  assert.equal(message.reasoning_content, "Okay, let's see. 17 plus");
});

test("a reply that already has content keeps both fields", async () => {
  const reply = { content: "42", reasoning_content: "" };
  const response = await run({ reasoning_effort: "none" }, () => cloudflareReply(reply));
  const message = (await response.json()).choices[0].message;

  assert.equal(message.content, "42");
});

test("a tool-call turn is left alone", async () => {
  const toolCalls = [
    { id: "call_1", type: "function", function: { name: "add", arguments: '{"a":17,"b":25}' } },
  ];
  const reply = { content: null, reasoning_content: "calling add", tool_calls: toolCalls };
  const response = await run({ reasoning_effort: "none" }, () => cloudflareReply(reply));
  const message = (await response.json()).choices[0].message;

  assert.equal(message.content, null);
  assert.deepEqual(message.tool_calls, toolCalls);
});

test("streaming responses and upstream errors pass through untouched", async () => {
  const sse = () =>
    new Response('data: {"choices":[{"delta":{"content":"42"}}]}\n\n', {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  const streamed = await run({ reasoning_effort: "none" }, sse, true);
  assert.equal(await streamed.text(), 'data: {"choices":[{"delta":{"content":"42"}}]}\n\n');

  const error = () =>
    new Response('{"errors":[{"code":8001}]}', {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  const failed = await run({ reasoning_effort: "none" }, error);
  assert.equal(failed.status, 400);
  assert.equal(await failed.text(), '{"errors":[{"code":8001}]}');
});
