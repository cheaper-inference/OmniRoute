import test from "node:test";
import assert from "node:assert/strict";

import { createUpstreamStartTimeoutError } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";

const exercise = async (provider: string, reason: Error) =>
  runNonStreamingProviderLeg({
    phase: "initial",
    sourceBody: { messages: [{ role: "user", content: "fixture" }] },
    allowAccountRotation: true,
    allowModelFallback: false,
    provider,
    model: "fixture-model",
    connectionId: "fixture-connection",
    executeProviderRequest: async () => {
      throw reason;
    },
    setRequestWireState: () => {},
  });

test("non-streaming leg retains Antigravity pre-response timeout code and type", async () => {
  const result = await exercise(
    "antigravity",
    createUpstreamStartTimeoutError(12000, "antigravity", "gemini-3.8-flash-tiered")
  );
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 504);
  assert.equal(result.result.errorCode, "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT");
  assert.equal(result.result.errorType, "upstream_timeout");
  assert.equal(result.receipt.errorType, "upstream_timeout");
});

test("non-streaming leg does not mislabel upstream 504 or other-provider timeouts", async () => {
  const plain = new Error("plain upstream timeout");
  plain.name = "TimeoutError";
  const result = await exercise("antigravity", plain);
  assert.equal(result.kind, "error");
  if (result.kind !== "error") return;
  assert.equal(result.result.status, 504);
  assert.notEqual(result.result.errorCode, "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT");

  const other = await exercise("codex", createUpstreamStartTimeoutError(12000, "codex", "fixture"));
  assert.equal(other.kind, "error");
  if (other.kind !== "error") return;
  assert.notEqual(other.result.errorType, "upstream_timeout");
});
