import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fallback-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { recordProviderFailure, clearProviderFailure, filterAvailableAccounts } =
  await import("../../open-sse/services/accountFallback.ts");
const { connectionCircuitBreakerName } =
  await import("../../open-sse/services/connectionCircuitBreaker.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("clearProviderFailure with an alias clears the dedupe entries kept under the canonical id", () => {
  const originalNow = Date.now;
  Date.now = () => 1_700_000_000_000;
  try {
    const profile = { failureThreshold: 20_000, resetTimeoutMs: 60_000 };
    const breaker = getCircuitBreaker(connectionCircuitBreakerName("claude", "conn-alias"));
    clearProviderFailure("claude");
    breaker.reset();
    recordProviderFailure("claude", undefined, "conn-alias", profile);
    const first = breaker.getStatus().failureCount;
    // The failure was stored under "claude"; the reset is requested with the alias "cc".
    // Same instant: the 5 s dedupe window is still open unless the reset cleared its entry.
    clearProviderFailure("cc");
    recordProviderFailure("claude", undefined, "conn-alias", profile);
    const second = breaker.getStatus().failureCount;
    assert.equal(first, 1);
    assert.equal(second, 2, "a failure after the reset must count (no stale dedupe entry)");
  } finally {
    Date.now = originalNow;
    clearProviderFailure("claude");
  }
});

test("filterAvailableAccounts drops banned, expired and credits-exhausted accounts", () => {
  const out = filterAvailableAccounts([
    { id: "ok" },
    { id: "banned", status: "banned" },
    { id: "expired", status: "expired" },
    { id: "credits", status: "credits_exhausted" },
    { id: "active", status: "active" },
  ]).map((account) => account.id);
  assert.deepEqual(out, ["ok", "active"]);
});

test("filterAvailableAccounts keeps its rate-limit and exclude rules", () => {
  const future = new Date(Date.now() + 60_000).toISOString();
  const past = new Date(Date.now() - 60_000).toISOString();
  const out = filterAvailableAccounts(
    [
      { id: "limited", rateLimitedUntil: future },
      { id: "recovered", rateLimitedUntil: past },
      { id: "excluded" },
    ],
    "excluded"
  ).map((account) => account.id);
  assert.deepEqual(out, ["recovered"]);
});
