// Contract of scripts/dev/typecheck-touched.sh: typecheck only the touched .ts/.tsx files
// through a temporary tsconfig that extends the repo's, with the shape the 2026-10 campaign
// verified by hand (`types: ["node"]` — without it tsc invents TS2591 on every `node:*`
// import), classify tsc diagnostics into "in a touched file" versus "elsewhere", always
// delete the temp tsconfig, and keep the full log under the main checkout's _artifacts/.
// `tsc` itself is replaced by a stub through TSC_BIN so the test is fast and hermetic.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/dev/typecheck-touched.sh", import.meta.url)
);
const TMP_TSCONFIG = "tsconfig.touched.tmp.json";
const SUMMARY_RE =
  /^typecheck-touched: rc=(\d+) touched_errors=(\d+) other_errors=(\d+) log=(\S+)$/m;

// Inherited GIT_* variables are dropped so a hook-exported GIT_DIR cannot point the fixture
// at this repository; global/system config is neutralised for the same reason.
const ENV: NodeJS.ProcessEnv = {
  ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
  GIT_AUTHOR_NAME: "Fixture",
  GIT_AUTHOR_EMAIL: "fixture@example.com",
  GIT_COMMITTER_NAME: "Fixture",
  GIT_COMMITTER_EMAIL: "fixture@example.com",
};

const sandboxes: string[] = [];
after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function git(cwd: string, ...args: string[]) {
  const r = spawnSync("git", args, { cwd, env: ENV, encoding: "utf8" });
  assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
  return r.stdout.trim();
}

// A stand-in for `tsc -p <cfg>`: copies the tsconfig it was handed to STUB_CAPTURE, then
// prints canned diagnostics. By default it reports an error in bad.ts only when bad.ts is
// in the include list, so the "derive from git" tests exercise real selection.
const STUB_TSC = `#!/usr/bin/env bash
cfg=""
while [ $# -gt 0 ]; do
  case "$1" in -p) cfg="$2"; shift ;; esac
  shift
done
[ -n "\${STUB_CAPTURE:-}" ] && cp "$cfg" "$STUB_CAPTURE"
case "\${STUB_MODE:-touched}" in
  other) echo "src/lib/imported.ts(3,1): error TS2304: Cannot find name 'nope'."; exit 2 ;;
  crash) echo "FATAL ERROR: Reached heap limit" >&2; exit 134 ;;
  *)
    if grep -q '"bad.ts"' "$cfg"; then
      echo "bad.ts(1,7): error TS2322: Type 'string' is not assignable to type 'number'."
      exit 2
    fi
    exit 0 ;;
esac
`;

/**
 * A throwaway repo with a tiny tsconfig, one good and one bad .ts file. `good.ts` is
 * committed on branch `base`; `bad.ts` is committed on top on branch `work`, so deriving
 * the touched set against `base` yields exactly bad.ts.
 */
function makeRepo() {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "typecheck-touched-")));
  sandboxes.push(root);
  const repo = join(root, "repo");
  git(root, "init", "--quiet", "-b", "base", "repo");
  writeFileSync(
    join(repo, "tsconfig.json"),
    JSON.stringify({ compilerOptions: { strict: true }, include: ["**/*.ts"] }, null, 2)
  );
  writeFileSync(join(repo, "good.ts"), "export const n: number = 1;\n");
  git(repo, "add", ".");
  git(repo, "commit", "--quiet", "-m", "base");
  git(repo, "switch", "--quiet", "-c", "work");
  writeFileSync(join(repo, "bad.ts"), 'export const n: number = "x";\n');
  git(repo, "add", "bad.ts");
  git(repo, "commit", "--quiet", "-m", "touch bad.ts");
  const stub = join(root, "tsc-stub.sh");
  writeFileSync(stub, STUB_TSC);
  chmodSync(stub, 0o755);
  return { root, repo, stub };
}

function run(
  cwd: string,
  stub: string,
  args: string[],
  extraEnv: Record<string, string> = {},
  capture?: string
) {
  const r = spawnSync("bash", [SCRIPT_PATH, ...args], {
    cwd,
    env: { ...ENV, TSC_BIN: stub, ...(capture ? { STUB_CAPTURE: capture } : {}), ...extraEnv },
    encoding: "utf8",
  });
  const summary = SUMMARY_RE.exec(r.stdout);
  return { ...r, summary };
}

function assertNoTempLeftBehind(repo: string) {
  assert.equal(existsSync(join(repo, TMP_TSCONFIG)), false, `${TMP_TSCONFIG} left behind`);
}

test("typechecks exactly the given files and exits 1 on an error in a touched file", () => {
  const { root, repo, stub } = makeRepo();
  const capture = join(root, "captured-tsconfig.json");
  const r = run(repo, stub, ["good.ts", "bad.ts"], {}, capture);

  assert.equal(r.status, 1, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stdout, /^bad\.ts\(1,7\): error TS2322/m);
  assert.ok(r.summary, `summary line missing in:\n${r.stdout}`);
  assert.deepEqual(r.summary.slice(1, 4), ["2", "1", "0"]);
  // The full log lives under the checkout's _artifacts/typecheck-touched/.
  const log = r.summary[4];
  assert.ok(log.startsWith(join(repo, "_artifacts", "typecheck-touched") + "/"), log);
  assert.match(readFileSync(log, "utf8"), /TS2322/);
  assertNoTempLeftBehind(repo);

  // The verified tsconfig shape (recipes-and-pitfalls.md, 2026-10-16).
  const cfg = JSON.parse(readFileSync(capture, "utf8"));
  assert.equal(cfg.extends, "./tsconfig.json");
  assert.deepEqual(cfg.include, ["good.ts", "bad.ts", "src/**/*.d.ts", "types/**/*.d.ts"]);
  assert.deepEqual(cfg.compilerOptions, { noEmit: true, types: ["node"], incremental: false });
});

test("exits 0 with touched_errors=0 when the touched files are clean", () => {
  const { repo, stub } = makeRepo();
  const r = run(repo, stub, ["good.ts"]);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(r.summary);
  assert.deepEqual(r.summary.slice(1, 4), ["0", "0", "0"]);
  assertNoTempLeftBehind(repo);
});

test("exits 2 when tsc only reports errors outside the touched files", () => {
  const { repo, stub } = makeRepo();
  const r = run(repo, stub, ["good.ts"], { STUB_MODE: "other" });
  assert.equal(r.status, 2, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.doesNotMatch(r.stdout, /src\/lib\/imported\.ts/);
  assert.ok(r.summary);
  assert.deepEqual(r.summary.slice(1, 4), ["2", "0", "1"]);
  assertNoTempLeftBehind(repo);
});

test("exits 2 when tsc dies without diagnostics (OOM) instead of reading as green", () => {
  const { repo, stub } = makeRepo();
  const r = run(repo, stub, ["good.ts"], { STUB_MODE: "crash" });
  assert.equal(r.status, 2, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.ok(r.summary);
  assert.equal(r.summary[1], "134");
  assertNoTempLeftBehind(repo);
});

test("derives the touched files from the merge-base with --base when no files are given", () => {
  const { root, repo, stub } = makeRepo();
  const capture = join(root, "captured-tsconfig.json");
  const r = run(repo, stub, ["--base", "base"], {}, capture);
  assert.equal(r.status, 1, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  const cfg = JSON.parse(readFileSync(capture, "utf8"));
  assert.deepEqual(cfg.include, ["bad.ts", "src/**/*.d.ts", "types/**/*.d.ts"]);
  assertNoTempLeftBehind(repo);
});

test("refuses to guess: no files and no --base is a usage error", () => {
  const { repo, stub } = makeRepo();
  const r = run(repo, stub, []);
  assert.equal(r.status, 64, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stderr, /--base/);
  assert.equal(r.summary, null);
  assertNoTempLeftBehind(repo);
});

test("rejects a non-TypeScript file as a usage error", () => {
  const { repo, stub } = makeRepo();
  const r = run(repo, stub, ["tsconfig.json"]);
  assert.equal(r.status, 64, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.match(r.stderr, /tsconfig\.json/);
  assertNoTempLeftBehind(repo);
});

test("works from a linked worktree: temp tsconfig there, log under the main checkout", () => {
  const { root, repo, stub } = makeRepo();
  const wt = join(root, "wt");
  git(repo, "worktree", "add", "--quiet", wt, "-b", "fix/probe", "base");
  writeFileSync(join(wt, "bad.ts"), 'export const n: number = "x";\n');
  const r = run(wt, stub, ["bad.ts"]);
  assert.equal(r.status, 1, `stdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  assert.ok(r.summary);
  assert.ok(
    r.summary[4].startsWith(join(repo, "_artifacts", "typecheck-touched") + "/"),
    r.summary[4]
  );
  assertNoTempLeftBehind(wt);
  assertNoTempLeftBehind(repo);
});
