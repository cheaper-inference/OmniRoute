// omni-queue red classification (scripts/merge-queue/classify.mjs): plan §3.5 — infra vs
// base-red vs PR-red, with base-red decided only from a base check on the SAME base SHA.
import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyRed,
  extractSignatures,
  isInfraFailure,
  normalizeCheckName,
  normalizeKeyPart,
} from "../../../scripts/merge-queue/classify.mjs";
import { RED_KINDS } from "../../../scripts/merge-queue/contracts.mjs";

const BASE_SHA = "a".repeat(40);
const OTHER_BASE_SHA = "b".repeat(40);

let nextId = 1;
function run(name, conclusion = "failure", output = {}) {
  return {
    id: nextId++,
    name,
    status: "completed",
    conclusion,
    startedAt: null,
    completedAt: null,
    htmlUrl: null,
    appSlug: "github-actions",
    output: { title: null, summary: null, text: null, ...output },
  };
}

const ann = (message, extra = {}) => ({
  path: ".github",
  title: null,
  message,
  level: "failure",
  ...extra,
});
const testFailure = (path, title) => ({
  path,
  title,
  message: "AssertionError: expected",
  level: "failure",
});

const sig = (check, key = "", infra = false) => ({ check, key, infra });
const baseCheck = (status, signatures = [], baseSha = BASE_SHA) => ({
  baseSha,
  ref: `omni-queue/release-v3.8.54/basecheck-${baseSha.slice(0, 12)}`,
  status,
  startedAt: "2026-11-13T10:00:00.000Z",
  signatures,
});

test("infra evidence: runner loss, shutdown, CreateArtifact 404, disk full", () => {
  const messages = [
    "The hosted runner: GitHub Actions 12 lost communication with the server.",
    "The runner has received a shutdown signal. This can happen when the runner service is stopped.",
    "Failed to CreateArtifact: Unable to make request: 404",
    "Error: ENOSPC: No space left on device, write",
  ];
  for (const message of messages) {
    assert.equal(isInfraFailure(run("Unit Tests (1/8)"), [ann(message)]), true, message);
  }
  assert.equal(isInfraFailure(run("E2E", "startup_failure"), []), true);
  assert.equal(isInfraFailure(run("E2E", "timed_out"), []), true);
  // evidence found in the run output instead of an annotation
  const outputOnly = run("E2E", "failure", {
    summary: "The runner has received a shutdown signal",
  });
  assert.equal(isInfraFailure(outputOnly, []), true);
});

test("cancelled without a test failure is infra; cancelled with one is not", () => {
  assert.equal(isInfraFailure(run("Unit Tests", "cancelled"), []), true);
  assert.equal(
    isInfraFailure(run("Unit Tests", "cancelled"), [ann("The operation was canceled.")]),
    true
  );
  assert.equal(
    isInfraFailure(run("Unit Tests", "cancelled"), [
      testFailure("tests/unit/a.test.ts", "a fails"),
    ]),
    false
  );
});

test("a plain test failure is not infra, even next to an infra message", () => {
  assert.equal(isInfraFailure(run("Lint"), [ann("Process completed with exit code 1.")]), false);
  assert.equal(isInfraFailure(run("Lint"), []), false);
  const mixed = [
    ann("lost communication with the server"),
    testFailure("tests/unit/b.test.ts", "b"),
  ];
  assert.equal(isInfraFailure(run("Unit Tests"), mixed), false);
  // warnings are not failures
  const warn = { path: "x.ts", title: "t", message: "m", level: "warning" };
  assert.equal(isInfraFailure(run("E2E", "cancelled"), [warn]), true);
});

test("check names lose their matrix shard suffix only", () => {
  assert.equal(normalizeCheckName("Unit Tests (3/8)"), "Unit Tests");
  assert.equal(normalizeCheckName("Unit Tests ( 3 / 8 )"), "Unit Tests");
  assert.equal(normalizeCheckName("Build (advisory)"), "Build (advisory)");
  assert.equal(normalizeCheckName("Gate / CI"), "Gate / CI");
});

test("key parts drop ANSI codes, reporter durations and case", () => {
  assert.equal(
    normalizeKeyPart("\u001b[31mTests/Unit/A.test.ts\u001b[0m  Retries Once (12ms)"),
    "tests/unit/a.test.ts retries once"
  );
  assert.equal(normalizeKeyPart("suite x (1.5s)"), "suite x");
  assert.equal(normalizeKeyPart("✓ suite x 1.5s"), "suite x");
  assert.equal(normalizeKeyPart("✖ suite x (31.2ms)\nnext line (2s)"), "suite x next line");
  assert.equal(normalizeKeyPart(null), "");
});

test("numbers inside a test title stay part of its identity", () => {
  const five = normalizeKeyPart("tests/unit/t.test.ts times out after 5s (12ms)");
  const ten = normalizeKeyPart("tests/unit/t.test.ts times out after 10s (9ms)");
  assert.equal(five, "tests/unit/t.test.ts times out after 5s");
  assert.equal(ten, "tests/unit/t.test.ts times out after 10s");
  assert.notEqual(five, ten);
  // a bare trailing duration without a reporter mark is part of the title
  assert.equal(normalizeKeyPart("waits 2 min"), "waits 2 min");
  assert.equal(normalizeKeyPart("suite x 1.5s"), "suite x 1.5s");
  // so two failures that differ only by such a number are different failures
  const result = classifyRed({
    signatures: [sig("Unit Tests", ten)],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Unit Tests", five)]),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
});

test("extractSignatures: annotations → key; output.title fallback; empty when unknown", () => {
  const a = run("Unit Tests (3/8)");
  const b = run("Lint", "failure", { title: "ESLint found 2 errors" });
  const c = run("Typecheck");
  const d = run("Unit Tests (1/8)", "cancelled");
  const sigs = extractSignatures([a, b, c, d], {
    [a.id]: [
      testFailure("tests/unit/zeta.test.ts", "Zeta (5ms)"),
      testFailure("tests/unit/alpha.test.ts", "Alpha"),
      ann("Process completed with exit code 1."),
    ],
    [c.id]: [ann("Process completed with exit code 2.")],
  });
  assert.deepEqual(sigs, [
    {
      check: "Unit Tests",
      key: "tests/unit/alpha.test.ts alpha | tests/unit/zeta.test.ts zeta",
      infra: false,
    },
    { check: "Lint", key: "eslint found 2 errors", infra: false },
    { check: "Typecheck", key: "", infra: false },
    { check: "Unit Tests", key: "", infra: true },
  ]);
});

test("extractSignatures uses the first message line when an annotation has no title", () => {
  const r = run("Unit Tests (2/8)");
  const [s] = extractSignatures([r], {
    [r.id]: [
      {
        path: "tests/unit/x.test.ts",
        title: null,
        message: "x breaks\nstack...",
        level: "failure",
      },
    ],
  });
  assert.equal(s.key, "tests/unit/x.test.ts x breaks");
});

test("same failing test on different shards produces equal signatures", () => {
  const cand = run("Unit Tests (3/8)");
  const base = run("Unit Tests (5/8)");
  const [s1] = extractSignatures([cand], {
    [cand.id]: [testFailure("tests/unit/a.test.ts", "a (10ms)")],
  });
  const [s2] = extractSignatures([base], {
    [base.id]: [testFailure("tests/unit/a.test.ts", "a (95ms)")],
  });
  assert.deepEqual(s1, s2);
});

test("classifyRed: only infra signatures → infra", () => {
  const result = classifyRed({
    signatures: [sig("Unit Tests", "", true), sig("E2E", "", true)],
    baseSha: BASE_SHA,
    baseCheck: null,
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "infra");
  assert.ok(RED_KINDS.includes(result.kind));
});

test("classifyRed: no signatures is never infra", () => {
  const result = classifyRed({
    signatures: [],
    baseSha: BASE_SHA,
    baseCheck: null,
    baseRedIssueOpen: false,
  });
  assert.equal(result.kind, "pr-red");
});

test("classifyRed: base red with the same failures on other shards → base-red", () => {
  const candidate = [sig("Unit Tests", "tests/unit/a.test.ts a"), sig("Lint", "")];
  const base = baseCheck("red", [sig("Unit Tests", "tests/unit/a.test.ts a"), sig("Lint", "")]);
  const result = classifyRed({
    signatures: candidate,
    baseSha: BASE_SHA,
    baseCheck: base,
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "base-red");
  assert.deepEqual(result.matched, candidate);
  assert.deepEqual(result.unmatched, []);
  assert.equal(result.nameOnly, 1, "Lint matched on the check name alone");
  assert.match(result.detail, /1 matched by check name only/);
  assert.equal(result.baseCheckPending, false);
});

test("classifyRed: base green on the same SHA → pr-red even with a base-red issue open", () => {
  const candidate = [sig("Unit Tests", "tests/unit/a.test.ts a")];
  const result = classifyRed({
    signatures: candidate,
    baseSha: BASE_SHA,
    baseCheck: baseCheck("green"),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
  assert.deepEqual(result.unmatched, candidate);
});

test("classifyRed: a failure the base does not have → pr-red (mix of matched and new)", () => {
  const known = sig("Unit Tests", "tests/unit/a.test.ts a");
  const fresh = sig("Unit Tests", "tests/unit/new.test.ts new");
  const result = classifyRed({
    signatures: [known, fresh, sig("E2E", "", true)],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [known]),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
  assert.deepEqual(result.matched, [known]);
  assert.deepEqual(result.unmatched, [fresh]);
  assert.match(result.detail, /new\.test\.ts/);
});

test("classifyRed: infra signatures are ignored when matching against the base", () => {
  const known = sig("Unit Tests", "tests/unit/a.test.ts a");
  const result = classifyRed({
    signatures: [known, sig("E2E", "", true)],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [known]),
    baseRedIssueOpen: false,
  });
  assert.equal(result.kind, "base-red");
  // and an infra-only base failure is not evidence that the base is red
  const infraBase = classifyRed({
    signatures: [known],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Unit Tests", "", true)]),
    baseRedIssueOpen: false,
  });
  assert.equal(infraBase.kind, "pr-red");
});

test("classifyRed: different check name never matches; both-empty keys match by name only", () => {
  const result = classifyRed({
    signatures: [sig("Typecheck", "")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Lint", "")]),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
  // degraded mode (no failure annotations on either side): same check name is the evidence
  const bothEmpty = classifyRed({
    signatures: [sig("Unit Tests", "")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Unit Tests", "")]),
    baseRedIssueOpen: true,
  });
  assert.equal(bothEmpty.kind, "base-red");
  assert.equal(bothEmpty.nameOnly, 1);
});

test("classifyRed: a key on only one side is unknown, never a base-red match", () => {
  // candidate failed somewhere in Lint, base fails a specific known gate: not provably the same
  const candidateEmpty = classifyRed({
    signatures: [sig("Lint", "")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Lint", "eslint found 2 errors")]),
    baseRedIssueOpen: true,
  });
  assert.equal(candidateEmpty.kind, "pr-red");
  assert.deepEqual(candidateEmpty.unmatched, [sig("Lint", "")]);
  // the other way round: the candidate names a test the base check cannot be shown to fail
  const baseEmpty = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/new.test.ts breaks")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Unit Tests", "")]),
    baseRedIssueOpen: true,
  });
  assert.equal(baseEmpty.kind, "pr-red");
  // equal non-empty keys still match
  const same = classifyRed({
    signatures: [sig("Lint", "eslint found 2 errors")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Lint", "eslint found 2 errors")]),
    baseRedIssueOpen: true,
  });
  assert.equal(same.kind, "base-red");
  assert.equal(same.nameOnly, 0);
});

test("classifyRed: base-red issue open and no base check for this SHA → needs-base-check", () => {
  const signatures = [sig("Unit Tests", "tests/unit/a.test.ts a")];
  for (const bc of [
    null,
    baseCheck("red", signatures, OTHER_BASE_SHA),
    baseCheck("timeout", [], OTHER_BASE_SHA),
    baseCheck("pending", [], OTHER_BASE_SHA),
  ]) {
    const result = classifyRed({
      signatures,
      baseSha: BASE_SHA,
      baseCheck: bc,
      baseRedIssueOpen: true,
    });
    assert.equal(result.kind, "needs-base-check", JSON.stringify(bc));
    assert.equal(result.baseCheckPending, false, JSON.stringify(bc));
  }
});

test("classifyRed: same-SHA base check still pending → wait for it, do not start another", () => {
  const result = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/a.test.ts a")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("pending"),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "needs-base-check");
  assert.equal(result.baseCheckPending, true);
  assert.match(result.detail, /base check in progress/);
  // without a base-red issue there is no base-red hypothesis to wait for
  const noIssue = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/a.test.ts a")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("pending"),
    baseRedIssueOpen: false,
  });
  assert.equal(noIssue.kind, "pr-red");
});

test("classifyRed: same-SHA base check timed out → pr-red (it can never be redone)", () => {
  // baseCheckRef is deterministic per SHA and the queue never force-pushes: asking for another
  // base check on this SHA would loop forever.
  const result = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/a.test.ts a")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("timeout"),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
  assert.equal(result.baseCheckPending, false);
  assert.match(result.detail, /timed out/);
  assert.deepEqual(result.unmatched, [sig("Unit Tests", "tests/unit/a.test.ts a")]);
});

test("classifyRed: no base-red issue and no base check → pr-red", () => {
  const result = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/a.test.ts a")],
    baseSha: BASE_SHA,
    baseCheck: null,
    baseRedIssueOpen: false,
  });
  assert.equal(result.kind, "pr-red");
  // a red base check for ANOTHER base SHA is no evidence for this one
  const stale = classifyRed({
    signatures: [sig("Unit Tests", "tests/unit/a.test.ts a")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Unit Tests", "tests/unit/a.test.ts a")], OTHER_BASE_SHA),
    baseRedIssueOpen: false,
  });
  assert.equal(stale.kind, "pr-red");
});

test("end to end: candidate and base runs on different shards classify as base-red", () => {
  const candRun = run("Unit Tests (3/8)");
  const baseRun = run("Unit Tests (6/8)");
  const candSigs = extractSignatures([candRun], {
    [candRun.id]: [testFailure("tests/unit/flaky-base.test.ts", "breaks on base (31ms)")],
  });
  const baseSigs = extractSignatures([baseRun], {
    [baseRun.id]: [testFailure("tests/unit/flaky-base.test.ts", "breaks on base (2.1s)")],
  });
  const result = classifyRed({
    signatures: candSigs,
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", baseSigs),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "base-red");
});
