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
import { registerFeatureFlagResolver } from "../../src/shared/utils/featureFlagResolverBridge.ts";

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

test("Issue #20256: an empty CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY uses the default when no resolver is registered", () => {
  // Without the server resolver (client bundle, or before featureFlags.ts loads) the gate
  // reads the env directly. An empty value must count as unset, like resolveFeatureFlag().
  const resolverKey = Symbol.for("omniroute.featureFlagResolver");
  const saved = (globalThis as Record<symbol, unknown>)[resolverKey];
  registerFeatureFlagResolver(null);
  process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG] = "";
  try {
    const connectionId = "conn-empty-env";
    setCredentialHealth(
      connectionId,
      "deepseek",
      "error",
      "Scheduler error",
      "runtime_error",
      "scheduler"
    );

    assert.equal(isCredentialHealthy(connectionId), undefined);
    assert.notEqual(
      checkCredentialGate(connectionId, "deepseek", "deepseek/deepseek-flash").allowed,
      false
    );
  } finally {
    if (typeof saved === "function") {
      registerFeatureFlagResolver(saved as (key: string) => boolean);
    }
  }
});

test("Issue #20256: with the server resolver registered, the definition default and DB override drive the gate", async () => {
  // Production path: featureFlags.ts registers the DB-aware resolver on load.
  delete process.env[CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG];
  await import("../../src/shared/utils/featureFlags.ts");
  const { setFeatureFlagOverride, removeFeatureFlagOverride } =
    await import("../../src/lib/db/featureFlags.ts");
  const core = await import("../../src/lib/db/core.ts");

  const connectionId = "conn-registered-resolver";
  const record = () =>
    setCredentialHealth(
      connectionId,
      "deepseek",
      "error",
      "Scheduler error",
      "runtime_error",
      "scheduler"
    );
  try {
    record();
    assert.equal(isCredentialHealthy(connectionId), undefined, "definition default is on");

    setFeatureFlagOverride(CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG, "false");
    record();
    assert.equal(isCredentialHealthy(connectionId), false, "DB override false restores strict");
    assert.equal(
      checkCredentialGate(connectionId, "deepseek", "deepseek/deepseek-flash").allowed,
      false
    );
  } finally {
    removeFeatureFlagOverride(CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY_FLAG);
    core.resetDbInstance();
  }
});
