// CodeBuddy CN gets the same X-Conversation-* family as intl: the official client sends it on
// both gateways. A caller-supplied id is kept; the conversation id is stable per session.
import test from "node:test";
import assert from "node:assert/strict";
import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const creds = { accessToken: "token" };
const body = { session_id: "sess-cn", messages: [{ role: "user", content: "hi" }] };

test("CodeBuddyCnExecutor sends the X-Conversation-* family", () => {
  const h = new CodeBuddyCnExecutor().buildHeaders(creds, true, null, "glm-5.2", undefined, body);
  assert.match(h["X-Conversation-ID"], UUID_RE);
  assert.match(h["X-Conversation-Request-ID"], UUID_RE);
  assert.match(h["X-Conversation-Message-ID"], UUID_RE);
  assert.equal(h["X-Request-ID"], h["X-Conversation-Message-ID"]);
});

test("CodeBuddyCnExecutor keeps the conversation id per session and the rest fresh", () => {
  const exec = new CodeBuddyCnExecutor();
  const a = exec.buildHeaders(creds, true, null, "m", undefined, body);
  const b = exec.buildHeaders(creds, true, null, "m", undefined, body);
  assert.equal(a["X-Conversation-ID"], b["X-Conversation-ID"]);
  assert.notEqual(a["X-Conversation-Message-ID"], b["X-Conversation-Message-ID"]);
});

test("CodeBuddyCnExecutor keeps the existing auth and fingerprint headers", () => {
  const h = new CodeBuddyCnExecutor().buildHeaders(creds, true, null, "m", undefined, body);
  assert.equal(h.Authorization, "Bearer token");
  assert.equal(h.Accept, "text/event-stream");
});
