import test from "node:test";
import assert from "node:assert/strict";
import {
  setCredentialHealth,
  isCredentialHealthy,
  getCredentialHealth,
  __test_resetCredentialHealthCache,
  CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG,
} from "../../src/lib/credentialHealth/cache.ts";
import { checkCredentialGate } from "../../open-sse/services/credentialGate.ts";

test.afterEach(() => {
  __test_resetCredentialHealthCache();
  delete process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG];
});

test("Issue #20256: single probe timeout (504 / 8000ms) does not block healthy provider routing under default configuration", () => {
  delete process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG];

  const connectionId = "conn-deepseek-1";
  const provider = "deepseek";
  const modelStr = "deepseek/deepseek-flash";
  const timeoutMsg = "Request to https://api.deepseek.com/models timed out after 8000ms";

  // Simulate scheduler recording an inconclusive timeout failure with diagnosis "upstream_unavailable" or "network_error"
  setCredentialHealth(
    connectionId,
    provider,
    "error",
    timeoutMsg,
    "upstream_unavailable",
    "upstream",
    8005
  );

  // Status is recorded as error in cache
  const cached = getCredentialHealth(connectionId);
  assert.equal(cached?.status, "error");
  assert.equal(cached?.lastErrorType, "upstream_unavailable");

  // Under default (auth diagnoses only = true), credential health is not rejected as false
  const healthy = isCredentialHealthy(connectionId);
  assert.equal(
    healthy,
    undefined,
    "inconclusive probe timeout must return undefined (unknown), not false"
  );

  // Fast credential gate must allow traffic through instead of returning 503 Credential gate blocked
  const gateResult = checkCredentialGate(connectionId, provider, modelStr);
  assert.notEqual(gateResult.allowed, false, "probe timeout must not block combo dispatch");
});

test("Issue #20256: untyped scheduler errors do not block healthy provider routing under default configuration", () => {
  delete process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG];

  const connectionId = "conn-deepseek-untyped";
  const provider = "deepseek";
  const modelStr = "deepseek/deepseek-flash";

  // Scheduler catch path records runtime_error
  setCredentialHealth(
    connectionId,
    provider,
    "error",
    "Scheduler error: Event loop lag / IO timeout",
    "runtime_error",
    "scheduler"
  );

  const healthy = isCredentialHealthy(connectionId);
  assert.equal(healthy, undefined);

  const gateResult = checkCredentialGate(connectionId, provider, modelStr);
  assert.notEqual(gateResult.allowed, false);
});

test("Issue #20256: proven bad credentials still block dispatch under default configuration", () => {
  delete process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG];

  const connectionId = "conn-bad-key";
  const provider = "deepseek";
  const modelStr = "deepseek/deepseek-flash";

  setCredentialHealth(
    connectionId,
    provider,
    "error",
    "Authentication failed: 401 Unauthorized",
    "upstream_auth_error",
    "upstream"
  );

  const healthy = isCredentialHealthy(connectionId);
  assert.equal(healthy, false, "confirmed bad auth must return false");

  const gateResult = checkCredentialGate(connectionId, provider, modelStr);
  assert.equal(gateResult.allowed, false, "bad auth must be blocked by the credential gate");
  assert.match(gateResult.reason ?? "", /known-bad credentials/);
});

test("Issue #20256: opting out via CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY=false restores legacy strict blocking", () => {
  process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG] = "false";

  const connectionId = "conn-strict-optout";
  const provider = "deepseek";
  const modelStr = "deepseek/deepseek-flash";

  setCredentialHealth(
    connectionId,
    provider,
    "error",
    "Ambiguous probe failure",
    "runtime_error",
    "scheduler"
  );

  const healthy = isCredentialHealthy(connectionId);
  assert.equal(healthy, false, "with flag=false, inconclusive errors block as in legacy gate");

  const gateResult = checkCredentialGate(connectionId, provider, modelStr);
  assert.equal(gateResult.allowed, false);
});
