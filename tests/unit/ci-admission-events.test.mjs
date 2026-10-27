import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";
import { evaluateAdmission } from "../../scripts/quality/admission-verdict.mjs";

const policy = JSON.parse(
  readFileSync(new URL("../../config/quality/admission-policy.json", import.meta.url), "utf8")
);
const ready = {
  "github.event_name": "pull_request",
  "github.event.action": "ready_for_review",
  "github.event.changes.base": null,
  "github.event.pull_request.draft": false,
  "github.head_ref": "fix/example",
  "github.workflow": "CI",
  "github.ref": "refs/pull/123/merge",
  "github.run_id": "1234",
  "github.event.pull_request.user.id": 1,
  "github.event.pull_request.user.login": "contributor",
  "github.event.pull_request.user.type": "User",
  "github.event.repository.id": 1157102282,
  "github.event.pull_request.head.repo.id": 1157102282,
  "github.event.pull_request.head.repo.fork": false,
  "github.event.pull_request.base.repo.id": 1157102282,
  "needs.changes.result": "success",
  "needs.changes.outputs.queueCandidate": "false",
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.docs": "true",
  "needs.changes.outputs.i18n": "true",
  "needs.changes.outputs.testsOnly": "false",
  "needs.lint.result": "success",
  "needs.test-unit.result": "success",
  "needs.test-coverage.result": "success",
  "vars.SONARQUBE_ENABLED": "false",
};
const draft = { ...ready, "github.event.pull_request.draft": true };
const queue = {
  ...draft,
  "github.head_ref": "mergify/merge-queue/example",
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

function scheduled(workflow, id, values) {
  const job = workflow.jobs[id];
  return (
    [job.needs ?? []].flat().every((dependency) => scheduled(workflow, dependency, values)) &&
    Boolean(expression(job.if ?? "true", values))
  );
}

for (const profile of ["ci", "quality"]) {
  const workflow = load(
    readFileSync(new URL(`../../.github/workflows/${profile}.yml`, import.meta.url), "utf8")
  );
  const admission = workflow.jobs["admission-verdict"];
  const checkName = policy.profiles[profile].checkName;
  const required = Object.entries(policy.profiles[profile].jobs).filter(
    ([, rule]) => rule.disposition === "required"
  );
  const valuesFor = (context) => ({
    ...context,
    "needs.changes.outputs.queueCandidate": String(
      expression(workflow.jobs.changes.outputs.queueCandidate ?? "false", context)
    ),
  });

  test(`${profile}: body/title edits neither schedule jobs nor supersede candidate checks`, () => {
    for (const context of [ready, draft, queue]) {
      // Missing GitHub properties resolve to an empty string; null is equivalent
      // for this guard. Test both representations of an absent changes.base.
      for (const missingBase of [null, ""]) {
        const values = {
          ...valuesFor(context),
          "github.event.action": "edited",
          "github.event.changes.base": missingBase,
          "needs.changes.result": "skipped",
        };
        for (const id of Object.keys(workflow.jobs))
          assert.equal(scheduled(workflow, id, values), false, id);
        assert.equal(expression(admission.if, values), false);
        assert.notEqual(render(admission.name, values), checkName);
        assert.notEqual(
          render(workflow.concurrency.group, values),
          render(workflow.concurrency.group, valuesFor(context))
        );
        assert.notEqual(
          render(workflow.concurrency.group, values),
          render(workflow.concurrency.group, { ...values, "github.run_id": "5678" })
        );
      }
    }
  });

  test(`${profile}: ready and trusted queue candidates retain every required lane`, () => {
    assert.ok(workflow.on.pull_request.types.includes("ready_for_review"));
    assert.ok(workflow.on.pull_request.types.includes("edited"));
    const retarget = {
      ref: { from: "release/v3.8.52" },
      sha: { from: "b".repeat(40) },
    };
    for (const context of [ready, queue]) {
      for (const patch of [
        { "github.event.action": "ready_for_review" },
        { "github.event.action": "synchronize" },
        { "github.event.action": "edited", "github.event.changes.base": retarget },
      ]) {
        const values = valuesFor({ ...context, ...patch });
        for (const [id] of required)
          assert.equal(scheduled(workflow, id, values), true, `${id}: ${JSON.stringify(patch)}`);
        assert.equal(expression(admission.if, values), true);
        assert.equal(render(admission.name, values), checkName);
        assert.equal(
          render(workflow.concurrency.group, values),
          render(workflow.concurrency.group, valuesFor(context))
        );
      }
    }
  });

  test(`${profile}: ordinary and forged drafts have no admission check or PASS receipt`, () => {
    const negatives = [
      draft,
      { ...queue, "github.event.pull_request.user.id": 1 },
      { ...queue, "github.event.pull_request.user.login": "contributor" },
      { ...queue, "github.event.pull_request.user.type": "User" },
      { ...queue, "github.event.pull_request.user.id": null },
      { ...queue, "github.event.pull_request.head.repo.id": 42 },
      { ...queue, "github.event.pull_request.base.repo.id": 42 },
      { ...queue, "github.event.repository.id": 0 },
    ];
    for (const context of negatives) {
      const values = valuesFor(context);
      assert.equal(values["needs.changes.outputs.queueCandidate"], "false");
      for (const [id] of required.filter(([id]) => id !== "changes"))
        assert.equal(scheduled(workflow, id, values), false, id);
      assert.equal(expression(admission.if, values), false);
      assert.notEqual(render(admission.name, values), checkName);
    }
    const needs = Object.fromEntries(
      Object.keys(policy.profiles[profile].jobs).map((id) => [id, { result: "success" }])
    );
    needs.changes.outputs = {
      code: "true",
      docs: "true",
      i18n: "true",
      workflow: "true",
      testsOnly: "false",
    };
    assert.equal(
      evaluateAdmission(
        policy,
        profile,
        {
          event: "pull_request",
          draft: true,
          sha: "a".repeat(40),
          runId: "1",
          runAttempt: "1",
        },
        needs
      ).verdict,
      "FAIL"
    );
  });

  test(`${profile}: classification failure, cancellation or unexplained skip still reaches the gate`, () => {
    for (const context of [ready, draft, queue]) {
      for (const result of ["failure", "cancelled", "skipped"]) {
        const values = {
          ...context,
          "needs.changes.result": result,
          "needs.changes.outputs.queueCandidate": "",
        };
        assert.equal(expression(admission.if, values), true, result);
        assert.equal(render(admission.name, values), checkName, result);
      }
    }
  });

  test(`${profile}: push, merge_group and manual runs retain full admission`, () => {
    for (const event of ["push", "merge_group", "workflow_dispatch"]) {
      const values = valuesFor({ ...ready, "github.event_name": event });
      for (const [id, rule] of required.filter(([, rule]) => rule.when !== "pr"))
        assert.equal(scheduled(workflow, id, values), true, `${event}: ${id} (${rule.when})`);
      assert.equal(expression(admission.if, values), true);
      assert.equal(render(admission.name, values), checkName);
    }
  });
}
