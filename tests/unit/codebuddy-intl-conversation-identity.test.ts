// The intl gateway correlates turns by X-Conversation-ID. Only the caller's own
// identity may join turns: the ids it sends itself, or an explicit session key
// (session headers or body session fields), scoped to the upstream account.
// Two unrelated chats that merely open with the same user message must not
// share a conversation id.
import test from "node:test";
import assert from "node:assert/strict";
import {
  CodeBuddyIntlExecutor,
  withConversationHeaders,
} from "../../open-sse/executors/codebuddy-intl.ts";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function build(
  connectionId: string | undefined,
  body: unknown,
  clientHeaders: Record<string, string> | null = null
): Record<string, string> {
  const exec = new CodeBuddyIntlExecutor();
  return exec.buildHeaders(
    { accessToken: "***", connectionId },
    true,
    clientHeaders,
    "m",
    null,
    body
  );
}

test("caller-supplied X-Conversation-* ids are forwarded", async (t) => {
  const body = { messages: [{ role: "user", content: "hi" }] };

  await t.test("forwards a lowercase client conversation id verbatim", () => {
    const h = build("conn-a", body, { "x-conversation-id": "abc" });
    assert.equal(h["X-Conversation-ID"], "abc");
  });

  await t.test("forwards client request and message ids", () => {
    const h = build("conn-a", body, {
      "X-Conversation-Request-ID": "req-1",
      "x-conversation-message-id": "msg-1",
    });
    assert.equal(h["X-Conversation-Request-ID"], "req-1");
    assert.equal(h["X-Conversation-Message-ID"], "msg-1");
    assert.equal(h["X-Request-ID"], "msg-1");
    assert.match(h["X-Conversation-ID"], UUID_RE);
  });

  await t.test("blank client values count as absent", () => {
    const h = build("conn-a", body, {
      "x-conversation-id": "   ",
      "x-conversation-request-id": "",
      "x-conversation-message-id": " ",
    });
    assert.match(h["X-Conversation-ID"], UUID_RE);
    assert.match(h["X-Conversation-Request-ID"], UUID_RE);
    assert.match(h["X-Conversation-Message-ID"], UUID_RE);
  });

  await t.test("accepts a fetch Headers instance as the client header source", () => {
    const out = withConversationHeaders({} as Record<string, string>, body, {
      clientHeaders: new Headers({ "x-conversation-id": "from-headers" }),
    });
    assert.equal(out["X-Conversation-ID"], "from-headers");
    assert.match(out["X-Conversation-Request-ID"], UUID_RE);
  });

  await t.test("does not duplicate the header under a second casing", () => {
    const h = build("conn-a", body, { "x-conversation-id": "abc" });
    const keys = Object.keys(h).filter((k) => k.toLowerCase() === "x-conversation-id");
    assert.equal(keys.length, 1);
  });
});

test("unrelated chats are not joined by their opening message", async (t) => {
  await t.test("same first user message without a session key gets different ids", () => {
    const body = { messages: [{ role: "user", content: "same opening message" }] };
    const a = build("conn-a", body);
    const b = build("conn-a", body);
    assert.notEqual(a["X-Conversation-ID"], b["X-Conversation-ID"]);
    assert.match(a["X-Conversation-ID"], UUID_RE);
  });

  await t.test("typed-block user content is not a conversation key either", () => {
    const body = { messages: [{ role: "user", content: [{ type: "text", text: "typed" }] }] };
    assert.notEqual(
      build("conn-a", body)["X-Conversation-ID"],
      build("conn-a", body)["X-Conversation-ID"]
    );
  });
});

test("explicit client session identity joins turns, scoped by connection", async (t) => {
  await t.test("the same x-session-id on the same connection is stable across turns", () => {
    const a = build(
      "conn-a",
      { messages: [{ role: "user", content: "one" }] },
      {
        "x-session-id": "sess-1",
      }
    );
    const b = build(
      "conn-a",
      { messages: [{ role: "user", content: "two" }] },
      {
        "X-Session-ID": "sess-1",
      }
    );
    assert.equal(a["X-Conversation-ID"], b["X-Conversation-ID"]);
    assert.notEqual(a["X-Conversation-Request-ID"], b["X-Conversation-Request-ID"]);
  });

  await t.test("the same x-session-id on a different connection gets a different id", () => {
    const body = { messages: [{ role: "user", content: "hi" }] };
    const a = build("conn-a", body, { "x-session-id": "sess-1" });
    const b = build("conn-b", body, { "x-session-id": "sess-1" });
    assert.notEqual(a["X-Conversation-ID"], b["X-Conversation-ID"]);
  });

  await t.test("Claude Code and opencode session headers are honoured", () => {
    const body = { messages: [{ role: "user", content: "hi" }] };
    for (const name of ["x-claude-code-session-id", "x-opencode-session", "session_id"]) {
      const a = build("conn-a", body, { [name]: "sess-2" });
      const b = build("conn-a", { messages: [] }, { [name]: "sess-2" });
      assert.equal(a["X-Conversation-ID"], b["X-Conversation-ID"], name);
    }
  });

  await t.test("a body session id is scoped by connection too", () => {
    const body = { session_id: "sess-3", messages: [{ role: "user", content: "hi" }] };
    assert.equal(
      build("conn-a", body)["X-Conversation-ID"],
      build("conn-a", body)["X-Conversation-ID"]
    );
    assert.notEqual(
      build("conn-a", body)["X-Conversation-ID"],
      build("conn-b", body)["X-Conversation-ID"]
    );
  });
});
