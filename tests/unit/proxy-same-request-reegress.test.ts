import test from "node:test";
import assert from "node:assert/strict";

// PROXY_REEGRESS_ON_QUOTA_429: after a per-IP quota 429 that came through a pool member, the
// same request may be re-sent once more through another, not yet tried member with the same
// account. These are the pure decision helpers; the chat wiring has its own test file.

const {
  reEgressLimit,
  isReEgressCandidate,
  isFreshEgressKey,
  takePendingEgress,
  REEGRESS_MAX_ATTEMPTS_DEFAULT,
} = await import("../../src/sse/services/sameAccountEgressRetry.ts");
const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../src/shared/constants/featureFlagDefinitions.ts");

const WIDEN = "OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS";
const A = "http://@10.0.0.1:8080";
const B = "http://@10.0.0.2:8080";
const ok = {
  enabled: true,
  status: 429,
  upstreamStatus: 429,
  provider: "opencode-go",
  proxySource: "registry",
  refusedKey: A,
  attempt: 0,
  limit: 3,
  aborted: false,
  accountScopedQuota: false,
};

test.after(() => {
  delete process.env[WIDEN];
});

test("reEgressLimit: default 3, accepts 1..8, anything else falls back to 3", () => {
  assert.equal(REEGRESS_MAX_ATTEMPTS_DEFAULT, 3);
  assert.equal(reEgressLimit({}), 3);
  assert.equal(reEgressLimit({ PROXY_REEGRESS_MAX_ATTEMPTS: "1" }), 1);
  assert.equal(reEgressLimit({ PROXY_REEGRESS_MAX_ATTEMPTS: "8" }), 8);
  for (const bad of ["0", "9", "-1", "abc", ""]) {
    assert.equal(reEgressLimit({ PROXY_REEGRESS_MAX_ATTEMPTS: bad }), 3, bad);
  }
});

test("isReEgressCandidate: true only when every condition holds", () => {
  delete process.env[WIDEN];
  assert.equal(isReEgressCandidate(ok), true);
  assert.equal(isReEgressCandidate({ ...ok, enabled: false }), false);
  assert.equal(isReEgressCandidate({ ...ok, status: 503 }), false);
  assert.equal(isReEgressCandidate({ ...ok, upstreamStatus: undefined }), false); // local 429
  assert.equal(isReEgressCandidate({ ...ok, upstreamStatus: 200 }), false);
  assert.equal(isReEgressCandidate({ ...ok, provider: "openai" }), false);
  assert.equal(isReEgressCandidate({ ...ok, proxySource: undefined }), false); // legacy single proxy
  assert.equal(isReEgressCandidate({ ...ok, proxySource: "api_key" }), false);
  assert.equal(isReEgressCandidate({ ...ok, refusedKey: null }), false); // direct or edge relay
  assert.equal(isReEgressCandidate({ ...ok, attempt: 3 }), false);
  assert.equal(isReEgressCandidate({ ...ok, aborted: true }), false);
  assert.equal(isReEgressCandidate({ ...ok, accountScopedQuota: true }), false);
});

test("isReEgressCandidate: the widened scope covers every provider", () => {
  process.env[WIDEN] = "all";
  assert.equal(isReEgressCandidate({ ...ok, provider: "openai" }), true);
  delete process.env[WIDEN];
});

test("isFreshEgressKey: only a different egress not tried yet", () => {
  assert.equal(isFreshEgressKey(B, A, new Set([A])), true);
  assert.equal(isFreshEgressKey(A, A, new Set([A])), false);
  assert.equal(isFreshEgressKey(null, A, new Set([A])), false);
  assert.equal(isFreshEgressKey(B, A, new Set([A, B])), false);
});

test("a pre-resolved egress for another connection is discarded", () => {
  const proxyInfo = { proxy: { type: "http", host: "10.0.0.2", port: 8080 }, source: "registry" };
  const pending = { connectionId: "conn-a", proxyInfo };
  assert.deepEqual(takePendingEgress(pending, "conn-a"), { proxyInfo });
  assert.equal(takePendingEgress(pending, "conn-b"), null);
  assert.equal(takePendingEgress(null, "conn-a"), null);
});

test("the PROXY_REEGRESS_ON_QUOTA_429 flag ships disabled", () => {
  const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "PROXY_REEGRESS_ON_QUOTA_429");
  assert.ok(def);
  assert.equal(def.defaultValue, "false");
  assert.equal(def.type, "boolean");
  assert.equal(def.category, "network");
});
