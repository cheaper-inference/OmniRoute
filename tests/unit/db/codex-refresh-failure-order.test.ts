import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-refresh-failure-order-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const fences = await import("../../../src/lib/db/codexConnectionFences.ts");
const tokens = await import("../../../src/sse/services/tokenRefresh.ts");

test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

for (const newerFailure of [false, true]) {
  test(`refresh persistence ${newerFailure ? "keeps a failure written while awaiting validation" : "still clears an older transient error"}`, async () => {
    const connection = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      accessToken: "synthetic-original",
      refreshToken: "synthetic-original-refresh",
      isActive: true,
      testStatus: "active",
      lastError: "old transient error",
    });
    const fence = fences.captureCodexConnectionFence(connection, connection.id);
    const operation = fences.runWithCodexConnectionFence(fence, () =>
      tokens.updateProviderCredentials(connection.id, {
        accessToken: "synthetic-rotated",
        refreshToken: "synthetic-rotated-refresh",
        testStatus: "active",
      })
    );
    // The writer has checked recovery ordering, then awaits API-key validation.
    // An independent writer can commit here before its guarded transaction starts.
    if (newerFailure)
      core
        .getDbInstance()
        .prepare(
          "UPDATE provider_connections SET test_status = ?, last_error = ?, last_error_type = ? WHERE id = ?"
        )
        .run("banned", "new terminal failure", "account_banned", connection.id);
    assert.equal(await operation, true, "valid token rotation must be retained");
    const after = await providers.getProviderConnectionById(connection.id);
    assert.equal(after?.accessToken, "synthetic-rotated");
    assert.equal(after?.refreshToken, "synthetic-rotated-refresh");
    assert.equal(after?.testStatus, newerFailure ? "banned" : "active");
    assert.equal(after?.lastError, newerFailure ? "new terminal failure" : undefined);
    if (newerFailure) assert.equal(after?.lastErrorType, "account_banned");
  });
}
