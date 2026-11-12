import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load as parseYaml } from "js-yaml";

// The full Release-Green sweep runs unit/integration/vitest as hosted jobs (2026-10-20): on the
// 8-core omni-release slot they took ~4h15 per sweep and failed timing tests on CPU starvation.
const read = (path: string) => readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
const { shardCountFromCi } = await import("../../../scripts/quality/validate-release-green.mjs");
const { suiteResult } = await import("../../../scripts/ci/release-green-suite.mjs");
const { hostedMatrixFromCi } = await import("../../../scripts/ci/release-green-matrix.mjs");

type Job = {
  needs?: string | string[];
  if?: string;
  "runs-on"?: string;
  "timeout-minutes"?: number;
  outputs?: Record<string, string>;
  strategy?: { matrix?: { include?: { name: string; script: string; shard: string }[] } | string };
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
  const matrix = workflow.jobs.suites.strategy?.matrix;
  const include = typeof matrix === "object" ? (matrix.include ?? []) : [];
  const units = shardCountFromCi(ci, "test-unit");
  const integrations = shardCountFromCi(ci, "test-integration");
  const vitest = shardCountFromCi(ci, "test-vitest");
  assert.equal(integrations, 4, "integration files must be split across four hosted runners");
  assert.equal(vitest, 4, "UI files must be split across four hosted runners");
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
    ...Array.from({ length: vitest }, (_, i) => ({
      name: `vitest-${i + 1}`,
      script: "test:vitest:ui",
      shard: `${i + 1}/${vitest}`,
    })),
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

test("integration sharding preserves the complete inventory and 15-minute CI deadline", async () => {
  const jobs = (parseYaml(ci) as { jobs: Record<string, Job> }).jobs;
  assert.equal(jobs["test-integration"]["timeout-minutes"], 15);
  const pkg = JSON.parse(read("package.json")) as { scripts: Record<string, string> };
  const { integrationPlanFromCiJob } =
    await import("../../../scripts/quality/integration-shards.mjs");
  const plan = integrationPlanFromCiJob(jobs["test-integration"], pkg.scripts);
  assert.equal(plan.total, 4);
  assert.equal(plan.timeoutMs, 900000);
  assert.deepEqual(
    plan.commands.map((command) => command.env.TEST_SHARD),
    ["1/4", "2/4", "3/4", "4/4"]
  );
});

test("suites run hosted on the resolved commit and only outside push", () => {
  const suites = workflow.jobs.suites;
  assert.equal(suites["runs-on"], "ubuntu-latest");
  assert.equal(suites.needs, "resolve-target");
  assert.match(suites.if ?? "", /github\.event_name != 'push'/);
  const checkout = suites.steps?.find((s) => s.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.ref, "${{ github.sha }}");
  const runtime = suites.steps?.find((s) => s.uses?.startsWith("actions/setup-node@"));
  assert.equal(runtime?.with?.["node-version"], "${{ needs.resolve-target.outputs.node-version }}");
  assert.match(workflow.jobs["resolve-target"].if ?? "", /github\.event_name != 'push'/);
  assert.deepEqual(Object.keys(workflow.jobs["resolve-target"].outputs ?? {}).sort(), [
    "node-version",
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
  assert.equal(download?.with?.pattern, "release-green-suite-${{ github.run_attempt }}-*");
  assert.equal(download?.with?.path, "suite-results");
  const upload = workflow.jobs.suites.steps?.find((s) =>
    s.uses?.startsWith("actions/upload-artifact@")
  );
  assert.equal(
    upload?.with?.name,
    "release-green-suite-${{ github.run_attempt }}-${{ matrix.name }}"
  );
  const validate = steps.find((s) => s.run?.includes("validate-release-green.mjs"));
  assert.match(validate?.run ?? "", /--suites-workflow-sha "\$GITHUB_WORKFLOW_SHA"/);
  assert.match(validate?.run ?? "", /MODE="--with-build --full-ci --suites-from suite-results"/);
  assert.match(validate?.run ?? "", /MODE="--quick"/, "push keeps the quick profile");
  const checkout = steps.find((s) => s.run?.includes("SWEEP_SHA"));
  assert.equal(checkout?.env?.SWEEP_SHA, "${{ needs.resolve-target.outputs.sha }}");
});

test("main-green consumes hosted suites run on main's resolved commit", () => {
  const job = workflow.jobs["main-green"];
  assert.deepEqual(job.needs, ["resolve-main", "main-suites"]);
  assert.match(job.if ?? "", /^\$\{\{ !cancelled\(\) && /);
  const validate = (job.steps ?? []).find((s) => s.run?.includes("validate-release-green.mjs"));
  assert.match(validate?.run ?? "", /MODE="--with-build --full-ci --suites-from suite-results"/);
  assert.match(validate?.run ?? "", /MODE="--quick"/);
  assert.match(validate?.run ?? "", /--suites-workflow-sha "\$GITHUB_WORKFLOW_SHA"/);
  const download = (job.steps ?? []).find((s) => s.uses?.startsWith("actions/download-artifact@"));
  assert.equal(download?.with?.pattern, "main-green-suite-${{ github.run_attempt }}-*");

  const suites = workflow.jobs["main-suites"];
  assert.equal(suites["runs-on"], "ubuntu-latest");
  assert.equal(suites.needs, "resolve-main");
  assert.equal(suites.strategy?.matrix, "${{ fromJSON(needs.resolve-main.outputs.matrix) }}");
  const releaseMatrix = workflow.jobs.suites.strategy?.matrix;
  assert.deepEqual(hostedMatrixFromCi(ci), releaseMatrix);
  const checkout = suites.steps?.find((s) => s.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.ref, "main");
  const runtime = suites.steps?.find((s) => s.uses?.startsWith("actions/setup-node@"));
  assert.equal(runtime?.with?.["node-version"], "${{ needs.resolve-main.outputs.node-version }}");
  const mainRuntime = (job.steps ?? []).find((s) => s.uses?.startsWith("actions/setup-node@"));
  assert.equal(
    mainRuntime?.with?.["node-version"],
    "${{ needs.resolve-main.outputs.node-version || '24' }}"
  );
});

test("main hosted matrix follows the resolved target instead of fixed workflow shards", () => {
  assert.equal(
    workflow.jobs["main-suites"].strategy?.matrix,
    "${{ fromJSON(needs.resolve-main.outputs.matrix) }}"
  );
});

test("main resolver reads CI from the resolved SHA using the workflow's parser", () => {
  const job = workflow.jobs["resolve-main"];
  assert.deepEqual(Object.keys(job.outputs ?? {}).sort(), ["matrix", "node-version", "sha"]);
  const checkout = job.steps?.find((step) => step.uses?.startsWith("actions/checkout@"));
  assert.equal(checkout?.with?.ref, "${{ github.workflow_sha }}");
  const resolve = job.steps?.find((step) => step.run?.includes("branches/main"));
  assert.ok(resolve?.run?.includes("contents/.github/workflows/ci.yml?ref=$SHA"));
  assert.ok(
    resolve?.run?.includes(
      'MATRIX=$(node scripts/ci/release-green-matrix.mjs "$RUNNER_TEMP/main-ci.yml")'
    )
  );
  assert.match(resolve?.run ?? "", /set -euo pipefail/);
});

test("hosted main retains suite identity, diagnostics and both Vitest layouts", () => {
  const job = workflow.jobs["main-suites"];
  const run = job.steps?.find((step) => step.run?.includes("release-green-suite.mjs"));
  assert.equal(run?.env?.OMNIROUTE_UNIT_CHECKOUT_SHA, "${{ needs.resolve-main.outputs.sha }}");
  assert.ok(run?.env?.OMNIROUTE_UNIT_INVOCATION_ID);
  assert.ok(run?.run?.includes('if [ "$NAME" = "vitest" ]'));
  assert.ok(run?.run?.includes('elif [[ "$NAME" == vitest-* ]]'));
  assert.ok(run?.run?.includes('if [ "$NAME" = "vitest-1" ]'));
  assert.ok(run?.run?.includes('codes=("${PIPESTATUS[@]}")'));
  assert.ok(run?.run?.includes("code=${codes[1]}"));
  const diagnostics = job.steps?.find(
    (step) =>
      step.with?.["name"] ===
      "unit-progress-main-hosted-${{ github.run_id }}-${{ github.run_attempt }}-${{ matrix.name }}"
  );
  assert.equal(diagnostics?.with?.["include-hidden-files"], true);
  assert.equal(diagnostics?.with?.path, ".artifacts/unit-progress/*.jsonl");
});

test("main-green stays on main when resolve-main produced no commit", () => {
  const steps = workflow.jobs["main-green"].steps ?? [];
  const checkout = steps.find((s) => s.uses?.startsWith("actions/checkout@"));
  // An empty ref makes actions/checkout use the workflow's own ref, i.e. the release tip.
  assert.equal(
    checkout?.with?.ref,
    "${{ github.event_name == 'push' && github.sha || needs.resolve-main.outputs.sha || 'main' }}"
  );
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
  assert.equal(suiteResult("vitest-4", "0", "Tests passed").code, 0);
});
