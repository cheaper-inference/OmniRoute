import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

interface Step {
  id?: string;
  name?: string;
  run?: string;
  if?: string;
  "continue-on-error"?: boolean;
}

const workflow = load(
  readFileSync(new URL("../../.github/workflows/npm-publish.yml", import.meta.url), "utf8")
) as { jobs: { publish: { steps: Step[] } } };
const steps = workflow.jobs.publish.steps;
const reuse = steps.find((step) => step.name?.startsWith("Reuse CI's next-build artifact"));

test("npm publish delegates reuse to the verified producer and artifact boundary", () => {
  // Workflow-level fixtures exercise commit and repository binding, forks,
  // absence, API failures and corrupt bytes through this same entry point.
  assert.equal(reuse?.run, "node scripts/ci/reuse-next-build.mjs");
  assert.equal(reuse?.["continue-on-error"], undefined);
});

test("only the original package version can reuse the checked-out CI build", () => {
  const resolve = steps.find((step) => step.id === "resolve");
  const install = steps.find((step) => step.run?.startsWith("npm ci --ignore-scripts"));
  const sync = steps.find((step) => step.name === "Sync package.json version");
  const build = steps.find((step) => step.run === "npm run build:cli");
  assert.ok(resolve && install && sync && reuse && build);
  assert.match(resolve.run || "", /require\("\.\/package\.json"\)\.version/);
  assert.match(resolve.run || "", /\[ "\$CANDIDATE_VERSION" = "\$VERSION" \]/);
  assert.match(sync.if || "", /candidate_version_matches == 'false'/);
  assert.match(reuse.if || "", /candidate_version_matches == 'true'/);
  assert.equal(build.if, "steps.resolve.outputs.skip != 'true'");
  assert.ok(steps.indexOf(resolve) < steps.indexOf(install));
  assert.ok(steps.indexOf(install) < steps.indexOf(reuse));
  assert.ok(steps.indexOf(sync) < steps.indexOf(build));
  assert.ok(steps.indexOf(reuse) < steps.indexOf(build));
});
