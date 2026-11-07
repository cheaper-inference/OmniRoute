/**
 * Regression test: OpenRouter mid-stream error chunk silently swallowed.
 *
 * OpenRouter (and other OpenAI-compatible aggregators) can send an HTTP 200 SSE
 * stream whose body carries a `chat.completion.chunk` with a top-level `error`
 * object and either empty or populated `choices` — e.g. when the
 * underlying provider (Nvidia, hosting a free model) hits its own capacity limit
 * mid-request:
 *   {"choices":[],"error":{"code":502,"message":"Upstream error from Nvidia: ...
 *   Worker local total request limit reached (33/32)","metadata":{"error_type":
 *   "provider_unavailable"}}}
 *
 * Empty-choice errors already have coverage. Populated-choice errors must use
 * the same failure path, not emit their delta or a false response.completed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

const importGuard = registerHooks({
  resolve(specifier, context, nextResolve) {
    const resolved = nextResolve(specifier, context);
    assert.ok(
      !/\/credentialLoader\.[cm]?[jt]s$/.test(resolved.url),
      "offline translator tests must not import the external credential loader"
    );
    return resolved;
  },
});
const originalFetch = globalThis.fetch;
let unexpectedFetches = 0;
globalThis.fetch = async () => {
  unexpectedFetches++;
  throw new Error("Unexpected fetch in offline OpenRouter translator tests");
};
test.after(() => {
  importGuard.deregister();
  globalThis.fetch = originalFetch;
  assert.equal(unexpectedFetches, 0, "translator tests must not make network requests");
});

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");

// Responses-only fixture: importing translator/index also loads request-side provider state.
function initState() {
  return {
    seq: 0,
    responseId: "resp_offline_openrouter",
    created: 1,
    model: null,
    started: false,
    toolCalls: new Map(),
    finishReason: null,
    usage: null,
    msgTextBuf: {},
    msgItemAdded: {},
    msgContentAdded: {},
    msgItemDone: {},
    reasoningId: "",
    reasoningIndex: -1,
    reasoningBuf: "",
    reasoningPartAdded: false,
    reasoningDone: false,
    inThinking: false,
    parseTextualReasoningTags: false,
    funcArgsBuf: {},
    funcArgsEscapeState: {},
    funcNames: {},
    funcCallIds: {},
    funcArgsDone: {},
    funcItemAdded: {},
    funcItemDone: {},
    completedOutputItems: [],
    completedSent: false,
    upstreamError: undefined as
      { status: number; type: string; code: string; message: string } | undefined,
  };
}

test("OpenRouter mid-stream 502 provider_unavailable is surfaced as upstreamError, not dropped", () => {
  const state = initState();

  const errorChunk = {
    id: "gen-1784726796-AJw13XXRnwqcRL2kieNm",
    object: "chat.completion.chunk",
    created: 1784726796,
    model: "nvidia/nemotron-3-ultra-550b-a55b:free",
    provider: "Nvidia",
    choices: [],
    error: {
      code: 502,
      message:
        "Upstream error from Nvidia: ResourceExhausted: Worker local total request limit reached (33/32)",
      metadata: { error_type: "provider_unavailable" },
    },
  };

  const immediateEvents = openaiToOpenAIResponsesResponse(errorChunk, state);
  assert.deepEqual(immediateEvents, [], "the error chunk itself emits no delta events");

  // End of stream (chunk === null) flushes the deferred completion.
  const flushEvents = openaiToOpenAIResponsesResponse(null, state);
  const completedEvent = flushEvents.find((e) => e.event === "response.failed");
  assert.ok(completedEvent, "should have a response.failed event");
  assert.equal(
    completedEvent.data.response.status,
    "failed",
    "status must be 'failed', not a false 'completed'"
  );
  assert.ok(completedEvent.data.response.error, "error must not be null");
  assert.match(
    completedEvent.data.response.error.message,
    /Worker local total request limit reached/
  );
  assert.equal(completedEvent.data.response.output.length, 0);
});

test("OpenRouter mid-stream error with a rate-limit code maps to a 429 upstreamError", () => {
  const state = initState();

  openaiToOpenAIResponsesResponse(
    {
      choices: [],
      error: {
        code: 429,
        message: "Rate limit exceeded, please try again later.",
        metadata: { error_type: "rate_limited" },
      },
    },
    state
  );

  const flushEvents = openaiToOpenAIResponsesResponse(null, state);
  const completedEvent = flushEvents.find((e) => e.event === "response.failed");
  assert.ok(completedEvent);
  assert.equal(completedEvent.data.response.status, "failed");
  assert.equal(completedEvent.data.response.error.code, "429");
});

for (const populatedChoices of [false, true]) {
  for (const midstream of [false, true]) {
    test(`OpenRouter 500 fails with ${populatedChoices ? "populated" : "empty"} choices ${midstream ? "after partial output" : "as the first chunk"}`, () => {
      const state = initState();
      const partialContent = "Partial answer before failure";
      const errorContent = "This error-chunk content must not become output";
      const events = midstream
        ? openaiToOpenAIResponsesResponse(
            {
              id: "gen-offline-openrouter",
              model: "openai/gpt-6.1-sol",
              choices: [{ index: 0, delta: { content: partialContent }, finish_reason: null }],
            },
            state
          )
        : [];

      const errorEvents = openaiToOpenAIResponsesResponse(
        {
          id: "gen-offline-openrouter",
          object: "chat.completion.chunk",
          model: "openai/gpt-6.1-sol",
          error: {
            code: 500,
            message: "Internal server error",
            metadata: { error_type: "server" },
          },
          choices: populatedChoices
            ? [{ index: 0, delta: { content: errorContent }, finish_reason: "error" }]
            : [],
        },
        state
      );
      events.push(...errorEvents, ...openaiToOpenAIResponsesResponse(null, state));

      assert.deepEqual(errorEvents, [], "error chunks must not emit content or success events");
      assert.equal(state.upstreamError?.status, 500);
      assert.equal(state.upstreamError?.code, "server", "retain metadata.error_type internally");
      assert.equal(state.upstreamError?.type, "server_error");
      assert.ok(!events.some((event) => event.event === "response.completed"));
      const failures = events.filter((event) => event.event === "response.failed");
      assert.equal(failures.length, 1, "emit exactly one failed terminal");
      const response = failures[0].data.response;
      assert.equal(response.status, "failed");
      assert.equal(response.error.message, "Internal server error");
      assert.ok(response.error.code === "500" || response.error.code === "server");
      assert.ok(!JSON.stringify(events).includes(errorContent));
      if (midstream) {
        assert.ok(JSON.stringify(response.output).includes(partialContent));
      } else {
        assert.deepEqual(response.output, []);
      }
      assert.deepEqual(openaiToOpenAIResponsesResponse(null, state), [], "flush is idempotent");
    });
  }
}

test("OpenRouter healthy output still completes after trailing usage", () => {
  const state = initState();
  const events = openaiToOpenAIResponsesResponse(
    {
      id: "gen-offline-healthy",
      choices: [{ index: 0, delta: { content: "Healthy answer" }, finish_reason: "stop" }],
    },
    state
  );
  events.push(
    ...openaiToOpenAIResponsesResponse(
      { choices: [], usage: { prompt_tokens: 2, completion_tokens: 3, total_tokens: 5 } },
      state
    ),
    ...openaiToOpenAIResponsesResponse(null, state)
  );
  const completed = events.filter((event) => event.event === "response.completed");
  assert.equal(completed.length, 1);
  assert.equal(completed[0].data.response.status, "completed");
  assert.equal(completed[0].data.response.error, null);
  assert.equal(completed[0].data.response.usage.total_tokens, 5);
  assert.ok(JSON.stringify(completed[0].data.response.output).includes("Healthy answer"));
  assert.ok(!events.some((event) => event.event === "response.failed"));
});
