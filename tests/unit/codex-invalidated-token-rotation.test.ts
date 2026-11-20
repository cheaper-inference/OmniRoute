// A Codex 401 that wraps a dead session in the generic `invalid_request_error` type
// (`token_invalidated` after a revoked or closed session, `token_revoked`, or no code at
// all) was classified as a request-scoped failure. shouldSkipConnDisable() then skipped
// markAccountUnavailable: the account was neither excluded for the current request nor
// cooled down for the next one, so every request kept landing on it and returned its 401
// instead of rotating to a healthy sibling. #18842 only allowlisted a few auth codes; once the
// upstream status is known, the generic type no longer outranks a 401.
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("codex-invalidated-token-rotation");
const providers = await import("../../src/lib/db/providers.ts");
const { isComboRequestScopedFailure, isRequestScopedUpstreamFailure, shouldSkipConnDisable } =
  await import("../../open-sse/services/combo/comboPredicates.ts");
const originalFetch = globalThis.fetch;

const DEAD_SESSION_401: Record<string, { message: string; code: string | null }> = {
  token_invalidated: {
    message: "Your authentication token has been invalidated. Please try signing in again.",
    code: "token_invalidated",
  },
  token_revoked: {
    message: "Encountered invalidated oauth token for user, failing request",
    code: "token_revoked",
  },
  no_code: { message: "Your authentication token is not from a valid issuer.", code: null },
};

type Behavior = "ok" | "dead_session" | "usage_limit";

function deadSession(code: string | null = "token_invalidated") {
  const { message } = Object.values(DEAD_SESSION_401).find((v) => v.code === code) ?? {
    message: "Unauthorized",
  };
  return Response.json(
    { error: { message, type: "invalid_request_error", code, param: null }, status: 401 },
    { status: 401 }
  );
}

function usageLimit() {
  return Response.json(
    {
      error: {
        type: "usage_limit_reached",
        message: "The usage limit has been reached",
        plan_type: "plus",
        resets_at: Math.floor(Date.now() / 1000) + 3600,
      },
    },
    { status: 429 }
  );
}

function okJson() {
  return Response.json({
    id: "resp_ok",
    object: "response",
    status: "completed",
    model: "gpt-5.5",
    output: [
      {
        id: "msg_ok",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "ok", annotations: [] }],
      },
    ],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  });
}

function okStream() {
  return new Response(
    [
      'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_ok","model":"gpt-5.5"}}\n\n',
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","delta":"ok"}\n\n',
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_ok","model":"gpt-5.5","status":"completed","output":[],"usage":{"input_tokens":4,"output_tokens":2,"total_tokens":6}}}\n\n',
    ].join(""),
    { headers: { "Content-Type": "text/event-stream" } }
  );
}

async function seedCodexAccount(name: string, priority: number) {
  // The access token is nowhere near its own expiry: the upstream revoked the session.
  const expiresAt = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: `${name}@example.invalid`,
    priority,
    accessToken: `at-${name}`,
    refreshToken: `rt-${name}`,
    tokenExpiresAt: expiresAt,
    expiresAt,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      workspaceId: `ws-${name}`,
      autoFetchModels: false,
      chatgptPlanType: "plus",
    },
  });
  assert.ok(connection?.id, `failed to seed codex account ${name}`);
  return String(connection.id);
}

/** Offline upstream: records the account (bearer token) of every Codex dispatch. */
function mockCodex(accounts: Record<string, Behavior>, opts: { stream?: boolean } = {}) {
  const dispatches: string[] = [];
  globalThis.fetch = async (url, init) => {
    const target = String(url);
    if (target.includes("oauth/token")) {
      // The refresh token died with the session.
      return Response.json(
        { error: "invalid_grant", error_description: "refresh token revoked" },
        { status: 400 }
      );
    }
    if (target.includes("/codex/responses")) {
      const bearer = new Headers(init?.headers).get("authorization") ?? "";
      const name = bearer.replace(/^Bearer\s+at-/, "");
      dispatches.push(name);
      const behavior = accounts[name] ?? "ok";
      if (behavior === "dead_session") return deadSession();
      if (behavior === "usage_limit") return usageLimit();
      return opts.stream ? okStream() : okJson();
    }
    return new Response("not found", { status: 404 });
  };
  return dispatches;
}

async function sendResponses() {
  const res = await harness.handleChat(
    harness.buildRequest({
      url: "http://localhost/v1/responses",
      body: { model: "codex/gpt-5.5", input: "hi", stream: false },
    })
  );
  return { status: res.status, body: await res.text() };
}

async function cooldownLeftMs(connectionId: string) {
  const connection = await providers.getProviderConnectionById(connectionId);
  return Date.parse(String(connection?.rateLimitedUntil ?? "")) - Date.now();
}

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    blockedProviders: ["aihorde"],
  });
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await harness.callLogsDb.waitForCallLogSaves(10_000);
});
test.after(async () => {
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

test("an upstream 401 is account-scoped whatever code its invalid_request_error carries", () => {
  for (const [label, { message, code }] of Object.entries(DEAD_SESSION_401)) {
    const error = { code, type: "invalid_request_error" };
    assert.equal(isRequestScopedUpstreamFailure({ ...error, status: 401 }), false, label);
    assert.equal(
      shouldSkipConnDisable(
        { status: 401, errorCode: code, errorType: "invalid_request_error", error: message },
        true,
        false,
        "codex"
      ),
      false,
      `${label}: the dead account must reach markAccountUnavailable`
    );
    assert.equal(
      isComboRequestScopedFailure(new Response(null, { status: 401 }), message, error),
      false,
      `${label}: combo routing must treat it as a credential failure`
    );
  }
});

test("the 401 carve-out keeps the per-key guard and genuine request-shape failures", () => {
  const invalidated = {
    status: 401,
    errorCode: "token_invalidated",
    errorType: "invalid_request_error",
    error: DEAD_SESSION_401.token_invalidated.message,
  };
  assert.equal(
    shouldSkipConnDisable(invalidated, true, true, "codex"),
    true,
    "a connection with extra keys still handles a 401 per key"
  );
  const malformed = { code: "invalid_request", type: "invalid_request_error", status: 400 };
  assert.equal(isRequestScopedUpstreamFailure(malformed), true, "a malformed 400 stays scoped");
  assert.equal(
    isRequestScopedUpstreamFailure({
      code: "context_length_exceeded",
      type: "invalid_request_error",
      status: 401,
    }),
    true,
    "an explicit request-scoped code keeps its meaning on a 401"
  );
  assert.equal(
    isRequestScopedUpstreamFailure({ code: "token_invalidated", type: "invalid_request_error" }),
    true,
    "without a status the generic type keeps its old meaning"
  );
});

test("a revoked Codex session rotates to the next account and is skipped afterwards", async () => {
  const dead = await seedCodexAccount("a", 1);
  await seedCodexAccount("b", 2);

  const first = mockCodex({ a: "dead_session", b: "ok" });
  const res = await sendResponses();
  assert.equal(res.status, 200, `first request must rotate (dispatches=${first}): ${res.body}`);
  assert.deepEqual(first, ["a", "b"]);
  assert.ok((await cooldownLeftMs(dead)) > 0, "the dead account must be cooled down");

  const second = mockCodex({ a: "dead_session", b: "ok" });
  const again = await sendResponses();
  assert.equal(again.status, 200);
  assert.deepEqual(second, ["b"], "the next request must not land on the dead account");
});

test("exhausted credit on one account and a dead session on the next still reach a third", async () => {
  await seedCodexAccount("a", 1);
  const dead = await seedCodexAccount("b", 2);
  await seedCodexAccount("c", 3);

  const first = mockCodex({ a: "usage_limit", b: "dead_session", c: "ok" });
  const res = await sendResponses();
  assert.equal(res.status, 200, `dispatches=${first}: ${res.body}`);
  assert.equal(first[0], "a");
  assert.equal(first.at(-1), "c", "the request must end on the healthy account");
  assert.equal(first.filter((name) => name === "a").length, 1, "no retry on the drained account");
  assert.ok((await cooldownLeftMs(dead)) > 0, "the dead session must be cooled down");

  const second = mockCodex({ a: "usage_limit", b: "dead_session", c: "ok" });
  const again = await sendResponses();
  assert.equal(again.status, 200);
  assert.deepEqual(second, ["c"], "neither the drained nor the dead account is retried");
});

test("a streaming chat-completions client also rotates past a revoked session", async () => {
  await seedCodexAccount("a", 1);
  await seedCodexAccount("b", 2);

  const dispatches = mockCodex({ a: "dead_session", b: "ok" }, { stream: true });
  const res = await harness.handleChat(
    harness.buildRequest({
      body: {
        model: "codex/gpt-5.5",
        messages: [{ role: "user", content: "hi" }],
        stream: true,
      },
    })
  );
  const body = await res.text();
  assert.equal(res.status, 200, `dispatches=${dispatches}: ${body.slice(0, 300)}`);
  assert.deepEqual(dispatches, ["a", "b"]);
  assert.match(body, /ok/);
});
