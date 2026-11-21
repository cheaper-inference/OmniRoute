import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const policy = fileURLToPath(
  new URL("../../scripts/check/check-pr-test-policy.mjs", import.meta.url)
);
const catalog = "bin/cli/locales/pt-BR.json";

function fixture(t, initial = {}) {
  const directory = mkdtempSync(path.join(os.tmpdir(), "omni-cli-test-policy-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const cwd = path.join(directory, "repo");
  const templates = path.join(directory, "templates");
  mkdirSync(cwd);
  mkdirSync(templates);
  const env = {
    PATH: process.env.PATH,
    LANG: "C.UTF-8",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: os.devNull,
    GIT_TERMINAL_PROMPT: "0",
  };
  const git = (...args) => execFileSync("git", args, { cwd, env, encoding: "utf8" }).trim();
  const write = (name, content) => {
    const target = path.join(cwd, name);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, content);
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
  for (const [name, content] of Object.entries(initial)) write(name, content);
  const base = commit();
  git("update-ref", "refs/remotes/origin/main", base);

  const run = () => {
    const summary = path.join(directory, "summary.md");
    const { error, signal, status, stderr, stdout } = spawnSync(
      process.execPath,
      [policy, "--summary-file", summary],
      {
        cwd,
        env: { ...env, GITHUB_BASE_REF: "main", GITHUB_BASE_SHA: base },
        encoding: "utf8",
        timeout: 30000,
      }
    );
    assert.equal(error, undefined);
    assert.equal(signal, null);
    assert.equal(stderr, "");
    assert.equal(readFileSync(summary, "utf8"), stdout);
    return { status, report: stdout };
  };
  return { cwd, git, write, commit, run };
}

test("allows canonical ordering of committed CLI translation keys", (t) => {
  const yes = 'Marcador: {"value":"Sim"}';
  const f = fixture(t, {
    [catalog]: JSON.stringify({ common: { yes, no: "Não" }, setup: { yes: "Sim" } }),
  });
  f.write(catalog, JSON.stringify({ setup: { yes: "Sim" }, common: { no: "Não", yes } }));
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
    const f = fixture(t, before === undefined ? {} : { [catalog]: before });
    if (after === undefined) rmSync(path.join(f.cwd, catalog));
    else f.write(catalog, after);
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
  const f = fixture(t, { [catalog]: '{"yes":"Sim"}' });
  f.write(catalog, '{"yes":"Claro"}');
  f.commit();
  f.write(catalog, '{"yes":"Sim"}');
  const result = f.run();
  assert.equal(result.status, 1, result.report);
  assert.match(result.report, /Changed production files: 1/);
});

test("does not let locale ordering excuse an accompanying production change", (t) => {
  const f = fixture(t, { [catalog]: '{"yes":"Sim","no":"Não"}' });
  f.write(catalog, '{"no":"Não","yes":"Sim"}');
  f.write("src/production.ts", "export const production = 1;\n");
  f.commit();
  const result = f.run();
  assert.equal(result.status, 1, result.report);
  assert.match(result.report, /Changed production files: 1/);
  assert.match(result.report, /src\/production\.ts/);
});
