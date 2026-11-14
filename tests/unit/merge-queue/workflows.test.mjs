// omni-queue WP5: the queue's own workflow (omni-queue.yml) and the candidate profile of
// ci.yml / quality.yml on `push` to omni-queue/**, plus the guarantee that no deploy or
// publication workflow ever fires for a candidate ref.
//
// Guards are EVALUATED, not string-matched: a small GitHub Actions expression evaluator (value
// semantics of && / ||, loose ==, case-insensitive startsWith, fromJSON) runs every `if:` and
// `runs-on:` against concrete event contexts. It never executes workflow text as code.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";
import { botIdentity, candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import { evaluateAdmission } from "../../../scripts/quality/admission-verdict.mjs";

const ROOT = new URL("../../../", import.meta.url);
const WORKFLOW_DIR = new URL(".github/workflows/", ROOT);
const readText = (rel) => readFileSync(new URL(rel, ROOT), "utf8");
const loadWorkflow = (name) => load(readFileSync(new URL(name, WORKFLOW_DIR), "utf8"));
const WORKFLOW_FILES = readdirSync(WORKFLOW_DIR)
  .filter((f) => /\.ya?ml$/.test(f))
  .sort();
const policy = JSON.parse(readText("config/quality/admission-policy.json"));

const CANDIDATE_SHA = "0123456789ab".padEnd(40, "d");
const CANDIDATE_BRANCH = candidateRef("release/v3.8.54", "b1", CANDIDATE_SHA);
const CANDIDATE_REF = `refs/heads/${CANDIDATE_BRANCH}`;
const BASE_SHA = "b".repeat(40);
const OMNI_QUEUE_EXCLUSION = "!startsWith(github.ref, 'refs/heads/omni-queue/')";
const SHA_PIN = /^[^@\s]+@[0-9a-f]{40}$/;

// ───────────────────────────── expression evaluator ─────────────────────────────

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const truthy = (v) => !(v === false || v === 0 || v === "" || v === null || Number.isNaN(v));
const toNumber = (v) => {
  if (v === null) return 0;
  if (typeof v === "boolean") return v ? 1 : 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") return v.trim() === "" ? 0 : Number(v);
  return Number.NaN;
};
function looseEqual(a, b) {
  if (typeof a === "string" && typeof b === "string") return a.toLowerCase() === b.toLowerCase();
  if (typeof a === typeof b) return a === b;
  return toNumber(a) === toNumber(b);
}

function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      i++;
    } else if (ch === "'") {
      let value = "";
      i++;
      for (;;) {
        assert.ok(i < text.length, `unterminated string in: ${text}`);
        if (text[i] === "'" && text[i + 1] === "'") {
          value += "'";
          i += 2;
        } else if (text[i] === "'") {
          i++;
          break;
        } else value += text[i++];
      }
      tokens.push({ type: "str", value });
    } else if (/[0-9]/.test(ch)) {
      const m = /^[0-9]+(?:\.[0-9]+)?/.exec(text.slice(i));
      tokens.push({ type: "num", value: Number(m[0]) });
      i += m[0].length;
    } else if (/[A-Za-z_]/.test(ch)) {
      const m = /^[A-Za-z_][A-Za-z0-9_-]*/.exec(text.slice(i));
      tokens.push({ type: "id", value: m[0] });
      i += m[0].length;
    } else {
      const two = text.slice(i, i + 2);
      if (["==", "!=", "<=", ">=", "&&", "||"].includes(two)) {
        tokens.push({ type: "op", value: two });
        i += 2;
      } else if ("!<>().,[]*".includes(ch)) {
        tokens.push({ type: "op", value: ch });
        i++;
      } else assert.fail(`unsupported character ${JSON.stringify(ch)} in: ${text}`);
    }
  }
  return tokens;
}

function parse(text) {
  const tokens = tokenize(text);
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v) => peek()?.type === "op" && peek().value === v;
  const expect = (v) => {
    assert.ok(isOp(v), `expected ${v} in: ${text}`);
    pos++;
  };
  function primary() {
    const t = tokens[pos++];
    assert.ok(t, `unexpected end of: ${text}`);
    if (t.type === "op" && t.value === "!") return { k: "not", e: primary() };
    if (t.type === "op" && t.value === "(") {
      const e = or();
      expect(")");
      return postfix(e);
    }
    if (t.type === "str" || t.type === "num") return { k: "lit", v: t.value };
    assert.equal(t.type, "id", `unexpected token ${t.value} in: ${text}`);
    if (t.value === "true" || t.value === "false") return { k: "lit", v: t.value === "true" };
    if (t.value === "null") return { k: "lit", v: null };
    if (isOp("(")) {
      pos++;
      const args = [];
      while (!isOp(")")) {
        args.push(or());
        if (isOp(",")) pos++;
      }
      expect(")");
      return postfix({ k: "call", name: t.value, args });
    }
    return postfix({ k: "ctx", name: t.value });
  }
  function postfix(node) {
    let e = node;
    for (;;) {
      if (isOp(".")) {
        pos++;
        const t = tokens[pos++];
        assert.ok(t && (t.type === "id" || (t.type === "op" && t.value === "*")), text);
        e = { k: "prop", e, key: { k: "lit", v: t.value } };
      } else if (isOp("[")) {
        pos++;
        const key = or();
        expect("]");
        e = { k: "prop", e, key };
      } else return e;
    }
  }
  function comparison() {
    let left = primary();
    while (peek()?.type === "op" && ["==", "!=", "<", ">", "<=", ">="].includes(peek().value)) {
      const op = tokens[pos++].value;
      left = { k: "cmp", op, a: left, b: primary() };
    }
    return left;
  }
  function and() {
    let left = comparison();
    while (isOp("&&")) {
      pos++;
      left = { k: "and", a: left, b: comparison() };
    }
    return left;
  }
  function or() {
    let left = and();
    while (isOp("||")) {
      pos++;
      left = { k: "or", a: left, b: and() };
    }
    return left;
  }
  const ast = or();
  assert.equal(pos, tokens.length, `trailing tokens in: ${text}`);
  return ast;
}

const FUNCTIONS = {
  startsWith: (a, b) =>
    String(a ?? "")
      .toLowerCase()
      .startsWith(String(b ?? "").toLowerCase()),
  endsWith: (a, b) =>
    String(a ?? "")
      .toLowerCase()
      .endsWith(String(b ?? "").toLowerCase()),
  contains: (a, b) =>
    Array.isArray(a)
      ? a.some((x) => looseEqual(x, b))
      : String(a ?? "")
          .toLowerCase()
          .includes(String(b ?? "").toLowerCase()),
  format: (fmt, ...args) => String(fmt).replace(/\{(\d+)\}/g, (_, n) => String(args[n] ?? "")),
  fromJSON: (s) => JSON.parse(String(s)),
  toJSON: (v) => JSON.stringify(v),
  hashFiles: () => "",
};

function evaluate(node, ctx) {
  switch (node.k) {
    case "lit":
      return node.v;
    case "not":
      return !truthy(evaluate(node.e, ctx));
    case "and": {
      const a = evaluate(node.a, ctx);
      return truthy(a) ? evaluate(node.b, ctx) : a;
    }
    case "or": {
      const a = evaluate(node.a, ctx);
      return truthy(a) ? a : evaluate(node.b, ctx);
    }
    case "cmp": {
      const a = evaluate(node.a, ctx);
      const b = evaluate(node.b, ctx);
      if (node.op === "==") return looseEqual(a, b);
      if (node.op === "!=") return !looseEqual(a, b);
      const [x, y] = [toNumber(a), toNumber(b)];
      return { "<": x < y, ">": x > y, "<=": x <= y, ">=": x >= y }[node.op];
    }
    case "ctx":
      assert.ok(Object.hasOwn(ctx, node.name), `unknown context root: ${node.name}`);
      return ctx[node.name];
    case "prop": {
      const obj = evaluate(node.e, ctx);
      const key = evaluate(node.key, ctx);
      if (obj === null || typeof obj !== "object") return null;
      return key in obj ? (obj[key] ?? null) : null;
    }
    case "call": {
      if (node.name === "always") return true;
      if (node.name === "cancelled") return ctx.__cancelled ?? false;
      if (node.name === "failure") return false;
      if (node.name === "success") return ctx.__success ?? true;
      assert.ok(Object.hasOwn(FUNCTIONS, node.name), `unsupported function ${node.name}`);
      return FUNCTIONS[node.name](...node.args.map((a) => evaluate(a, ctx)));
    }
    default:
      throw new Error(`bad node ${node.k}`);
  }
}

/** Value of a workflow field: `${{ expr }}` alone → value; mixed text → string; else literal. */
function render(value, ctx) {
  if (typeof value !== "string") return value;
  const whole = /^\s*\$\{\{([\s\S]*)\}\}\s*$/.exec(value);
  if (whole && !whole[1].includes("}}")) return evaluate(parse(whole[1]), ctx);
  return value.replace(/\$\{\{([\s\S]*?)\}\}/g, (_, e) => String(evaluate(parse(e), ctx) ?? ""));
}

/** An `if:` is an expression with or without the `${{ }}` wrapper. */
function condition(expr, ctx) {
  if (expr === undefined) return true;
  if (typeof expr === "boolean") return expr;
  const text = String(expr).trim();
  return truthy(text.includes("${{") ? render(text, ctx) : evaluate(parse(text), ctx));
}

const STATUS_FN = /\b(always|cancelled|failure|success)\(\)/;

/** Whether a job runs, given every dependency's own scheduling (dependencies succeed). */
function scheduledJobs(wf, ctx) {
  const memo = new Map();
  const visit = (id) => {
    if (memo.has(id)) return memo.get(id);
    const job = wf.jobs[id];
    assert.ok(job, `unknown job ${id}`);
    const needs = [job.needs ?? []].flat();
    // Visit every dependency first (no short-circuit): each needs.<dep>.result is independent.
    const depsOk = needs.map(visit).every(Boolean);
    const needsCtx = Object.fromEntries(
      needs.map((dep) => [
        dep,
        { result: memo.get(dep) ? "success" : "skipped", outputs: ctx.__outputs?.[dep] ?? {} },
      ])
    );
    const jobCtx = { ...ctx, needs: needsCtx, __success: depsOk };
    const runs = STATUS_FN.test(String(job.if ?? ""))
      ? condition(job.if, jobCtx)
      : depsOk && condition(job.if, jobCtx);
    memo.set(id, runs);
    return runs;
  };
  return Object.fromEntries(Object.keys(wf.jobs).map((id) => [id, visit(id)]));
}

const anyVar = (value) =>
  new Proxy(
    {},
    { has: () => true, get: (_, key) => (typeof key === "string" ? value : undefined) }
  );
const anyStep = new Proxy(
  {},
  {
    has: () => true,
    get: () => ({ outputs: {}, outcome: "success", conclusion: "success" }),
  }
);

/** Context of a push (or dispatch) on `ref`, every repository variable switched ON. */
function pushContext(ref, { eventName = "push", vars = anyVar("true") } = {}) {
  return {
    github: {
      event_name: eventName,
      ref,
      ref_name: ref.replace(/^refs\/heads\//, ""),
      head_ref: "",
      base_ref: "",
      sha: CANDIDATE_SHA,
      repository: "cheaper-inference/OmniRoute",
      repository_owner: "cheaper-inference",
      run_id: "42",
      run_attempt: "1",
      workflow: "CI",
      action: "",
      token: "***",
      event: {
        ref,
        before: "0".repeat(40),
        after: CANDIDATE_SHA,
        repository: {
          id: 1157102282,
          full_name: "cheaper-inference/OmniRoute",
          default_branch: "release/v3.8.54",
        },
      },
    },
    vars,
    secrets: anyVar("***"),
    env: {},
    inputs: {},
    matrix: {},
    steps: anyStep,
    runner: { os: "Linux", temp: "/tmp" },
    // `changes` on a non-PR event: every lane on (scripts/quality/classify-pr-changes.mjs is
    // only consulted for pull_request).
    __outputs: {
      changes: {
        code: "true",
        docs: "true",
        i18n: "true",
        workflow: "true",
        testsOnly: "false",
        queueCandidate: "false",
        candidateBase: ref.startsWith("refs/heads/omni-queue/") ? BASE_SHA : "",
        candidateSource: ref.startsWith("refs/heads/omni-queue/") ? "trailer" : "",
        domains: "build,catalog,cli,core,db,docs,i18n,provider,routing,tests,ui,workflow",
      },
    },
  };
}

const MERGIFY_USER = { login: "mergify[bot]", id: 37929162, type: "Bot" };

/**
 * Context of a same-repository pull request whose head branch is `headRef` (refs/pull/… merge
 * ref, so github.ref never names the head), every repository variable switched ON. The
 * `changes` job's queueCandidate is ci.yml's own expression unless `queueCandidate` forces it.
 */
function prContext(
  headRef,
  { draft = false, user = { login: "someone", id: 1, type: "User" }, queueCandidate } = {}
) {
  const base = pushContext("refs/pull/1/merge", { eventName: "pull_request" });
  const repo = base.github.event.repository;
  const ctx = {
    ...base,
    github: {
      ...base.github,
      ref_name: "1/merge",
      head_ref: headRef,
      base_ref: "release/v3.8.54",
      action: "synchronize",
      event: {
        ...base.github.event,
        action: "synchronize",
        pull_request: {
          number: 1,
          draft,
          user,
          head: { ref: headRef, sha: CANDIDATE_SHA, repo: { ...repo, fork: false } },
          base: { ref: "release/v3.8.54", sha: BASE_SHA, repo },
        },
      },
    },
  };
  const expr = loadWorkflow("ci.yml").jobs.changes.outputs.queueCandidate;
  const changes = {
    ...base.__outputs.changes,
    queueCandidate: queueCandidate ?? String(render(expr, ctx)),
  };
  return { ...ctx, __outputs: { changes } };
}

test("the evaluator follows GitHub semantics on the constructs the guards use", () => {
  const ctx = pushContext(CANDIDATE_REF);
  assert.equal(render("${{ startsWith(github.ref, 'refs/heads/OMNI-queue/') }}", ctx), true);
  assert.equal(render("${{ github.event.pull_request.base.sha || 'x' }}", ctx), "x");
  assert.equal(render("${{ null == '' }}", ctx), true);
  assert.equal(render("${{ 'a' && 'b' }}", ctx), "b");
  assert.deepEqual(
    render(
      `\${{ (vars.X == 'true') && fromJSON('["self-hosted","omni-build"]') || 'ubuntu-latest' }}`,
      ctx
    ),
    ["self-hosted", "omni-build"]
  );
  assert.equal(
    render("x-${{ github.ref == 'refs/heads/main' && 'main' || 'other' }}", ctx),
    "x-other"
  );
  assert.equal(condition("github.event.action == 'labeled' || 'it''s'", ctx), true);
  assert.throws(() => condition("unknownroot.value", ctx), /unknown context root/);
  assert.throws(() => condition("github.ref ~ 'x'", ctx), /unsupported character/);
});

test("scheduledJobs reads every dependency's own result, not the first falsy one", () => {
  // GitHub evaluates each needs.<dep>.result independently: a skipped `a` listed before `b` must
  // not hide that `b` ran from a status-function job that reads it. `c` comes first so that `b`
  // is not memoized yet when `c` is evaluated.
  const wf = {
    jobs: {
      c: { needs: ["a", "b"], if: "${{ always() && needs.b.result == 'success' }}" },
      d: { needs: ["a", "b"] },
      a: { if: "false" },
      b: {},
    },
  };
  const scheduled = scheduledJobs(wf, pushContext("refs/heads/main"));
  assert.deepEqual(scheduled, { c: true, d: false, a: false, b: true });
});

// ───────────────────────────── branch filters ─────────────────────────────

/** GitHub filter-pattern glob: `*` (no slash), `**` (anything), `?`/`+` quantifiers, `[]`. */
function ghGlobToRegExp(pattern) {
  let re = "";
  for (let i = 0; i < pattern.length; i++) {
    const ch = pattern[i];
    if (ch === "*" && pattern[i + 1] === "*") {
      re += ".*";
      i++;
    } else if (ch === "*") re += "[^/]*";
    else if (ch === "?" || ch === "+") re += ch;
    else if (ch === "[") {
      const end = pattern.indexOf("]", i);
      re += pattern.slice(i, end + 1);
      i = end;
    } else re += ch.replace(/[.^${}()|\\/]/g, "\\$&");
  }
  return new RegExp(`^${re}$`);
}

/** branches / branches-ignore of one trigger, against one branch name. */
function branchFilterMatches(spec, branch) {
  if (Array.isArray(spec?.branches)) {
    let matched = false;
    for (const raw of spec.branches) {
      const negated = String(raw).startsWith("!");
      if (ghGlobToRegExp(String(raw).slice(negated ? 1 : 0)).test(branch)) matched = !negated;
    }
    return matched;
  }
  if (Array.isArray(spec?.["branches-ignore"])) {
    return !spec["branches-ignore"].some((p) => ghGlobToRegExp(String(p)).test(branch));
  }
  return true;
}

function triggers(wf) {
  const on = wf.on ?? wf[true];
  if (typeof on === "string") return { [on]: null };
  if (Array.isArray(on)) return Object.fromEntries(on.map((e) => [e, null]));
  return on ?? {};
}

function pushFires(wf, branch) {
  const on = triggers(wf);
  if (!Object.hasOwn(on, "push")) return false;
  const spec = on.push ?? {};
  const branchFilter = "branches" in spec || "branches-ignore" in spec;
  // Only tags/tags-ignore defined → branch pushes never trigger (GitHub docs).
  if (!branchFilter) return !("tags" in spec || "tags-ignore" in spec);
  return branchFilterMatches(spec, branch);
}

/** Every workflow a push to `branch` starts, following workflow_run chains to a fixpoint. */
function workflowsFiredBy(branch) {
  const docs = Object.fromEntries(WORKFLOW_FILES.map((f) => [f, loadWorkflow(f)]));
  const fired = new Set(WORKFLOW_FILES.filter((f) => pushFires(docs[f], branch)));
  for (let changed = true; changed;) {
    changed = false;
    const names = new Set([...fired].map((f) => docs[f].name));
    for (const file of WORKFLOW_FILES) {
      if (fired.has(file)) continue;
      const run = triggers(docs[file]).workflow_run;
      if (!run) continue;
      // workflow_run branch filters apply to the head branch of the triggering run.
      if (run.workflows?.some((n) => names.has(n)) && branchFilterMatches(run, branch)) {
        fired.add(file);
        changed = true;
      }
    }
  }
  return [...fired].sort();
}

test("branch-filter globs follow GitHub's cheat sheet", () => {
  assert.ok(ghGlobToRegExp("omni-queue/**").test(CANDIDATE_BRANCH));
  assert.ok(!ghGlobToRegExp("release/**").test(CANDIDATE_BRANCH));
  assert.ok(!ghGlobToRegExp("release/v*").test(CANDIDATE_BRANCH));
  assert.ok(!ghGlobToRegExp("omni-queue/*").test(CANDIDATE_BRANCH), "* stops at a slash");
  assert.ok(ghGlobToRegExp("release/v*").test("release/v3.8.54"));
  assert.ok(!branchFilterMatches({ branches: ["**", "!omni-queue/**"] }, CANDIDATE_BRANCH));
  assert.ok(
    branchFilterMatches({ branches: ["**", "!omni-queue/**", "omni-queue/x/**"] }, "omni-queue/x/y")
  );
  assert.ok(!branchFilterMatches({ "branches-ignore": ["omni-queue/**"] }, CANDIDATE_BRANCH));
  assert.ok(
    pushFires({ on: { push: { paths: ["src/**"] } } }, CANDIDATE_BRANCH),
    "no branch filter"
  );
  assert.ok(!pushFires({ on: { push: { tags: ["v*"] } } }, CANDIDATE_BRANCH), "tags only");
});

test("a candidate push starts ci.yml, quality.yml and the queue's wake-up — nothing else", () => {
  assert.deepEqual(workflowsFiredBy(CANDIDATE_BRANCH), ["ci.yml", "omni-queue.yml", "quality.yml"]);
  // Positive control: the same machinery sees the deploy chain of a release push.
  const release = workflowsFiredBy("release/v3.8.54");
  for (const file of ["docker-publish.yml", "deploy-vps.yml", "lock-released-branch.yml"]) {
    assert.ok(release.includes(file), `${file} fires on a release push (control)`);
  }
  assert.ok(!release.includes("omni-queue.yml"), "release CI does not wake the queue");
  const fired = new Set(workflowsFiredBy(CANDIDATE_BRANCH));
  for (const file of [
    "docker-publish.yml",
    "deploy-vps.yml",
    "npm-publish.yml",
    "electron-release.yml",
    "wiki-sync.yml",
    "radar-export.yml",
    "release-acceptance.yml",
    "lock-released-branch.yml",
    "nightly-release-green.yml",
    "scorecard.yml",
    "forward-port.yml",
  ]) {
    assert.ok(WORKFLOW_FILES.includes(file), `${file} still exists`);
    assert.ok(!fired.has(file), `${file} must not run for omni-queue/**`);
  }
});

test("deploy-vps refuses an omni-queue head branch or ref even if its trigger ever fires", () => {
  const job = loadWorkflow("deploy-vps.yml").jobs.deploy;
  const ctx = (overrides) => {
    const base = pushContext("refs/heads/release/v3.8.54", { vars: { DEPLOY_ENABLED: "true" } });
    return { ...base, github: { ...base.github, ...overrides } };
  };
  // The upstream run must be a same-repository push/release/dispatch (deploy-vps.yml `if:`).
  const run = (branch, upstreamEvent = "push") =>
    condition(
      job.if,
      ctx({
        event_name: "workflow_run",
        ref: "refs/heads/release/v3.8.54",
        event: {
          repository: { id: 1 },
          workflow_run: {
            conclusion: "success",
            head_branch: branch,
            head_repository: { id: 1 },
            event: upstreamEvent,
          },
        },
      })
    );
  assert.equal(run("release/v3.8.54"), true, "control: a release publish deploys");
  assert.equal(run(CANDIDATE_BRANCH), false);
  assert.equal(run(CANDIDATE_BRANCH, "workflow_dispatch"), false);
  const dispatch = (ref) =>
    condition(job.if, ctx({ event_name: "workflow_dispatch", ref, event: {} }));
  assert.equal(dispatch("refs/heads/release/v3.8.54"), true, "control: manual deploy");
  assert.equal(dispatch(CANDIDATE_REF), false);
});

// ───────────────────────────── omni-queue.yml ─────────────────────────────

const queue = loadWorkflow("omni-queue.yml");
// Parsed content only (comments are allowed to name what the workflow must not use).
const queueText = JSON.stringify(queue);

function queueContext(eventName, { enabled = "true", action = "", approval } = {}) {
  return {
    github: {
      event_name: eventName,
      repository: "cheaper-inference/OmniRoute",
      ref: "refs/heads/release/v3.8.54",
      event: { action, repository: { default_branch: "release/v3.8.54" } },
    },
    vars: { OMNI_QUEUE_ENABLED: enabled },
    needs: approval ? { approval: { result: approval } } : {},
    secrets: anyVar("***"),
    inputs: {},
    steps: anyStep,
  };
}

test("omni-queue.yml triggers: cron, dispatch, candidate CI completion, PR label/push/close", () => {
  const on = triggers(queue);
  assert.deepEqual(Object.keys(on).sort(), [
    "pull_request_target",
    "schedule",
    "workflow_dispatch",
    "workflow_run",
  ]);
  assert.deepEqual(on.schedule, [{ cron: "*/5 * * * *" }]);
  const inputs = on.workflow_dispatch.inputs;
  assert.deepEqual(Object.keys(inputs).sort(), ["action", "base", "reason"]);
  assert.equal(inputs.base.type, "string");
  assert.equal(inputs.base.required, false);
  assert.equal(inputs.reason.type, "string");
  assert.equal(inputs.reason.required, false);
  assert.equal(inputs.action.type, "choice");
  assert.equal(inputs.action.default, "tick");
  assert.deepEqual(inputs.action.options, ["tick", "pause", "resume", "dry-run"]);
  assert.deepEqual(on.workflow_run, {
    workflows: ["CI", "Quality Gates"],
    types: ["completed"],
    branches: ["omni-queue/**"],
  });
  // The names it listens to are the real names of the candidate workflows.
  assert.equal(loadWorkflow("ci.yml").name, "CI");
  assert.equal(loadWorkflow("quality.yml").name, "Quality Gates");
  assert.deepEqual(on.pull_request_target, {
    types: ["labeled", "unlabeled", "synchronize", "closed"],
  });
});

test("omni-queue.yml is inert without the OMNI_QUEUE_ENABLED kill switch", () => {
  assert.deepEqual(Object.keys(queue.jobs).sort(), ["approval", "tick"]);
  const events = [
    ["schedule", ""],
    ["workflow_dispatch", ""],
    ["workflow_run", "completed"],
    ["pull_request_target", "labeled"],
    ["pull_request_target", "unlabeled"],
    ["pull_request_target", "synchronize"],
    ["pull_request_target", "closed"],
  ];
  for (const [event, action] of events) {
    for (const enabled of ["", "false", "TRUE ", "1"]) {
      for (const [id, job] of Object.entries(queue.jobs)) {
        const ctx = queueContext(event, { enabled, action, approval: "skipped" });
        assert.equal(
          condition(job.if, ctx),
          false,
          `${id} on ${event}/${action} with '${enabled}'`
        );
      }
    }
    // Switched on, the tick runs on every trigger.
    assert.equal(
      condition(queue.jobs.tick.if, queueContext(event, { action, approval: "skipped" })),
      true,
      `tick on ${event}/${action}`
    );
  }
});

test("approval runs only for label changes; the tick tolerates a skipped approval", () => {
  const approval = queue.jobs.approval;
  for (const action of ["labeled", "unlabeled"]) {
    assert.equal(condition(approval.if, queueContext("pull_request_target", { action })), true);
  }
  for (const [event, action] of [
    ["pull_request_target", "synchronize"],
    ["pull_request_target", "closed"],
    ["schedule", ""],
    ["workflow_dispatch", ""],
    ["workflow_run", "completed"],
  ]) {
    assert.equal(
      condition(approval.if, queueContext(event, { action })),
      false,
      `${event}/${action}`
    );
  }
  const tick = queue.jobs.tick;
  assert.deepEqual([tick.needs].flat(), ["approval"]);
  for (const approvalResult of ["success", "skipped"]) {
    assert.equal(
      condition(
        tick.if,
        queueContext("pull_request_target", { action: "labeled", approval: approvalResult })
      ),
      true
    );
  }
  assert.equal(
    condition(
      tick.if,
      queueContext("pull_request_target", { action: "labeled", approval: "failure" })
    ),
    false,
    "a failed approval binding does not tick on a half-written approval"
  );
  // An operator who cancels the run (mid-incident) stops the tick too: !cancelled(), not
  // always(), so a cancelled run never starts writing refs or state.
  for (const approvalResult of ["success", "skipped"]) {
    const cancelledRun = queueContext("pull_request_target", {
      action: "labeled",
      approval: approvalResult,
    });
    cancelledRun.__cancelled = true;
    assert.equal(
      condition(tick.if, cancelledRun),
      false,
      `cancelled run, approval ${approvalResult}`
    );
  }
  assert.doesNotMatch(String(tick.if), /\balways\(\)/);
  // Scheduled runs stay in the upstream repository (check-workflows scheduled-guard).
  const fork = queueContext("schedule", { approval: "skipped" });
  fork.github.repository = "someone/OmniRoute";
  assert.equal(condition(tick.if, fork), false);
});

test("one global tick at a time, never cancelled; approvals outside that group", () => {
  assert.equal(queue.concurrency, undefined, "no workflow-level group (it would gate approvals)");
  assert.deepEqual(queue.jobs.tick.concurrency, {
    group: "omni-queue-tick",
    "cancel-in-progress": false,
  });
  // Approval runs are serialized per PR AND per label: two runs for the same label cannot
  // interleave their label re-read and status write (a stale `failure` landing after a newer
  // `success`). Keyed on the label too, because GitHub keeps ONE pending run per group and drops
  // the others: a PR-only group would let an unrelated label event, or the other approval label,
  // replace a pending "labeled omni-queue" run and lose the approval. A run replaced in its own
  // group is superseded by a newer event on the same label, which re-reads the current labels.
  // github.event.number is the PR number of a pull_request_target payload (the file never names
  // github.event.pull_request: see "the queue never checks out or runs PR code").
  assert.deepEqual(queue.jobs.approval.concurrency, {
    group: "omni-queue-approval-${{ github.event.number }}-${{ github.event.label.name }}",
    "cancel-in-progress": false,
  });
});

test("least privilege: no default token scopes, App token scoped per job", () => {
  assert.deepEqual(queue.permissions, {});
  for (const job of Object.values(queue.jobs))
    assert.deepEqual(job.permissions, { contents: "read" });
  const appStep = (id) => {
    const steps = queue.jobs[id].steps.filter((s) =>
      String(s.uses ?? "").startsWith("actions/create-github-app-token@")
    );
    assert.equal(steps.length, 1, `${id} mints exactly one App token`);
    assert.equal(steps[0].id, "app-token");
    return steps[0].with;
  };
  const scopes = (w) =>
    Object.fromEntries(
      Object.entries(w)
        .filter(([k]) => k.startsWith("permission-"))
        .map(([k, v]) => [k.slice("permission-".length), v])
    );
  for (const id of ["approval", "tick"]) {
    const w = appStep(id);
    assert.equal(w["app-id"], "${{ secrets.OMNI_QUEUE_APP_ID }}");
    assert.equal(w["private-key"], "${{ secrets.OMNI_QUEUE_APP_PRIVATE_KEY }}");
    assert.equal(w.owner, undefined);
    assert.equal(w.repositories, undefined, "token limited to this repository");
  }
  assert.deepEqual(scopes(appStep("approval")), {
    contents: "read",
    "pull-requests": "read",
    issues: "write",
    statuses: "write",
  });
  assert.deepEqual(scopes(appStep("tick")), {
    contents: "write",
    // A pushed commit that touches .github/workflows/** needs it (candidates and landings).
    workflows: "write",
    "pull-requests": "write",
    issues: "write",
    statuses: "read",
    checks: "read",
    actions: "read",
  });
  const secrets = [...queueText.matchAll(/secrets\.([A-Za-z0-9_]+)/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(secrets)].sort(), [
    "OMNI_QUEUE_APP_ID",
    "OMNI_QUEUE_APP_PRIVATE_KEY",
  ]);
  assert.doesNotMatch(queueText, /GITHUB_TOKEN|github\.token/, "the queue never uses GITHUB_TOKEN");
});

test("the tick's test/sandbox overrides are never set by the real workflow", () => {
  // tick.createTickDeps honours them so the end-to-end test can point the queue at a local bare
  // repository, an alternative config and a fake API; production must use the real remote, the
  // config of the default branch and the API root that Actions provides.
  for (const name of ["OMNI_QUEUE_REMOTE_URL", "OMNI_QUEUE_CONFIG", "GITHUB_API_URL"]) {
    assert.ok(!queueText.includes(name), `omni-queue.yml must not set ${name}`);
  }
});

test("the queue never checks out or runs PR code", () => {
  // Nothing PR-controlled is read anywhere in the file (refs, repos, titles, heads).
  assert.doesNotMatch(queueText, /github\.event\.pull_request|github\.head_ref|workflow_run\.head/);
  for (const [id, job] of Object.entries(queue.jobs)) {
    const checkouts = job.steps.filter((s) => String(s.uses ?? "").startsWith("actions/checkout@"));
    assert.equal(checkouts.length, 1, `${id} has one checkout`);
    const w = checkouts[0].with;
    assert.equal(
      w.ref,
      "${{ github.event.repository.default_branch }}",
      `${id} checks out the default branch`
    );
    assert.equal(w.repository, undefined, `${id} never checks out another repository`);
    assert.equal(w["persist-credentials"], false);
    assert.deepEqual(String(w["sparse-checkout"]).trim().split("\n"), [
      "scripts/merge-queue",
      "config/merge-queue",
    ]);
    // The App token is minted before the checkout but never handed to it.
    assert.equal(w.token, undefined);
    for (const step of job.steps) {
      const run = String(step.run ?? "");
      assert.doesNotMatch(
        run,
        /\bnpm\s+(ci|install|i)\b|\bnpx\b|\byarn\b|\bpnpm\b|\bbun\b/,
        `${id}: ${run}`
      );
      assert.doesNotMatch(
        run,
        /\$\{\{/,
        `${id}: no expression inside a run body (template injection)`
      );
      if (step.uses) {
        assert.match(step.uses, SHA_PIN, `${id}: ${step.uses} must be pinned by SHA`);
        assert.ok(!step.uses.startsWith("./"), `${id}: no local action from the checkout`);
      }
    }
  }
  const nodeSteps = (id) =>
    queue.jobs[id].steps.filter((s) => String(s.uses ?? "").startsWith("actions/setup-node@"));
  for (const id of ["approval", "tick"]) {
    const [setup] = nodeSteps(id);
    assert.equal(String(setup.with["node-version"]), "24");
    assert.equal(setup.with["package-manager-cache"], false);
    assert.equal(setup.with.cache, undefined);
  }
});

test("every module the queue runs resolves inside its sparse checkout", () => {
  // Zero-dependency runtime (no npm ci beside the App token): node built-ins and siblings only.
  const dir = new URL("scripts/merge-queue/", ROOT);
  const files = readdirSync(dir).filter((f) => f.endsWith(".mjs"));
  for (const entry of ["tick.mjs", "approve.mjs", "candidate-base.mjs", "contracts.mjs"]) {
    assert.ok(files.includes(entry), `${entry} exists`);
  }
  for (const file of files) {
    const text = readFileSync(new URL(file, dir), "utf8");
    const specifiers = [
      ...text.matchAll(/^\s*(?:import|export)\s[^;]*?from\s+"([^"]+)"/gm),
      ...text.matchAll(/^\s*import\s+"([^"]+)"/gm),
      ...text.matchAll(/\bimport\(\s*"([^"]+)"\s*\)/g),
    ].map((m) => m[1]);
    for (const spec of specifiers) {
      assert.ok(
        spec.startsWith("node:") || /^\.\/[A-Za-z0-9._-]+\.mjs$/.test(spec),
        `${file} imports ${spec}: only node: built-ins and ./siblings ship in the sparse checkout`
      );
    }
  }
});

function writeFake(dir, name, body) {
  const path = join(dir, name);
  writeFileSync(path, `#!/usr/bin/env bash\n${body}\n`);
  chmodSync(path, 0o755);
}

/** Runs one `run:` body the way the runner does (bash -e -o pipefail), with fake tools. */
function runStep(t, step, env) {
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-wf-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const bin = join(dir, "bin");
  spawnSync("mkdir", [bin]);
  writeFake(bin, "node", `printf '%s\\n' "$@" > "$FAKE_ARGS"`);
  writeFake(bin, "gh", `printf '%s\\n' "$@" > "$FAKE_GH_ARGS"; printf '%s\\n' "$FAKE_GH_OUT"`);
  writeFake(bin, "npm", `printf '%s\\n' "$@" >> "$FAKE_NPM_ARGS"; exit "\${FAKE_NPM_RC:-0}"`);
  writeFake(bin, "git", "exit 0");
  const script = join(dir, "step.sh");
  writeFileSync(script, step.run);
  const files = {
    FAKE_ARGS: join(dir, "args"),
    FAKE_GH_ARGS: join(dir, "gh-args"),
    FAKE_NPM_ARGS: join(dir, "npm-args"),
    GITHUB_OUTPUT: join(dir, "output"),
    GITHUB_STEP_SUMMARY: join(dir, "summary"),
  };
  writeFileSync(files.GITHUB_OUTPUT, "");
  writeFileSync(files.GITHUB_STEP_SUMMARY, "");
  const res = spawnSync("bash", ["--noprofile", "--norc", "-eo", "pipefail", script], {
    cwd: dir,
    encoding: "utf8",
    env: { PATH: `${bin}:${process.env.PATH}`, ...files, ...env },
  });
  const read = (p) => {
    try {
      return readFileSync(p, "utf8");
    } catch {
      return null;
    }
  };
  return {
    code: res.status,
    stderr: res.stderr,
    stdout: res.stdout,
    args: read(files.FAKE_ARGS)?.split("\n").slice(0, -1) ?? null,
    ghArgs: read(files.FAKE_GH_ARGS)?.split("\n").slice(0, -1) ?? null,
    npmArgs: read(files.FAKE_NPM_ARGS)?.split("\n").slice(0, -1) ?? null,
    summary: read(files.GITHUB_STEP_SUMMARY),
    output: read(files.GITHUB_OUTPUT),
    dir,
  };
}

const stepNamed = (job, name) => {
  const step = queue.jobs[job].steps.find((s) => s.name === name);
  assert.ok(step, `${job}: step "${name}"`);
  return step;
};

test("approval binds through approve.mjs with the App token only", (t) => {
  const step = stepNamed("approval", "Bind the label to the head SHA");
  assert.deepEqual(step.env, { OMNI_QUEUE_TOKEN: "${{ steps.app-token.outputs.token }}" });
  const res = runStep(t, step, {});
  assert.equal(res.code, 0, res.stderr);
  assert.deepEqual(res.args, ["scripts/merge-queue/approve.mjs"]);
});

test("the bot identity is the App's noreply user (contracts.botIdentity)", (t) => {
  const step = stepNamed("tick", "Resolve the bot identity");
  assert.equal(step.id, "identity");
  assert.deepEqual(step.env, {
    GH_TOKEN: "${{ steps.app-token.outputs.token }}",
    APP_SLUG: "${{ steps.app-token.outputs.app-slug }}",
  });
  const ok = runStep(t, step, { APP_SLUG: "omni-queue", FAKE_GH_OUT: "123456" });
  assert.equal(ok.code, 0, ok.stderr);
  assert.deepEqual(ok.ghArgs, ["api", "/users/omni-queue[bot]", "--jq", ".id"]);
  const expected = botIdentity("omni-queue", 123456);
  assert.equal(ok.output, `name=${expected.name}\nemail=${expected.email}\n`);
  // An unexpected slug or user id stops the tick before any write.
  for (const [slug, id] of [
    ["Omni Queue", "1"],
    ["omni-queue\nx=y", "1"],
    ["", "1"],
    ["omni-queue", "12a"],
    ["omni-queue", ""],
  ]) {
    const bad = runStep(t, step, { APP_SLUG: slug, FAKE_GH_OUT: id });
    assert.notEqual(bad.code, 0, `${JSON.stringify(slug)} / ${JSON.stringify(id)}`);
    assert.equal(bad.output, "", "nothing written to GITHUB_OUTPUT");
  }
});

test("dispatch inputs reach tick.mjs as argv, never as shell text", (t) => {
  const step = stepNamed("tick", "Run one queue tick");
  assert.deepEqual(step.env, {
    OMNI_QUEUE_TOKEN: "${{ steps.app-token.outputs.token }}",
    OMNI_QUEUE_GIT_NAME: "${{ steps.identity.outputs.name }}",
    OMNI_QUEUE_GIT_EMAIL: "${{ steps.identity.outputs.email }}",
    EVENT_NAME: "${{ github.event_name }}",
    INPUT_BASE: "${{ inputs.base }}",
    INPUT_ACTION: "${{ inputs.action }}",
    INPUT_REASON: "${{ inputs.reason }}",
  });
  const hostile = 'flaky runner; $(touch pwned) `touch pwned2` "quoted"';
  const dispatch = runStep(t, step, {
    EVENT_NAME: "workflow_dispatch",
    INPUT_BASE: "release/v3.8.54",
    INPUT_ACTION: "pause",
    INPUT_REASON: hostile,
  });
  assert.equal(dispatch.code, 0, dispatch.stderr);
  assert.deepEqual(dispatch.args, [
    "scripts/merge-queue/tick.mjs",
    "--base",
    "release/v3.8.54",
    "--action",
    "pause",
    "--reason",
    hostile,
  ]);
  assert.deepEqual(
    readdirSync(dispatch.dir).filter((f) => f.startsWith("pwned")),
    []
  );
  const bare = runStep(t, step, {
    EVENT_NAME: "workflow_dispatch",
    INPUT_BASE: "",
    INPUT_ACTION: "",
  });
  assert.deepEqual(bare.args, ["scripts/merge-queue/tick.mjs", "--action", "tick"]);
  // Non-dispatch triggers pass nothing: the tick discovers the bases with work.
  for (const event of ["schedule", "workflow_run", "pull_request_target"]) {
    const res = runStep(t, step, {
      EVENT_NAME: event,
      INPUT_BASE: "release/v9.9.9",
      INPUT_ACTION: "pause",
    });
    assert.equal(res.code, 0, res.stderr);
    assert.deepEqual(res.args, ["scripts/merge-queue/tick.mjs"], event);
  }
});

// ───────────────────────────── ci.yml / quality.yml candidate profile ─────────────────────────────

const PROFILES = { ci: "ci.yml", quality: "quality.yml" };
const hosted = /^(ubuntu|windows|macos)-[a-z0-9.-]+$/;

/** Runner labels a job resolves to under `ctx` (every matrix os, when the label uses one). */
function labelsOf(job, ctx) {
  const raw = job["runs-on"];
  if (String(raw).includes("matrix.")) {
    const matrix = job.strategy?.matrix ?? {};
    const values = [...(matrix.os ?? []), ...(matrix.include ?? []).map((e) => e.os)];
    assert.ok(values.length > 0, "matrix runner without os values");
    return values.flatMap((os) => [render(raw, { ...ctx, matrix: { os } })].flat());
  }
  const value = render(raw, ctx);
  return isRecord(value) ? [value.labels ?? value.group].flat() : [value].flat();
}

// Jobs that send same-repository pull requests to the self-hosted pool when switched on.
const PR_SELF_HOSTED = { ci: ["test-unit", "test-vitest"], quality: ["lint-guard"] };
const MERGIFY_HEAD = "mergify/merge-queue/release-v3.8.54/abc123";

for (const [profile, file] of Object.entries(PROFILES)) {
  const wf = loadWorkflow(file);

  test(`${file}: pushes to omni-queue/** run the workflow, release pushes still do not`, () => {
    const branches = triggers(wf).push.branches;
    assert.ok(branches.includes("omni-queue/**"));
    assert.ok(pushFires(wf, CANDIDATE_BRANCH));
    assert.ok(pushFires(wf, "main"));
    assert.ok(!pushFires(wf, "release/v3.8.54"), "release/** pushes stay off (push-storm diet)");
    assert.ok(!pushFires(wf, "omni-queue-state"), "state writes never start the matrix");
  });

  test(`${file}: a candidate push schedules every required job and admits on all-green`, () => {
    const ctx = pushContext(CANDIDATE_REF);
    const scheduled = scheduledJobs(wf, ctx);
    const rules = policy.profiles[profile].jobs;
    for (const [id, rule] of Object.entries(rules)) {
      if (rule.when === "pr") {
        assert.equal(scheduled[id], false, `${id} is pull-request only`);
      } else if (rule.disposition === "required") {
        assert.equal(scheduled[id], true, `${profile}:${id} must run on a candidate push`);
      }
    }
    assert.equal(scheduled["admission-verdict"], true, "the gate reports on the candidate SHA");
    const verdict = wf.jobs["admission-verdict"];
    assert.equal(verdict.steps[0].with.ref, "${{ github.sha }}");
    const needs = Object.fromEntries(
      Object.keys(rules).map((id) => [
        id,
        {
          result: scheduled[id] ? "success" : "skipped",
          outputs: id === "changes" ? ctx.__outputs.changes : {},
        },
      ])
    );
    const context = { event: "push", sha: CANDIDATE_SHA, runId: "42", runAttempt: "1" };
    const report = evaluateAdmission(policy, profile, context, needs);
    assert.equal(report.verdict, "PASS", report.errors.join("; "));
    // Negative controls: a red or skipped required job fails the candidate.
    const requiredId = profile === "ci" ? "test-e2e" : "merge-integrity";
    for (const result of ["failure", "skipped", "cancelled"]) {
      const bad = { ...needs, [requiredId]: { result, outputs: {} } };
      assert.equal(evaluateAdmission(policy, profile, context, bad).verdict, "FAIL", result);
    }
  });

  test(`${file}: no job can reach a self-hosted runner for an omni-queue/** ref`, () => {
    let selfHostedOnMain = 0;
    for (const [id, job] of Object.entries(wf.jobs)) {
      // Worst case: every repository variable on, candidate pushed or dispatched on its ref.
      for (const eventName of ["push", "workflow_dispatch"]) {
        for (const label of labelsOf(job, pushContext(CANDIDATE_REF, { eventName }))) {
          assert.match(String(label), hosted, `${file}:${id} → ${label} on ${eventName}`);
        }
      }
      // Control: the same evaluation does route main pushes to the box when switched on.
      const onMain = labelsOf(job, pushContext("refs/heads/main"));
      if (onMain.includes("self-hosted")) selfHostedOnMain++;
      // With the variables off nothing is ever self-hosted.
      for (const label of labelsOf(job, pushContext("refs/heads/main", { vars: anyVar("") }))) {
        assert.match(String(label), hosted, `${file}:${id} with variables off`);
      }
    }
    assert.ok(selfHostedOnMain >= 1, `${file}: the control must exercise a self-hosted path`);
    for (const [id, job] of Object.entries(wf.jobs)) {
      if (
        String(job["runs-on"]).includes("self-hosted") &&
        !String(job["runs-on"]).includes("github.event_name == 'pull_request' &&")
      ) {
        assert.ok(String(job["runs-on"]).includes(OMNI_QUEUE_EXCLUSION), `${file}:${id}`);
      }
    }
  });

  test(`${file}: a pull request opened from an omni-queue/** head stays off the self-hosted pool`, () => {
    // github.ref is refs/pull/<n>/merge on a pull request, so only github.head_ref names the
    // candidate branch. A same-repository PR opened by hand from a live candidate ref carries
    // the same fork code as the candidate push.
    const fromCandidate = prContext(CANDIDATE_BRANCH);
    for (const [id, job] of Object.entries(wf.jobs)) {
      for (const label of labelsOf(job, fromCandidate)) {
        assert.match(String(label), hosted, `${file}:${id} → ${label} on a candidate-head PR`);
      }
    }
    // Controls: Mergify queue drafts and ordinary same-repository PRs keep the pool, pushes and
    // merge_group keep their current selection.
    const mergify = prContext(MERGIFY_HEAD, { draft: true, user: MERGIFY_USER });
    const mergeGroup = pushContext("refs/heads/gh-readonly-queue/x", { eventName: "merge_group" });
    for (const id of PR_SELF_HOSTED[profile]) {
      const job = wf.jobs[id];
      assert.ok(job, `${file}:${id} exists`);
      assert.ok(labelsOf(job, mergify).includes("self-hosted"), `${id} on a Mergify draft`);
      assert.ok(labelsOf(job, prContext("fix/x")).includes("self-hosted"), `${id} on a PR`);
      assert.deepEqual(labelsOf(job, mergeGroup), ["ubuntu-latest"], `${id} on merge_group`);
      assert.deepEqual(labelsOf(job, pushContext(CANDIDATE_REF)), ["ubuntu-latest"], id);
    }
    const onMainPush = labelsOf(
      wf.jobs[PR_SELF_HOSTED[profile][0]],
      pushContext("refs/heads/main")
    );
    assert.deepEqual(
      onMainPush,
      profile === "quality" ? ["self-hosted", "omni-light"] : ["ubuntu-latest"],
      "main pushes keep their selection"
    );
  });

  test(`${file}: the candidate base replaces github.event.before in the changes job`, () => {
    const changes = wf.jobs.changes;
    assert.equal(changes.outputs.candidateBase, "${{ steps.candidate.outputs.BASE_SHA }}");
    const checkout = changes.steps.find((s) =>
      String(s.uses ?? "").startsWith("actions/checkout@")
    );
    assert.equal(checkout.with["fetch-depth"], 0, "the base must be in the clone");
    const idx = changes.steps.findIndex((s) => s.id === "candidate");
    const resolver = changes.steps[idx];
    assert.equal(resolver.if, "startsWith(github.ref, 'refs/heads/omni-queue/')");
    assert.equal(resolver.run, 'node scripts/merge-queue/candidate-base.mjs >> "$GITHUB_OUTPUT"');
    assert.equal(resolver.env, undefined);
    const catalogIdx = changes.steps.findIndex(
      (s) => s.run === "npm run check:free-catalog-evidence"
    );
    assert.ok(idx >= 0 && idx < catalogIdx, "resolved before the evidence check");
    assert.ok(
      changes.steps.slice(0, idx).every((s) => !/npm (ci|install)/.test(String(s.run ?? ""))),
      "resolved before any install"
    );
    const baseExpr = changes.steps[catalogIdx].env.BASE_SHA;
    const withStep = (ctx, sha) => ({
      ...ctx,
      steps: { candidate: { outputs: { BASE_SHA: sha } } },
    });
    // Candidate push: the trailer base, not the all-zero `before` of a new branch.
    const cand = pushContext(CANDIDATE_REF);
    assert.equal(condition(resolver.if, cand), true);
    assert.equal(render(baseExpr, withStep(cand, BASE_SHA)), BASE_SHA);
    // Every other event keeps its previous source (the step is skipped → empty output).
    const main = pushContext("refs/heads/main");
    assert.equal(condition(resolver.if, main), false);
    main.github.event.before = "c".repeat(40);
    assert.equal(render(baseExpr, withStep(main, "")), "c".repeat(40));
    const mg = pushContext("refs/heads/gh-readonly-queue/x", { eventName: "merge_group" });
    mg.github.event.merge_group = { base_sha: "e".repeat(40) };
    assert.equal(render(baseExpr, withStep(mg, "")), "e".repeat(40));
    const pr = pushContext("refs/pull/7/merge", { eventName: "pull_request" });
    pr.github.event.pull_request = { base: { sha: "f".repeat(40) } };
    assert.equal(condition(resolver.if, pr), false, "a PR named omni-queue/* is not a candidate");
    assert.equal(render(baseExpr, withStep(pr, "")), "f".repeat(40));
  });

  test(`${file}: third-party uploads with service secrets skip omni-queue/** candidates`, () => {
    const firstParty = /^(actions\/|\.\/\.github\/actions\/)/;
    const secretsIn = (obj) =>
      [...JSON.stringify(obj ?? {}).matchAll(/secrets\.([A-Za-z0-9_]+)/g)]
        .map((m) => m[1])
        .filter((s) => s !== "GITHUB_TOKEN");
    const exposure = (ctx) => {
      const scheduled = scheduledJobs(wf, ctx);
      const hits = [];
      for (const [id, job] of Object.entries(wf.jobs)) {
        if (!scheduled[id]) continue;
        if (secretsIn(job.env).length) hits.push(`${id}:env`);
        for (const step of job.steps ?? []) {
          if (!secretsIn(step.with).length && !secretsIn(step.env).length) continue;
          if (step.uses && firstParty.test(step.uses)) continue;
          if (condition(step.if, { ...ctx, env: {}, __success: true }))
            hits.push(`${id}:${step.name}`);
        }
      }
      return hits;
    };
    assert.deepEqual(
      exposure(pushContext(CANDIDATE_REF)),
      [],
      "no service secret next to a candidate"
    );
    // A same-repository PR opened by hand from a candidate ref: github.ref is the PR merge ref,
    // only github.head_ref names the candidate.
    for (const queueCandidate of [undefined, "true"]) {
      // Worst case included: even classified as a queue draft (every PR job scheduled).
      assert.deepEqual(
        exposure(prContext(CANDIDATE_BRANCH, { queueCandidate })),
        [],
        `no service secret on a PR whose head is a candidate (queueCandidate ${queueCandidate})`
      );
    }
    if (profile === "ci") {
      // Control: a Mergify queue draft (same-repository head) still uploads to Trunk and Sonar.
      const mergify = exposure(prContext(MERGIFY_HEAD, { draft: true, user: MERGIFY_USER }));
      assert.ok(
        mergify.some((h) => h.startsWith("test-vitest:")),
        mergify.join(", ")
      );
      assert.ok(
        mergify.some((h) => h.startsWith("test-e2e:")),
        mergify.join(", ")
      );
      assert.ok(mergify.includes("sonarqube:env"), mergify.join(", "));
      // Control: main pushes still upload (Codecov + both Trunk uploads + the Sonar job env).
      const onMain = exposure(pushContext("refs/heads/main"));
      assert.ok(
        onMain.some((h) => h.startsWith("test-coverage:")),
        onMain.join(", ")
      );
      assert.ok(
        onMain.some((h) => h.startsWith("test-vitest:")),
        onMain.join(", ")
      );
      assert.ok(
        onMain.some((h) => h.startsWith("test-e2e:")),
        onMain.join(", ")
      );
      assert.ok(onMain.includes("sonarqube:env"), onMain.join(", "));
    }
  });
}

test("quality.yml: merge integrity and impact selection compare against the candidate base", () => {
  const wf = loadWorkflow("quality.yml");
  const mi = wf.jobs["merge-integrity"];
  assert.equal(mi.needs, undefined, "merge-integrity keeps running on a queue-draft edit run");
  assert.equal(mi.steps[0].with["fetch-depth"], 0);
  const idx = mi.steps.findIndex((s) => s.id === "candidate");
  assert.equal(mi.steps[idx].if, "startsWith(github.ref, 'refs/heads/omni-queue/')");
  assert.equal(
    mi.steps[idx].run,
    'node scripts/merge-queue/candidate-base.mjs >> "$GITHUB_OUTPUT"'
  );
  const changelog = mi.steps.findIndex((s) => s.run === "npm run check:changelog-integrity");
  assert.ok(idx >= 0 && idx < changelog);
  const ref = mi.steps[changelog].env.CHANGELOG_BASE_REF;
  const ctx = (sha) => ({
    ...pushContext(CANDIDATE_REF),
    steps: { candidate: { outputs: { BASE_SHA: sha } } },
  });
  assert.equal(render(ref, ctx(BASE_SHA)), BASE_SHA);
  // Skipped resolver → empty → check-changelog-integrity falls back to GITHUB_BASE_REF.
  assert.equal(render(ref, ctx(null)), null);

  const fast = wf.jobs["fast-gates"];
  assert.deepEqual([fast.needs].flat(), ["changes"]);
  assert.equal(fast.steps[0].with["fetch-depth"], 0);
  const step = (name) => fast.steps.find((s) => s.name === name);
  const tia = step("Impacted unit tests (TIA subset; blocking)");
  const sibling = step("Forgotten sibling tests (advisory)");
  const cand = pushContext(CANDIDATE_REF);
  cand.needs = { changes: { outputs: cand.__outputs.changes } };
  assert.equal(render(tia.env.GITHUB_BASE_SHA, cand), BASE_SHA);
  assert.equal(render(sibling.env.GITHUB_BASE_SHA, cand), BASE_SHA);
  const pr = pushContext("refs/pull/7/merge", { eventName: "pull_request" });
  pr.github.event.pull_request = { base: { sha: "f".repeat(40) } };
  pr.needs = { changes: { outputs: { candidateBase: "" } } };
  assert.equal(render(sibling.env.GITHUB_BASE_SHA, pr), "f".repeat(40));
  assert.equal(render(tia.env.GITHUB_BASE_SHA, pr), "", "PRs keep GITHUB_BASE_REF");
});

test("quality.yml: a base-check candidate runs the whole unit suite in the TIA step", (t) => {
  const wf = loadWorkflow("quality.yml");
  assert.equal(wf.jobs.changes.outputs.candidateSource, "${{ steps.candidate.outputs.SOURCE }}");
  const tia = wf.jobs["fast-gates"].steps.find(
    (s) => s.name === "Impacted unit tests (TIA subset; blocking)"
  );
  assert.equal(tia.env.CANDIDATE_SOURCE, "${{ needs.changes.outputs.candidateSource }}");
  // Base-check (SOURCE=self): no base-relative selection (it would be empty), the full suite.
  const baseCheck = runStep(t, tia, { CANDIDATE_SOURCE: "self", GITHUB_BASE_SHA: CANDIDATE_SHA });
  assert.equal(baseCheck.code, 0, baseCheck.stderr);
  assert.deepEqual(baseCheck.npmArgs, ["run", "test:unit:ci"]);
  assert.equal(baseCheck.args, null, "the selector never runs on a base-check");
  assert.equal(
    readFileSync(join(baseCheck.dir, "tia-selection.txt"), "utf8"),
    "__OMNI_QUEUE_BASE_CHECK__\n"
  );
  assert.match(baseCheck.summary, /omni-queue base-check — full unit suite/);
  // A failing test on the bare base fails this same check (what classify compares).
  const red = runStep(t, tia, { CANDIDATE_SOURCE: "self", FAKE_NPM_RC: "3" });
  assert.equal(red.code, 3);
  // Control: a batch candidate (or a PR) still selects, and an empty selection skips.
  for (const source of ["trailer", ""]) {
    const batch = runStep(t, tia, { CANDIDATE_SOURCE: source, GITHUB_BASE_SHA: BASE_SHA });
    assert.equal(batch.code, 0, batch.stderr);
    assert.equal(batch.npmArgs, null, `source '${source}' never runs the full suite`);
    assert.deepEqual(batch.args, ["scripts/quality/select-impacted-tests.mjs"]);
    assert.match(batch.stdout, /skipping unit tests/);
  }
});

for (const file of Object.values(PROFILES)) {
  test(`${file}: a candidate push writes no Actions cache (fresh ref per candidate)`, () => {
    // Every candidate is a new branch; a cache saved there is readable by no other ref and only
    // evicts release/main caches from the repository quota.
    const wf = loadWorkflow(file);
    const ctx = pushContext(CANDIDATE_REF);
    const scheduled = scheduledJobs(wf, ctx);
    let checked = 0;
    for (const [id, job] of Object.entries(wf.jobs)) {
      if (!scheduled[id]) continue;
      const jobCtx = { ...ctx, needs: {} };
      for (const step of job.steps ?? []) {
        const uses = String(step.uses ?? "");
        const where = `${file}:${id}:${step.name ?? uses}`;
        if (/^actions\/cache@/.test(uses)) {
          checked++;
          assert.equal(condition(step.if, jobCtx), false, `${where} saves a cache`);
        }
        if (/^actions\/setup-node@/.test(uses)) {
          checked++;
          assert.equal(step.with?.["package-manager-cache"], false, where);
          assert.ok(!truthy(render(step.with?.cache ?? "", jobCtx)), where);
        }
        if (/^\.\/\.github\/actions\//.test(uses) && step.with && "cache" in step.with) {
          checked++;
          assert.notEqual(String(render(step.with.cache, jobCtx)), "true", where);
        }
      }
    }
    assert.ok(checked >= 5, `${file}: the check must see the cache-capable steps (${checked})`);
    // Control: the same steps do cache on a pull request.
    const pr = pushContext("refs/pull/7/merge", { eventName: "pull_request" });
    const npmCi = Object.values(wf.jobs)
      .flatMap((j) => j.steps ?? [])
      .find((s) => String(s.uses ?? "").startsWith("./.github/actions/npm-ci-retry"));
    assert.equal(String(render(npmCi.with.cache, pr)), "true");
  });
}

test("ci.yml: the candidate range is checked for AI attribution (merge-ff keeps commits)", () => {
  const wf = loadWorkflow("ci.yml");
  const lint = wf.jobs.lint;
  assert.ok([lint.needs].flat().includes("changes"), "lint receives the candidate base");
  const step = lint.steps.find(
    (s) => s.name === "AI attribution in the omni-queue candidate range (Hard Rule #16)"
  );
  assert.ok(step, "candidate-range AI attribution step");
  assert.equal(step.run, 'npm run check:ai-attribution -- --range "$CANDIDATE_BASE..$GITHUB_SHA"');
  const cand = pushContext(CANDIDATE_REF);
  cand.needs = { changes: { outputs: { candidateBase: BASE_SHA } } };
  assert.equal(condition(step.if, cand), true);
  assert.equal(render(step.env.CANDIDATE_BASE, cand), BASE_SHA);
  // Not on main pushes nor on pull requests (the PR step covers those).
  assert.equal(condition(step.if, pushContext("refs/heads/main")), false);
  assert.equal(
    condition(step.if, pushContext("refs/pull/7/merge", { eventName: "pull_request" })),
    false
  );
  // The checkout carries the full history the range needs.
  assert.equal(lint.steps[0].with["fetch-depth"], 0);
});
