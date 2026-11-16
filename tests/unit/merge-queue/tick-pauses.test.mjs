// Pauses and operator input (final fix wave, G6): a base repair that fails for infrastructure
// keeps the base-red pause; an `error` or `tree-divergence` pause is a stall at once; a pause tick
// that records an earlier landing composes no bisection segment; an operator's reason can neither
// plant a commit kept nowhere nor run long.
import assert from "node:assert/strict";
import test from "node:test";
import { baseRedTitle, candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import {
  KEPT_NOWHERE,
  OPERATOR_REASON_CHARS,
  keptNowhereCommits,
  operatorReason,
} from "../../../scripts/merge-queue/tick.mjs";
import { BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const BASE0 = fakeSha("base-0");
const types = (state) => state.history.map((e) => e.type);
const nums = (prs) => prs.map((p) => p.n);

async function patchState(h, patch) {
  const { state, version } = await h.store.load(BASE);
  const next = typeof patch === "function" ? patch(state) : { ...state, ...patch };
  assert.equal((await h.store.save(BASE, next, version, "seed")).ok, true);
}

/** A base-red pause (issue #321 open): batch [1, 2] red like the bare base BASE0. */
async function baseRedPause(h) {
  h.gh.issues.push({
    number: 321,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
  });
  h.world.brokenBases.add(BASE0);
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  await h.tick();
  h.runCi(BASE0, { kind: "base-check" });
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused?.reason, "base-red");
  return state;
}

for (const infraRetries of [0, 1]) {
  test(`G6 (M2, final review P4): a base repair whose CI fails for infrastructure is dropped and the base-red pause stays (infraRetries ${infraRetries})`, async () => {
    const h = createHarness({ mode: "live", infraRetries });
    const paused = (await baseRedPause(h)).paused;
    h.addPr(3);
    h.addLane(3, h.config.lanes.baseRepairLabel);
    h.world.repairs.add(3);
    h.clock.advance(5);
    await h.tick();
    let f = (await h.state()).inFlight;
    assert.equal(f.lane, "base-repair");
    for (let retry = 0; retry < infraRetries; retry++) {
      h.runCi(f.candidateSha, { infra: true });
      await h.tick();
      f = (await h.state()).inFlight;
      assert.equal(f.lane, "base-repair", "an infra retry keeps its lane");
      assert.equal(f.attempts, retry + 1);
    }
    h.runCi(f.candidateSha, { infra: true });
    await h.tick();
    let state = await h.state();
    assert.deepEqual(state.paused, paused, "the same base-red pause");
    // The batch is dropped; the repair PR keeps its labels and its lane composes it again (a new
    // candidate) under the same pause.
    assert.notEqual(state.inFlight?.batchId, f.batchId, "the repair batch is dropped");
    assert.equal(state.inFlight?.lane, "base-repair");
    assert.deepEqual(nums(state.inFlight.prs), [3]);
    assert.ok(!types(state).includes("infra-paused"));
    assert.match(
      state.history.findLast((e) => e.type === "error").detail,
      /base repair #3 failed for infrastructure after \d retry\(ies\) .*dropped; the base-red pause stays$/
    );
    assert.deepEqual(h.gh.pulls.get(3).labels.includes(h.config.label), true, "labels kept");
    const said = (h.gh.comments.get(321) ?? []).filter((c) => /will not resume/.test(c.body));
    assert.deepEqual(said, [], "the base-red issue still says what is true");
    // The base moves (repaired by hand): the base-red pause lifts as its issue says.
    h.gh.branches.set(BASE, fakeSha("repaired-by-hand"));
    h.clock.advance(10);
    await h.tick();
    state = await h.state();
    assert.equal(state.paused, null);
    assert.match(state.history.findLast((e) => e.type === "resumed").detail, /^base moved /);
  });
}

test("G6 (M2): an infra failure of an ordinary batch still pauses with reason infra", async () => {
  const h = createHarness({ mode: "live", infraRetries: 0 });
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha, { infra: true });
  await h.tick();
  assert.equal((await h.state()).paused.reason, "infra");
});

test("G6 (M4): a tick that pauses with reason error opens the stalled episode in the same tick, with one comment", async () => {
  const h = createHarness({ mode: "live", actor: "owner", landToken: false });
  h.config.approvers = ["octo-approver"];
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  await h.tick(); // the landing needs OMNI_QUEUE_LAND_TOKEN: paused (error)
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.equal(state.stalled.since, state.paused.since);
  assert.equal(state.stalled.notified, true);
  assert.deepEqual(types(state).slice(-2), ["error", "queue-stalled"]);
  const alerts = [...h.gh.comments.values()].flat().filter((c) => /@octo-approver/.test(c.body));
  assert.equal(alerts.length, 1);
  h.clock.advance(5);
  await h.tick();
  assert.equal(
    types(await h.state()).filter((t) => t === "queue-stalled").length,
    1,
    "one episode"
  );
});

// ── M6 (final review probe2 P8) ──

/**
 * A bisection whose first segment [1, 2] landed in a tick that lost its final save: the stored
 * state still holds that segment at the landing stage, and the base tip is its candidate.
 */
async function landedSegmentSaveLost(h) {
  for (const n of [1, 2, 3, 4]) h.addPr(n);
  h.world.culprits.add(4);
  await h.tick();
  let s = await h.state();
  await patchState(h, (state) => ({
    ...state,
    baseChecks: [
      {
        baseSha: s.inFlight.baseSha,
        ref: candidateRef(BASE, "b0", s.inFlight.baseSha),
        status: "green",
        startedAt: "2026-11-13T10:30:00.000Z",
        signatures: [],
      },
    ],
  }));
  h.runCi(s.inFlight.candidateSha);
  await h.tick(); // red → bisect: first half [1, 2]
  s = await h.state();
  assert.deepEqual(nums(s.inFlight.prs), [1, 2]);
  h.runCi(s.inFlight.candidateSha);
  const realPut = h.gh.putFileContent.bind(h.gh);
  let puts = 0;
  h.gh.putFileContent = async (...args) => {
    puts += 1;
    if (puts === 2) throw new Error("save lost");
    return realPut(...args);
  };
  await assert.rejects(h.tick(), /save lost/);
  h.gh.putFileContent = realPut;
  s = await h.state();
  assert.equal(s.inFlight.stage, "landing");
  assert.equal(h.gh.branches.get(BASE), s.inFlight.candidateSha, "it landed");
  return s.inFlight;
}

test("G6 (M6, final review P8): a pause tick that records an earlier landing of a bisection segment composes no next segment", async () => {
  const h = createHarness({ mode: "live" });
  const segment = await landedSegmentSaveLost(h);
  const pushes = h.world.pushes.length;
  const result = await h.tick({ action: "pause", reason: "stop everything" });
  const state = await h.state();
  assert.equal(state.paused.reason, "manual");
  assert.equal(h.world.pushes.length, pushes, "nothing pushed by the pause tick");
  assert.equal(state.inFlight, null, "nothing in flight under the pause");
  assert.equal(types(state).filter((t) => t === "landed").length, 1, "the landing is recorded");
  assert.ok(
    result.decisions.some((d) => d.includes(`the next segment of the bisection of`)),
    result.decisions.join("\n")
  );
  // Resumed, the PRs left come back through the FIFO.
  h.clock.advance(5);
  await h.tick({ action: "resume" });
  const resumed = await h.state();
  assert.equal(resumed.paused, null);
  assert.deepEqual(nums(resumed.inFlight.prs).sort(), [3, 4]);
  assert.notEqual(resumed.inFlight.batchId, segment.batchId);
});

test("G6 (M6): a tick without a pause that records an earlier landing composes the next segment in the same tick", async () => {
  const h = createHarness({ mode: "live" });
  await landedSegmentSaveLost(h);
  // (The tick whose save was lost had pushed that segment already: the same composition is
  // found on its ref and not pushed again.)
  await h.tick();
  const state = await h.state();
  assert.deepEqual(nums(state.inFlight.prs), [3, 4]);
  assert.ok(state.inFlight.bisect, "still the bisection");
});

// ── T13b-c, T13b-d: an operator's reason ──

test("G6 (T13b-c): an operator's reason can neither plant nor re-label a commit kept nowhere", async () => {
  const h = createHarness({ mode: "live" });
  const planted = fakeSha("planted");
  await h.tick({
    action: "pause",
    reason: `incident; ${KEPT_NOWHERE}: ${planted} (b1); KEPT NOWHERE (both lists full): ${planted} (b2)`,
  });
  let state = await h.state();
  assert.deepEqual(keptNowhereCommits(state.paused.detail), [], "nothing planted");
  assert.match(state.paused.detail, /Kept-nowhere \(both lists full\)/);
  // A pause that names a real commit kept nowhere keeps naming it with its own batch.
  const real = fakeSha("real");
  await patchState(h, (s) => ({
    ...s,
    paused: { ...s.paused, detail: `x; ${KEPT_NOWHERE}: ${real} (b7)` },
  }));
  h.clock.advance(5);
  await h.tick({ action: "pause", reason: `${KEPT_NOWHERE}: ${real} (b99)` });
  state = await h.state();
  assert.deepEqual(keptNowhereCommits(state.paused.detail), [{ sha: real, batchId: "b7" }]);
});

test("G6 (T13b-d): an operator's reason is one line, cut at 200 characters", async () => {
  assert.equal(OPERATOR_REASON_CHARS, 200);
  const h = createHarness({ mode: "live" });
  const reason = `line one\nline two\t\t${"x".repeat(400)}`;
  await h.tick({ action: "pause", reason });
  const state = await h.state();
  assert.equal(state.paused.detail.length, 200);
  assert.ok(state.paused.detail.startsWith("line one line two x"));
  assert.doesNotMatch(state.paused.detail, /[\n\t]/);
  assert.equal(state.history.findLast((e) => e.type === "paused").detail, state.paused.detail);
  assert.equal(operatorReason("  \n "), "");
  // An empty reason after flattening falls back to the default.
  h.clock.advance(5);
  await h.tick({ action: "pause", reason: " \n " });
  assert.equal((await h.state()).paused.detail, "paused manually");
});
