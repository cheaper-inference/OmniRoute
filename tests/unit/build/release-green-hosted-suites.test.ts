import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load as parseYaml } from "js-yaml";

// The full Release-Green sweep runs unit/integration/vitest as hosted jobs (2026-10-20): on the
// 8-core omni-release slot they took ~4h15 per sweep and failed timing tests on CPU starvation.
const read = (path: string) => readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
const { shardCountFromCi } = await import("../../../scripts/quality/validate-release-green.mjs");
const { suiteResult } = await import("../../../scripts/ci/release-green-suite.mjs");

type Job = {
  needs?: string | string[];
  if?: string;
  "runs-on"?: string;
  outputs?: Record<string, string>;
  strategy?: { matrix?: { include?: { name: string; script: string; shard: string }[] } };
  steps?: {
    uses?: string;
    run?: string;
    with?: Record<string, unknown>;
    env?: Record<string, string>;
  }[];
};
const workflow = parseYaml(read(".github/workflows/nightly-release-green.yml")) as {
  jobs: Record<string, Job>;
};
const ci = read(".github/workflows/ci.yml");

test("the hosted suite matrix has exactly ci.yml's unit and integration shards plus vitest", () => {
  const include = workflow.jobs.suites.strategy?.matrix?.include ?? [];
  const units = shardCountFromCi(ci, "test-unit");
  const integrations = shardCountFromCi(ci, "test-integration");
  const expected = [
    ...Array.from({ length: units }, (_, i) => ({
      name: `unit-${i + 1}`,
      script: "test:unit:ci:shard",
      shard: `${i + 1}/${units}`,
    })),
    ...Array.from({ length: integrations }, (_, i) => ({
      name: `integration-${i + 1}`,
      script: "test:integration:ci",
      shard: `${i + 1}/${integrations}`,
    })),
    { name: "vitest", script: "test:vitest", shard: "" },
  ];
  assert.deepEqual(include, expected);
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
  for (const script of [
    "test:unit:ci:shard",
    "test:integration:ci",
    "test:vitest",
    "test:vitest:ui",
  ]) {
    assert.ok(pkg.scripts[script], `package.json has ${script}`);
  }
});

test("suites run hosted on the resolved commit and only outside push", () => {
  const suites = workflow.jobs.suites;
  assert.equal(suites["runs-on"], "ubuntu-latest");
  assert.equal(suites.needs, "resolve-target");
  assert.match(suites.if ?? "", /github\.event_name != 'push'/);
  const checkout = suites.steps?.find((s) => s.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.ref, "${{ needs.resolve-target.outputs.sha }}");
  assert.match(workflow.jobs["resolve-target"].if ?? "", /github\.event_name != 'push'/);
  assert.deepEqual(Object.keys(workflow.jobs["resolve-target"].outputs ?? {}).sort(), [
    "sha",
    "target",
  ]);
});

test("the slot validation waits for the suites, reads their results and still runs on push", () => {
  const job = workflow.jobs["release-green"];
  assert.deepEqual(job.needs, ["resolve-target", "suites"]);
  assert.match(job.if ?? "", /^\$\{\{ !cancelled\(\) && /, "push skips the suites, not this job");
  const steps = job.steps ?? [];
  const download = steps.find((s) => s.uses?.startsWith("actions/download-artifact@"));
  assert.equal(download?.with?.pattern, "release-green-suite-*");
  assert.equal(download?.with?.path, "suite-results");
  const upload = workflow.jobs.suites.steps?.find((s) =>
    s.uses?.startsWith("actions/upload-artifact@")
  );
  assert.equal(upload?.with?.name, "release-green-suite-${{ matrix.name }}");
  const validate = steps.find((s) => s.run?.includes("validate-release-green.mjs"));
  assert.match(validate?.run ?? "", /MODE="--with-build --full-ci --suites-from suite-results"/);
  assert.match(validate?.run ?? "", /MODE="--quick"/, "push keeps the quick profile");
  const checkout = steps.find((s) => s.run?.includes("SWEEP_SHA"));
  assert.equal(checkout?.env?.SWEEP_SHA, "${{ needs.resolve-target.outputs.sha }}");
});

test("main-green keeps its own local sweep (main runs main's copy of the validator)", () => {
  const job = workflow.jobs["main-green"];
  assert.equal(job.needs, undefined);
  const validate = (job.steps ?? []).find((s) => s.run?.includes("validate-release-green.mjs"));
  assert.doesNotMatch(validate?.run ?? "", /--suites-from/);
});

test("a suite job reports its name, exit code and first failure line", () => {
  assert.deepEqual(suiteResult("unit-3", "0", "ℹ pass 10"), {
    name: "unit-3",
    code: 0,
    detail: "pass",
  });
  assert.deepEqual(suiteResult("integration-2", "1", "✔ ok (1ms)\n✖ broken (2ms)\n"), {
    name: "integration-2",
    code: 1,
    detail: "✖ broken (2ms)",
  });
  assert.throws(() => suiteResult("unit-x; rm -rf /", "0", ""), /unknown suite name/);
  assert.throws(() => suiteResult("vitest", "abc", ""), /invalid exit code/);
});
