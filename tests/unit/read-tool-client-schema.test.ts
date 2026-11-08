import assert from "node:assert/strict";
import test from "node:test";

import { translateNonStreamingClientResponse } from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import { applyToolCallShimToBuffer } from "../../open-sse/translator/helpers/toolCallShim.ts";
import { openaiToClaudeResponse } from "../../open-sse/translator/response/openai-to-claude.ts";
import { createSSETransformStreamWithLogger } from "../../open-sse/utils/stream.ts";

type JsonRecord = Record<string, unknown>;

function streamedInput(name: string, schema: JsonRecord, args: JsonRecord): unknown {
  const state = {
    messageStartSent: false,
    nextBlockIndex: 0,
    toolCalls: new Map(),
    thinkingBlockStarted: false,
    textBlockStarted: false,
    textBlockClosed: false,
    toolSchemas: new Map([[name, schema]]),
  };
  const chunks = [
    {
      id: "schema-proof",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_read",
                function: {
                  name,
                  arguments: JSON.stringify(args),
                },
              },
            ],
          },
        },
      ],
    },
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
    null,
  ];
  const events = chunks.flatMap((chunk) => openaiToClaudeResponse(chunk, state) ?? []);
  const fragments = events
    .filter(
      (event) => event.type === "content_block_delta" && event.delta?.type === "input_json_delta"
    )
    .map((event) => event.delta.partial_json);
  return JSON.parse(fragments.join(""));
}

const pathSchema = (key: string): JsonRecord => ({
  type: "object",
  properties: { [key]: { type: "string" } },
  required: [key],
  additionalProperties: false,
});

test("streaming Read respects the client's strict path schema", () => {
  for (const name of ["read", "Read"]) {
    for (const key of ["path", "filePath", "file_path"]) {
      assert.deepEqual(
        streamedInput(name, pathSchema(key), { file_path: "/tmp/input.txt" }),
        { [key]: "/tmp/input.txt" },
        `${name}: only the declared ${key} is emitted`
      );
    }
  }
});

// Exercise the public JSON response path with provider-cloaked tools and the
// original client request side by side: the client declaration must win.

function jsonInput(name: string, schema: JsonRecord, args: JsonRecord): unknown {
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "schema-proof",
      object: "chat.completion",
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_read",
                type: "function",
                function: { name, arguments: JSON.stringify(args) },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    responsePayloadFormat: "openai",
    clientResponseFormat: "claude",
    sourceFormat: "claude",
    provider: "openai",
    model: "test-model",
    requestBody: {
      tools: [
        { type: "function", function: { name: "Read", parameters: pathSchema("file_path") } },
      ],
    },
    clientRequestBody: { tools: [{ name, input_schema: schema }] },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "intermediate",
  });
  const content = result.response.content as JsonRecord[];
  return content.find((block) => block.type === "tool_use")?.input;
}

for (const [format, translate] of [
  ["streaming", streamedInput],
  ["JSON", jsonInput],
] as const) {
  test(`${format}: every upstream path alias follows each client's strict schema`, () => {
    for (const name of ["read", "Read"]) {
      for (const declared of ["path", "filePath", "file_path"]) {
        for (const received of ["path", "filePath", "file_path"]) {
          assert.deepEqual(
            translate(name, pathSchema(declared), { [received]: "/repo/a.ts" }),
            { [declared]: "/repo/a.ts" },
            `${name}: ${received} → ${declared}`
          );
        }
      }
    }
  });

  test(`${format}: preserve a valid declared path when aliases conflict`, () => {
    assert.deepEqual(
      translate("Read", pathSchema("path"), {
        path: "/client/right.ts",
        file_path: "/upstream/wrong.ts",
        filePath: "/also/wrong.ts",
      }),
      { path: "/client/right.ts" }
    );
  });

  test(`${format}: retain PDF pages with the client's declared path`, () => {
    const schema = {
      ...pathSchema("filePath"),
      properties: {
        filePath: { type: "string" },
        pages: { type: "string" },
      },
    };
    assert.deepEqual(translate("Read", schema, { file_path: "/repo/doc.PDF", pages: "1-3" }), {
      filePath: "/repo/doc.PDF",
      pages: "1-3",
    });
    assert.deepEqual(translate("Read", schema, { file_path: "/repo/doc.ts", pages: "1-3" }), {
      filePath: "/repo/doc.ts",
    });
  });
}

test("Read preserves legacy fallback without a recognizable schema", () => {
  for (const schema of [undefined, {}, { type: "object" }]) {
    assert.deepEqual(
      JSON.parse(applyToolCallShimToBuffer("read", '{"path":"/repo/a.ts"}', schema)),
      { file_path: "/repo/a.ts", filePath: "/repo/a.ts" }
    );
  }
});

test("unknown tools keep their raw arguments even with a path schema", () => {
  const raw = '{ "file_path": "/repo/a.ts" }';
  assert.equal(applyToolCallShimToBuffer("my_reader", raw, pathSchema("path")), raw);
});

test("a schema declaring multiple aliases preserves each valid declared value", () => {
  const schema = {
    properties: { path: { type: "string" }, filePath: { type: "string" } },
    additionalProperties: false,
  };
  assert.deepEqual(
    JSON.parse(
      applyToolCallShimToBuffer(
        "Read",
        JSON.stringify({
          path: "/repo/a.ts",
          filePath: "/repo/b.ts",
          file_path: "/repo/c.ts",
        }),
        schema
      )
    ),
    { path: "/repo/a.ts", filePath: "/repo/b.ts" }
  );
});

test("SSE pipeline extracts the original Anthropic tool schema before emitting input deltas", async () => {
  const body = { tools: [{ name: "read", input_schema: pathSchema("filePath") }] };
  const transform = createSSETransformStreamWithLogger(
    "openai",
    "claude",
    "openai",
    null,
    null,
    "test-model",
    null,
    body
  );
  const chunks = [
    {
      id: "schema-proof",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_read",
                function: { name: "Read", arguments: '{"file_path":"/repo/a.ts"}' },
              },
            ],
          },
        },
      ],
    },
    { choices: [{ delta: {}, finish_reason: "tool_calls" }] },
  ];
  const upstream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks)
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const wire = await new Response(upstream.pipeThrough(transform)).text();
  const deltas = wire
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)))
    .filter(
      (event) => event.type === "content_block_delta" && event.delta?.type === "input_json_delta"
    );
  assert.deepEqual(JSON.parse(deltas.map((event) => event.delta.partial_json).join("")), {
    filePath: "/repo/a.ts",
  });
});
