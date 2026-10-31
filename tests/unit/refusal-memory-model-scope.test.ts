import test from "node:test";
import assert from "node:assert/strict";

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const rotation = await import("../../open-sse/executors/accountRotation.ts");
const throttle = await import("../../open-sse/executors/opencodeEgressThrottle.ts");

const EGRESS = "http://@pool-e:8080";

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
});

test("1. 429 model A via E then model B via E: E served for B, avoided for A", () => {
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", Date.now(), "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), true);
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-b"), false);
});

test("2. No model: exact current behavior", () => {
  memory.noteProxyRefusal(EGRESS, "ip_quota_429");
  assert.equal(memory.isProxyAvoided(EGRESS), true);
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), true);
});

test("3. Success: keys erased", () => {
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", Date.now(), "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), true);
  memory.noteProxyServed(EGRESS, "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), false);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("4. Cross-kind: slow without model visible for model-scoped read", () => {
  memory.noteProxyRefusal(EGRESS, "slow");
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), true);
});

test("5. noteProxyServed without model does not erase model-scoped keys", () => {
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", Date.now(), "model-a");
  memory.noteProxyServed(EGRESS);
  assert.equal(memory.isProxyAvoided(EGRESS, Date.now(), "model-a"), true);
});

test("6. TTL: model-scoped key expires like others", () => {
  const t0 = 1_000_000;
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", t0, "model-a");
  const baseMs = memory.REFUSAL_POLICIES.ip_quota_429.baseMs;
  assert.equal(memory.isProxyAvoided(EGRESS, t0 + 1000, "model-a"), true);
  assert.equal(memory.isProxyAvoided(EGRESS, t0 + baseMs + 1, "model-a"), false);
});

test("7. tracker: a refused member is set aside only for the request's model", () => {
  const proxy = { type: "http", host: "pool-e", port: 8080 };
  const key = memory.proxyEgressKey(proxy);
  assert.ok(key);
  const tracker = throttle.createAppliedEgressTracker(
    "https://api.opencode.ai/v1/chat/completions",
    () => null,
    "model-a"
  );
  tracker.noteRefused({ proxy, fingerprint: "fp-e" }, true);
  assert.equal(memory.isProxyAvoided(key, Date.now(), "model-a"), true);
  assert.equal(memory.isProxyAvoided(key, Date.now(), "model-b"), false);
});

test("8. pickAccount: a model-scoped set-aside drains only that model", () => {
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  try {
    const fleet: rotation.RotatableAccount[] = [
      {
        fingerprint: "m0",
        cooldownUntil: 0,
        consecutiveFails: 0,
        proxy: { type: "http", host: "pool-a", port: 9001 },
      },
      {
        fingerprint: "m1",
        cooldownUntil: 0,
        consecutiveFails: 0,
        proxy: { type: "http", host: "pool-b", port: 9002 },
      },
    ];
    const key0 = memory.proxyEgressKey(fleet[0].proxy);
    assert.ok(key0);
    memory.noteProxyRefusal(key0, "ip_quota_429", Date.now(), "model-a");
    const forA = rotation.pickAccount(
      fleet,
      { nextAccountIdx: 0 },
      undefined,
      undefined,
      "model-a"
    );
    assert.equal(forA.fingerprint, "m1", "model-a must skip the set-aside member");
    const forB = rotation.pickAccount(
      fleet,
      { nextAccountIdx: 0 },
      undefined,
      undefined,
      "model-b"
    );
    assert.equal(forB.fingerprint, "m0", "model-b must still get the member set aside for model-a");
  } finally {
    delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  }
});

test("9. proxySetAsideStatus with model: model-scoped quota seen, other model not", () => {
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", Date.now(), "model-a");
  const a = memory.proxySetAsideStatus(EGRESS, Date.now(), "model-a");
  assert.equal(a.setAside, true);
  assert.equal(a.quotaOnly, true);
  const b = memory.proxySetAsideStatus(EGRESS, Date.now(), "model-b");
  assert.equal(b.setAside, false);
});
