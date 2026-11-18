/**
 * Hermetic end-to-end contract test for the Freebuff browser login (#15336 / PR #15343).
 *
 * Drives the REAL production path up to the network boundary: the OAuth route handler
 * (`/api/oauth/freebuff/{device-code,poll}`) -> `pollForToken` -> `createProviderConnection`
 * (real SQLite in a temp DATA_DIR) -> `handleChat` -> `FreebuffExecutor`. Only `fetch` is stubbed.
 *
 * Upstream shapes are the ones the official `freebuff login` flow uses (CodebuffAI/codebuff,
 * cli/src/login/login-flow.ts) as mirrored in src/lib/oauth/providers/freebuff.ts:
 *   POST https://freebuff.com/api/auth/cli/code   { fingerprintId } -> { loginUrl, fingerprintHash, expiresAt }
 *   GET  https://freebuff.com/api/auth/cli/status ?fingerprintId&fingerprintHash&expiresAt
 *        -> 401 while pending, 200 { user: { id, name, email, authToken } } once approved
 * and, for chat, the codebuff.com session / agent-runs / chat-completions calls made by
 * open-sse/executors/freebuff.ts (the PR author's captured flow).
 *
 * A stub proves the code matches these shapes; it cannot prove freebuff.com / codebuff.com
 * still answer this way today.
 */
import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("freebuff-oauth-flow");
const { buildRequest, handleChat, resetStorage, settingsDb } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const { decodeFreebuffLoginState } = await import("../../src/lib/oauth/providers/freebuff.ts");

const CODE_URL = "https://freebuff.com/api/auth/cli/code";
const STATUS_URL = "https://freebuff.com/api/auth/cli/status";
const SESSION_URL = "https://www.codebuff.com/api/v1/freebuff/session";
const RUNS_URL = "https://www.codebuff.com/api/v1/agent-runs";
const COMPLETIONS_URL = "https://www.codebuff.com/api/v1/chat/completions";
const AUTH_TOKEN = "fb-auth-token-from-browser-login";

type Call = { url: string; method: string; headers: Record<string, string>; body: string };
type Handler = (call: Call) => Response | Promise<Response>;

function stubFetch(handler: Handler) {
  const calls: Call[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const request = input instanceof Request ? input : null;
    const headers: Record<string, string> = {};
    new Headers((init.headers as HeadersInit) || request?.headers).forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    const call: Call = {
      url: String(request ? request.url : input),
      method: String(init.method || request?.method || "GET").toUpperCase(),
      headers,
      body: typeof init.body === "string" ? init.body : "",
    };
    calls.push(call);
    return handler(call);
  }) as typeof fetch;
  return calls;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function oauthRequest(action: string, method: "GET" | "POST", body?: unknown) {
  return new Request(`http://localhost:20128/api/oauth/freebuff/${action}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function startLogin() {
  const response = await route.GET(oauthRequest("device-code", "GET"), {
    params: Promise.resolve({ provider: "freebuff", action: "device-code" }),
  });
  return { response, data: await response.json() };
}

async function pollLogin(deviceCode: string) {
  const response = await route.POST(oauthRequest("poll", "POST", { deviceCode }), {
    params: Promise.resolve({ provider: "freebuff", action: "poll" }),
  });
  return { response, data: await response.json() };
}

const freebuffConnections = () => providersDb.getProviderConnections({ provider: "freebuff" });

function futureIso(seconds = 300) {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

/** Upstream double for a login that is approved on the Nth status poll. */
function loginUpstream(approveOnPoll: number, expiresAt = futureIso()) {
  let polls = 0;
  return (call: Call) => {
    if (call.url === CODE_URL) {
      return json({
        loginUrl: "https://freebuff.com/login?auth_code=abc123",
        fingerprintHash: "fh-e2e",
        expiresAt,
      });
    }
    if (call.url.startsWith(STATUS_URL)) {
      polls += 1;
      if (polls < approveOnPoll) return new Response("", { status: 401 });
      return json({
        user: { id: "user-42", name: "Buffy", email: "buffy@example.test", authToken: AUTH_TOKEN },
      });
    }
    throw new Error(`Unexpected external fetch: ${call.url}`);
  };
}

const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;

test.beforeEach(async () => {
  await resetStorage();
  await settingsDb.updateSettings({ requireLogin: false });
  // The route logs caught errors via console.error; keep the TAP output readable.
  console.error = () => {};
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
});

test.after(async () => {
  await harness.cleanup();
});

test("device-code route requests a login URL from freebuff.com and returns the opaque login state", async () => {
  const expiresAt = futureIso(240);
  const calls = stubFetch(loginUpstream(1, expiresAt));

  const { response, data } = await startLogin();

  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, CODE_URL);
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].headers["content-type"], "application/json");
  const sent = JSON.parse(calls[0].body);
  assert.deepEqual(Object.keys(sent), ["fingerprintId"]);
  assert.match(sent.fingerprintId, /^codebuff-cli-[A-Za-z0-9_-]{8}$/);

  assert.equal(data.verification_uri_complete, "https://freebuff.com/login?auth_code=abc123");
  assert.equal(data.verification_uri, data.verification_uri_complete);
  assert.ok(data.expires_in > 200 && data.expires_in <= 240);
  assert.deepEqual(decodeFreebuffLoginState(data.device_code), {
    fingerprintId: sent.fingerprintId,
    fingerprintHash: "fh-e2e",
    expiresAt,
  });
  assert.equal((await freebuffConnections()).length, 0, "no connection before approval");
});

test("device-code route reports an upstream rejection without leaking internals", async () => {
  stubFetch(() => new Response("upstream says no", { status: 503 }));

  const { response, data } = await startLogin();

  assert.equal(response.status, 500);
  assert.match(data.error, /Freebuff login URL request failed \(503\)/);
  assert.ok(!String(data.error).includes("upstream says no"), "upstream body must not be echoed");
  assert.ok(!String(data.error).includes("at /"), "no stack trace in the response");
  assert.equal((await freebuffConnections()).length, 0);
});

test("device-code route survives a network error and a malformed 200 payload", async () => {
  stubFetch(() => {
    throw new TypeError("fetch failed: getaddrinfo ENOTFOUND freebuff.com");
  });
  let result = await startLogin();
  assert.equal(result.response.status, 500);
  assert.ok(!String(result.data.error).includes("at /"), "no stack trace in the response");

  stubFetch(() => json({ loginUrl: "https://freebuff.com/login" }));
  result = await startLogin();
  assert.equal(result.response.status, 500);
  assert.match(result.data.error, /missing required fields/);
  assert.equal((await freebuffConnections()).length, 0);
});

test("poll route: 401 pending -> 429 slow_down -> approval creates an OAuth connection with the token", async () => {
  const expiresAt = futureIso();
  // The main double approves on its 2nd status poll; the 429 poll below uses its own one-off stub.
  const calls = stubFetch(loginUpstream(2, expiresAt));
  const { data: device } = await startLogin();
  const fingerprintId = JSON.parse(calls[0].body).fingerprintId;

  // Poll 1: upstream 401 == "not approved yet".
  const pending = await pollLogin(device.device_code);
  assert.equal(pending.response.status, 200);
  assert.deepEqual(
    { success: pending.data.success, pending: pending.data.pending, error: pending.data.error },
    { success: false, pending: true, error: "authorization_pending" }
  );
  assert.equal((await freebuffConnections()).length, 0, "pending must not create a connection");

  // Poll 2: the status endpoint is rate limited -> client is told to slow down, still no connection.
  const originalHandler = globalThis.fetch;
  globalThis.fetch = (async () => new Response("slow", { status: 429 })) as typeof fetch;
  const slow = await pollLogin(device.device_code);
  assert.equal(slow.data.success, false);
  assert.equal(slow.data.error, "slow_down");
  assert.equal(slow.data.pending, true);
  assert.equal((await freebuffConnections()).length, 0);
  globalThis.fetch = originalHandler;

  // Poll 3 (2nd poll the main upstream sees): approved.
  const approved = await pollLogin(device.device_code);
  assert.equal(approved.data.success, true);
  assert.equal(approved.data.connection.provider, "freebuff");

  // Every status poll carried all three login values as query params, with GET and no body.
  const statusCalls = calls.filter((c) => c.url.startsWith(STATUS_URL));
  assert.equal(statusCalls.length, 2);
  for (const call of statusCalls) {
    const url = new URL(call.url);
    assert.equal(url.origin + url.pathname, STATUS_URL);
    assert.equal(call.method, "GET");
    assert.equal(url.searchParams.get("fingerprintId"), fingerprintId);
    assert.equal(url.searchParams.get("fingerprintHash"), "fh-e2e");
    assert.equal(url.searchParams.get("expiresAt"), expiresAt);
  }

  const connections = await freebuffConnections();
  assert.equal(connections.length, 1);
  const [connection] = connections;
  assert.equal(connection.id, approved.data.connection.id);
  assert.equal(connection.authType, "oauth");
  assert.equal(connection.accessToken, AUTH_TOKEN);
  assert.ok(!connection.refreshToken, "freebuff tokens have no refresh grant");
  assert.ok(!connection.expiresAt, "freebuff tokens have no expiry");
  assert.equal(connection.email, "buffy@example.test");
  assert.equal(connection.providerSpecificData?.userId, "user-42");
  assert.equal(connection.providerSpecificData?.fingerprintId, fingerprintId);
});

test("poll route: a login that is never approved ends as expired_token and creates nothing", async () => {
  // The status endpoint has no explicit "denied" signal: an unapproved login stays 401 until its
  // `expiresAt` passes, which is what the poll maps to expired_token.
  const past = new Date(Date.now() - 1000).toISOString();
  stubFetch(loginUpstream(Number.MAX_SAFE_INTEGER, past));
  const { data: device } = await startLogin();

  const result = await pollLogin(device.device_code);

  assert.equal(result.response.status, 200);
  assert.equal(result.data.success, false);
  assert.equal(result.data.error, "expired_token");
  assert.equal(result.data.pending, false);
  assert.equal((await freebuffConnections()).length, 0);
});

test("poll route: network errors and garbage device codes are handled without a connection", async () => {
  stubFetch(loginUpstream(1));
  const { data: device } = await startLogin();

  stubFetch(() => {
    throw new TypeError("fetch failed: ECONNRESET");
  });
  const network = await pollLogin(device.device_code);
  assert.equal(network.response.status, 500);
  // The route returns the sanitized error detail (release #16559), never a stack trace.
  assert.deepEqual(network.data, { error: "fetch failed: ECONNRESET" });

  const calls = stubFetch(() => json({}));
  const garbage = await pollLogin("not-a-login-state");
  assert.equal(garbage.data.success, false);
  assert.equal(garbage.data.error, "invalid_request");
  assert.equal(calls.length, 0, "a malformed device code must not reach the upstream");

  assert.equal((await freebuffConnections()).length, 0);
});

test("chat through freebuff/<model> uses the browser-login token on every codebuff.com call", async () => {
  // 1) Log in through the real route and persist the connection.
  stubFetch(loginUpstream(1));
  const { data: device } = await startLogin();
  const login = await pollLogin(device.device_code);
  assert.equal(login.data.success, true);

  // 2) One chat request through the real chat pipeline, codebuff.com stubbed.
  const calls = stubFetch((call) => {
    if (call.url === SESSION_URL) return json({ instanceId: "inst-e2e" });
    if (call.url === RUNS_URL) {
      const action = JSON.parse(call.body).action;
      return json(action === "START" ? { runId: "run-e2e" } : {});
    }
    if (call.url === COMPLETIONS_URL) {
      return json({
        id: "chatcmpl-e2e",
        object: "chat.completion",
        created: 1,
        model: "deepseek/deepseek-v4-flash",
        choices: [{ index: 0, message: { role: "assistant", content: "hello from freebuff" } }],
        usage: { prompt_tokens: 3, completion_tokens: 4, total_tokens: 7 },
      });
    }
    throw new Error(`Unexpected external fetch: ${call.url}`);
  });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "freebuff/deepseek/deepseek-v4-flash",
        stream: false,
        messages: [{ role: "user", content: "say hello" }],
      },
    })
  );
  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  assert.equal(response.status, 200);
  assert.equal(payload.choices?.[0]?.message?.content, "hello from freebuff");

  const bearer = `Bearer ${AUTH_TOKEN}`;
  const session = calls.find((c) => c.url === SESSION_URL);
  const start = calls.find((c) => c.url === RUNS_URL && JSON.parse(c.body).action === "START");
  const completion = calls.find((c) => c.url === COMPLETIONS_URL);
  assert.ok(
    session && start && completion,
    "session, agent-run START and completion all dispatched"
  );

  assert.equal(session.method, "POST");
  assert.equal(session.headers.authorization, bearer);
  assert.equal(session.headers["x-freebuff-model"], "deepseek/deepseek-v4-flash");
  assert.equal(start.headers.authorization, bearer);
  assert.equal(JSON.parse(start.body).agentId, "base2-free-deepseek-flash");

  assert.equal(completion.method, "POST");
  assert.equal(completion.headers.authorization, bearer);
  assert.equal(completion.headers["x-freebuff-instance-id"], "inst-e2e");
  assert.equal(completion.headers["x-codebuff-run-id"], "run-e2e");
  const upstreamBody = JSON.parse(completion.body);
  assert.equal(upstreamBody.model, "deepseek/deepseek-v4-flash");
  assert.equal(upstreamBody.codebuff_metadata.freebuff_instance_id, "inst-e2e");
  assert.equal(upstreamBody.codebuff_metadata.cost_mode, "free");

  // The token is only ever sent to the two fixed upstream hosts.
  for (const call of calls) {
    assert.match(call.url, /^https:\/\/www\.codebuff\.com\/api\/v1\//);
    if (call.headers.authorization) assert.equal(call.headers.authorization, bearer);
  }
});

test("a pasted-token (apikey) connection keeps working after the catalog move to OAuth", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "freebuff",
    authType: "apikey",
    name: "freebuff-pasted-token",
    apiKey: "pasted-codebuff-token",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(connection && typeof connection.id === "string");

  const calls = stubFetch((call) => {
    if (call.url === SESSION_URL) return json({ instanceId: "inst-pasted" });
    if (call.url === RUNS_URL) return json({ runId: "run-pasted" });
    if (call.url === COMPLETIONS_URL) {
      return json({
        id: "chatcmpl-pasted",
        object: "chat.completion",
        created: 1,
        model: "deepseek/deepseek-v4-flash",
        choices: [{ index: 0, message: { role: "assistant", content: "pasted ok" } }],
        usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
      });
    }
    throw new Error(`Unexpected external fetch: ${call.url}`);
  });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "freebuff/deepseek/deepseek-v4-flash",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );

  assert.equal(response.status, 200);
  const completion = calls.find((c) => c.url === COMPLETIONS_URL);
  assert.ok(completion);
  assert.equal(completion.headers.authorization, "Bearer pasted-codebuff-token");
  assert.equal((await freebuffConnections()).length, 1, "no duplicate connection is created");
});
