import assert from "node:assert/strict";
import { afterEach } from "node:test";

import { waitForConnectionFollowUps } from "../../src/lib/providers/connectionFollowUps.ts";

/**
 * POST /api/providers answers before a new connection's auto-test (and its opt-in model
 * auto-sync) finish: they run as tracked follow-ups. A test file that drives the providers
 * route calls this once at top level, so every test's follow-ups settle before the next test
 * resets the database or counts upstream calls, instead of outliving the test that started them.
 * A follow-up that never settles fails the test that started it.
 */
export function settleConnectionFollowUpsAfterEachTest(timeoutMs = 10_000): void {
  afterEach(async () => {
    assert.equal(
      await waitForConnectionFollowUps(timeoutMs),
      true,
      `connection follow-ups still running ${timeoutMs} ms after the test ended`
    );
  });
}
