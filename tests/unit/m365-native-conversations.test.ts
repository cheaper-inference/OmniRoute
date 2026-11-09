import test from "node:test";
import assert from "node:assert/strict";
import {
  M365ConversationStore,
  m365ReplyFingerprint,
} from "../../open-sse/executors/m365Protocol/conversations.ts";

// The store decides when a request may continue an existing Copilot conversation (send only
// the new messages) instead of opening a new one with the whole history. Every doubtful case
// must fall back to a fresh conversation: that only costs a thread, never a wrong answer.

const scope = "connection-1|tone|scenario|license|agent|";
const user = (content: string) => ({ role: "user", content });
const assistant = (content: string) => ({ role: "assistant", content });
const ids = { conversationId: "c-1", sessionId: "s-1" };

function store(options = {}) {
  let now = 1_000_000;
  const s = new M365ConversationStore({ now: () => now, ...options });
  return { s, advance: (ms: number) => (now += ms) };
}

test("a request that extends the stored history by our reply continues with only the delta", () => {
  const { s } = store();
  const first = [user("open")];
  assert.equal(s.claim(scope, first), null);
  s.commit(scope, first, ids, m365ReplyFingerprint({ text: "answer one", calls: [] }), 1);

  const second = [user("open"), assistant("answer one"), user("next")];
  const claim = s.claim(scope, second);
  assert.ok(claim);
  assert.deepEqual(claim.ids, ids);
  assert.deepEqual(claim.delta, [user("next")]);
  assert.equal(claim.turns, 1);
});

test("the claim is atomic: an identical concurrent continuation starts fresh", () => {
  const { s } = store();
  const first = [user("open")];
  s.commit(scope, first, ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  const next = [user("open"), assistant("r"), user("x")];
  assert.ok(s.claim(scope, next));
  assert.equal(s.claim(scope, next), null);
});

test("a history edited before the reply does not continue", () => {
  const { s } = store();
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  assert.equal(s.claim(scope, [user("edited"), assistant("r"), user("x")]), null);
});

const withImage = (url: string) => ({
  role: "user",
  content: [
    { type: "text", text: "what is this?" },
    { type: "image_url", image_url: { url } },
  ],
});

test("a history whose earlier image changed does not continue, even with the same text", () => {
  const { s } = store();
  const sent = withImage("https://example.com/one.png");
  s.commit(scope, [sent], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  const edited = withImage("https://example.com/two.png");
  assert.equal(s.claim(scope, [edited, assistant("r"), user("x")]), null);
  assert.ok(s.claim(scope, [sent, assistant("r"), user("x")]));
});

test("an image in either Responses or Chat shape counts, and so does its removal", () => {
  const { s } = store();
  const sent = {
    role: "user",
    content: [{ type: "input_image", image_url: "https://example.com/one.png" }],
  };
  s.commit(scope, [sent], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  assert.equal(s.claim(scope, [{ role: "user", content: [] }, assistant("r"), user("x")]), null);
  assert.ok(s.claim(scope, [sent, assistant("r"), user("x")]));
});

test("text sent as a string or as a text part is the same history", () => {
  const { s } = store();
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  const parts = { role: "user", content: [{ type: "text", text: "open" }] };
  assert.ok(s.claim(scope, [parts, assistant("r"), user("x")]));
});

test("a different reply in the client history does not continue (same opener, other session)", () => {
  const { s } = store();
  s.commit(
    scope,
    [user("open")],
    ids,
    m365ReplyFingerprint({ text: "first session", calls: [] }),
    0
  );
  assert.equal(s.claim(scope, [user("open"), assistant("second session"), user("x")]), null);
});

test("two sessions with the same opener each continue their own conversation", () => {
  const { s } = store();
  const a = { conversationId: "c-a", sessionId: "s-a" };
  const b = { conversationId: "c-b", sessionId: "s-b" };
  s.commit(scope, [user("open")], a, m365ReplyFingerprint({ text: "reply a", calls: [] }), 0);
  s.commit(scope, [user("open")], b, m365ReplyFingerprint({ text: "reply b", calls: [] }), 0);
  assert.deepEqual(s.claim(scope, [user("open"), assistant("reply b"), user("x")])?.ids, b);
  assert.deepEqual(s.claim(scope, [user("open"), assistant("reply a"), user("y")])?.ids, a);
});

test("tool-call replies match on the call ids the client echoes", () => {
  const { s } = store();
  const calls = [{ id: "call_1", name: "lookup", arguments: "{}" }];
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "", calls }), 0);
  const echoed = {
    role: "assistant",
    content: null,
    tool_calls: [{ id: "call_1", type: "function", function: { name: "lookup", arguments: "{}" } }],
  };
  const claim = s.claim(scope, [
    user("open"),
    echoed,
    { role: "tool", tool_call_id: "call_1", content: "ok" },
  ]);
  assert.deepEqual(claim?.delta, [{ role: "tool", tool_call_id: "call_1", content: "ok" }]);
});

test("whitespace differences in an echoed text reply still continue", () => {
  const { s } = store();
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "a  b\n", calls: [] }), 0);
  assert.ok(s.claim(scope, [user("open"), assistant(" a b"), user("x")]));
});

test("another scope (connection, model profile or tool set) never continues", () => {
  const { s } = store();
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  assert.equal(s.claim(`${scope}other`, [user("open"), assistant("r"), user("x")]), null);
});

test("a request with nothing after our reply does not continue", () => {
  const { s } = store();
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  assert.equal(s.claim(scope, [user("open"), assistant("r")]), null);
});

test("idle conversations expire", () => {
  const { s, advance } = store({ idleMs: 1000 });
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 0);
  advance(1001);
  assert.equal(s.claim(scope, [user("open"), assistant("r"), user("x")]), null);
});

test("a conversation near the per-conversation message cap is not continued", () => {
  const { s } = store({ maxTurns: 3 });
  s.commit(scope, [user("open")], ids, m365ReplyFingerprint({ text: "r", calls: [] }), 3);
  assert.equal(s.claim(scope, [user("open"), assistant("r"), user("x")]), null);
});

test("the store is bounded: the least recently used conversation is evicted", () => {
  const { s } = store({ maxEntries: 2 });
  for (const n of ["a", "b", "c"])
    s.commit(scope, [user(n)], ids, m365ReplyFingerprint({ text: n, calls: [] }), 0);
  assert.equal(s.claim(scope, [user("a"), assistant("a"), user("x")]), null);
  assert.ok(s.claim(scope, [user("c"), assistant("c"), user("x")]));
});
