import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);

test("unrelated candidate builds cannot replace each other's pending concurrency slot", () => {
  assert.equal(
    workflow.jobs.build.concurrency.group,
    "heavy-build-${{ github.ref == 'refs/heads/main' && 'main' || github.ref }}"
  );
  assert.equal(workflow.jobs.build.concurrency["cancel-in-progress"], false);
});

test("superseded runs cancel only within the same workflow/ref", () => {
  assert.equal(workflow.concurrency.group, "${{ github.workflow }}-${{ github.ref }}");
  assert.equal(workflow.concurrency["cancel-in-progress"], true);
});

test("no pull request or merge group Build reaches the self-hosted build slot", () => {
  // 2026-10-18: with every own-origin PR routed to the ONE omni-build runner, 18 Turbopack
  // Builds (29-58 min each) queued for up to 18 h and the release line's own push Build got
  // the slot once in 40 jobs. PR and merge_group Builds now run hosted with webpack.
  // The self-hosted path is a pure conjunction, so these four clauses are the whole gate:
  // a pull_request (own-origin or fork) or merge_group event can never satisfy it.
  const runsOn: string = workflow.jobs.build["runs-on"];
  const runnerCondition = runsOn.split(" && fromJSON(")[0];
  const clauses = runnerCondition
    .replace(/^\$\{\{ \(/, "")
    .replace(/\)$/, "")
    .split(" && ");
  assert.deepEqual(clauses, [
    "vars.USE_VPS_RUNNER == 'true'",
    "vars.USE_VPS_BUILD_RUNNER == 'true'",
    "github.event_name != 'merge_group'",
    "github.event_name != 'pull_request'",
  ]);
  assert.doesNotMatch(runnerCondition, /\|\|/, "no exception may re-admit a PR event");
  assert.match(runsOn, /\["self-hosted","omni-build"\]/);
  assert.match(runsOn, /\|\| 'ubuntu-latest' \}\}$/);
});

test("the Turbopack switch follows the self-hosted build slot; hosted stays on webpack", () => {
  // The .113 build slot has 56 GB High since 2026-10-17: the Turbopack compile phase alone
  // holds ~40 GB and the build peaked at 49 GB uncapped. Hosted runners (16 GB) cannot hold
  // it and build with webpack (14 GB) — which is where every PR Build now runs.
  const step = workflow.jobs.build.steps.find(
    (item: { run?: string }) => item.run === "npm run build"
  );
  const runnerCondition = workflow.jobs.build["runs-on"].split(" && fromJSON(")[0];
  assert.equal(step.env.OMNIROUTE_USE_TURBOPACK, `${runnerCondition} && '1' || '0' }}`);
});
