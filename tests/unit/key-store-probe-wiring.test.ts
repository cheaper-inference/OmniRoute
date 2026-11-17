import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_KEY = process.env.STORAGE_ENCRYPTION_KEY;
process.env.STORAGE_ENCRYPTION_KEY = "wiring-key-0123456789-0123456789-abcd";

const core = await import("../../src/lib/db/core.ts");
const enc = await import("../../src/lib/db/encryption.ts");
const { buildHealthPayload } = await import("../../src/lib/monitoring/observability.ts");

const instrumentation = fs.readFileSync(path.resolve("src/instrumentation-node.ts"), "utf8");

function healthPayload() {
  return buildHealthPayload({
    appVersion: "1.2.3",
    settings: { setupComplete: true },
    connections: [],
    circuitBreakers: [],
    rateLimitStatus: {},
    learnedLimits: {},
    lockouts: {},
    localProviders: {},
    inflightRequests: 0,
    quotaMonitorSummary: {
      active: 0,
      alerting: 0,
      exhausted: 0,
      errors: 0,
      statusCounts: { starting: 0, idle: 0, healthy: 0, warning: 0, exhausted: 0, error: 0 },
      byProvider: {},
    },
    quotaMonitorMonitors: [],
    activeSessions: [],
    credentialHealth: { total: 0, healthy: 0, failed: 0, unknown: 0, stale: 0 },
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_KEY;
});

test("health payload reports keyStoreDecryptable null before the boot probe ran", () => {
  const { cryptography } = healthPayload() as { cryptography: Record<string, unknown> };
  assert.equal(cryptography.keyStoreDecryptable, null);
});

test("health payload reports the result of the stored-secret probe", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, api_key, created_at, updated_at) VALUES ('c1', 'openai', 'apikey', ?, ?, ?)"
  ).run(enc.encrypt("sk-test-secret"), now, now);

  assert.equal(enc.probeStoredSecrets(db), true);
  const { cryptography } = healthPayload() as { cryptography: Record<string, unknown> };
  assert.equal(cryptography.keyStoreDecryptable, true);
});

test("the real Next.js boot (instrumentation-node.ts) runs the stored-secret probe", () => {
  assert.match(instrumentation, /probeStoredSecrets\(/, "boot must call probeStoredSecrets");
  assert.match(
    instrumentation,
    /assertEncryptionKeyConfiguredForProduction[\s\S]{0,400}probeStoredSecrets/,
    "the probe runs next to the production key assertion"
  );
});
