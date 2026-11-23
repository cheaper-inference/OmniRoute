import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { kiroEventFrame } from "../_helpers/kiroEventStreamFixture.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kiro-repair-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FLAG = process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;
process.env.DATA_DIR = dataDir;
delete process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;

const { KiroExecutor } = await import("../../open-sse/executors/kiro.ts");
const { buildKiroToolCallRepairPayload, KIRO_TOOL_CALL_REPAIR_FLAG } =
  await import("../../open-sse/executors/kiro/toolCallRepair.ts");
const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.KIRO_TOOL_CALL_REPAIR_ENABLED;
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

const MALFORMED = [
  kiroEventFrame("toolUseEvent", {
    toolUseId: "wrapper_bad",
    name: "tool_call",
    input: { arguments: { query: "secret-arg-router" } },
  }),
  kiroEventFrame("messageStopEvent", {}),
];

const VALID = [
  kiroEventFrame("toolUseEvent", {
    toolUseId: "wrapper_ok",
    name: "tool_call",
    input: { name: "mcp_search", arguments: { query: "router" } },
  }),
  kiroEventFrame("messageStopEvent", {}),
];

type Upstream = Uint8Array[] | { status: number };

function eventStreamResponse(frames: Uint8Array[], onCancel?: () => void): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const frame of frames) controller.enqueue(frame);
        controller.close();
      },
      cancel() {
        onCancel?.();
      },
    }),
    { status: 200, headers: { "Content-Type": "application/vnd.amazon.eventstream" } }
  );
}

function installFetch(sequence: Upstream[]) {
  const bodies: string[] = [];
  globalThis.fetch = async (_input, init) => {
    bodies.push(String(init?.body ?? ""));
    const next = sequence[bodies.length - 1];
    if (!next) throw new Error(`unexpected upstream fetch #${bodies.length}`);
    if (!Array.isArray(next)) {
      return new Response(JSON.stringify({ message: "Too many requests" }), {
        status: next.status,
      });
    }
    return eventStreamResponse(next);
  };
  return bodies;
}

function runExecutor(stream = true, signal?: AbortSignal) {
  return new KiroExecutor().execute({
    model: "claude-sonnet-4.6",
    body: {
      conversationState: {
        currentMessage: { userInputMessage: { content: "hello" } },
      },
    },
    stream,
    credentials: {
      apiKey: "kiro-repair-fixture-only",
      providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
    },
    signal,
  } as Parameters<InstanceType<typeof KiroExecutor>["execute"]>[0]);
}

function sseChunks(text: string): Array<Record<string, unknown>> {
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((line) => line && line !== "[DONE]")
    .map((line) => JSON.parse(line) as Record<string, unknown>);
}

function roleChunkCount(text: string): number {
  return sseChunks(text).filter((chunk) => {
    const choices = Array.isArray(chunk.choices) ? chunk.choices : [];
    const delta = (choices[0] as Record<string, unknown> | undefined)?.delta as
      Record<string, unknown> | undefined;
    return delta?.role === "assistant";
  }).length;
}

function userContentOf(body: string): string {
  const parsed = JSON.parse(body) as {
    conversationState: { currentMessage: { userInputMessage: { content: string } } };
  };
  return parsed.conversationState.currentMessage.userInputMessage.content;
}

test("the repair flag is defined, runtime-togglable and on by default", () => {
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === KIRO_TOOL_CALL_REPAIR_FLAG);
  assert.ok(def, "KIRO_TOOL_CALL_REPAIR_ENABLED must be defined");
  assert.equal(def.defaultValue, "true");
  assert.equal(def.type, "boolean");
  assert.equal(def.requiresRestart, false);
});

test("flag on (default): a malformed wrapper is retried once and only the valid call reaches the client", async () => {
  const bodies = installFetch([MALFORMED, VALID]);
  const result = await runExecutor();
  const text = await result.response.text();

  assert.equal(bodies.length, 2, "exactly one repair retry");
  assert.doesNotMatch(text, /invalid_kiro_tool_call/);
  assert.doesNotMatch(text, /kiro_tool_call_repair_retry_failed/);
  assert.match(text, /mcp_search/);
  assert.equal(roleChunkCount(text), 1, "the retry must not emit a second role chunk");
  assert.equal(text.match(/data: \[DONE\]/g)?.length, 1);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");

  const retryContent = userContentOf(bodies[1]);
  assert.match(retryContent, /^hello/);
  assert.match(retryContent, /tool_call wrapper was malformed/);
  assert.match(retryContent, /missing nested MCP tool name/);
  assert.doesNotMatch(bodies[1], /secret-arg-router/, "tool arguments are never echoed");
  assert.equal(userContentOf(bodies[0]), "hello", "the first attempt is untouched");
});

test("flag on: a second malformed wrapper ends with kiro_tool_call_repair_retry_failed", async () => {
  const bodies = installFetch([MALFORMED, MALFORMED]);
  const text = await (await runExecutor()).response.text();

  assert.equal(bodies.length, 2, "the repair is bounded to one retry");
  assert.match(text, /kiro_tool_call_repair_retry_failed/);
  assert.match(text, /missing nested MCP tool name/);
  assert.doesNotMatch(text, /invalid_kiro_tool_call/);
  assert.doesNotMatch(text, /secret-arg-router/);
  assert.match(text, /data: \[DONE\]/);
});

test("flag on: a non-OK retry surfaces a bounded repair error without leaking the upstream body", async () => {
  const bodies = installFetch([MALFORMED, { status: 429 }]);
  const text = await (await runExecutor()).response.text();

  assert.equal(bodies.length, 2);
  assert.match(text, /kiro_tool_call_repair_retry_failed/);
  assert.match(text, /HTTP 429/);
  assert.doesNotMatch(text, /Too many requests/);
  assert.match(text, /data: \[DONE\]/);
});

test("flag on: a malformed wrapper after visible text is not retried", async () => {
  const bodies = installFetch([
    [kiroEventFrame("assistantResponseEvent", { content: "Let me search." }), ...MALFORMED],
  ]);
  const text = await (await runExecutor()).response.text();

  assert.equal(bodies.length, 1);
  assert.match(text, /Let me search\./);
  assert.match(text, /invalid_kiro_tool_call/);
});

test("flag on: text is released before upstream completes and no retry happens", async () => {
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  let fetches = 0;
  let upstreamCancelled = false;
  globalThis.fetch = async () => {
    fetches++;
    return new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          upstream = controller;
          controller.enqueue(kiroEventFrame("assistantResponseEvent", { content: "EARLY_TEXT" }));
        },
        cancel() {
          upstreamCancelled = true;
        },
      }),
      { status: 200 }
    );
  };

  const result = await runExecutor();
  const reader = result.response.body!.getReader();
  const decoder = new TextDecoder();
  let seen = "";
  while (!seen.includes("EARLY_TEXT")) {
    const { done, value } = await reader.read();
    assert.equal(done, false, "the stream must not end before upstream does");
    seen += decoder.decode(value, { stream: true });
  }
  assert.match(seen, /EARLY_TEXT/);

  upstream.enqueue(kiroEventFrame("messageStopEvent", {}));
  upstream.close();
  for (;;) {
    const { done } = await reader.read();
    if (done) break;
  }
  assert.equal(fetches, 1);
  assert.equal(upstreamCancelled, false);
});

test("flag on: cancelling the client stream cancels the upstream reader", async () => {
  let cancelled = false;
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(kiroEventFrame("contextUsageEvent", { contextUsagePercentage: 5 }));
        },
        cancel() {
          cancelled = true;
        },
      }),
      { status: 200 }
    );

  const result = await runExecutor();
  const reader = result.response.body!.getReader();
  const first = await reader.read();
  assert.equal(first.done, false, "the role-only start chunk is handed off immediately");
  await reader.cancel("client went away");
  assert.equal(cancelled, true);
});

test("flag off: a malformed wrapper keeps the pre-repair behavior (single attempt, invalid_kiro_tool_call)", async () => {
  process.env.KIRO_TOOL_CALL_REPAIR_ENABLED = "false";
  const bodies = installFetch([MALFORMED, VALID]);
  const text = await (await runExecutor()).response.text();

  assert.equal(bodies.length, 1, "no retry when the flag is off");
  assert.match(text, /invalid_kiro_tool_call/);
  assert.doesNotMatch(text, /mcp_search/);
});

test("non-streaming requests are not retried", async () => {
  const bodies = installFetch([MALFORMED, VALID]);
  const text = await (await runExecutor(false)).response.text();

  assert.equal(bodies.length, 1);
  assert.match(text, /invalid_kiro_tool_call/);
});

test("buildKiroToolCallRepairPayload appends a capped reason to the current user message only", () => {
  const original = {
    conversationState: {
      currentMessage: { userInputMessage: { content: "<thinking_mode>enabled</thinking_mode>q" } },
      history: [{ userInputMessage: { content: "earlier" } }],
    },
  };
  const repaired = buildKiroToolCallRepairPayload(original, "x".repeat(1000)) as typeof original;

  assert.equal(original.conversationState.currentMessage.userInputMessage.content.length, 39);
  const content = repaired.conversationState.currentMessage.userInputMessage.content;
  assert.ok(content.startsWith("<thinking_mode>enabled</thinking_mode>q\n\n"));
  assert.match(content, /Previous validation error: x{300}$/);
  assert.deepEqual(repaired.conversationState.history, original.conversationState.history);
});
