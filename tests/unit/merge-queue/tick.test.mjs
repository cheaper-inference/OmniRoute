// One idempotent tick of omni-queue (scripts/merge-queue/tick.mjs) against in-memory fakes of
// GitHub and of the WP1/WP2/WP4 modules; the real state store and bisection run underneath.
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { resolveCandidateBase } from "../../../scripts/merge-queue/candidate-base.mjs";
import * as realChecks from "../../../scripts/merge-queue/checks.mjs";
import * as realClassify from "../../../scripts/merge-queue/classify.mjs";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import {
  APPROVAL_CONTEXTS,
  BASE_CHECK_LIMIT,
  STATE_BRANCH,
  appendEvent,
  botIdentity,
  baseCheckRef,
  baseRedTitle,
  candidateRef,
  commentMarker,
  dashboardTitle,
  initialState,
  stateFilePath,
} from "../../../scripts/merge-queue/contracts.mjs";
import {
  GH_WRITE_METHODS,
  LANDING_ATTEMPTS_LIMIT,
  STATE_HEARTBEAT_MINUTES,
  BlessRefusedError,
  StateConflictError,
  TICK_ACTIONS,
  createTickDeps,
  discoverBases,
  hangSentence,
  main,
  parseArgs,
  readOnlyGitHub,
  runTick,
} from "../../../scripts/merge-queue/tick.mjs";
import { startFakeGitHub } from "./helpers/fake-github.mjs";
import { APP_BOT, BASE, FAILURE_KEY, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

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

/**
 * Store a green base verdict for `sha` (default: the harness base tip), the state after the queue
 * landed that tip itself: a red batch on it is blamed on its PRs without a base check.
 */
async function greenBase(h, sha = BASE0) {
  const { state, version } = await h.store.load(BASE);
  state.baseChecks = [
    {
      baseSha: sha,
      ref: candidateRef(BASE, "b0", sha),
      status: "green",
      startedAt: "2026-11-13T10:30:00.000Z",
      signatures: [],
    },
    ...state.baseChecks.filter((b) => b.baseSha !== sha),
  ];
  assert.equal((await h.store.save(BASE, state, version, "seed: base green")).ok, true);
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
    {
      mode: "merge-ff",
      base: BASE,
      candidateSha: f.candidateSha,
      expectedBaseSha: f.baseSha,
      // the in-flight PRs go to landMergeFf so stacked PRs are reported as merged too
      prs: [1, 2, 3],
    },
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
  // the App blesses the candidate (land status) right before it is pushed
  assert.deepEqual(types(state), ["batch-started", "checks-green", "land-blessed", "landed"]);
  assert.deepEqual(
    h.writesOf("createCommitStatus").map((w) => [w.args[0], w.args[1].state, w.args[1].context]),
    [[f.candidateSha, "success", "omni-queue/land"]]
  );
  assert.equal(
    h.calls.find((c) => c.name === "landMergeFf").args[0].git,
    h.git,
    "actor app: the App's own git pushes, as before"
  );
  assert.deepEqual(state.history[3].prs, [1, 2, 3]);
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
  await greenBase(h); // the tip the queue landed: no base check needed
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
  assert.match(
    comment.body,
    /\[`Gate \/ CI`\]\(https:\/\/github\.com\/acme\/widgets\/actions\/runs/
  );
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
    await greenBase(h); // the tip the queue landed: no base check needed
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
  await greenBase(h); // the tip the queue landed: no base check needed
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
    { check: "Gate / CI", key: FAILURE_KEY, infra: false },
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

/** Store a red base verdict for `sha` carrying `signatures` (a base check that already ran). */
async function redBase(h, signatures, sha = BASE0) {
  const { state, version } = await h.store.load(BASE);
  state.baseChecks = [
    {
      baseSha: sha,
      ref: baseCheckRef(BASE, sha),
      status: "red",
      startedAt: "2026-11-13T10:30:00.000Z",
      signatures,
    },
    ...state.baseChecks.filter((b) => b.baseSha !== sha),
  ];
  assert.equal((await h.store.save(BASE, state, version, "seed: base red")).ok, true);
}

test("a key on one side only never matches; both empty match by check name", async () => {
  const keyed = { check: "Gate / CI", key: FAILURE_KEY, infra: false };
  const keyless = { check: "Gate / CI", key: "", infra: false };
  // `annotated` false: the failing run carries no failure annotation (node:test / vitest in this
  // repository), so the candidate's signature has an empty key
  const cases = [
    { what: "the base names a failing test, the candidate none", base: keyed, annotated: false },
    { what: "the candidate names a failing test, the base none", base: keyless, annotated: true },
    {
      what: "both keys empty but the base fails another check",
      base: { ...keyless, check: "Gate / Quality" },
      annotated: false,
    },
  ];
  for (const { what, base, annotated } of cases) {
    const h = createHarness();
    h.world.culprits.add(1);
    await redBase(h, [base]);
    const f = await startBatch(h, [1]);
    h.runCi(f.candidateSha);
    if (!annotated) h.gh.annotations.clear();
    await h.tick();
    const state = await h.state();
    assert.equal(state.paused, null, `${what}: not "the base fails the same way"`);
    assert.equal(types(state).includes("base-check-started"), false, `${what}: verdict reused`);
    assert.equal(state.counters.culprits, 1, `${what}: the PR is blamed`);
    assert.deepEqual(h.gh.pulls.get(1).labels, [], `${what}: dequeued`);
  }

  // no key on either side and the same check name: the degraded name-only base-red match
  const h = createHarness();
  h.world.culprits.add(1);
  await redBase(h, [keyless]);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  h.gh.annotations.clear();
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused?.reason, "base-red");
  assert.equal(state.paused.baseSha, BASE0);
  assert.match(state.paused.detail, /\(1 matched by check name only: no test-level key\)/);
  assert.equal(types(state).includes("base-check-started"), false);
  assert.equal(state.counters.culprits, 0);
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"], "the PR stays queued");
});

test("the tip the queue landed is recorded green: the next red batch on it is pr-red at once", async () => {
  const h = createHarness({ mode: "live" });
  const b1 = await startBatch(h, [1, 2]);
  h.runCi(b1.candidateSha);
  await h.tick(); // b1 lands: the tip is now its candidate
  let state = await h.state();
  const X = b1.candidateSha;
  assert.equal(h.gh.branches.get(BASE), X);
  assert.deepEqual(state.baseChecks, [
    { baseSha: X, ref: b1.candidateRef, status: "green", startedAt: b1.startedAt, signatures: [] },
  ]);

  h.world.culprits.add(3);
  const b2 = await startBatch(h, [3]);
  assert.equal(b2.baseSha, X, "batch 2 is composed on the tip batch 1 landed");
  h.runCi(b2.candidateSha);
  await h.tick();
  state = await h.state();
  assert.equal(types(state).includes("base-check-started"), false, "no base check on X");
  assert.equal(
    h.world.pushes.some((p) => p.ref === baseCheckRef(BASE, X)),
    false,
    "the bare base is never pushed"
  );
  assert.equal(state.counters.culprits, 1, "the culprit is removed at once");
  assert.equal(state.counters.ciRuns, 2, "one CI run per batch, none for the base");
  assert.deepEqual(h.gh.pulls.get(3).labels, []);
  assert.equal(state.paused, null);
});

test("a red batch on a tip pushed from outside starts a base check before blaming a PR", async () => {
  const h = createHarness({ mode: "live" });
  const Y = fakeSha("pushed-by-hand");
  h.gh.branches.set(BASE, Y); // a manual push or a sync-back: the queue has no verdict for Y
  assert.deepEqual(h.gh.issues, [], "no base-red issue is open");
  h.world.culprits.add(2);
  const f = await startBatch(h, [1, 2]);
  assert.equal(f.baseSha, Y);
  assert.deepEqual((await h.state()).baseChecks, []);
  h.runCi(f.candidateSha);
  await h.tick();

  let state = await h.state();
  assert.equal(state.inFlight.kind, "base-check");
  assert.equal(state.inFlight.candidateSha, Y);
  assert.equal(state.inFlight.pendingRed.batchId, "b1");
  assert.deepEqual(h.world.pushes.at(-1), { ref: baseCheckRef(BASE, Y), sha: Y });
  const started = state.history.find((e) => e.type === "base-check-started");
  assert.equal(started.sha, Y);
  assert.equal(started.detail, "b1 red on a base with no verdict: testing the bare base");
  assert.equal(state.counters.bisections, 0, "no PR is blamed before the base check");
  assert.equal(state.counters.culprits, 0);

  h.runCi(Y, { kind: "base-check" });
  await h.tick(); // the bare base is green: the parked batch is PR-red and bisection starts
  state = await h.state();
  assert.equal(state.baseChecks[0].baseSha, Y);
  assert.equal(state.baseChecks[0].status, "green");
  assert.equal(state.counters.bisections, 1);
});

test("a landing records the new tip green over an older verdict for it, within BASE_CHECK_LIMIT", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  const { state: seeded, version } = await h.store.load(BASE);
  // the list is full; one entry is an older red verdict for the very SHA that is about to land
  seeded.baseChecks = Array.from({ length: BASE_CHECK_LIMIT }, (_, i) => ({
    baseSha: i === 3 ? f.candidateSha : fakeSha(`older-${i}`),
    ref: `older-${i}`,
    status: "red",
    startedAt: "2026-11-13T09:00:00.000Z",
    signatures: [{ check: "Gate / CI", key: `old-${i}`, infra: false }],
  }));
  assert.equal((await h.store.save(BASE, seeded, version, "seed")).ok, true);
  h.runCi(f.candidateSha);
  await h.tick();

  const { baseChecks } = await h.state();
  assert.equal(baseChecks.length, BASE_CHECK_LIMIT, "still bounded");
  assert.deepEqual(baseChecks[0], {
    baseSha: f.candidateSha,
    ref: f.candidateRef,
    status: "green",
    startedAt: f.startedAt,
    signatures: [],
  });
  assert.equal(
    baseChecks.filter((b) => b.baseSha === f.candidateSha).length,
    1,
    "one verdict per SHA: the landed candidate passed the profile just now"
  );
  assert.deepEqual(
    baseChecks.slice(1).map((b) => b.ref),
    seeded.baseChecks.filter((_, i) => i !== 3).map((b) => b.ref),
    "the other verdicts keep their order; none is dropped while the replaced one frees a slot"
  );

  // with no entry for the landed SHA, the oldest verdict is the one that leaves the list
  const h2 = createHarness({ mode: "live" });
  const f2 = await startBatch(h2, [1]);
  const loaded = await h2.store.load(BASE);
  loaded.state.baseChecks = Array.from({ length: BASE_CHECK_LIMIT }, (_, i) => ({
    baseSha: fakeSha(`older-${i}`),
    ref: `older-${i}`,
    status: "green",
    startedAt: "2026-11-13T09:00:00.000Z",
    signatures: [],
  }));
  assert.equal((await h2.store.save(BASE, loaded.state, loaded.version, "seed")).ok, true);
  h2.runCi(f2.candidateSha);
  await h2.tick();
  const full = (await h2.state()).baseChecks;
  assert.equal(full.length, BASE_CHECK_LIMIT);
  assert.equal(full[0].baseSha, f2.candidateSha);
  assert.equal(full[0].status, "green");
  assert.deepEqual(
    full.slice(1).map((b) => b.ref),
    loaded.state.baseChecks.slice(0, BASE_CHECK_LIMIT - 1).map((b) => b.ref)
  );
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
  const paused = await h.state();
  assert.equal(paused.paused.reason, "infra");
  // a batch candidate that never gets a verdict is not a base check: no verdict is recorded
  assert.deepEqual(types(paused).slice(-2), ["checks-timeout", "infra-paused"]);
  assert.equal(paused.inFlight, null);
  assert.deepEqual(paused.baseChecks, []);
  assert.equal(types(paused).includes("hang-suspected"), false);
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

// ──────────── a job that times out on every attempt: a suspected hanging test ────────────

/** A live harness with one infra retry (its real classifier tells a job timeout from others). */
function hangHarness() {
  return createHarness({ mode: "live", infraRetries: 1 });
}

/** Report CI for whatever is in flight, tick, and return the new state. */
async function ciTick(h) {
  const { inFlight } = await h.state();
  h.runCi(inFlight.candidateSha, { kind: inFlight.kind });
  await h.tick();
  return h.state();
}

const count = (state, type) => state.history.filter((e) => e.type === type).length;
const HANG_SIGNATURE = { check: "Unit Tests", key: "", infra: false, hang: true };

test("timeout twice on a 4-PR batch: hang-suspected, base check, then bisection (no infra pause)", async () => {
  const h = hangHarness();
  h.world.hangs.add(3);
  const f = await startBatch(h, [1, 2, 3, 4]);
  let state = await ciTick(h); // "Unit Tests (3/8)" timed out: retried once as infrastructure
  assert.deepEqual(types(state).slice(-2), ["checks-red", "infra-retry"]);
  assert.equal(state.inFlight.batchId, "b1-r1");
  assert.equal(state.inFlight.timedOutRuns, 1, "the first run is recorded as entirely timed out");

  state = await ciTick(h); // the retry times out the same job: a suspected hang, not infra
  assert.deepEqual(types(state), [
    "batch-started",
    "checks-red",
    "infra-retry",
    "checks-red",
    "hang-suspected",
    "base-check-started",
  ]);
  const hang = state.history.find((e) => e.type === "hang-suspected");
  assert.equal(hang.batchId, "b1-r1");
  assert.deepEqual(hang.prs, [1, 2, 3, 4]);
  assert.equal(hang.sha, f.candidateSha);
  assert.match(hang.detail, /Unit Tests \(3\/8\) timed out on 2 run\(s\)/);
  assert.equal(state.paused, null);
  assert.equal(state.inFlight.kind, "base-check");
  assert.equal(state.inFlight.candidateSha, BASE0);
  assert.equal(state.inFlight.pendingRed.batchId, "b1-r1");
  assert.deepEqual(state.inFlight.pendingRed.signatures, [HANG_SIGNATURE]);

  state = await ciTick(h); // the bare base passes the job: the parked batch is bisected
  assert.equal(state.baseChecks[0].baseSha, BASE0);
  assert.equal(state.baseChecks[0].status, "green");
  assert.deepEqual(types(state).slice(-3), ["checks-green", "bisect-split", "batch-started"]);
  assert.equal(state.paused, null);
  assert.equal(state.counters.bisections, 1);
  assert.equal(state.inFlight.kind, "batch");
  assert.equal(state.inFlight.bisect.hang, true);
  assert.equal(state.inFlight.bisect.rootBatchId, "b1-r1");
  assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
  assert.equal(count(state, "infra-paused"), 0);
  assert.deepEqual(h.writesOf("removeLabel"), [], "nobody is blamed before the bisection");
});

test("timeout twice on the bare base too: base-red pause naming the job", async () => {
  const h = hangHarness();
  h.world.hangingBases.add(BASE0);
  await startBatch(h, [1, 2]);
  await ciTick(h); // infra retry of the batch
  let state = await ciTick(h); // suspected hang → the bare base is checked
  assert.equal(state.inFlight.kind, "base-check");

  state = await ciTick(h); // the base times out the job once: the base check is retried
  assert.equal(types(state).at(-1), "infra-retry");
  assert.equal(state.inFlight.kind, "base-check");
  assert.equal(state.inFlight.batchId, `basecheck-${head12(BASE0)}-r1`);
  assert.equal(state.paused, null);

  state = await ciTick(h); // and again: the bare base hangs on the same job
  assert.equal(state.paused.reason, "base-red");
  assert.equal(state.paused.baseSha, BASE0);
  assert.match(state.paused.detail, /Unit Tests/);
  assert.equal(state.inFlight, null);
  assert.equal(state.baseChecks[0].status, "red");
  assert.deepEqual(state.baseChecks[0].signatures, [HANG_SIGNATURE]);
  assert.deepEqual(types(state).slice(-2), ["hang-suspected", "base-red-paused"]);
  assert.equal(count(state, "hang-suspected"), 2, "one for the batch, one for the base");
  assert.equal(count(state, "infra-paused"), 0);
  assert.equal(state.counters.culprits, 0);
  assert.deepEqual(h.writesOf("removeLabel"), []);
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"], "the PRs stay queued");
  assert.deepEqual(h.gh.pulls.get(2).labels, ["omni-queue"]);
});

test("a bare base that fails another check and times out the same job is base-red, no culprit", async () => {
  const h = hangHarness();
  h.world.hangingBases.add(BASE0);
  await startBatch(h, [1, 2]);
  await ciTick(h); // infra retry
  let state = await ciTick(h); // suspected hang → base check
  assert.equal(state.inFlight.kind, "base-check");
  // On the bare base the job times out next to a real test failure: the run is red, not infra,
  // on its first attempt, and the timed-out job still counts as a failure of the base.
  h.world.brokenBases.add(BASE0);
  state = await ciTick(h);
  assert.equal(state.paused.reason, "base-red");
  assert.match(state.paused.detail, /Unit Tests/);
  assert.ok(
    state.baseChecks[0].signatures.some((s) => s.hang && s.check === "Unit Tests"),
    JSON.stringify(state.baseChecks[0].signatures)
  );
  assert.equal(state.counters.culprits, 0);
  assert.equal(state.counters.bisections, 0);
  assert.deepEqual(h.writesOf("removeLabel"), []);
});

test("inside a hang bisection a timed-out half is not retried", async () => {
  const h = hangHarness();
  await greenBase(h); // the tip the queue landed
  h.world.hangs.add(3);
  await startBatch(h, [1, 2, 3, 4]);
  await ciTick(h); // infra retry of the batch
  let state = await ciTick(h); // suspected hang on a green base → hang bisection
  assert.equal(state.inFlight.bisect.hang, true);
  assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
  state = await ciTick(h); // [1, 2] green → lands; [3, 4] next, on the new tip
  assert.deepEqual(nums(state.inFlight.prs), [3, 4]);
  assert.equal(state.inFlight.attempts, 0);
  const pushes = h.world.pushes.length;

  state = await ciTick(h); // [3, 4] times out once: no retry, split at once
  assert.equal(count(state, "infra-retry"), 1, "only the root batch was retried");
  assert.deepEqual(types(state).slice(-4), [
    "checks-red",
    "hang-suspected",
    "bisect-split",
    "batch-started",
  ]);
  assert.deepEqual(nums(state.inFlight.prs), [3]);
  assert.equal(h.world.pushes.length, pushes + 1, "the next half is pushed, not a retry");

  const final = await h.drain();
  assert.equal(count(final, "infra-retry"), 1);
  assert.equal(count(final, "hang-suspected"), 3, "batch, half [3, 4], singleton [3]");
  assert.equal(final.paused, null);
  assert.equal(final.counters.culprits, 1);
  for (const n of [1, 2, 4]) assert.equal(h.gh.pulls.get(n).merged, true, `#${n} landed`);
  assert.equal(h.gh.pulls.get(3).merged, false);
  assert.deepEqual(h.gh.pulls.get(3).labels, []);
  const [comment] = commentsWithKey(h, 3, `culprit:${head12(h.gh.pulls.get(3).headSha)}`);
  // the singleton ran once (no retry inside a hang bisection): the comment says so
  assert.match(comment.body, /the job `Unit Tests \(3\/8\)` timed out once on this PR alone/);
  assert.match(comment.body, /the base passes the same job/);
  const singleton = final.history.filter((e) => e.type === "hang-suspected").at(-1);
  assert.match(singleton.detail, /timed out on 1 run\(s\)/);
});

test("timeout twice on a 1-PR batch with a green base: the PR is dequeued, comment names the job", async () => {
  const h = hangHarness();
  await greenBase(h); // the tip the queue landed: the bare base passes every job
  h.world.hangs.add(1);
  const f = await startBatch(h, [1]);
  await ciTick(h); // infra retry
  const state = await ciTick(h);
  assert.deepEqual(types(state), [
    "batch-started",
    "checks-red",
    "infra-retry",
    "checks-red",
    "hang-suspected",
    "culprit-found",
  ]);
  assert.equal(state.paused, null);
  assert.equal(state.inFlight, null);
  assert.equal(state.counters.culprits, 1);
  assert.deepEqual(
    h.writesOf("removeLabel").map((w) => w.args),
    [[1, "omni-queue"]]
  );
  const [comment] = commentsWithKey(h, 1, `culprit:${head12(f.prs[0].head)}`);
  assert.ok(comment, "culprit comment posted");
  assert.match(comment.body, /Unit Tests \(3\/8\).*timed out twice/s);
  assert.match(
    comment.body,
    /the job `Unit Tests \(3\/8\)` timed out twice on this PR alone; the base passes the same job/
  );
  assert.doesNotMatch(comment.body, /``|`\?`/, "no empty job or test name");
});

test("runner lost twice still pauses with reason infra", async () => {
  const lost = {
    path: ".github",
    title: null,
    message: "The runner has received a shutdown signal.",
    level: "failure",
  };
  const fixtures = {
    "runner lost": [{ name: "Unit Tests (3/8)", conclusion: "cancelled", annotations: [lost] }],
    "startup failure": [
      { name: "Unit Tests (3/8)", conclusion: "startup_failure", annotations: [] },
    ],
    "plain cancel": [{ name: "Unit Tests (3/8)", conclusion: "cancelled", annotations: [] }],
    "a job timeout next to runner loss": [
      { name: "Unit Tests (3/8)", conclusion: "timed_out", annotations: [] },
      { name: "E2E Tests", conclusion: "cancelled", annotations: [lost] },
    ],
  };
  for (const [what, hangRuns] of Object.entries(fixtures)) {
    const h = hangHarness();
    await greenBase(h);
    h.world.hangs.add(1);
    h.world.hangRuns = hangRuns;
    await startBatch(h, [1]);
    let state = await ciTick(h);
    assert.equal(types(state).at(-1), "infra-retry", what);
    state = await ciTick(h);
    assert.equal(state.paused?.reason, "infra", what);
    assert.equal(types(state).at(-1), "infra-paused", what);
    assert.equal(count(state, "hang-suspected"), 0, what);
    assert.equal(state.counters.culprits, 0, what);
    assert.deepEqual(h.writesOf("removeLabel"), [], what);
  }
});

test("a first run that lost its runner and a retry that times out: pause infra, no hang", async () => {
  const lost = {
    path: ".github",
    title: null,
    message: "The runner has received a shutdown signal.",
    level: "failure",
  };
  const firstRuns = {
    "runner lost": [{ name: "Unit Tests (3/8)", conclusion: "cancelled", annotations: [lost] }],
    "startup failure": [
      { name: "Unit Tests (3/8)", conclusion: "startup_failure", annotations: [] },
    ],
  };
  for (const [what, hangRuns] of Object.entries(firstRuns)) {
    const h = hangHarness();
    await greenBase(h);
    h.world.hangs.add(1);
    h.world.hangRuns = hangRuns;
    await startBatch(h, [1]);
    let state = await ciTick(h);
    assert.equal(types(state).at(-1), "infra-retry", what);
    assert.equal(state.inFlight.timedOutRuns, undefined, `${what}: first run not a timeout`);
    h.world.hangRuns = [{ name: "Unit Tests (3/8)", conclusion: "timed_out", annotations: [] }];
    state = await ciTick(h); // only the retry timed out: the job did not time out twice
    assert.equal(state.paused?.reason, "infra", what);
    assert.equal(types(state).at(-1), "infra-paused", what);
    assert.equal(count(state, "hang-suspected"), 0, what);
    assert.equal(state.counters.culprits, 0, what);
    assert.deepEqual(h.writesOf("removeLabel"), [], what);
  }
});

test("an in-flight retry saved before the timed-out run count existed keeps the old behaviour", async () => {
  const h = hangHarness();
  await greenBase(h);
  h.world.hangs.add(1);
  await startBatch(h, [1]);
  await ciTick(h); // the first run timed out: retry, counted
  const { state: saved, version } = await h.store.load(BASE);
  assert.equal(saved.inFlight.timedOutRuns, 1);
  delete saved.inFlight.timedOutRuns; // a document written by the queue before this field
  assert.equal((await h.store.save(BASE, saved, version, "old document")).ok, true);
  const state = await ciTick(h); // the retry times out: the first run is not known to have
  assert.equal(state.paused?.reason, "infra");
  assert.equal(count(state, "hang-suspected"), 0);
  assert.equal(state.counters.culprits, 0);
});

test("an ordinary red batch on a base whose red verdict carries a hang of that job is pr-red", async () => {
  const h = hangHarness();
  // #1 fails a "Unit Tests" shard the ordinary way: no failure annotation, so a keyless failure
  h.world.hangs.add(1);
  h.world.hangRuns = [{ name: "Unit Tests (3/8)", conclusion: "failure", annotations: [] }];
  const f = await startBatch(h, [1, 2]);
  let state = await ciTick(h); // red on a base with no verdict → base check
  assert.equal(state.inFlight.kind, "base-check");
  assert.deepEqual(state.inFlight.pendingRed.signatures, [
    { check: "Gate / CI", key: "", infra: false },
    { check: "Unit Tests", key: "", infra: false },
  ]);
  // the bare base fails another test and times out the same job
  h.world.brokenBases.add(BASE0);
  h.world.hangingBases.add(BASE0);
  h.world.hangRuns = [{ name: "Unit Tests (6/8)", conclusion: "timed_out", annotations: [] }];
  state = await ciTick(h);
  assert.equal(state.baseChecks[0].status, "red");
  assert.ok(state.baseChecks[0].signatures.some((s) => s.hang && s.check === "Unit Tests"));
  assert.equal(state.paused, null, "hang evidence on the base excuses no ordinary failure");
  assert.equal(count(state, "base-red-paused"), 0);
  assert.equal(state.counters.bisections, 1, "the parked batch is pr-red: bisection");
  assert.equal(state.inFlight.bisect.rootBatchId, f.batchId);
  assert.equal(state.inFlight.bisect.hang, false, "an ordinary failure, not a hang bisection");
});

test("the harness classifies with the real module: a base check that timed out is never redone", async () => {
  const h = createHarness({ mode: "live" });
  for (const name of ["classifyRed", "extractSignatures", "hangSignatures", "normalizeCheckName"]) {
    assert.equal(h.deps.modules.classify[name], realClassify[name], `${name} is the real one`);
  }
  const { state: seeded, version } = await h.store.load(BASE);
  seeded.baseChecks = [
    {
      baseSha: BASE0,
      ref: baseCheckRef(BASE, BASE0, 1),
      status: "timeout",
      startedAt: "2026-11-13T10:30:00.000Z",
      signatures: [],
    },
  ];
  assert.equal((await h.store.save(BASE, seeded, version, "seed")).ok, true);
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  assert.equal(count(state, "base-check-started"), 0);
  assert.equal(state.counters.culprits, 1);
  assert.ok(
    h.logs.some((line) => line.includes("b1 red (Gate / CI): pr-red")),
    h.logs.join("\n")
  );
});

test("hangSentence states the real run count and only what the base verdict shows", () => {
  const failures = [
    { name: "Gate / CI", conclusion: "failure" },
    { name: "Unit Tests (3/8)", conclusion: "timed_out" },
  ];
  const hang = [{ check: "Unit Tests", key: "", infra: false, hang: true }];
  const say = (timedOutRuns, baseStatus, f = failures) =>
    hangSentence({ failures: f, hang, timedOutRuns, baseStatus });
  assert.equal(
    say(2, "green"),
    "the job `Unit Tests (3/8)` timed out twice on this PR alone; the base passes the same job"
  );
  assert.equal(
    say(1, "green"),
    "the job `Unit Tests (3/8)` timed out once on this PR alone; the base passes the same job"
  );
  assert.equal(
    say(3, "green"),
    "the job `Unit Tests (3/8)` timed out 3 times on this PR alone; the base passes the same job"
  );
  // no verdict available (evicted, or none recorded): nothing is said about the base
  assert.equal(say(2, undefined), "the job `Unit Tests (3/8)` timed out twice on this PR alone");
  assert.equal(say(2, "pending"), "the job `Unit Tests (3/8)` timed out twice on this PR alone");
  assert.equal(
    say(2, "timeout"),
    "the job `Unit Tests (3/8)` timed out twice on this PR alone; the base check gave no result to compare with"
  );
  assert.match(say(2, "red"), /; the bare base fails other checks, not this job in the same way$/);
  // run count unknown: no number is claimed
  assert.equal(
    say(undefined, "green"),
    "the job `Unit Tests (3/8)` timed out on this PR alone; the base passes the same job"
  );
  // runs not re-read: the check name, never an empty name
  assert.equal(
    say(2, "green", []),
    "the job `Unit Tests` timed out twice on this PR alone; the base passes the same job"
  );
});

test("a base check without a verdict and no retry left records a timeout; the parked batch is bisected", async () => {
  const h = hangHarness();
  h.world.culprits.add(1);
  h.world.culprits.add(2);
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  await h.tick(); // red on a base with no verdict → base check
  let state = await h.state();
  assert.equal(state.inFlight.kind, "base-check");

  h.clock.advance(h.config.checksTimeoutMinutes + 1);
  await h.tick(); // no verdict, a retry left: the base check is retried as today
  state = await h.state();
  assert.deepEqual(types(state).slice(-2), ["checks-timeout", "infra-retry"]);
  const retry = state.inFlight;
  assert.equal(retry.kind, "base-check");
  assert.equal(retry.attempts, 1);
  assert.equal(retry.candidateRef, baseCheckRef(BASE, BASE0, 1));

  h.clock.advance(h.config.checksTimeoutMinutes + 1);
  await h.tick(); // no verdict again, no retry left: a timeout verdict, no pause
  state = await h.state();
  assert.equal(state.paused, null);
  assert.equal(count(state, "infra-paused"), 0);
  assert.deepEqual(state.baseChecks[0], {
    baseSha: BASE0,
    ref: retry.candidateRef,
    status: "timeout",
    startedAt: retry.startedAt,
    signatures: [],
  });
  assert.deepEqual(types(state).slice(-3), ["checks-timeout", "bisect-split", "batch-started"]);
  assert.equal(state.inFlight.kind, "batch");
  assert.equal(state.inFlight.bisect.rootBatchId, "b1");
  assert.deepEqual(nums(state.inFlight.prs), [1]);

  // Red segments on the same base SHA: pr-red at once (the base check cannot be redone).
  const drained = await h.drain();
  assert.equal(count(drained, "base-check-started"), 1, "never redone for BASE0");
  assert.equal(drained.counters.culprits, 2);
  assert.equal(h.gh.branches.get(BASE), BASE0, "nothing landed: the tip is still BASE0");

  // A later red batch on that same base SHA: no base check, classified pr-red.
  h.world.culprits.add(3);
  const later = await startBatch(h, [3]);
  assert.equal(later.baseSha, BASE0);
  h.runCi(later.candidateSha);
  await h.tick();
  state = await h.state();
  assert.equal(count(state, "base-check-started"), 1, "no new base check");
  assert.equal(state.counters.culprits, 3);
  assert.equal(state.paused, null);
  assert.ok(
    h.logs.some((line) => line.includes(`${later.batchId} red (Gate / CI): pr-red`)),
    h.logs.join("\n")
  );
});

test("base moved during the landing: push refused → the same PRs are recomposed on the new tip", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  const MANUAL = fakeSha("manual-merge");
  // Merged by hand between the tick's tip read (equal to the stored base) and the push.
  h.world.baseMovesOnLand = MANUAL;
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

// A candidate is blessed only on the base it was composed on: the stored baseSha comes from the
// state branch, and a commit E that is not the base tip (planted, or rewound away) would otherwise
// get the land status on a candidate that carries E, mergeable by hand as a fast-forward.
for (const landing of ["merge-ff", "squash-api"]) {
  test(`live ${landing}: a stored base that is not the base tip → nothing blessed, recomposed on the real tip`, async () => {
    const h = createHarness({ mode: "live", landing, actor: "owner" });
    // E was never pushed to the base; the candidate honestly merges the approved heads onto it.
    const E = fakeSha("planted-base");
    h.gh.branches.set(BASE, E);
    const f = await startBatch(h, [1, 2]);
    assert.equal(f.baseSha, E);
    h.gh.branches.set(BASE, BASE0);
    h.runCi(f.candidateSha);
    await h.tick();
    const state = await h.state();
    assert.deepEqual(statusCalls(h), [], "no land status written, on the candidate or a PR head");
    assert.deepEqual(h.world.lands, [], "no landing attempted");
    assert.ok(!types(state).includes("land-blessed"));
    const rejected = state.history.find((e) => e.type === "land-rejected");
    assert.equal(
      rejected.detail,
      `base moved: base ${BASE} is at ${BASE0}, expected ${E}; recomposing`
    );
    assert.equal(state.paused, null);
    assert.equal(state.inFlight.baseSha, BASE0, "recomposed on the real tip");
    assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
    assert.notEqual(state.inFlight.candidateSha, f.candidateSha);
  });
}

test("live: a batch stored at the landing stage whose base moved is not blessed again; its success is withdrawn", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]); // a previous tick blessed it and died
  const MANUAL = fakeSha("manual-merge");
  h.gh.branches.set(BASE, MANUAL);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })],
    "not blessed again; the previous tick's success is turned into failure"
  );
  assert.equal(newestLand(h, f.candidateSha), "failure");
  assert.deepEqual(h.world.lands, []);
  assert.match(state.history.find((e) => e.type === "land-rejected").detail, /^base moved/);
  assert.equal(state.inFlight.baseSha, MANUAL);
  assert.equal(state.inFlight.stage, "testing");
  assert.deepEqual(nums(state.inFlight.prs), [1]);
});

test("shadow with a moved base: would-land as before, no land-rejected", async () => {
  const h = createHarness({ mode: "shadow" });
  await greenBatch(h, [1]);
  h.gh.branches.set(BASE, fakeSha("merged-by-another-path"));
  await h.tick();
  const state = await h.state();
  assert.deepEqual(types(state), ["batch-started", "checks-green", "would-land"]);
  assert.equal(
    state.history.at(-1).detail,
    `shadow mode: would merge-ff onto ${head12(BASE0)}`,
    "still judged on the stored base"
  );
  assert.equal(state.paused, null);
  assert.equal(state.inFlight, null);
  assert.deepEqual(statusCalls(h), []);
});

test("live: a base branch that does not exist → paused error, nothing blessed, nothing landed", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  h.gh.branches.delete(BASE);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(statusCalls(h), [], "no commit status written");
  assert.deepEqual(h.world.lands, [], "no landing attempted");
  assert.ok(!types(state).includes("land-blessed"));
  assert.ok(!types(state).includes("land-rejected"), "not recomposed on a base that is gone");
  assert.equal(state.inFlight, null);
  assert.equal(state.paused?.reason, "error");
  assert.equal(state.paused.detail, `base ${BASE} not found: not blessed, not landed`);
  assert.equal(state.paused.baseSha, f.baseSha);
  assert.equal(state.history.at(-1).type, "error");
  assert.equal(state.history.at(-1).detail, state.paused.detail);
});

test("dry-run, live: a moved base is planned as a recomposition, nothing written", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  h.gh.branches.set(BASE, fakeSha("manual-merge"));
  const writes = h.gh.writes.length;
  h.gh.readOnly = true;
  const result = await h.tick({ action: "dry-run" });
  assert.equal(h.gh.writes.length, writes);
  assert.ok(result.decisions.includes("[dry-run] b1: base moved, recomposing #1"));
  assert.ok(!result.decisions.some((d) => d.includes("would land b1")));
  assert.equal((await h.state()).inFlight.candidateSha, f.candidateSha, "nothing saved");
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
  // the squash commit (same tree as the tested candidate) is the green base verdict
  assert.deepEqual(state.baseChecks, [
    {
      baseSha: fakeSha(`squash:${BASE0}`),
      ref: f.candidateRef,
      status: "green",
      startedAt: f.startedAt,
      signatures: [],
    },
  ]);
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

// ───────────── the land status (omni-queue/land) and the owner's landing credential ─────────────

const LAND_TOKEN_MISSING = 'landing needs OMNI_QUEUE_LAND_TOKEN (landing.actor is "owner")';
const checksUrlOf = (sha) => `https://github.com/acme/widgets/commit/${sha}/checks`;
const statusCalls = (h) => h.calls.filter((c) => c.name === "createCommitStatus");
/** createCommitStatus args of the land status; the link is the candidate's checks. */
const landStatus = (batchId, sha, { why = null, candidateSha = sha } = {}) => [
  sha,
  {
    state: why ? "failure" : "success",
    context: "omni-queue/land",
    description: why
      ? `omni-queue ${batchId}: landing withdrawn (${why})`
      : `omni-queue ${batchId}: checks green`,
    targetUrl: checksUrlOf(candidateSha),
  },
];

/** A batch of `prs` in flight with green checks. */
async function greenBatch(h, prs) {
  const f = await startBatch(h, prs);
  h.runCi(f.candidateSha);
  return f;
}

test("live merge-ff: the candidate gets the land status from the App before the owner pushes", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  await h.tick();
  const order = h.calls
    .filter((c) => ["createCommitStatus", "landMergeFf"].includes(c.name))
    .map((c) => c.name);
  assert.deepEqual(order, ["createCommitStatus", "landMergeFf"]);
  const [status] = statusCalls(h);
  assert.equal(status.client, "app", "the land status is the App's");
  assert.deepEqual(status.args, landStatus(f.batchId, f.candidateSha));
  const landCall = h.calls.find((c) => c.name === "landMergeFf");
  assert.notEqual(h.landGit, h.git);
  assert.equal(landCall.args[0].git, h.landGit, "the owner's git pushes, not the App's");
  assert.deepEqual(h.landGh.writes, [], "a merge-ff landing writes nothing with the owner client");
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  const state = await h.state();
  assert.deepEqual(types(state), ["batch-started", "checks-green", "land-blessed", "landed"]);
  const blessed = state.history[2];
  assert.equal(blessed.batchId, f.batchId);
  assert.equal(blessed.sha, f.candidateSha);
  assert.deepEqual(blessed.prs, [1, 2]);
  assert.match(blessed.detail, /omni-queue\/land/);
  assert.match(blessed.detail, /\b1 commit/);
  assert.equal(state.paused, null);
});

test("live squash-api: every PR head is blessed and merged with the owner client", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  await h.tick();
  const statuses = statusCalls(h);
  assert.deepEqual(
    statuses.map((c) => c.client),
    ["app", "app"]
  );
  assert.deepEqual(
    statuses.map((c) => c.args),
    f.prs.map((pr) => landStatus(f.batchId, pr.head, { candidateSha: f.candidateSha }))
  );
  const landCall = h.calls.find((c) => c.name === "landSquashApi");
  assert.ok(h.calls.indexOf(landCall) > h.calls.indexOf(statuses.at(-1)), "blessed first");
  assert.notEqual(h.landGh, h.gh);
  assert.equal(landCall.args[0].gh, h.landGh, "the PRs are merged with the owner's client");
  const state = await h.state();
  assert.deepEqual(types(state), ["batch-started", "checks-green", "land-blessed", "landed"]);
  assert.match(state.history[2].detail, /\b2 commit/);
});

test("landing that does not complete turns the land status into failure", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  h.world.baseMovesOnLand = fakeSha("manual-merge"); // landMergeFf → { ok: false, base-moved }
  await h.tick();
  assert.equal(h.world.lands.length, 1);
  assert.deepEqual(
    statusCalls(h).map((c) => [c.client, ...c.args]),
    [
      ["app", ...landStatus(f.batchId, f.candidateSha)],
      ["app", ...landStatus(f.batchId, f.candidateSha, { why: "base-moved" })],
    ]
  );
  const state = await h.state();
  assert.ok(types(state).includes("land-rejected"));
  assert.notEqual(state.inFlight.candidateSha, f.candidateSha, "recomposed");
});

test("squash-api: a landing that does not complete withdraws the status of every PR head", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  h.world.squashResult = {
    ok: false,
    reason: "tree-divergence",
    merged: [1],
    actualTree: "e".repeat(40),
  };
  const f = await greenBatch(h, [1, 2]);
  await h.tick();
  const failures = statusCalls(h)
    .filter((c) => c.args[1].state === "failure")
    .map((c) => [c.client, c.args[0], c.args[1].context, c.args[1].description]);
  assert.deepEqual(
    failures,
    f.prs.map((pr) => [
      "app",
      pr.head,
      "omni-queue/land",
      `omni-queue ${f.batchId}: landing withdrawn (tree-divergence)`,
    ]),
    "no head of the abandoned batch stays blessed (one could be merged by hand)"
  );
  assert.equal((await h.state()).paused.reason, "tree-divergence");
});

test("shadow and dry-run never write the land status", async () => {
  // shadow: the production configuration after this change (actor owner, no land token)
  const shadow = createHarness({ mode: "shadow", actor: "owner", landToken: false });
  await greenBatch(shadow, [1]);
  await shadow.tick();
  let state = await shadow.state();
  assert.deepEqual(statusCalls(shadow), []);
  assert.deepEqual(shadow.world.lands, []);
  assert.ok(types(state).includes("would-land"));
  assert.ok(!types(state).includes("land-blessed"));
  assert.equal(state.paused, null, "shadow needs no land token");

  for (const landToken of [true, false]) {
    const h = createHarness({ mode: "live", actor: "owner", landToken });
    const f = await greenBatch(h, [1]);
    h.gh.readOnly = true;
    const result = await h.tick({ action: "dry-run" });
    assert.deepEqual(statusCalls(h), [], `landToken ${landToken}`);
    assert.deepEqual(h.world.lands, []);
    assert.ok(
      result.decisions.some((d) => d.includes(`would land b1 (${head12(f.candidateSha)})`))
    );
    state = await h.state();
    assert.equal(state.paused, null, "a dry-run pauses nothing");
  }
});

test("live with actor owner and no OMNI_QUEUE_LAND_TOKEN: paused (error) naming the land token", async () => {
  const h = createHarness({ mode: "live", actor: "owner", landToken: false });
  const f = await greenBatch(h, [1, 2]);
  await h.tick();
  let state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.equal(state.paused.detail, LAND_TOKEN_MISSING);
  assert.equal(state.paused.baseSha, f.baseSha);
  assert.equal(state.history.at(-1).type, "error");
  assert.equal(state.history.at(-1).detail, LAND_TOKEN_MISSING);
  assert.deepEqual(statusCalls(h), [], "nothing is blessed that cannot be landed");
  assert.deepEqual(h.world.lands, []);
  assert.equal(h.gh.branches.get(BASE), BASE0);

  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "error", "stays paused until a resume");
  assert.deepEqual(statusCalls(h), []);
  assert.deepEqual(h.world.lands, []);
});

test("auth failure of the landing push pauses once and does not bless again on the next tick", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  // What landMergeFf throws when the owner's token is expired or revoked: git gives no verdict.
  h.world.landError = new Error(
    "landMergeFf: push gave no verdict: remote: Invalid username or token. Password " +
      "authentication is not supported for Git operations. | fatal: Authentication failed for " +
      "'https://github.com/acme/widgets.git/'"
  );
  await h.tick();
  let state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /Authentication failed/);
  assert.match(state.paused.detail, /OMNI_QUEUE_LAND_TOKEN/);
  assert.equal(state.inFlight, null);
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [
      landStatus(f.batchId, f.candidateSha),
      landStatus(f.batchId, f.candidateSha, { why: "auth-failed" }),
    ]
  );
  const errors = () => state.history.filter((e) => e.type === "error");
  assert.equal(errors().length, 1);

  for (let i = 0; i < 3; i++) {
    h.clock.advance(10);
    await h.tick();
  }
  state = await h.state();
  assert.equal(statusCalls(h).length, 2, "not blessed again");
  assert.equal(h.calls.filter((c) => c.name === "landMergeFf").length, 1, "not pushed again");
  assert.equal(errors().length, 1, "paused once");
  assert.equal(state.paused.reason, "error");
});

test("squash-api: a 401 of the owner's client pauses naming the land token", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  const f = await greenBatch(h, [1]);
  h.world.landError = Object.assign(
    new Error("GET /repos/acme/widgets/git/ref/heads/release%2Fv9.9.9 → 401: Bad credentials"),
    { name: "GitHubError", status: 401 }
  );
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /OMNI_QUEUE_LAND_TOKEN/);
  assert.deepEqual(
    statusCalls(h).map((c) => [c.args[0], c.args[1].state]),
    [
      [f.prs[0].head, "success"],
      [f.prs[0].head, "failure"],
    ]
  );
});

test("a landing that throws for another reason withdraws the status, fails the tick, then retries", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  h.world.landError = new Error("land: commit 0123 is not available from origin");
  await assert.rejects(h.tick(), /not available from origin/);
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [landStatus(f.batchId, f.candidateSha), landStatus(f.batchId, f.candidateSha, { why: "error" })]
  );
  assert.equal((await h.state()).paused, null, "an unknown outcome is re-observed, not paused");

  h.world.landError = null;
  await h.tick();
  const state = await h.state();
  assert.equal(h.gh.branches.get(BASE), f.candidateSha, "the next tick landed it");
  assert.deepEqual(statusCalls(h).at(-1).args, landStatus(f.batchId, f.candidateSha));
  assert.ok(types(state).includes("landed"));
});

/**
 * One tick (`options` as for h.tick) whose landing throws, recorded the way main() records it:
 * the tick fails with an error matching `pattern`, then an `error` event carrying its message is
 * appended to the stored state.
 */
async function failingTick(h, pattern, options = {}) {
  let thrown = null;
  await assert.rejects(h.tick(options), (error) => {
    thrown = error;
    return pattern.test(error.message);
  });
  const { state, version } = await h.store.load(BASE);
  const detail = thrown.message.slice(0, 500);
  const recorded = appendEvent(state, { at: h.clock.now(), type: "error", detail });
  assert.equal((await h.store.save(BASE, recorded, version, "main records the error")).ok, true);
  h.clock.advance(10);
}

/** Land status states the queue wrote, in order ("success" = blessed, "failure" = withdrawn). */
const statusStates = (h) => statusCalls(h).map((c) => c.args[1].state);
const landCalls = (h) =>
  h.calls.filter((c) => c.name === "landMergeFf" || c.name === "landSquashApi");
const notAvailable = (attempt) =>
  new Error(`land: attempt ${attempt} is not available from origin`);
const landPairs = (n) => Array.from({ length: n }, () => ["success", "failure"]).flat();

for (const landing of ["merge-ff", "squash-api"]) {
  test(`a landing that throws every tick pauses after 3 attempts (${landing})`, async () => {
    assert.equal(LANDING_ATTEMPTS_LIMIT, 3);
    const h = createHarness({ mode: "live", landing, actor: "owner" });
    const f = await greenBatch(h, [1]);
    const sha = landing === "merge-ff" ? f.candidateSha : f.prs[0].head;
    for (let attempt = 1; attempt <= 3; attempt++) {
      h.world.landError = notAvailable(attempt);
      await failingTick(h, /not available from origin/);
      const state = await h.state();
      assert.equal(state.paused, null, `attempt ${attempt}: an unknown outcome is retried`);
      assert.equal(state.inFlight.stage, "landing");
      assert.equal(state.inFlight.landAttempts, attempt, "counted and saved before the blessing");
    }
    assert.deepEqual(statusStates(h), landPairs(3), "3 success/failure pairs");
    assert.equal(landCalls(h).length, 3);

    await h.tick(); // the 4th attempt: paused without blessing or landing
    let state = await h.state();
    assert.deepEqual(statusStates(h), landPairs(3), "then none");
    assert.equal(landCalls(h).length, 3, "not landed again");
    assert.equal(state.paused.reason, "error");
    assert.equal(
      state.paused.detail,
      `landing of ${f.batchId} ended without a verdict 3 times in a row (last error: ` +
        "land: attempt 3 is not available from origin); not blessed again"
    );
    assert.equal(state.history.at(-1).type, "error");
    assert.equal(state.history.at(-1).detail, state.paused.detail);
    assert.equal(state.inFlight, null);
    assert.equal(newestLand(h, sha), "failure", "nothing is left blessed");

    h.clock.advance(10);
    await h.tick();
    state = await h.state();
    assert.equal(state.paused.reason, "error", "stays paused until a resume");
    assert.deepEqual(statusStates(h), landPairs(3));
  });
}

test("a throw followed by a successful landing never pauses", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  for (let attempt = 1; attempt <= 2; attempt++) {
    h.world.landError = notAvailable(attempt);
    await failingTick(h, /not available from origin/);
  }
  assert.equal((await h.state()).inFlight.landAttempts, 2);
  h.world.landError = null;
  await h.tick(); // the 3rd attempt lands
  let state = await h.state();
  assert.equal(state.paused, null);
  assert.equal(state.inFlight, null);
  assert.ok(types(state).includes("landed"));
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  assert.deepEqual(statusStates(h), [...landPairs(2), "success"]);
  assert.equal(newestLand(h, f.candidateSha), "success", "a landed candidate keeps its status");

  // The next batch starts its own count.
  const next = await greenBatch(h, [2]);
  h.world.landError = notAvailable(1);
  await failingTick(h, /not available from origin/);
  state = await h.state();
  assert.equal(state.inFlight.batchId, next.batchId);
  assert.equal(state.inFlight.landAttempts, 1);
  assert.equal(state.paused, null);
});

test("a manual pause and resume resets the counter", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  for (let attempt = 1; attempt <= 2; attempt++) {
    h.world.landError = notAvailable(attempt);
    await failingTick(h, /not available from origin/);
  }
  await h.tick({ action: "pause", reason: "incident" });
  let state = await h.state();
  assert.equal(state.inFlight.stage, "testing");
  assert.equal("landAttempts" in state.inFlight, false, "the count leaves the landing stage too");
  assert.equal(newestLand(h, f.candidateSha), "failure");

  // The resume lands again (attempt 1 of a new count), and the limit allows 3 attempts again.
  h.world.landError = notAvailable(3);
  await failingTick(h, /not available from origin/, { action: "resume" });
  state = await h.state();
  assert.equal(state.paused, null, "the resume was saved with the landing marker");
  assert.equal(state.inFlight.landAttempts, 1);
  for (let attempt = 4; attempt <= 5; attempt++) {
    h.world.landError = notAvailable(attempt);
    await failingTick(h, /not available from origin/);
    assert.equal((await h.state()).paused, null);
  }
  assert.equal((await h.state()).inFlight.landAttempts, 3);
  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /ended without a verdict 3 times in a row/);
  assert.deepEqual(statusStates(h), landPairs(5), "2 attempts, then 3 after the resume");
});

test("a state without landAttempts loads and counts from 1", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  // Written by a tick of the code before the count: stage "landing", no landAttempts.
  await diedAfterBlessing(h, f, [f.candidateSha]);
  assert.equal("landAttempts" in (await h.state()).inFlight, false);
  for (const attempt of [2, 3]) {
    h.world.landError = notAvailable(attempt);
    await failingTick(h, /not available from origin/);
    assert.equal((await h.state()).inFlight.landAttempts, attempt, "the stored attempt was 1");
  }
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /ended without a verdict 3 times in a row/);
  assert.match(state.paused.detail, /attempt 3 is not available from origin/);
  assert.deepEqual(statusStates(h), landPairs(2));
  assert.equal(newestLand(h, f.candidateSha), "failure");
});

test("a lost save of the counter throws before blessing", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await greenBatch(h, [1]);
  h.world.landError = notAvailable(1);
  await failingTick(h, /not available from origin/);
  const written = statusCalls(h).length;
  loseNextSave(h); // the first save of the next tick is the count of its attempt
  await assert.rejects(h.tick(), StateConflictError);
  assert.equal(statusCalls(h).length, written, "nothing blessed");
  assert.equal(landCalls(h).length, 1, "nothing landed");
  assert.equal((await h.state()).inFlight.landAttempts, 1);
  h.world.landError = notAvailable(2);
  await failingTick(h, /not available from origin/); // the redo counts it
  assert.equal((await h.state()).inFlight.landAttempts, 2);
});

test("a rate-limit 403 is retried, not paused as an auth failure", async () => {
  for (const message of [
    "API rate limit exceeded for installation ID 123.",
    "You have exceeded a secondary rate limit. Please wait a few minutes before you try again.",
  ]) {
    const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
    const f = await greenBatch(h, [1]);
    h.world.landError = Object.assign(
      new Error(`PUT /repos/acme/widgets/pulls/1/merge → 403: ${message}`),
      { name: "GitHubError", status: 403 }
    );
    await failingTick(h, /rate limit/);
    let state = await h.state();
    assert.equal(state.paused, null, message);
    assert.equal(state.inFlight.landAttempts, 1);
    assert.deepEqual(
      statusCalls(h).map((c) => c.args),
      [
        landStatus(f.batchId, f.prs[0].head, { candidateSha: f.candidateSha }),
        landStatus(f.batchId, f.prs[0].head, { why: "error", candidateSha: f.candidateSha }),
      ]
    );
    h.world.landError = null;
    await h.tick();
    state = await h.state();
    assert.ok(types(state).includes("landed"), "the next tick lands it");
    assert.equal(state.paused, null);
  }

  // A 403 without that text is still the credential.
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  await greenBatch(h, [1]);
  h.world.landError = Object.assign(
    new Error(
      "PUT /repos/acme/widgets/pulls/1/merge → 403: Resource not accessible by integration"
    ),
    { name: "GitHubError", status: 403 }
  );
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.match(state.paused.detail, /OMNI_QUEUE_LAND_TOKEN/);
});

test("squash-api: a per-PR merge refused by a rate-limit 403 pauses without the land-token hint; a refused credential gets it", async () => {
  const LAND_TOKEN_HINT = '(check OMNI_QUEUE_LAND_TOKEN: landing.actor is "owner")';
  // What landSquashApi returns when mergePull throws a GitHubError: status 0, the error message.
  const merge403 = (message) => `#1: 0 PUT /repos/acme/widgets/pulls/1/merge → 403: ${message}`;
  for (const [message, hinted] of [
    ["API rate limit exceeded for installation ID 123.", false],
    ["You have exceeded a secondary rate limit. Please wait a few minutes.", false],
    ["Resource not accessible by personal access token", true],
  ]) {
    const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
    await greenBatch(h, [1]);
    h.world.squashResult = {
      ok: false,
      reason: "merge-failed",
      merged: [],
      detail: merge403(message),
    };
    await h.tick();
    const state = await h.state();
    assert.equal(state.paused.reason, "error", message);
    assert.ok(state.paused.detail.includes(message), message);
    assert.equal(state.paused.detail.includes(LAND_TOKEN_HINT), hinted, message);
  }
});

test("squash-api: a blessing that fails partway is withdrawn from the heads already blessed", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  const [head1, head2] = f.prs.map((pr) => pr.head);
  const refused = Object.assign(
    new Error(`POST /repos/acme/widgets/statuses/${head2} → 502: Bad Gateway`),
    { name: "GitHubError", status: 502 }
  );
  // GitHub refuses the success status of the second head (after the client's own retries).
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[0] === head2 && args[1].state === "success"
      ? refused
      : null;
  await assert.rejects(h.tick(), (error) => error === refused, "the original error surfaces");

  const written = statusCalls(h).map((c) => [c.args[0], c.args[1].state, c.args[1].description]);
  assert.deepEqual(written, [
    [head1, "success", `omni-queue ${f.batchId}: checks green`],
    [head1, "failure", `omni-queue ${f.batchId}: landing withdrawn (error)`],
    [head2, "failure", `omni-queue ${f.batchId}: landing withdrawn (error)`],
  ]);
  for (const head of [head1, head2]) {
    const last = written.filter(([sha]) => sha === head).at(-1);
    assert.equal(last[1], "failure", `${head12(head)} is not left blessed`);
  }
  assert.deepEqual(h.world.lands, [], "nothing landed");
  const state = await h.state();
  assert.equal(state.paused, null, "an unknown failure is retried, not paused");
  assert.equal(state.inFlight.candidateSha, f.candidateSha);
});

/** Newest land status (state) GitHub lists on `sha`, or null. */
const newestLand = (h, sha) =>
  (h.gh.statuses.get(sha) ?? []).find((st) => st.context === "omni-queue/land")?.state ?? null;

/**
 * The stored state of a tick that blessed `f` and died before its final save: the in-flight
 * stage says "landing" (stored before the blessing), no land-blessed event, and GitHub lists the
 * land status in success on its commits.
 */
async function diedAfterBlessing(h, f, shas) {
  const { state, version } = await h.store.load(BASE);
  assert.equal(state.inFlight.batchId, f.batchId);
  state.inFlight = { ...state.inFlight, stage: "landing" };
  assert.equal((await h.store.save(BASE, state, version, "tick died after blessing")).ok, true);
  for (const sha of shas) {
    h.gh.statuses.set(sha, [
      {
        context: "omni-queue/land",
        state: "success",
        description: "checks green",
        creator: APP_BOT,
      },
      ...(h.gh.statuses.get(sha) ?? []),
    ]);
  }
}

test("the landing stage is stored before the App blesses, and cleared by the landing", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  let stageAtBless = null;
  h.gh.writeError = (method) => {
    if (method === "createCommitStatus" && stageAtBless === null) {
      const text = h.gh.contents.get(`omni-queue-state:${stateFilePath(BASE)}`)?.content;
      stageAtBless = JSON.parse(text).inFlight?.stage ?? null;
    }
    return null;
  };
  await h.tick();
  assert.equal(stageAtBless, "landing", "a tick that dies after the blessing leaves the marker");
  const state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal(state.inFlight, null);
  assert.equal(newestLand(h, f.candidateSha), "success", "a landed candidate keeps its status");
});

for (const landing of ["merge-ff", "squash-api"]) {
  test(`${landing}: a tick that died after blessing; the next one recomposes and withdraws the status`, async () => {
    const h = createHarness({ mode: "live", landing, actor: "owner" });
    const f = await greenBatch(h, [1, 2]);
    const shas = landing === "merge-ff" ? [f.candidateSha] : f.prs.map((pr) => pr.head);
    await diedAfterBlessing(h, f, shas);
    h.gh.pulls.get(2).labels = []; // the batch changed before landing: #2 is dropped
    await h.tick();
    const state = await h.state();
    assert.ok(types(state).includes("land-rejected"));
    assert.notEqual(state.inFlight?.candidateSha, f.candidateSha, "recomposed");
    assert.deepEqual(h.world.lands, [], "nothing landed");
    for (const sha of shas) {
      assert.equal(newestLand(h, sha), "failure", `${head12(sha)} is not left blessed`);
    }
  });
}

test("a manual pause withdraws the status of a batch at the landing stage", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  await h.tick({ action: "pause", reason: "incident" });
  const state = await h.state();
  assert.equal(newestLand(h, f.candidateSha), "failure");
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "the batch stays in flight");
  assert.equal(state.inFlight.stage, "testing", "and is blessed again only when it lands");
  await h.tick({ action: "resume" });
  assert.ok(types(await h.state()).includes("landed"));
  assert.equal(newestLand(h, f.candidateSha), "success");
});

test("a culprit dequeued from a batch at the landing stage leaves no blessed commit", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await greenBase(h);
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  h.runCi(f.candidateSha); // a re-run turned the candidate red
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("culprit-found"));
  assert.equal(newestLand(h, f.candidateSha), "failure");
});

test("a batch never at the landing stage gets no status write when it is dropped", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await greenBatch(h, [1, 2]);
  h.gh.pulls.get(2).labels = [];
  await h.tick();
  assert.ok(types(await h.state()).includes("land-rejected"));
  assert.deepEqual(statusCalls(h), []);
});

test("squash-api partial landing whose first withdrawal fails: the other heads are withdrawn and the queue pauses", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  h.world.squashResult = { ok: false, reason: "merge-failed", merged: [1], detail: "#2: 409" };
  const f = await greenBatch(h, [1, 2, 3]);
  const [head1, head2, head3] = f.prs.map((pr) => pr.head);
  let refusals = 0;
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" &&
    args[0] === head1 &&
    args[1].state === "failure" &&
    !refusals++
      ? Object.assign(new Error("POST statuses → 502: Bad Gateway"), { status: 502 })
      : null;
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused?.reason, "error", "the pause is still set");
  assert.match(state.paused.detail, /merge-failed/);
  for (const head of [head2, head3]) {
    assert.equal(newestLand(h, head), "failure", `unmerged ${head12(head)} ends failure`);
  }
  const withdrawal = state.history.find(
    (e) => e.type === "error" && /could not withdraw/.test(e.detail ?? "")
  );
  assert.ok(withdrawal, "the failed withdrawal is recorded");
  assert.match(withdrawal.detail, new RegExp(head12(head1)));
  assert.ok(
    h.logs.some((line) => /could not withdraw/.test(line)),
    "and noted"
  );
  // the abandoned batch is re-read at the end of the tick: the refused head is written again
  assert.equal(newestLand(h, head1), "failure");
});

test("a candidate a previous tick already landed is recorded without a new blessing", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  h.gh.branches.set(BASE, f.candidateSha); // landed, then the state save was lost
  await h.tick();
  assert.deepEqual(statusCalls(h), []);
  assert.deepEqual(h.world.lands, []);
  const state = await h.state();
  assert.ok(types(state).includes("landed"));
  // the tip that lost its state save still gets its green verdict
  assert.deepEqual(
    state.baseChecks.map((b) => [b.baseSha, b.status]),
    [[f.candidateSha, "green"]]
  );
});

// ───────────── a held batch, and withdrawals GitHub refused (state.landWithdrawals) ─────────────

/**
 * A re-run of "Gate / CI" on `sha`, in the check suite of the candidate's own push run:
 * `status` "in_progress" turns the verdict back to pending, "completed" green again.
 */
function rerunGate(h, sha, status) {
  h.clock.advance(1);
  const runs = h.gh.checkRuns.get(sha);
  const at = h.clock.now();
  runs.push({
    id: h.world.runSeq++,
    name: "Gate / CI",
    status,
    conclusion: status === "completed" ? "success" : null,
    startedAt: at,
    completedAt: status === "completed" ? at : null,
    htmlUrl: null,
    appSlug: "github-actions",
    output: { title: null, summary: null, text: null },
    checkSuiteId: runs.at(-1).checkSuiteId,
  });
  h.clock.advance(1);
}

/** GitHub lists a newer `omni-queue/land` status in `state` on `sha`, created by `creator`. */
function setLand(h, sha, state, creator = APP_BOT) {
  h.gh.statuses.set(sha, [
    { context: "omni-queue/land", state, description: `set ${state}`, creator },
    ...(h.gh.statuses.get(sha) ?? []),
  ]);
}

/** A stored withdrawal of `sha` (a `failure` write GitHub refused in an earlier tick). */
const storedWithdrawal = (sha, extra = {}) => ({
  sha,
  batchId: "b7",
  candidateSha: sha,
  why: "batch abandoned",
  since: "2026-11-13T11:30:00.000Z",
  attempts: 1,
  ...extra,
});

async function storeWithdrawals(h, landWithdrawals) {
  const { state, version } = await h.store.load(BASE);
  state.landWithdrawals = landWithdrawals;
  assert.equal((await h.store.save(BASE, state, version, "seed: withdrawals")).ok, true);
}

const refusedStatus = () =>
  Object.assign(new Error("POST /repos/acme/widgets/statuses → 502: Bad Gateway"), { status: 502 });
/** GitHub refuses every `failure` land status written on a SHA `refuse(sha)` names. */
function refuseWithdrawals(h, refuse) {
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure" && refuse(args[0])
      ? refusedStatus()
      : null;
}
const landStatusReads = (h, sha) =>
  h.gh.reads.filter((r) => r.method === "listCommitStatuses" && r.args[0] === sha).length;
const couldNotWithdraw = (state) =>
  state.history.filter((e) => e.type === "error" && /could not withdraw/.test(e.detail ?? ""));

test("a landing-stage batch whose checks went back to pending is withdrawn and re-blessed when green", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  rerunGate(h, f.candidateSha, "in_progress");
  await h.tick();
  let state = await h.state();
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "the batch stays in flight");
  assert.equal(state.inFlight.stage, "testing");
  assert.equal("landAttempts" in state.inFlight, false);
  assert.deepEqual(h.world.lands, []);
  assert.equal(newestLand(h, f.candidateSha), "failure", "not blessed while its checks run");
  assert.deepEqual(statusStates(h), ["failure"]);

  rerunGate(h, f.candidateSha, "completed");
  await h.tick();
  state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  assert.deepEqual(statusStates(h), ["failure", "success"], "blessed again right before landing");
  assert.equal(newestLand(h, f.candidateSha), "success");
  const marker = h
    .writesOf("putFileContent")
    .map((w) => w.args[1].message)
    .filter((message) => message.startsWith(`omni-queue: landing ${f.batchId} `));
  assert.deepEqual(
    marker,
    [`omni-queue: landing ${f.batchId} on ${BASE}`],
    "the landing stage is stored again before the blessing, as attempt 1: a hold resets the count"
  );
});

test("held for several ticks: the status is read once, not every tick", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  h.gh.issues.push(freezeIssue());
  const perTick = [];
  for (let i = 0; i < 4; i++) {
    const before = landStatusReads(h, f.candidateSha);
    h.clock.advance(10);
    await h.tick();
    perTick.push(landStatusReads(h, f.candidateSha) - before);
  }
  // Every tick reads the candidate's statuses once for its checks; only the first held tick, the
  // one that finds the batch stored at the landing stage, reads its land status on top of that.
  assert.deepEqual(perTick, [2, 1, 1, 1]);
  assert.deepEqual(statusStates(h), ["failure"], "withdrawn once");
  const state = await h.state();
  assert.equal(state.inFlight.stage, "testing");
  assert.deepEqual(h.world.lands, []);
});

test("a withdrawal refused twice in one tick is stored and retried by the next tick", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1, 2]);
  h.world.baseMovesOnLand = fakeSha("manual-merge"); // landMergeFf → { ok: false, base-moved }
  let refusing = true;
  refuseWithdrawals(h, () => refusing);
  const tickAt = h.clock.now();
  await h.tick();
  let state = await h.state();
  assert.notEqual(state.inFlight.candidateSha, f.candidateSha, "recomposed");
  assert.equal(newestLand(h, f.candidateSha), "success", "both withdrawals were refused");
  assert.equal(couldNotWithdraw(state).length, 2, "the path and the end-of-tick pass");
  assert.deepEqual(state.landWithdrawals, [
    {
      sha: f.candidateSha,
      batchId: f.batchId,
      candidateSha: f.candidateSha,
      why: "batch abandoned",
      since: tickAt,
      attempts: 2,
    },
  ]);

  refusing = false;
  h.clock.advance(10);
  const written = statusCalls(h).length;
  await h.tick();
  state = await h.state();
  assert.equal(newestLand(h, f.candidateSha), "failure", "success → failure");
  assert.deepEqual(
    statusCalls(h)
      .slice(written)
      .map((c) => c.args),
    [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })]
  );
  assert.equal("landWithdrawals" in state, false, "the marker is gone");
  assert.equal(couldNotWithdraw(state).length, 2, "a successful retry is a note, not an event");
  assert.ok(h.logs.some((line) => line.includes(`withdrawn on ${head12(f.candidateSha)}`)));
});

test("a stored withdrawal for a SHA whose newest App status is not success is dropped without a write", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const [withdrawn, superseded, bare, foreign] = ["withdrawn", "superseded", "bare", "foreign"].map(
    fakeSha
  );
  setLand(h, withdrawn, "success");
  setLand(h, withdrawn, "failure"); // withdrawn since by the App (a bless, a later tick)
  setLand(h, superseded, "success");
  setLand(h, superseded, "pending"); // a later status of the App
  setLand(h, foreign, "success", "collaborator"); // never the App's: the ruleset ignores it
  const shas = [withdrawn, superseded, bare, foreign];
  await storeWithdrawals(
    h,
    shas.map((sha) => storedWithdrawal(sha))
  );
  await h.tick();
  assert.deepEqual(statusCalls(h), [], "nothing to withdraw");
  for (const sha of shas) assert.equal(landStatusReads(h, sha), 1);
  const state = await h.state();
  assert.equal("landWithdrawals" in state, false, "every entry is dropped");
  assert.deepEqual(types(state), [], "dropping one records no event");
});

/** Newest land status (state) the queue's App created on `sha`, or null. */
const newestAppLand = (h, sha) =>
  (h.gh.statuses.get(sha) ?? []).find(
    (st) => st.context === "omni-queue/land" && st.creator === APP_BOT
  )?.state ?? null;

test("a later status by another user does not hide the App's success: a stored withdrawal writes failure, kept until it succeeds", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const sha = fakeSha("stranded");
  setLand(h, sha, "success"); // the App's blessing, stranded
  setLand(h, sha, "pending", "collaborator"); // posted later by a collaborator
  await storeWithdrawals(h, [storedWithdrawal(sha)]);
  refuseWithdrawals(h, () => true);
  await h.tick();
  let state = await h.state();
  assert.deepEqual(statusCalls(h), [], "the write was refused");
  assert.deepEqual(state.landWithdrawals, [storedWithdrawal(sha, { attempts: 2 })], "kept");

  h.gh.writeError = null;
  h.clock.advance(10);
  await h.tick();
  state = await h.state();
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [landStatus("b7", sha, { why: "batch abandoned" })]
  );
  assert.equal(newestAppLand(h, sha), "failure", "the App's status no longer lets it in");
  assert.equal("landWithdrawals" in state, false, "dropped once the write succeeded");
});

test("a later status by another user does not hide the App's success from an abandoned landing-stage batch", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  setLand(h, f.candidateSha, "pending", "collaborator");
  await h.tick({ action: "pause", reason: "incident" });
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })]
  );
  assert.equal(newestAppLand(h, f.candidateSha), "failure");
});

test("a success by another user only is not the queue's to withdraw", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  const { state: stored, version } = await h.store.load(BASE);
  stored.inFlight = { ...stored.inFlight, stage: "landing" };
  assert.equal((await h.store.save(BASE, stored, version, "seed: landing")).ok, true);
  setLand(h, f.candidateSha, "success", "collaborator");
  await h.tick({ action: "pause", reason: "incident" });
  assert.deepEqual(statusCalls(h), [], "no App status, nothing to withdraw");
  assert.equal(landStatusReads(h, f.candidateSha), 1);
});

/** A land status in `state` on `sha` with no readable creator (`creator: null`, or no field). */
function setLandUnknown(h, sha, state, { field = true } = {}) {
  const status = { context: "omni-queue/land", state, description: `set ${state}` };
  if (field) status.creator = null;
  h.gh.statuses.set(sha, [status, ...(h.gh.statuses.get(sha) ?? [])]);
}

test("a success of unknown origin counts as the App's: an abandoned landing-stage batch writes failure", async () => {
  for (const field of [true, false]) {
    const h = createHarness({ mode: "live", actor: "owner" });
    const f = await greenBatch(h, [1]);
    const { state: stored, version } = await h.store.load(BASE);
    stored.inFlight = { ...stored.inFlight, stage: "landing" };
    assert.equal((await h.store.save(BASE, stored, version, "seed: landing")).ok, true);
    setLandUnknown(h, f.candidateSha, "success", { field });
    setLand(h, f.candidateSha, "pending", "collaborator"); // readable, not the App's: ignored
    await h.tick({ action: "pause", reason: "incident" });
    assert.deepEqual(
      statusCalls(h).map((c) => c.args),
      [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })],
      `creator ${field ? "null" : "absent"}: a withdrawal only ever writes failure`
    );
  }
});

test("a stored withdrawal of a success of unknown origin writes failure, kept until the write succeeds", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const [unknown, absent, foreign, appAfter] = ["unknown", "absent", "foreign", "app-after"].map(
    fakeSha
  );
  setLandUnknown(h, unknown, "success");
  setLandUnknown(h, absent, "success", { field: false });
  setLand(h, foreign, "success", "collaborator"); // a readable creator, not the App: ignored
  setLandUnknown(h, appAfter, "success");
  setLand(h, appAfter, "failure"); // the App's newer failure is the newest that counts
  const shas = [unknown, absent, foreign, appAfter];
  await storeWithdrawals(
    h,
    shas.map((sha) => storedWithdrawal(sha))
  );
  refuseWithdrawals(h, () => true);
  await h.tick();
  let state = await h.state();
  assert.deepEqual(statusCalls(h), [], "both writes were refused");
  assert.deepEqual(
    state.landWithdrawals,
    [storedWithdrawal(unknown, { attempts: 2 }), storedWithdrawal(absent, { attempts: 2 })],
    "the unknown successes are kept; the foreign one and the withdrawn one are dropped"
  );

  h.gh.writeError = null;
  h.clock.advance(10);
  await h.tick();
  state = await h.state();
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [
      landStatus("b7", unknown, { why: "batch abandoned" }),
      landStatus("b7", absent, { why: "batch abandoned" }),
    ]
  );
  assert.equal(newestAppLand(h, unknown), "failure");
  assert.equal("landWithdrawals" in state, false, "dropped once the writes succeeded");
});

test("dry-run in shadow on a batch stored at the landing stage writes nothing and changes no state", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  h.config.mode = "shadow";
  const statePath = `omni-queue-state:${stateFilePath(BASE)}`;
  const before = h.gh.contents.get(statePath)?.content;
  const stateTip = h.gh.branches.get(STATE_BRANCH);
  const writes = h.gh.writes.length;
  h.gh.readOnly = true;
  const result = await h.tick({ action: "dry-run" });
  assert.ok(
    result.decisions.includes(
      `[dry-run] ${f.batchId}: held at the landing stage, back to testing (its land status would go)`
    ),
    "the plan says the status would go, not that it goes"
  );
  assert.equal(h.gh.writes.length, writes, "no GitHub write attempted");
  assert.deepEqual(statusCalls(h), [], "the land status is not withdrawn by a dry-run");
  assert.equal(newestLand(h, f.candidateSha), "success");
  assert.deepEqual(h.world.lands, []);
  assert.equal(h.gh.branches.get(STATE_BRANCH), stateTip, "state not saved");
  assert.equal(h.gh.contents.get(statePath)?.content, before, "the stored state is unchanged");
  const state = await h.state();
  assert.equal(state.inFlight.stage, "landing");
  assert.equal(state.inFlight.candidateSha, f.candidateSha);
});

test("a state without landWithdrawals loads", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await greenBatch(h, [1]);
  const stored = await h.state();
  assert.equal("landWithdrawals" in stored, false, "a document of the code before the field");
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal("landWithdrawals" in state, false, "nothing refused, nothing stored");
});

test("stored withdrawals are retried on a paused queue; a refusal and an unreadable status each count an attempt", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await h.tick({ action: "pause", reason: "incident" });
  const [ok, refused, unreadable] = ["ok", "refused", "unreadable"].map(fakeSha);
  for (const sha of [ok, refused, unreadable]) setLand(h, sha, "success");
  const entries = [ok, refused, unreadable].map((sha) => storedWithdrawal(sha, { attempts: 3 }));
  await storeWithdrawals(h, entries);
  refuseWithdrawals(h, (sha) => sha === refused);
  const list = h.gh.listCommitStatuses;
  h.gh.listCommitStatuses = async (sha) => {
    if (sha === unreadable) throw new Error("GET statuses → 500: Server Error");
    return list(sha);
  };
  h.clock.advance(10);
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "manual", "still paused");
  assert.equal(newestLand(h, ok), "failure", "a pause keeps no stray success alive");
  assert.equal(newestLand(h, refused), "success");
  assert.deepEqual(state.landWithdrawals, [
    { ...entries[1], attempts: 4 },
    { ...entries[2], attempts: 4 }, // a failed read is an attempt too; nothing else changes
  ]);
  assert.equal(couldNotWithdraw(state).length, 0, "a failed retry is not logged again");
  assert.ok(h.logs.some((line) => line.includes(`land status of ${head12(unreadable)}`)));
});

test("a stored withdrawal whose land status cannot be read stays stored, one attempt per tick, nothing written", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await h.tick({ action: "pause", reason: "incident" });
  const sha = fakeSha("unreadable");
  setLand(h, sha, "success");
  const entry = storedWithdrawal(sha, { attempts: 2 });
  await storeWithdrawals(h, [entry]);
  h.gh.listCommitStatuses = async () => {
    throw new Error("GET statuses → 500: Server Error");
  };
  for (let i = 0; i < 3; i++) {
    h.clock.advance(10);
    await h.tick();
  }
  const state = await h.state();
  assert.deepEqual(state.landWithdrawals, [{ ...entry, attempts: 5 }], "kept; three more attempts");
  assert.deepEqual(statusCalls(h), [], "no status was written");
  assert.equal(newestLand(h, sha), "success");
});

test("stored withdrawals are retried in shadow mode too (a queue switched from live), never in a dry-run", async () => {
  const sha = fakeSha("stray");
  const shadow = createHarness({ mode: "shadow" });
  setLand(shadow, sha, "success");
  await storeWithdrawals(shadow, [storedWithdrawal(sha)]);
  await shadow.tick();
  assert.deepEqual(
    statusCalls(shadow).map((c) => c.args),
    [landStatus("b7", sha, { why: "batch abandoned" })],
    "the stray success left by live mode is withdrawn"
  );
  assert.equal(landStatusReads(shadow, sha), 1);
  assert.equal(newestLand(shadow, sha), "failure");
  assert.equal("landWithdrawals" in (await shadow.state()), false, "the entry is gone");

  const h = createHarness({ mode: "live", actor: "owner" });
  setLand(h, sha, "success");
  await storeWithdrawals(h, [storedWithdrawal(sha)]);
  h.gh.readOnly = true;
  await h.tick({ action: "dry-run" });
  assert.deepEqual(statusCalls(h), []);
  assert.equal(landStatusReads(h, sha), 0);
  assert.deepEqual((await h.state()).landWithdrawals, [storedWithdrawal(sha)]);
});

test("live → shadow: a batch a live tick blessed and left at the landing stage loses its status on the first shadow tick", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  h.config.mode = "shadow"; // the operator switches the queue to shadow
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("would-land"), "shadow records it as would-land");
  assert.equal(state.inFlight, null, "and clears the batch");
  assert.deepEqual(
    statusCalls(h).map((c) => c.args),
    [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })],
    "the blessing is withdrawn, not stranded"
  );
  assert.equal(newestLand(h, f.candidateSha), "failure");
  assert.deepEqual(h.world.lands, [], "nothing landed");
});

test("live → shadow on a paused base: a batch left at the landing stage loses its status too", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  await diedAfterBlessing(h, f, [f.candidateSha]);
  const { state: stored, version } = await h.store.load(BASE);
  stored.paused = {
    reason: "infra",
    since: h.clock.now(),
    baseSha: null,
    detail: "runner lost",
    issue: null,
  };
  assert.equal((await h.store.save(BASE, stored, version, "seed: paused")).ok, true);
  h.config.mode = "shadow";
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused?.reason, "infra", "still paused");
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "the batch stays in flight");
  assert.equal(state.inFlight.stage, "testing", "shadow keeps no batch at the landing stage");
  assert.equal("landAttempts" in state.inFlight, false);
  assert.equal(newestLand(h, f.candidateSha), "failure");
});

test("a queue that was never live reads and writes no land status in shadow mode", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await greenBatch(h, [1, 2]);
  assert.deepEqual(statusCalls(h), []);
  const before = landStatusReads(h, f.candidateSha);
  await h.tick();
  assert.ok(types(await h.state()).includes("would-land"));
  assert.deepEqual(statusCalls(h), [], "no status written");
  assert.equal(
    landStatusReads(h, f.candidateSha) - before,
    1,
    "the candidate's statuses are read once, for its checks: no land-status read"
  );
});

test("at most 20 stored withdrawals, one per SHA: when full the oldest is dropped with an error event", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await greenBatch(h, [1]);
  const old = Array.from({ length: 20 }, (_, i) => fakeSha(`old-${i}`));
  for (const sha of old) setLand(h, sha, "success");
  await storeWithdrawals(
    h,
    old.map((sha) => storedWithdrawal(sha))
  );
  h.world.baseMovesOnLand = fakeSha("manual-merge"); // the landing is refused: base-moved
  refuseWithdrawals(h, () => true);
  await h.tick();
  const state = await h.state();
  assert.equal(state.landWithdrawals.length, 20);
  assert.deepEqual(
    state.landWithdrawals.map((e) => e.sha),
    [...old.slice(1), f.candidateSha],
    "the oldest entry made room; the new SHA appears once"
  );
  assert.deepEqual(
    state.landWithdrawals.map((e) => e.attempts),
    [...Array(19).fill(2), 2],
    "each refused again (retry; path + end-of-tick pass for the new one)"
  );
  const dropped = state.history.find(
    (e) => e.type === "error" && e.sha === old[0] && /dropped/.test(e.detail ?? "")
  );
  assert.ok(dropped, "the dropped entry is named in an error event");
  assert.match(dropped.detail, new RegExp(head12(old[0])));
});

for (const refused of [false, true]) {
  test(`squash-api: a stored withdrawal of a head this tick blesses never un-blesses it (retry ${refused ? "refused" : "written"})`, async () => {
    const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
    const f = await greenBatch(h, [1]);
    const head = f.prs[0].head;
    // An earlier batch of the same PR was abandoned with its withdrawal refused.
    const earlier = storedWithdrawal(head, { batchId: "b0", candidateSha: fakeSha("b0") });
    setLand(h, head, "success");
    await storeWithdrawals(h, [earlier]);
    if (refused) refuseWithdrawals(h, () => true);
    await h.tick();
    const state = await h.state();
    assert.ok(types(state).includes("landed"));
    assert.equal(newestLand(h, head), "success", "the landed head keeps its blessing");
    assert.deepEqual(
      statusCalls(h).map((c) => c.args),
      [
        ...(refused
          ? []
          : [landStatus("b0", head, { why: "batch abandoned", candidateSha: fakeSha("b0") })]),
        landStatus(f.batchId, head, { candidateSha: f.candidateSha }),
      ],
      "the stale blessing is withdrawn first, then this batch blesses the head"
    );
    assert.equal("landWithdrawals" in state, false, "the head is landed on purpose: no marker");
  });
}

test("createTickDeps: the owner's token builds the landing git and client; none without it", async (t) => {
  const fake = await startFakeGitHub({ token: "ghp_ownerLandToken" });
  t.after(() => fake.close());
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-land-deps-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const writeConfig = (name, landing) => {
    const path = join(dir, name);
    writeFileSync(path, JSON.stringify({ ...loadConfig(), landing }));
    return path;
  };
  const owner = writeConfig("owner.json", {
    mode: "merge-ff",
    actor: "owner",
    identity: { name: "owner", email: "1+owner@users.noreply.github.com" },
    statusContext: "omni-queue/land",
  });
  const app = writeConfig("app.json", { mode: "merge-ff" });
  const env = {
    OMNI_QUEUE_TOKEN: "ghs_appToken",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    RUNNER_TEMP: dir,
  };
  const gitEnv = { HOME: dir, GIT_CONFIG_NOSYSTEM: "1" };
  const extraHeader = (git) =>
    Buffer.from(
      git
        .out(["config", "--get", "http.https://github.com/.extraheader"])
        .replace(/^AUTHORIZATION: basic /, ""),
      "base64"
    ).toString("utf8");

  const appDeps = createTickDeps({ ...env, OMNI_QUEUE_CONFIG: app }, { gitEnv });
  assert.equal(appDeps.landGitFor, appDeps.gitFor, "actor app: the App's git lands");
  assert.equal(appDeps.landGh, appDeps.gh, "actor app: the App's client lands");
  assert.equal(appDeps.identity.name, "omni-queue[bot]");

  const missing = createTickDeps({ ...env, OMNI_QUEUE_CONFIG: owner }, { gitEnv });
  assert.equal(missing.landGitFor, null, "no token: the tick decides (shadow runs without it)");
  assert.equal(missing.landGh, null);
  assert.deepEqual(missing.identity, { name: "owner", email: "1+owner@users.noreply.github.com" });

  const deps = createTickDeps(
    { ...env, OMNI_QUEUE_CONFIG: owner, OMNI_QUEUE_LAND_TOKEN: "ghp_ownerLandToken" },
    { gitEnv }
  );
  assert.equal(extraHeader(deps.gitFor(dir)), "x-access-token:ghs_appToken");
  assert.equal(extraHeader(deps.landGitFor(dir)), "x-access-token:ghp_ownerLandToken");
  assert.equal(await deps.landGh.getBranchSha("main"), null, "the owner client sends its token");
  await assert.rejects(deps.gh.getBranchSha("main"), /401/, "the App client sends the App's");
  assert.deepEqual(deps.identity, { name: "owner", email: "1+owner@users.noreply.github.com" });

  const pinned = createTickDeps(
    {
      ...env,
      OMNI_QUEUE_CONFIG: owner,
      OMNI_QUEUE_GIT_NAME: "tester",
      OMNI_QUEUE_GIT_EMAIL: "tester@example.invalid",
    },
    { gitEnv }
  );
  assert.deepEqual(pinned.identity, { name: "tester", email: "tester@example.invalid" });
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
  loseSaveAfterLanding(h);
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

test("a lost save of the landing marker throws before anything is blessed or landed", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  loseNextSave(h); // the first save of the tick is the landing marker
  await assert.rejects(h.tick(), StateConflictError);
  assert.deepEqual(statusCalls(h), [], "nothing blessed");
  assert.deepEqual(h.world.lands, [], "nothing landed");
  await h.tick(); // the redo lands it
  assert.ok(types(await h.state()).includes("landed"));
});

test("runTick validates the action and the base", async () => {
  const h = createHarness();
  assert.deepEqual(TICK_ACTIONS, ["tick", "pause", "resume", "dry-run", "bless"]);
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
  const sha = fakeSha("bless");
  assert.deepEqual(
    parseArgs(["--base", BASE, "--action", "bless", "--sha", sha, "--reason", "hotfix"]),
    { base: BASE, action: "bless", reason: "hotfix", sha }
  );
  const bless = ["--action", "bless", "--sha", sha, "--reason", "hotfix"];
  assert.throws(() => parseArgs(bless), /--action bless requires --base/);
  assert.throws(
    () => parseArgs(["--base", BASE, "--action", "bless", "--reason", "x"]),
    /--action bless requires --sha/
  );
  assert.throws(
    () => parseArgs(["--base", BASE, "--action", "bless", "--sha", sha]),
    /--action bless requires --reason/
  );
  assert.throws(
    () => parseArgs(["--base", BASE, "--action", "bless", "--sha", "abc123", "--reason", "x"]),
    /--sha must be a full 40-hex commit SHA/
  );
  assert.throws(
    () => parseArgs(["--base", BASE, "--action", "tick", "--sha", sha]),
    /--sha is only valid with --action bless/
  );
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

// ─────────────────────────── review round 2: robustness regressions ───────────────────────────

/** Make the next state save lose the CAS race against a concurrent writer. */
function loseNextSave(h) {
  h.gh.beforePut = async () => {
    const { state, version } = await h.store.load(BASE);
    const other = appendEvent(state, { at: h.clock.now(), type: "error", detail: "concurrent" });
    assert.equal((await h.store.save(BASE, other, version, "concurrent")).ok, true);
  };
}

/** A landing tick saves twice (the landing marker, then its state): lose the second save. */
function loseSaveAfterLanding(h) {
  h.gh.beforePut = async () => loseNextSave(h); // the marker is saved; the final save is lost
}

const prNumbersOf = (h, predicate) =>
  [...h.gh.pulls.values()].filter(predicate).map((p) => p.number);

test("infra retry whose save is lost: the redo neither wedges nor re-pushes, and reads the retry", async () => {
  const h = createHarness({ mode: "live", infraRetries: 1 });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha, { infra: true });
  loseNextSave(h);
  await assert.rejects(h.tick(), StateConflictError);
  const retryRef = candidateRef(BASE, "b1-r1", f.candidateSha);
  assert.equal(h.gh.branches.get(retryRef), f.candidateSha, "retry pushed before the lost save");
  assert.equal(h.gh.branches.get(f.candidateRef), f.candidateSha, "stored ref kept: save lost");

  // The retry's runs start before the redo, but GitHub only lists them afterwards.
  h.clock.advance(1);
  const retryRunsAt = h.clock.now();
  h.clock.advance(1);
  await h.tick();
  let state = await h.state();
  assert.equal(state.inFlight.batchId, "b1-r1");
  assert.equal(state.inFlight.candidateRef, retryRef);
  assert.equal(state.inFlight.attempts, 1);
  assert.equal(h.world.pushes.length, 2, "the redo found the retry ref and did not push again");
  assert.equal(h.gh.branches.has(f.candidateRef), false, "old ref deleted after the saved redo");
  assert.ok(
    Date.parse(state.inFlight.startedAt) <= Date.parse(retryRunsAt),
    "the redo keeps a cutoff that includes runs started before it"
  );

  h.runCi(f.candidateSha, { at: retryRunsAt });
  await h.tick();
  state = await h.state();
  assert.equal(h.world.lands.length, 1, "the retry's green runs are read");
  assert.deepEqual(
    prNumbersOf(h, (p) => p.merged),
    [1, 2]
  );
  assert.equal(state.inFlight, null);
});

test("a candidate ref deleted by hand: the green batch is recomposed instead of wedging", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  h.gh.branches.delete(f.candidateRef);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  const lost = state.history.find((e) => e.type === "error");
  assert.match(lost.detail, /is gone from origin; recomposing #1, #2/);
  assert.ok(
    h.git.runs.some(
      (args) => args[0] === "fetch" && args.at(-1) === `+${f.candidateSha}:refs/omni-queue/inflight`
    ),
    "the SHA itself was tried after the ref"
  );
  assert.equal(state.inFlight.batchId, "b2");
  assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
  assert.equal(state.inFlight.baseSha, BASE0);

  const final = await h.drain();
  assert.deepEqual(
    prNumbersOf(h, (p) => p.merged),
    [1, 2]
  );
  assert.equal(final.counters.landedPrs, 2);
});

test("a deleted candidate ref whose SHA GitHub still serves is fetched by SHA and landed", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  h.gh.branches.delete(f.candidateRef);
  h.world.fetchableShas.add(f.candidateSha);
  await h.tick();
  assert.equal(h.world.lands.length, 1);
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
});

test("an infra retry whose source ref is gone recomposes the batch instead of failing", async () => {
  const h = createHarness({ mode: "live", infraRetries: 1 });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha, { infra: true });
  h.gh.branches.delete(f.candidateRef);
  await h.tick();
  const state = await h.state();
  assert.equal(state.inFlight.batchId, "b2");
  assert.equal(state.inFlight.attempts, 0);
  assert.notEqual(state.inFlight.candidateSha, f.candidateSha);
  assert.ok(!types(state).includes("infra-retry"));
  assert.ok(types(state).includes("error"));
});

/** An open release-freeze issue on BASE (close it with `.state = "closed"`). */
const freezeIssue = () => ({
  number: 900,
  title: `Release freeze: ${BASE}`,
  body: "",
  labels: ["release-freeze"],
  state: "open",
});

// blessed: a tick blessed the batch and died before its final save (stored at the landing
// stage, land status success), then the freeze opened.
for (const blessed of [false, true]) {
  const name = blessed
    ? "a batch at the landing stage held by a release-freeze: its land status turns failure; blessed again when the freeze lifts and it lands"
    : "release-freeze opened during CI: the green batch is held, then lands after the freeze";
  test(name, async () => {
    const h = createHarness({ mode: "live" });
    const f = await startBatch(h, [1, 2]);
    h.runCi(f.candidateSha);
    if (blessed) await diedAfterBlessing(h, f, [f.candidateSha]);
    const freeze = freezeIssue();
    h.gh.issues.push(freeze);
    await h.tick();
    await h.tick();
    let state = await h.state();
    assert.deepEqual(h.world.lands, [], "nothing lands on a frozen base");
    assert.equal(state.inFlight.batchId, f.batchId, "the batch stays in flight");
    assert.equal(state.inFlight.candidateSha, f.candidateSha);
    const held = state.history.filter((e) => e.type === "land-rejected");
    assert.equal(held.length, 1, "held once, not re-recorded every tick");
    assert.match(held[0].detail, /^base-frozen: freeze on release\/v9\.9\.9/);
    assert.equal(state.history.filter((e) => e.type === "checks-green").length, 1);
    assert.deepEqual(h.writesOf("removeLabel"), []);
    // Held = not at the landing stage: a blessing is withdrawn, and the landing count goes too.
    assert.equal(state.inFlight.stage, "testing");
    assert.equal("landAttempts" in state.inFlight, false);
    const withdrawn = blessed
      ? [landStatus(f.batchId, f.candidateSha, { why: "batch abandoned" })]
      : [];
    assert.deepEqual(
      statusCalls(h).map((c) => c.args),
      withdrawn,
      "a blessing is withdrawn once, by the first held tick; a batch never blessed gets no write"
    );
    if (blessed) assert.equal(newestLand(h, f.candidateSha), "failure", "nothing stays blessed");

    freeze.state = "closed";
    await h.tick();
    state = await h.state();
    assert.equal(h.world.lands.length, 1);
    assert.deepEqual(
      prNumbersOf(h, (p) => p.merged),
      [1, 2]
    );
    assert.deepEqual(
      statusCalls(h).map((c) => c.args),
      [...withdrawn, landStatus(f.batchId, f.candidateSha)],
      "blessed (again) right before it lands"
    );
    assert.equal(newestLand(h, f.candidateSha), "success", "a landed candidate keeps its status");
    assert.ok(types(state).includes("landed"));
  });
}

test("a block label applied during CI drops that PR before landing", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2, 3]);
  h.runCi(f.candidateSha);
  h.gh.pulls.get(2).labels.push("hold");
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  const rejected = state.history.find((e) => e.type === "land-rejected");
  assert.deepEqual(rejected.prs, [2]);
  assert.match(rejected.detail, /#2 blocked-label/);
  assert.deepEqual(nums(state.inFlight.prs), [1, 3]);
});

test("a label re-applied without a fresh approval status is not landed", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  // approve.mjs wrote `failure` when the label was removed; a non-approver re-applied it.
  h.gh.statuses.set(h.gh.pulls.get(2).headSha, [
    {
      context: APPROVAL_CONTEXTS.queue,
      state: "failure",
      creator: "omni-queue[bot]",
      description: "label removed",
      createdAt: h.clock.now(),
      targetUrl: null,
    },
  ]);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.match(state.history.find((e) => e.type === "land-rejected").detail, /#2 approval-missing/);
  assert.deepEqual(nums(state.inFlight.prs), [1]);
});

test("protected-approved removed during CI drops the protected PR before landing", async () => {
  const h = createHarness({ mode: "live" });
  h.world.protectedPrs.add(1);
  h.addPr(1);
  h.gh.pulls.get(1).labels.push("protected-approved");
  const f = await startBatch(h, [2]);
  assert.deepEqual(nums(f.prs), [1, 2]);
  h.runCi(f.candidateSha);
  h.gh.pulls.get(1).labels = ["omni-queue"];
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.match(
    state.history.find((e) => e.type === "land-rejected").detail,
    /#1 protected-approval-missing/
  );
  assert.deepEqual(nums(state.inFlight.prs), [2]);
});

test("shadow bisection composes later segments on the would-land ones (same verdicts as live)", async () => {
  const outcome = async (mode) => {
    const h = createHarness({ mode });
    h.world.interactions.push([1, 3]); // #3 only fails on top of #1
    for (let n = 1; n <= 4; n++) h.addPr(n);
    const state = await h.drain();
    return { h, state };
  };
  const shadow = await outcome("shadow");
  assert.deepEqual(shadow.h.world.lands, []);
  // Every head is settled for shadow: #1, #2 and #4 would land; #3 would be dequeued.
  assert.deepEqual(Object.keys(shadow.state.shadow.processed).sort(), ["1", "2", "3", "4"]);
  assert.equal(shadow.state.counters.culprits, 1);
  assert.deepEqual(
    shadow.state.history.filter((e) => e.type === "culprit-found").map((e) => e.prs),
    [[3]],
    "#3 isolated as the culprit"
  );
  assert.deepEqual(shadow.h.gh.pulls.get(3).labels, ["omni-queue"], "shadow keeps the label");
  assert.deepEqual(shadow.h.writesOf("removeLabel"), []);
  assert.deepEqual(shadow.h.writesOf("commentOnce"), []);
  const stacked = shadow.state.history.filter(
    (e) => e.type === "batch-started" && /shadow stack over/.test(e.detail)
  );
  assert.deepEqual(
    stacked.map((e) => e.prs),
    [[3, 4], [3], [4]]
  );

  const live = await outcome("live");
  assert.deepEqual(
    prNumbersOf(live.h, (p) => p.merged),
    [1, 2, 4]
  );
  assert.deepEqual(live.h.gh.pulls.get(3).labels, []);
  assert.equal(live.state.counters.culprits, shadow.state.counters.culprits);
});

test("shadow bisection: a would-land segment counts as a green base for the segment stacked on it", async () => {
  const run = async (mode) => {
    const h = createHarness({ mode });
    await greenBase(h); // the real tip: the first red batch is blamed on its PRs at once
    h.world.interactions.push([1, 3]); // #3 only fails on top of #1
    for (let n = 1; n <= 4; n++) h.addPr(n);
    const state = await h.drain();
    return { h, state, checks: state.history.filter((e) => e.type === "base-check-started") };
  };
  const live = await run("live");
  assert.deepEqual(live.checks, [], "live: each landed segment is a green base");
  const shadow = await run("shadow");
  assert.deepEqual(
    shadow.checks.map((e) => e.sha),
    [],
    "no base check of a would-land commit that just passed"
  );
  const wouldLand = shadow.state.history.filter((e) => e.type === "would-land");
  assert.ok(wouldLand.length > 0);
  for (const e of wouldLand) {
    assert.equal(
      shadow.state.baseChecks.find((b) => b.baseSha === e.sha)?.status,
      "green",
      `would-land ${head12(e.sha)} recorded green`
    );
  }
  assert.equal(shadow.state.counters.culprits, live.state.counters.culprits);
});

test("culprit comment: check names from the PR's workflows cannot mention or autolink", async () => {
  const h = createHarness();
  await greenBase(h); // the tip the queue landed: no base check needed
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  const failing = h.gh.checkRuns.get(f.candidateSha).find((r) => r.conclusion === "failure");
  failing.name = "pwn @acme/owners see https://evil.test `x`";
  await h.tick();
  const [comment] = commentsWithKey(h, 1, `culprit:${head12(f.prs[0].head)}`);
  assert.ok(
    comment.body.includes(
      "[`pwn @acme/owners see https://evil.test 'x'`](https://github.com/acme/widgets/actions/runs/1/job/"
    ),
    comment.body
  );
  const outsideCode = comment.body
    .split("`")
    .filter((_, i) => i % 2 === 0)
    .join("");
  assert.doesNotMatch(outsideCode, /@acme|evil\.test/);
});

test("tree divergence whose save is lost: the redo restores the pause, no 2nd issue or landing", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api" });
  h.world.squashResult = {
    ok: false,
    reason: "tree-divergence",
    merged: [1, 2],
    actualTree: "e".repeat(40),
  };
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  loseSaveAfterLanding(h);
  await assert.rejects(h.tick(), StateConflictError);
  const [created] = h.writesOf("createIssue");
  assert.deepEqual(created.args[0].labels, ["omni-queue-dashboard"]);
  const issue = h.gh.issues.find((i) => i.title === `🛑 omni-queue tree divergence: ${BASE}`);

  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "tree-divergence");
  assert.equal(state.paused.issue, issue.number);
  assert.equal(h.writesOf("createIssue").length, 1, "no duplicate issue");
  assert.equal(h.world.lands.length, 1, "not landed again");
  assert.equal(state.inFlight, null);

  await h.tick();
  assert.equal(h.world.pushes.length, 1, "paused: nothing composed");
});

test("a PR withdrawn between bisection segments is left out of the next segment", async () => {
  const h = createHarness({ mode: "live" });
  await greenBase(h); // the tip the queue landed: no base check needed
  h.world.culprits.add(4);
  const f = await startBatch(h, [1, 2, 3, 4]);
  h.runCi(f.candidateSha);
  await h.tick(); // red → [1, 2] composed
  const s1 = (await h.state()).inFlight;
  assert.deepEqual(nums(s1.prs), [1, 2]);
  h.gh.pulls.get(3).labels = [];
  h.runCi(s1.candidateSha);
  await h.tick(); // [1, 2] lands; [3, 4] without #3
  const state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [4]);
  assert.deepEqual(state.inFlight.bisect.segments.map(nums), [[4]]);
  const withdrawn = state.history.find((e) => e.type === "pr-dequeued");
  assert.deepEqual(withdrawn.prs, [3]);
  assert.match(withdrawn.detail, /^withdrawn: queue label removed/);
});

test("check runs pushed by another branch on the same SHA do not decide the verdict", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha, { headBranch: f.candidateRef });
  h.gh.checkRuns.get(f.candidateSha).push({
    id: 999,
    name: "Gate / CI",
    status: "completed",
    conclusion: "failure",
    startedAt: h.clock.now(),
    completedAt: h.clock.now(),
    htmlUrl: null,
    appSlug: "github-actions",
    output: { title: null, summary: null, text: null },
    headBranch: BASE,
  });
  await h.tick();
  const state = await h.state();
  assert.equal(h.world.lands.length, 1);
  assert.equal(state.counters.culprits, 0);
});

// A3: the candidate SHA is public. Anybody can open a pull request whose head is that commit (from
// a fork: the check suite has no head_branch; from a branch of this repository: any name, the
// candidate ref included), and that PR's CI reports check runs on the very same SHA.
const PR_ON_CANDIDATE = [
  ["a fork PR (suite without head_branch)", () => null],
  ["a same-repository PR from the candidate branch", (f) => f.candidateRef],
];

for (const [who, branchOf] of PR_ON_CANDIDATE) {
  test(`a red candidate stays red when ${who} reports green runs on its SHA later`, async () => {
    const h = createHarness({ mode: "live" });
    h.deps.modules = { ...h.modules, checks: realChecks };
    await greenBase(h); // the tip the queue landed: no base check needed
    h.world.culprits.add(1);
    const f = await startBatch(h, [1]);
    h.runCi(f.candidateSha); // the candidate's own push run: Gate / CI fails
    h.runPrCi(f.candidateSha, { headBranch: branchOf(f) }); // same names, later, all green
    await h.tick();
    const state = await h.state();
    assert.deepEqual(h.world.lands, [], "a run of a PR suite never supersedes the candidate's own");
    assert.ok(types(state).includes("checks-red"), types(state).join(","));
    assert.ok(!types(state).includes("checks-green"));
    assert.equal(state.counters.culprits, 1);
    assert.deepEqual(h.gh.pulls.get(1).labels, []);
  });

  test(`a green candidate lands although ${who} left cancelled runs on its SHA`, async () => {
    const h = createHarness({ mode: "live", infraRetries: 1 });
    h.deps.modules = { ...h.modules, checks: realChecks };
    const f = await startBatch(h, [1, 2]);
    h.runCi(f.candidateSha); // own push run: all green
    h.runPrCi(f.candidateSha, { headBranch: branchOf(f), conclusion: "cancelled" });
    await h.tick();
    const state = await h.state();
    assert.equal(h.world.lands.length, 1, "the candidate's own green verdict stands");
    assert.deepEqual(types(state), ["batch-started", "checks-green", "land-blessed", "landed"]);
    assert.equal(state.paused, null);
    assert.equal(state.counters.redBatches, 0);
    assert.equal(h.world.pushes.length, 1, "no infra retry was pushed");
  });
}

test("check runs outside a push run of the candidate ref never count: pending, then no-ci-run", async () => {
  const h = createHarness({ mode: "live", infraRetries: 1 });
  h.deps.modules = { ...h.modules, checks: realChecks };
  const f = await startBatch(h, [1]);
  // Green runs of every required name, but GitHub lists no push workflow run for the candidate
  // ref: a suite the tick cannot attribute (unknown branch) and a workflow_dispatch on the ref.
  h.runPrCi(f.candidateSha, { headBranch: null });
  const dispatched = h.workflowRun(f.candidateSha, {
    headBranch: f.candidateRef,
    event: "workflow_dispatch",
  });
  for (const run of h.runPrCi(f.candidateSha, { headBranch: f.candidateRef })) {
    run.checkSuiteId = dispatched;
  }
  await h.tick();
  let state = await h.state();
  assert.deepEqual(h.world.lands, [], "unknown is never green");
  assert.deepEqual(types(state), ["batch-started"], "still pending");
  assert.deepEqual(state.inFlight, f);

  h.clock.advance(realChecks.NO_RUN_TIMEOUT_MINUTES);
  await h.tick();
  state = await h.state();
  assert.deepEqual(types(state).slice(-2), ["checks-timeout", "infra-retry"]);
  assert.match(state.history.at(-2).detail, /no CI run for candidate/);
  assert.deepEqual(h.world.lands, []);
});

test("every listed workflow run is re-checked: only push runs of this ref and SHA qualify", async () => {
  const h = createHarness({ mode: "live" });
  await greenBase(h); // the tip the queue landed: no base check needed
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  h.runPrCi(f.candidateSha, { headBranch: f.candidateRef });
  // An API that ignored the filters (or a proxy in between) must not widen the verdict.
  h.gh.listWorkflowRuns = async () => structuredClone(h.gh.workflowRuns);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.equal(state.counters.culprits, 1);
});

test("a timed-out job plus the Gate / CI failure it causes takes the infra retry", async () => {
  // workflow_run tick: the always() gate has already failed because a needed job timed out
  const h = createHarness({ mode: "live", infraRetries: 1 });
  const f = await startBatch(h, [1]);
  h.clock.advance(1);
  const at = h.clock.now();
  const conclusions = {
    "Gate / CI": "failure",
    "Gate / Quality": "success",
    "Merge integrity (changelog + generated skills)": "success",
    "E2E Tests": "timed_out",
  };
  // the runs of the candidate's own push (a push workflow run on its ref)
  const checkSuiteId = h.workflowRun(f.candidateSha, { headBranch: f.candidateRef });
  h.gh.checkRuns.set(
    f.candidateSha,
    Object.entries(conclusions).map(([name, conclusion]) => ({
      id: h.world.runSeq++,
      name,
      status: "completed",
      conclusion,
      startedAt: at,
      completedAt: at,
      htmlUrl: null,
      appSlug: "github-actions",
      output: { title: null, summary: null, text: null },
      checkSuiteId,
    }))
  );
  h.clock.advance(1);
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("infra-retry"), types(state).join(","));
  assert.ok(!types(state).includes("culprit-found"));
  assert.equal(state.inFlight.batchId, "b1-r1");
  assert.deepEqual(h.world.pushes.at(-1), {
    ref: candidateRef(BASE, "b1-r1", f.candidateSha),
    sha: f.candidateSha,
  });
  assert.deepEqual(h.writesOf("removeLabel"), []);
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"]);
});

// ─────────────────────────── integration gaps between modules (INT) ───────────────────────────

test("a PR whose head is already in the base is dequeued once and never recomposed", async () => {
  const h = createHarness({ mode: "live" });
  h.world.alreadyInBase.add(2);
  for (const n of [1, 2, 3]) h.addPr(n);
  await h.tick();
  let state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [1, 3]);
  const head2 = h.gh.pulls.get(2).headSha;
  assert.deepEqual(
    h.writesOf("removeLabel").map((w) => w.args),
    [
      [2, "omni-queue"],
      [2, "protected-approved"],
    ]
  );
  const comments = commentsWithKey(h, 2, `already-landed:${head12(head2)}`);
  assert.equal(comments.length, 1);
  assert.match(comments[0].body, /already part of/);
  const dequeued = state.history.find((e) => e.type === "pr-dequeued");
  assert.deepEqual(dequeued.prs, [2]);
  assert.equal(dequeued.detail, "already-in-base");
  assert.match(state.history.find((e) => e.type === "batch-started").detail, /#2 already-in-base/);

  h.runCi(state.inFlight.candidateSha);
  await h.tick(); // lands [1, 3]; #2 carries no label any more
  await h.tick();
  state = await h.state();
  assert.equal(
    h.world.composeCalls.filter((c) => c.prs.includes(2)).length,
    1,
    "#2 is offered to compose once, never again"
  );
  assert.equal(state.history.filter((e) => e.type === "pr-dequeued").length, 1);
  assert.equal(commentsWithKey(h, 2, `already-landed:${head12(head2)}`).length, 1);
});

test("stacked PRs (alreadyContained) land and count with their batch", async () => {
  const h = createHarness({ mode: "live" });
  h.world.stacked.add(2);
  const f = await startBatch(h, [1, 2]);
  assert.deepEqual(nums(f.prs), [1, 2]);
  let state = await h.state();
  assert.match(
    state.history.find((e) => e.type === "batch-started").detail,
    /stacked #2 \(no merge commit of their own\)/
  );
  h.runCi(f.candidateSha);
  await h.tick();
  state = await h.state();
  assert.equal(state.counters.landedPrs, 2);
  assert.deepEqual(state.history.find((e) => e.type === "landed").prs, [1, 2]);
  assert.deepEqual(h.world.lands[0].prs, [1, 2]);
  assert.equal(commentsWithKey(h, 2, `landed:${head12(f.prs[1].head)}`).length, 1);
  assert.deepEqual(h.gh.pulls.get(2).labels, []);
});

/** Rewrite the stored in-flight record (a planted or corrupted state document). */
async function tamperInFlight(h, patch) {
  const { state, version } = await h.store.load(BASE);
  state.inFlight = { ...state.inFlight, ...patch };
  assert.equal((await h.store.save(BASE, state, version, "tampered")).ok, true);
}

for (const [mode, landing] of [
  ["live", "merge-ff"],
  ["live", "squash-api"],
  ["shadow", "merge-ff"],
]) {
  for (const [label, patch] of [
    ["names no pull request", () => ({ prs: [] })],
    // #2 is open, labeled and approved: revalidation keeps it, only the candidate disagrees
    [
      "names a PR its candidate does not merge",
      (f, h) => ({
        prs: [...f.prs, { ...f.prs[0], n: 2, head: h.addPr(2) }],
      }),
    ],
    [
      "names another head than its candidate merged",
      (f) => ({
        prs: [{ ...f.prs[0], head: fakeSha("planted-head") }],
      }),
    ],
  ]) {
    test(`${mode} ${landing}: a stored batch that ${label} is not blessed, not landed, and pauses`, async () => {
      const h = createHarness({ mode, landing, actor: "owner" });
      const f = await startBatch(h, [1]);
      if (label.includes("another head")) h.gh.pulls.get(1).headSha = fakeSha("planted-head");
      await tamperInFlight(h, patch(f, h));
      h.runCi(f.candidateSha);
      await h.tick();
      const state = await h.state();
      assert.deepEqual(statusCalls(h), [], "nothing blessed");
      assert.deepEqual(h.world.lands, [], "nothing landed");
      assert.ok(!types(state).includes("would-land"), "not recorded as would-land");
      assert.ok(!types(state).includes("land-blessed"));
      assert.equal(state.inFlight, null);
      assert.equal(state.paused?.reason, "error");
      assert.match(state.paused.detail, /does not match its candidate/);
      assert.equal(state.history.at(-1).type, "error");
      assert.match(state.history.at(-1).detail, /state tampering or corruption/);
    });
  }
}

test("a stored batch is checked against its candidate before the would-land and the bless", async () => {
  const shadow = createHarness({ mode: "shadow" });
  shadow.world.stacked.add(2);
  const f = await startBatch(shadow, [1, 2]);
  shadow.runCi(f.candidateSha);
  await shadow.tick();
  assert.deepEqual(shadow.world.verifications, [
    {
      expectedBaseSha: f.baseSha,
      candidateSha: f.candidateSha,
      prs: [1, 2],
      treeSha: undefined,
      trees: true,
    },
  ]);
  assert.ok(types(await shadow.state()).includes("would-land"), "a stacked batch passes");

  const squash = createHarness({ mode: "live", landing: "squash-api" });
  const g = await startBatch(squash, [1]);
  squash.runCi(g.candidateSha);
  await squash.tick();
  assert.deepEqual(
    squash.world.verifications.map((v) => [v.treeSha, v.trees]),
    [[g.treeSha, true]],
    "squash-api: the stored tree must be the candidate's, and each merge commit's tree checked"
  );
  assert.ok(types(await squash.state()).includes("landed"));
});

// ───────────── L1: bless only with the queue refs protected (and the trees recomposed) ─────────────

const UNPROTECTED_PAUSE = (detail) =>
  `queue refs are not protected (${detail}): not blessed, not landed; ` +
  "apply apply-ruleset.mjs --kind queue-refs, then resume";
const rulesReads = (h) =>
  h.gh.reads.filter((r) => r.method === "getBranchRules").map((r) => r.args[0]);

for (const landing of ["merge-ff", "squash-api"]) {
  test(`live ${landing}: queue refs without an update rule → paused error naming it, no createCommitStatus, no landing`, async () => {
    const h = createHarness({ mode: "live", landing, actor: "owner" });
    const f = await greenBatch(h, [1, 2]);
    h.unprotect(STATE_BRANCH, "update");
    await h.tick();
    const state = await h.state();
    assert.deepEqual(statusCalls(h), [], "nothing blessed");
    assert.deepEqual(h.world.lands, [], "nothing landed");
    assert.ok(!types(state).includes("land-blessed"));
    assert.equal(state.inFlight, null);
    assert.equal(state.paused?.reason, "error");
    assert.equal(state.paused.detail, UNPROTECTED_PAUSE("omni-queue-state: update"));
    assert.equal(state.history.at(-1).type, "error");
    assert.equal(state.history.at(-1).detail, state.paused.detail);
    assert.deepEqual(
      h.world.verifications.map((v) => v.trees),
      [true],
      "the composition, trees included, was checked first"
    );
    assert.deepEqual(rulesReads(h), [STATE_BRANCH, f.candidateRef], "read once, both refs");
  });
}

test("live: an unprotected candidate ref stops a batch at the landing stage before the attempts limit", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  // Earlier ticks blessed it LANDING_ATTEMPTS_LIMIT times without a verdict: the protection
  // check comes first, so the pause names the refs, not the attempts.
  await tamperInFlight(h, { stage: "landing", landAttempts: LANDING_ATTEMPTS_LIMIT });
  for (const rule of ["creation", "update", "deletion"]) h.unprotect(f.candidateRef, rule);
  await h.tick();
  const state = await h.state();
  assert.equal(
    state.paused?.detail,
    UNPROTECTED_PAUSE(
      `${f.candidateRef}: creation, ${f.candidateRef}: update, ${f.candidateRef}: deletion`
    )
  );
  assert.ok(!statusCalls(h).some((c) => c.args[1].state === "success"), "nothing blessed");
  assert.deepEqual(h.world.lands, []);
});

test("shadow: unprotected refs still record would-land, with the live-would-pause note", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await greenBatch(h, [1]);
  h.unprotect(f.candidateRef, "deletion");
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused, null, "shadow never pauses for this");
  const wouldLand = state.history.find((e) => e.type === "would-land");
  assert.ok(wouldLand, "would-land recorded");
  assert.ok(
    wouldLand.detail.endsWith(
      `; live mode would pause: queue refs unprotected (${f.candidateRef}: deletion)`
    ),
    wouldLand.detail
  );
  assert.deepEqual(statusCalls(h), []);
  assert.deepEqual(rulesReads(h), [STATE_BRANCH, f.candidateRef]);

  // Protected refs: no note.
  const ok = createHarness({ mode: "shadow" });
  await greenBatch(ok, [1]);
  await ok.tick();
  const plain = (await ok.state()).history.find((e) => e.type === "would-land");
  assert.doesNotMatch(plain.detail, /would pause/);
  assert.equal(plain.detail, `shadow mode: would merge-ff onto ${head12(BASE0)}`);
});

test("a rules read that throws fails the tick: nothing blessed, no pause", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  const read = h.gh.getBranchRules;
  h.gh.getBranchRules = async () => {
    throw new Error("GET /rules/branches/omni-queue-state → 502: Bad Gateway");
  };
  await assert.rejects(h.tick(), /502/);
  let state = await h.state();
  assert.equal(state.paused, null, "not a pause");
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "the batch stays in flight");
  assert.equal(state.inFlight.stage, "testing", "never marked at the landing stage");
  assert.deepEqual(statusCalls(h), [], "nothing blessed");
  assert.deepEqual(h.world.lands, []);

  // The next tick reads the rules and lands.
  h.gh.getBranchRules = read;
  await h.tick();
  state = await h.state();
  assert.ok(types(state).includes("landed"));
});

test("shadow: a rules read that throws does not fail the tick: would-land names the check and why", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await greenBatch(h, [1]);
  h.gh.getBranchRules = async () => {
    throw new Error("GET /rules/branches/omni-queue-state → 502:\n  Bad Gateway");
  };
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused, null, "shadow does not pause for it");
  assert.equal(state.inFlight, null, "the batch is settled as would-land");
  const wouldLand = state.history.find((e) => e.type === "would-land");
  assert.ok(wouldLand, "would-land recorded");
  assert.equal(
    wouldLand.detail,
    `shadow mode: would merge-ff onto ${head12(BASE0)}; queue refs check could not run ` +
      "(GET /rules/branches/omni-queue-state → 502: Bad Gateway): live mode would fail the tick"
  );
  assert.equal(wouldLand.sha, f.candidateSha);
  assert.deepEqual(statusCalls(h), []);
});

test("shadow: a git error while recomposing does not fail the tick: would-land names the check and why", async () => {
  const h = createHarness({ mode: "shadow" });
  await greenBatch(h, [1]);
  const long = `fatal: unable to read tree ${"0".repeat(40)}\n${"x".repeat(400)}`;
  h.deps.modules = {
    ...h.modules,
    land: {
      ...h.modules.land,
      verifyComposition() {
        throw new Error(long);
      },
    },
  };
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused, null);
  const wouldLand = state.history.find((e) => e.type === "would-land");
  assert.ok(wouldLand, "would-land recorded");
  const why = long.replace(/\s+/g, " ").slice(0, 200);
  assert.ok(
    wouldLand.detail.endsWith(
      `; composition check could not run (${why}): live mode would fail the tick`
    ),
    wouldLand.detail
  );
  assert.doesNotMatch(wouldLand.detail, /\n/, "one line");
  assert.deepEqual(rulesReads(h).length, 2, "the queue refs check still ran");
});

test("live: a git error while recomposing fails the tick: nothing blessed, no pause", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  h.deps.modules = {
    ...h.modules,
    land: {
      ...h.modules.land,
      verifyComposition() {
        throw new Error("fatal: unable to read tree");
      },
    },
  };
  await assert.rejects(h.tick(), /unable to read tree/);
  const state = await h.state();
  assert.equal(state.paused, null, "not a pause");
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "the batch stays in flight");
  assert.deepEqual(statusCalls(h), [], "nothing blessed");
  assert.deepEqual(h.world.lands, []);
});

test("dry-run reads the rules with GET only", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenBatch(h, [1]);
  const writes = h.gh.writes.length;
  h.gh.readOnly = true;
  let result = await h.tick({ action: "dry-run" });
  assert.deepEqual(rulesReads(h), [STATE_BRANCH, f.candidateRef]);
  assert.equal(h.gh.writes.length, writes, "no write");
  assert.ok(result.decisions.some((d) => d.includes(`would land b1 (${head12(f.candidateSha)})`)));

  // Unprotected: the plan says live mode would pause; nothing is written or saved.
  h.unprotect(STATE_BRANCH, "creation");
  result = await h.tick({ action: "dry-run" });
  assert.equal(h.gh.writes.length, writes, "no write");
  assert.ok(
    result.decisions.includes(
      `[dry-run] paused: ${UNPROTECTED_PAUSE("omni-queue-state: creation")}`
    ),
    result.decisions.join("\n")
  );
  const state = await h.state();
  assert.equal(state.paused, null, "the dry-run saved nothing");
  assert.equal(state.inFlight.candidateSha, f.candidateSha);
});

for (const mode of ["live", "shadow"]) {
  test(`${mode}: a merge commit whose tree is not the merge of its parents pauses before the rules read`, async () => {
    const h = createHarness({ mode });
    await greenBatch(h, [1]);
    const fake = h.modules.land.verifyComposition;
    // Shape, trailers and parents pass; only the recomposition (trees: true) disagrees.
    h.deps.modules = {
      ...h.modules,
      land: {
        ...h.modules.land,
        verifyComposition(input) {
          const out = fake(input);
          if (!out.ok || !input.trees) return out;
          return {
            ok: false,
            detail: "merge commit 0123456789ab of #1: tree aaaa, recomposing gives bbbb",
          };
        },
      },
    };
    await h.tick();
    const state = await h.state();
    assert.equal(state.paused?.reason, "error");
    assert.match(
      state.paused.detail,
      /does not match its candidate .*: merge commit 0123456789ab of #1: tree aaaa, recomposing gives bbbb \(state tampering/
    );
    assert.ok(!types(state).includes("would-land"));
    assert.deepEqual(statusCalls(h), []);
    assert.deepEqual(h.world.lands, []);
    assert.deepEqual(rulesReads(h), [], "the composition is checked first");
  });
}

test("every batch-started event (batch, bisection segment, recomposition) carries labeledAt", async () => {
  const h = createHarness({ mode: "live" });
  h.world.culprits.add(2);
  for (const n of [1, 2, 3, 4]) h.addPr(n);
  const approvals = Object.fromEntries(
    [1, 2, 3, 4].map((n) => [String(n), h.gh.timelines.get(n)[0].createdAt])
  );
  await h.drain();
  // A recomposition after the base moved under a green candidate.
  h.addPr(5);
  approvals["5"] = h.gh.timelines.get(5)[0].createdAt;
  await h.tick();
  const f = (await h.state()).inFlight;
  h.gh.branches.set(BASE, fakeSha("someone-else-merged"));
  h.runCi(f.candidateSha);
  await h.tick();
  const state = await h.state();
  const started = state.history.filter((e) => e.type === "batch-started");
  assert.ok(started.length >= 5, `several batches started (${started.length})`);
  assert.ok(
    started.some((e) => /^bisect of /.test(e.detail)),
    "bisection segments included"
  );
  assert.equal(started.at(-1).prs[0], 5, "the recomposition is the last one");
  for (const event of started) {
    assert.deepEqual(
      event.labeledAt,
      Object.fromEntries(event.prs.map((n) => [String(n), approvals[String(n)]])),
      `${event.batchId}: one approval time per PR`
    );
  }
});

test("no CI run for the candidate after 45 min: checks-timeout via the infra path", async () => {
  const h = createHarness({ mode: "live", infraRetries: 1 });
  h.deps.modules = { ...h.modules, checks: realChecks };
  const f = await startBatch(h, [1]);
  h.clock.advance(realChecks.NO_RUN_TIMEOUT_MINUTES - 1);
  await h.tick();
  assert.equal((await h.state()).inFlight.attempts, 0, "still waiting before 45 min");

  h.clock.advance(2);
  await h.tick();
  let state = await h.state();
  const timeout = state.history.find((e) => e.type === "checks-timeout");
  assert.match(timeout.detail, /no CI run for candidate after 45 min/);
  const retry = state.history.find((e) => e.type === "infra-retry");
  assert.match(retry.detail, /no CI run for candidate/);
  assert.equal(state.inFlight.attempts, 1);
  assert.equal(state.inFlight.candidateSha, f.candidateSha);

  h.clock.advance(realChecks.NO_RUN_TIMEOUT_MINUTES + 1);
  await h.tick();
  state = await h.state();
  assert.equal(state.paused.reason, "infra");
  assert.match(state.paused.detail, /no CI run for candidate/);
});

test("main: the client counts only the App's own comment markers (botLogin)", async (t) => {
  const fake = await startFakeGitHub({ token: "ghs_tick_main", actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  const runnerTemp = mkdtempSync(join(tmpdir(), "omni-queue-tick-main-"));
  t.after(() => rmSync(runnerTemp, { recursive: true, force: true }));
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "error", () => {});
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: "release/v3.8.54" } });
  fake.timeline.set(7, [
    {
      id: 1,
      event: "labeled",
      label: { name: "omni-queue" },
      actor: { login: "mallory", type: "User" },
      created_at: "2026-11-13T10:00:00Z",
    },
  ]);
  // A third party pre-posts the hidden marker to mute the queue's not-approver comment.
  fake.comments.set(7, [
    {
      id: 1,
      body: `nothing to see\n\n${commentMarker("not-approver")}`,
      user: { login: "mallory", type: "User" },
      created_at: "2026-11-13T10:00:00Z",
    },
  ]);
  // Live mode: the committed config is in shadow mode, where the tick comments on no PR.
  const configPath = join(runnerTemp, "omni-queue.config.json");
  writeFileSync(configPath, JSON.stringify({ ...loadConfig(), mode: "live" }));
  const env = {
    OMNI_QUEUE_TOKEN: "ghs_tick_main",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    RUNNER_TEMP: runnerTemp,
    OMNI_QUEUE_CONFIG: configPath,
  };
  assert.equal(await main(["--base", "release/v3.8.54"], env), 0);
  const comments = fake.comments.get(7);
  assert.equal(comments.length, 2, "the bot posted its own comment despite the planted marker");
  assert.equal(comments[1].user.login, "omni-queue[bot]");
  assert.ok(comments[1].body.includes(commentMarker("not-approver")));
  // The next tick sees the bot's marker and stays quiet.
  assert.equal(await main(["--base", "release/v3.8.54"], env), 0);
  assert.equal(fake.comments.get(7).length, 2);
});

test("a PR retargeted to another managed base during CI never lands on the old (frozen) base", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  // /generate-release froze BASE and a campaign retargeted the open PR to the next release:
  // same head, label kept (retargeting fires `edited`, which the workflow does not listen to).
  h.gh.pulls.get(1).baseRef = "release/v10.0.0";
  h.gh.issues.push({
    number: 901,
    title: `Release freeze: ${BASE}`,
    body: "",
    labels: ["release-freeze"],
    state: "open",
  });
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, [], "nothing lands on the base the PR left");
  assert.equal(h.gh.branches.get(BASE), BASE0);
  const rejected = state.history.find((e) => e.type === "land-rejected");
  assert.deepEqual(rejected.prs, [1]);
  assert.match(rejected.detail, /#1 base changed to release\/v10\.0\.0/);
  assert.equal(state.inFlight, null, "nothing left to recompose on this base");
});

test("queue admission re-checks the base of the fresh PR snapshot, not the list summary", async () => {
  const h = createHarness({ mode: "live" });
  h.addPr(2);
  const listOpenPulls = h.gh.listOpenPulls;
  h.gh.listOpenPulls = async (options) => {
    const pulls = await listOpenPulls(options);
    // the list was read just before the PR was retargeted: the summary still says BASE
    return pulls.length ? pulls : [{ ...(await h.gh.getPull(2)), baseRef: BASE }];
  };
  h.gh.pulls.get(2).baseRef = "release/v10.0.0";
  await h.tick();
  const state = await h.state();
  assert.equal(state.inFlight, null, "#2 is not composed on a base it no longer targets");
  assert.deepEqual(h.world.pushes, []);
});

test("a culprit whose head moved before the red was processed keeps the newer head's label", async () => {
  const h = createHarness();
  await greenBase(h); // the tip the queue landed: no base check needed
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  // Before the next tick the contributor pushed head B and a maintainer re-approved it.
  const headB = fakeSha("head-1-b");
  h.gh.pulls.get(1).headSha = headB;
  h.gh.statuses.set(headB, [
    {
      context: APPROVAL_CONTEXTS.queue,
      state: "success",
      creator: "omni-queue[bot]",
      description: "approved",
      createdAt: h.clock.now(),
      targetUrl: null,
    },
  ]);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.writesOf("removeLabel"), [], "the label now approves head B");
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"]);
  assert.deepEqual(commentsWithKey(h, 1, `culprit:${head12(f.prs[0].head)}`), []);
  const culprit = state.history.find((e) => e.type === "culprit-found");
  assert.deepEqual(culprit.prs, [1]);
  assert.match(culprit.detail, /head moved/);
  // #1 was not marked as touched: head B is selectable in the same tick.
  assert.deepEqual(
    state.inFlight.prs.map((p) => [p.n, p.head]),
    [[1, headB]]
  );
});

test("a base-check infra failure retries under a ref every validator accepts", async () => {
  const h = createHarness({ infraRetries: 1 });
  h.gh.issues.push({
    number: 502,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
  });
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick(); // → base-check
  const check = (await h.state()).inFlight;
  assert.equal(check.kind, "base-check");

  h.runCi(BASE0, { kind: "base-check", infra: true });
  await h.tick(); // infra failure on the base-check → retry
  let state = await h.state();
  const retry = state.inFlight;
  assert.equal(retry.kind, "base-check");
  assert.equal(retry.attempts, 1);
  assert.equal(retry.candidateSha, BASE0);
  assert.equal(retry.batchId, `basecheck-${head12(BASE0)}-r1`);
  assert.equal(retry.candidateRef, baseCheckRef(BASE, BASE0, 1));
  assert.notEqual(retry.candidateRef, check.candidateRef);
  assert.deepEqual(h.world.pushes.at(-1), { ref: retry.candidateRef, sha: BASE0 });
  assert.ok(types(state).includes("infra-retry"));
  // The pushed ref is the one ci.yml resolves through candidate-base.mjs.
  assert.deepEqual(
    resolveCandidateBase({ message: "x", headSha: BASE0, ref: retry.candidateRef }),
    {
      baseSha: BASE0,
      target: null,
      source: "self",
    }
  );

  h.runCi(BASE0, { kind: "base-check" });
  await h.tick(); // base green → the parked batch is PR-red → culprit dequeued
  state = await h.state();
  assert.equal(state.baseChecks[0].status, "green");
  assert.equal(state.baseChecks[0].ref, retry.candidateRef);
  assert.equal(state.counters.culprits, 1);
  assert.equal(state.paused, null);
});

// ─────────────────── shadow mode is inert for real pull requests (M3) ───────────────────

/** Writes that touch a pull request (a label or a comment) among the fake's recorded writes. */
const prWrites = (h) =>
  h.gh.writes
    .filter((w) =>
      ["removeLabel", "addLabels", "commentOnce", "createIssueComment"].includes(w.method)
    )
    .filter((w) => h.gh.pulls.has(w.args[0]))
    .map((w) => [w.method, w.args[0]]);

test("shadow: a culprit keeps its label and gets no comment; recorded, not batched again", async () => {
  const h = createHarness({ mode: "shadow" });
  await greenBase(h); // the tip the queue landed: no base check needed
  h.world.culprits.add(1);
  const f = await startBatch(h, [1]);
  const head = h.gh.pulls.get(1).headSha;
  h.runCi(f.candidateSha);
  await h.tick();
  let state = await h.state();
  assert.deepEqual(prWrites(h), [], "no label removal and no comment on the PR");
  assert.deepEqual(h.writesOf("createCommitStatus"), []);
  assert.deepEqual(h.gh.pulls.get(1).labels, ["omni-queue"]);
  assert.equal(state.inFlight, null);
  const culprit = state.history.filter((e) => e.type === "culprit-found");
  assert.equal(culprit.length, 1, "what live mode would have done is a history event");
  assert.deepEqual(culprit[0].prs, [1]);
  assert.match(culprit[0].detail, /^Gate \/ CI; shadow mode: label kept, no comment$/);
  assert.equal(state.counters.culprits, 1);
  assert.deepEqual(state.shadow.processed, { 1: head }, "remembered per head SHA");

  await h.tick();
  await h.tick();
  state = await h.state();
  assert.equal(h.world.pushes.length, 1, "the same head is not batched again");
  assert.equal(state.history.filter((e) => e.type === "batch-started").length, 1);
  assert.equal(h.world.renders.at(-1).queue[0].eligible, false);
  assert.deepEqual(
    h.world.renders.at(-1).queue[0].reasons.map((r) => r.code),
    ["shadow-processed"],
    "the dashboard says why it waits"
  );

  // A new head is a new candidate.
  h.gh.pulls.get(1).headSha = fakeSha("head-1-fixed");
  await h.tick();
  assert.equal(h.world.pushes.length, 2);
  assert.deepEqual(prWrites(h), []);
});

test("shadow: a PR conflicting with the base keeps its label, no comment, would-dequeue once", async () => {
  const h = createHarness({ mode: "shadow" });
  h.world.baseConflicts.add(2);
  h.world.alreadyInBase.add(3);
  for (const n of [1, 2, 3]) h.addPr(n);
  await h.tick();
  let state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [1]);
  assert.deepEqual(prWrites(h), []);
  for (const n of [2, 3]) assert.deepEqual(h.gh.pulls.get(n).labels, ["omni-queue"]);
  assert.deepEqual(
    state.history
      .filter((e) => e.type === "would-dequeue")
      .map((e) => [e.prs, e.detail, e.sha, e.batchId]),
    [
      [[2], "base-conflict", h.gh.pulls.get(2).headSha, "b1"],
      [[3], "already-in-base", h.gh.pulls.get(3).headSha, "b1"],
    ]
  );
  assert.equal(
    state.history.some((e) => e.type === "pr-dequeued"),
    false,
    "nothing was dequeued for real"
  );
  assert.deepEqual(state.shadow.processed, {
    2: h.gh.pulls.get(2).headSha,
    3: h.gh.pulls.get(3).headSha,
  });

  h.runCi(state.inFlight.candidateSha);
  await h.tick(); // would-land #1
  await h.tick();
  state = await h.state();
  assert.equal(h.world.pushes.length, 1, "neither #2 nor #3 is composed again at the same head");
  assert.equal(state.history.filter((e) => e.type === "would-dequeue").length, 2);
  assert.deepEqual(prWrites(h), []);
});

test("shadow: eligibility's comment and label removal are recorded, never executed", async () => {
  const h = createHarness({ mode: "shadow" });
  h.addPr(1);
  h.addPr(2);
  h.world.eligibilityActions = (pr) =>
    pr.number === 2
      ? [
          { type: "comment", pr: 2, key: "conflict:abc", body: "This PR conflicts with the base" },
          { type: "removeLabel", pr: 2, label: "omni-queue" },
        ]
      : [];
  await h.tick();
  await h.tick();
  await h.tick();
  const state = await h.state();
  assert.deepEqual(prWrites(h), []);
  assert.deepEqual(h.gh.pulls.get(2).labels, ["omni-queue"]);
  assert.deepEqual(nums(state.inFlight.prs), [1], "a PR live mode would dequeue is not batched");
  const would = state.history.filter((e) => e.type === "would-dequeue");
  assert.equal(would.length, 1, "one event per head, not one per tick");
  assert.deepEqual(would[0].prs, [2]);
  assert.equal(would[0].sha, h.gh.pulls.get(2).headSha);
  const entry = h.world.renders.at(-1).queue.find((e) => e.number === 2);
  assert.equal(entry.eligible, false, "the dashboard lists it as not eligible");
});

test("shadow: PRs merged by another path during CI do not discard the green batch", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await startBatch(h, [1, 2, 3]);
  h.runCi(f.candidateSha);
  // Mergify landed #2 and #3 (the heads the candidate tested) while the candidate CI ran.
  for (const n of [2, 3]) Object.assign(h.gh.pulls.get(n), { merged: true, state: "closed" });
  await h.tick();
  const state = await h.state();
  assert.deepEqual(types(state), ["batch-started", "checks-green", "would-land"]);
  const would = state.history.at(-1);
  assert.deepEqual(would.prs, [1, 2, 3]);
  assert.equal(would.sha, f.candidateSha);
  assert.match(would.detail, /^shadow mode: would merge-ff onto [0-9a-f]{12}; /);
  assert.match(would.detail, /merged meanwhile by another path: #2, #3$/);
  assert.equal(h.world.pushes.length, 1, "nothing was recomposed");
  assert.equal(state.inFlight, null);
  assert.deepEqual(state.shadow.processed, { 1: h.gh.pulls.get(1).headSha });
  assert.deepEqual(prWrites(h), []);
});

test("shadow: a PR merged at ANOTHER head than the tested one still drops out of the batch", async () => {
  const h = createHarness({ mode: "shadow" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  // #2 got a new commit and was merged with it: the candidate never tested what landed.
  Object.assign(h.gh.pulls.get(2), {
    headSha: fakeSha("head-2-newer"),
    merged: true,
    state: "closed",
  });
  await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("would-land"));
  assert.match(state.history.find((e) => e.type === "land-rejected").detail, /#2 already merged/);
  assert.deepEqual(nums(state.inFlight.prs), [1], "the rest is recomposed, as before");
});

test("live: a PR merged by another path during CI is still dropped and the rest recomposed", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1, 2]);
  h.runCi(f.candidateSha);
  Object.assign(h.gh.pulls.get(2), { merged: true, state: "closed" });
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.world.lands, []);
  assert.ok(!types(state).includes("would-land"));
  assert.match(state.history.find((e) => e.type === "land-rejected").detail, /#2 already merged/);
  assert.deepEqual(nums(state.inFlight.prs), [1]);
});

test("shadow: a base-red pause still comments on the base-red issue (an issue the queue owns)", async () => {
  const h = createHarness({ mode: "shadow" });
  h.world.brokenBases.add(BASE0);
  h.gh.issues.push({
    number: 900,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
    updatedAt: "",
  });
  const f = await startBatch(h, [1]);
  h.runCi(f.candidateSha);
  await h.tick(); // red while a base-red issue is open → base-check
  h.runCi(BASE0, { kind: "base-check" });
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "base-red");
  assert.deepEqual(
    h.writesOf("commentOnce").map((w) => w.args[0]),
    [900],
    "issue comments are not PR writes"
  );
  assert.deepEqual(prWrites(h), []);
});

// ─────────────────── no state commit when nothing changed (M11) ───────────────────

/** Commits on the state branch so far (the first save creates the branch, later ones PUT). */
const stateSaves = (h) =>
  h.writesOf("putFileContent").length + h.writesOf("createOrphanBranch").length;

test("idle ticks write the state once: an unchanged state is not saved again", async () => {
  const h = createHarness();
  const first = await h.tick(); // no state yet: the first tick creates the document
  assert.equal(stateSaves(h), 1);
  const saved = await h.state();
  assert.equal(saved.updatedAt, h.clock.now());

  h.clock.advance(5);
  const second = await h.tick();
  h.clock.advance(5);
  await h.tick();
  assert.equal(stateSaves(h), 1, "two more idle ticks: no commit on the state branch");
  assert.deepEqual(await h.state(), saved, "the stored document is untouched");
  assert.deepEqual(second.state, saved, "the tick reports the state as stored");
  assert.ok(second.decisions.some((d) => /state unchanged: not saved/.test(d)));
  assert.ok(!first.decisions.some((d) => /state unchanged/.test(d)));
  assert.equal(h.world.upserts.length, 3, "the dashboard is still refreshed every tick");
});

test("a candidate whose checks are pending costs no state commit per tick", async () => {
  const h = createHarness();
  const f = await startBatch(h, [1, 2]);
  assert.equal(stateSaves(h), 1);
  // A stray candidate ref of this base, referenced by no state.
  const stray = candidateRef(BASE, "b99", fakeSha("stray"));
  h.gh.branches.set(stray, fakeSha("stray"));
  for (let i = 0; i < 3; i++) {
    h.clock.advance(5);
    await h.tick();
  }
  assert.equal(stateSaves(h), 1, "pending: nothing to record");
  assert.equal(h.gh.branches.get(f.candidateRef), f.candidateSha, "the in-flight ref is kept");
  assert.equal(h.gh.branches.has(stray), false, "ref cleanup does not depend on a save");
  assert.deepEqual((await h.state()).inFlight, f);

  h.runCi(f.candidateSha);
  await h.tick();
  assert.equal(stateSaves(h), 3, "a verdict is a change: the landing marker, then the state");
  assert.equal((await h.state()).inFlight, null);
  assert.equal(h.gh.branches.has(f.candidateRef), false, "superseded ref deleted after the save");
});

test("an unchanged state is still saved as a heartbeat once per STATE_HEARTBEAT_MINUTES", async () => {
  assert.equal(STATE_HEARTBEAT_MINUTES, 60);
  const h = createHarness();
  await h.tick();
  const t0 = (await h.state()).updatedAt;
  h.clock.advance(STATE_HEARTBEAT_MINUTES - 1);
  await h.tick();
  assert.equal(stateSaves(h), 1, "59 min: the last heartbeat is still fresh");
  assert.equal((await h.state()).updatedAt, t0);

  h.clock.advance(1);
  await h.tick();
  assert.equal(stateSaves(h), 2, "60 min: heartbeat");
  const t1 = (await h.state()).updatedAt;
  assert.equal(t1, h.clock.now());
  assert.equal(Date.parse(t1) - Date.parse(t0), STATE_HEARTBEAT_MINUTES * 60_000);
  assert.deepEqual(
    { ...(await h.state()), updatedAt: t0 },
    {
      ...initialState(BASE, t0),
    }
  );

  h.clock.advance(5);
  await h.tick();
  assert.equal(stateSaves(h), 2, "the interval starts again from the heartbeat");
});

test("every real change is saved, whatever the age of the last save", async () => {
  const h = createHarness({ mode: "shadow" });
  await h.tick();
  await h.tick();
  assert.equal(stateSaves(h), 1);

  await h.tick({ action: "pause", reason: "maintenance" });
  assert.equal(stateSaves(h), 2, "pause");
  await h.tick();
  assert.equal(stateSaves(h), 2, "paused and idle: unchanged");
  await h.tick({ action: "resume" });
  assert.equal(stateSaves(h), 3, "resume");

  h.addPr(1);
  await h.tick();
  assert.equal(stateSaves(h), 4, "batch started");
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  await h.tick();
  assert.equal(stateSaves(h), 5, "would-land");
  await h.tick();
  assert.equal(stateSaves(h), 5, "shadow-processed head: nothing new");

  // The PR closes: its shadow bookkeeping is pruned, which is a change of the document.
  h.gh.pulls.get(1).state = "closed";
  await h.tick();
  assert.equal(stateSaves(h), 6, "shadow.processed pruned");
  assert.deepEqual((await h.state()).shadow.processed, {});
});

test("a tick that changes the state still loses the compare-and-swap to a concurrent writer", async () => {
  const h = createHarness();
  await h.tick();
  await h.tick(); // unchanged: not saved, so its version was never written
  h.addPr(1);
  loseNextSave(h);
  await assert.rejects(h.tick(), StateConflictError);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [1]);
  assert.ok(types(state).includes("error"), "the concurrent writer's event survived");
});

test("a resume that names a pause clears only that pause", async () => {
  // The CLI sends `expect-pause:<since>` with a resume. A resume that waited in the tick's
  // concurrency group must not clear a newer pause (a safety pause recorded meanwhile).
  const h = createHarness();
  await h.tick({ action: "pause", reason: "first" });
  const first = (await h.state()).paused.since;
  await h.tick({ action: "resume", reason: `expect-pause:${first}` });
  assert.equal((await h.state()).paused, null, "the pause it named is cleared");

  h.clock.advance(1);
  await h.tick({ action: "pause", reason: "second" });
  const second = (await h.state()).paused.since;
  assert.notEqual(second, first);
  await h.tick({ action: "resume", reason: `expect-pause:${first}` });
  const state = await h.state();
  assert.equal(state.paused?.since, second, "a stale resume leaves the newer pause alone");
  assert.equal(state.history.at(-1).type, "paused", "and records no resumed event");

  await h.tick({ action: "resume" });
  assert.equal((await h.state()).paused, null, "a resume without a target still clears any pause");
});

// ─────────────────────────── manual bless (the explicit emergency exit) ───────────────────────────

const BLESS_SHA = fakeSha("hotfix-commit");
const RUN_URL = "https://github.com/acme/widgets/actions/runs/77";
const stateWrites = (h) =>
  h.gh.writes.filter((w) => ["putFileContent", "createOrphanBranch"].includes(w.method));

function bless(h, overrides = {}) {
  return runTick(h.deps, {
    base: BASE,
    action: "bless",
    sha: BLESS_SHA,
    reason: "hotfix",
    actor: "diegosouzapw",
    triggeringActor: "diegosouzapw",
    ...overrides,
  });
}

test("bless: an approver's dispatch writes the land status and records manual-bless", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  h.gh.commits.add(BLESS_SHA);
  h.addPr(1); // an eligible PR: a bless tick still composes nothing
  const result = await bless(h);
  assert.deepEqual(
    statusCalls(h).map((c) => [c.client, ...c.args]),
    [
      [
        "app",
        BLESS_SHA,
        {
          state: "success",
          context: "omni-queue/land",
          description: "manual bless by @diegosouzapw: hotfix",
          targetUrl: RUN_URL,
        },
      ],
    ]
  );
  const state = await h.state();
  assert.deepEqual(types(state), ["manual-bless"]);
  const event = state.history[0];
  assert.equal(event.sha, BLESS_SHA);
  assert.equal(event.detail, "by @diegosouzapw: hotfix");
  assert.equal(event.url, RUN_URL, "the run that wrote the status");
  assert.equal(stateWrites(h).length, 1, "the bless is saved");
  assert.deepEqual(h.world.composeCalls, [], "no batch is composed");
  assert.deepEqual(h.world.pushes, []);
  assert.equal(state.inFlight, null);
  assert.ok(result.decisions.some((d) => d.includes(`blessed ${head12(BLESS_SHA)}`)));
});

test("bless: the approver match ignores case, the description is cut to 140 characters", async () => {
  const h = createHarness({ mode: "shadow" });
  h.gh.commits.add(BLESS_SHA);
  const reason = `base repair after a broken sync-back ${"x".repeat(200)}`;
  await bless(h, {
    actor: "DiegoSouzaPW",
    triggeringActor: "diegosouzapw",
    reason: `  ${reason}\n`,
  });
  const [call] = statusCalls(h);
  assert.equal(call.args[1].description.length, 140);
  assert.equal(
    call.args[1].description,
    `manual bless by @DiegoSouzaPW: ${reason}`.slice(0, 140),
    "the reason is trimmed, then the whole description cut"
  );
  assert.equal((await h.state()).history[0].detail, `by @DiegoSouzaPW: ${reason}`);
});

test("bless: an approver re-running another approver's dispatch names both", async () => {
  const h = createHarness({ mode: "live" });
  h.config.approvers = ["diegosouzapw", "second-approver"];
  h.gh.commits.add(BLESS_SHA);
  await bless(h, { actor: "second-approver", triggeringActor: "diegosouzapw" });
  const [call] = statusCalls(h);
  assert.equal(
    call.args[1].description,
    "manual bless by @second-approver (re-run by @diegosouzapw): hotfix"
  );
  assert.equal(
    (await h.state()).history[0].detail,
    "by @second-approver (re-run by @diegosouzapw): hotfix"
  );
});

test("bless: works on a paused queue and leaves the pause and the in-flight batch alone", async () => {
  const h = createHarness({ mode: "live" });
  const f = await startBatch(h, [1]);
  await h.tick({ action: "pause", reason: "base repair" });
  h.runCi(f.candidateSha); // green: a normal tick would land it if it were not paused
  h.gh.commits.add(BLESS_SHA);
  await bless(h);
  const state = await h.state();
  assert.equal(state.paused.detail, "base repair", "still paused");
  assert.equal(state.inFlight.candidateSha, f.candidateSha, "in-flight untouched");
  assert.equal(state.history.at(-1).type, "manual-bless");
  assert.deepEqual(h.world.lands, []);
  assert.deepEqual(
    statusCalls(h).map((c) => c.args[0]),
    [BLESS_SHA]
  );
});

test("bless: a stored withdrawal of the blessed commit goes, so the next tick keeps the blessing", async () => {
  const h = createHarness({ mode: "live" });
  h.gh.commits.add(BLESS_SHA);
  const other = fakeSha("other-stray");
  setLand(h, BLESS_SHA, "success");
  setLand(h, other, "success");
  await storeWithdrawals(h, [storedWithdrawal(BLESS_SHA), storedWithdrawal(other)]);
  await bless(h);
  assert.deepEqual(
    (await h.state()).landWithdrawals,
    [storedWithdrawal(other)],
    "only the blessed commit's entry goes"
  );
  await h.tick();
  assert.equal(newestLand(h, BLESS_SHA), "success", "the approver's blessing stands");
  assert.equal(newestLand(h, other), "failure");
  assert.equal("landWithdrawals" in (await h.state()), false);
});

test("bless: refused for a non-approver, a malformed sha and a sha GitHub does not know", async () => {
  const cases = [
    ["a non-approver", { actor: "mallory" }, /bless refused: @mallory is not an approver/],
    ["no actor", { actor: "" }, /bless refused: no actor \(GITHUB_ACTOR\)/],
    ["no triggering actor", { triggeringActor: "" }, /bless refused: no triggering actor/],
    [
      "an approver re-running a non-approver's dispatch",
      { actor: "mallory", triggeringActor: "diegosouzapw" },
      /bless refused: @mallory is not an approver/,
    ],
    [
      "a non-approver re-running an approver's dispatch",
      { actor: "diegosouzapw", triggeringActor: "mallory" },
      /bless refused: @mallory is not an approver/,
    ],
    ["a malformed sha", { sha: "abc123" }, /bless refused: .*not a full 40-hex commit SHA/],
    ["an upper-case sha", { sha: BLESS_SHA.toUpperCase() }, /not a full 40-hex commit SHA/],
    ["an unknown sha", { sha: fakeSha("nowhere") }, /bless refused: commit [0-9a-f]{12} .*404/],
    ["no reason", { reason: "   " }, /bless refused: a reason is required/],
  ];
  for (const [label, overrides, message] of cases) {
    const h = createHarness({ mode: "live", actor: "owner" });
    h.gh.commits.add(BLESS_SHA);
    await h.tick({ action: "pause", reason: "before" }); // a stored state to compare against
    const before = await h.state();
    const writes = h.gh.writes.length;
    await assert.rejects(
      bless(h, overrides),
      (error) => error instanceof BlessRefusedError && message.test(error.message),
      label
    );
    assert.deepEqual(statusCalls(h), [], `${label}: no status`);
    assert.deepEqual(h.gh.writes.slice(writes), [], `${label}: no write at all`);
    assert.deepEqual(await h.state(), before, `${label}: no event`);
  }
});

test("main: a bless needs both GITHUB_ACTOR and GITHUB_TRIGGERING_ACTOR to be approvers; a refusal exits 1 and records no error", async (t) => {
  const fake = await startFakeGitHub({ token: "ghs_tick_bless", actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  const runnerTemp = mkdtempSync(join(tmpdir(), "omni-queue-tick-bless-"));
  t.after(() => rmSync(runnerTemp, { recursive: true, force: true }));
  const errors = [];
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "error", (line) => errors.push(String(line)));
  const base = "release/v3.8.54";
  const sha = fake.commitFiles({ branch: base, files: { "README.md": "hotfix" } });
  const env = {
    OMNI_QUEUE_TOKEN: "ghs_tick_bless",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    RUNNER_TEMP: runnerTemp,
    GITHUB_ACTOR: "diegosouzapw",
    GITHUB_TRIGGERING_ACTOR: "mallory", // re-run by someone else: the re-runner is who asks
  };
  const argv = ["--base", base, "--action", "bless", "--sha", sha, "--reason", "hotfix"];
  const stateOf = () => {
    const text = fake.readFile(STATE_BRANCH, stateFilePath(base));
    return text === null ? null : JSON.parse(text);
  };

  assert.equal(await main(argv, env), 1);
  assert.match(errors.join("\n"), /bless refused: @mallory is not an approver/);
  assert.equal(fake.statuses.get(sha), undefined, "no status written");
  assert.equal(stateOf(), null, "no event, no error recorded: nothing saved");
  assert.ok(!fake.requests.some((r) => r.method !== "GET"), "a refusal writes nothing");

  const unknown = fakeSha("not-in-the-repository");
  const unknownArgv = argv.map((a) => (a === sha ? unknown : a));
  assert.equal(await main(unknownArgv, { ...env, GITHUB_TRIGGERING_ACTOR: "diegosouzapw" }), 1);
  assert.match(errors.join("\n"), /bless refused: commit [0-9a-f]{12}/);
  assert.equal(stateOf(), null);

  // An approver re-running the failed run of a non-approver's dispatch is refused too: the
  // inputs (sha, reason) are still the original dispatcher's.
  assert.equal(
    await main(argv, { ...env, GITHUB_ACTOR: "mallory", GITHUB_TRIGGERING_ACTOR: "diegosouzapw" }),
    1
  );
  assert.match(errors.at(-1), /bless refused: @mallory is not an approver/);
  assert.equal(fake.statuses.get(sha), undefined, "no status written");
  assert.equal(stateOf(), null);

  // Either variable missing: refused, never a fallback to the other one.
  const { GITHUB_TRIGGERING_ACTOR: _t, ...noTriggering } = env;
  assert.equal(await main(argv, { ...noTriggering, GITHUB_ACTOR: "diegosouzapw" }), 1);
  assert.match(errors.at(-1), /bless refused: no triggering actor/);
  const { GITHUB_ACTOR: _a, ...noActor } = env;
  assert.equal(await main(argv, { ...noActor, GITHUB_TRIGGERING_ACTOR: "diegosouzapw" }), 1);
  assert.match(errors.at(-1), /bless refused: no actor \(GITHUB_ACTOR\)/);
  assert.equal(fake.statuses.get(sha), undefined, "no status written");
  assert.equal(stateOf(), null);
  assert.ok(!fake.requests.some((r) => r.method !== "GET"), "the refusals wrote nothing");

  // The same approver dispatched and (re-)ran it: accepted.
  const plain = { ...env, GITHUB_TRIGGERING_ACTOR: "diegosouzapw" };
  assert.equal(await main(argv, plain), 0, errors.join("\n"));
  const [status] = fake.statuses.get(sha);
  assert.equal(status.context, "omni-queue/land");
  assert.equal(status.state, "success");
  assert.equal(status.description, "manual bless by @diegosouzapw: hotfix");
  assert.equal(status.creator.login, "omni-queue[bot]", "written by the App");
  const state = stateOf();
  assert.deepEqual(
    state.history.map((e) => [e.type, e.sha, e.detail]),
    [["manual-bless", sha, "by @diegosouzapw: hotfix"]]
  );
});

test("main: the owner's land token is redacted like the App token", async (t) => {
  const errors = [];
  t.mock.method(console, "error", (line) => errors.push(String(line)));
  const landToken = "ghp_ownerLandTokenSecret";
  const appToken = "ghs_appTokenSecret";
  const code = await main([], {
    OMNI_QUEUE_TOKEN: appToken,
    OMNI_QUEUE_LAND_TOKEN: landToken,
    GITHUB_REPOSITORY: "acme/widgets",
    // The config error message quotes the path: both secrets reach the printed message.
    OMNI_QUEUE_CONFIG: `/nonexistent/${landToken}-${appToken}.json`,
  });
  assert.equal(code, 1);
  const printed = errors.join("\n");
  assert.match(printed, /setup failed/);
  assert.match(printed, /\/nonexistent\/\*\*\*-\*\*\*\.json/);
  assert.ok(!printed.includes(landToken), "the land token is never printed");
  assert.ok(!printed.includes(appToken), "the App token is never printed");
});

test("createTickDeps: identity precedence: explicit override > owner identity > bot env > appSlug", async (t) => {
  const fake = await startFakeGitHub({ token: "ghs_identity" });
  t.after(() => fake.close());
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-identity-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const writeConfig = (name, landing) => {
    const path = join(dir, name);
    writeFileSync(path, JSON.stringify({ ...loadConfig(), landing }));
    return path;
  };
  const owner = writeConfig("owner.json", {
    mode: "merge-ff",
    actor: "owner",
    identity: { name: "owner", email: "1+owner@users.noreply.github.com" },
    statusContext: "omni-queue/land",
  });
  const app = writeConfig("app.json", { mode: "merge-ff", actor: "app" });
  const base = {
    OMNI_QUEUE_TOKEN: "ghs_identity",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    RUNNER_TEMP: dir,
  };
  const override = { OMNI_QUEUE_GIT_NAME: "tester", OMNI_QUEUE_GIT_EMAIL: "t@example.invalid" };
  const bot = {
    OMNI_QUEUE_BOT_NAME: "omni-queue[bot]",
    OMNI_QUEUE_BOT_EMAIL: "42+omni-queue[bot]@users.noreply.github.com",
  };
  const identity = (config, env) =>
    createTickDeps({ ...base, OMNI_QUEUE_CONFIG: config, ...env }).identity;
  const OWNER = { name: "owner", email: "1+owner@users.noreply.github.com" };
  const BOT = { name: "omni-queue[bot]", email: "42+omni-queue[bot]@users.noreply.github.com" };

  // 1. The explicit override wins over everything.
  assert.deepEqual(identity(owner, { ...override, ...bot }), {
    name: "tester",
    email: "t@example.invalid",
  });
  assert.deepEqual(identity(app, { ...override, ...bot }).name, "tester");
  // An override needs both halves; half of one is ignored.
  assert.deepEqual(identity(owner, { OMNI_QUEUE_GIT_NAME: "tester", ...bot }), OWNER);
  // 2. actor "owner": the owner's landing identity, even with the bot identity in the env
  //    (what the workflow passes on every tick).
  assert.deepEqual(identity(owner, bot), OWNER);
  // 3. actor "app": the bot identity the workflow resolved.
  assert.deepEqual(identity(app, bot), BOT);
  assert.deepEqual(identity(app, { OMNI_QUEUE_BOT_NAME: bot.OMNI_QUEUE_BOT_NAME }), {
    ...botIdentity("omni-queue"),
  });
  // 4. Nothing in the env: derived from config.appSlug.
  assert.deepEqual(identity(app, {}), botIdentity("omni-queue"));
});
