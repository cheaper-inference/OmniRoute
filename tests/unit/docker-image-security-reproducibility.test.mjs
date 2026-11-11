import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "js-yaml";
import prettierConfig from "../../prettier.config.mjs";
import {
  parseTrivyIgnorePolicy,
  validateTrivyIgnorePolicy,
} from "../../scripts/check/check-trivy-ignore-policy.mjs";

const root = new URL("../../", import.meta.url);
const read = (name) => fs.readFileSync(new URL(name, root), "utf8");
const docker = read("Dockerfile");
const workflow = load(read(".github/workflows/docker-publish.yml"));

// Source/configuration contracts. These do not build or scan an image.
test("Docker bootstraps a reviewed exact npm and checks the resulting version", () => {
  const instructions = docker
    .replace(/\\\r?\n\s*/g, " ")
    .split("\n")
    .filter((line) => !line.trim().startsWith("#"))
    .join("\n");
  assert.match(instructions, /npm install -g npm@12\.2\.1\s*;/);
  assert.doesNotMatch(instructions, /npm@latest\b/);
  assert.match(instructions, /test "\$\(npm --version\)" = "12\.2\.1"/);
});

test("every Docker Trivy step reads the same scoped policy with the studied scanner version", () => {
  const steps = Object.values(workflow.jobs)
    .flatMap((job) => job.steps || [])
    .filter((step) => step.uses?.startsWith("aquasecurity/trivy-action@"));
  assert.equal(steps.length, 2);
  for (const step of steps) {
    assert.equal(step.with.trivyignores, ".ci-trivy-policy/effective.trivyignore.yaml");
    assert.equal(step.with.version, "v0.70.0");
    assert.equal(step.uses, "aquasecurity/trivy-action@ed142fd0673e97e23eac54620cfb913e5ce36c25");
  }
});

test("the reviewed JSON-formatted YAML policy has the same parser-independent content", () => {
  const source = read(".trivyignore.yaml");
  const policy = parseTrivyIgnorePolicy(source);
  assert.deepEqual(load(source), policy);
  assert.deepEqual(validateTrivyIgnorePolicy(policy, { now: Date.parse("2026-11-03T00:00:00Z") }), {
    exceptions: 0,
    expiresAt: null,
  });
});

test("the formatter preserves the JSON syntax required by the dependency-free guard", () => {
  const override = prettierConfig.overrides?.find((entry) => entry.files === ".trivyignore.yaml");
  assert.equal(override?.options?.parser, "json");
});

test("the default plain ignore file cannot preserve an unscoped duplicate", () => {
  const active = read(".trivyignore")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  assert.deepEqual(active, []);
  assert.match(read(".trivyignore"), /--ignorefile \.trivyignore\.yaml/);
});

test("the expiry guard blocks before both scans without changing their severity policy", () => {
  const steps = workflow.jobs.merge.steps;
  const index = steps.findIndex(
    (step) =>
      step.run ===
      "node .ci-trivy-policy/scripts/ci/prepare-trivy-scan-policy.mjs .ci-trivy-policy/.trivyignore.yaml .ci-trivy-candidate/.trivyignore.yaml .ci-trivy-policy/effective.trivyignore.yaml"
  );
  assert.ok(index >= 0);
  assert.notEqual(steps[index]["continue-on-error"], true);
  assert.equal(steps[index].if, "needs.prepare.outputs.version != 'main'");
  const nodeSetup = steps.findIndex(
    (step) =>
      step.uses === "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1" &&
      step.with["node-version"] === "24.22.1"
  );
  assert.ok(nodeSetup >= 0 && nodeSetup < index);
  const scans = steps
    .map((step, position) => ({ step, position }))
    .filter(({ step }) => step.uses?.startsWith("aquasecurity/trivy-action@"));
  assert.equal(scans.length, 2);
  for (const { step, position } of scans) {
    assert.ok(position > index);
    assert.equal(step.if, steps[index].if);
  }
  assert.equal(scans[0].step.with.severity, "HIGH,CRITICAL");
  assert.equal(scans[0].step.with["exit-code"], "0");
  assert.equal(scans[1].step.with.severity, "CRITICAL");
  assert.equal(scans[1].step.with["exit-code"], "1");
});
