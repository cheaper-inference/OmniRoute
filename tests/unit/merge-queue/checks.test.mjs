// omni-queue candidate verdict (scripts/merge-queue/checks.mjs): plan §3.4, mirroring the
// Mergify merge_conditions (zero non-advisory failures, zero pending, required = success).
import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import { evaluateChecks, latestByName } from "../../../scripts/merge-queue/checks.mjs";

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

test("latestByName keeps the highest id per name, in input order", () => {
  const old = run("Unit Tests (1/8)", "failure", { id: 10 });
  const fresh = run("Unit Tests (1/8)", "success", { id: 20 });
  const other = run("Lint", "success", { id: 15 });
  assert.deepEqual(latestByName([old, other, fresh]), [other, fresh]);
  assert.deepEqual(latestByName([fresh, old]), [fresh]);
  assert.deepEqual(latestByName([]), []);
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
  const failed = run("Unit Tests (2/8)", "failure", { id: 100 });
  const rerun = run("Unit Tests (2/8)", "success", { id: 200 });
  assert.equal(evaluate([...allRequiredGreen(), rerun, failed]).verdict, "green");
  // and the opposite: an older success does not hide a newer failure
  const result = evaluate([
    ...allRequiredGreen(),
    run("Unit Tests (2/8)", "success", { id: 300 }),
    run("Unit Tests (2/8)", "failure", { id: 400 }),
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

test("a required check can be satisfied by a commit status", () => {
  const result = evaluate([run(GATE_CI), run(GATE_QUALITY)], [status(INTEGRITY, "success")]);
  assert.equal(result.verdict, "green");
  assert.equal(result.required[INTEGRITY], "success");
  const failing = evaluate([run(GATE_CI), run(GATE_QUALITY)], [status(INTEGRITY, "failure")]);
  assert.equal(failing.verdict, "red");
  assert.equal(failing.required[INTEGRITY], "failure");
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
  const result = evaluate([]);
  assert.equal(result.verdict, "pending");
  assert.deepEqual(result.pending.sort(), [...config.requiredChecks].sort());
});
