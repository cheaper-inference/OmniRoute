/**
 * Translation-completeness gates in two modes (plan "derived numbers and texts resolved only at
 * release", 2026-11-13; owner decision: UI translation completeness runs in release mode).
 *
 * A feature PR adds or rewrites keys in en.json and touches no other locale. In `pr` mode the
 * gates that compare every locale with en.json print `SKIP reason=pr-mode` and exit 0; in
 * `release` mode (the release PR, pushes to main, local runs) they keep failing exactly as before.
 * On the release PR the diff-aware gates get BASE_REF=origin/main, so they judge the whole cycle;
 * after the release refresh (`syncUiKeys`) completed the catalogs, they pass.
 *
 * Each test runs the real gate script copied into a throw-away git repository, so the script's
 * own ROOT resolution, git calls and exit code are what is asserted.
 */

import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { syncUiKeys } from "../../scripts/i18n/sync-ui-keys.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SUPPORT = ["scripts/check/lib/gateMode.mjs", "scripts/i18n/lib/release-mode.mjs"];

function git(dir: string, ...args: string[]) {
  return execFileSync("git", args, {
    cwd: dir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function writeJson(dir: string, rel: string, value: unknown) {
  const file = path.join(dir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function readJson(dir: string, rel: string) {
  return JSON.parse(fs.readFileSync(path.join(dir, rel), "utf8"));
}

/** Fresh repo on branch `main` with the gate scripts and a two-locale UI catalog. */
function makeRepo(scripts: string[]) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-release-mode-"));
  git(dir, "init", "-q", "-b", "main");
  git(dir, "config", "user.email", "test@example.invalid");
  git(dir, "config", "user.name", "test");
  git(dir, "config", "commit.gpgsign", "false");
  for (const rel of [...SUPPORT, ...scripts]) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.copyFileSync(path.join(REPO, rel), path.join(dir, rel));
  }
  writeJson(dir, "config/i18n.json", {
    default: "en",
    locales: [
      { code: "en", name: "English" },
      { code: "pt-BR", name: "Português (Brasil)" },
    ],
  });
  writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save" } });
  writeJson(dir, "src/i18n/messages/pt-BR.json", { common: { save: "Salvar" } });
  return dir;
}

function commitAll(dir: string, message: string) {
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", message);
}

/** Runs a copied script with a clean environment: no CI variables leak in from the runner. */
function run(dir: string, script: string, args: string[] = [], env: Record<string, string> = {}) {
  const res = spawnSync(process.execPath, [script, ...args], {
    cwd: dir,
    encoding: "utf8",
    env: { PATH: process.env.PATH ?? "", HOME: dir, ...env },
  });
  return { code: res.status, out: `${res.stdout}${res.stderr}` };
}

const FEATURE_PR = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/new-panel" };
const RELEASE_PR = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "release/v9.9.9" };
const SKIP_LINE = /SKIP reason=pr-mode — mode=pr \(.+\): .+; the strict check runs in release mode/;

test("key completeness: release mode still fails on a key only en.json has, pr mode skips", () => {
  const script = "scripts/i18n/check-key-completeness.mjs";
  const dir = makeRepo([script]);
  try {
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save", panel: "Panel" } });

    const strict = run(dir, script);
    assert.equal(strict.code, 1, strict.out);
    assert.match(strict.out, /\[i18n-keys:ui\] FAIL — 1\/1 locales differ from en\.json/);
    assert.match(strict.out, /pt-BR: 1 missing \(common\.panel\)/);

    for (const [label, args, env] of [
      ["flag", ["--mode=pr"], {}],
      ["env", [], { OMNIROUTE_GATE_MODE: "pr" }],
      ["feature PR event", [], FEATURE_PR],
    ] as const) {
      const res = run(dir, script, [...args], { ...env });
      assert.equal(res.code, 0, `${label}: ${res.out}`);
      assert.match(res.out, SKIP_LINE, label);
      assert.doesNotMatch(res.out, /FAIL/, label);
    }

    const releasePr = run(dir, script, [], RELEASE_PR);
    assert.equal(releasePr.code, 1, "the release PR keeps the strict verdict");
    assert.equal(
      run(dir, script, ["--mode=release"], FEATURE_PR).code,
      1,
      "--mode beats the event"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("key completeness over the CLI catalogs follows the same two modes", () => {
  const script = "scripts/i18n/check-key-completeness.mjs";
  const dir = makeRepo([script]);
  try {
    writeJson(dir, "bin/cli/locales/en.json", { common: { ok: "OK", added: "Added" } });
    writeJson(dir, "bin/cli/locales/pt-BR.json", { common: { ok: "OK" } });
    const strict = run(dir, script, ["--catalog=cli"]);
    assert.equal(strict.code, 1, strict.out);
    assert.match(strict.out, /\[i18n-keys:cli\] FAIL/);
    const pr = run(dir, script, ["--catalog=cli", "--mode=pr"]);
    assert.equal(pr.code, 0, pr.out);
    assert.match(pr.out, /\[i18n-keys:cli\] SKIP reason=pr-mode/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("new-key coverage: a feature PR skips; the release PR judges every key of the cycle until the refresh translates them", async () => {
  const script = "scripts/i18n/check-new-key-coverage.mjs";
  const dir = makeRepo([script]);
  try {
    commitAll(dir, "base");
    git(dir, "checkout", "-q", "-b", "release/v9.9.9");
    // Two feature PRs of the cycle, each touching en.json only.
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save", first: "First" } });
    commitAll(dir, "feat: first");
    writeJson(dir, "src/i18n/messages/en.json", {
      common: { save: "Save", first: "First", second: "Second" },
    });
    commitAll(dir, "feat: second");

    const pr = run(dir, script, [], { ...FEATURE_PR, BASE_REF: "main" });
    assert.equal(pr.code, 0, pr.out);
    assert.match(pr.out, /\[i18n-new-keys\] SKIP reason=pr-mode/);

    const prJson = run(dir, script, ["--json", "--mode=pr"], { BASE_REF: "main" });
    assert.equal(prJson.code, 0, prJson.out);
    assert.deepEqual(
      { ...JSON.parse(prJson.out), modeSource: undefined, modeReason: undefined },
      {
        ok: true,
        skipped: true,
        reason: "pr-mode",
        mode: "pr",
        modeSource: undefined,
        modeReason: undefined,
      }
    );

    const releasePr = run(dir, script, [], { ...RELEASE_PR, BASE_REF: "main" });
    assert.equal(releasePr.code, 1, releasePr.out);
    assert.match(releasePr.out, /2 new English key\(s\) untranslated/);
    assert.match(releasePr.out, /common\.first — untranslated in 1: pt-BR/);
    assert.match(releasePr.out, /common\.second — untranslated in 1: pt-BR/);

    // The release refresh completes the catalogs (translation backend stubbed).
    const summary = await syncUiKeys({
      root: dir,
      translate: true,
      pruneExtra: true,
      rewrittenSinceRef: "main",
      log: () => {},
      translateFns: {
        translateBatch: async (entries: Array<{ id: string; text: string }>) =>
          new Map(entries.map((e) => [e.id, `PT ${e.text}`])),
      },
    });
    assert.deepEqual(summary.changedFiles, ["src/i18n/messages/pt-BR.json"]);
    assert.equal(summary.added, 2);
    assert.equal(summary.translated, 2);
    commitAll(dir, "chore: release refresh");

    const afterRefresh = run(dir, script, [], { ...RELEASE_PR, BASE_REF: "main" });
    assert.equal(afterRefresh.code, 0, afterRefresh.out);
    assert.match(afterRefresh.out, /PASS — every key new in English reached all 1 locale/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("value drift: a feature PR rewriting English skips; the release refresh's marker clears the release verdict", async () => {
  const script = "scripts/i18n/check-ui-value-drift.mjs";
  const dir = makeRepo([script]);
  try {
    commitAll(dir, "base");
    git(dir, "checkout", "-q", "-b", "feat/new-panel");
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save all changes" } });
    commitAll(dir, "feat: reword save");

    const strict = run(dir, script, [], { BASE_REF: "main" });
    assert.equal(strict.code, 1, strict.out);
    assert.match(strict.out, /stale in 1 locale\(s\): pt-BR/);

    const pr = run(dir, script, [], { ...FEATURE_PR, BASE_REF: "main" });
    assert.equal(pr.code, 0, pr.out);
    assert.match(pr.out, /\[i18n-value-drift\] SKIP reason=pr-mode/);
    const prJson = run(dir, script, ["--json"], { ...FEATURE_PR, BASE_REF: "main" });
    assert.equal(prJson.code, 0, prJson.out);
    assert.equal(JSON.parse(prJson.out).reason, "pr-mode");

    const summary = await syncUiKeys({ root: dir, rewrittenSinceRef: "main", log: () => {} });
    assert.equal(summary.markedRewritten, 1);
    assert.deepEqual(readJson(dir, "src/i18n/messages/pt-BR.json"), {
      common: { save: "__MISSING__:Save all changes" },
    });
    const afterMark = run(dir, script, [], { BASE_REF: "main" });
    assert.equal(afterMark.code, 0, afterMark.out);
    assert.match(afterMark.out, /PASS — no rewritten English value left a stale translation/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("translation ratio: the gate skips in pr mode; --report and --update still run", () => {
  const script = "scripts/i18n/check-translation-ratio.mjs";
  const dir = makeRepo([script]);
  try {
    writeJson(dir, "scripts/i18n/untranslatable-keys.json", { keys: [] });
    writeJson(dir, "config/quality/i18n-translation-baseline.json", {
      _comment: "",
      slack: 0.5,
      locales: { "pt-BR": 0 },
    });
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save", panel: "Panel" } });

    const strict = run(dir, script);
    assert.equal(strict.code, 1, strict.out);
    assert.match(
      strict.out,
      /\[i18n-ratio\] FAIL pt-BR: 50% untranslated > baseline 0% \(\+0\.5\)/
    );

    const pr = run(dir, script, [], FEATURE_PR);
    assert.equal(pr.code, 0, pr.out);
    assert.match(pr.out, /\[i18n-ratio\] SKIP reason=pr-mode/);
    assert.doesNotMatch(pr.out, /untranslated%/, "the gate path measures nothing in pr mode");

    const report = run(dir, script, ["--report"], FEATURE_PR);
    assert.equal(report.code, 0, report.out);
    assert.match(report.out, /\[i18n-ratio\] locale {2}untranslated%/);
    assert.doesNotMatch(report.out, /SKIP/);

    // --update is a writer action (the refresh tightens the ratchet), not a gate: never skipped.
    const update = run(dir, script, ["--update"], FEATURE_PR);
    assert.equal(update.code, 0, update.out);
    assert.match(update.out, /baseline updated: config\/quality\/i18n-translation-baseline\.json/);
    assert.equal(
      readJson(dir, "config/quality/i18n-translation-baseline.json").locales["pt-BR"],
      50
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("check-cli-i18n: pr mode keeps the t()-key check and skips only locale parity", () => {
  const script = "scripts/check/check-cli-i18n.mjs";
  const dir = makeRepo([script]);
  try {
    fs.mkdirSync(path.join(dir, "bin/cli/commands"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "bin/cli/commands/demo.mjs"),
      'export const run = (t) => [t("common.ok"), t("common.added")];\n'
    );
    writeJson(dir, "bin/cli/locales/en.json", { common: { ok: "OK", added: "Added" } });
    for (const code of ["pt-BR", "zh-CN", "zh-TW"]) {
      writeJson(dir, `bin/cli/locales/${code}.json`, { common: { ok: "OK" } });
    }

    const strict = run(dir, script);
    assert.equal(strict.code, 1, strict.out);
    assert.match(strict.out, /Keys in en\.json missing from zh-CN\.json/);
    assert.match(strict.out, /\[cli-i18n\] FAIL — 2 error\(s\) found/);

    const pr = run(dir, script, ["--mode=pr"]);
    assert.equal(pr.code, 0, pr.out);
    assert.match(pr.out, /✓ All 2 t\(\) keys found in en\.json/);
    assert.match(pr.out, /\[cli-i18n\] SKIP reason=pr-mode/);
    assert.match(pr.out, /\[cli-i18n\] PASS/);

    // What the PR itself does is still judged: a t() key en.json lacks fails in pr mode too.
    fs.writeFileSync(
      path.join(dir, "bin/cli/commands/demo.mjs"),
      'export const run = (t) => [t("common.ok"), t("common.notThere")];\n'
    );
    const broken = run(dir, script, [], FEATURE_PR);
    assert.equal(broken.code, 1, broken.out);
    assert.match(broken.out, /Keys used in commands but missing in en\.json/);
    assert.match(broken.out, /✗ common\.notThere/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
