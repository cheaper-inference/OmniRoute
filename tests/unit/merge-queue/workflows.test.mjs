// omni-queue WP5: the queue's own workflow (omni-queue.yml) and the candidate profile of
// ci.yml / quality.yml on `push` to omni-queue/**, plus the guarantee that no deploy or
// publication workflow ever fires for a candidate ref.
//
// Guards are EVALUATED, not string-matched: a small GitHub Actions expression evaluator (value
// semantics of && / ||, loose ==, case-insensitive startsWith, fromJSON) runs every `if:` and
// `runs-on:` against concrete event contexts. It never executes workflow text as code.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";
import { botIdentity, candidateRef } from "../../../scripts/merge-queue/contracts.mjs";
import { TICK_ACTIONS } from "../../../scripts/merge-queue/tick.mjs";
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

// Object filter (`labels.*.name`): `.*` selects every element, the next key maps over them.
const FILTERED = Symbol("object filter");
const filtered = (values) => Object.assign(values, { [FILTERED]: true });

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
      if (key === "*") return filtered(Array.isArray(obj) ? [...obj] : Object.values(obj));
      if (obj[FILTERED])
        return filtered(obj.filter((x) => isRecord(x) && key in x).map((x) => x[key]));
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
  // Object filter + contains(): an exact (case-insensitive) element match, never a substring.
  const labelled = {
    github: { event: { pull_request: { labels: [{ name: "A" }, { name: "bc" }] } } },
  };
  const has = (name) =>
    condition(`contains(github.event.pull_request.labels.*.name, '${name}')`, labelled);
  assert.deepEqual([has("a"), has("bc"), has("b"), has("")], [true, true, false, false]);
  assert.equal(condition("contains(github.event.pull_request.labels.*.name, 'a')", ctx), false);
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

const queueConfig = JSON.parse(readText("config/merge-queue/config.json"));

/**
 * Context of one omni-queue.yml trigger. A pull_request_target event is, by default, one the
 * queue cares about: the pull request carries the queue label, and a labeled / unlabeled action
 * names that label. `label` (the event's label), `prLabels` (the labels the pull request carries
 * when the event fires), `merged` and `baseRef` (the pull request's base branch) model every
 * other pull request event.
 */
function queueContext(
  eventName,
  {
    enabled = "true",
    action = "",
    approval,
    label,
    prLabels,
    merged = false,
    baseRef = "release/v3.8.54",
  } = {}
) {
  const event = { action, repository: { default_branch: "release/v3.8.54" } };
  if (eventName === "pull_request_target") {
    event.number = 7;
    if (action === "labeled" || action === "unlabeled") {
      event.label = { name: label ?? queueConfig.label };
    }
    event.pull_request = {
      number: 7,
      merged,
      labels: (prLabels ?? [queueConfig.label]).map((name) => ({ name })),
      base: { ref: baseRef },
    };
  }
  return {
    github: {
      event_name: eventName,
      repository: "cheaper-inference/OmniRoute",
      ref: "refs/heads/release/v3.8.54",
      event,
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
  assert.deepEqual(Object.keys(inputs).sort(), ["action", "base", "reason", "sha"]);
  assert.equal(inputs.base.type, "string");
  assert.equal(inputs.base.required, false);
  assert.equal(inputs.reason.type, "string");
  assert.equal(inputs.reason.required, false);
  assert.equal(inputs.sha.type, "string");
  assert.equal(inputs.sha.required, false);
  assert.equal(inputs.action.type, "choice");
  assert.equal(inputs.action.default, "tick");
  assert.deepEqual(inputs.action.options, ["tick", "pause", "resume", "dry-run", "bless"]);
  // Every action the workflow offers is one the tick accepts, and the other way round.
  assert.deepEqual(inputs.action.options, [...TICK_ACTIONS]);
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

test("only pull request events the queue cares about start the privileged jobs", () => {
  // Every pull_request_target run mints an App token. Unfiltered, any label on any pull request
  // started the approval job and any of the four actions started a tick: hundreds of privileged
  // runs a day on a busy repository, and a contributor could keep ticks running by pushing.
  const { label: queueLabel, protectedApprovalLabel, blockLabels } = queueConfig;
  const unrelated = ["bug", `${queueLabel}-dashboard`, `x-${queueLabel}`];
  for (const name of unrelated) {
    assert.ok(![queueLabel, protectedApprovalLabel, ...blockLabels].includes(name), name);
  }
  const jobs = (action, opts = {}) =>
    scheduledJobs(queue, queueContext("pull_request_target", { action, ...opts }));
  const neither = { approval: false, tick: false };
  const tickOnly = { approval: false, tick: true };
  const both = { approval: true, tick: true };

  for (const action of ["labeled", "unlabeled"]) {
    for (const label of unrelated) {
      // An unrelated label on a pull request that is not queued: nothing runs.
      assert.deepEqual(jobs(action, { label, prLabels: [label] }), neither, `${action} ${label}`);
      assert.deepEqual(jobs(action, { label, prLabels: [] }), neither, `${action} ${label}`);
      // On a queued pull request it only wakes the tick (the PR carries the queue label).
      assert.deepEqual(
        jobs(action, { label, prLabels: [queueLabel, label] }),
        tickOnly,
        `${action} ${label} on a queued PR`
      );
    }
    // The two approval labels bind / withdraw an approval and wake the tick, queued or not
    // (`unlabeled` fires after the label is gone from the pull request).
    for (const label of [queueLabel, protectedApprovalLabel]) {
      for (const prLabels of [[], [label], [queueLabel, protectedApprovalLabel]]) {
        assert.deepEqual(jobs(action, { label, prLabels }), both, `${action} ${label}`);
      }
    }
    // A block label changes eligibility: tick, never the approval job.
    for (const label of blockLabels) {
      assert.deepEqual(
        jobs(action, { label, prLabels: [queueLabel, label] }),
        tickOnly,
        `${action} ${label} on a queued PR`
      );
      assert.deepEqual(jobs(action, { label, prLabels: [] }), tickOnly, `${action} ${label}`);
    }
  }

  // A push: only when the pull request is queued (its approval is bound to the old head).
  assert.deepEqual(jobs("synchronize", { prLabels: [] }), neither);
  assert.deepEqual(
    jobs("synchronize", { prLabels: [protectedApprovalLabel, ...unrelated] }),
    neither
  );
  assert.deepEqual(jobs("synchronize", { prLabels: [queueLabel] }), tickOnly);
  assert.deepEqual(jobs("synchronize", { prLabels: ["bug", queueLabel] }), tickOnly);

  // closed: a merge moved a base (queued or not); an unmerged close matters only when queued.
  assert.deepEqual(jobs("closed", { prLabels: [], merged: true }), tickOnly);
  assert.deepEqual(jobs("closed", { prLabels: unrelated, merged: true }), tickOnly);
  assert.deepEqual(jobs("closed", { prLabels: [], merged: false }), neither);
  assert.deepEqual(jobs("closed", { prLabels: [queueLabel], merged: false }), tickOnly);
  // `merged` counts on `closed` only.
  assert.deepEqual(jobs("synchronize", { prLabels: [], merged: true }), neither);

  // Every other trigger is unchanged: the tick runs, the approval job does not.
  for (const [event, action] of [
    ["schedule", ""],
    ["workflow_run", "completed"],
    ["workflow_dispatch", ""],
  ]) {
    assert.deepEqual(scheduledJobs(queue, queueContext(event, { action })), tickOnly, event);
  }

  // The kill switch still wins over every one of the events that start a job.
  for (const [action, opts] of [
    ["labeled", { label: queueLabel }],
    ["labeled", { label: blockLabels[0] }],
    ["synchronize", {}],
    ["closed", { prLabels: [], merged: true }],
  ]) {
    assert.deepEqual(
      jobs(action, { ...opts, enabled: "false" }),
      neither,
      `${action} switched off`
    );
  }
});

/** Dotted path of a context access (`github.event.label.name`), or null for anything else. */
function contextPath(node) {
  if (node?.k === "ctx") return node.name;
  if (node?.k !== "prop" || node.key.k !== "lit") return null;
  const parent = contextPath(node.e);
  return parent === null ? null : `${parent}.${node.key.v}`;
}

/** The label names a job's `if:` compares the event's label and the PR's labels with. */
function labelLiterals(expr) {
  const out = { eventLabel: [], prLabels: [], eventLabelReads: 0, prLabelReads: 0 };
  const literal = (node) => {
    assert.equal(node?.k, "lit", `a label is compared with a literal in: ${expr}`);
    assert.equal(typeof node.v, "string");
    return node.v;
  };
  const walk = (node) => {
    if (node === null || typeof node !== "object") return;
    const path = contextPath(node);
    if (path === "github.event.label.name") out.eventLabelReads++;
    if (path === "github.event.pull_request.labels.*.name") out.prLabelReads++;
    if (path !== null) return;
    if (node.k === "cmp" && node.op === "==") {
      for (const [side, other] of [
        [node.a, node.b],
        [node.b, node.a],
      ]) {
        if (contextPath(side) === "github.event.label.name") out.eventLabel.push(literal(other));
      }
    }
    if (node.k === "call" && node.name === "contains") {
      if (contextPath(node.args[0]) === "github.event.pull_request.labels.*.name") {
        out.prLabels.push(literal(node.args[1]));
      }
    }
    for (const child of [node.e, node.a, node.b, ...(node.args ?? [])]) walk(child);
  };
  walk(parse(String(expr).trim()));
  // Every read of a label is one of the two shapes above (no !=, startsWith, …).
  assert.equal(out.eventLabelReads, out.eventLabel.length, expr);
  assert.equal(out.prLabelReads, out.prLabels.length, expr);
  return { eventLabel: out.eventLabel.sort(), prLabels: out.prLabels.sort() };
}

test("the label names in the queue's job filters are the ones in config.json", () => {
  // A workflow `if:` cannot read config/merge-queue/config.json, so omni-queue.yml repeats the
  // label names as literals. Renaming a label in one place only would silently stop approvals
  // (or ticks) from starting: both must change together.
  const { label, protectedApprovalLabel, blockLabels, lanes } = queueConfig;
  const laneLabels = [lanes.hotfixLabel, lanes.baseRepairLabel];
  const names = [label, protectedApprovalLabel, ...blockLabels, ...laneLabels];
  assert.ok(names.every((n) => typeof n === "string" && n.length > 0));
  assert.equal(new Set(names.map((n) => n.toLowerCase())).size, names.length, "distinct labels");
  assert.deepEqual(labelLiterals(queue.jobs.approval.if), {
    eventLabel: [label, protectedApprovalLabel].sort(),
    prLabels: [],
  });
  assert.deepEqual(labelLiterals(queue.jobs.tick.if), {
    eventLabel: [...names].sort(),
    prLabels: [label],
  });
});

test("the lane labels in the tick filter are the ones in config.json", () => {
  // Applying or removing a lane label changes what the queue does next (a hotfix goes first, a
  // base repair is the only thing a base-red pause composes): it wakes the tick, never the
  // approval job (a lane label binds no approval: it counts when an approver applied it).
  const { label: queueLabel, lanes } = queueConfig;
  const laneLabels = [lanes.hotfixLabel, lanes.baseRepairLabel];
  assert.deepEqual(laneLabels, ["omni-queue-hotfix", "omni-queue-base-repair"]);
  const literals = labelLiterals(queue.jobs.tick.if).eventLabel;
  for (const name of laneLabels) assert.ok(literals.includes(name), name);
  assert.ok(!labelLiterals(queue.jobs.approval.if).eventLabel.some((n) => laneLabels.includes(n)));
  for (const action of ["labeled", "unlabeled"]) {
    for (const name of laneLabels) {
      for (const prLabels of [[], [queueLabel, name]]) {
        assert.deepEqual(
          scheduledJobs(
            queue,
            queueContext("pull_request_target", { action, label: name, prLabels })
          ),
          { approval: false, tick: true },
          `${action} ${name}`
        );
      }
    }
  }
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
  // github.event.number is the PR number of a pull_request_target payload (the file names
  // github.event.pull_request only in the tick's trigger filter: see "the queue never checks out
  // or runs PR code").
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
    assert.equal(w["client-id"], "${{ secrets.OMNI_QUEUE_APP_CLIENT_ID }}");
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
    // The land status (config.landing.statusContext) on a candidate, a PR head or a bless.
    statuses: "write",
    checks: "read",
    // POST /actions/runs/{id}/rerun-failed-jobs: a red candidate's failed jobs re-run once.
    actions: "write",
  });
  const secrets = [...queueText.matchAll(/secrets\.([A-Za-z0-9_]+)/g)].map((m) => m[1]);
  assert.deepEqual([...new Set(secrets)].sort(), [
    "OMNI_QUEUE_APP_CLIENT_ID",
    "OMNI_QUEUE_APP_PRIVATE_KEY",
    "OMNI_QUEUE_LAND_TOKEN",
  ]);
  assert.doesNotMatch(queueText, /GITHUB_TOKEN|github\.token/, "the queue never uses GITHUB_TOKEN");
});

test("omni-queue.yml: both jobs mint the token with client-id from OMNI_QUEUE_APP_CLIENT_ID, never app-id", () => {
  // actions/create-github-app-token deprecates its `app-id` input: `client-id` (the App's
  // Client ID, `Iv…`) is the supported one. The numeric App id stays an operator-side value of
  // scripts/merge-queue/apply-ruleset.mjs, never a secret of this workflow.
  const rawText = readText(".github/workflows/omni-queue.yml");
  assert.doesNotMatch(rawText, /^\s*app-id\s*:/m, "no step passes the deprecated app-id input");
  assert.doesNotMatch(queueText, /"app-id":/, "no mapping carries an app-id key");
  assert.doesNotMatch(
    queueText,
    /OMNI_QUEUE_APP_ID\b/,
    "the numeric App id is not a workflow secret"
  );
  for (const id of ["approval", "tick"]) {
    const steps = queue.jobs[id].steps.filter((s) =>
      String(s.uses ?? "").startsWith("actions/create-github-app-token@")
    );
    assert.equal(steps.length, 1, `${id} mints exactly one App token`);
    assert.equal(steps[0].with["client-id"], "${{ secrets.OMNI_QUEUE_APP_CLIENT_ID }}", id);
    assert.equal(steps[0].with["app-id"], undefined, id);
  }
});

test("omni-queue.yml: both jobs run in the omni-queue environment", () => {
  // The App's private key (and the owner's land token) live in the environment: a workflow on a
  // candidate branch, or on any ref the environment does not admit, cannot read them.
  // `deployment: false`: the environment's secrets and branch policy apply, but no deployment
  // record is created for every run (pull_request_target alone starts many).
  for (const [id, job] of Object.entries(queue.jobs)) {
    assert.deepEqual(job.environment, { name: "omni-queue", deployment: false }, id);
  }
});

test("omni-queue.yml: approval and tick skip pull requests whose base is not release/v*", () => {
  // The jobs concern only pull requests whose base is a release branch (the queue's bases):
  // filtering here avoids minting an App token for every other pull request.
  const { label: queueLabel, blockLabels } = queueConfig;
  const neither = { approval: false, tick: false };
  const pr = (action, opts) =>
    scheduledJobs(queue, queueContext("pull_request_target", { action, ...opts }));
  for (const baseRef of ["main", "feature/x", "release-v3.8.54", "omni-queue/release-v3.8.54"]) {
    for (const action of ["labeled", "unlabeled"]) {
      for (const label of [queueLabel, queueConfig.protectedApprovalLabel, blockLabels[0]]) {
        assert.deepEqual(
          pr(action, { label, baseRef }),
          neither,
          `${action} ${label} on ${baseRef}`
        );
      }
    }
    assert.deepEqual(pr("synchronize", { baseRef }), neither, `synchronize on ${baseRef}`);
    assert.deepEqual(pr("closed", { baseRef, merged: true }), neither, `merge into ${baseRef}`);
  }
  // A release base keeps today's behavior.
  assert.deepEqual(pr("labeled", { label: queueLabel }), { approval: true, tick: true });
  assert.deepEqual(pr("synchronize", {}), { approval: false, tick: true });
  assert.deepEqual(pr("closed", { prLabels: [], merged: true }), { approval: false, tick: true });
  // The other triggers carry no pull request: the base filter does not apply to them.
  for (const [event, action] of [
    ["schedule", ""],
    ["workflow_run", "completed"],
    ["workflow_dispatch", ""],
  ]) {
    assert.deepEqual(
      scheduledJobs(queue, queueContext(event, { action })),
      { approval: false, tick: true },
      event
    );
  }
});

test("omni-queue.yml: the tick may write statuses and receives the land token", () => {
  const scopes = queue.jobs.tick.steps.find((s) => s.id === "app-token").with;
  assert.equal(scopes["permission-statuses"], "write");
  // The owner's land token reaches the tick step only: no other step, no other job.
  const holders = Object.entries(queue.jobs).flatMap(([id, job]) =>
    job.steps
      .filter((s) => JSON.stringify(s).includes("OMNI_QUEUE_LAND_TOKEN"))
      .map((s) => `${id}: ${s.name}`)
  );
  assert.deepEqual(holders, ["tick: Run one queue tick"]);
  const step = stepNamed("tick", "Run one queue tick");
  assert.equal(step.env.OMNI_QUEUE_LAND_TOKEN, "${{ secrets.OMNI_QUEUE_LAND_TOKEN }}");
  // A bless is honoured only when both the original dispatcher (github.actor) and whoever
  // triggered this run (github.triggering_actor, the re-runner of a re-run) are approvers.
  assert.equal(step.env.GITHUB_ACTOR, "${{ github.actor }}");
  assert.equal(step.env.GITHUB_TRIGGERING_ACTOR, "${{ github.triggering_actor }}");
});

test("the tick's test/sandbox overrides are never set by the real workflow", () => {
  // tick.createTickDeps honours them so the end-to-end test can point the queue at a local bare
  // repository, an alternative config and a fake API; production must use the real remote, the
  // config of the default branch and the API root that Actions provides.
  // OMNI_QUEUE_GIT_NAME / OMNI_QUEUE_GIT_EMAIL override every other identity (landing.identity
  // included): the workflow hands the bot identity over as OMNI_QUEUE_BOT_NAME / _EMAIL instead.
  for (const name of [
    "OMNI_QUEUE_REMOTE_URL",
    "OMNI_QUEUE_CONFIG",
    "GITHUB_API_URL",
    "OMNI_QUEUE_GIT_NAME",
    "OMNI_QUEUE_GIT_EMAIL",
  ]) {
    assert.ok(!queueText.includes(name), `omni-queue.yml must not set ${name}`);
  }
});

test("the queue never checks out or runs PR code", () => {
  // Nothing PR-controlled is read anywhere in the file (repos, titles, heads). The reads of the
  // pull request payload are the jobs' trigger filters: the labels the PR carries (applied by
  // people with triage rights, never by a fork author), `merged` and the base branch (one of
  // this repository's own branches), compared inside a job's `if:` and never handed to a step.
  const filterReads = /github\.event\.pull_request\.(labels\.\*\.name|merged|base\.ref)(?![\w.[])/g;
  const unfiltered = (job) => ({ ...job, if: String(job.if).replace(filterReads, "") });
  const withoutFilter = JSON.stringify({
    ...queue,
    jobs: { approval: unfiltered(queue.jobs.approval), tick: unfiltered(queue.jobs.tick) },
  });
  assert.doesNotMatch(
    withoutFilter,
    /github\.event\.pull_request|github\.head_ref|workflow_run\.head/
  );
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

// ───────────────────────────── omni-queue-watchdog.yml ─────────────────────────────

const watchdogText = readText(".github/workflows/omni-queue-watchdog.yml");
const watchdog = load(watchdogText);

function watchdogContext(
  eventName,
  { repository = "cheaper-inference/OmniRoute", enabled = "true" } = {}
) {
  return {
    github: {
      event_name: eventName,
      repository,
      ref: "refs/heads/release/v3.8.54",
      event: { repository: { default_branch: "release/v3.8.54" } },
    },
    vars: { OMNI_QUEUE_ENABLED: enabled },
    needs: {},
    secrets: anyVar("***"),
    inputs: {},
    steps: anyStep,
  };
}

test("omni-queue-watchdog.yml: every 30 minutes, in the production repository only, behind the kill switch", () => {
  const on = triggers(watchdog);
  assert.deepEqual(Object.keys(on).sort(), ["schedule", "workflow_dispatch"]);
  assert.deepEqual(on.schedule, [{ cron: "17,47 * * * *" }]);
  assert.deepEqual(Object.keys(watchdog.jobs), ["watchdog"]);
  const job = watchdog.jobs.watchdog;
  for (const event of ["schedule", "workflow_dispatch"]) {
    assert.equal(condition(job.if, watchdogContext(event)), true, event);
    for (const repository of ["someone/OmniRoute", "cheaper-inference/omni-queue-sandbox"]) {
      assert.equal(condition(job.if, watchdogContext(event, { repository })), false, repository);
    }
    for (const enabled of ["", "false", "TRUE ", "1"]) {
      assert.equal(condition(job.if, watchdogContext(event, { enabled })), false, enabled);
    }
  }
});

test("omni-queue-watchdog.yml: the default token with exactly contents read, issues write and pull-requests read, no App secret", () => {
  assert.deepEqual(watchdog.permissions, {});
  const job = watchdog.jobs.watchdog;
  // pull-requests: read lists the labeled PRs with their base; nothing PR-related is written.
  assert.deepEqual(job.permissions, {
    contents: "read",
    issues: "write",
    "pull-requests": "read",
  });
  assert.equal(job.environment, undefined, "no environment: the App's credentials stay out");
  assert.doesNotMatch(watchdogText, /secrets\./, "no secret at all, so none of the App's");
  assert.doesNotMatch(watchdogText, /create-github-app-token|OMNI_QUEUE_APP|OMNI_QUEUE_LAND/);
  const runs = job.steps.filter((s) => s.run !== undefined);
  assert.equal(runs.length, 1);
  assert.equal(String(runs[0].run).trim(), "node scripts/merge-queue/watchdog.mjs");
  assert.deepEqual(runs[0].env, { GITHUB_TOKEN: "${{ github.token }}" });
  assert.deepEqual(job.concurrency, { group: "omni-queue-watchdog", "cancel-in-progress": false });
  assert.ok(Number(job["timeout-minutes"]) <= 10);
});

test("omni-queue-watchdog.yml: a sparse checkout of the default branch, pinned actions, no PR code", () => {
  const job = watchdog.jobs.watchdog;
  const checkouts = job.steps.filter((s) => String(s.uses ?? "").startsWith("actions/checkout@"));
  assert.equal(checkouts.length, 1);
  const w = checkouts[0].with;
  assert.equal(w.ref, "${{ github.event.repository.default_branch }}");
  assert.equal(w.repository, undefined);
  assert.equal(w.token, undefined);
  assert.equal(w["persist-credentials"], false);
  assert.deepEqual(String(w["sparse-checkout"]).trim().split("\n"), [
    "scripts/merge-queue",
    "config/merge-queue",
  ]);
  const queuePins = new Set(
    Object.values(queue.jobs).flatMap((j) => j.steps.map((s) => s.uses).filter(Boolean))
  );
  for (const step of job.steps) {
    if (step.uses) {
      assert.match(step.uses, SHA_PIN);
      assert.ok(queuePins.has(step.uses), `${step.uses}: the same pin as omni-queue.yml`);
    }
    assert.doesNotMatch(String(step.run ?? ""), /\$\{\{/, "no expression inside a run body");
    assert.doesNotMatch(String(step.run ?? ""), /\bnpm\s+(ci|install|i)\b|\bnpx\b/);
  }
  const [setup] = job.steps.filter((s) => String(s.uses ?? "").startsWith("actions/setup-node@"));
  assert.equal(String(setup.with["node-version"]), "24");
  assert.equal(setup.with["package-manager-cache"], false);
  assert.doesNotMatch(JSON.stringify(watchdog), /pull_request|head_ref|workflow_run/);
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
  // FAKE_NPM_FAIL=<script>: only `npm run <script>` fails (exit 1); FAKE_NPM_RC applies to all.
  writeFake(
    bin,
    "npm",
    `printf '%s\\n' "$@" >> "$FAKE_NPM_ARGS"
[ -n "\${FAKE_NPM_FAIL:-}" ] && [ "$2" = "$FAKE_NPM_FAIL" ] && exit 1
exit "\${FAKE_NPM_RC:-0}"`
  );
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
    OMNI_QUEUE_LAND_TOKEN: "${{ secrets.OMNI_QUEUE_LAND_TOKEN }}",
    OMNI_QUEUE_BOT_NAME: "${{ steps.identity.outputs.name }}",
    OMNI_QUEUE_BOT_EMAIL: "${{ steps.identity.outputs.email }}",
    GITHUB_ACTOR: "${{ github.actor }}",
    GITHUB_TRIGGERING_ACTOR: "${{ github.triggering_actor }}",
    EVENT_NAME: "${{ github.event_name }}",
    INPUT_BASE: "${{ inputs.base }}",
    INPUT_ACTION: "${{ inputs.action }}",
    INPUT_REASON: "${{ inputs.reason }}",
    INPUT_SHA: "${{ inputs.sha }}",
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
  const sha = "0123456789abcdef0123456789abcdef01234567";
  const bless = runStep(t, step, {
    EVENT_NAME: "workflow_dispatch",
    INPUT_BASE: "release/v3.8.54",
    INPUT_ACTION: "bless",
    INPUT_REASON: hostile,
    INPUT_SHA: sha,
  });
  assert.equal(bless.code, 0, bless.stderr);
  assert.deepEqual(bless.args, [
    "scripts/merge-queue/tick.mjs",
    "--base",
    "release/v3.8.54",
    "--action",
    "bless",
    "--reason",
    hostile,
    "--sha",
    sha,
  ]);
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
      INPUT_ACTION: "bless",
      INPUT_SHA: sha,
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

// ───────────────────────────── candidate profile: base-relative gates ─────────────────────────────
//
// A gate that is base-relative (or advisory) on a pull request must judge a candidate the same
// way, against the candidate base: in its absolute / strict mode, drift the base picked up
// mid-cycle reds EVERY candidate and the queue blames innocent pull requests.

const PR_BASE_SHA = "f".repeat(40);
const withChanges = (ctx) => ({ ...ctx, needs: { changes: { outputs: ctx.__outputs.changes } } });

/** The event contexts a base-relative step must tell apart. `base` = the SHA it must receive. */
function baseRelativeContexts() {
  const pr = prContext("fix/x");
  pr.github.event.pull_request.base.sha = PR_BASE_SHA;
  return [
    { name: "candidate push", ctx: pushContext(CANDIDATE_REF), base: BASE_SHA },
    { name: "pull request", ctx: pr, base: PR_BASE_SHA },
    { name: "push to main", ctx: pushContext("refs/heads/main"), base: "" },
    {
      name: "merge_group",
      ctx: pushContext("refs/heads/gh-readonly-queue/x", { eventName: "merge_group" }),
      base: "",
    },
    {
      name: "workflow_dispatch",
      ctx: pushContext("refs/heads/release/v3.8.54", { eventName: "workflow_dispatch" }),
      base: "",
    },
  ].map((c) => ({ ...c, ctx: withChanges(c.ctx) }));
}

/** `npm run <script> [-- args…]` invocations of one step, as script → args after `--`. */
function npmRuns(npmArgs) {
  const runs = new Map();
  let current = null;
  for (const arg of npmArgs ?? []) {
    if (arg === "run") current = null;
    else if (current === null) runs.set(arg, (current = []));
    else current.push(arg);
  }
  return runs;
}

/** The job receives the candidate base and has it in its clone (full history, like a PR). */
function assertBaseAvailable(job, where) {
  assert.ok([job.needs].flat().includes("changes"), `${where} receives the candidate base`);
  const checkout = job.steps.find((s) => String(s.uses ?? "").startsWith("actions/checkout@"));
  assert.equal(checkout.with["fetch-depth"], 0, `${where}: the base must be in the clone`);
}

test("ci.yml: the boundary ratchet is base-relative on a candidate, absolute on main", (t) => {
  const lint = loadWorkflow("ci.yml").jobs.lint;
  assertBaseAvailable(lint, "lint");
  const step = lint.steps.find((s) => s.name === "Boundary ratchet (open-sse → src)");
  assert.ok(step, "boundary ratchet step");
  for (const { name, ctx, base } of baseRelativeContexts()) {
    const sha = String(render(step.env.PR_BASE_SHA, ctx) ?? "");
    assert.equal(sha, base, `PR_BASE_SHA on ${name}`);
    const res = runStep(t, step, { PR_BASE_SHA: sha });
    assert.equal(res.code, 0, res.stderr);
    assert.deepEqual(
      res.npmArgs,
      base
        ? ["run", "check:boundary:ratchet", "--", "--base-ref", base]
        : ["run", "check:boundary:ratchet"],
      name
    );
  }
});

test("quality.yml: file-size, new-code, boundary and TS7 gates compare a candidate with its base", (t) => {
  const fast = loadWorkflow("quality.yml").jobs["fast-gates"];
  assertBaseAvailable(fast, "fast-gates");
  const step = fast.steps.find((s) => s.name === "Quality gates (all, non-fail-fast)");
  assert.ok(step, "quality gates step");
  for (const { name, ctx, base } of baseRelativeContexts()) {
    const sha = String(render(step.env.PR_BASE_SHA, ctx) ?? "");
    assert.equal(sha, base, `PR_BASE_SHA on ${name}`);
    const res = runStep(t, step, { PR_BASE_SHA: sha });
    assert.equal(res.code, 0, res.stderr);
    const runs = npmRuns(res.npmArgs);
    const relative = base ? ["--", "--base-ref", base] : [];
    for (const gate of ["file-size", "complexity-ratchets", "dead-code"]) {
      assert.deepEqual(runs.get(`check:${gate}`), relative, `${gate} on ${name}`);
    }
    assert.deepEqual(
      runs.get("check:boundary"),
      base ? ["--", "--ratchet", "--base-ref", base] : ["--", "--ratchet"],
      `boundary on ${name}`
    );
    // The TS7 ratchet has no absolute mode: without a base it does not run at all.
    assert.deepEqual(
      runs.get("check:ts7-diagnostics-ratchet"),
      base ? relative : undefined,
      `ts7-diagnostics-ratchet on ${name}`
    );
    // Controls: gates without a base-relative mode are called the same way everywhere.
    assert.deepEqual(runs.get("check:deps"), [], name);
    assert.deepEqual(runs.get("check:cycles"), ["--", "--ratchet"], name);
  }
});

test("ci.yml: i18n docs drift is advisory against the candidate base, strict on main", () => {
  const job = loadWorkflow("ci.yml").jobs["docs-sync-strict"];
  assert.ok([job.needs].flat().includes("changes"), "docs-sync-strict receives the candidate base");
  const one = (pick, what) => {
    const found = job.steps.filter(pick);
    assert.equal(found.length, 1, `exactly one ${what} step`);
    return found[0];
  };
  const baseCheckout = one((s) => s.with?.path === ".i18n-base", "base checkout");
  const advisory = one((s) => String(s.run ?? "").includes("--base-report"), "advisory drift");
  const strict = one(
    (s) => s.run === "node scripts/i18n/check-translation-drift.mjs",
    "strict drift"
  );
  assert.match(baseCheckout.uses, /^actions\/checkout@/);
  assert.equal(baseCheckout.with["persist-credentials"], false);
  // Both invocations of the advisory comparison are warn-only: it can never red the job.
  const driftCalls = advisory.run.split("\n").filter((l) => l.includes("check-translation-drift"));
  assert.equal(driftCalls.length, 2);
  for (const call of driftCalls) assert.match(call, / --warn( |$)/);
  assert.match(driftCalls[0], /--root \.i18n-base /);
  for (const { name, ctx, base } of baseRelativeContexts()) {
    const relative = base !== "";
    assert.equal(condition(baseCheckout.if, ctx), relative, `base checkout on ${name}`);
    assert.equal(condition(advisory.if, ctx), relative, `advisory drift on ${name}`);
    assert.equal(condition(strict.if, ctx), !relative, `strict drift on ${name}`);
    // The base tree of the comparison is the PR base on a PR, the candidate base on a candidate.
    if (relative) assert.equal(render(baseCheckout.with.ref, ctx), base, `base ref on ${name}`);
  }
});

test("ci.yml: the Coverage job gets a longer ceiling on a candidate, the same one elsewhere", () => {
  // Dry run on this repository (run 43614500902): "Merge + report + gate" was cancelled at the
  // 45-minute job ceiling on a candidate. A timed-out job is an infra failure for the queue: one
  // more full CI, then a paused base. Pull requests keep their ceiling (60 since #20253).
  const job = loadWorkflow("ci.yml").jobs["test-coverage"];
  const minutes = (ctx) => render(job["timeout-minutes"], ctx);
  assert.equal(minutes(pushContext(CANDIDATE_REF)), 75, "candidate push");
  assert.equal(minutes(pushContext("refs/heads/main")), 60, "push to main");
  assert.equal(minutes(prContext("fix/x")), 60, "pull request");
  assert.equal(minutes(pushContext("refs/heads/main", { eventName: "merge_group" })), 60);
});

// ───────────────────────────── one check profile: candidates and Release-Green ─────────────────────────────
//
// config/quality/release-green-static-profile.json is the one list. What Release-Green holds as a
// hard requirement runs on a candidate push. A gate marked "externalState" reads state outside the
// tested commit (an advisory database, the repository's open code-scanning alerts): on a candidate
// it is advisory, so an advisory published during a batch's CI cannot throw the batch out; on a
// pull request, on main and on every other event it keeps its verdict.

const RELEASE_GREEN = JSON.parse(readText("config/quality/release-green-static-profile.json"));
const PROFILE_ENTRIES = [...RELEASE_GREEN.gates, ...RELEASE_GREEN.exclusions];
const aliasOf = (entry) => entry.alias ?? entry.args[1];
const EXTERNAL_STATE = new Set(
  PROFILE_ENTRIES.filter((entry) => entry.externalState === true).map(aliasOf)
);
// A candidate is a push the queue made: a dispatch on such a ref is not one (gateMode.mjs agrees).
const CANDIDATE_ADVISORY =
  "${{ github.event_name == 'push' && startsWith(github.ref, 'refs/heads/omni-queue/') }}";
const QUALITY_BAG = "Quality gates (all, non-fail-fast)";
// Where the external-state gates run as their own step (the quality bag aside).
const EXTERNAL_SITES = [
  ["ci.yml", "lint", "npm run audit:deps"],
  ["ci.yml", "quality-gate", "npm run check:codeql-ratchet"],
  ["ci.yml", "quality-extended", "npm run check:vuln-ratchet -- --ratchet"],
  ["quality.yml", "lint-guard", "npm run check:codeql-ratchet"],
];

const stepEnv = (step, ctx) =>
  Object.fromEntries(
    Object.entries(step.env ?? {}).map(([key, value]) => [key, String(render(value, ctx) ?? "")])
  );
const words = (line) =>
  line
    .trim()
    .split(/\s+/)
    .map((w) => w.replace(/^"|"$/g, ""));

/** Whether a command line runs `gate` (by alias, or by its script command) with its arguments. */
function invokes(line, gate) {
  const w = words(line);
  const has = (seq) => w.some((_, i) => seq.every((s, j) => w[i + j] === s));
  const head =
    has(["npm", "run", gate.args[1]]) ||
    (typeof gate.command === "string" && !gate.command.includes("&&") && has(words(gate.command)));
  return head && gate.args.slice(2).every((arg) => arg === "--" || w.includes(arg));
}

let candidateRunsCache = null;
const bagRuns = new Map();
const loadProfileWorkflows = () =>
  Object.fromEntries(Object.values(PROFILES).map((file) => [file, loadWorkflow(file)]));
const PROFILE_OF = Object.fromEntries(Object.entries(PROFILES).map(([name, file]) => [file, name]));
/**
 * Jobs whose failure reds the workflow's Gate: in its admission-verdict `needs` AND `required` in
 * config/quality/admission-policy.json (scripts/quality/admission-verdict.mjs skips a job whose
 * `disposition` is "advisory").
 */
const adjudicated = (file, wf) => {
  const rules = policy.profiles[PROFILE_OF[file]]?.jobs ?? {};
  return new Set(
    [wf.jobs["admission-verdict"]?.needs ?? []]
      .flat()
      .filter((id) => rules[id]?.disposition === "required")
  );
};
// A command line that is the step's whole `run:`: no conditional, chain, pipe, substitution,
// background `&` (not `&&`, not a redirection) or leading `!` can keep its exit status from
// failing the step. Accepted limit: a script the line calls can still hide `|| true` inside.
const SHELL_SHAPE =
  /&&|\|\||[;|`]|\$\(|(?<![&<>])&(?![&>])|^\s*!|^\s*(if|then|else|elif|fi|for|while|until|case|do|done)\b/;

/**
 * Every command a candidate push runs where it can turn the workflow's Gate red: jobs the
 * `admission-verdict` job of that workflow reads, scheduled by the evaluator, steps whose `if:`
 * holds. Each site says whether its failure is advisory there and whether its shape is accepted
 * as blocking: the step's whole `run:` is that one command, or the command is an entry of the
 * quality bag, which is executed (fake npm) green, then with every gate red to read which
 * failures it counts. Comment lines are not sites. `workflows` (file → parsed workflow) lets a
 * test probe an in-memory mutation.
 */
function candidateRuns(t, workflows = null) {
  if (!workflows && candidateRunsCache) return candidateRunsCache;
  const runs = [];
  for (const [file, wf] of Object.entries(workflows ?? loadProfileWorkflows())) {
    const ctx = withChanges(pushContext(CANDIDATE_REF));
    const scheduled = scheduledJobs(wf, ctx);
    const gate = adjudicated(file, wf);
    assert.ok(gate.size > 0, `${file}: admission-verdict needs`);
    for (const [id, job] of Object.entries(wf.jobs)) {
      if (!scheduled[id] || !gate.has(id)) continue;
      const jobAdvisory = truthy(render(job["continue-on-error"] ?? false, ctx));
      for (const step of job.steps ?? []) {
        const stepCtx = { ...ctx, __success: true };
        if (typeof step.run !== "string" || !condition(step.if, stepCtx)) continue;
        const where = `${file}:${id}:${step.name ?? step.run.split("\n")[0]}`;
        const advisory = jobAdvisory || truthy(render(step["continue-on-error"] ?? false, stepCtx));
        if (!step.run.includes('"check:$g"')) {
          const lines = step.run
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line && !line.startsWith("#"));
          const accepted = lines.length === 1 && !SHELL_SHAPE.test(lines[0]);
          for (const line of lines) runs.push({ where, line, advisory, accepted, step, stepCtx });
          continue;
        }
        const env = stepEnv(step, stepCtx);
        const key = `${step.run}\0${JSON.stringify(env)}`;
        if (!bagRuns.has(key)) {
          const green = runStep(t, step, env);
          assert.equal(green.code, 0, `${where}: ${green.stderr}`);
          // Every gate red at once: the loop's closing error names each one that counted.
          const red = runStep(t, step, { ...env, FAKE_NPM_RC: "1" });
          const counted = /gate\(s\) failed: (.*)/.exec(red.stdout)?.[1].split(" ") ?? [];
          bagRuns.set(key, { npmArgs: green.npmArgs, counted });
        }
        const { npmArgs, counted } = bagRuns.get(key);
        for (const [script, args] of npmRuns(npmArgs)) {
          const blocks =
            counted.includes(script) || counted.includes(script.replace(/^check:/, ""));
          const line = ["npm", "run", script, ...args].join(" ");
          runs.push({ where, line, advisory: advisory || !blocks, accepted: true });
        }
      }
    }
  }
  if (!workflows) candidateRunsCache = runs;
  return runs;
}

// A hard gate whose only blocking site on a candidate has a shape the check does not accept
// (a multi-line script) is named here: where it runs and why that still blocks. An entry is
// refused once the gate has an accepted blocking site.
const CANDIDATE_HARD_GATE_EXCEPTIONS = new Map([
  [
    "check:boundary:ratchet",
    {
      // `if [ -n "$PR_BASE_SHA" ]; then npm run check:boundary:ratchet -- --base-ref …; else
      // npm run check:boundary:ratchet; fi`: both branches run the gate as the step's last
      // command under `bash -e`, so its exit status is the step's (base-relative on a candidate,
      // pinned by "ci.yml: the boundary ratchet is base-relative on a candidate, absolute on
      // main"). The same script also blocks in the quality bag as `check:boundary -- --ratchet`.
      where: "ci.yml:lint:Boundary ratchet (open-sse → src)",
    },
  ],
]);

/** What keeps the profile's hard gates from making a candidate red: [] when nothing does. */
function hardGateFindings(t, runs) {
  const findings = [];
  for (const gate of RELEASE_GREEN.gates.filter((g) => g.kind === "hard")) {
    const found = runs.filter((r) => invokes(r.line, gate));
    const accepted = found.filter((r) => r.accepted);
    const exception = CANDIDATE_HARD_GATE_EXCEPTIONS.get(gate.id);
    if (exception) {
      const site = found.find((r) => r.where === exception.where && !r.advisory);
      if (accepted.some((r) => !r.advisory))
        findings.push(`${gate.id}: has an accepted blocking site, drop its exception`);
      else if (!site) findings.push(`${gate.id}: does not block at ${exception.where}`);
      else findings.push(...exceptionBehaviour(t, gate, site));
      continue;
    }
    if (!accepted.length) findings.push(`${gate.id}: never runs on a candidate push`);
    else if (!EXTERNAL_STATE.has(gate.args[1]) && !accepted.some((r) => !r.advisory))
      findings.push(`${gate.id}: never blocks a candidate push`);
  }
  return findings;
}

/**
 * What every exception entry must also pass, by behaviour: its step, run on the candidate
 * context with the fake npm, exits zero with the gate green and non-zero with the gate red.
 */
function exceptionBehaviour(t, gate, site) {
  const env = stepEnv(site.step, site.stepCtx);
  const green = runStep(t, site.step, env);
  const red = runStep(t, site.step, { ...env, FAKE_NPM_RC: "1" });
  const ran = npmRuns(red.npmArgs).has(gate.args[1]);
  return [
    ...(green.code === 0 ? [] : [`${gate.id}: its exception step fails with the gate green`]),
    ...(red.code !== 0 && ran ? [] : [`${gate.id}: its exception step passes with the gate red`]),
  ];
}

// Steps advisory before this task, for their own reasons, on every event (literal `true`).
const PRE_EXISTING_ADVISORY = new Map([
  // The coverage artifact is absent when a flaky shard skipped Coverage; --allow-missing follows.
  ["ci.yml:quality-gate:actions/download-artifact", "coverage-report download"],
  // check:circular-deps is a drift item of the profile, never blocking.
  ["ci.yml:quality-extended:Circular deps (dpdm; advisory)", "drift gate"],
  // A failed install surfaces as INCOMPLETE in the ratchets after it (a red step), never a pass.
  ["ci.yml:quality-extended:Install advisory security scanners (gitleaks/osv/oasdiff)", "install"],
  // Prose lint, warning-first (docs-lint is advisory as a job too).
  ["ci.yml:docs-lint:Vale prose lint (Microsoft style, advisory)", "prose lint"],
  // #7336: hardening the heavy Windows prebuild check.
  [
    "ci.yml:electron-package-smoke:Prepare Electron standalone (Windows prebuild verification)",
    "#7336",
  ],
  // Third-party uploads and artifacts that may legitimately be absent: reporting only.
  ["ci.yml:test-vitest:Upload test results to Trunk (advisory)", "upload"],
  ["ci.yml:test-coverage:Upload coverage to Codecov (informational)", "upload"],
  ["ci.yml:coverage-pr-comment:Download coverage artifact", "artifact"],
  ["ci.yml:test-e2e:Upload test results to Trunk (advisory)", "upload"],
  ["ci.yml:ci-summary:Download i18n results", "artifact"],
  // Same install as ci.yml; the required workflow scanners have their own verified install.
  ["quality.yml:fast-gates:Install security scanners (gitleaks/osv/oasdiff)", "install"],
  // TS7 shadow: the 6.x typecheck and the TS7 ratchet in the bag stay authoritative.
  ["quality.yml:fast-gates:Typecheck (core) — TS7 native shadow (advisory)", "shadow"],
]);
const stepKey = (file, id, step) =>
  `${file}:${id}:${step.name ?? String(step.uses ?? step.run).split("@")[0]}`;
/** The event contexts a candidate must be told apart from. */
const nonCandidateContexts = () => [
  ...baseRelativeContexts().filter((c) => c.name !== "candidate push"),
  {
    name: "workflow_dispatch of an omni-queue ref",
    ctx: withChanges(pushContext("refs/heads/omni-queue/x", { eventName: "workflow_dispatch" })),
  },
];

/**
 * Step-level continue-on-error, for both files. A literal `true` is a pre-existing advisory step
 * (named above). An expression true on ANY modelled context is a finding, unless it is exactly
 * the candidate expression on a step that runs only external-state gates.
 */
function advisoryFindings(workflows) {
  const findings = [];
  const contexts = [
    { name: "candidate push", ctx: withChanges(pushContext(CANDIDATE_REF)) },
    ...nonCandidateContexts(),
  ];
  const seen = new Set();
  for (const [file, wf] of Object.entries(workflows)) {
    for (const [id, job] of Object.entries(wf.jobs)) {
      for (const step of job.steps ?? []) {
        const coe = step["continue-on-error"];
        if (coe === undefined) continue;
        const key = stepKey(file, id, step);
        if (PRE_EXISTING_ADVISORY.has(key)) {
          seen.add(key);
          if (coe !== true) findings.push(`${key}: pre-existing advisory step changed`);
          continue;
        }
        const on = contexts.filter(({ ctx }) => truthy(render(coe, ctx))).map((c) => c.name);
        if (!on.length) continue;
        if (coe !== CANDIDATE_ADVISORY) {
          findings.push(`${key}: advisory on ${on.join(", ")}`);
          continue;
        }
        const aliases = [...String(step.run ?? "").matchAll(/\bnpm run ([a-z][\w:-]*)/g)];
        if (!aliases.length) findings.push(`${key}: advisory on a candidate, runs no gate`);
        for (const [, alias] of aliases) {
          if (!EXTERNAL_STATE.has(alias)) findings.push(`${key}: ${alias} is not external state`);
        }
      }
    }
  }
  for (const key of PRE_EXISTING_ADVISORY.keys()) {
    if (!seen.has(key)) findings.push(`${key}: stale pre-existing advisory entry`);
  }
  return findings;
}

/** In-memory copy of the two workflows with `mutate(ci, quality)` applied. */
function mutatedWorkflows(mutate) {
  const copy = loadProfileWorkflows();
  mutate(copy["ci.yml"], copy["quality.yml"]);
  return copy;
}
const stepRunning = (job, run) => {
  const index = job.steps.findIndex((s) => s.run === run);
  assert.ok(index >= 0, `step "${run}"`);
  return index;
};
const ROUTE_VALIDATION = "npm run check:route-validation:t06";
const TLA_ORDER = "npm run check:test-tla-order";

// Git's location variables (the ruled list plus the ones scripts/merge-queue/compose.mjs clears):
// set by git around a hook, they would aim any git call of a fixture at the caller's repository.
const GIT_LOCATION_VARS = [
  "GIT_DIR",
  "GIT_WORK_TREE",
  "GIT_INDEX_FILE",
  "GIT_OBJECT_DIRECTORY",
  "GIT_ALTERNATE_OBJECT_DIRECTORIES",
  "GIT_COMMON_DIR",
  "GIT_NAMESPACE",
  "GIT_PREFIX",
  "GIT_CEILING_DIRECTORIES",
  "GIT_QUARANTINE_PATH",
  "GIT_SHALLOW_FILE",
  "GIT_GRAFT_FILE",
  "GIT_REPLACE_REF_BASE",
];
/** The environment of every real git call of a fixture: no inherited location, no user config. */
const PROBE_GIT_ENV = () => ({
  ...Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !key.startsWith("GITHUB_") && !GIT_LOCATION_VARS.includes(key)
    )
  ),
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_NOSYSTEM: "1",
  GIT_AUTHOR_NAME: "probe",
  GIT_AUTHOR_EMAIL: "probe@example.invalid",
  GIT_COMMITTER_NAME: "probe",
  GIT_COMMITTER_EMAIL: "probe@example.invalid",
});

/** check-test-masking.mjs in a throwaway repository whose head drops one assert of its base. */
function maskingProbe(t) {
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-masking-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  // One environment for the git calls and the script: the probe's own repository, named
  // explicitly, whatever GIT_* location the caller (a git hook) left in process.env.
  const env = { ...PROBE_GIT_ENV(), GIT_DIR: join(dir, ".git"), GIT_WORK_TREE: dir };
  const git = (...args) => {
    const res = spawnSync("git", ["-C", dir, ...args], { cwd: dir, encoding: "utf8", env });
    assert.equal(res.status, 0, res.stderr);
    return res.stdout.trim();
  };
  git("init", "-q");
  writeFileSync(join(dir, "a.test.ts"), "assert.ok(a);\nassert.ok(b);\n");
  git("add", "a.test.ts");
  git("commit", "-q", "-m", "base");
  const base = git("rev-parse", "HEAD");
  writeFileSync(join(dir, "a.test.ts"), "assert.ok(a);\n");
  git("commit", "-q", "-am", "head");
  const script = new URL("scripts/check/check-test-masking.mjs", ROOT).pathname;
  const run = (extra) =>
    spawnSync(process.execPath, [script], {
      cwd: dir,
      encoding: "utf8",
      env: { ...env, ...extra },
    });
  return { base, run };
}

test("ci.yml: check:test-masking runs on a candidate against the candidate base, not on main pushes", (t) => {
  const wf = loadWorkflow("ci.yml");
  const lint = wf.jobs.lint;
  assertBaseAvailable(lint, "lint");
  const found = lint.steps.filter((s) => s.run === "npm run check:test-masking");
  assert.equal(found.length, 1, "one test-masking step in lint");
  const [step] = found;
  assert.equal(step["continue-on-error"], undefined, "it blocks the candidate");
  for (const { name, ctx, base } of baseRelativeContexts()) {
    const candidate = name === "candidate push";
    assert.equal(condition(step.if, ctx), candidate, `lint test-masking step on ${name}`);
    if (candidate) assert.equal(render(step.env.GITHUB_BASE_SHA, ctx), base, "the candidate base");
  }
  const cand = withChanges(pushContext(CANDIDATE_REF));
  assert.equal(scheduledJobs(wf, cand).lint, true);
  const res = runStep(t, step, stepEnv(step, cand));
  assert.equal(res.code, 0, res.stderr);
  assert.deepEqual(res.npmArgs, ["run", "check:test-masking"]);
  // The script diffs against GITHUB_BASE_SHA, ahead of any GITHUB_BASE_REF: in a throwaway
  // repository whose head drops one assert, the SHA alone (next to an unresolvable ref) finds it.
  const probe = maskingProbe(t);
  const withSha = probe.run({ GITHUB_BASE_SHA: probe.base, GITHUB_BASE_REF: "no-such-branch" });
  assert.equal(withSha.status, 1, withSha.stdout + withSha.stderr);
  assert.match(withSha.stderr, /a\.test\.ts: asserts 2 → 1/);
  const noBase = probe.run({});
  assert.equal(noBase.status, 0, noBase.stdout + noBase.stderr);
  assert.match(noBase.stdout, /sem base ref/);
  // Pull requests keep their own step in PR Test Policy, untouched; it never runs on a push.
  const policy = wf.jobs["pr-test-policy"];
  const prStep = policy.steps.find((s) => s.name === "Detect test-masking (weakened assertions)");
  assert.equal(prStep.run, "npm run check:test-masking");
  assert.equal(prStep.env, undefined);
  assert.equal(scheduledJobs(wf, withChanges(prContext("fix/x")))["pr-test-policy"], true);
  assert.equal(scheduledJobs(wf, cand)["pr-test-policy"], false);
  assert.equal(
    scheduledJobs(wf, withChanges(pushContext("refs/heads/main")))["pr-test-policy"],
    false
  );
});

test("external-state gates are advisory on a candidate, blocking on a pull request and on main", (t) => {
  // The classification (evidence per gate in the task report): npm audit reads the registry's
  // advisory database, osv-scanner the OSV database, the CodeQL ratchet the repository's open
  // code-scanning alerts. check:deps, check:provider-asset-provenance and
  // check:free-catalog-evidence read only the tree and the clone's history: not external.
  assert.deepEqual([...EXTERNAL_STATE].sort(), [
    "audit:deps",
    "check:codeql-ratchet",
    "check:vuln-ratchet",
  ]);
  for (const [file, id, run] of EXTERNAL_SITES) {
    const job = loadWorkflow(file).jobs[id];
    const found = job.steps.filter((s) => s.run === run);
    assert.equal(found.length, 1, `${file}:${id}: one "${run}" step`);
    const [step] = found;
    assert.equal(job["continue-on-error"], undefined, `${file}:${id}: the job keeps its verdict`);
    assert.equal(step["continue-on-error"], CANDIDATE_ADVISORY, `${file}:${id}: ${run}`);
    for (const { name, ctx } of baseRelativeContexts()) {
      const advisory = truthy(render(step["continue-on-error"], ctx));
      assert.equal(advisory, name === "candidate push", `${file}:${id}: ${run} on ${name}`);
    }
  }
  // The quality bag runs the OSV ratchet inside its non-fail-fast loop: there the list of
  // external-state gates is the step's own, filled on a candidate only.
  const step = loadWorkflow("quality.yml").jobs["fast-gates"].steps.find(
    (s) => s.name === QUALITY_BAG
  );
  for (const { name, ctx } of baseRelativeContexts()) {
    const env = stepEnv(step, ctx);
    const res = runStep(t, step, { ...env, FAKE_NPM_FAIL: "check:vuln-ratchet" });
    if (name === "candidate push") {
      assert.equal(res.code, 0, `${name}: ${res.stderr}`);
      assert.match(res.stdout, /::warning::check:vuln-ratchet failed/);
      assert.doesNotMatch(res.stdout, /gate\(s\) failed/);
    } else {
      assert.equal(res.code, 1, `the OSV ratchet blocks on ${name}`);
      assert.match(res.stdout, /1 gate\(s\) failed: vuln-ratchet/, name);
    }
    // Control: a gate that reads only the tree blocks everywhere, the candidate included.
    const deps = runStep(t, step, { ...env, FAKE_NPM_FAIL: "check:deps" });
    assert.equal(deps.code, 1, `check:deps blocks on ${name}`);
  }
});

test("every hard gate of the Release-Green profile runs on a candidate push", (t) => {
  const runs = candidateRuns(t);
  const hard = RELEASE_GREEN.gates.filter((gate) => gate.kind === "hard");
  assert.ok(hard.length >= 50, `the real profile (${hard.length} hard gates)`);
  // Every hard gate has an accepted site in a job Gate / CI or Gate / Quality reads, and one that
  // blocks unless the gate reads external state; a named exception blocks where it says.
  assert.deepEqual(
    hardGateFindings(t, runs),
    [],
    "hard Release-Green gates a candidate cannot fail"
  );
  for (const id of CANDIDATE_HARD_GATE_EXCEPTIONS.keys()) {
    assert.ok(
      hard.some((gate) => gate.id === id),
      `exception ${id} names a hard gate`
    );
  }
  // An exception is refused once its gate has an accepted blocking site.
  const accepted = { where: "ci.yml:lint:x", advisory: false, accepted: true };
  assert.deepEqual(
    hardGateFindings(t, [...runs, { ...accepted, line: "npm run check:boundary:ratchet" }]),
    ["check:boundary:ratchet: has an accepted blocking site, drop its exception"]
  );
  // Controls: the matcher needs the profile's arguments, and an unknown gate is never found.
  const glossary = hard.find((gate) => gate.id === "i18n:check-glossary:zh-CN");
  assert.ok(runs.some((r) => invokes(r.line, glossary)));
  assert.ok(!runs.some((r) => invokes(r.line, { ...glossary, args: [...glossary.args, "--x"] })));
  assert.ok(!runs.some((r) => invokes(r.line, { args: ["run", "check:not-a-gate"] })));
  const masking = runs.filter((r) => invokes(r.line, { args: ["run", "check:test-masking"] }));
  assert.deepEqual(
    masking.map((r) => [r.where, r.advisory, r.accepted]),
    [["ci.yml:lint:Detect test-masking against the omni-queue candidate base", false, true]]
  );
});

test("every externalState gate of the profile is advisory on the candidate", (t) => {
  // The mark is a boolean that only ever says `true`; a gate without it reads only the tree.
  for (const entry of PROFILE_ENTRIES) {
    assert.ok([undefined, true].includes(entry.externalState), `${aliasOf(entry)}: externalState`);
  }
  assert.ok(EXTERNAL_STATE.size > 0, "the profile marks its external-state gates");
  const runs = candidateRuns(t);
  for (const alias of EXTERNAL_STATE) {
    const found = runs.filter((r) => invokes(r.line, { args: ["run", alias] }));
    assert.ok(found.length > 0, `${alias} runs on a candidate push`);
    for (const r of found)
      assert.equal(r.advisory, true, `${alias} blocks a candidate at ${r.where}`);
  }
  // Converse: a step advisory on a candidate is advisory on no other event, and only around
  // external-state gates (the steps advisory everywhere before this task are named apart).
  assert.deepEqual(advisoryFindings(loadProfileWorkflows()), []);
  const cand = withChanges(pushContext(CANDIDATE_REF));
  const exempted = [];
  for (const [file, wf] of Object.entries(loadProfileWorkflows())) {
    for (const [id, job] of Object.entries(wf.jobs)) {
      for (const step of job.steps ?? []) {
        if (step["continue-on-error"] === CANDIDATE_ADVISORY) exempted.push([file, id, step.run]);
      }
    }
  }
  assert.deepEqual(exempted, EXTERNAL_SITES, "the step-level exemptions");
  const bag = loadWorkflow("quality.yml").jobs["fast-gates"].steps.find(
    (s) => s.name === QUALITY_BAG
  );
  const listed = String(render(bag.env.EXTERNAL_STATE_GATES, cand)).split(/\s+/).filter(Boolean);
  assert.ok(listed.length > 0, "the quality bag lists its external-state gates on a candidate");
  for (const name of listed) assert.ok(EXTERNAL_STATE.has(`check:${name}`), name);
  for (const { name, ctx } of nonCandidateContexts()) {
    assert.equal(render(bag.env.EXTERNAL_STATE_GATES, ctx), "", `empty on ${name}`);
  }
});

test("a hard gate counts only where it can make the candidate red", (t) => {
  assert.deepEqual(hardGateFindings(t, candidateRuns(t)), [], "the real workflows");
  const at = (ci) => ci.jobs.lint.steps[stepRunning(ci.jobs.lint, ROUTE_VALIDATION)];
  const tla = (ci) => ci.jobs.lint.steps[stepRunning(ci.jobs.lint, TLA_ORDER)];
  const boundary = (ci) =>
    ci.jobs.lint.steps.find((s) => s.name === "Boundary ratchet (open-sse → src)");
  // [gate the mutation must surface, mutation of the parsed ci.yml]
  const cases = {
    // Runs on a candidate, in a job that Gate / CI does not read.
    "moved to ci-summary": [
      "check:route-validation:t06",
      (ci) => {
        const [step] = ci.jobs.lint.steps.splice(stepRunning(ci.jobs.lint, ROUTE_VALIDATION), 1);
        ci.jobs["ci-summary"].steps.unshift(step);
      },
    ],
    "behind a shell conditional": [
      "check:route-validation:t06",
      (ci) => {
        at(ci).run =
          `if [ "$GITHUB_EVENT_NAME" = pull_request ]; then\n  ${ROUTE_VALIDATION}\nfi\n`;
      },
    ],
    "a comment line": [
      "check:route-validation:t06",
      (ci) => {
        at(ci).run = `# ${ROUTE_VALIDATION}\ntrue\n`;
      },
    ],
    "pull-request only": [
      "check:route-validation:t06",
      (ci) => {
        at(ci).if = "github.event_name == 'pull_request'";
      },
    ],
    // P1b, P2b: a single command whose exit status cannot fail the step.
    "in the background": [
      "check:test-tla-order",
      (ci) => {
        tla(ci).run = `${TLA_ORDER} &`;
      },
    ],
    negated: [
      "check:test-tla-order",
      (ci) => {
        tla(ci).run = `! ${TLA_ORDER}`;
      },
    ],
    // P25: in Gate / CI's needs, but a job the admission policy holds advisory (i18n).
    "moved to a job the admission policy holds advisory": [
      "check:test-tla-order",
      (ci) => {
        const [step] = ci.jobs.lint.steps.splice(stepRunning(ci.jobs.lint, TLA_ORDER), 1);
        delete ci.jobs.i18n["continue-on-error"];
        ci.jobs.i18n.steps.unshift(step);
      },
    ],
    // P5: the named exception's step can no longer fail.
    "the boundary exception made unfailable": [
      "check:boundary:ratchet",
      (ci) => {
        boundary(ci).run = boundary(ci).run.replace(
          /(npm run check:boundary:ratchet[^\n]*)/g,
          "$1 || true"
        );
      },
    ],
  };
  const survivors = Object.entries(cases)
    .filter(([, [gate, mutate]]) => {
      const findings = hardGateFindings(t, candidateRuns(t, mutatedWorkflows(mutate)));
      return !findings.some((f) => f.startsWith(`${gate}: `));
    })
    .map(([name]) => name);
  assert.deepEqual(survivors, [], "mutations the check does not see");
});

test("a step advisory on a candidate is advisory on no other event", () => {
  assert.deepEqual(advisoryFindings(loadProfileWorkflows()), [], "the real workflows");
  const vuln = "npm run check:vuln-ratchet -- --ratchet";
  const lintStep = (ci) => ci.jobs.lint.steps[stepRunning(ci.jobs.lint, ROUTE_VALIDATION)];
  const cases = {
    "the OSV ratchet also advisory on pull requests": (ci) => {
      const job = ci.jobs["quality-extended"];
      job.steps[stepRunning(job, vuln)]["continue-on-error"] =
        "${{ startsWith(github.ref, 'refs/heads/omni-queue/') || github.event_name == 'pull_request' }}";
    },
    "a tree-only gate advisory everywhere": (ci) => {
      lintStep(ci)["continue-on-error"] = true;
    },
    "a tree-only gate advisory on a candidate": (ci) => {
      lintStep(ci)["continue-on-error"] = CANDIDATE_ADVISORY;
    },
    // P23: an expression that is never true on a candidate is still advisory somewhere.
    "a tree-only gate advisory on main only": (ci) => {
      lintStep(ci)["continue-on-error"] = "${{ github.ref == 'refs/heads/main' }}";
    },
  };
  const survivors = Object.entries(cases)
    .filter(([, mutate]) => advisoryFindings(mutatedWorkflows(mutate)).length === 0)
    .map(([name]) => name);
  assert.deepEqual(survivors, [], "mutations the check does not see");
});

test("a workflow_dispatch of an omni-queue ref is not a candidate", (t) => {
  // The queue only ever pushes its candidates; a dispatch on such a ref is someone's manual run.
  const ctx = withChanges(
    pushContext("refs/heads/omni-queue/x", { eventName: "workflow_dispatch" })
  );
  for (const [file, id, run] of EXTERNAL_SITES) {
    const job = loadWorkflow(file).jobs[id];
    const step = job.steps[stepRunning(job, run)];
    assert.equal(truthy(render(step["continue-on-error"], ctx)), false, `${file}:${id}: ${run}`);
  }
  const lint = loadWorkflow("ci.yml").jobs.lint;
  const masking = lint.steps[stepRunning(lint, "npm run check:test-masking")];
  assert.equal(condition(masking.if, ctx), false, "the candidate-only test-masking step");
  const bag = loadWorkflow("quality.yml").jobs["fast-gates"].steps.find(
    (s) => s.name === QUALITY_BAG
  );
  const env = stepEnv(bag, ctx);
  assert.equal(env.EXTERNAL_STATE_GATES, "");
  const res = runStep(t, bag, { ...env, FAKE_NPM_FAIL: "check:vuln-ratchet" });
  assert.equal(res.code, 1, "the OSV ratchet blocks a dispatch");
});

test("ci.yml and quality.yml install the same pinned gitleaks, osv-scanner and oasdiff", () => {
  // A scanner release during a batch's CI must not red check:secrets / check:openapi-breaking on
  // the candidate (those gates judge the tree), nor give one gate two verdicts on one candidate.
  const TOOLS = { "gitleaks/gitleaks": "gitleaks", "google/osv-scanner": "osv-scanner" };
  const toolOf = (repo) => TOOLS[repo] ?? (/\/oasdiff$/i.test(repo) ? "oasdiff" : null);
  const installs = {};
  for (const file of Object.values(PROFILES)) {
    for (const [id, job] of Object.entries(loadWorkflow(file).jobs)) {
      for (const step of job.steps ?? []) {
        const run = String(step.run ?? "");
        const vars = Object.fromEntries(
          [...run.matchAll(/^\s*([A-Z_]+_VERSION)=(\S+)\s*$/gm)].map((m) => [m[1], m[2]])
        );
        for (const [, args] of run.matchAll(/gh release download ([^\n]*)/g)) {
          const w = words(args);
          const tool = toolOf(w[w.indexOf("--repo") + 1]);
          if (!tool) continue;
          // `gh release download --repo …` without a tag downloads the latest release.
          const tag = w[0].startsWith("--") ? "latest" : (vars[w[0].replace(/^\$/, "")] ?? w[0]);
          (installs[tool] ??= []).push([`${file}:${id}`, tag]);
        }
      }
    }
  }
  assert.deepEqual(Object.keys(installs).sort(), ["gitleaks", "oasdiff", "osv-scanner"]);
  for (const [tool, sites] of Object.entries(installs)) {
    assert.deepEqual(
      sites.map(([where]) => where.split(":")[0]).sort(),
      ["ci.yml", "quality.yml"],
      `${tool}: installed once in each workflow`
    );
    for (const [where, tag] of sites) {
      assert.match(tag, /^v\d+\.\d+\.\d+$/, `${tool} at ${where} is pinned, not ${tag}`);
    }
    assert.equal(new Set(sites.map(([, tag]) => tag)).size, 1, `${tool}: ${JSON.stringify(sites)}`);
  }
});

test("the test-masking probe ignores an inherited GIT_DIR / GIT_INDEX_FILE (suite run from a git hook)", (t) => {
  // A decoy repository of its own, in a temp directory, built with a clean environment.
  const decoy = mkdtempSync(join(tmpdir(), "omni-queue-masking-decoy-"));
  t.after(() => rmSync(decoy, { recursive: true, force: true }));
  const inDecoy = (...args) => {
    const res = spawnSync("git", ["-C", decoy, ...args], {
      encoding: "utf8",
      env: PROBE_GIT_ENV(),
    });
    assert.equal(res.status, 0, `git ${args.join(" ")}: ${res.stderr}`);
    return res.stdout.trim();
  };
  inDecoy("init", "-q");
  writeFileSync(join(decoy, "d.txt"), "decoy\n");
  inDecoy("add", "d.txt");
  inDecoy("commit", "-q", "-m", "decoy");
  const head = inDecoy("rev-parse", "HEAD");
  const index = join(decoy, "inherited-index");

  const saved = { GIT_DIR: process.env.GIT_DIR, GIT_INDEX_FILE: process.env.GIT_INDEX_FILE };
  const restore = () => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
  t.after(restore);
  process.env.GIT_DIR = join(decoy, ".git");
  process.env.GIT_INDEX_FILE = index;
  try {
    const probe = maskingProbe(t);
    const withSha = probe.run({ GITHUB_BASE_SHA: probe.base });
    assert.equal(withSha.status, 1, withSha.stdout + withSha.stderr);
    assert.match(withSha.stderr, /a\.test\.ts: asserts 2 → 1/);
  } finally {
    restore();
  }
  assert.equal(inDecoy("rev-parse", "HEAD"), head, "no commit landed in the decoy");
  assert.equal(inDecoy("rev-list", "--count", "HEAD"), "1");
  assert.equal(inDecoy("status", "--porcelain"), "", "the decoy's index and tree are unchanged");
  assert.equal(existsSync(index), false, "the inherited index was never written");
});

test("the contexts these tests model are the workflows' real triggers", () => {
  // Every expression above is judged on: a candidate push, a pull request, a push to main, a
  // merge group, a dispatch, a dispatch of an omni-queue ref. A new trigger (or push branch)
  // starts runs none of them models: add a context for it in baseRelativeContexts() /
  // nonCandidateContexts() before widening this list.
  const modelled = [
    ...baseRelativeContexts().map((c) => c.ctx),
    ...nonCandidateContexts().map((c) => c.ctx),
  ];
  const events = [...new Set(modelled.map((ctx) => ctx.github.event_name))].sort();
  const pushRefs = new Set(
    modelled.filter((ctx) => ctx.github.event_name === "push").map((ctx) => ctx.github.ref)
  );
  for (const file of Object.values(PROFILES)) {
    const on = triggers(loadWorkflow(file));
    assert.deepEqual(Object.keys(on).sort(), events, `${file}: triggers vs modelled events`);
    assert.deepEqual(on.push.branches, ["main", "omni-queue/**"], `${file}: push branches`);
    for (const branch of on.push.branches) {
      assert.ok(
        [...pushRefs].some((ref) => branchFilterMatches(branch, ref.replace(/^refs\/heads\//, ""))),
        `${file}: push to ${branch} has a modelled context`
      );
    }
  }
});
