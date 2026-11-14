// omni-queue candidate verdict (scripts/merge-queue/checks.mjs): plan §3.4, mirroring the
// Mergify merge_conditions (zero non-advisory failures, zero pending, required = success).
import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import {
  NO_RUN_TIMEOUT_MINUTES,
  evaluateChecks,
  latestByName,
} from "../../../scripts/merge-queue/checks.mjs";

const config = loadConfig();
const [GATE_CI, GATE_QUALITY, INTEGRITY] = config.requiredChecks;
const ADVISORY = config.advisoryChecks[0];
const STARTED = "2026-11-13T10:00:00.000Z";
const NOW = "2026-11-13T11:00:00.000Z";
const AFTER_TIMEOUT = new Date(
  Date.parse(STARTED) + config.checksTimeoutMinutes * 60000
).toISOString();

let nextId = 1;
function run(name, conclusion = "success", overrides = {}) {
  return {
    id: nextId++,
    name,
    status: conclusion === null ? "in_progress" : "completed",
    conclusion,
    startedAt: STARTED,
    completedAt: conclusion === null ? null : NOW,
    htmlUrl: `https://github.com/o/r/actions/runs/1/job/${nextId}`,
    appSlug: "github-actions",
    output: { title: null, summary: null, text: null },
    ...overrides,
  };
}

function status(context, state, createdAt = NOW, overrides = {}) {
  return {
    context,
    state,
    creator: "someone",
    description: "",
    createdAt,
    targetUrl: null,
    ...overrides,
  };
}

const allRequiredGreen = () => [run(GATE_CI), run(GATE_QUALITY), run(INTEGRITY)];
const at = (minutesAfterStart) =>
  new Date(Date.parse(STARTED) + minutesAfterStart * 60000).toISOString();
/** A completed run that started/finished at the given minutes after STARTED. */
const timed = (name, conclusion, id, startMin, endMin, extra = {}) =>
  run(name, conclusion, { id, startedAt: at(startMin), completedAt: at(endMin), ...extra });

function evaluate(checkRuns, statuses = [], now = NOW) {
  return evaluateChecks({ checkRuns, statuses, config, startedAt: STARTED, now });
}

test("the committed config names the required and advisory checks this suite assumes", () => {
  assert.deepEqual(config.requiredChecks, [
    "Gate / CI",
    "Gate / Quality",
    "Merge integrity (changelog + generated skills)",
  ]);
  assert.deepEqual(config.advisoryChecks, ["Build (advisory)"]);
  assert.equal(config.checksTimeoutMinutes, 240);
});

test("latestByName drops a run only when a later re-run started after it finished", () => {
  const old = timed("Unit Tests (1/8)", "failure", 10, 0, 20);
  const fresh = timed("Unit Tests (1/8)", "success", 20, 25, 40);
  const other = timed("Lint", "success", 15, 0, 5);
  assert.deepEqual(latestByName([old, other, fresh]), [other, fresh]);
  assert.deepEqual(latestByName([fresh, old]), [fresh]);
  assert.deepEqual(latestByName([]), []);
  // a lower id never supersedes a higher one, even if timestamps say so
  const weird = timed("Unit Tests (1/8)", "success", 5, 25, 40);
  assert.deepEqual(latestByName([old, weird]), [old, weird]);
});

test("same-name runs that overlap in time are all kept (different workflows)", () => {
  // ci.yml and quality.yml both run a job named "Change Classification" on the candidate
  const ciRun = timed("Change Classification", "failure", 1, 0, 3);
  const qualityRun = timed("Change Classification", "success", 2, 1, 4);
  assert.deepEqual(latestByName([ciRun, qualityRun]), [ciRun, qualityRun]);
  const result = evaluate([...allRequiredGreen(), ciRun, qualityRun]);
  assert.equal(result.verdict, "red");
  assert.deepEqual(
    result.failures.map((f) => f.id),
    [1]
  );
  // without timestamps nothing is assumed to be a re-run either (fail closed)
  const noTimes = [
    run("Change Classification", "failure", { id: 3, startedAt: null, completedAt: null }),
    run("Change Classification", "success", { id: 4, startedAt: null, completedAt: null }),
  ];
  assert.equal(evaluate([...allRequiredGreen(), ...noTimes]).verdict, "red");
});

test("runs naming different workflows are never re-runs of each other", () => {
  const ciRun = timed("Change Classification", "failure", 1, 0, 3, { workflow: "CI" });
  const later = timed("Change Classification", "success", 2, 10, 12, { workflow: "Quality" });
  assert.deepEqual(latestByName([ciRun, later]), [ciRun, later]);
  assert.equal(evaluate([...allRequiredGreen(), ciRun, later]).verdict, "red");
  const rerun = timed("Change Classification", "success", 5, 10, 12, { workflow: "CI" });
  assert.deepEqual(latestByName([ciRun, rerun]), [rerun]);
});

test("all required success and nothing pending → green", () => {
  const result = evaluate([...allRequiredGreen(), run("Lint"), run("Unit Tests (1/8)")]);
  assert.equal(result.verdict, "green");
  assert.deepEqual(result.required, {
    [GATE_CI]: "success",
    [GATE_QUALITY]: "success",
    [INTEGRITY]: "success",
  });
  assert.deepEqual(result.failures, []);
  assert.deepEqual(result.pending, []);
});

test("advisory failure stays green but is reported", () => {
  const adv = run(ADVISORY, "failure");
  const result = evaluate([...allRequiredGreen(), adv]);
  assert.equal(result.verdict, "green");
  assert.deepEqual(result.advisoryFailures, [adv]);
  assert.deepEqual(result.failures, []);
});

test("a non-advisory failure is red even when every required check passed", () => {
  const unit = run("Unit Tests (3/8)", "failure");
  const result = evaluate([...allRequiredGreen(), unit]);
  assert.equal(result.verdict, "red");
  assert.deepEqual(result.failures, [unit]);
});

test("red is decided immediately, even with other checks still running", () => {
  const result = evaluate([run(GATE_CI, null), run("Lint", "failure")]);
  assert.equal(result.verdict, "red");
  assert.ok(result.pending.includes(GATE_CI));
});

for (const conclusion of [
  "cancelled",
  "timed_out",
  "action_required",
  "startup_failure",
  "stale",
]) {
  test(`conclusion ${conclusion} on a non-advisory check is red`, () => {
    const bad = run("E2E", conclusion);
    const result = evaluate([...allRequiredGreen(), bad]);
    assert.equal(result.verdict, "red");
    assert.deepEqual(result.failures, [bad]);
  });
}

test("cancelled advisory check is tolerated", () => {
  const result = evaluate([...allRequiredGreen(), run(ADVISORY, "cancelled")]);
  assert.equal(result.verdict, "green");
  assert.equal(result.advisoryFailures.length, 1);
});

test("non-required skipped/neutral checks do not block", () => {
  const result = evaluate([...allRequiredGreen(), run("Docs", "skipped"), run("Info", "neutral")]);
  assert.equal(result.verdict, "green");
});

test("a required check reported as skipped or neutral fails closed (red)", () => {
  for (const conclusion of ["skipped", "neutral"]) {
    const skipped = run(INTEGRITY, conclusion);
    const result = evaluate([run(GATE_CI), run(GATE_QUALITY), skipped]);
    assert.equal(result.verdict, "red", conclusion);
    assert.equal(result.required[INTEGRITY], conclusion);
    assert.deepEqual(result.failures, [skipped]);
  }
});

test("a required check not reported yet keeps the verdict pending (not green)", () => {
  const result = evaluate([run(GATE_CI), run(GATE_QUALITY)]);
  assert.equal(result.verdict, "pending");
  assert.equal(result.required[INTEGRITY], "missing");
  assert.deepEqual(result.pending, [INTEGRITY]);
});

test("anything still running (advisory included) keeps the verdict pending", () => {
  const running = evaluate([...allRequiredGreen(), run("E2E", null)]);
  assert.equal(running.verdict, "pending");
  assert.deepEqual(running.pending, ["E2E"]);
  const queued = evaluate([...allRequiredGreen(), run("E2E", null, { status: "queued" })]);
  assert.equal(queued.verdict, "pending");
  const advisoryRunning = evaluate([...allRequiredGreen(), run(ADVISORY, null)]);
  assert.equal(advisoryRunning.verdict, "pending");
  const requiredRunning = evaluate([run(GATE_CI), run(GATE_QUALITY, null), run(INTEGRITY)]);
  assert.equal(requiredRunning.verdict, "pending");
  assert.equal(requiredRunning.required[GATE_QUALITY], "pending");
});

test("undecided after checksTimeoutMinutes → timeout; just before → pending", () => {
  const checks = [run(GATE_CI), run(GATE_QUALITY)];
  assert.equal(evaluate(checks, [], AFTER_TIMEOUT).verdict, "timeout");
  const justBefore = new Date(Date.parse(AFTER_TIMEOUT) - 1000).toISOString();
  assert.equal(evaluate(checks, [], justBefore).verdict, "pending");
  // a decided verdict is not turned into a timeout
  assert.equal(evaluate(allRequiredGreen(), [], AFTER_TIMEOUT).verdict, "green");
  assert.equal(
    evaluate([...allRequiredGreen(), run("Lint", "failure")], [], AFTER_TIMEOUT).verdict,
    "red"
  );
});

test("a re-run whose newest attempt is green replaces the older failure", () => {
  const failed = timed("Unit Tests (2/8)", "failure", 100, 0, 20);
  const rerun = timed("Unit Tests (2/8)", "success", 200, 30, 50);
  assert.equal(evaluate([...allRequiredGreen(), rerun, failed]).verdict, "green");
  // and the opposite: an older success does not hide a newer failure
  const result = evaluate([
    ...allRequiredGreen(),
    timed("Unit Tests (2/8)", "success", 300, 0, 20),
    timed("Unit Tests (2/8)", "failure", 400, 30, 50),
  ]);
  assert.equal(result.verdict, "red");
  assert.equal(result.failures[0].id, 400);
});

test("commit statuses: failure/error → red, pending → pending, newest per context wins", () => {
  const green = allRequiredGreen();
  const failed = evaluate(green, [status("ci/legacy", "failure")]);
  assert.equal(failed.verdict, "red");
  assert.equal(failed.failures.length, 1);
  assert.equal(failed.failures[0].name, "ci/legacy");
  assert.equal(failed.failures[0].id, 0, "statuses have no check-run annotations");
  assert.equal(failed.failures[0].source, "status");
  assert.equal(evaluate(green, [status("ci/legacy", "error")]).verdict, "red");
  const pending = evaluate(green, [status("ci/legacy", "pending")]);
  assert.equal(pending.verdict, "pending");
  assert.deepEqual(pending.pending, ["ci/legacy"]);
  const recovered = evaluate(green, [
    status("ci/legacy", "success", "2026-11-13T10:50:00.000Z"),
    status("ci/legacy", "failure", "2026-11-13T10:40:00.000Z"),
  ]);
  assert.equal(recovered.verdict, "green");
});

test("a commit status can fail a required check but never satisfy it", () => {
  const forged = evaluate([run(GATE_CI), run(GATE_QUALITY)], [status(INTEGRITY, "success")]);
  assert.notEqual(forged.verdict, "green");
  assert.equal(forged.verdict, "pending");
  assert.equal(forged.required[INTEGRITY], "missing");
  assert.ok(forged.pending.includes(INTEGRITY));
  // after the timeout it is a timeout, still never green
  assert.equal(
    evaluate([run(GATE_CI), run(GATE_QUALITY)], [status(INTEGRITY, "success")], AFTER_TIMEOUT)
      .verdict,
    "timeout"
  );
  const failing = evaluate([run(GATE_CI), run(GATE_QUALITY)], [status(INTEGRITY, "failure")]);
  assert.equal(failing.verdict, "red");
  assert.equal(failing.required[INTEGRITY], "failure");
  // a real Actions run plus a success status: green through the run
  const both = evaluate(allRequiredGreen(), [status(INTEGRITY, "success")]);
  assert.equal(both.verdict, "green");
  // a real Actions success does not hide a failing status of the same name
  const mixed = evaluate(allRequiredGreen(), [status(INTEGRITY, "failure")]);
  assert.equal(mixed.verdict, "red");
});

test("a required check run from another app never satisfies it", () => {
  const otherApp = run(INTEGRITY, "success", { appSlug: "some-other-app" });
  const result = evaluate([run(GATE_CI), run(GATE_QUALITY), otherApp]);
  assert.equal(result.verdict, "pending");
  assert.equal(result.required[INTEGRITY], "missing");
  const noApp = run(GATE_CI, "success", { appSlug: null });
  assert.equal(evaluate([noApp, run(GATE_QUALITY), run(INTEGRITY)]).required[GATE_CI], "missing");
  // but its failure still counts (fail closed)
  const failing = run(INTEGRITY, "failure", { appSlug: "some-other-app" });
  assert.equal(evaluate([...allRequiredGreen(), failing]).verdict, "red");
});

test("advisory statuses are tolerated like advisory runs", () => {
  const result = evaluate(allRequiredGreen(), [status(ADVISORY, "failure")]);
  assert.equal(result.verdict, "green");
  assert.equal(result.advisoryFailures.length, 1);
});

test("the queue's own omni-queue/* statuses never count", () => {
  const result = evaluate(allRequiredGreen(), [
    status("omni-queue/approval", "failure"),
    status("omni-queue/protected-approval", "pending"),
  ]);
  assert.equal(result.verdict, "green");
  assert.deepEqual(result.pending, []);
});

test("no checks at all is pending, never vacuously green", () => {
  // Before NO_RUN_TIMEOUT_MINUTES: CI may still be queued.
  const result = evaluate([], [], at(10));
  assert.equal(result.verdict, "pending");
  assert.deepEqual(result.pending.sort(), [...config.requiredChecks].sort());
  // Later it is a "no CI run" timeout — still never green.
  assert.equal(evaluate([]).verdict, "timeout");
});

test("no GitHub Actions run NO_RUN_TIMEOUT_MINUTES (45) after the push → timeout no-ci-run", () => {
  assert.equal(NO_RUN_TIMEOUT_MINUTES, 45);
  const justBefore = evaluate([], [], at(44));
  assert.equal(justBefore.verdict, "pending");
  assert.equal(justBefore.reason, undefined);
  const noRun = evaluate([], [], at(45));
  assert.equal(noRun.verdict, "timeout");
  assert.equal(noRun.reason, "no-ci-run");
  assert.deepEqual(noRun.failures, []);
  // Only statuses / runs of other apps (or the queue's own statuses): CI still never ran.
  const others = evaluate(
    [run("external scan", "success", { appSlug: "some-other-app" })],
    [status("ci/legacy", "pending"), status("omni-queue/approval", "success")],
    at(46)
  );
  assert.equal(others.verdict, "timeout");
  assert.equal(others.reason, "no-ci-run");
});

test("an Actions run in progress keeps the verdict pending until checksTimeoutMinutes", () => {
  const running = [run(GATE_CI, null), run(GATE_QUALITY, null)];
  assert.equal(evaluate(running, [], at(50)).verdict, "pending");
  const late = evaluate(running, [], AFTER_TIMEOUT);
  assert.equal(late.verdict, "timeout");
  assert.equal(late.reason, "checks-timeout");
  // a failure without any Actions run is still red, not a timeout
  assert.equal(evaluate([], [status("ci/legacy", "failure")], at(60)).verdict, "red");
});
