/**
 * #16364 — Codex encrypted-reasoning replay rejections ride a 200-OK SSE that
 * then closes with zero useful content. The readiness gate already captures
 * the upstream message ("The encrypted content for item … could not be
 * verified") as `upstreamDiagnostic`, but kept the generic
 * `STREAM_EARLY_EOF` / 502 classification: the client saw a generic
 * transient-hang-up error, and the single-model path bought a same-connection
 * retry of a payload that deterministically fails again (invalid encrypted
 * content never un-invalidates itself).
 *
 * Expected: when the captured diagnostic is a reasoning-replay rejection, the
 * gate surfaces the same stable 400 `invalid_encrypted_content` code the
 * non-streaming path returns (reasoningReplayRejection.ts) — which also stops
 * the early-EOF retry, because shouldRetryStreamEarlyEof only retries
 * STREAM_EARLY_EOF / empty_response.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { ensureStreamReadiness } from "../../open-sse/utils/streamReadiness.ts";
import { shouldRetryStreamEarlyEof } from "../../src/sse/handlers/chatHelpers.ts";

const log = { info() {}, warn() {}, debug() {}, error() {} };

const REPLAY_MESSAGE =
  "The encrypted content for item rs_1a2b3c could not be verified. Reason: Encrypted content could not be decrypted or parsed.";

function sseResponse(frames: string[]): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const frame of frames) controller.enqueue(encoder.encode(frame));
      controller.close();
    },
  });
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("a replayed-reasoning rejection surfaces 400 invalid_encrypted_content, not STREAM_EARLY_EOF", async () => {
  const result = await ensureStreamReadiness(
    sseResponse([`data: ${JSON.stringify({ error: { message: REPLAY_MESSAGE } })}\n\n`]),
    { timeoutMs: 2_000, provider: "codex", model: "gpt-6.1-sol", log }
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, "invalid_encrypted_content");
  assert.equal(result.type, "invalid_request_error");
  assert.equal(result.response.status, 400);

  const body = (await result.response.json()) as {
    error?: { message?: string; code?: string; type?: string };
  };
  assert.equal(body.error?.code, "invalid_encrypted_content");
  assert.equal(body.error?.type, "invalid_request_error");
  assert.match(body.error?.message ?? "", /encrypted content/i);
  assert.match(body.error?.message ?? "", /could not be verified/i);
});

test("an unrelated diagnostic keeps the STREAM_EARLY_EOF 502 classification", async () => {
  const result = await ensureStreamReadiness(
    sseResponse([
      `data: ${JSON.stringify({ error: { message: "upstream exploded mid-flight" } })}\n\n`,
    ]),
    { timeoutMs: 2_000, provider: "codex", model: "gpt-6.1-sol", log }
  );

  assert.equal(result.ok, false);
  assert.equal(result.code, "STREAM_EARLY_EOF");
  assert.equal(result.response.status, 502);
});

test("a content-less close with no diagnostic keeps STREAM_EARLY_EOF", async () => {
  const result = await ensureStreamReadiness(sseResponse([": ping\n\n"]), {
    timeoutMs: 2_000,
    provider: "codex",
    model: "gpt-6.1-sol",
    log,
  });

  assert.equal(result.ok, false);
  assert.equal(result.code, "STREAM_EARLY_EOF");
  assert.equal(result.response.status, 502);
});

test("the deterministic rejection buys no early-EOF retry", () => {
  assert.equal(shouldRetryStreamEarlyEof("invalid_encrypted_content", 0), false);
  // The transient classes keep their bounded retry.
  assert.equal(shouldRetryStreamEarlyEof("STREAM_EARLY_EOF", 0), true);
  assert.equal(shouldRetryStreamEarlyEof("empty_response", 0), true);
});
