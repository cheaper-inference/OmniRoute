// A successful OAuth refresh proves the Google token works, not that the account passed
// Google's "verify your account" check (403 VALIDATION_REQUIRED). While the verification link
// is stored, the refresh must not reset the connection to active.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "token-refresh-verification-"));
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const { getRefreshRecoveryUpdate } = await import("../../src/lib/tokenHealthCheck.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(process.env.DATA_DIR!, { recursive: true, force: true });
});

async function blockedAntigravity(providerSpecificData: Record<string, unknown>) {
  const conn = await db.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "access",
    refreshToken: "refresh",
    isActive: true,
    testStatus: "error",
    lastError: "Access denied",
    lastErrorType: "upstream_auth_error",
    errorCode: 403,
    providerSpecificData,
  });
  return (conn as { id: string }).id;
}

test("a refresh does not reset an account that still holds a verification link", async () => {
  const id = await blockedAntigravity({
    projectId: "proj-1",
    verificationUrl: "https://accounts.google.com/v3/signin/continue?plt=AKgnsbtTEST",
  });
  assert.deepEqual(await getRefreshRecoveryUpdate(id), {});
});

test("a refresh still clears the error state when no verification is pending", async () => {
  const id = await blockedAntigravity({ projectId: "proj-1" });
  const update = await getRefreshRecoveryUpdate(id);
  assert.equal(update.testStatus, "active");
  assert.equal(update.errorCode, null);
});
