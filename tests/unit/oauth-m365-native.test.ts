import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { test } from "node:test";

const providerPath = "../../src/lib/oauth/providers/copilot-m365-web.ts";
const attemptsPath = "../../src/lib/oauth/m365AuthAttempts.ts";
const redirect = "https://login.microsoftonline.com/common/oauth2/nativeclient";
const oid = "11111111-2222-3333-4444-555555555555";
const tid = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
function jwt(claims: Record<string, unknown>) {
  return `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.signature`;
}
function tokens(
  claims: Record<string, unknown> = {
    oid,
    tid,
    name: "Test User",
    preferred_username: "test@example.invalid",
  }
) {
  return {
    access_token: jwt(claims),
    refresh_token: "synthetic-refresh",
    expires_in: 3600,
    token_type: "Bearer",
  };
}
async function load() {
  return { ...(await import(providerPath)), ...(await import(attemptsPath)) };
}
function returned(attempt: { state: string }, code = "synthetic-code") {
  return `${redirect}?code=${code}&state=${attempt.state}`;
}

test("native M365 provider module exists", async () => {
  let loaded = false;
  try {
    await import(providerPath);
    loaded = true;
  } catch {
    /* Feature not implemented yet. */
  }
  assert.equal(loaded, true, "native provider must be implemented");
});

test("provider config uses fixed Microsoft native PKCE flow and existing public client/scopes", async () => {
  const { copilotM365 } = await load();
  const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");
  assert.equal(copilotM365.flowType, "authorization_code_pkce");
  assert.equal(copilotM365.config.clientId, resolvePublicCred("m365_oauth_client_id"));
  assert.equal(
    copilotM365.config.scope,
    "openid profile offline_access https://substrate.office.com/sydney/M365Chat.Read https://substrate.office.com/sydney/sydney.readwrite"
  );
  const url = new URL(copilotM365.buildAuthUrl(copilotM365.config, redirect, "state", "challenge"));
  assert.equal(url.origin, "https://login.microsoftonline.com");
  for (const [key, value] of Object.entries({
    redirect_uri: redirect,
    state: "state",
    code_challenge: "challenge",
    code_challenge_method: "S256",
    response_type: "code",
  }))
    assert.equal(url.searchParams.get(key), value);
  assert.throws(() =>
    copilotM365.buildAuthUrl(
      copilotM365.config,
      "http://localhost:3000/callback",
      "state",
      "challenge"
    )
  );
  assert.equal("requestDeviceCode" in copilotM365, false);
  assert.equal("fixedPort" in copilotM365, false);
});

test("attempts issue unpredictable PKCE/state and consume exactly once with bound reauth target", async () => {
  const { createM365AuthAttempts } = await load();
  const store = createM365AuthAttempts();
  const attempt = store.issue({ connectionId: "connection-one" });
  const second = store.issue();
  assert.notEqual(attempt.state, second.state);
  assert.notEqual(attempt.codeVerifier, second.codeVerifier);
  assert.match(attempt.codeVerifier, /^[A-Za-z0-9_-]{43,128}$/);
  const url = new URL(attempt.authUrl);
  assert.equal(
    url.searchParams.get("code_challenge"),
    createHash("sha256").update(attempt.codeVerifier).digest("base64url")
  );
  assert.equal(attempt.redirectUri, redirect);
  const input = {
    redirectedUrl: returned(attempt),
    state: attempt.state,
    codeVerifier: attempt.codeVerifier,
    connectionId: "connection-one",
  };
  for (const change of [
    { state: second.state },
    { codeVerifier: second.codeVerifier },
    { connectionId: "connection-two" },
    { connectionId: undefined },
  ])
    assert.throws(() => store.consume({ ...input, ...change }));
  assert.deepEqual(store.consume(input), {
    code: "synthetic-code",
    codeVerifier: attempt.codeVerifier,
    redirectUri: redirect,
    connectionId: "connection-one",
  });
  assert.throws(() => store.consume(input));
});

test("callback requires a full exact redirected URL, unique code/state and no provider error", async () => {
  const { createM365AuthAttempts } = await load();
  const store = createM365AuthAttempts();
  const a = store.issue();
  const good = returned(a);
  const invalid = [
    "raw-code",
    `?code=x&state=${a.state}`,
    good.replace("https:", "http:"),
    good.replace("login.microsoftonline.com", "evil.invalid"),
    good.replace("/nativeclient?", "/nativeclient/else?"),
    good.replace("https://", "https://user:pass@"),
    good + "#fragment",
    good + "#",
    good + "&code=other",
    good + "&state=other",
    good + "&error=access_denied",
    good + "&error_description=synthetic-secret",
    `${redirect}?code=&state=${a.state}`,
    `${redirect}?code=x&state=wrong`,
    good.replace("/common/", "/other/../common/"),
  ];
  for (const redirectedUrl of invalid)
    assert.throws(
      () => store.consume({ redirectedUrl, state: a.state, codeVerifier: a.codeVerifier }),
      redirectedUrl
    );
  assert.equal(
    store.consume({ redirectedUrl: good, state: a.state, codeVerifier: a.codeVerifier }).code,
    "synthetic-code"
  );
});

test("attempt expiry and capacity are bounded without evicting active transactions", async () => {
  const { createM365AuthAttempts } = await load();
  let now = 1000;
  const store = createM365AuthAttempts({ now: () => now });
  const a = store.issue();
  assert.ok(a.expiresAt <= now + 600000);
  for (let i = 1; i < 64; i++) store.issue();
  assert.throws(() => store.issue(), /limit/i);
  now = a.expiresAt;
  assert.throws(
    () =>
      store.consume({ redirectedUrl: returned(a), state: a.state, codeVerifier: a.codeVerifier }),
    /expired|invalid/i
  );
  assert.ok(store.issue());
});

test("token exchange sends native public-client form, bounded fetch and maps work identity", async (t) => {
  const { copilotM365 } = await load();
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.equal(url, "https://login.microsoftonline.com/common/oauth2/v2.0/token");
    assert.equal(init.method, "POST");
    assert.equal(init.redirect, "error");
    assert.ok(init.signal instanceof AbortSignal);
    const body = new URLSearchParams(String(init.body));
    assert.equal(body.get("redirect_uri"), redirect);
    assert.equal(body.get("code_verifier"), "v".repeat(43));
    assert.equal(body.get("grant_type"), "authorization_code");
    assert.equal(body.has("client_secret"), false);
    return Response.json(tokens());
  });
  const result = await copilotM365.exchangeToken(
    copilotM365.config,
    "synthetic-code",
    redirect,
    "v".repeat(43)
  );
  const mapped = copilotM365.mapTokens(result);
  assert.equal(mapped.refreshToken, "synthetic-refresh");
  assert.equal(mapped.accessToken, tokens().access_token);
  assert.equal(mapped.expiresIn, 3600);
  assert.equal(mapped.name, "Test User");
  assert.equal(mapped.email, "test@example.invalid");
  assert.deepEqual(mapped.providerSpecificData, { oid, tid, chathubPath: `${oid}@${tid}` });
  await assert.rejects(
    copilotM365.exchangeToken(copilotM365.config, "code", "http://localhost", "v".repeat(43))
  );
});

test("token schema rejects malformed responses and requires GUID work/school oid/tid", async (t) => {
  const { copilotM365 } = await load();
  const invalid = [
    {},
    { ...tokens(), expires_in: -1 },
    { ...tokens(), expires_in: "3600" },
    { ...tokens(), token_type: "Basic" },
    tokens({ oid }),
    tokens({ oid: "bad", tid }),
    tokens({ oid, tid: "9188040d-6c67-4c5b-b112-36a304b66dad" }),
    { ...tokens(), access_token: "not-a-jwt" },
  ];
  for (const body of invalid) {
    const mock = t.mock.method(globalThis, "fetch", async () => Response.json(body));
    await assert.rejects(
      copilotM365.exchangeToken(copilotM365.config, "code", redirect, "v".repeat(43)),
      /M365/
    );
    assert.throws(() => copilotM365.mapTokens(body), /M365/);
    mock.mock.restore();
  }
  const mapped = copilotM365.mapTokens(
    tokens({ oid, tid, name: "<script>bad</script>", email: "bad\n@example.invalid" })
  );
  assert.equal(mapped.name, null);
  assert.equal(mapped.email, null);
});

test("upstream failures never expose response bodies, network messages or token data", async (t) => {
  const { copilotM365 } = await load();
  for (const response of [
    () => new Response("synthetic-secret /private/path", { status: 400 }),
    () => new Response("synthetic-secret", { status: 200 }),
    () => {
      throw new Error("synthetic-secret /private/path");
    },
  ]) {
    const mock = t.mock.method(globalThis, "fetch", async () => response());
    await assert.rejects(
      copilotM365.exchangeToken(copilotM365.config, "code", redirect, "v".repeat(43)),
      (err: Error) => !err.message.includes("synthetic-secret") && /M365/.test(err.message)
    );
    mock.mock.restore();
  }
});

test("complete consumes before network starts, including rejected exchanges and concurrent replay", async (t) => {
  const { createM365AuthAttempts } = await load();
  const store = createM365AuthAttempts();
  const a = store.issue();
  const input = { redirectedUrl: returned(a), state: a.state, codeVerifier: a.codeVerifier };
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    assert.throws(() => store.consume(input));
    return new Response("synthetic-secret", { status: 400 });
  });
  await assert.rejects(store.complete(input));
  await assert.rejects(store.complete(input));
  assert.equal(calls, 1);
});

test("successful completion returns mapped tokens and bound target without storing caller mutations", async (t) => {
  const { createM365AuthAttempts } = await load();
  const store = createM365AuthAttempts();
  const a = store.issue({ connectionId: "bound-target" });
  const input = {
    redirectedUrl: returned(a),
    state: a.state,
    codeVerifier: a.codeVerifier,
    connectionId: "bound-target",
  };
  a.connectionId = "mutated-target";
  a.codeVerifier = "mutated-verifier";
  t.mock.method(globalThis, "fetch", async () => Response.json(tokens()));
  const result = await store.complete(input);
  assert.equal(result.connectionId, "bound-target");
  assert.equal(result.tokens.refreshToken, "synthetic-refresh");
  assert.equal(result.tokens.providerSpecificData.chathubPath, `${oid}@${tid}`);
  await assert.rejects(store.complete(input));
});

test("oversized token response is cancelled and rejected without leaking its contents", async (t) => {
  const { copilotM365 } = await load();
  let cancelled = false;
  t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("synthetic-secret".repeat(10000)));
          },
          cancel() {
            cancelled = true;
          },
        })
      )
  );
  await assert.rejects(
    copilotM365.exchangeToken(copilotM365.config, "code", redirect, "v".repeat(43)),
    /M365/
  );
  assert.equal(cancelled, true);
});

test("fetch deadline uses the 15-second budget and aborts stalled network work", async (t) => {
  const { copilotM365 } = await load();
  const controller = new AbortController();
  t.mock.method(AbortSignal, "timeout", (milliseconds: number) => {
    assert.equal(milliseconds, 15000);
    return controller.signal;
  });
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: string, init: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => reject(new Error("synthetic-secret")), {
          once: true,
        });
      })
  );
  const pending = copilotM365.exchangeToken(copilotM365.config, "code", redirect, "v".repeat(43));
  controller.abort();
  await assert.rejects(
    pending,
    (error: Error) => /M365/.test(error.message) && !error.message.includes("synthetic-secret")
  );
});

test("provider registry retains existing identity", async () => {
  const { PROVIDERS } = await import("../../src/lib/oauth/providers/index.ts");
  const { copilotM365 } = await load();
  assert.equal(PROVIDERS["copilot-m365-web"], copilotM365);
});
