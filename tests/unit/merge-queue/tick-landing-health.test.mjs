// The smaller parked items of the final fix wave (G7): a rate limit on a squash-api merge call is
// retried as an error without a verdict (T13b-a); landings that keep ending without a verdict on a
// base that keeps moving are a stall (T13b-f); an episode opened by failed ticks survives one
// completed tick (M1).
import assert from "node:assert/strict";
import test from "node:test";
import { initialState, validateState } from "../../../scripts/merge-queue/contracts.mjs";
import {
  STALL_LANDINGS_WITHOUT_VERDICT,
  assessHealth,
} from "../../../scripts/merge-queue/dashboard.mjs";
import { landSquashApi } from "../../../scripts/merge-queue/land.mjs";
import {
  LANDING_ATTEMPTS_LIMIT,
  STALL_CLEAR_COMPLETED_TICKS,
  failedTickRecord,
  recordTickFailure,
} from "../../../scripts/merge-queue/tick.mjs";
import { BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const types = (state) => state.history.map((e) => e.type);
const newestLand = (h, sha) =>
  (h.gh.statuses.get(sha) ?? []).find((st) => st.context === "omni-queue/land")?.state ?? null;

/** A tick that throws, recorded as main() records it. Returns the error. */
async function failingTick(h, options) {
  let thrown = null;
  try {
    await h.tick(options);
  } catch (error) {
    thrown = error;
  }
  assert.ok(thrown, "the tick threw");
  await recordTickFailure(
    h.deps,
    BASE,
    thrown.message.slice(0, 500),
    () => {},
    failedTickRecord(thrown)
  );
  return thrown;
}

// ── T13b-a ──

const rateLimited = () =>
  Object.assign(
    new Error(
      "PUT /repos/acme/widgets/pulls/1/merge → 403: retry after 900 s (over the 30000 ms retry " +
        "cap): You have triggered an abuse detection mechanism."
    ),
    { name: "GitHubError", status: 403, rateLimited: true }
  );

test("G7 (T13b-a, probe R-3): landSquashApi keeps the client's rate-limit mark on its merge-failed result; another error carries none", async () => {
  const base = fakeSha("b");
  const tree = fakeSha("t");
  const gh = (error) => ({
    getBranchSha: async () => base,
    mergePull: async () => {
      throw error;
    },
    getCommit: async () => ({ treeSha: tree }),
  });
  const input = {
    base: "release/v9.9.9",
    prs: [{ n: 1, head: fakeSha("h1") }],
    expectedBaseSha: base,
    candidateTreeSha: tree,
  };
  const limited = await landSquashApi({ gh: gh(rateLimited()), ...input });
  assert.equal(limited.ok, false);
  assert.equal(limited.reason, "merge-failed");
  assert.equal(limited.rateLimited, true);
  const plain = await landSquashApi({
    gh: gh(Object.assign(new Error("PUT … → 403: Resource not accessible"), { status: 403 })),
    ...input,
  });
  assert.equal(plain.reason, "merge-failed");
  assert.equal("rateLimited" in plain, false);
});

test("G7 (T13b-a): a rate-limited squash-api merge is retried as an error without a verdict: no merge-failed pause, no land-token hint, the blessing withdrawn", async () => {
  const h = createHarness({ mode: "live", landing: "squash-api", actor: "owner" });
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  h.world.squashResult = {
    ok: false,
    reason: "merge-failed",
    merged: [],
    detail: "#1: 0 PUT /repos/acme/widgets/pulls/1/merge → 403: retry after 900 s",
    rateLimited: true,
  };
  const error = await failingTick(h);
  assert.match(error.message, /hit a rate limit/);
  const state = await h.state();
  assert.equal(state.paused, null, "no merge-failed pause");
  assert.ok(!state.history.some((e) => /OMNI_QUEUE_LAND_TOKEN/.test(e.detail ?? "")), "no hint");
  assert.equal(state.inFlight.landAttempts, 1, "the attempt counts toward the bound");
  assert.equal(state.landingsWithoutVerdict.count, 1, "a landing without a verdict");
  const head = h.gh.pulls.get(1).headSha;
  assert.equal(newestLand(h, head), "failure", "the blessing is withdrawn");
});

// ── T13b-f (a): landings without a verdict on a base that keeps moving ──

test("G7 (T13b-f, probe P-8): three landings in a row without a verdict on a base that keeps moving are a stall, with one alert", async () => {
  assert.equal(STALL_LANDINGS_WITHOUT_VERDICT, LANDING_ATTEMPTS_LIMIT);
  const h = createHarness({ mode: "live", actor: "owner" });
  h.config.approvers = ["octo-approver"];
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  const firstAt = h.clock.now();
  for (let cycle = 0; cycle < 3; cycle++) {
    h.world.landError = new Error(`land: attempt ${cycle + 1} is not available from origin`);
    await failingTick(h);
    let s = await h.state();
    assert.equal(s.landingsWithoutVerdict.count, cycle + 1);
    assert.equal(s.inFlight.landAttempts, 1, "every new candidate starts its own count");
    if (cycle === 2) break;
    h.world.landError = null;
    h.gh.branches.set(BASE, fakeSha(`moved-${cycle}`));
    h.clock.advance(10);
    await h.tick(); // the base moved: recomposed, a new candidate
    s = await h.state();
    h.runCi(s.inFlight.candidateSha);
    h.clock.advance(10);
  }
  const state = await h.state();
  assert.equal(state.paused, null, "no pause: the per-candidate bound never fills");
  assert.equal(types(state).filter((t) => t === "queue-stalled").length, 1);
  assert.equal(state.landingsWithoutVerdict.since, firstAt);
  assert.match(
    state.stalled.reasons.join("\n"),
    /^3 landings in a row ended without a verdict, the first at .*, none landed since: the landing keeps failing$/m
  );
  const mentions = [...h.gh.comments.values()].flat().filter((c) => /@octo-approver/.test(c.body));
  assert.equal(mentions.length, 1);
});

test("G7 (T13b-f): a landing ends the run of landings without a verdict, and so does an operator's pause", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  h.world.landError = new Error("push timed out");
  await failingTick(h);
  assert.equal((await h.state()).landingsWithoutVerdict.count, 1);
  h.world.landError = null;
  h.clock.advance(5);
  await h.tick();
  let state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal(state.landingsWithoutVerdict, undefined, "a landing ends the run");
  h.addPr(2);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  h.world.landError = new Error("push timed out");
  await failingTick(h);
  assert.equal((await h.state()).landingsWithoutVerdict.count, 1);
  h.clock.advance(5);
  await h.tick({ action: "pause", reason: "looking at it" });
  state = await h.state();
  assert.equal(state.landingsWithoutVerdict, undefined, "the operator's fresh start");
});

test("G7 (T13b-f): a landing that answers with another verdict (the base moved under the push) ends the run", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  h.addPr(1);
  await h.tick();
  h.runCi((await h.state()).inFlight.candidateSha);
  h.world.landError = new Error("push timed out");
  await failingTick(h);
  assert.equal((await h.state()).landingsWithoutVerdict.count, 1);
  h.world.landError = null;
  h.world.baseMovesOnLand = fakeSha("merged-meanwhile"); // the push is refused: base-moved
  h.clock.advance(5);
  await h.tick();
  const state = await h.state();
  assert.match(state.history.findLast((e) => e.type === "land-rejected").detail, /base moved/);
  assert.equal(state.landingsWithoutVerdict, undefined, "a verdict ends the run");
});

test("G7 (T13b-f): a landing found by the next tick (its save was lost) ends the run too", async () => {
  const h = createHarness({ mode: "live", actor: "owner" });
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  // The landing goes through; the tick's final save is lost (the landing-stage save, with the
  // run of landings without a verdict counted, is the first put of the tick).
  const realPut = h.gh.putFileContent.bind(h.gh);
  let puts = 0;
  h.gh.putFileContent = async (...args) => {
    puts += 1;
    if (puts === 2) throw new Error("save lost");
    return realPut(...args);
  };
  await failingTick(h);
  h.gh.putFileContent = realPut;
  let state = await h.state();
  assert.equal(h.gh.branches.get(BASE), f.candidateSha, "it landed");
  assert.equal(state.landingsWithoutVerdict.count, 1, "as stored before the blessing");
  h.clock.advance(5);
  await h.tick(); // recordEarlierLanding records the landing
  state = await h.state();
  assert.ok(types(state).includes("landed"));
  assert.equal(state.landingsWithoutVerdict, undefined);
});

test("G7 (T13b-f): assessHealth rule 6 reads the run of landings without a verdict", () => {
  const config = createHarness().config;
  const at = "2026-11-13T12:00:00.000Z";
  const state = (count) => ({
    ...initialState(BASE, at),
    landingsWithoutVerdict: { count, since: "2026-11-13T10:00:00.000Z" },
  });
  assert.equal(assessHealth({ state: state(2), queue: [], config, now: at }).status, "idle");
  const stalled = assessHealth({ state: state(3), queue: [], config, now: at });
  assert.deepEqual(stalled, {
    status: "stalled",
    since: "2026-11-13T10:00:00.000Z",
    reasons: [
      "3 landings in a row ended without a verdict, the first at 2026-11-13 10:00Z, none landed " +
        "since: the landing keeps failing",
    ],
  });
});

// ── M1: one episode for failures broken by one completed tick ──

test("G7 (M1, final review P3): three failures, one completed tick, three failures is one episode and one mention; two completed ticks end it", async () => {
  assert.equal(STALL_CLEAR_COMPLETED_TICKS, 2);
  const h = createHarness({ mode: "shadow" });
  h.config.approvers = ["octo-approver"];
  await h.tick();
  const fail = () => recordTickFailure(h.deps, BASE, "GitHub 502");
  for (let round = 1; round <= 3; round++) {
    for (let i = 0; i < 3; i++) {
      h.clock.advance(5);
      await fail();
    }
    h.clock.advance(5);
    await h.tick(); // one tick completes
    assert.equal((await h.state()).stalled.quietTicks, 1, `round ${round}: held`);
  }
  let state = await h.state();
  assert.equal(types(state).filter((t) => t === "queue-stalled").length, 1, "one episode");
  const alerts = () =>
    [...h.gh.comments.values()].flat().filter((c) => /has stalled/.test(c.body)).length;
  assert.equal(alerts(), 1, "one mention");
  // A failed tick between two completed ones breaks the row: the count starts again.
  h.clock.advance(5);
  await fail();
  assert.equal((await h.state()).stalled.quietTicks, undefined);
  h.clock.advance(5);
  await h.tick();
  assert.equal((await h.state()).stalled.quietTicks, 1);
  h.clock.advance(5);
  await h.tick();
  state = await h.state();
  assert.equal(state.stalled, undefined, "two completed ticks in a row end it");
  // A new run of three failures is a new episode, with its own mention.
  for (let i = 0; i < 3; i++) {
    h.clock.advance(5);
    await fail();
  }
  assert.equal(types(await h.state()).filter((t) => t === "queue-stalled").length, 2);
  assert.equal(alerts(), 2);
});

test("G7 (M1): an episode that did not come from failed ticks ends at the first completed tick that finds no stall", async () => {
  const h = createHarness({ mode: "live" });
  await h.tick({ action: "pause", reason: "a long one" });
  h.clock.advance(121);
  await h.tick();
  assert.ok((await h.state()).stalled, "a manual pause for more than 120 minutes");
  h.clock.advance(5);
  await h.tick({ action: "resume" });
  assert.equal((await h.state()).stalled, undefined);
});

// ── the new fields: validated when present, absent from older documents ──

test("G7: landingsWithoutVerdict and stalled.quietTicks are validated when present; a state without them loads", () => {
  const ok = initialState(BASE, "2026-11-13T12:00:00.000Z");
  assert.deepEqual(validateState(ok), []);
  const run = { count: 2, since: "2026-11-13T11:00:00.000Z" };
  assert.deepEqual(validateState({ ...ok, landingsWithoutVerdict: run }), []);
  for (const bad of [
    null,
    3,
    {},
    { count: 0, since: run.since },
    { count: 1.5, since: run.since },
    { count: 1, since: "x" },
  ]) {
    assert.deepEqual(
      validateState({ ...ok, landingsWithoutVerdict: bad }),
      ["landingsWithoutVerdict"],
      JSON.stringify(bad)
    );
  }
  const episode = { since: run.since, reasons: ["x"], notified: true };
  assert.deepEqual(validateState({ ...ok, stalled: { ...episode, quietTicks: 1 } }), []);
  for (const bad of [0, -1, 1.5, "1", null]) {
    assert.deepEqual(
      validateState({ ...ok, stalled: { ...episode, quietTicks: bad } }),
      ["stalled"],
      JSON.stringify(bad)
    );
  }
});
