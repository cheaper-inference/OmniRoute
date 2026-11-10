import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { evaluateAdmission } from "../../../scripts/quality/admission-verdict.mjs";

const root = new URL("../../../", import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), "utf8");
const ci = parse(read(".github/workflows/ci.yml"));
const quality = parse(read(".github/workflows/quality.yml"));
const producer = parse(read(".github/workflows/codeql.yml"));
const maintenance = parse(read(".github/workflows/codeql-maintenance.yml"));
const policy = JSON.parse(read("config/quality/admission-policy.json"));
const activeRelease = `release/v${JSON.parse(read("package.json")).version}`;

test("admission depends on the complete producer matrix and the final Gate depends on both", () => {
  assert.equal(ci.jobs["codeql-scan"].uses, "./.github/workflows/codeql.yml");
  assert.deepEqual(ci.jobs["codeql-admission"].needs, ["changes", "codeql-scan"]);
  assert.deepEqual(Object.keys(producer.jobs), ["analyze"]);
  assert.equal(producer.jobs.analyze.strategy["fail-fast"], false);
  for (const id of ["codeql-scan", "codeql-admission", "dast-smoke"]) {
    assert.ok(ci.jobs["admission-verdict"].needs.includes(id));
    assert.equal(policy.profiles.ci.jobs[id].disposition, "required");
  }
  assert.deepEqual(ci.jobs["dast-smoke"].needs, ["changes", "build"]);
  assert.equal(ci.jobs["codeql-admission"]["continue-on-error"], undefined);
  assert.ok(ci.jobs["codeql-admission"].if.includes("always()"));
  assert.ok(ci.jobs["codeql-admission"].if.includes("queueCandidate"));
});

test("producer receipts come from the same run with separate matrix names and strict digest checks", () => {
  const download = ci.jobs["codeql-admission"].steps.find((step) =>
    step.uses?.startsWith("actions/download-artifact@")
  );
  assert.equal(download.with.pattern, "codeql-upload-${{ github.run_id }}-*");
  assert.equal(download.with["merge-multiple"], false);
  assert.equal(download.with["digest-mismatch"], "error");
  for (const key of ["github-token", "run-id", "repository"])
    assert.equal(download.with[key], undefined);
  const steps = producer.jobs.analyze.steps;
  const analysis = steps.findIndex((step) => step.id === "analyze");
  const receipt = steps.findIndex((step) => step.run?.endsWith("producer.mjs write"));
  const upload = steps.findIndex((step) => step.uses?.startsWith("actions/upload-artifact@"));
  assert.ok(analysis >= 0 && receipt > analysis && upload > receipt);
  assert.equal(steps[receipt].env.CODEQL_SARIF_ID, "${{ steps.analyze.outputs.sarif-id }}");
  assert.match(steps[upload].with.name, /matrix.language.*github.run_attempt/);
  assert.equal(steps[upload].with["if-no-files-found"], "error");
  assert.equal(producer.on.workflow_call.outputs, undefined, "no last-matrix-output shortcut");
});

test("Quality has no early duplicate API poll and the candidate command cannot wait for an unrelated run", () => {
  const allSteps = (workflow) => Object.values(workflow.jobs).flatMap((job) => job.steps ?? []);
  assert.equal(
    allSteps(quality).some((step) => /check[:-]codeql-ratchet/.test(step.run ?? "")),
    false
  );
  const checks = allSteps(ci).filter((step) => step.run?.includes("check-codeql-ratchet.mjs"));
  assert.equal(checks.length, 1);
  assert.equal(checks[0].run, "node scripts/check/check-codeql-ratchet.mjs --candidate");
  assert.equal(checks[0].env.CODEQL_PRODUCER_RESULT, "${{ needs.codeql-scan.result }}");
  assert.deepEqual(ci.jobs["codeql-admission"].permissions, {
    contents: "read",
    "security-events": "read",
    "pull-requests": "read",
  });
});

test("maintenance covers the active release and weekly schedule without duplicate PR producers", () => {
  assert.deepEqual(maintenance.on.push.branches, [activeRelease]);
  assert.equal(maintenance.on.schedule.length, 1);
  assert.equal(maintenance.on.pull_request, undefined);
  assert.equal(maintenance.jobs.scan.with.admission, false);
  assert.ok(ci.on.push.branches.includes("main"));
  assert.ok(ci.on.pull_request.types.includes("ready_for_review"));
  assert.deepEqual(ci.on.merge_group.types, ["checks_requested"]);
  assert.deepEqual(Object.keys(producer.on), ["workflow_call"]);
});

for (const id of ["codeql-scan", "codeql-admission"]) {
  for (const status of ["failure", "skipped", "cancelled", undefined]) {
    test(`${id} ${status} blocks Gate / CI even on a docs-only candidate`, () => {
      const needs = Object.fromEntries(
        Object.keys(policy.profiles.ci.jobs).map((job) => [job, { result: "success" }])
      );
      needs.changes.outputs = {
        code: "false",
        docs: "true",
        i18n: "false",
        workflow: "false",
        testsOnly: "false",
      };
      if (status === undefined) delete needs[id];
      else needs[id].result = status;
      const context = {
        event: "pull_request",
        sha: "a".repeat(40),
        runId: "1",
        runAttempt: "1",
        draft: false,
      };
      const receipt = evaluateAdmission(policy, "ci", context, needs);
      assert.equal(receipt.verdict, "FAIL");
      assert.ok(receipt.errors.some((error) => error.startsWith(`${id}:`)));
    });
  }
}
