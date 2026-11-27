import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const policy = fileURLToPath(
  new URL("../../scripts/check/check-pr-test-policy.mjs", import.meta.url)
);

function fixture(t, initial = {}) {
  const directory = mkdtempSync(path.join(os.tmpdir(), "omni-test-placement-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const repo = path.join(directory, "repo");
  const templates = path.join(directory, "templates");
  mkdirSync(repo);
  mkdirSync(templates);
  const env = {
    PATH: process.env.PATH,
    HOME: directory,
    LANG: "C.UTF-8",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: os.devNull,
    GIT_TERMINAL_PROMPT: "0",
  };
  const git = (...args) => execFileSync("git", args, { cwd: repo, env, encoding: "utf8" }).trim();
  const write = (name, contents = "// test fixture\n") => {
    const target = path.join(repo, name);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, contents);
  };
  const commit = () => {
    git("add", "--all");
    git("commit", "--quiet", "-m", "test: update fixture");
    return git("rev-parse", "HEAD");
  };
  git("init", "--quiet", "--initial-branch=main", `--template=${templates}`);
  git("config", "user.name", "Test Fixture");
  git("config", "user.email", "fixture@example.invalid");
  write("README.md", "Fixture repository\n");
  for (const [name, contents] of Object.entries(initial)) write(name, contents);
  const base = commit();
  git("update-ref", "refs/remotes/origin/main", base);
  const run = (overrides = {}) => {
    const summary = path.join(directory, "summary.md");
    const commandEnv = { ...env, GITHUB_BASE_REF: "main", GITHUB_BASE_SHA: base, ...overrides };
    for (const name of Object.keys(commandEnv)) {
      if (commandEnv[name] === undefined) delete commandEnv[name];
    }
    const result = spawnSync(process.execPath, [policy, "--summary-file", summary], {
      cwd: repo,
      env: commandEnv,
      encoding: "utf8",
      timeout: 30000,
      maxBuffer: 1024 * 1024,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.signal, null);
    assert.equal(result.stderr, "");
    assert.equal(readFileSync(summary, "utf8"), result.stdout);
    return { status: result.status, report: result.stdout };
  };
  return { repo, git, write, commit, run };
}

for (const name of [
  "src/feature/__tests__/feature.test.ts",
  "root-regression.test.mjs",
  "src/café regression.test.ts",
  "src/line\nbreak.test.ts",
]) {
  test(`rejects a newly introduced test outside tests/: ${JSON.stringify(name)}`, (t) => {
    const f = fixture(t);
    f.write(name);
    f.commit();
    const result = f.run();
    assert.equal(result.status, 1);
    assert.match(result.report, /must be under `tests\//);
  });
}

test("accepts a new test in a workspace package's own tests/ directory", (t) => {
  // @omniroute/* packages run their own suites from <package>/tests/ (52 files in
  // opencode-plugin-v2 alone); a new test there is in the right place.
  const f = fixture(t);
  f.write("@omniroute/opencode-plugin-v2/tests/catalog-order.test.ts");
  f.commit();
  const result = f.run();
  assert.equal(result.status, 0);
  assert.match(result.report, /New test files outside tests\/: 0/);
});

for (const name of [
  "@omniroute/opencode-plugin-v2/src/catalog-order.test.ts",
  "@omniroute/opencode-plugin-v2/tests-old/catalog-order.test.ts",
  "@other/pkg/tests/catalog-order.test.ts",
  "packages/ui-kit/tests/button.test.ts",
]) {
  test(`still rejects a new test outside a package's own tests/: ${JSON.stringify(name)}`, (t) => {
    const f = fixture(t);
    f.write(name);
    f.commit();
    const result = f.run();
    assert.equal(result.status, 1);
    assert.match(result.report, /must be under `tests\//);
  });
}

test("accepts production changes accompanied by a test under tests/", (t) => {
  const f = fixture(t);
  f.write("src/feature.ts", "export const value = 1;\n");
  f.write("tests/unit/feature.test.ts");
  f.commit();
  assert.equal(f.run().status, 0);
});

test("continues to reject production changes with no automated test", (t) => {
  const f = fixture(t);
  f.write("src/feature.ts", "export const value = 1;\n");
  f.commit();
  assert.equal(f.run().status, 1);
});

test("accepts a key-order-only regeneration of an existing CLI translation", (t) => {
  const name = "bin/cli/locales/pt-BR.json";
  const message = 'Marcadores: {"yes":"Sim"}';
  const f = fixture(t, {
    [name]: JSON.stringify({ common: { yes: message, no: "Não" }, setup: { yes: "Sim" } }),
  });
  f.write(name, JSON.stringify({ setup: { yes: "Sim" }, common: { no: "Não", yes: message } }));
  f.commit();
  const result = f.run();
  assert.equal(result.status, 0, result.report);
  assert.match(result.report, /Changed production files: 0/);
});

for (const [label, before, after] of [
  ["changed value", '{"yes":"Sim","no":"Não"}', '{"no":"Nunca","yes":"Sim"}'],
  ["added key", '{"yes":"Sim"}', '{"no":"Não","yes":"Sim"}'],
  ["removed key", '{"yes":"Sim","no":"Não"}', '{"yes":"Sim"}'],
  ["added catalog", undefined, '{"yes":"Sim"}'],
  ["deleted catalog", '{"yes":"Sim"}', undefined],
  ["malformed base blob", '{"yes":"Sim",}', '{"yes":"Sim"}'],
  ["malformed head blob", '{"yes":"Sim"}', '{"yes":"Sim",}'],
  ["malformed UTF-8 head blob", '{"yes":"�"}', Buffer.from('{"yes":"\xff"}', "latin1")],
  [
    "duplicate from an escaped key in the head blob",
    '{"common":{"yes":"Sim"}}',
    '{"common":{"ye\\u0073":"Sim","yes":"Sim"}}',
  ],
  [
    "duplicate in a nested base object",
    '{"common":{"yes":"Sim","yes":"Sim"}}',
    '{"common":{"yes":"Sim"}}',
  ],
  [
    "key order that changes a flattened CLI lookup",
    '{"common":{"yes":"Sim"},"common.yes":"Claro"}',
    '{"common.yes":"Claro","common":{"yes":"Sim"}}',
  ],
  ["numeric leaf", '{"x":9007199254740992}', '{"x":9007199254740993}'],
]) {
  test(`still requires tests for CLI catalogs with a ${label}`, (t) => {
    const name = "bin/cli/locales/pt-BR.json";
    const f = fixture(t, before === undefined ? {} : { [name]: before });
    if (after === undefined) rmSync(path.join(f.repo, name));
    else f.write(name, after);
    f.commit();
    const result = f.run();
    assert.equal(result.status, 1, result.report);
    assert.match(result.report, /Changed production files: 1/);
  });
}

test("does not exempt canonical ordering on the English source or other production JSON", (t) => {
  const english = "bin/cli/locales/en.json";
  const settings = "bin/cli/settings.json";
  const before = '{"no":"No","yes":"Yes"}';
  const after = '{"yes":"Yes","no":"No"}';
  const f = fixture(t, { [english]: before, [settings]: before });
  f.write(english, after);
  f.write(settings, after);
  f.commit();
  const result = f.run();
  assert.equal(result.status, 1, result.report);
  assert.match(result.report, /Changed production files: 2/);
});

test("does not exempt CLI catalogs when the file mode or type changes", (t) => {
  const executable = "bin/cli/locales/pt-BR.json";
  const symlink = "bin/cli/locales/pt.json";
  const contents = '{"yes":"Sim"}';
  const f = fixture(t, { [executable]: contents, [symlink]: contents });
  const blob = f.git("rev-parse", `HEAD:${symlink}`);
  f.git("update-index", "--chmod=+x", executable);
  f.git("update-index", "--cacheinfo", `120000,${blob},${symlink}`);
  f.git("commit", "--quiet", "-m", "change locale file modes");
  const result = f.run();
  assert.equal(result.status, 1, result.report);
  assert.match(result.report, /Changed production files: 2/);
});

test("assesses the committed CLI catalog rather than the working copy", (t) => {
  const name = "bin/cli/locales/pt-BR.json";
  const f = fixture(t, { [name]: '{"yes":"Sim"}' });
  f.write(name, '{"yes":"Claro"}');
  f.commit();
  f.write(name, '{"yes":"Sim"}');
  const result = f.run();
  assert.equal(result.status, 1, result.report);
  assert.match(result.report, /Changed production files: 1/);
});

test("a valid test does not hide another newly misplaced test", (t) => {
  const f = fixture(t);
  f.write("src/feature.ts");
  f.write("tests/unit/feature.test.ts");
  f.write("src/feature.test.ts");
  f.commit();
  assert.equal(f.run().status, 1);
});

test("detects a test renamed from tests/ into production directories", (t) => {
  const f = fixture(t, { "tests/unit/feature.test.ts": "// unchanged test fixture\n" });
  mkdirSync(path.join(f.repo, "src"));
  renameSync(
    path.join(f.repo, "tests/unit/feature.test.ts"),
    path.join(f.repo, "src/feature.test.ts")
  );
  f.commit();
  assert.equal(f.run().status, 1);
});

test("detects a copied test outside tests/", (t) => {
  const f = fixture(t, { "tests/unit/feature.test.ts": "// unchanged test fixture\n" });
  mkdirSync(path.join(f.repo, "src"));
  copyFileSync(
    path.join(f.repo, "tests/unit/feature.test.ts"),
    path.join(f.repo, "src/feature.test.ts")
  );
  f.commit();
  assert.equal(f.run().status, 1);
});

test("does not classify an updated legacy test as a newly introduced location", (t) => {
  const f = fixture(t, { "src/__tests__/legacy.test.ts": "// existing fixture\n" });
  f.write("src/__tests__/legacy.test.ts", "// updated fixture\n");
  f.commit();
  assert.equal(f.run().status, 0);
});

test("accepts migration of a legacy test into tests/", (t) => {
  const f = fixture(t, { "src/__tests__/legacy.test.ts": "// existing fixture\n" });
  mkdirSync(path.join(f.repo, "tests/unit"), { recursive: true });
  renameSync(
    path.join(f.repo, "src/__tests__/legacy.test.ts"),
    path.join(f.repo, "tests/unit/legacy.test.ts")
  );
  f.commit();
  assert.equal(f.run().status, 0);
});

test("accepts documentation-only changes", (t) => {
  const f = fixture(t);
  f.write("README.md", "Updated fixture documentation\n");
  f.commit();
  assert.equal(f.run().status, 0);
});

test("uses the explicit base SHA even when the remote-tracking branch advanced", (t) => {
  const f = fixture(t);
  f.write("src/feature.test.ts");
  const head = f.commit();
  f.git("update-ref", "refs/remotes/origin/main", head);
  assert.equal(f.run().status, 1);
});

test("retains the origin/base-ref fallback when no explicit SHA is supplied", (t) => {
  const f = fixture(t);
  f.write("src/feature.test.ts");
  f.commit();
  assert.equal(f.run({ GITHUB_BASE_SHA: undefined }).status, 1);
});

test("preserves the non-PR skip behavior", (t) => {
  const f = fixture(t);
  f.write("src/feature.test.ts");
  f.commit();
  const result = f.run({ GITHUB_BASE_REF: undefined, GITHUB_BASE_SHA: undefined });
  assert.equal(result.status, 0);
  assert.match(result.report, /Skipped: not running in a pull request context/);
});
