import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oc-15540c-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "oc-15540c-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const auth = await import("../../src/sse/services/auth.ts");
const skip = await import("../../open-sse/services/opencodeFreeTierSkip.ts");

async function reset() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  skip.clearOpencodeFreeTierSkips();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(reset);
test.after(async () => {
  await reset();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("retired OpenCode Free never resolves synthetic credentials with a forced noauth pin", async () => {
  assert.equal(Object.hasOwn(NOAUTH_PROVIDERS, "opencode"), false);
  for (const allowed of [null, [] as string[], ["noauth"]]) {
    const creds = await auth.getProviderCredentials("opencode", null, allowed, "big-pickle", {
      forcedConnectionId: "noauth",
    });
    assert.equal(creds, null, `allowed=${JSON.stringify(allowed)}: Free must remain retired`);
  }
});

test("authenticated Zen retains live-catalog scoping when one model was synced", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "OpenCode Account 1",
    apiKey: "test-zen-key",
    isActive: true,
    testStatus: "active",
  });
  await replaceSyncedAvailableModelsForConnection("opencode-zen", (conn as { id: string }).id, [
    { id: "big-pickle", name: "Big Pickle", source: "imported" },
  ]);

  // The long user alias still resolves to authenticated Zen; retired oc does not.
  for (const prefix of ["opencode-zen", "opencode"]) {
    const synced = await getModelInfo(`${prefix}/big-pickle`);
    assert.equal(
      synced.errorType,
      undefined,
      `control (synced model, ${prefix}/) failed: ${synced.errorMessage}`
    );

    for (const id of ["muse-spark-1.2", "deepseek-v4-flash-free", "north-mini-code-free"]) {
      const info = await getModelInfo(`${prefix}/${id}`);
      assert.equal(
        info.errorType,
        "model_not_found",
        `${prefix}/${id} must respect the authenticated connection live catalog`
      );
    }
  }
});
