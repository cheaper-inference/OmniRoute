// Stored land-status withdrawals are queue work (final fix wave, G1): the base that holds one is
// still visited when no labelled PR targets it, the health check reports one refused for more
// than an hour, a refusal that changes only the count saves nothing, a base-red pause loaded with
// overflow entries becomes the full-list pause, and the candidate ref of a stored commit stays.
import assert from "node:assert/strict";
import test from "node:test";
import {
  DASHBOARD_LABEL,
  baseRedTitle,
  candidateRef,
  dashboardTitle,
  initialState,
} from "../../../scripts/merge-queue/contracts.mjs";
import * as realDashboard from "../../../scripts/merge-queue/dashboard.mjs";
import {
  discoverBases,
  failedTickRecord,
  recordTickFailure,
} from "../../../scripts/merge-queue/tick.mjs";
import { BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const types = (state) => state.history.map((e) => e.type);
const landStatuses = (h, sha) =>
  (h.gh.statuses.get(sha) ?? []).filter((s) => s.context === "omni-queue/land").map((s) => s.state);
const refused = () => Object.assign(new Error("POST statuses → 502: Bad Gateway"), { status: 502 });

/** GitHub refuses every `failure` land status while `when()` is true. */
function refuseFailures(h, when = () => true) {
  h.gh.writeError = (method, args) =>
    method === "createCommitStatus" && args[1].state === "failure" && when() ? refused() : null;
}

/** A stored withdrawal of `sha` (a `failure` GitHub refused in an earlier tick). */
const stored = (sha, extra = {}) => ({
  sha,
  batchId: "b7",
  candidateSha: sha,
  why: "left the landing stage",
  since: "2026-11-13T11:30:00.000Z",
  attempts: 1,
  ...extra,
});

async function seed(h, patch) {
  const { state, version } = await h.store.load(BASE);
  assert.equal((await h.store.save(BASE, { ...state, ...patch }, version, "seed")).ok, true);
}

/** The App's `success` land status on `sha`, as a blessing leaves it. */
function blessed(h, sha) {
  h.gh.statuses.set(sha, [
    { context: "omni-queue/land", state: "success", description: "x", creator: "omni-queue[bot]" },
    ...(h.gh.statuses.get(sha) ?? []),
  ]);
}

/**
 * A live batch blessed by a tick whose landing threw and whose withdrawal GitHub refused (the
 * failure path stores it), as main() records such a tick. Returns the batch.
 */
async function strandedBlessing(h, prs = [1]) {
  for (const n of prs) h.addPr(n);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  h.world.landError = new Error("push timed out");
  let thrown = null;
  try {
    await h.tick();
  } catch (error) {
    thrown = error;
  }
  assert.ok(thrown, "the landing tick threw");
  await recordTickFailure(
    h.deps,
    BASE,
    thrown.message.slice(0, 500),
    () => {},
    failedTickRecord(thrown)
  );
  h.world.landError = null;
  assert.equal((await h.state()).landWithdrawals?.length, 1, "the refused withdrawal is stored");
  return f;
}

test("G1 (final review probe3): after the label is removed, the next scheduled ticks still visit the base, retry the entry and end with failure", async () => {
  const h = createHarness({ mode: "live" });
  h.deps.modules = { ...h.modules, dashboard: realDashboard };
  let refusing = true;
  refuseFailures(h, () => refusing);
  const f = await strandedBlessing(h);
  // The approver removes the queue label: the batch is dropped before landing; still refused.
  h.gh.pulls.get(1).labels = [];
  h.clock.advance(5);
  await h.tick();
  let state = await h.state();
  assert.equal(state.inFlight, null, "dropped");
  assert.equal(landStatuses(h, f.candidateSha)[0], "success", "the blessing still stands");
  assert.equal(h.gh.branches.get(f.candidateRef), f.candidateSha, "its candidate ref is kept");
  // GitHub accepts the App's writes again. What a scheduled run (no --base) visits:
  refusing = false;
  const visited = [];
  for (let i = 0; i < 3; i++) {
    h.clock.advance(5);
    const bases = await discoverBases(h.deps);
    visited.push(bases);
    for (const base of bases) {
      assert.equal(base, BASE);
      await h.tick();
    }
  }
  assert.deepEqual(visited[0], [BASE], "found through its open dashboard issue");
  state = await h.state();
  assert.equal("landWithdrawals" in state, false, "the entry is gone");
  assert.equal(landStatuses(h, f.candidateSha)[0], "failure", "the blessing is withdrawn");
  assert.equal(h.gh.branches.get(BASE), f.baseSha, "the base never moved");
  assert.equal(h.gh.branches.has(f.candidateRef), false, "a stray once the entry is gone");
  assert.deepEqual(visited.at(-1), [], "no work left: the base drops out");
});

test("G1 (final review P7): an entry refused for more than an hour opens one stalled episode with one comment, while other batches land", async () => {
  const h = createHarness({ mode: "live" });
  h.config.approvers = ["octo-approver"];
  refuseFailures(h);
  const f = await strandedBlessing(h);
  // The base moves under the batch: recomposed, the old candidate keeps the App's success.
  h.gh.branches.set(BASE, fakeSha("moved"));
  for (let i = 0; i < 30; i++) {
    h.clock.advance(5);
    const s = await h.state();
    if (s.inFlight && i % 3 === 0) h.runCi(s.inFlight.candidateSha);
    await h.tick();
  }
  const state = await h.state();
  assert.equal(landStatuses(h, f.candidateSha)[0], "success", "still refused");
  assert.equal(state.landWithdrawals.length, 1);
  assert.equal(types(state).filter((t) => t === "queue-stalled").length, 1, "one episode");
  assert.match(state.stalled.reasons.join("\n"), /stored land-status withdrawals not written/);
  assert.equal(state.stalled.notified, true);
  const mentions = [...h.gh.comments.values()].flat().filter((c) => /@octo-approver/.test(c.body));
  assert.equal(mentions.length, 1, "one comment mentions the approvers");
  assert.ok(types(state).includes("landed"), "the queue kept landing other batches");
});

test("G1: a tick whose only change is the count of a stored withdrawal saves nothing", async () => {
  const h = createHarness({ mode: "live" });
  const sha = fakeSha("stuck");
  blessed(h, sha);
  await seed(h, { landWithdrawals: [stored(sha, { since: h.clock.now() })] });
  refuseFailures(h);
  const saves = h.writesOf("putFileContent").length;
  for (let i = 0; i < 5; i++) {
    h.clock.advance(5);
    const result = await h.tick();
    assert.ok(
      result.decisions.some((d) => d.startsWith("state unchanged: not saved")),
      result.decisions.join("\n")
    );
  }
  assert.equal(h.writesOf("putFileContent").length, saves, "no state commit per tick");
  assert.equal((await h.state()).landWithdrawals[0].attempts, 1);
});

test("G1: discoverBases visits a dashboard base whose only record is a stored withdrawal or a stalled episode, never an idle one", async () => {
  const h = createHarness();
  const bases = ["release/v1.0.0", "release/v2.0.0", "release/v3.0.0", "release/v4.0.0"];
  const [withMain, withOverflow, withEpisode, idle] = bases;
  const entry = stored(fakeSha("w"));
  const states = {
    [withMain]: { landWithdrawals: [entry] },
    [withOverflow]: { landWithdrawalsOverflow: [entry] },
    [withEpisode]: { stalled: { since: "2026-11-13T10:00:00.000Z", reasons: ["x"] } },
    [idle]: {},
  };
  for (const base of bases) {
    await h.store.save(base, { ...initialState(base), ...states[base] }, null, "seed");
    h.gh.issues.push({
      number: h.gh.issues.length + 1,
      title: dashboardTitle(base),
      body: "",
      labels: [DASHBOARD_LABEL],
      state: "open",
    });
  }
  assert.deepEqual(await discoverBases(h.deps), [withMain, withOverflow, withEpisode]);
});

test("G1: main()'s failure path creates the dashboard issue of a base whose state stores withdrawals and has none open", async () => {
  const h = createHarness({ mode: "live" });
  await seed(h, { landWithdrawals: [stored(fakeSha("w"))] });
  // A person closed the dashboard; no labelled PR targets the base.
  h.gh.issues.push({
    number: 77,
    title: dashboardTitle(BASE),
    body: "old",
    labels: [DASHBOARD_LABEL],
    state: "closed",
  });
  assert.deepEqual(await discoverBases(h.deps), [], "not discoverable");
  await recordTickFailure(h.deps, BASE, "GitHub 502");
  const open = h.gh.issues.filter((i) => i.state === "open" && i.title === dashboardTitle(BASE));
  assert.equal(open.length, 1, "a new dashboard issue");
  assert.deepEqual(await discoverBases(h.deps), [BASE], "the next scheduled tick visits it");
  // Without a stored withdrawal (and no undelivered episode) nothing is created.
  const plain = createHarness({ mode: "live" });
  await recordTickFailure(plain.deps, BASE, "GitHub 502");
  assert.deepEqual(plain.writesOf("createIssue"), []);
});

test("G1 (T13b-b): a base-red pause loaded with overflow entries becomes the full-list pause, says so on its issue, and the dashboard banner no longer says it resumes by itself", async () => {
  const h = createHarness({ mode: "live" });
  h.deps.modules = { ...h.modules, dashboard: realDashboard };
  h.gh.issues.push({
    number: 321,
    title: baseRedTitle(BASE),
    body: "",
    labels: ["base-red"],
    state: "open",
  });
  const x = fakeSha("hand-edited");
  blessed(h, x);
  await seed(h, {
    paused: {
      reason: "base-red",
      since: "2026-11-13T11:50:00.000Z",
      baseSha: h.gh.branches.get(BASE),
      detail: "Unit Tests failing on the base too",
      issue: 321,
    },
    landWithdrawalsOverflow: [stored(x)],
  });
  refuseFailures(h);
  await h.tick();
  const state = await h.state();
  assert.equal(state.paused.reason, "error");
  assert.equal(state.paused.since, h.clock.now());
  const notes = (h.gh.comments.get(321) ?? []).filter((c) =>
    /will not resume by itself/.test(c.body)
  );
  assert.equal(notes.length, 1);
  const dashboard = h.gh.issues.find((i) => i.title === dashboardTitle(BASE));
  assert.ok(!dashboard.body.includes("Resumes automatically"), dashboard.body);
  assert.match(dashboard.body, /A resume is refused while `landWithdrawalsOverflow` holds entries/);
});

test("G1: the dashboard banner of a base-red pause says it resumes when the base tip moves", () => {
  const body = realDashboard.renderDashboard({
    base: BASE,
    state: {
      ...initialState(BASE, "2026-11-13T12:00:00.000Z"),
      paused: {
        reason: "base-red",
        since: "2026-11-13T11:00:00.000Z",
        baseSha: null,
        detail: "x",
        issue: null,
      },
    },
    queue: [],
    config: createHarness().config,
    now: "2026-11-13T12:00:00.000Z",
    runUrl: null,
  });
  assert.ok(body.includes("> Resumes automatically when the base tip moves.\n"), body);
  assert.ok(!body.includes("turns green"));
});

test("G1: cleanupRefs keeps the candidate ref of a commit a stored withdrawal names, and removes it once the entry is gone", async () => {
  const h = createHarness({ mode: "live" });
  const sha = fakeSha("kept-candidate");
  const ref = candidateRef(BASE, "b7", sha);
  const stray = candidateRef(BASE, "b8", fakeSha("stray"));
  h.gh.branches.set(ref, sha);
  h.gh.branches.set(stray, fakeSha("stray"));
  blessed(h, sha);
  await seed(h, { landWithdrawals: [stored(sha)] });
  let refusing = true;
  refuseFailures(h, () => refusing);
  await h.tick();
  assert.equal(h.gh.branches.get(ref), sha, "kept while the entry is stored");
  assert.equal(h.gh.branches.has(stray), false, "a stray is deleted");
  refusing = false;
  h.clock.advance(5);
  await h.tick();
  assert.equal("landWithdrawals" in (await h.state()), false);
  assert.equal(h.gh.branches.has(ref), false, "a stray once the entry is gone");
});
