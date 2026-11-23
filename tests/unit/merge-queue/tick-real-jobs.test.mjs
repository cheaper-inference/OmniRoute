// A candidate's verdict counts only REAL jobs of its own push runs (contracts.isRealWorkflowJob).
// Measured on real GitHub, 2026-11-19 (rehearsal R3-e; payloads in
// fixtures/workflow-jobs-api-check-run.json): a check run created through POST /check-runs with a
// workflow token is filed by GitHub in one of the candidate's Actions suites AND listed among the
// jobs of that suite's workflow run (GET /actions/runs/{id}/jobs), with html_url …/runs/<id>, no
// runner, no labels, no steps. Before this fix such a forged `Gate / CI` failure made a green
// candidate red (its PR taken out as the culprit), and a forged `Gate / CI` success filed in the
// SAME suite as the real failed one, later, superseded it (checks.supersedes): a red candidate read
// green.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import * as realChecks from "../../../scripts/merge-queue/checks.mjs";
import * as contracts from "../../../scripts/merge-queue/contracts.mjs";
import { candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import { normalizeWorkflowJob } from "../../../scripts/merge-queue/github.mjs";
import { FOREIGN_CHECKS_DETAIL } from "../../../scripts/merge-queue/tick.mjs";
import { BASE, REPOSITORY, createHarness } from "./helpers/tick-fakes.mjs";

const PAYLOADS = JSON.parse(
  readFileSync(new URL("./fixtures/workflow-jobs-api-check-run.json", import.meta.url), "utf8")
);

const types = (state) => state.history.map((e) => e.type);
const foreignNotes = (state) =>
  state.history.filter(
    (e) => e.type === "error" && String(e.detail ?? "").startsWith(FOREIGN_CHECKS_DETAIL)
  );
const isReal = (job, runId) => contracts.isRealWorkflowJob(job, runId);

/** A harness whose verdicts come from the real checks module (latestByName, supersedes). */
function realChecksHarness(options) {
  const h = createHarness({ mode: "live", ...options });
  h.deps.modules = { ...h.modules, checks: realChecks };
  return h;
}

let forgedSeq = 0;
/**
 * A check run created through POST /check-runs with a workflow token, filed by GitHub in check
 * suite `suiteId` of `sha`, after every job there (a higher id, started after they completed), as
 * the rehearsal posted it. GitHub lists it among the jobs of that suite's workflow run
 * (gh.nonJobs: listed with html_url …/runs/<id> and no runner).
 */
function forge(h, sha, { name = "Gate / CI", conclusion, suiteId }) {
  h.clock.advance(1);
  const at = h.clock.now();
  const id = 9_000_000 + forgedSeq++;
  h.gh.checkRuns.set(sha, [
    ...(h.gh.checkRuns.get(sha) ?? []),
    {
      id,
      name,
      status: "completed",
      conclusion,
      startedAt: at,
      completedAt: at,
      htmlUrl: `https://github.com/${REPOSITORY}/runs/${id}`,
      appSlug: "github-actions",
      output: { title: "rehearsal: posted by a workflow token", summary: null, text: null },
      checkSuiteId: suiteId,
    },
  ]);
  h.gh.nonJobs.add(id);
  h.clock.advance(1);
  return id;
}

/** The check suite of the candidate's real `name` job. */
const suiteOf = (h, sha, name = "Gate / CI") =>
  h.gh.checkRuns.get(sha).find((r) => r.name === name && !h.gh.nonJobs.has(r.id)).checkSuiteId;

/**
 * A candidate in flight for PR #1 whose CI reported (red when `red`), on a base the queue knows
 * green (the tip it landed, as in the rehearsal): a red candidate is blamed on its PR.
 */
async function candidate(h, { red = false } = {}) {
  const { state, version } = await h.store.load(BASE);
  const baseSha = h.gh.branches.get(BASE);
  state.baseChecks = [
    {
      baseSha,
      ref: candidateRef(BASE, "b0", baseSha),
      status: "green",
      startedAt: "2026-11-13T10:30:00.000Z",
      signatures: [],
    },
  ];
  assert.equal((await h.store.save(BASE, state, version, "seed: base green")).ok, true);
  h.addPr(1);
  if (red) h.world.culprits.add(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  return f;
}

// ───────────────────────────── the predicate ─────────────────────────────

test("isRealWorkflowJob on the payloads GitHub served: the real jobs are, the API-created check runs are not", () => {
  for (const variant of ["variantA", "variantB"]) {
    const raw = PAYLOADS[variant].jobs;
    const runId = raw[0].run_id;
    const jobs = raw.map(normalizeWorkflowJob);
    assert.deepEqual(
      jobs.map((j) => isReal(j, runId)),
      [...jobs.slice(0, -1).map(() => true), false],
      variant
    );
    const forged = jobs.at(-1);
    assert.equal(forged.runId, runId, "the forged entry carries the real run's id");
    assert.equal(forged.name, "Gate / CI");
  }
});

test("isRealWorkflowJob: a real SKIPPED job (no runner, no steps, job URL form) is still a job", () => {
  const runId = 44_451_315_023;
  const skipped = normalizeWorkflowJob({
    id: 135_315_688_999,
    run_id: runId,
    run_attempt: 1,
    html_url: `https://github.com/acme/widgets/actions/runs/${runId}/job/135315688999`,
    check_run_url: "https://api.github.com/repos/acme/widgets/check-runs/135315688999",
    status: "completed",
    conclusion: "skipped",
    name: "Docs",
    steps: [],
    labels: ["ubuntu-latest"],
    runner_id: null,
  });
  assert.equal(isReal(skipped, runId), true);
  // Any conclusion other than success needs no runner (a job cancelled before it started).
  assert.equal(isReal({ ...skipped, conclusion: "cancelled" }, runId), true);
  assert.equal(isReal({ ...skipped, conclusion: null, status: "queued" }, runId), true);
});

test("isRealWorkflowJob fails closed: no html_url, another run, another job id, another URL form", () => {
  const runId = 44_451_315_023;
  const id = 135_315_732_091;
  const job = {
    id,
    runId,
    runAttempt: 1,
    name: "Gate / CI",
    status: "completed",
    conclusion: "failure",
    checkRunId: id,
    htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId}/job/${id}`,
    runnerId: 1_000_004_936,
  };
  assert.equal(isReal(job, runId), true, "the real job");
  const not = (patch, why) => assert.equal(isReal({ ...job, ...patch }, runId), false, why);
  not({ htmlUrl: null }, "no html_url");
  not({ htmlUrl: undefined }, "html_url absent");
  not({ htmlUrl: "" }, "empty html_url");
  not({ htmlUrl: "not a url" }, "unparsable html_url");
  not({ htmlUrl: `/actions/runs/${runId}/job/${id}` }, "a bare path is no URL");
  not({ htmlUrl: `https://github.com/acme/widgets/runs/${id}` }, "the API-created form");
  not({ htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId + 1}/job/${id}` }, "run");
  not({ htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId}/job/${id + 1}` }, "job");
  not({ htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId}/job/${id}/x` }, "suffix");
  not({ htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId}/job/${id}/` }, "slash");
  not({ htmlUrl: `https://github.com/acme/widgets/actions/runs/0${runId}/job/${id}` }, "digits");
  not({ checkRunId: id + 1 }, "a check run other than the job's own");
  not({ checkRunId: null }, "no check run");
  not({ runId: runId + 1 }, "listed with another run's id");
  not({ runId: null }, "listed with no run id");
  not({ id: null }, "no job id");
  // The URL decides by its path: a query or fragment cannot fake the ending.
  not({ htmlUrl: `https://github.com/acme/widgets/runs/${id}?x=/actions/runs/${runId}/job/${id}` });
  not({ htmlUrl: `https://github.com/acme/widgets/runs/${id}#/actions/runs/${runId}/job/${id}` });
  assert.equal(isReal(job, String(runId)), false, "the run id is a number");
  assert.equal(isReal(null, runId), false);
});

test("isRealWorkflowJob: a `success` with the job URL form but no runner is not counted (defence in depth)", () => {
  const runId = 44_451_315_023;
  const id = 135_315_732_091;
  const job = {
    id,
    runId,
    runAttempt: 1,
    name: "Gate / CI",
    status: "completed",
    conclusion: "success",
    checkRunId: id,
    htmlUrl: `https://github.com/acme/widgets/actions/runs/${runId}/job/${id}`,
    runnerId: 1_000_004_936,
  };
  assert.equal(isReal(job, runId), true);
  for (const runnerId of [null, undefined, 0, -1, 1.5, "1000004936"]) {
    assert.equal(isReal({ ...job, runnerId }, runId), false, String(runnerId));
  }
});

// ───────────────────────────── the candidate's verdict ─────────────────────────────

test("(a) a forged `Gate / CI` failure listed among the CI run's jobs on a green candidate: ignored, green, landed, one error event, no culprit", async () => {
  const h = realChecksHarness();
  const f = await candidate(h);
  forge(h, f.candidateSha, { conclusion: "failure", suiteId: suiteOf(h, f.candidateSha) });
  await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("checks-red"), types(state).join(", "));
  assert.ok(!types(state).includes("culprit-found"));
  assert.ok(types(state).includes("checks-green"));
  assert.ok(types(state).includes("landed"));
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  assert.deepEqual(h.gh.pulls.get(1).labels, [], "PR #1 landed, not taken out");
  const notes = foreignNotes(state);
  assert.equal(notes.length, 1, "one error event");
  assert.equal(notes[0].batchId, f.batchId);
  assert.equal(notes[0].sha, f.candidateSha);
  assert.equal(notes[0].detail, `${FOREIGN_CHECKS_DETAIL}: \`Gate / CI\` (app \`github-actions\`)`);
});

for (const flakyReruns of [0, 1]) {
  test(`(b) a forged \`Gate / CI\` success in the SAME suite as the real failed one, higher id, started after it completed: the candidate stays RED (flakyReruns ${flakyReruns})`, async () => {
    const h = realChecksHarness({ flakyReruns });
    const f = await candidate(h, { red: true });
    const suiteId = suiteOf(h, f.candidateSha);
    const realGate = h.gh.checkRuns.get(f.candidateSha).find((r) => r.name === "Gate / CI");
    assert.equal(realGate.conclusion, "failure");
    const forged = forge(h, f.candidateSha, { conclusion: "success", suiteId });
    assert.ok(forged > realGate.id, "a higher id");
    // Exactly the pair checks.supersedes would let replace the real failure.
    const listed = h.gh.checkRuns.get(f.candidateSha);
    assert.equal(
      realChecks.latestByName(listed).some((r) => r.id === realGate.id),
      false,
      "fixture: without the job filter the forged success supersedes the real failure"
    );
    await h.tick();
    if (flakyReruns) {
      // The real failure is re-run once; the re-run fails again.
      assert.ok(types(await h.state()).includes("flaky-rerun"));
      h.startRerun(f.candidateSha);
      h.rerunCi(f.candidateSha, { pass: false });
      await h.tick();
    }
    const state = await h.state();
    assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
    assert.ok(!types(state).includes("land-blessed"));
    assert.ok(!types(state).includes("landed"));
    assert.notEqual(h.gh.branches.get(BASE), f.candidateSha, "never landed");
    assert.deepEqual(
      (h.gh.statuses.get(f.candidateSha) ?? []).filter((s) => s.context === "omni-queue/land"),
      [],
      "never blessed"
    );
    assert.ok(types(state).includes("checks-red"));
    assert.ok(types(state).includes("culprit-found"), "the real failure is classified");
    assert.equal(foreignNotes(state).length, 1);
    assert.match(foreignNotes(state)[0].detail, /`Gate \/ CI` \(app `github-actions`\)/);
  });
}

test("(c) a forged `Gate / CI` success in the OTHER push run's suite: the candidate stays red", async () => {
  const h = realChecksHarness();
  const f = await candidate(h, { red: true });
  // The second push run of the ref ("Quality Gates" in the rehearsal): its own suite.
  const other = h.workflowRun(f.candidateSha, {
    headBranch: f.candidateRef,
    conclusion: "success",
  });
  assert.notEqual(other, suiteOf(h, f.candidateSha));
  forge(h, f.candidateSha, { conclusion: "success", suiteId: other });
  await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
  assert.ok(!types(state).includes("landed"));
  assert.ok(types(state).includes("checks-red"));
  assert.ok(types(state).includes("culprit-found"));
  assert.equal(foreignNotes(state).length, 1);
});

test("(d) a real skipped job of the candidate's run (no runner, job URL form) is a job: counted, not noted", async () => {
  const h = realChecksHarness();
  const f = await candidate(h);
  const suiteId = suiteOf(h, f.candidateSha);
  const at = h.clock.now();
  h.gh.checkRuns.set(f.candidateSha, [
    ...h.gh.checkRuns.get(f.candidateSha),
    {
      id: 8_500_000,
      name: "Docs only",
      status: "completed",
      conclusion: "skipped",
      startedAt: at,
      completedAt: at,
      htmlUrl: null,
      appSlug: "github-actions",
      output: { title: null, summary: null, text: null },
      checkSuiteId: suiteId,
    },
  ]);
  const run = h.gh.workflowRuns.find((r) => r.checkSuiteId === suiteId);
  const listed = await h.gh.listWorkflowRunJobs(run.id);
  const skipped = listed.find((j) => j.name === "Docs only");
  assert.equal(skipped.runnerId, null, "fixture: a skipped job has no runner");
  await h.tick();
  const state = await h.state();
  assert.ok(types(state).includes("landed"), types(state).join(", "));
  assert.equal(foreignNotes(state).length, 0, "a real job is never noted as foreign");
});

for (const [why, url] of [
  [
    "another run's id",
    (run, id) => `https://github.com/${REPOSITORY}/actions/runs/${run + 1}/job/${id}`,
  ],
  [
    "another job id",
    (run, id) => `https://github.com/${REPOSITORY}/actions/runs/${run}/job/${id + 1}`,
  ],
  ["no html_url", () => null],
]) {
  test(`(e) a check run listed with ${why} (and a runner) is no job: a forged success never supersedes the real failure`, async () => {
    const h = realChecksHarness();
    const f = await candidate(h, { red: true });
    const suiteId = suiteOf(h, f.candidateSha);
    const run = h.gh.workflowRuns.find((r) => r.checkSuiteId === suiteId);
    const forged = forge(h, f.candidateSha, { conclusion: "success", suiteId });
    const listJobs = h.gh.listWorkflowRunJobs.bind(h.gh);
    h.gh.listWorkflowRunJobs = async (runId) =>
      (await listJobs(runId)).map((j) =>
        j.id === forged ? { ...j, htmlUrl: url(run.id, forged), runnerId: 1_000_000_001 } : j
      );
    await h.tick();
    const state = await h.state();
    assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
    assert.ok(!types(state).includes("landed"));
    assert.ok(types(state).includes("checks-red"));
    assert.equal(foreignNotes(state).length, 1);
  });
}

test("(f) a `success` listed with the job URL form but no runner is not counted: a required check stays pending", async () => {
  const h = realChecksHarness();
  h.addPr(1);
  await h.tick();
  const f = (await h.state()).inFlight;
  h.runCi(f.candidateSha);
  const gate = h.gh.checkRuns.get(f.candidateSha).find((r) => r.name === "Gate / CI");
  assert.equal(gate.conclusion, "success");
  h.gh.runnerless.add(gate.id); // listed as a job of the run, with no runner
  const result = await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
  assert.ok(!types(state).includes("landed"));
  assert.notEqual(h.gh.branches.get(BASE), f.candidateSha);
  assert.ok(
    result.decisions.some((d) => d.includes("checks pending")),
    result.decisions.join("\n")
  );
  assert.equal(foreignNotes(state).length, 1);
});

test("(g) the re-run path: a forged failure is no failed job, nothing is re-run, the candidate lands", async () => {
  const h = realChecksHarness({ flakyReruns: 1 });
  const f = await candidate(h);
  forge(h, f.candidateSha, { conclusion: "failure", suiteId: suiteOf(h, f.candidateSha) });
  await h.tick();
  const state = await h.state();
  assert.deepEqual(h.writesOf("rerunFailedJobs"), [], "GitHub is not asked to re-run anything");
  assert.ok(!types(state).includes("flaky-rerun"));
  assert.ok(!types(state).includes("checks-red"), types(state).join(", "));
  assert.ok(types(state).includes("landed"));
  assert.equal(h.gh.branches.get(BASE), f.candidateSha);
  assert.equal(foreignNotes(state).length, 1);
});

test("a forged check run that a listing leaves out entirely is ignored the same way", async () => {
  const h = realChecksHarness();
  h.gh.nonJobsListed = false;
  const f = await candidate(h, { red: true });
  forge(h, f.candidateSha, { conclusion: "success", suiteId: suiteOf(h, f.candidateSha) });
  await h.tick();
  const state = await h.state();
  assert.ok(!types(state).includes("checks-green"), types(state).join(", "));
  assert.ok(types(state).includes("checks-red"));
  assert.equal(foreignNotes(state).length, 1);
});
