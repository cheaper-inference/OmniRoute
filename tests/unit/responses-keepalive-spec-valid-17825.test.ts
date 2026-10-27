/**
 * #17825 — the synthetic `response.in_progress` keepalive must be a spec-valid
 * Responses event. Spec-validating clients (Vercel AI SDK `@ai-sdk/openai`) abort the
 * whole stream with AI_TypeValidationError on a stub `{id, status}` response object.
 *
 * The SDK schema mirrored below is `@ai-sdk/openai@4.0.83` dist/index.js:3240-3247
 * (response.id, response.created_at, response.model required); the extra
 * `object` / `output` / `status` fields are the OpenAI spec `Response` required fields.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const { OPENAI_RESPONSES_IN_PROGRESS_FRAME, createSseHeartbeatTransform, HEARTBEAT_SHAPES } =
  await import("../../open-sse/utils/sseHeartbeat.ts");

const aiSdkInProgressSchema = z.object({
  type: z.literal("response.in_progress"),
  response: z.object({ id: z.string(), created_at: z.number(), model: z.string() }),
});
const specResponseSchema = z.object({
  object: z.literal("response"),
  status: z.literal("in_progress"),
  output: z.array(z.unknown()),
});

type InProgressEvent = {
  type: string;
  sequence_number: number;
  response: {
    id: string;
    object: string;
    status: string;
    created_at: number;
    model: string;
    output: unknown[];
  };
};

function parseData(frame: Uint8Array | string): InProgressEvent {
  const text = typeof frame === "string" ? frame : new TextDecoder().decode(frame);
  const line = text.split("\n").find((l) => l.startsWith("data: "));
  assert.ok(line, `no data line in ${JSON.stringify(text)}`);
  return JSON.parse(line!.slice(6));
}

function assertSpecValid(payload: InProgressEvent, site: string) {
  const sdk = aiSdkInProgressSchema.safeParse(payload);
  assert.ok(
    sdk.success,
    `${site}: AI SDK schema rejects frame: ${JSON.stringify(sdk.error?.issues)}`
  );
  const spec = specResponseSchema.safeParse(payload.response);
  assert.ok(
    spec.success,
    `${site}: spec Response fields missing: ${JSON.stringify(spec.error?.issues)}`
  );
}

test("#17825: startup/keepalive response.in_progress frame is a complete Response event", () => {
  assertSpecValid(parseData(OPENAI_RESPONSES_IN_PROGRESS_FRAME), "startup frame");
});

test("#17825: mid-stream heartbeat reuses the real response id/created_at/model", async () => {
  const intervals: Array<{ callback: () => void }> = [];
  const origSet = globalThis.setInterval;
  globalThis.setInterval = ((cb: () => void) => {
    const i = { callback: cb, unref() {} };
    intervals.push(i);
    return i;
  }) as unknown as typeof setInterval;
  try {
    const t = createSseHeartbeatTransform({
      intervalMs: 100,
      shape: HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS,
    });
    const writer = t.writable.getWriter();
    const reader = t.readable.getReader();
    const created = {
      type: "response.created",
      sequence_number: 7,
      response: {
        id: "resp_real_1",
        object: "response",
        created_at: 1700000000,
        model: "gpt-5.6-sol",
        status: "in_progress",
        output: [],
      },
    };
    // The default TransformStream readable has HWM 0: start the write, then read it back.
    const written = writer.write(
      new TextEncoder().encode(`event: response.created\ndata: ${JSON.stringify(created)}\n\n`)
    );
    await reader.read(); // forwarded real chunk
    await written;
    intervals[0].callback();
    const { value } = await reader.read();
    const payload = parseData(value!);
    assertSpecValid(payload, "mid-stream heartbeat");
    assert.equal(payload.response.id, "resp_real_1");
    assert.equal(payload.response.created_at, 1700000000);
    assert.equal(payload.response.model, "gpt-5.6-sol");
  } finally {
    globalThis.setInterval = origSet;
  }
});

test("#17825: per-request builder frame carries the request model and a unique id", async () => {
  const { buildResponsesInProgressFrame, buildKeepaliveResponseId } =
    await import("../../open-sse/utils/responsesKeepaliveFrame.ts");
  const a = buildKeepaliveResponseId();
  assert.notEqual(a, buildKeepaliveResponseId());
  const payload = parseData(buildResponsesInProgressFrame({ id: a, model: "my-combo" }));
  assertSpecValid(payload, "per-request frame");
  assert.equal(payload.response.id, a);
  assert.equal(payload.response.model, "my-combo");
});

test("#17825: tracker tolerates split chunks and non-JSON lines", async () => {
  const { createResponsesInProgressTracker } =
    await import("../../open-sse/utils/responsesKeepaliveFrame.ts");
  const tracker = createResponsesInProgressTracker();
  const enc = new TextEncoder();
  const line = `data: ${JSON.stringify({
    type: "response.created",
    sequence_number: 3,
    response: { id: "resp_x", created_at: 42, model: "m1" },
  })}\n\n`;
  tracker.observe(enc.encode("data: {not json\n\n"));
  tracker.observe(enc.encode(line.slice(0, 30)));
  tracker.observe(enc.encode(line.slice(30)));
  const payload = parseData(tracker.payload());
  assert.equal(payload.response.id, "resp_x");
  assert.equal(payload.response.created_at, 42);
  assert.equal(payload.response.model, "m1");
  assert.equal(payload.sequence_number, 3);
});
