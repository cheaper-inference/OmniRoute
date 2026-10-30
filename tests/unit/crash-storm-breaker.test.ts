/**
 * Crash-storm breaker: per-provider × normalized-signature sliding-window
 * gate for self-inflicted failure storms. The provider/connection breakers
 * deliberately ignore local execution errors and client aborts (reputation
 * protection), which leaves a crash-looping request path with no backpressure
 * anywhere — this breaker fills that gap without writing any cooldown/lock.
 */
import test from "node:test";
import assert from "node:assert/strict";

const breaker = await import("../../open-sse/services/crashStormBreaker.ts");

function freshEnv(threshold?: string, windowMs?: string) {
  delete process.env.OMNIROUTE_CRASH_STORM_THRESHOLD;
  delete process.env.OMNIROUTE_CRASH_STORM_WINDOW_MS;
  if (threshold !== undefined) process.env.OMNIROUTE_CRASH_STORM_THRESHOLD = threshold;
  if (windowMs !== undefined) process.env.OMNIROUTE_CRASH_STORM_WINDOW_MS = windowMs;
}

test("1. signature normalization folds hex ids and digit runs into #", () => {
  const a = breaker.normalizeCrashSignature(
    "Cannot read properties of undefined (reading 'bind') on anthropic-compatible-3f2b8c1d-92aa-4e77 request 880211"
  );
  const b = breaker.normalizeCrashSignature(
    "Cannot read properties of undefined (reading 'bind') on anthropic-compatible-7c91d0e2-15bc-4d33 request 991742"
  );
  assert.equal(a, b, "same fault with different ids lands in one signature");
  assert.ok(breaker.normalizeCrashSignature("").length === 0);
  assert.equal(breaker.normalizeCrashSignature(undefined), "");
});

test("2. storm trips at threshold, per provider, 5xx only", () => {
  freshEnv("3");
  breaker.resetCrashStormBreaker();
  assert.equal(breaker.isCrashStorming("prov-a"), false);
  breaker.recordCrashFailure("prov-a", "boom alpha", 500);
  breaker.recordCrashFailure("prov-a", "boom alpha", 502);
  assert.equal(breaker.isCrashStorming("prov-a"), false, "two samples < threshold 3");
  breaker.recordCrashFailure("prov-a", "boom alpha", 500);
  assert.equal(breaker.isCrashStorming("prov-a"), true);
  // Other providers unaffected.
  assert.equal(breaker.isCrashStorming("prov-b"), false);
  // 4xx and 429 never feed the storm.
  breaker.recordCrashFailure("prov-c", "boom gamma", 429);
  breaker.recordCrashFailure("prov-c", "boom gamma", 400);
  breaker.recordCrashFailure("prov-c", "boom gamma", 401);
  assert.equal(breaker.isCrashStorming("prov-c"), false);
});

test("3. window decay self-heals; threshold 0 disables entirely", async () => {
  freshEnv("2", "50");
  breaker.resetCrashStormBreaker();
  breaker.recordCrashFailure("prov-d", "boom delta", 500);
  breaker.recordCrashFailure("prov-d", "boom delta", 500);
  assert.equal(breaker.isCrashStorming("prov-d"), true);
  await new Promise((r) => setTimeout(r, 70));
  assert.equal(breaker.isCrashStorming("prov-d"), false, "samples aged out of the window");

  freshEnv("0");
  breaker.resetCrashStormBreaker();
  breaker.recordCrashFailure("prov-e", "boom", 500);
  breaker.recordCrashFailure("prov-e", "boom", 500);
  assert.equal(breaker.isCrashStorming("prov-e"), false, "0 disables the breaker");
});

test("4. bounded maps: signature families are capped, diagnostics report actives", () => {
  freshEnv();
  breaker.resetCrashStormBreaker();
  for (let i = 0; i < 300; i++) {
    breaker.recordCrashFailure("prov-f", `distinct failure number ${i}`, 500);
  }
  const status = breaker.crashStormStatus();
  assert.ok(status.length <= 256, "tracked signature families stay bounded");
  for (const entry of status) {
    assert.equal(entry.provider, "prov-f");
    assert.ok(entry.count >= 2);
    assert.ok(entry.signature.length > 0);
  }
});

test("5. gate and feed are wired (source guards)", async () => {
  const fs = await import("node:fs");
  const gates = fs.readFileSync("open-sse/services/combo/executeTargetGates.ts", "utf-8");
  assert.ok(gates.includes('reason: "crash_storm"'), "gate skip reason present");
  assert.ok(
    gates.indexOf("isCrashStorming(provider)") < gates.indexOf("providerCooldown.enabled"),
    "crash-storm gate sits after the circuit gate and before the cooldown gate"
  );
  const attempt = fs.readFileSync("open-sse/services/combo/executeTargetAttempt.ts", "utf-8");
  assert.ok(
    attempt.includes("recordCrashFailure(provider, errorText, result.status)"),
    "attempt failures feed the breaker"
  );
});
