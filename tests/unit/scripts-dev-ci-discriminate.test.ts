// Pins the contract of scripts/dev/ci-discriminate.sh: for one PR it lists the FAILURE checks,
// pulls each job log through `gh`, reduces it to signature lines (✖ / ✗ / ::error / gate(s)
// failed / [cycles] FAIL / TSnnnn / REGRESS) and sorts each line into own (names a file of the
// PR diff, or carries the complexity-ratchet marker), inherited (present in a reference PR or
// in the base-red issue) or unknown. `gh` is replaced by a stub through GH_BIN so the test
// never reaches GitHub; the stub records every call so the test can also prove the script is
// read-only and retries HTTP 5xx exactly up to three times.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(new URL("../../scripts/dev/ci-discriminate.sh", import.meta.url));
const REPO = "example/repo";
const JOB = (id: number) => `https://github.com/${REPO}/actions/runs/1/job/${id}`;

const sandboxes: string[] = [];
after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

// The stub mirrors the four read-only `gh` invocations the script is allowed to make and
// answers each from a fixture file. `fail-<job>` holds how many times that job log must
// answer with an HTTP 5xx before succeeding; `calls.log` records every invocation.
const GH_STUB = `#!/bin/sh
dir="$STUB_DIR"
printf '%s\\n' "$*" >> "$dir/calls.log"
case "$1 $2" in
  "pr checks") cat "$dir/checks-$3.json"; exit 1 ;;
  "pr diff") cat "$dir/diff-$3.txt" ;;
  "issue view") cat "$dir/issue-$3.json" ;;
  "api "*) job=$(printf '%s' "$2" | sed -E 's#.*/jobs/([0-9]+)/logs#\\1#')
    if [ -f "$dir/fail-$job" ]; then
      left=$(cat "$dir/fail-$job")
      if [ "$left" -gt 0 ]; then
        echo $((left - 1)) > "$dir/fail-$job"
        echo "gh: Bad Gateway (HTTP 502)" >&2; exit 1
      fi
    fi
    if [ -f "$dir/job-$job.log" ]; then cat "$dir/job-$job.log"; else echo "gh: Not Found (HTTP 404)" >&2; exit 1; fi ;;
  *) echo "stub: unexpected gh $*" >&2; exit 99 ;;
esac
`;

const TS = "2026-10-16T10:00:0";
function log(lines: string[]) {
  return lines.map((l, i) => `${TS}${i}.1234567Z ${l}`).join("\n") + "\n";
}

function makeSandbox() {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "ci-disc-")));
  sandboxes.push(root);
  const stub = join(root, "stub");
  mkdirSync(stub);
  const gh = join(root, "gh");
  writeFileSync(gh, GH_STUB);
  chmodSync(gh, 0o755);
  const out = join(root, "out");

  // PR 101: two failing jobs, one running check, one green, one external check without a
  // job log. Job 9002 answers 502 twice before the log arrives.
  writeFileSync(
    join(stub, "checks-101.json"),
    JSON.stringify([
      { name: "Fast Quality Gates", state: "FAILURE", link: JOB(9001) },
      { name: "test-unit", state: "FAILURE", link: JOB(9002) },
      { name: "API Route Typecheck", state: "IN_PROGRESS", link: JOB(9003) },
      { name: "lint", state: "SUCCESS", link: JOB(9004) },
      { name: "SonarQube", state: "FAILURE", link: "https://sonarcloud.io/dashboard?id=x" },
    ])
  );
  writeFileSync(
    join(stub, "job-9001.log"),
    log([
      "\u001b[31m✖ tests/unit/alpha.test.ts (123.4ms)\u001b[0m",
      "  REGRESSÃO (código novo): src/foo.ts::bar cresceu",
      "[file-size] ✗ open-sse/handlers/big.ts: 1500 > cap 1440",
      "printf '✖ decoy'",
      "2 gate(s) failed",
      "all good",
    ])
  );
  writeFileSync(
    join(stub, "job-9002.log"),
    log([
      "✖ tests/unit/beta.test.ts (50ms)",
      "##[error]src/lib/db/core.ts(10,5): error TS2345: boom",
    ])
  );
  writeFileSync(join(stub, "fail-9002"), "2");
  writeFileSync(join(stub, "diff-101.txt"), "src/lib/db/core.ts\ntests/unit/beta.test.ts\n");

  // Reference PR 200 (a near-empty PR on the same base) fails only on the inherited lines.
  writeFileSync(
    join(stub, "checks-200.json"),
    JSON.stringify([{ name: "Fast Quality Gates", state: "FAILURE", link: JOB(9100) }])
  );
  writeFileSync(
    join(stub, "job-9100.log"),
    log(["✖ tests/unit/alpha.test.ts (99ms)", "2 gate(s) failed"])
  );
  writeFileSync(join(stub, "diff-200.txt"), "");

  // Base-red issue 15306 lists the same reds across its body and a comment, in the
  // Release-Green wording ("❌ <gate>: <line>") and as plain markdown bullets.
  writeFileSync(
    join(stub, "issue-15306.json"),
    JSON.stringify({
      body: "Reds on the tip:\n  ❌ Unit tests (full suite): ✖ tests/unit/alpha.test.ts (77ms)",
      comments: [
        {
          body: "Still red:\n- 2 gate(s) failed\n- [file-size] ✗ open-sse/handlers/big.ts: 1500 > cap 1440",
        },
      ],
    })
  );

  // PR 102 is fully green.
  writeFileSync(
    join(stub, "checks-102.json"),
    JSON.stringify([{ name: "lint", state: "SUCCESS", link: JOB(9200) }])
  );
  writeFileSync(join(stub, "diff-102.txt"), "src/x.ts\n");

  // PR 103: the only failing job never recovers from 5xx.
  writeFileSync(
    join(stub, "checks-103.json"),
    JSON.stringify([{ name: "test-unit", state: "FAILURE", link: JOB(9300) }])
  );
  writeFileSync(join(stub, "job-9300.log"), log(["✖ tests/unit/gamma.test.ts"]));
  writeFileSync(join(stub, "fail-9300"), "99");
  writeFileSync(join(stub, "diff-103.txt"), "");

  const run = (...args: string[]) =>
    spawnSync("bash", [SCRIPT_PATH, ...args, "--repo", REPO], {
      env: { ...process.env, GH_BIN: gh, STUB_DIR: stub, CI_DISC_DIR: out },
      encoding: "utf8",
    });
  const calls = () => readFileSync(join(stub, "calls.log"), "utf8").trim().split("\n");
  return { root, stub, out, run, calls };
}

test("classifies own / inherited / unknown against a reference PR and exits 1 on own reds", () => {
  const sb = makeSandbox();
  const r = sb.run("101", "--ref-pr", "200");
  assert.equal(r.status, 1, r.stdout + r.stderr);

  const own = r.stdout.match(/^own \(3\):\n([\s\S]*?)\n\n/m);
  assert.ok(own, `own section missing in:\n${r.stdout}`);
  assert.match(own[1], /REGRESSÃO \(código novo\): src\/foo\.ts::bar cresceu/);
  assert.match(own[1], /✖ tests\/unit\/beta\.test\.ts$/m);
  assert.match(own[1], /src\/lib\/db\/core\.ts\(10,5\): error TS2345: boom/);

  const inherited = r.stdout.match(/^inherited \(2\):\n([\s\S]*?)\n\n/m);
  assert.ok(inherited, `inherited section missing in:\n${r.stdout}`);
  assert.match(inherited[1], /✖ tests\/unit\/alpha\.test\.ts$/m);
  assert.match(inherited[1], /2 gate\(s\) failed/);

  const unknown = r.stdout.match(/^unknown \(2\):\n([\s\S]*?)\n\n/m);
  assert.ok(unknown, `unknown section missing in:\n${r.stdout}`);
  assert.match(unknown[1], /\[file-size\] ✗ open-sse\/handlers\/big\.ts: 1500 > cap 1440/);
  assert.match(unknown[1], /SonarQube.*no job log/);

  assert.doesNotMatch(r.stdout, /decoy/, "printf echo lines are not signatures");
  assert.doesNotMatch(r.stdout, /all good/);
  assert.doesNotMatch(r.stdout, /\(\d+(\.\d+)?ms\)/, "durations are normalized away");
  assert.doesNotMatch(r.stdout, /\u001b\[/, "ANSI colour codes are stripped");
  assert.doesNotMatch(r.stdout, /##\[error\]/, "annotation prefixes are stripped");
  assert.match(r.stdout, /pending.*API Route Typecheck/i, "running checks are called out");
  assert.match(r.stdout, /^ci-discriminate: own=3 inherited=2 unknown=2$/m);

  // Signature files land in CI_DISC_DIR, timestamp-free and sorted.
  const sig = readFileSync(join(sb.out, "101.txt"), "utf8");
  assert.doesNotMatch(sig, /2026-10-16T/);
  assert.deepEqual(sig.trim().split("\n"), [...sig.trim().split("\n")].sort());
  assert.ok(existsSync(join(sb.out, "200.txt")));

  // Read-only: only pr checks / pr diff / api logs were invoked, and the 502 job was retried
  // up to three times.
  const calls = sb.calls();
  assert.ok(
    calls.every((c) => /^(pr checks|pr diff|api repos\/)/.test(c)),
    calls.join("\n")
  );
  assert.equal(calls.filter((c) => c.includes("/jobs/9002/logs")).length, 3);
  assert.equal(calls.filter((c) => c.includes("/jobs/9003/logs")).length, 0);
});

test("takes the inherited set from the base-red issue body and comments", () => {
  const sb = makeSandbox();
  const r = sb.run("101", "--base-red", "15306");
  assert.equal(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /^inherited \(3\):/m);
  assert.match(r.stdout, /^ci-discriminate: own=3 inherited=3 unknown=1$/m);
  assert.ok(sb.calls().some((c) => c.startsWith("issue view 15306")));
});

test("exits 0 with empty sections when nothing fails", () => {
  const sb = makeSandbox();
  const r = sb.run("102");
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /^ci-discriminate: own=0 inherited=0 unknown=0$/m);
});

test("gives up a job log after three 5xx answers and reports it as unknown", () => {
  const sb = makeSandbox();
  const r = sb.run("103");
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /test-unit.*log unavailable/);
  assert.match(r.stdout, /^ci-discriminate: own=0 inherited=0 unknown=1$/m);
  assert.equal(sb.calls().filter((c) => c.includes("/jobs/9300/logs")).length, 3);
});

test("rejects a missing PR number and conflicting reference flags", () => {
  const sb = makeSandbox();
  const noPr = sb.run();
  assert.equal(noPr.status, 2, noPr.stderr);
  assert.match(noPr.stderr, /usage: ci-discriminate\.sh <PR>/);
  const both = sb.run("101", "--ref-pr", "200", "--base-red", "15306");
  assert.equal(both.status, 2, both.stderr);
  assert.match(both.stderr, /--ref-pr and --base-red are mutually exclusive/);
});
