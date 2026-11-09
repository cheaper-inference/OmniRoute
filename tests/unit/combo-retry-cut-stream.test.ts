/**
 * #18460 follow-up — a non-streaming combo attempt whose upstream stream was cut before
 * its terminal signal must fail over to the next target.
 *
 * #18460 reports a cut buffered stream as `finish_reason: "length"` with the partial
 * content. The combo quality check accepts a non-empty `length` body, so a combo returned
 * the partial answer of its first target instead of trying the next one. A cut is not a
 * model-side `length` (`max_tokens`): it is an attempt that failed in transit.
 *
 * Contract now:
 * - the buffered-SSE parsers tag their cut verdict on the parsed body (internal WeakSet,
 *   never serialized), `parseNonStreamingResponseBody` carries it onto the upstream
 *   Response, and `inheritEmptyTurnPolicy` carries it onto the wrapper chatCore returns;
 * - a non-streaming combo attempt with that tag is a retryable target failure: the combo
 *   tries the next target, and only when every target is cut returns the last partial
 *   result (`length`), as before;
 * - a genuine upstream `length` (`finish_reason: "length"`, `stop_reason: "max_tokens"`,
 *   `response.incomplete`, Gemini `MAX_TOKENS`) is never tagged and is returned as-is;
 * - the cut attempt trips neither the provider circuit breaker nor a model lockout.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-cut-stream-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-cut-stream-test-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { parseNonStreamingResponseBody } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponseParse.ts");
const { inheritEmptyTurnPolicy } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
const { inheritResponsePolicies } = await import("../../src/sse/handlers/chat/responsePolicies.ts");
const { parseSSEToOpenAIResponse, parseSSEToClaudeResponse, parseSSEToResponsesOutput } =
  await import("../../open-sse/handlers/sseParser.ts");
const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");
const truncation = await import("../../open-sse/handlers/sseParser/truncation.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const { getAllModelLockouts, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

/** The Response-level marker module (new in this fix); `{}` while it does not exist. */
async function loadPolicy(): Promise<{
  isTruncatedStreamResponse?: (response: Response) => boolean;
}> {
  try {
    return await import("../../open-sse/utils/truncatedStreamPolicy.ts");
  } catch {
    return {};
  }
}

const isTruncatedStreamBody = (body: unknown): boolean => {
  const fn = (truncation as { isTruncatedStreamBody?: (b: unknown) => boolean })
    .isTruncatedStreamBody;
  assert.equal(typeof fn, "function", "truncation.ts must export isTruncatedStreamBody");
  return fn!(body);
};

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

test.beforeEach(() => clearAllModelLockouts());
test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

// ── Fixtures ────────────────────────────────────────────────────────────────────
const data = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
const named = (event: string, value: unknown) =>
  `event: ${event}\ndata: ${JSON.stringify(value)}\n\n`;
const chunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  data({ id: "c", model: "m", choices: [{ index: 0, delta, finish_reason: finishReason }] });

const openAiCut = (text: string) => chunk({ role: "assistant", content: text });
const openAiGenuineLength = (text: string) =>
  openAiCut(text) + chunk({}, "length") + "data: [DONE]\n\n";

const CLAUDE_HEAD =
  named("message_start", {
    type: "message_start",
    message: { id: "msg", model: "claude-sonnet-4-6", role: "assistant", usage: {} },
  }) +
  named("content_block_start", {
    type: "content_block_start",
    index: 0,
    content_block: { type: "text", text: "" },
  }) +
  named("content_block_delta", {
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: "partial" },
  });
const RESPONSES_HEAD =
  data({
    type: "response.created",
    response: { id: "resp", model: "gpt-5.3-codex", status: "in_progress", output: [] },
  }) +
  data({
    type: "response.output_text.delta",
    item_id: "msg_1",
    output_index: 0,
    content_index: 0,
    delta: "partial",
  });
const GEMINI_HEAD = data({
  response: { candidates: [{ content: { parts: [{ text: "partial" }] } }] },
});

/**
 * What chatCore hands the combo for a buffered (stream:false) upstream: the SSE body is
 * parsed by `parseNonStreamingResponseBody`, and the client JSON is wrapped with
 * `inheritEmptyTurnPolicy(providerResponse, …)` (nonStreamingResponse.ts).
 */
async function chatCoreNonStreamingResult(sse: string): Promise<Response> {
  const upstream = new Response(sse, { headers: { "content-type": "text/event-stream" } });
  const parsed = await parseNonStreamingResponseBody({
    providerResponse: upstream,
    upstreamStream: false,
    providerHeaders: null,
    finalBody: null,
    targetFormat: "openai",
    model: "m",
  });
  assert.equal(parsed.kind, "ok");
  if (parsed.kind !== "ok") throw new Error("unreachable");
  return inheritEmptyTurnPolicy(
    upstream,
    new Response(JSON.stringify(parsed.responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  );
}

function healthy200(model: string) {
  return new Response(
    JSON.stringify({
      id: "ok",
      object: "chat.completion",
      model,
      choices: [
        { index: 0, message: { role: "assistant", content: "full answer" }, finish_reason: "stop" },
      ],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

const combo = (models: string[]) => ({
  name: "combo-cut-stream",
  strategy: "priority",
  models: models.map((model) => ({ model })),
});

async function runCombo(
  models: string[],
  respond: (modelStr: string, call: number) => Promise<Response> | Response,
  stream = false
) {
  const called: string[] = [];
  const result = await handleComboChat({
    body: { model: "combo-cut-stream", stream, messages: [{ role: "user", content: "hi" }] },
    combo: combo(models),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      called.push(modelStr);
      return respond(modelStr, called.length);
    },
    log,
    settings: {},
    allCombos: [],
  });
  return { result, called };
}

type ChatJson = { choices: Array<{ message: { content: string }; finish_reason: string }> };

// ── Parser verdict tag: cut vs genuine length ───────────────────────────────────
test("parsers tag a cut stream, never a genuine upstream length", () => {
  assert.equal(isTruncatedStreamBody(parseSSEToOpenAIResponse(openAiCut("partial"), "m")), true);
  assert.equal(
    isTruncatedStreamBody(parseSSEToOpenAIResponse(openAiGenuineLength("partial"), "m")),
    false
  );

  assert.equal(isTruncatedStreamBody(parseSSEToClaudeResponse(CLAUDE_HEAD, "m")), true);
  const claudeMaxTokens =
    CLAUDE_HEAD +
    named("message_delta", {
      type: "message_delta",
      delta: { stop_reason: "max_tokens", stop_sequence: null },
      usage: { output_tokens: 1 },
    }) +
    named("message_stop", { type: "message_stop" });
  assert.equal(isTruncatedStreamBody(parseSSEToClaudeResponse(claudeMaxTokens, "m")), false);

  assert.equal(isTruncatedStreamBody(parseSSEToResponsesOutput(RESPONSES_HEAD, "m")), true);
  const responsesIncomplete =
    RESPONSES_HEAD +
    data({
      type: "response.incomplete",
      response: {
        id: "resp",
        status: "incomplete",
        incomplete_details: { reason: "max_output_tokens" },
        output: [],
      },
    });
  assert.equal(isTruncatedStreamBody(parseSSEToResponsesOutput(responsesIncomplete, "m")), false);

  assert.equal(isTruncatedStreamBody(parseSSEToGeminiResponse(GEMINI_HEAD, "m")), true);
  const geminiMaxTokens =
    GEMINI_HEAD + data({ response: { candidates: [{ finishReason: "MAX_TOKENS" }] } });
  assert.equal(isTruncatedStreamBody(parseSSEToGeminiResponse(geminiMaxTokens, "m")), false);
});

test("the cut verdict rides the Response chain and never reaches the client body", async () => {
  const { isTruncatedStreamResponse } = await loadPolicy();
  assert.equal(typeof isTruncatedStreamResponse, "function");

  const cut = await chatCoreNonStreamingResult(openAiCut("partial"));
  assert.equal(isTruncatedStreamResponse!(cut), true);
  // chat.ts wrappers (withSelectedConnectionHeader fallback) copy it too.
  assert.equal(isTruncatedStreamResponse!(inheritResponsePolicies(cut, new Response("{}"))), true);
  const json = (await cut.clone().json()) as ChatJson & Record<string, unknown>;
  assert.deepEqual(Object.keys(json).sort(), ["choices", "created", "id", "model", "object"]);

  const genuine = await chatCoreNonStreamingResult(openAiGenuineLength("partial"));
  assert.equal(isTruncatedStreamResponse!(genuine), false);
});

// ── Combo behaviour ─────────────────────────────────────────────────────────────
test("combo: a target whose stream was cut fails over to the next target", async () => {
  const { result, called } = await runCombo(
    ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    async (modelStr, call) =>
      call === 1 ? chatCoreNonStreamingResult(openAiCut("partial")) : healthy200(modelStr)
  );
  assert.deepEqual(called, ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"]);
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, "full answer");
  assert.equal(json.choices[0].finish_reason, "stop");
});

test("combo: a genuine upstream length is a success and is not retried", async () => {
  const { result, called } = await runCombo(
    ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    async (modelStr, call) =>
      call === 1
        ? chatCoreNonStreamingResult(openAiGenuineLength("budget hit"))
        : healthy200(modelStr)
  );
  assert.deepEqual(called, ["openai/gpt-4o-mini"]);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, "budget hit");
  assert.equal(json.choices[0].finish_reason, "length");
});

test("combo: when every target is cut, the last partial result is returned with length", async () => {
  const { result, called } = await runCombo(
    ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    async (_modelStr, call) => chatCoreNonStreamingResult(openAiCut(`partial ${call}`))
  );
  assert.equal(called.length, 2);
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, "partial 2");
  assert.equal(json.choices[0].finish_reason, "length");
});

test("combo: a cut target followed by a failing target still returns the partial result", async () => {
  const { result, called } = await runCombo(
    ["openai/gpt-4o-mini", "anthropic/claude-sonnet-4-6"],
    async (_modelStr, call) =>
      call === 1
        ? chatCoreNonStreamingResult(openAiCut("partial"))
        : new Response(JSON.stringify({ error: { message: "upstream down" } }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
          })
  );
  // The 503 target may be retried by the combo's own retry policy; the cut one is not.
  assert.equal(called[0], "openai/gpt-4o-mini");
  assert.ok(called.length >= 2);
  assert.ok(called.slice(1).every((model) => model === "anthropic/claude-sonnet-4-6"));
  assert.equal(result.status, 200);
  const json = (await result.json()) as ChatJson;
  assert.equal(json.choices[0].message.content, "partial");
  assert.equal(json.choices[0].finish_reason, "length");
});

test("combo: a cut attempt trips neither the provider breaker nor a model lockout", async () => {
  const provider = "cutstreamprov";
  const before = getCircuitBreaker(provider).getStatus();
  await runCombo([`${provider}/model-a`, "anthropic/claude-sonnet-4-6"], async (modelStr, call) =>
    call === 1 ? chatCoreNonStreamingResult(openAiCut("partial")) : healthy200(modelStr)
  );
  const after = getCircuitBreaker(provider).getStatus();
  assert.equal(after.state, "CLOSED");
  assert.equal(after.failureCount, before.failureCount);
  assert.equal(
    getAllModelLockouts().some((entry) => JSON.stringify(entry).includes("model-a")),
    false
  );
});
