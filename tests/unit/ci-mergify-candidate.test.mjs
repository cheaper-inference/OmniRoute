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
  // An `edited` event's `changes`: none on any other action.
  "github.event.changes.base": null,
  "github.event.changes.body": null,
  "github.event.changes.title": null,
  "needs.changes.result": "success",
  "needs.changes.outputs.code": "true",
  "needs.changes.outputs.docs": "true",
  "needs.changes.outputs.i18n": "true",
  "needs.changes.outputs.testsOnly": "false",
  "needs.lint.result": "success",
  "needs.test-unit.result": "success",
};
// The one event that skips the matrix: a PR title/body edit, on any PR (bots edit descriptions
// several times per PR). A base change (a retarget) is an `edited` event too and runs it all.
const METADATA_EDIT =
  "github.event_name == 'pull_request' && github.event.action == 'edited' && !github.event.changes.base && (github.event.changes.body || github.event.changes.title)";
const ADMISSION_REQUESTED =
  "github.event_name != 'pull_request' || github.event.pull_request.draft == false || needs.changes.outputs.queueCandidate == 'true' || needs.changes.result != 'success'";
const ADMISSION_IF = `\${{ always() && !(${METADATA_EDIT}) && (${ADMISSION_REQUESTED}) }}`;

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
    const value = values[key];
    // An object (the `changes.base` of a retarget) is only ever read for its truthiness.
    return value !== null && typeof value === "object" ? "true" : JSON.stringify(value);
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
  // A bare operand left after the comparisons is read for its truthiness, as GitHub does.
  text = text.replace(/"[^"]*"|\bnull\b|\b\d+\b/g, (literal) => {
    const value = JSON.parse(literal);
    return String(!(value === null || value === "" || value === 0));
  });
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
// draft's description ~4 times in its first 30 s; bots do the same on every PR (CodeRabbit
// summary). In the shared concurrency group each edit cancelled the real run on the same head
// ("checks interrupted", #18853/#18858; #20142). A title/body edit run now gets its own group
// and runs nothing; a base change (a retarget) is an `edited` event too and runs everything.
const RETARGET = { ref: { from: "release/v3.8.54" }, sha: { from: "a".repeat(40) } };
const TITLE_BODY_EDITS = {
  "a body edit": { "github.event.changes.body": { from: "old body" } },
  "a title edit": { "github.event.changes.title": { from: "old title" } },
  "an edit of an empty body": { "github.event.changes.body": { from: "" } },
  "an edit of a null body": { "github.event.changes.body": { from: null } },
  "a title and body edit": {
    "github.event.changes.body": { from: "old body" },
    "github.event.changes.title": { from: "old title" },
  },
};
const PRS = {
  "a ready PR": ready,
  "a fork PR": { ...ready, "github.event.pull_request.head.repo.id": 42 },
  "an ordinary draft": { ...ready, "github.event.pull_request.draft": true },
  "a Mergify queue draft": queue,
};

function editRunValues(expression, base = queue, patch = TITLE_BODY_EDITS["a body edit"]) {
  const values = { ...base, ...patch, "github.event.action": "edited" };
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

  test(`${name}: \`edited\` stays a trigger so a retarget re-validates on the new base`, () => {
    assert.ok(wf.on.pull_request.types.includes("edited"));
  });

  test(`${name}: a title/body edit gets its own concurrency group`, () => {
    assert.equal(
      wf.concurrency.group,
      `\${{ github.workflow }}-\${{ github.ref }}\${{ (${METADATA_EDIT}) && format('-metadata-edit-{0}', github.run_id) || '' }}`
    );
    assert.equal(wf.concurrency["cancel-in-progress"], true);
    const suffix = (values) => condition(METADATA_EDIT, values);
    for (const [pr, base] of Object.entries(PRS)) {
      for (const [edit, patch] of Object.entries(TITLE_BODY_EDITS)) {
        assert.equal(suffix(editRunValues("", base, patch)), true, `${pr}, ${edit}`);
      }
      // The run of a retarget stays in the shared group: it cancels the stale run on the old base.
      for (const patch of [
        { "github.event.changes.base": RETARGET },
        { "github.event.changes.base": RETARGET, ...TITLE_BODY_EDITS["a body edit"] },
        {}, // an `edited` event GitHub explains with no known change runs everything
      ]) {
        assert.equal(suffix(editRunValues("", base, patch)), false, pr);
      }
    }
  });

  test(`${name}: a title/body edit runs no gate, no merge integrity and no matrix`, () => {
    for (const [pr, base] of Object.entries(PRS)) {
      for (const [edit, patch] of Object.entries(TITLE_BODY_EDITS)) {
        const label = `${name}, ${pr}, ${edit}`;
        const changes = wf.jobs.changes.if;
        assert.equal(condition(changes, editRunValues(changes, base, patch)), false, label);
        // Jobs without always()/cancelled() inherit success() and skip with `changes`; the rest,
        // and merge-integrity (no needs), must opt out themselves.
        for (const [id, job] of Object.entries(wf.jobs)) {
          // Repository variables at their worst case: switched on.
          const guard = String(job.if ?? "").replace(/vars\.\w+/g, "'true'");
          if (!/always\(\)|cancelled\(\)/.test(guard) && [job.needs ?? []].flat().length) continue;
          assert.equal(
            condition(guard, editRunValues(guard, base, patch)),
            false,
            `${label}:${id}`
          );
        }
      }
    }
  });

  test(`${name}: a retarget runs the classifier, merge integrity and the gate`, () => {
    for (const [pr, base] of Object.entries({
      "a ready PR": ready,
      "a Mergify queue draft": queue,
    })) {
      for (const patch of [
        { "github.event.changes.base": RETARGET },
        { "github.event.changes.base": RETARGET, ...TITLE_BODY_EDITS["a title edit"] },
      ]) {
        const v = jobValues(editRunValues("", base, patch));
        assert.equal(condition(wf.jobs.changes.if, v), true, pr);
        assert.equal(condition(wf.jobs["admission-verdict"].if, v), true, pr);
        if (wf.jobs["merge-integrity"]) {
          assert.equal(condition(wf.jobs["merge-integrity"].if, v), true, pr);
        }
      }
    }
  });

  test(`${name}: title/body edits and unrequested drafts keep distinct check names`, () => {
    // 2026-11-04: the edit run's skipped "Gate / CI" was the latest check of that name on draft
    // #18962, and Mergify dequeued #18961 on it before the real run reported. A skipped job is
    // named by its unevaluated `name:` expression (#20487's edit run, 2026-11-18), so only an
    // expression name keeps a skipped run from taking the required name.
    const checkName = name === "ci.yml" ? "Gate / CI" : "Gate / Quality";
    assert.equal(
      wf.jobs["admission-verdict"].name,
      `\${{ (${METADATA_EDIT}) && '${checkName} (PR metadata edit)' || (${ADMISSION_REQUESTED}) && '${checkName}' || 'Admission not requested / ${name === "ci.yml" ? "CI" : "Quality"}' }}`
    );
    if (name === "quality.yml") {
      assert.equal(
        wf.jobs["merge-integrity"].name,
        `\${{ (${METADATA_EDIT}) && 'Merge integrity (PR metadata edit)' || 'Merge integrity (changelog + generated skills)' }}`
      );
    }
  });

  test(`${name}: everything else still runs the gate and the classifier`, () => {
    for (const values of [
      ready,
      queue,
      { ...ready, "github.event.action": "edited" },
      { ...ready, "github.event.action": "edited", "github.event.changes.base": RETARGET },
      { ...queue, "github.event.action": "synchronize" },
    ]) {
      const v = jobValues({ ...editRunValues(""), ...values });
      assert.equal(condition(wf.jobs.changes.if, v), true);
      assert.equal(condition(wf.jobs["admission-verdict"].if, v), true);
    }
  });
}
