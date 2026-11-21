import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";
import { expression, renderExpression } from "../_helpers/workflowExpression.mjs";

const ready = {
  "github.event_name": "pull_request",
  "github.event.action": "synchronize",
  "github.event.changes.base": null,
  "github.event.changes.body": null,
  "github.event.changes.title": null,
  "github.event.pull_request.draft": false,
  "github.event.pull_request.user.id": 1,
  "github.event.pull_request.user.login": "contributor",
  "github.event.pull_request.user.type": "User",
  "github.event.pull_request.head.repo.id": 42,
  "github.event.pull_request.base.repo.id": 42,
  "github.event.repository.id": 42,
  "github.head_ref": "fix/example",
  "github.ref": "refs/pull/20540/merge",
  "needs.changes.result": "success",
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.queueCandidate": "false",
};
const queue = {
  "github.event.pull_request.draft": true,
  "github.event.pull_request.user.id": 37929162,
  "github.event.pull_request.user.login": "mergify[bot]",
  "github.event.pull_request.user.type": "Bot",
  "github.head_ref": "mergify/merge-queue/example",
  "needs.changes.outputs.queueCandidate": "true",
};

test("the bounded expression fixture keeps GitHub object truthiness and string rendering", () => {
  const values = { item: { from: "" }, missing: null, id: "17" };
  assert.equal(Boolean(expression("item", values)), true);
  assert.equal(expression("!item", values), false);
  assert.equal(expression("missing || 'fallback'", values), "fallback");
  assert.equal(renderExpression("run-${{ format('{0}', id) }}", values), "run-17");
});

for (const profile of ["ci", "quality"]) {
  const workflow = load(
    readFileSync(new URL(`../../.github/workflows/${profile}.yml`, import.meta.url), "utf8")
  );
  const requiredName = profile === "ci" ? "Gate / CI" : "Gate / Quality";
  const context = { ...ready, "github.workflow": workflow.name };
  const humanEdit = {
    ...context,
    "github.event.action": "edited",
    "github.event.changes.body": { from: "old text" },
  };
  const group = (values) => renderExpression(workflow.concurrency.group, values);
  const gate = workflow.jobs["admission-verdict"];
  const metadataCases = [
    ["body", { "github.event.changes.body": { from: "old text" } }],
    ["title", { "github.event.changes.title": { from: "old title" } }],
    ["empty previous body", { "github.event.changes.body": { from: "" } }],
    ["null previous body", { "github.event.changes.body": { from: null } }],
    [
      "title and body",
      {
        "github.event.changes.body": { from: "body" },
        "github.event.changes.title": { from: "title" },
      },
    ],
    [
      "fork",
      {
        "github.event.pull_request.head.repo.id": 99,
        "github.event.changes.body": { from: "old" },
      },
    ],
  ];
  for (const [label, patch] of metadataCases) {
    const edited = { ...context, ...patch, "github.event.action": "edited" };
    test(`${profile}: ${label} edits retain admission in the metadata concurrency group`, () => {
      assert.equal(group(edited), `${group(context)}-metadata-edit`);
      assert.equal(Boolean(expression(workflow.jobs.changes.if, edited)), true);
      assert.equal(Boolean(expression(gate.if, edited)), true);
      assert.equal(expression(gate.name, edited), requiredName);
      if (workflow.jobs["ci-summary"])
        assert.equal(Boolean(expression(workflow.jobs["ci-summary"].if, edited)), true);
    });
  }

  test(`${profile}: human edits still execute the current title and description checks`, () => {
    const job = workflow.jobs[profile === "ci" ? "lint" : "fast-gates"];
    assert.equal(Boolean(expression(job.if, humanEdit)), true);
    const attribution = job.steps.find((step) => step.run?.includes("ai-attribution"));
    assert.ok(attribution, "the original attribution gate must still run");
    if (profile === "ci") {
      assert.equal(attribution.env.PR_TITLE, "${{ github.event.pull_request.title }}");
      assert.equal(attribution.env.PR_BODY, "${{ github.event.pull_request.body }}");
      const policy = workflow.jobs["pr-test-policy"];
      assert.equal(Boolean(expression(policy.if, humanEdit)), true);
      const evidence = policy.steps.find((step) => step.run === "npm run check:pr-evidence");
      assert.equal(evidence.env.PR_BODY, "${{ github.event.pull_request.body }}");
    } else {
      assert.match(attribution.run, /GITHUB_EVENT_PATH/);
    }
  });

  test(`${profile}: a trusted queue draft edit skips without emitting the required name`, () => {
    const edited = {
      ...humanEdit,
      ...queue,
      "needs.changes.result": "skipped",
      "needs.changes.outputs.queueCandidate": "",
    };
    assert.equal(group(edited), `${group(context)}-metadata-edit`);
    assert.equal(Boolean(expression(workflow.jobs.changes.if, edited)), false);
    assert.equal(Boolean(expression(gate.if, edited)), false);
    assert.equal(expression(gate.name, edited), `${requiredName} (queue-draft edit)`);
  });

  test(`${profile}: incomplete or untrusted queue identities still classify edits`, () => {
    for (const patch of [
      { "github.event.pull_request.draft": false },
      { "github.event.pull_request.user.id": 1 },
      { "github.event.pull_request.user.login": "contributor" },
      { "github.event.pull_request.user.type": "User" },
      { "github.head_ref": "fix/not-queue" },
      { "github.event.repository.id": 0 },
      { "github.event.pull_request.head.repo.id": 99 },
      { "github.event.pull_request.base.repo.id": 99 },
    ]) {
      const edited = { ...humanEdit, ...queue, ...patch };
      assert.equal(Boolean(expression(workflow.jobs.changes.if, edited)), true);
    }
  });

  test(`${profile}: normal draft admission still skips after human metadata classification`, () => {
    const edited = { ...humanEdit, "github.event.pull_request.draft": true };
    assert.equal(Boolean(expression(workflow.jobs.changes.if, edited)), true);
    assert.equal(Boolean(expression(gate.if, edited)), false);
    const suffix = profile === "ci" ? "CI" : "Quality";
    assert.equal(expression(gate.name, edited), `Admission not requested / ${suffix}`);
  });

  for (const [label, patch] of [
    ["base retarget", { "github.event.changes.base": { ref: { from: "main" } } }],
    [
      "base and body",
      {
        "github.event.changes.base": { ref: { from: "main" } },
        "github.event.changes.body": { from: "old" },
      },
    ],
    ["queue retarget", { ...queue, "github.event.changes.base": { ref: { from: "main" } } }],
    [
      "queue retarget with body",
      {
        ...queue,
        "github.event.changes.base": { ref: { from: "main" } },
        "github.event.changes.body": { from: "old" },
      },
    ],
    ["unexplained edit", {}],
  ]) {
    test(`${profile}: ${label} keeps classification, the real gate and normal cancellation`, () => {
      const values = { ...context, ...patch, "github.event.action": "edited" };
      assert.equal(group(values), group(context));
      assert.equal(Boolean(expression(workflow.jobs.changes.if, values)), true);
      assert.equal(Boolean(expression(gate.if, values)), true);
      assert.equal(expression(gate.name, values), requiredName);
    });
  }
  test(`${profile}: head updates, readiness, push and merge_group still request admission`, () => {
    for (const patch of [
      { "github.event.action": "synchronize" },
      { "github.event.action": "ready_for_review" },
      { "github.event_name": "push" },
      { "github.event_name": "merge_group" },
      { "github.event_name": "workflow_dispatch" },
    ]) {
      const values = { ...context, ...patch };
      assert.equal(Boolean(expression(workflow.jobs.changes.if, values)), true);
      assert.equal(Boolean(expression(gate.if, values)), true);
      assert.equal(expression(gate.name, values), requiredName);
      assert.equal(group(values), group(context));
    }
    assert.equal(workflow.concurrency["cancel-in-progress"], true);
    assert.ok(workflow.on.pull_request.types.includes("edited"));
  });
}
