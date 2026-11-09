// "Test all models" on a web-session provider (#14780 / #14818): the runner skips
// every probe so no conversation is opened on the user's account. A skipped probe
// never ran, so it is neither working nor broken — the single-model test already
// shows the skip reason without a status icon. Test All counted every skip as a
// failure, painted it red and reported "0 of N models working".
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  evaluateTestAllEntry,
  recordTestAllOutcome,
  testAllSummaryMessages,
  type TestAllTally,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

const SKIP_REASON =
  "Skipped: web-session providers are excluded from chat probes to avoid creating provider conversations";

// Formats the en.json template the way next-intl does.
const t = Object.assign(
  (_key: string, values?: Record<string, unknown>) =>
    `${values?.ok} of ${values?.total} models working`,
  { has: () => true }
);

test("a skipped entry is reported as skipped, not as a failure", () => {
  const outcome = evaluateTestAllEntry({ status: "error", skipped: true }, true);

  assert.equal(outcome.skipped, true);
  assert.equal(outcome.shouldHide, false);
});

test("a real failure is not reported as skipped", () => {
  assert.notEqual(evaluateTestAllEntry({ status: "error" }, false).skipped, true);
  assert.notEqual(evaluateTestAllEntry({ status: "ok" }, false).skipped, true);
});

test("the tally counts skips apart and keeps the first skip reason", () => {
  const tally: TestAllTally = { ok: 0, error: 0, skipped: 0 };
  recordTestAllOutcome(tally, { status: "ok" });
  recordTestAllOutcome(tally, { status: "error" }, "upstream 400");
  recordTestAllOutcome(tally, { status: "error", skipped: true }, SKIP_REASON);
  recordTestAllOutcome(tally, { status: "error", skipped: true }, "a later reason");

  assert.deepEqual(tally, { ok: 1, error: 1, skipped: 2, skipReason: SKIP_REASON });
});

test("a batch where every probe was skipped shows only the skip reason", () => {
  assert.deepEqual(
    testAllSummaryMessages(t, { ok: 0, error: 0, skipped: 38, skipReason: SKIP_REASON }),
    [SKIP_REASON]
  );
});

test("a mixed batch counts only the models that were tested, then gives the skip reason", () => {
  assert.deepEqual(
    testAllSummaryMessages(t, { ok: 2, error: 1, skipped: 4, skipReason: SKIP_REASON }),
    ["2 of 3 models working", SKIP_REASON]
  );
});

test("a batch without skips keeps the usual summary", () => {
  assert.deepEqual(testAllSummaryMessages(t, { ok: 1, error: 1, skipped: 0 }), [
    "1 of 2 models working",
  ]);
});
