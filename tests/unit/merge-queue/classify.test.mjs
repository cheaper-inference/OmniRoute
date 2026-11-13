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

test("key parts drop ANSI codes, durations and case", () => {
  assert.equal(
    normalizeKeyPart("\u001b[31mTests/Unit/A.test.ts\u001b[0m  Retries Once (12ms)"),
    "tests/unit/a.test.ts retries once"
  );
  assert.equal(normalizeKeyPart("suite x 1.5s"), "suite x");
  assert.equal(normalizeKeyPart(null), "");
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
  const base = baseCheck("red", [
    sig("Unit Tests", "tests/unit/a.test.ts a"),
    sig("Lint", "eslint 2 errors"),
  ]);
  const result = classifyRed({
    signatures: candidate,
    baseSha: BASE_SHA,
    baseCheck: base,
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "base-red");
  assert.deepEqual(result.matched, candidate);
  assert.deepEqual(result.unmatched, []);
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

test("classifyRed: different check name never matches; empty keys match within a check", () => {
  const result = classifyRed({
    signatures: [sig("Typecheck", "")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Lint", "")]),
    baseRedIssueOpen: true,
  });
  assert.equal(result.kind, "pr-red");
  const sameCheck = classifyRed({
    signatures: [sig("Lint", "")],
    baseSha: BASE_SHA,
    baseCheck: baseCheck("red", [sig("Lint", "eslint found 2 errors")]),
    baseRedIssueOpen: true,
  });
  assert.equal(sameCheck.kind, "base-red");
});

test("classifyRed: base-red issue open and no finished base check → needs-base-check", () => {
  const signatures = [sig("Unit Tests", "tests/unit/a.test.ts a")];
  for (const bc of [
    null,
    baseCheck("pending"),
    baseCheck("timeout"),
    baseCheck("red", signatures, OTHER_BASE_SHA),
  ]) {
    const result = classifyRed({
      signatures,
      baseSha: BASE_SHA,
      baseCheck: bc,
      baseRedIssueOpen: true,
    });
    assert.equal(result.kind, "needs-base-check", JSON.stringify(bc));
  }
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
