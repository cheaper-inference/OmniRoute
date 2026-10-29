import test from "node:test";
import assert from "node:assert/strict";

const { transformToOllama } = await import("../../open-sse/utils/ollamaTransform.ts");

test("transformToOllama coerces numeric tool_call id to string without crashing", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { name: "test", arguments: "{}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();

  // Should produce valid JSON lines without crashing
  const lines = text.trim().split("\n");
  assert.ok(lines.length > 0, "Should produce at least one line of output");
  for (const line of lines) {
    const parsed = JSON.parse(line);
    assert.ok(parsed, "Each line should be valid JSON");
  }
});

test("transformToOllama handles string tool_call id normally", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_abc",
                type: "function",
                function: { name: "test", arguments: "{}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();
  const lines = text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  const toolCallLine = lines.find((line) => line.message?.tool_calls);
  assert.ok(toolCallLine, "Should produce a tool call line");
});

test("transformToOllama passes through non-ok shared responses without rewriting status or body", async () => {
  const errorBody = {
    error: {
      message: "Request too large for current capacity",
      type: "server_error",
      code: "admission_oversized",
    },
  };
  const upstream = new Response(JSON.stringify(errorBody), {
    status: 503,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": "1",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result.status, 503);
  assert.equal(result.headers.get("Retry-After"), "1");
  assert.match(String(result.headers.get("Content-Type") || ""), /application\/json/i);

  const payload = await result.json();
  assert.equal(payload.error?.code, "admission_oversized");
  assert.equal(payload.error?.type, "server_error");
  assert.equal(payload.error?.message, "Request too large for current capacity");
});

test("transformToOllama leaves successful non-SSE responses untouched", async () => {
  const body = { choices: [{ message: { role: "assistant", content: "hello" } }] };
  const upstream = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Sentinel": "preserved",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result, upstream);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("X-Sentinel"), "preserved");
  assert.deepEqual(await result.json(), body);
});

test("transformToOllama emits reasoning aliases as native thinking", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { reasoning: "plan ", content: "" } }],
    })}\n`,
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { reasoning: "carefully", content: "answer" } }],
    })}\n`,
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n`,
  ].join("");

  const mockResponse = new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(inputSSE));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );

  const lines = (await transformToOllama(mockResponse, "gpt-oss:20b").text())
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const thinking = lines.filter((line) => typeof line.message?.thinking === "string");
  const content = lines.filter((line) => line.message?.content === "answer");

  assert.deepEqual(
    thinking.map((line) => line.message.thinking),
    ["plan ", "carefully"]
  );
  assert.equal(
    thinking.every((line) => line.message.content === ""),
    true
  );
  assert.equal(content.length, 1);
  assert.equal(content[0].message.thinking, undefined);
});

test("transformToOllama prefers reasoning_content without duplicating aliases", async () => {
  const inputSSE = `data: ${JSON.stringify({
    choices: [
      {
        index: 0,
        delta: { reasoning_content: "canonical", reasoning: "alias" },
        finish_reason: "stop",
      },
    ],
  })}\n`;
  const mockResponse = new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(inputSSE));
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );

  const lines = (await transformToOllama(mockResponse, "test-model").text())
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  assert.deepEqual(
    lines.filter((line) => line.message?.thinking).map((line) => line.message.thinking),
    ["canonical"]
  );
});

test("transformToOllama passes through non-ok shared responses without rewriting status or body", async () => {
  const errorBody = {
    error: {
      message: "Request too large for current capacity",
      type: "server_error",
      code: "admission_oversized",
    },
  };
  const upstream = new Response(JSON.stringify(errorBody), {
    status: 503,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": "1",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result.status, 503);
  assert.equal(result.headers.get("Retry-After"), "1");
  assert.match(String(result.headers.get("Content-Type") || ""), /application\/json/i);

  const payload = await result.json();
  assert.equal(payload.error?.code, "admission_oversized");
  assert.equal(payload.error?.type, "server_error");
  assert.equal(payload.error?.message, "Request too large for current capacity");
});

test("transformToOllama leaves successful non-SSE responses untouched", async () => {
  const body = { choices: [{ message: { role: "assistant", content: "hello" } }] };
  const upstream = new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Sentinel": "preserved",
    },
  });

  const result = transformToOllama(upstream, "llama3.2");
  assert.equal(result, upstream);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("X-Sentinel"), "preserved");
  assert.deepEqual(await result.json(), body);
});

test("transformToOllama preserves multi-byte UTF-8 content split across chunks", async () => {
  // Content with multi-byte code points (CJK) that upstreams stream in raw byte chunks.
  const content = "你好世界🌍";
  const inputSSE =
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: { content }, finish_reason: null }],
    })}\n` +
    `data: ${JSON.stringify({
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    })}\n`;

  const bytes = new TextEncoder().encode(inputSSE);
  // Split at a byte offset that lands INSIDE a multi-byte sequence (a UTF-8 continuation
  // byte, 0x80–0xBF), so each half ends/starts mid-character.
  let splitAt = -1;
  for (let i = 1; i < bytes.length; i++) {
    if (bytes[i] >= 0x80 && bytes[i] < 0xc0) {
      splitAt = i;
      break;
    }
  }
  assert.ok(splitAt > 0, "test fixture should contain a multi-byte sequence to split");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes.slice(0, splitAt));
      controller.enqueue(bytes.slice(splitAt));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const text = await transformToOllama(mockResponse, "test-model").text();
  const lines = text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));

  const streamed = lines.map((line) => line.message?.content || "").join("");
  assert.equal(streamed, content, "streamed content should match the original bytes exactly");
  assert.ok(!streamed.includes("�"), "must not contain the U+FFFD replacement character");
});

test("transformToOllama merges multi-chunk numeric tool_call id", async () => {
  const inputSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { name: "test", arguments: '{"a":' },
              },
            ],
          },
        },
      ],
    })}\n`,
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: 12345,
                type: "function",
                function: { arguments: "1}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}\n`,
  ].join("");

  const inputStream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(inputSSE));
      controller.close();
    },
  });

  const mockResponse = new Response(inputStream, {
    headers: { "Content-Type": "text/event-stream" },
  });

  const result = transformToOllama(mockResponse, "test-model");
  const text = await result.text();
  const lines = text
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const toolCallLines = lines.filter((line) => line.message?.tool_calls);

  assert.equal(toolCallLines.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls.length, 1);
  assert.equal(toolCallLines[0].message.tool_calls[0].function.name, "test");
  assert.deepEqual(toolCallLines[0].message.tool_calls[0].function.arguments, { a: 1 });
});

// Helpers for the single-terminator / tail-drain cases below.
function sseUpstream(chunks: Array<string | Uint8Array>): Response {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(typeof chunk === "string" ? encoder.encode(chunk) : chunk);
        }
        controller.close();
      },
    }),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function readNdjson(response: Response) {
  return (await response.text())
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

const sseLine = (payload: unknown) => `data: ${JSON.stringify(payload)}\n`;
const contentDelta = (content: string) => sseLine({ choices: [{ index: 0, delta: { content } }] });
const finishChunk = (reason: string) =>
  sseLine({ choices: [{ index: 0, delta: {}, finish_reason: reason }] });

test("reused tool indices retain completed calls and assemble later fragments independently", async () => {
  const toolDelta = (tool_calls: unknown[]) => sseLine({ choices: [{ delta: { tool_calls } }] });
  const out = await readNdjson(
    transformToOllama(
      sseUpstream([
        toolDelta([{ index: 0, id: 1, function: { name: "first", arguments: "{}" } }]),
        toolDelta([{ index: 0, id: "second", function: { name: "sec", arguments: '{"x":' } }]),
        toolDelta([
          { index: 0, function: { name: "ond", arguments: "1}" } },
          { index: 1, id: "third", function: { name: "third", arguments: "bad json" } },
        ]),
        finishChunk("tool_calls"),
        "data: [DONE]\n",
      ]),
      "m"
    )
  );
  assert.equal(out.length, 1);
  assert.equal(out[0].done, true);
  assert.deepEqual(out[0].message.tool_calls, [
    { function: { name: "first", arguments: {} } },
    { function: { name: "second", arguments: { x: 1 } } },
    { function: { name: "third", arguments: {} } },
  ]);
});

test("transformToOllama ends the stream with exactly one done:true", async () => {
  const out = await readNdjson(
    transformToOllama(sseUpstream([contentDelta("hi"), finishChunk("stop"), "data: [DONE]\n"]), "m")
  );

  assert.equal(out.filter((m) => m.done).length, 1);
  assert.deepEqual(out.at(-1), {
    model: "m",
    message: { role: "assistant", content: "" },
    done: true,
  });
  assert.deepEqual(
    out.filter((m) => !m.done).map((m) => m.message.content),
    ["hi"]
  );
});

test("transformToOllama emits a done:true terminator when the upstream sends none", async () => {
  const out = await readNdjson(transformToOllama(sseUpstream([contentDelta("hi")]), "m"));

  assert.equal(out.filter((m) => m.done).length, 1);
  assert.equal(out.at(-1).done, true);
});

test("transformToOllama keeps tool calls on the single terminal message", async () => {
  const out = await readNdjson(
    transformToOllama(
      sseUpstream([
        sseLine({
          choices: [
            {
              index: 0,
              delta: {
                tool_calls: [
                  {
                    index: 0,
                    id: "call_1",
                    function: { name: "get_weather", arguments: '{"city":' },
                  },
                ],
              },
            },
          ],
        }),
        sseLine({
          choices: [
            {
              index: 0,
              delta: { tool_calls: [{ index: 0, function: { arguments: '"Hanoi"}' } }] },
            },
          ],
        }),
        finishChunk("tool_calls"),
        "data: [DONE]\n",
      ]),
      "m"
    )
  );

  const terminal = out.filter((m) => m.done);
  assert.equal(terminal.length, 1);
  assert.equal(out.at(-1).done, true);
  assert.deepEqual(out.at(-1).message.tool_calls, [
    { function: { name: "get_weather", arguments: { city: "Hanoi" } } },
  ]);
});

test("transformToOllama delivers a content line that arrived without its newline", async () => {
  const out = await readNdjson(
    transformToOllama(sseUpstream([contentDelta("hello"), contentDelta(" world").trimEnd()]), "m")
  );

  assert.equal(
    out
      .filter((m) => !m.done)
      .map((m) => m.message.content)
      .join(""),
    "hello world"
  );
  assert.equal(out.filter((m) => m.done).length, 1);
  assert.equal(out.at(-1).done, true);
});

test("transformToOllama keeps a tool call whose arguments are malformed JSON", async () => {
  const out = await readNdjson(
    transformToOllama(
      sseUpstream([
        sseLine({
          choices: [
            {
              index: 0,
              delta: {
                tool_calls: [
                  {
                    index: 0,
                    id: "call_1",
                    function: { name: "get_weather", arguments: '{"city":' },
                  },
                ],
              },
              finish_reason: "tool_calls",
            },
          ],
        }),
        "data: [DONE]\n",
      ]),
      "m"
    )
  );

  const terminal = out.filter((m) => m.done);
  assert.equal(terminal.length, 1);
  assert.deepEqual(terminal[0].message.tool_calls, [
    { function: { name: "get_weather", arguments: {} } },
  ]);
});

test("transformToOllama emits nothing after the terminal message", async () => {
  const out = await readNdjson(
    transformToOllama(
      sseUpstream([contentDelta("hi") + "data: [DONE]\n" + contentDelta("late")]),
      "m"
    )
  );

  assert.deepEqual(
    out.map((m) => [m.message.content, m.done]),
    [
      ["hi", false],
      ["", true],
    ]
  );
});
