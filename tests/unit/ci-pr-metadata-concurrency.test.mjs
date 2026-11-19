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
  "github.ref": "refs/pull/20515/merge",
  "github.run_id": "1001",
  "needs.changes.result": "success",
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
  const group = (values) => renderExpression(workflow.concurrency.group, values);
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
      "ordinary draft",
      { "github.event.pull_request.draft": true, "github.event.changes.body": { from: "old" } },
    ],
    [
      "fork",
      {
        "github.event.pull_request.head.repo.id": 99,
        "github.event.changes.body": { from: "old" },
      },
    ],
    ["official queue", { ...queue, "github.event.changes.body": { from: "old" } }],
  ];
  for (const [label, patch] of metadataCases) {
    const edited = {
      ...context,
      ...patch,
      "github.event.action": "edited",
      "github.run_id": "1002",
    };
    test(`${profile}: ${label} edits cannot cancel the same candidate's validation`, () => {
      assert.notEqual(group(edited), group({ ...edited, "github.event.action": "synchronize" }));
      assert.notEqual(group(edited), group({ ...edited, "github.run_id": "1003" }));
      assert.equal(
        workflow.concurrency["cancel-in-progress"],
        true,
        "new code still supersedes old code"
      );
    });
    test(`${profile}: ${label} edits cannot replace the required admission with a skipped check`, () => {
      assert.equal(Boolean(expression(workflow.jobs.changes.if, edited)), false);
      const values = {
        ...edited,
        "needs.changes.result": "skipped",
        "needs.changes.outputs.queueCandidate": "",
      };
      const gate = workflow.jobs["admission-verdict"];
      assert.equal(Boolean(expression(gate.if, values)), false);
      assert.notEqual(expression(gate.name, values), requiredName);
      if (workflow.jobs["ci-summary"])
        assert.equal(Boolean(expression(workflow.jobs["ci-summary"].if, values)), false);
    });
  }

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
      assert.equal(group(values), group({ ...context, "github.run_id": "1000" }));
      assert.equal(Boolean(expression(workflow.jobs.changes.if, values)), true);
      assert.equal(Boolean(expression(workflow.jobs["admission-verdict"].if, values)), true);
      assert.equal(expression(workflow.jobs["admission-verdict"].name, values), requiredName);
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
      assert.equal(Boolean(expression(workflow.jobs["admission-verdict"].if, values)), true);
      assert.equal(expression(workflow.jobs["admission-verdict"].name, values), requiredName);
    }
    assert.ok(
      workflow.on.pull_request.types.includes("edited"),
      "retargets must remain observable"
    );
  });
}
