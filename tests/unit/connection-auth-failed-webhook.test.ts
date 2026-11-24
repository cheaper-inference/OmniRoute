// `connection.auth_failed`: a per-account webhook for auth failures.
//
// Before this event an operator running a pool of OAuth accounts had no signal when one account's
// login was revoked: the router moved the request to another account, the client got a 200, and
// the dead account only showed up in a later manual sweep. `request.failed` fires only when the
// whole request fails (and names no account); `provider.exhausted` only when every account cools.
//
// These tests drive the real request path (handleChat → markAccountUnavailable) and the real
// connection write (updateProviderConnection), and capture what reaches the webhook sink.
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("connection-auth-failed-webhook");
const providers = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const events = await import("../../src/lib/webhooks/eventDescriptions.ts");
const hook = await import("../../src/lib/webhooks/connectionAuthFailed.ts");
const { buildDiscordPayload } = await import("../../src/lib/webhooks/integrations/discord.ts");
const { buildSlackPayload } = await import("../../src/lib/webhooks/integrations/slack.ts");

const originalFetch = globalThis.fetch;
type Hit = { event: string; data: Record<string, unknown> };
let hits: Hit[] = [];

const SECRET_ACCESS = "synthetic-access-SECRET";
const SECRET_REFRESH = "synthetic-refresh-SECRET";
const UPSTREAM_BODY_MARKER = "upstream-body-marker-SHOULD-NOT-LEAK";

function success() {
  return Response.json({
    id: "resp_ok",
    object: "response",
    status: "completed",
    model: "gpt-5.6-sol",
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

function upstream401() {
  return Response.json(
    { error: { message: `Your authentication token is invalid ${UPSTREAM_BODY_MARKER}` } },
    { status: 401 }
  );
}

async function seedCodex(name: string, overrides: Record<string, unknown> = {}) {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name,
    email: `${name}@example.invalid`,
    accessToken: SECRET_ACCESS,
    refreshToken: `${SECRET_REFRESH}-${name}-${crypto.randomUUID()}`,
    // Expired a minute ago: a following 401 is not shielded by a "still-valid token" guard.
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    tokenExpiresAt: new Date(Date.now() - 60_000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { workspaceId: `ws-${name}`, autoFetchModels: false },
    ...overrides,
  });
}

function chat(id?: string) {
  return harness.handleChat(
    harness.buildRequest({
      url: "http://localhost/v1/responses",
      headers: id ? { "x-omniroute-connection": id } : {},
      body: { model: "codex/gpt-5.6-sol", input: "synthetic", stream: false },
    })
  );
}

/**
 * Offline upstream. `generation(n)` answers the n-th model call; `refresh` answers the token
 * endpoint (null = the refresh endpoint must not be called).
 */
function mockUpstream(
  generation: (attempt: number) => Response,
  refresh: (() => Response) | null
): { generations: number; refreshes: number } {
  const counts = { generations: 0, refreshes: 0 };
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.includes("/oauth/token")) {
      counts.refreshes++;
      assert.ok(refresh, `unexpected token refresh call: ${url}`);
      return refresh();
    }
    assert.ok(url.includes("/codex/responses"), `unexpected upstream call: ${url}`);
    counts.generations++;
    return generation(counts.generations);
  };
  return counts;
}

function authHits() {
  return hits.filter((hit) => hit.event === "connection.auth_failed");
}

function assertNoSecrets(hit: Hit) {
  const text = JSON.stringify(hit);
  assert.equal(text.includes("SECRET"), false, `payload leaks a credential: ${text}`);
  assert.equal(text.includes(UPSTREAM_BODY_MARKER), false, `payload leaks the body: ${text}`);
  assert.equal(text.includes("@example.invalid"), false, `payload leaks a raw email: ${text}`);
}

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    hideAutoCombos: true,
    fallbackStrategy: "fill-first",
  });
  hits = [];
  hook.setConnectionAuthFailedSinkForTesting((event, data) => hits.push({ event, data }));
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await harness.callLogsDb.waitForCallLogSaves(10_000);
});
test.after(async () => {
  hook.setConnectionAuthFailedSinkForTesting(null);
  globalThis.fetch = originalFetch;
  await harness.cleanup();
});

test("connection.auth_failed is a subscribable, described webhook event", () => {
  assert.ok((events.WEBHOOK_EVENT_VALUES as readonly string[]).includes("connection.auth_failed"));
  const desc = events.EVENT_DESCRIPTIONS["connection.auth_failed" as never] as
    { label: string } | undefined;
  assert.equal(desc?.label, "Connection Auth Failed");
});

test("a 401 whose refresh succeeds and whose retry returns 200 sends nothing", async () => {
  // A token that is still valid on paper: no proactive refresh, only the reactive one after 401.
  const conn = await seedCodex("recovers", {
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  });
  const counts = mockUpstream(
    (attempt) => (attempt === 1 ? upstream401() : success()),
    () =>
      Response.json({
        access_token: "synthetic-access-2",
        refresh_token: "synthetic-refresh-2",
        expires_in: 3600,
      })
  );
  const response = await chat(conn.id);
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(counts.refreshes, 1, "the reactive refresh ran");
  assert.equal(counts.generations, 2, "the retry after the refresh reached the upstream");
  await new Promise((resolve) => setTimeout(resolve, 50));
  assert.deepEqual(authHits(), [], "a recovered 401 is not an account failure");
});

test("a 401 whose refresh token is rejected sends one needs-re-auth event", async () => {
  const conn = await seedCodex("revoked");
  mockUpstream(upstream401, () =>
    Response.json({ error: { code: "refresh_token_reused" } }, { status: 400 })
  );
  const response = await chat(conn.id);
  await response.text();
  assert.equal(response.status, 401);
  await new Promise((resolve) => setTimeout(resolve, 50));

  const sent = authHits();
  assert.equal(sent.length, 1, `exactly one event, got ${JSON.stringify(sent)}`);
  const { data } = sent[0];
  assert.equal(data.provider, "codex");
  assert.equal(data.connectionId, conn.id);
  assert.equal(data.needsReauth, true);
  // The live request saw the 401 and, with its refresh rejected, parked the account: the
  // request path owns this verdict. Background refreshes report stage "refresh" (sweep test).
  assert.equal(data.stage, "request");
  assert.equal(data.status, 401);
  assert.equal(data.account, "revoked", "the connection's display name labels the account");
  assertNoSecrets(sent[0]);

  const row = await providers.getProviderConnectionById(conn.id);
  assert.equal(row.testStatus, "expired");

  // The edge fires once: a second write that keeps it expired sends nothing more.
  await providers.updateProviderConnection(conn.id, { testStatus: "expired", lastError: "again" });
  assert.equal(authHits().length, 1);
});

test("a request-side 401 that the router rotates away from names the account once per window", async () => {
  // No refresh token: the request-side 401 cannot be fixed in-line.
  const conn = await seedCodex("no-refresh", {
    refreshToken: null,
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  });
  mockUpstream(upstream401, null);
  for (let i = 0; i < 2; i++) {
    await providers.updateProviderConnection(conn.id, { rateLimitedUntil: null });
    const response = await chat(conn.id);
    await response.text();
  }
  await new Promise((resolve) => setTimeout(resolve, 50));
  const sent = authHits();
  assert.equal(sent.length, 1, `dedupe per connection+stage, got ${JSON.stringify(sent)}`);
  assert.equal(sent[0].data.stage, "request");
  assert.equal(sent[0].data.status, 401);
  assert.equal(sent[0].data.needsReauth, false);
  assert.equal(sent[0].data.code, "unauthorized");
  assertNoSecrets(sent[0]);
});

test("markAccountUnavailable: a terminal 401 reports the edge, not a second request event", async () => {
  const conn = await seedCodex("terminal");
  await auth.markAccountUnavailable(conn.id, 401, "Unauthorized", "openai", "gpt-4o-mini");
  const row = await providers.getProviderConnectionById(conn.id);
  assert.equal(row.testStatus, "expired");
  const sent = authHits();
  assert.equal(sent.length, 1, JSON.stringify(sent));
  assert.equal(sent[0].data.stage, "request");
  assert.equal(sent[0].data.status, 401);
  assert.equal(sent[0].data.needsReauth, true);
});

test("non-auth failures send nothing", async () => {
  const conn = await seedCodex("other-errors");
  await auth.markAccountUnavailable(conn.id, 429, "rate limit exceeded", "openai", "gpt-4o-mini");
  await providers.updateProviderConnection(conn.id, { rateLimitedUntil: null });
  await auth.markAccountUnavailable(conn.id, 500, "internal error", "openai", "gpt-4o-mini");
  await providers.updateProviderConnection(conn.id, { rateLimitedUntil: null });
  // A 401 naming an unsupported model is a model fact (#7268), not the account's auth.
  await auth.markAccountUnavailable(
    conn.id,
    401,
    "Model grok-9 is not supported",
    "openai",
    "grok-9"
  );
  assert.deepEqual(authHits(), []);
});

test("the health-sweep edge reports stage refresh with the refresh error code", async () => {
  // No display name: the email labels the account, masked.
  const conn = await seedCodex("sweep", { name: null });
  await providers.updateProviderConnection(conn.id, {
    testStatus: "expired",
    lastErrorType: "unrecoverable_refresh_error",
    errorCode: "refresh_token_reused",
    lastError: `Refresh token consumed (${UPSTREAM_BODY_MARKER})`,
  });
  const sent = authHits();
  assert.equal(sent.length, 1);
  assert.deepEqual(
    { ...sent[0].data, connectionId: undefined },
    {
      provider: "codex",
      connectionId: undefined,
      account: "swe**@************lid",
      stage: "refresh",
      status: null,
      code: "refresh_token_reused",
      needsReauth: true,
    }
  );
  assertNoSecrets(sent[0]);
});

test("a retired provider parked as expired is not an auth failure", async () => {
  const conn = await seedCodex("retired");
  await providers.updateProviderConnection(conn.id, {
    testStatus: "expired",
    lastErrorType: "provider_deprecated",
    errorCode: "provider_deprecated",
  });
  assert.deepEqual(authHits(), []);
});

test("free-text codes are dropped from the payload", () => {
  hook.notifyConnectionAuthFailed({
    provider: "codex",
    connectionId: "conn-free-text",
    stage: "refresh",
    code: "Bearer abc.def leaked in a sentence",
    needsReauth: true,
  });
  assert.equal(authHits().at(-1)?.data.code, null);
  assert.equal(authHits().at(-1)?.data.account, "Account #conn-f");
});

test("Discord and Slack messages name the account", () => {
  const data = {
    provider: "codex",
    connectionId: "conn-a",
    account: "ali***@****com",
    stage: "request",
    status: 401,
    code: "unauthorized",
    needsReauth: false,
  };
  const discord = JSON.stringify(buildDiscordPayload("connection.auth_failed" as never, data));
  const slack = JSON.stringify(buildSlackPayload("connection.auth_failed" as never, data));
  assert.match(discord, /ali\*\*\*@\*\*\*\*com/);
  assert.match(discord, /Connection Auth Failed/);
  assert.match(slack, /ali\*\*\*@\*\*\*\*com/);
});
