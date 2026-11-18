import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import test from "node:test";
import {
  computeVerdict,
  summarizeExecutionIncidents,
} from "../../../scripts/quality/validate-release-green.mjs";
import { verifyReleaseGreenReport } from "../../../scripts/ci/release-green-result.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const cliOptions = { skip: process.platform === "win32", timeout: 30000 };
const sha = "1".repeat(40);
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

// Exercise the existing CLI. Tiny external commands replace expensive tools;
// only the optional adapter corrupts a command's returned evidence after it exits.
function observe(
  t,
  {
    failure = "",
    receiptFault = "",
    receiptMutation = null,
    context = {},
    quick = true,
    expireAfterBuild = false,
    changeCandidateAfterBuild = false,
  } = {}
) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "pack-identity-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const path of [
    "scripts/quality",
    "scripts/build",
    "scripts/ad-hoc",
    "config/quality",
    "bin",
    "node_modules/eslint/bin",
  ])
    mkdirSync(join(directory, path), { recursive: true });
  for (const name of [
    "validate-release-green.mjs",
    "gate-process.mjs",
    "release-green-static-profile.mjs",
    "eslint-measurement.mjs",
  ])
    copyFileSync(join(root, "scripts/quality", name), join(directory, "scripts/quality", name));
  writeFileSync(join(directory, "package.json"), JSON.stringify({ type: "commonjs" }));
  writeFileSync(
    join(directory, "config/quality/quality-baseline.json"),
    JSON.stringify({
      metrics: { cognitiveComplexity: { value: 0 }, eslintWarnings: { value: 0 } },
    })
  );
  const trace = join(directory, "commands.jsonl");
  const clockMarker = join(directory, "expired-deadline");
  const candidateMarker = join(directory, "candidate-sha.txt");
  const record = `require("node:fs").appendFileSync(${JSON.stringify(trace)}, JSON.stringify({script, args: process.argv.slice(4)}) + "\\n");`;
  const executable = (name, source) =>
    writeFileSync(join(directory, name), `#!${process.execPath}\n${source}`, { mode: 0o755 });
  executable(
    "bin/git",
    `
    const fs = require("node:fs");
    const marker = ${JSON.stringify(candidateMarker)};
    console.log(fs.existsSync(marker) ? fs.readFileSync(marker, "utf8") : "${sha}");
  `
  );
  executable(
    "bin/npm",
    `
    const script = process.argv[3];
    ${record}
    if(script === "${failure}") process.exit(23);
    if(script === "build:cli" && ${expireAfterBuild}) require("node:fs").writeFileSync(${JSON.stringify(clockMarker)}, "expired");
    if(script === "build:cli" && ${changeCandidateAfterBuild}) require("node:fs").writeFileSync(${JSON.stringify(candidateMarker)}, "${"2".repeat(40)}");
    if(script === "check:complexity-ratchets") console.log("complexity=0\\ncognitiveComplexity=0\\n[complexity] OK — 0 violações (baseline 0)\\n[cognitive-complexity] OK — 0 violações (baseline 0)");
    if(script === "check:workflows") console.log("workflowAuditState=MEASURED\\nworkflowFindings=0\\nprovenanceRunnerFindings=0\\nscheduledGuardFindings=0");
  `
  );
  writeFileSync(
    join(directory, "scripts/build/write-build-sha.mjs"),
    `
    import { appendFileSync } from "node:fs";
    appendFileSync(${JSON.stringify(trace)}, JSON.stringify({script: "stamp-build-sha", args: []}) + "\\n");
    if("${failure}" === "stamp-build-sha") process.exit(24);
  `
  );
  executable(
    "node_modules/eslint/bin/eslint.js",
    `
    const output = process.argv.indexOf("--output-file");
    require("node:fs").writeFileSync(process.argv[output + 1], JSON.stringify([
      { filePath: "fixture.ts", errorCount: 0, warningCount: 0 },
    ]));
  `
  );
  // This fixture expects the composed RC01/RC02 base: local ESLint and a dedicated report.
  if (receiptFault || receiptMutation) {
    const original = pathToFileURL(join(root, "scripts/quality/gate-process.mjs")).href;
    writeFileSync(
      join(directory, "scripts/quality/gate-process.mjs"),
      `
      import { runGateProcess as actual } from ${JSON.stringify(original)};
      export async function runGateProcess(command, args, options) {
        const result = await actual(command, args, options);
        if(args[0] !== "run" || args[1] !== "build:cli") return result;
        const mutation = ${JSON.stringify(receiptMutation)};
        let receipt = result.receipt;
        if(mutation) {
          receipt = mutation.target === "receipt"
            ? { ...receipt, [mutation.key]: mutation.value }
            : { ...receipt, packPhase: { ...receipt.packPhase, [mutation.key]: mutation.value } };
        } else {
          receipt = ${receiptFault === "missing" ? "undefined" : `{ ...result.receipt, outcome: ${JSON.stringify(receiptFault)} }`};
        }
        // An unrelated result-level UUID cannot repair a lost canonical receipt.
        return { ...result, code: 0, invocationId: "44444444-4444-4444-8444-444444444444", receipt };
      }
    `
    );
  }
  const preload = join(directory, "scripts/ad-hoc/pack-clock.mjs");
  writeFileSync(
    preload,
    `
    import { existsSync } from "node:fs";
    const originalNow = Date.now;
    Date.now = () => originalNow() + (existsSync(${JSON.stringify(clockMarker)}) ? 1200001 : 0);
  `
  );
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      preload,
      join(directory, "scripts/quality/validate-release-green.mjs"),
      "--with-build",
      "--json",
      ...(quick ? ["--quick"] : []),
    ],
    {
      cwd: directory,
      env: { PATH: join(directory, "bin"), LANG: "C.UTF-8", ...context },
      encoding: "utf8",
      timeout: 25000,
      maxBuffer: 8 * 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined);
  const calls = existsSync(trace)
    ? readFileSync(trace, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
  return { ...result, calls, report: result.stdout.trim() ? JSON.parse(result.stdout) : null };
}

for (const [name, context] of [
  ["local", {}],
  [
    "hosted",
    { GITHUB_RUN_ID: "1234567", GITHUB_RUN_ATTEMPT: "2", GITHUB_WORKFLOW_SHA: "2".repeat(40) },
  ],
]) {
  test(
    `${name} commands bind their preexisting log UUID to canonical receipts`,
    cliOptions,
    (t) => {
      const result = observe(t, { context });
      assert.equal(result.status, 0, result.stderr);
      assert.equal(result.report.releaseGreen, true);
      const ids = [];
      for (const entry of result.report.commandReceipts) {
        const { command, receiptPath, ...receipt } = entry;
        assert.equal(typeof command, "string");
        assert.match(receipt.invocationId, uuid);
        assert.equal(basename(receipt.logPath), `${receipt.invocationId}.log`);
        assert.deepEqual(receipt, JSON.parse(readFileSync(receiptPath, "utf8")));
        ids.push(receipt.invocationId);
      }
      assert.equal(new Set(ids).size, ids.length);
      const phases = result.report.commandReceipts.filter((entry) => entry.packPhase);
      assert.deepEqual(
        phases.map((entry) => entry.packPhase.phaseId),
        ["build-cli", "stamp-build-sha", "validate-pack-artifact"]
      );
      for (const entry of phases) {
        assert.equal(entry.packPhase.invocationId, entry.invocationId);
        assert.equal(entry.packPhase.candidateSha, sha);
        assert.equal(entry.packPhase.runId, context.GITHUB_RUN_ID ?? null);
        assert.equal(entry.packPhase.runAttempt, context.GITHUB_RUN_ATTEMPT ?? null);
        assert.equal(entry.packPhase.workflowSha, context.GITHUB_WORKFLOW_SHA ?? null);
        assert.equal(entry.packPhase.mode, "shared");
      }
      assert.deepEqual(result.calls.find((entry) => entry.script === "check:pack-artifact").args, [
        "--",
        "--require-staging",
      ]);
    }
  );
}

for (const [failure, exitCode] of [
  ["build:cli", 23],
  ["stamp-build-sha", 24],
]) {
  test(`${failure} failure retains one cause and blocks later pack work`, cliOptions, (t) => {
    const result = observe(t, { failure, quick: false });
    assert.equal(result.status, 1, result.stderr);
    const report = result.report;
    const failed = report.commandReceipts.find((entry) => entry.exitCode === exitCode);
    assert.ok(failed);
    const pack = report.checks.find((entry) => entry.id === "pack-artifact");
    const boot = report.checks.find((entry) => entry.id === "pack-boot");
    assert.equal(pack.ok, false);
    assert.equal(pack.causeId, failed.invocationId);
    assert.match(pack.causeId, uuid);
    assert.equal(pack.phaseId, failure === "build:cli" ? "build-cli" : failure);
    assert.equal(boot.ok, false);
    assert.equal(boot.dependencyOf, "pack-artifact");
    assert.equal(report.hardFailures.length, 2, "blocked boot remains a blocking check");
    assert.equal(report.executionIncidents.incidentCount, 1);
    assert.deepEqual(report.executionIncidents.blockedDependencies, [
      { checkId: "pack-boot", dependencyOf: "pack-artifact" },
    ]);
    assert.ok(!result.calls.some((entry) => entry.script === "check:pack-artifact"));
    assert.ok(!result.calls.some((entry) => entry.script === "check:pack-boot"));
    if (failure === "build:cli")
      assert.ok(!result.calls.some((entry) => entry.script === "stamp-build-sha"));
  });
}

for (const receiptFault of ["FAIL", "CLEANUP_ERROR", "missing"]) {
  test(
    `zero exit with ${receiptFault} evidence cannot authorize stamping or policy`,
    cliOptions,
    (t) => {
      const result = observe(t, { receiptFault });
      assert.equal(result.status, 1, result.stderr);
      assert.equal(result.report.checks.find((entry) => entry.id === "pack-artifact").ok, false);
      assert.ok(result.calls.some((entry) => entry.script === "build:cli"));
      assert.ok(!result.calls.some((entry) => entry.script === "stamp-build-sha"));
      assert.ok(!result.calls.some((entry) => entry.script === "check:pack-artifact"));
      if (receiptFault === "missing") {
        assert.equal(
          result.report.checks.find((entry) => entry.id === "pack-artifact").causeId,
          undefined
        );
      }
    }
  );
}

const hostedContext = {
  GITHUB_RUN_ID: "1234567",
  GITHUB_RUN_ATTEMPT: "2",
  GITHUB_WORKFLOW_SHA: "2".repeat(40),
};

for (const [target, key, value] of [
  ["receipt", "invocationId", "44444444-4444-4444-8444-444444444444"],
  ["phase", "invocationId", "44444444-4444-4444-8444-444444444444"],
  ["phase", "candidateSha", "3".repeat(40)],
  ["phase", "runId", "9999999"],
  ["phase", "runAttempt", "3"],
  ["phase", "workflowSha", "3".repeat(40)],
  ["phase", "phaseId", "stamp-build-sha"],
]) {
  test(`PASS with foreign ${target}.${key} cannot admit the next phase`, cliOptions, (t) => {
    const result = observe(t, { receiptMutation: { target, key, value }, context: hostedContext });
    assert.equal(result.status, 1, result.stderr);
    const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
    assert.equal(pack.ok, false);
    assert.equal(pack.evidenceState, "INCOMPLETE");
    assert.equal(pack.causeId, undefined, "an unbound receipt cannot identify a proven cause");
    assert.ok(!result.calls.some((entry) => entry.script === "stamp-build-sha"));
    assert.ok(!result.calls.some((entry) => entry.script === "check:pack-artifact"));
  });
}

test("one cleanup failure retains both blocking checks and a blocked boot", cliOptions, (t) => {
  const result = observe(t, { receiptFault: "CLEANUP_ERROR", quick: false });
  assert.equal(result.status, 1, result.stderr);
  const { report } = result;
  assert.equal(report.releaseGreen, false);
  assert.equal(report.hardFailures.length, 3);
  assert.equal(report.executionIncidents.incidentCount, 1);
  assert.equal(report.executionIncidents.incidents[0].checkIds.length, 2);
  assert.deepEqual(report.executionIncidents.blockedDependencies, [
    { checkId: "pack-boot", dependencyOf: "pack-artifact" },
  ]);
});

test("partial hosted context refuses the package command before it starts", cliOptions, (t) => {
  const result = observe(t, { context: { GITHUB_RUN_ID: "1234567" } });
  assert.equal(result.status, 1, result.stderr);
  const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
  assert.equal(pack.ok, false);
  assert.equal(pack.evidenceState, "INCOMPLETE");
  assert.equal(pack.causeId, undefined);
  assert.ok(!result.calls.some((entry) => entry.script === "build:cli"));
});

test("an expired shared deadline creates no receipt for an unstarted phase", cliOptions, (t) => {
  const result = observe(t, { expireAfterBuild: true });
  assert.equal(result.status, 1, result.stderr);
  const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
  assert.equal(pack.ok, false);
  assert.equal(pack.phaseId, "stamp-build-sha");
  assert.equal(pack.causeId, undefined);
  assert.deepEqual(
    result.report.commandReceipts
      .filter((entry) => entry.packPhase)
      .map((entry) => entry.packPhase.phaseId),
    ["build-cli"]
  );
  assert.ok(!result.calls.some((entry) => entry.script === "stamp-build-sha"));
});

test("a changed checkout cannot relabel prior evidence or authorize stamping", cliOptions, (t) => {
  const result = observe(t, { changeCandidateAfterBuild: true });
  assert.equal(result.status, 1, result.stderr);
  assert.equal(result.report.candidateSha, sha);
  const pack = result.report.checks.find((entry) => entry.id === "pack-artifact");
  assert.equal(pack.ok, false);
  assert.equal(pack.evidenceState, "INCOMPLETE");
  assert.equal(pack.causeId, undefined);
  assert.ok(!result.calls.some((entry) => entry.script === "stamp-build-sha"));
  assert.deepEqual(
    result.report.commandReceipts
      .filter((entry) => entry.packPhase)
      .map((entry) => entry.packPhase.candidateSha),
    [sha]
  );
});

test("distinct or unknown causes stay separate and incident counts cannot certify green", () => {
  const causeId = "33333333-3333-4333-8333-333333333333";
  const checks = [
    { id: "pack-artifact", kind: "hard", ok: false, causeId },
    { id: "execution-1", kind: "hard", ok: false, causeId },
    { id: "pack-boot", kind: "hard", ok: false, dependencyOf: "pack-artifact" },
  ];
  assert.equal(summarizeExecutionIncidents(checks).incidentCount, 1);
  assert.equal(computeVerdict(checks).hardFailures.length, 3);
  const report = {
    schemaVersion: 1,
    candidateSha: sha,
    profile: "full",
    releaseGreen: false,
    checks,
    hardFailures: checks.map(({ id }) => ({ id })),
    executionIncidents: summarizeExecutionIncidents(checks),
  };
  assert.equal(verifyReleaseGreenReport(report, "1", sha, "schedule").verdict, "FAIL");
  assert.equal(
    verifyReleaseGreenReport({ ...report, releaseGreen: true }, "0", sha, "schedule").verdict,
    "UNKNOWN"
  );
  const separate = [
    checks[0],
    { id: "second", kind: "hard", ok: false, causeId: "44444444-4444-4444-8444-444444444444" },
    { id: "unknown-a", kind: "hard", ok: false },
    { id: "unknown-b", kind: "hard", ok: false },
  ];
  assert.equal(summarizeExecutionIncidents(separate).incidentCount, 4);
});
