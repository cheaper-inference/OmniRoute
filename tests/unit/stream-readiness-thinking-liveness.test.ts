import test from "node:test";
import assert from "node:assert/strict";

import {
  createStreamContentWatcher,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

// Frames follow the production reader shape (open-sse/handlers/sseParser.ts):
// `event: content_block_delta` + `data:` JSON with `delta.type` /
// `delta.thinking` / `delta.signature` set by the upstream.
function wireDelta(delta: unknown): string {
  return [
    "event: content_block_delta",
    `data: ${JSON.stringify({ type: "content_block_delta", index: 1, delta })}`,
    "",
    "",
  ].join("\n");
}

test("thinking-phase signature-only delta counts as stream liveness", () => {
  const frame = wireDelta({ type: "signature_delta", signature: "GkDPeXJveXQ" });
  assert.equal(hasUsefulStreamContent(frame), true);
});

test("thinking-phase text delta still counts as stream liveness", () => {
  const frame = wireDelta({ type: "thinking_delta", thinking: "working through the answer" });
  assert.equal(hasUsefulStreamContent(frame), true);
});

test("thinking-phase encrypted payload carried by thinking counts as stream liveness", () => {
  const frame = wireDelta({ type: "thinking_delta", thinking: "Eu0e64aX2vKq9mZwT4sYw" });
  assert.equal(hasUsefulStreamContent(frame), true);
});

test("idle pings and completion markers carry no stream liveness", () => {
  assert.equal(hasUsefulStreamContent("event: ping\ndata: {}\n\n"), false);
  assert.equal(hasUsefulStreamContent("data: [DONE]\n\n"), false);
  assert.equal(hasUsefulStreamContent("data: \n\n"), false);
  assert.equal(hasUsefulStreamContent(": heartbeat\n\n"), false);
});

test("empty signature bootstrap carries no stream liveness", () => {
  const frame = wireDelta({ type: "signature_delta", signature: "" });
  assert.equal(hasUsefulStreamContent(frame), false);
});

test("typed delta without payload carries no stream liveness", () => {
  const frame = wireDelta({ type: "thinking_delta" });
  assert.equal(hasUsefulStreamContent(frame), false);
});

test("empty data payload carries no stream liveness", () => {
  assert.equal(hasUsefulStreamContent("data: \n\n"), false);
  assert.equal(hasUsefulStreamContent("data: [DONE]\n\n"), false);
});

test("non-json payload stays live through the pre-existing fallback", () => {
  // Pre-existing catch branch (streamReadiness.ts: hasUsefulStreamContent):
  // a non-empty payload that is not JSON counts as content. Out of scope,
  // documented here so no future change silently flips it.
  assert.equal(hasUsefulStreamContent("data: {truncated-json-GkD\n\n"), true);
});

test("content watcher observes thinking-phase deltas as liveness", () => {
  const watcher = createStreamContentWatcher();
  try {
    watcher.note(wireDelta({ type: "signature_delta", signature: "GkDPeXJveXQ" }));
    watcher.note(wireDelta({ type: "signature_delta", signature: "Q2hySHkzV3c" }));
    watcher.finish();
    assert.equal(watcher.sawContent(), true);
  } finally {
    watcher.finish();
  }
});

test("content watcher stays silent on an idle stream", () => {
  const watcher = createStreamContentWatcher();
  try {
    watcher.note("event: ping\ndata: {}\n\n");
    watcher.note(wireDelta({ type: "signature_delta", signature: "" }));
    watcher.note(wireDelta({ type: "thinking_delta" }));
    watcher.finish();
    assert.equal(watcher.sawContent(), false);
  } finally {
    watcher.finish();
  }
});

// #16438: the opt-in content probe (EMPTY_STREAM_SIBLING_RECOVERY_ENABLED) reads the
// same frames with stricter semantics. The default watcher above stays unchanged.
test("content probe: a signature-only delta is reasoning progress, not usable output", () => {
  const frame = wireDelta({ type: "signature_delta", signature: "GkDPeXJveXQ" });
  assert.equal(hasUsefulStreamContent(frame, { contentProbe: true }), false);
  const watcher = createStreamContentWatcher({ contentProbe: true });
  watcher.note(frame);
  watcher.finish();
  assert.equal(watcher.sawContent(), false);
  assert.equal(watcher.reasoningProgress(), 1);
});

test("content probe: ordinary thinking text still counts as output", () => {
  const frame = wireDelta({ type: "thinking_delta", thinking: "working through the answer" });
  assert.equal(hasUsefulStreamContent(frame, { contentProbe: true }), true);
});

test("content probe: a Responses function_call item start commits before its arguments", () => {
  const frame = [
    "event: response.output_item.added",
    `data: ${JSON.stringify({
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "c", arguments: "" },
    })}`,
    "",
    "",
  ].join("\n");
  assert.equal(hasUsefulStreamContent(frame, { contentProbe: true }), true);
  assert.equal(hasUsefulStreamContent(frame), false, "default semantics stay as released");
});

for (const reason of ["pause_turn", "model_context_window_exceeded"]) {
  test(`content probe: stop_reason ${reason} is a legitimate empty terminal only in the probe`, () => {
    const frame = [
      "event: message_delta",
      `data: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: reason } })}`,
      "",
      "",
    ].join("\n");
    const probe = createStreamContentWatcher({ contentProbe: true });
    probe.note(frame);
    probe.finish();
    assert.equal(probe.sawLegitEmptyTerminal(), true);
    const released = createStreamContentWatcher();
    released.note(frame);
    released.finish();
    assert.equal(released.sawLegitEmptyTerminal(), false, "default set stays as released");
  });
}
