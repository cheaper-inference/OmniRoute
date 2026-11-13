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
  "github.event.action": "synchronize",
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
// The one event that skips the matrix: a description edit on a Mergify queue draft.
const QUEUE_DRAFT_EDIT =
  "github.event_name == 'pull_request' && github.event.action == 'edited' && github.event.pull_request.user.login == 'mergify[bot]' && startsWith(github.head_ref, 'mergify/merge-queue/') && github.event.pull_request.head.repo.id == github.event.repository.id";
const ADMISSION_IF = `\${{ always() && !(${QUEUE_DRAFT_EDIT}) }}`;

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

// omni-queue (2026-11-13): the omni-queue merge queue pushes each candidate (base + the batch's
// merge commits) to a fresh omni-queue/** branch. That push runs the full profile, exactly
// like merge_group: every required lane except the pull-request-only ones.
const omniQueuePush = {
  ...Object.fromEntries(Object.keys(ready).map((key) => [key, null])),
  "github.event_name": "push",
  "github.event.action": null,
  "github.head_ref": "",
  "github.ref": "refs/heads/omni-queue/release-v3.8.54/b1-0123456789ab",
  "github.event.repository.id": 1157102282,
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.docs": "true",
  "needs.changes.outputs.i18n": "true",
  "needs.changes.outputs.testsOnly": "false",
  "needs.lint.result": "success",
  "needs.test-unit.result": "success",
};

test("an omni-queue candidate push enables every applicable required CI lane", () => {
  const values = jobValues(omniQueuePush);
  assert.equal(values["needs.changes.outputs.queueCandidate"], "false", "not a Mergify draft");
  for (const id of required) {
    const prOnly = policy.profiles.ci.jobs[id].when === "pr";
    assert.equal(scheduled(id, values), !prOnly, id);
  }
  assert.equal(condition(workflow.jobs["admission-verdict"].if, values), true);
});

test("a pull request whose head is named omni-queue/* is an ordinary pull request", () => {
  // Only a push of the ref itself is a candidate; a contributor branch name grants nothing.
  const values = jobValues({
    ...queue,
    "github.event.pull_request.user.id": 1,
    "github.event.pull_request.user.login": "contributor",
    "github.event.pull_request.user.type": "User",
    "github.head_ref": "omni-queue/release-v3.8.54/b1-0123456789ab",
  });
  assert.equal(values["needs.changes.outputs.queueCandidate"], "false");
  for (const id of required.filter((id) => id !== "changes")) {
    assert.equal(scheduled(id, values), false, `${id} stays skipped on a draft`);
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
  assert.equal(workflow.jobs["admission-verdict"].if, ADMISSION_IF);
});

// 2026-11-03: Mergify (its queue summary) and the Blacksmith app (its footer) edit a queue
// draft's description ~4 times in its first 30 s. In the shared concurrency group each edit
// cancelled the candidate's real run, and Mergify dequeued the PR on the cancelled checks
// ("checks interrupted"). An edit run now gets its own group and runs nothing heavy.
function editRunValues(expression) {
  const values = { ...queue, "github.event.action": "edited" };
  for (const key of String(expression).match(/(?:github|needs)\.[\w.-]+/g) ?? []) {
    // `changes` is skipped, so every job it gates is skipped and exposes no outputs.
    if (key.startsWith("needs.")) values[key] = key.endsWith(".result") ? "skipped" : "";
    else if (!Object.hasOwn(values, key)) values[key] = "";
  }
  return values;
}

for (const name of ["ci.yml", "quality.yml"]) {
  const wf = load(
    readFileSync(new URL(`../../.github/workflows/${name}`, import.meta.url), "utf8")
  );

  test(`${name}: a queue-draft description edit gets its own concurrency group`, () => {
    assert.equal(
      wf.concurrency.group,
      `\${{ github.workflow }}-\${{ github.ref }}\${{ (${QUEUE_DRAFT_EDIT}) && format('-queue-edit-{0}', github.run_id) || '' }}`
    );
    assert.equal(wf.concurrency["cancel-in-progress"], true);
  });

  test(`${name}: a queue-draft description edit runs no gate and no matrix`, () => {
    const changes = wf.jobs.changes.if;
    assert.equal(condition(changes, editRunValues(changes)), false, "changes");
    // Jobs without always()/cancelled() inherit success() and skip with `changes`; the rest
    // must opt out themselves. merge-integrity has no needs: it keeps running so the latest
    // "Merge integrity" check on the draft stays a success.
    for (const [id, job] of Object.entries(wf.jobs)) {
      // Repository variables at their worst case: switched on.
      const guard = String(job.if ?? "").replace(/vars\.\w+/g, "'true'");
      if (!/always\(\)|cancelled\(\)/.test(guard)) continue;
      assert.equal(condition(guard, editRunValues(guard)), false, `${name}:${id}`);
    }
    if (name === "quality.yml") {
      const guard = wf.jobs["merge-integrity"].if;
      assert.equal(condition(guard, editRunValues(guard)), true, "merge-integrity keeps running");
    }
  });

  test(`${name}: only an edit run renames the gate check`, () => {
    // 2026-11-04: the edit run's skipped "Gate / CI" was the latest check of that name on draft
    // #18962, and Mergify dequeued #18961 on it before the real run reported.
    const checkName = name === "ci.yml" ? "Gate / CI" : "Gate / Quality";
    assert.equal(
      wf.jobs["admission-verdict"].name,
      `\${{ (${QUEUE_DRAFT_EDIT}) && '${checkName} (queue-draft edit)' || '${checkName}' }}`
    );
  });

  test(`${name}: everything else still runs the gate and the classifier`, () => {
    for (const values of [
      ready,
      queue,
      { ...ready, "github.event.action": "edited" },
      { ...queue, "github.event.action": "synchronize" },
    ]) {
      const v = { ...editRunValues(""), ...values };
      assert.equal(condition(wf.jobs.changes.if, v), true);
      assert.equal(condition(wf.jobs["admission-verdict"].if, v), true);
    }
  });
}
