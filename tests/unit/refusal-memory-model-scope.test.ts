import test from "node:test";
import assert from "node:assert/strict";

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const rotation = await import("../../open-sse/executors/accountRotation.ts");
const throttle = await import("../../open-sse/executors/opencodeEgressThrottle.ts");
const parkResume = await import("../../open-sse/executors/opencodeParkResume.ts");
const { onProxyTransition } = await import("../../open-sse/utils/proxyTransitionListeners.ts");

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

test("10. a model-less reader sees every model's quota refusal", () => {
  const now = Date.now();
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now, "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, now), true);
  assert.notEqual(memory.proxySetAsideSeq(EGRESS, now), null);
  assert.equal(memory.snapshotProxySetAside(EGRESS, now)?.kind, "ip_quota_429");
  const status = memory.proxySetAsideStatus(EGRESS, now);
  assert.equal(status.setAside, true);
  assert.equal(status.quotaOnly, true);
  assert.equal(status.endsAt, now + memory.REFUSAL_POLICIES.ip_quota_429.baseMs);
  // The other model's reader stays clean: that is the point of the scope.
  assert.equal(memory.isProxyAvoided(EGRESS, now, "model-b"), false);
});

test("11. a newer refusal that already ended does not hide an older one still in force", () => {
  const start = Date.now();
  const basePeriod = memory.REFUSAL_POLICIES.ip_quota_429.baseMs;
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", start, "model-a");
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", start + 1, "model-b");
  memory.noteProxyRecovered(EGRESS, "ip_quota_429", start + 2, "model-b");
  assert.equal(memory.isProxyAvoided(EGRESS, start + 3), true);
  assert.equal(memory.isProxyAvoided(EGRESS, start + 3, "model-b"), false);
  // Model-scoped reader: a later model-less entry that ended leaves the scoped one standing.
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", start + 4);
  memory.noteProxyServed(EGRESS);
  assert.equal(memory.isProxyAvoided(EGRESS, start + 5, "model-a"), true);
  assert.equal(memory.proxySetAsideStatus(EGRESS, start + 5).endsAt, start + basePeriod);
});

test("12. a model-less recovery ends every model's entry and keeps the streak", () => {
  const now = Date.now();
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now, "model-a");
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now, "model-b");
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now);
  memory.noteProxyRecovered(EGRESS, "ip_quota_429", now + 1);
  for (const model of [undefined, "model-a", "model-b"]) {
    assert.equal(memory.isProxyAvoided(EGRESS, now + 2, model), false);
  }
  // Repeat doubles: the entry was ended, not forgotten.
  const base = memory.REFUSAL_POLICIES.ip_quota_429.baseMs;
  assert.equal(memory.noteProxyRefusal(EGRESS, "ip_quota_429", now + 2, "model-a"), base * 2);
});

test("13. a model-scoped recovery ends only that model", () => {
  const now = Date.now();
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now, "model-a");
  memory.noteProxyRefusal(EGRESS, "ip_quota_429", now, "model-b");
  memory.noteProxyRecovered(EGRESS, "ip_quota_429", now + 1, "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, now + 2, "model-a"), false);
  assert.equal(memory.isProxyAvoided(EGRESS, now + 2, "model-b"), true);
  assert.equal(memory.isProxyAvoided(EGRESS, now + 2), true);
});

test("14. only the quota kind takes a model: a health refusal covers every model", () => {
  const now = Date.now();
  memory.noteProxyRefusal(EGRESS, "transport", now, "model-a");
  assert.equal(memory.isProxyAvoided(EGRESS, now, "model-b"), true);
  assert.equal(memory.isProxyAvoided(EGRESS, now), true);
});

test("15. a key or model with spaces cannot alias another entry", () => {
  const now = Date.now();
  const spaced = "http://user name@pool-e:8080";
  memory.noteProxyRefusal(spaced, "ip_quota_429", now, "model a");
  assert.equal(memory.isProxyAvoided(spaced, now, "model a"), true);
  assert.equal(memory.isProxyAvoided(spaced, now, "a"), false);
  assert.equal(memory.isProxyAvoided("http://user", now), false);
});

test("16. the transition names the model only for a scoped refusal", () => {
  const seen: Array<{ model?: string }> = [];
  const off = onProxyTransition((transition: { model?: string }) => seen.push(transition));
  try {
    memory.noteProxyRefusal(EGRESS, "ip_quota_429", Date.now(), "model-a");
    memory.noteProxyRefusal("http://@pool-f:8080", "ip_quota_429");
  } finally {
    off();
  }
  assert.equal(seen[0].model, "model-a");
  assert.equal("model" in seen[1], false);
});

const parkAccount = (fingerprint: string, proxyHost: string) => ({
  fingerprint,
  proxy: { type: "http", host: proxyHost, port: 8080 },
  cooldownUntil: 0,
});

test("17. the replay leg leaves out a member with a model-scoped quota refusal", () => {
  const refused = parkAccount("fp-1", "pool-refused");
  const clean = parkAccount("fp-2", "pool-clean");
  const refusedKey = memory.proxyEgressKey(refused.proxy);
  memory.noteProxyRefusal(refusedKey, "ip_quota_429", Date.now(), "model-a");
  const replay = parkResume.replayCandidates(
    [refused, clean] as never,
    Date.now(),
    undefined,
    false
  );
  assert.deepEqual(
    replay.map((a: { fingerprint: string }) => a.fingerprint),
    ["fp-2"]
  );
});

test("18. the park trigger sees a model-scoped quota refusal", () => {
  const start = Date.now();
  const key = memory.proxyEgressKey({ type: "http", host: "pool-park", port: 8080 });
  memory.noteProxyRefusal(key, "ip_quota_429", start, "model-a");
  const endsAt = memory.proxySetAsideStatus(key, start).endsAt as number;
  // The default quota window outlasts the park wait: read it from inside the wait.
  const nearEnd = endsAt - parkResume.PARK_WAIT_MS + 1_000;
  const wait = parkResume.setAsideParkWaitMs([key], nearEnd);
  assert.equal(wait, endsAt - nearEnd);
});
