import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// The hook case below opens the local database, so the whole file runs against
// an isolated data directory, removed when the file ends.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-turn-direct-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.DASHBOARD_PASSWORD = "";
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
if (!process.env.API_KEY_SECRET) {
  process.env.API_KEY_SECRET = `test-empty-turn-direct-${Date.now()}`;
}
process.env.STREAM_READINESS_TIMEOUT_MS = "1000";

const emptyTurnRetry = await import("../../open-sse/utils/emptyTurnRetry.ts");
const {
  FLUSH_EMPTY_RETRY_MAX_BYTES,
  isMuteDirectTurn,
  isUselessEmptyTurn,
  judgeBufferedTurn,
  readBoundedResponseOutcome,
  summarizeReplayedUpstreamTurn,
} = emptyTurnRetry;
const { runEmptyTurnRetryLoop } =
  await import("../../open-sse/handlers/chatCore/emptyTurnRetryLoop.ts");
const { markEmptyTurnExecution } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleChat } = await import("../../src/sse/handlers/chat.ts");
const { initTranslators } = await import("../../open-sse/translator/index.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");

// ── Turn fixtures ───────────────────────────────────────────────────────────
//
// Every turn is built as the upstream sends it (chat-completions frames), and
// read back through the production summary reader, so the expectations below
// describe what the classifier really sees.

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;

function chatStream(
  ...entries: Array<{ delta: Record<string, unknown>; finish?: string | null }>
): string {
  return (
    entries
      .map((entry) =>
        frame({
          id: "chatcmpl-empty-turn-direct",
          object: "chat.completion.chunk",
          model: "probe",
          choices: [{ delta: entry.delta, finish_reason: entry.finish ?? null }],
        })
      )
      .join("") + "data: [DONE]\n\n"
  );
}

/** Tokens were produced, but no character of visible text reached the client. */
const MUTE_TOKENS_TURN = chatStream(
  { delta: { role: "assistant", content: "" } },
  { delta: {}, finish: "stop" }
);

/**
 * Tokens were spent (the upstream reports usage), but no usable text reached the
 * client. The historical classifier lets such a turn pass (the role chunk counts
 * as a forwarded chunk and the usage as a working upstream); the direct rule
 * replays it.
 */
const MUTE_WITH_USAGE_TURN = chatStream(
  { delta: { role: "assistant", content: "" } },
  { delta: {}, finish: "stop" }
).replace(
  "data: [DONE]",
  frame({
    id: "chatcmpl-empty-turn-direct",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [],
    usage: { prompt_tokens: 12, completion_tokens: 40, total_tokens: 52 },
  }) + "data: [DONE]"
);

/** Draft markup only: nothing usable reached the client (#17461). */
const DRAFT_ONLY_TURN = chatStream(
  { delta: { content: "<summary>draft</summary>" } },
  { delta: {}, finish: "stop" }
);

/** The turn carries reasoning only. */
const REASONING_ONLY_TURN = chatStream(
  { delta: { reasoning_content: "thinking" } },
  { delta: {}, finish: "stop" }
);

/** The visible text is made of blanks only: not a visible text. */
const WHITESPACE_TURN = chatStream({ delta: { content: "   " } }, { delta: {}, finish: "stop" });

/** The turn carries a visible text. */
const VISIBLE_TURN = chatStream({ delta: { content: "hello" } }, { delta: {}, finish: "stop" });

/** The turn asks for a tool call. */
const TOOL_TURN = chatStream(
  { delta: { tool_calls: [{ id: "call-1", function: { name: "f", arguments: "{}" } }] } },
  { delta: {}, finish: "tool_calls" }
);

/** The turn was cut by the token limit: a legitimate end, not a missing answer. */
const LENGTH_TURN = chatStream({ delta: { role: "assistant" }, finish: "length" });

/** The upstream turn that carries the replayed answer. */
const CONTENT_UPSTREAM_TURN = chatStream(
  { delta: { content: "served-after-retry" } },
  { delta: {}, finish: "stop" }
);

// Responses-shaped upstream turns, for the translated path.
const RESPONSES_REASONING_TURN =
  frame({ type: "response.reasoning_text.delta", delta: "thinking here" }) +
  frame({ type: "response.reasoning_summary_text.done", text: "thinking here" });
const RESPONSES_TEXT_TURN = frame({
  type: "response.output_text.delta",
  output_index: 0,
  content_index: 0,
  delta: "hello",
});
const RESPONSES_USAGE_TURN = frame({
  type: "response.completed",
  response: {
    id: "resp_empty_turn_direct",
    object: "response",
    status: "completed",
    output: [],
    usage: { input_tokens: 5, output_tokens: 7, total_tokens: 12 },
  },
});

function sseResponse(body: string, status = 200): Response {
  return new Response(body, { status, headers: { "content-type": "text/event-stream" } });
}

// ── Replay path classification ──────────────────────────────────────────────

test("a chat-completions pair is the direct path", () => {
  assert.equal(emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.OPENAI, FORMATS.OPENAI), "direct");
});

test("a pair that needs a translation keeps the translated path", () => {
  assert.equal(
    emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.GEMINI, FORMATS.OPENAI),
    "translated"
  );
  assert.equal(
    emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI),
    "translated"
  );
  assert.equal(
    emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI_RESPONSES),
    "translated"
  );
});

test("a same-format pair other than chat-completions keeps the translated path", () => {
  // The replay arm is open for every pair (#17791): these pairs stay armed and
  // are judged by the historical classifier.
  assert.equal(
    emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.CLAUDE, FORMATS.CLAUDE),
    "translated"
  );
  assert.equal(
    emptyTurnRetry.resolveEmptyTurnReplayPath(FORMATS.GEMINI, FORMATS.GEMINI),
    "translated"
  );
});

// ── The direct replay rule ──────────────────────────────────────────────────

function directVerdict(body: string) {
  return judgeBufferedTurn({ kind: "text", text: body }, FORMATS.OPENAI, FORMATS.OPENAI, false);
}

test("a direct turn with tokens but no visible text is replayed", () => {
  assert.equal(directVerdict(MUTE_TOKENS_TURN).kind, "retry");
});

test("a direct turn that spent tokens but has no usable text is replayed even with usage", () => {
  const summary = summarizeReplayedUpstreamTurn(
    MUTE_WITH_USAGE_TURN,
    FORMATS.OPENAI,
    FORMATS.OPENAI
  );
  assert.ok(summary, "the production summary reader must classify the turn");
  // The historical classifier lets the turn through: that is the gap.
  assert.equal(isUselessEmptyTurn(summary), false);
  assert.equal(isMuteDirectTurn(summary), true);
  assert.equal(directVerdict(MUTE_WITH_USAGE_TURN).kind, "retry");
});

test("a direct turn made of draft markup only is replayed", () => {
  assert.equal(directVerdict(DRAFT_ONLY_TURN).kind, "retry");
});

test("a direct turn that carries reasoning only is replayed", () => {
  assert.equal(directVerdict(REASONING_ONLY_TURN).kind, "retry");
});

test("a direct turn whose visible text is only blanks is replayed", () => {
  assert.equal(directVerdict(WHITESPACE_TURN).kind, "retry");
});

test("a direct turn with a visible text is served", () => {
  assert.equal(directVerdict(VISIBLE_TURN).kind, "pass");
});

test("a direct turn with a tool call is served", () => {
  assert.equal(directVerdict(TOOL_TURN).kind, "pass");
});

test("a direct turn cut by the token limit is served", () => {
  assert.equal(directVerdict(LENGTH_TURN).kind, "pass");
});

// ── The translated path keeps its historical rule ───────────────────────────

function translatedVerdict(body: string) {
  return judgeBufferedTurn(
    { kind: "text", text: body },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
}

test("the translated path keeps the historical verdicts", () => {
  const bodies = [RESPONSES_REASONING_TURN, RESPONSES_TEXT_TURN, RESPONSES_USAGE_TURN];
  for (const body of bodies) {
    const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);
    assert.ok(summary, "the production summary reader must classify the turn");
    const historical = isUselessEmptyTurn(summary) ? "retry" : "pass";
    assert.equal(translatedVerdict(body).kind, historical);
  }
  assert.equal(translatedVerdict(RESPONSES_REASONING_TURN).kind, "retry");
  assert.equal(translatedVerdict(RESPONSES_TEXT_TURN).kind, "pass");
  assert.equal(translatedVerdict(RESPONSES_USAGE_TURN).kind, "pass");
});

// ── The bounded read stops on usable output only ──────────────────────────

test("the bounded read keeps reading a blanks-only or draft-only turn instead of stopping early", async () => {
  for (const body of [WHITESPACE_TURN, DRAFT_ONLY_TURN]) {
    const outcome = await readBoundedResponseOutcome(
      sseResponse(body),
      FLUSH_EMPTY_RETRY_MAX_BYTES,
      1000
    );
    assert.equal(outcome.kind, "text", "a turn without usable text is read to its end");
  }
  const visible = await readBoundedResponseOutcome(
    sseResponse(VISIBLE_TURN),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    1000
  );
  assert.equal(visible.kind, "early-pass", "a turn with usable text stops the read early");
});

// ── The replay loop ─────────────────────────────────────────────────────────

type LoopDeps = Parameters<typeof runEmptyTurnRetryLoop>[0];

function baseDeps(overrides: Partial<LoopDeps>): LoopDeps {
  return {
    providerResponse: sseResponse(MUTE_TOKENS_TURN),
    credentials: { connectionId: "conn-original" },
    provider: "openai",
    currentModel: "gpt-4.1",
    model: "gpt-4.1",
    targetFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    isAborted: () => false,
    // 0 disables the stream-readiness wrapper, so the adopted response is the
    // one executeProviderRequest returned.
    timeoutMs: 0,
    maxTimeoutMs: 0,
    maxRetries: 1,
    translatedBody: {},
    finalBody: {},
    providerUrl: "https://example.test",
    providerHeaders: {},
    correlationId: "c",
    traceId: "t",
    log: null,
    getProviderCredentials: async () => ({ connectionId: "conn-retry" }),
    executeProviderRequest: async () => ({ response: sseResponse(CONTENT_UPSTREAM_TURN) }),
    noteOutcome: () => {},
    logTargetRequest: () => {},
    captureBody: (body: unknown) => body,
    ...overrides,
  } as LoopDeps;
}

test("the direct replay loop stops at the existing retry budget", async () => {
  let executions = 0;
  await runEmptyTurnRetryLoop(
    baseDeps({
      maxRetries: 4,
      executeProviderRequest: async () => {
        executions++;
        return { response: sseResponse(MUTE_TOKENS_TURN) };
      },
    })
  );
  assert.equal(executions, 4, "the existing retry budget is not widened");
});

test("the direct replay loop adopts the turn that carries content", async () => {
  let executions = 0;
  const retried = sseResponse(CONTENT_UPSTREAM_TURN);
  const result = await runEmptyTurnRetryLoop(
    baseDeps({
      executeProviderRequest: async () => {
        executions++;
        return { response: retried };
      },
    })
  );
  assert.equal(executions, 1, "the loop stops as soon as a turn carries content");
  assert.equal(result.adopted, true);
  assert.equal(result.providerResponse, retried);
});

test("the direct replay loop replays a mute turn that reported usage", async () => {
  let executions = 0;
  const retried = sseResponse(CONTENT_UPSTREAM_TURN);
  const result = await runEmptyTurnRetryLoop(
    baseDeps({
      providerResponse: sseResponse(MUTE_WITH_USAGE_TURN),
      executeProviderRequest: async () => {
        executions++;
        return { response: retried };
      },
    })
  );
  assert.equal(executions, 1, "a mute turn with usage is replayed on the tip's armed path");
  assert.equal(result.adopted, true);
  assert.equal(result.providerResponse, retried);
});

test("a native terminal is never replayed", async () => {
  let executions = 0;
  const native = markEmptyTurnExecution(
    sseResponse(MUTE_TOKENS_TURN),
    "https://api.openai.com/v1/chat/completions",
    { connectionId: "conn-native", apiKey: "sk-native" }
  );
  await runEmptyTurnRetryLoop(
    baseDeps({
      providerResponse: native,
      executeProviderRequest: async () => {
        executions++;
        return { response: sseResponse(CONTENT_UPSTREAM_TURN) };
      },
    })
  );
  assert.equal(executions, 0, "a native terminal is a valid completion, never a retry trigger");
});

test("the translated path still replays a mute upstream turn", async () => {
  let executions = 0;
  const geminiEmpty = frame({ candidates: [] });
  await runEmptyTurnRetryLoop(
    baseDeps({
      providerResponse: sseResponse(geminiEmpty),
      targetFormat: FORMATS.GEMINI,
      clientResponseFormat: FORMATS.OPENAI,
      executeProviderRequest: async () => {
        executions++;
        return { response: sseResponse(geminiEmpty) };
      },
    })
  );
  assert.equal(executions, 1, "the translated path keeps replaying a mute turn");
});

// ── End to end: the direct streaming path ───────────────────────────────────
//
// The upstream is an openai-compatible node on a non-native base URL, so the
// turn stays outside the native-terminal policy — the population the flag is
// meant to serve.

const NODE_ID = "openai-compatible-chat-empty-turn-direct";
const NODE_PREFIX = "empty-turn-direct";
const NODE_BASE_URL = "https://empty-turn-direct.example.invalid/v1";

const originalFetch = globalThis.fetch;
const FLAG = "FLUSH_EMPTY_RETRY_ENABLED";
const ORIGINAL_FLAG = process.env[FLAG];

function setFlag(enabled: boolean) {
  if (enabled) process.env[FLAG] = "true";
  else delete process.env[FLAG];
}

async function resetStorage() {
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  initTranslators();
}

async function seedNode() {
  await providersDb.createProviderNode({
    id: NODE_ID,
    name: "empty-turn-direct",
    type: "openai-compatible",
    prefix: NODE_PREFIX,
    apiType: "chat",
    baseUrl: NODE_BASE_URL,
  });
  for (const name of ["empty-turn-direct-a", "empty-turn-direct-b"]) {
    await providersDb.createProviderConnection({
      provider: NODE_ID,
      authType: "apikey",
      name,
      apiKey: `sk-${name}`,
      isActive: true,
      testStatus: "active",
      providerSpecificData: { baseUrl: NODE_BASE_URL, apiType: "chat", prefix: NODE_PREFIX },
    });
  }
}

function streamRequest() {
  const nonce = `empty-turn-direct-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      model: `${NODE_PREFIX}/gpt-4.1`,
      messages: [{ role: "user", content: `Reply with OK only. ${nonce}` }],
      max_tokens: 64,
      stream: true,
      temperature: 0,
    }),
  });
}

function stubFetch(dispatches: string[], handler: (callIndex: number) => Response) {
  globalThis.fetch = (async (_url: unknown, init: { headers?: unknown }) => {
    const headers = new Headers((init?.headers ?? {}) as HeadersInit);
    dispatches.push(headers.get("authorization") ?? "");
    return handler(dispatches.length - 1);
  }) as typeof fetch;
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  setFlag(true);
  await resetStorage();
  await seedNode();
});

test.afterEach(async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  globalThis.fetch = originalFetch;
  if (ORIGINAL_FLAG === undefined) delete process.env[FLAG];
  else process.env[FLAG] = ORIGINAL_FLAG;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the armed flag replays a mute direct turn and serves the replayed content", async () => {
  const dispatches: string[] = [];
  stubFetch(dispatches, (callIndex) =>
    callIndex === 0 ? sseResponse(MUTE_WITH_USAGE_TURN) : sseResponse(CONTENT_UPSTREAM_TURN)
  );
  const response = await handleChat(streamRequest());
  const bodyText = await response.text();
  assert.equal(
    dispatches.length,
    2,
    `expected the initial turn plus one replay, got ${dispatches.length}`
  );
  assert.match(bodyText, /served-after-retry/, "the client receives the replayed content");
  assert.notEqual(
    dispatches[1],
    dispatches[0],
    "the replay does not reuse the connection that served the empty turn"
  );
});

test("the disarmed flag serves the mute direct turn as it is", async () => {
  setFlag(false);
  const dispatches: string[] = [];
  stubFetch(dispatches, () => sseResponse(MUTE_TOKENS_TURN));
  const response = await handleChat(streamRequest());
  const bodyText = await response.text();
  assert.equal(
    dispatches.length,
    1,
    `a disarmed flag issues exactly one dispatch, got ${dispatches.length}`
  );
  assert.doesNotMatch(bodyText, /served-after-retry/);
});
