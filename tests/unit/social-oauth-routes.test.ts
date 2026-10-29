import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { verifyDashboardSessionToken } from "../../src/shared/utils/dashboardSessionToken.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-social-auth-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-social-oauth-routes-32chars";

// Dynamic imports matching repo's auth test harness pattern
// @ts-ignore
const core = await import("../../src/lib/db/core.ts");
// @ts-ignore
const { updateSettings } = await import("@/lib/db/settings");
// @ts-ignore
const googleLoginRoute = await import("../../src/app/api/auth/google/login/route.ts");
// @ts-ignore
const googleCallbackRoute = await import("../../src/app/api/auth/google/callback/route.ts");
// @ts-ignore
const githubLoginRoute = await import("../../src/app/api/auth/github/login/route.ts");
// @ts-ignore
const githubCallbackRoute = await import("../../src/app/api/auth/github/callback/route.ts");
// @ts-ignore
const logoutRoute = await import("../../src/app/api/auth/logout/route.ts");

interface CapturedCookie {
  value: string;
  options?: Record<string, unknown>;
}

let capturedCookies: Record<string, CapturedCookie> = {};

/** Simulates the cookies the login route leaves in this browser: the state and the PKCE verifier. */
function startFlow(provider: "google" | "github", state: string, verifier = `${state}-verifier`) {
  capturedCookies[`${provider}_oauth_state`] = { value: state };
  capturedCookies[`${provider}_oauth_pkce_verifier`] = { value: verifier };
}

function makeTestCookieStore() {
  return {
    get(name: string) {
      const c = capturedCookies[name];
      return c ? { value: c.value } : undefined;
    },
    set(name: string, value: string, options?: Record<string, unknown>) {
      capturedCookies[name] = { value, options };
    },
    delete(name: string) {
      delete capturedCookies[name];
    },
  };
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  capturedCookies = {};
}

/** The login redirect carries an S256 challenge of the verifier it left in an httpOnly cookie. */
function assertPkceChallenge(res: Response, authUrl: URL, provider: "google" | "github") {
  const cookie = (res as unknown as { cookies: { get(name: string): unknown } }).cookies.get(
    `${provider}_oauth_pkce_verifier`
  ) as { value: string; httpOnly?: boolean } | undefined;
  assert.ok(cookie?.value, "PKCE verifier cookie must be set");
  assert.equal(cookie.httpOnly, true);
  assert.equal(authUrl.searchParams.get("code_challenge_method"), "S256");
  assert.equal(
    authUrl.searchParams.get("code_challenge"),
    createHash("sha256").update(cookie.value).digest("base64url")
  );
}

test.beforeEach(async () => {
  await resetStorage();
  googleCallbackRoute.googleCallbackInternals.getCookieStore = async () => makeTestCookieStore();
  githubCallbackRoute.githubCallbackInternals.getCookieStore = async () => makeTestCookieStore();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Google Login: returns 400 when not configured", async () => {
  await updateSettings({ googleAuthEnabled: false, googleClientId: "", googleClientSecret: "" });
  const req = new Request("http://localhost/api/auth/google/login");
  const res = await googleLoginRoute.GET(req);
  assert.equal(res.status, 400);
});

test("Google Login: redirects to accounts.google.com with valid params and sets state cookie", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    googleRedirectPath: "/api/auth/google/callback",
    authAllowedEmails: ["admin@company.com"],
  });

  const req = new Request("http://localhost/api/auth/google/login", {
    headers: { "x-forwarded-proto": "https", host: "app.example.com" },
  });
  const res = await googleLoginRoute.GET(req);
  assert.equal(res.status, 307);

  const location = res.headers.get("location");
  assert.ok(location);
  const authUrl = new URL(location);
  assert.equal(authUrl.origin, "https://accounts.google.com");
  assert.equal(authUrl.pathname, "/o/oauth2/v2/auth");
  assert.equal(authUrl.searchParams.get("client_id"), "g-test-client-id");
  assert.equal(
    authUrl.searchParams.get("redirect_uri"),
    "https://app.example.com/api/auth/google/callback"
  );
  assert.equal(authUrl.searchParams.get("response_type"), "code");
  assert.ok(authUrl.searchParams.get("state"));

  const setCookie = res.headers.get("set-cookie");
  assert.ok(setCookie?.includes("google_oauth_state="));
  assertPkceChallenge(res, authUrl, "google");
});

test("Google Callback: rejects missing or mismatched state", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: ["admin@company.com"],
  });

  // Missing state
  const req1 = new Request("http://localhost/api/auth/google/callback?code=123");
  const res1 = await googleCallbackRoute.GET(req1);
  assert.equal(res1.status, 307);
  assert.ok(res1.headers.get("location")?.includes("error=missing_code"));

  // Mismatched state
  startFlow("google", "expected-state-value");
  const req2 = new Request("http://localhost/api/auth/google/callback?code=123&state=wrong-state");
  const res2 = await googleCallbackRoute.GET(req2);
  assert.equal(res2.status, 307);
  assert.ok(res2.headers.get("location")?.includes("error=invalid_state"));
});

test("Google Callback: exchanges code, checks allowlist, and sets auth_token cookie", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: ["allowed@company.com"],
  });

  const stateVal = "correct-test-state-999";
  startFlow("google", stateVal);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const urlStr = typeof input === "string" ? input : input.toString();
    if (urlStr.includes("oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "mock-google-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("googleapis.com/oauth2/v3/userinfo")) {
      return new Response(
        JSON.stringify({
          email: "allowed@company.com",
          email_verified: true,
          name: "Test Admin",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("Not Found", { status: 404 });
  }) as typeof fetch;

  try {
    const req = new Request(
      `http://localhost/api/auth/google/callback?code=auth-code-123&state=${stateVal}`,
      {
        headers: { host: "app.example.com" },
      }
    );
    const res = await googleCallbackRoute.GET(req);
    assert.equal(res.status, 307);
    assert.equal(res.headers.get("location"), "http://app.example.com/dashboard");

    // auth_token session cookie must be set
    const sessionCookie = capturedCookies["auth_token"];
    assert.ok(sessionCookie?.value, "auth_token cookie must be set");

    // Verify minted token passes verifyDashboardSessionToken
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await verifyDashboardSessionToken(sessionCookie.value, secret);
    assert.ok(verified !== null);
    assert.equal(verified.authenticated, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Google Callback: blocks email not in allowlist", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: ["admin@company.com"],
  });

  const stateVal = "correct-test-state-888";
  startFlow("google", stateVal);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const urlStr = typeof input === "string" ? input : input.toString();
    if (urlStr.includes("oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "mock-google-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr.includes("googleapis.com/oauth2/v3/userinfo")) {
      return new Response(
        JSON.stringify({
          email: "intruder@other.com",
          email_verified: true,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("Not Found", { status: 404 });
  }) as typeof fetch;

  try {
    const req = new Request(
      `http://localhost/api/auth/google/callback?code=auth-code-123&state=${stateVal}`
    );
    const res = await googleCallbackRoute.GET(req);
    assert.equal(res.status, 307);
    assert.ok(res.headers.get("location")?.includes("error=unauthorized_email"));
    assert.equal(capturedCookies["auth_token"], undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitHub Login: redirects to github.com/login/oauth/authorize and sets state cookie", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["admin@company.com"],
  });

  const req = new Request("http://localhost/api/auth/github/login", {
    headers: { host: "myhub.test" },
  });
  const res = await githubLoginRoute.GET(req);
  assert.equal(res.status, 307);

  const location = res.headers.get("location");
  assert.ok(location);
  const authUrl = new URL(location);
  assert.equal(authUrl.origin, "https://github.com");
  assert.equal(authUrl.pathname, "/login/oauth/authorize");
  assert.equal(authUrl.searchParams.get("client_id"), "gh-test-client-id");
  assert.equal(
    authUrl.searchParams.get("redirect_uri"),
    "http://myhub.test/api/auth/github/callback"
  );
  assert.ok(authUrl.searchParams.get("state"));

  const setCookie = res.headers.get("set-cookie");
  assert.ok(setCookie?.includes("github_oauth_state="));
  assertPkceChallenge(res, authUrl, "github");
});

test("GitHub Callback: exchanges code, resolves verified email, and mints session", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["github-user@domain.com"],
  });

  const stateVal = "github-state-xyz-777";
  startFlow("github", stateVal);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const urlStr = typeof input === "string" ? input : input.toString();
    if (urlStr.includes("github.com/login/oauth/access_token")) {
      return new Response(JSON.stringify({ access_token: "mock-gh-access-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr === "https://api.github.com/user") {
      return new Response(
        JSON.stringify({
          login: "octocat",
          id: 1,
          name: "The Octocat",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (urlStr === "https://api.github.com/user/emails") {
      return new Response(
        JSON.stringify([
          { email: "unverified@domain.com", primary: false, verified: false },
          { email: "github-user@domain.com", primary: true, verified: true },
        ]),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response("Not Found", { status: 404 });
  }) as typeof fetch;

  try {
    const req = new Request(
      `http://localhost/api/auth/github/callback?code=gh-code-456&state=${stateVal}`,
      {
        headers: { host: "myhub.test" },
      }
    );
    const res = await githubCallbackRoute.GET(req);
    assert.equal(res.status, 307);
    assert.equal(res.headers.get("location"), "http://myhub.test/dashboard");

    const sessionCookie = capturedCookies["auth_token"];
    assert.ok(sessionCookie?.value, "auth_token cookie must be set");

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const verified = await verifyDashboardSessionToken(sessionCookie.value, secret);
    assert.ok(verified !== null);
    assert.equal(verified.authenticated, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Google Login: 400 when credentials exist but no allowlist is configured (deny-by-default)", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: [],
  });
  const res = await googleLoginRoute.GET(new Request("http://localhost/api/auth/google/login"));
  assert.equal(res.status, 400);
  assert.equal(res.headers.get("set-cookie"), null);
});

test("GitHub Login: 400 when credentials exist but no allowlist is configured (deny-by-default)", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["*"],
  });
  const res = await githubLoginRoute.GET(new Request("http://localhost/api/auth/github/login"));
  assert.equal(res.status, 400);
});

test("Login routes build redirect_uri from Host and ignore X-Forwarded-Host", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: ["admin@company.com"],
  });
  const res = await googleLoginRoute.GET(
    new Request("http://localhost/api/auth/google/login", {
      headers: { host: "app.example.com", "x-forwarded-host": "evil.example.net" },
    })
  );
  const authUrl = new URL(res.headers.get("location") as string);
  assert.equal(
    authUrl.searchParams.get("redirect_uri"),
    "http://app.example.com/api/auth/google/callback"
  );
});

test("Login routes return a body without stack traces or raw error text", async () => {
  await updateSettings({ googleAuthEnabled: false, githubAuthEnabled: false });
  for (const route of [googleLoginRoute, githubLoginRoute]) {
    const res = await route.GET(new Request("http://localhost/api/auth/x/login"));
    const text = await res.text();
    assert.equal(res.status, 400);
    assert.ok(!text.includes("at /"), "no stack frames in the body");
    assert.ok(JSON.parse(text).error, "error envelope present");
  }
});

test("Google Callback: an allowlist-less deployment rejects even a verified account", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: [],
  });
  startFlow("google", "state-open-world");
  const res = await googleCallbackRoute.GET(
    new Request("http://localhost/api/auth/google/callback?code=c&state=state-open-world")
  );
  assert.equal(res.status, 307);
  assert.ok(res.headers.get("location")?.includes("error=not_configured"));
  assert.equal(capturedCookies["auth_token"], undefined);
});

function githubFetchMock(opts: {
  profile: Record<string, unknown>;
  emails: unknown;
  emailsStatus?: number;
}) {
  return (async (input: RequestInfo | URL) => {
    const urlStr = typeof input === "string" ? input : input.toString();
    if (urlStr.includes("github.com/login/oauth/access_token")) {
      return new Response(JSON.stringify({ access_token: "mock-gh-access-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (urlStr === "https://api.github.com/user") {
      return new Response(JSON.stringify(opts.profile), { status: 200 });
    }
    if (urlStr === "https://api.github.com/user/emails") {
      return new Response(JSON.stringify(opts.emails), { status: opts.emailsStatus ?? 200 });
    }
    return new Response("Not Found", { status: 404 });
  }) as typeof fetch;
}

async function runGithubCallback(fetchMock: typeof fetch, stateVal: string, seedFlow = true) {
  if (seedFlow) startFlow("github", stateVal);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchMock;
  try {
    return await githubCallbackRoute.GET(
      new Request(`http://localhost/api/auth/github/callback?code=c&state=${stateVal}`, {
        headers: { host: "myhub.test", "x-forwarded-host": "evil.example.net" },
      })
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("GitHub Callback: does not fall back to the unverified public profile e-mail", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["victim@company.com"],
  });
  // /user/emails fails, the public profile claims an allowlisted address (unverified).
  const res = await runGithubCallback(
    githubFetchMock({
      profile: { login: "attacker", email: "victim@company.com" },
      emails: { message: "forbidden" },
      emailsStatus: 403,
    }),
    "gh-state-profile-fallback"
  );
  assert.equal(res.status, 307);
  assert.ok(res.headers.get("location")?.includes("error=email_not_verified"));
  assert.equal(capturedCookies["auth_token"], undefined);
});

test("GitHub Callback: only a verified e-mail counts, and redirects stay on Host", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["victim@company.com"],
  });
  const res = await runGithubCallback(
    githubFetchMock({
      profile: { login: "attacker" },
      emails: [{ email: "victim@company.com", primary: true, verified: false }],
    }),
    "gh-state-unverified"
  );
  assert.equal(res.status, 307);
  const location = res.headers.get("location") as string;
  assert.ok(location.includes("error=email_not_verified"));
  assert.equal(new URL(location).host, "myhub.test", "X-Forwarded-Host must not steer redirects");
  assert.equal(capturedCookies["auth_token"], undefined);
});

test("GitHub Callback: username allowlist entry admits that login (verified e-mail still required)", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["octocat"],
  });
  const res = await runGithubCallback(
    githubFetchMock({
      profile: { login: "octocat" },
      emails: [{ email: "octo@elsewhere.dev", primary: true, verified: true }],
    }),
    "gh-state-username"
  );
  assert.equal(res.headers.get("location"), "http://myhub.test/dashboard");
  assert.ok(capturedCookies["auth_token"]?.value);
});

test("GitHub Callback: a domain entry is not satisfied by a GitHub username", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["@corp.local"],
  });
  const res = await runGithubCallback(
    githubFetchMock({
      profile: { login: "corp.local" },
      emails: [{ email: "x@other.dev", primary: true, verified: true }],
    }),
    "gh-state-domain"
  );
  assert.ok(res.headers.get("location")?.includes("error=unauthorized_email"));
  assert.equal(capturedCookies["auth_token"], undefined);
});

test("Google Callback: token exchange failure redirects with a bare code, never upstream text", async () => {
  await updateSettings({
    googleAuthEnabled: true,
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: ["admin@company.com"],
  });
  startFlow("google", "state-token-fail");

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response("invalid_grant: client_secret g-test-client-secret at /srv/app.js:1", {
      status: 500,
    })) as typeof fetch;
  try {
    const res = await googleCallbackRoute.GET(
      new Request("http://localhost/api/auth/google/callback?code=c&state=state-token-fail")
    );
    const location = res.headers.get("location") as string;
    assert.equal(new URL(location).pathname, "/login");
    assert.equal(new URL(location).searchParams.get("error"), "token_exchange");
    assert.ok(!location.includes("invalid_grant") && !location.includes("g-test-client-secret"));
    assert.equal(capturedCookies["auth_token"], undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Callbacks consume the state cookie: a replayed callback is rejected", async () => {
  await updateSettings({
    githubAuthEnabled: true,
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["octo@elsewhere.dev"],
  });
  const fetchMock = githubFetchMock({
    profile: { login: "octocat" },
    emails: [{ email: "octo@elsewhere.dev", primary: true, verified: true }],
  });
  const first = await runGithubCallback(fetchMock, "gh-state-replay");
  assert.equal(first.headers.get("location"), "http://myhub.test/dashboard");
  assert.equal(capturedCookies["github_oauth_state"]?.value, "", "state cookie must be cleared");

  const replay = await githubCallbackRoute.GET(
    new Request("http://localhost/api/auth/github/callback?code=c&state=gh-state-replay", {
      headers: { host: "myhub.test" },
    })
  );
  assert.ok(replay.headers.get("location")?.includes("error=invalid_state"));
});

// ─── #15153 security review: PKCE, canonical session, domain proof, GitHub id, kill-switch ───

/** Captures every provider call so a test can assert what was (not) sent. */
function recordingFetch(handler: (url: string, init?: RequestInit) => Response) {
  const calls: Array<{ url: string; body: string }> = [];
  const fn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    calls.push({ url, body: typeof init?.body === "string" ? init.body : "" });
    return handler(url, init);
  }) as typeof fetch;
  return { fn, calls };
}

function googleProvider(userinfo: Record<string, unknown>) {
  return recordingFetch((url) => {
    if (url.includes("oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "mock-google-token" }), { status: 200 });
    }
    if (url.includes("googleapis.com/oauth2/v3/userinfo")) {
      return new Response(JSON.stringify(userinfo), { status: 200 });
    }
    return new Response("Not Found", { status: 404 });
  });
}

async function seedGoogle(allowlist: string[], extra: Record<string, unknown> = {}) {
  await updateSettings({
    googleClientId: "g-test-client-id",
    googleClientSecret: "g-test-client-secret",
    authAllowedEmails: allowlist,
    ...extra,
  });
}

async function runGoogleCallback(fetchMock: typeof fetch, stateVal: string) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = fetchMock;
  try {
    return await googleCallbackRoute.GET(
      new Request(`http://localhost/api/auth/google/callback?code=c&state=${stateVal}`, {
        headers: { host: "app.example.com" },
      })
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("PKCE: a callback whose browser holds no verifier is rejected before any provider call", async () => {
  await seedGoogle(["allowed@company.com"]);
  // Code-injection shape: the attacker controls state cookie + param, but has no verifier.
  capturedCookies["google_oauth_state"] = { value: "attacker-state" };
  const provider = googleProvider({ email: "allowed@company.com", email_verified: true });

  const res = await runGoogleCallback(provider.fn, "attacker-state");

  assert.ok(res.headers.get("location")?.includes("error=invalid_state"));
  assert.equal(provider.calls.length, 0, "the stolen code must never be redeemed");
  assert.equal(capturedCookies["auth_token"], undefined);
});

test("PKCE: both token exchanges send the verifier and the flow cookies are single use", async () => {
  await seedGoogle(["allowed@company.com"]);
  startFlow("google", "pkce-google", "google-verifier-123");
  const google = googleProvider({ email: "allowed@company.com", email_verified: true });
  const res = await runGoogleCallback(google.fn, "pkce-google");
  assert.equal(res.headers.get("location"), "http://app.example.com/dashboard");
  const googleToken = google.calls.find((call) => call.url.includes("oauth2.googleapis.com/token"));
  assert.equal(new URLSearchParams(googleToken?.body).get("code_verifier"), "google-verifier-123");
  assert.equal(capturedCookies["google_oauth_pkce_verifier"]?.value, "");

  await updateSettings({
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["octo@elsewhere.dev"],
  });
  const github = recordingFetch((url) => {
    if (url.includes("github.com/login/oauth/access_token")) {
      return new Response(JSON.stringify({ access_token: "mock-gh-access-token" }), {
        status: 200,
      });
    }
    if (url === "https://api.github.com/user") {
      return new Response(JSON.stringify({ login: "octocat", id: 1 }), { status: 200 });
    }
    if (url === "https://api.github.com/user/emails") {
      return new Response(
        JSON.stringify([{ email: "octo@elsewhere.dev", primary: true, verified: true }]),
        { status: 200 }
      );
    }
    return new Response("Not Found", { status: 404 });
  });
  startFlow("github", "pkce-github", "github-verifier-456");
  const ghRes = await runGithubCallback(github.fn, "pkce-github", false);
  assert.equal(ghRes.headers.get("location"), "http://myhub.test/dashboard");
  const ghToken = github.calls.find((call) => call.url.includes("login/oauth/access_token"));
  assert.equal(JSON.parse(ghToken?.body || "{}").code_verifier, "github-verifier-456");
  assert.equal(capturedCookies["github_oauth_pkce_verifier"]?.value, "");
});

test("the social session carries iat + jti: sign-out revokes it on the server", async () => {
  await seedGoogle(["allowed@company.com"]);
  startFlow("google", "state-logout");
  const res = await runGoogleCallback(
    googleProvider({ email: "allowed@company.com", email_verified: true }).fn,
    "state-logout"
  );
  assert.equal(res.headers.get("location"), "http://app.example.com/dashboard");
  const token = capturedCookies["auth_token"]?.value as string;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = await verifyDashboardSessionToken(token, secret);
  assert.equal(typeof payload?.iat, "number");
  assert.equal(typeof payload?.jti, "string");

  const original = logoutRoute.logoutRouteInternals.getCookieStore;
  logoutRoute.logoutRouteInternals.getCookieStore = (async () => ({
    get: (name: string) => (name === "auth_token" ? { value: token } : undefined),
    delete: () => undefined,
  })) as unknown as typeof original;
  try {
    const logout = await logoutRoute.POST(
      new Request("http://localhost/api/auth/logout", { method: "POST" })
    );
    assert.equal(logout.status, 200);
  } finally {
    logoutRoute.logoutRouteInternals.getCookieStore = original;
  }
  assert.equal(await verifyDashboardSessionToken(token, secret), null, "a copy must stop working");
});

test("a social session issued after a password change (sessionsValidAfter) is accepted", async () => {
  await seedGoogle(["allowed@company.com"], {
    sessionsValidAfter: Math.floor(Date.now() / 1000) - 60,
  });
  startFlow("google", "state-after-cutoff");
  await runGoogleCallback(
    googleProvider({ email: "allowed@company.com", email_verified: true }).fn,
    "state-after-cutoff"
  );
  const token = capturedCookies["auth_token"]?.value as string;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  assert.ok(await verifyDashboardSessionToken(token, secret), "must not be born ended");
});

test("Google domain entries need the Workspace hd claim of that domain", async () => {
  await seedGoogle(["@corp.com"]);
  const cases = [
    ["consumer account, no hd", { email: "ex@corp.com", email_verified: true }, false],
    ["other workspace", { email: "ex@corp.com", email_verified: true, hd: "other.com" }, false],
    ["corp workspace", { email: "dev@corp.com", email_verified: true, hd: "corp.com" }, true],
  ] as const;
  for (const [index, [label, userinfo, ok]] of cases.entries()) {
    capturedCookies = {};
    startFlow("google", `state-hd-${index}`);
    const res = await runGoogleCallback(googleProvider(userinfo).fn, `state-hd-${index}`);
    const location = res.headers.get("location") || "";
    if (ok) assert.equal(location, "http://app.example.com/dashboard", label);
    else assert.ok(location.includes("error=unauthorized_email"), `${label}: ${location}`);
    assert.equal(Boolean(capturedCookies["auth_token"]?.value), ok, label);
  }
});

test("public mail provider domain entries never admit anyone", async () => {
  await seedGoogle(["@gmail.com"]);
  startFlow("google", "state-gmail");
  const res = await runGoogleCallback(
    googleProvider({ email: "anyone@gmail.com", email_verified: true, hd: "gmail.com" }).fn,
    "state-gmail"
  );
  assert.ok(res.headers.get("location")?.includes("error=unauthorized_email"));

  await updateSettings({
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["*@gmail.com"],
  });
  const ghRes = await runGithubCallback(
    githubFetchMock({
      profile: { login: "anyone", id: 7 },
      emails: [{ email: "anyone@gmail.com", primary: true, verified: true }],
    }),
    "gh-state-gmail"
  );
  assert.ok(ghRes.headers.get("location")?.includes("error=unauthorized_email"));
  assert.equal(capturedCookies["auth_token"], undefined);
});

test("GitHub domain entries only match the PRIMARY verified e-mail", async () => {
  await updateSettings({
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["@corp.com"],
  });
  const secondary = await runGithubCallback(
    githubFetchMock({
      profile: { login: "ex-employee", id: 11 },
      emails: [
        { email: "me@personal.dev", primary: true, verified: false },
        { email: "ex@corp.com", primary: false, verified: true },
      ],
    }),
    "gh-state-secondary"
  );
  assert.ok(secondary.headers.get("location")?.includes("error=unauthorized_email"));
  assert.equal(capturedCookies["auth_token"], undefined);

  const primary = await runGithubCallback(
    githubFetchMock({
      profile: { login: "dev", id: 12 },
      emails: [{ email: "dev@corp.com", primary: true, verified: true }],
    }),
    "gh-state-primary"
  );
  assert.equal(primary.headers.get("location"), "http://myhub.test/dashboard");
});

test("GitHub github:<id> entries follow the account id, not a re-registered login", async () => {
  await updateSettings({
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    authAllowedEmails: ["github:583231"],
  });
  const emails = [{ email: "x@elsewhere.dev", primary: true, verified: true }];
  const squatter = await runGithubCallback(
    githubFetchMock({ profile: { login: "octocat", id: 999 }, emails }),
    "gh-state-squatter"
  );
  assert.ok(squatter.headers.get("location")?.includes("error=unauthorized_email"));
  assert.equal(capturedCookies["auth_token"], undefined);

  const owner = await runGithubCallback(
    githubFetchMock({ profile: { login: "renamed-octocat", id: 583231 }, emails }),
    "gh-state-owner"
  );
  assert.equal(owner.headers.get("location"), "http://myhub.test/dashboard");
});

test("googleAuthEnabled / githubAuthEnabled false switch a configured provider off", async () => {
  await seedGoogle(["allowed@company.com"], { googleAuthEnabled: false });
  await updateSettings({
    githubClientId: "gh-test-client-id",
    githubClientSecret: "gh-test-client-secret",
    githubAuthEnabled: false,
  });
  assert.equal(
    (await googleLoginRoute.GET(new Request("http://localhost/api/auth/google/login"))).status,
    400
  );
  assert.equal(
    (await githubLoginRoute.GET(new Request("http://localhost/api/auth/github/login"))).status,
    400
  );
  startFlow("google", "state-killed");
  const res = await runGoogleCallback(
    googleProvider({ email: "allowed@company.com", email_verified: true }).fn,
    "state-killed"
  );
  assert.ok(res.headers.get("location")?.includes("error=not_configured"));
  assert.equal(capturedCookies["auth_token"], undefined);
});
