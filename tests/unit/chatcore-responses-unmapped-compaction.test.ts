/**
 * A Responses body whose `input` mixes message items with items the compression adapter
 * cannot map (function_call arguments) is compacted against the whole body, then dispatched.
 *
 * The final gate counts every input item. The proactive estimate must count them too, and
 * both compaction targets must leave room for the unmapped items:
 * - Before this fix the trigger and the gate saw only the mapped items, so a body over the
 *   window reached the upstream uncompacted, and a body over the proactive threshold was
 *   never compacted proactively.
 * - With only the gate fixed, a body over the window was rejected with 400 although
 *   compaction could make it fit.
 *
 * The last-resort target must also leave room for the top-level `instructions` or `system` the
 * gate counts, and the estimate taken after a prompt-compression pass must still count the
 * unmapped items.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROVIDER = "resp-unmapped-prov";
const MODEL = "resp-unmapped-model";
const CONTEXT_LIMIT = 10_000;
// The default proactive ratio (0.7) of the window; these bodies carry no tools to reserve.
const PROACTIVE_THRESHOLD = 7_000;
const ENV_CONTEXT_LIMIT = "CONTEXT_LENGTH_RESP_UNMAPPED_PROV";
const originalEnvContext = process.env[ENV_CONTEXT_LIMIT];
process.env[ENV_CONTEXT_LIMIT] = String(CONTEXT_LIMIT);

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-responses-unmapped-compaction-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");

const originalFetch = globalThis.fetch;
const upstreamBodies: Array<Record<string, unknown>> = [];

test.before(async () => {
  core.resetDbInstance();
  await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  globalThis.fetch = async (url: RequestInfo | URL, init: RequestInit = {}) => {
    const target = String(url instanceof Request ? url.url : url);
    if (target.includes("/__omniroute_event")) return new Response(null, { status: 204 });
    upstreamBodies.push(JSON.parse(String(init.body ?? "{}")));
    return new Response(
      JSON.stringify({
        id: "chatcmpl-unmapped",
        object: "chat.completion",
        created: 1,
        model: MODEL,
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
});

test.beforeEach(() => {
  upstreamBodies.length = 0;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalEnvContext === undefined) {
    delete process.env[ENV_CONTEXT_LIMIT];
  } else {
    process.env[ENV_CONTEXT_LIMIT] = originalEnvContext;
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/**
 * A Responses body: a function_call with `argChars` of arguments and `outputChars` of output,
 * plus `instructionsChars` of top-level `instructions` when given. With `trailingOutput` the
 * input ends with the tool output, as in a Codex tool turn.
 */
function responsesBody(
  argChars: number,
  outputChars: number,
  { instructionsChars = 0, trailingOutput = false } = {}
) {
  const input: Array<Record<string, unknown>> = [
    { type: "message", role: "user", content: "run the script" },
    // Arguments the compression adapter cannot map to a message
    {
      type: "function_call",
      name: "exec",
      arguments: JSON.stringify({ code: "a".repeat(argChars) }),
      call_id: "call_1",
    },
    // Compressible tool output
    { type: "function_call_output", call_id: "call_1", output: "b".repeat(outputChars) },
  ];
  if (!trailingOutput) input.push({ type: "message", role: "user", content: "now summarize" });
  return {
    model: MODEL,
    stream: false,
    ...(instructionsChars > 0 ? { instructions: "c".repeat(instructionsChars) } : {}),
    input,
  };
}

/**
 * Send `body` through handleChatCore; return the estimated tokens of the input, system and
 * instructions the upstream got.
 */
async function dispatch(
  body: Record<string, unknown>,
  endpoint = "/v1/responses"
): Promise<number> {
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://resp-unmapped.example.test" },
    },
    clientRawRequest: {
      endpoint,
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json", "content-type": "application/json" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  });
  assert.equal(
    upstreamBodies.length,
    1,
    `expected one upstream call; error: ${String((result as { error?: unknown }).error ?? "")}`
  );
  const sent = upstreamBodies[0];
  return (
    estimateTokens(sent.messages ?? sent.input) +
    estimateTokens(sent.instructions) +
    estimateTokens(sent.system)
  );
}

test("a Responses body with unmapped function_call items is compacted to fit before dispatch", async () => {
  // ~6k tokens of unmapped arguments and ~6k tokens of compressible output: over the window.
  const body = responsesBody(24_000, 24_000);
  assert.ok(estimateTokens(body.input) > CONTEXT_LIMIT, "the fixture must start over the window");

  const sentTokens = await dispatch(body);
  assert.ok(
    sentTokens <= CONTEXT_LIMIT,
    `the upstream received ~${sentTokens} input tokens for a ${CONTEXT_LIMIT}-token window`
  );
});

test("unmapped Responses items count toward the proactive compaction threshold", async () => {
  // ~5k tokens of unmapped arguments and ~3k tokens of output: under the window, and over the
  // proactive threshold only when the unmapped arguments are counted.
  const body = responsesBody(20_000, 12_000);
  const total = estimateTokens(body.input);
  assert.ok(
    total > PROACTIVE_THRESHOLD && total < CONTEXT_LIMIT,
    `the fixture must sit between the proactive threshold and the window, got ${total}`
  );

  const sentTokens = await dispatch(body);
  assert.ok(
    sentTokens <= PROACTIVE_THRESHOLD,
    `the upstream received ~${sentTokens} input tokens; proactive compaction should bring a ${total}-token body under ${PROACTIVE_THRESHOLD}`
  );
});

test("last-resort compaction leaves room for the instructions the final gate counts", async () => {
  // ~4k tokens of instructions, ~5k tokens of unmapped arguments and ~1.5k tokens of
  // compressible output: over the window, with the input alone under the proactive
  // threshold, so only the last-resort pass can make the request fit.
  const body = responsesBody(20_000, 6_000, { instructionsChars: 16_000 });
  const inputTokens = estimateTokens(body.input);
  const total = inputTokens + estimateTokens(body.instructions);
  assert.ok(
    inputTokens < PROACTIVE_THRESHOLD && total > CONTEXT_LIMIT,
    `the fixture must exceed the window with its input under the proactive threshold, got ${inputTokens} of ${total}`
  );

  const sentTokens = await dispatch(body);
  assert.ok(
    sentTokens <= CONTEXT_LIMIT,
    `the upstream received ~${sentTokens} tokens of input and instructions for a ${CONTEXT_LIMIT}-token window`
  );
});

test("last-resort compaction leaves room for a Claude system prompt the final gate counts", async () => {
  // ~4k tokens of system prompt and ~6.3k tokens of messages, most of them an older tool
  // result: over the window, with the messages under the proactive threshold.
  const body = {
    model: MODEL,
    max_tokens: 64,
    stream: false,
    system: "c".repeat(16_000),
    messages: [
      { role: "user", content: "run the script" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_1", name: "exec", input: { code: "x" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "b".repeat(25_000) }],
      },
      { role: "assistant", content: "done" },
      { role: "user", content: "now summarize" },
    ],
  };
  const messageTokens = estimateTokens(body.messages);
  const total = messageTokens + estimateTokens(body.system);
  assert.ok(
    messageTokens < PROACTIVE_THRESHOLD && total > CONTEXT_LIMIT,
    `the fixture must exceed the window with its messages under the proactive threshold, got ${messageTokens} of ${total}`
  );

  const sentTokens = await dispatch(body, "/v1/messages");
  assert.ok(
    sentTokens <= CONTEXT_LIMIT,
    `the upstream received ~${sentTokens} tokens of messages and system for a ${CONTEXT_LIMIT}-token window`
  );
});

test("the estimate after a prompt-compression pass still counts unmapped Responses items", async () => {
  await updateCompressionSettings({ enabled: true, defaultMode: "lite" });
  try {
    // ~5k tokens of unmapped arguments and ~3k tokens of tool output that ends the input: the
    // current tool turn, which lite compression keeps whole.
    const body = responsesBody(20_000, 12_000, { trailingOutput: true });
    // Blank lines for lite compression to collapse, so the pass reports a compressed result.
    body.input[0] = { ...body.input[0], content: "run the script\n\n\n\nthen report" };
    const total = estimateTokens(body.input);
    assert.ok(
      total > PROACTIVE_THRESHOLD && total < CONTEXT_LIMIT,
      `the fixture must sit between the proactive threshold and the window, got ${total}`
    );

    const sentTokens = await dispatch(body);
    assert.ok(
      sentTokens <= PROACTIVE_THRESHOLD,
      `the upstream received ~${sentTokens} input tokens; proactive compaction after the lite pass should bring a ${total}-token body under ${PROACTIVE_THRESHOLD}`
    );
  } finally {
    await updateCompressionSettings({ enabled: true, defaultMode: "off" });
  }
});
