// The merge queue's base check runs the unit suite in parallel shards (quality.yml →
// base-check-unit), not unsharded inside fast-gates' TIA step.
//
// On an omni-queue/** base-check candidate (the bare base, changes.outputs.candidateSource
// "self") the TIA step used to run `npm run test:unit:ci` unsharded: 75-90 min, the long pole of
// every base check, and on 2026-11-21 one stuck test held the shadow queue for ~6 hours (run
// 44902746432, until the queue's own checksTimeoutMinutes gave up and retried).
//
// Pinned here:
//   1. the TIA step's base-check branch no longer runs the suite (EXECUTED with a fake npm);
//   2. the shard job runs only on a base-check candidate, on a hosted runner, with its own time
//      limit, fail-fast off, and the environment the unsharded run had;
//   3. every shard's check name is the same check as "Fast Quality Gates" for the queue's real
//      classifier (normalizeCheckName / extractSignatures / classifyRed), which is what makes a
//      red base check explain a batch whose TIA subset failed;
//   4. the aggregate (Gate / Quality) needs the shards, fails when one is red, and passes when
//      the job is skipped on every other event.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";
import {
  classifyRed,
  extractSignatures,
  normalizeCheckName,
} from "../../../scripts/merge-queue/classify.mjs";
import { evaluateAdmission } from "../../../scripts/quality/admission-verdict.mjs";

const ROOT = new URL("../../../", import.meta.url);
const read = (rel) => readFileSync(new URL(rel, ROOT), "utf8");
const workflow = load(read(".github/workflows/quality.yml"));
const ciWorkflow = load(read(".github/workflows/ci.yml"));
const policy = JSON.parse(read("config/quality/admission-policy.json"));
const queueConfig = JSON.parse(read("config/merge-queue/config.json"));

const JOB_ID = "base-check-unit";
const FAST_GATES = workflow.jobs["fast-gates"];
const TIA_STEP = "Impacted unit tests (TIA subset; blocking)";
const BASE_CHECK_CONDITION =
  "${{ startsWith(github.ref, 'refs/heads/omni-queue/') && needs.changes.outputs.candidateSource == 'self' }}";
const SHA = "c".repeat(40);

const shardJob = () => {
  const job = workflow.jobs[JOB_ID];
  assert.ok(job, `quality.yml must define the ${JOB_ID} job`);
  return job;
};
const shards = () => shardJob().strategy?.matrix?.shard ?? [];
const shardName = (shard) =>
  String(shardJob().name).replace(/\$\{\{\s*matrix\.shard\s*\}\}/g, String(shard));

/** Runs a workflow `run:` script under bash with fake npm/node/git; returns what each saw. */
function runScript(t, script, env) {
  const dir = mkdtempSync(join(tmpdir(), "base-check-shards-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const fake = (name, body) => {
    const path = join(dir, name);
    writeFileSync(path, `#!/usr/bin/env bash\n${body}\n`);
    chmodSync(path, 0o755);
  };
  fake("npm", `printf '%s\\n' "$*" >> "$FAKE_LOG"; exit "\${FAKE_NPM_RC:-0}"`);
  fake("node", `printf 'node %s\\n' "$*" >> "$FAKE_LOG"; exit 0`);
  fake("git", "exit 0");
  const files = {
    FAKE_LOG: join(dir, "calls"),
    GITHUB_STEP_SUMMARY: join(dir, "summary"),
  };
  writeFileSync(files.FAKE_LOG, "");
  writeFileSync(files.GITHUB_STEP_SUMMARY, "");
  writeFileSync(join(dir, "step.sh"), script);
  const res = spawnSync("bash", ["--noprofile", "--norc", "-eo", "pipefail", "step.sh"], {
    cwd: dir,
    encoding: "utf8",
    env: { PATH: `${dir}:${process.env.PATH}`, ...files, ...env },
  });
  const calls = readFileSync(files.FAKE_LOG, "utf8").split("\n").filter(Boolean);
  const selection = (() => {
    try {
      return readFileSync(join(dir, "tia-selection.txt"), "utf8");
    } catch {
      return null;
    }
  })();
  return {
    code: res.status,
    stderr: res.stderr,
    calls,
    selection,
    summary: readFileSync(files.GITHUB_STEP_SUMMARY, "utf8"),
  };
}

test("the TIA step no longer runs the unsharded suite on a base-check candidate", (t) => {
  const step = FAST_GATES.steps.find((s) => s.name === TIA_STEP);
  assert.ok(step, `fast-gates: step "${TIA_STEP}"`);
  assert.doesNotMatch(step.run, /npm run test:unit:ci\b(?!:)/, "no unsharded suite in fast-gates");
  const res = runScript(t, step.run, { CANDIDATE_SOURCE: "self", GITHUB_BASE_SHA: SHA });
  assert.equal(res.code, 0, res.stderr);
  assert.deepEqual(res.calls, [], "neither the suite nor the selector runs on a base check");
  assert.equal(res.selection, "__OMNI_QUEUE_BASE_CHECK__\n", "the selection marker stays");
  assert.match(res.summary, /base-check-unit shards/, "the summary says where the suite runs");
  // Control: a batch candidate still runs the selector (and an empty selection skips).
  const batch = runScript(t, step.run, { CANDIDATE_SOURCE: "trailer", GITHUB_BASE_SHA: SHA });
  assert.equal(batch.code, 0, batch.stderr);
  assert.ok(
    batch.calls.some((c) => c.includes("select-impacted-tests.mjs")),
    batch.calls.join()
  );
});

test("the shard job runs only on an omni-queue base-check candidate, hosted, with limits", () => {
  const job = shardJob();
  assert.deepEqual([job.needs].flat(), ["changes"], "candidateSource comes from changes");
  assert.equal(job.if, BASE_CHECK_CONDITION);
  // The same predicate as the TIA step's base-check branch: wherever that branch skips the
  // suite, the shards run it.
  const tia = FAST_GATES.steps.find((s) => s.name === TIA_STEP);
  assert.equal(tia.env.CANDIDATE_SOURCE, "${{ needs.changes.outputs.candidateSource }}");
  assert.match(tia.run, /if \[ "\$\{CANDIDATE_SOURCE:-\}" = "self" \]; then/);
  // omni-queue candidates contain fork code: never the self-hosted pool.
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.equal(job.strategy["fail-fast"], false, "one red shard must not cancel the others");
  const minutes = job["timeout-minutes"];
  assert.equal(typeof minutes, "number", `${JOB_ID} must declare a numeric timeout-minutes`);
  // At least ci.yml's own unit-shard limit (a shard here carries twice their share of files),
  // and well below fast-gates' and the queue's limits: that is the point of the split.
  const ciShardLimit = ciWorkflow.jobs["test-unit"]["timeout-minutes"];
  assert.ok(minutes >= ciShardLimit, `${minutes} >= ci.yml unit shards' ${ciShardLimit}`);
  assert.ok(minutes < FAST_GATES["timeout-minutes"], `${minutes} < fast-gates' limit`);
  assert.ok(minutes < queueConfig.checksTimeoutMinutes, "below checksTimeoutMinutes");
  // Contiguous shard indexes 1..N, and the name and TEST_SHARD carry the same N.
  const list = shards();
  assert.ok(list.length >= 2, "more than one shard");
  assert.deepEqual(
    list,
    list.map((_, i) => i + 1),
    "shards are 1..N"
  );
  assert.equal(job.name, `Fast Quality Gates (\${{ matrix.shard }}/${list.length})`);
  const run = job.steps.find((s) => s.run === "npm run test:unit:ci:shard");
  assert.ok(run, "a step runs npm run test:unit:ci:shard");
  assert.equal(run.env.TEST_SHARD, `\${{ matrix.shard }}/${list.length}`);
});

test("the shards run with the environment the unsharded run had in fast-gates", () => {
  const job = shardJob();
  assert.deepEqual(job.env, FAST_GATES.env, "DB env vars of fast-gates");
  const uses = (j, prefix) => j.steps.find((s) => String(s.uses ?? "").startsWith(prefix));
  for (const prefix of [
    "actions/checkout@",
    "actions/setup-node@",
    "./.github/actions/npm-ci-retry",
  ]) {
    const mine = uses(job, prefix);
    const theirs = uses(FAST_GATES, prefix);
    assert.ok(mine, `${JOB_ID} uses ${prefix}`);
    assert.deepEqual(mine, theirs, `${prefix} is set up as in fast-gates`);
  }
  assert.equal(uses(job, "actions/checkout@").with["persist-credentials"], false);
  const tia = FAST_GATES.steps.find((s) => s.name === TIA_STEP);
  const run = job.steps.find((s) => s.run === "npm run test:unit:ci:shard");
  for (const key of Object.keys(tia.env)) assert.equal(run.env[key], tia.env[key], key);
});

test("every shard is the check 'Fast Quality Gates' for the queue's classifier", () => {
  assert.equal(FAST_GATES.name, "Fast Quality Gates");
  for (const shard of shards()) {
    const name = shardName(shard);
    assert.equal(normalizeCheckName(name), "Fast Quality Gates", name);
    const [sig] = extractSignatures([{ id: shard, name, conclusion: "failure" }], {});
    assert.equal(sig.check, "Fast Quality Gates", name);
  }
});

test("a red shard on the bare base explains a batch whose TIA subset failed (base-red)", () => {
  // node:test emits no failure annotation: GitHub's generic exit-code line only.
  const generic = [
    { path: null, title: null, message: "Process completed with exit code 1.", level: "failure" },
  ];
  const batch = extractSignatures([{ id: 1, name: "Fast Quality Gates", conclusion: "failure" }], {
    1: generic,
  });
  const name = shardName(shards().at(-1));
  const onBase = (runName) => ({
    baseSha: SHA,
    status: "red",
    signatures: extractSignatures([{ id: 2, name: runName, conclusion: "failure" }], {
      2: generic,
    }),
  });
  const input = (runName) => ({
    signatures: batch,
    baseSha: SHA,
    baseCheck: onBase(runName),
    aggregateChecks: queueConfig.aggregateChecks,
  });
  assert.equal(classifyRed(input(name)).kind, "base-red", name);
  // Control: a base red on another check does not explain it.
  assert.equal(classifyRed(input("Unit Tests (3/8)")).kind, "pr-red");
});

test("Gate / Quality needs the shards: red when one is red, green when the job is skipped", () => {
  const verdict = workflow.jobs["admission-verdict"];
  assert.ok([verdict.needs].flat().includes(JOB_ID), "admission-verdict needs the shards");
  const rule = policy.profiles.quality.jobs[JOB_ID];
  assert.deepEqual(
    { when: rule?.when, disposition: rule?.disposition },
    { when: "omni-queue-base-check", disposition: "required" }
  );
  const changes = (candidateSource) => ({
    code: "true",
    docs: "true",
    i18n: "true",
    workflow: "true",
    testsOnly: "false",
    candidateSource,
  });
  const needs = (candidateSource, result) =>
    Object.fromEntries(
      Object.keys(policy.profiles.quality.jobs).map((id) => [
        id,
        {
          result: id === JOB_ID ? result : "success",
          ...(id === "changes" ? { outputs: changes(candidateSource) } : {}),
        },
      ])
    );
  const verdictOf = (event, candidateSource, result) =>
    evaluateAdmission(
      policy,
      "quality",
      { event, sha: SHA, runId: "7", runAttempt: "1", draft: false },
      needs(candidateSource, result)
    ).verdict;
  // A base-check candidate: the shards are required.
  assert.equal(verdictOf("push", "self", "success"), "PASS");
  for (const result of ["failure", "cancelled", "skipped", "missing"]) {
    assert.equal(verdictOf("push", "self", result), "FAIL", `base check, shards ${result}`);
  }
  // Every other event: a skip passes, a red or cancelled shard job still fails.
  for (const [event, source] of [
    ["push", "trailer"],
    ["push", ""],
    ["pull_request", ""],
    ["workflow_dispatch", ""],
    ["merge_group", ""],
  ]) {
    assert.equal(verdictOf(event, source, "skipped"), "PASS", `${event}/${source}: skipped`);
    assert.equal(verdictOf(event, source, "failure"), "FAIL", `${event}/${source}: failure`);
    assert.equal(verdictOf(event, source, "cancelled"), "FAIL", `${event}/${source}: cancelled`);
  }
});
