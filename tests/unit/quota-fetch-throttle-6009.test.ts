import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #6009 — forced delay/cooldown between upstream quota fetches.
// When many accounts on one IP fetch provider quota, firing them all in the same
// second looks suspicious to the upstream (per router-for-me/CLIProxyAPI#2385 this
// can get a Codex OAuth token revoked). MinIntervalThrottle serializes the actual
// network calls and spaces each start >= minIntervalMs after the previous one.

const { MinIntervalThrottle, resolveQuotaFetchMinIntervalMs, resolveQuotaFetchJitterMs } =
  await import("../../open-sse/services/quotaFetchThrottle.ts");

class FakeClock {
  t = 1000;
  slept: number[] = [];
  now = () => this.t;
  sleep = async (ms: number) => {
    this.slept.push(ms);
    this.t += ms;
  };
}

test("#6009 spaces concurrent fetch starts by at least minIntervalMs", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 250, jitterMs: 0, clock });

  // Fire 4 concurrent acquisitions (simulates 4 accounts fetching at once).
  await Promise.all(Array.from({ length: 4 }, () => throttle.acquire()));

  // First runs immediately; the other three each sleep the full 250ms gap, so
  // the four network calls start at t = 1000, 1250, 1500, 1750 (spaced, not bursty).
  assert.deepEqual(clock.slept, [250, 250, 250]);
  assert.equal(clock.now(), 1750);
});

test("#16948 zero-valued clocks still enforce spacing on the second acquisition", async () => {
  const clock = new FakeClock();
  clock.t = 0;
  const throttle = new MinIntervalThrottle({ minIntervalMs: 250, jitterMs: 0, clock });
  await Promise.all([throttle.acquire(), throttle.acquire(), throttle.acquire()]);
  assert.deepEqual(clock.slept, [250, 250]);
  assert.equal(clock.now(), 500);
});

test("#16948 reopens spacing window after idle time, then throttles a new burst", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 300, jitterMs: 0, clock });
  await throttle.acquire(); // first fetch at t=1000
  clock.t = 5000; // no requests for four seconds
  await throttle.acquire(); // first fetch after idle is immediate
  await throttle.acquire(); // following fetch must still wait 300ms
  assert.deepEqual(clock.slept, [300]);
  assert.equal(clock.now(), 5300);
});

test("#6009 minIntervalMs=0 disables throttling (no sleeps)", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 0, jitterMs: 0, clock });
  await Promise.all([throttle.acquire(), throttle.acquire(), throttle.acquire()]);
  assert.deepEqual(clock.slept, []);
});

test("#16948 disabled minimum interval bypasses jitter and serialization entirely", async () => {
  const clock = new FakeClock();
  let randomCalls = 0;
  const throttle = new MinIntervalThrottle({
    minIntervalMs: resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "0" }),
    jitterMs: resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "60000" }),
    clock,
    rand: () => {
      randomCalls++;
      return 0.5;
    },
  });
  await Promise.all(Array.from({ length: 8 }, () => throttle.acquire()));
  assert.deepEqual(clock.slept, [], "explicitly disabled throttle must not add jitter delays");
  assert.equal(randomCalls, 0, "disabled throttle must not evaluate random jitter");
});

test("#6009 a single fetch is never delayed", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({ minIntervalMs: 500, jitterMs: 0, clock });
  await throttle.acquire();
  assert.deepEqual(clock.slept, []);
  assert.equal(clock.now(), 1000);
});

test("#15172 wall-clock jumps cannot bypass the default throttle interval", async () => {
  const originalDateNow = Date.now;
  const throttle = new MinIntervalThrottle({ minIntervalMs: 20, jitterMs: 0 });

  try {
    const firstAcquireStart = performance.now();
    await throttle.acquire();
    Date.now = () => originalDateNow() + 60_000;
    await throttle.acquire();
    const secondRelease = performance.now();
    assert.ok(
      secondRelease - firstAcquireStart >= 20,
      "wall-clock jumps must not shorten the monotonic release interval"
    );
  } finally {
    Date.now = originalDateNow;
  }
});

test("#15172 an early timer wake is rechecked before the throttle releases", async () => {
  let now = 0.1;
  let sleepCalls = 0;
  const requestedDelays: number[] = [];
  const clock: ThrottleClock = {
    now: () => now,
    sleep: async (ms: number) => {
      requestedDelays.push(ms);
      // Model timer implementations that quantize fractional delays and may
      // wake one tick before the requested monotonic deadline.
      now += Math.max(0, Math.floor(ms) - (sleepCalls++ === 0 ? 1 : 0));
    },
  };
  const throttle = new MinIntervalThrottle({ minIntervalMs: 250, jitterMs: 0, clock });

  await throttle.acquire();
  const first = clock.now();
  now += 0.3;
  await throttle.acquire();

  assert.ok(clock.now() - first >= 250, "an early timer wake must not shorten the interval");
  assert.deepEqual(requestedDelays, [250, 1]);
});

test("#15172 a late timer cannot release already-queued acquisitions as a burst", async () => {
  const clock = new FakeClock();
  let sleepCalls = 0;
  clock.sleep = async (ms: number) => {
    clock.slept.push(ms);
    clock.t += ms + (sleepCalls++ === 0 ? 600 : 0);
  };
  const throttle = new MinIntervalThrottle({ minIntervalMs: 250, jitterMs: 0, clock });

  await Promise.all(Array.from({ length: 4 }, () => throttle.acquire()));

  assert.deepEqual(
    clock.slept,
    [250, 250, 250],
    "every queued acquisition must retain a complete interval after a late wake-up"
  );
});

test("#6009 jitter adds a bounded extra spacing on top of the min gap", async () => {
  const clock = new FakeClock();
  // Deterministic rand → always 0.5, so jitter = floor(0.5 * 100) = 50.
  const throttle = new MinIntervalThrottle({
    minIntervalMs: 200,
    jitterMs: 100,
    clock,
    rand: () => 0.5,
  });
  await Promise.all(Array.from({ length: 3 }, () => throttle.acquire()));
  // First call never sleeps; each subsequent waits gap = 200 + floor(0.5*100) = 250.
  assert.deepEqual(clock.slept, [250, 250]);
});

test("#6009 env resolver clamps to sane bounds and defaults", () => {
  assert.equal(resolveQuotaFetchMinIntervalMs({}), 250); // default
  assert.equal(resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "0" }), 0);
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "1000" }),
    1000
  );
  // garbage / negative → default
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "abc" }),
    250
  );
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "-5" }),
    250
  );
  // absurdly high → clamped to max 60000
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "999999" }),
    60000
  );
});

test("#16948 quota spacing supports bounded larger intervals and configurable jitter", () => {
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "30000" }),
    30000
  );
  assert.equal(
    resolveQuotaFetchMinIntervalMs({ OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "999999" }),
    60000
  );
  assert.equal(resolveQuotaFetchJitterMs({}), 120);
  assert.equal(resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "0" }), 0);
  assert.equal(resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "30000" }), 30000);
  assert.equal(resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "999999" }), 60000);
  assert.equal(resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "NaN" }), 120);
  assert.equal(resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "-5" }), 120);
});

test("#16948 larger configured spacing is honored across simultaneous quota calls", async () => {
  const clock = new FakeClock();
  const throttle = new MinIntervalThrottle({
    minIntervalMs: resolveQuotaFetchMinIntervalMs({
      OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS: "10000",
    }),
    jitterMs: resolveQuotaFetchJitterMs({ OMNIROUTE_QUOTA_FETCH_JITTER_MS: "10000" }),
    clock,
    rand: () => 0.5,
  });
  await Promise.all(Array.from({ length: 4 }, () => throttle.acquire()));
  assert.deepEqual(clock.slept, [15000, 15000, 15000]);
});
