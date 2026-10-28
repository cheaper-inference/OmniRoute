// Free retirement removes anonymous OpenCode fallback; other providers keep their contracts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-opencode-zen-noauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("OpenCode Zen and Go without connections never synthesize Free credentials", async () => {
  for (const provider of ["opencode-zen", "opencode-go"]) {
    const creds = await getProviderCredentials(provider);
    assert.equal(creds, null);
    assert.notEqual(creds?.connectionId, "noauth");
    assert.equal(creds?.apiKey, undefined);
  }
});

test("apikey providers with anonymous fallback use no-auth when saved rows are terminal", async () => {
  await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "expired-pollinations-key",
    apiKey: "pollinations-expired",
    isActive: true,
    testStatus: "expired",
  });

  const creds = await getProviderCredentials("pollinations");
  assert.ok(creds, "pollinations should fall back to anonymous credentials");
  assert.equal((creds as { connectionId?: string }).connectionId, "noauth");
  assert.equal((creds as { apiKey?: unknown }).apiKey, null);
});

test("#2962 a normal api-key provider with no connection still returns null (no over-broadening)", async () => {
  const creds = await getProviderCredentials("openai");
  // Must NOT synthesize no-auth creds for a real api-key provider.
  const connectionId = (creds as { connectionId?: string } | null)?.connectionId;
  assert.notEqual(connectionId, "noauth", "openai must not get anonymous no-auth credentials");
});

test("OpenCode Zen does not fall back to Free when saved key rows are unusable", async () => {
  await createProviderConnection({
    provider: "opencode-zen",
    authType: "apikey",
    name: "expired-test-key",
    apiKey: "oa_test_expired",
    isActive: true,
    testStatus: "expired",
  });

  const creds = await getProviderCredentials("opencode-zen");
  assert.equal(creds?.allExpired, true);
  assert.notEqual(creds?.connectionId, "noauth");
  assert.equal(creds?.apiKey, undefined);
});
