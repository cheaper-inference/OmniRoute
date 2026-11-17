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

/** A Responses body: a function_call with `argChars` of arguments and `outputChars` of output. */
function responsesBody(argChars: number, outputChars: number) {
  return {
    model: MODEL,
    stream: false,
    input: [
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
      { type: "message", role: "user", content: "now summarize" },
    ],
  };
}

/** Send `body` through handleChatCore; return the estimated input tokens the upstream got. */
async function dispatch(body: ReturnType<typeof responsesBody>): Promise<number> {
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://resp-unmapped.example.test" },
    },
    clientRawRequest: {
      endpoint: "/v1/responses",
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
  return estimateTokens(sent.messages ?? sent.input);
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
