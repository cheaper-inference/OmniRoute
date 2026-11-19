/**
 * `pr` mode of check-key-completeness for the PRs that DO edit locale catalogs (plan "derived
 * numbers and texts resolved only at release", 2026-11-13; scripts/i18n/lib/touched-catalogs.mjs).
 *
 * A feature PR touches en.json only, and the gate skips. A translation wave, the release refresh
 * or a translation-only PR still edits catalogs; skipping them too let a wave that deleted a key
 * or overwrote a translation with `__MISSING__` pass until the release PR (review of 2026-11-13).
 * Each changed catalog is judged against itself at the merge base instead.
 */

import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { findCatalogRegressions, isClean } from "../../scripts/i18n/lib/touched-catalogs.mjs";
import { sameIcuNames } from "../../scripts/i18n/lib/icu-names.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SCRIPT = "scripts/i18n/check-key-completeness.mjs";
const COPIED = [
  SCRIPT,
  "scripts/check/lib/gateMode.mjs",
  "scripts/i18n/lib/release-mode.mjs",
  "scripts/i18n/lib/touched-catalogs.mjs",
  "scripts/i18n/lib/icu-names.mjs",
];

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

const EN = {
  common: {
    save: "Save",
    rows: "{count} rows parsed",
    title: "Title",
    brand: "OmniRoute",
  },
};

/** Base branch `release/v9.9.9` with en + pt-BR + ko UI catalogs and en + ko CLI catalogs. */
function makeRepo() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-touched-"));
  git(dir, "init", "-q", "-b", "release/v9.9.9");
  git(dir, "config", "user.email", "test@example.invalid");
  git(dir, "config", "user.name", "test");
  git(dir, "config", "commit.gpgsign", "false");
  for (const rel of COPIED) {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.copyFileSync(path.join(REPO, rel), path.join(dir, rel));
  }
  writeJson(dir, "scripts/i18n/untranslatable-keys.json", { keys: ["common.brand"] });
  writeJson(dir, "src/i18n/messages/en.json", EN);
  writeJson(dir, "src/i18n/messages/pt-BR.json", {
    common: { save: "Salvar", rows: "{count} linhas lidas", title: "Título", brand: "OmniRoute" },
  });
  writeJson(dir, "src/i18n/messages/ko.json", {
    common: { save: "저장", rows: "{count}개 행", title: "제목", brand: "OmniRoute" },
  });
  writeJson(dir, "bin/cli/locales/en.json", { common: { ok: "OK", done: "Done" } });
  writeJson(dir, "bin/cli/locales/ko.json", { common: { ok: "확인", done: "완료" } });
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", "base");
  return dir;
}

function branch(dir: string, name: string, edit: () => void) {
  git(dir, "checkout", "-q", "-b", name, "release/v9.9.9");
  edit();
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", `edit on ${name}`);
}

function run(dir: string, headRef: string, args: string[] = []) {
  const res = spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: dir,
    encoding: "utf8",
    env: {
      PATH: process.env.PATH ?? "",
      HOME: dir,
      GITHUB_EVENT_NAME: "pull_request",
      GITHUB_HEAD_REF: headRef,
      BASE_REF: "release/v9.9.9",
    },
  });
  return { code: res.status, out: `${res.stdout}${res.stderr}` };
}

test("a wave that deletes a key or overwrites translations fails in pr mode", () => {
  const dir = makeRepo();
  try {
    branch(dir, "docs/i18n-wave-1113", () => {
      writeJson(dir, "src/i18n/messages/ko.json", {
        common: { save: "__MISSING__:Save", title: "제목", brand: "OmniRoute", stray: "x" },
      });
      writeJson(dir, "src/i18n/messages/pt-BR.json", {
        common: { save: "Save", rows: "{rows} linhas lidas", title: "Título", brand: "OmniRoute" },
      });
    });
    const res = run(dir, "docs/i18n-wave-1113");
    assert.equal(res.code, 1, res.out);
    assert.match(
      res.out,
      /judging the 2 locale catalog\(s\) this PR changed against the merge base/
    );
    assert.match(
      res.out,
      /FAIL — 2\/2 changed locale catalog\(s\) regressed against the merge base/
    );
    assert.match(res.out, /ko: 1 lost key\(s\) the merge base had \(common\.rows\)/);
    assert.match(res.out, /ko: .*1 key\(s\) en\.json does not have \(common\.stray\)/);
    assert.match(res.out, /ko: .*1 translation\(s\) replaced by __MISSING__ \(common\.save\)/);
    assert.match(
      res.out,
      /pt-BR: 1 translation\(s\) replaced by the English text \(common\.save\)/
    );
    assert.match(
      res.out,
      /pt-BR: .*1 value\(s\) whose placeholders\/tags no longer match English \(common\.rows\)/
    );
    assert.doesNotMatch(res.out, /common\.brand/, "an untranslatable key may equal English");

    const warn = run(dir, "docs/i18n-wave-1113", ["--warn"]);
    assert.equal(warn.code, 0, warn.out);
    assert.match(warn.out, /WARN — 2\/2 changed locale catalog\(s\) regressed/);

    // Release mode on the same tree is the absolute gate, unchanged.
    const strict = run(dir, "docs/i18n-wave-1113", ["--mode=release"]);
    assert.equal(strict.code, 1, strict.out);
    assert.match(strict.out, /\[i18n-keys:ui\] FAIL — 1\/2 locales differ from en\.json/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a wave that only improves translations passes; a feature PR touching en.json only skips", () => {
  const dir = makeRepo();
  try {
    branch(dir, "docs/i18n-wave-good", () => {
      writeJson(dir, "src/i18n/messages/ko.json", {
        common: { save: "저장하기", rows: "{count}개 행 읽음", title: "제목", brand: "OmniRoute" },
      });
    });
    const good = run(dir, "docs/i18n-wave-good");
    assert.equal(good.code, 0, good.out);
    assert.match(
      good.out,
      /\[i18n-keys:ui\] OK — the 1 changed locale catalog\(s\) kept every key/
    );

    branch(dir, "feat/new-panel", () => {
      writeJson(dir, "src/i18n/messages/en.json", {
        common: { ...EN.common, rows: "{rows} rows parsed", panel: "Panel" },
      });
    });
    const feature = run(dir, "feat/new-panel");
    assert.equal(feature.code, 0, feature.out);
    assert.match(feature.out, /\[i18n-keys:ui\] SKIP reason=pr-mode — mode=pr \(/);
    assert.doesNotMatch(feature.out, /judging/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a locale catalog new in the PR must carry the whole en.json key set", () => {
  const dir = makeRepo();
  try {
    branch(dir, "chore/i18n-add-fr", () => {
      writeJson(dir, "src/i18n/messages/fr.json", {
        common: { save: "Enregistrer", rows: "{count} lignes", title: "Titre" },
      });
    });
    const res = run(dir, "chore/i18n-add-fr");
    assert.equal(res.code, 1, res.out);
    assert.match(
      res.out,
      /fr \(new catalog\): 1 lost key\(s\) the merge base had \(common\.brand\)/
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the CLI catalogs get the same changed-catalog judgment", () => {
  const dir = makeRepo();
  try {
    branch(dir, "chore/i18n-cli", () => {
      writeJson(dir, "bin/cli/locales/ko.json", { common: { ok: "확인" } });
    });
    const res = run(dir, "chore/i18n-cli", ["--catalog=cli"]);
    assert.equal(res.code, 1, res.out);
    assert.match(res.out, /\[i18n-keys:cli\] FAIL — 1\/1 changed locale catalog/);
    assert.match(res.out, /ko: 1 lost key\(s\) the merge base had \(common\.done\)/);
    const ui = run(dir, "chore/i18n-cli");
    assert.equal(ui.code, 0, ui.out);
    assert.match(ui.out, /\[i18n-keys:ui\] SKIP reason=pr-mode/, "no UI catalog changed");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("findCatalogRegressions: only what got worse in the locale counts", () => {
  const baseEn = { a: "Alpha", b: "{n} items", c: "Gamma", d: "Delta", e: "OmniRoute" };
  const baseLocale = { a: "Alfa", b: "{n} itens", c: "__MISSING__:Gamma", e: "OmniRoute" };

  // Translating an absent key, replacing a marker, keeping an allowlisted brand: all clean.
  const improved = findCatalogRegressions({
    baseEn,
    headEn: baseEn,
    baseLocale,
    headLocale: { a: "Alfa!", b: "{n} itens", c: "Gama", d: "Delta-pt", e: "OmniRoute" },
    untranslatable: new Set(["e"]),
  });
  assert.ok(isClean(improved), JSON.stringify(improved));

  // A marker where there was none before is a regression only if a real translation was there.
  const markedAbsent = findCatalogRegressions({
    baseEn,
    headEn: baseEn,
    baseLocale,
    headLocale: { ...baseLocale, d: "__MISSING__:Delta" },
  });
  assert.ok(isClean(markedAbsent), JSON.stringify(markedAbsent));

  // English rewritten (placeholder renamed) in the same PR: the stale translation is the release
  // refresh's job, not a regression of this catalog.
  const rewritten = findCatalogRegressions({
    baseEn,
    headEn: { ...baseEn, b: "{count} items" },
    baseLocale,
    headLocale: { ...baseLocale, a: "Alfa nova" },
  });
  assert.ok(isClean(rewritten), JSON.stringify(rewritten));

  // A placeholder the locale already had wrong at the base is not this PR's doing.
  const preexisting = findCatalogRegressions({
    baseEn,
    headEn: baseEn,
    baseLocale: { ...baseLocale, b: "{x} itens" },
    headLocale: { ...baseLocale, b: "{y} itens" },
  });
  assert.deepEqual(preexisting.placeholder, []);

  const broken = findCatalogRegressions({
    baseEn,
    headEn: baseEn,
    baseLocale,
    headLocale: { a: "Alpha", b: "{m} itens", e: "OmniRoute" },
  });
  assert.deepEqual(broken.lost, ["c"]);
  assert.deepEqual(broken.identical, ["a"]);
  assert.deepEqual(broken.placeholder, ["b"]);
});

test("sameIcuNames follows the ICU grammar of the placeholder-parity test", () => {
  assert.equal(sameIcuNames("{count} rows parsed", "{count} linhas"), true);
  assert.equal(sameIcuNames("{count} rows parsed", "{rows} linhas"), false);
  assert.equal(
    sameIcuNames(
      "Restricted to {count} endpoint{count, plural, one {} other {s}}.",
      "Omejeno na {count} {count, plural, one {končno točko} other {končnih točk}}."
    ),
    true
  );
  assert.equal(sameIcuNames("in <em>this</em> browser", "dans ce navigateur"), false);
  assert.equal(sameIcuNames("'{model}'", "'{modelo}'"), true, "a quoted run is literal text");
});
