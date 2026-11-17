/**
 * #15201 — hermetic contract test for the whole Sign-in-with-ChatGPT lifecycle (Hard Rule #18,
 * TDD path): authorize URL → pasted callback → token exchange → ID-token verification → persisted
 * registration → live model discovery → refresh-token rotation → one inference request.
 *
 * Every upstream answer below is a STUB shaped after OpenAI's public SIWC token-sharing docs
 * (https://developers.openai.com/siwc/token-sharing-open-source/…) and the PR author's captured
 * flow. It proves OmniRoute speaks that shape; it cannot prove the vendor still answers this way.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { generateKeyPair, exportJWK, SignJWT } from "jose";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-siwc-lifecycle-"));
process.env.DATA_DIR = dataDir;
process.env.STORAGE_ENCRYPTION_KEY = "siwc-lifecycle-test-only-encryption-key";
process.env.JWT_SECRET = "siwc-lifecycle-test-only-dashboard-secret";

const { POST } = await import("../../src/app/api/oauth/chatgpt/session/route.ts");
const { mintDashboardSessionToken } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const { CHATGPT_PLAN_SCOPE, CHATGPT_SCOPES } = await import("../../open-sse/config/chatgpt.ts");
const { ChatGptExecutor } = await import("../../open-sse/executors/chatgpt.ts");
const { getChatGptHostId } = await import("../../src/lib/db/chatgpt.ts");
const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");
const { getSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { discoverChatGptModels, ChatGptDiscoveryError } =
  await import("../../src/lib/providerModels/chatgptDiscovery.ts");
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");

const ORIGIN = "https://router.example";
const KID = "lifecycle-key";
const { privateKey, publicKey } = await generateKeyPair("RS256");
// jose caches the module-level remote JWKS, so every test signs with this one key.
const jwksBody = { keys: [{ ...(await exportJWK(publicKey)), kid: KID, alg: "RS256" }] };
const sessionToken = await mintDashboardSessionToken(
  new TextEncoder().encode(process.env.JWT_SECRET)
);

test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

function send(body: object) {
  return POST(
    new Request(`${ORIGIN}/api/oauth/chatgpt/session`, {
      method: "POST",
      headers: {
        host: "router.example",
        origin: ORIGIN,
        cookie: `auth_token=${sessionToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
  );
}

async function signIdToken(claims: { nonce: string; aud: string; sub: string; email?: string }) {
  return new SignJWT({ nonce: claims.nonce, ...(claims.email ? { email: claims.email } : {}) })
    .setProtectedHeader({ alg: "RS256", kid: KID })
    .setIssuer("https://auth.openai.com")
    .setAudience(claims.aud)
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(privateKey);
}

async function startSignIn() {
  const response = await send({ action: "start", port: 1455 });
  assert.equal(response.status, 200);
  const { authUrl, state } = (await response.json()) as { authUrl: string; state: string };
  const url = new URL(authUrl);
  return {
    state,
    url,
    nonce: url.searchParams.get("nonce")!,
    callback: (params: Record<string, string>) =>
      `http://127.0.0.1:1455/auth/callback?${new URLSearchParams({ state, ...params })}`,
  };
}

function assertSafeError(body: { error: { message: string; type?: string; code?: string } }) {
  // buildErrorBody shape; never raw upstream text, JWT validation text or stack frames.
  assert.equal(typeof body.error.message, "string");
  assert.ok(!/at \/|at async|node_modules|SECRET|jose|"aud"|claim/i.test(body.error.message));
}

test("SIWC lifecycle: authorize → paste callback → exchange → persist → discover → rotate → infer", async (t) => {
  const start = await startSignIn();
  const authorize = start.url;

  // 1. authorize URL carries the full documented parameter set
  assert.equal(
    `${authorize.origin}${authorize.pathname}`,
    "https://auth.openai.com/api/accounts/authorize"
  );
  const expectedParams: Record<string, string> = {
    client_id: resolvePublicCred("chatgpt_id"),
    agent_name_hint: "OmniRoute",
    ext_agent_host_id: getChatGptHostId(),
    response_type: "code",
    redirect_uri: "http://127.0.0.1:1455/auth/callback",
    scope: CHATGPT_SCOPES,
    resource: "https://api.openai.com/v1",
    state: start.state,
    code_challenge_method: "S256",
  };
  for (const [key, value] of Object.entries(expectedParams))
    assert.equal(authorize.searchParams.get(key), value, key);
  assert.ok(authorize.searchParams.get("scope")!.split(" ").includes(CHATGPT_PLAN_SCOPE));
  assert.match(start.state, /^siwc\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]{43}$/);
  assert.equal(
    Buffer.from(start.state.split(".")[1], "base64url").toString(),
    ORIGIN,
    "state carries the dashboard origin for the callback page"
  );
  const challenge = authorize.searchParams.get("code_challenge")!;

  // 2. the browser lands on 127.0.0.1, the operator pastes that URL back
  const calls: { url: string; init: RequestInit }[] = [];
  let refreshRotation = 0;
  let accessToken = "";
  t.mock.method(globalThis, "fetch", async (input: string | URL, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, init });
    if (url === "https://auth.openai.com/.well-known/jwks.json") return Response.json(jwksBody);
    if (url === "https://auth.openai.com/api/accounts/oauth/token") {
      const form = init.body as URLSearchParams;
      assert.equal(init.method, "POST");
      assert.equal(init.redirect, "error", "token endpoint redirects must not be followed");
      const headers = new Headers(init.headers);
      assert.equal(headers.get("content-type"), "application/x-www-form-urlencoded");
      assert.equal(form.get("resource"), "https://api.openai.com/v1");
      assert.equal(form.get("client_id"), "oaiapp_lifecycle");
      if (form.get("grant_type") === "authorization_code") {
        assert.equal(form.get("code"), "lifecycle-code");
        assert.equal(form.get("redirect_uri"), "http://127.0.0.1:1455/auth/callback");
        // PKCE binding: the verifier sent now must hash to the challenge sent in step 1.
        assert.equal(
          createHash("sha256").update(form.get("code_verifier")!).digest("base64url"),
          challenge
        );
        accessToken = "lifecycle-access-1";
        return Response.json({
          access_token: accessToken,
          refresh_token: "lifecycle-refresh-1",
          id_token: await signIdToken({
            nonce: start.nonce,
            aud: "oaiapp_lifecycle",
            sub: "user-lifecycle",
            email: "lifecycle@example.com",
          }),
          token_type: "Bearer",
          expires_in: 3600,
          scope: CHATGPT_SCOPES,
          earliest_refresh_at: 1_700_000_000,
        });
      }
      assert.equal(form.get("grant_type"), "refresh_token");
      assert.equal(
        form.get("refresh_token"),
        `lifecycle-refresh-${refreshRotation + 1}`,
        "the previous (consumed) refresh token must never be replayed"
      );
      assert.equal(form.has("scope"), false, "refresh must not widen scopes");
      refreshRotation++;
      accessToken = `lifecycle-access-${refreshRotation + 1}`;
      return Response.json({
        access_token: accessToken,
        refresh_token: `lifecycle-refresh-${refreshRotation + 1}`,
        expires_in: 3600,
        scope: CHATGPT_SCOPES,
        earliest_refresh_at: 1_700_000_100,
      });
    }
    if (url === "https://api.openai.com/v1/models") {
      assert.equal(init.redirect, "error");
      assert.equal(new Headers(init.headers).get("authorization"), `Bearer ${accessToken}`);
      return Response.json({
        models: [
          { slug: "gpt-lifecycle", display_name: "GPT Lifecycle", visibility: "list" },
          { slug: "gpt-hidden", visibility: "hide" },
        ],
      });
    }
    assert.equal(url, "https://api.openai.com/v1/responses");
    return new Response(
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_lifecycle","status":"completed","output":[]}}\n\n',
      { headers: { "content-type": "text/event-stream" } }
    );
  });

  const complete = await send({
    action: "complete-url",
    state: start.state,
    callbackUrl: start.callback({ code: "lifecycle-code", client_id: "oaiapp_lifecycle" }),
  });
  assert.equal(complete.status, 200);
  assert.deepEqual(await complete.json(), { success: true, planAuthorized: true });
  assert.equal(complete.headers.get("cache-control"), "no-store");
  const status = await (await send({ action: "status", state: start.state })).json();
  assert.equal(status.phase, "done");

  // 3. the registration is persisted, encrypted at rest, with the granted scope and timing
  const [saved] = await db.getProviderConnections({ provider: "chatgpt" });
  assert.equal(saved.email, "lifecycle@example.com");
  assert.equal(saved.isActive, true);
  assert.equal(saved.accessToken, "lifecycle-access-1");
  assert.equal(saved.refreshToken, "lifecycle-refresh-1");
  assert.equal(saved.providerSpecificData.subject, "user-lifecycle");
  assert.equal(saved.providerSpecificData.clientId, "oaiapp_lifecycle");
  assert.equal(saved.providerSpecificData.earliestRefreshAt, 1_700_000_000);
  assert.ok(saved.providerSpecificData.scopes.includes(CHATGPT_PLAN_SCOPE));
  const raw = core
    .getDbInstance()
    .prepare("SELECT access_token, refresh_token FROM provider_connections WHERE id = ?")
    .get(saved.id) as { access_token: string; refresh_token: string };
  assert.match(raw.access_token, /^enc:v1:/);
  assert.match(raw.refresh_token, /^enc:v1:/);

  // 4. live discovery ran once, only `visibility: "list"` entries were stored
  assert.equal(calls.filter((c) => c.url === "https://api.openai.com/v1/models").length, 1);
  const synced = await getSyncedAvailableModelsForConnection("chatgpt", String(saved.id));
  assert.deepEqual(
    synced.map((m: { id: string }) => m.id),
    ["gpt-lifecycle"]
  );

  // 5. expired access token → proactive refresh rotates the refresh token and persists it
  await db.updateProviderConnection(saved.id, {
    expiresAt: "2020-01-01T00:00:00Z",
    tokenExpiresAt: "2020-01-01T00:00:00Z",
  });
  const stale = await db.getProviderConnectionById(saved.id);
  const executor = new ChatGptExecutor();
  const result = await executor.execute({
    model: "gpt-lifecycle",
    stream: false,
    body: {
      input: [
        { role: "system", content: "be brief" },
        { role: "user", content: "hello" },
      ],
      temperature: 0.2,
    },
    credentials: { ...stale, connectionId: saved.id },
    onCredentialsRefreshed: async (patch: Record<string, unknown>) => {
      await db.updateProviderConnection(saved.id, patch);
    },
  });
  const response = result instanceof Response ? result : result.response;
  assert.equal(response.status, 200);
  assert.match(await response.text(), /response\.completed/);
  assert.equal(refreshRotation, 1);
  const rotated = await db.getProviderConnectionById(saved.id);
  assert.equal(rotated.refreshToken, "lifecycle-refresh-2");
  assert.equal(rotated.accessToken, "lifecycle-access-2");
  assert.equal(rotated.providerSpecificData.earliestRefreshAt, 1_700_000_100);
  assert.equal(rotated.providerSpecificData.clientId, "oaiapp_lifecycle", "registration kept");
  assert.ok(Date.parse(rotated.expiresAt) > Date.now());

  // 6. exactly one inference request, with the documented headers and sanitized body
  const inference = calls.filter((c) => c.url === "https://api.openai.com/v1/responses");
  assert.equal(inference.length, 1);
  const headers = new Headers(inference[0].init.headers);
  assert.equal(headers.get("authorization"), "Bearer lifecycle-access-2");
  assert.equal(headers.get("content-type"), "application/json");
  assert.equal(headers.get("accept"), "text/event-stream");
  const sent = JSON.parse(String(inference[0].init.body));
  assert.equal(sent.model, "gpt-lifecycle");
  assert.equal(sent.store, false);
  assert.equal(sent.stream, true);
  assert.equal("temperature" in sent, false);
  assert.deepEqual(sent.input, [
    { role: "developer", content: "be brief" },
    { role: "user", content: "hello" },
  ]);
});

test("SIWC failure paths answer with sanitized buildErrorBody errors and never leak upstream text", async (t) => {
  // (a) token endpoint rejects the code; its body carries a secret that must not surface
  const rejected = await startSignIn();
  t.mock.method(globalThis, "fetch", async (input: string | URL) => {
    if (String(input).endsWith("/jwks.json")) return Response.json(jwksBody);
    return Response.json(
      { error: "invalid_grant", error_description: "SECRET-TOKEN-BODY at /srv/auth/x.js" },
      { status: 400 }
    );
  });
  const callbackUrl = rejected.callback({ code: "bad-code", client_id: "oaiapp_failures" });
  const first = await send({ action: "complete-url", state: rejected.state, callbackUrl });
  assert.equal(first.status, 400);
  const firstBody = await first.json();
  assertSafeError(firstBody);
  assert.equal(firstBody.error.type, "invalid_request_error");
  assert.equal(
    (await (await send({ action: "status", state: rejected.state })).json()).phase,
    "failed"
  );
  // the attempt was consumed before the exchange → replay is refused, not re-sent upstream
  const replay = await send({ action: "complete-url", state: rejected.state, callbackUrl });
  assert.equal(replay.status, 400);
  assertSafeError(await replay.json());

  // (b) ID token minted for another client: signature is fine, audience is not
  const wrongAud = await startSignIn();
  t.mock.method(globalThis, "fetch", async (input: string | URL) => {
    if (String(input).endsWith("/jwks.json")) return Response.json(jwksBody);
    return Response.json({
      access_token: "should-not-persist",
      refresh_token: "should-not-persist-refresh",
      id_token: await signIdToken({ nonce: wrongAud.nonce, aud: "oaiapp_someone_else", sub: "u" }),
      token_type: "Bearer",
      expires_in: 3600,
      scope: CHATGPT_SCOPES,
    });
  });
  const audience = await send({
    action: "complete-url",
    state: wrongAud.state,
    callbackUrl: wrongAud.callback({ code: "c", client_id: "oaiapp_failures" }),
  });
  assert.equal(audience.status, 400);
  assertSafeError(await audience.json());
  assert.equal(
    (await db.getProviderConnections({ provider: "chatgpt" })).some(
      (c: { accessToken?: string }) => c.accessToken === "should-not-persist"
    ),
    false
  );

  // (c) grant without the plan scope: connected but inactive, and no model call is made
  const noPlan = await startSignIn();
  let modelCalls = 0;
  t.mock.method(globalThis, "fetch", async (input: string | URL) => {
    const url = String(input);
    if (url.endsWith("/jwks.json")) return Response.json(jwksBody);
    if (url === "https://api.openai.com/v1/models") modelCalls++;
    return Response.json({
      access_token: "noplan-access",
      refresh_token: "noplan-refresh",
      id_token: await signIdToken({ nonce: noPlan.nonce, aud: "oaiapp_noplan", sub: "noplan" }),
      token_type: "Bearer",
      expires_in: 3600,
      scope: "openid profile email offline_access",
    });
  });
  const downgraded = await send({
    action: "complete-url",
    state: noPlan.state,
    callbackUrl: noPlan.callback({ code: "c", client_id: "oaiapp_noplan" }),
  });
  assert.equal(downgraded.status, 200);
  const downgradedBody = await downgraded.json();
  assert.equal(downgradedBody.planAuthorized, false);
  assert.match(downgradedBody.warning, /plan usage/i);
  assert.equal(modelCalls, 0);
  const inactive = (await db.getProviderConnections({ provider: "chatgpt" })).find(
    (c: { accessToken?: string }) => c.accessToken === "noplan-access"
  );
  assert.equal(inactive.isActive, false);
  assert.equal(inactive.testStatus, "unavailable");

  // (d) catalog 401 → re-auth required, with a literal message (no upstream body)
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Discovery 401",
    accessToken: "discovery-access",
    refreshToken: "discovery-refresh",
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "discovery-user",
      clientId: "oaiapp_discovery",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  });
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ error: "SECRET-CATALOG-BODY" }, { status: 401 })
  );
  await assert.rejects(discoverChatGptModels(connection), (error: unknown) => {
    assert.ok(error instanceof ChatGptDiscoveryError);
    assert.equal(error.status, 401);
    assert.equal(error.requiresReauth, true);
    assert.ok(!error.message.includes("SECRET"));
    return true;
  });

  // (e) refresh token revoked → executor answers 401 with a literal buildErrorBody message
  const revoked = await new ChatGptExecutor().execute({
    model: "gpt-lifecycle",
    stream: true,
    body: { input: "hi" },
    credentials: {
      accessToken: "old",
      refreshToken: "revoked-refresh",
      expiresAt: "2020-01-01T00:00:00Z",
      providerSpecificData: { clientId: "oaiapp_revoked", scopes: [CHATGPT_PLAN_SCOPE] },
    },
  });
  assert.ok(revoked instanceof Response);
  assert.equal(revoked.status, 401);
  const revokedBody = await revoked.json();
  assertSafeError(revokedBody);
  assert.match(revokedBody.error.message, /sign in again/i);
});

test("models route serves the live ChatGPT catalog and hides upstream failure detail", async (t) => {
  const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
  const connection = await db.createProviderConnection({
    provider: "chatgpt",
    authType: "oauth",
    name: "Models route",
    accessToken: "route-access",
    refreshToken: "route-refresh",
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    providerSpecificData: {
      issuer: "https://auth.openai.com",
      subject: "route-user",
      clientId: "oaiapp_route",
      scopes: [CHATGPT_PLAN_SCOPE],
    },
  });
  const request = () =>
    new Request(`${ORIGIN}/api/providers/${connection.id}/models`, {
      headers: { host: "router.example" },
    });
  const context = { params: Promise.resolve({ id: String(connection.id) }) };
  let status = 200;
  t.mock.method(globalThis, "fetch", async (input: string | URL, init: RequestInit = {}) => {
    assert.equal(String(input), "https://api.openai.com/v1/models");
    assert.equal(new Headers(init.headers).get("authorization"), "Bearer route-access");
    return status === 200
      ? Response.json({ models: [{ slug: "gpt-route", visibility: "list" }] })
      : Response.json({ error: "SECRET-CATALOG-BODY" }, { status });
  });
  const ok = await GET(request(), context);
  assert.equal(ok.status, 200);
  const body = await ok.json();
  assert.equal(body.source, "api");
  assert.deepEqual(
    body.models.map((m: { id: string }) => m.id),
    ["gpt-route"]
  );
  status = 401;
  const failed = await GET(request(), context);
  assert.equal(failed.status, 503);
  const failure = await failed.json();
  assertSafeError(failure);
  assert.match(failure.error.message, /live catalog unavailable/i);
});
