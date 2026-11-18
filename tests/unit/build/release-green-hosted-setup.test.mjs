import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
const workflowSha = "3".repeat(40);
const posix = { skip: process.platform === "win32" };

// This deliberately handles only conjunctions used by these steps. It never
// evaluates JavaScript from YAML. Conditions without a status function retain
// GitHub Actions' implicit success(), including its cancellation behavior.
function shouldRun(step, values, status) {
  if (!step) return false;
  const expression = (step.if ?? "success()").replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  const functions = {
    success: status === "success",
    failure: status === "failure",
    cancelled: status === "cancelled",
    always: true,
  };
  const implicit =
    /\b(?:success|failure|cancelled|always)\(\)/.test(expression) || functions.success;
  return (
    implicit &&
    expression.split(/\s*&&\s*/).every((clause) => {
      const call = /^(!?)(success|failure|cancelled|always)\(\)$/.exec(clause.trim());
      if (call) return call[1] ? !functions[call[2]] : functions[call[2]];
      const compare = /^([\w.]+)\s*(==|!=)\s*'([^']*)'$/.exec(clause.trim());
      assert.ok(compare, "unsupported workflow condition: " + clause);
      const equal = String(values[compare[1]] ?? "").toLowerCase() === compare[3].toLowerCase();
      return compare[2] === "==" ? equal : !equal;
    })
  );
}

function observe(t, job, options = {}) {
  const dir = mkdtempSync(join(tmpdir(), "omni-hosted-setup-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const steps = workflow.jobs[job].steps;
  const validate = steps.find((step) => step.id === "validate");
  const diagnostic = steps.find(
    (step) => step.name === "Record incomplete validation after setup failure"
  );
  const notify = steps.find((step) => step.name?.startsWith("Open / update tracking issue"));
  const close = steps.find((step) => step.name?.startsWith("Close tracking issue"));
  const enforce = steps.find((step) => step.name === "Enforce validation verdict");
  assert.ok(validate && notify && close && enforce);
  if (diagnostic) {
    assert.ok(steps.indexOf(validate) < steps.indexOf(diagnostic));
    assert.ok(steps.indexOf(diagnostic) < steps.indexOf(notify));
    assert.equal(diagnostic.env?.VALIDATED_SHA, "${{ steps.revision.outputs.sha }}");
    assert.equal(diagnostic.env?.SETUP_NODE_OUTCOME, "${{ steps.runtime.outcome }}");
    assert.equal(diagnostic.env?.DEPENDENCIES_OUTCOME, "${{ steps.dependencies.outcome }}");
    assert.equal(diagnostic.env?.SCANNER_OUTCOME, "${{ steps.workflow_scanners.outcome }}");
    assert.equal(diagnostic.env?.VALIDATION_OUTCOME, "${{ steps.validate.outcome }}");
    assert.ok(steps.find((step) => step.id === "runtime")?.uses?.startsWith("actions/setup-node@"));
    assert.equal(
      steps.find((step) => step.id === "dependencies")?.uses,
      "./.github/actions/npm-ci-retry"
    );
    assert.equal(notify.env?.VALIDATED_SHA, "${{ steps.revision.outputs.sha }}");
    const upload = steps.find((step) => step.name === "Upload report artifact");
    assert.ok(
      upload?.with?.path
        ?.trim()
        .split(/\r?\n/)
        .includes(job + "-setup.json")
    );
  }
  const target = options.target ?? (job === "release-green" ? "release/v3.8.55" : "main");
  const revision = options.revision ?? sha;
  const failedStep = options.failedStep ?? "";
  const setupFailed = failedStep !== "";
  const outcomes = {
    runtime: failedStep === "runtime" ? "failure" : "success",
    dependencies:
      failedStep === "runtime" ? "skipped" : failedStep === "dependencies" ? "failure" : "success",
    workflow_scanners: ["runtime", "dependencies"].includes(failedStep)
      ? "skipped"
      : setupFailed
        ? "failure"
        : "success",
    validate: setupFailed ? "skipped" : "success",
  };
  const identity = {
    schemaVersion: 1,
    candidateSha: sha,
    workflowSha,
    runId: options.runId ?? "6101",
    runAttempt: options.runAttempt ?? "2",
    jobId: job,
    phase: "validation",
  };
  const report = {
    schemaVersion: 1,
    candidateSha: options.reportSha ?? sha,
    profile: options.event === "push" ? "quick" : "full",
    observerIdentity: { ...identity, ...(options.reportIdentity ?? {}) },
    releaseGreen: !options.hardFailure,
    hardFailures: options.hardFailure ? [{ id: "fixture" }] : [],
    checks: [{ id: "fixture", kind: "hard", ok: !options.hardFailure }],
  };
  const bin = join(dir, "bin");
  mkdirSync(bin);
  const calls = join(dir, "gh-calls");
  writeFileSync(calls, "");
  const executable = (name, body) =>
    writeFileSync(join(bin, name), "#!" + process.execPath + "\n" + body, { mode: 0o755 });
  executable(
    "gh",
    [
      'const fs = require("node:fs");',
      "const args = process.argv.slice(2);",
      'fs.appendFileSync(process.env.FIXTURE_CALLS, JSON.stringify(args) + "\\n");',
      'if (args[0] === "issue" && args[1] === "list") console.log("123");',
    ].join("\n")
  );
  executable("git", 'console.log(process.env.FIXTURE_CURRENT_SHA + "\\trefs/heads/main");');
  // Run the real verifier/helpers from the candidate under test, so adding a
  // dependency-free diagnostic helper does not require copying its dependencies.
  executable(
    "node",
    [
      'const { spawnSync } = require("node:child_process");',
      'const path = require("node:path");',
      "const args = process.argv.slice(2);",
      'if (args[0]?.startsWith("scripts/ci/")) args[0] = path.join(process.env.FIXTURE_ROOT, args[0]);',
      'const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env, timeout: 10000 });',
      "process.exitCode = result.status ?? 99;",
    ].join("\n")
  );
  mkdirSync(join(dir, "scripts/quality"), { recursive: true });
  writeFileSync(
    join(dir, "scripts/quality/validate-release-green.mjs"),
    "process.stdout.write(process.env.FIXTURE_REPORT); process.exitCode = Number(process.env.FIXTURE_EXIT);"
  );
  if (options.staleReport) {
    writeFileSync(
      join(dir, job + ".json"),
      JSON.stringify({
        ...report,
        observerIdentity: { ...identity, runAttempt: "1" },
      })
    );
    writeFileSync(join(dir, job + ".log"), "PASS from an earlier attempt\n");
  }
  const output = join(dir, "outputs");
  writeFileSync(output, "");
  const env = {
    ...process.env,
    NODE_OPTIONS: "",
    PATH: bin + ":" + dirname(process.execPath) + ":/usr/bin:/bin",
    GITHUB_ACTIONS: "true",
    GITHUB_OUTPUT: output,
    GITHUB_STEP_SUMMARY: join(dir, "summary"),
    GITHUB_REPOSITORY: "fixture/repo",
    GITHUB_WORKFLOW_SHA: workflowSha,
    GITHUB_RUN_ID: identity.runId,
    GITHUB_RUN_ATTEMPT: identity.runAttempt,
    GITHUB_JOB: job,
    GH_HOST: "example.invalid",
    GH_TOKEN: "fixture-token-not-a-credential",
    FIXTURE_ROOT: root,
    FIXTURE_CALLS: calls,
    FIXTURE_CURRENT_SHA: options.currentSha ?? sha,
    FIXTURE_REPORT: options.malformedReport ? "not-json" : JSON.stringify(report),
    FIXTURE_EXIT: options.hardFailure ? "1" : "0",
    EVENT_NAME: options.event ?? "schedule",
    TARGET: target,
    VALIDATED_SHA: revision,
    SETUP_NODE_OUTCOME: outcomes.runtime,
    DEPENDENCIES_OUTCOME: outcomes.dependencies,
    SCANNER_OUTCOME: outcomes.workflow_scanners,
    VALIDATION_OUTCOME: outcomes.validate,
    RUN_URL: "https://example.invalid/fixture/repo/actions/runs/6101/attempts/2",
  };
  const run = (step, extra = {}) => {
    const result = spawnSync("/bin/bash", ["-euo", "pipefail", "-c", step.run], {
      cwd: dir,
      env: { ...env, ...extra },
      encoding: "utf8",
      timeout: 15000,
    });
    assert.equal(result.error, undefined);
    return result;
  };
  let status = setupFailed ? "failure" : "success";
  if (!setupFailed) {
    const result = run(validate);
    status = result.status === 0 ? "success" : "failure";
    outcomes.validate = status;
  }
  if (options.cancelled) status = "cancelled";
  const outputs = Object.fromEntries(
    readFileSync(output, "utf8")
      .trim()
      .split("\n")
      .map((line) => line.split("="))
  );
  const values = {
    "steps.validate.outputs.exit": outputs.exit ?? "",
    "steps.validate.outcome": outcomes.validate,
    "steps.runtime.outcome": outcomes.runtime,
    "steps.dependencies.outcome": outcomes.dependencies,
    "steps.workflow_scanners.outcome": outcomes.workflow_scanners,
    "steps.revision.outputs.sha": revision,
    "steps.branch.outputs.target": target,
    "github.event_name": env.EVENT_NAME,
    "github.run_id": identity.runId,
    "github.run_attempt": identity.runAttempt,
    "github.workflow_sha": workflowSha,
  };
  const diagnosticRan = shouldRun(diagnostic, values, status);
  if (diagnosticRan) {
    const result = run(diagnostic);
    assert.equal(result.status, 0, result.stdout + result.stderr);
  }
  if (options.missingLog) rmSync(join(dir, job + ".log"), { force: true });
  for (const step of [notify, close]) {
    if (shouldRun(step, values, status)) {
      const result = run(step);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    }
  }
  const final = run(enforce, { VALIDATION_EXIT: outputs.exit ?? "" });
  const read = (name) => (existsSync(join(dir, name)) ? readFileSync(join(dir, name), "utf8") : "");
  const setup = read(job + "-setup.json");
  return {
    diagnosticRan,
    setup: setup ? JSON.parse(setup) : null,
    finalStatus: final.status,
    verdict: JSON.parse(final.stdout),
    log: read(job + ".log"),
    body: read("issue-body.md"),
    calls: read("gh-calls")
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line)),
    reportExists: existsSync(join(dir, job + ".json")),
    identity,
    outcomes,
  };
}

const wroteIssue = (result) =>
  result.calls.some((args) => args[0] === "issue" && ["comment", "create"].includes(args[1]));
const closedIssue = (result) =>
  result.calls.some((args) => args[0] === "issue" && args[1] === "close");

for (const job of ["release-green", "main-green"]) {
  for (const failedStep of ["runtime", "dependencies", "workflow_scanners"]) {
    test(
      job + ": setup failure in " + failedStep + " retains exact incomplete evidence",
      posix,
      (t) => {
        const result = observe(t, job, { failedStep });
        assert.equal(result.diagnosticRan, true);
        assert.equal(result.reportExists, false, "setup must not fabricate a validation report");
        assert.equal(result.setup?.verdict, "UNKNOWN");
        assert.equal(result.setup?.evidenceState, "INCOMPLETE");
        assert.deepEqual(result.setup?.observerIdentity, { ...result.identity, phase: "setup" });
        assert.equal(result.setup?.failedStep, failedStep);
        assert.deepEqual(result.setup?.stepOutcomes, result.outcomes);
        assert.match(result.log, /UNKNOWN/);
        assert.match(result.body, /INCOMPLETE/);
        assert.match(result.body, new RegExp(sha));
        assert.match(result.body, /6101/);
        assert.doesNotMatch(result.body, /found HARD failures/);
        assert.equal(wroteIssue(result), true);
        assert.equal(closedIssue(result), false);
        assert.equal(result.finalStatus, 1);
        assert.equal(result.verdict.verdict, "UNKNOWN");
      }
    );
  }

  test(job + ": setup failure removes the previous attempt's successful report", posix, (t) => {
    const result = observe(t, job, { failedStep: "workflow_scanners", staleReport: true });
    assert.equal(result.reportExists, false);
    assert.equal(result.setup?.observerIdentity.runAttempt, "2");
    assert.doesNotMatch(result.log + result.body, /PASS from an earlier attempt/);
    assert.equal(closedIssue(result), false);
    assert.equal(result.verdict.evidenceState, "INCOMPLETE");
  });

  test(
    job + ": measured validation failure is not overwritten by setup diagnostics",
    posix,
    (t) => {
      const result = observe(t, job, { hardFailure: true });
      assert.equal(result.diagnosticRan, false);
      assert.equal(result.setup, null);
      assert.equal(result.reportExists, true);
      assert.equal(wroteIssue(result), true);
      assert.equal(closedIssue(result), false);
      assert.equal(result.verdict.verdict, "FAIL");
      assert.equal(result.verdict.evidenceState, "COMPLETE");
    }
  );

  test(job + ": exact full PASS can still close the incident at the current tip", posix, (t) => {
    const result = observe(t, job);
    assert.equal(result.finalStatus, 0);
    assert.equal(result.verdict.verdict, "PASS");
    assert.equal(closedIssue(result), true);
    assert.equal(wroteIssue(result), false);
  });

  test(job + ": a quick PASS does not close the full validation incident", posix, (t) => {
    const result = observe(t, job, { event: "push" });
    assert.equal(result.verdict.verdict, "PASS");
    assert.equal(closedIssue(result), false);
  });

  test(job + ": a branch advancing after validation keeps the incident open", posix, (t) => {
    const result = observe(t, job, { currentSha: "2".repeat(40) });
    assert.equal(result.verdict.verdict, "PASS");
    assert.equal(closedIssue(result), false);
  });

  for (const [name, options] of [
    ["wrong SHA", { reportSha: "2".repeat(40) }],
    ["earlier attempt", { reportIdentity: { runAttempt: "1" } }],
    ["foreign workflow", { reportIdentity: { workflowSha: "4".repeat(40) } }],
    ["malformed JSON", { malformedReport: true }],
  ]) {
    test(job + ": " + name + " cannot close the incident", posix, (t) => {
      const result = observe(t, job, options);
      assert.equal(closedIssue(result), false);
      assert.equal(result.finalStatus, 1);
      assert.equal(result.verdict.verdict, "UNKNOWN");
      assert.equal(result.verdict.evidenceState, "INCOMPLETE");
    });
  }

  test(job + ": missing log cannot suppress the incomplete notification", posix, (t) => {
    const result = observe(t, job, { hardFailure: true, missingLog: true });
    assert.equal(wroteIssue(result), true);
    assert.match(result.body, /UNKNOWN/);
    assert.match(result.body, /INCOMPLETE/);
    assert.equal(closedIssue(result), false);
  });

  for (const failedStep of ["", "workflow_scanners"]) {
    test(
      job + ": cancellation after " + (failedStep || "validation") + " does not mutate the issue",
      posix,
      (t) => {
        const result = observe(t, job, { failedStep, cancelled: true });
        assert.equal(result.diagnosticRan, false);
        assert.deepEqual(result.calls, []);
      }
    );
  }

  for (const revision of ["", "not-a-commit"]) {
    test(
      job + ": unverified revision " + JSON.stringify(revision) + " retains local diagnostics only",
      posix,
      (t) => {
        const result = observe(t, job, { failedStep: "dependencies", revision });
        assert.equal(result.diagnosticRan, true);
        assert.equal(result.setup?.evidenceState, "INCOMPLETE");
        assert.equal(result.setup?.observerIdentity?.candidateSha ?? null, null);
        assert.deepEqual(result.calls, []);
        assert.equal(result.finalStatus, 1);
      }
    );
  }

  for (const context of [{ runId: "" }, { runAttempt: "0" }]) {
    test(
      job + ": missing execution context does not attribute an incident " + JSON.stringify(context),
      posix,
      (t) => {
        const result = observe(t, job, { hardFailure: true, ...context });
        assert.deepEqual(result.calls, []);
        assert.equal(result.verdict.evidenceState, "INCOMPLETE");
        assert.equal(result.finalStatus, 1);
      }
    );
  }
}

for (const target of ["", "main", "release/not-a-version"]) {
  test(
    "release-green: noncanonical target " + JSON.stringify(target) + " never mutates issues",
    posix,
    (t) => {
      const result = observe(t, "release-green", { target, failedStep: "dependencies" });
      assert.equal(result.diagnosticRan, true);
      assert.equal(result.setup?.evidenceState, "INCOMPLETE");
      assert.deepEqual(result.calls, []);
      assert.equal(result.finalStatus, 1);
    }
  );
}
