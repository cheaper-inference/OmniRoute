import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-misalignment-state-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const originalFetch = globalThis.fetch;
let unexpectedFetches = 0;
globalThis.fetch = async () => {
  unexpectedFetches++;
  throw new Error("Unexpected network request in account-state regression");
};

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { isRequestScopedMisalignmentRefusal } =
  await import("../../open-sse/utils/providerSafety.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");
const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  rmSync(dataDir, { recursive: true, force: true });
  assert.equal(unexpectedFetches, 0, "account-state tests must not make network requests");
});

const code = "misalignment_policy_violation";

test("account-state classification accepts only the exact structured code and numeric status", () => {
  for (const status of [400, 403]) {
    assert.equal(isRequestScopedMisalignmentRefusal({ status, code }), true);
  }
  for (const input of [
    {},
    { code },
    { status: "403", code },
    { status: 403, code: [code] },
    { status: 403, code: `${code}_unrelated` },
    { status: 403, message: code },
    { status: 429, code },
    { status: 500, code },
  ]) {
    assert.equal(isRequestScopedMisalignmentRefusal(input), false);
  }
});

test("explicit misalignment refusals never become permanent account bans", () => {
  // Account-health classification must not depend on public error-projection flags.
  const previous = process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
  try {
    for (const status of [403, 400]) {
      const result = checkFallbackError(
        status,
        "Synthetic provider safety refusal",
        0,
        "test-model",
        "codex",
        null,
        null,
        { code, type: "invalid_request_error" }
      );
      assert.equal(result.shouldFallback, false);
      assert.equal(result.cooldownMs, 0);
      assert.notEqual(result.permanent, true);
      assert.equal(result.skipProviderBreaker, true);
    }
  } finally {
    if (previous === undefined) delete process.env.PROVIDER_SAFETY_STOPS_TERMINAL;
    else process.env.PROVIDER_SAFETY_STOPS_TERMINAL = previous;
  }
});

test("ordinary forbidden errors and lookalike codes keep their existing classification", () => {
  for (const structured of [
    undefined,
    { code: "permission_denied" },
    { code: `${code}_unrelated` },
  ]) {
    const result = checkFallbackError(
      403,
      "Forbidden",
      0,
      "test-model",
      "codex",
      null,
      null,
      structured
    );
    assert.equal(result.shouldFallback, true);
    assert.notEqual(result.reason, "content_policy_refusal");
  }
});

test("a conflicting status is not promoted to a misalignment refusal", () => {
  for (const status of [401, 429, 500, 502, 503]) {
    const result = checkFallbackError(
      status,
      "Synthetic upstream failure",
      0,
      "test-model",
      "codex",
      null,
      null,
      { code, type: "server_error" }
    );
    assert.equal(result.shouldFallback, true);
    assert.notEqual(result.reason, "content_policy_refusal");
  }
});

test("the real account-state path does not ban a connection after a misalignment refusal", async () => {
  for (const state of [
    { isActive: true, testStatus: "active" },
    { isActive: false, testStatus: "banned" },
    {
      isActive: true,
      testStatus: "unavailable",
      rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
      backoffLevel: 2,
    },
  ]) {
    const conn = await createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "Synthetic policy-state fixture",
      ...state,
    });
    const before = await getProviderConnectionById(conn.id);
    const result = await markAccountUnavailable(
      conn.id,
      403,
      "Synthetic provider safety refusal",
      "codex",
      "test-model",
      undefined,
      { structuredError: { code, type: "invalid_request_error" } }
    );
    const after = await getProviderConnectionById(conn.id);
    assert.equal(after?.isActive, before?.isActive, "do not disable or reactivate a connection");
    assert.equal(after?.testStatus, before?.testStatus);
    assert.equal(after?.rateLimitedUntil, before?.rateLimitedUntil);
    assert.equal(after?.backoffLevel, before?.backoffLevel);
    assert.equal(result.shouldFallback, false);
  }
});
