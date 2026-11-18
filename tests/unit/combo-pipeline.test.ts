/**
 * Combo Pipeline Strategy Tests
 *
 * Tests for open-sse/services/pipeline.ts — the sequential chain combo strategy.
 * Focus: transient retry behaviour (429/502/503/504) added to prevent hard-fail
 * on rate-limited or temporarily unavailable upstream providers.
 */

import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";

import { handlePipelineChat, type PipelineStep } from "../../open-sse/services/pipeline.ts";

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

type Body = Record<string, unknown>;

interface MockResponse {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
}

/** Build a successful OpenAI-shaped response with given text. */
function okResponse(text: string): MockResponse {
  const body = {
    choices: [{ message: { role: "assistant", content: text } }],
  };
  return {
    ok: true,
    status: 200,
    json: async () => body,
  };
}

/** Build a failed response with given status. */
function failResponse(status: number): MockResponse {
  const body = { error: { message: `HTTP ${status}` } };
  return {
    ok: false,
    status,
    json: async () => body,
  };
}

type HandlerFn = (body: Body, model: string) => Promise<MockResponse>;

/** Build a mock handleSingleModel that returns responses in sequence. */
function makeHandler(responses: MockResponse[], opts?: { loopLast?: boolean }): HandlerFn {
  let call = 0;
  return async (_body: Body, _model: string): Promise<MockResponse> => {
    const idx = call++;
    if (idx < responses.length) return responses[idx];
    if (opts?.loopLast && responses.length > 0) return responses[responses.length - 1];
    return okResponse("fallback");
  };
}

// Minimal stub type — the real type is more complex but we only need (body, model) => Response
// (kept for reference, not used as value)

const noopLog = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};

const STEPS: PipelineStep[] = [
  { model: "provider-a/model-a" },
  { model: "provider-b/model-b" },
];

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("handlePipelineChat — transient retry", () => {
  it("succeeds when all steps return 200", async () => {
    const handler = makeHandler([okResponse("step 1 output"), okResponse("step 2 output")]);
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 2,
    });
    assert.equal(res.ok, true);
  });

  it("retries on 429 then succeeds", async () => {
    // First call to step 1 → 429, second call to step 1 → 200, step 2 → 200
    const handler = makeHandler([
      failResponse(429),
      okResponse("recovered"),
      okResponse("final"),
    ]);
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 2,
      retryDelayMs: 1, // fast for tests
    });
    assert.equal(res.ok, true);
  });

  it("retries on 503 then succeeds", async () => {
    const handler = makeHandler([
      failResponse(503),
      failResponse(503),
      okResponse("recovered after 2"),
      okResponse("final"),
    ]);
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 2,
      retryDelayMs: 1,
    });
    assert.equal(res.ok, true);
  });

  it("fails after exhausting retries on persistent 429", async () => {
    // Step 1 always returns 429, even after maxRetries=2 (3 total attempts)
    const handler = makeHandler([failResponse(429)], { loopLast: true });
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 2,
      retryDelayMs: 1,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 429);
  });

  it("fails immediately on 400 (non-transient, no retry)", async () => {
    let callCount = 0;
    const handler = async (): Promise<MockResponse> => {
      callCount++;
      return failResponse(400);
    };
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 5, // should NOT retry on 400
      retryDelayMs: 1,
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 400);
    // Only 1 call — no retry on non-transient error
    assert.equal(callCount, 1);
  });

  it("does NOT retry the final step", async () => {
    // Step 1 → 200, final step → 502 (should be returned as-is, no retry)
    const handler = makeHandler([okResponse("step 1"), failResponse(502)], { loopLast: true });
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      maxRetries: 3,
      retryDelayMs: 1,
    });
    // Final step result is returned directly regardless of status
    assert.equal(res.status, 502);
    assert.equal(res.ok, false);
  });
});

describe("handlePipelineChat — intermediate body memory", () => {
  it("parses the original intermediate body without clone and returns final response untouched", async () => {
    const intermediate = Response.json({
      choices: [{ message: { role: "assistant", content: "step result" } }],
    });
    Object.defineProperty(intermediate, "clone", {
      value: () => {
        throw new Error("intermediate response must not be cloned");
      },
    });
    const final = new Response("data: final\n\n", {
      headers: { "content-type": "text/event-stream" },
    });
    const handler = async (_body: Body, model: string): Promise<Response> =>
      model === "provider-a/model-a" ? intermediate : final;
    const result = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
    });

    assert.strictEqual(result, final);
    assert.equal(intermediate.bodyUsed, true);
    assert.equal(final.bodyUsed, false);
    assert.equal(await final.text(), "data: final\n\n");
  });

  it("preserves upstream failure bodies without inspecting or cloning them", async () => {
    const failure = new Response("rate-limited", { status: 429 });
    const result = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: async () => failure,
      log: noopLog as never,
    });
    assert.equal(result.status, 429);
    assert.equal(failure.bodyUsed, false);
  });
});

describe("handlePipelineChat — backward compat (no retry)", () => {
  it("fails on transient error when maxRetries=0 (default)", async () => {
    const handler = makeHandler([failResponse(429)], { loopLast: true });
    const res = await handlePipelineChat({
      body: { messages: [{ role: "user", content: "hi" }] },
      steps: STEPS,
      handleSingleModel: handler as unknown as never,
      log: noopLog as never,
      // maxRetries defaults to 0 — no retry
    });
    assert.equal(res.ok, false);
    assert.equal(res.status, 429);
  });
});
