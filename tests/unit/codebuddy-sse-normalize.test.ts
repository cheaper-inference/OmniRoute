// CodeBuddy (CN + Intl) streams OpenAI-shaped chat.completion.chunk SSE with two
// kinds of "dirt" that strict OpenAI clients reject: `finish_reason: ""` on
// mid-stream chunks (not a valid enum value, and not terminal) and empty legacy
// `delta.function_call` shells ({name:"", arguments:""}). The executors normalise
// both before the response leaves the executor, and drop an empty `tools: []`
// from the request.
import test from "node:test";
import assert from "node:assert/strict";

import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";
import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import { responseFromResult } from "../../open-sse/executors/codebuddy/shared.ts";
import {
  createSseNormalizeTransform,
  normalizeChatChunk,
} from "../../open-sse/executors/codebuddy/sseNormalize.ts";

type Chunk = { choices: Array<Record<string, unknown>> } & Record<string, unknown>;
type Executor = CodeBuddyCnExecutor | CodeBuddyIntlExecutor;

const EXECUTORS: Array<[string, () => Executor]> = [
  ["codebuddy-cn", () => new CodeBuddyCnExecutor()],
  ["codebuddy-intl", () => new CodeBuddyIntlExecutor()],
];

async function pipeChunks(chunks: string[]): Promise<string> {
  const encoder = new TextEncoder();
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSseNormalizeTransform())).text();
}

async function executeWithUpstream(
  executor: Executor,
  upstream: Response
): Promise<{ response: Response; body: string }> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => upstream;
  try {
    const result = await executor.execute({
      model: "glm-5.2",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { accessToken: "test-token" },
    });
    const response = responseFromResult(result);
    return { response, body: await response.text() };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test('normalizeChatChunk: finish_reason "" becomes null', () => {
  const chunk: Chunk = { choices: [{ index: 0, delta: { content: "x" }, finish_reason: "" }] };
  const out = normalizeChatChunk(chunk) as Chunk;
  assert.equal(out.choices[0].finish_reason, null);
  assert.deepEqual(out.choices[0].delta, { content: "x" });
  assert.equal(chunk.choices[0].finish_reason, "", "input chunk is not mutated");
});

test("normalizeChatChunk: empty function_call shell is dropped, content kept", () => {
  const chunk: Chunk = {
    choices: [
      { index: 0, delta: { function_call: { name: "", arguments: "" }, content: "a" } },
      { index: 1, delta: { function_call: {}, content: "b" } },
    ],
  };
  const out = normalizeChatChunk(chunk) as Chunk;
  assert.deepEqual(out.choices[0].delta, { content: "a" });
  assert.deepEqual(out.choices[1].delta, { content: "b" });
});

test("normalizeChatChunk: real function_call and terminal finish_reason are kept", () => {
  const chunk: Chunk = {
    choices: [
      { index: 0, delta: { function_call: { name: "get_weather", arguments: "" } } },
      { index: 1, delta: { function_call: { name: "", arguments: '{"a":1}' } } },
      { index: 2, delta: {}, finish_reason: "stop" },
    ],
  };
  assert.equal(normalizeChatChunk(chunk), chunk);
});

test("normalizeChatChunk: unchanged and non-chunk inputs return the same reference", () => {
  const clean: Chunk = { choices: [{ index: 0, delta: { content: "x" }, finish_reason: null }] };
  assert.equal(normalizeChatChunk(clean), clean);
  const noChoices = { object: "chat.completion.chunk" };
  assert.equal(normalizeChatChunk(noChoices), noChoices);
  assert.equal(normalizeChatChunk(null), null);
  assert.equal(normalizeChatChunk("text"), "text");
  const badChoices = { choices: [null, 3] };
  assert.equal(normalizeChatChunk(badChoices), badChoices);
});

test("createSseNormalizeTransform: events split mid-line are normalised byte-for-byte", async () => {
  const first = { id: "c1", choices: [{ index: 0, delta: { content: "he" }, finish_reason: "" }] };
  const second = {
    id: "c1",
    choices: [{ index: 0, delta: { content: "llo", function_call: { name: "", arguments: "" } } }],
  };
  const raw = `data: ${JSON.stringify(first)}\n\ndata: ${JSON.stringify(second)}\n\ndata: [DONE]\n\n`;
  const cut1 = raw.indexOf("finish_reason") + 4;
  const cut2 = raw.indexOf("function_call") + 3;
  const output = await pipeChunks([raw.slice(0, cut1), raw.slice(cut1, cut2), raw.slice(cut2)]);

  const expected =
    `data: ${JSON.stringify({ ...first, choices: [{ index: 0, delta: { content: "he" }, finish_reason: null }] })}\n\n` +
    `data: ${JSON.stringify({ ...second, choices: [{ index: 0, delta: { content: "llo" } }] })}\n\n` +
    "data: [DONE]\n\n";
  assert.equal(output, expected);
});

test("createSseNormalizeTransform: untouched lines pass through verbatim (CRLF, comments, junk)", async () => {
  const clean = 'data: {"choices":[{"index":0,"delta":{"content":"x"},"finish_reason":null}]}';
  const raw = `: keep-alive\r\n${clean}\r\nevent: ping\r\ndata: not-json\r\ndata: [DONE]`;
  assert.equal(await pipeChunks([raw]), raw);

  const dirty = 'data: {"choices":[{"index":0,"delta":{},"finish_reason":""}]}\r\n\r\n';
  assert.equal(
    await pipeChunks([dirty]),
    'data: {"choices":[{"index":0,"delta":{},"finish_reason":null}]}\r\n\r\n'
  );
});

test("createSseNormalizeTransform: multi-byte UTF-8 split across chunks survives", async () => {
  const bytes = new TextEncoder().encode(
    'data: {"choices":[{"delta":{"content":"你好"},"finish_reason":""}]}\n'
  );
  const splitAt = bytes.indexOf(0xe4) + 1; // inside the first CJK code point
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes.slice(0, splitAt));
      controller.enqueue(bytes.slice(splitAt));
      controller.close();
    },
  });
  const output = await new Response(source.pipeThrough(createSseNormalizeTransform())).text();
  assert.equal(output, 'data: {"choices":[{"delta":{"content":"你好"},"finish_reason":null}]}\n');
});

for (const [name, makeExecutor] of EXECUTORS) {
  test(`${name}: execute() normalises CodeBuddy SSE dirt and keeps status/headers`, async () => {
    const upstream = new Response(
      'data: {"choices":[{"index":0,"delta":{"content":"hi","function_call":{"name":"","arguments":""}},"finish_reason":""}]}\n\n' +
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n',
      { status: 200, headers: { "Content-Type": "text/event-stream", "X-Request-Id": "r1" } }
    );
    const { response, body } = await executeWithUpstream(makeExecutor(), upstream);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-request-id"), "r1");
    assert.equal(
      body,
      'data: {"choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}\n\n' +
        'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n'
    );
  });

  test(`${name}: execute() leaves non-SSE and error responses untouched`, async () => {
    const json = '{"choices":[{"finish_reason":""}]}';
    const ok = await executeWithUpstream(
      makeExecutor(),
      new Response(json, { status: 200, headers: { "Content-Type": "application/json" } })
    );
    assert.equal(ok.body, json);

    const errorBody = 'data: {"choices":[{"finish_reason":""}]}\n';
    const failed = await executeWithUpstream(
      makeExecutor(),
      new Response(errorBody, { status: 500, headers: { "Content-Type": "text/event-stream" } })
    );
    assert.equal(failed.response.status, 500);
    assert.equal(failed.body, errorBody);
  });

  test(`${name}: transformRequest drops an empty tools array and still forces stream`, () => {
    const out = makeExecutor().transformRequest(
      "glm-5.2",
      { messages: [{ role: "user", content: "hi" }], tools: [], stream: false },
      false,
      {}
    ) as Record<string, unknown>;
    assert.equal(Object.prototype.hasOwnProperty.call(out, "tools"), false);
    assert.equal(out.stream, true);

    const tool = { type: "function", function: { name: "f", parameters: {} } };
    const withTools = makeExecutor().transformRequest(
      "glm-5.2",
      { messages: [{ role: "user", content: "hi" }], tools: [tool] },
      true,
      {}
    ) as Record<string, unknown>;
    assert.deepEqual(withTools.tools, [tool]);
  });
}
