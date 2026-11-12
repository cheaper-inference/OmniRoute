import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { parse } from "yaml";
import { evaluateAdmission } from "../../../scripts/quality/admission-verdict.mjs";

const root = new URL("../../../", import.meta.url);
const read = (file) => fs.readFileSync(new URL(file, root), "utf8");
const ci = parse(read(".github/workflows/ci.yml"));
const dast = parse(read(".github/workflows/dast-smoke.yml"));
const policy = JSON.parse(read("config/quality/admission-policy.json"));
const job = dast.jobs["dast-smoke"];

test("DAST consumes the CI build from the same event and cannot start another workflow run", () => {
  assert.deepEqual(Object.keys(dast.on), ["workflow_call"]);
  assert.equal(ci.jobs["dast-smoke"].uses, "./.github/workflows/dast-smoke.yml");
  assert.deepEqual(ci.jobs["dast-smoke"].needs, ["changes", "build"]);
  assert.equal(ci.jobs["dast-smoke"].if, ci.jobs.build.if);
  assert.equal(job["continue-on-error"], undefined);
  assert.equal(job["timeout-minutes"], 25);
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.deepEqual(dast.permissions, { contents: "read" });
  assert.deepEqual(ci.jobs["dast-smoke"].permissions, { contents: "read" });
  assert.equal(ci.jobs["dast-smoke"].secrets, undefined);
  assert.equal(JSON.stringify(dast).includes("secrets."), false);
});

test("producer outputs, immutable artifact selection and strict digest validation are wired", () => {
  const caller = ci.jobs["dast-smoke"];
  for (const key of [
    "artifact-id",
    "artifact-digest",
    "manifest-sha256",
    "archive-sha256",
    "node-version",
    "bundler",
    "producer-attempt",
  ]) {
    assert.equal(caller.with[key], `\${{ needs.build.outputs.${key} }}`);
    assert.equal(dast.on.workflow_call.inputs[key].required, true);
    assert.ok(ci.jobs.build.outputs[key]);
  }
  const build = ci.jobs.build.steps;
  const seal = build.findIndex((step) => step.id === "next-build-provenance");
  const upload = build.findIndex((step) => step.id === "next-build-upload");
  const compile = build.findIndex((step) => step.run === "npm run build");
  assert.ok(seal > compile && upload > seal);
  assert.deepEqual(build[seal].env, build[compile].env);
  assert.match(build[upload].with.path, /e2e-build\.tar\.gz/);
  assert.match(build[upload].with.path, /next-build-provenance\.json/);
  assert.equal(
    build[upload].with.name,
    "next-build",
    "preserve existing package/publish consumers"
  );
  assert.equal(build[upload].with["if-no-files-found"], "error");
  const download = job.steps.find((step) => step.uses?.startsWith("actions/download-artifact@"));
  assert.equal(download.with["artifact-ids"], "${{ inputs.artifact-id }}");
  assert.equal(download.with["digest-mismatch"], "error");
  assert.equal(download.with["skip-decompress"], true);
  const unzip = job.steps.findIndex((step) => step.run?.includes("unpack-ci-build.py"));
  const verify = job.steps.findIndex((step) =>
    step.run?.includes("next-build-provenance.mjs verify")
  );
  assert.ok(unzip > job.steps.indexOf(download) && verify > unzip);
  for (const forbidden of ["name", "pattern", "github-token", "repository", "run-id"])
    assert.equal(download.with[forbidden], undefined);
});

test("verification precedes extraction and CLI assembly cannot fall back to Next", () => {
  const verify = job.steps.findIndex((step) =>
    step.run?.includes("next-build-provenance.mjs verify")
  );
  const assembly = job.steps.findIndex((step) => step.run?.includes("npm run build:cli"));
  const start = job.steps.findIndex((step) => step.run?.includes("node dist/server.js"));
  assert.ok(verify >= 0 && assembly > verify && start > assembly);
  assert.equal(job.steps[assembly].env.OMNIROUTE_REQUIRE_PREBUILT_NEXT, "1");
  assert.equal(job.steps[0].with.ref, "${{ github.sha }}");
  assert.equal(job.steps[0].with["persist-credentials"], false);
  assert.equal(
    job.steps.filter((step) => /npm run build(?:\s|$)|next build/.test(step.run ?? "")).length,
    0
  );
  const prepublish = read("scripts/build/prepublish.ts");
  assert.match(prepublish, /ensureStandaloneInput\(\{/);
  assert.match(
    prepublish,
    /requirePrebuilt: process\.env\.OMNIROUTE_REQUIRE_PREBUILT_NEXT === "1"/
  );
});

test("both DAST assertions remain blocking after a fail-closed readiness step", () => {
  const health = job.steps.find((step) => step.name === "Start OmniRoute and require health");
  assert.match(health.run, /kill -0/);
  assert.match(health.run, /failed readiness/);
  assert.match(health.run.trim(), /exit 1$/);
  for (const name of [
    "Schemathesis smoke (high-risk endpoints, blocking)",
    "promptfoo injection-guard (blocking)",
  ]) {
    const step = job.steps.find((candidate) => candidate.name === name);
    assert.ok(step);
    assert.equal(step["continue-on-error"], undefined);
    assert.equal(step.if, undefined);
    assert.equal(step.run.includes("|| true"), false);
  }
});

test("an applicable DAST cancellation, skip, missing or failed execution blocks admission", () => {
  assert.equal(policy.profiles.ci.jobs["dast-smoke"].when, "code");
  assert.equal(policy.profiles.ci.jobs["dast-smoke"].disposition, "required");
  assert.deepEqual(
    policy.profiles.ci.jobs["dast-smoke"].domains,
    policy.profiles.ci.jobs.changes.domains
  );
  assert.ok(ci.jobs["admission-verdict"].needs.includes("dast-smoke"));
  const context = {
    event: "pull_request",
    sha: "a".repeat(40),
    runId: "1",
    runAttempt: "1",
    draft: false,
  };
  const needs = Object.fromEntries(
    Object.keys(policy.profiles.ci.jobs).map((id) => [id, { result: "success" }])
  );
  needs.changes.outputs = {
    code: "true",
    docs: "true",
    i18n: "true",
    workflow: "true",
    testsOnly: "false",
  };
  assert.equal(evaluateAdmission(policy, "ci", context, needs).verdict, "PASS");
  for (const result of ["failure", "cancelled", "skipped", "pending", "unknown", "neutral"]) {
    const changed = structuredClone(needs);
    changed["dast-smoke"].result = result;
    assert.equal(evaluateAdmission(policy, "ci", context, changed).verdict, "FAIL", result);
  }
  delete needs["dast-smoke"];
  assert.equal(evaluateAdmission(policy, "ci", context, needs).verdict, "FAIL");
});
