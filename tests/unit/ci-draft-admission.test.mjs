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
  "github.event.pull_request.draft": false,
  "github.head_ref": "fix/example",
  "github.event.pull_request.user.id": 1,
  "github.event.pull_request.user.login": "contributor",
  "github.event.pull_request.user.type": "User",
  "github.event.repository.id": 1157102282,
  "github.event.pull_request.head.repo.id": 1157102282,
  "github.event.pull_request.base.repo.id": 1157102282,
  "needs.changes.result": "success",
  "needs.changes.outputs.queueCandidate": "false",
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.docs": "true",
  "needs.changes.outputs.i18n": "true",
  "needs.changes.outputs.testsOnly": "false",
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

function admissionContext(values) {
  return {
    event: values["github.event_name"],
    draft: values["github.event.pull_request.draft"],
    headRef: values["github.head_ref"],
    author: {
      id: values["github.event.pull_request.user.id"],
      login: values["github.event.pull_request.user.login"],
      type: values["github.event.pull_request.user.type"],
    },
    repositoryId: values["github.event.repository.id"],
    headRepositoryId: values["github.event.pull_request.head.repo.id"],
    baseRepositoryId: values["github.event.pull_request.base.repo.id"],
    sha: "a".repeat(40),
    runId: "123",
    runAttempt: "1",
  };
}

function needsFor(profile, result = "success") {
  const needs = Object.fromEntries(
    Object.keys(policy.profiles[profile].jobs).map((id) => [id, { result }])
  );
  needs.changes = {
    result: "success",
    outputs: { code: "true", docs: "true", i18n: "true", workflow: "true", testsOnly: "false" },
  };
  return needs;
}

for (const profile of ["ci", "quality"]) {
  const workflow = load(
    readFileSync(new URL(`../../.github/workflows/${profile}.yml`, import.meta.url), "utf8")
  );
  const gate = workflow.jobs["admission-verdict"];
  const checkName = policy.profiles[profile].checkName;
  const notRequested = `Admission not requested / ${profile === "ci" ? "CI" : "Quality"}`;
  const valuesFor = (context) => ({
    ...context,
    "needs.changes.outputs.queueCandidate": String(
      expression(workflow.jobs.changes.outputs.queueCandidate ?? "false", context)
    ),
  });

  test(`${profile}: ordinary drafts skip admission without a required check or PASS receipt`, () => {
    for (const action of ["opened", "synchronize", "converted_to_draft"]) {
      const values = valuesFor({ ...draft, "github.event.action": action });
      const producer = workflow.jobs[profile === "ci" ? "lint" : "fast-gates"];
      assert.equal(Boolean(expression(producer.if, values)), false);
      assert.equal(Boolean(expression(gate.if, values)), false);
      assert.equal(expression(gate.name, values), notRequested);
      // The evaluator remains fail-closed if a caller incorrectly asks to admit this draft.
      assert.equal(
        evaluateAdmission(policy, profile, admissionContext(values), needsFor(profile, "skipped"))
          .verdict,
        "FAIL"
      );
    }
  });

  test(`${profile}: a forged queue identity cannot request draft admission`, () => {
    for (const patch of [
      { "github.event.pull_request.user.id": 1 },
      { "github.event.pull_request.user.login": "contributor" },
      { "github.event.pull_request.user.type": "User" },
      { "github.event.pull_request.head.repo.id": 42 },
      { "github.event.pull_request.base.repo.id": 42 },
      { "github.event.repository.id": 0 },
      { "github.head_ref": "mergify/merge-queue" },
    ]) {
      const values = valuesFor({ ...queue, ...patch });
      assert.equal(values["needs.changes.outputs.queueCandidate"], "false");
      assert.equal(Boolean(expression(gate.if, values)), false);
      assert.equal(expression(gate.name, values), notRequested);
    }
  });

  test(`${profile}: ready_for_review and ready PR updates retain required admission`, () => {
    assert.ok(workflow.on.pull_request.types.includes("ready_for_review"));
    for (const action of ["ready_for_review", "opened", "synchronize", "reopened", "edited"]) {
      const values = valuesFor({ ...ready, "github.event.action": action });
      assert.equal(Boolean(expression(gate.if, values)), true);
      assert.equal(expression(gate.name, values), checkName);
    }
  });

  test(`${profile}: ready and official queue candidates fail on an incomplete required result`, () => {
    const requiredJob = profile === "ci" ? "test-unit" : "fast-gates";
    for (const context of [ready, queue]) {
      const values = valuesFor(context);
      assert.equal(Boolean(expression(gate.if, values)), true);
      assert.equal(expression(gate.name, values), checkName);
      assert.equal(
        evaluateAdmission(policy, profile, admissionContext(values), needsFor(profile)).verdict,
        "PASS"
      );
      for (const result of ["failure", "cancelled", "skipped", "missing"]) {
        const needs = needsFor(profile);
        if (result === "missing") delete needs[requiredJob];
        else needs[requiredJob].result = result;
        assert.equal(
          evaluateAdmission(policy, profile, admissionContext(values), needs).verdict,
          "FAIL",
          result
        );
      }
    }
  });

  test(`${profile}: classification failure and unexplained skip still reach fail-closed admission`, () => {
    for (const context of [ready, draft, queue]) {
      for (const result of ["failure", "cancelled", "skipped"]) {
        const values = {
          ...valuesFor(context),
          "needs.changes.result": result,
          "needs.changes.outputs.queueCandidate": "",
        };
        assert.equal(Boolean(expression(gate.if, values)), true);
        assert.equal(expression(gate.name, values), checkName);
        const needs = needsFor(profile, "skipped");
        needs.changes.result = result;
        assert.equal(
          evaluateAdmission(policy, profile, admissionContext(values), needs).verdict,
          "FAIL"
        );
      }
    }
  });

  test(`${profile}: push, dispatch and merge_group keep their admission check`, () => {
    for (const event of ["push", "workflow_dispatch", "merge_group"]) {
      const values = valuesFor({ ...ready, "github.event_name": event });
      assert.equal(Boolean(expression(gate.if, values)), true);
      assert.equal(expression(gate.name, values), checkName);
    }
  });

  test(`${profile}: queue description edits retain their separate skipped check`, () => {
    const values = {
      ...valuesFor({ ...queue, "github.event.action": "edited" }),
      "needs.changes.result": "skipped",
      "needs.changes.outputs.queueCandidate": "",
    };
    assert.equal(Boolean(expression(workflow.jobs.changes.if, values)), false);
    assert.equal(Boolean(expression(gate.if, values)), false);
    assert.equal(expression(gate.name, values), `${checkName} (queue-draft edit)`);
  });
}
