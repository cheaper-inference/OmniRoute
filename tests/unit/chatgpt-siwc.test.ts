import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { generateKeyPair, exportJWK, createLocalJWKSet, SignJWT, UnsecuredJWT } from "jose";
import { opaqueTokenFingerprint } from "../../open-sse/utils/opaqueTokenFingerprint.ts";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-siwc-"));
process.env.DATA_DIR = dataDir;
process.env.STORAGE_ENCRYPTION_KEY = "siwc-test-only-encryption-key";
process.env.JWT_SECRET = "siwc-test-only-dashboard-secret";
const { createChatGptAttempt, resolveChatGptClientId, verifyChatGptIdentity, exchangeChatGptCode } =
  await import("../../src/lib/oauth/chatgptProtocol.ts");
const { saveChatGptAttempt, claimChatGptAttempt, getChatGptAttempt, cancelChatGptAttempt } =
  await import("../../src/lib/oauth/chatgptAttempts.ts");
const { CHATGPT_PLAN_SCOPE } = await import("../../open-sse/config/chatgpt.ts");
const { ChatGptExecutor, prepareChatGptRequest } =
  await import("../../open-sse/executors/chatgpt.ts");
const { refreshChatGptToken } =
  await import("../../open-sse/services/tokenRefresh/providers/chatgpt.ts");
const { parseChatGptModels, discoverChatGptModels } =
  await import("../../src/lib/providerModels/chatgptDiscovery.ts");
const { chatGptCallbackLink } = await import("../../src/shared/utils/chatgptCallback.ts");
const { getChatGptHostId } = await import("../../src/lib/db/chatgpt.ts");
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");
const { getSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("concurrent connection metadata updates cannot restore a consumed refresh token", async () => {
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Refresh persistence race",
    accessToken: "old-access",
    refreshToken: "consumed-refresh",
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "race-test",
      clientId: "oaiapp_race",
    },
  });
  await Promise.all([
    db.updateProviderConnection(connection.id, {
      accessToken: "new-access",
      refreshToken: "replacement-refresh",
      expiresAt: "2030-01-01T00:00:00Z",
    }),
    db.updateProviderConnection(connection.id, { lastHealthCheckAt: "2026-09-30T15:00:00Z" }),
  ]);
  const saved = await db.getProviderConnectionById(connection.id);
  assert.equal(saved.refreshToken, "replacement-refresh");
  assert.equal(saved.accessToken, "new-access");
  assert.equal(saved.expiresAt, "2030-01-01T00:00:00Z");
  assert.equal(saved.lastHealthCheckAt, "2026-09-30T15:00:00Z");
});

test("successive refresh cycles retain replacement tokens despite concurrent status writes", async (t) => {
  const { getAccessToken } = await import("../../open-sse/services/tokenRefresh.ts");
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Successive refresh cycles",
    accessToken: "cycle-access-0",
    refreshToken: "cycle-refresh-0",
    expiresAt: "2020-01-01T00:00:00Z",
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "cycle-user",
      clientId: "oaiapp_cycles",
    },
  });
  let rotations = 0;
  t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    assert.equal(
      (init.body as URLSearchParams).get("refresh_token"),
      `cycle-refresh-${rotations}`,
      "a consumed token must never reach the issuer again"
    );
    rotations++;
    return Response.json({
      access_token: `cycle-access-${rotations}`,
      refresh_token: `cycle-refresh-${rotations}`,
      expires_in: 3600,
    });
  });
  for (let cycle = 1; cycle <= 2; cycle++) {
    await db.updateProviderConnection(connection.id, { expiresAt: "2020-01-01T00:00:00Z" });
    const current = await db.getProviderConnectionById(connection.id);
    const persist = async (result: Record<string, unknown>) => {
      await Promise.all([
        db.updateProviderConnection(connection.id, result),
        db.updateProviderConnection(connection.id, { lastHealthCheckAt: new Date().toISOString() }),
      ]);
    };
    await Promise.all(
      Array.from({ length: 3 }, () =>
        getAccessToken("chatgpt", { ...current, connectionId: connection.id }, null, null, persist)
      )
    );
    assert.equal(rotations, cycle, "parallel callers share one upstream rotation");
    const saved = await db.getProviderConnectionById(connection.id);
    assert.equal(saved.refreshToken, `cycle-refresh-${cycle}`);
    assert.equal(saved.accessToken, `cycle-access-${cycle}`);
  }
});

test("ChatGPT refresh respects the one-minute window and upstream earliest refresh time", async (t) => {
  let calls = 0;
  const earliest = Math.floor(Date.now() / 1000) + 120;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return Response.json({
      access_token: "next",
      refresh_token: "next-refresh",
      expires_in: 3600,
      earliest_refresh_at: earliest,
    });
  });
  const credentials = {
    accessToken: "current",
    refreshToken: "current-refresh",
    expiresAt: new Date(Date.now() + 240_000).toISOString(),
    providerSpecificData: { clientId: "oaiapp_timing", scopes: [CHATGPT_PLAN_SCOPE] },
  };
  const early = await refreshChatGptToken(credentials);
  assert.equal(calls, 0, "do not consume a rotating token five minutes early");
  assert.ok("accessToken" in early);
  assert.equal(early.expiresAt, credentials.expiresAt, "reuse must not extend token lifetime");
  for (const value of [earliest, new Date(earliest * 1000).toISOString()]) {
    const nearExpiry = {
      ...credentials,
      expiresAt: new Date(Date.now() + 30_000).toISOString(),
      providerSpecificData: { ...credentials.providerSpecificData, earliestRefreshAt: value },
    };
    await refreshChatGptToken(nearExpiry);
    const expired = await refreshChatGptToken({ ...nearExpiry, expiresAt: "2020-01-01T00:00:00Z" });
    assert.ok("error" in expired);
    assert.equal(expired.error, "temporary_refresh_error");
    assert.equal(calls, 0, "never refresh before earliest_refresh_at, even after expiry");
  }
  const refreshed = await refreshChatGptToken({
    ...credentials,
    expiresAt: "2020-01-01T00:00:00Z",
  });
  assert.equal(calls, 1);
  assert.ok("accessToken" in refreshed);
  assert.equal(refreshed.providerSpecificData?.earliestRefreshAt, earliest);
  assert.deepEqual(refreshed.providerSpecificData?.scopes, [CHATGPT_PLAN_SCOPE]);
});

test("ChatGPT Retest keeps rejected refresh credentials expired without a rate-limit cooldown", async (t) => {
  const { testSingleConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Retest auth classification",
    accessToken: "expired",
    refreshToken: "retest-invalid",
    expiresAt: "2020-01-01T00:00:00Z",
    testStatus: "expired",
    rateLimitedUntil: new Date(Date.now() + 30_000).toISOString(),
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "retest",
      clientId: "oaiapp_retest",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  });
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ error: "invalid_grant", detail: "secret-must-not-leak" }, { status: 400 })
  );
  const result = await testSingleConnection(connection.id);
  assert.equal(result.valid, false);
  assert.equal(result.diagnosis?.code, "expired");
  const saved = await db.getProviderConnectionById(connection.id);
  assert.equal(saved.testStatus, "expired");
  assert.equal(saved.rateLimitedUntil ?? null, null);
  assert.match(saved.lastError, /sign in again/i);
  assert.ok(!JSON.stringify(result).includes("secret-must-not-leak"));
});

test("stale ChatGPT callers reuse persisted refresh timing and scope metadata", async (t) => {
  const { getAccessToken, getRefreshLeadMs } =
    await import("../../open-sse/services/tokenRefresh.ts");
  assert.equal(getRefreshLeadMs("chatgpt"), 60_000);
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("must not refresh early");
  });
  for (const remaining of [30_000, 240_000]) {
    const metadata = {
      issuer: "https://auth.openai.com",
      subject: `stale-${remaining}`,
      clientId: `oaiapp_stale${remaining}`,
      scopes: [CHATGPT_PLAN_SCOPE],
      earliestRefreshAt: Math.floor(Date.now() / 1000) + 300,
    };
    const saved = await db.createProviderConnection({
      provider: "chatgpt",
      authType: "oauth",
      name: "Persisted timing",
      accessToken: "fresh-access",
      refreshToken: `fresh-${remaining}`,
      expiresAt: new Date(Date.now() + remaining).toISOString(),
      providerSpecificData: metadata,
    });
    const result = await getAccessToken(
      "chatgpt",
      {
        connectionId: saved.id,
        accessToken: "stale-access",
        refreshToken: `stale-${remaining}`,
        expiresAt: "2020-01-01T00:00:00Z",
        providerSpecificData: { ...metadata, earliestRefreshAt: 0 },
      },
      null
    );
    assert.equal(result.accessToken, "fresh-access");
    assert.equal(result.expiresAt, saved.expiresAt);
    assert.equal(result.providerSpecificData.earliestRefreshAt, metadata.earliestRefreshAt);
    assert.deepEqual(result.providerSpecificData.scopes, [CHATGPT_PLAN_SCOPE]);
  }
});

test("ChatGPT Retest distinguishes rejected authorization, rate limits and transient outages", async (t) => {
  const { testOAuthConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");
  const connection = {
    id: "classification",
    provider: "chatgpt",
    accessToken: "current",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    providerSpecificData: { scopes: [CHATGPT_PLAN_SCOPE] },
  };
  let status = 401;
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ secret: "must-not-leak" }, { status })
  );
  for (const [code, type] of [
    [401, "token_expired"],
    [403, "token_expired"],
    [429, "upstream_rate_limited"],
    [503, "upstream_unavailable"],
  ] as const) {
    status = code;
    const result = await testOAuthConnection(connection);
    assert.equal(result.diagnosis.type, type);
    assert.ok(!JSON.stringify(result).includes("must-not-leak"));
  }
});

test("catalog retest persists rotated identity and both expiry fields", async (t) => {
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Expiry regression",
    accessToken: "expired-access",
    refreshToken: "expiry-refresh",
    expiresAt: new Date(Date.now() - 1000).toISOString(),
    tokenExpiresAt: new Date(Date.now() - 1000).toISOString(),
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "expiry",
      clientId: "oaiapp_expiry",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  });
  t.mock.method(globalThis, "fetch", async (url: string) =>
    String(url).includes("/oauth/token")
      ? Response.json({
          access_token: "rotated-access",
          refresh_token: "rotated-refresh",
          id_token: "rotated-identity",
          expires_in: 3600,
        })
      : Response.json({ models: [] })
  );
  await discoverChatGptModels(connection);
  const saved = await db.getProviderConnectionById(connection.id);
  assert.equal(saved.tokenExpiresAt, saved.expiresAt);
  assert.ok(Date.parse(saved.expiresAt) > Date.now() + 50 * 60_000);
  assert.equal(saved.idToken, "rotated-identity");
});

test("manual refresh distinguishes reauthorization from temporary upstream failures", async (t) => {
  const { POST } = await import("../../src/app/api/providers/[id]/refresh/route.ts");
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Refresh regression",
    accessToken: "access",
    refreshToken: "route-refresh",
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "refresh",
      clientId: "oaiapp_refresh",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  });
  let status = 503;
  t.mock.method(globalThis, "fetch", async () =>
    Response.json(
      {
        error: status === 400 ? "invalid_grant" : "temporarily_unavailable",
        secret: "must-not-leak",
      },
      { status }
    )
  );
  const call = () =>
    POST(new Request("http://localhost/api/providers/test/refresh", { method: "POST" }), {
      params: Promise.resolve({ id: connection.id }),
    });
  const temporary = await call();
  assert.equal(temporary.status, 503);
  const temporaryBody = await temporary.json();
  assert.equal(typeof temporaryBody.error, "string");
  assert.ok(!JSON.stringify(temporaryBody).includes("must-not-leak"));
  assert.equal((await db.getProviderConnectionById(connection.id)).refreshToken, "route-refresh");
  status = 400;
  const terminal = await call();
  const body = await terminal.json();
  assert.equal(terminal.status, 401);
  assert.equal(body.requiresReauth, true);
  assert.match(body.error, /sign in again/i);
  assert.ok(!JSON.stringify(body).includes("must-not-leak"));
});

test("management-only sign-in rejects unauthenticated and cross-origin requests and never exposes PKCE", async () => {
  const { POST } = await import("../../src/app/api/oauth/chatgpt/session/route.ts");
  const { mintDashboardSessionToken } =
    await import("../../src/shared/utils/dashboardSessionToken.ts");
  const token = await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET));
  const request = (origin: string, authenticated: boolean, body: object) =>
    new Request("https://router.example/api/oauth/chatgpt/session", {
      method: "POST",
      headers: {
        host: "router.example",
        origin,
        "content-type": "application/json",
        ...(authenticated ? { cookie: `auth_token=${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
  assert.equal(
    (await POST(request("https://router.example", false, { action: "start", port: 1455 }))).status,
    401
  );
  assert.equal(
    (await POST(request("https://evil.example", true, { action: "start", port: 1455 }))).status,
    403
  );
  const response = await POST(
    request("https://router.example", true, { action: "start", port: 1455 })
  );
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.deepEqual(Object.keys(result).sort(), ["authUrl", "expiresAt", "state"]);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const rejected = await POST(
    request("https://router.example", true, {
      action: "complete",
      state: "unknown",
      code: "secret-code",
    })
  );
  assert.equal(rejected.status, 400);
  const text = await rejected.text();
  assert.ok(!text.includes("secret-code") && !text.includes("at /"));
  await POST(request("https://router.example", true, { action: "cancel", state: result.state }));
});

test("manual completion validates owner and callback before exchange and prevents replay", async (t) => {
  const { POST } = await import("../../src/app/api/oauth/chatgpt/session/route.ts");
  const { mintDashboardSessionToken } =
    await import("../../src/shared/utils/dashboardSessionToken.ts");
  const token = await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET));
  const send = (body: object) =>
    POST(
      new Request("https://router.example/api/oauth/chatgpt/session", {
        method: "POST",
        headers: {
          host: "router.example",
          origin: "https://router.example",
          cookie: `auth_token=${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
    );
  const owner = opaqueTokenFingerprint(`auth_token=${token}`);
  const { attempt } = createChatGptAttempt("https://router.example", 1455, "test-host");
  saveChatGptAttempt(attempt, owner);
  let exchanges = 0;
  t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    exchanges++;
    const form = init.body as URLSearchParams;
    assert.equal(form.get("code"), "one-time-code");
    assert.equal(form.get("client_id"), "oaiapp_test");
    assert.equal(form.get("redirect_uri"), attempt.redirectUri);
    assert.equal(form.get("code_verifier"), attempt.verifier);
    return Response.json({ error: "fixture upstream rejection" }, { status: 400 });
  });
  const valid = `${attempt.redirectUri}?${new URLSearchParams({ code: "one-time-code", state: attempt.state, client_id: "oaiapp_test" })}`;
  for (const callbackUrl of [
    valid.replace("1455", "1456"),
    valid.replace(attempt.state, "wrong"),
    valid.replace("oaiapp_test", "dynamic_agent_client"),
  ]) {
    const response = await send({ action: "complete-url", state: attempt.state, callbackUrl });
    assert.equal(response.status, 400);
    assert.ok(!(await response.text()).includes("one-time-code"));
    assert.equal(getChatGptAttempt(attempt.state, owner)?.phase, "pending");
  }
  saveChatGptAttempt(attempt, "other-owner");
  assert.equal(
    (await send({ action: "complete-url", state: attempt.state, callbackUrl: valid })).status,
    400
  );
  assert.equal(exchanges, 0);
  saveChatGptAttempt(attempt, owner);
  const body = { action: "complete-url", state: attempt.state, callbackUrl: valid };
  assert.equal((await send(body)).status, 400);
  assert.equal(exchanges, 1);
  assert.equal(getChatGptAttempt(attempt.state, owner)?.phase, "failed");
  assert.equal((await send(body)).status, 400);
  assert.equal(exchanges, 1);
});

test("verified reauthorization reactivates the registration and resets refresh failure state", async (t) => {
  const { POST } = await import("../../src/app/api/oauth/chatgpt/session/route.ts");
  const { mintDashboardSessionToken } =
    await import("../../src/shared/utils/dashboardSessionToken.ts");
  const session = await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET));
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Reauthorization regression",
    accessToken: "expired-access",
    refreshToken: "rejected-refresh",
    isActive: false,
    testStatus: "expired",
    errorCode: "invalid_grant",
    lastErrorType: "unrecoverable_refresh_error",
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "reauth-user",
      clientId: "oaiapp_reauth",
      expiredRetry: { count: 5, at: new Date().toISOString() },
      refreshCircuit: { until: new Date(Date.now() + 600_000).toISOString() },
      connectionTestModel: "saved-model",
    },
  });
  const { attempt } = createChatGptAttempt("https://router.example", 1455, getChatGptHostId(), {
    clientId: "oaiapp_reauth",
    subject: "reauth-user",
    connectionId: connection.id,
  });
  saveChatGptAttempt(attempt, opaqueTokenFingerprint(`auth_token=${session}`));
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const idToken = await new SignJWT({ nonce: attempt.nonce })
    .setProtectedHeader({ alg: "RS256", kid: "reauth-test" })
    .setIssuer("https://auth.openai.com")
    .setAudience("oaiapp_reauth")
    .setSubject("reauth-user")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
  t.mock.method(globalThis, "fetch", async (url: string | URL) => {
    if (String(url).endsWith("/.well-known/jwks.json"))
      return Response.json({
        keys: [{ ...(await exportJWK(publicKey)), kid: "reauth-test", alg: "RS256" }],
      });
    if (String(url).endsWith("/oauth/token"))
      return Response.json({
        access_token: "reauth-access",
        refresh_token: "reauth-refresh",
        id_token: idToken,
        token_type: "Bearer",
        expires_in: 3600,
        scope: CHATGPT_PLAN_SCOPE,
      });
    assert.equal(String(url), "https://api.openai.com/v1/models");
    return Response.json({ data: [{ id: "saved-model" }] });
  });
  const response = await POST(
    new Request("https://router.example/api/oauth/chatgpt/session", {
      method: "POST",
      headers: {
        host: "router.example",
        origin: "https://router.example",
        cookie: `auth_token=${session}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ action: "complete", state: attempt.state, code: "reauth-code" }),
    })
  );
  assert.equal(response.status, 200);
  const saved = await db.getProviderConnectionById(connection.id);
  assert.equal(saved.isActive, true);
  assert.equal(saved.testStatus, "active");
  assert.equal(saved.errorCode ?? null, null);
  assert.equal(saved.providerSpecificData.expiredRetry ?? null, null);
  assert.equal(saved.providerSpecificData.refreshCircuit ?? null, null);
  assert.equal(saved.providerSpecificData.connectionTestModel, "saved-model");
  assert.equal(saved.refreshToken, "reauth-refresh");
});

test("SIWC uses independent dynamic registration, PKCE, nonce, resource and persistent host ID", () => {
  assert.match(resolvePublicCred("chatgpt_id"), /^[a-z]+_[a-z]+_[a-z]+$/);
  const host = getChatGptHostId();
  assert.equal(getChatGptHostId(), host);
  assert.match(host, /^urn:uuid:/);
  const { attempt, authUrl } = createChatGptAttempt("https://router.example", 1455, host);
  const url = new URL(authUrl);
  assert.equal(url.origin, "https://auth.openai.com");
  assert.equal(url.pathname, "/api/accounts/authorize");
  assert.equal(url.searchParams.get("client_id"), resolvePublicCred("chatgpt_id"));
  assert.equal(url.searchParams.get("redirect_uri"), "http://127.0.0.1:1455/auth/callback");
  assert.equal(
    url.searchParams.get("code_challenge"),
    createHash("sha256").update(attempt.verifier).digest("base64url")
  );
  assert.equal(url.searchParams.get("resource"), "https://api.openai.com/v1");
  assert.ok(url.searchParams.get("scope")?.includes(CHATGPT_PLAN_SCOPE));
  assert.ok(!authUrl.includes(attempt.verifier));
  assert.notEqual(createChatGptAttempt(attempt.origin, 1455, host).attempt.state, attempt.state);
  assert.throws(() => resolveChatGptClientId(attempt));
  assert.throws(() => resolveChatGptClientId(attempt, resolvePublicCred("chatgpt_id")));
  assert.equal(resolveChatGptClientId(attempt, "oaiapp_example"), "oaiapp_example");
  const reused = createChatGptAttempt(attempt.origin, 1456, host, {
    clientId: "oaiapp_saved",
    subject: "user",
    connectionId: "connection",
  });
  assert.equal(new URL(reused.authUrl).searchParams.has("agent_name_hint"), false);
  assert.throws(() => resolveChatGptClientId(reused.attempt, "oaiapp_other"));
});

test("attempts are owner-bound, expiring and consumed atomically before exchange", () => {
  const { attempt } = createChatGptAttempt("https://router.example", 1455, "test-host");
  saveChatGptAttempt(attempt, "owner");
  assert.equal(getChatGptAttempt(attempt.state, "other"), null);
  assert.throws(() => claimChatGptAttempt(attempt.state, "other"));
  assert.equal(claimChatGptAttempt(attempt.state, "owner").phase, "completing");
  assert.throws(() => claimChatGptAttempt(attempt.state, "owner"));
  const expired = { ...attempt, state: "expired", expiresAt: Date.now() - 1 };
  saveChatGptAttempt(expired, "owner");
  assert.equal(getChatGptAttempt("expired", "owner"), null);
  saveChatGptAttempt({ ...attempt, state: "cancel" }, "owner");
  cancelChatGptAttempt("cancel", "owner");
  assert.equal(getChatGptAttempt("cancel", "owner"), null);
});

test("OIDC validates signature, issuer, audience, expiration and nonce", async () => {
  const { privateKey, publicKey } = await generateKeyPair("RS256");
  const key = createLocalJWKSet({ keys: [{ ...(await exportJWK(publicKey)), kid: "test" }] });
  const token = await new SignJWT({ nonce: "nonce", email: "person@example.com" })
    .setProtectedHeader({ alg: "RS256", kid: "test" })
    .setIssuer("https://auth.openai.com")
    .setAudience("oaiapp_test")
    .setSubject("subject")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
  assert.equal(
    (await verifyChatGptIdentity(token, "oaiapp_test", "nonce", key)).subject,
    "subject"
  );
  await assert.rejects(verifyChatGptIdentity(token, "oaiapp_other", "nonce", key));
  await assert.rejects(verifyChatGptIdentity(token, "oaiapp_test", "wrong", key));
  const other = await generateKeyPair("RS256");
  await assert.rejects(
    verifyChatGptIdentity(
      token,
      "oaiapp_test",
      "nonce",
      createLocalJWKSet({ keys: [{ ...(await exportJWK(other.publicKey)), kid: "test" }] })
    )
  );
});

test("OIDC pins RS256: unsecured (alg none) and non-RS256 ID tokens are rejected", async () => {
  const claims = { nonce: "nonce" };
  const unsecured = new UnsecuredJWT(claims)
    .setIssuer("https://auth.openai.com")
    .setAudience("oaiapp_test")
    .setSubject("subject")
    .setIssuedAt()
    .setExpirationTime("5m")
    .encode();
  const { publicKey } = await generateKeyPair("RS256");
  const rsKey = createLocalJWKSet({ keys: [{ ...(await exportJWK(publicKey)), kid: "test" }] });
  await assert.rejects(verifyChatGptIdentity(unsecured, "oaiapp_test", "nonce", rsKey));

  const es = await generateKeyPair("ES256");
  const esToken = await new SignJWT(claims)
    .setProtectedHeader({ alg: "ES256", kid: "es" })
    .setIssuer("https://auth.openai.com")
    .setAudience("oaiapp_test")
    .setSubject("subject")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(es.privateKey);
  const esKey = createLocalJWKSet({ keys: [{ ...(await exportJWK(es.publicKey)), kid: "es" }] });
  await assert.rejects(
    verifyChatGptIdentity(esToken, "oaiapp_test", "nonce", esKey),
    /alg/i,
    "a validly signed ES256 token must still fail the RS256 pin"
  );
});

test("browser callback keeps code in fragment and rejects untrusted schemes/origins", () => {
  const { attempt } = createChatGptAttempt("https://router.example", 1455, "host");
  const params = new URLSearchParams({
    state: attempt.state,
    code: "temporary-code",
    client_id: "oaiapp_test",
  });
  const destination = chatGptCallbackLink(params)!;
  assert.equal(new URL(destination).origin, attempt.origin);
  assert.equal(new URL(destination).search, "");
  assert.match(new URL(destination).hash, /temporary-code/);
  for (const origin of [
    "javascript:alert(1)",
    "http://remote.example",
    "https://user:pass@router.example",
    "https://router.example/path",
  ]) {
    const state = `siwc.${Buffer.from(origin).toString("base64url")}.${"a".repeat(43)}`;
    assert.equal(chatGptCallbackLink(new URLSearchParams({ state })), null);
  }
});

test("request uses public Responses contract, preserves opaque items and packages client tools", async () => {
  const opaque = { type: "reasoning", encrypted_content: "opaque", id: "r1" };
  const source = {
    input: [{ role: "system", content: "instructions" }, opaque],
    tools: [{ type: "function", name: "lookup", parameters: { type: "object" } }],
    temperature: 1,
    max_output_tokens: 100,
    previous_response_id: "previous",
    _secret: "internal",
  };
  const body = prepareChatGptRequest("test-model", source);
  assert.equal(body.store, false);
  assert.equal(body.stream, true);
  assert.equal(body.temperature, undefined);
  assert.equal(body.max_output_tokens, undefined);
  assert.equal(body.previous_response_id, undefined);
  assert.equal(body._secret, undefined);
  const input = body.input as Record<string, unknown>[];
  assert.equal(input[0].type, "additional_tools");
  assert.equal(input[1].role, "developer");
  assert.deepEqual(input[2], opaque);
  assert.equal(source.input[0].role, "system");
  assert.throws(() => prepareChatGptRequest("m", { tools: [{ type: "file_search" }] }));
  const executor = new ChatGptExecutor();
  assert.equal(executor.buildUrl(), "https://api.openai.com/v1/responses");
  const headers = executor.buildHeaders({ accessToken: "test-access" });
  assert.equal(headers.Authorization, "Bearer test-access");
  assert.ok(!JSON.stringify(headers).includes("codex"));
  const result = await executor.execute({ model: "m", body: {}, stream: false, credentials: {} });
  assert.ok(result instanceof Response);
  assert.equal(result.status, 403);
});

test("code exchange uses issued client and resource; refresh rotates credentials without scope widening", async (t) => {
  const { attempt } = createChatGptAttempt("https://router.example", 1455, "host");
  let form: URLSearchParams;
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.equal(String(url), "https://auth.openai.com/api/accounts/oauth/token");
    form = init.body as URLSearchParams;
    return Response.json({
      access_token: "new-access",
      refresh_token: "new-refresh",
      id_token: "id-token",
      token_type: "Bearer",
      expires_in: 3600,
      scope: CHATGPT_PLAN_SCOPE,
      earliest_refresh_at: 1_800_000_000,
    });
  });
  const exchanged = await exchangeChatGptCode(attempt, "code", "oaiapp_test");
  assert.equal(exchanged.earliest_refresh_at, 1_800_000_000);
  assert.equal(form!.get("client_id"), "oaiapp_test");
  assert.equal(form!.get("code_verifier"), attempt.verifier);
  const result = await refreshChatGptToken({
    refreshToken: "old-refresh",
    providerSpecificData: { clientId: "oaiapp_test", subject: "s" },
  });
  assert.equal(form!.get("grant_type"), "refresh_token");
  assert.equal(form!.get("resource"), "https://api.openai.com/v1");
  assert.equal(form!.has("scope"), false);
  assert.ok(result && "accessToken" in result);
  assert.equal(result.refreshToken, "new-refresh");
  assert.ok(Date.parse(result.expiresAt) > Date.now());
  assert.equal(result.providerSpecificData?.subject, "s");
});

test("executor sends streaming public Responses requests and blocks scopes withdrawn during refresh", async (t) => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  assert.equal(REGISTRY.chatgpt.forceStream, true);
  let calls = 0;
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    calls++;
    if (String(url).endsWith("/oauth/token"))
      return Response.json({
        access_token: "reduced-access",
        refresh_token: "reduced-refresh",
        expires_in: 3600,
        scope: "openid",
      });
    assert.equal(String(url), "https://api.openai.com/v1/responses");
    assert.equal(new Headers(init.headers).get("authorization"), "Bearer access");
    const body = JSON.parse(String(init.body));
    assert.equal(body.store, false);
    assert.equal(body.stream, true);
    assert.equal(body.model, "live-model");
    return new Response(
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_test","status":"completed","output":[]}}\n\n',
      { headers: { "content-type": "text/event-stream" } }
    );
  });
  const executor = new ChatGptExecutor();
  const result = await executor.execute({
    model: "live-model",
    stream: false,
    body: { input: "Hello" },
    credentials: { accessToken: "access", providerSpecificData: { scopes: [CHATGPT_PLAN_SCOPE] } },
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response.status, 200);
  assert.match(await response.text(), /response.completed/);
  const blocked = await executor.execute({
    model: "live-model",
    stream: true,
    body: { input: "Hello" },
    credentials: {
      accessToken: "expired",
      refreshToken: "scope-narrowing-refresh",
      expiresAt: "2020-01-01T00:00:00Z",
      providerSpecificData: { clientId: "oaiapp_scope", scopes: [CHATGPT_PLAN_SCOPE] },
    },
  });
  assert.ok(blocked instanceof Response);
  assert.equal(blocked.status, 403);
  assert.equal(calls, 2, "one inference plus one refresh; no inference after scope withdrawal");
});

test("ChatGPT discovery produces importable chat capabilities with Responses wire format", async () => {
  const { providerModelMutationSchema } =
    await import("../../src/shared/validation/schemas/provider.ts");
  const models = parseChatGptModels({
    models: [
      { slug: "gpt-6-astra", visibility: "list" },
      { slug: "gpt-6.1-sol", visibility: "list", supportedEndpoints: ["responses"] },
      { slug: "hidden", visibility: "hide" },
    ],
  });
  assert.equal(models.length, 2);
  for (const model of models) {
    const imported = providerModelMutationSchema.parse({
      provider: "chatgpt",
      modelId: model.id,
      modelName: model.name,
      source: "imported",
      apiFormat: model.apiFormat,
      supportedEndpoints: model.supportedEndpoints,
    });
    assert.equal(imported.apiFormat, "responses");
    assert.deepEqual(imported.supportedEndpoints, ["chat"]);
  }
});

test("catalog respects account visibility/order; same-email registrations remain separate and empty sync clears inventory", async (t) => {
  const payload = {
    models: [
      { slug: "second", visibility: "list", display_name: "Second" },
      { slug: "hidden", visibility: "hide" },
      { slug: "first", visibility: "list" },
    ],
  };
  assert.deepEqual(
    parseChatGptModels(payload).map((m) => m.id),
    ["second", "first"]
  );
  assert.deepEqual(parseChatGptModels({ models: [] }), []);
  assert.throws(() => parseChatGptModels({ data: [] }));
  const common = {
    provider: "chatgpt",
    authType: "oauth",
    email: "same@example.com",
    accessToken: "test-access",
    refreshToken: "test-refresh",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "user",
      clientId: "oaiapp_one",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  };
  const first = await db.createProviderConnection(common);
  const second = await db.createProviderConnection({
    ...common,
    providerSpecificData: { ...common.providerSpecificData, clientId: "oaiapp_two" },
  });
  assert.notEqual(first.id, second.id);
  assert.equal((await db.createProviderConnection(common)).id, first.id);
  let empty = false;
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.equal(String(url), "https://api.openai.com/v1/models");
    assert.equal(new Headers(init.headers).get("Authorization"), "Bearer test-access");
    return Response.json(empty ? { models: [] } : payload);
  });
  await discoverChatGptModels(first);
  const synced = await getSyncedAvailableModelsForConnection("chatgpt", String(first.id));
  assert.equal(synced.length, 2);
  for (const model of synced) {
    assert.equal(model.apiFormat, "responses");
    assert.deepEqual(model.supportedEndpoints, ["chat"]);
  }
  empty = true;
  await discoverChatGptModels(first);
  assert.equal(
    (await getSyncedAvailableModelsForConnection("chatgpt", String(first.id))).length,
    0
  );
  await assert.rejects(discoverChatGptModels({ ...first, providerSpecificData: { scopes: [] } }));
});
