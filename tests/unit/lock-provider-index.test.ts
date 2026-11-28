/**
 * Opt-in provider index for the model-lockout map (OMNIROUTE_LOCK_PROVIDER_INDEX, default off).
 * The no-account cooldown scan (scanTransientModelLock) then reads only the keys of one
 * provider. The full scan stays the reference: both must answer the same on the same state.
 */
import test from "node:test";
import assert from "node:assert/strict";

const af = await import("../../open-sse/services/accountFallback.ts");

const NOW = 1_800_000_000_000;
const PROVIDERS = ["openai", "anthropic", "zai", "gemini", "groq"];
const MODELS = ["m-a", "m-b", "m-c"];
const REASONS = ["rate_limited", "overloaded", "quota_exhausted", "auth_error"];

function withFlag<T>(on: boolean, fn: () => T): T {
  if (on) process.env.OMNIROUTE_LOCK_PROVIDER_INDEX = "true";
  else delete process.env.OMNIROUTE_LOCK_PROVIDER_INDEX;
  try {
    return fn();
  } finally {
    delete process.env.OMNIROUTE_LOCK_PROVIDER_INDEX;
  }
}
const scanAll = (on: boolean) =>
  withFlag(on, () =>
    PROVIDERS.flatMap((p) => MODELS.map((m) => [p, m, af.scanTransientModelLock(p, m)] as const))
  );

function seed(connections = 4) {
  PROVIDERS.forEach((p, pi) =>
    MODELS.forEach((m, mi) => {
      for (let c = 0; c < connections; c += 1) {
        const reason = REASONS[(pi + mi + c) % REASONS.length];
        af.lockModel(p, `conn-${c}`, m, reason, 10_000 + 1_000 * ((pi * 7 + mi * 3 + c) % 9));
      }
    })
  );
}

test.beforeEach((t) => {
  t.mock.timers.enable({ apis: ["Date"], now: NOW });
  af.clearAllModelLockouts();
});
test.afterEach(() => {
  delete process.env.OMNIROUTE_LOCK_PROVIDER_INDEX;
});

test("the index and the full scan give the same answer on a mixed state", () => {
  seed();
  const reference = scanAll(false);
  assert.ok(
    reference.some(([, , info]) => info !== null),
    "the state holds transient locks"
  );
  assert.deepEqual(scanAll(true), reference);
});

test("they still agree after every kind of change to the lock map", () => {
  seed();
  const same = (step: string) => assert.deepEqual(scanAll(true), scanAll(false), step);
  same("seeded");
  af.clearModelLock("openai", "conn-0", "m-a");
  same("clearModelLock");
  af.lockExactModel("zai", "conn-9", "m-b", "rate_limited", 5_000);
  same("lockExactModel");
  af.lockModel("gemini", "conn-1", "m-c", "rate_limited", -1_000); // already expired
  same("an expired lock");
  af.evictModelLockoutOverflow();
  same("overflow eviction");
  af.recordModelLockoutFailure("groq", "conn-2", "m-a", "rate_limited", 429, 0, null, {
    exactCooldownMs: 3_000,
  });
  same("recordModelLockoutFailure");
  af.clearAllModelLockouts();
  same("clearAllModelLockouts");
  seed(1);
  same("seeded again after a reset");
});

test("an alias and its canonical provider share one answer, with and without the index", () => {
  af.lockModel("cx", "conn-0", "gpt-5-codex-spark", "rate_limited", 9_000);
  af.lockExactModel("codex", "conn-1", "gpt-5", "overloaded", 4_000);
  for (const [provider, model] of [
    ["cx", "gpt-5-codex-spark"],
    ["codex", "gpt-5-codex-spark"],
    ["codex", "gpt-5"],
    ["cx", "gpt-5"],
  ]) {
    const reference = withFlag(false, () => af.scanTransientModelLock(provider, model));
    assert.deepEqual(
      withFlag(true, () => af.scanTransientModelLock(provider, model)),
      reference
    );
  }
  assert.ok(withFlag(true, () => af.scanTransientModelLock("cx", "gpt-5-codex-spark")));
});

test("flag off (default): the index is never built", () => {
  seed();
  withFlag(false, () => af.scanTransientModelLock("openai", "m-a"));
  assert.equal(af.getLockProviderIndexStateForTests(), "off");
  withFlag(true, () => af.scanTransientModelLock("openai", "m-a"));
  assert.equal(af.getLockProviderIndexStateForTests(), "built");
});

test("flag on: the scan leaves the expired locks of other providers to the periodic sweep", () => {
  af.lockModel("openai", "conn-0", "m-a", "rate_limited", 10_000);
  af.lockModel("zai", "conn-0", "m-a", "rate_limited", -1_000); // expired
  assert.equal(af.getModelLockoutSize(), 2);
  withFlag(true, () => af.scanTransientModelLock("openai", "m-a"));
  assert.equal(af.getModelLockoutSize(), 2, "only the keys of openai were visited");
  withFlag(false, () => af.scanTransientModelLock("openai", "m-a"));
  assert.equal(af.getModelLockoutSize(), 1, "the full scan visits every key");
});

test("ProviderIndexedMap: a provider's keys come back without the rest of the map", async () => {
  const { ProviderIndexedMap } =
    await import("../../open-sse/services/accountFallback/lockProviderIndex.ts");
  const map = new ProviderIndexedMap<number>();
  for (let i = 0; i < 1000; i += 1) map.set(`other-${i % 25}:conn:m`, i);
  map.set("target:conn-1:m", 1);
  map.set("target:conn-2:exact:m", 2);
  assert.deepEqual([...map.entriesOfProvider("target")].map(([k]) => k).sort(), [
    "target:conn-1:m",
    "target:conn-2:exact:m",
  ]);
  map.delete("target:conn-1:m");
  map.set("target:conn-3:m", 3);
  assert.deepEqual([...map.entriesOfProvider("target")].map(([k]) => k).sort(), [
    "target:conn-2:exact:m",
    "target:conn-3:m",
  ]);
  map.clear();
  assert.deepEqual([...map.entriesOfProvider("target")], []);
  assert.equal(map.size, 0);
});
