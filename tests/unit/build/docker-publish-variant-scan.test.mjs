import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/docker-publish.yml", import.meta.url), "utf8")
);
const job = workflow.jobs["scan-variants"];
const steps = job?.steps ?? [];
const trivySteps = steps.filter((step) =>
  String(step.uses ?? "").startsWith("aquasecurity/trivy-action@")
);

test("every published variant is scanned, not just the base image", () => {
  assert.ok(job, "docker-publish.yml has no scan-variants job");
  assert.deepEqual(job.strategy.matrix.variant, ["base", "web", "bun", "web-bun"]);
  assert.equal(job.strategy["fail-fast"], false);
  assert.deepEqual(job.needs, ["prepare", "merge"]);
  assert.match(job.if, /needs\.merge\.result == 'success'/);
  assert.match(job.if, /needs\.prepare\.outputs\.version != 'main'/);
});

test("the gate blocks CRITICAL and HIGH findings that have a published fix", () => {
  const gate = trivySteps.find((step) => step.with?.["exit-code"] === "1");
  assert.ok(gate, "no blocking Trivy step");
  assert.equal(gate.with.severity, "HIGH,CRITICAL");
  assert.equal(gate.with["ignore-unfixed"], true);
  assert.equal(gate.with.trivyignores, ".trivyignore");
  assert.equal(gate.with["image-ref"], "${{ steps.image.outputs.ref }}");
  assert.equal(gate["continue-on-error"], undefined);
});

test("the full report counts unfixed findings without blocking", () => {
  const report = trivySteps.find((step) => step.with?.format === "json");
  assert.ok(report, "no JSON report step");
  assert.equal(report.with["exit-code"], "0");
  assert.equal(report.with["ignore-unfixed"], undefined);
  const summary = steps.find((step) => /GITHUB_STEP_SUMMARY/.test(step.run ?? ""));
  assert.ok(summary, "no job-summary step");
  assert.match(summary.run, /FixedVersion/);
});

test("variant results stay out of the Security tab", () => {
  // The code-scanning panel is triaged by the security owner; only the base image uploads
  // SARIF (category trivy-image, in the merge job).
  assert.ok(!steps.some((step) => String(step.uses ?? "").includes("upload-sarif")));
  assert.ok(!trivySteps.some((step) => step.with?.format === "sarif"));
});

test("an unpublished best-effort Bun variant is skipped, a missing Node variant fails", () => {
  const resolve = steps.find((step) => step.id === "image");
  assert.ok(resolve, "no image-resolve step");
  assert.match(resolve.run, /imagetools inspect/);
  assert.match(resolve.run, /bun\) suffix|web-bun/);
  assert.match(resolve.run, /present=false/);
  assert.match(resolve.run, /::error::[^\n]*exit 1/);
  for (const step of trivySteps) {
    assert.equal(step.if, "steps.image.outputs.present == 'true'");
  }
});

test("the variant scan never holds back publishing or the Docker Hub org mirror", () => {
  assert.ok(!workflow.jobs.merge.needs.includes("scan-variants"));
  assert.ok(!workflow.jobs["mirror-org-dockerhub"].needs.includes("scan-variants"));
  assert.deepEqual(job.permissions, { contents: "read", packages: "read" });
  const checkout = steps.find((step) => String(step.uses ?? "").startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.["persist-credentials"], false);
  for (const step of steps) {
    assert.doesNotMatch(
      step.run ?? "",
      /\$\{\{/,
      `step "${step.name}" interpolates an expression into run`
    );
  }
});
