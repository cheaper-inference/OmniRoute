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

// Evaluate only the boolean/comparison subset used by these job guards. Reject
// unknown syntax instead of executing workflow text as JavaScript or shell code.
function condition(expression, values) {
  let text = String(expression).replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  text = text.replace(/'([^']*)'/g, (_, value) => JSON.stringify(value));
  text = text.replace(/(?:github|needs)\.[\w.-]+/g, (key) => {
    assert.ok(Object.hasOwn(values, key), `unsupported context: ${key}`);
    return JSON.stringify(values[key]);
  });
  text = text.replace(/startsWith\(("[^"]*"),\s*("[^"]*")\)/g, (_, value, prefix) =>
    String(JSON.parse(value).startsWith(JSON.parse(prefix)))
  );
  text = text.replace(/always\(\)/g, "true").replace(/cancelled\(\)/g, "false");
  text = text.replace(
    /("[^"]*"|true|false|null|\d+)\s*(==|!=|>)\s*("[^"]*"|true|false|null|\d+)/g,
    (_, left, operator, right) => {
      const a = JSON.parse(left);
      const b = JSON.parse(right);
      return String(operator === "==" ? a === b : operator === "!=" ? a !== b : a > b);
    }
  );
  const tokens = text.match(/true|false|&&|\|\||[!()]/g) ?? [];
  assert.equal(tokens.join(""), text.replace(/\s/g, ""), `unsupported guard: ${text}`);
  let index = 0;
  function primary() {
    const token = tokens[index++];
    if (token === "!") return !primary();
    if (token === "(") {
      const value = disjunction();
      assert.equal(tokens[index++], ")");
      return value;
    }
    assert.ok(["true", "false"].includes(token), `unexpected token: ${token}`);
    return token === "true";
  }
  function conjunction() {
    let value = primary();
    while (tokens[index] === "&&") {
      index++;
      const next = primary();
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

function jobValues(values) {
  const guard = workflow.jobs.changes.outputs.queueCandidate ?? "false";
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
  assert.equal(workflow.jobs["admission-verdict"].if, "${{ always() }}");
});
