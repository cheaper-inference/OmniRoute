import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const workflow = load(
  readFileSync(join(root, ".github/workflows/nightly-release-green.yml"), "utf8")
);
const sha = "1".repeat(40);
const posix = { skip: process.platform === "win32" };

// The conditions used by these steps are conjunctions of status functions and
// string comparisons. Reject any other syntax instead of evaluating arbitrary
// code. GitHub adds success() when no status function is present:
// https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#status-check-functions
function shouldRun(step, values, status = "success") {
  const expression = (step.if ?? "success()").replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  const functions = {
    success: status === "success",
    failure: status === "failure",
    cancelled: status === "cancelled",
    always: true,
  };
  const implicitSuccess = /\b(?:success|failure|cancelled|always)\(\)/.test(expression)
    ? true
    : functions.success;
  const clauses = expression.split(/\s*&&\s*/).map((clause) => {
    const call = /^(!?)(success|failure|cancelled|always)\(\)$/.exec(clause.trim());
    if (call) return call[1] ? !functions[call[2]] : functions[call[2]];
    const compare = /^([\w.]+)\s*(==|!=)\s*'([^']*)'$/.exec(clause.trim());
    assert.ok(compare, `unsupported workflow condition: ${clause}`);
    const equal = String(values[compare[1]] ?? "").toLowerCase() === compare[3].toLowerCase();
    return compare[2] === "==" ? equal : !equal;
  });
  return implicitSuccess && clauses.every(Boolean);
}

function observe(job, options = {}) {
  const dir = mkdtempSync(join(tmpdir(), "omni-green-setup-diagnostic-"));
  try {
    const steps = workflow.jobs[job].steps;
    const validate = steps.find((step) => step.id === "validate");
    const diagnostic = steps.find(
      (step) => step.name === "Record incomplete validation after setup failure"
    );
    const notify = steps.find((step) => step.name?.startsWith("Open / update tracking issue"));
    const close = steps.find((step) => step.name?.startsWith("Close tracking issue"));
    const enforce = steps.find((step) => step.name === "Enforce validation verdict");
    if (diagnostic) {
      assert.ok(steps.indexOf(validate) < steps.indexOf(diagnostic));
      assert.ok(steps.indexOf(diagnostic) < steps.indexOf(notify));
      assert.ok(steps.indexOf(notify) < steps.indexOf(enforce));
    }
    const target = options.target ?? (job === "release-green" ? "release/v3.8.53" : "main");
    const revision = options.revision ?? sha;
    const setupFailed = options.setupFailed ?? false;
    const status = options.cancelled ? "cancelled" : setupFailed ? "failure" : "success";
    const bin = join(dir, "bin");
    mkdirSync(bin);
    const ghCalls = join(dir, "gh-calls");
    writeFileSync(ghCalls, "");
    writeFileSync(
      join(bin, "gh"),
      `#!${process.execPath}\nconst fs=require("node:fs"); const args=process.argv.slice(2); fs.appendFileSync(process.env.FIXTURE_GH_CALLS,JSON.stringify(args)+"\\n"); if(args[1]==="list")console.log("123");`,
      { mode: 0o755 }
    );
    writeFileSync(
      join(bin, "git"),
      '#!/bin/sh\nprintf "%s\\trefs/heads/main\\n" "$FIXTURE_CURRENT_SHA"\n',
      {
        mode: 0o755,
      }
    );
    mkdirSync(join(dir, "scripts/quality"), { recursive: true });
    mkdirSync(join(dir, "scripts/ci"), { recursive: true });
    copyFileSync(
      join(root, "scripts/ci/release-green-result.mjs"),
      join(dir, "scripts/ci/release-green-result.mjs")
    );
    writeFileSync(
      join(dir, "scripts/quality/validate-release-green.mjs"),
      "process.stdout.write(process.env.FIXTURE_REPORT); process.exit(Number(process.env.FIXTURE_EXIT));"
    );
    const output = join(dir, "outputs");
    writeFileSync(output, "");
    const report = JSON.stringify({
      schemaVersion: 1,
      candidateSha: options.reportSha ?? sha,
      profile: "full",
      releaseGreen: !options.hardFailure,
      hardFailures: options.hardFailure ? [{ id: "fixture" }] : [],
      checks: [{ id: "fixture", kind: "hard", ok: !options.hardFailure }],
    });
    if (options.staleReport) {
      writeFileSync(join(dir, `${job}.json`), report);
      writeFileSync(join(dir, `${job}.log`), "PASS from an earlier attempt\n");
    }
    const env = {
      ...process.env,
      PATH: `${bin}:${dirname(process.execPath)}:/usr/bin:/bin`,
      GITHUB_OUTPUT: output,
      GITHUB_STEP_SUMMARY: join(dir, "summary"),
      GITHUB_REPOSITORY: "fixture/repo",
      GITHUB_WORKFLOW_SHA: "3".repeat(40),
      FIXTURE_CURRENT_SHA: sha,
      FIXTURE_GH_CALLS: ghCalls,
      FIXTURE_REPORT: options.malformedReport ? "not-json" : report,
      FIXTURE_EXIT: options.hardFailure ? "1" : "0",
      EVENT_NAME: "schedule",
      TARGET: target,
      VALIDATED_SHA: revision,
      VALIDATION_OUTCOME: setupFailed ? "skipped" : "success",
      SCANNER_OUTCOME: setupFailed ? "failure" : "success",
      RUN_URL: "https://example.invalid/runs/1",
    };
    const run = (step, extraEnv = {}) => {
      const result = spawnSync("bash", ["-euo", "pipefail", "-c", step.run], {
        cwd: dir,
        env: { ...env, ...extraEnv },
        encoding: "utf8",
        timeout: 15000,
      });
      assert.equal(result.error, undefined);
      return result;
    };
    if (!setupFailed) {
      const result = run(validate);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    const outputs = Object.fromEntries(
      readFileSync(output, "utf8")
        .trim()
        .split("\n")
        .map((line) => line.split("="))
    );
    const values = {
      "steps.validate.outputs.exit": outputs.exit ?? "",
      "steps.validate.outcome": setupFailed ? "skipped" : "success",
      "steps.revision.outputs.sha": revision,
      "steps.branch.outputs.target": target,
      "github.event_name": "schedule",
    };
    const diagnosticRan = Boolean(diagnostic && shouldRun(diagnostic, values, status));
    if (diagnosticRan) {
      const result = run(diagnostic);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    if (options.missingLog) rmSync(join(dir, `${job}.log`), { force: true });
    if (shouldRun(notify, values, status)) {
      const result = run(notify);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    if (shouldRun(close, values, status)) {
      const result = run(close);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
    const final = run(enforce, { VALIDATION_EXIT: outputs.exit ?? "" });
    const read = (name) =>
      existsSync(join(dir, name)) ? readFileSync(join(dir, name), "utf8") : "";
    return {
      diagnosticRan,
      finalStatus: final.status,
      verdict: JSON.parse(final.stdout),
      log: read(`${job}.log`),
      body: read("issue-body.md"),
      calls: readFileSync(ghCalls, "utf8"),
      reportExists: existsSync(join(dir, `${job}.json`)),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const job of ["release-green", "main-green"]) {
  test(
    `${job}: failed setup records UNKNOWN/INCOMPLETE and updates the incident without fabricating a validation`,
    posix,
    () => {
      const result = observe(job, { setupFailed: true });
      assert.equal(result.diagnosticRan, true);
      assert.equal(result.reportExists, false);
      assert.match(result.log, /UNKNOWN/);
      assert.match(result.log, /INCOMPLETE/);
      assert.match(result.log, /not run|did not run/i);
      assert.match(result.body, /UNKNOWN/);
      assert.doesNotMatch(result.body, /found HARD failures/);
      assert.match(result.calls, /"issue","comment","123"/);
      assert.doesNotMatch(result.calls, /"close"/);
      assert.equal(result.finalStatus, 1);
      assert.equal(result.verdict.verdict, "UNKNOWN");
      assert.equal(result.verdict.evidenceState, "INCOMPLETE");
    }
  );

  test(`${job}: a real validation failure keeps its measured FAIL evidence`, posix, () => {
    const result = observe(job, { hardFailure: true });
    assert.equal(result.diagnosticRan, false);
    assert.equal(result.reportExists, true);
    assert.match(result.calls, /"issue","comment","123"/);
    assert.doesNotMatch(result.calls, /"close"/);
    assert.equal(result.verdict.verdict, "FAIL");
    assert.equal(result.verdict.evidenceState, "COMPLETE");
    assert.equal(result.finalStatus, 1);
  });

  test(`${job}: failed setup discards a previous attempt's PASS report`, posix, () => {
    const result = observe(job, { setupFailed: true, staleReport: true });
    assert.equal(result.reportExists, false);
    assert.match(result.body, /UNKNOWN/);
    assert.doesNotMatch(result.body, /PASS/);
    assert.equal(result.finalStatus, 1);
    assert.equal(result.verdict.evidenceState, "INCOMPLETE");
  });

  test(`${job}: a real full PASS preserves the existing close behavior`, posix, () => {
    const result = observe(job);
    assert.equal(result.diagnosticRan, false);
    assert.match(result.calls, /"issue","close","123"/);
    assert.equal(result.finalStatus, 0);
    assert.equal(result.verdict.verdict, "PASS");
  });

  test(`${job}: a missing log cannot prevent the failure notification`, posix, () => {
    const result = observe(job, { hardFailure: true, missingLog: true });
    assert.match(result.body, /UNKNOWN/);
    assert.match(result.body, /INCOMPLETE/);
    assert.match(result.calls, /"issue","comment","123"/);
    assert.doesNotMatch(result.calls, /"close"/);
    assert.equal(result.finalStatus, 1);
  });

  test(`${job}: malformed or wrong-revision reports never become PASS`, posix, () => {
    for (const fixture of [{ malformedReport: true }, { reportSha: "2".repeat(40) }]) {
      const result = observe(job, fixture);
      assert.equal(result.diagnosticRan, false);
      assert.doesNotMatch(result.calls, /"close"/);
      assert.equal(result.finalStatus, 1);
      assert.equal(result.verdict.evidenceState, "INCOMPLETE");
    }
  });

  test(`${job}: cancellation cannot update or close the incident`, posix, () => {
    for (const setupFailed of [true, false]) {
      const result = observe(job, { setupFailed, cancelled: true });
      assert.equal(result.diagnosticRan, false);
      assert.equal(result.calls, "");
    }
  });

  test(
    `${job}: missing or invalid revision cannot attribute a setup failure to a branch`,
    posix,
    () => {
      for (const revision of ["", "not-a-commit"]) {
        const result = observe(job, { setupFailed: true, revision });
        assert.equal(result.diagnosticRan, true);
        assert.match(result.log, /INCOMPLETE/);
        assert.equal(result.calls, "");
        assert.equal(result.finalStatus, 1);
      }
    }
  );
}

test(
  "release-green: missing or noncanonical target retains diagnostics without changing issues",
  posix,
  () => {
    for (const target of ["", "main", "release/not-a-version"]) {
      const result = observe("release-green", { setupFailed: true, target });
      assert.equal(result.diagnosticRan, true);
      assert.match(result.log, /INCOMPLETE/);
      assert.equal(result.calls, "");
      assert.equal(result.finalStatus, 1);
    }
  }
);
