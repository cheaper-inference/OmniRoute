import test from "node:test";
import assert from "node:assert/strict";
import { qoder } from "../../src/lib/oauth/providers/qoder.ts";
import { QODER_CONFIG } from "../../src/lib/oauth/constants/oauth.ts";
import { getQoderMachineId, resetQoderMachineIdCache } from "../../open-sse/utils/qoderDevice.ts";
import { refreshQoderToken } from "../../open-sse/services/tokenRefresh/providers/qoder.ts";

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function textResponse(text: string, status = 404) {
  return new Response(text, {
    status,
    headers: { "Content-Type": "text/plain" },
  });
}

test("qoder device flow: requestDeviceCode generates valid payload with PKCE and machineId", async () => {
  const result = await qoder.requestDeviceCode(QODER_CONFIG, "test-code-challenge");

  assert.ok(result.device_code);
  assert.equal(typeof result.device_code, "string");
  assert.ok(result.user_code);
  assert.equal(result.expires_in, 300);
  assert.equal(result.interval, 3);
  assert.ok(result.verification_uri.includes("qoder.com/device/selectAccounts"));

  const completeUrl = new URL(result.verification_uri_complete);
  assert.equal(completeUrl.searchParams.get("challenge"), "test-code-challenge");
  assert.equal(completeUrl.searchParams.get("challenge_method"), "S256");
  assert.equal(completeUrl.searchParams.get("nonce"), result.device_code);
  assert.ok(completeUrl.searchParams.get("machine_id"));
  assert.ok(completeUrl.searchParams.get("client_id"));
});

test("qoder device flow: pollToken handles pending 404 response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    const urlStr = String(url);
    assert.ok(urlStr.includes("api/v1/deviceToken/poll"));
    assert.ok(urlStr.includes("nonce=test-nonce"));
    assert.ok(urlStr.includes("verifier=test-verifier"));
    return textResponse("Not Found", 404);
  }) as typeof fetch;

  try {
    const pollResult = await qoder.pollToken(QODER_CONFIG, "test-nonce", "test-verifier");
    assert.equal(pollResult.ok, false);
    assert.equal(pollResult.data.error, "authorization_pending");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("qoder device flow: pollToken handles slow_down 429 response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    return textResponse("Rate limited", 429);
  }) as typeof fetch;

  try {
    const pollResult = await qoder.pollToken(QODER_CONFIG, "test-nonce", "test-verifier");
    assert.equal(pollResult.ok, false);
    assert.equal(pollResult.data.error, "slow_down");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("qoder device flow: pollToken handles success 200 with tokens", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    return jsonResponse({
      success: true,
      data: {
        token: "dt-test-access-token-12345",
        refresh_token: "drt-test-refresh-token-67890",
        expires_in: 2592000,
        email: "user@example.com",
      },
    });
  }) as typeof fetch;

  try {
    const pollResult = await qoder.pollToken(QODER_CONFIG, "test-nonce", "test-verifier");
    assert.equal(pollResult.ok, true);
    assert.equal(pollResult.data.access_token, "dt-test-access-token-12345");
    assert.equal(pollResult.data.refresh_token, "drt-test-refresh-token-67890");
    assert.equal(pollResult.data.expires_in, 2592000);
    assert.equal(pollResult.data._userEmail, "user@example.com");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("qoder device flow: postExchange loads user profile with Bearer token", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string | URL | Request, init?: RequestInit) => {
    const authHeader = (init?.headers as Record<string, string>)?.Authorization;
    assert.equal(authHeader, "Bearer dt-test-token");
    return jsonResponse({
      success: true,
      data: {
        id: "usr_qoder_999",
        email: "qoderdev@example.com",
        nickname: "Qoder Developer",
        accountType: "pro",
      },
    });
  }) as typeof fetch;

  try {
    const extra = await qoder.postExchange({ access_token: "dt-test-token" });
    assert.equal(extra.id, "usr_qoder_999");
    assert.equal(extra.email, "qoderdev@example.com");
    assert.equal(extra.nickname, "Qoder Developer");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("qoder device flow: mapTokens produces structured connection credentials", () => {
  const tokens = {
    access_token: "dt-token-abc",
    refresh_token: "drt-token-xyz",
    expires_in: 3600,
    token_type: "Bearer",
  };
  const extra = {
    id: "usr_123",
    email: "dev@company.com",
    nickname: "Dev Star",
    accountType: "enterprise",
  };

  const mapped = qoder.mapTokens(tokens, extra);
  assert.equal(mapped.accessToken, "dt-token-abc");
  assert.equal(mapped.refreshToken, "drt-token-xyz");
  assert.equal(mapped.email, "dev@company.com");
  assert.equal(mapped.displayName, "Dev Star");
  assert.equal(mapped.providerSpecificData?.userId, "usr_123");
  assert.equal(mapped.providerSpecificData?.accountType, "enterprise");
});

test("qoder token refresh: refreshes native device token (drt-*)", async () => {
  const originalFetch = globalThis.fetch;
  let sentBody: Record<string, unknown> | null = null;

  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const urlStr = String(url);
    assert.ok(urlStr.includes("api/v1/deviceToken/refresh"));
    sentBody = JSON.parse(String(init?.body));
    return jsonResponse({
      success: true,
      data: {
        token: "dt-new-access-token",
        refresh_token: "drt-new-refresh-token",
        expires_in: 2592000,
      },
    });
  }) as typeof fetch;

  try {
    const refreshed = await refreshQoderToken("drt-old-refresh-token", console);
    assert.ok(refreshed);
    assert.equal(refreshed.accessToken, "dt-new-access-token");
    assert.equal(refreshed.refreshToken, "drt-new-refresh-token");
    assert.equal(sentBody?.refresh_token, "drt-old-refresh-token");
    assert.ok(sentBody?.machine_id);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("qoder device machineId: resolves consistently and respects env override", () => {
  resetQoderMachineIdCache();
  const originalEnv = process.env.QODER_MACHINE_ID;

  try {
    process.env.QODER_MACHINE_ID = "custom-test-machine-id-12345";
    resetQoderMachineIdCache();
    assert.equal(getQoderMachineId(), "custom-test-machine-id-12345");
  } finally {
    if (originalEnv) {
      process.env.QODER_MACHINE_ID = originalEnv;
    } else {
      delete process.env.QODER_MACHINE_ID;
    }
    resetQoderMachineIdCache();
  }
});
