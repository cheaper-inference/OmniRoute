import assert from "node:assert/strict";
import test from "node:test";
import { createTempDataDir } from "../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("zcode-legacy-coexistence-");
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  cleanup();
});

test("managed accounts coexist with the unpinned local zcode profile", async () => {
  const account = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "Chinese account",
    accessToken: "fixture",
    idToken: "fixture",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { family: "bigmodel", userId: "cn-fixture" },
  });
  const legacy = await getProviderCredentials("zcode", null, null, "glm-5.3-flash");
  assert.equal(legacy?.connectionId, "noauth");
  const managed = await getProviderCredentials("zcode-cn-start", null, null, "glm-5.3-flash");
  assert.equal(managed?.connectionId, account.id);
  const pinned = await getProviderCredentials("zcode", null, null, "glm-5.3-flash", {
    forcedConnectionId: account.id,
  });
  assert.equal(pinned?.connectionId, account.id);
  const international = await getProviderCredentials("zcode-start", null, null, "glm-5.3-flash");
  assert.notEqual(international?.connectionId, "noauth");
  assert.notEqual(international?.connectionId, account.id);
});

test("OAuth aliases use the native host even when the legacy gateway is configured", async (t) => {
  const { ZcodeExecutor } = await import("../../open-sse/executors/zcode.ts");
  const { nativeZcodeHosts } = await import("../../open-sse/executors/zcode/nativeHostManager.ts");
  const { NativeSessionError } = await import("../../open-sse/executors/zcode/nativeSession.ts");
  const oldTransport = process.env.ZCODE_TRANSPORT;
  process.env.ZCODE_TRANSPORT = "gateway";
  t.after(() => {
    if (oldTransport === undefined) delete process.env.ZCODE_TRANSPORT;
    else process.env.ZCODE_TRANSPORT = oldTransport;
  });
  const native = t.mock.method(nativeZcodeHosts, "ensure", async () => {
    throw new NativeSessionError("fixture native authorization failure", 401);
  });
  const result = await new ZcodeExecutor({ provider: "zcode-start" }).execute({
    model: "glm-5.3-flash",
    body: { messages: [{ role: "user", content: "hello" }] },
    credentials: { authType: "oauth", connectionId: "fixture", accessToken: "fixture" },
    stream: false,
  });
  assert.equal(native.mock.callCount(), 1);
  assert.equal(("response" in result ? result.response : result).status, 401);
});
