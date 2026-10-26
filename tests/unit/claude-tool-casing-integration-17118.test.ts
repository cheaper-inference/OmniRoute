import assert from "node:assert/strict";
import test from "node:test";

import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";
import { handleComboChat } from "../../open-sse/services/combo.ts";
import {
  createSSEStream,
  createPassthroughStreamWithLogger,
  createSSETransformStreamWithLogger,
} from "../../open-sse/utils/stream.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { baseInput } from "./_helpers/nonStreamingProviderLegFixtures.ts";

const encoder = new TextEncoder();
const tools = (name: string) => [{ name, input_schema: { type: "object", properties: {} } }];
const client = () => ({
  model: "synthetic",
  tools: tools("read"),
  messages: [{ role: "user", content: "read a file" }],
});
const payload = (name: string) => ({
  id: "chatcmpl_fixture",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "call_1", type: "function", function: { name, arguments: "{}" } }],
      },
      finish_reason: "tool_calls",
    },
  ],
  usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
});
const names = (body: Record<string, unknown>) =>
  (body.content as Record<string, unknown>[])
    .filter((b) => b.type === "tool_use")
    .map((b) => b.name);

async function jsonLeg(
  sourceBody: Record<string, unknown>,
  format = "openai",
  echoed = "Read",
  ledger: Map<string, string> | null = null
) {
  const responseBody =
    format === "gemini"
      ? {
          candidates: [
            {
              content: { role: "model", parts: [{ functionCall: { name: echoed, args: {} } }] },
              finishReason: "STOP",
            },
          ],
        }
      : format === "openai-responses"
        ? {
            id: "resp_fixture",
            object: "response",
            status: "completed",
            output: [
              {
                type: "function_call",
                id: "fc_1",
                call_id: "call_1",
                name: echoed,
                arguments: "{}",
                status: "completed",
              },
            ],
          }
        : payload(echoed);
  return runNonStreamingProviderLeg(
    baseInput({
      sourceBody,
      sourceFormat: "claude",
      targetFormat: format,
      clientResponseFormat: "claude",
      provider: format === "gemini" ? "gemini" : format === "openai-responses" ? "xai" : "openai",
      translatedBody: { tools: tools("Read"), messages: [] },
      toolNameMap: ledger,
      executeProviderRequest: async () => ({
        response: Response.json(responseBody),
        url: "https://synthetic.invalid",
        headers: {},
        transformedBody: { tools: tools("Read") },
      }),
    })
  );
}

async function wire(transform: TransformStream, events: unknown[]) {
  const source = new ReadableStream({
    start(controller) {
      for (const event of events)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      controller.close();
    },
  });
  const text = await new Response(source.pipeThrough(transform)).text();
  return [...text.matchAll(/^data: (.+)$/gm)]
    .filter((m) => m[1] !== "[DONE]")
    .map((m) => JSON.parse(m[1]));
}
const sseNames = (events: Record<string, unknown>[]) =>
  events
    .filter((e) => e.type === "content_block_start")
    .map((e) => e.content_block as Record<string, unknown>)
    .filter((b) => b.type === "tool_use")
    .map((b) => b.name);
const claudeEvents = (name: string) => [
  {
    type: "message_start",
    message: {
      id: "msg_fixture",
      type: "message",
      role: "assistant",
      content: [],
      model: "synthetic",
      usage: { input_tokens: 1, output_tokens: 0 },
    },
  },
  {
    type: "content_block_start",
    index: 0,
    content_block: { type: "tool_use", id: "toolu_1", name, input: {} },
  },
  { type: "content_block_stop", index: 0 },
  { type: "message_delta", delta: { stop_reason: "tool_use" }, usage: { output_tokens: 1 } },
  { type: "message_stop" },
];

test.after(() => resetDbInstance());

for (const format of ["openai", "gemini", "openai-responses"]) {
  test(`${format} JSON provider leg uses source tools, not rewritten provider tools`, async () => {
    const source = client();
    const before = structuredClone(source);
    const result = await jsonLeg(source, format);
    assert.equal(result.kind, "ok");
    if (result.kind !== "ok") return;
    assert.deepEqual(names(result.response), ["read"]);
    assert.deepEqual(source, before);
  });
}

test("JSON provider leg retains a real alias ledger over rewritten provider declarations", async () => {
  const result = await jsonLeg(
    { ...client(), tools: tools("mcp__docs__read") },
    "openai",
    "mcp_docs_read",
    new Map([["mcp_docs_read", "mcp__docs__read"]])
  );
  assert.equal(result.kind, "ok");
  if (result.kind === "ok") assert.deepEqual(names(result.response), ["mcp__docs__read"]);
});

for (const format of ["openai", "gemini"]) {
  test(`${format} SSE factory carries clientTools through real byte translation`, async () => {
    const transform = createSSETransformStreamWithLogger(
      format,
      "claude",
      format,
      null,
      null,
      "synthetic",
      null,
      { tools: tools("Read") },
      null,
      null,
      null,
      false,
      false,
      false,
      new Set(),
      null,
      tools("read")
    );
    const events =
      format === "openai"
        ? [
            {
              id: "chatcmpl_fixture",
              choices: [
                {
                  index: 0,
                  delta: {
                    tool_calls: [
                      {
                        index: 0,
                        id: "call_1",
                        type: "function",
                        function: { name: "Read", arguments: "{}" },
                      },
                    ],
                  },
                  finish_reason: "tool_calls",
                },
              ],
            },
          ]
        : [
            {
              candidates: [
                {
                  content: { role: "model", parts: [{ functionCall: { name: "Read", args: {} } }] },
                  finishReason: "STOP",
                },
              ],
            },
          ];
    assert.deepEqual(sseNames(await wire(transform, events)), ["read"]);
  });
}

for (const explicit of [false, true]) {
  test(`Claude passthrough honors ${explicit ? "separate client tools over provider body" : "request body's tools array"}`, async () => {
    const transform = createSSEStream({
      mode: "passthrough",
      provider: "claude",
      clientResponseFormat: "claude",
      body: { tools: tools(explicit ? "Read" : "read") },
      ...(explicit ? { clientTools: tools("read") } : {}),
    });
    assert.deepEqual(sseNames(await wire(transform, claudeEvents("Read"))), ["read"]);
  });
}

test("actual combo fallback preserves source tools into JSON provider-leg translation", async () => {
  const source = client();
  const dispatched: string[] = [];
  const response = await handleComboChat({
    body: source,
    combo: {
      name: "casing-17118",
      strategy: "priority",
      models: ["claude/first", "openai/second"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    isModelAvailable: async () => true,
    handleSingleModel: async (body, model) => {
      dispatched.push(model);
      if (model === "claude/first")
        return Response.json({ error: { message: "synthetic rate limit" } }, { status: 429 });
      assert.deepEqual(body.tools, tools("read"));
      const result = await jsonLeg(body);
      assert.equal(result.kind, "ok");
      return Response.json(result.kind === "ok" ? result.response : {});
    },
    settings: {
      resilienceSettings: {
        comboCooldownWait: { enabled: false, maxWaitMs: 1, maxAttempts: 1, budgetMs: 1 },
      },
    },
    log: { info() {}, warn() {}, error() {}, debug() {} },
    allCombos: null,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(dispatched, ["claude/first", "openai/second"]);
  assert.deepEqual(names(await response.json()), ["read"]);
  assert.deepEqual(source.tools, tools("read"));
});

for (const declared of [tools("read"), []]) {
  test(`passthrough convenience wrapper preserves explicit ${declared.length ? "client tools" : "empty declarations"}`, async () => {
    const transform = createPassthroughStreamWithLogger(
      "claude",
      null,
      null,
      "synthetic",
      null,
      { tools: tools("read") },
      null,
      null,
      null,
      "claude",
      null,
      declared
    );
    assert.deepEqual(sseNames(await wire(transform, claudeEvents("Read"))), [
      declared.length ? "read" : "Read",
    ]);
  });
}
