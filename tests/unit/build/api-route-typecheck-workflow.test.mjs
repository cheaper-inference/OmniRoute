import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { load } from "js-yaml";

const workflow = load(
  readFileSync(
    new URL("../../../.github/workflows/api-route-typecheck.yml", import.meta.url),
    "utf8"
  )
);
const job = workflow.jobs["api-typecheck"];
const checkName = "API Route Typecheck";

// Evaluate only the bounded GitHub expression grammar used by event guards.
// Keep objects and missing properties typed; never execute YAML as JavaScript.
function expression(source, context) {
  const text = String(source).replace(/^\$\{\{\s*|\s*\}\}$/g, "");
  const tokens = text.match(/'(?:[^']|'')*'|[\w.-]+|&&|\|\||==|!=|[!(),]/g) ?? [];
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
    if (["true", "false", "null"].includes(token)) return JSON.parse(token);
    if (token === "startsWith") {
      assert.equal(tokens[index++], "(");
      const value = disjunction();
      assert.equal(tokens[index++], ",");
      const prefix = disjunction();
      assert.equal(tokens[index++], ")");
      return String(value).toLowerCase().startsWith(String(prefix).toLowerCase());
    }
    assert.match(token, /^github\./, `unsupported context: ${token}`);
    return token.split(".").reduce((value, key) => value?.[key], context) ?? "";
  }
  function comparison() {
    const a = primary();
    const operator = tokens[index];
    if (!["==", "!="].includes(operator)) return a;
    index++;
    const b = primary();
    return operator === "==" ? equal(a, b) : !equal(a, b);
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

function render(source, context) {
  return String(source).replace(/\$\{\{([\s\S]+?)\}\}/g, (_, body) =>
    String(expression(body, context))
  );
}

function pullRequest(action, base = "release/v3.8.53", changes) {
  return {
    github: {
      workflow: checkName,
      event_name: "pull_request",
      ref: "refs/pull/123/merge",
      run_id: 1234,
      event: {
        action,
        changes,
        pull_request: { base: { ref: base }, head: { ref: "fix/example" }, draft: false },
      },
    },
  };
}

// This workflow uses only literal branches and release/**. GitHub applies a PR
// branches filter to the destination, not changes.base.ref.from or the head.
function triggered(context) {
  const { event_name: eventName, event, ref } = context.github;
  if (!Object.hasOwn(workflow.on, eventName)) return false;
  if (eventName === "workflow_dispatch") return true;
  const trigger = workflow.on[eventName];
  if (eventName === "pull_request" && !trigger.types.includes(event.action)) return false;
  if (eventName === "push" && !ref.startsWith("refs/heads/")) return false;
  const branch = eventName === "pull_request" ? event.pull_request.base.ref : ref.slice(11);
  return trigger.branches.some((pattern) => {
    assert.ok(pattern === "main" || pattern === "release/**", `unsupported branch: ${pattern}`);
    return pattern === "release/**" ? branch.startsWith("release/") : branch === pattern;
  });
}

function scheduled(context) {
  return triggered(context) && Boolean(expression(job.if ?? "true", context));
}

test("API typecheck observes main and release pushes without expanding other branches", () => {
  assert.deepEqual(workflow.on.push.branches, ["main", "release/**"]);
  assert.equal(workflow.on.push["branches-ignore"], undefined);
  assert.equal(workflow.on.push.tags, undefined);
});

test("API typecheck preserves dispatch, PR destination filters and unconditional file coverage", () => {
  assert.ok(Object.hasOwn(workflow.on, "workflow_dispatch"));
  assert.deepEqual(workflow.on.pull_request.branches, ["main", "release/**"]);
  for (const event of ["pull_request", "push"]) {
    assert.equal(workflow.on[event].paths, undefined);
    assert.equal(workflow.on[event]["paths-ignore"], undefined);
  }
});

test("API typecheck preserves the pinned runtime, merge checkout and diagnostic gate", () => {
  assert.equal(workflow.name, checkName);
  assert.deepEqual(workflow.permissions, { contents: "read" });
  assert.deepEqual(Object.keys(workflow.jobs), ["api-typecheck"]);
  assert.equal(job["continue-on-error"], undefined);
  assert.equal(job.needs, undefined);
  // Cache selection is exercised by event below; the toolchain and gate steps
  // must otherwise retain their exact behavior and pins.
  const steps = structuredClone(job.steps);
  delete steps[1].with.cache;
  delete steps[1].with["package-manager-cache"];
  if (steps[2].with) {
    delete steps[2].with.cache;
    if (Object.keys(steps[2].with).length === 0) delete steps[2].with;
  }
  assert.deepEqual(steps, [
    {
      uses: "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1",
      with: { "persist-credentials": false },
    },
    {
      uses: "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020",
      with: { "node-version": "24" },
    },
    { uses: "./.github/actions/npm-ci-retry" },
    {
      name: "Reject new API-route TypeScript diagnostics",
      run: "node scripts/check/check-api-typecheck.mjs",
    },
    {
      name: "API typecheck gate unit tests",
      run: "node --import tsx/esm --test tests/unit/build/check-api-typecheck.test.ts",
    },
  ]);
});

test("API typecheck observes base retargets alongside existing PR lifecycle events", () => {
  assert.deepEqual(workflow.on.pull_request.types, [
    "opened",
    "synchronize",
    "reopened",
    "ready_for_review",
    "edited",
  ]);
  for (const from of ["main", "release/v3.8.52", "feature/staging"]) {
    for (const to of ["main", "release/v3.8.53", "release/candidate/next"]) {
      const context = pullRequest("edited", to, { base: { ref: { from } } });
      assert.equal(scheduled(context), true, `${from} -> ${to}`);
      assert.equal(render(job.name, context), checkName);
    }
  }
});

test("API typecheck filters retargets by the new destination branch", () => {
  for (const destination of ["feature/staging", "releases/v3.8.53", "main-copy"]) {
    const context = pullRequest("edited", destination, {
      base: { ref: { from: "release/v3.8.52" } },
    });
    context.github.event.pull_request.head.ref = "main";
    assert.equal(triggered(context), false);
  }
});

const metadataContexts = [
  undefined,
  { title: { from: "Old title" } },
  { body: { from: "Old description" } },
  { base: null, body: { from: "Old description" } },
  { base: "", title: { from: "Old title" } },
].map((changes) => pullRequest("edited", "release/v3.8.53", changes));

test("API metadata edits do not schedule the diagnostic job", () => {
  for (const context of metadataContexts) {
    assert.equal(expression(job.if ?? "true", context), false);
    assert.equal(scheduled(context), false);
  }
});

test("API metadata edits cannot publish a skipped check under the candidate check name", () => {
  for (const context of metadataContexts) assert.notEqual(render(job.name, context), checkName);
});

test("API metadata edits cannot cancel or evict running or pending candidates", () => {
  const candidateGroup = render(workflow.concurrency.group, pullRequest("synchronize"));
  for (const context of metadataContexts) {
    const metadataGroup = render(workflow.concurrency.group, context);
    assert.notEqual(metadataGroup, candidateGroup);
    const anotherEdit = structuredClone(context);
    anotherEdit.github.run_id++;
    assert.notEqual(metadataGroup, render(workflow.concurrency.group, anotherEdit));
  }
});

test("API PR candidates retain the canonical name and their existing cancellation policy", () => {
  const candidateGroup = render(workflow.concurrency.group, pullRequest("synchronize"));
  for (const action of ["opened", "synchronize", "reopened", "ready_for_review", "edited"]) {
    for (const draft of [false, true]) {
      const context = pullRequest(action, "main", {
        base: { ref: { from: "release/v3.8.52" }, sha: { from: "b".repeat(40) } },
        body: { from: "An edit accompanying the retarget" },
      });
      context.github.event.pull_request.draft = draft;
      context.github.run_id++;
      assert.equal(scheduled(context), true, `${action}, draft=${draft}`);
      assert.equal(render(job.name, context), checkName);
      assert.equal(render(workflow.concurrency.group, context), candidateGroup);
    }
  }
  assert.equal(workflow.concurrency["cancel-in-progress"], true);
});

test("API pushes and manual dispatches run the canonical job without PR metadata", () => {
  for (const eventName of ["push", "workflow_dispatch"]) {
    for (const branch of ["main", "release/v3.8.53", "release/candidate/next"]) {
      const context = {
        github: {
          event_name: eventName,
          event: {},
          ref: `refs/heads/${branch}`,
          workflow: checkName,
          run_id: 2345,
        },
      };
      assert.equal(scheduled(context), true);
      assert.equal(render(job.name, context), checkName);
      const differentRef = structuredClone(context);
      differentRef.github.ref += "-other";
      assert.notEqual(
        render(workflow.concurrency.group, context),
        render(workflow.concurrency.group, differentRef)
      );
      const differentWorkflow = structuredClone(context);
      differentWorkflow.github.workflow = "CI";
      assert.notEqual(
        render(workflow.concurrency.group, context),
        render(workflow.concurrency.group, differentWorkflow)
      );
    }
  }
});

test("API release pushes install without caches while existing events keep their caches", () => {
  const setupNode = job.steps[1];
  const install = job.steps[2];
  assert.equal(setupNode.with["package-manager-cache"], false);
  for (const [eventName, branch, cacheEnabled] of [
    ["push", "release/v3.8.53", false],
    ["push", "release/candidate/next", false],
    ["push", "main", true],
    ["workflow_dispatch", "release/v3.8.53", true],
    ["workflow_dispatch", "main", true],
  ]) {
    const context = {
      github: { event_name: eventName, ref: `refs/heads/${branch}` },
    };
    assert.equal(render(setupNode.with.cache ?? "", context), cacheEnabled ? "npm" : "");
    assert.equal(render(install.with?.cache ?? "true", context), String(cacheEnabled));
  }
  for (const action of ["opened", "synchronize", "ready_for_review", "edited"]) {
    const context = pullRequest(action, "release/v3.8.53", { base: { ref: { from: "main" } } });
    assert.equal(render(setupNode.with.cache, context), "npm");
    assert.equal(render(install.with.cache, context), "true");
  }
});
