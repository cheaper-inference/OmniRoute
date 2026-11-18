import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { z } from "zod";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dir = mkdtempSync(join(tmpdir(), "m365-oauth-route-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.JWT_SECRET = "synthetic-m365-route-management";
process.env.STORAGE_ENCRYPTION_KEY = "synthetic-m365-route-storage";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
await updateSettings({ requireLogin: true, password: "synthetic-configured-password-hash" });
const redirect = "https://login.microsoftonline.com/common/oauth2/nativeclient";
const attemptSchema = z.object({
  authUrl: z.string(),
  state: z.string(),
  codeVerifier: z.string(),
  redirectUri: z.string(),
  expiresAt: z.number(),
});
const params = (action: string) => ({
  params: Promise.resolve({ provider: "copilot-m365-web", action }),
});
test.after(() => {
  core.resetDbInstance();
  rmSync(dir, { recursive: true, force: true });
});
async function issue(connectionId?: string) {
  return route.GET(
    await makeManagementSessionRequest(
      `http://localhost/api/oauth/copilot-m365-web/authorize${connectionId ? `?connectionId=${connectionId}` : ""}`
    ),
    params("authorize")
  );
}
async function exchange(body: Record<string, unknown>) {
  return route.POST(
    await makeManagementSessionRequest("http://localhost/api/oauth/copilot-m365-web/exchange", {
      method: "POST",
      body,
    }),
    params("exchange")
  );
}

test("M365 authorize remains management-only and never creates a loopback callback", async () => {
  const unauthorized = await route.GET(
    new Request("http://localhost/api/oauth/copilot-m365-web/authorize"),
    params("authorize")
  );
  assert.equal(unauthorized.status, 401);
  const response = await issue();
  assert.equal(response.status, 200);
  const attempt = attemptSchema.parse(await response.json());
  assert.equal(new URL(attempt.authUrl).searchParams.get("redirect_uri"), redirect);
  assert.equal(attempt.redirectUri, redirect);
  const callback = await route.GET(
    await makeManagementSessionRequest(
      "http://localhost/api/oauth/copilot-m365-web/start-callback-server"
    ),
    params("start-callback-server")
  );
  assert.equal(callback.status, 400);
});

test("M365 route rejects raw code, state mismatch and wrong redirect before fetching", async (t) => {
  const response = await issue();
  assert.equal(response.status, 200);
  const a = attemptSchema.parse(await response.json());
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw new Error("unexpected network");
  });
  const valid = {
    code: `${redirect}?code=synthetic&state=${a.state}`,
    state: a.state,
    codeVerifier: a.codeVerifier,
    redirectUri: redirect,
  };
  for (const change of [
    { code: "raw-code" },
    { state: "wrong" },
    { redirectUri: "http://localhost/callback" },
  ]) {
    assert.equal((await exchange({ ...valid, ...change })).status, 400);
  }
  assert.equal(calls, 0);
});

test("M365 route persists a successful issued attempt once without returning tokens", async (t) => {
  const response = await issue();
  assert.equal(response.status, 200);
  const a = attemptSchema.parse(await response.json());
  const oid = "11111111-1111-4111-8111-111111111111";
  const tid = "22222222-2222-4222-8222-222222222222";
  const access = `e30.${Buffer.from(JSON.stringify({ oid, tid, preferred_username: "fixture@example.invalid" })).toString("base64url")}.signature`;
  let grants = 0;
  t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(String(url), "https://login.microsoftonline.com/common/oauth2/v2.0/token");
    assert.equal(
      new URLSearchParams(String(options?.body)).get("grant_type"),
      "authorization_code"
    );
    grants++;
    return Response.json({
      access_token: access,
      refresh_token: "synthetic-rotating-refresh",
      expires_in: 3600,
      token_type: "Bearer",
    });
  });
  const body = {
    code: `${redirect}?code=synthetic&state=${a.state}`,
    state: a.state,
    codeVerifier: a.codeVerifier,
    redirectUri: redirect,
  };
  const completed = await exchange(body);
  assert.equal(completed.status, 200);
  const data = await completed.json();
  assert.equal(data.success, true);
  assert.doesNotMatch(JSON.stringify(data), /synthetic-rotating-refresh|accessToken|refreshToken/);
  const saved = await providers.getProviderConnectionById(data.connection.id);
  assert.equal(saved.accessToken, access);
  assert.equal(saved.refreshToken, "synthetic-rotating-refresh");
  assert.equal(saved.authType, "oauth");
  assert.equal(saved.expiresAt, saved.tokenExpiresAt);
  const duplicate = await exchange(body);
  assert.equal(duplicate.status, 400);
  assert.equal(grants, 1);
});

test("M365 route rejects wrong-account reauth without mutating either persisted account", async (t) => {
  const tenant = "44444444-4444-4444-8444-444444444444";
  const objects = ["55555555-5555-4555-8555-555555555555", "66666666-6666-4666-8666-666666666666"];
  const ids: string[] = [];
  for (const oid of objects) {
    const row = await providers.createProviderConnection({
      provider: "copilot-m365-web",
      authType: "oauth",
      name: `Operator ${oid}`,
      email: "same@example.invalid",
      accessToken: "synthetic-old-access",
      refreshToken: "synthetic-old-refresh",
      providerSpecificData: { oid, tid: tenant },
    });
    ids.push(z.string().parse(row.id));
  }
  // Snapshot actual decrypted rows, not lazy proxies that could change under observation.
  const snapshot = async () =>
    Promise.all(
      ids.map(async (id) =>
        JSON.parse(JSON.stringify(await providers.getProviderConnectionById(id)))
      )
    );
  const before = await snapshot();
  const a = attemptSchema.parse(await (await issue(ids[0])).json());
  const wrongAccess = `e30.${Buffer.from(JSON.stringify({ oid: objects[1], tid: tenant, preferred_username: "same@example.invalid" })).toString("base64url")}.signature`;
  let grants = 0;
  t.mock.method(globalThis, "fetch", async () => {
    grants++;
    return Response.json({
      access_token: wrongAccess,
      refresh_token: "synthetic-new-refresh",
      expires_in: 3600,
      token_type: "Bearer",
    });
  });
  const body = {
    code: `${redirect}?code=synthetic&state=${a.state}`,
    state: a.state,
    codeVerifier: a.codeVerifier,
    redirectUri: redirect,
    connectionId: ids[0],
  };
  const rejected = await exchange(body);
  assert.equal(rejected.status, 400);
  assert.doesNotMatch(await rejected.text(), /synthetic-new-refresh|same@example|signature/);
  assert.deepEqual(await snapshot(), before);
  assert.equal((await exchange(body)).status, 400);
  assert.equal(grants, 1);
  assert.deepEqual(await snapshot(), before);
});
