// Time limits of the "Fast Quality Gates" job (quality.yml → fast-gates).
//
// On 2026-11-20 (run 44821771451, an omni-queue candidate) `npm run check:cycles -- --ratchet`
// printed "RATCHET OK" and its node process never exited: the gates step sat for 118 min until the
// run was cancelled by hand. Without a job limit a stuck step holds a hosted runner for GitHub's
// 360-minute default, and a stuck candidate costs the merge queue its whole checksTimeoutMinutes.
//
// Two guarantees are pinned here:
//   1. the job has a `timeout-minutes` that leaves room for its longest legitimate run (a TIA
//      subset that selects nearly the whole unit suite runs unsharded in this job: 92.5 min
//      measured; the merge queue's base check runs its suite in the base-check-unit shards since
//      2026-11-21, see quality-base-check-unit-shards.test.mjs) and stays below the queue's own
//      per-candidate limit;
//   2. every `npm run` of the gates step goes through `run_gate` (a per-gate wall-clock limit,
//      one retry after a timeout), and the step still counts failures the way it did: the step is
//      EXECUTED with a fake npm and the limits shortened, not string-matched.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { load } from "js-yaml";

const ROOT = new URL("../../../", import.meta.url);
const workflow = load(readFileSync(new URL(".github/workflows/quality.yml", ROOT), "utf8"));
const queueConfig = JSON.parse(
  readFileSync(new URL("config/merge-queue/config.json", ROOT), "utf8")
);
const job = workflow.jobs["fast-gates"];
const GATES_STEP = "Quality gates (all, non-fail-fast)";
const step = job.steps.find((s) => s.name === GATES_STEP);

// The longest legitimate run of this job: a TIA subset of 6,014 test files on a pull request
// (run 44909506327, 92.5 min, 2026-11-21). The base check no longer runs here.
const LONGEST_RUN_MINUTES = 93;
const FLOOR_MINUTES = 120;

const commandLines = (script) =>
  script
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));

test("fast-gates has a job time limit between its longest run and the queue's limit", () => {
  const minutes = job["timeout-minutes"];
  assert.equal(typeof minutes, "number", "fast-gates must declare a numeric timeout-minutes");
  assert.ok(
    minutes >= FLOOR_MINUTES && minutes > LONGEST_RUN_MINUTES,
    `timeout-minutes ${minutes} must leave room for the ${LONGEST_RUN_MINUTES}-minute TIA subset`
  );
  const queueLimit = queueConfig.checksTimeoutMinutes;
  assert.equal(typeof queueLimit, "number", "config/merge-queue/config.json checksTimeoutMinutes");
  assert.ok(
    minutes < queueLimit,
    `timeout-minutes ${minutes} must stay below the queue's checksTimeoutMinutes ${queueLimit}`
  );
});

test("every npm run of the gates step goes through run_gate", () => {
  assert.ok(step, `fast-gates: step "${GATES_STEP}"`);
  const lines = commandLines(step.run);
  const npmLines = lines.filter((line) => /\bnpm\b/.test(line));
  assert.ok(npmLines.length >= 8, `the step's gate invocations (${npmLines.length})`);
  for (const line of npmLines) {
    assert.match(line, /^run_gate npm run \S/, `not under run_gate: ${line}`);
  }
  // run_gate itself: both attempts under `timeout`, with a KILL after the TERM.
  const limit = /^GATE_TIMEOUT=(\d+)m$/m.exec(step.run);
  assert.ok(limit, "GATE_TIMEOUT=<N>m");
  const perGate = Number(limit[1]);
  assert.ok(perGate >= 3, `GATE_TIMEOUT ${perGate}m must stay well above the slowest gate (~90 s)`);
  assert.ok(2 * perGate < job["timeout-minutes"], "two attempts of one gate fit in the job limit");
  const timeoutCalls = lines.filter((line) => line.startsWith("timeout "));
  assert.equal(timeoutCalls.length, 2, "run_gate runs the gate at most twice");
  for (const call of timeoutCalls) {
    assert.match(call, /^timeout --kill-after=\d+s "\$GATE_TIMEOUT" "\$@" \|\| rc=\$\?$/);
  }
});

// ───────────────────────── the step, executed ─────────────────────────

/**
 * Fake npm: logs `$*`, then for `npm run <FAKE_HANG>` hangs during its first FAKE_HANG_TIMES calls
 * (npm → sh → sleep, like npm → sh → node; the sleep's PID goes to $FAKE_PIDS), and for
 * `npm run <FAKE_FAIL>` exits FAKE_FAIL_RC.
 */
const FAKE_NPM = `#!/usr/bin/env bash
printf '%s\\n' "$*" >> "$FAKE_NPM_LOG"
if [ -n "\${FAKE_HANG:-}" ] && [ "$2" = "$FAKE_HANG" ]; then
  n=$(awk -v s="$2" '$2 == s' "$FAKE_NPM_LOG" | wc -l)
  if [ "$n" -le "\${FAKE_HANG_TIMES:-1}" ]; then
    echo "RATCHET OK"
    sh -c 'echo $$ >> "$FAKE_PIDS"; exec sleep 600'
  fi
fi
if [ -n "\${FAKE_FAIL:-}" ] && [ "$2" = "$FAKE_FAIL" ]; then exit "\${FAKE_FAIL_RC:-1}"; fi
exit 0
`;

/** The step's script with the limits shortened (10m → 1s, KILL 30s → 1s after TERM). */
function shortened(script) {
  assert.match(script, /^GATE_TIMEOUT=10m$/m);
  assert.match(script, /--kill-after=30s/);
  return script
    .replace(/^GATE_TIMEOUT=10m$/m, "GATE_TIMEOUT=1s")
    .replaceAll("--kill-after=30s", "--kill-after=1s");
}

function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/** Runs the gates step the way the runner does (`bash -e {0}`), with a fake npm first on PATH. */
function runGatesStep(t, env) {
  const dir = mkdtempSync(join(tmpdir(), "omni-fast-gates-"));
  const files = { FAKE_NPM_LOG: join(dir, "npm.log"), FAKE_PIDS: join(dir, "pids") };
  t.after(() => {
    // Never leave a hung fake behind, whatever the assertions said.
    if (existsSync(files.FAKE_PIDS)) {
      for (const pid of readFileSync(files.FAKE_PIDS, "utf8").split("\n").filter(Boolean)) {
        if (alive(Number(pid))) process.kill(Number(pid), "SIGKILL");
      }
    }
    rmSync(dir, { recursive: true, force: true });
  });
  const bin = join(dir, "bin");
  spawnSync("mkdir", [bin]);
  writeFileSync(join(bin, "npm"), FAKE_NPM);
  chmodSync(join(bin, "npm"), 0o755);
  writeFileSync(files.FAKE_NPM_LOG, "");
  const script = join(dir, "step.sh");
  writeFileSync(script, shortened(step.run));
  const res = spawnSync("bash", ["--noprofile", "--norc", "-e", script], {
    cwd: dir,
    encoding: "utf8",
    timeout: 60_000,
    env: {
      PATH: `${bin}:${process.env.PATH}`,
      PR_BASE_SHA: "0123456789abcdef0123456789abcdef01234567",
      EXTERNAL_STATE_GATES: "",
      ...files,
      ...env,
    },
  });
  const calls = readFileSync(files.FAKE_NPM_LOG, "utf8").split("\n").filter(Boolean);
  const pids = existsSync(files.FAKE_PIDS)
    ? readFileSync(files.FAKE_PIDS, "utf8").split("\n").filter(Boolean).map(Number)
    : [];
  const count = (script) => calls.filter((c) => c.split(" ")[1] === script).length;
  return { code: res.status, stdout: res.stdout, stderr: res.stderr, calls, pids, count };
}

const assertNoLeftovers = (res) => {
  for (const pid of res.pids) assert.equal(alive(pid), false, `hung child ${pid} survived`);
};

test("the gates step: green gates run once each, exit 0", (t) => {
  const res = runGatesStep(t, {});
  assert.equal(res.code, 0, res.stderr);
  assert.ok(res.calls.length >= 8, `gate calls: ${res.calls.length}`);
  assert.equal(new Set(res.calls).size, res.calls.length, "no gate retried");
  assert.doesNotMatch(res.stdout, /::warning::gate hit/);
});

test("the gates step: a gate that hangs once after its verdict is retried and passes", (t) => {
  const res = runGatesStep(t, { FAKE_HANG: "check:cycles", FAKE_HANG_TIMES: "1" });
  assert.equal(res.code, 0, res.stdout + res.stderr);
  assert.equal(res.count("check:cycles"), 2);
  assert.match(res.stdout, /::warning::gate hit the 1s limit and was terminated \(exit 124\)/);
  assert.equal(res.pids.length, 1);
  assertNoLeftovers(res);
});

test("the gates step: a gate that hangs twice is a failed gate; later gates still run", (t) => {
  const res = runGatesStep(t, { FAKE_HANG: "check:cycles", FAKE_HANG_TIMES: "2" });
  assert.equal(res.code, 1);
  assert.equal(res.count("check:cycles"), 2, "one retry, not more");
  assert.match(res.stdout, /::error::1 gate\(s\) failed: cycles\n/);
  // Non-fail-fast is preserved: the gates after cycles ran.
  for (const later of ["check:boundary", "typecheck:core", "check:ts7-diagnostics-ratchet"]) {
    assert.equal(res.count(later), 1, later);
  }
  assertNoLeftovers(res);
});

test("the gates step: an ordinary red gate keeps its verdict and is not retried", (t) => {
  const res = runGatesStep(t, { FAKE_FAIL: "check:deps", FAKE_FAIL_RC: "3" });
  assert.equal(res.code, 1);
  assert.equal(res.count("check:deps"), 1);
  assert.match(res.stdout, /::error::1 gate\(s\) failed: deps\n/);
  assert.doesNotMatch(res.stdout, /::warning::gate hit/);
});

test("the gates step: a timed-out external-state gate stays advisory on a candidate only", (t) => {
  const onCandidate = runGatesStep(t, {
    FAKE_HANG: "check:vuln-ratchet",
    FAKE_HANG_TIMES: "2",
    EXTERNAL_STATE_GATES: "vuln-ratchet",
  });
  assert.equal(onCandidate.code, 0, onCandidate.stdout + onCandidate.stderr);
  assert.match(onCandidate.stdout, /::warning::check:vuln-ratchet failed \(external state/);
  assertNoLeftovers(onCandidate);
  const elsewhere = runGatesStep(t, { FAKE_HANG: "check:vuln-ratchet", FAKE_HANG_TIMES: "2" });
  assert.equal(elsewhere.code, 1);
  assert.match(elsewhere.stdout, /::error::1 gate\(s\) failed: vuln-ratchet\n/);
  assertNoLeftovers(elsewhere);
});
