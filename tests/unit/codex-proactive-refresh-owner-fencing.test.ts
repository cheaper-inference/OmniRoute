import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-proactive-owner-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { checkAndRefreshToken } = await import("../../src/sse/services/tokenRefresh.ts");
const { _clearTokenRotationMap } =
  await import("../../open-sse/services/tokenRefresh/rotationMap.ts");
const originalFetch = globalThis.fetch;
test.beforeEach(() => _clearTokenRotationMap());
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const owner = (tag: string) => ({
  accessToken: `synthetic-${tag}`,
  refreshToken: `synthetic-refresh-${tag}`,
  email: `${tag}@example.invalid`,
  providerSpecificData: { workspaceId: `workspace-${tag}` },
});
test.afterEach(() => {
  _clearTokenRotationMap();
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});
for (const aba of [false, true]) {
  test(`proactive OAuth refresh cannot hand out or persist a replaced ${aba ? "A-to-B-to-A" : "A-to-B"} owner`, async () => {
    const c = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      testStatus: "active",
      isActive: true,
      expiresAt: new Date(Date.now() - 60_000).toISOString(),
      ...owner("a"),
    });
    const started = deferred<void>();
    const release = deferred<Response>();
    globalThis.fetch = async (input) => {
      assert.ok(
        String(input).includes("auth.openai.com"),
        "only the synthetic OAuth refresh is authorized"
      );
      started.resolve();
      return release.promise;
    };
    const operation = checkAndRefreshToken("codex", { ...c, connectionId: c.id }).then(
      (value) => ({ value, error: null }),
      (error: unknown) => ({ value: null, error })
    );
    await Promise.race([
      started.promise,
      operation.then(() => {
        throw new Error("refresh never dispatched");
      }),
    ]);
    await providers.updateProviderConnection(c.id, owner("b"));
    if (aba) await providers.updateProviderConnection(c.id, owner("a"));
    const before = await providers.getProviderConnectionById(c.id);
    release.resolve(
      Response.json({
        access_token: "synthetic-late",
        refresh_token: "synthetic-late-refresh",
        expires_in: 3600,
      })
    );
    const result = await operation;
    const after = await providers.getProviderConnectionById(c.id);
    assert.equal(after?.accessToken, before?.accessToken);
    assert.equal(after?.refreshToken, before?.refreshToken);
    assert.ok(
      result.error ||
        !result.value?.accessToken ||
        result.value.accessToken === before?.accessToken,
      "a stale newly minted token must not escape as current dispatch credentials"
    );
  });
}

test("current-owner proactive refresh remains usable and persists its rotated refresh token", async () => {
  const c = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    ...owner("a"),
  });
  globalThis.fetch = async () =>
    Response.json({
      access_token: "synthetic-current",
      refresh_token: "synthetic-current-refresh",
      expires_in: 3600,
    });
  const result = await checkAndRefreshToken("codex", { ...c, connectionId: c.id });
  assert.equal(result.accessToken, "synthetic-current");
  assert.equal(
    (await providers.getProviderConnectionById(c.id))?.refreshToken,
    "synthetic-current-refresh"
  );
});
