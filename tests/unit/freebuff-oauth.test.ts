import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import PROVIDERS from "../../src/lib/oauth/providers/index.ts";
import {
  decodeFreebuffLoginState,
  encodeFreebuffLoginState,
  generateFreebuffFingerprintId,
} from "../../src/lib/oauth/providers/freebuff.ts";
import { FREEBUFF_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { pollForToken } from "../../src/lib/oauth/providers.ts";
import { OAUTH_TEST_CONFIG } from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import { connectionMatchesProviderCard } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";
import { supportsTokenRefresh } from "../../open-sse/services/tokenRefresh.ts";
import { FreebuffExecutor } from "../../open-sse/executors/freebuff.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

const freebuff = PROVIDERS.freebuff;

type FetchCall = { url: string; init: RequestInit };

function stubFetch(handler: (url: string, init: RequestInit) => Response) {
  const originalFetch = globalThis.fetch;
  const calls: FetchCall[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input instanceof Request ? input.url : input);
    calls.push({ url, init });
    return handler(url, init);
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function futureIso(seconds = 300) {
  return new Date(Date.now() + seconds * 1000).toISOString();
}

function loginState(expiresAt = futureIso()) {
  return encodeFreebuffLoginState({
    fingerprintId: "codebuff-cli-abcd1234",
    fingerprintHash: "hash-xyz",
    expiresAt,
  });
}

const repoFile = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../../${rel}`, import.meta.url)), "utf8");

test("freebuff OAuth provider is a registered device-code flow", () => {
  assert.ok(freebuff, "freebuff must be registered in the OAuth PROVIDERS map");
  assert.equal(freebuff.flowType, "device_code");
  assert.equal(freebuff.config, FREEBUFF_CONFIG);
  assert.equal(FREEBUFF_CONFIG.codeUrl, "https://freebuff.com/api/auth/cli/code");
  assert.equal(FREEBUFF_CONFIG.statusUrl, "https://freebuff.com/api/auth/cli/status");
});

test("generateFreebuffFingerprintId matches the CLI fallback fingerprint shape", () => {
  const a = generateFreebuffFingerprintId();
  const b = generateFreebuffFingerprintId();
  assert.match(a, /^codebuff-cli-[A-Za-z0-9_-]{8}$/);
  assert.notEqual(a, b, "each login must use a fresh fingerprint");
});

test("login state round-trips and rejects malformed device codes", () => {
  const state = { fingerprintId: "fp", fingerprintHash: "h", expiresAt: futureIso() };
  assert.deepEqual(decodeFreebuffLoginState(encodeFreebuffLoginState(state)), state);
  assert.equal(decodeFreebuffLoginState(""), null);
  assert.equal(decodeFreebuffLoginState(undefined), null);
  assert.equal(decodeFreebuffLoginState("not-base64-json"), null);
  assert.equal(
    decodeFreebuffLoginState(
      Buffer.from(JSON.stringify({ fingerprintId: "fp" })).toString("base64url")
    ),
    null
  );
});

test("requestDeviceCode posts the fingerprint and packs the login state", async () => {
  const expiresAt = futureIso(240);
  const { calls, restore } = stubFetch(() =>
    json({
      loginUrl: "https://freebuff.com/login?auth_code=abc",
      fingerprintHash: "fh-1",
      expiresAt,
    })
  );
  try {
    const device = await freebuff.requestDeviceCode(FREEBUFF_CONFIG);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, FREEBUFF_CONFIG.codeUrl);
    assert.equal(calls[0].init.method, "POST");
    const sent = JSON.parse(String(calls[0].init.body));
    assert.match(sent.fingerprintId, /^codebuff-cli-/);

    assert.equal(device.verification_uri, "https://freebuff.com/login?auth_code=abc");
    assert.equal(device.verification_uri_complete, device.verification_uri);
    assert.equal(device.interval, 5);
    assert.ok(device.expires_in > 200 && device.expires_in <= 240);
    assert.equal(device.user_code, sent.fingerprintId.replace(/^codebuff-cli-/, ""));
    assert.deepEqual(decodeFreebuffLoginState(device.device_code), {
      fingerprintId: sent.fingerprintId,
      fingerprintHash: "fh-1",
      expiresAt,
    });
  } finally {
    restore();
  }
});

test("requestDeviceCode throws on upstream failure or incomplete payload", async () => {
  let stub = stubFetch(() => new Response("nope", { status: 400 }));
  try {
    await assert.rejects(() => freebuff.requestDeviceCode(FREEBUFF_CONFIG), /\(400\)/);
  } finally {
    stub.restore();
  }
  stub = stubFetch(() => json({ loginUrl: "https://freebuff.com/login" }));
  try {
    await assert.rejects(() => freebuff.requestDeviceCode(FREEBUFF_CONFIG), /missing required/);
  } finally {
    stub.restore();
  }
});

test("pollToken sends all three login values as query params", async () => {
  const expiresAt = futureIso();
  const { calls, restore } = stubFetch(() => new Response("", { status: 401 }));
  try {
    const result = await freebuff.pollToken(FREEBUFF_CONFIG, loginState(expiresAt));
    assert.deepEqual(result, { ok: false, data: { error: "authorization_pending" } });
    const url = new URL(calls[0].url);
    assert.equal(url.origin + url.pathname, FREEBUFF_CONFIG.statusUrl);
    assert.equal(url.searchParams.get("fingerprintId"), "codebuff-cli-abcd1234");
    assert.equal(url.searchParams.get("fingerprintHash"), "hash-xyz");
    assert.equal(url.searchParams.get("expiresAt"), expiresAt);
    assert.equal(calls[0].init.method, "GET");
  } finally {
    restore();
  }
});

test("pollToken maps transient upstream statuses to slow_down", async () => {
  for (const status of [429, 503]) {
    const { restore } = stubFetch(() => new Response("busy", { status }));
    try {
      const result = await freebuff.pollToken(FREEBUFF_CONFIG, loginState());
      assert.equal(result.data.error, "slow_down", `status ${status}`);
    } finally {
      restore();
    }
  }
});

test("pollToken treats a 2xx without a user (or non-JSON) as still pending", async () => {
  for (const body of ["{}", "<html>interstitial</html>", ""]) {
    const { restore } = stubFetch(() => new Response(body, { status: 200 }));
    try {
      const result = await freebuff.pollToken(FREEBUFF_CONFIG, loginState());
      assert.deepEqual(result, { ok: false, data: { error: "authorization_pending" } });
    } finally {
      restore();
    }
  }
});

test("pollToken reports expired_token once the login window has passed", async () => {
  const past = new Date(Date.now() - 1000).toISOString();
  const { restore } = stubFetch(() => new Response("", { status: 401 }));
  try {
    const result = await freebuff.pollToken(FREEBUFF_CONFIG, loginState(past));
    assert.equal(result.ok, false);
    assert.equal(result.data.error, "expired_token");
  } finally {
    restore();
  }
});

test("pollToken rejects a malformed device code without calling upstream", async () => {
  const { calls, restore } = stubFetch(() => json({}));
  try {
    const result = await freebuff.pollToken(FREEBUFF_CONFIG, "garbage");
    assert.equal(result.data.error, "invalid_request");
    assert.equal(calls.length, 0);
  } finally {
    restore();
  }
});

test("pollForToken completes the login and maps a non-refreshable token", async () => {
  const { restore } = stubFetch(() =>
    json({
      user: {
        id: "user-1",
        name: "Buffy",
        email: "buffy@example.com",
        authToken: "fb-auth-token",
        credits: 0,
      },
    })
  );
  try {
    const result = await pollForToken("freebuff", loginState());
    assert.equal(result.success, true);
    assert.equal(result.tokens.accessToken, "fb-auth-token");
    assert.equal(result.tokens.refreshToken, null);
    assert.equal(result.tokens.expiresIn, null);
    assert.equal(result.tokens.email, "buffy@example.com");
    assert.equal(result.tokens.displayName, "Buffy");
    assert.deepEqual(result.tokens.providerSpecificData, {
      userId: "user-1",
      fingerprintId: "codebuff-cli-abcd1234",
    });
  } finally {
    restore();
  }
});

test("pollForToken surfaces pending without creating a connection", async () => {
  const { restore } = stubFetch(() => new Response("", { status: 401 }));
  try {
    const result = await pollForToken("freebuff", loginState());
    assert.equal(result.success, false);
    assert.equal(result.error, "authorization_pending");
  } finally {
    restore();
  }
});

test("freebuff has no token refresh path and a presence-only connection test", () => {
  assert.equal(supportsTokenRefresh("freebuff"), false);
  assert.deepEqual(OAUTH_TEST_CONFIG.freebuff, { checkExpiry: true, refreshable: false });
});

test("freebuff dual-auth card counts both OAuth and pasted-token connections", () => {
  assert.equal(
    connectionMatchesProviderCard({ provider: "freebuff", authType: "oauth" }, "freebuff", "oauth"),
    true
  );
  assert.equal(
    connectionMatchesProviderCard(
      { provider: "freebuff", authType: "apikey" },
      "freebuff",
      "oauth"
    ),
    true
  );
});

test("device-code route and dashboard modal treat freebuff as a no-PKCE device flow", () => {
  const route = repoFile("src/app/api/oauth/[provider]/[action]/route.ts");
  const noPkce = route.match(/NO_PKCE_DEVICE_CODE_PROVIDERS = new Set\(\[([\s\S]*?)\]\)/);
  assert.ok(noPkce, "NO_PKCE_DEVICE_CODE_PROVIDERS must exist");
  assert.match(noPkce[1], /"freebuff"/);

  const modal = repoFile("src/shared/components/OAuthModal.tsx");
  const device = modal.match(/DEVICE_CODE_PROVIDERS = new Set\(\[([\s\S]*?)\]\)/);
  assert.ok(device, "DEVICE_CODE_PROVIDERS must exist");
  assert.match(device[1], /"freebuff"/);
});

test("FreebuffExecutor authenticates with an OAuth accessToken", async () => {
  const { calls, restore } = stubFetch((url) => {
    if (url.endsWith("/freebuff/session")) return json({ instanceId: "inst-1" });
    if (url.endsWith("/agent-runs")) return json({ runId: "run-1" });
    return json({ choices: [{ message: { role: "assistant", content: "hi" } }] });
  });
  try {
    const executor = new FreebuffExecutor();
    const { response } = await executor.execute({
      model: "deepseek/deepseek-v4-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { accessToken: "fb-oauth-token" },
    } as unknown as ExecuteInput);
    assert.equal(response.status, 200);
    const completion = calls.find((c) => c.url.endsWith("/chat/completions"));
    assert.ok(completion, "chat completion must be dispatched");
    const headers = completion.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer fb-oauth-token");
  } finally {
    restore();
  }
});
