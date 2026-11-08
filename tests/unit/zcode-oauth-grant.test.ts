import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  exchangeZaiBusinessToken,
  isLegacyZaiOAuthToken,
} from "../../open-sse/executors/zcode/oauthGrant.ts";
import { startZcodeLogin, pollZcodeLogin } from "../../src/lib/oauth/services/zcodeLogin.ts";
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("business exchange follows native contract and rejects provider failures without leaking grants", async () => {
  for (const code of [undefined, null, 0, 200, "0", "200"]) {
    globalThis.fetch = async (url, init) => {
      assert.equal(String(url), "https://api.z.ai/api/auth/z/login");
      assert.equal(init?.method, "POST");
      assert.equal(init?.redirect, "error");
      assert.deepEqual(JSON.parse(String(init?.body)), { token: "private-grant" });
      return Response.json({ code, data: { accessToken: " business " } });
    };
    assert.equal(await exchangeZaiBusinessToken("private-grant"), "business");
  }
  for (const body of [
    { code: 401, message: "private-grant" },
    { success: false, data: { access_token: "x" } },
    { data: {} },
  ]) {
    globalThis.fetch = async () => Response.json(body);
    await assert.rejects(exchangeZaiBusinessToken("private-grant"), (error: Error) => {
      assert.ok(!error.message.includes("private-grant"));
      return /exchange failed/.test(error.message);
    });
  }
});

test("exchange retry retains consumed OAuth grant and successful exchange survives storage retry", async () => {
  let polls = 0,
    exchanges = 0,
    writes = 0;
  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/init"))
      return Response.json({
        code: 0,
        data: {
          flow_id: "retry-normalize",
          authorize_url: "https://example.com",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 1,
        },
      });
    if (String(url).endsWith("/api/auth/z/login")) {
      if (++exchanges === 1) throw new Error("network-private-grant");
      return Response.json({ code: 200, data: { access_token: "business" } });
    }
    polls++;
    return Response.json({
      code: 0,
      data: { status: "ready", token: "jwt", user: { user_id: "u" }, zai: { access_token: "raw" } },
    });
  };
  const session = await startZcodeLogin("zai", "owner");
  const persist = async (_family: string, grant: { accessToken: string }) => {
    assert.equal(grant.accessToken, "business");
    if (++writes === 1) throw new Error("temporary storage failure");
    return { id: "one" };
  };
  await assert.rejects(pollZcodeLogin(session.sessionId, "owner", persist), /exchange failed/);
  await assert.rejects(pollZcodeLogin(session.sessionId, "owner", persist), /storage failure/);
  assert.equal((await pollZcodeLogin(session.sessionId, "owner", persist)).status, "ok");
  assert.equal(polls, 1);
  assert.equal(exchanges, 2);
});

test("legacy classifier does not reinterpret native business tokens", () => {
  const jwt = (claims: unknown) =>
    `header.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.sig`;
  assert.equal(isLegacyZaiOAuthToken(jwt({ sub: "u", token_version: 1 })), true);
  assert.equal(isLegacyZaiOAuthToken(jwt({ api_key: "private", user_type: "user" })), false);
  assert.equal(isLegacyZaiOAuthToken("opaque"), false);
});
