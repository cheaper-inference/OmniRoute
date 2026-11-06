import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { BaseExecutor } from "../../open-sse/executors/base.ts";

// #9158 quick win: the executor's intra-URL429 retry used a fixed 2s delay —
// no jitter, and it ignored the upstream Retry-After hint (already parsed by
// rateLimitIntraRetry) whenever the hint was inside the retry window.

const baseSource = readFileSync(
  new URL("../../open-sse/executors/base.ts", import.meta.url),
  "utf-8"
);

test("jitterRetryDelayMs maps the band [base/2, base] deterministically", () => {
  assert.equal(
    BaseExecutor.jitterRetryDelayMs(2000, () => 0),
    1000
  );
  assert.equal(
    BaseExecutor.jitterRetryDelayMs(2000, () => 1),
    2000
  );
  assert.equal(
    BaseExecutor.jitterRetryDelayMs(2000, () => 0.5),
    1500
  );
  // delayMs = 0 overrides in integration tests must stay 0-wait.
  assert.equal(
    BaseExecutor.jitterRetryDelayMs(0, () => 1),
    0
  );
});

test("jitterRetryDelayMs with the real RNG never leaves the band", () => {
  for (let i = 0; i < 50; i++) {
    const delay = BaseExecutor.jitterRetryDelayMs(2000);
    assert.ok(delay >= 1000 && delay <= 2000, `out of band: ${delay}`);
  }
});

test("429 intra-retry honors the upstream retry hint and jitters the fallback", () => {
  // The branch reads the hint and prefers it over RETRY_CONFIG.delayMs, but
  // only when the hint sits inside the intra-retry window (the skip guard
  // already dropped anything larger).
  assert.match(baseSource, /readRateLimitRetryHintMs\(response\)/);
  assert.match(baseSource, /INTRA_RETRY_MAX_HINT_MS\s*\?\s*hintMs\s*:/);
  assert.match(baseSource, /jitterRetryDelayMs\(\s*BaseExecutor\.RETRY_CONFIG\.delayMs\s*\)/);
});

test("WAF400 content-blocked backoff is jittered", () => {
  assert.match(baseSource, /jitterRetryDelayMs\(\s*BaseExecutor\.WAF_RETRY_CONFIG\.delayMs/);
});
