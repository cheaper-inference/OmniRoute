import test from "node:test";
import assert from "node:assert/strict";

// Devin Desktop has no OAuth refresh_token: a Devin Auth password login stores a
// long-lived `auth1_…` credential instead. These tests pin the two properties the
// refresh path needs from that shape:
//   1. an auth1 connection is ADMITTED by getAccessToken despite a null refreshToken
//      (an import_token connection is still rejected — it genuinely cannot renew);
//   2. the two-account case does not share one in-flight refresh, because the cache
//      key would otherwise be the same empty-token hash for every account.

const { getAccessToken } = await import("../../open-sse/services/tokenRefresh.ts");
const { getRefreshCacheKey, hasRefreshCacheIdentity } =
  await import("../../open-sse/services/tokenRefresh/rotationMap.ts");
const { encodeProtoString } = await import("../../src/lib/oauth/devinAuth.ts");

const AUTH1_A = "auth1_account_alpha_credential";
const AUTH1_B = "auth1_account_beta_credential";

function registerBlob(sessionToken: string): Uint8Array {
  return Uint8Array.from([0x0a, 0x2a, ...new TextEncoder().encode(sessionToken), 0x00]);
}

/**
 * Stub the three Devin Auth RPCs. Each distinct auth1 gets its own session token
 * back, so a caller can tell which account a result belongs to.
 */
function stubDevinAuth() {
  const original = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const href = String(url);
    calls.push(href);
    const headerAuth1 = (init?.headers as Record<string, string> | undefined)?.[
      "x-devin-auth1-token"
    ];
    const bodyText = init?.body
      ? new TextDecoder().decode(new Uint8Array(init.body as ArrayBuffer))
      : "";
    // The account is identifiable from whichever credential this step carries:
    // the x-devin-auth1-token header, or the auth1/ott embedded in the proto body.
    const tag =
      headerAuth1 === AUTH1_B || bodyText.includes(AUTH1_B) || bodyText.includes("ott$beta")
        ? "beta"
        : "alpha";
    // Session exchange: echo the account id so the tests can tell them apart.
    if (href.includes("WindsurfPostAuth")) {
      return new Response(
        Uint8Array.from([
          ...encodeProtoString(2, `session-${tag}`),
          ...encodeProtoString(4, `acct_${tag}`),
        ]),
        { status: 200 }
      );
    }
    if (href.includes("GetOneTimeAuthToken")) {
      return new Response(Uint8Array.from(encodeProtoString(1, `ott$${tag}`)), { status: 200 });
    }
    return new Response(registerBlob(`devin-session-token$${tag}`), { status: 200 });
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = original) };
}

function noopLog() {
  const entries: Array<{ level: string; message: unknown }> = [];
  const push = (level: string) => (_scope: unknown, message: unknown) => {
    entries.push({ level, message });
  };
  return {
    entries,
    debug: push("debug"),
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
  };
}

test("an auth1 connection is admitted without an OAuth refresh token", async () => {
  const stub = stubDevinAuth();
  try {
    const result = await getAccessToken(
      "devin-desktop",
      { providerSpecificData: { devinAuth1Token: AUTH1_A }, refreshToken: null },
      noopLog()
    );
    assert.ok(result, "the refresh must run instead of returning null at the gate");
    assert.equal(result.accessToken, "devin-session-token$alpha");
    assert.ok(stub.calls.length > 0, "the auth1 exchange must actually reach upstream");
  } finally {
    stub.restore();
  }
});

test("an import_token connection stays unrefreshable", async () => {
  const stub = stubDevinAuth();
  const log = noopLog();
  try {
    // No auth1 in providerSpecificData: nothing to exchange.
    assert.equal(
      await getAccessToken("devin-desktop", { providerSpecificData: {}, refreshToken: null }, log),
      null
    );
    // A legacy Windsurf key is not an auth1 credential either.
    assert.equal(
      await getAccessToken(
        "devin-desktop",
        { providerSpecificData: { devinAuth1Token: "sk-ws-legacy" }, refreshToken: null },
        log
      ),
      null
    );
    assert.equal(stub.calls.length, 0, "no upstream call for an unrefreshable connection");
    assert.ok(
      log.entries.some((e) => e.level === "warn"),
      "the caller is told the refresh could not run"
    );
  } finally {
    stub.restore();
  }
});

test("two accounts with distinct auth1 credentials do not share one in-flight refresh", async () => {
  const stub = stubDevinAuth();
  try {
    const [alpha, beta] = await Promise.all([
      getAccessToken(
        "devin-desktop",
        { providerSpecificData: { devinAuth1Token: AUTH1_A }, refreshToken: null },
        noopLog()
      ),
      getAccessToken(
        "devin-desktop",
        { providerSpecificData: { devinAuth1Token: AUTH1_B }, refreshToken: null },
        noopLog()
      ),
    ]);
    assert.ok(alpha);
    assert.ok(beta);
    // The decisive assertion: each account gets ITS OWN tokens. Sharing one
    // in-flight promise would hand account A's tokens to account B.
    assert.equal(alpha.accessToken, "devin-session-token$alpha");
    assert.equal(beta.accessToken, "devin-session-token$beta");
  } finally {
    stub.restore();
  }
});

test("the refresh cache key is per-credential when there is no refresh token", () => {
  const keyA = getRefreshCacheKey("devin-desktop", null, AUTH1_A);
  const keyB = getRefreshCacheKey("devin-desktop", null, AUTH1_B);
  assert.notEqual(keyA, keyB, "distinct auth1 credentials must not collide");
  // Same credential → same key, so genuine concurrent callers still dedup.
  assert.equal(keyA, getRefreshCacheKey("devin-desktop", null, AUTH1_A));
  // The raw credential never appears in the key.
  assert.doesNotMatch(keyA, /auth1_account_alpha/);
});

test("the executor refresh hook renews an auth1 connection", async () => {
  const { DevinDesktopExecutor } = await import("../../open-sse/executors/devin-desktop.ts");
  const stub = stubDevinAuth();
  try {
    const executor = new DevinDesktopExecutor();
    const refreshed = await executor.refreshCredentials(
      { providerSpecificData: { devinAuth1Token: AUTH1_A } },
      noopLog()
    );
    assert.ok(refreshed, "a 401 on an auth1 connection must self-heal");
    assert.equal(refreshed.accessToken, "devin-session-token$alpha");
    // The stored session/ide pair is persisted by the caller from this payload.
    assert.equal(refreshed.providerSpecificData.devinIdeToken, "devin-session-token$alpha");
  } finally {
    stub.restore();
  }
});

test("the executor refresh hook refuses an import_token connection", async () => {
  const { DevinDesktopExecutor } = await import("../../open-sse/executors/devin-desktop.ts");
  const stub = stubDevinAuth();
  const log = noopLog();
  try {
    const executor = new DevinDesktopExecutor();
    // No auth1: nothing can be renewed, so the hook must answer null instead of
    // pretending it refreshed (the manual route reports 502 from that null).
    assert.equal(
      await executor.refreshCredentials({ apiKey: "imported-key", providerSpecificData: {} }, log),
      null
    );
    assert.equal(stub.calls.length, 0, "no upstream call without a credential");
    assert.ok(
      log.entries.some((e) => e.level === "warn" && String(e.message).includes("auth1")),
      "the operator is told to re-authenticate"
    );
  } finally {
    stub.restore();
  }
});

test("a connection with no identity at all is not cacheable", () => {
  // Without a refreshToken AND without a discriminator there is no way to key the
  // shared cache per account, so the caller must skip it entirely.
  assert.equal(hasRefreshCacheIdentity({ refreshToken: null }), false);
  assert.equal(
    hasRefreshCacheIdentity({ refreshToken: null, refreshCacheDiscriminator: null }),
    false
  );
  assert.equal(hasRefreshCacheIdentity({ refreshToken: "", refreshCacheDiscriminator: "" }), false);
  assert.equal(
    hasRefreshCacheIdentity({ refreshToken: null, refreshCacheDiscriminator: AUTH1_A }),
    true
  );
  assert.equal(hasRefreshCacheIdentity({ refreshToken: "rt" }), true);
});
