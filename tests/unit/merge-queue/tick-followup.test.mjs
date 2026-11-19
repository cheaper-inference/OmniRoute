// Follow-up to the final fix wave (H1 to H6): a repair that keeps failing for infrastructure stops
// being recomposed; a new cause of stall inside an open episode is told; the overflow check after
// a recorded landing is reached; a partial squash-api landing stopped by a rate limit pauses; an
// allowed resume ends the run of landings without a verdict.
import assert from "node:assert/strict";
import test from "node:test";
import { baseRedTitle } from "../../../scripts/merge-queue/contracts.mjs";
import * as realDashboard from "../../../scripts/merge-queue/dashboard.mjs";
import {
  recordTickFailure,
  repairInfraLimit,
  trackStall,
} from "../../../scripts/merge-queue/tick.mjs";
import { APP_BOT as BOT, BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const BASE0 = fakeSha("base-0");
const types = (state) => state.history.map((e) => e.type);
const count = (state, type) => types(state).filter((t) => t === type).length;

/** A base-red pause: batch [1] red like the bare base BASE0 (base check first). */
async function baseRedPause(h) {
  h.world.brokenBases.add(BASE0);
  h.addPr(1);
  await h.tick();
  let s = await h.state();
  for (let i = 0; i < 6 && !s.paused; i++) {
    if (s.inFlight) h.runCi(s.inFlight.candidateSha, { kind: s.inFlight.kind });
    await h.tick();
    s = await h.state();
  }
  assert.equal(s.paused?.reason, "base-red");
  return s;
}

/** The candidates composed for PR `n` (batch-started events naming it). */
const composedFor = (state, n) =>
  state.history.filter((e) => e.type === "batch-started" && (e.prs ?? []).includes(n)).length;

// ── H1 ──

for (const mode of ["live", "shadow"]) {
  test(`H1 (re-review B6, ${mode}): a repair whose CI fails for infrastructure on every run stops after infraRetries + 1 candidates, once told; the pause stays base-red`, async () => {
    const h = createHarness({ mode, infraRetries: 1 });
    h.deps.modules = { ...h.modules, dashboard: realDashboard };
    await baseRedPause(h);
    h.addPr(2);
    h.addLane(2, h.config.lanes.baseRepairLabel);
    h.world.repairs.add(2);
    for (let i = 0; i < 96; i++) {
      // eight hours of five-minute ticks; the repair's CI answers "infra" before the next tick
      h.clock.advance(5);
      await h.tick();
      const s = await h.state();
      if (s.inFlight) h.runCi(s.inFlight.candidateSha, { infra: true });
    }
    const state = await h.state();
    const limit = repairInfraLimit(h.config);
    assert.equal(limit, 2);
    assert.equal(composedFor(state, 2), limit, "at most infraRetries + 1 candidates for that head");
    assert.equal(state.paused.reason, "base-red", "the pause stays");
    assert.equal(state.inFlight, null);
    assert.deepEqual(state.repairInfraDrops, {
      2: { head: h.gh.pulls.get(2).headSha, baseSha: state.paused.baseSha, drops: limit },
    });
    const told = (h.gh.comments.get(2) ?? []).filter((c) =>
      /failed for infrastructure/.test(c.body)
    );
    if (mode === "live") {
      assert.equal(told.length, 1, "one comment on the repair PR");
      assert.match(told[0].body, /failed for infrastructure 2 times on base `[0-9a-f]{12}`/);
      assert.match(
        told[0].body,
        /Removing and re-adding the `omni-queue-base-repair` label does not/
      );
    } else {
      assert.equal(told.length, 0, "shadow mode posts nothing on a pull request");
    }
    const dashboard = h.gh.issues.find((i) => i.title.endsWith(BASE));
    assert.match(
      dashboard.body,
      /Base repair #2 stopped: its CI failed for infrastructure 2 times on base `[0-9a-f]{12}`/
    );
    assert.ok(state.history.length < 200, "the history is not flooded");
  });
}

/** H1: a stopped repair, then `move` changes something; returns the harness. */
async function stoppedRepair() {
  const h = createHarness({ mode: "live", infraRetries: 0 });
  await baseRedPause(h);
  h.addPr(2);
  h.addLane(2, h.config.lanes.baseRepairLabel);
  h.world.repairs.add(2);
  h.clock.advance(5);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha, { infra: true });
  h.clock.advance(5);
  await h.tick();
  const s = await h.state();
  assert.equal(s.inFlight, null, "stopped after one drop (infraRetries 0)");
  h.clock.advance(5);
  await h.tick();
  assert.equal((await h.state()).inFlight, null, "not composed again");
  return h;
}

test("H1: a new head of the repair starts the count again", async () => {
  const h = await stoppedRepair();
  const pull = h.gh.pulls.get(2);
  pull.headSha = fakeSha("head-2-fixed");
  h.clock.advance(5);
  await h.tick();
  let s = await h.state();
  assert.deepEqual(
    s.inFlight.prs.map((p) => p.n),
    [2],
    "composed again"
  );
  assert.equal(s.repairInfraDrops, undefined, "the old head's count is forgotten");
  h.runCi(s.inFlight.candidateSha, { infra: true });
  h.clock.advance(5);
  await h.tick();
  s = await h.state();
  assert.equal(s.repairInfraDrops["2"].head, pull.headSha);
  assert.equal(s.repairInfraDrops["2"].drops, 1);
});

test("H1: a base that moves lifts the pause, and the repair is composed again", async () => {
  const h = await stoppedRepair();
  h.gh.branches.set(BASE, fakeSha("moved"));
  h.clock.advance(5);
  await h.tick();
  const s = await h.state();
  assert.equal(s.paused, null);
  assert.deepEqual(
    s.inFlight.prs.map((p) => p.n),
    [2],
    "the stopped head is composed on the new tip"
  );
});

test("H1: removing and re-adding the base-repair label does not retry a stopped repair", async () => {
  const h = await stoppedRepair();
  const pull = h.gh.pulls.get(2);
  const label = h.config.lanes.baseRepairLabel;
  pull.labels = pull.labels.filter((l) => l !== label);
  h.clock.advance(5);
  await h.tick();
  h.addLane(2, label, { minute: 90 });
  h.clock.advance(5);
  await h.tick();
  assert.equal((await h.state()).inFlight, null);
});

test("H1: repairInfraDrops is validated when present", async () => {
  const { validateState, initialState } =
    await import("../../../scripts/merge-queue/contracts.mjs");
  const ok = initialState(BASE, "2026-11-13T12:00:00.000Z");
  const entry = { head: fakeSha("h"), baseSha: fakeSha("b"), drops: 2 };
  assert.deepEqual(validateState({ ...ok, repairInfraDrops: { 7: entry } }), []);
  for (const bad of [
    null,
    { "07": entry },
    { 7: { ...entry, drops: 0 } },
    { 7: { ...entry, head: "x" } },
    { 7: { ...entry, baseSha: null } },
  ]) {
    assert.deepEqual(validateState({ ...ok, repairInfraDrops: bad }), ["repairInfraDrops"]);
  }
});

// ── H2 ──

test("H2 (re-review B4): an error pause inside an open failed-ticks episode opens a new episode, with its own comment", async () => {
  const h = createHarness({ mode: "live", actor: "owner", landToken: false });
  h.config.approvers = ["octo-approver"];
  h.addPr(1);
  await h.tick();
  for (let i = 0; i < 3; i++) {
    h.clock.advance(5);
    await recordTickFailure(h.deps, BASE, "GitHub 502");
  }
  const mentions = () =>
    [...h.gh.comments.values()].flat().filter((c) => /@octo-approver/.test(c.body));
  assert.equal(mentions().length, 1);
  const first = (await h.state()).stalled;
  assert.deepEqual(first.kinds, ["failed-ticks"]);
  h.runCi((await h.state()).inFlight.candidateSha);
  h.clock.advance(5);
  await h.tick(); // completes and pauses (error): no land token
  let s = await h.state();
  assert.equal(s.paused.reason, "error");
  assert.equal(count(s, "queue-stalled"), 2, "a new episode");
  assert.equal(mentions().length, 2, "a second mention");
  assert.deepEqual(s.stalled.kinds, ["paused:error"]);
  assert.equal(s.stalled.since, s.paused.since);
  for (let i = 0; i < 36; i++) {
    h.clock.advance(5);
    await h.tick();
  }
  s = await h.state();
  assert.equal(count(s, "queue-stalled"), 2, "three hours later: nothing more");
  assert.equal(mentions().length, 2);
});

test("H2: a withdrawal refused for an hour inside an open pause episode is told", async () => {
  const h = createHarness({ mode: "live" });
  await h.tick({ action: "pause", reason: "long" });
  h.clock.advance(121);
  await h.tick();
  assert.equal(count(await h.state(), "queue-stalled"), 1);
  h.clock.advance(1); // the withdrawal is refused after the episode opened
  const x = fakeSha("stuck");
  h.gh.statuses.set(x, [{ context: "omni-queue/land", state: "success", creator: BOT }]);
  const { state, version } = await h.store.load(BASE);
  state.landWithdrawals = [
    {
      sha: x,
      batchId: "b9",
      candidateSha: x,
      why: "left the landing stage",
      since: h.clock.now(),
      attempts: 1,
    },
  ];
  assert.equal((await h.store.save(BASE, state, version, "seed")).ok, true);
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure"
      ? Object.assign(new Error("502"), { status: 502 })
      : null;
  h.clock.advance(61);
  await h.tick();
  const s = await h.state();
  assert.equal(count(s, "queue-stalled"), 2);
  assert.deepEqual(s.stalled.kinds, ["paused:manual", "withdrawal"]);
});

test("H2: an unchanged or reworded cause opens nothing; a new kind that began before the episode opened neither", () => {
  const at = "2026-11-13T13:00:00.000Z";
  const episode = {
    since: "2026-11-13T12:00:00.000Z",
    reasons: ["3 ticks in a row failed, the first at 2026-11-13 12:00Z: ticks are failing"],
    openedAt: "2026-11-13T12:10:00.000Z",
    kinds: ["failed-ticks"],
    notified: true,
  };
  const state = { history: [], stalled: episode };
  const reworded = {
    status: "stalled",
    since: "2026-11-13T12:00:00.000Z",
    reasons: ["5 ticks in a row failed, the first at 2026-11-13 12:00Z: ticks are failing"],
    causes: [{ kind: "failed-ticks", since: "2026-11-13T12:00:00.000Z" }],
  };
  let tracked = trackStall(state, reworded, { at });
  assert.equal(tracked.opened, null);
  assert.equal(tracked.state.stalled, episode);
  const older = {
    ...reworded,
    reasons: [...reworded.reasons, "batch `b1` in flight since …"],
    causes: [...reworded.causes, { kind: "in-flight", since: "2026-11-13T07:00:00.000Z" }],
  };
  tracked = trackStall(state, older, { at });
  assert.equal(tracked.opened, null, "began before the episode opened");
  const newer = {
    ...reworded,
    causes: [...reworded.causes, { kind: "landings", since: "2026-11-13T12:30:00.000Z" }],
  };
  tracked = trackStall(state, newer, { at });
  assert.deepEqual(tracked.opened.kinds, ["failed-ticks", "landings"]);
  assert.equal(tracked.opened.since, "2026-11-13T12:30:00.000Z", "keyed by the new cause");
  assert.equal(tracked.state.history.at(-1).type, "queue-stalled");
});

// ── H3 ──

test("H3 (re-review rr-m29): a repair found landed while the overflow holds an entry keeps the base-red pause until the tick replaces it with the full-list pause", async () => {
  const h = createHarness({ mode: "live" });
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
  assert.equal((await h.state()).paused?.reason, "base-red");
  h.addPr(3);
  h.addLane(3, h.config.lanes.baseRepairLabel);
  h.world.repairs.add(3);
  await h.tick();
  const f = (await h.state()).inFlight;
  assert.equal(f.lane, "base-repair");
  h.runCi(f.candidateSha);
  const realPut = h.gh.putFileContent.bind(h.gh);
  let puts = 0;
  h.gh.putFileContent = async (...args) => {
    puts += 1;
    if (puts === 2) throw new Error("save lost");
    return realPut(...args);
  };
  await assert.rejects(h.tick(), /save lost/);
  h.gh.putFileContent = realPut;
  assert.equal(h.gh.branches.get(BASE), f.candidateSha, "the repair landed");
  // A hand edit: an overflow entry whose commit is still blessed; GitHub refuses the withdrawal.
  const x = fakeSha("ov-x");
  h.gh.statuses.set(x, [{ context: "omni-queue/land", state: "success", creator: BOT }]);
  const { state, version } = await h.store.load(BASE);
  state.landWithdrawalsOverflow = [
    { sha: x, batchId: "b77", candidateSha: x, why: "x", since: h.clock.now(), attempts: 1 },
  ];
  assert.equal((await h.store.save(BASE, state, version, "hand edit")).ok, true);
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure"
      ? Object.assign(new Error("403"), { status: 403 })
      : null;
  h.clock.advance(5);
  const result = await h.tick();
  const s = await h.state();
  assert.ok(types(s).includes("landed"), "the repair is recorded as landed");
  assert.ok(
    result.decisions.some((d) => d.includes("base-red pause kept (base repaired by #3)")),
    result.decisions.join("\n")
  );
  assert.ok(!types(s).includes("resumed"), "the pause did not lift");
  assert.equal(s.paused.reason, "error", "replaced by the full-list pause");
  assert.equal(s.landWithdrawalsOverflow.length, 1);
  assert.equal(s.inFlight, null, "no batch started while the overflow holds an entry");
});

// ── H4 ──

test("H4 (re-review rr-squash): a squash-api landing stopped by a rate limit after a PR merged pauses (merge-failed, the merged PR named, no token hint)", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  h.addPr(1);
  h.addPr(2);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  h.world.squashResult = {
    ok: false,
    reason: "merge-failed",
    merged: [1],
    detail: "#2: 0 PUT /repos/acme/widgets/pulls/2/merge → 403: retry after 900 s",
    rateLimited: true,
  };
  await h.tick(); // no throw: a verdict
  const s = await h.state();
  assert.equal(s.paused.reason, "error");
  assert.match(s.paused.detail, /^landing b1 failed \(merge-failed\): #2: /);
  assert.doesNotMatch(s.paused.detail, /OMNI_QUEUE_LAND_TOKEN/);
  const error = s.history.findLast((e) => e.type === "error");
  assert.deepEqual(error.prs, [1], "the merged PR is named");
  assert.equal(s.landingsWithoutVerdict, undefined, "a verdict");
});

// ── H6 ──

test("H6: an allowed resume ends the run of landings without a verdict (nothing else in that tick does)", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  await h.tick();
  // Two landings without a verdict earlier, then an infra pause; nothing is in flight, so the
  // resume tick lands nothing (a landing would end the run by itself).
  const { state, version } = await h.store.load(BASE);
  state.landingsWithoutVerdict = { count: 2, since: h.clock.now() };
  state.paused = { reason: "infra", since: h.clock.now(), baseSha: null, detail: "x", issue: null };
  assert.equal((await h.store.save(BASE, state, version, "seed")).ok, true);
  h.clock.advance(5);
  await h.tick();
  assert.equal((await h.state()).landingsWithoutVerdict.count, 2, "a tick alone keeps it");
  h.clock.advance(5);
  await h.tick({ action: "resume" });
  const s = await h.state();
  assert.equal(s.paused, null);
  assert.ok(!types(s).includes("landed"));
  assert.equal(s.landingsWithoutVerdict, undefined);
});

test("H6: the log of a refused retry gives the count as a lower bound, with the entry's since", async () => {
  const h = createHarness({ mode: "live" });
  await h.tick();
  const x = fakeSha("stuck-log");
  h.gh.statuses.set(x, [{ context: "omni-queue/land", state: "success", creator: BOT }]);
  const since = h.clock.now();
  const { state, version } = await h.store.load(BASE);
  state.landWithdrawals = [
    { sha: x, batchId: "b9", candidateSha: x, why: "error", since, attempts: 3 },
  ];
  assert.equal((await h.store.save(BASE, state, version, "seed")).ok, true);
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure"
      ? Object.assign(new Error("502"), { status: 502 })
      : null;
  h.clock.advance(5);
  const result = await h.tick();
  assert.ok(
    result.decisions.some((d) => d.includes(`(at least 4 failed attempts since ${since})`)),
    result.decisions.join("\n")
  );
});
