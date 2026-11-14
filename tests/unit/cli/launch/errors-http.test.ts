import { test } from "node:test";
import assert from "node:assert/strict";

import {
  LaunchError,
  errorJson,
  exitCodeFor,
  formatError,
  httpError,
  toLaunchError,
} from "../../../../bin/cli/launch/core/errors.mjs";

test("httpError: 2xx is not an error", () => {
  assert.equal(httpError(200, "x"), null);
  assert.equal(httpError(204, "x"), null);
  assert.equal(httpError(299, "x"), null);
});

test("httpError: 401 and 403 are AuthFailed with a login hint", () => {
  for (const status of [401, 403]) {
    const err = httpError(status, "session mint");
    assert.equal(err.code, "AuthFailed");
    assert.equal(err.message, `session mint was refused (HTTP ${status})`);
    assert.equal(err.hint, "check --api-key / --context, or log in with `omniroute login`");
  }
});

test("httpError: 404 maps to notFound when given, with a hint only for GatewayTooOld", () => {
  const old = httpError(404, "view", { notFound: "GatewayTooOld" });
  assert.equal(old.code, "GatewayTooOld");
  assert.equal(old.message, "view: endpoint not found (HTTP 404)");
  assert.equal(old.hint, "upgrade the OmniRoute gateway, or use `omniroute run <tool>` (unscoped)");
  const other = httpError(404, "view", { notFound: "FeatureUnsupported" });
  assert.equal(other.code, "FeatureUnsupported");
  assert.equal(other.hint, undefined);
  assert.equal("hint" in other, false);
  const unmapped = httpError(404, "view");
  assert.equal(unmapped.code, "GatewayUnreachable");
  assert.equal(unmapped.message, "view failed (HTTP 404)");
});

test("httpError: 400 and 422 map to badRequest when given, else GatewayUnreachable", () => {
  for (const status of [400, 422]) {
    const err = httpError(status, "mint", { badRequest: "ConfigConflict" });
    assert.equal(err.code, "ConfigConflict");
    assert.equal(err.message, `mint was rejected (HTTP ${status})`);
    assert.equal(httpError(status, "mint").code, "GatewayUnreachable");
  }
  const server = httpError(500, "mint", {
    badRequest: "ConfigConflict",
    notFound: "GatewayTooOld",
  });
  assert.equal(server.code, "GatewayUnreachable");
  assert.equal(server.message, "mint failed (HTTP 500)");
  assert.equal(httpError(302, "mint").code, "GatewayUnreachable");
});

test("toLaunchError / exitCodeFor / formatError / errorJson for thrown values", () => {
  const launch = new LaunchError("UsageError", "bad", { hint: "try again" });
  assert.equal(toLaunchError(launch), launch);
  const wrapped = toLaunchError(new Error("boom"));
  assert.equal(wrapped.code, "Internal");
  assert.equal(wrapped.message, "internal error: boom");
  assert.equal(toLaunchError("text").message, "internal error");
  assert.equal(toLaunchError(null).message, "internal error");
  assert.equal(exitCodeFor(launch), 2);
  assert.equal(exitCodeFor(new LaunchError("BudgetExceeded", "over"), 5), 5);
  assert.equal(exitCodeFor(new LaunchError("BudgetExceeded", "over")), 1);
  assert.equal(formatError(launch), "omnirouter: bad\n  hint: try again\n");
  assert.equal(
    formatError(new Error("x"), { prefix: "omniroute" }),
    "omniroute: internal error: x\n"
  );
  assert.equal(errorJson(launch).error.code, "UsageError");
});
