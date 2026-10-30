import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const source =
  process.env.I18N_TEST_SCRIPT_ROOT ||
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function fixture(t, { large = false, addedKey = false } = {}) {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "omniroute-i18n-io-"));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) =>
        !key.startsWith("GITHUB_") &&
        !key.startsWith("I18N_") &&
        key !== "BASE_REF" &&
        key !== "GH_TOKEN"
    )
  );
  mkdirSync(path.join(cwd, "scripts/i18n"), { recursive: true });
  for (const name of [
    "check-ui-value-drift.mjs",
    "check-new-key-coverage.mjs",
    "resolve-ui-diff-base.mjs",
    "read-ui-catalog.mjs",
  ]) {
    try {
      cpSync(path.join(source, "scripts/i18n", name), path.join(cwd, "scripts/i18n", name));
    } catch (error) {
      if (!["resolve-ui-diff-base.mjs", "read-ui-catalog.mjs"].includes(name)) throw error;
    }
  }
  mkdirSync(path.join(cwd, "scripts/check"), { recursive: true });
  cpSync(
    path.join(source, "scripts/check/openapiBaseline.mjs"),
    path.join(cwd, "scripts/check/openapiBaseline.mjs")
  );
  const messages = path.join(cwd, "src/i18n/messages");
  mkdirSync(messages, { recursive: true });
  const en = { label: "old english" };
  const locale = { label: "tradução anterior", padding: large ? "א".repeat(600000) : "padding" };
  const save = (name, catalog) =>
    writeFileSync(path.join(messages, name + ".json"), JSON.stringify(catalog));
  save("en", en);
  save("pt", locale);
  writeFileSync(path.join(cwd, "package.json"), '{"version":"3.8.52","type":"module"}\n');
  const git = (...args) =>
    execFileSync("git", args, {
      cwd,
      env,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  git("init", "--quiet", "--initial-branch=main");
  git("config", "user.name", "Test Fixture");
  git("config", "user.email", "fixture@example.invalid");
  git("config", "commit.gpgsign", "false");
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture base");
  const base = git("rev-parse", "HEAD");
  save("en", addedKey ? { ...en, newLabel: "new feature" } : { label: "new english" });
  git("add", ".");
  git("commit", "--quiet", "-m", "fixture candidate");
  const head = git("rev-parse", "HEAD");
  const run = (gate, extra = {}, args = []) => {
    const result = spawnSync(
      process.execPath,
      ["scripts/i18n/" + gate + ".mjs", "--json", ...args],
      {
        cwd,
        env: { ...env, BASE_REF: base, ...extra },
        encoding: "utf8",
        timeout: 30000,
      }
    );
    return { ...result, report: JSON.parse(result.stdout) };
  };
  return { cwd, env, messages, base, head, run, save, git };
}

test("a translation catalog above 1 MiB still blocks a real English rewrite", (t) => {
  const f = fixture(t, { large: true });
  const result = f.run("check-ui-value-drift");
  assert.equal(result.status, 1, result.stdout + result.stderr);
  assert.deepEqual(result.report.stale, [{ key: "label", locale: "pt" }]);
});

test("missing comparison history is INCOMPLETE, including warn mode", (t) => {
  const f = fixture(t);
  for (const gate of ["check-ui-value-drift", "check-new-key-coverage"]) {
    const result = f.run(gate, { BASE_REF: "deadbeef".repeat(5) }, ["--warn"]);
    assert.equal(result.status, 2, result.stdout + result.stderr);
    assert.equal(result.report.incomplete, true);
  }
});

test("malformed existing catalogs cannot become empty or disappear from either gate", (t) => {
  const f = fixture(t, { addedKey: true });
  writeFileSync(path.join(f.messages, "pt.json"), "{ broken json");
  for (const gate of ["check-ui-value-drift", "check-new-key-coverage"]) {
    const result = f.run(gate);
    assert.equal(result.status, 2, result.stdout + result.stderr);
    assert.equal(result.report.incomplete, true);
  }
});

test("an actual new locale absent from the valid base tree is allowed", (t) => {
  const f = fixture(t);
  f.save("pt", { label: "tradução nova" });
  f.save("es", { label: "traducción nueva" });
  const result = f.run("check-ui-value-drift");
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.deepEqual(result.report.stale, []);
});

test("both gates report the same pinned pair and still reject a genuine new-key gap", (t) => {
  const f = fixture(t, { addedKey: true });
  const env = {
    I18N_BASE_SHA: f.base,
    I18N_CANDIDATE_SHA: f.head,
    I18N_COMPARISON_SOURCE: "pull_request",
    I18N_COMPARISON_SCOPE: "candidate",
  };
  const values = f.run("check-ui-value-drift", env);
  const keys = f.run("check-new-key-coverage", env);
  assert.equal(values.status, 0);
  assert.equal(keys.status, 1);
  assert.deepEqual(values.report.comparison, keys.report.comparison);
  assert.deepEqual(keys.report.gaps, [{ key: "newLabel", locale: "pt" }]);
});

test("both gates report partial pinned context as INCOMPLETE even when local comparison passes", (t) => {
  const f = fixture(t);
  f.save("pt", { label: "tradução nova" });
  for (const gate of ["check-ui-value-drift", "check-new-key-coverage"]) {
    assert.equal(f.run(gate).status, 0, "the unpinned local control must pass");
    for (const args of [[], ["--warn"]]) {
      const result = f.run(gate, { I18N_CANDIDATE_SHA: f.base }, args);
      assert.equal(result.status, 2, result.stdout + result.stderr);
      assert.equal(result.report.incomplete, true);
    }
  }
});

test("unknown dispatch without an exact PR or explicit base fails rather than guessing release", (t) => {
  const f = fixture(t);
  const eventPath = path.join(f.cwd, "event.json");
  writeFileSync(eventPath, "{}");
  const result = f.run("check-ui-value-drift", {
    GITHUB_EVENT_NAME: "workflow_dispatch",
    GITHUB_EVENT_PATH: eventPath,
    GITHUB_SHA: f.head,
    GITHUB_REF: "refs/heads/unassociated-candidate",
    GITHUB_REPOSITORY: "",
    BASE_REF: f.base,
  });
  assert.equal(result.status, 2, result.stdout + result.stderr);
  assert.equal(result.report.incomplete, true);
});

test("the deliberate catalog byte limit fails explicitly, never as a new locale", (t) => {
  const f = fixture(t);
  f.save("pt", { label: "tradução", padding: "x".repeat(8 * 1024 * 1024) });
  const result = f.run("check-ui-value-drift");
  assert.equal(result.status, 2, result.stdout + result.stderr);
  assert.equal(result.report.incomplete, true);
});

test("a broken catalog at the base cannot be treated as a refreshed translation", (t) => {
  const f = fixture(t);
  writeFileSync(path.join(f.messages, "pt.json"), "{ broken json");
  f.git("add", ".");
  f.git("commit", "--quiet", "-m", "fixture invalid base");
  const invalidBase = f.git("rev-parse", "HEAD");
  f.save("en", { label: "third english" });
  f.save("pt", { label: "tradução anterior" });
  f.git("add", ".");
  f.git("commit", "--quiet", "-m", "fixture valid head");
  const result = f.run("check-ui-value-drift", { BASE_REF: invalidBase });
  assert.equal(result.status, 2, result.stdout + result.stderr);
  assert.equal(result.report.incomplete, true);
});
