// scripts/merge-queue/bisect.mjs — WP3 (pure). Plan §3.5: isolate the culprit(s) of a red batch.
//
// Model: `segments` is the ordered list of PR groups still to validate; segments[0] is under
// test. Green → land it and test the next; red with 1 PR → culprit; red with > 1 → replace it
// by its two halves (first half = ceil(n/2), order preserved). Each segment is composed on the
// base AS IT IS when tested (landed segments included). Two culprits are found naturally.
//
// After a culprit is isolated, the segments still pending are MERGED back into one segment:
// the red verdicts that split them are already explained by the culprit, so the rest gets one
// candidate run instead of one per leftover half (a second culprit turns that run red and the
// bisection simply continues). A singleton is declared culprit only after its OWN red run —
// never inferred from a sibling — so one flaky run can never dequeue an innocent PR.
//
// Cost (candidate runs, the initial red batch included) for one culprit in a batch of n is at
// most 1 + 2·ceil(log2 n): 6 PRs → 5 to 7 runs, 8 PRs → 5 to 7 runs. Pinned by
// tests/unit/merge-queue/bisect.test.mjs.

/**
 * @typedef {import("./contracts.mjs").PrRef} PrRef
 * @typedef {import("./contracts.mjs").BisectState} BisectState
 */

const VERDICTS = Object.freeze(["green", "red"]);

/** @param {PrRef[]} prs @returns {[PrRef[], PrRef[]]} */
export function splitHalves(prs) {
  if (!Array.isArray(prs) || prs.length < 2) {
    throw new Error(`splitHalves: need at least 2 PRs, got ${Array.isArray(prs) ? prs.length : 0}`);
  }
  const cut = Math.ceil(prs.length / 2);
  return [prs.slice(0, cut), prs.slice(cut)];
}

/**
 * Start bisecting a red batch of size > 1.
 * @param {PrRef[]} batch
 * @param {string} rootBatchId
 * @returns {BisectState}   segments = splitHalves(batch), steps = 0
 */
export function startBisection(batch, rootBatchId) {
  if (typeof rootBatchId !== "string" || !rootBatchId) {
    throw new Error("startBisection: rootBatchId is required");
  }
  return {
    rootBatchId,
    segments: splitHalves(batch),
    culprits: [],
    landed: [],
    steps: 0,
  };
}

/**
 * Advance after segments[0] got a verdict. Never mutates its input.
 * @param {BisectState} bisect
 * @param {"green"|"red"} result
 * @returns {{bisect: BisectState|null, land: PrRef[], culprit: PrRef|null, next: PrRef[]|null}}
 *   land = segment to land now (green), culprit = isolated PR (red singleton),
 *   next = segment to compose next (null and bisect=null when finished).
 */
export function advanceBisection(bisect, result) {
  if (!VERDICTS.includes(result)) throw new Error(`advanceBisection: invalid result ${result}`);
  if (!bisect || !Array.isArray(bisect.segments) || bisect.segments.length === 0) {
    throw new Error("advanceBisection: no segment under test");
  }
  const [current, ...rest] = bisect.segments;
  if (!Array.isArray(current) || current.length === 0) {
    throw new Error("advanceBisection: empty segment under test");
  }
  let segments;
  let land = [];
  let culprit = null;
  let landed = bisect.landed;
  let culprits = bisect.culprits;

  if (result === "green") {
    land = current;
    landed = [...landed, ...current.map((pr) => pr.n)];
    segments = rest;
  } else if (current.length === 1) {
    culprit = current[0];
    culprits = [...culprits, culprit];
    const leftover = rest.flat();
    segments = leftover.length ? [leftover] : [];
  } else {
    segments = [...splitHalves(current), ...rest];
  }

  if (segments.length === 0) return { bisect: null, land, culprit, next: null };
  return {
    bisect: {
      ...bisect,
      segments,
      culprits,
      landed,
      steps: bisect.steps + 1,
    },
    land,
    culprit,
    next: segments[0],
  };
}
