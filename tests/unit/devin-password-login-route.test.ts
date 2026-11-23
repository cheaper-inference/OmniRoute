/**
 * `POST /api/oauth/devin-desktop/password-login` — the Devin Auth password flow.
 *
 * The route relays a real account password to Windsurf, so this file pins the two
 * things that must never regress:
 *   1. Input validation happens before any outbound request, and a rejected body
 *      never reaches the network.
 *   2. The password is forwarded once in the login frame and is present in
 *      NOTHING else — not the response body, not the persisted connection, not
 *      the returned providerSpecificData.
 *
 * The upstream chain itself (proto codec, 5-call sequence) is covered by
 * tests/unit/devin-auth.test.ts; here fetch is stubbed so the assertions stay
 * about the route contract.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-devin-password-login-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "devin-password-login-api-key-secret";
process.env.JWT_SECRET = "devin-password-login-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { SignJWT } = await import("jose");
const actionRoute = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const { encodeProtoString } = await import("../../src/lib/oauth/devinAuth.ts");

const PASSWORD = "correct-horse-battery-staple";
const EMAIL = "operator@example.com";
const AUTH1 = "auth1_long_lived_credential_value";
const SESSION = "devin-session-token$session_value";
const OTT = "ott$one_time_token_value";
const IDE = "ide-token-value";

await updateSettings({ requireLogin: true, password: "configured-password-hash" });

const originalFetch = globalThis.fetch;
let outbound: Array<{ url: string; init: RequestInit }> = [];

/**
 * Minimal stand-in for the 5-call Devin Auth chain. Each response is a proto blob
 * shaped like the real payloads (see tests/unit/devin-auth.test.ts).
 */
function installUpstreamStub() {
  outbound = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);
    outbound.push({ url, init: init ?? {} });

    if (url.endsWith("/_devin-auth/password/login")) {
      return Response.json({ auth1_token: AUTH1 });
    }
    if (url.endsWith("/WindsurfPostAuth")) {
      return new Response(
        concat([
          encodeProtoString(2, SESSION),
          encodeProtoString(3, AUTH1),
          encodeProtoString(4, "account-1"),
          encodeProtoString(5, "org-1"),
        ])
      );
    }
    if (url.endsWith("/GetOneTimeAuthToken")) {
      return new Response(encodeProtoString(1, OTT));
    }
    if (url.includes("RegisterUser")) {
      return new Response(
        concat([
          encodeProtoString(1, "user-1"),
          new TextEncoder().encode(`devin-session-token$${IDE}`),
        ])
      );
    }
    if (url.includes("GetCurrentUser")) {
      return new Response(concat([encodeProtoString(1, "user-1")]));
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + part.byteLength, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.byteLength;
  }
  return out;
}

test.beforeEach(() => {
  installUpstreamStub();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function request(body: unknown, cookie?: string) {
  return new Request("http://omniroute.example/api/oauth/devin-desktop/password-login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });
}

/** The action requires management auth, so sign a dashboard session like the UI does. */
async function dashboardCookie(): Promise<string> {
  const jwt = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return `auth_token=${jwt}`;
}

function params(provider = "devin-desktop", action = "password-login") {
  return { params: Promise.resolve({ provider, action }) };
}

async function call(body: unknown) {
  return actionRoute.POST(request(body, await dashboardCookie()), params());
}

test("rejects a body without an email before any outbound request", async () => {
  const res = await call({ password: PASSWORD });
  assert.equal(res.status, 400);
  assert.deepEqual(outbound, [], "validation must precede the network");
  assert.doesNotMatch(await res.text(), new RegExp(PASSWORD));
});

test("rejects a body without a password before any outbound request", async () => {
  const res = await call({ email: EMAIL });
  assert.equal(res.status, 400);
  assert.deepEqual(outbound, []);
});

test("rejects a non-string email or password instead of coercing it", async () => {
  for (const body of [
    { email: 42, password: PASSWORD },
    { email: EMAIL, password: { toString: () => PASSWORD } },
    { email: "   ", password: PASSWORD },
  ]) {
    const res = await call(body);
    assert.equal(res.status, 400, `expected 400 for ${JSON.stringify(body)}`);
  }
  assert.deepEqual(outbound, []);
});

test("refuses the action for a provider that does not support password login", async () => {
  const res = await actionRoute.POST(
    request({ email: EMAIL, password: PASSWORD }, await dashboardCookie()),
    params("devin-cli")
  );
  assert.equal(res.status, 400);
  assert.deepEqual(outbound, []);
});

test("signs in, persists the refresh credential, and never returns the password", async () => {
  const before = await providersDb.getProviderConnections({ provider: "devin-desktop" });

  const res = await call({ email: EMAIL, password: PASSWORD });
  const text = await res.text();
  assert.equal(res.status, 200, `route answered ${res.status}: ${text}`);
  assert.doesNotMatch(text, new RegExp(PASSWORD), "the password must never be echoed");

  const after = await providersDb.getProviderConnections({ provider: "devin-desktop" });
  assert.equal(after.length, before.length + 1, "a connection must be created");

  const created = after.find((row) => !before.some((old) => old.id === row.id));
  assert.ok(created, "the new connection must be findable");
  assert.equal(created.provider, "devin-desktop");

  // The long-lived credential IS persisted — that is what makes refresh work.
  const persisted = await providersDb.getProviderConnectionById(created.id);
  const specific = (persisted?.providerSpecificData ?? {}) as Record<string, unknown>;
  assert.equal(specific.devinAuth1Token, AUTH1);

  // ...but the password is not, anywhere.
  assert.doesNotMatch(JSON.stringify(persisted), new RegExp(PASSWORD));
});

test("sends the password exactly once, in the login frame only", async () => {
  await call({ email: EMAIL, password: PASSWORD });

  const carriers = outbound.filter((call) => {
    const body = call.init.body;
    const text =
      typeof body === "string"
        ? body
        : body instanceof Uint8Array
          ? new TextDecoder().decode(body)
          : JSON.stringify(body ?? "").length > 0
            ? "[binary]"
            : "";
    const headerText = JSON.stringify(call.init.headers ?? {});
    return text.includes(PASSWORD) || headerText.includes(PASSWORD);
  });

  assert.equal(carriers.length, 1, "the password must appear in exactly one request");
  assert.match(carriers[0].url, /password\/login$/, "and it must be the login call");
});

test("signing in again updates the same connection instead of duplicating it", async () => {
  const first = await call({ email: EMAIL, password: PASSWORD });
  assert.equal(first.status, 200);
  const firstBody = (await first.json()) as { connection: { id: string } };
  const firstId = firstBody.connection.id;

  const countAfterFirst = (await providersDb.getProviderConnections({ provider: "devin-desktop" }))
    .length;

  // A re-auth from the dashboard passes the connection it is refreshing.
  const second = await call({ email: EMAIL, password: PASSWORD, connectionId: firstId });
  assert.equal(second.status, 200);
  const secondBody = (await second.json()) as { connection: { id: string } };
  assert.equal(secondBody.connection.id, firstId, "re-auth must land on the existing row");

  const countAfterSecond = (await providersDb.getProviderConnections({ provider: "devin-desktop" }))
    .length;
  assert.equal(countAfterSecond, countAfterFirst, "no duplicate connection may be created");
});

test("maps a rejected password to 401 without leaking the upstream body", async () => {
  let upstreamCalls = 0;
  globalThis.fetch = (async () => {
    upstreamCalls += 1;
    return new Response(JSON.stringify({ message: "invalid password for operator@example.com" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const res = await call({ email: EMAIL, password: PASSWORD });
  assert.equal(res.status, 401);
  assert.ok(upstreamCalls > 0, "the 401 must come from the upstream, not from local auth");

  const text = await res.text();
  assert.doesNotMatch(text, new RegExp(PASSWORD));
  assert.doesNotMatch(text, /invalid password for/, "upstream text must not be relayed verbatim");
});
