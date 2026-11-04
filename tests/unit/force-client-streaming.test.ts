/**
 *  — auto-convert client stream=false to stream=true.
 *
 * Non-streaming requests on large contexts give the worst "stuck" experience:
 * the client sees zero bytes until the ENTIRE generation is done (minutes for
 * 300k+). This module closes that gap: when enabled, stream=false becomes
 * stream=true so the client gets SSE and sees first bytes immediately.
 *
 * Gate: OMNIROUTE_FORCE_CLIENT_STREAMING (unset=off, 1/true/on=on).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isForceClientStreamingEnabled, maybeForceClientStreaming } = await import(
  "../../open-sse/handlers/chatCore/forceClientStreaming.ts"
);

test(" env gate: unset/junk/0 → off; 1/true/on → on", () => {
  assert.equal(isForceClientStreamingEnabled({}), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "junk" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "0" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }), true);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "true" }), true);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: " ON " }), true);
});

test(" env off: stream=false body is returned untouched", () => {
  const body = { model: "max", stream: false, messages: [] };
  const out = maybeForceClientStreaming(body, {});
  assert.equal(out, body, "same reference — no clone when off");
});

test(" env on: stream=false is patched to stream=true", () => {
  const body = { model: "max", stream: false, messages: [{ role: "user", content: "hi" }] };
  const out = maybeForceClientStreaming(body, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" });
  assert.notEqual(out, body, "new object");
  assert.equal(out.stream, true);
  assert.equal(out.model, "max");
  assert.equal(out.messages.length, 1, "other fields preserved");
});

test(" env on: stream=true and stream=undefined are untouched", () => {
  const already = { model: "max", stream: true, messages: [] };
  assert.equal(maybeForceClientStreaming(already, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }), already);
  const noField = { model: "max", messages: [] };
  assert.equal(maybeForceClientStreaming(noField, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }), noField);
});
