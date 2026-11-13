// One idempotent tick of omni-queue (scripts/merge-queue/tick.mjs) against in-memory fakes of
// GitHub and of the WP1/WP2/WP4 modules; the real state store and bisection run underneath.
import assert from "node:assert/strict";
import test from "node:test";
import {
  STATE_BRANCH,
  appendEvent,
  baseCheckRef,
  baseRedTitle,
  candidateRef,
  commentMarker,
  dashboardTitle,
  initialState,
} from "../../../scripts/merge-queue/contracts.mjs";
import {
  GH_WRITE_METHODS,
  StateConflictError,
  TICK_ACTIONS,
  discoverBases,
  main,
  parseArgs,
  readOnlyGitHub,
  runTick,
} from "../../../scripts/merge-queue/tick.mjs";
import { BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const BASE0 = fakeSha("base-0");
const types = (state) => state.history.map((e) => e.type);
const nums = (prs) => prs.map((p) => p.n);
const head12 = (sha) => sha.slice(0, 12);

function commentsWithKey(h, n, key) {
  return (h.gh.comments.get(n) ?? []).filter((c) => c.body.includes(commentMarker(key)));
}

async function startBatch(h, prs) {
  for (const n of prs) h.addPr(n);
  await h.tick();
  const state = await h.state();
  assert.ok(state.inFlight, "a batch is in flight");
  return state.inFlight;
}

test("idle queue: eligible PRs are composed and pushed to a fresh candidate ref", async () => {
  const h = createHarness();
  h.addPr(1);
  h.addPr(2);
  h.addPr(3);
  h.addPr(4, { labeled: false });
  const result = await h.tick();
  const state = await h.state();
  const f = state.inFlight;
  assert.equal(f.kind, "batch");
  assert.equal(f.batchId, "b1");
  assert.deepEqual(nums(f.prs), [1, 2, 3]);
  assert.equal(f.baseSha, BASE0);
  assert.equal(f.candidateRef, candidateRef(BASE, "b1", f.candidateSha));
  assert.equal(f.attempts, 0);
  assert.equal(f.bisect, null);
  assert.equal(f.stage, "testing");
  assert.deepEqual(h.world.pushes, [{ ref: f.candidateRef, sha: f.candidateSha }]);
  assert.equal(h.world.prepareCalls, 1);
  assert.equal(state.counters.batchSeq, 1);
  assert.equal(state.counters.ciRuns, 1);
  assert.deepEqual(types(state), ["batch-started"]);
  assert.deepEqual(state.history[0].prs, [1, 2, 3]);
  assert.ok(h.gh.branches.has(STATE_BRANCH), "first save created the state branch");
  assert.equal(h.world.upserts.length, 1, "dashboard upserted");
  assert.deepEqual(
    h.world.renders[0].queue.map((e) => e.number),
    [1, 2, 3]
  );
  assert.equal(result.base, BASE);
  assert.ok(result.decisions.some((d) => d.includes("b1: pushed #1, #2, #3")));
});

test("batch size is capped by config.batch.maxSize (6)", async () => {
  const h = createHarness();
  for (let n = 1; n <= 8; n++) h.addPr(n);
  await h.tick();
  assert.deepEqual(nums((await h.state()).inFlight.prs), [1, 2, 3, 4, 5, 6]);
});

test("pending checks: the tick changes nothing", async () => {
  const h = createHarness();
  const f = await startBatch(h, [1, 2]);
  const before = await h.state();
  await h.tick();
  const after = await h.state();
  assert.deepEqual(after.inFlight, f);
  assert.equal(h.world.pushes.length, 1);
  assert.equal(h.world.lands.length, 0);
  for (const method of ["commentOnce", "removeLabel", "deleteBranch", "createIssue"]) {
    assert.deepEqual(h.writesOf(method), [], method);
  }
  assert.deepEqual(types(after), types(before));
  assert.deepEqual(after.counters, before.counters);
});

test("green candidate, live merge-ff: lands with expectedBaseSha, unlabels and comments", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2, 3]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();

  assert.deepEqual(h.world.lands, [
    { mode: "merge-ff", base: BASE, candidateSha: f.candidateSha, expectedBaseSha: f.baseSha },
  ]);
  assert.ok(
    h.git.runs.some(
      (args) =>
        args[0] === "fetch" &&
        args.includes(`+refs/heads/${f.candidateRef}:refs/omni-queue/inflight`)
    ),
    "the candidate is fetched into the scratch repository before landing"
  );
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  for (const pr of f.prs) {
    const removed = h.writesOf("removeLabel").filter((w) => w.args[0] === pr.n);
    assert.deepEqual(
      removed.map((w) => w.args[1]),
      ["omni-queue", "protected-approved"]
    );
    const landed = commentsWithKey(h, pr.n, `landed:${head12(pr.head)}`);
    assert.equal(landed.length, 1);
    assert.match(landed[0].body, new RegExp(f.candidateSha));
  }
  assert.deepEqual(types(state), ["batch-started", "checks-green", "landed"]);
  assert.deepEqual(state.history[2].prs, [1, 2, 3]);
  assert.equal(state.counters.landedPrs, 3);
  assert.equal(state.counters.landedBatches, 1);
  assert.equal(state.inFlight, null);
  assert.equal(h.gh.branches.has(f.candidateRef), false, "candidate ref deleted");
});

test("green candidate, shadow: would-land recorded, nothing landed, labels kept", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.equal(h.gh.branches.get(BASE), BASE0, "base untouched");
  assert.deepEqual(types(state), ["batch-started", "checks-green", "would-land"]);
  assert.deepEqual(state.shadow.processed, {
    1: h.gh.pulls.get(1).headSha,
    2: h.gh.pulls.get(2).headSha,
  });
  assert.deepEqual(h.writesOf("removeLabel"), []);
  assert.deepEqual(h.writesOf("commentOnce"), []);
  assert.equal(state.counters.landedPrs, 0);
  assert.equal(h.gh.branches.has(f.candidateRef), false);

  await h.tick();
  assert.equal(h.world.pushes.length, 1, "an already validated head is not composed again");
});

test("red batch of 1: the PR is the culprit — unlabeled with a comment listing the failures", async () => {
  const h = createHarness();
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.deepEqual(
    h.writesOf("removeLabel").map((w) => w.args),
    [[1, "omni-queue"]]
  );
  const [comment] = commentsWithKey(h, 1, `culprit:${head12(f.prs[0].head)}`);
  assert.ok(comment, "culprit comment posted");
  assert.match(comment.body, /\[Gate \/ CI\]\(https:\/\/github\.com\/acme\/widgets\/actions\/runs/);
  assert.match(comment.body, new RegExp(f.candidateSha));
  assert.deepEqual(types(state), ["batch-started", "checks-red", "culprit-found"]);
  assert.equal(state.counters.culprits, 1);
  assert.equal(state.counters.redBatches, 1);
  assert.equal(state.inFlight, null);
  assert.deepEqual(h.gh.pulls.get(1).labels, []);
});

test("red batch of 6 with one culprit: bisection isolates it and lands the other 5", async () => {
  // candidate runs per culprit position (initial batch included); see bisect.test.mjs
  const expectedPushes = { 1: 5, 2: 6, 3: 5, 4: 6, 5: 7, 6: 5 };
  for (let position = 1; position <= 6; position++) {
    const h = createHarness({ mode: "live" });
    h.world.culprits.add(position);
    for (let n = 1; n <= 6; n++) h.addPr(n);
    const state = await h.drain();

    assert.equal(h.world.pushes.length, expectedPushes[position], `pushes (culprit ${position})`);
    for (let n = 1; n <= 6; n++) {
      const pull = h.gh.pulls.get(n);
      if (n === position) {
        assert.equal(pull.merged, false);
        assert.deepEqual(pull.labels, [], "culprit unlabeled");
        assert.equal(commentsWithKey(h, n, `culprit:${head12(pull.headSha)}`).length, 1);
      } else {
        assert.equal(pull.merged, true, `#${n} landed (culprit ${position})`);
      }
    }
    assert.equal(state.counters.landedPrs, 5);
    assert.equal(state.counters.culprits, 1);
    assert.equal(state.counters.bisections, 1);
    assert.equal(state.counters.ciRuns, expectedPushes[position]);
    assert.ok(types(state).includes("bisect-split"));
    assert.equal(state.inFlight, null);
    const leftovers = [...h.gh.branches.keys()].filter((b) => b.startsWith("omni-queue/"));
    assert.deepEqual(leftovers, [], "no candidate ref left behind");
  }
});

test("bisection segments carry the bisect state and are composed on the landed base", async () => {
  const h = createHarness({ mode: "live" });
  h.world.culprits.add(5);
  const f = await startBatch(h, [1, 2, 3, 4, 5, 6]);
  h.runCi(f.candidateSha);
  await h.tick(); // red → split, compose [1,2,3]
  const s1 = (await h.state()).inFlight;
  assert.deepEqual(nums(s1.prs), [1, 2, 3]);
  assert.equal(s1.bisect.rootBatchId, "b1");
  assert.deepEqual(s1.bisect.segments.map(nums), [
    [1, 2, 3],
    [4, 5, 6],
  ]);
  h.runCi(s1.candidateSha);
  await h.tick(); // green → land, compose [4,5,6] on the new tip
  const s2 = (await h.state()).inFlight;
  assert.deepEqual(nums(s2.prs), [4, 5, 6]);
  assert.equal(s2.baseSha, s1.candidateSha, "next segment composed on the landed segment");
  assert.deepEqual(s2.bisect.landed, [1, 2, 3]);
});

test("two culprits in a batch of 6 are both dequeued and the other 4 land", async () => {
  const h = createHarness({ mode: "live" });
  h.world.culprits.add(2);
  h.world.culprits.add(5);
  for (let n = 1; n <= 6; n++) h.addPr(n);
  const state = await h.drain();
  assert.deepEqual(
    [...h.gh.pulls.values()].filter((p) => p.merged).map((p) => p.number),
    [1, 3, 4, 6]
  );
  assert.equal(state.counters.culprits, 2);
  assert.equal(state.counters.landedPrs, 4);
});

test("base-red: a red batch with a base-red issue open runs a base-check, then pauses", async () => {
  const h = createHarness();
  h.gh.issues.push({
    number: 500,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
  });
  h.world.brokenBases.add(BASE0);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();

  let state = await h.state();
  const check = state.inFlight;
  assert.equal(check.kind, "base-check");
  assert.equal(check.candidateSha, BASE0);
  assert.equal(check.candidateRef, baseCheckRef(BASE, BASE0));
  assert.deepEqual(check.prs, []);
  assert.equal(check.pendingRed.batchId, "b1");
  assert.deepEqual(nums(check.pendingRed.prs), [1, 2]);
  assert.deepEqual(check.pendingRed.signatures, [
    { check: "Gate / CI", key: "tests/unit/widget.test.ts", infra: false },
  ]);
  assert.deepEqual(h.world.pushes.at(-1), { ref: baseCheckRef(BASE, BASE0), sha: BASE0 });
  assert.ok(
    h.git.runs.some((args) =>
      args.includes(`+refs/heads/${f.candidateRef}:refs/omni-queue/inflight`)
    ),
    "the base object is fetched (through the red candidate) before pushing it"
  );
  assert.ok(h.gh.branches.has(f.candidateRef), "parked batch ref kept during the base-check");
  assert.ok(types(state).includes("base-check-started"));

  h.runCi(BASE0, { kind: "base-check" });
  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "base-red");
  assert.equal(state.paused.baseSha, BASE0);
  assert.equal(state.paused.issue, 500);
  assert.equal(state.inFlight, null);
  assert.equal(state.baseChecks[0].status, "red");
  assert.equal(state.baseChecks[0].baseSha, BASE0);
  assert.ok(types(state).includes("base-red-paused"));
  assert.equal(commentsWithKey(h, 500, "base-red:b1").length, 1, "base-red issue updated");
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"], "PRs stay queued");
  assert.deepEqual(h.gh.pulls.get(2).labels, ["omni-queue"]);
  assert.equal(state.counters.culprits, 0);

  const pushes = h.world.pushes.length;
  await h.tick();
  assert.equal(h.world.pushes.length, pushes, "paused on an unchanged base: nothing composed");
  assert.equal((await h.state()).paused.reason, "base-red");

  const BASE1 = fakeSha("base-1");
  h.gh.branches.set(BASE, BASE1);
  h.world.brokenBases.clear();
  await h.tick();
  state = await h.state();
  assert.equal(state.paused, null, "auto-resumed when the base moved");
  assert.equal(state.history.filter((e) => e.type === "resumed").length, 1);
  assert.equal(state.inFlight.baseSha, BASE1);
  assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
});

test("base-check green: the parked batch is PR-red and bisection starts", async () => {
  const h = createHarness();
  h.gh.issues.push({
    number: 501,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
  });
  h.world.culprits.add(2);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick(); // → base-check
  h.runCi(BASE0, { kind: "base-check" });
  await h.tick(); // base green → bisect
  const state = await h.state();
  assert.equal(state.baseChecks[0].status, "green");
  assert.equal(state.paused, null);
  assert.equal(state.counters.bisections, 1);
  assert.equal(state.inFlight.kind, "batch");
  assert.deepEqual(nums(state.inFlight.prs), [1]);
  assert.equal(state.inFlight.bisect.rootBatchId, "b1");

  const final = await h.drain();
  assert.equal(h.gh.pulls.get(1).merged, true);
  assert.equal(h.gh.pulls.get(2).merged, false);
  assert.equal(final.counters.culprits, 1);
});

test("a red candidate on a base already checked red with other failures is PR-red", async () => {
  const h = createHarness();
  h.world.culprits.add(1);
  const state = initialState(BASE, "2026-11-13T11:00:00.000Z");
  state.baseChecks = [
    {
      baseSha: BASE0,
      ref: baseCheckRef(BASE, BASE0),
      status: "red",
      startedAt: "2026-11-13T11:00:00.000Z",
      signatures: [{ check: "Gate / Quality", key: "lint", infra: false }],
    },
  ];
  await h.store.save(BASE, state, null, "seed");
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick();
  const after = await h.state();
  assert.equal(after.paused, null);
  assert.equal(after.counters.culprits, 1);
  assert.deepEqual(h.world.pushes.length, 1, "no base-check needed: one is recorded");
});

test("infra failure: one retry of the same SHA on a new ref, then the queue pauses", async () => {
  const h = createHarness({ infraRetries: 1 });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha, { infra: true });
  await h.tick();
  let state = await h.state();
  const retry = state.inFlight;
  assert.equal(retry.batchId, "b1-r1");
  assert.equal(retry.attempts, 1);
  assert.equal(retry.candidateSha, f.candidateSha);
  assert.equal(retry.candidateRef, candidateRef(BASE, "b1-r1", f.candidateSha));
  assert.notEqual(retry.candidateRef, f.candidateRef);
  assert.deepEqual(h.world.pushes.at(-1), { ref: retry.candidateRef, sha: f.candidateSha });
  assert.ok(types(state).includes("infra-retry"));
  assert.equal(h.gh.branches.has(f.candidateRef), false, "old ref cleaned up");
  assert.equal(state.counters.ciRuns, 2);

  await h.tick();
  state = await h.state();
  assert.equal(state.inFlight.attempts, 1, "the old failed runs are not re-read as the retry");
  assert.equal(state.paused, null);
  assert.equal(h.world.pushes.length, 2);

  h.runCi(f.candidateSha, { infra: true });
  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "infra");
  assert.equal(state.inFlight, null);
  assert.ok(types(state).includes("infra-paused"));
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"], "the batch returns to the queue");
  assert.deepEqual(h.writesOf("removeLabel"), []);

  await h.tick();
  assert.equal(h.world.pushes.length, 2, "paused (infra): nothing composed");
  await h.tick({ action: "resume" });
  state = await h.state();
  assert.equal(state.paused, null);
  assert.equal(state.history.at(-2).type, "resumed");
  assert.equal(h.world.pushes.length, 3, "resume composes in the same tick");
});

test("timeout follows the infra path", async () => {
  const h = createHarness({ infraRetries: 1 });
  const f = await startBatch(h, [1]);
  h.clock.advance(h.config.checksTimeoutMinutes + 1);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(types(state).slice(-2), ["checks-timeout", "infra-retry"]);
  assert.equal(state.inFlight.attempts, 1);
  assert.equal(state.inFlight.candidateSha, f.candidateSha);

  h.clock.advance(h.config.checksTimeoutMinutes + 1);
  await h.tick();
  assert.equal((await h.state()).paused.reason, "infra");
});

test("infraRetries 0: the first infra failure pauses", async () => {
  const h = createHarness({ infraRetries: 0 });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha, { infra: true });
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "infra");
  assert.equal(h.world.pushes.length, 1);
});

test("base moved before landing: push refused → the same PRs are recomposed on the new tip", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  const MANUAL = fakeSha("manual-merge");
  h.gh.branches.set(BASE, MANUAL);
  await h.tick();
  const state = await h.state();
  assert.equal(h.world.lands.length, 1);
  assert.equal(h.world.lands[0].expectedBaseSha, BASE0);
  assert.ok(types(state).includes("land-rejected"));
  assert.ok(!types(state).includes("landed"));
  assert.equal(state.inFlight.batchId, "b2");
  assert.equal(state.inFlight.baseSha, MANUAL);
  assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
  assert.deepEqual(h.writesOf("removeLabel"), []);
});

test("a PR whose head moved during CI is dropped before landing; the rest is recomposed", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2, 3]);
  h.runCi(f.candidateSha);
  h.gh.pulls.get(2).headSha = fakeSha("new-push");
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, [], "a stale approval never lands");
  const rejected = state.history.find((e) => e.type === "land-rejected");
  assert.deepEqual(rejected.prs, [2]);
  assert.match(rejected.detail, /#2 head moved/);
  assert.deepEqual(nums(state.inFlight.prs), [1, 3]);
});

test("a PR unlabeled during CI (approval withdrawn) is not landed", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  h.gh.pulls.get(1).labels = [];
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.match(
    state.history.find((e) => e.type === "land-rejected").detail,
    /#1 queue label removed/
  );
  assert.deepEqual(nums(state.inFlight.prs), [2]);
});

test("manual pause and resume: no composition while paused, even when the base moves", async () => {
  const h = createHarness();
  h.addPr(1);
  await h.tick({ action: "pause", reason: "release cut" });
  let state = await h.state();
  assert.deepEqual(state.paused, {
    reason: "manual",
    since: state.paused.since,
    baseSha: null,
    detail: "release cut",
    issue: null,
  });
  assert.deepEqual(types(state), ["paused"]);
  assert.equal(h.world.pushes.length, 0);
  assert.equal(h.world.upserts.length, 1, "the dashboard is still updated while paused");

  h.gh.branches.set(BASE, fakeSha("moved"));
  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "manual", "a manual pause never auto-resumes");
  assert.equal(h.world.pushes.length, 0);

  await h.tick({ action: "resume" });
  state = await h.state();
  assert.equal(state.paused, null);
  assert.deepEqual(types(state), ["paused", "resumed", "batch-started"]);
  assert.equal(h.world.pushes.length, 1);
});

test("a manual pause freezes an in-flight green candidate until resume", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick({ action: "pause" });
  assert.deepEqual(h.world.lands, []);
  assert.equal((await h.state()).inFlight.candidateSha, f.candidateSha);
  await h.tick({ action: "resume" });
  assert.equal(h.world.lands.length, 1);
  assert.equal(h.gh.pulls.get(1).merged, true);
});

test("dry-run: observes and plans with ZERO writes (no push, comment, label, state, dashboard)", async () => {
  const h = createHarness();
  h.addPr(1);
  h.addPr(2);
  h.world.eligibilityActions = (pr) =>
    pr.number === 2
      ? [
          { type: "comment", pr: 2, key: "not-approver", body: "label by a non-approver" },
          { type: "removeLabel", pr: 2, label: "omni-queue" },
        ]
      : [];
  const stray = `omni-queue/release-v9.9.9/b0-${"0".repeat(12)}`;
  h.gh.branches.set(stray, fakeSha("stray"));
  h.gh.readOnly = true;

  const result = await h.tick({ action: "dry-run" });
  assert.deepEqual(h.gh.writes, [], "no GitHub write attempted");
  assert.deepEqual(h.world.pushes, []);
  assert.deepEqual(h.world.upserts, []);
  assert.equal(h.gh.branches.has(STATE_BRANCH), false, "state not saved");
  assert.ok(h.gh.branches.has(stray), "stray ref not deleted");
  const plan = result.decisions.join("\n");
  assert.match(plan, /\[dry-run\] would comment on #2 \(not-approver\)/);
  assert.match(plan, /\[dry-run\] would remove label "omni-queue" from #2/);
  assert.match(plan, /\[dry-run\] would push [0-9a-f]{12} to omni-queue\/release-v9\.9\.9\/b1-/);
  assert.match(plan, /would delete omni-queue\/release-v9\.9\.9\/b0-/);
  assert.match(plan, /would update the dashboard issue/);
  assert.deepEqual(nums(result.state.inFlight.prs), [1], "the plan excludes the dequeued PR");
});

test("dry-run with a green live candidate does not land", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  const writes = h.gh.writes.length;
  h.gh.readOnly = true;
  const result = await h.tick({ action: "dry-run" });
  assert.deepEqual(h.world.lands, []);
  assert.equal(h.gh.writes.length, writes);
  assert.equal(h.gh.branches.get(BASE), BASE0);
  assert.ok(result.decisions.some((d) => d.includes(`would land b1 (${head12(f.candidateSha)})`)));
});

test("dry-run guard: every GitHub write is refused AND recorded, reads pass through", async () => {
  const h = createHarness();
  const violations = [];
  const guarded = readOnlyGitHub(h.gh, violations);
  for (const method of GH_WRITE_METHODS) {
    assert.throws(() => guarded[method](1, "x"), /dry-run: refused GitHub write/, method);
  }
  assert.deepEqual(violations, [...GH_WRITE_METHODS]);
  assert.deepEqual(h.gh.writes, [], "nothing reached the client");
  assert.equal(await guarded.getBranchSha(BASE), BASE0, "reads still work");

  const calls = [];
  const raw = readOnlyGitHub(
    { request: async (method, path) => calls.push([method, path]) },
    violations
  );
  await raw.request("GET", "/repos/acme/widgets");
  assert.throws(() => raw.request("POST", "/repos/acme/widgets/issues"), /refused/);
  assert.deepEqual(calls, [["GET", "/repos/acme/widgets"]]);
  assert.equal(violations.at(-1), "request POST");
});

test("an unknown eligibility action aborts the tick before any write", async () => {
  const h = createHarness();
  h.addPr(1);
  h.modules.eligibility.evaluateEligibility = (pr) => ({
    eligible: false,
    reasons: [{ code: "no-label", detail: "" }],
    actions: [{ type: "bogus", pr: pr.number }],
    approval: { valid: false, actor: null, labeledAt: null, reason: "no-label" },
    protectedSurface: false,
  });
  await assert.rejects(h.tick(), /unknown eligibility action: bogus/);
  assert.deepEqual(h.gh.writes, []);
  assert.deepEqual(h.world.pushes, []);
});

test("eligibility actions are executed (comment-once and label removal) before selection", async () => {
  const h = createHarness();
  h.addPr(1);
  h.addPr(2);
  h.world.eligibilityActions = (pr) =>
    pr.number === 2
      ? [
          { type: "comment", pr: 2, key: "head-changed", body: "head changed after the label" },
          { type: "removeLabel", pr: 2, label: "omni-queue" },
        ]
      : [];
  await h.tick();
  assert.deepEqual(
    h.writesOf("commentOnce").map((w) => w.args.slice(0, 2)),
    [[2, "head-changed"]]
  );
  assert.deepEqual(
    h.writesOf("removeLabel").map((w) => w.args),
    [[2, "omni-queue"]]
  );
  assert.deepEqual(nums((await h.state()).inFlight.prs), [1]);
  await h.tick();
  assert.equal(commentsWithKey(h, 2, "head-changed").length, 1, "comment posted once");
});

test("composition exclusions: base conflict leaves the queue, batch conflict stays queued", async () => {
  const h = createHarness();
  h.world.baseConflicts.add(2);
  h.world.batchConflicts.add(3);
  for (const n of [1, 2, 3]) h.addPr(n);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [1]);
  assert.deepEqual(
    h.writesOf("removeLabel").map((w) => w.args),
    [[2, "omni-queue"]]
  );
  assert.equal(
    commentsWithKey(h, 2, `base-conflict:${head12(h.gh.pulls.get(2).headSha)}`).length,
    1
  );
  const dequeued = state.history.find((e) => e.type === "pr-dequeued");
  assert.deepEqual(dequeued.prs, [2]);
  assert.equal(dequeued.detail, "base-conflict");
  const skipped = state.history.find((e) => e.type === "pr-skipped-conflict");
  assert.deepEqual(skipped.prs, [3]);
  assert.deepEqual(h.gh.pulls.get(3).labels, ["omni-queue"]);
  assert.match(state.history.find((e) => e.type === "batch-started").detail, /#3 batch-conflict/);
});

test("squash-api landing with a tree divergence pauses the queue and opens an issue", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api" });
  h.world.squashResult = {
    ok: false,
    reason: "tree-divergence",
    merged: [1, 2],
    actualTree: "e".repeat(40),
  };
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, [
    {
      mode: "squash-api",
      base: BASE,
      prs: [1, 2],
      expectedBaseSha: f.baseSha,
      candidateTreeSha: f.treeSha,
    },
  ]);
  const [issue] = h.writesOf("createIssue");
  assert.equal(issue.args[0].title, `🛑 omni-queue tree divergence: ${BASE}`);
  assert.match(issue.args[0].body, new RegExp("e".repeat(40)));
  assert.equal(state.paused.reason, "tree-divergence");
  assert.equal(state.paused.issue, h.gh.issues[0].number);
  assert.equal(state.inFlight, null);
  assert.ok(types(state).includes("tree-divergence"));
});

test("squash-api landing that succeeds records the new base tip", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  const landed = state.history.find((e) => e.type === "landed");
  assert.equal(landed.sha, fakeSha(`squash:${BASE0}`));
  assert.equal(state.counters.landedPrs, 1);
});

test("a landing failure other than base-moved/divergence pauses with reason error", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api" });
  h.world.squashResult = { ok: false, reason: "merge-failed", merged: [1], detail: "405" };
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /merge-failed/);
  assert.equal(state.history.at(-1).type, "error");
});

test("cleanup deletes stray candidate refs of this base only and keeps the in-flight one", async () => {
  const h = createHarness();
  const mine = `omni-queue/release-v9.9.9/b0-${"0".repeat(12)}`;
  const other = `omni-queue/release-v9.9.90/b3-${"1".repeat(12)}`;
  h.gh.branches.set(mine, fakeSha("x"));
  h.gh.branches.set(other, fakeSha("y"));
  const f = await startBatch(h, [1]);
  assert.equal(h.gh.branches.has(mine), false);
  assert.equal(h.gh.branches.has(other), true, "the prefix includes the trailing slash");
  assert.equal(h.gh.branches.has(f.candidateRef), true);
  assert.deepEqual(
    h.writesOf("deleteBranch").map((w) => w.args[0]),
    [mine]
  );
});

test("a tick that loses the state CAS throws; the redo is idempotent (no double landing)", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  h.gh.beforePut = async () => {
    const { state, version } = await h.store.load(BASE);
    const other = appendEvent(state, { at: h.clock.now(), type: "error", detail: "concurrent" });
    assert.equal((await h.store.save(BASE, other, version, "concurrent")).ok, true);
  };
  await assert.rejects(h.tick(), StateConflictError);
  assert.equal(h.world.lands.length, 1, "landed before the lost save");
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);

  await h.tick();
  const state = await h.state();
  assert.equal(h.world.lands.length, 1, "the redo recognizes the landed tip");
  assert.equal(state.history.filter((e) => e.type === "landed").length, 1);
  assert.equal(state.counters.landedPrs, 1);
  assert.equal(commentsWithKey(h, 1, `landed:${head12(f.prs[0].head)}`).length, 1);
  assert.equal(state.inFlight, null);
});

test("runTick validates the action and the base", async () => {
  const h = createHarness();
  assert.deepEqual(TICK_ACTIONS, ["tick", "pause", "resume", "dry-run"]);
  await assert.rejects(runTick(h.deps, { base: BASE, action: "land" }), /unknown action/);
  await assert.rejects(runTick(h.deps, { base: "main", action: "tick" }), /config\.bases/);
  await assert.rejects(runTick(h.deps, { base: "../x", action: "tick" }), /unsafe base/);
  assert.deepEqual(h.gh.writes, []);
});

test("discoverBases: labeled PR bases plus dashboard bases with work in flight or paused", async () => {
  const h = createHarness();
  h.addPr(1);
  h.addPr(2, { base: "release/v1.0.0" });
  h.addPr(3, { base: "main" });
  h.addPr(4, { base: "release/v5.0.0", labeled: false });
  const paused = initialState("release/v2.0.0");
  paused.paused = {
    reason: "manual",
    since: "2026-11-13T10:00:00.000Z",
    baseSha: null,
    detail: "x",
    issue: null,
  };
  await h.store.save("release/v2.0.0", paused, null, "seed");
  await h.store.save("release/v3.0.0", initialState("release/v3.0.0"), null, "seed");
  for (const base of ["release/v2.0.0", "release/v3.0.0", BASE]) {
    h.gh.issues.push({
      number: h.gh.issues.length + 1,
      title: dashboardTitle(base),
      body: "",
      labels: ["omni-queue-dashboard"],
      state: "open",
    });
  }
  assert.deepEqual(await discoverBases(h.deps), ["release/v1.0.0", "release/v2.0.0", BASE]);
});

test("parseArgs: flags, = form, defaults and validation", () => {
  assert.deepEqual(parseArgs([]), { base: null, action: "tick", reason: null });
  assert.deepEqual(parseArgs(["--base=release/v1.2.3", "--action", "pause", "--reason", "x"]), {
    base: "release/v1.2.3",
    action: "pause",
    reason: "x",
  });
  assert.throws(() => parseArgs(["--action", "resume"]), /requires --base/);
  assert.throws(() => parseArgs(["--action", "land"]), /unknown action/);
  assert.throws(() => parseArgs(["--base"]), /needs a value/);
  assert.throws(() => parseArgs(["--force"]), /unknown argument/);
});

test("main: exits 1 without touching the network on bad arguments or environment", async (t) => {
  const errors = [];
  t.mock.method(console, "error", (line) => errors.push(String(line)));
  const token = "ghs_supersecrettoken";
  assert.equal(await main(["--action", "land"], { OMNI_QUEUE_TOKEN: token }), 1);
  assert.equal(await main([], { GITHUB_REPOSITORY: "acme/widgets" }), 1);
  assert.equal(await main([], { OMNI_QUEUE_TOKEN: token, GITHUB_REPOSITORY: "not a repo" }), 1);
  assert.equal(
    await main([], {
      OMNI_QUEUE_TOKEN: token,
      GITHUB_REPOSITORY: "acme/widgets",
      OMNI_QUEUE_CONFIG: "/nonexistent/omni-queue.json",
    }),
    1
  );
  assert.match(errors.join("\n"), /unknown action: land/);
  assert.match(errors.join("\n"), /OMNI_QUEUE_TOKEN is not set/);
  assert.match(errors.join("\n"), /GITHUB_REPOSITORY must be owner\/repo/);
  assert.match(errors.join("\n"), /setup failed/);
  assert.ok(!errors.join("\n").includes(token), "the token is never printed");
});
