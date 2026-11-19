import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { renderExpression } from "../../_helpers/workflowExpression.mjs";

const workflow = parse(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
);

const headEvent: Record<string, string | null | { from?: string; ref?: { from: string } }> = {
  "github.event_name": "pull_request",
  "github.event.action": "synchronize",
  "github.event.changes.base": null,
  "github.event.changes.body": null,
  "github.event.changes.title": null,
  "github.workflow": "CI",
  "github.ref": "refs/pull/20540/merge",
};
const metadataEvent = {
  ...headEvent,
  "github.event.action": "edited",
  "github.event.changes.body": { from: "" },
};

test("metadata builds and unrelated PRs cannot displace a pending head build", () => {
  const queue = (event: typeof headEvent) =>
    renderExpression(workflow.jobs.build.concurrency.group, event);
  assert.equal(queue(headEvent), "heavy-build-refs/pull/20540/merge");
  assert.equal(queue(metadataEvent), "heavy-build-refs/pull/20540/merge-metadata-edit");
  assert.equal(
    queue({ ...metadataEvent, "github.event.changes.base": { ref: { from: "main" } } }),
    queue(headEvent)
  );
  assert.notEqual(queue({ ...headEvent, "github.ref": "refs/pull/20541/merge" }), queue(headEvent));
  assert.equal(
    queue({ ...headEvent, "github.event_name": "push", "github.ref": "refs/heads/main" }),
    "heavy-build-main"
  );
  assert.equal(workflow.jobs.build.concurrency["cancel-in-progress"], false);
});

test("workflow cancellation keeps head updates and metadata revalidation in separate groups", () => {
  assert.equal(renderExpression(workflow.concurrency.group, headEvent), "CI-refs/pull/20540/merge");
  assert.equal(
    renderExpression(workflow.concurrency.group, metadataEvent),
    "CI-refs/pull/20540/merge-metadata-edit"
  );
  assert.equal(workflow.concurrency["cancel-in-progress"], true);
});

test("no pull request or merge group Build reaches the self-hosted build slot", () => {
  // 2026-10-18: with every own-origin PR routed to the ONE omni-build runner, 18 Turbopack
  // Builds (29-58 min each) queued for up to 18 h and the release line's own push Build got
  // the slot once in 40 jobs. PR and merge_group Builds now run hosted with webpack.
  // The self-hosted path is a pure conjunction, so these five clauses are the whole gate:
  // a pull_request (own-origin or fork) or merge_group event can never satisfy it, and neither
  // can a push to an omni-queue/** merge-queue candidate (its tree carries fork code).
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
    "!startsWith(github.ref, 'refs/heads/omni-queue/')",
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
