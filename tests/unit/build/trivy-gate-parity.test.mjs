import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";
import { resolveProfile, validateManifest } from "../../../scripts/quality/gate-manifest.mjs";
import { validateFullCiProfile } from "../../../scripts/quality/release-green-static-profile.mjs";
import { classifyPaths } from "../../../scripts/quality/classify-pr-changes.mjs";

const root = new URL("../../../", import.meta.url);
const read = (name) => readFileSync(new URL(name, root), "utf8");
const readJson = (name) => JSON.parse(read(name));
const alias = "check:trivy-ignore-policy";
const command = "node scripts/check/check-trivy-ignore-policy.mjs .trivyignore.yaml";
const dockerCommand =
  "node .ci-trivy-policy/scripts/ci/prepare-trivy-scan-policy.mjs .ci-trivy-policy/.trivyignore.yaml .ci-trivy-candidate/.trivyignore.yaml .ci-trivy-policy/effective.trivyignore.yaml";
const scripts = readJson("package.json").scripts;
const manifest = readJson("config/quality/gate-manifest.json");
const full = readJson("config/quality/release-green-static-profile.json");
const ciSource = read(".github/workflows/ci.yml");
const qualitySource = read(".github/workflows/quality.yml");

test("the local alias executes the same configuration guard used before image scans", () => {
  assert.equal(scripts[alias], command);
});

test("both selected local scan profiles actually schedule the guard", () => {
  assert.deepEqual(validateManifest(manifest, scripts), []);
  for (const name of ["quality-scan", "quality-scan-fast"]) {
    const scheduled = resolveProfile(manifest, scripts, name).filter((gate) => gate.name === alias);
    assert.equal(scheduled.length, 1);
    assert.deepEqual(scheduled[0].cmd.slice(1), ["run", "--silent", alias]);
  }
});

test("the full observer resolves the guard as a hard gate with the reviewed argv", () => {
  const gates = validateFullCiProfile(full, scripts, ciSource, qualitySource);
  const scheduled = gates.filter((gate) => gate.id === alias);
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].kind, "hard");
  assert.deepEqual(scheduled[0].args, ["run", alias]);
});

test("adding the Trivy policy guard preserves the MAIN core and dashboard typechecks", () => {
  const gates = validateFullCiProfile(full, scripts, ciSource, qualitySource);
  for (const id of ["typecheck:core", "check:dashboard-typecheck", "check:open-sse-typecheck"]) {
    const selected = gates.filter((gate) => gate.id === id);
    assert.equal(selected.length, 1);
    assert.equal(selected[0].kind, "hard");
    assert.deepEqual(selected[0].args, ["run", id]);
  }
});

test("main CI and the release-PR quality loop execute the same alias", () => {
  const ci = load(ciSource);
  assert.ok(ci.jobs.lint.steps.some((step) => step.run === `npm run ${alias}`));
  const quality = load(qualitySource);
  const declarations = quality.jobs["fast-gates"].steps.flatMap((step) => [
    ...String(step.run || "").matchAll(/(?:^|\n)\s*gates=\(([\s\S]*?)\n\s*\)/g),
  ]);
  assert.equal(declarations.length, 1);
  const names = declarations[0][1]
    .replace(/#[^\n]*/g, "")
    .trim()
    .split(/\s+/);
  assert.equal(names.filter((name) => name === "trivy-ignore-policy").length, 1);
});

test("Docker supplies Node before the direct guard and cannot reach either scan without it", () => {
  const workflow = load(read(".github/workflows/docker-publish.yml"));
  const steps = workflow.jobs.merge.steps;
  const guard = steps.findIndex((step) => step.run === dockerCommand);
  assert.ok(guard >= 0);
  assert.notEqual(steps[guard]["continue-on-error"], true);
  const setup = steps.findIndex(
    (step) =>
      step.uses === "actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1" &&
      step.with["node-version"] === "24.22.1"
  );
  assert.ok(setup >= 0 && setup < guard);
  assert.equal(steps[setup].if, steps[guard].if);
  assert.equal(steps[guard].if, "needs.prepare.outputs.version != 'main'");
  const scans = steps
    .map((step, index) => ({ step, index }))
    .filter(({ step }) => step.uses?.startsWith("aquasecurity/trivy-action@"));
  assert.equal(scans.length, 2);
  for (const { step, index } of scans) {
    assert.ok(guard < index);
    assert.equal(step.if, steps[guard].if);
    assert.equal(step.with.trivyignores, ".ci-trivy-policy/effective.trivyignore.yaml");
    assert.equal(step.with.version, "v0.70.0");
  }
});

test("backfill tooling comes from the immutable workflow revision outside any build context", () => {
  const workflow = load(read(".github/workflows/docker-publish.yml"));
  const steps = workflow.jobs.merge.steps;
  const guard = steps.findIndex((step) => step.run === dockerCommand);
  const checkout = steps.findIndex((step) => step.with?.path === ".ci-trivy-policy");
  assert.ok(checkout >= 0 && checkout < guard);
  assert.equal(steps[checkout].uses, "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1");
  assert.equal(steps[checkout].with.ref, "${{ github.workflow_sha }}");
  assert.equal(steps[checkout].with["persist-credentials"], false);
  assert.equal(steps[checkout].with["sparse-checkout-cone-mode"], false);
  assert.equal(steps[checkout].if, steps[guard].if);
  assert.deepEqual(steps[checkout].with["sparse-checkout"].trim().split("\n"), [
    "/.trivyignore.yaml",
    "/scripts/check/check-trivy-ignore-policy.mjs",
    "/scripts/ci/prepare-trivy-scan-policy.mjs",
  ]);
  for (const step of steps) {
    assert.ok(!step.uses?.startsWith("docker/build-push-action@"));
    assert.doesNotMatch(String(step.run || ""), /\bdocker (?:build\b|buildx build\b)/);
  }
});

test("policy and guard changes select the code gates rather than a docs-only path", () => {
  for (const name of [".trivyignore.yaml", "scripts/check/check-trivy-ignore-policy.mjs"]) {
    assert.equal(classifyPaths([name]).code, true);
  }
});

test("removing the guard from the full inventory is detected against both workflows", () => {
  const missing = structuredClone(full);
  missing.gates = missing.gates.filter((gate) => gate.id !== alias);
  assert.throws(
    () => validateFullCiProfile(missing, scripts, ciSource, qualitySource),
    /Unmodeled workflow command|Unmodeled quality gate/
  );
});

test("alias command drift cannot silently change what local profiles execute", () => {
  const changed = { ...scripts, [alias]: "node scripts/check/unreviewed-policy.mjs" };
  assert.ok(validateManifest(manifest, changed).length > 0);
});

test("historical scans select the image source policy independently of workflow tooling", () => {
  const workflow = load(read(".github/workflows/docker-publish.yml"));
  const source = workflow.jobs.build.steps.find(
    (step) => step.name === "Checkout" && step.uses?.startsWith("actions/checkout@")
  );
  const steps = workflow.jobs.merge.steps;
  const candidate = steps.findIndex((step) => step.with?.path === ".ci-trivy-candidate");
  const tooling = steps.findIndex((step) => step.with?.path === ".ci-trivy-policy");
  const guard = steps.findIndex((step) => step.run === dockerCommand);
  assert.ok(candidate >= 0 && candidate < guard);
  assert.ok(tooling >= 0 && tooling < guard);
  assert.equal(steps[candidate].with.ref, source.with.ref.replace("|| ''", "|| github.sha"));
  assert.equal(steps[tooling].with.ref, "${{ github.workflow_sha }}");
  assert.equal(steps[candidate].with["persist-credentials"], false);
  assert.equal(steps[candidate].with["sparse-checkout-cone-mode"], false);
  assert.equal(steps[candidate].with["sparse-checkout"].trim(), "/.trivyignore.yaml");
  assert.equal(steps[candidate].if, steps[guard].if);
});
