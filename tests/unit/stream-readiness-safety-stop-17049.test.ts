/**
 * #17049 — a provider safety stop delivered as an error-only SSE frame on a 200 stream
 * (OpenAI-compatible chat upstreams emit a bare `data: {"error": …}` and close) was
 * classified by the readiness gate as a transient `STREAM_EARLY_EOF` 502. The provider
 * pipeline then bought a same-connection retry and the combo failed over to the next
 * model, re-sending a conversation the provider had explicitly stopped.
 *
 * With PROVIDER_SAFETY_STOPS_TERMINAL on, the gate surfaces the explicit stop as the same
 * terminal envelope as an HTTP-level stop (403/400, `invalid_request_error`, safety code),
 * which no early-EOF or readiness-stall retry spends a request on. Off, it is unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";
import { shouldRetryStreamEarlyEof } from "../../src/sse/handlers/chatHelpers.ts";

const log = { info() {}, warn() {}, debug() {}, error() {} };
const SAFETY_MESSAGE =
  "This request was blocked by our safety systems. Reason: Potentially unintended activity.";

function sseResponse(frames: string[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

const errorFrame = (error: Record<string, unknown>) => `data: ${JSON.stringify({ error })}\n\n`;

async function withFlag<T>(value: string | undefined, run: () => Promise<T>): Promise<T> {
  const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  if (value === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = value;
  try {
    return await run();
  } finally {
    if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
  }
}

for (const [label, error, status, code] of [
  [
    "named misalignment stop",
    {
      message: SAFETY_MESSAGE,
      type: "invalid_request_error",
      code: "misalignment_policy_violation",
    },
    403,
    "misalignment_policy_violation",
  ],
  [
    "named content-policy stop",
    { message: "Refused", type: "invalid_request_error", code: "content_policy_violation" },
    400,
    "content_policy_violation",
  ],
  [
    "legacy code-less stop",
    { message: SAFETY_MESSAGE, type: "invalid_request_error" },
    400,
    "provider_safety_rejection",
  ],
] as const) {
  test(`${label}: error-only frame is a terminal safety stop, not STREAM_EARLY_EOF`, async () => {
    const result = await withFlag("true", () =>
      ensureStreamReadiness(sseResponse([errorFrame(error)]), {
        timeoutMs: 2_000,
        provider: "openai-compatible-chat",
        model: "probe",
        log,
      })
    );
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.code, code);
    assert.equal(result.type, "invalid_request_error");
    assert.equal(result.response.status, status);
    const body = (await result.response.json()) as { error?: { code?: string; type?: string } };
    assert.equal(body.error?.code, code);
    assert.equal(body.error?.type, "invalid_request_error");
    assert.equal(shouldRetryStreamEarlyEof(result.code, 0), false, "no early-EOF retry");
  });
}

test("flag off (default): the same frame keeps the STREAM_EARLY_EOF classification", async () => {
  const result = await withFlag(undefined, () =>
    ensureStreamReadiness(
      sseResponse([
        errorFrame({
          message: SAFETY_MESSAGE,
          type: "invalid_request_error",
          code: "misalignment_policy_violation",
        }),
      ]),
      { timeoutMs: 2_000, provider: "openai-compatible-chat", model: "probe", log }
    )
  );
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "STREAM_EARLY_EOF");
  assert.equal(result.response.status, 502);
});

test("non-safety error-only frame keeps STREAM_EARLY_EOF with the flag on", async () => {
  const result = await withFlag("true", () =>
    ensureStreamReadiness(
      sseResponse([
        errorFrame({ message: "upstream exploded", type: "server_error", code: "boom" }),
      ]),
      { timeoutMs: 2_000, provider: "openai-compatible-chat", model: "probe", log }
    )
  );
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.code, "STREAM_EARLY_EOF");
});
