// The candidate's verdict counts only the check runs of the JOBS of its own push runs (final fix
// wave, G4): a check run created through the API with a workflow token lands in one of the
// candidate's Actions suites, and must neither turn it green nor hide a failure.
import assert from "node:assert/strict";
import test from "node:test";
import * as realChecks from "../../../scripts/merge-queue/checks.mjs";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import { candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import { FOREIGN_CHECKS_DETAIL } from "../../../scripts/merge-queue/tick.mjs";
import { BASE, createHarness, fakeSha } from "./helpers/tick-fakes.mjs";

const types = (state) => state.history.map((e) => e.type);
const foreignNotes = (state) =>
  state.history.filter(
    (e) => e.type === "error" && String(e.detail ?? "").startsWith(FOREIGN_CHECKS_DETAIL)
  );

/** A harness whose verdicts come from the real checks module (latestByName, supersedes). */
function realChecksHarness(options) {
  const h = createHarness({ mode: "live", ...options });
  h.deps.modules = { ...h.modules, checks: realChecks };
  return h;
}

/** Plant a `success` check run named `name` in the candidate's own suite, after its jobs. */
function plant(h, sha, name = "Gate / CI") {
  const real = h.gh.checkRuns.get(sha);
  const suite = real.find((r) => r.name === name).checkSuiteId;
  h.clock.advance(1);
  const at = h.clock.now();
  const id = 9_999_999;
  h.gh.checkRuns.set(sha, [
    ...real,
    {
      id,
      name,
      status: "completed",
      conclusion: "success",
      startedAt: at,
      completedAt: at,
      htmlUrl: null,
      appSlug: "github-actions",
      output: { title: null, summary: null, text: null },
      checkSuiteId: suite,
    },
  ]);
  // POST /check-runs with any workflow's token: a check run, no job of any workflow run.
  h.gh.nonJobs.add(id);
  h.clock.advance(1);
}

for (const flakyReruns of [0, 1]) {
  test(`G4 (final review P1): a check run planted in the candidate's suite does not turn a red Gate green (flakyReruns ${flakyReruns})`, async () => {
    const h = realChecksHarness({ flakyReruns });
    h.addPr(1);
    h.world.culprits.add(1); // the candidate's CI is red
    await h.tick();
    const f = (await h.state()).inFlight;
    h.runCi(f.candidateSha);
    plant(h, f.candidateSha);
    await h.tick();
    let state = await h.state();
    assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
    assert.ok(!types(state).includes("land-blessed"));
    assert.ok(!types(state).includes("landed"));
    assert.notEqual(h.gh.branches.get(BASE), f.candidateSha, "never landed");
    assert.deepEqual(
      (h.gh.statuses.get(f.candidateSha) ?? []).filter((s) => s.context === "omni-queue/land"),
      [],
      "never blessed"
    );
    assert.ok(types(state).includes("checks-red"), "the candidate stays red");
    const notes = foreignNotes(state);
    assert.equal(notes.length, 1, "one error event names the attempt");
    assert.equal(notes[0].batchId, f.batchId);
    assert.equal(notes[0].sha, f.candidateSha);
    assert.equal(
      notes[0].detail,
      `${FOREIGN_CHECKS_DETAIL}: \`Gate / CI\` (app \`github-actions\`)`
    );
    assert.doesNotMatch(notes[0].detail, /\n/);
    // Read again by the next tick: still ignored, not noted twice for the batch.
    h.clock.advance(5);
    await h.tick();
    state = await h.state();
    assert.equal(foreignNotes(state).length, 1, "once per batch");
    assert.ok(!types(state).includes("landed"));
  });
}

test("G4: a planted success never stands in for a required job that has not reported: the candidate stays pending", async () => {
  const h = realChecksHarness();
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  // The push run exists, but none of its jobs has reported yet.
  const suite = h.workflowRun(f.candidateSha, {
    headBranch: f.candidateRef,
    status: "in_progress",
  });
  const at = h.clock.now();
  const planted = loadConfig().requiredChecks.map((name, i) => ({
    id: 8_000_000 + i,
    name,
    status: "completed",
    conclusion: "success",
    startedAt: at,
    completedAt: at,
    htmlUrl: null,
    appSlug: "github-actions",
    output: { title: null, summary: null, text: null },
    checkSuiteId: suite,
  }));
  h.gh.checkRuns.set(f.candidateSha, planted);
  for (const run of planted) h.gh.nonJobs.add(run.id);
  h.clock.advance(1);
  const result = await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("checks-green"));
  assert.ok(
    result.decisions.some((d) => d.includes("checks pending")),
    result.decisions.join("\n")
  );
  assert.equal(foreignNotes(state).length, 1);
  for (const name of loadConfig().requiredChecks) {
    assert.ok(foreignNotes(state)[0].detail.includes(`\`${name}\``), name);
  }
});

test("G4: a re-run's attempt-2 jobs are jobs of the same run and count: green after the re-run, landed", async () => {
  const h = realChecksHarness({ flakyReruns: 1 });
  h.addPr(1);
  h.world.culprits.add(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  await h.tick(); // red: its failed jobs are re-run
  assert.ok(types(await h.state()).includes("flaky-rerun"));
  h.world.culprits.delete(1);
  h.startRerun(f.candidateSha);
  const jobs = h.rerunCi(f.candidateSha, { pass: true }); // attempt 2 in the SAME suite, green
  assert.deepEqual(jobs, ["Gate / CI"]);
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("landed"), types(state).join(", "));
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  assert.equal(foreignNotes(state).length, 0, "nothing foreign");
  const listed = h.gh.reads.filter((r) => r.method === "listWorkflowRunJobs").map((r) => r.args[0]);
  assert.ok(listed.length > 0, "the jobs of the push run were listed");
});

test("G4: a job listing that throws fails the tick: nothing blessed, nothing landed", async () => {
  const h = realChecksHarness();
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  h.gh.listWorkflowRunJobs = async () => {
    throw Object.assign(new Error("GET /actions/runs/1/jobs → 502: Bad Gateway"), { status: 502 });
  };
  await assert.rejects(h.tick(), /jobs → 502/);
  const state = await h.state();
  assert.equal(state.inFlight.stage, "testing");
  assert.deepEqual(h.writesOf("createCommitStatus"), [], "nothing blessed");
  assert.notEqual(h.gh.branches.get(BASE), f.candidateSha);
});

test("G4: one job listing per push run of the candidate ref, and none for runs of other refs or events", async () => {
  const h = realChecksHarness();
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha); // the ci.yml-like push run
  h.workflowRun(f.candidateSha, { headBranch: f.candidateRef, conclusion: "success" }); // a second
  h.workflowRun(f.candidateSha, { headBranch: "someone-else", event: "pull_request" });
  h.workflowRun(f.candidateSha, { headBranch: candidateRef(BASE, "b9", fakeSha("x")) });
  const before = h.gh.reads.length;
  await h.tick();
  const listed = h.gh.reads
    .slice(before)
    .filter((r) => r.method === "listWorkflowRunJobs")
    .map((r) => r.args[0]);
  const own = h.gh.workflowRuns
    .filter((r) => r.event === "push" && r.headBranch === f.candidateRef)
    .map((r) => r.id);
  assert.deepEqual(listed.sort(), own.sort());
  assert.equal(own.length, 2);
});
