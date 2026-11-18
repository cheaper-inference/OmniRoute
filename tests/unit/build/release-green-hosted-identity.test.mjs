import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";
import { verifyReleaseGreenReport } from "../../../scripts/ci/release-green-result.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const sha = "1".repeat(40);
const expected = {
  schemaVersion: 1,
  candidateSha: sha,
  workflowSha: "3".repeat(40),
  runId: "6101",
  runAttempt: "2",
  jobId: "release-green",
  phase: "validation",
};
const posix = { skip: process.platform === "win32" };
const report = (identity = expected, failed = false) => ({
  schemaVersion: 1,
  candidateSha: sha,
  profile: "full",
  observerIdentity: identity,
  releaseGreen: !failed,
  hardFailures: failed ? [{ id: "fixture" }] : [],
  checks: [{ id: "fixture", kind: "hard", ok: !failed }],
});

test("an exact hosted observation is accepted", () => {
  assert.equal(verifyReleaseGreenReport(report(), "0", sha, "schedule", expected).verdict, "PASS");
});

const mutations = [
  ["missing identity", undefined],
  ["wrong candidate", { ...expected, candidateSha: "2".repeat(40) }],
  ["wrong workflow revision", { ...expected, workflowSha: "4".repeat(40) }],
  ["another run", { ...expected, runId: "6102" }],
  ["an earlier attempt of the same SHA", { ...expected, runAttempt: "1" }],
  ["the other job", { ...expected, jobId: "main-green" }],
  ["setup receipt presented as completed validation", { ...expected, phase: "setup" }],
  ["unsupported schema", { ...expected, schemaVersion: 2 }],
  ["numeric attempt instead of canonical string", { ...expected, runAttempt: 2 }],
];
for (const [name, identity] of mutations) {
  test("hosted verifier rejects " + name, () => {
    const input = report(identity);
    if (identity === undefined) delete input.observerIdentity;
    const result = verifyReleaseGreenReport(input, "0", sha, "schedule", expected);
    assert.equal(result.verdict, "UNKNOWN");
    assert.equal(result.evidenceState, "INCOMPLETE");
    assert.equal(result.exit, 1);
  });
}

for (const [name, identity] of [
  ["empty expected context", {}],
  ["missing expected run", { ...expected, runId: undefined }],
  ["invalid expected attempt", { ...expected, runAttempt: "0" }],
]) {
  test("invalid invocation identity cannot be repaired from the report: " + name, () => {
    const result = verifyReleaseGreenReport(report(), "0", sha, "schedule", identity);
    assert.equal(result.verdict, "UNKNOWN");
    assert.equal(result.evidenceState, "INCOMPLETE");
  });
}

test("measured hard failures retain FAIL with the exact execution identity", () => {
  const result = verifyReleaseGreenReport(report(expected, true), "1", sha, "schedule", expected);
  assert.equal(result.verdict, "FAIL");
  assert.equal(result.evidenceState, "COMPLETE");
});

test("incomplete hosted evidence cannot be relabelled a measured code failure", () => {
  const input = report(expected, true);
  input.checks[0].evidenceState = "INCOMPLETE";
  const result = verifyReleaseGreenReport(input, "1", sha, "schedule", expected);
  assert.equal(result.verdict, "UNKNOWN");
  assert.equal(result.evidenceState, "INCOMPLETE");
  assert.equal(result.exit, 1);
});

test("wrong top-level candidate remains rejected", () => {
  const input = { ...report(), candidateSha: "2".repeat(40) };
  assert.equal(verifyReleaseGreenReport(input, "0", sha, "schedule", expected).verdict, "UNKNOWN");
});

test("local legacy verification remains distinct from mandatory hosted binding", () => {
  const input = report();
  delete input.observerIdentity;
  assert.equal(verifyReleaseGreenReport(input, "0", sha, "schedule").verdict, "PASS");
});

function cli(t, input, environment = {}) {
  const dir = mkdtempSync(join(tmpdir(), "omni-hosted-result-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const path = join(dir, "report.json");
  writeFileSync(path, JSON.stringify(input));
  const result = spawnSync(
    process.execPath,
    [join(root, "scripts/ci/release-green-result.mjs"), path, "0", sha, "schedule"],
    {
      cwd: dir,
      encoding: "utf8",
      timeout: 10000,
      env: {
        ...process.env,
        NODE_OPTIONS: "",
        GITHUB_OUTPUT: "",
        GITHUB_ACTIONS: "true",
        GITHUB_JOB: expected.jobId,
        GITHUB_WORKFLOW_SHA: expected.workflowSha,
        GITHUB_RUN_ID: expected.runId,
        GITHUB_RUN_ATTEMPT: expected.runAttempt,
        ...environment,
      },
    }
  );
  assert.equal(result.error, undefined);
  return { status: result.status, verdict: JSON.parse(result.stdout) };
}

test("the actual hosted CLI rejects a report from the previous attempt", (t) => {
  const result = cli(t, report({ ...expected, runAttempt: "1" }));
  assert.equal(result.status, 1);
  assert.equal(result.verdict.verdict, "UNKNOWN");
});

test("the hosted CLI cannot fall back to local mode when run context is missing", (t) => {
  const result = cli(t, report(), { GITHUB_RUN_ID: "" });
  assert.equal(result.status, 1);
  assert.equal(result.verdict.evidenceState, "INCOMPLETE");
});

test("the actual CLI preserves a bound successful report", (t) => {
  const result = cli(t, report());
  assert.equal(result.status, 0);
  assert.equal(result.verdict.verdict, "PASS");
});

// Exercise the report producer, not a serializer double. All costly external
// gates are tiny fixture executables. The real supervisor, JSON writer and
// measurement-file consumer remain in place from RC01/RC02/RC03.
test(
  "observer binds its own report before executing hosted gates",
  { ...posix, timeout: 30000 },
  (t) => {
    const artifacts = join(root, "_artifacts");
    mkdirSync(artifacts, { recursive: true });
    const dir = mkdtempSync(join(artifacts, "hosted-observer-identity-"));
    t.after(() => rmSync(dir, { recursive: true, force: true }));
    for (const path of ["scripts/quality", "bin", "config/quality", "node_modules/eslint/bin"])
      mkdirSync(join(dir, path), { recursive: true });
    for (const name of [
      "validate-release-green.mjs",
      "gate-process.mjs",
      "release-green-static-profile.mjs",
      "eslint-measurement.mjs",
    ])
      copyFileSync(join(root, "scripts/quality", name), join(dir, "scripts/quality", name));
    writeFileSync(
      join(dir, "scripts/quality/gate-process.mjs"),
      [
        "import { runGateProcess as actual } from " +
          JSON.stringify(pathToFileURL(join(root, "scripts/quality/gate-process.mjs")).href) +
          ";",
        "export async function runGateProcess(command, args, options) {",
        "  const result = await actual(command, args, options);",
        '  process.env.GITHUB_RUN_ATTEMPT = "9";',
        "  return result;",
        "}",
      ].join("\n")
    );
    writeFileSync(join(dir, "package.json"), JSON.stringify({ type: "commonjs" }));
    writeFileSync(
      join(dir, "config/quality/quality-baseline.json"),
      JSON.stringify({
        metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
      })
    );
    const executable = (path, source) =>
      writeFileSync(join(dir, path), "#!" + process.execPath + "\n" + source, { mode: 0o755 });
    executable("bin/git", "console.log(process.env.FIXTURE_SHA);");
    executable(
      "bin/npm",
      [
        "const script = process.argv[3];",
        'if (script === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");',
        'if (script === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");',
      ].join("\n")
    );
    executable(
      "node_modules/eslint/bin/eslint.js",
      [
        'const fs = require("node:fs");',
        'const index = process.argv.indexOf("--output-file");',
        'fs.writeFileSync(process.argv[index + 1], JSON.stringify([{ filePath: "fixture.ts", errorCount: 0, warningCount: 0 }]));',
      ].join("\n")
    );
    const result = spawnSync(
      process.execPath,
      [join(dir, "scripts/quality/validate-release-green.mjs"), "--json", "--quick", "--hermetic"],
      {
        cwd: dir,
        encoding: "utf8",
        timeout: 25000,
        env: {
          ...process.env,
          NODE_OPTIONS: "",
          PATH: join(dir, "bin") + ":" + dirname(process.execPath) + ":/usr/bin:/bin",
          GITHUB_ACTIONS: "true",
          GITHUB_JOB: expected.jobId,
          GITHUB_RUN_ID: expected.runId,
          GITHUB_RUN_ATTEMPT: expected.runAttempt,
          GITHUB_WORKFLOW_SHA: expected.workflowSha,
          GITHUB_EVENT_NAME: "push",
          FIXTURE_SHA: sha,
          OMNIROUTE_GATE_MODE: "pr",
        },
      }
    );
    assert.equal(result.error, undefined);
    const produced = JSON.parse(result.stdout);
    assert.equal(produced.candidateSha, sha);
    assert.deepEqual(produced.observerIdentity, expected);
    assert.equal(produced.profile, "quick");
  }
);
