/**
 * Auto-convert client stream=false to stream=true.
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

const { applyForceClientStreaming, isForceClientStreamingEnabled, maybeForceClientStreaming } =
  await import("../../open-sse/handlers/chatCore/forceClientStreaming.ts");

test("env gate: unset/junk/0 → off; 1/true/on → on", () => {
  assert.equal(isForceClientStreamingEnabled({}), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "junk" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "0" }), false);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }), true);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: "true" }), true);
  assert.equal(isForceClientStreamingEnabled({ OMNIROUTE_FORCE_CLIENT_STREAMING: " ON " }), true);
});

test("env off: stream=false body is returned untouched", () => {
  const body = { model: "max", stream: false, messages: [] };
  const out = maybeForceClientStreaming(body, {});
  assert.equal(out, body, "same reference — no clone when off");
});

test("env on: stream=false is patched to stream=true", () => {
  const body = { model: "max", stream: false, messages: [{ role: "user", content: "hi" }] };
  const out = maybeForceClientStreaming(body, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" });
  assert.notEqual(out, body, "new object");
  assert.equal(out.stream, true);
  assert.equal(out.model, "max");
  assert.equal(out.messages.length, 1, "other fields preserved");
});

test("env on: stream=true and stream=undefined are untouched", () => {
  const already = { model: "max", stream: true, messages: [] };
  assert.equal(
    maybeForceClientStreaming(already, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }),
    already
  );
  const noField = { model: "max", messages: [] };
  assert.equal(
    maybeForceClientStreaming(noField, { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" }),
    noField
  );
});

const ON = { OMNIROUTE_FORCE_CLIENT_STREAMING: "1" };
const nonStreaming = () => ({ model: "max", stream: false, messages: [] });

test("request gate: an Accept header that admits SSE is converted", () => {
  for (const acceptHeader of ["*/*", "text/event-stream", "text/*", "TEXT/EVENT-STREAM"]) {
    const out = applyForceClientStreaming(nonStreaming(), { acceptHeader, env: ON });
    assert.equal(out.stream, true, `Accept: ${acceptHeader}`);
  }
});

test("request gate: a client that lists JSON keeps its JSON response (#5305 signature)", () => {
  for (const acceptHeader of ["application/json", "application/json, text/event-stream"]) {
    const body = nonStreaming();
    assert.equal(applyForceClientStreaming(body, { acceptHeader, env: ON }), body, acceptHeader);
  }
});

test("request gate: no Accept header stays JSON (in-process dispatchers send none)", () => {
  for (const acceptHeader of ["", null, undefined, "text/plain"]) {
    const body = nonStreaming();
    assert.equal(applyForceClientStreaming(body, { acceptHeader, env: ON }), body);
  }
});

test("request gate: an idempotency key stays JSON, only that path stores a replay", () => {
  const body = nonStreaming();
  const out = applyForceClientStreaming(body, {
    acceptHeader: "*/*",
    idempotencyKey: "retry-1",
    env: ON,
  });
  assert.equal(out, body);
});

test("request gate: an explicit non-stream alias still wins", () => {
  for (const alias of ["non_stream", "disable_stream", "disable_streaming"]) {
    const body = { ...nonStreaming(), [alias]: true };
    assert.equal(applyForceClientStreaming(body, { acceptHeader: "*/*", env: ON }), body, alias);
  }
  const streamingFalse = { ...nonStreaming(), streaming: false };
  assert.equal(
    applyForceClientStreaming(streamingFalse, { acceptHeader: "*/*", env: ON }),
    streamingFalse
  );
});

test("request gate: a key in JSON stream-default mode stays JSON", () => {
  const body = nonStreaming();
  const out = applyForceClientStreaming(body, {
    acceptHeader: "*/*",
    streamDefaultMode: "json",
    env: ON,
  });
  assert.equal(out, body);
  assert.equal(
    applyForceClientStreaming(nonStreaming(), {
      acceptHeader: "*/*",
      streamDefaultMode: "legacy",
      env: ON,
    }).stream,
    true
  );
});

test("request gate: off by default, and non-object bodies pass through", () => {
  const body = nonStreaming();
  assert.equal(applyForceClientStreaming(body, { acceptHeader: "*/*", env: {} }), body);
  assert.equal(applyForceClientStreaming(null, { acceptHeader: "*/*", env: ON }), null);
  const list = [nonStreaming()];
  assert.equal(applyForceClientStreaming(list, { acceptHeader: "*/*", env: ON }), list);
});

test("HTTP self-loops that parse one JSON object declare Accept: application/json", async () => {
  const { readFileSync } = await import("node:fs");
  const callers = [
    "open-sse/mcp-server/tools/inferenceTools.ts",
    "open-sse/mcp-server/tools/advancedTools.ts",
    "src/lib/a2a/skills/smartRouting.ts",
    "src/lib/guardrails/visionBridgeHelpers.ts",
    "src/app/api/playground/improve-prompt/route.ts",
    "src/domain/assessment/assessor.ts",
    "src/app/(dashboard)/dashboard/playground/components/tabs/BuildTab.tsx",
  ];
  for (const file of callers) {
    assert.match(readFileSync(file, "utf8"), /Accept: "application\/json"/, file);
  }
});
