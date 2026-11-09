import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

const workflow = load(
  readFileSync(new URL("../../.github/workflows/ci.yml", import.meta.url), "utf8")
);
const policy = JSON.parse(
  readFileSync(new URL("../../config/quality/admission-policy.json", import.meta.url), "utf8")
);
const ready = {
  "github.event_name": "pull_request",
  "github.event.action": "ready_for_review",
  "github.event.changes.base": null,
  "needs.changes.result": "success",
  "github.event.pull_request.draft": false,
  "github.head_ref": "fix/example",
  "github.event.pull_request.user.id": 1,
  "github.event.pull_request.user.login": "contributor",
  "github.event.pull_request.user.type": "User",
  "github.event.repository.id": 1157102282,
  "github.event.pull_request.head.repo.id": 1157102282,
  "github.event.pull_request.base.repo.id": 1157102282,
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.docs": "true",
  "needs.changes.outputs.i18n": "true",
  "needs.changes.outputs.testsOnly": "false",
  "needs.lint.result": "success",
  "needs.test-unit.result": "success",
};
const queue = {
  ...ready,
  "github.event.pull_request.draft": true,
  "github.head_ref": "mergify/merge-queue/5cff6771d5",
  "github.event.pull_request.user.id": 37929162,
  "github.event.pull_request.user.login": "mergify[bot]",
  "github.event.pull_request.user.type": "Bot",
};

// Interpret the bounded expression grammar used by these guards, including the
// operand-returning &&/|| used in names and concurrency. Never execute workflow
// text as JavaScript. Context values remain typed (a retarget contains an object).
function expression(source, values) {
  const text = String(source).replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  const tokens = text.match(/'(?:[^']|'')*'|[\w.-]+|&&|\|\||==|!=|[!>(),]/g) ?? [];
  assert.equal(tokens.join(""), text.replace(/\s+(?=(?:[^']*'[^']*')*[^']*$)/g, ""));
  let index = 0;
  const number = (value) => (typeof value === "object" && value !== null ? NaN : Number(value));
  const equal = (a, b) =>
    typeof a === typeof b
      ? typeof a === "string"
        ? a.toLowerCase() === b.toLowerCase()
        : a === b
      : number(a) === number(b);
  function primary() {
    const token = tokens[index++];
    if (token === "!") return !primary();
    if (token === "(") {
      const value = disjunction();
      assert.equal(tokens[index++], ")");
      return value;
    }
    if (token?.startsWith("'")) return token.slice(1, -1).replaceAll("''", "'");
    if (["true", "false", "null"].includes(token) || /^\d+$/.test(token)) return JSON.parse(token);
    if (["always", "cancelled", "startsWith"].includes(token)) {
      assert.equal(tokens[index++], "(");
      if (token !== "startsWith") {
        assert.equal(tokens[index++], ")");
        return token === "always";
      }
      const value = disjunction();
      assert.equal(tokens[index++], ",");
      const prefix = disjunction();
      assert.equal(tokens[index++], ")");
      return String(value).toLowerCase().startsWith(String(prefix).toLowerCase());
    }
    assert.ok(Object.hasOwn(values, token), `unsupported context: ${token}`);
    return values[token];
  }
  function comparison() {
    const a = primary();
    const operator = tokens[index];
    if (!["==", "!=", ">"].includes(operator)) return a;
    index++;
    const b = primary();
    return operator === "==" ? equal(a, b) : operator === "!=" ? !equal(a, b) : a > b;
  }
  function conjunction() {
    let value = comparison();
    while (tokens[index] === "&&") {
      index++;
      const next = comparison();
      value = value && next;
    }
    return value;
  }
  function disjunction() {
    let value = conjunction();
    while (tokens[index] === "||") {
      index++;
      const next = conjunction();
      value = value || next;
    }
    return value;
  }
  const result = disjunction();
  assert.equal(index, tokens.length);
  return result;
}

function render(source, values) {
  return String(source).replace(/\$\{\{([\s\S]+?)\}\}/g, (_, body) =>
    String(expression(body, values))
  );
}

function condition(source, values) {
  return Boolean(expression(source, values));
}

function jobValues(values, selectedWorkflow = workflow) {
  const guard = selectedWorkflow.jobs.changes.outputs.queueCandidate ?? "false";
  return {
    ...values,
    "needs.changes.outputs.queueCandidate": String(condition(guard, values)),
  };
}

const required = Object.entries(policy.profiles.ci.jobs)
  .filter(([, rule]) => rule.disposition === "required")
  .map(([id]) => id);

function scheduled(id, values) {
  const job = workflow.jobs[id];
  return (
    [job.needs ?? []].flat().every((dependency) => scheduled(dependency, values)) &&
    condition(job.if ?? "true", values)
  );
}

test("an official queue draft enables every applicable required CI lane", () => {
  const values = jobValues(queue);
  assert.equal(values["needs.changes.outputs.queueCandidate"], "true");
  for (const id of required) {
    const job = workflow.jobs[id];
    assert.equal(scheduled(id, values), true, id);
    if (String(job.if).includes("needs.changes.")) {
      assert.ok([job.needs].flat().includes("changes"), `${id} must receive classifier outputs`);
    }
  }
  // Full-matrix lane (2026-10-27): the build-dependent heavy jobs also read the classifier
  // so an ordinary PR skips them and the queue candidate runs them.
  assert.deepEqual(workflow.jobs["package-artifact"].needs, ["build", "changes"]);
  assert.deepEqual(workflow.jobs["electron-package-smoke"].needs, ["build", "changes"]);
  assert.deepEqual(workflow.jobs["test-coverage"].needs, "test-unit");
});

test("ordinary drafts, forged prefixes, forks and missing app authority stay skipped", () => {
  const negatives = [
    { ...ready, "github.event.pull_request.draft": true },
    { ...queue, "github.event.pull_request.user.id": 1 },
    { ...queue, "github.event.pull_request.user.login": "contributor" },
    { ...queue, "github.event.pull_request.user.type": "User" },
    { ...queue, "github.event.pull_request.user.id": null },
    { ...queue, "github.event.pull_request.head.repo.id": 42 },
    { ...queue, "github.event.pull_request.base.repo.id": 42 },
    { ...queue, "github.event.repository.id": 0 },
    { ...queue, "github.head_ref": "mergify/merge-queue" },
  ];
  for (const values of negatives) {
    const context = jobValues(values);
    assert.equal(context["needs.changes.outputs.queueCandidate"], "false");
    for (const id of required.filter((id) => id !== "changes")) {
      assert.equal(scheduled(id, context), false, id);
    }
  }
});

const fullLane = new Set(
  Object.entries(policy.profiles.ci.jobs)
    .filter(([, rule]) => rule.when.startsWith("full-"))
    .map(([id]) => id)
);

test("ready PRs run the fast lane, skip the full matrix, and classification still rules", () => {
  for (const id of required)
    assert.equal(
      scheduled(id, jobValues(ready)),
      !fullLane.has(id),
      `${id} ${fullLane.has(id) ? "is full-matrix only" : "must run on a ready PR"}`
    );
  const docsOnly = jobValues({
    ...queue,
    "needs.changes.outputs.code": "false",
    "needs.changes.outputs.i18n": "false",
  });
  for (const id of [
    "lint",
    "build",
    "test-unit",
    "test-vitest",
    "test-integration",
    "test-security",
  ])
    assert.equal(condition(workflow.jobs[id].if, docsOnly), false, id);
  assert.equal(condition(workflow.jobs["docs-sync-strict"].if, docsOnly), true);
  assert.equal(condition(workflow.jobs["admission-verdict"].if, jobValues(ready)), true);
});

// Preserve the eight public #18961 scenarios in their original test file while
// exercising the broader metadata/retarget policy from the actual workflows.
function scheduledIn(selectedWorkflow, id, values) {
  const job = selectedWorkflow.jobs[id];
  return (
    [job.needs ?? []]
      .flat()
      .every((dependency) => scheduledIn(selectedWorkflow, dependency, values)) &&
    condition(job.if ?? "true", values)
  );
}

for (const name of ["ci.yml", "quality.yml"]) {
  const selectedWorkflow = load(
    readFileSync(new URL(`../../.github/workflows/${name}`, import.meta.url), "utf8")
  );
  const checkName = name === "ci.yml" ? "Gate / CI" : "Gate / Quality";
  const context = (values) => ({
    ...jobValues(values, selectedWorkflow),
    "github.workflow": selectedWorkflow.name,
    "github.ref": "refs/pull/123/merge",
    "github.run_id": "1234",
  });
  const metadata = (values) => ({
    ...context(values),
    "github.event.action": "edited",
    "github.event.changes.base": null,
    "needs.changes.result": "skipped",
    "needs.changes.outputs.queueCandidate": "",
  });
  const retarget = { ref: { from: "release/v3.8.52" }, sha: { from: "b".repeat(40) } };

  test(`${name}: a queue-draft description edit gets its own concurrency group`, () => {
    const group = selectedWorkflow.concurrency.group;
    const edited = metadata(queue);
    assert.notEqual(render(group, edited), render(group, context(queue)));
    assert.notEqual(render(group, edited), render(group, { ...edited, "github.run_id": "5678" }));
    assert.equal(selectedWorkflow.concurrency["cancel-in-progress"], false);
  });

  test(`${name}: a queue-draft description edit runs no gate and no matrix`, () => {
    for (const candidate of [ready, queue]) {
      const edited = metadata(candidate);
      assert.equal(condition(selectedWorkflow.jobs.changes.if, edited), false);
      for (const id of Object.keys(selectedWorkflow.jobs))
        assert.equal(scheduledIn(selectedWorkflow, id, edited), false, id);
      assert.equal(condition(selectedWorkflow.jobs["admission-verdict"].if, edited), false);
      if (selectedWorkflow.jobs["merge-integrity"]) {
        assert.notEqual(
          render(selectedWorkflow.jobs["merge-integrity"].name, edited),
          "Merge integrity (changelog + generated skills)"
        );
      }
    }
  });

  test(`${name}: metadata edits and ordinary drafts isolate the gate name`, () => {
    const admission = selectedWorkflow.jobs["admission-verdict"];
    const ordinaryDraft = context({ ...ready, "github.event.pull_request.draft": true });
    assert.equal(condition(admission.if, ordinaryDraft), false);
    assert.equal(
      render(admission.name, ordinaryDraft),
      `Admission not requested / ${name === "ci.yml" ? "CI" : "Quality"}`
    );
    for (const candidate of [ready, queue]) {
      assert.notEqual(render(admission.name, metadata(candidate)), checkName);
      assert.equal(render(admission.name, context(candidate)), checkName);
      assert.equal(
        render(
          admission.name,
          context({
            ...candidate,
            "github.event.action": "edited",
            "github.event.changes.base": retarget,
          })
        ),
        checkName
      );
    }
  });

  test(`${name}: candidate, retarget and non-PR runs keep the classifier and gate`, () => {
    const admission = selectedWorkflow.jobs["admission-verdict"];
    for (const candidate of [ready, queue]) {
      for (const patch of [
        { "github.event.action": "synchronize" },
        { "github.event.action": "ready_for_review" },
        { "github.event.action": "edited", "github.event.changes.base": retarget },
        { "github.event_name": "push" },
        { "github.event_name": "workflow_dispatch" },
        { "github.event_name": "merge_group" },
      ]) {
        const values = context({ ...candidate, ...patch });
        assert.equal(condition(selectedWorkflow.jobs.changes.if, values), true);
        assert.equal(condition(admission.if, values), true);
        assert.equal(render(admission.name, values), checkName);
      }
    }
  });
}
