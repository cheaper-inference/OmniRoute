import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.JWT_SECRET = "test-only-jwt-secret-for-zcode";
process.env.STORAGE_ENCRYPTION_KEY = "test-only-encryption-key-for-zcode";
const harness = await createChatPipelineHarness("zcode-oauth-storage");
await harness.settingsDb.updateSettings({ requireLogin: false });
process.env.JWT_SECRET = "test-only-jwt-secret-for-zcode";
const start = await import("../../src/app/api/oauth/zcode/login/start/route.ts");
const poll = await import("../../src/app/api/oauth/zcode/login/poll/route.ts");
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { mintDashboardSessionToken } =
  await import("../../src/shared/utils/dashboardSessionToken.ts");
const cookie = `auth_token=${await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET))}`;
const oldFetch = globalThis.fetch;
test.after(async () => {
  globalThis.fetch = oldFetch;
  await harness.cleanup();
});
function request(path: string, body: unknown) {
  return new Request(`http://localhost:20128/api/oauth/zcode/login/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify(body),
  });
}
test("route saves separate encrypted connections for both regions", async () => {
  globalThis.fetch = async (input, init) => {
    const url = String(input);
    if (url.endsWith("/init")) {
      const family = JSON.parse(String(init?.body)).provider;
      return Response.json({
        code: 0,
        data: {
          flow_id: family,
          authorize_url: "https://example.com/login",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 1,
        },
      });
    }
    if (url.endsWith("/api/auth/z/login"))
      return Response.json({ code: 200, data: { access_token: "business-zai" } });
    const family = url.split("/").pop()!;
    return Response.json({
      code: 0,
      data: {
        status: "ready",
        token: `jwt-${family}`,
        user: { user_id: family, email: "same@example.com" },
        [family]: { access_token: `access-${family}`, refresh_token: `refresh-${family}` },
      },
    });
  };
  const ids: string[] = [];
  for (const family of ["zai", "bigmodel"]) {
    const begun = await start.POST(request("start", { family }));
    assert.equal(begun.status, 200);
    const { sessionId } = await begun.json();
    const done = await poll.POST(request("poll", { sessionId }));
    assert.equal(done.status, 200);
    const result = await done.json();
    assert.equal(result.status, "ok");
    ids.push(result.connection.id);
  }
  assert.notEqual(ids[0], ids[1]);
  for (const [provider, index] of [
    ["zcode-start", 0],
    ["zcode-individual", 0],
    ["zcode-cn-start", 1],
    ["zcode-cn-individual", 1],
  ] as const) {
    const selected = await auth.getProviderCredentials(provider, null, [ids[index]]);
    assert.equal(selected?.connectionId, ids[index], "alias selects its allowed regional account");
    assert.equal(selected?.idToken, index === 0 ? "jwt-zai" : "jwt-bigmodel");
  }
  const rows = await db.getProviderConnections({ provider: "zcode" });
  assert.equal(rows.length, 2);
  assert.ok(
    rows.every((row) => row.testStatus === "active"),
    "completed OAuth is connected in the UI"
  );
  assert.deepEqual(rows.map((r: { accessToken: string }) => r.accessToken).sort(), [
    "access-bigmodel",
    "business-zai",
  ]);
  const raw = core
    .getDbInstance()
    .prepare(
      "SELECT access_token, id_token, refresh_token FROM provider_connections WHERE provider = ?"
    )
    .all("zcode") as Array<Record<string, string | null>>;
  for (const row of raw) {
    assert.match(row.access_token!, /^enc:v1:/);
    assert.match(row.id_token!, /^enc:v1:/);
    if (row.refresh_token) assert.match(row.refresh_token, /^enc:v1:/);
  }
  for (const [index, family] of ["zai", "bigmodel"].entries()) {
    const selected = await auth.getProviderCredentials("zcode", null, null, null, {
      forcedConnectionId: ids[index],
    });
    assert.equal(selected?.idToken, `jwt-${family}`);
    assert.equal(selected?.accessToken, family === "zai" ? "business-zai" : `access-${family}`);
    const individual = await auth.getProviderCredentials("zcode-individual", null, null, null, {
      forcedConnectionId: ids[index],
    });
    assert.equal(individual?.connectionId, ids[index]);
    assert.equal(individual?.accessToken, family === "zai" ? "business-zai" : `access-${family}`);
  }
  const denied = await auth.getProviderCredentials("zcode-individual", null, [ids[0]], null, {
    forcedConnectionId: ids[1],
  });
  assert.equal(denied?.blockedByKeyPolicy, true);
  assert.equal(denied?.accessToken, undefined);
});

test("reauthorization updates the same account and rejects a different identity", async () => {
  const original = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "keep this name",
    accessToken: "old-access",
    idToken: "old-jwt",
    providerSpecificData: { family: "zai", userId: "original-user", custom: "keep" },
  });
  let userId = "other-user";
  globalThis.fetch = async (input) =>
    String(input).endsWith("/api/auth/z/login")
      ? Response.json({ code: 200, data: { access_token: "business-zai" } })
      : String(input).endsWith("/init")
        ? Response.json({
            code: 0,
            data: {
              flow_id: "reauth",
              authorize_url: "https://example.com/login",
              expires_at: Date.now() / 1000 + 300,
              poll_interval_sec: 1,
            },
          })
        : Response.json({
            code: 0,
            data: {
              status: "ready",
              token: "new-jwt",
              user: { user_id: userId },
              zai: { access_token: "new-access" },
            },
          });
  const attempt = async () => {
    const begun = await start.POST(request("start", { family: "zai", connectionId: original.id }));
    assert.equal(begun.status, 200);
    const { sessionId } = await begun.json();
    return poll.POST(request("poll", { sessionId }));
  };
  assert.equal((await attempt()).status, 409);
  assert.equal((await db.getProviderConnectionById(original.id))?.idToken, "old-jwt");
  userId = "original-user";
  const completed = await attempt();
  assert.equal(completed.status, 200);
  assert.equal((await completed.json()).connection.id, original.id);
  const updated = await db.getProviderConnectionById(original.id);
  assert.equal(updated?.idToken, "new-jwt");
  assert.equal(updated?.name, "keep this name");
  assert.equal(updated?.providerSpecificData?.custom, "keep");
});

test("requires configured encryption before contacting provider", async () => {
  const oldKey = process.env.STORAGE_ENCRYPTION_KEY;
  delete process.env.STORAGE_ENCRYPTION_KEY;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("unexpected fetch");
  };
  try {
    const response = await start.POST(request("start", { family: "zai" }));
    assert.equal(response.status, 503);
    assert.equal(called, false);
  } finally {
    process.env.STORAGE_ENCRYPTION_KEY = oldKey;
  }
});

test("anonymous public access is denied even with login disabled", async () => {
  const anonymous = new Request("http://localhost:20128/api/oauth/zcode/login/start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ family: "zai" }),
  });
  assert.equal((await start.POST(anonymous)).status, 401);
});

test("a second dashboard identity cannot poll the first session", async () => {
  globalThis.fetch = async () =>
    Response.json({
      code: 0,
      data: {
        flow_id: "f",
        authorize_url: "https://example.com",
        expires_at: Date.now() / 1000 + 300,
        poll_interval_sec: 1,
      },
    });
  const begun = await start.POST(request("start", { family: "zai" }));
  const { sessionId } = await begun.json();
  const secondCookie = `auth_token=${await mintDashboardSessionToken(new TextEncoder().encode(process.env.JWT_SECRET))}`;
  const other = new Request("http://localhost:20128/api/oauth/zcode/login/poll", {
    method: "POST",
    headers: { "content-type": "application/json", cookie: secondCookie },
    body: JSON.stringify({ sessionId }),
  });
  assert.equal((await poll.POST(other)).status, 410);
});

test("receipt reconciles an error after SQLite insert without a duplicate", async () => {
  const { startZcodeLogin, pollZcodeLogin } =
    await import("../../src/lib/oauth/services/zcodeLogin.ts");
  const { persistZcodeConnection } =
    await import("../../src/lib/oauth/services/zcodePersistence.ts");
  let polls = 0;
  globalThis.fetch = async (input) => {
    if (String(input).endsWith("/init"))
      return Response.json({
        code: 0,
        data: {
          flow_id: "f",
          authorize_url: "https://example.com",
          expires_at: Date.now() / 1000 + 300,
          poll_interval_sec: 1,
        },
      });
    if (String(input).endsWith("/api/auth/z/login"))
      return Response.json({ code: 200, data: { access_token: "business-zai" } });
    polls++;
    return Response.json({
      code: 0,
      data: {
        status: "ready",
        token: "jwt-after",
        user: { user_id: "after-error" },
        zai: { access_token: "access-after" },
      },
    });
  };
  const s = await startZcodeLogin("zai", "test-owner");
  await assert.rejects(
    pollZcodeLogin(s.sessionId, "test-owner", async (...args) => {
      await persistZcodeConnection(...args);
      throw Error("failure after commit");
    })
  );
  const result = await pollZcodeLogin(s.sessionId, "test-owner", persistZcodeConnection);
  assert.equal(result.status, "ok");
  assert.equal(polls, 1);
  const rows = await db.getProviderConnections({ provider: "zcode" }, 1000000);
  assert.equal(
    rows.filter(
      (r: { providerSpecificData?: { userId?: string } }) =>
        r.providerSpecificData?.userId === "after-error"
    ).length,
    1
  );
});
