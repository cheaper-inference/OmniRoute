// #8486 Part B: the retry-after decoration of an "all targets failed" combo response is gated by the
// surfaced status. A combo that mixes a rate-limited target with a config-class failure (for example a
// 422 that carries no retry-after of its own) must not borrow the other target's reset window, so only
// the rate-limit-class codes 429 and 503 may receive the "(reset after ...)" suffix.
import { test } from "node:test";
import assert from "node:assert/strict";

import { isRetryAfterEligibleStatus } from "../../open-sse/services/combo/unavailableRetryGate.ts";

test("429 and 503 are the rate-limit-class statuses that may carry a retry-after suffix", () => {
  assert.equal(isRetryAfterEligibleStatus(429), true);
  assert.equal(isRetryAfterEligibleStatus(503), true);
});

test("config-class statuses never receive a retry-after suffix", () => {
  for (const status of [400, 401, 403, 404, 422]) {
    assert.equal(isRetryAfterEligibleStatus(status), false, `status ${status}`);
  }
});

test("other server-class and success statuses are not eligible either", () => {
  for (const status of [200, 500, 502, 504]) {
    assert.equal(isRetryAfterEligibleStatus(status), false, `status ${status}`);
  }
});

test("a missing status is not eligible", () => {
  assert.equal(isRetryAfterEligibleStatus(null), false);
  assert.equal(isRetryAfterEligibleStatus(undefined), false);
});

test("only a real number can match: numeric strings and NaN are rejected", () => {
  assert.equal(isRetryAfterEligibleStatus("429" as unknown as number), false);
  assert.equal(isRetryAfterEligibleStatus(Number.NaN), false);
});

test("non-integer, zero, negative and infinite numbers are not eligible", () => {
  for (const status of [429.5, 0, -429, Number.POSITIVE_INFINITY]) {
    assert.equal(isRetryAfterEligibleStatus(status), false, `status ${status}`);
  }
});
