/**
 * #7785 — Auth policy inconsistency on /v1/embeddings and /v1/web/fetch.
 *
 * When REQUIRE_API_KEY=false, all client APIs should allow anonymous access.
 * However, embeddings and web-fetch routes still returned 401 for invalid
 * presented keys because the invalid-key check was NOT gated on
 * isRequireApiKeyEnabled() — unlike the combos route pattern.
 *
 * Fix: gate the route-local invalid-key check on isRequireApiKeyEnabled() in
 * both route files, matching the /api/v1/combos pattern.
 *
 * These tests verify:
 * 1. REQUIRE_API_KEY=false + invalid bearer key → NOT 401 (anonymous access)
 * 2. REQUIRE_API_KEY=true  + invalid bearer key → 401 (auth enforced)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-auth-policy-7785-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "auth-7785-api-secret";
process.env.JWT_SECRET = "auth-7785-jwt-secret";

// Ensure no env-var API key interferes with isValidApiKey results.
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const { createProviderNode } = await import("../../src/lib/db/providers/nodes.ts");
const { POST: embeddingsPOST } = await import("../../src/app/api/v1/embeddings/route.ts");
const { POST: webFetchPOST } = await import("../../src/app/api/v1/web/fetch/route.ts");

const { POST: webMapPOST } = await import("../../src/app/api/v1/web/map/route.ts");
const { POST: inputTokensPOST } =
  await import("../../src/app/api/v1/responses/input_tokens/route.ts");
const { POST: improvePromptPOST } =
  await import("../../src/app/api/playground/improve-prompt/route.ts");
const { mintDashboardSessionToken, DASHBOARD_SESSION_COOKIE } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const { WEB_FETCH_URL_MAX_LENGTH } = await import("../../src/shared/constants/formLimits.ts");
const { v1WebFetchSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");

const validSessionCookie = `${DASHBOARD_SESSION_COOKIE}=${await mintDashboardSessionToken(
  new TextEncoder().encode(process.env.JWT_SECRET)
)}`;
// Same shape, signed with a secret the server does not hold: what an external caller can mint.
const forgedSessionCookie = `${DASHBOARD_SESSION_COOKIE}=${await mintDashboardSessionToken(
  new TextEncoder().encode("not-the-server-secret")
)}`;

const INVALID_BEARER = "Bearer sk-invalid-key-that-does-not-exist-7785";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function embeddingsRequest(): Request {
  return new Request("http://localhost/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: INVALID_BEARER,
    },
    body: JSON.stringify({ model: "lanembed7785/nomic-embed-text", input: "hello" }),
  });
}

function webFetchRequest(): Request {
  return new Request("http://localhost/v1/web/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: INVALID_BEARER,
    },
    body: JSON.stringify({ url: "https://example.com" }),
  });
}

// ── Embeddings route ──────────────────────────────────────────────────────

test("#7785 embeddings: REQUIRE_API_KEY=false + invalid key → not 401", async () => {
  process.env.REQUIRE_API_KEY = "false";

  await createProviderNode({
    type: "openai-compatible-embeddings",
    name: "LAN Embed 7785",
    prefix: "lanembed7785",
    apiType: "embeddings",
    baseUrl: "http://10.10.0.182:11434/v1",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, total_tokens: 3 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const res = await embeddingsPOST(embeddingsRequest(), {});
    assert.notEqual(res.status, 401, "invalid key must NOT cause 401 when REQUIRE_API_KEY=false");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#7785 embeddings: REQUIRE_API_KEY=true + invalid key → 401", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const res = await embeddingsPOST(embeddingsRequest(), {});
  assert.equal(res.status, 401, "invalid key must cause 401 when REQUIRE_API_KEY=true");
});

// ── Web-fetch route ───────────────────────────────────────────────────────

test("#7785 web-fetch: REQUIRE_API_KEY=false + invalid key → not 401", async () => {
  process.env.REQUIRE_API_KEY = "false";

  const res = await webFetchPOST(webFetchRequest());
  assert.notEqual(res.status, 401, "invalid key must NOT cause 401 when REQUIRE_API_KEY=false");
});

test("#7785 web-fetch: REQUIRE_API_KEY=true + invalid key → 401", async () => {
  process.env.REQUIRE_API_KEY = "true";

  const res = await webFetchPOST(webFetchRequest());
  assert.equal(res.status, 401, "invalid key must cause 401 when REQUIRE_API_KEY=true");
});

// ── KEA-9515: the dashboard session on the client routes it already authorises ──
//
// The authz pipeline admits a signed-in dashboard session on these routes
// (clientApiPolicy for /api/v1/*, managementPolicy for /api/playground/*), but each
// handler ran its own REQUIRE_API_KEY gate that only looked for an API key, so the
// Search Tools › Scrape tab (and the other dashboard callers) got 401 "Authentication
// required". A session now passes; a caller with neither a session nor a key, an
// invalid key, or a forged session cookie is still refused while REQUIRE_API_KEY=true.

type Credential = { cookie?: string; authorization?: string };

function routeRequest(pathname: string, body: unknown, cred: Credential): Request {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cred.cookie) headers.cookie = cred.cookie;
  if (cred.authorization) headers.Authorization = cred.authorization;
  return new Request(`http://localhost${pathname}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

/** Upstream stub: embeddings, Firecrawl and the improve-prompt self-loop all answer 200. */
function stubUpstream(seen: Array<{ url: string; authorization: string | null }>) {
  return (async (url: unknown, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    seen.push({ url: String(url), authorization: headers.get("Authorization") });
    return new Response(
      JSON.stringify({
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
        choices: [{ message: { content: "<<PROMPT>>\nimproved" } }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;
}

const SESSION_ROUTES: Array<{
  name: string;
  call: (cred: Credential) => Promise<Response>;
}> = [
  {
    name: "POST /v1/web/fetch",
    call: (cred) =>
      webFetchPOST(routeRequest("/v1/web/fetch", { url: "https://example.com" }, cred)),
  },
  {
    name: "POST /v1/embeddings",
    call: (cred) =>
      embeddingsPOST(
        routeRequest(
          "/v1/embeddings",
          { model: "lanembed7785/nomic-embed-text", input: "hello" },
          cred
        ),
        {}
      ),
  },
  {
    name: "POST /v1/web/map",
    call: (cred) =>
      webMapPOST(routeRequest("/v1/web/map", { url: "https://example.com", limit: 10 }, cred)),
  },
  {
    name: "POST /v1/responses/input_tokens",
    call: (cred) =>
      inputTokensPOST(
        routeRequest("/v1/responses/input_tokens", { model: "gpt-4o", input: "hello" }, cred)
      ),
  },
  {
    name: "POST /api/playground/improve-prompt",
    call: (cred) =>
      improvePromptPOST(
        routeRequest(
          "/api/playground/improve-prompt",
          { prompt: "Hello", model: "gpt-4o-mini" },
          cred
        )
      ),
  },
];

async function withRequireApiKey<T>(run: () => Promise<T>): Promise<T> {
  const originalRequire = process.env.REQUIRE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.REQUIRE_API_KEY = "true";
  globalThis.fetch = stubUpstream([]);
  try {
    return await run();
  } finally {
    globalThis.fetch = originalFetch;
    if (originalRequire === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = originalRequire;
  }
}

for (const route of SESSION_ROUTES) {
  test(`KEA-9515 ${route.name}: REQUIRE_API_KEY=true + dashboard session, no key → not 401`, async () => {
    const res = await withRequireApiKey(() => route.call({ cookie: validSessionCookie }));
    assert.notEqual(res.status, 401, "a signed-in dashboard session must pass the route gate");
  });

  test(`KEA-9515 ${route.name}: REQUIRE_API_KEY=true + no session, no key → 401`, async () => {
    const res = await withRequireApiKey(() => route.call({}));
    assert.equal(res.status, 401);
    const body = (await res.json()) as { error: { message: string } };
    assert.equal(body.error.message, "Authentication required");
  });

  test(`KEA-9515 ${route.name}: REQUIRE_API_KEY=true + forged session cookie → 401`, async () => {
    const res = await withRequireApiKey(() => route.call({ cookie: forgedSessionCookie }));
    assert.equal(res.status, 401, "a cookie not signed with JWT_SECRET is not a session");
  });

  test(`KEA-9515 ${route.name}: REQUIRE_API_KEY=true + invalid key → 401, even next to a session`, async () => {
    const alone = await withRequireApiKey(() => route.call({ authorization: INVALID_BEARER }));
    assert.equal(alone.status, 401);
    const withSession = await withRequireApiKey(() =>
      route.call({ authorization: INVALID_BEARER, cookie: validSessionCookie })
    );
    assert.equal(withSession.status, 401, "a session must not launder an invalid key");
  });
}

test("KEA-9515 improve-prompt: a session caller's self-loop presents the self-loop bearer", async () => {
  const seen: Array<{ url: string; authorization: string | null }> = [];
  const originalRequire = process.env.REQUIRE_API_KEY;
  const originalFetch = globalThis.fetch;
  process.env.REQUIRE_API_KEY = "true";
  globalThis.fetch = stubUpstream(seen);
  try {
    const res = await improvePromptPOST(
      routeRequest(
        "/api/playground/improve-prompt",
        { prompt: "Hello", model: "gpt-4o-mini" },
        { cookie: validSessionCookie }
      )
    );
    assert.equal(res.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalRequire === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = originalRequire;
  }
  const selfLoop = seen.find((call) => call.url.endsWith("/v1/chat/completions"));
  assert.ok(selfLoop, "improve-prompt must call /v1/chat/completions");
  assert.equal(selfLoop.authorization, `Bearer ${resolveSelfLoopBearer()}`);
});

// ── KEA-9515: URL length cap on web fetch / map ──────────────────────────────

const OVERLONG_URL = `https://example.com/${"a".repeat(WEB_FETCH_URL_MAX_LENGTH)}`;

test("KEA-9515 web-fetch: a URL longer than WEB_FETCH_URL_MAX_LENGTH → 400 validation error", async () => {
  assert.equal(WEB_FETCH_URL_MAX_LENGTH, 2000);
  process.env.REQUIRE_API_KEY = "false";
  const res = await webFetchPOST(routeRequest("/v1/web/fetch", { url: OVERLONG_URL }, {}));
  assert.equal(res.status, 400);
  // This route answers every schema failure with the generic validation message.
  const body = (await res.json()) as { error: { message: string } };
  assert.equal(body.error.message, "Invalid request");
  // The refusal comes from the url cap, not from another field.
  const parsed = v1WebFetchSchema.safeParse({ url: OVERLONG_URL });
  assert.equal(parsed.success, false);
  assert.deepEqual(
    parsed.error?.issues.map((issue) => [issue.path.join("."), issue.message]),
    [["url", "url must be at most 2000 characters"]]
  );
  // A URL at the cap is still accepted by the schema.
  const atCap = `https://example.com/${"a".repeat(WEB_FETCH_URL_MAX_LENGTH - "https://example.com/".length)}`;
  assert.equal(atCap.length, WEB_FETCH_URL_MAX_LENGTH);
  assert.equal(v1WebFetchSchema.safeParse({ url: atCap }).success, true);
});

test("KEA-9515 web-map: a URL longer than WEB_FETCH_URL_MAX_LENGTH → 400 validation error", async () => {
  process.env.REQUIRE_API_KEY = "false";
  const res = await webMapPOST(routeRequest("/v1/web/map", { url: OVERLONG_URL, limit: 10 }, {}));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /url/i);
  assert.match(body.error.message, /2000/);
});
