// Phase A — request isolation.
//
// Executors are cached SINGLETONS (`open-sse/executors/registry.ts`), so any
// correlation state kept on the instance is shared by every in-flight turn. A
// single field would let request B's ids overwrite request A's between
// `buildHeaders()` and `transformRequest()`, producing a chat request whose
// headers and body disagree — exactly the incoherence this work removes.
import test from "node:test";
import assert from "node:assert/strict";

import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import { readHarnessMetadata } from "../../open-sse/executors/codebuddy-intl/body.ts";

const creds = { accessToken: "***" };

function bodyFor(text: string) {
  return { model: "glm-5.2", messages: [{ role: "user", content: text }] };
}

/** What the executor actually puts on the wire for one body. */
function wire(exec: CodeBuddyIntlExecutor, body: ReturnType<typeof bodyFor>) {
  const headers = exec.buildHeaders(creds, true, null, "glm-5.2", null, body);
  const out = exec.transformRequest("glm-5.2", body, true, creds) as Record<string, unknown>;
  return { headers, metadata: readHarnessMetadata(out) };
}

test("interleaved requests keep their own correlation ids", () => {
  const exec = new CodeBuddyIntlExecutor();
  const bodyA = bodyFor("first");
  const bodyB = bodyFor("second");

  // Interleave the way two concurrent turns would: A headers, B headers,
  // A body, B body. With instance state, A's body would pick up B's ids.
  const headersA = exec.buildHeaders(creds, true, null, "glm-5.2", null, bodyA);
  const headersB = exec.buildHeaders(creds, true, null, "glm-5.2", null, bodyB);

  const outA = exec.transformRequest("glm-5.2", bodyA, true, creds) as Record<string, unknown>;
  const outB = exec.transformRequest("glm-5.2", bodyB, true, creds) as Record<string, unknown>;

  const metaA = readHarnessMetadata(outA);
  const metaB = readHarnessMetadata(outB);

  assert.ok(metaA);
  assert.ok(metaB);

  // Each body must describe the request its own headers described.
  assert.equal(metaA.conversationId, headersA["X-Conversation-ID"]);
  assert.equal(metaB.conversationId, headersB["X-Conversation-ID"]);
  assert.equal(metaA.conversationRequestId, headersA["X-Conversation-Request-ID"]);
  assert.equal(metaB.conversationRequestId, headersB["X-Conversation-Request-ID"]);
  assert.equal(metaA.messageId, headersA["X-Conversation-Message-ID"]);
  assert.equal(metaB.messageId, headersB["X-Conversation-Message-ID"]);
  assert.equal(metaA.traceId, headersA["X-Trace-ID"]);
  assert.equal(metaB.traceId, headersB["X-Trace-ID"]);

  // And the two requests must not share identifiers.
  assert.notEqual(headersA["X-Conversation-ID"], headersB["X-Conversation-ID"]);
  assert.notEqual(headersA["X-Conversation-Request-ID"], headersB["X-Conversation-Request-ID"]);
  assert.notEqual(headersA["X-Conversation-Message-ID"], headersB["X-Conversation-Message-ID"]);
  assert.notEqual(headersA["X-Trace-ID"], headersB["X-Trace-ID"]);
});

test("headers and body of one attempt describe the same operation", () => {
  const exec = new CodeBuddyIntlExecutor();
  const body = bodyFor("one turn");

  const attempt = wire(exec, body);

  assert.ok(attempt.metadata);
  assert.equal(attempt.metadata.conversationId, attempt.headers["X-Conversation-ID"]);
  assert.equal(
    attempt.metadata.conversationRequestId,
    attempt.headers["X-Conversation-Request-ID"]
  );
  assert.equal(attempt.metadata.messageId, attempt.headers["X-Conversation-Message-ID"]);
  assert.equal(attempt.metadata.traceId, attempt.headers["X-Trace-ID"]);
});

test("a second dispatch of the same body is a new step, not the same request", () => {
  const exec = new CodeBuddyIntlExecutor();
  const body = bodyFor("one turn");

  const first = wire(exec, body);
  const second = wire(exec, body);

  // Retries are distinct upstream dispatches: they keep the conversation but
  // must not replay the previous message/request identity.
  assert.notEqual(
    first.headers["X-Conversation-Message-ID"],
    second.headers["X-Conversation-Message-ID"]
  );
  assert.notEqual(
    first.headers["X-Conversation-Request-ID"],
    second.headers["X-Conversation-Request-ID"]
  );
  // Each attempt is still internally coherent.
  assert.equal(second.metadata?.messageId, second.headers["X-Conversation-Message-ID"]);
});

test("a fresh body gets fresh identifiers on a reused executor", () => {
  const exec = new CodeBuddyIntlExecutor();

  const first = wire(exec, bodyFor("a"));
  const second = wire(exec, bodyFor("b"));

  assert.notEqual(first.headers["X-Conversation-ID"], second.headers["X-Conversation-ID"]);
});

test("a request that never got its correlation ids reports nothing", async () => {
  const exec = new CodeBuddyIntlExecutor();
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    calls.push(String(url));
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;

  try {
    // Force the header build to fail before the operation is recorded: the
    // request never had correlation ids, so reporting it would invent a
    // conversation that the gateway never saw.
    exec.buildHeaders = () => {
      throw new Error("header build failed");
    };

    await assert.rejects(() =>
      exec.execute({
        model: "glm-5.2",
        body: { model: "glm-5.2", messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: creds,
      })
    );

    await new Promise((resolve) => setImmediate(resolve));
    assert.deepEqual(calls, []);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
