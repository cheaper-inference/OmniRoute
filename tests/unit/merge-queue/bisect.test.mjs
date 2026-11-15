// Bisection of a red batch (scripts/merge-queue/bisect.mjs): pure state machine.
import assert from "node:assert/strict";
import test from "node:test";
import {
  advanceBisection,
  splitHalves,
  startBisection,
} from "../../../scripts/merge-queue/bisect.mjs";

const pr = (n) => ({
  n,
  head: n.toString(16).padStart(40, "0"),
  title: `PR ${n}`,
  author: `dev${n}`,
  labeledAt: "2026-11-13T12:00:00.000Z",
});
const batchOf = (size) => Array.from({ length: size }, (_, i) => pr(i + 1));
const nums = (prs) => prs.map((p) => p.n);

/**
 * Drive a whole bisection the way the tick does: the initial batch is one red run, every
 * advanceBisection call is one more candidate run. A segment is red when it holds a culprit.
 */
function simulate(size, culprits) {
  const bad = new Set(culprits);
  const batch = batchOf(size);
  let bisect = startBisection(batch, "b1");
  let runs = 1; // the red batch that started the bisection
  const landed = [];
  const found = [];
  const tested = [];
  while (bisect) {
    const segment = bisect.segments[0];
    tested.push(nums(segment));
    const red = segment.some((p) => bad.has(p.n));
    runs += 1;
    const step = advanceBisection(bisect, red ? "red" : "green");
    landed.push(...nums(step.land));
    if (step.culprit) found.push(step.culprit.n);
    if (step.bisect) assert.deepEqual(step.next, step.bisect.segments[0]);
    else assert.equal(step.next, null);
    bisect = step.bisect;
  }
  return { runs, landed, found, tested };
}

test("splitHalves: first half is ceil(n/2), order preserved", () => {
  assert.deepEqual(splitHalves(batchOf(2)).map(nums), [[1], [2]]);
  assert.deepEqual(splitHalves(batchOf(3)).map(nums), [[1, 2], [3]]);
  assert.deepEqual(splitHalves(batchOf(6)).map(nums), [
    [1, 2, 3],
    [4, 5, 6],
  ]);
  assert.deepEqual(splitHalves(batchOf(7)).map(nums), [
    [1, 2, 3, 4],
    [5, 6, 7],
  ]);
});

test("splitHalves refuses anything that cannot be split", () => {
  assert.throws(() => splitHalves(batchOf(1)), /at least 2/);
  assert.throws(() => splitHalves([]), /at least 2/);
  assert.throws(() => splitHalves(null), /at least 2/);
});

test("startBisection: halves of the batch, nothing landed, zero steps", () => {
  const bisect = startBisection(batchOf(6), "b7");
  assert.equal(bisect.rootBatchId, "b7");
  assert.deepEqual(bisect.segments.map(nums), [
    [1, 2, 3],
    [4, 5, 6],
  ]);
  assert.deepEqual(bisect.culprits, []);
  assert.deepEqual(bisect.landed, []);
  assert.equal(bisect.steps, 0);
});

test("startBisection rejects a batch of 1 (that PR is the culprit) and a missing id", () => {
  assert.throws(() => startBisection(batchOf(1), "b1"), /at least 2/);
  assert.throws(() => startBisection(batchOf(2), ""), /rootBatchId/);
});

test("advanceBisection: green lands the segment and moves to the next one", () => {
  const bisect = startBisection(batchOf(6), "b1");
  const step = advanceBisection(bisect, "green");
  assert.deepEqual(nums(step.land), [1, 2, 3]);
  assert.equal(step.culprit, null);
  assert.deepEqual(nums(step.next), [4, 5, 6]);
  assert.deepEqual(step.bisect.landed, [1, 2, 3]);
  assert.equal(step.bisect.steps, 1);
  // input untouched
  assert.deepEqual(bisect.segments.map(nums), [
    [1, 2, 3],
    [4, 5, 6],
  ]);
  assert.equal(bisect.steps, 0);
});

test("advanceBisection: red segment of > 1 is split in place, before the rest", () => {
  const step = advanceBisection(startBisection(batchOf(6), "b1"), "red");
  assert.deepEqual(step.land, []);
  assert.equal(step.culprit, null);
  assert.deepEqual(step.bisect.segments.map(nums), [[1, 2], [3], [4, 5, 6]]);
  assert.deepEqual(nums(step.next), [1, 2]);
});

test("advanceBisection: red singleton is the culprit; the leftovers merge into one segment", () => {
  let bisect = startBisection(batchOf(6), "b1");
  bisect = advanceBisection(bisect, "red").bisect; // [1,2] [3] [4,5,6]
  bisect = advanceBisection(bisect, "red").bisect; // [1] [2] [3] [4,5,6]
  const step = advanceBisection(bisect, "red");
  assert.equal(step.culprit.n, 1);
  assert.deepEqual(
    step.bisect.culprits.map((p) => p.n),
    [1]
  );
  assert.deepEqual(step.bisect.segments.map(nums), [[2, 3, 4, 5, 6]]);
  assert.equal(step.bisect.steps, 3);
});

test("advanceBisection: last red singleton finishes the bisection", () => {
  const bisect = { rootBatchId: "b1", segments: [[pr(9)]], culprits: [], landed: [4], steps: 5 };
  assert.deepEqual(advanceBisection(bisect, "red"), {
    bisect: null,
    land: [],
    culprit: pr(9),
    next: null,
  });
  const green = advanceBisection(bisect, "green");
  assert.equal(green.bisect, null);
  assert.deepEqual(nums(green.land), [9]);
  assert.equal(green.next, null);
});

test("advanceBisection validates its input", () => {
  const bisect = startBisection(batchOf(2), "b1");
  assert.throws(() => advanceBisection(bisect, "pending"), /invalid result/);
  assert.throws(() => advanceBisection({ ...bisect, segments: [] }, "red"), /no segment/);
  assert.throws(() => advanceBisection({ ...bisect, segments: [[]] }, "red"), /empty segment/);
});

test("batch of 2: each culprit position isolated with 3 runs at most", () => {
  assert.deepEqual(simulate(2, [1]), { runs: 3, landed: [2], found: [1], tested: [[1], [2]] });
  assert.deepEqual(simulate(2, [2]), { runs: 3, landed: [1], found: [2], tested: [[1], [2]] });
});

test("batch of 3: each culprit position", () => {
  assert.deepEqual(simulate(3, [1]), {
    runs: 4,
    landed: [2, 3],
    found: [1],
    tested: [[1, 2], [1], [2, 3]],
  });
  assert.deepEqual(simulate(3, [2]), {
    runs: 5,
    landed: [1, 3],
    found: [2],
    tested: [[1, 2], [1], [2], [3]],
  });
  assert.deepEqual(simulate(3, [3]), {
    runs: 3,
    landed: [1, 2],
    found: [3],
    tested: [[1, 2], [3]],
  });
});

test("batch of 6: culprit at every position — exact sequence and run count", () => {
  const expected = {
    1: { runs: 5, tested: [[1, 2, 3], [1, 2], [1], [2, 3, 4, 5, 6]] },
    2: { runs: 6, tested: [[1, 2, 3], [1, 2], [1], [2], [3, 4, 5, 6]] },
    3: { runs: 5, tested: [[1, 2, 3], [1, 2], [3], [4, 5, 6]] },
    4: { runs: 6, tested: [[1, 2, 3], [4, 5, 6], [4, 5], [4], [5, 6]] },
    5: { runs: 7, tested: [[1, 2, 3], [4, 5, 6], [4, 5], [4], [5], [6]] },
    6: { runs: 5, tested: [[1, 2, 3], [4, 5, 6], [4, 5], [6]] },
  };
  for (let position = 1; position <= 6; position++) {
    const result = simulate(6, [position]);
    assert.deepEqual(result.found, [position], `culprit ${position}`);
    assert.deepEqual(
      result.landed,
      batchOf(6)
        .map((p) => p.n)
        .filter((n) => n !== position),
      `the 5 innocent PRs land, in order (culprit ${position})`
    );
    assert.equal(result.runs, expected[position].runs, `runs (culprit ${position})`);
    assert.deepEqual(result.tested, expected[position].tested, `sequence (culprit ${position})`);
  }
});

test("single culprit costs at most 1 + 2*ceil(log2 n) runs (n = 2, 3, 6, 8)", () => {
  for (const size of [2, 3, 6, 8]) {
    const bound = 1 + 2 * Math.ceil(Math.log2(size));
    const runs = [];
    for (let position = 1; position <= size; position++) {
      const result = simulate(size, [position]);
      assert.deepEqual(result.found, [position]);
      assert.equal(result.landed.length, size - 1);
      assert.ok(result.runs <= bound, `n=${size} culprit=${position}: ${result.runs} > ${bound}`);
      runs.push(result.runs);
    }
    if (size === 8) assert.deepEqual(runs, [5, 6, 6, 7, 6, 7, 7, 7]);
  }
});

test("two culprits are both isolated and every other PR lands", () => {
  const result = simulate(6, [1, 4]);
  assert.deepEqual(result.found, [1, 4]);
  assert.deepEqual(result.landed, [2, 3, 5, 6]);
  // [1-6]R [1,2,3]R [1,2]R [1]R=culprit [2-6]R [2,3,4]R [2,3]G [4]R=culprit [5,6]G
  assert.equal(result.runs, 9);

  const adjacent = simulate(8, [7, 8]);
  assert.deepEqual(adjacent.found, [7, 8]);
  assert.deepEqual(adjacent.landed, [1, 2, 3, 4, 5, 6]);
  assert.ok(adjacent.runs <= 8, `two adjacent culprits in 8: ${adjacent.runs} runs`);
});

test("a red batch with no culprit (flaky) lands everything and blames nobody", () => {
  const result = simulate(6, []);
  assert.deepEqual(result.found, []);
  assert.deepEqual(result.landed, [1, 2, 3, 4, 5, 6]);
  assert.equal(result.runs, 3);
});
