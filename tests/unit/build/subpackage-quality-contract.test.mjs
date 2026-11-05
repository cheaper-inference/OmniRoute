import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { load } from "js-yaml";
import semver from "semver";

const read = (path) => readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");

test("provider CI covers current release branches and changes to its workflow", () => {
  const workflow = load(read(".github/workflows/opencode-provider-ci.yml"));
  for (const event of ["push", "pull_request"]) {
    assert.ok(workflow.on[event].branches.includes("release/**"));
    assert.ok(workflow.on[event].paths.includes(".github/workflows/opencode-provider-ci.yml"));
  }
});

test("provider CI runs versions inside the package engine contract", () => {
  const workflow = load(read(".github/workflows/opencode-provider-ci.yml"));
  const engine = JSON.parse(read("@omniroute/opencode-provider/package.json")).engines.node;
  for (const node of workflow.jobs.test.strategy.matrix.node) {
    assert.ok(
      semver.satisfies(semver.minVersion(node), engine),
      `Node ${node} must satisfy ${engine}`
    );
  }
  const buildNode = workflow.jobs.build.steps.find((step) =>
    step.uses?.startsWith("actions/setup-node@")
  ).with["node-version"];
  assert.ok(semver.satisfies(semver.minVersion(buildNode), engine));
});

test("both plugin variants install exactly their checked-in lockfiles", () => {
  const workflow = load(read(".github/workflows/opencode-plugin-ci.yml"));
  for (const id of ["test", "test-v2"]) {
    const installs = workflow.jobs[id].steps.filter(
      (step) => step.id !== "npm" && /npm (?:ci|install)/.test(step.run || "")
    );
    assert.equal(installs.length, 1);
    assert.match(installs[0].run, /^npm ci\b/);
  }
  assert.ok(workflow.on.pull_request.paths.includes(".github/workflows/opencode-plugin-ci.yml"));
});

test("subpackage CI pins include the October 2026 Node security fixes", () => {
  const minimums = { 22: "22.23.4", 24: "24.22.1" };
  for (const name of ["opencode-provider-ci", "opencode-plugin-ci"]) {
    const workflow = load(read(`.github/workflows/${name}.yml`));
    for (const job of Object.values(workflow.jobs)) {
      const versions = [
        ...(job.strategy?.matrix?.node ?? []),
        ...(job.steps ?? [])
          .filter((step) => step.uses?.startsWith("actions/setup-node@"))
          .map((step) => step.with["node-version"])
          .filter((version) => !String(version).includes("${{")),
      ];
      for (const version of versions) {
        assert.ok(semver.valid(version), `${name}: Node ${version} must be an exact pin`);
        const floor = minimums[semver.major(version)];
        assert.ok(floor, `${name}: review the security floor for Node ${version}`);
        assert.ok(semver.gte(version, floor), `${name}: Node ${version} predates ${floor}`);
      }
    }
  }
});

const npmAction = load(read(".github/actions/npm-ci-retry/action.yml"));
const canonicalBootstrap = npmAction.runs.steps.find((step) => step.id === "npm");

for (const id of ["test", "test-v2", "build"]) {
  test(`plugin ${id} selects the canonical npm before installing dependencies`, () => {
    const workflow = load(read(".github/workflows/opencode-plugin-ci.yml"));
    const job = workflow.jobs[id];
    const setup = job.steps.findIndex((step) => step.uses?.startsWith("actions/setup-node@"));
    const bootstrap = job.steps.findIndex((step) => step.id === "npm");
    const install = job.steps.findIndex((step) => /^npm ci\b/.test(step.run || ""));
    assert.ok(setup >= 0 && bootstrap > setup && install > bootstrap);
    assert.equal(job.steps[bootstrap].shell, "bash");
    assert.equal(job.steps[bootstrap]["working-directory"], ".");
    assert.equal(job.steps[bootstrap].if, undefined);
    assert.equal(job.steps[bootstrap].run, canonicalBootstrap.run);
    if (id !== "build") assert.deepEqual(job.strategy.matrix.node, ["22.23.4", "24.22.1"]);
  });
}

test("plugin CI is selected when its canonical npm pin changes", () => {
  const workflow = load(read(".github/workflows/opencode-plugin-ci.yml"));
  for (const event of ["push", "pull_request"]) {
    assert.ok(workflow.on[event].paths.includes("config/ci/toolchain.json"));
  }
});
