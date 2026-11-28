// A key whose base URL is loopback or private must be benched for a few seconds at most:
// it never climbs the backoff ladder and ignores a long Retry-After (one slow local
// generation must not park the key for minutes).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-self-hosted-backoff-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "self-hosted-backoff-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");

const SELF_HOSTED_MAX_COOLDOWN_MS = 5_000;

async function seed(provider: string, name: string, baseUrl: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `${name}-key`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { baseUrl },
  });
}

async function fail429(connectionId: string, provider: string, retryAfterSeconds: number) {
  return auth.markAccountUnavailable(
    connectionId,
    429,
    "Too many requests",
    provider,
    "model-a",
    null,
    { headers: { "retry-after": String(retryAfterSeconds) } }
  );
}

test.beforeEach(() => {
  fallback.clearAllModelLockouts();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a loopback key ignores a long Retry-After and is benched for seconds", async () => {
  const conn = await seed("openai-compatible-local-a", "local-a", "http://127.0.0.1:11434/v1");
  const result = await fail429(conn.id, "openai-compatible-local-a", 120);
  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs <= SELF_HOSTED_MAX_COOLDOWN_MS,
    `loopback cooldown ${result.cooldownMs}ms exceeds ${SELF_HOSTED_MAX_COOLDOWN_MS}ms`
  );
});

test("a private-network key is capped the same way", async () => {
  const conn = await seed("openai-compatible-lan-a", "lan-a", "http://192.168.1.20:8080/v1");
  const result = await fail429(conn.id, "openai-compatible-lan-a", 120);
  assert.ok(result.cooldownMs <= SELF_HOSTED_MAX_COOLDOWN_MS, `got ${result.cooldownMs}ms`);
});

test("a public key still honours Retry-After", async () => {
  const conn = await seed("openai-compatible-remote-a", "remote-a", "https://api.example.com/v1");
  const result = await fail429(conn.id, "openai-compatible-remote-a", 120);
  assert.ok(result.cooldownMs >= 100_000, `got ${result.cooldownMs}ms`);
});
