import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { refreshGrokBotToken } from "../../open-sse/services/tokenRefresh/providers/grok-bot.ts";

type FakeResponse = { status: number; body: unknown };

function fakeFetch(responses: FakeResponse[]) {
  const calls: { url: string; body: unknown }[] = [];
  let i = 0;
  const impl = async (url: string, init: { body?: string }) => {
    calls.push({ url, body: init.body ? JSON.parse(init.body) : null });
    const r = responses[Math.min(i, responses.length - 1)];
    i += 1;
    return new Response(JSON.stringify(r.body), { status: r.status });
  };
  return { impl, calls };
}

describe("refreshGrokBotToken", () => {
  it("keeps the old refresh token when the response omits a new one", async () => {
    const { impl } = fakeFetch([
      { status: 200, body: { access_token: "new-access", expires_in: 3600 } },
    ]);
    const result = await refreshGrokBotToken("old-refresh", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
    });
    assert.equal(result.accessToken, "new-access");
    assert.equal(result.refreshToken, "old-refresh");
  });

  it("replaces the refresh token when the response carries a new one", async () => {
    const { impl } = fakeFetch([
      { status: 200, body: { access_token: "new-access", refresh_token: "new-refresh" } },
    ]);
    const result = await refreshGrokBotToken("old-refresh", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
    });
    assert.equal(result.refreshToken, "new-refresh");
  });

  it("returns an unrecoverable error when shouldLogout is true", async () => {
    const { impl, calls } = fakeFetch([
      { status: 200, body: { access_token: "x", shouldLogout: true } },
    ]);
    const result = await refreshGrokBotToken("r", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
    });
    assert.equal(result.error, "unrecoverable_refresh_error");
    assert.equal(result.code, "account_should_logout");
    assert.equal(calls.length, 1, "no retry after shouldLogout");
  });

  it("maps an upstream error payload to a refresh error", async () => {
    const { impl } = fakeFetch([{ status: 400, body: { error: "invalid_grant" } }]);
    const result = await refreshGrokBotToken("r", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
    });
    assert.ok(result.error);
    assert.ok(!("accessToken" in result));
  });

  it("rejects when the token subject changes across the refresh", async () => {
    const oldToken = [
      Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url"),
      Buffer.from(JSON.stringify({ sub: "user-a" })).toString("base64url"),
      "sig",
    ].join(".");
    const newToken = [
      Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url"),
      Buffer.from(JSON.stringify({ sub: "user-b" })).toString("base64url"),
      "sig",
    ].join(".");
    const { impl } = fakeFetch([{ status: 200, body: { access_token: newToken } }]);
    const result = await refreshGrokBotToken("r", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
      previousAccessToken: oldToken,
    });
    assert.equal(result.error, "unrecoverable_refresh_error");
    assert.equal(result.code, "account_subject_mismatch");
  });

  it("uses the desktop production client identity for refresh", async () => {
    const { impl, calls } = fakeFetch([
      { status: 200, body: { access_token: "new-access" } },
    ]);
    const result = await refreshGrokBotToken("old-refresh", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      attempts: 1,
    });
    assert.equal(result.accessToken, "new-access");
    assert.equal(calls[0].url, "https://api2.cursor.sh/oauth/token");
    assert.deepEqual(calls[0].body, {
      client_id: "KbZUR41cY7W6zRSdpSUJ7I7mLYBKOCmB",
      grant_type: "refresh_token",
      refresh_token: "old-refresh",
    });
  });

  it("retries a 429 and then succeeds", async () => {
    const { impl, calls } = fakeFetch([
      { status: 429, body: {} },
      { status: 200, body: { access_token: "a" } },
    ]);
    const result = await refreshGrokBotToken("r", undefined, null, {
      fetchImpl: impl as unknown as typeof fetch,
      retryBaseMs: 1,
    });
    assert.equal(result.accessToken, "a");
    assert.equal(calls.length, 2);
  });
});
