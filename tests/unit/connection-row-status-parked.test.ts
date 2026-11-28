import test from "node:test";
import assert from "node:assert/strict";
import { getStatusPresentation } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowStatus.ts";

const t = (key: string) => key;

test("a parked row shows its own verdict instead of the last error", () => {
  const row = { isActive: true, testStatus: "deactivated", lastErrorType: "upstream_auth_error" };
  const view = getStatusPresentation(row as never, "deactivated", false, t);
  assert.equal(view.errorType, "account_deactivated");
});

test("an expired row shows expiry rather than an unrelated error type", () => {
  const row = { isActive: true, testStatus: "expired", lastErrorType: "upstream_rate_limited" };
  const view = getStatusPresentation(row as never, "expired", false, t);
  assert.equal(view.errorType, "expired");
});

test("an ordinary failure still reports its own error type", () => {
  const row = { isActive: true, testStatus: "error", lastErrorType: "upstream_auth_error" };
  const view = getStatusPresentation(row as never, "error", false, t);
  assert.equal(view.errorType, "upstream_auth_error");
});
