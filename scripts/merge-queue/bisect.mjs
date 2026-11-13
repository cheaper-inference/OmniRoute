// scripts/merge-queue/bisect.mjs — WP3 (pure). Plan §3.5: isolate the culprit(s) of a red batch.
// STUB written by the lead: exported names, parameters and return shapes are the contract.
//
// Model: `segments` is the ordered list of PR groups still to validate; segments[0] is under
// test. Green → land it and test the next; red with 1 PR → culprit; red with > 1 → replace it
// by its two halves (first half = ceil(n/2), order preserved). Each segment is composed on the
// base AS IT IS when tested (landed segments included). Two culprits are found naturally.

/**
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").BisectState} BisectState
 */

/** @param {PrRef[]} prs @returns {[PrRef[], PrRef[]]} */
export function splitHalves(prs) {
  void prs;
  throw new Error("not implemented (WP3)");
}

/**
 * Start bisecting a red batch of size > 1.
 * @param {PrRef[]} batch
 * @param {string} rootBatchId
 * @returns {BisectState}   segments = splitHalves(batch), steps = 0
 */
export function startBisection(batch, rootBatchId) {
  void batch;
  void rootBatchId;
  throw new Error("not implemented (WP3)");
}

/**
 * Advance after segments[0] got a verdict.
 * @param {BisectState} bisect
 * @param {"green"|"red"} result
 * @returns {{bisect: BisectState|null, land: PrRef[], culprit: PrRef|null, next: PrRef[]|null}}
 *   land = segment to land now (green), culprit = isolated PR (red singleton),
 *   next = segment to compose next (null and bisect=null when finished).
 */
export function advanceBisection(bisect, result) {
  void bisect;
  void result;
  throw new Error("not implemented (WP3)");
}
