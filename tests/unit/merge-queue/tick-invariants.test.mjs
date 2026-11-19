// Invariants of the tick that no test pinned (final fix wave, G5): each test here fails under one
// of the whole-branch review's surviving mutations (muts1.json, muts2.json, muts3.out) and under
// T13b-e. The mutation runs are recorded in the wave's report.
import assert from "node:assert/strict";
import test from "node:test";
import { candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import { APP_BOT, BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const BASE0 = fakeSha("base-0");
const types = (state) => state.history.map((e) => e.type);
const nums = (prs) => prs.map((p) => p.n);
const newestLand = (h, sha) =>
  (h.gh.statuses.get(sha) ?? []).find((st) => st.context === "omni-queue/land")?.state ?? null;

/** The App's `success` land status on `sha` (a blessing a tick left behind). */
function blessed(h, sha) {
  h.gh.statuses.set(sha, [
    { context: "omni-queue/land", state: "success", description: "checks green", creator: APP_BOT },
    ...(h.gh.statuses.get(sha) ?? []),
  ]);
}

async function patchState(h, patch) {
  const { state, version } = await h.store.load(BASE);
  const next = typeof patch === "function" ? patch(state) : { ...state, ...patch };
  assert.equal((await h.store.save(BASE, next, version, "seed")).ok, true);
}

/** A green verdict for the base tip: a red batch on it is blamed on its PRs (pr-red). */
const greenBase = (h) =>
  patchState(h, (state) => ({
    ...state,
    baseChecks: [
      {
        baseSha: BASE0,
        ref: candidateRef(BASE, "b0", BASE0),
        status: "green",
        startedAt: "2026-11-13T10:30:00.000Z",
        signatures: [],
      },
    ],
  }));

/** The stored in-flight batch is at the landing stage and its candidate carries the App's success. */
async function atLandingStage(h) {
  let f;
  await patchState(h, (state) => {
    f = state.inFlight;
    return { ...state, inFlight: { ...f, stage: "landing" } };
  });
  blessed(h, f.candidateSha);
  return f;
}

/** A red batch [1, 2] (culprit #2) on a green base, ticked once: its failed jobs are re-run. */
async function redBatchRerun(h) {
  await greenBase(h);
  h.world.culprits.add(2);
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  return f;
}

// ── a batch at the landing stage leaves it while it waits for a re-run ──

test("G5 (M10a): waitForRerun with the re-run's attempt in flight takes a batch at the landing stage back to testing: its status is withdrawn", async () => {
  const h = createHarness({ mode: "live", flakyReruns: 1 });
  const f = await redBatchRerun(h);
  await h.tick(); // red: the failed jobs are re-run, attempt 2 queued
  assert.ok(types(await h.state()).includes("flaky-rerun"));
  await atLandingStage(h);
  h.clock.advance(5);
  await h.tick();
  const state = await h.state();
  assert.ok(state.inFlight.rerun, "still waiting for the re-run");
  assert.equal(state.inFlight.stage, "testing");
  assert.equal(newestLand(h, f.candidateSha), "failure", "a waiting batch keeps no blessing");
});

test("G5 (M10b): waitForRerun before the re-run shows takes a batch at the landing stage back to testing", async () => {
  const h = createHarness({ mode: "live", flakyReruns: 1 });
  const f = await redBatchRerun(h);
  h.gh.rerunHidden = true; // the call is accepted; the run still shows its first attempt
  await h.tick();
  assert.ok((await h.state()).inFlight.rerun);
  await atLandingStage(h);
  h.clock.advance(5);
  const result = await h.tick();
  const state = await h.state();
  assert.ok(
    result.decisions.some((d) => d.includes("waiting for the re-run of its failed jobs")),
    result.decisions.join("\n")
  );
  assert.equal(state.inFlight.stage, "testing");
  assert.equal(newestLand(h, f.candidateSha), "failure");
});

test("G5 (M10c): rerunFailed adopting a re-run a person started takes a batch at the landing stage back to testing", async () => {
  const h = createHarness({ mode: "live", flakyReruns: 1 });
  const f = await redBatchRerun(h);
  h.manualRerun(f.candidateSha); // somebody clicked "Re-run failed jobs"
  await atLandingStage(h);
  const result = await h.tick();
  const state = await h.state();
  assert.ok(
    result.decisions.some((d) => d.includes("a re-run of its failed jobs is in flight")),
    result.decisions.join("\n")
  );
  assert.ok(state.inFlight.rerun, "adopted");
  assert.equal(state.inFlight.stage, "testing");
  assert.equal(newestLand(h, f.candidateSha), "failure");
});

// ── a lane survives recomposition ──

/** A hotfix batch of PR #1, green, in flight. */
async function greenHotfix(h) {
  h.addPr(1);
  h.addLane(1, h.config.lanes.hotfixLabel);
  await h.tick();
  const f = (await h.state()).inFlight;
  assert.equal(f.lane, "hotfix");
  h.runCi(f.candidateSha);
  return f;
}

test("G5 (M17a): a lane batch recomposed because the base moved keeps its lane", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenHotfix(h);
  h.gh.branches.set(BASE, fakeSha("moved"));
  await h.tick();
  const state = await h.state();
  assert.match(state.history.findLast((e) => e.type === "land-rejected").detail, /base moved/);
  assert.notEqual(state.inFlight.candidateSha, f.candidateSha, "recomposed");
  assert.equal(state.inFlight.lane, "hotfix");
});

test("G5 (M17b): a lane batch recomposed because a PR left it before landing keeps its lane (a stored lane batch of two)", async () => {
  // A lane batch is composed with one PR; a stored one with two (a hand edit) is the only way to
  // reach this recomposition with PRs left, and the code must keep the lane there too.
  const h = createHarness({ mode: "live" });
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  await patchState(h, (state) => ({ ...state, inFlight: { ...state.inFlight, lane: "hotfix" } }));
  const f = (await h.state()).inFlight;
  assert.deepEqual(nums(f.prs), [1, 2]);
  h.runCi(f.candidateSha);
  h.gh.pulls.get(2).labels = []; // #2 leaves the queue
  await h.tick();
  const state = await h.state();
  assert.match(
    state.history.findLast((e) => e.type === "land-rejected").detail,
    /batch changed before landing/
  );
  assert.deepEqual(nums(state.inFlight.prs), [1]);
  assert.equal(state.inFlight.lane, "hotfix");
});

test("G5 (M17c): a lane batch whose candidate is gone from origin is recomposed in its lane", async () => {
  const h = createHarness({ mode: "live" });
  const f = await greenHotfix(h);
  h.gh.branches.delete(f.candidateRef); // the ref is deleted; GitHub no longer serves the object
  await h.tick();
  const state = await h.state();
  assert.match(state.history.findLast((e) => e.type === "error").detail, /is gone from origin/);
  assert.equal(state.inFlight.lane, "hotfix");
  assert.deepEqual(nums(state.inFlight.prs), [1]);
});

// ── the base-red pause and the base-repair lane ──

/** A base-red pause: batch [1, 2] red like the bare base BASE0. */
async function baseRedPause(h) {
  h.world.brokenBases.add(BASE0);
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  await h.tick(); // red on a base with no verdict → base check
  h.runCi(BASE0, { kind: "base-check" });
  await h.tick(); // the base fails the same way → base-red pause
  const state = await h.state();
  assert.equal(state.paused?.reason, "base-red");
  assert.equal(state.inFlight, null);
  return state;
}

test("G5 (M27): under a base-red pause a hotfix PR is not composed; only a base repair is", async () => {
  const h = createHarness({ mode: "live" });
  await baseRedPause(h);
  h.addPr(3);
  h.addLane(3, h.config.lanes.hotfixLabel);
  h.clock.advance(5);
  await h.tick();
  let state = await h.state();
  assert.equal(state.inFlight, null, "a hotfix waits for the pause to lift");
  assert.equal(state.paused.reason, "base-red");
  h.addPr(4);
  h.addLane(4, h.config.lanes.baseRepairLabel);
  h.clock.advance(5);
  await h.tick();
  state = await h.state();
  assert.equal(state.inFlight?.lane, "base-repair");
  assert.deepEqual(nums(state.inFlight.prs), [4]);
});

test("G5 (M46): the FIFO never takes a base-repair PR, even one its lane does not compose (a tried head)", async () => {
  const h = createHarness({ mode: "live" });
  h.addPr(1);
  const head2 = h.addPr(2);
  h.addLane(2, h.config.lanes.baseRepairLabel);
  await patchState(h, { repairTried: { 2: head2 } });
  await h.tick();
  const state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [1], "the FIFO batch leaves the repair PR out");
  assert.equal(state.inFlight.lane, undefined);
});

test("G5 (M47): a repair that fails like the base leaves the base-red pause exactly as it was", async () => {
  const h = createHarness({ mode: "live" });
  const paused = (await baseRedPause(h)).paused;
  const pauses = (state) => types(state).filter((t) => t === "base-red-paused").length;
  const before = pauses(await h.state());
  h.addPr(3);
  h.addLane(3, h.config.lanes.baseRepairLabel); // not a repair: the base stays broken
  h.clock.advance(5);
  await h.tick();
  const f = (await h.state()).inFlight;
  assert.equal(f.lane, "base-repair");
  h.runCi(f.candidateSha);
  h.clock.advance(5);
  await h.tick();
  const state = await h.state();
  assert.deepEqual(state.repairTried, { 3: f.prs[0].head }, "the repair did not fix the base");
  assert.deepEqual(state.paused, paused, "the same pause: reason, since, detail, issue");
  assert.equal(pauses(state), before, "no second base-red-paused event");
});

test("G5 (T13b-e): entries of the main withdrawal list alone do not block the automatic lift of a base-red pause", async () => {
  const h = createHarness({ mode: "live" });
  await baseRedPause(h);
  const stray = fakeSha("stray");
  blessed(h, stray);
  await patchState(h, {
    landWithdrawals: [
      {
        sha: stray,
        batchId: "b9",
        candidateSha: stray,
        why: "left the landing stage",
        since: h.clock.now(),
        attempts: 1,
      },
    ],
  });
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure"
      ? Object.assign(new Error("502"), { status: 502 })
      : null;
  const tip = fakeSha("repaired-by-hand");
  h.gh.branches.set(BASE, tip);
  h.clock.advance(5);
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused, null, "lifted: the base moved");
  assert.match(state.history.findLast((e) => e.type === "resumed").detail, /^base moved /);
  assert.equal(state.landWithdrawals.length, 1, "the entry is still stored and retried");
});

// ── markLanding drops the stored withdrawals of the commits it blesses ──

test("G5 (M22): the landing-stage save drops a stored withdrawal of the commit it is about to bless", async () => {
  const h = createHarness({ mode: "live" });
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  // An earlier attempt left the App's success and a refused withdrawal of the same candidate.
  blessed(h, f.candidateSha);
  await patchState(h, {
    landWithdrawals: [
      {
        sha: f.candidateSha,
        batchId: f.batchId,
        candidateSha: f.candidateSha,
        why: "error",
        since: h.clock.now(),
        attempts: 1,
      },
    ],
  });
  // GitHub refuses the failure writes, so the retry pass keeps the entry until markLanding.
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure"
      ? Object.assign(new Error("502"), { status: 502 })
      : null;
  let atLanding = null;
  const land = h.modules.land;
  h.deps.modules = {
    ...h.modules,
    land: {
      ...land,
      async landMergeFf(input) {
        atLanding = await h.state(); // the state markLanding saved before the blessing
        return land.landMergeFf(input);
      },
    },
  };
  await h.tick();
  assert.equal(atLanding.inFlight.stage, "landing");
  assert.equal(atLanding.landWithdrawals, undefined, "dropped in the landing-stage save");
  const state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal(newestLand(h, f.candidateSha), "success", "the landed commit keeps its blessing");
});
