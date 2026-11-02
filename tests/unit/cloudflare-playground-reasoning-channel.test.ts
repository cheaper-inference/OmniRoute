/**
 * Reasoning-channel replies through the real executor, with the opt-in strict recovery on.
 * Split from cloudflare-playground-executor-tools.test.ts to keep both under the size cap.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSuccessFrames,
  executeArgs,
  makeSequencedExecutor,
  parseSseChunks,
} from "../fixtures/cloudflare-playground/executorHarness.ts";

process.env.CLOUDFLARE_PLAYGROUND_STRICT_TOOL_RECOVERY_ENABLED = "true";

const READ_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "read",
      description: "Read a file",
      parameters: {
        type: "object",
        properties: { path: { type: "string" } },
        required: ["path"],
      },
    },
  },
];

const readArgs = (body: Record<string, unknown>, stream = false) =>
  executeArgs(
    {
      model: "test-model",
      messages: [{ role: "user", content: "read a.py" }],
      tools: READ_TOOLS,
      ...body,
    },
    stream
  );

// ── Reasoning-channel replies ────────────────────────────────────────────────
//
// The playground decides whether a reply lands on `text-delta` or
// `reasoning-delta`, and gpt-oss-120b routinely puts the *whole* answer — tool
// call included — on the reasoning channel with an empty text channel. The
// gates used to read only `parser.text`, so those turns shipped as
// `finish_reason: "stop"` with `content: null` and the call sitting unread in
// the thinking block. Every test below therefore builds a reply whose text
// channel is empty.

/** The captured live payload (failers.txt) that motivated the channel fix. */
const FAILERS_REASONING =
  "We should inspect where FG.round_limit is defined. Search.\n" +
  '{"type":"tool_call","name":"grep","arguments":{"pattern":"round_limit","path":"/tmp/dmc5_pvp_tu6.lua","limit":20}}' +
  '{"tool_result":{"call_id":"call_2c3c3b9a","content":"Found 2 matches\\n  Line 5280: function init_fg_system()\\n"}}';

const GREP_TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "grep",
      description: "Search a file",
      parameters: {
        type: "object",
        properties: {
          pattern: { type: "string" },
          path: { type: "string" },
          limit: { type: "number" },
        },
        required: ["pattern", "path"],
      },
    },
  },
];

const grepArgs = (body: Record<string, unknown>, stream = false) =>
  executeArgs(
    {
      model: "test-model",
      messages: [{ role: "user", content: "find round_limit" }],
      tools: GREP_TOOLS,
      ...body,
    },
    stream
  );

test('executor "failers.txt": a reasoning-channel fabricated tool_result retries, then fails 502', async () => {
  // Exact failure mode: call + invented grep result, both on `reasoning-delta`.
  // The model ran the tool in its head and stopped; the real grep never ran.
  const { executor, rooms } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", FAILERS_REASONING)],
    2
  );

  const response = await (await executor.execute(grepArgs({}))).response;
  assert.equal(response.status, 502, "a fabricated result must never be shipped as a stop");
  const parsed = JSON.parse(await response.text()) as { error: { message: string; code: string } };
  assert.equal(parsed.error.code, "HTTP_502");
  assert.match(parsed.error.message, /last failure: fabricated_result/);
  assert.equal(rooms.length, 3, "initial + exactly maxToolRetries repairs");
});

test('executor "failers.txt": streaming emits the fabrication failure as an error chunk', async () => {
  const { executor } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", FAILERS_REASONING)],
    1
  );

  const raw = await (await executor.execute(grepArgs({}, true))).response.text();
  const chunks = parseSseChunks(raw);
  const errorChunk = chunks.find((c) => c.error);

  assert.ok(errorChunk, "expected an error chunk");
  assert.equal(errorChunk.error.type, "tool_call_recovery_failed");
  assert.match(errorChunk.error.message, /fabricated_result/);
  assert.ok(
    !chunks.some((c) => c.choices?.[0]?.delta?.content),
    "the fabricated turn must not stream as content"
  );
  assert.ok(!JSON.stringify(chunks).includes("call_2c3c3b9a"), "fabricated payload never leaks");
});

test("executor reads a valid call that arrived only on the reasoning channel", async () => {
  const envelope =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "x", "path": "a.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", `Let me check.\n${envelope}`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      message: { content: string | null; reasoning_content?: string; tool_calls?: unknown[] };
      finish_reason: string;
    }>;
  };

  const message = parsed.choices[0].message;
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(message.tool_calls?.length, 1, "the reasoning-only call must be executed");
  assert.equal(message.content, null);
  assert.ok(
    !message.reasoning_content?.includes('"type": "tool_call"'),
    "the executed envelope must not also be replayed as thinking"
  );
  assert.equal(rooms.length, 1, "a valid reasoning-only call is not a retry");
});

test('executor treats a reasoning-channel {"type":"shell"} as wrong_type, not prose', async () => {
  const broken = '{"type":"shell","arguments":{"command":"ls -la","timeout":30000}}';
  const fixed =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "x", "path": "a.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", broken),
    (chatId) => buildSuccessFrames(chatId, "", fixed),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{ finish_reason: string; message: { tool_calls?: unknown[] } }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1);
  assert.equal(rooms.length, 2, "the reasoning-channel envelope must be gated too");
});

test("executor promotes a reasoning-only prose answer to content instead of retrying", async () => {
  // A finished task that ends with a summary and no tool call is a legitimate
  // `stop`. The reasoning channel is all it has, so it must reach the client as
  // content — not be retried as an empty response, not dropped as null.
  const summary = "Done: the round counter now resets on every match.";
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, "", summary),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      finish_reason: string;
      message: { content: string | null; reasoning_content?: string };
    }>;
  };

  assert.equal(rooms.length, 1, "prose is not a tool failure");
  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.choices[0].message.content, summary);
  assert.ok(!parsed.choices[0].message.reasoning_content, "promoted reasoning is not duplicated");
});

test("executor retries a reply with no text, no reasoning and no call at all", async () => {
  const { executor, rooms } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "", "")],
    1
  );

  const response = await (await executor.execute(grepArgs({}))).response;
  assert.equal(response.status, 502, "a blank assistant message is not a finished turn");
  const parsed = JSON.parse(await response.text()) as { error: { message: string } };
  assert.match(parsed.error.message, /last failure: empty_response/);
  assert.equal(rooms.length, 2);
});

test("executor gates the text channel first when both channels carry a call", async () => {
  // Authoritative text: a stray tool-shaped thought in the reasoning channel
  // must never override the real answer the model actually emitted as text.
  const textCall =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "alpha", "path": "a.lua"}}';
  const strayCall =
    '{"type": "tool_call", "name": "grep", "arguments": {"pattern": "beta", "path": "b.lua"}}';
  const { executor, rooms } = makeSequencedExecutor([
    (chatId) => buildSuccessFrames(chatId, textCall, `Thinking about it: ${strayCall}`),
  ]);

  const parsed = JSON.parse(await (await executor.execute(grepArgs({}))).response.text()) as {
    choices: Array<{
      finish_reason: string;
      message: { tool_calls?: Array<{ function: { arguments: string } }> };
    }>;
  };

  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls?.length, 1, "one call, from the text channel");
  assert.equal(
    parsed.choices[0].message.tool_calls?.[0].function.arguments.includes("alpha"),
    true
  );
  assert.equal(rooms.length, 1, "no retry: the authoritative channel already answered");
});

test("a 502 recovery failure body carries no stack or upstream text", async () => {
  const { executor } = makeSequencedExecutor(
    [(chatId) => buildSuccessFrames(chatId, "<read><path>a")],
    1
  );

  const response = await (await executor.execute(readArgs({}))).response;
  const raw = await response.text();

  assert.equal(response.status, 502);
  assert.ok(!raw.includes(" at "), "no stack frames");
  assert.ok(!raw.includes("Error:"), "no raw exception wrapper");
  assert.ok(!raw.includes("<read>"), "the broken reply is not echoed back");
  const parsed = JSON.parse(raw) as { error: { message: string; type: string; code: string } };
  assert.equal(parsed.error.type, "upstream_error");
  assert.equal(parsed.error.code, "HTTP_502");
});
