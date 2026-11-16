// omni-queue candidate verdict (scripts/merge-queue/checks.mjs): plan §3.4, mirroring the
// Mergify merge_conditions (zero non-advisory failures, zero pending, required = success) for
// check runs only: unlike Mergify, the verdict deliberately reads no commit status.
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

function evaluate(checkRuns, now = NOW) {
  return evaluateChecks({ checkRuns, config, startedAt: STARTED, now });
}

/**
 * The same verdict, asked by a caller that still hands over the commit statuses of the SHA
 * (whoever created them). evaluateChecks takes none and must ignore them: only check runs count.
 */
function evaluateWithStatuses(checkRuns, statuses, now = NOW) {
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

test("G4 (final review p7): a later same-named success in another check suite never supersedes a failure; in the same suite (a re-run attempt) it does", () => {
  const failed = timed("Shared Name", "failure", 1, 1, 5, { checkSuiteId: 1 });
  const otherSuite = timed("Shared Name", "success", 2, 6, 8, { checkSuiteId: 2 });
  assert.deepEqual(latestByName([failed, otherSuite]), [failed, otherSuite]);
  const result = evaluate([...allRequiredGreen(), failed, otherSuite]);
  assert.equal(result.verdict, "red");
  assert.deepEqual(
    result.failures.map((f) => f.id),
    [1]
  );
  const rerun = timed("Shared Name", "success", 3, 6, 8, { checkSuiteId: 1 });
  assert.deepEqual(latestByName([failed, rerun]), [rerun]);
  assert.equal(evaluate([...allRequiredGreen(), failed, rerun]).verdict, "green");
  // A suite id known on one side only: the rule does not apply (timestamps decide, as before).
  const unknown = timed("Shared Name", "success", 4, 6, 8);
  assert.deepEqual(latestByName([failed, unknown]), [unknown]);
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
  assert.equal(evaluate(checks, AFTER_TIMEOUT).verdict, "timeout");
  const justBefore = new Date(Date.parse(AFTER_TIMEOUT) - 1000).toISOString();
  assert.equal(evaluate(checks, justBefore).verdict, "pending");
  // a decided verdict is not turned into a timeout
  assert.equal(evaluate(allRequiredGreen(), AFTER_TIMEOUT).verdict, "green");
  assert.equal(
    evaluate([...allRequiredGreen(), run("Lint", "failure")], AFTER_TIMEOUT).verdict,
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

// Commit statuses never enter the verdict, whoever created them (another App, a user's token, the
// queue's own App) and whatever their context or state: only the check runs of the candidate's
// push count. evaluateChecks takes no statuses; these tests hand some over anyway.
const THIRD_PARTY = "external-ci[bot]";
const QUEUE_APP = "omni-queue[bot]";

test("a failure status from another app on the candidate does not make it red", () => {
  const green = allRequiredGreen();
  for (const state of ["failure", "error"]) {
    for (const creator of [THIRD_PARTY, "someone", QUEUE_APP]) {
      const result = evaluateWithStatuses(green, [status("ci/legacy", state, NOW, { creator })]);
      assert.equal(result.verdict, "green", `${state} by ${creator}`);
      assert.deepEqual(result.failures, []);
      assert.deepEqual(result.advisoryFailures, []);
      assert.deepEqual(result.pending, []);
    }
  }
  // newest per context does not matter either: a failure newer than a success stays out too
  const flipped = evaluateWithStatuses(green, [
    status("ci/legacy", "failure", "2026-11-13T10:50:00.000Z", { creator: THIRD_PARTY }),
    status("ci/legacy", "success", "2026-11-13T10:40:00.000Z", { creator: THIRD_PARTY }),
  ]);
  assert.equal(flipped.verdict, "green");
  // and without the green runs the verdict is what the runs alone say: pending, never red
  const runsOnly = evaluateWithStatuses(
    [run(GATE_CI), run(GATE_QUALITY, null)],
    [status("ci/legacy", "failure", NOW, { creator: THIRD_PARTY })]
  );
  assert.equal(runsOnly.verdict, "pending");
  assert.deepEqual(runsOnly.failures, []);
});

test("a pending status does not keep it pending", () => {
  const green = allRequiredGreen();
  for (const creator of [THIRD_PARTY, QUEUE_APP]) {
    const result = evaluateWithStatuses(green, [
      status("ci/legacy", "pending", NOW, { creator }),
      status(GATE_CI, "pending", NOW, { creator }),
    ]);
    assert.equal(result.verdict, "green", creator);
    assert.deepEqual(result.pending, []);
    assert.equal(result.required[GATE_CI], "success");
  }
});

test("a success status with a required name is still missing", () => {
  const forged = evaluateWithStatuses(
    [run(GATE_CI), run(GATE_QUALITY)],
    [status(INTEGRITY, "success", NOW, { creator: THIRD_PARTY })]
  );
  assert.equal(forged.verdict, "pending");
  assert.equal(forged.required[INTEGRITY], "missing");
  assert.deepEqual(forged.pending, [INTEGRITY]);
  // after the timeout it is a timeout, still never green
  assert.equal(
    evaluateWithStatuses(
      [run(GATE_CI), run(GATE_QUALITY)],
      [status(INTEGRITY, "success", NOW, { creator: QUEUE_APP })],
      AFTER_TIMEOUT
    ).verdict,
    "timeout"
  );
  // every required name only as a success status: CI never ran, so no-ci-run after 45 min
  const statusesOnly = config.requiredChecks.map((name) =>
    status(name, "success", NOW, { creator: THIRD_PARTY })
  );
  const early = evaluateWithStatuses([], statusesOnly, at(10));
  assert.equal(early.verdict, "pending");
  assert.deepEqual(
    Object.values(early.required),
    config.requiredChecks.map(() => "missing")
  );
  const late = evaluateWithStatuses([], statusesOnly, at(NO_RUN_TIMEOUT_MINUTES));
  assert.equal(late.verdict, "timeout");
  assert.equal(late.reason, "no-ci-run");
});

test("a failure status with a required name neither fails that check nor hides its run", () => {
  const failing = evaluateWithStatuses(
    [run(GATE_CI), run(GATE_QUALITY)],
    [status(INTEGRITY, "failure", NOW, { creator: THIRD_PARTY })]
  );
  assert.equal(failing.verdict, "pending");
  assert.equal(failing.required[INTEGRITY], "missing");
  assert.deepEqual(failing.failures, []);
  // the Actions run decides the required check, in both directions
  const green = evaluateWithStatuses(allRequiredGreen(), [
    status(INTEGRITY, "failure", NOW, { creator: THIRD_PARTY }),
  ]);
  assert.equal(green.verdict, "green");
  assert.equal(green.required[INTEGRITY], "success");
  const failedRun = run(INTEGRITY, "failure");
  const red = evaluateWithStatuses(
    [run(GATE_CI), run(GATE_QUALITY), failedRun],
    [status(INTEGRITY, "success", NOW, { creator: THIRD_PARTY })]
  );
  assert.equal(red.verdict, "red");
  assert.deepEqual(red.failures, [failedRun]);
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

test("an advisory-named status is not even reported as an advisory failure", () => {
  const result = evaluateWithStatuses(allRequiredGreen(), [
    status(ADVISORY, "failure", NOW, { creator: THIRD_PARTY }),
  ]);
  assert.equal(result.verdict, "green");
  assert.deepEqual(result.advisoryFailures, []);
  // an advisory check run is still tolerated and reported
  const adv = run(ADVISORY, "failure");
  assert.deepEqual(evaluate([...allRequiredGreen(), adv]).advisoryFailures, [adv]);
});

test("a check run named omni-queue/* never counts", () => {
  const failed = run("omni-queue/x", "failure");
  const red = evaluate([...allRequiredGreen(), failed]);
  assert.equal(red.verdict, "green", "a failed omni-queue/ run does not make it red");
  assert.deepEqual(red.failures, []);
  assert.deepEqual(red.advisoryFailures, []);
  const running = evaluate([...allRequiredGreen(), run("omni-queue/x", null)]);
  assert.equal(running.verdict, "green", "a pending omni-queue/ run does not keep it pending");
  assert.deepEqual(running.pending, []);
});

test("no checks at all is pending, never vacuously green", () => {
  // Before NO_RUN_TIMEOUT_MINUTES: CI may still be queued.
  const result = evaluate([], at(10));
  assert.equal(result.verdict, "pending");
  assert.deepEqual(result.pending.sort(), [...config.requiredChecks].sort());
  // Later it is a "no CI run" timeout — still never green.
  assert.equal(evaluate([]).verdict, "timeout");
});

test("no GitHub Actions run NO_RUN_TIMEOUT_MINUTES (45) after the push → timeout no-ci-run", () => {
  assert.equal(NO_RUN_TIMEOUT_MINUTES, 45);
  const justBefore = evaluate([], at(44));
  assert.equal(justBefore.verdict, "pending");
  assert.equal(justBefore.reason, undefined);
  const noRun = evaluate([], at(45));
  assert.equal(noRun.verdict, "timeout");
  assert.equal(noRun.reason, "no-ci-run");
  assert.deepEqual(noRun.failures, []);
  // Only statuses / runs of other apps (or the queue's own statuses): CI still never ran.
  const others = evaluateWithStatuses(
    [run("external scan", "success", { appSlug: "some-other-app" })],
    [status("ci/legacy", "pending"), status("omni-queue/approval", "success")],
    at(46)
  );
  assert.equal(others.verdict, "timeout");
  assert.equal(others.reason, "no-ci-run");
});

test("an Actions run in progress keeps the verdict pending until checksTimeoutMinutes", () => {
  const running = [run(GATE_CI, null), run(GATE_QUALITY, null)];
  assert.equal(evaluate(running, at(50)).verdict, "pending");
  const late = evaluate(running, AFTER_TIMEOUT);
  assert.equal(late.verdict, "timeout");
  assert.equal(late.reason, "checks-timeout");
  // a failed check run without any Actions run is still red, not a timeout
  const external = run("external scan", "failure", { appSlug: "some-other-app" });
  assert.equal(evaluate([external], at(60)).verdict, "red");
  // a failure status without any Actions run is ignored: CI never ran, so no-ci-run
  const statusOnly = evaluateWithStatuses(
    [],
    [status("ci/legacy", "failure", NOW, { creator: THIRD_PARTY })],
    at(60)
  );
  assert.equal(statusOnly.verdict, "timeout");
  assert.equal(statusOnly.reason, "no-ci-run");
});
