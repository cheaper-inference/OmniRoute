import assert from "node:assert/strict";
import test from "node:test";
import {
  __test_resetCredentialHealthCache,
  getCredentialHealth,
  getCredentialHealthSummary,
  isCredentialHealthy,
  setCredentialHealth,
} from "../../src/lib/credentialHealth/cache.ts";
import { checkCredentialGate } from "../../open-sse/services/credentialGate.ts";

const FLAG = "CREDENTIAL_GATE_AUTH_DIAGNOSES_ONLY";
const AUTH_FAILURES = [
  "upstream_auth_error",
  "auth_missing",
  "token_expired",
  // Only emitted when the access token is already expired AND the refresh was rejected.
  "token_refresh_failed",
  "reauth_required",
  "account_deactivated",
  "auth_required",
];
const TRANSPORT_FAILURES = ["network_error", "upstream_unavailable", "upstream_rate_limited"];
const OTHER_INCONCLUSIVE_FAILURES = [
  "upstream_ambiguous_auth_or_quota",
  "provider_error",
  "runtime_error",
  "validation_error",
  "unsupported",
  "unknown",
  "",
  undefined,
];
const INCONCLUSIVE_FAILURES = [...TRANSPORT_FAILURES, ...OTHER_INCONCLUSIVE_FAILURES];

const originalFlag = process.env[FLAG];
const restoreFlag = () => {
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
};

test.afterEach(() => {
  __test_resetCredentialHealthCache();
  restoreFlag();
});

test(
  "flag off (default): only transport diagnoses bypass the legacy strict gate",
  { timeout: 2000 },
  () => {
    delete process.env[FLAG];
    assert.deepEqual(TRANSPORT_FAILURES, [
      "network_error",
      "upstream_unavailable",
      "upstream_rate_limited",
    ]);
    assert.ok(AUTH_FAILURES.length > 0 && OTHER_INCONCLUSIVE_FAILURES.length > 0);
    for (const type of TRANSPORT_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Probe failed", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), undefined, type);
      assert.notEqual(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
      assert.equal(getCredentialHealth("synthetic")?.lastErrorType, type);
    }
    for (const type of [...AUTH_FAILURES, ...OTHER_INCONCLUSIVE_FAILURES]) {
      setCredentialHealth("synthetic", "codex", "error", "Probe failed", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), false, String(type));
      assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
    }
    // Scheduler catch path: untyped error (no lastErrorType) still blocks by default.
    setCredentialHealth("synthetic", "codex", "error", "Scheduler error");
    assert.equal(isCredentialHealthy("synthetic"), false);
  }
);

test("a throwing flag resolver fails closed to the release gate", { timeout: 2000 }, () => {
  const key = Symbol.for("omniroute.featureFlagResolver");
  const store = globalThis as Record<symbol, unknown>;
  const previous = store[key];
  process.env[FLAG] = "true";
  let resolverCalls = 0;
  try {
    store[key] = () => {
      resolverCalls++;
      throw new Error("flag store unavailable");
    };
    setCredentialHealth("synthetic", "codex", "error", "Probe timed out", "network_error");
    assert.equal(isCredentialHealthy("synthetic"), undefined);
    assert.notEqual(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
    // A throwing feature-flag resolver still fails closed for OTHER diagnoses.
    for (const type of OTHER_INCONCLUSIVE_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Probe failed", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), false, String(type));
      assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
    }
    assert.ok(resolverCalls > 0, "the throwing resolver must actually be called");
  } finally {
    if (previous === undefined) delete store[key];
    else store[key] = previous;
  }
});

test(
  "flag on: transient and inconclusive probes do not establish invalid credentials",
  { timeout: 2000 },
  () => {
    process.env[FLAG] = "true";
    for (const type of INCONCLUSIVE_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Probe timed out", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), undefined, String(type));
      assert.notEqual(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
      assert.equal(getCredentialHealth("synthetic")?.status, "error");
    }
    assert.equal(getCredentialHealthSummary().failed, 1);
    // Scheduler catch path writes an untyped error: with the flag on it no longer blocks.
    setCredentialHealth("synthetic", "codex", "error", "Scheduler error");
    assert.equal(isCredentialHealthy("synthetic"), undefined);
  }
);

test(
  "flag on: explicit authentication diagnoses still reject credential dispatch",
  { timeout: 2000 },
  () => {
    process.env[FLAG] = "true";
    for (const type of AUTH_FAILURES) {
      setCredentialHealth("synthetic", "codex", "error", "Credential rejected", type, "upstream");
      assert.equal(isCredentialHealthy("synthetic"), false, type);
      assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, false);
    }
  }
);

test(
  "successful validation immediately replaces a negative credential verdict",
  { timeout: 2000 },
  () => {
    setCredentialHealth(
      "synthetic",
      "codex",
      "error",
      "Credential rejected",
      "upstream_auth_error"
    );
    setCredentialHealth("other", "codex", "error", "Missing credential", "auth_missing");
    assert.equal(isCredentialHealthy("synthetic"), false);
    setCredentialHealth("synthetic", "codex", "active");
    assert.equal(checkCredentialGate("synthetic", "codex", "codex/model").allowed, true);
    assert.equal(getCredentialHealth("synthetic")?.lastError, undefined);
    assert.equal(getCredentialHealth("synthetic")?.lastErrorType, undefined);
    assert.equal(getCredentialHealth("synthetic")?.consecutiveFailures, 0);
    assert.equal(isCredentialHealthy("other"), false);
  }
);

test(
  "positive, unknown and exact five-minute expiry semantics remain unchanged",
  { timeout: 2000 },
  () => {
    const originalNow = Date.now;
    let now = 1_000_000;
    Date.now = () => now;
    try {
      assert.equal(isCredentialHealthy("missing"), undefined);
      setCredentialHealth("unknown", "codex", "unknown");
      assert.equal(isCredentialHealthy("unknown"), undefined);
      setCredentialHealth("synthetic", "codex", "error", "Rejected", "upstream_auth_error");
      now += 300_000;
      assert.equal(isCredentialHealthy("synthetic"), false);
      now += 1;
      assert.equal(isCredentialHealthy("synthetic"), undefined);
      setCredentialHealth("synthetic", "codex", "active");
      assert.equal(isCredentialHealthy("synthetic"), true);
    } finally {
      Date.now = originalNow;
    }
  }
);

test("two transport-failed combo targets stay eligible without hiding probe failures", () => {
  delete process.env[FLAG];
  for (const [id, diagnosis] of [
    ["connection-one", "network_error"],
    ["connection-two", "upstream_unavailable"],
  ]) {
    setCredentialHealth(id, "codex", "error", "Connectivity problem", diagnosis, "upstream");
    assert.notEqual(checkCredentialGate(id, "codex", "codex/model").allowed, false);
    assert.equal(getCredentialHealth(id)?.status, "error");
  }
  assert.equal(getCredentialHealthSummary().failed, 2);
});

test("blocked credential-gate messages distinguish auth failures from ambiguous probes", () => {
  delete process.env[FLAG];
  setCredentialHealth("auth", "codex", "error", "Invalid grant", "upstream_auth_error");
  const bad = checkCredentialGate("auth", "codex", "codex/model");
  assert.equal(bad.allowed, false);
  assert.match(bad.reason ?? "", /known-bad credentials.*diagnosis: upstream_auth_error/);
  setCredentialHealth("unknown", "codex", "error", "Unclassified", "runtime_error");
  const ambiguous = checkCredentialGate("unknown", "codex", "codex/model");
  assert.equal(ambiguous.allowed, false);
  assert.match(ambiguous.reason ?? "", /failed health probe.*diagnosis: runtime_error/);
  assert.doesNotMatch(ambiguous.reason ?? "", /known-bad credentials/);
  setCredentialHealth("unsafe", "codex", "error", "Sensitive content", "untrusted\\nsecret");
  assert.equal(checkCredentialGate("unsafe", "codex", "codex/model").allowed, false);
  const sanitized = checkCredentialGate("unsafe", "codex", "codex/model").reason ?? "";
  assert.match(sanitized, /diagnosis: unknown/);
  assert.doesNotMatch(sanitized, /secret/);
  // An untrusted, enum-shaped string must not bypass log sanitization either.
  setCredentialHealth("unsafe", "codex", "error", "Private text", "secret_payload");
  const enumShaped = checkCredentialGate("unsafe", "codex", "codex/model").reason ?? "";
  assert.match(enumShaped, /diagnosis: unknown/);
  assert.doesNotMatch(enumShaped, /secret_payload/);
});
