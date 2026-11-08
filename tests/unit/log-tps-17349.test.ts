import test from "node:test";
import assert from "node:assert/strict";
import * as rates from "../../src/shared/utils/logTps.ts";

test("E2E keeps burst delivery distinct without clamping generation", () => {
  assert.equal(rates.computeLogTps(1000, 100, 10_000, 9_900), 10_000);
  assert.equal(rates.computeLogE2eTps(1000, 100, 10_000), 100);
});

test("both rates use the same reasoning-aware numerator", () => {
  for (const [out, reasoning, tokens] of [
    [1000, 800, 1000],
    [200, 1000, 1000],
    [1000, 0, 1000],
  ]) {
    assert.equal(rates.computeLogTps(out, reasoning, 10_000, 5000), tokens / 5);
    assert.equal(rates.computeLogE2eTps(out, reasoning, 10_000), tokens / 10);
  }
});

test("invalid or missing TTFT preserves historical full-duration fallback", () => {
  for (const ttft of [undefined, null, 0, -1, NaN, Infinity, 10_000, 20_000]) {
    assert.equal(rates.computeLogTps(1000, 0, 10_000, ttft), 100);
    assert.equal(rates.computeLogE2eTps(1000, 0, 10_000), 100);
  }
});

test("zero, missing and invalid durations produce no invented E2E rate", () => {
  for (const duration of [undefined, null, 0, -1, NaN, Infinity]) {
    assert.equal(rates.computeLogE2eTps(1000, 100, duration), 0);
  }
  assert.equal(rates.computeLogE2eTps(0, 0, 1000), 0);
  assert.equal(rates.computeLogE2eTps(undefined, undefined, 1000), 0);
  assert.equal(rates.computeLogE2eTps(NaN, Infinity, 1000), 0);
});
