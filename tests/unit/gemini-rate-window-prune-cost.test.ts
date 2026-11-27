import test from "node:test";
import assert from "node:assert/strict";

const tracker = await import("../../open-sse/services/geminiRateLimitTracker.ts");

const MODEL = "gemini-2.5-flash";
const realNow = Date.now;

test.afterEach(() => {
  Date.now = realNow;
  tracker.resetCounters();
});

// Steady state: a window that holds `window` entries, one entry expires per new request.
// Returns ms spent on `ops` further requests.
function steadyStateMs(window: number, ops: number, record: (m: string) => void): number {
  tracker.resetCounters();
  let now = 1_000_000;
  Date.now = () => now;
  const stepMs = Math.floor(60_000 / window);
  for (let i = 0; i < window; i++) {
    record(MODEL);
    now += stepMs;
  }
  const start = process.hrtime.bigint();
  for (let i = 0; i < ops; i++) {
    now += stepMs;
    record(MODEL);
  }
  return Number(process.hrtime.bigint() - start) / 1e6;
}

function bestOf(runs: number, fn: () => number): number {
  let best = Infinity;
  for (let i = 0; i < runs; i++) best = Math.min(best, fn());
  return best;
}

test("minute request window: per-request cost does not grow with window size", () => {
  const small = bestOf(3, () => steadyStateMs(300, 4_000, tracker.incrementMinuteRequestCount));
  const large = bestOf(3, () => steadyStateMs(20_000, 4_000, tracker.incrementMinuteRequestCount));
  assert.ok(
    large < small * 8 + 25,
    `window 20000 took ${large.toFixed(1)} ms, window 300 took ${small.toFixed(1)} ms`
  );
});

test("token window: per-request cost does not grow with window size", () => {
  const record = (m: string) => tracker.incrementTokenUsage(m, 10);
  const small = bestOf(3, () => steadyStateMs(300, 4_000, record));
  const large = bestOf(3, () => steadyStateMs(20_000, 4_000, record));
  assert.ok(
    large < small * 8 + 25,
    `window 20000 took ${large.toFixed(1)} ms, window 300 took ${small.toFixed(1)} ms`
  );
});

test("sliding window counts keep the 60s cutoff", () => {
  let now = 5_000_000;
  Date.now = () => now;
  tracker.incrementMinuteRequestCount(MODEL);
  tracker.incrementTokenUsage(MODEL, 7);
  now += 59_999;
  tracker.incrementMinuteRequestCount(MODEL);
  tracker.incrementTokenUsage(MODEL, 5);
  assert.equal(tracker.getMinuteRequestCount(MODEL), 2);
  assert.equal(tracker.getMinuteTokenCount(MODEL), 12);
  now += 1; // first entry is now exactly 60_000 old: still inside (cutoff is strict <)
  assert.equal(tracker.getMinuteRequestCount(MODEL), 2);
  now += 1; // first entry is 60_001 old: gone
  assert.equal(tracker.getMinuteRequestCount(MODEL), 1);
  assert.equal(tracker.getMinuteTokenCount(MODEL), 5);
});
