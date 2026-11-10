import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { kiroEventFrame } from "../_helpers/kiroEventStreamFixture.ts";

// #18675: a client that declares its own tool named "tool_call" (OpenClaw, Hermes
// Agent deferred-tool bridges) must not be forced through Kiro's MCP wrapper
// validation, which demands input.name / input.arguments.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-18675-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FLAG = process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;
process.env.DATA_DIR = dataDir;
delete process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;

const { KiroExecutor } = await import("../../open-sse/executors/kiro.ts");
const { kiroRequestDeclaresToolCallWrapperName, validateKiroToolUse } =
  await import("../../open-sse/executors/kiroToolCallValidation.ts");
const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  if (ORIGINAL_FLAG === undefined) delete process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;
  else process.env.KIRO_TOOL_CALL_REPAIR_ENABLED = ORIGINAL_FLAG;
  resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function eventStreamResponse(frames: Uint8Array[]): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const frame of frames) controller.enqueue(frame);
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "application/vnd.amazon.eventstream" } }
  );
}

function sseChunks(text: string): Array<Record<string, unknown>> {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((line) => line && line !== "[DONE]")
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

function toolCalls(text: string) {
  const byIndex = new Map<number, { id?: string; name?: string; arguments: string }>();
  let finishReason: unknown = null;
  for (const chunk of sseChunks(text)) {
    const choice = (Array.isArray(chunk.choices) ? chunk.choices[0] : undefined) as
      Record<string, unknown> | undefined;
    if (choice?.finish_reason) finishReason = choice.finish_reason;
    const delta = choice?.delta as Record<string, unknown> | undefined;
    for (const call of (delta?.tool_calls as Array<Record<string, unknown>>) || []) {
      const index = call.index as number;
      const entry = byIndex.get(index) || { arguments: "" };
      const fn = call.function as Record<string, unknown> | undefined;
      if (typeof call.id === "string") entry.id = call.id;
      if (typeof fn?.name === "string") entry.name = fn.name;
      if (typeof fn?.arguments === "string") entry.arguments += fn.arguments;
      byIndex.set(index, entry);
    }
  }
  return { calls: [...byIndex.values()], finishReason };
}

function kiroBody(toolNames: string[]) {
  return {
    conversationState: {
      currentMessage: {
        userInputMessage: {
          content: "hello",
          userInputMessageContext: {
            tools: toolNames.map((name) => ({
              toolSpecification: {
                name,
                description: `Tool: ${name}`,
                inputSchema: { json: { type: "object" } },
              },
            })),
          },
        },
      },
    },
  };
}

const CLIENT_ARGS = { id: "web_search", args: { query: "ping" } };

const CLIENT_TOOL_CALL_FRAMES = () => [
  kiroEventFrame("toolUseEvent", { toolUseId: "call_1", name: "tool_call", input: CLIENT_ARGS }),
  kiroEventFrame("messageStopEvent", {}),
];

test("#18675 a client-declared tool_call streams through with the client's arguments", async () => {
  const text = await new KiroExecutor()
    .transformEventStreamToSSE(eventStreamResponse(CLIENT_TOOL_CALL_FRAMES()), "kiro-model", {
      clientDeclaresWrapperName: true,
    })
    .text();

  assert.doesNotMatch(text, /invalid_kiro_tool_call/);
  const { calls, finishReason } = toolCalls(text);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].id, "call_1");
  assert.equal(calls[0].name, "tool_call");
  assert.deepEqual(JSON.parse(calls[0].arguments), CLIENT_ARGS);
  assert.equal(finishReason, "tool_calls");
});

test("#18675 string-fragment input for a client tool_call is concatenated unchanged", async () => {
  const frames = [
    kiroEventFrame("toolUseEvent", { toolUseId: "call_h", name: "tool_call" }),
    kiroEventFrame("toolUseEvent", {
      toolUseId: "call_h",
      name: "tool_call",
      input: '{"calls":[{"name":"terminal",',
    }),
    kiroEventFrame("toolUseEvent", {
      toolUseId: "call_h",
      name: "tool_call",
      input: '"arguments":{"command":"ls"}}]}',
    }),
    kiroEventFrame("messageStopEvent", {}),
  ];
  const text = await new KiroExecutor()
    .transformEventStreamToSSE(eventStreamResponse(frames), "kiro-model", {
      clientDeclaresWrapperName: true,
    })
    .text();

  assert.doesNotMatch(text, /invalid_kiro_tool_call/);
  const { calls } = toolCalls(text);
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(calls[0].arguments), {
    calls: [{ name: "terminal", arguments: { command: "ls" } }],
  });
});

test("#18675 without a client tool_call the wrapper validation still applies", async () => {
  const text = await new KiroExecutor()
    .transformEventStreamToSSE(eventStreamResponse(CLIENT_TOOL_CALL_FRAMES()), "kiro-model")
    .text();

  assert.match(text, /invalid_kiro_tool_call/);
  assert.match(text, /missing nested MCP tool name/);
});

test("#18675 execute() detects a declared tool_call in the translated request", async () => {
  process.env.KIRO_TOOL_CALL_REPAIR_ENABLED = "true";
  let fetches = 0;
  globalThis.fetch = async () => {
    fetches += 1;
    return eventStreamResponse(CLIENT_TOOL_CALL_FRAMES());
  };

  const result = await new KiroExecutor().execute({
    model: "claude-sonnet-4.6",
    body: kiroBody(["web_fetch", "tool_call"]),
    stream: true,
    credentials: {
      apiKey: "kiro-18675-fixture-only",
      providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
    },
  } as Parameters<InstanceType<typeof KiroExecutor>["execute"]>[0]);
  const text = await (result.response as Response).text();

  assert.equal(fetches, 1, "no repair retry for a client tool");
  assert.doesNotMatch(text, /invalid_kiro_tool_call|kiro_tool_call_repair_retry_failed/);
  const { calls } = toolCalls(text);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, "tool_call");
  assert.deepEqual(JSON.parse(calls[0].arguments), CLIENT_ARGS);
});

test("#18675 kiroRequestDeclaresToolCallWrapperName reads the current message tool list", () => {
  assert.equal(kiroRequestDeclaresToolCallWrapperName(kiroBody(["tool_call"])), true);
  assert.equal(kiroRequestDeclaresToolCallWrapperName(kiroBody(["tool_call_x", "read"])), false);
  assert.equal(kiroRequestDeclaresToolCallWrapperName(kiroBody([])), false);
  assert.equal(kiroRequestDeclaresToolCallWrapperName(undefined), false);
  assert.equal(
    kiroRequestDeclaresToolCallWrapperName({
      conversationState: { currentMessage: { userInputMessage: { content: "hi" } } },
    }),
    false
  );
  assert.equal(
    kiroRequestDeclaresToolCallWrapperName({
      conversationState: {
        currentMessage: { userInputMessage: { userInputMessageContext: { tools: [null, 1] } } },
      },
    }),
    false
  );
});

test("#18675 validateKiroToolUse skips wrapper checks only when the client declared tool_call", () => {
  const toolUse = { name: "tool_call", input: CLIENT_ARGS };
  assert.throws(() => validateKiroToolUse(toolUse), /missing nested MCP tool name/);
  assert.doesNotThrow(() => validateKiroToolUse(toolUse, { clientDeclaresWrapperName: true }));
});

// Review follow-up: with `tools` omitted, openai-to-kiro synthesizes a `tool_call` spec from
// history. That entry is not a client declaration, so wrapper validation must still run.
function historicalToolCallPayload() {
  return buildKiroPayload(
    "claude-sonnet-4.6",
    {
      messages: [
        { role: "user", content: "search" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_0",
              type: "function",
              function: { name: "tool_call", arguments: '{"name":"web_search","arguments":{}}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_0", content: "ok" },
        { role: "user", content: "again" },
      ],
    },
    true,
    {}
  ) as Record<string, unknown>;
}

test("#18675 a tool_call synthesized from history is not a client declaration", () => {
  const payload = historicalToolCallPayload();
  const conversationState = payload.conversationState as Record<string, unknown>;
  const userInput = (conversationState.currentMessage as Record<string, unknown>)
    .userInputMessage as Record<string, unknown>;
  const tools = (userInput.userInputMessageContext as Record<string, unknown>).tools as Array<
    Record<string, Record<string, unknown>>
  >;
  assert.ok(tools.some((tool) => tool.toolSpecification.name === "tool_call"));
  assert.equal(kiroRequestDeclaresToolCallWrapperName(payload), false);

  const declared = buildKiroPayload(
    "claude-sonnet-4.6",
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "tool_call", parameters: {} } }],
    },
    true,
    {}
  );
  assert.equal(kiroRequestDeclaresToolCallWrapperName(declared), true);
});

test("#18675 execute() still validates the wrapper when tools are omitted but history has tool_call", async () => {
  process.env.KIRO_TOOL_CALL_REPAIR_ENABLED = "false";
  globalThis.fetch = async () => eventStreamResponse(CLIENT_TOOL_CALL_FRAMES());

  const result = await new KiroExecutor().execute({
    model: "claude-sonnet-4.6",
    body: historicalToolCallPayload(),
    stream: true,
    credentials: {
      apiKey: "kiro-18675-fixture-only",
      providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
    },
  } as Parameters<InstanceType<typeof KiroExecutor>["execute"]>[0]);
  const text = await (result.response as Response).text();

  assert.match(text, /invalid_kiro_tool_call/);
  assert.match(text, /missing nested MCP tool name/);
});
