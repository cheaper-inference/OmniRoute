import test from "node:test";
import assert from "node:assert/strict";

import { __test__ } from "../../open-sse/executors/qoder.ts";
import { parseQoderCliFailure } from "../../open-sse/services/qoderCli.ts";

const { unwrapQoderEnvelope } = __test__;

// Port of decolua/9router#7821 (billing blocks): Qoder answers an account that
// spent its daily credit allowance with the nested envelope codes 110 and 112,
// in the same triple-nested shape as the 10605 queue throttle. Treating them as
// a generic provider error (or as the 403 authentication_error the outer
// envelope carries) hides the real cause: the account is billed out for today,
// and routing should move to another account, not park a healthy PAT.

type ErrorPayload = {
  error: { message: string; type?: string; code?: string };
};

function sseEnvelope(envelope: Record<string, unknown>): Response {
  return new Response(`data: ${JSON.stringify(envelope)}\n\ndata: [DONE]\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function nestedCodeBody(code: string): string {
  // Same triple-nested shape the 10605 queue throttle uses.
  return JSON.stringify({
    code: "403",
    message: JSON.stringify({
      code,
      message: JSON.stringify({ modelKey: "qmodel_38max" }),
    }),
  });
}

test("nested code 110 (billing block) is a 429 qoder_billing_block, not 403", async () => {
  const result = await unwrapQoderEnvelope(
    sseEnvelope({ statusCodeValue: 403, body: nestedCodeBody("110") })
  );

  assert.equal(result.status, 429);
  const payload = (await result.json()) as ErrorPayload;
  assert.notEqual(payload.error.type, "authentication_error");
  assert.equal(payload.error.code, "qoder_billing_block");
});

test("nested code 112 (billing block) is a 429 qoder_billing_block, not 403", async () => {
  const result = await unwrapQoderEnvelope(
    sseEnvelope({ statusCodeValue: 403, body: nestedCodeBody("112") })
  );

  assert.equal(result.status, 429);
  const payload = (await result.json()) as ErrorPayload;
  assert.equal(payload.error.code, "qoder_billing_block");
});

test("10605 queue throttle keeps its upstream_busy classification", async () => {
  const body = JSON.stringify({
    code: "403",
    message: JSON.stringify({ code: "10605", message: JSON.stringify({ isQueued: false }) }),
  });
  const result = await unwrapQoderEnvelope(sseEnvelope({ statusCodeValue: 403, body }));

  assert.equal(result.status, 503);
  const payload = (await result.json()) as ErrorPayload;
  assert.equal(payload.error.code, "upstream_busy");
});

test("billing codes with more digits do not match (1101 is not 110)", async () => {
  const result = await unwrapQoderEnvelope(
    sseEnvelope({ statusCodeValue: 403, body: nestedCodeBody("1101") })
  );

  const payload = (await result.json()) as ErrorPayload;
  assert.notEqual(payload.error.code, "qoder_billing_block");
});

test("CLI failure parser classifies nested code 110 as a billing block", () => {
  const failure = parseQoderCliFailure(`qodercli failed: ${nestedCodeBody("110")}`);
  assert.equal(failure.status, 429);
  assert.equal(failure.code, "qoder_billing_block");
});

test("CLI failure parser classifies nested code 112 as a billing block", () => {
  const failure = parseQoderCliFailure("", `error: ${nestedCodeBody("112")}`);
  assert.equal(failure.status, 429);
  assert.equal(failure.code, "qoder_billing_block");
});
