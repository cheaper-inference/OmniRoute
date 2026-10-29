/**
 * CLIProxyAPI management compatibility (/v0/management/{auth-files,api-call,reset-quota}).
 *
 * Clients written for a CLIProxyAPI hub (T3 Code's `cliproxy` usage-limit source) read
 * Claude/Codex subscription usage through these three endpoints. OmniRoute answers them from
 * its own OAuth connections. The security contract under test:
 *   - management auth always (manage-scope key or dashboard session), even with login off;
 *   - auth-files never carries a token;
 *   - api-call is an allowlist of four (provider, method, URL) combos, not a proxy: caller
 *     Authorization is ignored, headers are rebuilt from an allowlist, the token is injected
 *     server-side, and nothing else reaches the network;
 *   - reset-quota lifts the local cooldown of a known account and 404s otherwise.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cliproxy-compat-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "cliproxy-compat-api-key-secret";
process.env.JWT_SECRET = "cliproxy-compat-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { getCredentialRefreshExecutor } = await import("../../open-sse/executors/credential.ts");
const authFilesRoute = await import("../../src/app/api/v0/management/auth-files/route.ts");
const apiCallRoute = await import("../../src/app/api/v0/management/api-call/route.ts");
const resetQuotaRoute = await import("../../src/app/api/v0/management/reset-quota/route.ts");

const BASE = "http://localhost:20128/v0/management";
const CODEX_USAGE_URL = "https://chatgpt.com/backend-api/wham/usage";
const CODEX_CREDITS_URL = "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits";
const CODEX_CONSUME_URL = `${CODEX_CREDITS_URL}/consume`;
const CLAUDE_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const originalFetch = globalThis.fetch;

// Login disabled on purpose: the compat routes must still require a credential.
await updateSettings({ requireLogin: false });
const manageKey = await apiKeysDb.createApiKey("t3-management", "machine-cliproxy", ["manage"]);
const clientKey = await apiKeysDb.createApiKey("t3-client", "machine-cliproxy", []);

type UpstreamCall = { url: string; method: string; headers: Headers; body: string | null };
let upstreamCalls: UpstreamCall[] = [];

function mockUpstream(respond: (call: UpstreamCall) => Response) {
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const call: UpstreamCall = {
      url: String(input),
      method: String(init.method ?? "GET"),
      headers: new Headers(init.headers),
      body: typeof init.body === "string" ? init.body : null,
    };
    upstreamCalls.push(call);
    return respond(call);
  }) as typeof fetch;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test.beforeEach(() => {
  upstreamCalls = [];
  accountFallback.clearAllModelLockouts();
  mockUpstream(() => new Response("unexpected upstream call", { status: 599 }));
});

test.after(() => {
  globalThis.fetch = originalFetch;
  accountFallback.clearAllModelLockouts();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function request(
  pathName: string,
  opts: { method?: string; key?: string | null; body?: unknown } = {}
): Request {
  const headers: Record<string, string> = { "content-type": "application/json" };
  const key = opts.key === undefined ? manageKey.key : opts.key;
  if (key) headers.authorization = `Bearer ${key}`;
  return new Request(`${BASE}/${pathName}`, {
    method: opts.method ?? (opts.body === undefined ? "GET" : "POST"),
    headers,
    ...(opts.body === undefined ? {} : { body: JSON.stringify(opts.body) }),
  });
}

let seq = 0;
async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  seq += 1;
  return (await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    name: `${provider}-${seq}`,
    email: `${provider}-${seq}@example.test`,
    accessToken: `${provider}-access-token-${seq}`,
    refreshToken: `${provider}-refresh-token-${seq}`,
    isActive: true,
    testStatus: "active",
    ...overrides,
  })) as { id: string; email: string; accessToken: string; refreshToken: string };
}

function apiCall(body: Record<string, unknown>, key?: string | null) {
  return apiCallRoute.POST(request("api-call", { body, key }));
}

// ── Auth ──────────────────────────────────────────────────────────────────────

test("every compat route rejects anonymous callers and client keys, even with login disabled", async () => {
  const codex = await seedConnection("codex");
  const calls: Array<[string, (key: string | null) => Promise<Response>]> = [
    ["auth-files", (key) => authFilesRoute.GET(request("auth-files", { key }))],
    [
      "api-call",
      (key) => apiCall({ auth_index: codex.id, method: "GET", url: CODEX_USAGE_URL }, key),
    ],
    [
      "reset-quota",
      (key) =>
        resetQuotaRoute.POST(request("reset-quota", { key, body: { auth_index: codex.id } })),
    ],
  ];
  for (const [name, call] of calls) {
    assert.equal((await call(null)).status, 401, `${name}: anonymous must get 401`);
    assert.equal((await call(clientKey.key)).status, 403, `${name}: client key must get 403`);
    assert.equal((await call("sk-not-a-real-key")).status, 401, `${name}: bogus key → 401`);
  }
  assert.equal(upstreamCalls.length, 0, "a rejected caller must never reach the upstream");
});

test("a manage-scoped API key is accepted as the management key", async () => {
  const response = await authFilesRoute.GET(request("auth-files"));
  assert.equal(response.status, 200);
});

// ── auth-files ───────────────────────────────────────────────────────────────

test("auth-files lists Claude/Codex OAuth connections with CLIProxyAPI shape and no tokens", async () => {
  const claude = await seedConnection("claude");
  const codex = await seedConnection("codex", {
    isActive: false,
    providerSpecificData: { workspaceId: "ws-team-1", workspacePlanType: "team" },
  });
  const imported = await seedConnection("codex", {
    providerSpecificData: { workspaceId: "ws-plus-2", chatgptPlanType: "plus" },
  });
  const apiKeyAnthropic = (await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "anthropic-key",
    apiKey: "sk-ant-should-not-appear",
  })) as { id: string };

  const response = await authFilesRoute.GET(request("auth-files"));
  assert.equal(response.status, 200);
  const raw = await response.text();
  const { files } = JSON.parse(raw) as { files: Array<Record<string, unknown>> };

  const byId = new Map(files.map((f) => [f.id, f]));
  assert.equal(byId.has(apiKeyAnthropic.id), false, "the anthropic API-key provider is not listed");
  assert.deepEqual(byId.get(claude.id), {
    id: claude.id,
    auth_index: claude.id,
    provider: "claude",
    email: claude.email,
    disabled: false,
  });
  assert.deepEqual(byId.get(codex.id)?.id_token, {
    chatgpt_account_id: "ws-team-1",
    chatgpt_plan_type: "team",
    plan_type: "team",
  });
  assert.equal(byId.get(codex.id)?.disabled, true, "inactive connection → disabled");
  assert.equal(byId.get(codex.id)?.provider, "codex");
  assert.deepEqual(byId.get(imported.id)?.id_token, {
    chatgpt_account_id: "ws-plus-2",
    chatgpt_plan_type: "plus",
    plan_type: "plus",
  });

  for (const secret of [
    claude.accessToken,
    claude.refreshToken,
    codex.accessToken,
    codex.refreshToken,
    "sk-ant-should-not-appear",
  ]) {
    assert.equal(raw.includes(secret), false, "auth-files must never carry a credential");
  }
  for (const file of files) {
    for (const key of ["access_token", "refresh_token", "accessToken", "refreshToken"]) {
      assert.equal(key in file, false);
    }
  }
});

// ── api-call allowlist ───────────────────────────────────────────────────────

test("api-call refuses anything outside the four allowlisted combos without calling upstream", async () => {
  const codex = await seedConnection("codex");
  const claude = await seedConnection("claude");
  const refused: Array<Record<string, unknown>> = [
    { auth_index: codex.id, method: "GET", url: "https://evil.example/steal" },
    { auth_index: codex.id, method: "GET", url: "https://chatgpt.com/backend-api/me" },
    { auth_index: codex.id, method: "POST", url: CODEX_USAGE_URL },
    { auth_index: codex.id, method: "GET", url: CODEX_CONSUME_URL },
    { auth_index: codex.id, method: "GET", url: `${CODEX_USAGE_URL}?x=1` },
    {
      auth_index: codex.id,
      method: "GET",
      url: "https://user:pw@chatgpt.com/backend-api/wham/usage",
    },
    { auth_index: codex.id, method: "GET", url: "http://chatgpt.com/backend-api/wham/usage" },
    // Right URL, wrong provider for the account.
    { auth_index: codex.id, method: "GET", url: CLAUDE_USAGE_URL },
    { auth_index: claude.id, method: "GET", url: CODEX_USAGE_URL },
  ];
  for (const body of refused) {
    const response = await apiCall(body);
    assert.equal(response.status, 403, `expected 403 for ${body.method} ${body.url}`);
    const payload = (await response.json()) as { code: string; error: string };
    assert.equal(payload.code, "api_call_not_allowed");
    assert.equal(JSON.stringify(payload).includes("token"), false);
  }

  const badMethod = await apiCall({ auth_index: codex.id, method: "DELETE", url: CODEX_USAGE_URL });
  assert.equal(badMethod.status, 400);
  assert.equal(upstreamCalls.length, 0, "no refused call may reach the network");
});

test("api-call 404s an unknown auth_index or a non-OAuth/non-compat connection", async () => {
  const anthropicKey = (await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "anthropic-key-2",
    apiKey: "sk-ant-other",
  })) as { id: string };
  for (const auth_index of ["does-not-exist", anthropicKey.id]) {
    const response = await apiCall({ auth_index, method: "GET", url: CLAUDE_USAGE_URL });
    assert.equal(response.status, 404);
  }
  assert.equal(upstreamCalls.length, 0);
});

// ── api-call header handling ─────────────────────────────────────────────────

test("api-call injects the token server-side and ignores caller Authorization and stray headers", async () => {
  const codex = await seedConnection("codex", {
    providerSpecificData: { workspaceId: "ws-fallback-9" },
  });
  mockUpstream(() => jsonResponse({ plan_type: "plus", rate_limit: {} }));

  const response = await apiCall({
    auth_index: codex.id,
    method: "GET",
    url: CODEX_USAGE_URL,
    header: {
      Authorization: "Bearer attacker-supplied",
      "Content-Type": "application/json",
      "OpenAI-Beta": "codex-1",
      Originator: "Codex Desktop",
      Cookie: "session=steal",
      Host: "evil.example",
      "X-Forward-Token": "$TOKEN$",
    },
  });
  assert.equal(response.status, 200);
  const raw = await response.text();
  const payload = JSON.parse(raw) as { status_code: number; body: string };
  assert.equal(payload.status_code, 200);
  assert.deepEqual(JSON.parse(payload.body), { plan_type: "plus", rate_limit: {} });
  assert.equal(raw.includes(codex.accessToken), false, "the token never comes back");

  assert.equal(upstreamCalls.length, 1);
  const [call] = upstreamCalls;
  assert.equal(call.url, CODEX_USAGE_URL);
  assert.equal(call.method, "GET");
  assert.equal(call.headers.get("authorization"), `Bearer ${codex.accessToken}`);
  assert.equal(call.headers.get("openai-beta"), "codex-1");
  assert.equal(call.headers.get("originator"), "Codex Desktop");
  assert.equal(call.headers.get("chatgpt-account-id"), "ws-fallback-9", "workspaceId fallback");
  assert.equal(call.headers.get("cookie"), null);
  assert.equal(call.headers.get("x-forward-token"), null);
  for (const [, value] of call.headers) {
    assert.equal(value.includes("$TOKEN$"), false, "no placeholder leaks upstream");
    assert.equal(value.includes("attacker-supplied"), false);
  }
  assert.equal(call.body, null, "GET carries no body");
});

test("api-call keeps a caller-supplied Chatgpt-Account-Id instead of the workspace fallback", async () => {
  const codex = await seedConnection("codex", {
    providerSpecificData: { workspaceId: "ws-fallback-1" },
  });
  mockUpstream(() => jsonResponse({ credits: [] }));
  const response = await apiCall({
    auth_index: codex.id,
    method: "GET",
    url: CODEX_CREDITS_URL,
    header: { Authorization: "Bearer $TOKEN$", "Chatgpt-Account-Id": "ws-explicit-2" },
  });
  assert.equal(response.status, 200);
  assert.equal(upstreamCalls[0].headers.get("chatgpt-account-id"), "ws-explicit-2");
});

test("api-call forwards the Claude OAuth usage request with anthropic-beta", async () => {
  const claude = await seedConnection("claude");
  mockUpstream(() => jsonResponse({ five_hour: { utilization: 12 } }));
  const response = await apiCall({
    auth_index: claude.id,
    method: "GET",
    url: CLAUDE_USAGE_URL,
    header: { Authorization: "Bearer $TOKEN$", "anthropic-beta": "oauth-2025-04-20" },
  });
  assert.equal(response.status, 200);
  const payload = (await response.json()) as { status_code: number; body: string };
  assert.equal(payload.status_code, 200);
  assert.deepEqual(JSON.parse(payload.body), { five_hour: { utilization: 12 } });
  const [call] = upstreamCalls;
  assert.equal(call.url, CLAUDE_USAGE_URL);
  assert.equal(call.headers.get("authorization"), `Bearer ${claude.accessToken}`);
  assert.equal(call.headers.get("anthropic-beta"), "oauth-2025-04-20");
  assert.equal(call.headers.get("chatgpt-account-id"), null);
});

test("api-call POSTs the reset-credit consume body and relays upstream error statuses", async () => {
  const codex = await seedConnection("codex");
  mockUpstream(() => jsonResponse({ code: "no_credit" }, 409));
  const data = JSON.stringify({ redeem_request_id: "req-1", credit_id: "credit-1" });
  const response = await apiCall({
    auth_index: codex.id,
    method: "POST",
    url: CODEX_CONSUME_URL,
    header: { Authorization: "Bearer $TOKEN$", "Content-Type": "application/json" },
    data,
  });
  assert.equal(response.status, 200, "the envelope is 2xx; the upstream status is inside it");
  const payload = (await response.json()) as { status_code: number; body: string };
  assert.equal(payload.status_code, 409);
  assert.deepEqual(JSON.parse(payload.body), { code: "no_credit" });
  assert.equal(upstreamCalls[0].method, "POST");
  assert.equal(upstreamCalls[0].body, data);

  upstreamCalls = [];
  const invalid = await apiCall({
    auth_index: codex.id,
    method: "POST",
    url: CODEX_CONSUME_URL,
    data: "{not json",
  });
  assert.equal(invalid.status, 400);
  assert.equal(upstreamCalls.length, 0);
});

// The executor's own network refresh is stubbed (same seam as
// provider-limits-force-refresh-imported.test.ts): what is under test is that api-call goes
// through the shared refreshAndUpdateCredentials path, persists the result and uses it.
async function withStubbedCodexRefresh(
  stub: { needsRefresh: () => boolean; refresh: () => Record<string, unknown> | null },
  run: (calls: { count: number }) => Promise<void>
) {
  const exec = await getCredentialRefreshExecutor("codex");
  const origNeeds = exec.needsRefresh;
  const origRefresh = exec.refreshCredentials;
  const calls = { count: 0 };
  exec.needsRefresh = stub.needsRefresh;
  exec.refreshCredentials = async () => {
    calls.count += 1;
    return stub.refresh() as never;
  };
  try {
    await run(calls);
  } finally {
    exec.needsRefresh = origNeeds;
    exec.refreshCredentials = origRefresh;
  }
}

test("api-call refreshes a token near expiry through the shared refresh path and persists it", async () => {
  const codex = await seedConnection("codex");
  mockUpstream(() => jsonResponse({ ok: true }));
  await withStubbedCodexRefresh(
    {
      needsRefresh: () => true,
      refresh: () => ({
        accessToken: "refreshed-access-token",
        refreshToken: "refreshed-refresh-token",
        expiresIn: 3600,
      }),
    },
    async (calls) => {
      const response = await apiCall({ auth_index: codex.id, method: "GET", url: CODEX_USAGE_URL });
      assert.equal(response.status, 200);
      assert.equal((await response.text()).includes("refreshed-access-token"), false);
      assert.equal(calls.count, 1);
    }
  );
  assert.equal(upstreamCalls.length, 1);
  assert.equal(upstreamCalls[0].headers.get("authorization"), "Bearer refreshed-access-token");
  const stored = (await providersDb.getProviderConnectionById(codex.id)) as Record<string, unknown>;
  assert.equal(stored.accessToken, "refreshed-access-token");
  assert.equal(stored.refreshToken, "refreshed-refresh-token");
});

test("api-call force-refreshes once and retries when the upstream answers 401", async () => {
  const codex = await seedConnection("codex");
  mockUpstream((call) =>
    call.headers.get("authorization") === `Bearer ${codex.accessToken}`
      ? jsonResponse({ error: "token expired" }, 401)
      : jsonResponse({ ok: true })
  );
  await withStubbedCodexRefresh(
    {
      needsRefresh: () => false,
      refresh: () => ({ accessToken: "retried-token", expiresIn: 3600 }),
    },
    async (calls) => {
      const response = await apiCall({ auth_index: codex.id, method: "GET", url: CODEX_USAGE_URL });
      const payload = (await response.json()) as { status_code: number };
      assert.equal(payload.status_code, 200);
      assert.equal(calls.count, 1, "exactly one forced refresh");
    }
  );
  assert.deepEqual(
    upstreamCalls.map((c) => c.headers.get("authorization")),
    [`Bearer ${codex.accessToken}`, "Bearer retried-token"]
  );
});

// ── reset-quota ──────────────────────────────────────────────────────────────

test("reset-quota 404s an unknown auth_index and a non-compat connection", async () => {
  const anthropicKey = (await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "anthropic-key-3",
    apiKey: "sk-ant-third",
  })) as { id: string };
  for (const auth_index of ["missing-connection", anthropicKey.id]) {
    const response = await resetQuotaRoute.POST(request("reset-quota", { body: { auth_index } }));
    assert.equal(response.status, 404);
  }
  const invalid = await resetQuotaRoute.POST(request("reset-quota", { body: {} }));
  assert.equal(invalid.status, 400);
});

test("reset-quota lifts the connection cooldown, model lockouts and Codex scope cooldowns", async () => {
  const codex = await seedConnection("codex");
  const until = new Date(Date.now() + 3_600_000).toISOString();
  await providersDb.updateProviderConnection(codex.id, {
    testStatus: "unavailable",
    rateLimitedUntil: until,
    errorCode: 429,
    lastError: "rate limited",
    lastErrorType: "rate_limited",
    backoffLevel: 3,
  });
  await providersDb.updateCodexScopeCooldown(codex.id, "codex", until);
  accountFallback.lockModel("codex", codex.id, "gpt-5.5", "quota_exhausted", 3_600_000);
  const other = await seedConnection("codex");
  accountFallback.lockModel("codex", other.id, "gpt-5.5", "quota_exhausted", 3_600_000);

  const response = await resetQuotaRoute.POST(
    request("reset-quota", { body: { auth_index: codex.id } })
  );
  assert.equal(response.status, 200);
  const payload = (await response.json()) as Record<string, unknown>;
  assert.equal(payload.ok, true);
  assert.equal(payload.auth_index, codex.id);
  assert.equal(payload.cleared, 1);
  assert.equal(payload.lockouts_cleared, 1);

  const stored = (await providersDb.getProviderConnectionById(codex.id)) as Record<string, unknown>;
  assert.equal(stored.rateLimitedUntil ?? null, null);
  assert.equal(stored.testStatus, "active");
  const data = (stored.providerSpecificData ?? {}) as Record<string, Record<string, unknown>>;
  assert.equal(data.codexScopeRateLimitedUntil?.codex, undefined);

  const remaining = accountFallback.getAllModelLockouts();
  assert.equal(
    remaining.some((l) => l.connectionId === codex.id),
    false
  );
  assert.equal(
    remaining.some((l) => l.connectionId === other.id),
    true,
    "another account's lockout is untouched"
  );
  assert.equal(upstreamCalls.length, 0, "reset-quota is local-only");
});

test("reset-quota leaves a terminal (banned) account locked", async () => {
  const banned = await seedConnection("claude", { testStatus: "banned" });
  const response = await resetQuotaRoute.POST(
    request("reset-quota", { body: { auth_index: banned.id } })
  );
  assert.equal(response.status, 200);
  const payload = (await response.json()) as Record<string, unknown>;
  assert.equal(payload.skipped_terminal, 1);
  const stored = (await providersDb.getProviderConnectionById(banned.id)) as Record<
    string,
    unknown
  >;
  assert.equal(stored.testStatus, "banned");
});
