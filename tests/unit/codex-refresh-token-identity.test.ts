import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-refresh-owner-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "codex-refresh-owner-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const tokenRefresh = await import("../../src/sse/services/tokenRefresh.ts");

function syntheticCodexIdentityToken(accountId: string, userId: string): string {
  const claims = {
    sub: userId,
    "https://api.openai.com/auth": {
      chatgpt_account_id: accountId,
      chatgpt_user_id: userId,
    },
  };
  return `e30.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.test-signature`;
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Codex refresh does not persist a token belonging to a different user", async () => {
  const ownerToken = syntheticCodexIdentityToken("personal-a", "user-a");
  const otherToken = syntheticCodexIdentityToken("personal-b", "user-b");
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex token owner fence",
    accessToken: ownerToken,
    refreshToken: "original-refresh",
    idToken: ownerToken,
    isActive: true,
    providerSpecificData: {
      workspaceId: "personal-a",
      workspaceStructure: "personal",
    },
  });

  const applied = await tokenRefresh.updateProviderCredentials(String(connection.id), {
    accessToken: otherToken,
    refreshToken: "other-refresh",
  });
  const stored = await providersDb.getProviderConnectionById(String(connection.id));
  assert.equal(applied, false);
  assert.ok(stored);
  assert.equal(stored.accessToken, ownerToken);
  assert.equal(stored.refreshToken, "original-refresh");
});
