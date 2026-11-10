import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-workspace-budget-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Pinned before the imports: the allowlist is read at module load, and an inherited
// "none" would let this test pass without the exemption.
process.env.OMNIROUTE_EGRESS_IP_LOCK_PROVIDERS = "opencode-go,opencode-cli";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const SHARED_EGRESS_IP = "198.51.100.42";
const WORKSPACE_POLICY_429 = '{"error":{"message":"Policy budget exceeded"}}';

async function resetStorage(): Promise<void> {
  const db = core.getDbInstance();
  db.exec("DELETE FROM provider_connections");
  db.exec("DELETE FROM proxy_logs");
}

async function seedConnection(
  provider: string,
  extra: Record<string, unknown> = {}
): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    apiKey: `key-${Math.random().toString(36).slice(2)}`,
    isActive: true,
    testStatus: "active",
    ...extra,
  });
  return String(conn.id);
}

function seedProxyLog(connectionId: string, egressIp: string): void {
  proxyLogger.logProxyEvent({
    targetUrl: "https://api.example.test/v1/chat",
    egressIp,
    connectionId,
    provider: "opencode-go",
    status: "success",
  });
  proxyLogger.flushProxyLogsSync();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Issue #19314: 429 Policy budget exceeded cools failing connection but leaves sibling accounts alone", async () => {
  await resetStorage();
  const connA = await seedConnection("opencode-go");
  const connB = await seedConnection("opencode-go");
  seedProxyLog(connA, SHARED_EGRESS_IP);
  seedProxyLog(connB, SHARED_EGRESS_IP);

  const result = await auth.markAccountUnavailable(
    connA,
    429,
    WORKSPACE_POLICY_429,
    "opencode-go",
    "model-x",
    null,
    {}
  );
  assert.equal(result.shouldFallback, true);

  const [a, b] = await Promise.all([
    providersDb.getProviderConnectionById(connA),
    providersDb.getProviderConnectionById(connB),
  ]);

  // Account A (failing account) should fallback and lock
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0, "result must indicate a cooldown");
  assert.equal(
    accountFallback.isModelLocked("opencode-go", connA, "model-x"),
    true,
    "model-x must be locked for account A"
  );

  assert.doesNotMatch(
    String(a!.lastError ?? ""),
    /Shared egress IP/,
    "account A must not be labelled as an egress-IP exhaustion"
  );

  // Account B (sibling with independent quota) must NOT be cooled or locked by account A's workspace budget
  assert.equal(
    accountFallback.isModelLocked("opencode-go", connB, "model-x"),
    false,
    "model-x must not be locked for sibling account B"
  );
  assert.equal(
    b!.testStatus,
    "active",
    "sibling B must remain active when account A hits workspace policy budget"
  );
  assert.ok(
    !b!.rateLimitedUntil,
    "sibling B must not carry a rateLimitedUntil cooldown from account A's workspace budget"
  );
  assert.doesNotMatch(
    String(b!.lastError ?? ""),
    /Shared egress IP/,
    "sibling B must not record the egress-IP lockout"
  );
});
